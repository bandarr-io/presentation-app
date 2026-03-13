import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faServer,
  faNetworkWired,
  faDatabase,
  faChartLine,
  faBrain,
  faGears,
  faHardDrive,
  faCheckCircle,
  faBolt,
  faArrowDown,
  faArrowUp,
  faArrowsLeftRight,
  faGlobe,
  faFlask,
  faRotateRight,
  faMapPin,
  faTriangleExclamation,
  faCloud,
} from '@fortawesome/free-solid-svg-icons'

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────

const billingDimensions = [
  {
    id: 'capacity',
    label: 'Deployment Capacity',
    icon: faServer,
    color: '#0B64DD',
    tagline: 'Primary cost driver',
    description: 'RAM × hours for every node in your cluster',
  },
  {
    id: 'transfer',
    label: 'Data Transfer',
    icon: faNetworkWired,
    color: '#48EFCF',
    tagline: '100 GB / mo free',
    description: 'Traffic flowing in, out, and between nodes',
  },
  {
    id: 'storage',
    label: 'Storage',
    icon: faDatabase,
    color: '#F04E98',
    tagline: '100 GB / mo free',
    description: 'Snapshots on your cloud object store',
  },
  {
    id: 'synthetics',
    label: 'Synthetics',
    icon: faFlask,
    color: '#FF957D',
    tagline: 'Per test run',
    description: 'Browser and lightweight monitoring tests',
  },
]

const nodeTypes = [
  { name: 'Elasticsearch', icon: faDatabase, role: 'Search & analytics', note: 'Core compute — usually the largest slice' },
  { name: 'Kibana', icon: faChartLine, role: 'Visualize & explore', note: 'Scales with Elasticsearch nodes' },
  { name: 'APM Server', icon: faGears, role: 'Application traces', note: 'Optional — add only when needed' },
  { name: 'Machine Learning', icon: faBrain, role: 'Anomaly detection', note: 'On-demand bursts, idle when unused' },
]

const transferLanes = [
  {
    id: 'in',
    label: 'Data In',
    icon: faArrowDown,
    color: '#22c55e',
    badge: 'Always Free',
    description: 'Index requests, ingest payloads, and queries entering the deployment.',
    tip: 'Zero charge regardless of volume',
    isFree: true,
  },
  {
    id: 'out',
    label: 'Data Out',
    icon: faArrowUp,
    color: '#0B64DD',
    badge: 'Charged',
    description: 'Search results, monitoring egress, and traffic via PrivateLink — same rate to internet, other regions, or cloud accounts.',
    tip: 'Counts toward 100 GB/mo shared free allowance',
    isFree: false,
  },
  {
    id: 'inter',
    label: 'Inter-Node',
    icon: faArrowsLeftRight,
    color: '#48EFCF',
    badge: 'Charged',
    badgeNote: 'Waived on Azure',
    description: 'Shard sync between cluster nodes, cross-node search queries, and Kibana ↔ Elasticsearch traffic.',
    tip: 'Counts toward 100 GB/mo shared free allowance',
    isFree: false,
  },
]

const syntheticTypes = [
  {
    id: 'browser',
    label: 'Browser Tests',
    icon: faGlobe,
    color: '#FF957D',
    billing: 'Per test run',
    detail: 'Billed in 60-second increments',
    badge: '60s increments',
    description: 'Full browser automation that simulates real user journeys — navigates, clicks, and validates your app end-to-end.',
  },
  {
    id: 'lightweight',
    label: 'Lightweight Tests',
    icon: faBolt,
    color: '#0B64DD',
    billing: 'Per location / month',
    detail: 'Up to 1K simultaneous runs (~2.6B tests/mo)',
    badge: '~2.6 billion/mo',
    description: 'HTTP, TCP, ICMP, and DNS checks. High frequency at low cost — the workhorse of synthetic monitoring.',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// DETAIL PANELS
// ─────────────────────────────────────────────────────────────────────────────

function CapacityDetail({ isDark, color }) {
  return (
    <div className="h-full flex gap-6">
      {/* Left column: formula + cost share */}
      <div className="w-64 flex flex-col gap-4 flex-shrink-0">
        {/* Formula */}
        <div
          className="p-5 rounded-2xl flex flex-col items-center text-center"
          style={{ backgroundColor: `${color}12`, border: `1px solid ${color}50` }}
        >
          <div className={`text-[10px] uppercase tracking-widest mb-4 ${isDark ? 'text-white/40' : 'text-elastic-dev-blue/40'}`}>
            Billing Formula
          </div>
          <div className="flex flex-col items-center gap-2 w-full">
            {[
              { label: 'GB RAM', sub: 'per node' },
              { op: '×' },
              { label: 'Hours', sub: 'uptime' },
              { op: '×' },
              { label: 'Rate', sub: '$ / GB / hr' },
            ].map((item, i) =>
              item.op ? (
                <span key={i} className="text-xl font-black" style={{ color }}>
                  {item.op}
                </span>
              ) : (
                <div
                  key={i}
                  className={`w-full px-4 py-2 rounded-xl ${isDark ? 'bg-white/10' : 'bg-white'}`}
                >
                  <div className={`font-bold text-sm ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
                    {item.label}
                  </div>
                  <div className={`text-[10px] ${isDark ? 'text-white/40' : 'text-elastic-dev-blue/40'}`}>
                    {item.sub}
                  </div>
                </div>
              )
            )}
          </div>
          <p className={`text-[11px] mt-4 ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'}`}>
            CPU and disk scale automatically with RAM — all included.
          </p>
        </div>

        {/* Cost share callout */}
        <div
          className="p-5 rounded-2xl text-center"
          style={{ backgroundColor: `${color}12`, border: `1px solid ${color}50` }}
        >
          <div className="text-5xl font-black gradient-text">~80%</div>
          <div className={`text-xs mt-1 font-medium ${isDark ? 'text-white/60' : 'text-elastic-dev-blue/60'}`}>
            of a typical bill
          </div>
          <div className={`text-[11px] mt-3 ${isDark ? 'text-white/40' : 'text-elastic-dev-blue/40'}`}>
            Largest and most controllable dimension — adjust node count and RAM to tune directly.
          </div>
        </div>
      </div>

      {/* Right column: node grid + RAM scale bar */}
      <div className="flex-1 flex flex-col gap-4 min-w-0">
        <div className={`text-[10px] uppercase tracking-widest font-semibold ${isDark ? 'text-white/30' : 'text-elastic-dev-blue/30'}`}>
          Billed Node Types
        </div>
        <div className="grid grid-cols-2 gap-3 flex-1">
          {nodeTypes.map((node, index) => (
            <motion.div
              key={node.name}
              className={`p-4 rounded-2xl border flex items-start gap-3 ${
                isDark
                  ? 'bg-white/[0.03] border-white/10 hover:border-white/20'
                  : 'bg-white/60 border-elastic-dev-blue/10 hover:border-elastic-dev-blue/20'
              } transition-all`}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + index * 0.07 }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${color}20` }}
              >
                <FontAwesomeIcon icon={node.icon} style={{ color }} />
              </div>
              <div>
                <div className={`font-bold text-sm ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
                  {node.name}
                </div>
                <div className={`text-xs ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'}`}>
                  {node.role}
                </div>
                <div className="text-[10px] mt-1 font-medium" style={{ color }}>
                  {node.note}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* RAM scale visual */}
        <motion.div
          className={`p-4 rounded-2xl ${isDark ? 'bg-white/[0.02] border border-white/10' : 'bg-white/40 border border-elastic-dev-blue/10'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className={`text-[10px] uppercase tracking-widest mb-3 ${isDark ? 'text-white/30' : 'text-elastic-dev-blue/30'}`}>
            Cost scales linearly with RAM allocation
          </div>
          <div className="flex items-end gap-2">
            {[
              { size: '2 GB', h: 14 },
              { size: '4 GB', h: 24 },
              { size: '8 GB', h: 36 },
              { size: '16 GB', h: 52 },
              { size: '32 GB', h: 70 },
              { size: '64 GB', h: 90 },
            ].map((bar, i) => (
              <div key={bar.size} className="flex flex-col items-center gap-1 flex-1">
                <motion.div
                  className="w-full rounded-t-md"
                  style={{ backgroundColor: color, opacity: 0.25 + i * 0.13 }}
                  initial={{ height: 0 }}
                  animate={{ height: bar.h }}
                  transition={{ delay: 0.6 + i * 0.07, ease: 'easeOut' }}
                />
                <div className={`text-[9px] ${isDark ? 'text-white/30' : 'text-elastic-dev-blue/30'}`}>
                  {bar.size}
                </div>
              </div>
            ))}
            <div className={`ml-3 text-[11px] italic pb-5 ${isDark ? 'text-white/30' : 'text-elastic-dev-blue/30'}`}>
              → cost ↑
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function TransferDetail({ isDark, color }) {
  return (
    <div className="h-full flex flex-col gap-4">
      {/* 3 lanes */}
      <div className="flex gap-4 flex-1 min-h-0">
        {transferLanes.map((lane, index) => (
          <motion.div
            key={lane.id}
            className={`flex-1 p-5 rounded-2xl border flex flex-col gap-3 ${
              isDark
                ? 'bg-white/[0.02] border-white/10'
                : 'bg-white/60 border-elastic-dev-blue/10'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.08 }}
          >
            {/* Lane icon + label */}
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${lane.color}20` }}
              >
                <FontAwesomeIcon icon={lane.icon} style={{ color: lane.color }} />
              </div>
              <div>
                <div className={`font-bold text-sm ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
                  {lane.label}
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: `${lane.color}25`, color: lane.color }}
                  >
                    {lane.badge}
                  </span>
                  {lane.badgeNote && (
                    <span className={`text-[10px] ${isDark ? 'text-white/40' : 'text-elastic-dev-blue/40'}`}>
                      ({lane.badgeNote})
                    </span>
                  )}
                </div>
              </div>
            </div>

            <p className={`text-xs flex-1 leading-relaxed ${isDark ? 'text-white/55' : 'text-elastic-dev-blue/55'}`}>
              {lane.description}
            </p>

            {/* Tip */}
            <div
              className="p-3 rounded-xl text-xs flex items-start gap-2"
              style={{ backgroundColor: `${lane.color}12` }}
            >
              <FontAwesomeIcon
                icon={lane.isFree ? faCheckCircle : faTriangleExclamation}
                className="flex-shrink-0 mt-0.5"
                style={{ color: lane.color }}
              />
              <span style={{ color: lane.color }}>{lane.tip}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Free allowance banner */}
      <motion.div
        className={`p-4 rounded-2xl flex items-center gap-5 ${
          isDark ? 'bg-white/[0.04] border border-white/10' : 'bg-white border border-elastic-dev-blue/10'
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black flex-shrink-0"
          style={{ backgroundColor: `${color}20`, color }}
        >
          100
        </div>
        <div className="flex-1">
          <div className={`font-bold ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
            100 GB / month shared free allowance
          </div>
          <div className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'}`}>
            Applies to the combined total of <strong>Data Out + Inter-Node</strong> across all deployments in the account.
            Only usage beyond 100 GB is billed — Data In is always free and does not count.
          </div>
        </div>
        <div className={`text-right text-xs flex-shrink-0 ${isDark ? 'text-white/35' : 'text-elastic-dev-blue/35'}`}>
          <div className="font-semibold">Azure note</div>
          <div>Inter-Node charges</div>
          <div>currently waived</div>
        </div>
      </motion.div>
    </div>
  )
}

function StorageDetail({ isDark, color }) {
  return (
    <div className="h-full flex flex-col gap-4">
      <div className="flex-1 flex gap-5 min-h-0">
        {/* Dimension 1: Storage Size */}
        <motion.div
          className="flex-1 flex flex-col gap-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div
            className="flex-1 p-5 rounded-2xl flex flex-col gap-4"
            style={{ backgroundColor: `${color}10`, border: `1px solid ${color}40` }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${color}25` }}
              >
                <FontAwesomeIcon icon={faHardDrive} style={{ color }} />
              </div>
              <div>
                <div className={`font-bold text-sm ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
                  Storage Size
                </div>
                <div className="text-xs font-mono" style={{ color }}>
                  GB / month
                </div>
              </div>
            </div>

            <p className={`text-xs leading-relaxed ${isDark ? 'text-white/55' : 'text-elastic-dev-blue/55'}`}>
              Average space occupied by all snapshots across all deployments, metered hourly and averaged over the billing cycle.
            </p>

            {/* Example calculation */}
            <div className={`p-4 rounded-xl text-xs ${isDark ? 'bg-white/[0.06]' : 'bg-white'}`}>
              <div className={`font-semibold mb-3 ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'}`}>
                Example (April, 30 days)
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'}>
                    Days 1–10 at 100 GB
                  </span>
                  <span className={`font-mono ${isDark ? 'text-white/70' : 'text-elastic-dev-blue/70'}`}>
                    100 × 10 = 1,000
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'}>
                    Days 11–30 at 130 GB
                  </span>
                  <span className={`font-mono ${isDark ? 'text-white/70' : 'text-elastic-dev-blue/70'}`}>
                    130 × 20 = 2,600
                  </span>
                </div>
                <div className={`flex items-center justify-between pt-2 border-t ${isDark ? 'border-white/10' : 'border-elastic-dev-blue/10'}`}>
                  <span className={`font-semibold ${isDark ? 'text-white/80' : 'text-elastic-dev-blue/80'}`}>
                    Average (÷ 30)
                  </span>
                  <span className="font-bold font-mono" style={{ color }}>
                    120 GB / mo
                  </span>
                </div>
              </div>
            </div>

            {/* Free tier bar */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className={`text-[10px] ${isDark ? 'text-white/40' : 'text-elastic-dev-blue/40'}`}>
                  Free allowance
                </span>
                <span className="text-[10px] font-semibold" style={{ color }}>
                  100 GB / month
                </span>
              </div>
              <div className={`h-2 rounded-full ${isDark ? 'bg-white/10' : 'bg-elastic-dev-blue/10'}`}>
                <div className="h-full rounded-full" style={{ width: '100%', backgroundColor: color, opacity: 0.7 }} />
              </div>
              <div className={`text-[10px] mt-1 ${isDark ? 'text-white/35' : 'text-elastic-dev-blue/35'}`}>
                Only usage above 100 GB/mo is billed
              </div>
            </div>
          </div>
        </motion.div>

        {/* Divider */}
        <div className={`w-px self-stretch ${isDark ? 'bg-white/10' : 'bg-elastic-dev-blue/10'}`} />

        {/* Dimension 2: API Requests */}
        <motion.div
          className="flex-1 flex flex-col gap-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
        >
          <div
            className="flex-1 p-5 rounded-2xl flex flex-col gap-4"
            style={{ backgroundColor: `${color}10`, border: `1px solid ${color}40` }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${color}25` }}
              >
                <FontAwesomeIcon icon={faRotateRight} style={{ color }} />
              </div>
              <div>
                <div className={`font-bold text-sm ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
                  API Requests
                </div>
                <div className="text-xs font-mono" style={{ color }}>
                  per 1,000 requests / month
                </div>
              </div>
            </div>

            <p className={`text-xs leading-relaxed ${isDark ? 'text-white/55' : 'text-elastic-dev-blue/55'}`}>
              Total backup and restore API calls across all deployments, cumulative across the billing cycle.
            </p>

            <div className={`p-4 rounded-xl text-xs flex flex-col gap-3 ${isDark ? 'bg-white/[0.06]' : 'bg-white'}`}>
              <div className={`font-semibold ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'}`}>
                Important context
              </div>
              {[
                '1 snapshot ≠ 1 API call — a single snapshot can generate thousands of calls as files are written, modified, and deleted.',
                'Priced per 1,000 calls. Example: $0.0018 per 1K = $1.80 per million calls.',
                'Automated snapshot processes (restore scripts, pipelines) increase usage — audit them.',
              ].map((point, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-2 ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'}`}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                    style={{ backgroundColor: color }}
                  />
                  {point}
                </div>
              ))}
            </div>

            {/* Free tier bar */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className={`text-[10px] ${isDark ? 'text-white/40' : 'text-elastic-dev-blue/40'}`}>
                  Free allowance
                </span>
                <span className="text-[10px] font-semibold" style={{ color }}>
                  100,000 requests / month
                </span>
              </div>
              <div className={`h-2 rounded-full ${isDark ? 'bg-white/10' : 'bg-elastic-dev-blue/10'}`}>
                <div className="h-full rounded-full" style={{ width: '100%', backgroundColor: color, opacity: 0.7 }} />
              </div>
              <div className={`text-[10px] mt-1 ${isDark ? 'text-white/35' : 'text-elastic-dev-blue/35'}`}>
                Only requests above 100K/mo are billed
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom tip */}
      <motion.div
        className={`p-3 rounded-xl flex items-start gap-3 text-xs ${
          isDark ? 'bg-white/[0.02] border border-white/10' : 'bg-white/60 border border-elastic-dev-blue/10'
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <FontAwesomeIcon icon={faCloud} className="mt-0.5 flex-shrink-0" style={{ color }} />
        <span className={isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'}>
          <strong className={isDark ? 'text-white/70' : 'text-elastic-dev-blue/70'}>Note:</strong>{' '}
          Storage costs cover snapshot storage on your IaaS object store (AWS S3, Google GCS, Azure Storage).
          The disk storage for live Elasticsearch indices is already included in your RAM hours — not counted here.
          Use Kibana&apos;s{' '}
          <strong className={isDark ? 'text-white/70' : 'text-elastic-dev-blue/70'}>Snapshot Lifecycle Management (SLM)</strong>{' '}
          to automate retention and balance cost against data availability.
        </span>
      </motion.div>
    </div>
  )
}

function SyntheticsDetail({ isDark, color }) {
  return (
    <div className="h-full flex flex-col gap-4">
      <div className="flex-1 flex gap-4 min-h-0">
        {/* Browser Tests */}
        {syntheticTypes.map((type, index) => (
          <motion.div
            key={type.id}
            className={`flex-1 p-5 rounded-2xl border flex flex-col gap-4 ${
              isDark
                ? 'bg-white/[0.02] border-white/10'
                : 'bg-white/60 border-elastic-dev-blue/10'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
          >
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: `${type.color}20` }}
            >
              <FontAwesomeIcon icon={type.icon} className="text-xl" style={{ color: type.color }} />
            </div>

            <div>
              <div className={`font-bold text-lg ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
                {type.label}
              </div>
              <div className="font-semibold text-sm" style={{ color: type.color }}>
                {type.billing}
              </div>
              <div className={`text-xs mt-0.5 ${isDark ? 'text-white/40' : 'text-elastic-dev-blue/40'}`}>
                {type.detail}
              </div>
            </div>

            <p className={`text-xs flex-1 leading-relaxed ${isDark ? 'text-white/55' : 'text-elastic-dev-blue/55'}`}>
              {type.description}
            </p>

            <div
              className="self-start px-3 py-1.5 rounded-xl text-xs font-semibold"
              style={{ backgroundColor: `${type.color}20`, color: type.color }}
            >
              {type.badge}
            </div>
          </motion.div>
        ))}

        {/* Private Locations */}
        <motion.div
          className={`w-60 flex-shrink-0 p-5 rounded-2xl border flex flex-col gap-4 ${
            isDark ? 'bg-white/[0.02] border-white/10' : 'bg-white/60 border-elastic-dev-blue/10'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-green-400/20">
            <FontAwesomeIcon icon={faMapPin} className="text-xl text-green-400" />
          </div>

          <div>
            <div className={`font-bold text-lg ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
              Private Locations
            </div>
            <div className="font-semibold text-sm text-green-400">No execution charge</div>
            <div className={`text-xs mt-0.5 ${isDark ? 'text-white/40' : 'text-elastic-dev-blue/40'}`}>
              Run from your own infrastructure
            </div>
          </div>

          <p className={`text-xs flex-1 leading-relaxed ${isDark ? 'text-white/55' : 'text-elastic-dev-blue/55'}`}>
            Tests executed from private locations do not incur an execution charge. Results are stored in your deployment and billed under existing dimensions.
          </p>

          <div className="self-start px-3 py-1.5 rounded-xl text-xs font-semibold bg-green-400/20 text-green-400">
            Free to run
          </div>
        </motion.div>
      </div>

      {/* Footer note */}
      <motion.div
        className={`p-3 rounded-xl flex items-center gap-3 text-xs ${
          isDark ? 'bg-white/[0.02] border border-white/10' : 'bg-white/60 border border-elastic-dev-blue/10'
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <FontAwesomeIcon icon={faCheckCircle} style={{ color }} />
        <span className={isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'}>
          All test result data is stored in your deployment and billed under the existing{' '}
          <strong className={isDark ? 'text-white/70' : 'text-elastic-dev-blue/70'}>
            Capacity and Storage
          </strong>{' '}
          dimensions — no separate charge for result data storage.
        </span>
      </motion.div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN SCENE
// ─────────────────────────────────────────────────────────────────────────────

function ECHBillingScene() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [activeDimensionId, setActiveDimensionId] = useState('capacity')

  const activeDimension = billingDimensions.find(d => d.id === activeDimensionId)

  return (
    <div className="scene !py-4">
      <div className="max-w-[98%] mx-auto w-full h-full flex flex-col gap-4">
        {/* Header */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className={`text-eyebrow text-sm block mb-1 ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
            Elastic Cloud Hosted · ECH
          </span>
          <h2 className={`text-headline text-3xl md:text-4xl font-extrabold ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            <span className="gradient-text">Transparent Billing.</span> Four Dimensions.
          </h2>
          <p className={`text-sm mt-1 ${isDark ? 'text-white/45' : 'text-elastic-dev-blue/45'}`}>
            Your actual usage — no surprises. Select a dimension to explore.
          </p>
        </motion.div>

        {/* Dimension Tab Cards */}
        <div className="grid grid-cols-4 gap-3">
          {billingDimensions.map((dim, index) => {
            const isActive = activeDimensionId === dim.id
            return (
              <motion.button
                key={dim.id}
                onClick={() => setActiveDimensionId(dim.id)}
                className={`p-4 rounded-2xl border-2 text-left transition-colors ${
                  isActive
                    ? isDark
                      ? 'bg-white/[0.05]'
                      : 'bg-white'
                    : isDark
                    ? 'bg-white/[0.02] border-white/10 hover:border-white/20'
                    : 'bg-white/40 border-transparent hover:border-elastic-dev-blue/15'
                }`}
                style={{
                  borderColor: isActive ? dim.color : undefined,
                  boxShadow: isActive ? `0 0 24px ${dim.color}28` : undefined,
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                whileHover={{ scale: isActive ? 1 : 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${dim.color}22` }}
                  >
                    <FontAwesomeIcon icon={dim.icon} style={{ color: dim.color }} />
                  </div>
                  <div className="min-w-0">
                    <div className={`text-xs font-bold truncate ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
                      {dim.label}
                    </div>
                    <div
                      className="text-[10px] font-semibold uppercase tracking-wider"
                      style={{ color: dim.color }}
                    >
                      {dim.tagline}
                    </div>
                  </div>
                </div>
                <p className={`text-[11px] leading-snug ${isDark ? 'text-white/35' : 'text-elastic-dev-blue/35'}`}>
                  {dim.description}
                </p>
              </motion.button>
            )
          })}
        </div>

        {/* Detail Panel */}
        <div className="flex-1 min-h-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDimensionId}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              className={`h-full rounded-2xl border p-5 overflow-hidden ${
                isDark ? 'bg-white/[0.03] border-white/10' : 'bg-white/70 border-elastic-dev-blue/10'
              }`}
            >
              {activeDimensionId === 'capacity' && (
                <CapacityDetail isDark={isDark} color={activeDimension.color} />
              )}
              {activeDimensionId === 'transfer' && (
                <TransferDetail isDark={isDark} color={activeDimension.color} />
              )}
              {activeDimensionId === 'storage' && (
                <StorageDetail isDark={isDark} color={activeDimension.color} />
              )}
              {activeDimensionId === 'synthetics' && (
                <SyntheticsDetail isDark={isDark} color={activeDimension.color} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default ECHBillingScene

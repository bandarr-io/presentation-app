import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faLayerGroup,
  faPlug,
  faCircleNodes,
  faShield,
  faChartLine,
  faMagnifyingGlass,
  faBrain,
  faDollarSign,
  faClock,
  faDatabase,
  faExclamationTriangle,
  faCheck,
  faArrowRight,
  faBolt,
  faGear,
  faArrowsRotate
} from '@fortawesome/free-solid-svg-icons'

// All the scattered tools in "before" state
const allTools = [
  { name: 'Splunk', category: 'SIEM', type: 'consolidate' },
  { name: 'QRadar', category: 'SIEM', type: 'consolidate' },
  { name: 'Datadog', category: 'APM', type: 'consolidate' },
  { name: 'CrowdStrike', category: 'EDR', type: 'consolidate' },
  { name: 'Snowflake', category: 'Data', type: 'consolidate' },
  { name: 'Pinecone', category: 'Vector', type: 'consolidate' },
  { name: 'Palo Alto', category: 'Firewall', type: 'integrate' },
  { name: 'Okta', category: 'Identity', type: 'integrate' },
  { name: 'ServiceNow', category: 'ITSM', type: 'integrate' },
  { name: 'Tines', category: 'SOAR', type: 'integrate' },
  { name: 'Zscaler', category: 'ZeroTrust', type: 'integrate' },
  { name: 'Databricks', category: 'Analytics', type: 'integrate' },
]

// Random positions for chaotic "before" state - centered and distributed
const chaosPositions = [
  { x: '12%', y: '18%', rotate: -8 },     // Splunk - top left
  { x: '70%', y: '18%', rotate: 6 },      // QRadar - top right
  { x: '25%', y: '35%', rotate: 10 },     // Datadog - upper left
  { x: '50%', y: '22%', rotate: -5 },     // CrowdStrike - top center
  { x: '35%', y: '16%', rotate: 5 },      // Snowflake - top
  { x: '78%', y: '42%', rotate: -10 },    // Pinecone - right
  { x: '10%', y: '58%', rotate: 8 },      // Palo Alto - left
  { x: '40%', y: '48%', rotate: -6 },     // Okta - center
  { x: '75%', y: '65%', rotate: 10 },     // ServiceNow - lower right
  { x: '28%', y: '60%', rotate: -12 },    // Tines - left
  { x: '82%', y: '18%', rotate: -5 },     // Zscaler - top right corner
  { x: '55%', y: '65%', rotate: 8 },      // Databricks - lower center
]

const solutions = [
  { id: 'elasticsearch', label: 'Elasticsearch', tagline: 'Build Your Own', color: '#FEC514' },
  { id: 'observability', label: 'Observability', tagline: 'Out-of-the-Box', color: '#F04E98' },
  { id: 'security', label: 'Security', tagline: 'Out-of-the-Box', color: '#FF957D' },
]

const platformCapabilities = [
  { id: 'ingest', label: 'Ingestion', icon: faBolt },
  { id: 'process', label: 'Processing', icon: faGear },
  { id: 'storage', label: 'Storage', icon: faDatabase, core: true },
  { id: 'search', label: 'Search', icon: faMagnifyingGlass, core: true },
  { id: 'ai', label: 'AI & ML', icon: faBrain, core: true },
  { id: 'viz', label: 'Visualization', icon: faChartLine },
  { id: 'workflow', label: 'Automation', icon: faArrowsRotate },
]

const beforePainPoints = [
  'Multiple licenses & contracts',
  'Data silos & duplication',
  'Context switching',
  'Integration overhead',
  'Inconsistent alerting',
]

const afterBenefits = [
  { icon: faDollarSign, text: 'Reduced licensing costs', color: '#48EFCF' },
  { icon: faClock, text: 'Faster triage & response', color: '#0B64DD' },
  { icon: faLayerGroup, text: 'Unified data layer', color: '#F04E98' },
  { icon: faDatabase, text: 'No data duplication', color: '#FEC514' },
  { icon: faCircleNodes, text: 'Shared context', color: '#FF957D' },
]

function ConsolidationScene() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [isConsolidated, setIsConsolidated] = useState(false)

  return (
    <div className="scene !py-4">
      <div className="max-w-[98%] mx-auto w-full h-full flex flex-col">
        {/* Header */}
        <motion.div
          className="text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className={`text-eyebrow text-sm block mb-2 ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
            Unified Platform
          </span>
          <h2 className={`text-headline text-3xl md:text-4xl font-extrabold ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            <span className="text-elastic-blue">Consolidate</span> Point Solutions,{' '}
            <span className="text-elastic-pink">Centralize</span> Data Workflows
          </h2>
          <p className={`text-base mt-2 max-w-3xl mx-auto ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/60'}`}>
            Comprehensive capabilities to replace disparate tools while integrating with your broader ecosystem
          </p>
        </motion.div>

        {/* Main content */}
        <div className="flex-1 flex flex-col gap-4 min-h-0">
          {/* Top row: sidebar + visualization */}
          <div className="flex-1 flex gap-6 min-h-0 justify-center">
            {/* Left sidebar - changes based on state */}
            <motion.div 
              className="w-64 flex flex-col gap-3 flex-shrink-0"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
            <AnimatePresence mode="wait">
              {!isConsolidated ? (
                <motion.div
                  key="before-sidebar"
                  className={`flex-1 p-4 rounded-2xl border border-red-500/30 bg-red-500/5`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-400" />
                    <span className={`font-bold text-lg ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
                      Tool Sprawl
                    </span>
                  </div>
                  <div className="space-y-2">
                    {beforePainPoints.map((point, i) => (
                      <motion.div
                        key={point}
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                        <span className={`text-sm ${isDark ? 'text-white/70' : 'text-elastic-dev-blue/70'}`}>
                          {point}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                  <div className={`mt-6 p-3 rounded-xl ${isDark ? 'bg-white/5' : 'bg-elastic-dev-blue/5'}`}>
                    <div className="text-3xl font-bold text-red-400">76+</div>
                    <div className={`text-xs ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'}`}>
                      Avg. security tools per org
                    </div>
                    <div className={`text-[10px] mt-1 ${isDark ? 'text-white/30' : 'text-elastic-dev-blue/30'}`}>
                      IBM / Palo Alto Networks
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="after-sidebar"
                  className={`flex-1 p-4 rounded-2xl border border-elastic-teal/30 bg-elastic-teal/5`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <FontAwesomeIcon icon={faCheck} className="text-elastic-teal" />
                    <span className={`font-bold text-lg ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
                      With Elastic
                    </span>
                  </div>
                  <div className="space-y-3">
                    {afterBenefits.map((benefit, i) => (
                      <motion.div
                        key={benefit.text}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.1 }}
                      >
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${benefit.color}20` }}
                        >
                          <FontAwesomeIcon icon={benefit.icon} style={{ color: benefit.color }} className="text-sm" />
                        </div>
                        <span className={`text-sm ${isDark ? 'text-white/80' : 'text-elastic-dev-blue/80'}`}>
                          {benefit.text}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                  <div className={`mt-6 p-3 rounded-xl ${isDark ? 'bg-white/5' : 'bg-elastic-dev-blue/5'}`}>
                    <div className="text-3xl font-bold text-elastic-teal">3-5</div>
                    <div className={`text-xs ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'}`}>
                      Vendors eliminated on average
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Toggle button */}
            <motion.button
              onClick={() => setIsConsolidated(!isConsolidated)}
              className={`p-4 rounded-2xl font-bold text-lg transition-all ${
                isConsolidated
                  ? 'bg-elastic-blue text-white hover:bg-elastic-blue/80'
                  : 'bg-elastic-teal text-elastic-dev-blue hover:bg-elastic-teal/80'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isConsolidated ? '← Show Before' : 'Consolidate →'}
            </motion.button>
          </motion.div>

          {/* Center - Visualization */}
          <motion.div 
            className={`flex-1 max-w-5xl rounded-2xl border p-6 relative overflow-hidden ${isDark ? 'bg-white/[0.02] border-white/10' : 'bg-white/50 border-elastic-dev-blue/10'}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            {/* Before state - Chaotic scattered tools */}
            <AnimatePresence>
              {!isConsolidated && (
                <motion.div 
                  className="absolute inset-0 p-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {allTools.map((tool, i) => (
                    <motion.div
                      key={tool.name}
                      className={`absolute px-3 py-2 rounded-xl border-2 ${
                        isDark ? 'bg-elastic-dev-blue/80' : 'bg-white/90'
                      } ${
                        tool.type === 'consolidate' 
                          ? 'border-red-400/50' 
                          : 'border-orange-400/50'
                      }`}
                      style={{
                        left: chaosPositions[i].x,
                        top: chaosPositions[i].y,
                      }}
                      initial={{ 
                        opacity: 0, 
                        scale: 0,
                        rotate: chaosPositions[i].rotate 
                      }}
                      animate={{ 
                        opacity: 1, 
                        scale: 1,
                        rotate: chaosPositions[i].rotate,
                        y: [0, -5, 0, 5, 0],
                      }}
                      transition={{ 
                        delay: 0.2 + i * 0.05,
                        y: {
                          duration: 3 + Math.random() * 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }
                      }}
                    >
                      <div className={`font-medium text-sm ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
                        {tool.name}
                      </div>
                      <div className={`text-xs ${isDark ? 'text-white/40' : 'text-elastic-dev-blue/40'}`}>
                        {tool.category}
                      </div>
                    </motion.div>
                  ))}
                  
                  {/* Chaos indicator */}
                  <motion.div
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <div className={`text-sm ${isDark ? 'text-white/40' : 'text-elastic-dev-blue/40'}`}>
                      Disconnected tools • Duplicated data • Fragmented workflows
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* After state - Organized with Elastic at center */}
            <AnimatePresence>
              {isConsolidated && (
                <motion.div 
                  className="absolute inset-0 p-6 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Consolidated tools - left side */}
                  <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col gap-2">
                    <div className="text-sm font-bold text-elastic-blue mb-2 text-center">Consolidated</div>
                    {allTools.filter(t => t.type === 'consolidate').map((tool, i) => (
                      <motion.div
                        key={tool.name}
                        className={`px-3 py-2 rounded-xl border-2 border-elastic-blue/30 ${
                          isDark ? 'bg-elastic-blue/10' : 'bg-elastic-blue/5'
                        }`}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.05 }}
                      >
                        <div className={`font-medium text-sm ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
                          {tool.name}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Arrows flowing in */}
                  <motion.div
                    className="absolute left-[170px] top-1/2 -translate-y-1/2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <FontAwesomeIcon icon={faArrowRight} className="text-3xl text-elastic-blue" />
                  </motion.div>

                  {/* Platform Stack - Similar to UnifiedStrategyScene */}
                  <motion.div
                    className="flex flex-col items-center w-[580px]"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                  >
                    {/* Solutions Row */}
                    <div className="grid grid-cols-3 gap-3 mb-4 w-full">
                      {solutions.map((solution, index) => (
                        <motion.div
                          key={solution.id}
                          className={`relative px-4 py-3 rounded-xl border-2 text-center ${
                            isDark ? 'bg-white/[0.03]' : 'bg-white/90'
                          }`}
                          style={{ 
                            borderColor: solution.color,
                            borderTopWidth: '4px',
                          }}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 + index * 0.05 }}
                        >
                          <div className={`text-xs ${isDark ? 'text-white/40' : 'text-elastic-dev-blue/40'}`}>
                            {solution.tagline}
                          </div>
                          <div className={`font-semibold text-base ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
                            {solution.label}
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Main Platform Box */}
                    <motion.div
                      className={`relative p-5 rounded-2xl border-2 w-full ${
                        isDark 
                          ? 'bg-elastic-dev-blue/50 border-elastic-blue/30' 
                          : 'bg-white border-elastic-blue/20 shadow-lg'
                      }`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <div className={`text-center text-sm font-semibold mb-4 ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
                        Search AI Platform
                      </div>

                      {/* Capabilities Row */}
                      <div className="grid grid-cols-7 gap-2 items-end">
                        {platformCapabilities.map((cap, index) => (
                          <motion.div
                            key={cap.id}
                            className={`relative px-2 py-3 rounded-lg text-center ${
                              cap.core 
                                ? isDark 
                                  ? 'bg-elastic-blue/30 border border-elastic-blue/50' 
                                  : 'bg-elastic-blue/10 border border-elastic-blue/30'
                                : isDark 
                                  ? 'bg-white/[0.05] border border-white/10' 
                                  : 'bg-elastic-light-grey border border-elastic-dev-blue/10'
                            }`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 + index * 0.03 }}
                          >
                            <div className={`text-lg mb-1 ${cap.core ? (isDark ? 'text-white' : 'text-elastic-blue') : (isDark ? 'text-white/60' : 'text-elastic-dev-blue/60')}`}>
                              <FontAwesomeIcon icon={cap.icon} />
                            </div>
                            <div className={`text-[10px] leading-tight ${
                              cap.core 
                                ? isDark ? 'text-white font-medium' : 'text-elastic-blue font-medium'
                                : isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'
                            }`}>
                              {cap.label}
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Search AI Lake Badge */}
                      <div className="grid grid-cols-7 gap-2 mt-3">
                        <div className="col-span-2" />
                        <motion.div
                          className="col-span-3"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.8 }}
                        >
                          <div className={`w-full py-1.5 rounded-full text-xs font-medium text-center ${
                            isDark 
                              ? 'bg-elastic-teal/20 text-elastic-teal border border-elastic-teal/30' 
                              : 'bg-elastic-teal/10 text-elastic-blue border border-elastic-teal/30'
                          }`}>
                            Search AI Lake
                          </div>
                        </motion.div>
                        <div className="col-span-2" />
                      </div>
                    </motion.div>

                    {/* Deployment Options */}
                    <motion.div
                      className="flex justify-center gap-3 mt-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 }}
                    >
                      {[
                        { label: 'Self-Managed', desc: 'Full control' },
                        { label: 'Elastic Cloud', desc: 'AWS, GCP, Azure' },
                        { label: 'Serverless', desc: 'Zero ops' },
                      ].map((option, index) => (
                        <motion.div
                          key={option.label}
                          className={`px-4 py-2 rounded-xl border text-center ${
                            isDark 
                              ? 'bg-white/[0.02] border-white/10' 
                              : 'bg-white/60 border-elastic-dev-blue/10'
                          }`}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.95 + index * 0.05 }}
                        >
                          <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
                            {option.label}
                          </div>
                          <div className={`text-xs ${isDark ? 'text-white/40' : 'text-elastic-dev-blue/40'}`}>
                            {option.desc}
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>

                  {/* Arrows flowing out */}
                  <motion.div
                    className="absolute right-[170px] top-1/2 -translate-y-1/2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <FontAwesomeIcon icon={faArrowRight} className="text-3xl text-elastic-teal -scale-x-100" />
                  </motion.div>

                  {/* Integrated tools - right side */}
                  <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-2">
                    <div className="text-sm font-bold text-elastic-teal mb-2 text-center">Integrated</div>
                    {allTools.filter(t => t.type === 'integrate').map((tool, i) => (
                      <motion.div
                        key={tool.name}
                        className={`px-3 py-2 rounded-xl border-2 border-elastic-teal/30 ${
                          isDark ? 'bg-elastic-teal/10' : 'bg-elastic-teal/5'
                        }`}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.05 }}
                      >
                        <div className={`font-medium text-sm ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
                          {tool.name}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          </div>

          {/* Bottom bar - Platform info */}
          <motion.div 
            className="flex items-center justify-center gap-6 px-4 py-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className={`text-xs uppercase tracking-wider ${isDark ? 'text-white/40' : 'text-elastic-dev-blue/40'}`}>
              Platform Capabilities
            </div>
            <div className="flex items-center gap-4">
              {[
                { label: 'SIEM & Security Analytics', color: '#FF957D' },
                { label: 'Observability & APM', color: '#F04E98' },
                { label: 'Enterprise Search', color: '#FEC514' },
                { label: 'AI-Driven Detection', color: '#48EFCF' },
                { label: 'Unified Data Layer', color: '#0B64DD' },
              ].map((cap) => (
                <div key={cap.label} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cap.color }} />
                  <span className={`text-xs ${isDark ? 'text-white/70' : 'text-elastic-dev-blue/70'}`}>
                    {cap.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ConsolidationScene

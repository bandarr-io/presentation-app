import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faUserShield,
  faShieldHalved,
  faEyeSlash,
  faLock,
  faUnlock,
  faFileShield,
  faDatabase,
  faFilter,
  faMask,
  faCheckCircle,
  faTimesCircle,
  faCode,
  faClipboardCheck,
  faUserSecret,
  faServer,
  faFile,
  faTag,
  faClock,
  faBuilding,
  faGlobe,
  faUserTag,
  faToggleOn,
  faToggleOff
} from '@fortawesome/free-solid-svg-icons'

// Sample log data that would be in a real system
const sampleLogData = [
  { 
    id: 1,
    timestamp: '2024-01-15 09:23:41', 
    user: 'john.smith@acme.com', 
    source_ip: '192.168.1.47',
    action: 'login_success',
    credit_card: '4532-8821-3347-9912',
    ssn: '123-45-4521',
    severity: 'info',
    department: 'Engineering',
    region: 'US'
  },
  { 
    id: 2,
    timestamp: '2024-01-15 09:24:12', 
    user: 'sarah.jones@acme.com', 
    source_ip: '10.0.0.55',
    action: 'payment_processed',
    credit_card: '5421-3345-9921-7788',
    ssn: '234-56-8832',
    severity: 'high',
    department: 'Finance',
    region: 'EU'
  },
  { 
    id: 3,
    timestamp: '2024-01-15 09:25:03', 
    user: 'mike.wilson@acme.com', 
    source_ip: '172.16.0.22',
    action: 'file_download',
    credit_card: null,
    ssn: '345-67-1123',
    severity: 'medium',
    department: 'Sales',
    region: 'US'
  },
  { 
    id: 4,
    timestamp: '2024-01-15 09:26:55', 
    user: 'admin@acme.com', 
    source_ip: '10.0.0.1',
    action: 'config_change',
    credit_card: null,
    ssn: null,
    severity: 'critical',
    department: 'IT',
    region: 'US'
  },
  { 
    id: 5,
    timestamp: '2024-01-15 09:28:33', 
    user: 'lisa.chen@acme.com', 
    source_ip: '192.168.2.101',
    action: 'data_export',
    credit_card: '6011-9987-4432-2234',
    ssn: '456-78-5567',
    severity: 'high',
    department: 'Analytics',
    region: 'APAC'
  },
  { 
    id: 6,
    timestamp: '2024-01-15 09:30:17', 
    user: 'emma.davis@acme.com', 
    source_ip: '192.168.3.88',
    action: 'api_request',
    credit_card: null,
    ssn: null,
    severity: 'info',
    department: 'Engineering',
    region: 'US'
  },
  { 
    id: 7,
    timestamp: '2024-01-15 09:31:45', 
    user: 'raj.patel@acme.com', 
    source_ip: '10.0.1.200',
    action: 'login_failed',
    credit_card: null,
    ssn: '567-89-7789',
    severity: 'medium',
    department: 'Sales',
    region: 'APAC'
  },
  { 
    id: 8,
    timestamp: '2024-01-15 09:33:22', 
    user: 'maria.garcia@acme.com', 
    source_ip: '172.16.5.33',
    action: 'refund_issued',
    credit_card: '3782-8844-5521-1234',
    ssn: '678-90-2341',
    severity: 'high',
    department: 'Finance',
    region: 'EU'
  },
  { 
    id: 9,
    timestamp: '2024-01-15 09:35:08', 
    user: 'alex.kim@acme.com', 
    source_ip: '192.168.1.150',
    action: 'deployment',
    credit_card: null,
    ssn: null,
    severity: 'medium',
    department: 'Engineering',
    region: 'US'
  },
  { 
    id: 10,
    timestamp: '2024-01-15 09:36:44', 
    user: 'svc_backup@acme.com', 
    source_ip: '10.0.0.5',
    action: 'backup_complete',
    credit_card: null,
    ssn: null,
    severity: 'info',
    department: 'IT',
    region: 'US'
  },
  { 
    id: 11,
    timestamp: '2024-01-15 09:38:19', 
    user: 'tom.brown@acme.com', 
    source_ip: '192.168.8.77',
    action: 'customer_lookup',
    credit_card: '4111-2233-4455-5678',
    ssn: '789-01-9988',
    severity: 'info',
    department: 'Sales',
    region: 'EU'
  },
  { 
    id: 12,
    timestamp: '2024-01-15 09:40:02', 
    user: 'admin@acme.com', 
    source_ip: '10.0.0.1',
    action: 'user_created',
    credit_card: null,
    ssn: null,
    severity: 'critical',
    department: 'IT',
    region: 'US'
  },
  { 
    id: 13,
    timestamp: '2024-01-15 09:41:33', 
    user: 'nina.wong@acme.com', 
    source_ip: '172.16.2.45',
    action: 'report_generated',
    credit_card: null,
    ssn: null,
    severity: 'info',
    department: 'Analytics',
    region: 'APAC'
  },
  { 
    id: 14,
    timestamp: '2024-01-15 09:43:15', 
    user: 'james.lee@acme.com', 
    source_ip: '192.168.4.201',
    action: 'transaction_void',
    credit_card: '5500-1122-3344-4444',
    ssn: '890-12-3322',
    severity: 'high',
    department: 'Finance',
    region: 'US'
  },
  { 
    id: 15,
    timestamp: '2024-01-15 09:45:58', 
    user: 'security_scan@acme.com', 
    source_ip: '10.0.0.100',
    action: 'vuln_detected',
    credit_card: null,
    ssn: null,
    severity: 'critical',
    department: 'IT',
    region: 'US'
  },
]

// Helper to mask PII values
const maskPiiValue = (value, fieldKey) => {
  if (!value) return value
  if (fieldKey === 'credit_card') {
    // Show first 4 and last 4, mask middle
    return value.replace(/^(\d{4})-(\d{4})-(\d{4})-(\d{4})$/, '$1-XXXX-XXXX-$4')
  }
  if (fieldKey === 'ssn') {
    // Show only last 4
    return value.replace(/^(\d{3})-(\d{2})-(\d{4})$/, '***-**-$3')
  }
  return value
}

// Access hierarchy levels
const accessLevels = [
  { id: 'cluster', name: 'Cluster', icon: faServer, description: 'Cluster-wide operations', color: '#F04E98' },
  { id: 'index', name: 'Index', icon: faDatabase, description: 'Which indices can be queried', color: '#0B64DD' },
  { id: 'document', name: 'Document', icon: faFile, description: 'Row-level filtering (DLS)', color: '#48EFCF' },
  { id: 'field', name: 'Field', icon: faTag, description: 'Column masking (FLS)', color: '#FEC514' },
]

// Role definitions with access permissions at each level
const roles = [
  {
    id: 'admin',
    name: 'Admin',
    icon: faUserShield,
    color: '#F04E98',
    description: 'Full cluster access',
    levels: {
      cluster: { access: true, detail: 'All operations' },
      index: { access: true, detail: '*' },
      document: { access: true, detail: 'No filters' },
      field: { access: true, detail: 'All fields' },
    },
    visibleFields: ['timestamp', 'user', 'source_ip', 'action', 'credit_card', 'ssn', 'severity', 'department', 'region'],
    documentFilter: () => true,
  },
  {
    id: 'analyst',
    name: 'Security Analyst',
    icon: faShieldHalved,
    color: '#0B64DD',
    description: 'Security indices only',
    levels: {
      cluster: { access: false, detail: 'Read only' },
      index: { access: true, detail: 'security-*, logs-*' },
      document: { access: true, detail: 'severity: high|critical' },
      field: { access: true, detail: 'No PII fields' },
    },
    visibleFields: ['timestamp', 'user', 'source_ip', 'action', 'severity', 'department'],
    documentFilter: (doc) => ['high', 'critical', 'medium'].includes(doc.severity),
  },
  {
    id: 'developer',
    name: 'Developer',
    icon: faCode,
    color: '#48EFCF',
    description: 'App logs only',
    levels: {
      cluster: { access: false, detail: 'No access' },
      index: { access: true, detail: 'logs-*, metrics-*' },
      document: { access: true, detail: 'dept: Engineering' },
      field: { access: true, detail: 'Basic fields only' },
    },
    visibleFields: ['timestamp', 'action', 'severity', 'department'],
    documentFilter: (doc) => doc.severity !== 'critical',
  },
  {
    id: 'auditor',
    name: 'Auditor',
    icon: faClipboardCheck,
    color: '#FEC514',
    description: 'Audit trail access',
    levels: {
      cluster: { access: false, detail: 'No access' },
      index: { access: true, detail: 'audit-*' },
      document: { access: true, detail: 'All documents' },
      field: { access: true, detail: 'user, action, time' },
    },
    visibleFields: ['timestamp', 'user', 'action'],
    documentFilter: () => true,
  },
]

// ABAC attributes
const abacAttributes = [
  { id: 'department', name: 'Department', icon: faBuilding, values: ['Engineering', 'Finance', 'Sales', 'IT', 'Analytics'] },
  { id: 'region', name: 'Region', icon: faGlobe, values: ['US', 'EU', 'APAC'] },
  { id: 'clearance', name: 'Clearance', icon: faUserTag, values: ['Public', 'Internal', 'Confidential', 'Restricted'] },
  { id: 'time', name: 'Business Hours', icon: faClock, values: ['Yes', 'No'] },
]

// All possible fields for display
const allFields = [
  { key: 'timestamp', label: 'Timestamp', sensitive: false },
  { key: 'user', label: 'User', sensitive: false },
  { key: 'source_ip', label: 'Source IP', sensitive: true },
  { key: 'action', label: 'Action', sensitive: false },
  { key: 'credit_card', label: 'Credit Card', sensitive: true },
  { key: 'ssn', label: 'SSN', sensitive: true },
  { key: 'severity', label: 'Severity', sensitive: false },
  { key: 'department', label: 'Department', sensitive: false },
  { key: 'region', label: 'Region', sensitive: false },
]

// Masked data cell component
function DataCell({ value, isVisible, isSensitive, isDark, fieldKey, piiMasked }) {
  // Apply PII masking if enabled and this is a PII field
  const isPiiField = ['credit_card', 'ssn'].includes(fieldKey)
  const displayValue = (piiMasked && isPiiField && value) 
    ? maskPiiValue(value, fieldKey) 
    : (value || '—')
  
  return (
    <motion.td 
      className={`px-2 py-2 text-xs font-mono border-b ${
        isDark ? 'border-white/5' : 'border-elastic-dev-blue/5'
      }`}
      animate={{ opacity: isVisible ? 1 : 0.4 }}
      transition={{ duration: 0.3 }}
    >
      <AnimatePresence mode="wait">
        {isVisible ? (
          <motion.span
            key={piiMasked ? 'masked-pii' : 'visible'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={isSensitive ? 'text-elastic-pink' : isDark ? 'text-white/80' : 'text-elastic-dev-blue/80'}
          >
            {displayValue}
          </motion.span>
        ) : (
          <motion.span
            key="masked"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`${isDark ? 'text-white/20' : 'text-elastic-dev-blue/20'} select-none`}
          >
            ████
          </motion.span>
        )}
      </AnimatePresence>
    </motion.td>
  )
}

// Severity badge component
function SeverityBadge({ severity, isVisible, isDark }) {
  const colors = {
    critical: 'bg-red-500/20 text-red-400',
    high: 'bg-orange-500/20 text-orange-400',
    medium: 'bg-yellow-500/20 text-yellow-400',
    info: isDark ? 'bg-white/10 text-white/60' : 'bg-elastic-dev-blue/10 text-elastic-dev-blue/60',
  }
  
  if (!isVisible) {
    return <span className={`px-1.5 py-0.5 rounded text-[10px] ${isDark ? 'bg-white/5 text-white/20' : 'bg-elastic-dev-blue/5 text-elastic-dev-blue/20'}`}>████</span>
  }
  
  return (
    <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${colors[severity] || colors.info}`}>
      {severity}
    </span>
  )
}

// Access Level Card Component
function AccessLevelCard({ level, roleAccess, index, isDark }) {
  const hasAccess = roleAccess?.access
  const effectiveColor = isDark ? level.color : '#0B64DD' // Blue in light mode
  
  return (
    <motion.div
      className={`relative p-2 rounded-lg border transition-all ${
        hasAccess 
          ? '' 
          : 'opacity-40'
      }`}
      style={{
        borderColor: hasAccess ? effectiveColor : isDark ? 'rgba(255,255,255,0.1)' : 'rgba(16,28,63,0.1)',
        backgroundColor: hasAccess ? (isDark ? `${level.color}10` : 'rgba(11, 100, 221, 0.06)') : 'transparent',
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: hasAccess ? 1 : 0.4, y: 0 }}
      transition={{ delay: 0.3 + index * 0.1 }}
    >
      <div className="flex items-center gap-2">
        <div 
          className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: isDark ? `${level.color}25` : 'rgba(11, 100, 221, 0.15)' }}
        >
          <FontAwesomeIcon 
            icon={level.icon} 
            className="text-xs"
            style={{ color: effectiveColor }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className={`text-xs font-bold ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
            {level.name}
          </div>
          <div className={`text-[9px] truncate ${isDark ? 'text-white/40' : 'text-elastic-dev-blue/40'}`}>
            {roleAccess?.detail || level.description}
          </div>
        </div>
        <FontAwesomeIcon 
          icon={hasAccess ? faCheckCircle : faTimesCircle}
          className={`text-xs ${hasAccess ? 'text-green-400' : 'text-red-400/50'}`}
        />
      </div>
    </motion.div>
  )
}

function AccessControlSceneDev() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [selectedRole, setSelectedRole] = useState(roles[0])
  const showABAC = true // Always show ABAC
  const [piiMasked, setPiiMasked] = useState(false)
  const [abacFilters, setAbacFilters] = useState({
    department: null,
    region: null,
    clearance: 'Internal',
    time: 'Yes'
  })
  
  // PII fields that can be masked
  const piiFields = ['credit_card', 'ssn']
  
  // Calculate filtered data based on role + ABAC
  const getFilteredData = () => {
    let data = sampleLogData.filter(selectedRole.documentFilter)
    
    if (showABAC) {
      if (abacFilters.department) {
        data = data.filter(d => d.department === abacFilters.department)
      }
      if (abacFilters.region) {
        data = data.filter(d => d.region === abacFilters.region)
      }
    }
    
    return data
  }
  
  const visibleDocs = getFilteredData()
  const hiddenDocs = sampleLogData.length - visibleDocs.length
  
  // Visible fields based on role (PII masking doesn't hide columns, just masks values)
  const effectiveVisibleFields = selectedRole.visibleFields
  const hiddenFields = allFields.length - effectiveVisibleFields.length

  const toggleAbacFilter = (attr, value) => {
    setAbacFilters(prev => ({
      ...prev,
      [attr]: prev[attr] === value ? null : value
    }))
  }

  return (
    <div className="scene !py-2">
      <div className="max-w-[98%] mx-auto w-full h-full flex flex-col">
        {/* Header */}
        <motion.div
          className="text-center mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className={`text-eyebrow text-[10px] block mb-0.5 ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
            Multi-Layer Security
          </span>
          <h2 className={`text-headline text-2xl md:text-3xl font-extrabold ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            See What <span className={isDark ? 'text-elastic-pink' : 'text-elastic-blue'}>They</span> See
          </h2>
          <p className={`text-sm mt-1 ${isDark ? 'text-white/60' : 'text-elastic-dev-blue/60'}`}>
            Integrated access controls that respect roles and attributes, ensure every user only sees the data they need—nothing more
          </p>
        </motion.div>

        {/* Main content */}
        <div className="flex-1 flex gap-4 min-h-0">
          {/* Left - Role Selection, Access Levels & Controls */}
          <motion.div 
            className="w-[300px] flex flex-col gap-3 overflow-y-auto"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Role Selection */}
            <div className={`p-3 rounded-lg border ${isDark ? 'bg-white/[0.03] border-white/10' : 'bg-white border-elastic-dev-blue/10'}`}>
            <div className="flex items-center gap-2 mb-3">
                <FontAwesomeIcon icon={faShieldHalved} className={`text-xs ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`} />
                <span className={`text-[10px] font-bold ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
                  RBAC Filters
                </span>
              </div>
              <div className="space-y-1.5">
                {roles.map((role) => (
                  <motion.button
                    key={role.id}
                    onClick={() => setSelectedRole(role)}
                    className={`w-full px-2 py-1.5 rounded-md border text-left transition-all ${
                      selectedRole.id === role.id
                        ? ''
                        : isDark 
                          ? 'border-white/10 hover:border-white/20' 
                          : 'border-elastic-dev-blue/10 hover:border-elastic-dev-blue/20'
                    }`}
                    style={{
                      borderColor: selectedRole.id === role.id ? (isDark ? role.color : '#0B64DD') : undefined,
                      backgroundColor: selectedRole.id === role.id ? (isDark ? `${role.color}15` : 'rgba(11, 100, 221, 0.08)') : undefined,
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon 
                        icon={role.icon} 
                        className="text-xs"
                        style={{ color: isDark ? role.color : '#0B64DD' }} 
                      />
                      <div className="flex-1">
                        <div className={`text-[11px] font-bold ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
                          {role.name}
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* ABAC Attributes */}
            <div className={`p-3 rounded-lg border ${isDark ? 'bg-elastic-pink/5 border-elastic-pink/20' : 'bg-elastic-blue/5 border-elastic-blue/20'}`}>
              <div className="flex items-center gap-2 mb-3">
                <FontAwesomeIcon icon={faShieldHalved} className={`text-xs ${isDark ? 'text-elastic-pink' : 'text-elastic-blue'}`} />
                <span className={`text-[10px] font-bold ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
                  ABAC Filters
                </span>
              </div>
              <div className="space-y-3">
                {abacAttributes.slice(0, 2).map((attr) => (
                  <div key={attr.id}>
                    <div className={`text-[9px] mb-1 flex items-center gap-1 ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'}`}>
                      <FontAwesomeIcon icon={attr.icon} className="text-[8px]" />
                      {attr.name}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {attr.values.map((val) => (
                        <button
                          key={val}
                          onClick={() => toggleAbacFilter(attr.id, val)}
                          className={`px-2 py-0.5 rounded text-[10px] transition-all ${
                            abacFilters[attr.id] === val
                              ? isDark ? 'bg-elastic-pink text-white' : 'bg-elastic-blue text-white'
                              : isDark 
                                ? 'bg-white/10 text-white/60 hover:bg-white/20' 
                                : 'bg-elastic-dev-blue/10 text-elastic-dev-blue/60 hover:bg-elastic-dev-blue/20'
                          }`}
                        >
                          {val}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Access Hierarchy */}
            <div className={`p-3 rounded-lg border flex-1 ${isDark ? 'bg-white/[0.03] border-white/10' : 'bg-white border-elastic-dev-blue/10'}`}>
              <div className={`text-[10px] uppercase tracking-wider mb-2 ${isDark ? 'text-white/40' : 'text-elastic-dev-blue/40'}`}>
                Access Levels
              </div>
              <div className="space-y-2">
                {accessLevels.map((level, index) => (
                  <AccessLevelCard
                    key={level.id}
                    level={level}
                    roleAccess={selectedRole.levels[level.id]}
                    index={index}
                    isDark={isDark}
                  />
                ))}
              </div>
            </div>

            {/* PII Masking Toggle */}
            <div className={`p-3 rounded-lg border ${isDark ? 'bg-elastic-teal/5 border-elastic-teal/20' : 'bg-elastic-blue/5 border-elastic-blue/20'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faUserSecret} className={`text-xs ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`} />
                  <span className={`text-[10px] font-bold ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
                    Field Masking
                  </span>
                </div>
                <button
                  onClick={() => setPiiMasked(!piiMasked)}
                  className={`relative w-10 h-5 rounded-full transition-all ${
                    piiMasked 
                      ? isDark ? 'bg-elastic-teal' : 'bg-elastic-blue'
                      : isDark ? 'bg-white/20' : 'bg-elastic-dev-blue/20'
                  }`}
                >
                  <motion.div 
                    className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow"
                    animate={{ left: piiMasked ? '22px' : '2px' }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                </button>
              </div>
            </div>

            {/* Compliance & Live indicator */}
            <div className={`p-3 rounded-lg ${isDark ? 'bg-elastic-yellow/10' : 'bg-elastic-yellow/5'}`}>
              <div className="flex items-center gap-2 mb-2">
                <FontAwesomeIcon icon={faLock} className="text-elastic-yellow text-xs" />
                <span className={`text-[10px] font-bold ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
                  Compliance
                </span>
              </div>
              <div className={`text-[9px] ${isDark ? 'text-white/60' : 'text-elastic-dev-blue/60'}`}>
                CMMC, RMF, NIST, GDPR, HIPAA, PCI-DSS
              </div>
            </div>
          </motion.div>

          {/* Center - Live Data Table */}
          <motion.div 
            className={`flex-1 rounded-xl border overflow-hidden flex flex-col ${
              isDark ? 'bg-white/[0.02] border-white/10' : 'bg-white border-elastic-dev-blue/10'
            }`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            {/* Table header */}
            <div className={`px-3 py-2 border-b flex items-center justify-between ${
              isDark ? 'bg-white/[0.02] border-white/10' : 'bg-elastic-dev-blue/[0.02] border-elastic-dev-blue/10'
            }`}>
              <div className="flex items-center gap-2">
                <FontAwesomeIcon 
                  icon={faDatabase} 
                  className={isDark ? 'text-elastic-teal' : 'text-elastic-blue'} 
                />
                <span className={`font-bold text-sm ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
                  {selectedRole.levels.index.detail}
                </span>
              </div>
              
              {/* Access indicators */}
              <div className="flex items-center gap-2">
                {hiddenDocs > 0 && (
                  <motion.div 
                    className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-red-500/10"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <FontAwesomeIcon icon={faFilter} className="text-red-400 text-[10px]" />
                    <span className="text-[10px] text-red-400 font-medium">
                      {hiddenDocs} filtered
                    </span>
                  </motion.div>
                )}
                {hiddenFields > 0 && (
                  <motion.div 
                    className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-elastic-pink/10"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <FontAwesomeIcon icon={faMask} className="text-elastic-pink text-[10px]" />
                    <span className="text-[10px] text-elastic-pink font-medium">
                      {hiddenFields} masked
                    </span>
                  </motion.div>
                )}
                {hiddenDocs === 0 && hiddenFields === 0 && !piiMasked && (
                  <motion.div className={`flex items-center gap-1.5 px-2 py-1 rounded-full ${isDark ? 'bg-elastic-teal/10' : 'bg-elastic-blue/10'}`}>
                    <FontAwesomeIcon icon={faUnlock} className={`text-[10px] ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`} />
                    <span className={`text-[10px] font-medium ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>Full Access</span>
                  </motion.div>
                )}
                {piiMasked && (
                  <motion.div 
                    className={`flex items-center gap-1.5 px-2 py-1 rounded-full ${isDark ? 'bg-elastic-teal/10' : 'bg-elastic-blue/10'}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <FontAwesomeIcon icon={faMask} className={`text-[10px] ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`} />
                    <span className={`text-[10px] font-medium ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>Fields Masked</span>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Data table */}
            <div className="flex-1 overflow-auto">
              <table className="w-full">
                <thead>
                  <tr className={isDark ? 'bg-white/[0.02]' : 'bg-elastic-dev-blue/[0.02]'}>
                    {allFields.map((field) => {
                      const isVisible = effectiveVisibleFields.includes(field.key)
                      return (
                        <th 
                          key={field.key}
                          className={`px-2 py-2 text-left text-[10px] uppercase tracking-wider border-b whitespace-nowrap ${
                            isDark ? 'border-white/10' : 'border-elastic-dev-blue/10'
                          } ${isVisible 
                            ? isDark ? 'text-white/60' : 'text-elastic-dev-blue/60'
                            : isDark ? 'text-white/20' : 'text-elastic-dev-blue/20'
                          }`}
                        >
                          <div className="flex items-center gap-1">
                            {field.label}
                            {field.sensitive && <FontAwesomeIcon icon={faLock} className={`text-[8px] ${isVisible ? 'text-elastic-pink' : ''}`} />}
                            {!isVisible && <FontAwesomeIcon icon={faEyeSlash} className="text-[8px]" />}
                          </div>
                        </th>
                      )
                    })}
                  </tr>
                </thead>
                <tbody>
                  {sampleLogData.map((row, rowIndex) => {
                    const isDocVisible = visibleDocs.some(d => d.id === row.id)
                    
                    return (
                      <motion.tr
                        key={row.id}
                        className={isDocVisible ? isDark ? 'hover:bg-white/[0.02]' : 'hover:bg-elastic-dev-blue/[0.02]' : 'opacity-20'}
                        initial={{ opacity: 0 }}
                        animate={{ 
                          opacity: isDocVisible ? 1 : 0.15,
                          filter: isDocVisible ? 'none' : 'grayscale(100%)'
                        }}
                        transition={{ delay: 0.4 + rowIndex * 0.03 }}
                      >
                        {allFields.map((field) => {
                          const isFieldVisible = effectiveVisibleFields.includes(field.key) && isDocVisible
                          
                          if (field.key === 'severity') {
                            return (
                              <td key={field.key} className={`px-2 py-2 border-b ${isDark ? 'border-white/5' : 'border-elastic-dev-blue/5'}`}>
                                <SeverityBadge severity={row.severity} isVisible={isFieldVisible} isDark={isDark} />
                              </td>
                            )
                          }
                          
                          return (
                            <DataCell
                              key={field.key}
                              value={row[field.key]}
                              isVisible={isFieldVisible}
                              isSensitive={field.sensitive}
                              isDark={isDark}
                              fieldKey={field.key}
                              piiMasked={piiMasked}
                            />
                          )
                        })}
                      </motion.tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Bottom status */}
            <div className={`px-3 py-1.5 border-t flex items-center justify-between text-[10px] ${
              isDark ? 'bg-white/[0.02] border-white/10 text-white/40' : 'bg-elastic-dev-blue/[0.02] border-elastic-dev-blue/10 text-elastic-dev-blue/40'
            }`}>
              <div>
                Role: <span className="font-bold" style={{ color: selectedRole.color }}>{selectedRole.name}</span>
                {showABAC && <span className="ml-2">+ ABAC filters</span>}
              </div>
              <div className="flex items-center gap-3">
                <span><FontAwesomeIcon icon={faCheckCircle} className={isDark ? 'text-elastic-teal' : 'text-elastic-blue'} /> {visibleDocs.length} visible</span>
                {hiddenDocs > 0 && <span><FontAwesomeIcon icon={faTimesCircle} className="text-red-400" /> {hiddenDocs} hidden</span>}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default AccessControlSceneDev

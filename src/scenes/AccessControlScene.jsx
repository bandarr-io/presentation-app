import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faUser,
  faUsers,
  faUserShield,
  faKey,
  faLock,
  faShieldHalved,
  faServer,
  faDatabase,
  faFile,
  faTag,
  faCheck,
  faXmark,
  faFingerprint,
  faIdCard,
  faBuilding,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons'

const authMethods = [
  { name: 'Native', icon: faUser },
  { name: 'LDAP', icon: faBuilding },
  { name: 'Kerberos', icon: faFingerprint },
  { name: 'Active Directory', icon: faBuilding },
  { name: 'SAML', icon: faIdCard },
  { name: 'PKI', icon: faKey },
  
]

const roles = [
  { 
    id: 'admin', 
    name: 'Admin', 
    color: '#F04E98',
    access: { cluster: true, indices: true, documents: true, fields: true },
    description: 'Full system access'
  },
  { 
    id: 'analyst', 
    name: 'Security Analyst', 
    color: '#0B64DD',
    access: { cluster: false, indices: true, documents: true, fields: ['timestamp', 'source', 'event', 'severity'] },
    description: 'Security data only'
  },
  { 
    id: 'developer', 
    name: 'Developer', 
    color: '#48EFCF',
    access: { cluster: false, indices: ['logs-*', 'metrics-*'], documents: true, fields: true },
    description: 'Application logs & metrics'
  },
  { 
    id: 'auditor', 
    name: 'Auditor', 
    color: '#FEC514',
    access: { cluster: false, indices: ['audit-*'], documents: true, fields: ['timestamp', 'user', 'action'] },
    description: 'Read-only audit trails'
  },
]

const resourceLevels = [
  { id: 'cluster', name: 'Cluster', icon: faServer, color: '#F04E98', description: 'Full cluster operations' },
  { id: 'indices', name: 'Indices', icon: faDatabase, color: '#0B64DD', description: 'Index-level access' },
  { id: 'documents', name: 'Documents', icon: faFile, color: '#48EFCF', description: 'Document filtering' },
  { id: 'fields', name: 'Fields', icon: faTag, color: '#FEC514', description: 'Mask or hide sensitive fields like PII' },
]

function AccessControlScene() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [selectedRole, setSelectedRole] = useState(roles[0])
  const [isAnimating, setIsAnimating] = useState(false)

  const simulateAccess = (role) => {
    setIsAnimating(true)
    setSelectedRole(role)
    setTimeout(() => setIsAnimating(false), 1000)
  }

  const hasAccess = (level) => {
    const access = selectedRole.access[level]
    return access === true || (Array.isArray(access) && access.length > 0)
  }

  return (
    <div className="scene !py-4">
      <div className="max-w-[98%] mx-auto w-full h-full flex flex-col">
        {/* Header */}
        <motion.div
          className="text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-elastic-teal text-sm font-mono uppercase tracking-widest block mb-2">
            Granular Security Controls
          </span>
          <h2 className={`text-4xl md:text-5xl font-bold ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
            <span className="text-elastic-pink">Integrated Access Controls</span> That Respect Roles
          </h2>
          <p className={`text-lg mt-2 ${isDark ? 'text-white/60' : 'text-elastic-dev-blue/60'}`}>
            Ensure every user only sees the data they need—nothing more
          </p>
        </motion.div>

        {/* Main content */}
        <div className="flex-1 flex gap-6 min-h-0 justify-center">
          {/* Left - Authentication & Roles */}
          <motion.div 
            className={`w-72 flex flex-col gap-4 ${isDark ? '' : ''}`}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Authentication Methods */}
            <div className={`p-4 rounded-2xl border ${isDark ? 'bg-white/[0.03] border-white/10' : 'bg-white border-elastic-dev-blue/10'}`}>
              <div className={`text-xs uppercase tracking-wider mb-3 ${isDark ? 'text-white/40' : 'text-elastic-dev-blue/40'}`}>
                Authentication
              </div>
              <div className="flex flex-wrap gap-2">
                {authMethods.map((method, i) => (
                  <motion.div
                    key={method.name}
                    className={`px-2 py-1 rounded-lg text-xs flex items-center gap-1 ${
                      isDark ? 'bg-white/10 text-white/70' : 'bg-elastic-dev-blue/10 text-elastic-dev-blue/70'
                    }`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                  >
                    <FontAwesomeIcon icon={method.icon} className="text-[10px]" />
                    {method.name}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Role Selection */}
            <div className={`flex-1 p-4 rounded-2xl border ${isDark ? 'bg-white/[0.03] border-white/10' : 'bg-white border-elastic-dev-blue/10'}`}>
              <div className={`text-xs uppercase tracking-wider mb-3 ${isDark ? 'text-white/40' : 'text-elastic-dev-blue/40'}`}>
                Select Role
              </div>
              <div className="space-y-2">
                {roles.map((role) => (
                  <motion.button
                    key={role.id}
                    onClick={() => simulateAccess(role)}
                    className={`w-full p-3 rounded-xl border-2 text-left transition-all ${
                      selectedRole.id === role.id
                        ? 'border-opacity-100'
                        : isDark ? 'border-white/10 hover:border-white/20' : 'border-elastic-dev-blue/10 hover:border-elastic-dev-blue/20'
                    }`}
                    style={{
                      borderColor: selectedRole.id === role.id ? role.color : undefined,
                      backgroundColor: selectedRole.id === role.id ? `${role.color}15` : undefined,
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${role.color}30` }}
                      >
                        <FontAwesomeIcon icon={faUserShield} style={{ color: role.color }} />
                      </div>
                      <div>
                        <div className={`font-bold text-sm ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
                          {role.name}
                        </div>
                        <div className={`text-xs ${isDark ? 'text-white/40' : 'text-elastic-dev-blue/40'}`}>
                          {role.description}
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Encryption note */}
            <div className={`p-3 rounded-xl text-xs ${isDark ? 'bg-white/[0.02] text-white/40' : 'bg-elastic-dev-blue/5 text-elastic-dev-blue/50'}`}>
              <div className="flex items-center gap-2 mb-1">
                <FontAwesomeIcon icon={faLock} className="text-elastic-teal" />
                <span className="font-medium">End-to-end Encryption</span>
              </div>
              <div className="ml-5">At rest & in transit (TLS, FIPS 140-2)</div>
            </div>
          </motion.div>

          {/* Center - Access Flow Visualization */}
          <motion.div 
            className={`flex-1 max-w-xl rounded-2xl border p-6 ${isDark ? 'bg-white/[0.02] border-white/10' : 'bg-white/50 border-elastic-dev-blue/10'}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            {/* Resource Hierarchy */}
            <div className="h-full flex flex-col">
              <div className={`text-center mb-6 ${isDark ? 'text-white/60' : 'text-elastic-dev-blue/60'}`}>
                <span className="text-sm">Access for </span>
                <span className="font-bold" style={{ color: selectedRole.color }}>{selectedRole.name}</span>
              </div>

              {/* Vertical resource flow */}
              <div className="flex-1 overflow-y-auto">
                <div className="flex flex-col gap-3 w-full h-full justify-between">
                  {resourceLevels.map((level, index) => {
                    const access = hasAccess(level.id)
                    const accessDetail = selectedRole.access[level.id]
                    const accessText = accessDetail === true 
                      ? 'Full Access' 
                      : Array.isArray(accessDetail) 
                        ? accessDetail.length > 2 ? `${accessDetail.length} items` : accessDetail.join(', ')
                        : 'No Access'
                    
                    return (
                      <motion.div
                        key={level.id}
                        className={`p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${
                          access 
                            ? '' 
                            : 'opacity-40 grayscale'
                        }`}
                        style={{
                          borderColor: access ? level.color : isDark ? 'rgba(255,255,255,0.1)' : 'rgba(16,28,63,0.1)',
                          backgroundColor: access ? `${level.color}10` : 'transparent',
                        }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: access ? 1 : 0.4, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                      >
                        {/* Icon */}
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${level.color}30` }}
                        >
                          <FontAwesomeIcon 
                            icon={level.icon} 
                            className="text-xl"
                            style={{ color: level.color }}
                          />
                        </div>
                        
                        {/* Info */}
                        <div className="flex-1">
                          <div className={`font-bold text-lg ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
                            {level.name}
                          </div>
                          <div className={`text-sm ${isDark ? 'text-white/40' : 'text-elastic-dev-blue/40'}`}>
                            {level.description}
                          </div>
                        </div>
                        
                        {/* Access Badge */}
                        <div 
                          className="text-sm font-medium px-3 py-1.5 rounded-md"
                          style={{ 
                            backgroundColor: access ? `${level.color}20` : isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                            color: access ? level.color : isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'
                          }}
                        >
                          {accessText}
                        </div>
                        
                        {/* Check/X */}
                        {access ? (
                          <div className="w-8 h-8 rounded-full bg-elastic-teal/20 flex items-center justify-center flex-shrink-0">
                            <FontAwesomeIcon icon={faCheck} className="text-base text-elastic-teal" />
                          </div>
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                            <FontAwesomeIcon icon={faXmark} className="text-base text-red-400" />
                          </div>
                        )}
                      </motion.div>
                    )
                  })}
                </div>
              </div>

              {/* Bottom label */}
              <motion.div 
                className={`mt-4 text-center text-sm ${isDark ? 'text-white/40' : 'text-elastic-dev-blue/40'}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <span className="text-elastic-pink font-medium">privileges</span> on <span className="text-elastic-teal font-medium">resources</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Right - RBAC/ABAC explanation */}
          <motion.div 
            className="w-72 flex flex-col gap-4"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            {/* RBAC */}
            <div className={`flex-1 p-5 rounded-2xl border ${isDark ? 'bg-white/[0.03] border-white/10' : 'bg-white border-elastic-dev-blue/10'}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-elastic-blue/20 flex items-center justify-center">
                  <FontAwesomeIcon icon={faUsers} className="text-xl text-elastic-blue" />
                </div>
                <div>
                  <div className={`font-bold text-lg ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
                    RBAC
                  </div>
                  <div className={`text-sm ${isDark ? 'text-white/40' : 'text-elastic-dev-blue/40'}`}>
                    Role-Based Access
                  </div>
                </div>
              </div>
              <div className={`text-sm leading-relaxed ${isDark ? 'text-white/60' : 'text-elastic-dev-blue/60'}`}>
                Assign permissions to roles, then assign roles to users. Simple, scalable, and auditable.
              </div>
              <div className="flex items-center gap-3 mt-4 text-sm">
                <span className={isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'}>User</span>
                <FontAwesomeIcon icon={faArrowRight} className="text-elastic-blue" />
                <span className={isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'}>Role</span>
                <FontAwesomeIcon icon={faArrowRight} className="text-elastic-blue" />
                <span className={isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'}>Resource</span>
              </div>
            </div>

            {/* ABAC */}
            <div className={`flex-1 p-5 rounded-2xl border ${isDark ? 'bg-white/[0.03] border-white/10' : 'bg-white border-elastic-dev-blue/10'}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-elastic-pink/20 flex items-center justify-center">
                  <FontAwesomeIcon icon={faShieldHalved} className="text-xl text-elastic-pink" />
                </div>
                <div>
                  <div className={`font-bold text-lg ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
                    ABAC
                  </div>
                  <div className={`text-sm ${isDark ? 'text-white/40' : 'text-elastic-dev-blue/40'}`}>
                    Attribute-Based Access
                  </div>
                </div>
              </div>
              <div className={`text-sm leading-relaxed ${isDark ? 'text-white/60' : 'text-elastic-dev-blue/60'}`}>
                Dynamic policies based on user attributes, environment, and data classification.
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {['department','time', 'clearance', 'location'].map((attr) => (
                  <span 
                    key={attr}
                    className={`px-2 py-1 rounded-md text-sm ${
                      isDark ? 'bg-elastic-pink/20 text-elastic-pink' : 'bg-elastic-pink/10 text-elastic-pink'
                    }`}
                  >
                    {attr}
                  </span>
                ))}
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default AccessControlScene


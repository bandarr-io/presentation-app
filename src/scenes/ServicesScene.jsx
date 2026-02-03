import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faHandshake, 
  faRocket, 
  faShieldHalved, 
  faBullseye,
  faUserTie,
  faCheck,
  faXmark,
  faHeadset,
  faClock,
  faUsers,
  faGraduationCap,
  faChartLine,
  faExchangeAlt,
  faCogs,
  faLightbulb,
  faExclamationTriangle,
  faCalendarXmark,
  faPersonDigging,
  faDollarSign,
  faCircleQuestion,
  faArrowRight,
  faPlay,
  faPause,
  faServer,
  faDatabase,
  faCloud,
  faStopCircle,
  faCircle,
  faCheckCircle,
  faBolt
} from '@fortawesome/free-solid-svg-icons'

// Data sources for the zero-downtime diagram
const dataSources = [
//   { name: 'Okta', color: '#007DC1' },
  { name: 'AWS', color: '#FF9900' },
  { name: 'Linux Systems', color: '#FCC624' },
//   { name: 'Microsoft 365', color: '#0078D4' },
  { name: 'Windows Systems', color: '#00A4EF' },
//   { name: 'Apache', color: '#D22128' },
  { name: 'Palo Alto', color: '#F04E23' },
  { name: 'CrowdStrike', color: '#E01E5A' },
]

// Shippers
const shippers = [
  { name: 'Logstash', color: '#F1B400' },
  { name: 'Elastic Agent', color: '#48EFCF' },
  { name: 'OOTB Integrations', color: '#F04E98' },
  { name: 'OOTB Integrations', color: '#F04E98' },
]

// DIY Pain Points
const diyPainPoints = [
  { icon: faCalendarXmark, title: '18+ Months', subtitle: 'Average timeline', desc: 'Extended project duration with uncertain milestones' },
  { icon: faExclamationTriangle, title: 'High Risk', subtitle: 'Unpredictable outcomes', desc: 'No proven methodology or safety nets' },
  { icon: faPersonDigging, title: 'Resource Drain', subtitle: 'Internal teams stretched', desc: 'Your best people pulled from core work' },
  { icon: faCircleQuestion, title: 'Knowledge Gaps', subtitle: 'Learning on the job', desc: 'Costly mistakes during production migration' },
]

// Elastic Services Benefits
const elasticBenefits = [
  { icon: faClock, title: '4-7 Months', subtitle: 'Proven timeline', desc: 'Structured phases with clear milestones' },
  { icon: faShieldHalved, title: 'Zero Downtime', subtitle: 'Risk mitigated', desc: 'Parallel environments, tested rollback' },
  { icon: faUsers, title: 'Expert Team', subtitle: 'Dedicated resources', desc: 'Certified specialists focused on your success' },
  { icon: faGraduationCap, title: 'Knowledge Transfer', subtitle: 'Enablement included', desc: 'Your team trained and confident' },
]

// Service pillars for the "With Elastic" view
const servicePillars = [
  {
    id: 'consulting',
    name: 'Consulting',
    icon: faHandshake,
    color: '#48EFCF',
    items: ['Solution Design', 'Best Practices', 'Implementation', 'Strategic Planning']
  },
  {
    id: 'migration',
    name: 'Migration',
    icon: faExchangeAlt,
    color: '#F04E98',
    items: ['Risk Mitigation', 'Data Validation', 'Training & Workshops', 'Use Case Transition']
  },
  {
    id: 'support',
    name: 'Support',
    icon: faHeadset,
    color: '#0B64DD',
    items: ['24/7 Coverage', 'Dedicated Support Engineer', 'Break / Fix Support', 'Service Level Agreements']
  },
]

// Journey phases
const journeyPhases = [
  { name: 'Discover', desc: 'Assess & define success', color: '#48EFCF', icon: faBullseye },
  { name: 'Plan', desc: 'Architecture & sprints', color: '#FF957D', icon: faLightbulb },
  { name: 'Implement', desc: 'Deploy & configure', color: '#F04E98', icon: faCogs },
  { name: 'Migrate', desc: 'Data onboarding', color: '#0B64DD', icon: faExchangeAlt },
  { name: 'Optimize', desc: 'Tune & expand', color: '#FEC514', icon: faChartLine },
  { name: 'Partner', desc: 'Ongoing success', color: '#00BFB3', icon: faHandshake },
]

// --- Zero Downtime Interactive Demo Component ---
// Cutover stages: parallel → preparing → stopping → validating → complete
function ZeroDowntimeDemo({ isDark }) {
  const [cutoverState, setCutoverState] = useState('parallel')
  const particleIdRef = useRef(0)
  const [particles, setParticles] = useState([])
  const [cutoverProgress, setCutoverProgress] = useState(0)

  // Spawn particles continuously
  useEffect(() => {
    const interval = setInterval(() => {
      const newParticle = {
        id: particleIdRef.current++,
        toLegacy: cutoverState === 'parallel' || cutoverState === 'preparing',
        toElastic: true
      }
      setParticles(prev => [...prev.slice(-10), newParticle])
    }, 600)
    return () => clearInterval(interval)
  }, [cutoverState])

  // Progress bar animation during cutover
  useEffect(() => {
    if (cutoverState === 'parallel' || cutoverState === 'complete') {
      setCutoverProgress(cutoverState === 'complete' ? 100 : 0)
      return
    }
    const progressMap = { preparing: 25, stopping: 50, validating: 75 }
    setCutoverProgress(progressMap[cutoverState] || 0)
  }, [cutoverState])

  const handleCutover = () => {
    // Stage 1: Preparing (2.5s) - "Preparing cutover..."
    setCutoverState('preparing')
    
    setTimeout(() => {
      // Stage 2: Stopping (3s) - "Stopping legacy writes..."
      setCutoverState('stopping')
      
      setTimeout(() => {
        // Stage 3: Validating (3s) - "Validating data integrity..."
        setCutoverState('validating')
        
        setTimeout(() => {
          // Stage 4: Complete
          setCutoverState('complete')
          setCutoverProgress(100)
        }, 3000)
      }, 3000)
    }, 2500)
  }

  const handleReset = () => {
    setCutoverState('parallel')
    setCutoverProgress(0)
    setParticles([])
  }

  const isComplete = cutoverState === 'complete'
  const isCutting = ['preparing', 'stopping', 'validating'].includes(cutoverState)
  const isLegacyReceiving = cutoverState === 'parallel' || cutoverState === 'preparing'

  // Status messages for each stage
  const statusMessages = {
    parallel: 'Both systems receiving data simultaneously',
    preparing: 'Preparing cutover sequence...',
    stopping: 'Stopping legacy writes...',
    validating: 'Validating data integrity...',
    complete: 'Migration complete — Zero events lost!'
  }

  // Badge content for each stage
  const badgeContent = {
    parallel: '⚡ Dual-Write Active',
    preparing: '🔄 Preparing Cutover...',
    stopping: '🛑 Stopping Legacy...',
    validating: '✓ Validating Data...',
    complete: '✓ Migration Complete'
  }

  return (
    <motion.div
      key="approach"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`flex-1 rounded-2xl border p-6 relative overflow-hidden mx-auto ${isDark ? 'bg-white/[0.02] border-white/10' : 'bg-white/80 border-elastic-dev-blue/10'}`}
      style={{ width: '1100px', maxWidth: '100%' }}
    >
      {/* Header with Live Counter & Status Badge - 3 column layout */}
      <div className="flex items-center justify-between mb-4">
        {/* Left - Title */}
        <div>
          <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
            Zero Downtime Migration
          </h3>
          <p className={`text-sm ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'}`}>
            {statusMessages[cutoverState]}
          </p>
        </div>
        
        {/* Center - Status Badge & Progress */}
        <div className="flex items-center gap-3">
          <motion.div
            className={`px-4 py-2 rounded-full text-sm font-bold transition-colors duration-500 ${
              isComplete ? 'bg-elastic-teal/20 text-elastic-teal' :
              cutoverState === 'stopping' ? 'bg-red-500/20 text-red-400' :
              isCutting ? 'bg-yellow-500/20 text-yellow-400' :
              'bg-elastic-blue/20 text-elastic-blue'
            }`}
            animate={isCutting ? { scale: [1, 1.02, 1] } : {}}
            transition={{ duration: 1.2, repeat: isCutting ? Infinity : 0, ease: "easeInOut" }}
          >
            {badgeContent[cutoverState]}
          </motion.div>
          
          {/* Progress Bar during cutover */}
          {isCutting && (
            <motion.div 
              className="w-32 h-2 bg-white/10 rounded-full overflow-hidden"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <motion.div 
                className="h-full bg-gradient-to-r from-elastic-pink to-elastic-teal rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${cutoverProgress}%` }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
            </motion.div>
          )}
        </div>
      </div>

      {/* Main Architecture - Horizontal Flow Layout - Centered */}
      <div className="flex items-stretch justify-center gap-6 mb-6 relative" style={{ minHeight: '160px' }}>
        
        {/* Data Sources - Vertical List */}
        <motion.div
          className={`flex-shrink-0 px-4 py-3 rounded-2xl border-2 border-elastic-blue/50 ${isDark ? 'bg-elastic-blue/10' : 'bg-elastic-blue/20'}`}
          style={{ minWidth: '140px' }}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <FontAwesomeIcon icon={faServer} className="text-elastic-blue" />
            <span className="text-elastic-blue font-bold text-sm">Data Sources</span>
          </div>
          <div className="space-y-1">
            {dataSources.slice(0, 5).map((source, i) => (
              <motion.div
                key={source.name}
                className={`flex items-center gap-2 px-2 py-1 rounded text-xs ${isDark ? 'bg-white/[0.05]' : 'bg-white/60'}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 + i * 0.05 }}
              >
                <motion.div 
                  className="w-2 h-2 rounded-full flex-shrink-0" 
                  style={{ backgroundColor: source.color }}
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ delay: i * 0.1, duration: 1, repeat: Infinity, repeatDelay: 2 }}
                />
                <span className={isDark ? 'text-white/70' : 'text-elastic-dev-blue/70'}>{source.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Arrow: Sources → Shippers */}
        <div className="flex-shrink-0 relative self-center -mx-5">
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-elastic-blue to-elastic-teal rounded"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3 }}
          />
          <motion.div 
            className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-l-6 border-l-elastic-teal border-y-3 border-y-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          />
          {/* Particles flowing on this connection - SLOWER */}
          <AnimatePresence>
            {particles.slice(-2).map((p, i) => (
              <motion.div
                key={`src-ship-${p.id}`}
                className="absolute w-2 h-2 rounded-full bg-elastic-teal top-1/2 -translate-y-1/2"
                initial={{ left: 0, opacity: 0 }}
                animate={{ left: '100%', opacity: [0, 1, 1, 0] }}
                transition={{ duration: 1.5, delay: i * 0.4 }}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Shippers - Central Hub */}
        <motion.div
          className={`flex-shrink-0 px-5 py-4 rounded-2xl border-2 border-elastic-teal/60 self-stretch flex flex-col ${isDark ? 'bg-elastic-teal/15' : 'bg-elastic-teal/25'}`}
          style={{ minWidth: '150px' }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-elastic-teal font-bold text-center text-sm mb-3">Shippers</div>
          <div className="space-y-2 flex-1 flex flex-col justify-center">
            {shippers.map((shipper, index) => (
              <motion.div
                key={shipper.name}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-2 ${isDark ? 'bg-white/[0.08]' : 'bg-white/70'}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <motion.div 
                  className="w-2.5 h-2.5 rounded-full" 
                  style={{ backgroundColor: shipper.color }}
                  animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
                  transition={{ duration: 1, repeat: Infinity, delay: index * 0.3 }}
                />
                <span className={`text-xs font-medium ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>{shipper.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Dual Output Section - Legacy (top) and Elastic (bottom) + Success Message */}
        <div className="flex gap-4 self-stretch -ml-4">
          <div className="flex flex-col gap-3 relative self-stretch" style={{ minWidth: '280px', maxWidth: '320px' }}>
          
          {/* Connection Lines Container */}
          <div className="absolute left-0 top-0 bottom-0 w-20 pointer-events-none">
            {/* Line to Legacy - color matches cutover state */}
            <motion.div 
              className={`absolute left-0 top-[25%] w-full h-0.5 rounded transition-colors duration-500 ${
                isComplete ? 'bg-gray-500/30' : 
                cutoverState === 'stopping' ? 'bg-red-500/80' :
                cutoverState === 'validating' ? 'bg-yellow-500/80' :
                'bg-orange-500/60'
              }`}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1, opacity: isComplete ? 0.3 : 1 }}
              style={{ transformOrigin: 'left' }}
              transition={{ delay: 0.5 }}
            />
            {/* Line to Elastic */}
            <motion.div 
              className="absolute left-0 top-[75%] w-full h-1 bg-gradient-to-r from-elastic-teal to-elastic-teal rounded"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              style={{ transformOrigin: 'left' }}
              transition={{ delay: 0.5 }}
            />
            
            {/* Particles to Legacy - color matches cutover state */}
            <AnimatePresence>
              {isLegacyReceiving && particles.slice(-2).map((p, i) => (
                <motion.div
                  key={`to-legacy-${p.id}`}
                  className={`absolute w-2 h-2 rounded-full top-[25%] -translate-y-1/2 ${
                    cutoverState === 'stopping' ? 'bg-red-500' :
                    cutoverState === 'validating' ? 'bg-yellow-500' :
                    'bg-orange-400'
                  }`}
                  initial={{ left: -10, opacity: 0 }}
                  animate={{ left: '110%', opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 1.8, delay: i * 0.5 }}
                />
              ))}
            </AnimatePresence>
            
            {/* Particles to Elastic - SLOWER */}
            <AnimatePresence>
              {particles.slice(-2).map((p, i) => (
                <motion.div
                  key={`to-elastic-${p.id}`}
                  className="absolute w-2.5 h-2.5 rounded-full bg-elastic-teal top-[75%] -translate-y-1/2 shadow-sm shadow-elastic-teal/50"
                  initial={{ left: -10, opacity: 0 }}
                  animate={{ left: '110%', opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 2, delay: i * 0.4 }}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Legacy Environment */}
          <motion.div
            className="ml-[5.5rem] flex-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: isComplete ? 0.5 : 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            <div className={`relative h-full px-4 py-3 rounded-xl border-2 transition-all duration-700 ease-in-out flex items-center justify-center ${
              isComplete ? 'border-gray-500/30 bg-gray-500/10' : 
              cutoverState === 'stopping' ? 'border-red-500 bg-red-500/20' :
              cutoverState === 'validating' ? 'border-yellow-500/70 bg-yellow-500/10' :
              isCutting ? 'border-orange-500/70 bg-orange-500/15' :
              'border-orange-500/50 bg-orange-500/10'
            }`}>
              {/* Status overlay */}
              <AnimatePresence mode="wait">
                {(cutoverState === 'stopping' || cutoverState === 'validating' || isComplete) && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/40"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <motion.div 
                      className={`px-3 py-1.5 rounded font-bold text-xs transition-colors duration-500 ${
                        isComplete ? 'bg-gray-600 text-white' : 
                        cutoverState === 'stopping' ? 'bg-red-500 text-white' :
                        'bg-yellow-500 text-black'
                      }`}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      {isComplete && 'DISCONNECTED'}
                      {cutoverState === 'stopping' && '🛑 STOPPING WRITES'}
                      {cutoverState === 'validating' && '✓ WRITES STOPPED'}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <div className={`flex items-center gap-3 ${(cutoverState === 'stopping' || cutoverState === 'validating' || isComplete) ? 'opacity-30' : ''}`}>
                <FontAwesomeIcon icon={faDatabase} className={`text-lg ${isComplete ? 'text-gray-500' : 'text-orange-500'}`} />
                <div>
                  <div className={`font-bold text-sm ${isComplete ? 'text-gray-500' : 'text-orange-500'}`}>Legacy Environment</div>
                  <div className={`text-xs ${isDark ? 'text-white/40' : 'text-elastic-dev-blue/40'}`}>
                    {isComplete ? 'Deprecated' : isLegacyReceiving ? 'Receiving data' : 'Stopping...'}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Elastic Environment - NO SCALE ANIMATION */}
          <motion.div
            className="ml-[5.5rem] flex-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            <div className={`h-full px-4 py-3 rounded-xl border-2 transition-all duration-700 ease-in-out flex flex-col items-center justify-center gap-2 ${
              isComplete ? 'border-elastic-teal bg-elastic-teal/20 shadow-md shadow-elastic-teal/10' :
              cutoverState === 'validating' ? 'border-elastic-teal bg-elastic-teal/15' :
              'border-elastic-teal/50 bg-elastic-teal/10'
            }`}>
              <div className="flex items-center gap-2">
                <img 
                  src="/logo-elastic-glyph-color.png" 
                  alt="Elastic" 
                  className="w-12 h-12 object-contain"
                />
                <div>
                  <div className="text-elastic-teal font-bold text-sm">Elastic</div>
                  <div className={`text-xs ${isDark ? 'text-white/60' : 'text-elastic-dev-blue/60'}`}>
                    {isComplete ? 'All traffic' : 'Receiving data'}
                  </div>
                </div>
              </div>
              {/* Status badges - below content */}
              {cutoverState === 'validating' && (
                <motion.div
                  className="flex items-center gap-1 text-yellow-400 text-xs bg-yellow-500/20 px-2 py-1 rounded"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: [1, 0.7, 1], scale: 1 }}
                  transition={{ opacity: { duration: 0.8, repeat: Infinity } }}
                >
                  <FontAwesomeIcon icon={faCheckCircle} />
                  <span>Validating...</span>
                </motion.div>
              )}
              {isComplete && (
                <motion.div
                  className="flex items-center gap-1 text-elastic-teal text-xs bg-elastic-teal/20 px-2 py-1 rounded"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <FontAwesomeIcon icon={faCheckCircle} />
                  <span>Cutover Complete</span>
                </motion.div>
              )}
            </div>
          </motion.div>
          </div>

          {/* Success Message - Right of Environments */}
          <AnimatePresence>
            {isComplete && (
              <motion.div
                className="flex-shrink-0 p-4 rounded-xl bg-elastic-teal/20 border border-elastic-teal/40 self-stretch flex flex-col justify-center"
                style={{ minWidth: '200px' }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-elastic-teal/30 flex items-center justify-center">
                    <FontAwesomeIcon icon={faCheckCircle} className="text-2xl text-elastic-teal" />
                  </div>
                  <div>
                    <div className={`font-bold ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
                      Zero Downtime
                    </div>
                    <div className={`font-bold ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
                      Zero Data Loss
                    </div>
                  </div>
                  <div className="text-elastic-teal text-sm font-bold">
                    100% Success
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="grid grid-cols-4 gap-4">
        {/* Cutover Button */}
        <button
          type="button"
          onClick={() => isComplete ? handleReset() : handleCutover()}
          disabled={isCutting}
          className={`col-span-1 p-4 rounded-xl font-bold text-center transition-all cursor-pointer ${
            isComplete 
              ? 'bg-white/10 hover:bg-white/20 text-white' 
              : isCutting
              ? 'bg-gradient-to-r from-orange-500/30 to-red-500/30 text-orange-300 cursor-wait'
              : 'bg-gradient-to-r from-elastic-pink to-elastic-blue text-white hover:shadow-lg hover:shadow-elastic-pink/30 hover:scale-[1.02] active:scale-[0.98]'
          }`}
        >
          {isComplete ? (
            'Reset Demo'
          ) : cutoverState === 'preparing' ? (
            <span className="animate-pulse">Preparing...</span>
          ) : cutoverState === 'stopping' ? (
            <span className="animate-pulse">Stopping Legacy...</span>
          ) : cutoverState === 'validating' ? (
            <span className="animate-pulse">Validating...</span>
          ) : (
            <>
              <FontAwesomeIcon icon={faBolt} className="mr-2" />
              Execute Cutover
            </>
          )}
        </button>

        {/* Key Points */}
        {[
          { icon: faShieldHalved, title: 'Parallel Running', desc: 'Both systems validated', active: cutoverState === 'parallel' },
          { icon: faClock, title: 'Instant Rollback', desc: 'Switch back anytime', active: !isComplete },
          { icon: faCheckCircle, title: 'Continuous Flow', desc: 'No interruptions', active: true },
        ].map((point, index) => (
          <motion.div
            key={index}
            className={`p-3 rounded-xl transition-all ${
              point.active 
                ? isDark ? 'bg-white/[0.05]' : 'bg-elastic-dev-blue/5'
                : 'opacity-40'
            }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + index * 0.1 }}
          >
            <div className="flex items-center gap-3">
              <FontAwesomeIcon icon={point.icon} className={`text-lg ${point.active ? 'text-elastic-teal' : 'text-gray-500'}`} />
              <div>
                <div className={`text-sm font-bold ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>{point.title}</div>
                <div className={`text-xs ${isDark ? 'text-white/40' : 'text-elastic-dev-blue/40'}`}>{point.desc}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

// Animated counter component
function AnimatedCounter({ value, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0)
  const numericValue = parseInt(value) || 0

  useEffect(() => {
    let start = 0
    const increment = numericValue / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= numericValue) {
        setCount(numericValue)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [numericValue, duration])

  return <span>{count}{suffix}</span>
}

function ServicesScene() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [mode, setMode] = useState('diy') // 'diy', 'elastic', 'approach', 'comparison'
  const [activePhase, setActivePhase] = useState(1)

  // Auto-advance journey continuously
  useEffect(() => {
    if (mode !== 'elastic') return
    const timer = setInterval(() => {
      setActivePhase(prev => (prev + 1) % journeyPhases.length)
    }, 2000)
    return () => clearInterval(timer)
  }, [mode])

  return (
    <div className="scene !py-2">
      <div className="max-w-[98%] mx-auto w-full h-full flex flex-col">
        {/* Header */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className={`text-eyebrow text-sm ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
            Your Path to Success
          </span>
          <h2 className={`text-headline text-3xl md:text-4xl font-extrabold mt-2 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            <span className="gradient-text">Transform Faster</span> with Expert Guidance
          </h2>
          
          {/* Mode Toggle */}
          <div className="mt-4 flex items-center justify-center gap-2">
            <button
              onClick={() => setMode('diy')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                mode === 'diy'
                  ? 'bg-orange-500 text-white'
                  : isDark ? 'bg-white/10 text-white/60 hover:bg-white/20' : 'bg-elastic-dev-blue/10 text-elastic-dev-blue/60'
              }`}
            >
              DIY Migration
            </button>
            <button
              onClick={() => setMode('elastic')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                mode === 'elastic'
                  ? 'bg-elastic-teal text-elastic-dev-blue'
                  : isDark ? 'bg-white/10 text-white/60 hover:bg-white/20' : 'bg-elastic-dev-blue/10 text-elastic-dev-blue/60'
              }`}
            >
              With Elastic Services
            </button>
            <button
              onClick={() => setMode('approach')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                mode === 'approach'
                  ? 'bg-elastic-pink text-white'
                  : isDark ? 'bg-white/10 text-white/60 hover:bg-white/20' : 'bg-elastic-dev-blue/10 text-elastic-dev-blue/60'
              }`}
            >
              Zero Downtime
            </button>
            <button
              onClick={() => setMode('comparison')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                mode === 'comparison'
                  ? 'bg-elastic-teal text-elastic-dev-blue'
                  : isDark ? 'bg-white/10 text-white/60 hover:bg-white/20' : 'bg-elastic-dev-blue/10 text-elastic-dev-blue/60'
              }`}
            >
              Compare
            </button>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-0">
          <AnimatePresence mode="wait">
            {/* Comparison View */}
            {mode === 'comparison' && (
              <motion.div
                key="comparison"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex gap-6"
              >
                {/* DIY Side */}
                <div className={`flex-1 rounded-2xl border-2 border-orange-500/30 overflow-hidden ${isDark ? 'bg-orange-500/5' : 'bg-orange-500/10'}`}>
                  <div className="p-4 border-b border-orange-500/20 bg-orange-500/10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                          <FontAwesomeIcon icon={faPersonDigging} className="text-orange-500" />
                        </div>
                        <div>
                          <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>DIY Migration</h3>
                          <p className="text-sm text-orange-400">Going it alone</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-black text-orange-500">18+</div>
                        <div className={`text-xs ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'}`}>months</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 space-y-3">
                    {diyPainPoints.map((point, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-3 rounded-xl flex items-start gap-3 ${isDark ? 'bg-white/[0.03]' : 'bg-white/60'}`}
                      >
                        <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                          <FontAwesomeIcon icon={point.icon} className="text-orange-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className={`font-bold ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>{point.title}</span>
                            <span className="text-xs text-orange-400">{point.subtitle}</span>
                          </div>
                          <p className={`text-sm ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'}`}>{point.desc}</p>
                        </div>
                        <FontAwesomeIcon icon={faXmark} className="text-orange-500/50 mt-1" />
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Risk Indicator */}
                  <div className="p-4 border-t border-orange-500/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-sm ${isDark ? 'text-white/60' : 'text-elastic-dev-blue/60'}`}>Risk Level</span>
                      <span className="text-sm font-bold text-orange-500">HIGH</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500"
                        initial={{ width: 0 }}
                        animate={{ width: '85%' }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                  </div>
                </div>

                {/* VS Divider */}
                <div className="flex flex-col items-center justify-center">
                  <div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center font-black text-xl ${isDark ? 'border-white/20 text-white/40' : 'border-elastic-dev-blue/20 text-elastic-dev-blue/40'}`}>
                    VS
                  </div>
                </div>

                {/* Elastic Services Side */}
                <div className={`flex-1 rounded-2xl border-2 border-elastic-teal/30 overflow-hidden ${isDark ? 'bg-elastic-teal/5' : 'bg-elastic-teal/10'}`}>
                  <div className="p-4 border-b border-elastic-teal/20 bg-elastic-teal/10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-elastic-teal/20 flex items-center justify-center">
                          <FontAwesomeIcon icon={faRocket} className="text-elastic-teal" />
                        </div>
                        <div>
                          <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>With Elastic Services</h3>
                          <p className="text-sm text-elastic-teal">Expert-led transformation</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-black text-elastic-teal">4-7</div>
                        <div className={`text-xs ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'}`}>months</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 space-y-3">
                    {elasticBenefits.map((benefit, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-3 rounded-xl flex items-start gap-3 ${isDark ? 'bg-white/[0.03]' : 'bg-white/60'}`}
                      >
                        <div className="w-10 h-10 rounded-lg bg-elastic-teal/20 flex items-center justify-center flex-shrink-0">
                          <FontAwesomeIcon icon={benefit.icon} className="text-elastic-teal" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className={`font-bold ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>{benefit.title}</span>
                            <span className="text-xs text-elastic-teal">{benefit.subtitle}</span>
                          </div>
                          <p className={`text-sm ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'}`}>{benefit.desc}</p>
                        </div>
                        <FontAwesomeIcon icon={faCheck} className="text-elastic-teal mt-1" />
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Success Indicator */}
                  <div className="p-4 border-t border-elastic-teal/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-sm ${isDark ? 'text-white/60' : 'text-elastic-dev-blue/60'}`}>Success Rate</span>
                      <span className="text-sm font-bold text-elastic-teal">98%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-elastic-teal to-elastic-blue"
                        initial={{ width: 0 }}
                        animate={{ width: '98%' }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* DIY Deep Dive */}
            {mode === 'diy' && (
              <motion.div
                key="diy"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`flex-1 rounded-2xl border-2 border-orange-500/30 p-6 ${isDark ? 'bg-orange-500/5' : 'bg-orange-500/10'}`}
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
                      The Reality of DIY Migration
                    </h3>
                    <p className="text-orange-400">Common challenges organizations face going alone</p>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-black text-orange-500">
                      <AnimatedCounter value={18} suffix="+" />
                    </div>
                    <div className={`text-sm ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'}`}>months average</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {/* Timeline chaos visualization */}
                  <div className={`p-5 rounded-xl ${isDark ? 'bg-white/[0.03]' : 'bg-white/60'}`}>
                    <h4 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>Typical DIY Timeline</h4>
                    <div className="space-y-3">
                      {['Planning & Research', 'Infrastructure Setup', 'Data Migration', 'Troubleshooting', 'Testing & Validation', 'More Troubleshooting', 'Production Cutover'].map((phase, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                            i < 4 ? 'bg-orange-500/20 text-orange-500' : 'bg-red-500/20 text-red-500'
                          }`}>
                            {i + 1}
                          </div>
                          <div className="flex-1 h-2 rounded-full bg-white/10">
                            <motion.div 
                              className={`h-full rounded-full ${i < 4 ? 'bg-orange-500/50' : 'bg-red-500/50'}`}
                              initial={{ width: 0 }}
                              animate={{ width: `${Math.random() * 40 + 60}%` }}
                              transition={{ duration: 0.5, delay: i * 0.1 }}
                            />
                          </div>
                          <span className={`text-sm ${isDark ? 'text-white/60' : 'text-elastic-dev-blue/60'}`}>{phase}</span>
                        </div>
                      ))}
                    </div>
                    <p className={`mt-4 text-sm italic ${isDark ? 'text-white/40' : 'text-elastic-dev-blue/40'}`}>
                      * Actual timelines vary. Usually longer.
                    </p>
                  </div>

                  {/* Hidden costs */}
                  <div className={`p-5 rounded-xl ${isDark ? 'bg-white/[0.03]' : 'bg-white/60'}`}>
                    <h4 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>Hidden Costs</h4>
                    <div className="space-y-4">
                      {[
                        { label: 'Opportunity cost of delayed insights', impact: 'HIGH' },
                        { label: 'Engineer time diverted from impactful work', impact: 'HIGH' },
                        { label: 'Production incidents during migration', impact: 'MEDIUM' },
                        { label: 'Vendor support for edge cases', impact: 'MEDIUM' },
                        { label: 'Re-work from initial mistakes', impact: 'HIGH' },
                      ].map((cost, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <span className={`text-sm ${isDark ? 'text-white/70' : 'text-elastic-dev-blue/70'}`}>{cost.label}</span>
                          <span className={`text-xs font-bold px-2 py-1 rounded ${
                            cost.impact === 'HIGH' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'
                          }`}>{cost.impact}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </motion.div>
            )}

            {/* Zero Downtime Approach - Interactive */}
            {mode === 'approach' && (
              <ZeroDowntimeDemo isDark={isDark} />
            )}

            {/* Elastic Services Deep Dive */}
            {mode === 'elastic' && (
              <motion.div
                key="elastic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col gap-4"
              >
                {/* Hero Stats */}
                <div className="grid grid-cols-4 gap-4">
                  {[
                    { value: '90', suffix: '%', label: 'Data sources migrated in 6 weeks', color: '#48EFCF' },
                    { value: '0', suffix: '', label: 'Downtime during transition', color: '#F04E98' },
                    { value: '4-7', suffix: '', label: 'Month typical timeline', color: '#0B64DD', noAnimate: true },
                    { value: '24', suffix: '/7', label: 'Global support coverage', color: '#FEC514' },
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-4 rounded-xl text-center ${isDark ? 'bg-white/[0.03]' : 'bg-white/60'}`}
                    >
                      <div className="text-4xl font-black" style={{ color: stat.color }}>
                        {stat.noAnimate ? `${stat.value}${stat.suffix}` : <AnimatedCounter value={stat.value} suffix={stat.suffix} />}
                      </div>
                      <div className={`text-sm mt-1 ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'}`}>
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Service Pillars */}
                <div className="grid grid-cols-3 gap-4">
                  {servicePillars.map((pillar, index) => (
                    <motion.div
                      key={pillar.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className={`p-5 rounded-xl border-2 ${isDark ? 'bg-white/[0.02]' : 'bg-white/60'}`}
                      style={{ borderColor: `${pillar.color}40` }}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: `${pillar.color}20` }}
                        >
                          <FontAwesomeIcon icon={pillar.icon} className="text-xl" style={{ color: pillar.color }} />
                        </div>
                        <h4 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
                          {pillar.name}
                        </h4>
                      </div>
                      <div className="space-y-2">
                        {pillar.items.map((item, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <FontAwesomeIcon icon={faCheck} style={{ color: pillar.color }} className="text-sm" />
                            <span className={`text-sm ${isDark ? 'text-white/70' : 'text-elastic-dev-blue/70'}`}>{item}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Journey Timeline */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className={`p-5 rounded-xl ${isDark ? 'bg-white/[0.02]' : 'bg-white/60'}`}
                >
                  <div className="mb-4">
                    <h4 className={`font-bold ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
                      Your Transformation Journey
                    </h4>
                    <p className={`text-sm ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'}`}>
                      Proven methodology from discovery to ongoing partnership
                    </p>
                  </div>

                  {/* Timeline */}
                  <div className="relative">
                    <div className={`absolute top-5 left-0 right-0 h-1 rounded-full ${isDark ? 'bg-white/10' : 'bg-elastic-dev-blue/10'}`} />
                    <motion.div
                      className="absolute top-5 left-0 h-1 rounded-full bg-gradient-to-r from-elastic-teal via-elastic-pink to-elastic-blue"
                      animate={{ width: `${(activePhase / (journeyPhases.length - 1)) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                    <div className="relative flex justify-between">
                      {journeyPhases.map((phase, index) => {
                        const isActive = index === activePhase
                        const isPast = index < activePhase
                        return (
                          <button
                            key={index}
                            onClick={() => setActivePhase(index)}
                            className="flex flex-col items-center"
                          >
                            <motion.div
                              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                                isActive || isPast ? 'border-transparent' : isDark ? 'border-white/20 bg-elastic-dev-blue' : 'border-elastic-dev-blue/20 bg-white'
                              }`}
                              style={{
                                backgroundColor: isActive || isPast ? phase.color : undefined,
                                boxShadow: isActive ? `0 0 20px ${phase.color}60` : undefined
                              }}
                              animate={isActive ? { scale: [1, 1.15, 1] } : {}}
                              transition={{ duration: 0.6, repeat: isActive ? Infinity : 0 }}
                            >
                              <FontAwesomeIcon 
                                icon={isPast && !isActive ? faCheck : phase.icon} 
                                className={`text-sm ${isActive || isPast ? 'text-white' : isDark ? 'text-white/40' : 'text-elastic-dev-blue/40'}`}
                              />
                            </motion.div>
                            <div className={`mt-2 text-center ${isActive ? '' : 'opacity-50'}`}>
                              <div className={`text-xs font-bold ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`} style={{ color: isActive ? phase.color : undefined }}>
                                {phase.name}
                              </div>
                              <div className={`text-[10px] max-w-[80px] ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'}`}>
                                {phase.desc}
                              </div>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default ServicesScene

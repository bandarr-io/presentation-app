import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useCallback, useMemo } from 'react'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faDatabase, faMagnifyingGlass, faMemory, faHardDrive, faBolt, 
  faCircleNodes, faWarehouse, faWater, faCopy, faGlobe,
  faArrowRight, faCheck, faTimes, faDollarSign, faClock, 
  faSnowflake, faChevronRight, faChevronLeft, faPlay,
  faRotateRight, faLayerGroup
} from '@fortawesome/free-solid-svg-icons'

// Story stages
const stages = [
  { id: 'question', label: 'The Question' },
  { id: 'dilemma', label: 'The Dilemma' },
  { id: 'workarounds', label: 'The Workarounds' },
  { id: 'transformation', label: 'The Solution' },
]

// Floating data particle component
function DataParticle({ id, initialX, initialY, color, trapped = false, meshMode = false, delay = 0 }) {
  const size = 6 + Math.random() * 4
  
  if (meshMode) {
    // In mesh mode, particles flow freely across the visualization
    return (
      <motion.div
        className="absolute rounded-full"
        style={{ 
          width: size, 
          height: size, 
          backgroundColor: color,
          left: `${initialX}%`,
          top: `${initialY}%`,
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: [0, 0.8, 0.8, 0],
          scale: [0.5, 1, 1, 0.5],
          x: [0, (Math.random() - 0.5) * 300],
          y: [0, (Math.random() - 0.5) * 200],
        }}
        transition={{
          duration: 10 + Math.random() * 4,
          delay: delay,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    )
  }
  
  if (trapped) {
    // Trapped particles bounce against walls
    return (
      <motion.div
        className="absolute rounded-full"
        style={{ 
          width: size, 
          height: size, 
          backgroundColor: color,
          left: `${initialX}%`,
          top: `${initialY}%`,
        }}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 0.6,
          x: [0, 20, -10, 15, 0],
          y: [0, -10, 20, -15, 0],
        }}
        transition={{
          duration: 5 + Math.random() * 2,
          delay: delay,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    )
  }
  
  // Default floating animation
  return (
    <motion.div
      className="absolute rounded-full"
      style={{ 
        width: size, 
        height: size, 
        backgroundColor: color,
        left: `${initialX}%`,
        top: `${initialY}%`,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: [0, 0.7, 0.7, 0],
        scale: [0, 1, 1, 0],
        y: [0, -30 - Math.random() * 50],
      }}
      transition={{
        duration: 7 + Math.random() * 4,
        delay: delay,
        repeat: Infinity,
        ease: 'easeOut',
      }}
    />
  )
}

// Architecture data with problems
const architectureData = {
  catalog: {
    label: 'Metadata Catalog',
    subtitle: 'The Dewey Decimal approach',
    color: '#FEC514',
    icon: faLayerGroup,
    problems: [
      'Only stores pointers, not data',
      'Can\'t actually query the data',
      'Requires manual discovery',
      'No unified access layer',
    ]
  },
  federation: {
    label: 'Federated Search',
    subtitle: 'Query translator',
    color: '#0B64DD',
    icon: faCopy,
    problems: [
      'Bridges incompatible systems',
      'Slow cross-system queries',
      'Inconsistent results',
      'No unified schema',
    ]
  },
  lake: {
    label: 'Data Lake',
    subtitle: 'Store everything raw',
    color: '#48EFCF',
    icon: faWater,
    problems: [
      'Data goes in, rarely comes out',
      'Only data scientists can use it',
      'Requires ETL to be useful',
      'Becomes a data swamp',
    ]
  },
  warehouse: {
    label: 'Data Warehouse',
    subtitle: 'Rigid structured storage',
    color: '#F04E98',
    icon: faWarehouse,
    problems: [
      'Rigid schema limits flexibility',
      'Expensive to scale',
      'Slow for real-time queries',
      'Can\'t handle all data types',
    ]
  }
}

// Large architecture card component
function ArchitectureCard({ type, isSelected, isOther, onClick, delay = 0 }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const data = architectureData[type]
  
  // Render architecture diagram (larger version)
  const renderArchitecture = () => {
    switch (type) {
      case 'catalog':
        return (
          <div className="flex flex-col items-center gap-2">
            <div className="flex gap-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-6 h-6 rounded" style={{ backgroundColor: `${data.color}40` }} />
              ))}
            </div>
            <div className="text-sm" style={{ color: data.color }}>↓ ↓ ↓</div>
            <div className="w-16 h-10 rounded-lg border-2 flex items-center justify-center" style={{ borderColor: data.color }}>
              <FontAwesomeIcon icon={faLayerGroup} className="text-xl" style={{ color: data.color }} />
            </div>
            <div className="text-sm opacity-50" style={{ color: data.color }}>· · · · ·</div>
            <div className={`text-lg ${isDark ? 'text-white/30' : 'text-elastic-dev-blue/30'}`}>?</div>
          </div>
        )
      
      case 'federation':
        return (
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-6 rounded flex items-center justify-center" style={{ backgroundColor: `${data.color}30` }}>
              <FontAwesomeIcon icon={faMagnifyingGlass} className="text-sm" style={{ color: data.color }} />
            </div>
            <div className="text-sm" style={{ color: data.color }}>↓</div>
            <div className="w-20 h-8 rounded-lg border-2 flex items-center justify-center text-lg" style={{ borderColor: data.color, color: data.color }}>
              ⟷
            </div>
            <div className="flex gap-2 mt-1">
              <div className="w-5 h-8 rounded bg-red-500/40" />
              <div className="w-5 h-8 rounded bg-blue-500/40" />
              <div className="w-5 h-8 rounded bg-green-500/40" />
            </div>
          </div>
        )
      
      case 'lake':
        return (
          <div className="flex flex-col items-center gap-2">
            <div className="flex gap-2">
              <div className="text-sm" style={{ color: data.color }}>↘</div>
              <div className="text-sm" style={{ color: data.color }}>↓</div>
              <div className="text-sm" style={{ color: data.color }}>↙</div>
            </div>
            <div className="w-24 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${data.color}20`, border: `2px solid ${data.color}40` }}>
              <FontAwesomeIcon icon={faWater} className="text-2xl" style={{ color: data.color }} />
            </div>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-2 h-2 rounded-full" style={{ backgroundColor: data.color }} />
              ))}
            </div>
          </div>
        )
      
      case 'warehouse':
        return (
          <div className="flex flex-col items-center gap-2">
            <div className="text-sm font-mono" style={{ color: data.color }}>ETL</div>
            <div className="text-sm" style={{ color: data.color }}>↓</div>
            <div className="w-20 h-16 rounded-lg border-2 flex flex-col items-center justify-center gap-1 p-2" style={{ borderColor: data.color }}>
              {[1, 2, 3].map((row) => (
                <div key={row} className="flex gap-1">
                  <div className="w-4 h-2 rounded-sm" style={{ backgroundColor: `${data.color}${row % 2 ? '60' : '40'}` }} />
                  <div className="w-4 h-2 rounded-sm" style={{ backgroundColor: `${data.color}${row % 2 ? '40' : '60'}` }} />
                  <div className="w-4 h-2 rounded-sm" style={{ backgroundColor: `${data.color}${row % 2 ? '60' : '40'}` }} />
                </div>
              ))}
            </div>
          </div>
        )
      
      default:
        return null
    }
  }
  
  return (
    <motion.div
      className={`rounded-2xl border-2 flex flex-col items-center justify-between p-4 cursor-pointer ${
        isDark ? 'bg-white/[0.03]' : 'bg-white/50'
      } ${isSelected ? 'ring-2 ring-offset-2 ring-offset-transparent' : ''}`}
      style={{ 
        borderColor: isSelected ? data.color : `${data.color}40`,
        ringColor: data.color,
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isOther ? 0.4 : 1, y: 0 }}
      transition={{ 
        type: 'spring',
        stiffness: 300,
        damping: 30,
        delay
      }}
      onClick={onClick}
      whileHover={{ scale: isOther ? 1 : 1.02, borderColor: data.color }}
    >
      {/* Architecture diagram */}
      <div className="flex-1 flex items-center justify-center py-4">
        {renderArchitecture()}
      </div>
      {/* Label */}
      <div className="text-center">
        <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
          {data.label}
        </p>
        <p className={`text-xs ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'}`}>
          {data.subtitle}
        </p>
      </div>
    </motion.div>
  )
}

// Problems panel component
function ProblemsPanel({ type }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const data = architectureData[type]
  
  return (
    <motion.div
      className={`rounded-2xl border-2 p-6 ${isDark ? 'bg-white/[0.02]' : 'bg-white/70'}`}
      style={{ borderColor: `${data.color}40` }}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${data.color}20` }}>
          <FontAwesomeIcon icon={data.icon} style={{ color: data.color }} />
        </div>
        <div>
          <h3 className={`font-bold ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
            {data.label}
          </h3>
          <p className={`text-xs ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'}`}>
            Why it falls short
          </p>
        </div>
      </div>
      
      <div className="space-y-3">
        {data.problems.map((problem, i) => (
          <motion.div
            key={i}
            className={`flex items-start gap-2 p-2 rounded-lg ${isDark ? 'bg-red-500/10' : 'bg-red-50'}`}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.1 }}
          >
            <FontAwesomeIcon icon={faTimes} className="text-red-400 mt-0.5 text-sm" />
            <span className={`text-sm ${isDark ? 'text-white/70' : 'text-elastic-dev-blue/70'}`}>
              {problem}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

// Connection line for mesh visualization
function MeshConnection({ x1, y1, x2, y2, color, delay = 0, active = false }) {
  return (
    <motion.line
      x1={`${x1}%`}
      y1={`${y1}%`}
      x2={`${x2}%`}
      y2={`${y2}%`}
      stroke={color}
      strokeWidth={active ? 3 : 1.5}
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ 
        pathLength: 1, 
        opacity: active ? 0.8 : 0.3,
      }}
      transition={{ duration: 0.8, delay }}
    />
  )
}

// Mesh node component
function MeshNode({ x, y, label, color, delay = 0, isCenter = false, isActive = false }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const size = isCenter ? 60 : 40
  
  return (
    <motion.div
      className="absolute flex flex-col items-center"
      style={{ 
        left: `${x}%`, 
        top: `${y}%`,
        transform: 'translate(-50%, -50%)'
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', delay }}
    >
      <motion.div
        className={`rounded-full flex items-center justify-center border-2 ${
          isCenter 
            ? 'bg-gradient-to-br from-elastic-teal/30 to-elastic-blue/30' 
            : isDark ? 'bg-white/[0.05]' : 'bg-white/80'
        }`}
        style={{ 
          width: size, 
          height: size, 
          borderColor: isActive ? color : `${color}60`,
          boxShadow: isActive ? `0 0 20px ${color}40` : 'none'
        }}
        animate={isActive ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 0.5, repeat: isActive ? Infinity : 0, repeatDelay: 1 }}
      >
        {isCenter ? (
          <FontAwesomeIcon icon={faMagnifyingGlass} className="text-elastic-teal text-lg" />
        ) : (
          <FontAwesomeIcon icon={faDatabase} style={{ color }} className="text-sm" />
        )}
      </motion.div>
      <span className={`text-xs mt-1 font-medium ${isDark ? 'text-white/60' : 'text-elastic-dev-blue/60'}`}>
        {label}
      </span>
    </motion.div>
  )
}

// Search bar with typing animation
function SearchBar({ text, isTyping, onShowAnswer, searchComplete, showCursor = true }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  
  return (
    <motion.div
      className={`relative flex items-center w-full max-w-3xl mx-auto px-6 py-4 rounded-full border-2 ${
        isDark 
          ? 'bg-white/[0.03] border-white/20' 
          : 'bg-white border-elastic-dev-blue/20'
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring' }}
    >
      {/* Text area with inline cursor */}
      <div className="flex-1 min-h-[32px] flex items-center">
        <span className={`text-xl md:text-2xl font-light ${
          isDark ? 'text-white' : 'text-elastic-dev-blue'
        }`}>
          {text}
        </span>
        {/* Blinking cursor after text */}
        {showCursor && (
          <motion.span
            className={`inline-block w-0.5 h-7 ml-0.5 ${isDark ? 'bg-white' : 'bg-elastic-dev-blue'}`}
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
          />
        )}
      </div>
      
      {/* Search icon / button - shows answer */}
      <motion.button
        onClick={onShowAnswer}
        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
          isTyping 
            ? 'bg-elastic-teal/20 text-elastic-teal cursor-not-allowed' 
            : searchComplete
              ? isDark 
                ? 'bg-elastic-teal/30 text-elastic-teal hover:bg-elastic-teal hover:text-white' 
                : 'bg-elastic-teal/20 text-elastic-teal hover:bg-elastic-teal hover:text-white'
              : isDark 
                ? 'bg-white/10 text-white/60 hover:bg-elastic-teal hover:text-white' 
                : 'bg-elastic-dev-blue/10 text-elastic-dev-blue/60 hover:bg-elastic-teal hover:text-white'
        }`}
        whileHover={!isTyping ? { scale: 1.1 } : {}}
        whileTap={!isTyping ? { scale: 0.95 } : {}}
        disabled={isTyping}
        title="Show answer"
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} className="text-xl" />
      </motion.button>
    </motion.div>
  )
}

function DataMeshScene() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [stage, setStage] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [meshActive, setMeshActive] = useState(false)
  const [queryActive, setQueryActive] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [searchComplete, setSearchComplete] = useState(false)
  const [selectedArchitecture, setSelectedArchitecture] = useState(null)
  const [showSummary, setShowSummary] = useState(false)

  // The question to type
  const questionText = "Why do we collect data?"

  // Generate particles for various visualizations
  const particleColors = ['#48EFCF', '#0B64DD', '#F04E98', '#FEC514', '#FF957D']
  
  // Memoize particle positions to prevent re-randomizing on re-render
  const backgroundParticles = useMemo(() => 
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: particleColors[i % particleColors.length],
      delay: i * 0.2
    })), []
  )
  
  // Typing animation
  const startTyping = useCallback(() => {
    if (isTyping || searchComplete) return
    
    setIsTyping(true)
    setSearchText('')
    let index = 0
    
    const typeInterval = setInterval(() => {
      if (index < questionText.length) {
        setSearchText(questionText.slice(0, index + 1))
        index++
      } else {
        clearInterval(typeInterval)
        setIsTyping(false)
        setSearchComplete(true)
        // Show answer after a longer pause for dramatic effect
        setTimeout(() => setShowAnswer(true), 2000)
      }
    }, 100) // Typing speed (slower)
    
    return () => clearInterval(typeInterval)
  }, [isTyping, searchComplete, questionText])

  // Handle stage transitions
  const nextStage = useCallback(() => {
    if (stage < stages.length - 1) {
      setStage(s => s + 1)
      setShowAnswer(false)
      setMeshActive(false)
      setQueryActive(false)
      setSearchText('')
      setSearchComplete(false)
      setIsTyping(false)
      setSelectedArchitecture(null)
    }
  }, [stage])

  const prevStage = useCallback(() => {
    if (stage > 0) {
      setStage(s => s - 1)
      setShowAnswer(false)
      setMeshActive(false)
      setQueryActive(false)
      setSearchText('')
      setSearchComplete(false)
      setIsTyping(false)
      setSelectedArchitecture(null)
    }
  }, [stage])

  const resetDemo = useCallback(() => {
    setStage(0)
    setShowAnswer(false)
    setMeshActive(false)
    setQueryActive(false)
    setSearchText('')
    setSearchComplete(false)
    setIsTyping(false)
    setSelectedArchitecture(null)
  }, [])

  // Run query animation
  const runQuery = useCallback(() => {
    setQueryActive(true)
    setTimeout(() => setQueryActive(false), 2000)
  }, [])

  return (
    <div className="scene !py-4">
      <div className="max-w-[98%] mx-auto w-full h-full flex flex-col">
        {/* Header with progress */}
        <motion.div
          className="text-center mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-elastic-blue text-sm font-mono uppercase tracking-widest">
            The Data Story
          </span>
          <h2 className={`text-3xl md:text-4xl font-bold mt-1 ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
            From Chaos to <span className="gradient-text">Data Mesh</span>
          </h2>
        </motion.div>

        {/* Stage Progress Indicator */}
        <div className="flex items-center justify-center gap-2 mb-4">
          {stages.map((s, i) => (
            <button
              key={s.id}
              onClick={() => {
                setStage(i)
                setShowAnswer(false)
                setMeshActive(false)
                setQueryActive(false)
              }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                i === stage
                  ? 'bg-elastic-teal text-white'
                  : i < stage
                    ? isDark ? 'bg-white/10 text-white/70' : 'bg-elastic-dev-blue/10 text-elastic-dev-blue/70'
                    : isDark ? 'bg-white/5 text-white/40' : 'bg-elastic-dev-blue/5 text-elastic-dev-blue/40'
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                i === stage ? 'bg-white/20' : i < stage ? 'bg-elastic-teal/30' : ''
              }`}>
                {i < stage ? <FontAwesomeIcon icon={faCheck} /> : i + 1}
              </span>
              <span className="hidden md:inline">{s.label}</span>
            </button>
          ))}
        </div>

        {/* Main Stage Content */}
        <div className="flex-1 relative overflow-hidden rounded-2xl border bg-gradient-to-br from-transparent to-white/[0.02] border-white/10 min-h-[520px]">
          <AnimatePresence mode="popLayout">
            
            {/* STAGE 1: The Question */}
            {stage === 0 && (
              <motion.div
                key="question"
                className="absolute inset-0 flex flex-col items-center justify-center p-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
              >
                {/* Background particles */}
                <div className="absolute inset-0 overflow-hidden">
                  {backgroundParticles.map((particle) => (
                    <DataParticle
                      key={particle.id}
                      id={particle.id}
                      initialX={particle.x}
                      initialY={particle.y}
                      color={particle.color}
                      delay={particle.delay}
                    />
                  ))}
                </div>

                {/* Search Bar and Content */}
                <div className="relative z-10 w-full max-w-4xl">
                  {/* Search Bar */}
                  <SearchBar 
                    text={searchText}
                    isTyping={isTyping}
                    searchComplete={searchComplete}
                    onShowAnswer={() => {
                      if (!showAnswer) {
                        // If typing hasn't completed, complete it instantly
                        if (!searchComplete) {
                          setSearchText(questionText)
                          setSearchComplete(true)
                        }
                        setShowAnswer(true)
                      }
                    }}
                    showCursor={!searchComplete}
                  />
                  
                  {/* Prompt to click */}
                  {!searchText && !isTyping && (
                    <motion.p
                      className={`text-center mt-4 text-sm ${isDark ? 'text-white/40' : 'text-elastic-dev-blue/40'}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0.4, 0.8, 0.4] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      Click play to type, or search to skip ahead...
                    </motion.p>
                  )}

                  {/* Answer Section */}
                  <AnimatePresence>
                    {showAnswer && (
                      <motion.div
                        className="text-center mt-12"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <motion.p
                          className="text-6xl md:text-8xl font-bold gradient-text mb-6"
                          initial={{ opacity: 0, scale: 0.5, y: 30 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ type: 'spring', stiffness: 200 }}
                        >
                          To use it.
                        </motion.p>
                        
                        <motion.p
                          className={`text-xl max-w-2xl mx-auto ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          Data is a strategic asset. We need to retrieve, connect, and act on it—
                          <span className="text-elastic-teal font-semibold"> fast</span>.
                        </motion.p>

                        <motion.div
                          className={`mt-8 p-4 rounded-xl border max-w-xl mx-auto ${
                            isDark ? 'bg-elastic-pink/10 border-elastic-pink/30' : 'bg-elastic-pink/5 border-elastic-pink/20'
                          }`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1 }}
                        >
                          <p className={`text-lg ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
                            But data is generated <span className="font-bold">everywhere</span>. 
                            How do you get total visibility—at speed, at scale, without breaking the bank?
                          </p>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {/* STAGE 2: The Dilemma */}
            {stage === 1 && (
              <motion.div
                key="dilemma"
                className="absolute inset-0 flex flex-col items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
              >
                <motion.p
                  className={`text-lg mb-4 text-center ${isDark ? 'text-white/70' : 'text-elastic-dev-blue/70'}`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  The industry faced a choice...
                </motion.p>

                <div className="flex items-stretch gap-6 max-w-4xl w-full">
                  {/* Search Side */}
                  <motion.div
                    className={`flex-1 rounded-2xl border-2 p-4 relative overflow-hidden ${
                      isDark ? 'bg-elastic-teal/5' : 'bg-elastic-teal/5'
                    }`}
                    style={{ borderColor: '#48EFCF' }}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-elastic-teal/20 flex items-center justify-center">
                        <FontAwesomeIcon icon={faMemory} className="text-elastic-teal text-lg" />
                      </div>
                      <div>
                        <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>Search</h3>
                        <p className="text-elastic-teal text-xs">Like memory</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {[
                        { icon: faBolt, text: 'Query instantly', good: true },
                        { icon: faMagnifyingGlass, text: 'Pivot & explore', good: true },
                        { icon: faClock, text: 'Milliseconds', good: true },
                        { icon: faDollarSign, text: '$4+ per GB', good: false },
                      ].map((item, i) => (
                        <motion.div
                          key={i}
                          className={`flex items-center justify-between px-2 py-1.5 rounded-lg ${
                            isDark ? 'bg-white/[0.05]' : 'bg-white/50'
                          }`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                        >
                          <div className="flex items-center gap-2">
                            <FontAwesomeIcon icon={item.icon} className="text-elastic-teal text-xs" />
                            <span className={`text-xs ${isDark ? 'text-white/80' : 'text-elastic-dev-blue/80'}`}>{item.text}</span>
                          </div>
                          <FontAwesomeIcon 
                            icon={item.good ? faCheck : faTimes} 
                            className={`text-xs ${item.good ? 'text-elastic-teal' : 'text-elastic-pink'}`}
                          />
                        </motion.div>
                      ))}
                    </div>

                    <motion.div
                      className="mt-3 text-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                    >
                      <span className={`text-xs italic ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'}`}>
                        Fast & flexible, but expensive
                      </span>
                    </motion.div>
                  </motion.div>

                  {/* VS Divider */}
                  <motion.div
                    className="flex flex-col items-center justify-center"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold ${
                      isDark ? 'bg-white/10 text-white' : 'bg-elastic-dev-blue/10 text-elastic-dev-blue'
                    }`}>
                      vs
                    </div>
                  </motion.div>

                  {/* Storage Side */}
                  <motion.div
                    className={`flex-1 rounded-2xl border-2 p-4 relative overflow-hidden ${
                      isDark ? 'bg-orange-500/5' : 'bg-orange-500/5'
                    }`}
                    style={{ borderColor: '#FF957D' }}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center">
                        <FontAwesomeIcon icon={faHardDrive} className="text-orange-400 text-lg" />
                      </div>
                      <div>
                        <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>Storage</h3>
                        <p className="text-orange-400 text-xs">Like disk</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {[
                        { icon: faLayerGroup, text: 'Batch scan only', good: false },
                        { icon: faClock, text: 'Rehydrate first', good: false },
                        { icon: faClock, text: 'Minutes to hours', good: false },
                        { icon: faDollarSign, text: '$0.02 per GB', good: true },
                      ].map((item, i) => (
                        <motion.div
                          key={i}
                          className={`flex items-center justify-between px-2 py-1.5 rounded-lg ${
                            isDark ? 'bg-white/[0.05]' : 'bg-white/50'
                          }`}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                        >
                          <div className="flex items-center gap-2">
                            <FontAwesomeIcon icon={item.icon} className="text-orange-400 text-xs" />
                            <span className={`text-xs ${isDark ? 'text-white/80' : 'text-elastic-dev-blue/80'}`}>{item.text}</span>
                          </div>
                          <FontAwesomeIcon 
                            icon={item.good ? faCheck : faTimes} 
                            className={`text-xs ${item.good ? 'text-elastic-teal' : 'text-elastic-pink'}`}
                          />
                        </motion.div>
                      ))}
                    </div>

                    <motion.div
                      className="mt-3 text-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                    >
                      <span className={`text-xs italic ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'}`}>
                        Cheap but slow
                      </span>
                    </motion.div>
                  </motion.div>
                </div>

                {/* The Result */}
                <motion.div
                  className={`mt-4 p-3 rounded-xl border text-center max-w-2xl ${
                    isDark ? 'bg-white/[0.02] border-white/10' : 'bg-white/50 border-elastic-dev-blue/10'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                >
                  <p className={`text-base ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
                    <FontAwesomeIcon icon={faDollarSign} className="text-elastic-yellow mr-2" />
                    Cost won. The industry went <span className="font-bold text-orange-400">storage-first</span>.
                  </p>
                  <p className={`text-sm mt-1 ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'}`}>
                    But that created new problems...
                  </p>
                </motion.div>
              </motion.div>
            )}

            {/* STAGE 3: The Workarounds */}
            {stage === 2 && (
              <motion.div
                key="workarounds"
                className="absolute inset-0 flex flex-col p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
              >
                {/* Header */}
                <motion.div
                  className="text-center mb-4"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p className={`text-sm uppercase tracking-wider mb-1 ${isDark ? 'text-white/40' : 'text-elastic-dev-blue/40'}`}>
                    The Industry's Attempts
                  </p>
                  <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
                    Workarounds emerged... but data stayed{' '}
                    <span className="text-orange-400">trapped</span>
                  </h3>
                  <div className="flex items-center justify-center gap-3 mt-2">
                    {!selectedArchitecture && !showSummary && (
                      <p className={`text-sm ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'}`}>
                        Click any architecture to explore its limitations
                      </p>
                    )}
                    {!showSummary ? (
                      <motion.button
                        onClick={() => {
                          setShowSummary(true)
                          setSelectedArchitecture(null)
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-2 ${
                          isDark 
                            ? 'bg-elastic-pink/20 text-elastic-pink hover:bg-elastic-pink/30' 
                            : 'bg-elastic-pink/10 text-elastic-pink hover:bg-elastic-pink/20'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FontAwesomeIcon icon={faLayerGroup} />
                        Compare All
                      </motion.button>
                    ) : (
                      <motion.button
                        onClick={() => setShowSummary(false)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-2 ${
                          isDark 
                            ? 'bg-white/10 text-white/70 hover:bg-white/20' 
                            : 'bg-elastic-dev-blue/10 text-elastic-dev-blue/70 hover:bg-elastic-dev-blue/20'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FontAwesomeIcon icon={faChevronLeft} />
                        Back to Cards
                      </motion.button>
                    )}
                  </div>
                </motion.div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col overflow-hidden">
                  <AnimatePresence mode="popLayout">
                    {showSummary ? (
                      /* Summary: All architectures with problems */
                      <motion.div
                        key="summary"
                        className="flex-1 overflow-y-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div className="grid grid-cols-2 gap-3 max-w-5xl mx-auto">
                          {['catalog', 'federation', 'lake', 'warehouse'].map((type, i) => {
                            const data = architectureData[type]
                            return (
                              <motion.div
                                key={type}
                                className={`p-3 rounded-xl border-2 ${isDark ? 'bg-white/[0.02]' : 'bg-white/50'}`}
                                style={{ borderColor: `${data.color}40` }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                              >
                                {/* Header */}
                                <div className="flex items-center gap-2 mb-2">
                                  <div 
                                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                                    style={{ backgroundColor: `${data.color}20` }}
                                  >
                                    <FontAwesomeIcon icon={data.icon} style={{ color: data.color }} />
                                  </div>
                                  <div>
                                    <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
                                      {data.label}
                                    </p>
                                    <p className={`text-[10px] ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'}`}>
                                      {data.subtitle}
                                    </p>
                                  </div>
                                </div>
                                {/* Problems */}
                                <div className="space-y-1">
                                  {data.problems.map((problem, j) => (
                                    <div
                                      key={j}
                                      className={`flex items-start gap-1.5 text-xs ${isDark ? 'text-white/60' : 'text-elastic-dev-blue/60'}`}
                                    >
                                      <FontAwesomeIcon icon={faTimes} className="text-elastic-pink mt-0.5 text-[10px]" />
                                      <span>{problem}</span>
                                    </div>
                                  ))}
                                </div>
                              </motion.div>
                            )
                          })}
                        </div>
                      </motion.div>
                    ) : !selectedArchitecture ? (
                      /* Default: 4 cards in a row */
                      <motion.div
                        key="grid"
                        className="flex-1 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div className="grid grid-cols-4 gap-4 max-w-4xl w-full">
                          {['catalog', 'federation', 'lake', 'warehouse'].map((type, i) => (
                            <ArchitectureCard
                              key={type}
                              type={type}
                              isSelected={false}
                              isOther={false}
                              onClick={() => setSelectedArchitecture(type)}
                              delay={0.1 + i * 0.1}
                            />
                          ))}
                        </div>
                      </motion.div>
                    ) : (
                      /* Selected: Card + Problems panel */
                      <motion.div
                        key="expanded"
                        className="flex-1 flex flex-col"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        {/* Selected architecture + Problems */}
                        <div className="flex-1 flex items-center justify-center gap-6 mb-4">
                          {/* Selected Card */}
                          <motion.div 
                            className="w-48"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                          >
                            <ArchitectureCard
                              type={selectedArchitecture}
                              isSelected={true}
                              isOther={false}
                              onClick={() => setSelectedArchitecture(null)}
                            />
                          </motion.div>
                          
                          {/* Problems Panel */}
                          <motion.div 
                            className="w-80"
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 30 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.1 }}
                          >
                            <ProblemsPanel type={selectedArchitecture} />
                          </motion.div>
                        </div>

                        {/* Other architectures (small) */}
                        <motion.div 
                          className="flex items-center justify-center gap-3"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.15 }}
                        >
                          {['catalog', 'federation', 'lake', 'warehouse']
                            .filter(t => t !== selectedArchitecture)
                            .map((type) => (
                              <motion.div
                                key={type}
                                className={`w-20 h-24 rounded-xl border-2 flex flex-col items-center justify-center p-2 cursor-pointer ${
                                  isDark ? 'bg-white/[0.02]' : 'bg-white/50'
                                }`}
                                style={{ borderColor: `${architectureData[type].color}30` }}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 0.6, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                onClick={() => setSelectedArchitecture(type)}
                                whileHover={{ opacity: 1, scale: 1.05, borderColor: architectureData[type].color }}
                              >
                                <FontAwesomeIcon 
                                  icon={architectureData[type].icon} 
                                  className="text-lg mb-1"
                                  style={{ color: architectureData[type].color }} 
                                />
                                <span className={`text-[10px] text-center ${isDark ? 'text-white/60' : 'text-elastic-dev-blue/60'}`}>
                                  {architectureData[type].label.split(' ')[0]}
                                </span>
                              </motion.div>
                            ))}
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Bottom Insight (always visible) */}
                <motion.div
                  className={`mt-4 p-3 rounded-xl text-center ${
                    isDark ? 'bg-white/[0.02] border border-white/10' : 'bg-white/50 border border-elastic-dev-blue/10'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <p className={`text-sm ${isDark ? 'text-white/70' : 'text-elastic-dev-blue/70'}`}>
                    The problem isn't <span className="text-orange-400 font-semibold">where</span> data lives...
                    It's whether you can <span className="text-elastic-teal font-semibold">search it all at once</span>.
                  </p>
                </motion.div>
              </motion.div>
            )}

            {/* STAGE 4: The Transformation */}
            {stage === 3 && (
              <motion.div
                key="transformation"
                className="absolute inset-0 flex flex-col p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
              >
                {/* Header */}
                <div className="text-center mb-4">
                  <motion.p
                    className={`text-xl ${isDark ? 'text-white/70' : 'text-elastic-dev-blue/70'}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {!meshActive 
                      ? 'What if you could search everywhere without copying anything?' 
                      : 'The Elastic Data Mesh: Query globally, store locally'
                    }
                  </motion.p>
                </div>

                {/* Main Visualization Area */}
                <div className="flex-1 relative">
                  <AnimatePresence mode="popLayout">
                    {!meshActive ? (
                      /* Before: Fragmented State */
                      <motion.div
                        key="before"
                        className="absolute inset-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                      >
                        {/* Scattered silos */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="relative w-full max-w-2xl h-64">
                            {[
                              { x: 10, y: 20, label: 'US-East', color: '#48EFCF' },
                              { x: 70, y: 15, label: 'EU-West', color: '#0B64DD' },
                              { x: 25, y: 70, label: 'APAC', color: '#F04E98' },
                              { x: 60, y: 65, label: 'Archive', color: '#FEC514' },
                              { x: 40, y: 40, label: '???', color: '#FF957D' },
                            ].map((silo, i) => (
                              <motion.div
                                key={i}
                                className="absolute"
                                style={{ left: `${silo.x}%`, top: `${silo.y}%` }}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ 
                                  opacity: 1, 
                                  scale: 1,
                                  y: [0, -5, 0],
                                }}
                                transition={{ 
                                  delay: i * 0.1,
                                  y: { duration: 2, repeat: Infinity, delay: i * 0.3 }
                                }}
                              >
                                <div 
                                  className={`px-4 py-3 rounded-xl border-2 ${isDark ? 'bg-white/[0.05]' : 'bg-white/70'}`}
                                  style={{ borderColor: `${silo.color}60` }}
                                >
                                  <FontAwesomeIcon icon={faDatabase} style={{ color: silo.color }} className="mr-2" />
                                  <span className={`text-sm font-medium ${isDark ? 'text-white/70' : 'text-elastic-dev-blue/70'}`}>
                                    {silo.label}
                                  </span>
                                </div>
                                {/* Trapped particles */}
                                {Array.from({ length: 3 }).map((_, j) => (
                                  <DataParticle
                                    key={j}
                                    id={j}
                                    initialX={Math.random() * 100}
                                    initialY={Math.random() * 100}
                                    color={silo.color}
                                    trapped={true}
                                    delay={j * 0.3}
                                  />
                                ))}
                              </motion.div>
                            ))}

                            {/* Question marks between silos */}
                            {[
                              { x: 40, y: 20 },
                              { x: 15, y: 45 },
                              { x: 65, y: 45 },
                            ].map((pos, i) => (
                              <motion.div
                                key={i}
                                className={`absolute text-2xl ${isDark ? 'text-white/20' : 'text-elastic-dev-blue/20'}`}
                                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0.2, 0.5, 0.2] }}
                                transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                              >
                                ?
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* Transform Button */}
                        <motion.div
                          className="absolute bottom-4 left-1/2 -translate-x-1/2"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.8 }}
                        >
                          <button
                            onClick={() => setMeshActive(true)}
                            className="px-8 py-4 rounded-xl bg-gradient-to-r from-elastic-teal to-elastic-blue text-white font-semibold text-lg shadow-lg shadow-elastic-teal/30 hover:scale-105 transition-transform flex items-center gap-3"
                          >
                            <FontAwesomeIcon icon={faCircleNodes} />
                            Activate the Mesh
                            <FontAwesomeIcon icon={faArrowRight} />
                          </button>
                        </motion.div>
                      </motion.div>
                    ) : (
                      /* After: Connected Mesh */
                      <motion.div
                        key="after"
                        className="absolute inset-0"
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                      >
                        {/* Mesh Visualization */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="relative w-full max-w-3xl h-72">
                            {/* SVG for connections */}
                            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                              <defs>
                                <linearGradient id="meshGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                  <stop offset="0%" stopColor="#48EFCF" />
                                  <stop offset="100%" stopColor="#0B64DD" />
                                </linearGradient>
                              </defs>
                              {/* Connection lines to center */}
                              <MeshConnection x1={50} y1={50} x2={15} y2={25} color="#48EFCF" delay={0.2} active={queryActive} />
                              <MeshConnection x1={50} y1={50} x2={85} y2={25} color="#0B64DD" delay={0.3} active={queryActive} />
                              <MeshConnection x1={50} y1={50} x2={20} y2={75} color="#F04E98" delay={0.4} active={queryActive} />
                              <MeshConnection x1={50} y1={50} x2={80} y2={75} color="#FEC514" delay={0.5} active={queryActive} />
                              {/* Cross connections */}
                              <MeshConnection x1={15} y1={25} x2={85} y2={25} color="#48EFCF" delay={0.6} />
                              <MeshConnection x1={20} y1={75} x2={80} y2={75} color="#F04E98" delay={0.7} />
                            </svg>

                            {/* Mesh Nodes */}
                            <MeshNode x={50} y={50} label="Search" color="#48EFCF" isCenter delay={0.1} isActive={queryActive} />
                            <MeshNode x={15} y={25} label="US-East" color="#48EFCF" delay={0.2} isActive={queryActive} />
                            <MeshNode x={85} y={25} label="EU-West" color="#0B64DD" delay={0.3} isActive={queryActive} />
                            <MeshNode x={20} y={75} label="APAC" color="#F04E98" delay={0.4} isActive={queryActive} />
                            <MeshNode x={80} y={75} label="Archive" color="#FEC514" delay={0.5} isActive={queryActive} />

                            {/* Flowing particles when mesh is active */}
                            <div className="absolute inset-0 overflow-hidden">
                              {Array.from({ length: 20 }).map((_, i) => (
                                <DataParticle
                                  key={i}
                                  id={i}
                                  initialX={50}
                                  initialY={50}
                                  color={particleColors[i % particleColors.length]}
                                  meshMode={true}
                                  delay={i * 0.3}
                                />
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Capabilities */}
                        <motion.div
                          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.8 }}
                        >
                          {/* CCS */}
                          <div className={`px-4 py-3 rounded-xl border-2 border-elastic-teal bg-elastic-teal/10`}>
                            <div className="flex items-center gap-2 mb-1">
                              <FontAwesomeIcon icon={faGlobe} className="text-elastic-teal" />
                              <span className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
                                Cross-Cluster Search
                              </span>
                            </div>
                            <p className={`text-xs ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'}`}>
                              Query everywhere at once
                            </p>
                          </div>

                          {/* Query Button */}
                          <button
                            onClick={runQuery}
                            disabled={queryActive}
                            className={`px-4 py-3 rounded-xl font-medium transition-all ${
                              queryActive
                                ? 'bg-elastic-teal/20 text-elastic-teal'
                                : 'bg-elastic-teal text-white hover:scale-105'
                            }`}
                          >
                            <FontAwesomeIcon icon={queryActive ? faBolt : faPlay} className="mr-2" />
                            {queryActive ? 'Querying...' : 'Run Query'}
                          </button>

                          {/* Searchable Snapshots */}
                          <div className={`px-4 py-3 rounded-xl border-2 border-elastic-blue bg-elastic-blue/10`}>
                            <div className="flex items-center gap-2 mb-1">
                              <FontAwesomeIcon icon={faSnowflake} className="text-elastic-blue" />
                              <span className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
                                Searchable Snapshots
                              </span>
                            </div>
                            <p className={`text-xs ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'}`}>
                              PBs at $0.02/GB, always searchable
                            </p>
                          </div>
                        </motion.div>

                        {/* Success message during query */}
                        <AnimatePresence>
                          {queryActive && (
                            <motion.div
                              className="absolute top-4 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl bg-elastic-teal/20 border border-elastic-teal text-elastic-teal font-medium"
                              initial={{ opacity: 0, y: -20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                            >
                              <FontAwesomeIcon icon={faBolt} className="mr-2" />
                              Searching all clusters simultaneously...
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={prevStage}
            disabled={stage === 0}
            className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
              stage === 0
                ? isDark ? 'text-white/20' : 'text-elastic-dev-blue/20'
                : isDark ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-elastic-dev-blue/10 text-elastic-dev-blue hover:bg-elastic-dev-blue/20'
            }`}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
            Previous
          </button>

          <button
            onClick={resetDemo}
            className={`px-3 py-2 rounded-lg text-sm transition-all ${
              isDark ? 'text-white/40 hover:text-white/70' : 'text-elastic-dev-blue/40 hover:text-elastic-dev-blue/70'
            }`}
          >
            <FontAwesomeIcon icon={faRotateRight} className="mr-1" />
            Reset
          </button>

          <button
            onClick={nextStage}
            disabled={stage === stages.length - 1}
            className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
              stage === stages.length - 1
                ? isDark ? 'text-white/20' : 'text-elastic-dev-blue/20'
                : 'bg-elastic-teal text-white hover:scale-105'
            }`}
          >
            Next
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>

      {/* Floating play button - only shows on stage 0 before typing completes */}
      <AnimatePresence>
        {stage === 0 && !searchComplete && !isTyping && (
          <motion.button
            onClick={startTyping}
            className={`fixed bottom-4 right-14 z-40 w-7 h-7 rounded-full flex items-center justify-center transition-all ${
              isDark 
                ? 'bg-white/5 hover:bg-white/15 text-white/30 hover:text-white/60' 
                : 'bg-elastic-dev-blue/5 hover:bg-elastic-dev-blue/15 text-elastic-dev-blue/30 hover:text-elastic-dev-blue/60'
            }`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title="Start typing animation"
          >
            <FontAwesomeIcon icon={faPlay} className="text-[10px] ml-0.5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}

export default DataMeshScene

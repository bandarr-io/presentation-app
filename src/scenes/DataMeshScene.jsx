import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useCallback, useMemo } from 'react'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faDatabase, faMagnifyingGlass, faMemory, faHardDrive, faBolt, 
  faCircleNodes, faWarehouse, faWater, faCopy, faGlobe,
  faArrowRight, faArrowUp, faCheck, faTimes, faDollarSign, faClock, 
  faSnowflake, faChevronRight, faChevronLeft, faPlay,
  faRotateRight, faLayerGroup
} from '@fortawesome/free-solid-svg-icons'

// Story stages
const stages = [
  { id: 'question', label: 'The Question' },
  { id: 'dilemma', label: 'The Dilemma' },
  { id: 'problems', label: 'The Problems' },
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
      className={`h-full rounded-2xl border-2 flex flex-col items-center justify-between p-4 cursor-pointer ${
        isDark ? 'bg-white/[0.03]' : 'bg-white/50'
      }`}
      style={{ 
        borderColor: isSelected ? data.color : `${data.color}40`,
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
      whileHover={{ borderColor: data.color }}
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
      className={`h-full rounded-2xl border-2 p-6 ${isDark ? 'bg-white/[0.02]' : 'bg-white/70'}`}
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

function DataMeshScene({ scenes = [], allScenes = [], onNavigate }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  
  // Navigate to a scene by ID - searches in active scenes
  const navigateToSceneById = useCallback((sceneId) => {
    console.log('Attempting to navigate to:', sceneId)
    console.log('Available scenes:', scenes.map(s => s.id))
    // Find the scene in active scenes (scenes prop)
    const index = scenes.findIndex(s => s.id === sceneId)
    console.log('Found at index:', index)
    if (index !== -1 && onNavigate) {
      console.log('Calling onNavigate with index:', index)
      onNavigate(index)
    } else {
      console.warn(`Scene "${sceneId}" not found in active scenes. It may be disabled. Available: ${scenes.map(s => s.id).join(', ')}`)
    }
  }, [scenes, onNavigate])
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
        // Answer only shows when user clicks the search button
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
    setTimeout(() => setQueryActive(false), 5000)
  }, [])

  return (
    <div className="scene !py-4">
      <div className="max-w-[98%] mx-auto w-full h-full flex flex-col">
        {/* Header with progress */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-elastic-blue text-sm font-mono uppercase tracking-widest">
            The Data Story
          </span>
          <h2 className={`text-3xl md:text-4xl font-bold mt-1 ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
            From Chaos to <span className="gradient-text">Clarity</span>
          </h2>
          <p className={`text-lg mt-3 max-w-3xl mx-auto ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/60'}`}>
            How Elastic creates an enterprise-wide data mesh to search and act on data at scale.
          </p>
        </motion.div>

        {/* Stage Progress Indicator */}
        <div className="flex items-center justify-center gap-2 mb-6">
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
        <div className="flex-1 relative overflow-hidden rounded-2xl border bg-gradient-to-br from-transparent to-white/[0.02] border-white/10 min-h-[520px] max-w-6xl mx-auto w-full">
          <AnimatePresence mode="popLayout">
            
            {/* STAGE 1: The Question */}
            {stage === 0 && (
              <motion.div
                key="question"
                className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-5xl flex flex-col items-center justify-center p-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
              >
                {/* Background particles */}
                <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-4xl overflow-hidden">
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

                  {/* Answer Section - styled as search results */}
                  <AnimatePresence>
                    {showAnswer && (
                      <motion.div
                        className={`w-full max-w-3xl mx-auto mt-6 px-6 py-5 rounded-2xl border-2 ${
                          isDark ? 'bg-white/[0.03] border-white/20' : 'bg-white/50 border-elastic-dev-blue/20'
                        }`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <motion.p
                          className="text-4xl md:text-5xl font-bold gradient-text mb-3"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ type: 'spring', stiffness: 200 }}
                        >
                          To use it.
                        </motion.p>
                        
                        <motion.p
                          className={`text-base ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          Data is a <span className="italic">strategic asset</span>. We need to retrieve, connect, and act on it—
                          <span className="text-elastic-teal font-semibold"> fast</span>.
                        </motion.p>

                        <motion.div
                          className={`mt-4 pt-4 border-t ${
                            isDark ? 'border-white/10' : 'border-elastic-dev-blue/10'
                          }`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.6 }}
                        >
                          <p className="text-base text-elastic-pink">
                            But data is generated <span className="font-medium">everywhere</span>. 
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
                  className={`text-xl mb-6 text-center ${isDark ? 'text-white/70' : 'text-elastic-dev-blue/70'}`}
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
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-elastic-teal/20 flex items-center justify-center">
                        <FontAwesomeIcon icon={faMemory} className="text-elastic-teal text-xl" />
                      </div>
                      <div>
                        <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>Search</h3>
                        <p className="text-elastic-teal text-sm">Like memory</p>
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
                          className={`flex items-center justify-between px-3 py-2 rounded-lg ${
                            isDark ? 'bg-white/[0.05]' : 'bg-white/50'
                          }`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                        >
                          <div className="flex items-center gap-2">
                            <FontAwesomeIcon icon={item.icon} className="text-elastic-teal text-sm" />
                            <span className={`text-sm ${isDark ? 'text-white/80' : 'text-elastic-dev-blue/80'}`}>{item.text}</span>
                          </div>
                          <FontAwesomeIcon 
                            icon={item.good ? faCheck : faTimes} 
                            className={`text-sm ${item.good ? 'text-elastic-teal' : 'text-elastic-pink'}`}
                          />
                        </motion.div>
                      ))}
                    </div>

                    <motion.div
                      className="mt-4 text-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                    >
                      <span className={`text-sm italic ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'}`}>
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
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold ${
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
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
                        <FontAwesomeIcon icon={faHardDrive} className="text-orange-400 text-xl" />
                      </div>
                      <div>
                        <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>Storage</h3>
                        <p className="text-orange-400 text-sm">Like disk</p>
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
                          className={`flex items-center justify-between px-3 py-2 rounded-lg ${
                            isDark ? 'bg-white/[0.05]' : 'bg-white/50'
                          }`}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                        >
                          <div className="flex items-center gap-2">
                            <FontAwesomeIcon icon={item.icon} className="text-orange-400 text-sm" />
                            <span className={`text-sm ${isDark ? 'text-white/80' : 'text-elastic-dev-blue/80'}`}>{item.text}</span>
                          </div>
                          <FontAwesomeIcon 
                            icon={item.good ? faCheck : faTimes} 
                            className={`text-sm ${item.good ? 'text-elastic-teal' : 'text-elastic-pink'}`}
                          />
                        </motion.div>
                      ))}
                    </div>

                    <motion.div
                      className="mt-4 text-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                    >
                      <span className={`text-sm italic ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'}`}>
                        Cheap but slow
                      </span>
                    </motion.div>
                  </motion.div>
                </div>

                {/* The Result */}
                <motion.div
                  className={`mt-6 p-4 rounded-xl border text-center max-w-2xl ${
                    isDark ? 'bg-white/[0.02] border-white/10' : 'bg-white/50 border-elastic-dev-blue/10'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                >
                  <p className={`text-lg ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
                    <FontAwesomeIcon icon={faDollarSign} className="text-elastic-yellow mr-2" />
                    Cost won. The industry went <span className="font-bold text-orange-400">storage-first</span>.
                  </p>
                  <p className={`text-base mt-2 ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'}`}>
                    But that created new problems...
                  </p>
                </motion.div>
              </motion.div>
            )}

            {/* STAGE 3: The Problems */}
            {stage === 2 && (
              <motion.div
                key="problems"
                className="absolute inset-0 flex flex-col items-center justify-center p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
              >
                <motion.p
                  className={`text-xl mb-6 text-center ${isDark ? 'text-white/70' : 'text-elastic-dev-blue/70'}`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Storage-first seemed smart... until the cracks appeared
                </motion.p>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl w-full">
                  {[
                    { 
                      icon: faDatabase, 
                      title: 'Data Silos', 
                      description: 'Isolated pools that can\'t talk to each other',
                      color: '#FF957D'
                    },
                    { 
                      icon: faClock, 
                      title: 'Slow Insights', 
                      description: 'Minutes to hours before you can query',
                      color: '#F04E98'
                    },
                    { 
                      icon: faGlobe, 
                      title: 'No Visibility', 
                      description: 'Can\'t see across the enterprise',
                      color: '#FEC514'
                    },
                    { 
                      icon: faCopy, 
                      title: 'Data Sprawl', 
                      description: 'Copies everywhere, truth nowhere',
                      color: '#FF957D'
                    },
                  ].map((problem, i) => (
                    <motion.div
                      key={i}
                      className={`p-4 rounded-xl border-2 text-center ${
                        isDark ? 'bg-white/[0.03]' : 'bg-white/50'
                      }`}
                      style={{ borderColor: `${problem.color}40` }}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.15 }}
                    >
                      <div 
                        className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center"
                        style={{ backgroundColor: `${problem.color}20` }}
                      >
                        <FontAwesomeIcon 
                          icon={problem.icon} 
                          className="text-xl"
                          style={{ color: problem.color }}
                        />
                      </div>
                      <h4 className={`text-lg font-bold mb-1 ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
                        {problem.title}
                      </h4>
                      <p className={`text-sm ${isDark ? 'text-white/60' : 'text-elastic-dev-blue/60'}`}>
                        {problem.description}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Bottom message */}
                <motion.div
                  className={`mt-6 p-4 rounded-xl border text-center max-w-2xl ${
                    isDark ? 'bg-elastic-pink/10 border-elastic-pink/30' : 'bg-elastic-pink/5 border-elastic-pink/20'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                >
                  <p className="text-base text-elastic-pink">
                    The industry needed solutions. Workarounds emerged...
                  </p>
                </motion.div>
              </motion.div>
            )}

            {/* STAGE 4: The Workarounds */}
            {stage === 3 && (
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
                  {!selectedArchitecture && !showSummary && (
                    <p className={`text-sm mt-2 ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'}`}>
                      Click any architecture to explore its limitations
                    </p>
                  )}
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
                          {['catalog', 'warehouse', 'lake', 'federation'].map((type, i) => {
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
                                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                                    style={{ backgroundColor: `${data.color}20` }}
                                  >
                                    <FontAwesomeIcon icon={data.icon} className="text-base" style={{ color: data.color }} />
                                  </div>
                                  <div>
                                    <p className={`text-base font-semibold ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
                                      {data.label}
                                    </p>
                                    <p className={`text-xs ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'}`}>
                                      {data.subtitle}
                                    </p>
                                  </div>
                                </div>
                                {/* Problems */}
                                <div className="space-y-0.5">
                                  {data.problems.map((problem, j) => (
                                    <div
                                      key={j}
                                      className={`flex items-start gap-1.5 text-sm ${isDark ? 'text-white/60' : 'text-elastic-dev-blue/60'}`}
                                    >
                                      <FontAwesomeIcon icon={faTimes} className="text-elastic-pink mt-0.5 text-xs" />
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
                        className="flex-1 h-full flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div className="grid grid-cols-4 gap-4 max-w-4xl w-full -mt-4">
                          {['catalog', 'warehouse', 'lake', 'federation'].map((type, i) => (
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
                            className="w-48 h-72"
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
                            className="w-80 h-72"
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
                          {['catalog', 'warehouse', 'lake', 'federation']
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
                                whileHover={{ opacity: 1, borderColor: architectureData[type].color }}
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

                {/* Bottom Insight (shows after Compare clicked) */}
                <AnimatePresence>
                  {showSummary && (
                    <motion.div
                      className={`mt-4 p-3 rounded-xl text-center max-w-5xl mx-auto ${
                        isDark ? 'bg-white/[0.02] border border-white/10' : 'bg-white/50 border border-elastic-dev-blue/10'
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ delay: 0.3 }}
                    >
                      <p className={`text-lg ${isDark ? 'text-white/70' : 'text-elastic-dev-blue/70'}`}>
                        The problem isn't <span className="text-orange-400 font-semibold">where</span> data lives...
                        It's whether you can <span className="text-elastic-teal font-semibold">search it all at once</span>.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* STAGE 5: The Transformation */}
            {stage === 4 && (
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
                          <div className="relative w-full max-w-3xl h-72">
                            {[
                              { x: 5, y: 15, label: 'US-East', color: '#48EFCF' },
                              { x: 75, y: 10, label: 'EU-West', color: '#0B64DD' },
                              { x: 20, y: 65, label: 'APAC', color: '#F04E98' },
                              { x: 55, y: 70, label: 'Archive', color: '#FEC514' },
                              { x: 38, y: 35, label: '???', color: '#FF957D' },
                              { x: 85, y: 55, label: 'Legacy', color: '#9B59B6' },
                              { x: 2, y: 45, label: 'On-Prem', color: '#3498DB' },
                              { x: 60, y: 25, label: 'Cloud', color: '#1ABC9C' },
                              { x: 30, y: 5, label: 'Logs', color: '#E74C3C' },
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
                                  delay: i * 0.08,
                                  y: { duration: 2, repeat: Infinity, delay: i * 0.2 }
                                }}
                              >
                                <div 
                                  className={`w-20 px-2 py-2 rounded-lg border-2 text-center ${isDark ? 'bg-white/[0.05]' : 'bg-white/70'}`}
                                  style={{ borderColor: `${silo.color}60` }}
                                >
                                  <FontAwesomeIcon icon={faDatabase} style={{ color: silo.color }} className="text-sm" />
                                  <span className={`block text-xs font-medium mt-1 ${isDark ? 'text-white/70' : 'text-elastic-dev-blue/70'}`}>
                                    {silo.label}
                                  </span>
                                </div>
                              </motion.div>
                            ))}

                            {/* Question marks between silos */}
                            {[
                              { x: 25, y: 25, size: 'text-3xl' },
                              { x: 50, y: 15, size: 'text-2xl' },
                              { x: 12, y: 40, size: 'text-xl' },
                              { x: 70, y: 40, size: 'text-2xl' },
                              { x: 45, y: 55, size: 'text-3xl' },
                              { x: 80, y: 30, size: 'text-xl' },
                              { x: 35, y: 75, size: 'text-2xl' },
                              { x: 65, y: 60, size: 'text-xl' },
                              { x: 8, y: 70, size: 'text-xl' },
                              { x: 55, y: 5, size: 'text-xl' },
                              { x: 90, y: 70, size: 'text-2xl' },
                            ].map((pos, i) => (
                              <motion.div
                                key={i}
                                className={`absolute ${pos.size} font-bold ${isDark ? 'text-white/15' : 'text-elastic-dev-blue/15'}`}
                                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0.15, 0.4, 0.15] }}
                                transition={{ duration: 2 + (i % 3) * 0.5, repeat: Infinity, delay: i * 0.2 }}
                              >
                                ?
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* Transform Button */}
                        <motion.div
                          className="absolute bottom-4 left-1/2 -translate-x-1/2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.8 }}
                        >
                          <button
                            onClick={() => setMeshActive(true)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-2 ${
                              isDark 
                                ? 'bg-white/10 text-white/50 hover:bg-elastic-teal/30 hover:text-elastic-teal' 
                                : 'bg-elastic-dev-blue/10 text-elastic-dev-blue/50 hover:bg-elastic-teal/30 hover:text-elastic-teal'
                            }`}
                          >
                            <FontAwesomeIcon icon={faCircleNodes} className="text-[10px]" />
                            Activate Mesh
                          </button>
                        </motion.div>
                      </motion.div>
                    ) : (
                      /* After: Connected Mesh - Horizontal Site Layout */
                      <motion.div
                        key="after"
                        className="absolute inset-0"
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                      >
                        {/* Horizontal Site Visualization */}
                        <div className="absolute inset-x-0 top-0 bottom-8 flex items-center justify-center">
                          <div className="relative w-full max-w-5xl h-80">
                            
                            {/* Connection lines layer with bidirectional arrows */}
                            <div className="absolute inset-0 top-0 bottom-8 flex items-center justify-center">
                              {/* SVG for arrow lines */}
                              <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
                                <defs>
                                  {/* Arrow markers for each color - small and subtle */}
                                  <marker id="arrowTealLeft" markerWidth="4" markerHeight="4" refX="0" refY="2" orient="auto">
                                    <path d="M4,0 L0,2 L4,4" fill="none" stroke="#48EFCF" strokeWidth="1" />
                                  </marker>
                                  <marker id="arrowTealRight" markerWidth="4" markerHeight="4" refX="4" refY="2" orient="auto">
                                    <path d="M0,0 L4,2 L0,4" fill="none" stroke="#48EFCF" strokeWidth="1" />
                                  </marker>
                                  <marker id="arrowPinkLeft" markerWidth="4" markerHeight="4" refX="0" refY="2" orient="auto">
                                    <path d="M4,0 L0,2 L4,4" fill="none" stroke="#F04E98" strokeWidth="1" />
                                  </marker>
                                  <marker id="arrowPinkRight" markerWidth="4" markerHeight="4" refX="4" refY="2" orient="auto">
                                    <path d="M0,0 L4,2 L0,4" fill="none" stroke="#F04E98" strokeWidth="1" />
                                  </marker>
                                  <marker id="arrowYellowLeft" markerWidth="4" markerHeight="4" refX="0" refY="2" orient="auto">
                                    <path d="M4,0 L0,2 L4,4" fill="none" stroke="#FEC514" strokeWidth="1" />
                                  </marker>
                                  <marker id="arrowYellowRight" markerWidth="4" markerHeight="4" refX="4" refY="2" orient="auto">
                                    <path d="M0,0 L4,2 L0,4" fill="none" stroke="#FEC514" strokeWidth="1" />
                                  </marker>
                                </defs>
                                
                                {/* Site 1 to Site 2 arrows - centered on divider at 33.33% */}
                                <motion.line 
                                  x1="22%" y1="35%" x2="44%" y2="35%" 
                                  stroke="#48EFCF" strokeWidth="2"
                                  markerStart="url(#arrowTealLeft)" markerEnd="url(#arrowTealRight)"
                                  initial={{ pathLength: 0, opacity: 0 }}
                                  animate={{ pathLength: 1, opacity: 1 }}
                                  transition={{ delay: 0.3, duration: 0.5 }}
                                />
                                <motion.line 
                                  x1="22%" y1="38.5%" x2="44%" y2="38.5%" 
                                  stroke="#F04E98" strokeWidth="2"
                                  markerStart="url(#arrowPinkLeft)" markerEnd="url(#arrowPinkRight)"
                                  initial={{ pathLength: 0, opacity: 0 }}
                                  animate={{ pathLength: 1, opacity: 1 }}
                                  transition={{ delay: 0.4, duration: 0.5 }}
                                />
                                <motion.line 
                                  x1="22%" y1="41.5%" x2="44%" y2="41.5%" 
                                  stroke="#FEC514" strokeWidth="2"
                                  markerStart="url(#arrowYellowLeft)" markerEnd="url(#arrowYellowRight)"
                                  initial={{ pathLength: 0, opacity: 0 }}
                                  animate={{ pathLength: 1, opacity: 1 }}
                                  transition={{ delay: 0.5, duration: 0.5 }}
                                />
                                
                                {/* Site 2 to Site N arrows - centered on divider at 66.66% */}
                                <motion.line 
                                  x1="56%" y1="35%" x2="78%" y2="35%" 
                                  stroke="#48EFCF" strokeWidth="2"
                                  markerStart="url(#arrowTealLeft)" markerEnd="url(#arrowTealRight)"
                                  initial={{ pathLength: 0, opacity: 0 }}
                                  animate={{ pathLength: 1, opacity: 1 }}
                                  transition={{ delay: 0.5, duration: 0.5 }}
                                />
                                <motion.line 
                                  x1="56%" y1="38.5%" x2="78%" y2="38.5%" 
                                  stroke="#F04E98" strokeWidth="2"
                                  markerStart="url(#arrowPinkLeft)" markerEnd="url(#arrowPinkRight)"
                                  initial={{ pathLength: 0, opacity: 0 }}
                                  animate={{ pathLength: 1, opacity: 1 }}
                                  transition={{ delay: 0.6, duration: 0.5 }}
                                />
                                <motion.line 
                                  x1="56%" y1="41.5%" x2="78%" y2="41.5%" 
                                  stroke="#FEC514" strokeWidth="2"
                                  markerStart="url(#arrowYellowLeft)" markerEnd="url(#arrowYellowRight)"
                                  initial={{ pathLength: 0, opacity: 0 }}
                                  animate={{ pathLength: 1, opacity: 1 }}
                                  transition={{ delay: 0.7, duration: 0.5 }}
                                />
                              </svg>

                              {/* Dashed vertical dividers */}
                              <div className="absolute w-px h-3/4 top-[20%]" style={{ left: '33.33%', borderLeft: '2px dashed', borderColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)' }} />
                              <div className="absolute w-px h-3/4 top-[20%]" style={{ left: '67.33%', borderLeft: '2px dashed', borderColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)' }} />

                            </div>
                            
                            {/* Search icons above dividers, centered */}
                            <motion.div 
                              className="absolute -translate-x-[0%]" 
                              style={{ left: '031.33%', top: '0%' }}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.6 }}
                            >
                              <div className={`w-10 h-10 rounded-lg border flex items-center justify-center ${isDark ? 'bg-white/5 border-white/20' : 'bg-white border-gray-200'}`}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} className={`text-base ${isDark ? 'text-white/50' : 'text-gray-400'}`} />
                              </div>
                            </motion.div>
                            <motion.div 
                              className="absolute -translate-x-1/2" 
                              style={{ left: '65.25%', top: '0%' }}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.7 }}
                            >
                              <div className={`w-10 h-10 rounded-lg border flex items-center justify-center ${isDark ? 'bg-white/5 border-white/20' : 'bg-white border-gray-200'}`}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} className={`text-base ${isDark ? 'text-white/50' : 'text-gray-400'}`} />
                              </div>
                            </motion.div>

                            {/* Site 1 */}
                            <motion.div 
                              className="absolute flex flex-col items-center"
                              style={{ left: '09%', top: '18%' }}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 }}
                            >
                              {/* Elastic glyph logo */}
                              <img 
                                src="/logo-elastic-glyph-color.png" 
                                alt="Elastic" 
                                className="w-28 h-28 object-contain"
                              />
                              {/* Up arrow showing data flow */}
                              <motion.div 
                                className="my-2"
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                              >
                                <FontAwesomeIcon icon={faArrowUp} className="text-elastic-teal text-lg" />
                              </motion.div>
                              {/* Data grid below */}
                              <div className="w-24 h-14 relative" style={{ transform: 'perspective(150px) rotateX(35deg)' }}>
                                <div className="absolute inset-0 grid grid-cols-4 gap-0.5">
                                  {Array.from({ length: 16 }).map((_, i) => (
                                    <div key={i} className="w-full h-2.5 border border-elastic-teal/50 bg-elastic-teal/10" />
                                  ))}
                                </div>
                              </div>
                              <span className={`mt-4 text-base font-medium ${isDark ? 'text-white/80' : 'text-elastic-dev-blue/80'}`}>Site 1</span>
                            </motion.div>

                            {/* Site 2 */}
                            <motion.div 
                              className="absolute flex flex-col items-center"
                              style={{ left: '44.5%', top: '18%' }}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 }}
                            >
                              <img 
                                src="/logo-elastic-glyph-color.png" 
                                alt="Elastic" 
                                className="w-28 h-28 object-contain"
                              />
                              {/* Up arrow showing data flow */}
                              <motion.div 
                                className="my-2"
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                              >
                                <FontAwesomeIcon icon={faArrowUp} className="text-elastic-pink text-lg" />
                              </motion.div>
                              <div className="w-24 h-14 relative" style={{ transform: 'perspective(150px) rotateX(35deg)' }}>
                                <div className="absolute inset-0 grid grid-cols-4 gap-0.5">
                                  {Array.from({ length: 16 }).map((_, i) => (
                                    <div key={i} className="w-full h-2.5 border border-elastic-pink/50 bg-elastic-pink/10" />
                                  ))}
                                </div>
                              </div>
                              <span className={`mt-4 text-base font-medium ${isDark ? 'text-white/80' : 'text-elastic-dev-blue/80'}`}>Site 2</span>
                            </motion.div>

                            {/* Site N */}
                            <motion.div 
                              className="absolute flex flex-col items-center"
                              style={{ left: '80%', top: '18%' }}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3 }}
                            >
                              <img 
                                src="/logo-elastic-glyph-color.png" 
                                alt="Elastic" 
                                className="w-28 h-28 object-contain"
                              />
                              {/* Up arrow showing data flow */}
                              <motion.div 
                                className="my-2"
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                              >
                                <FontAwesomeIcon icon={faArrowUp} className="text-elastic-yellow text-lg" />
                              </motion.div>
                              <div className="w-24 h-14 relative" style={{ transform: 'perspective(150px) rotateX(35deg)' }}>
                                <div className="absolute inset-0 grid grid-cols-4 gap-0.5">
                                  {Array.from({ length: 16 }).map((_, i) => (
                                    <div key={i} className="w-full h-2.5 border border-elastic-yellow/50 bg-elastic-yellow/10" />
                                  ))}
                                </div>
                              </div>
                              <span className={`mt-4 text-base font-medium ${isDark ? 'text-white/80' : 'text-elastic-dev-blue/80'}`}>Site <span className="italic">N</span></span>
                            </motion.div>

                            {/* Query pulse animation when active - bounces back and forth along connection lines */}
                            {queryActive && (
                              <>
                                {/* Particles on teal line (top) - Site 1 to Site 2 */}
                                {[0, 1].map((i) => (
                                  <motion.div
                                    key={`teal-1-${i}`}
                                    className="absolute w-3 h-3 rounded-full bg-elastic-teal shadow-lg shadow-elastic-teal/50"
                                    style={{ top: '30%' }}
                                    animate={{ left: ['22%', '43%'] }}
                                    transition={{ duration: 1, delay: i * 0.4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                                  />
                                ))}
                                {/* Particles on teal line - Site 2 to Site N */}
                                {[0, 1].map((i) => (
                                  <motion.div
                                    key={`teal-2-${i}`}
                                    className="absolute w-3 h-3 rounded-full bg-elastic-teal shadow-lg shadow-elastic-teal/50"
                                    style={{ top: '30%' }}
                                    animate={{ left: ['56%', '77%'] }}
                                    transition={{ duration: 1, delay: 0.1 + i * 0.4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                                  />
                                ))}
                                
                                {/* Particles on pink line (middle) - Site 1 to Site 2 */}
                                {[0, 1].map((i) => (
                                  <motion.div
                                    key={`pink-1-${i}`}
                                    className="absolute w-3 h-3 rounded-full bg-elastic-pink shadow-lg shadow-elastic-pink/50"
                                    style={{ top: '33%' }}
                                    animate={{ left: ['22%', '43%'] }}
                                    transition={{ duration: 1, delay: 0.05 + i * 0.4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                                  />
                                ))}
                                {/* Particles on pink line - Site 2 to Site N */}
                                {[0, 1].map((i) => (
                                  <motion.div
                                    key={`pink-2-${i}`}
                                    className="absolute w-3 h-3 rounded-full bg-elastic-pink shadow-lg shadow-elastic-pink/50"
                                    style={{ top: '33%' }}
                                    animate={{ left: ['56%', '77%'] }}
                                    transition={{ duration: 1, delay: 0.15 + i * 0.4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                                  />
                                ))}
                                
                                {/* Particles on yellow line (bottom) - Site 1 to Site 2 */}
                                {[0, 1].map((i) => (
                                  <motion.div
                                    key={`yellow-1-${i}`}
                                    className="absolute w-3 h-3 rounded-full bg-elastic-yellow shadow-lg shadow-elastic-yellow/50"
                                    style={{ top: '35%' }}
                                    animate={{ left: ['22%', '43%'] }}
                                    transition={{ duration: 1, delay: 0.1 + i * 0.4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                                  />
                                ))}
                                {/* Particles on yellow line - Site 2 to Site N */}
                                {[0, 1].map((i) => (
                                  <motion.div
                                    key={`yellow-2-${i}`}
                                    className="absolute w-3 h-3 rounded-full bg-elastic-yellow shadow-lg shadow-elastic-yellow/50"
                                    style={{ top: '35%' }}
                                    animate={{ left: ['56%', '77%'] }}
                                    transition={{ duration: 1, delay: 0.2 + i * 0.4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                                  />
                                ))}
                              </>
                            )}
                          </div>
                        </div>

                        {/* Capabilities - positioned below the mesh */}
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 z-50 flex items-center justify-center gap-6"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.8 }}
                        >
                          {/* CCS - links to cross-cluster scene */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              navigateToSceneById('cross-cluster')
                            }}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all hover:scale-105 cursor-pointer ${
                              isDark ? 'border-elastic-teal/30 bg-elastic-teal/5 hover:border-elastic-teal hover:bg-elastic-teal/10' : 'border-elastic-teal/30 bg-elastic-teal/5 hover:border-elastic-teal hover:bg-elastic-teal/10'
                            }`}
                          >
                            <FontAwesomeIcon icon={faGlobe} className="text-elastic-teal text-sm" />
                            <div className="text-left">
                              <span className={`font-medium text-sm ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
                                Cross-Cluster Search
                              </span>
                              <span className={`text-xs ml-2 ${isDark ? 'text-white/40' : 'text-elastic-dev-blue/40'}`}>
                                Query everywhere
                              </span>
                            </div>
                          </button>

                          {/* Searchable Snapshots - links to data-tiering scene */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              navigateToSceneById('data-tiering')
                            }}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all hover:scale-105 cursor-pointer ${
                              isDark ? 'border-elastic-blue/30 bg-elastic-blue/5 hover:border-elastic-blue hover:bg-elastic-blue/10' : 'border-elastic-blue/30 bg-elastic-blue/5 hover:border-elastic-blue hover:bg-elastic-blue/10'
                            }`}
                          >
                            <FontAwesomeIcon icon={faSnowflake} className="text-elastic-blue text-sm" />
                            <div className="text-left">
                              <span className={`font-medium text-sm ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
                                Searchable Snapshots
                              </span>
                              <span className={`text-xs ml-2 ${isDark ? 'text-white/40' : 'text-elastic-dev-blue/40'}`}>
                                $0.02/GB
                              </span>
                            </div>
                          </button>
                        </motion.div>

                        {/* Success message during query */}
                        <AnimatePresence>
                          {queryActive && (
                            <motion.div
                              className="absolute top-4 right-4 px-4 py-2 rounded-lg bg-white/5 border border-white/20 text-white/60 text-sm"
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 20 }}
                            >
                              <FontAwesomeIcon icon={faBolt} className="mr-2 text-elastic-teal" />
                              Searching all clusters...
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
            className={`px-3 py-1.5 rounded-lg text-sm transition-all flex items-center gap-2 ${
              stage === 0
                ? isDark ? 'text-white/20' : 'text-elastic-dev-blue/20'
                : isDark ? 'text-white/50 hover:text-white/80' : 'text-elastic-dev-blue/50 hover:text-elastic-dev-blue/80'
            }`}
          >
            <FontAwesomeIcon icon={faChevronLeft} className="text-xs" />
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
            className={`px-3 py-1.5 rounded-lg text-sm transition-all flex items-center gap-2 ${
              stage === stages.length - 1
                ? isDark ? 'text-white/20' : 'text-elastic-dev-blue/20'
                : isDark ? 'text-white/50 hover:text-white/80' : 'text-elastic-dev-blue/50 hover:text-elastic-dev-blue/80'
            }`}
          >
            Next
            <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
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

      {/* Floating Compare/Back button - only shows on stage 3 (workarounds) */}
      <AnimatePresence>
        {stage === 3 && (
          <motion.button
            onClick={() => {
              if (showSummary) {
                setShowSummary(false)
              } else {
                setShowSummary(true)
                setSelectedArchitecture(null)
              }
            }}
            className={`fixed bottom-4 right-14 z-40 h-7 px-2.5 rounded-full flex items-center justify-center gap-1.5 transition-all text-[10px] font-medium ${
              isDark 
                ? 'bg-white/5 hover:bg-white/15 text-white/40 hover:text-white/70' 
                : 'bg-elastic-dev-blue/5 hover:bg-elastic-dev-blue/15 text-elastic-dev-blue/40 hover:text-elastic-dev-blue/70'
            }`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title={showSummary ? "Back to Cards" : "Compare All"}
          >
            <FontAwesomeIcon icon={showSummary ? faChevronLeft : faLayerGroup} className="text-[9px]" />
            {showSummary ? 'Cards' : 'Compare'}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating Run Query button - only shows on stage 4 (solution) when mesh is active */}
      <AnimatePresence>
        {stage === 4 && meshActive && (
          <motion.button
            onClick={runQuery}
            disabled={queryActive}
            className={`fixed bottom-4 right-14 z-40 h-7 px-2.5 rounded-full flex items-center justify-center gap-1.5 transition-all text-[10px] font-medium ${
              queryActive
                ? 'bg-elastic-teal/20 text-elastic-teal'
                : isDark 
                  ? 'bg-white/5 hover:bg-white/15 text-white/40 hover:text-white/70' 
                  : 'bg-elastic-dev-blue/5 hover:bg-elastic-dev-blue/15 text-elastic-dev-blue/40 hover:text-elastic-dev-blue/70'
            }`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Run Query"
          >
            <FontAwesomeIcon icon={queryActive ? faBolt : faPlay} className="text-[9px]" />
            {queryActive ? 'Running' : 'Query'}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}

export default DataMeshScene

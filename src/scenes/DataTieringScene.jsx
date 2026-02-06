import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faFire,
  faThermometerHalf,
  faThermometerQuarter,
  faDatabase,
  faSnowflake,
  faCheckCircle,
  faPlay,
  faClock,
  faHardDrive,
  faBolt,
  faSliders,
  faMagnifyingGlassChart,
  faPause,
  faRotateRight,
} from '@fortawesome/free-solid-svg-icons'

// ============================================================================
// CONFIGURATION
// ============================================================================

// Elastic ILM tier configuration (default)
const dataTiers = [
  { id: 'hot', name: 'Hot', icon: faFire, color: '#F04E98', costSymbol: '$$$', costPerGB: 0.50, latencyShort: 'Now', volume: 10, description: 'Real-time analytics', retention: '1-7 days', storage: 'NVMe SSD', latency: 'Milliseconds', useCase: 'Active investigations' },
  { id: 'warm', name: 'Warm', icon: faThermometerHalf, color: '#FF957D', costSymbol: '$$', costPerGB: 0.20, latencyShort: 'In a second', volume: 20, description: 'Recent historical', retention: '1-4 weeks', storage: 'SSD', latency: 'Sub-second', useCase: 'Trend analysis' },
  { id: 'cold', name: 'Cold', icon: faThermometerQuarter, color: '#0B64DD', costSymbol: '$', costPerGB: 0.05, latencyShort: 'In a minute', volume: 30, description: 'Searchable archives', retention: '1-12 months', storage: 'HDD', latency: 'Seconds', useCase: 'Audit trails' },
  { id: 'frozen', name: 'Frozen', icon: faSnowflake, color: '#48EFCF', costSymbol: '¢', costPerGB: 0.01, latencyShort: 'In minutes', volume: 40, description: 'Long-term compliance', retention: '1-7+ years', storage: 'Object Storage', latency: 'Minutes', useCase: 'Forensics' },
]

// Elastic ILM mode display values (Searchable Snapshots - always queryable)
const ELASTIC_DISPLAY = {
  hot: { 
    costSymbol: '$$$$',  
    latencyShort: 'Milliseconds',
    subtitle: 'Real-time indexing & search',
    suitableFor: 'Dashboards, alerts, active queries',
    keyBenefit: 'Fastest performance for read/write',
  },
  warm: { 
    costSymbol: '$$',   
    latencyShort: 'Seconds',
    subtitle: 'Frequently accessed data',
    suitableFor: 'Recent historical, trend analysis',
    keyBenefit: 'Cost-effective, consistent performance',
  },
  cold: { 
    costSymbol: '$',    
    latencyShort: 'Seconds',
    subtitle: 'Read-only data',
    suitableFor: 'Historical lookbacks, audit trails',
    keyBenefit: 'Single replica, instant queries',
  },
  frozen: { 
    costSymbol: '¢',    
    latencyShort: 'Minutes',
    subtitle: 'Searchable archives',
    suitableFor: 'Compliance, legal hold, deep archives',
    keyBenefit: 'Searchable snapshots on object storage',
  },
}

// Traditional/Competitor architecture display values (Rehydration model)
const TRADITIONAL_DISPLAY = {
  hot: { 
    costSymbol: '$$$$$', 
    latencyShort: 'Seconds',
    subtitle: 'All searchable data here',
    suitableFor: 'Everything that needs to be queryable',
    keyBenefit: null,
    painPoint: 'Expensive to scale',
  },
  warm: { 
    costSymbol: '$$$$',  
    latencyShort: 'Minutes',
    subtitle: 'Read-only cache',
    suitableFor: 'Recently accessed data only',
    keyBenefit: null,
    painPoint: 'Limited utility',
  },
  cold: { 
    costSymbol: '$$$',   
    latencyShort: '24+ hours',
    subtitle: 'Archive storage',
    suitableFor: 'Data you hope you never need',
    keyBenefit: null,
    painPoint: 'Restore required',
  },
  frozen: { 
    costSymbol: '$$',    
    latencyShort: 'Days',
    subtitle: 'Manual rehydration',
    suitableFor: 'Compliance checkbox only',
    keyBenefit: null,
    painPoint: 'Days to access, essentially unusable',
  },
}

// Grid config: slots, rows, cols
const TIER_CONFIG = [
  { slots: 9, rows: 3, cols: 3 },
  { slots: 12, rows: 4, cols: 3 },
  { slots: 15, rows: 5, cols: 3 },
  { slots: 18, rows: 6, cols: 3 },
]

// Snake path for each tier size (from entry slot to exit slot)
// Entry = max slot (top-left), Exit = last slot in path
// For 3-col grids, the snake alternates direction each row
const SNAKE_PATHS = {
  // 3x3: rows go L→R, R→L, L→R (ends at bottom-right)
  9: [9, 8, 7, 4, 5, 6, 3, 2, 1],
  // 4x3: rows go L→R, R→L, L→R, R→L (ends at bottom-left, which is slot 3)
  12: [12, 11, 10, 7, 8, 9, 6, 5, 4, 1, 2, 3],
  // 5x3: rows go L→R, R→L, L→R, R→L, L→R (ends at bottom-right)
  15: [15, 14, 13, 10, 11, 12, 9, 8, 7, 4, 5, 6, 3, 2, 1],
  // 6x3: rows go L→R, R→L, L→R, R→L, L→R, R→L (ends at bottom-left, slot 3)
  18: [18, 17, 16, 13, 14, 15, 12, 11, 10, 7, 8, 9, 6, 5, 4, 1, 2, 3],
}

// Get the exit slot (last in snake path) for each tier
function getExitSlot(tierIndex) {
  const maxSlots = TIER_CONFIG[tierIndex].slots
  const path = SNAKE_PATHS[maxSlots]
  return path[path.length - 1]
}

const SLOT_SIZE = 26
const SLOT_GAP = 6
const TIER_PADDING = 12
const STEP_DELAY = 700

// ============================================================================
// HELPERS
// ============================================================================

// Convert slot number to pixel position within grid
// Slot 1 = bottom-right, Slot max = top-left
function getSlotPosition(slot, tierIndex) {
  const { rows, cols } = TIER_CONFIG[tierIndex]
  const row = rows - 1 - Math.floor((slot - 1) / cols)
  const col = cols - 1 - ((slot - 1) % cols)
  return {
    x: TIER_PADDING + col * (SLOT_SIZE + SLOT_GAP),
    y: TIER_PADDING + row * (SLOT_SIZE + SLOT_GAP),
  }
}

function getTierDimensions(tierIndex) {
  const { rows, cols } = TIER_CONFIG[tierIndex]
  return {
    width: TIER_PADDING * 2 + cols * SLOT_SIZE + (cols - 1) * SLOT_GAP,
    height: TIER_PADDING * 2 + rows * SLOT_SIZE + (rows - 1) * SLOT_GAP,
  }
}

// Shift all balls along the snake path (ball at slot 1 exits, new ball can enter at max slot)
function shiftTier(slots, tierIndex) {
  const maxSlots = TIER_CONFIG[tierIndex].slots
  const snakePath = SNAKE_PATHS[maxSlots]
  const newSlots = Array(maxSlots).fill(null)
  
  // snakePath[0] = entry (max slot), snakePath[last] = exit (slot 1)
  // After shift: each slot gets the ball from the previous slot in the snake
  for (let i = 1; i < snakePath.length; i++) {
    const currentSlot = snakePath[i]      // This slot...
    const previousSlot = snakePath[i - 1] // ...gets ball from this slot
    newSlots[currentSlot - 1] = slots[previousSlot - 1]
  }
  // Entry slot (snakePath[0]) is now empty for new ball
  
  return newSlots
}

function countBalls(slots) {
  return slots.filter(s => s !== null).length
}

function isFull(slots, tierIndex) {
  return countBalls(slots) >= TIER_CONFIG[tierIndex].slots
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

function DataTieringScene() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  
  // Each tier is an array of slots, each slot is null or { id }
  const [tiers, setTiers] = useState(() => TIER_CONFIG.map(c => Array(c.slots).fill(null)))
  const nextBallIdRef = useRef(1)
  const [isRunning, setIsRunning] = useState(false)
  
  // UI state
  const [activeTier, setActiveTier] = useState(null)
  const [comparisonMode, setComparisonMode] = useState('traditional') // 'elastic' or 'traditional'
  const [architecturePattern, setArchitecturePattern] = useState('all') // 'all', 'hot-cold-frozen', 'hot-frozen'
  
  // One step of the continuous flow
  const runStep = () => {
    setTiers(prevTiers => {
      const newTiers = prevTiers.map(t => [...t])
      
      // Process tiers from Hot to Frozen
      // Each tier: capture exiting ball, shift all balls toward exit, add incoming ball at entry
      
      let ballToPass = { id: nextBallIdRef.current } // New ball enters Hot
      nextBallIdRef.current++
      
      for (let tierIdx = 0; tierIdx <= 3; tierIdx++) {
        // Capture the ball at exit slot (varies by tier) - this will go to next tier
        const exitSlot = getExitSlot(tierIdx)
        const exitingBall = newTiers[tierIdx][exitSlot - 1]
        
        // Shift all balls one step toward exit (along snake path)
        newTiers[tierIdx] = shiftTier(newTiers[tierIdx], tierIdx)
        
        // Add the incoming ball at entry point (max slot)
        const entryIndex = TIER_CONFIG[tierIdx].slots - 1
        newTiers[tierIdx][entryIndex] = ballToPass
        
        // The exiting ball becomes the ball to pass to the next tier
        ballToPass = exitingBall
      }
      // ballToPass from Frozen just disappears (ejected)
      
      return newTiers
    })
  }
  
  // Animation loop
  useEffect(() => {
    if (!isRunning) return
    const timer = setInterval(runStep, STEP_DELAY)
    return () => clearInterval(timer)
  }, [isRunning])
  
  // Reset
  const reset = () => {
    setIsRunning(false)
    setTiers(TIER_CONFIG.map(c => Array(c.slots).fill(null)))
    nextBallIdRef.current = 1
  }
  

  return (
    <div className="scene !py-4">
      <div className="max-w-[98%] mx-auto w-full h-full flex flex-col">
        {/* Header */}
        <motion.div className="text-center mb-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className={`text-eyebrow text-sm ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>Intelligent Data Lifecycle</span>
          <h2 className={`text-headline text-3xl md:text-4xl font-extrabold mt-1 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            <span className="gradient-text">Your data ages.</span>{' '}
            <span className="underline decoration-elastic-teal decoration-2 underline-offset-4">Your insights shouldn't wait.</span>
          </h2>
          
          {/* Controls */}
          <div className="mt-6 mb-2 flex items-center justify-center gap-4">
            {/* Mode Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setComparisonMode('traditional')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                  comparisonMode === 'traditional'
                    ? 'bg-orange-500 text-white'
                    : isDark ? 'bg-white/10 text-white/60 hover:bg-white/20' : 'bg-elastic-dev-blue/10 text-elastic-dev-blue/60'
                }`}
              >
                <FontAwesomeIcon icon={faDatabase} />
                Traditional
              </button>
              <button
                onClick={() => setComparisonMode('elastic')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                  comparisonMode === 'elastic'
                    ? 'bg-elastic-teal text-elastic-dev-blue'
                    : isDark ? 'bg-white/10 text-white/60 hover:bg-white/20' : 'bg-elastic-dev-blue/10 text-elastic-dev-blue/60'
                }`}
              >
                <FontAwesomeIcon icon={faMagnifyingGlassChart} />
                Elastic ILM
              </button>
            </div>
            
            {/* Architecture Pattern Toggle - only show in Elastic mode */}
            <AnimatePresence>
              {comparisonMode === 'elastic' && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="flex items-center gap-2 overflow-hidden"
                >
                  <div className={`w-px h-6 ${isDark ? 'bg-white/20' : 'bg-elastic-dev-blue/20'}`} />
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setArchitecturePattern('all')}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        architecturePattern === 'all'
                          ? 'bg-elastic-teal/30 text-elastic-teal'
                          : isDark ? 'bg-white/5 text-white/50 hover:bg-white/10' : 'bg-elastic-dev-blue/5 text-elastic-dev-blue/50'
                      }`}
                    >
                      All Tiers
                    </button>
                    <button
                      onClick={() => {
                        setArchitecturePattern('hot-cold-frozen')
                        if (activeTier === 'warm') setActiveTier(null)
                      }}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        architecturePattern === 'hot-cold-frozen'
                          ? 'bg-elastic-teal/30 text-elastic-teal'
                          : isDark ? 'bg-white/5 text-white/50 hover:bg-white/10' : 'bg-elastic-dev-blue/5 text-elastic-dev-blue/50'
                      }`}
                    >
                      Hot → Cold → Frozen
                    </button>
                    <button
                      onClick={() => {
                        setArchitecturePattern('hot-frozen')
                        if (activeTier === 'warm' || activeTier === 'cold') setActiveTier(null)
                      }}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        architecturePattern === 'hot-frozen'
                          ? 'bg-elastic-teal/30 text-elastic-teal'
                          : isDark ? 'bg-white/5 text-white/50 hover:bg-white/10' : 'bg-elastic-dev-blue/5 text-elastic-dev-blue/50'
                      }`}
                    >
                      Hot → Frozen
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className={`w-px h-6 ${isDark ? 'bg-white/20' : 'bg-elastic-dev-blue/20'}`} />
            
            <motion.button
              onClick={() => setIsRunning(!isRunning)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                isRunning 
                  ? 'bg-elastic-pink/30 text-elastic-pink' 
                  : isDark 
                    ? 'bg-elastic-teal/30 text-elastic-teal hover:bg-elastic-teal/40'
                    : 'bg-elastic-blue/30 text-elastic-blue hover:bg-elastic-blue/40'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FontAwesomeIcon icon={isRunning ? faPause : faPlay} />
              {isRunning ? 'Pause' : 'Start Flow'}
            </motion.button>
            
            <motion.button onClick={reset} className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${isDark ? 'bg-white/10 hover:bg-white/20 text-white/80' : 'bg-elastic-dev-blue/10 hover:bg-elastic-dev-blue/20 text-elastic-dev-blue/80'}`} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <FontAwesomeIcon icon={faRotateRight} />
              Reset
            </motion.button>
          </div>
          
          {/* Subtitle based on mode */}
          <AnimatePresence mode="wait">
            {comparisonMode === 'elastic' ? (
              <motion.p 
                key="elastic-subtitle"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-lg mt-2"
              >
                <span className={`font-semibold ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>No more restores. No more rehydration.</span>
                <span className={`${isDark ? 'text-white/60' : 'text-elastic-dev-blue/60'}`}> — Search everything, instantly.</span>
              </motion.p>
            ) : (
              <motion.p 
                key="traditional-subtitle"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-lg mt-2"
              >
                <span className="text-orange-400 font-semibold">Restores required. Data invisible until rehydrated.</span>
                <span className={`${isDark ? 'text-white/60' : 'text-elastic-dev-blue/60'}`}> — Hours to days of waiting.</span>
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Main Visualization */}
        <div className="flex-1 flex flex-col min-h-0">
          <motion.div className="flex-1 relative rounded-2xl overflow-hidden mx-4 min-h-[420px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            {/* Background */}
            <div className={`absolute inset-0 bg-gradient-to-r from-pink-500/20 via-orange-400/15 via-blue-500/15 to-teal-400/20 ${isDark ? '' : 'bg-white/40'}`} />
            <div className={`absolute inset-0 ${isDark ? 'bg-elastic-dev-blue/50' : 'bg-white/30'}`} />
            
            {/* Tier Columns */}
            <div className="absolute inset-0 flex">
              <AnimatePresence mode="popLayout">
              {dataTiers
                .filter((tier) => {
                  // In traditional mode, show all 4 tiers
                  if (comparisonMode === 'traditional') return true
                  // In elastic mode, filter based on architecture pattern
                  if (architecturePattern === 'all') return true
                  if (architecturePattern === 'hot-cold-frozen') return tier.id !== 'warm'
                  if (architecturePattern === 'hot-frozen') return tier.id === 'hot' || tier.id === 'frozen'
                  return true
                })
                .map((tier) => {
                // Get original tier index for proper config/slots lookup
                const tierIndex = dataTiers.findIndex(t => t.id === tier.id)
                const { width, height } = getTierDimensions(tierIndex)
                const config = TIER_CONFIG[tierIndex]
                const slots = tiers[tierIndex]
                
                return (
                  <motion.button
                    key={tier.id}
                    layout
                    className={`flex-1 relative flex flex-col items-center p-6 cursor-pointer border-r last:border-r-0 ${isDark ? 'border-white/5' : 'border-black/5'} ${activeTier === tier.id ? 'bg-white/10' : 'hover:bg-white/[0.02]'}`}
                    onClick={() => setActiveTier(activeTier === tier.id ? null : tier.id)}
                    initial={{ opacity: 0, flex: 0 }}
                    animate={{ opacity: 1, flex: 1 }}
                    exit={{ opacity: 0, flex: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      ease: [0.4, 0, 0.2, 1],
                      layout: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
                    }}
                  >
                    {/* Ball grid wrapper - align to bottom, center horizontally */}
                    <div className="flex-1 w-full flex items-end justify-center">
                      <div 
                        className="relative rounded-lg"
                        style={{ width, height, backgroundColor: `${tier.color}15`, border: `2px solid ${tier.color}40` }}
                      >
                        {/* Slot backgrounds */}
                        {Array.from({ length: config.slots }, (_, i) => {
                          const slot = i + 1
                          const { x, y } = getSlotPosition(slot, tierIndex)
                          return (
                            <div
                              key={`bg-${slot}`}
                              className="absolute rounded-full opacity-20"
                              style={{ width: SLOT_SIZE, height: SLOT_SIZE, left: x, top: y, backgroundColor: tier.color }}
                            />
                          )
                        })}
                        
                        {/* Balls */}
                        {slots.map((ball, slotIndex) => {
                          if (!ball) return null
                          const slot = slotIndex + 1
                          const { x, y } = getSlotPosition(slot, tierIndex)
                          return (
                            <motion.div
                              key={ball.id}
                              className="absolute rounded-full"
                              style={{
                                width: SLOT_SIZE,
                                height: SLOT_SIZE,
                                backgroundColor: tier.color,
                                boxShadow: `0 0 8px ${tier.color}60`,
                              }}
                              animate={{ left: x, top: y }}
                              transition={{
                                type: 'tween',
                                duration: 0.5,
                                ease: [0.4, 0, 0.2, 1],
                              }}
                            />
                          )
                        })}
                        
                        {/* Traditional mode overlay for Cold tier (24+ hour restore) */}
                        <AnimatePresence>
                          {comparisonMode === 'traditional' && tierIndex === 2 && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="absolute inset-0 rounded-lg bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center"
                            >
                              <FontAwesomeIcon icon={faClock} className="text-yellow-400 text-2xl mb-1" />
                              <span className="text-yellow-400 text-xs font-bold text-center">Restore</span>
                              <span className="text-yellow-400 text-xs text-center">On Request</span>
                            </motion.div>
                          )}
                        </AnimatePresence>
                        
                        {/* Traditional mode overlay for Frozen tier (requires manual rehydration) */}
                        <AnimatePresence>
                          {comparisonMode === 'traditional' && tierIndex === 3 && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="absolute inset-0 rounded-lg bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center"
                            >
                              <FontAwesomeIcon icon={faClock} className="text-orange-400 text-2xl mb-1" />
                              <span className="text-orange-400 text-sm font-bold text-center">Manual</span>
                              <span className="text-orange-400 text-sm text-center">Rehydration</span>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                    
                    {/* Tier Info */}
                    <div className="text-center mt-6 w-full">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <FontAwesomeIcon icon={tier.icon} className="text-xl" style={{ color: tier.color }} />
                        <span className="font-bold text-2xl" style={{ color: tier.color }}>{tier.name}</span>
                      </div>
                      <div className={`text-3xl font-black ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
                        {comparisonMode === 'traditional'
                          ? TRADITIONAL_DISPLAY[tier.id]?.costSymbol
                          : ELASTIC_DISPLAY[tier.id]?.costSymbol
                        }<span className="text-xl font-normal opacity-50">/GB</span>
                      </div>
                      <div className={`text-lg mt-1 ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'}`}>
                        {comparisonMode === 'traditional'
                          ? TRADITIONAL_DISPLAY[tier.id]?.latencyShort
                          : ELASTIC_DISPLAY[tier.id]?.latencyShort
                        }
                      </div>
                    </div>
                  </motion.button>
                )
              })}
              </AnimatePresence>
            </div>
            
            {/* Active Tier Details */}
            <AnimatePresence>
              {activeTier && (() => {
                const tier = dataTiers.find(t => t.id === activeTier)
                const displayData = comparisonMode === 'traditional' 
                  ? TRADITIONAL_DISPLAY[tier.id] 
                  : ELASTIC_DISPLAY[tier.id]
                const isTraditional = comparisonMode === 'traditional'
                
                return (
                  <motion.div
                    className={`absolute top-4 left-4 p-4 rounded-xl border-2 z-30 ${isDark ? 'bg-elastic-dev-blue/95' : 'bg-white/95'} backdrop-blur-sm`}
                    style={{ borderColor: tier.color, boxShadow: `0 0 20px ${tier.color}40`, width: 'calc(50% - 24px)' }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {/* Single row with all info */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <FontAwesomeIcon icon={tier.icon} className="text-xl" style={{ color: tier.color }} />
                          <h3 className="text-base font-bold" style={{ color: tier.color }}>{tier.name}</h3>
                        </div>
                        <div className={`w-px h-4 ${isDark ? 'bg-white/20' : 'bg-elastic-dev-blue/20'}`} />
                        <span className={`text-sm ${isDark ? 'text-white/60' : 'text-elastic-dev-blue/60'}`}>{displayData?.subtitle}</span>
                        <div className={`w-px h-4 ${isDark ? 'bg-white/20' : 'bg-elastic-dev-blue/20'}`} />
                        <div className="flex items-center gap-1">
                          <FontAwesomeIcon icon={faClock} className={`text-xs ${isDark ? 'text-white/40' : 'text-elastic-dev-blue/40'}`} />
                          <span className={`text-sm ${isDark ? 'text-white/80' : 'text-elastic-dev-blue/80'}`}>{tier.retention}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {isTraditional && displayData?.painPoint ? (
                          <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-orange-500/10 text-orange-400 text-xs">
                            <FontAwesomeIcon icon={faClock} className="text-xs" />
                            {displayData.painPoint}
                          </div>
                        ) : displayData?.keyBenefit ? (
                          <div className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs ${isDark ? 'bg-elastic-teal/10 text-elastic-teal' : 'bg-elastic-blue/10 text-elastic-blue'}`}>
                            <FontAwesomeIcon icon={faCheckCircle} className="text-xs" />
                            {displayData.keyBenefit}
                          </div>
                        ) : null}
                        <button onClick={() => setActiveTier(null)} className={`text-lg ${isDark ? 'text-white/40 hover:text-white' : 'text-elastic-dev-blue/40 hover:text-elastic-dev-blue'}`}>×</button>
                      </div>
                    </div>
                  </motion.div>
                )
              })()}
            </AnimatePresence>
          </motion.div>

          {/* Data Flow Arrow */}
          <motion.div className="mx-8 mt-2 flex items-center justify-between" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
            <span className={`text-xs font-mono uppercase ${isDark ? 'text-elastic-pink' : 'text-elastic-pink'}`}>Newest Data →</span>
            <div className="flex-1 mx-4 h-px bg-gradient-to-r from-pink-500/40 via-blue-500/40 to-teal-400/40" />
            <span className={`text-xs font-mono uppercase ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>Oldest Data →</span>
          </motion.div>

          {/* Comparison Panel */}
          <motion.div className="mt-8 mx-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
            <div className={`p-4 rounded-2xl ${isDark ? 'bg-white/[0.03]' : 'bg-white/60'}`}>
              {/* Comparison Content */}
              <AnimatePresence mode="wait">
                {comparisonMode === 'elastic' ? (
                  <motion.div
                    key="elastic"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    className="grid grid-cols-4 gap-4"
                  >
                    <div className={`p-3 rounded-xl ${isDark ? 'bg-elastic-teal/10 border border-elastic-teal/30' : 'bg-elastic-blue/20 border border-elastic-blue/30'}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <FontAwesomeIcon icon={faMagnifyingGlassChart} className={isDark ? 'text-elastic-teal' : 'text-elastic-blue'} />
                        <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>Searchable Snapshots</span>
                      </div>
                      <p className={`text-xs ${isDark ? 'text-white/60' : 'text-elastic-dev-blue/60'}`}>
                        Cold & Frozen data queryable without restore
                      </p>
                    </div>
                    <div className={`p-3 rounded-xl ${isDark ? 'bg-elastic-pink/10 border border-elastic-pink/30' : 'bg-elastic-pink/20'}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <FontAwesomeIcon icon={faBolt} className="text-elastic-pink" />
                        <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>Unlimited Lookback</span>
                      </div>
                      <p className={`text-xs ${isDark ? 'text-white/60' : 'text-elastic-dev-blue/60'}`}>
                        Query years of historical data instantly
                      </p>
                    </div>
                    <div className={`p-3 rounded-xl ${isDark ? 'bg-blue-500/10 border border-blue-500/30' : 'bg-blue-500/20'}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <FontAwesomeIcon icon={faClock} className="text-blue-400" />
                        <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>50% Storage Savings</span>
                      </div>
                      <p className={`text-xs ${isDark ? 'text-white/60' : 'text-elastic-dev-blue/60'}`}>
                        Cold tier uses object store for replicas
                      </p>
                    </div>
                    <div className={`p-3 rounded-xl ${isDark ? 'bg-purple-500/10 border border-purple-500/30' : 'bg-purple-500/20'}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <FontAwesomeIcon icon={faCheckCircle} className="text-purple-400" />
                        <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>Never Delete Data</span>
                      </div>
                      <p className={`text-xs ${isDark ? 'text-white/60' : 'text-elastic-dev-blue/60'}`}>
                        Frozen tier so cheap you can keep everything
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="traditional"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    className="grid grid-cols-4 gap-4"
                  >
                    <div className={`p-3 rounded-xl ${isDark ? 'bg-orange-500/10 border border-orange-500/30' : 'bg-orange-500/20'}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <FontAwesomeIcon icon={faClock} className="text-orange-400" />
                        <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>24+ Hour Restores</span>
                      </div>
                      <p className={`text-xs ${isDark ? 'text-white/60' : 'text-elastic-dev-blue/60'}`}>
                        Cold data requires support ticket to access
                      </p>
                    </div>
                    <div className={`p-3 rounded-xl ${isDark ? 'bg-red-500/10 border border-red-500/30' : 'bg-red-500/20'}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <FontAwesomeIcon icon={faDatabase} className="text-red-400" />
                        <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>Data Invisible</span>
                      </div>
                      <p className={`text-xs ${isDark ? 'text-white/60' : 'text-elastic-dev-blue/60'}`}>
                        Frozen data can't be searched until rehydrated
                      </p>
                    </div>
                    <div className={`p-3 rounded-xl ${isDark ? 'bg-yellow-500/10 border border-yellow-500/30' : 'bg-yellow-500/20'}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <FontAwesomeIcon icon={faSliders} className="text-yellow-400" />
                        <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>Limited Lookback</span>
                      </div>
                      <p className={`text-xs ${isDark ? 'text-white/60' : 'text-elastic-dev-blue/60'}`}>
                        No visibility into historical data
                      </p>
                    </div>
                    <div className={`p-3 rounded-xl ${isDark ? 'bg-gray-500/10 border border-gray-500/30' : 'bg-gray-500/20'}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <FontAwesomeIcon icon={faHardDrive} className="text-gray-400" />
                        <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>Forced Deletion</span>
                      </div>
                      <p className={`text-xs ${isDark ? 'text-white/60' : 'text-elastic-dev-blue/60'}`}>
                        Cost forces deletion of valuable data
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default DataTieringScene

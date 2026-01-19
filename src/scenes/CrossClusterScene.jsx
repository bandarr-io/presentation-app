import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faServer, faMagnifyingGlass, faCloud, faBuilding } from '@fortawesome/free-solid-svg-icons'

const remoteClusters = [
  { id: 'onprem', name: 'On-Prem Data Centers', type: 'onprem', color: '#48EFCF' },
  { id: 'aws', name: 'AWS', type: 'cloud', color: '#FF9900' },
  { id: 'gcp', name: 'Google Cloud Platform', type: 'cloud', color: '#F04E98' },
  { id: 'azure', name: 'Azure', type: 'cloud', color: '#0078D4' },
]

const benefits = [
  { text: 'Search across all data', highlight: 'limit data transfer costs' },
  { text: 'Data privacy and data sovereignty', highlight: 'global compliance' },
  { text: 'Faster, more responsive search', highlight: 'reduced app latency' },
  { text: 'High availability for Disaster Recovery', highlight: 'business continuity' },
  { text: 'Seamless hybrid & multi-cloud', highlight: 'deployment flexibility' },
]

function CrossClusterScene() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [queryPhase, setQueryPhase] = useState('idle')
  const [isAnimating, setIsAnimating] = useState(false)
  const containerRef = useRef(null)

  const runAnimation = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setQueryPhase('sending')
    
    // Balls travel for 700ms, then stay at clusters for 2000ms, then return for 700ms
    setTimeout(() => setQueryPhase('processing'), 700)  // Balls arrive
    setTimeout(() => setQueryPhase('returning'), 2700)  // After 2s stay, return
    setTimeout(() => {
      setQueryPhase('complete')
      setTimeout(() => {
        setQueryPhase('idle')
        setIsAnimating(false)
      }, 1500)
    }, 3400)  // Return complete
  }

  useEffect(() => {
    const timer = setTimeout(runAnimation, 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="scene !py-2">
      <div className="max-w-[98%] mx-auto w-full h-full flex flex-col">
        {/* Header */}
        <motion.div
          className="text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-elastic-teal text-sm font-mono uppercase tracking-widest">
            Distributed Architecture
          </span>
          <h2 className={`text-4xl md:text-5xl font-bold mt-2 ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
            Distributed by Design — <span className="gradient-text">Connected by Elastic</span>
          </h2>
          <p className={`text-lg mt-2 ${isDark ? 'text-white/60' : 'text-elastic-dev-blue/60'}`}>
            Elastic powers distributed data access with secure, low-latency cross-cluster operations
          </p>
        </motion.div>

        {/* Main content */}
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex-1 flex gap-6 min-h-0">
            {/* Benefits sidebar */}
            <motion.div 
              className="w-96 flex flex-col justify-center gap-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className={`p-4 rounded-xl border-l-4 ${isDark ? 'bg-white/[0.03]' : 'bg-white/60'}`}
                  style={{ borderLeftColor: remoteClusters[index]?.color || '#FEC514' }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <div className={`text-base ${isDark ? 'text-white/80' : 'text-elastic-dev-blue/80'}`}>
                    {benefit.text} →
                  </div>
                  <div 
                    className="text-lg font-bold"
                    style={{ color: remoteClusters[index]?.color || '#FEC514' }}
                  >
                    {benefit.highlight}
                  </div>
                </motion.div>
              ))}
            </motion.div>

          {/* Main visualization */}
          <motion.div 
            ref={containerRef}
            className={`flex-1 relative rounded-2xl border overflow-hidden ${
              isDark ? 'bg-elastic-dev-blue/30 border-white/10' : 'bg-white/80 border-elastic-dev-blue/10'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {/* Layout: Main cluster at top, lines, then remote clusters */}
            <div className="w-full h-full flex flex-col">
              
              {/* Main Elastic Cluster - Top */}
              <div className="flex justify-center pt-8 pb-4">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.div
                    className={`px-10 py-5 rounded-2xl border-2 ${
                      isDark ? 'bg-elastic-dev-blue' : 'bg-white'
                    }`}
                    style={{ 
                      borderColor: queryPhase === 'complete' ? '#48EFCF' : (isDark ? 'rgba(72,239,207,0.5)' : 'rgba(72,239,207,0.8)'),
                      boxShadow: queryPhase === 'complete' ? '0 0 30px rgba(72,239,207,0.5)' : 'none'
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <img 
                        src="/logo-elastic-glyph-color.png" 
                        alt="Elastic" 
                        className="w-24 h-24 object-contain"
                      />
                      <div>
                        <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
                          elastic
                        </div>
                        <div className={`text-sm ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'}`}>
                          Main Cluster
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>

              {/* Connection Lines Area */}
              <div className="flex-1 relative min-h-[180px]">
                <svg 
                  className="absolute inset-0 w-full h-full" 
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>

                  {remoteClusters.map((cluster, index) => {
                    // X positions: 12.5%, 37.5%, 62.5%, 87.5%
                    const endX = 12.5 + (index * 25)
                    const startX = 50
                    // Control point creates the curve - offset horizontally toward destination
                    const controlX = endX
                    const controlY = 30 // Creates a nice downward curve
                    
                    return (
                      <g key={cluster.id}>
                        {/* Curved line using cubic bezier for smoother curves */}
                        <motion.path
                          d={`M ${startX} 0 C ${startX} ${controlY}, ${controlX} ${controlY}, ${endX} 100`}
                          fill="none"
                          stroke="#48EFCF"
                          strokeWidth="0.4"
                          strokeOpacity="0.7"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                        />
                      </g>
                    )
                  })}
                </svg>

                {/* Animated balls that follow the bezier curve path */}
                {queryPhase === 'sending' && remoteClusters.map((cluster, index) => {
                  const endX = 12.5 + (index * 25)
                  const startX = 50
                  const controlY = 30
                  
                  // Calculate points along cubic bezier: M startX,0 C startX,controlY endX,controlY endX,100
                  // B(t) = (1-t)³P0 + 3(1-t)²tP1 + 3(1-t)t²P2 + t³P3
                  const bezierPoint = (t) => {
                    const mt = 1 - t
                    const x = mt*mt*mt*startX + 3*mt*mt*t*startX + 3*mt*t*t*endX + t*t*t*endX
                    const y = mt*mt*mt*0 + 3*mt*mt*t*controlY + 3*mt*t*t*controlY + t*t*t*100
                    return { x, y }
                  }
                  
                  // Sample curve at multiple points for smooth animation
                  const points = [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1].map(bezierPoint)
                  const leftKeyframes = points.map(p => `${p.x}%`)
                  const topKeyframes = points.map(p => `${p.y}%`)
                  
                  return (
                    <motion.div
                      key={`send-${cluster.id}`}
                      className="absolute w-4 h-4 rounded-full bg-elastic-teal"
                      style={{ 
                        boxShadow: '0 0 12px 4px rgba(72, 239, 207, 0.6)',
                        marginLeft: '-8px',
                        marginTop: '-8px'
                      }}
                      initial={{ left: '50%', top: '0%', opacity: 0, scale: 0 }}
                      animate={{ 
                        left: leftKeyframes,
                        top: topKeyframes,
                        opacity: [0, 1, 1, 1, 1, 1, 1, 0],
                        scale: [0, 1, 1, 1, 1, 1, 1, 0.5]
                      }}
                      transition={{ 
                        duration: 0.7, 
                        ease: 'linear'
                      }}
                    />
                  )
                })}

                {queryPhase === 'returning' && remoteClusters.map((cluster, index) => {
                  const endX = 12.5 + (index * 25)
                  const startX = 50
                  const controlY = 30
                  
                  // Reverse path: from endX,100 back to startX,0
                  const bezierPoint = (t) => {
                    const mt = 1 - t
                    // Reverse: swap start and end
                    const x = mt*mt*mt*endX + 3*mt*mt*t*endX + 3*mt*t*t*startX + t*t*t*startX
                    const y = mt*mt*mt*100 + 3*mt*mt*t*controlY + 3*mt*t*t*controlY + t*t*t*0
                    return { x, y }
                  }
                  
                  const points = [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1].map(bezierPoint)
                  const leftKeyframes = points.map(p => `${p.x}%`)
                  const topKeyframes = points.map(p => `${p.y}%`)
                  
                  return (
                    <motion.div
                      key={`return-${cluster.id}`}
                      className="absolute w-4 h-4 rounded-full"
                      style={{ 
                        backgroundColor: cluster.color,
                        boxShadow: `0 0 12px 4px ${cluster.color}99`,
                        marginLeft: '-8px',
                        marginTop: '-8px'
                      }}
                      initial={{ left: `${endX}%`, top: '100%', opacity: 0, scale: 0 }}
                      animate={{ 
                        left: leftKeyframes,
                        top: topKeyframes,
                        opacity: [0, 1, 1, 1, 1, 1, 1, 0],
                        scale: [0, 1, 1, 1, 1, 1, 1, 0.5]
                      }}
                      transition={{ 
                        duration: 0.7, 
                        ease: 'linear'
                      }}
                    />
                  )
                })}
              </div>

              {/* Remote Clusters Row - Bottom */}
              <div className="px-6 pb-8">
                <div className="grid grid-cols-4 gap-4">
                  {remoteClusters.map((cluster, index) => (
                    <motion.div
                      key={cluster.id}
                      className="flex flex-col items-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      {/* Cluster card */}
                      <div className="relative w-full">
                        {/* Animated gradient border during processing */}
                        {queryPhase === 'processing' && (
                          <motion.div
                            className="absolute -inset-[3px] rounded-2xl"
                            style={{
                              background: `linear-gradient(90deg, ${cluster.color}, ${cluster.color}66, ${cluster.color}, ${cluster.color}66, ${cluster.color})`,
                              backgroundSize: '200% 100%',
                            }}
                            animate={{ backgroundPosition: ['0% 50%', '100% 50%'] }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          />
                        )}
                        
                        <motion.div
                          className={`relative w-full p-4 rounded-2xl border-2 ${
                            isDark ? 'bg-elastic-dev-blue' : 'bg-white'
                          }`}
                          style={{ 
                            borderColor: queryPhase === 'processing' ? 'transparent' : (isDark ? 'rgba(255,255,255,0.2)' : 'rgba(16,28,63,0.2)'),
                          }}
                        >
                          <div className="flex items-center justify-center gap-3 mb-3">
                            <div 
                              className="w-9 h-9 rounded-lg flex items-center justify-center"
                              style={{ backgroundColor: `${cluster.color}20` }}
                            >
                              <FontAwesomeIcon 
                                icon={cluster.type === 'cloud' ? faCloud : faBuilding} 
                                style={{ color: cluster.color }}
                                className="text-base"
                              />
                            </div>
                            <span className={`text-lg font-bold ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
                              elastic
                            </span>
                          </div>
                          
                          <div 
                            className="text-center py-2 px-3 rounded-xl text-sm font-semibold"
                            style={{ backgroundColor: `${cluster.color}20`, color: cluster.color }}
                          >
                            {cluster.name}
                          </div>
                        </motion.div>
                      </div>

                      {/* Cross Cluster Search badge */}
                      <div
                        className={`mt-3 px-3 py-1.5 rounded-full text-xs flex items-center gap-2 ${
                          isDark ? 'bg-white/10 text-white/70' : 'bg-elastic-dev-blue/10 text-elastic-dev-blue/70'
                        }`}
                      >
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="text-[10px]" />
                        Cross Cluster Search
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Status indicator */}
            <motion.div
              className={`absolute top-4 left-4 px-4 py-2 rounded-full text-sm flex items-center gap-2 ${
                isDark ? 'bg-white/10' : 'bg-elastic-dev-blue/10'
              }`}
            >
              {queryPhase === 'idle' && (
                <span className={isDark ? 'text-white/60' : 'text-elastic-dev-blue/60'}>Ready to query</span>
              )}
              {queryPhase === 'sending' && (
                <>
                  <motion.div className="w-2 h-2 rounded-full bg-elastic-teal" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 0.5, repeat: Infinity }} />
                  <span className="text-elastic-teal">Sending query...</span>
                </>
              )}
              {queryPhase === 'processing' && (
                <>
                  <motion.div className="w-2 h-2 rounded-full bg-elastic-yellow" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 0.5, repeat: Infinity }} />
                  <span className="text-elastic-yellow">Processing...</span>
                </>
              )}
              {queryPhase === 'returning' && (
                <>
                  <motion.div className="w-2 h-2 rounded-full bg-elastic-blue" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 0.5, repeat: Infinity }} />
                  <span className="text-elastic-blue">Aggregating results...</span>
                </>
              )}
              {queryPhase === 'complete' && (
                <span className="text-elastic-teal">✓ Results from 4 clusters in 42ms</span>
              )}
            </motion.div>

            {/* Run Query Button - aligned with status indicator */}
            <motion.button
              className="absolute top-4 right-4 px-4 py-2 rounded-full bg-gradient-to-r from-elastic-teal to-elastic-blue text-white text-sm flex items-center gap-2 disabled:opacity-50"
              whileHover={{ scale: isAnimating ? 1 : 1.05 }}
              whileTap={{ scale: isAnimating ? 1 : 0.95 }}
              onClick={runAnimation}
              disabled={isAnimating}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              {isAnimating ? 'Running...' : 'Run Query'}
            </motion.button>
          </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CrossClusterScene

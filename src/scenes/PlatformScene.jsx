import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faDesktop,
  faCode,
  faServer,
  faCubes,
  faShieldHalved,
  faChartLine,
  faMagnifyingGlass,
  faNetworkWired,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons'

// Data source categories (left side)
const dataSources = [
  {
    id: 'endpoints',
    name: 'Endpoints',
    subtitle: 'EDR & Telemetry',
    icon: faDesktop,
    color: '#F04E98',
    integrations: [
      'Elastic Defend',
      'Microsoft Defender',
      'CrowdStrike',
      'SentinelOne',
      'Carbon Black',
      'Trellix EDR',
    ],
  },
  {
    id: 'applications',
    name: 'Applications',
    subtitle: 'APM & Tracing',
    icon: faCode,
    color: '#48EFCF',
    integrations: [
      'Go',
      'Python',
      'Node.js',
      'Java',
      '.NET',
      'Ruby',
      'PHP',
    ],
  },
  {
    id: 'systemlogs',
    name: 'System Logs',
    subtitle: 'Metrics & Events',
    icon: faServer,
    color: '#0B64DD',
    integrations: [
      'Windows',
      'Linux',
      'macOS',
      'Kubernetes',
      'Docker',
      'VMware',
    ],
  },
  {
    id: 'services',
    name: 'Services',
    subtitle: 'SaaS & Databases',
    icon: faCubes,
    color: '#FEC514',
    integrations: [
      'Salesforce',
      'MySQL',
      'Oracle',
      'ServiceNow',
      'NGINX',
      'Kafka',
    ],
  },
  {
    id: 'network',
    name: 'Network/Security',
    subtitle: 'Alerts & Sensors',
    icon: faNetworkWired,
    color: '#FF957D',
    integrations: [
      'Cisco',
      'Palo Alto',
      'Zscaler',
      'Okta',
      'CyberArk',
      'Zeek',
    ],
  },
]


// Solution outputs (right side)
const solutionOutputs = [
  { 
    id: 'security', 
    name: 'Security', 
    tagline: 'Protect Everything',
    icon: faShieldHalved, 
    color: '#F04E98',
    description: 'Unified SIEM, endpoint, and cloud security powered by AI-driven threat detection.',
    capabilities: ['SIEM & XDR', 'Endpoint Protection', 'Cloud Security', 'Threat Intelligence'],
  },
  { 
    id: 'observability', 
    name: 'Observability', 
    tagline: 'See Everything',
    icon: faChartLine, 
    color: '#48EFCF',
    description: 'Logs, metrics, traces, and APM unified for complete visibility across your stack.',
    capabilities: ['APM', 'Log Analytics', 'Infrastructure Monitoring', 'Synthetics'],
  },
  { 
    id: 'search', 
    name: 'Search', 
    tagline: 'Find Everything',
    icon: faMagnifyingGlass, 
    color: '#FEC514',
    description: 'AI-powered search experiences with vector, semantic, and hybrid capabilities.',
    capabilities: ['Vector Search', 'Semantic Search', 'RAG Applications', 'Relevance Tuning'],
  },
]

// Helper to calculate point on quadratic bezier curve
function getQuadraticBezierPoint(t, p0, p1, p2) {
  const x = (1 - t) * (1 - t) * p0.x + 2 * (1 - t) * t * p1.x + t * t * p2.x
  const y = (1 - t) * (1 - t) * p0.y + 2 * (1 - t) * t * p1.y + t * t * p2.y
  return { x, y }
}

// Animated particle component
function AnimatedParticle({ color, pathPoints, delay, containerSize }) {
  if (!containerSize.width || !containerSize.height) return null
  
  // Convert viewBox coordinates to screen coordinates
  const scaleX = containerSize.width / 280
  const scaleY = containerSize.height / 442
  
  const screenPoints = pathPoints.map(p => ({
    x: p.x * scaleX,
    y: p.y * scaleY
  }))
  
  return (
    <motion.div
      className="absolute w-3 h-3 rounded-full pointer-events-none"
      style={{
        backgroundColor: color,
        boxShadow: `0 0 8px ${color}, 0 0 12px ${color}`,
        left: 0,
        top: 0,
      }}
      animate={{
        x: screenPoints.map(p => p.x - 6),
        y: screenPoints.map(p => p.y - 6),
      }}
      transition={{
        duration: 2,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut",
        times: screenPoints.map((_, i) => i / (screenPoints.length - 1)),
      }}
    />
  )
}

function PlatformScene() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [activeOutput, setActiveOutput] = useState(null)
  const [activeSource, setActiveSource] = useState(null)
  const svgContainerRef = useRef(null)
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })

  // Track container size for particle positioning using ResizeObserver
  useEffect(() => {
    if (!svgContainerRef.current) return
    
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect
        setContainerSize({ width, height })
      }
    })
    
    resizeObserver.observe(svgContainerRef.current)
    return () => resizeObserver.disconnect()
  }, [])

  // Generate path points for particles
  const leftPathPoints = dataSources.map((_, i) => {
    const startY = 44 + i * 88
    const endY = 220
    const points = []
    // Generate points along the bezier curve
    for (let t = 0; t <= 1; t += 0.05) {
      const p0 = { x: 0, y: startY }
      const p1 = { x: 70, y: startY }
      const p2 = { x: 140, y: endY }
      points.push(getQuadraticBezierPoint(t, p0, p1, p2))
    }
    return points
  })

  const rightPathPoints = solutionOutputs.map((_, i) => {
    const startY = 221
    const endY = 130 + i * 90
    const points = []
    for (let t = 0; t <= 1; t += 0.05) {
      const p0 = { x: 140, y: startY }
      const p1 = { x: 210, y: (startY + endY) / 2 }
      const p2 = { x: 280, y: endY }
      points.push(getQuadraticBezierPoint(t, p0, p1, p2))
    }
    return points
  })

  return (
    <div className="scene !py-4">
      <div className="max-w-[98%] mx-auto w-full h-full flex flex-col">
        {/* Header */}
        <motion.div
          className="text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className={`text-eyebrow text-sm ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
            The Platform
          </span>
          <h2 className={`text-headline text-3xl md:text-4xl font-extrabold mt-1 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            <span className="gradient-text">Comprehensive data ingestion</span> for{' '}
            <span className="underline decoration-elastic-teal decoration-2 underline-offset-4">unified, actionable insights</span>
          </h2>
        </motion.div>

        {/* Main flow diagram */}
        <div className="flex-1 flex items-center justify-between min-h-0 relative mx-8 my-6">
          
          {/* Left: Data Sources */}
          <motion.div 
            className="flex flex-col gap-3"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {dataSources.map((source, index) => {
              const isActive = activeSource === source.id

              return (
              <motion.button
                key={source.id}
                type="button"
                onClick={() => setActiveSource(isActive ? null : source.id)}
                className={`relative p-4 rounded-xl border-2 w-64 flex items-center gap-3 text-left transition-all ${
                  isDark ? 'bg-elastic-dev-blue' : 'bg-white'
                } ${isActive ? 'scale-105' : 'hover:scale-[1.02]'}`}
                style={{
                  borderColor: isActive ? source.color : `${source.color}40`,
                  boxShadow: isActive ? `0 0 20px ${source.color}30` : 'none',
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ x: 5 }}
              >
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${source.color}20` }}
                >
                  <FontAwesomeIcon icon={source.icon} className="text-xl" style={{ color: source.color }} />
                </div>
                <div>
                  <div className={`font-bold text-lg ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
                    {source.name}
                  </div>
                  <div className={`text-xs ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'}`}>
                    {source.subtitle}
                  </div>
                </div>
              </motion.button>
              )
            })}
          </motion.div>

          {/* Center: SVG Flow Visualization + Platform Hub */}
          <div 
            ref={svgContainerRef}
            className="relative flex-1 mx-4 self-stretch" 
            style={{ minWidth: '280px' }}
          >
            {/* SVG for bezier curve lines only */}
            <svg 
              className="absolute inset-0 w-full h-full" 
              viewBox="0 0 280 442"
              preserveAspectRatio="none"
            >
              {/* Left converging lines - from data sources to hub */}
              {dataSources.map((source, i) => {
                const startY = 44 + i * 88
                const endX = 140
                const endY = 220
                const path = `M 0 ${startY} Q 70 ${startY} 140 ${endY}`
                
                return (
                  <motion.path
                    key={`left-line-${source.id}`}
                    d={path}
                    fill="none"
                    stroke={source.color}
                    strokeWidth="2"
                    strokeOpacity="0.4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.2 + i * 0.1 }}
                  />
                )
              })}

              {/* Right diverging lines - from hub to solutions */}
              {solutionOutputs.map((solution, i) => {
                const startY = 221
                const endY = 130 + i * 90
                const path = `M 140 ${startY} Q 210 ${(startY + endY) / 2} 280 ${endY}`
                
                return (
                  <motion.path
                    key={`right-line-${solution.id}`}
                    d={path}
                    fill="none"
                    stroke={solution.color}
                    strokeWidth="2"
                    strokeOpacity={activeOutput === solution.id || !activeOutput ? 0.4 : 0.15}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.4 + i * 0.1 }}
                  />
                )
              })}
            </svg>

            {/* HTML particles that follow the bezier curves */}
            {containerSize.width > 0 && dataSources.map((source, i) => (
              <AnimatedParticle
                key={`particle-left-${source.id}-${containerSize.width}`}
                color={source.color}
                pathPoints={leftPathPoints[i]}
                delay={i * 0.3 + 1}
                containerSize={containerSize}
              />
            ))}
            {containerSize.width > 0 && solutionOutputs.map((solution, i) => (
              <AnimatedParticle
                key={`particle-right-${solution.id}-${containerSize.width}`}
                color={solution.color}
                pathPoints={rightPathPoints[i]}
                delay={i * 0.4 + 0.5}
                containerSize={containerSize}
              />
            ))}
          </div>

          {/* Right: Solution Cards */}
          <motion.div 
            className="flex flex-col gap-3 w-64"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            {solutionOutputs.map((solution, index) => {
              const isActive = activeOutput === solution.id
              const isOther = activeOutput && activeOutput !== solution.id
              
              return (
                <motion.button
                  key={solution.id}
                  className={`relative p-4 rounded-2xl border-2 text-left transition-all ${
                    isDark ? 'bg-elastic-dev-blue' : 'bg-white'
                  }`}
                  style={{
                    borderColor: isActive ? solution.color : `${solution.color}40`,
                    opacity: isOther ? 0.4 : 1,
                  }}
                  onClick={() => setActiveOutput(isActive ? null : solution.id)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: isOther ? 0.4 : 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  {/* Glow effect */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-2xl pointer-events-none"
                      style={{ boxShadow: `0 0 25px ${solution.color}40` }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    />
                  )}
                  
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${solution.color}20` }}
                    >
                      <FontAwesomeIcon 
                        icon={solution.icon} 
                        className="text-xl"
                        style={{ color: solution.color }} 
                      />
                    </div>
                    <div className="flex-1">
                      <div 
                        className="text-eyebrow text-[10px]"
                        style={{ color: solution.color }}
                      >
                        {solution.tagline}
                      </div>
                      <div className={`font-bold text-lg ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
                        {solution.name}
                      </div>
                    </div>
                  </div>

                  {/* Expanded content */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <p className={`text-sm mt-3 mb-3 ${isDark ? 'text-white/70' : 'text-elastic-dev-blue/70'}`}>
                          {solution.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {solution.capabilities.map((cap) => (
                            <span
                              key={cap}
                              className="text-[10px] px-2 py-1 rounded-full font-medium"
                              style={{ backgroundColor: `${solution.color}20`, color: solution.color }}
                            >
                              {cap}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              )
            })}
          </motion.div>

          {/* Platform Hub - centered in main container */}
          <motion.div 
            className="absolute left-[48%] top-[35%] -translate-x-1/2 -translate-y-1/2 z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className={`relative w-32 h-32 rounded-full flex items-center justify-center ${
              isDark ? 'bg-elastic-dev-blue border-2 border-elastic-blue/50' : 'bg-white border-2 border-elastic-blue/30'
            }`}>
              {/* Pulsing ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-elastic-blue"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.6, 0, 0.6],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Elastic logo */}
              <img 
                src="/logo-elastic-glyph-color.png" 
                alt="Elastic" 
                className="w-40 h-auto"
              />
            </div>
          </motion.div>
        </div>

        {/* Bottom summary with transition hook */}
        <motion.div 
          className={`mt-3 p-4 rounded-xl ${isDark ? 'bg-white/[0.03]' : 'bg-white/60'}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center justify-between">
            {/* Stats */}
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-elastic-teal">400+</span>
                <span className={`text-sm ${isDark ? 'text-white/60' : 'text-elastic-dev-blue/60'}`}>
                  Data Integrations
                </span>
              </div>
              <div className={`w-px h-8 ${isDark ? 'bg-white/10' : 'bg-elastic-dev-blue/10'}`} />
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-elastic-pink">1</span>
                <span className={`text-sm ${isDark ? 'text-white/60' : 'text-elastic-dev-blue/60'}`}>
                  Unified Platform
                </span>
              </div>
              <div className={`w-px h-8 ${isDark ? 'bg-white/10' : 'bg-elastic-dev-blue/10'}`} />
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-elastic-yellow">∞</span>
                <span className={`text-sm ${isDark ? 'text-white/60' : 'text-elastic-dev-blue/60'}`}>
                  Actionable Insights
                </span>
              </div>
            </div>
            
            {/* Transition hook */}
            <motion.div 
              className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                isDark ? 'bg-elastic-blue/20 text-elastic-teal' : 'bg-elastic-blue/10 text-elastic-blue'
              }`}
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-sm font-medium">Let's look inside the platform</span>
              <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default PlatformScene

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBolt, faGear, faDatabase, faMagnifyingGlass, faBrain, faChartLine, faArrowsRotate, faLink, faBullseye } from '@fortawesome/free-solid-svg-icons'

const dataSources = [
  { id: 'endpoints', label: 'Endpoints', color: '#48EFCF' },
  { id: 'applications', label: 'Applications', color: '#0B64DD' },
  { id: 'infrastructure', label: 'Infrastructure', color: '#F04E98' },
  { id: 'services', label: 'Services', color: '#FEC514' },
  { id: 'network', label: 'Network/Security', color: '#FF957D' },
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

const solutions = [
  { id: 'elasticsearch', label: 'Elasticsearch', tagline: 'Build Your Own', color: '#FEC514' },
  { id: 'observability', label: 'Observability', tagline: 'Out-of-the-Box', color: '#F04E98' },
  { id: 'security', label: 'Security', tagline: 'Out-of-the-Box', color: '#FF957D' },
]

const deploymentOptions = [
  { id: 'self', label: 'Self-Managed', desc: 'Full control on your infrastructure' },
  { id: 'cloud', label: 'Elastic Cloud', desc: 'Managed service on AWS, GCP, Azure' },
  { id: 'serverless', label: 'Serverless', desc: 'Zero ops, automatic scaling' },
]

const outcomes = [
  { id: 'dashboards', label: 'Dashboards', icon: faChartLine, color: '#48EFCF' },
  { id: 'integrations', label: 'Integrations', icon: faLink, color: '#0B64DD' },
  { id: 'orchestration', label: 'Orchestration', icon: faBullseye, color: '#F04E98' },
  { id: 'automation', label: 'Workflows', icon: faBolt, color: '#FEC514' },
]

function FlowingParticles({ direction = 'right', colors, count = 8 }) {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      color: colors[i % colors.length],
      delay: (i / count) * 2,
      y: 10 + (i % 5) * 20,
    }))
    setParticles(newParticles)
  }, [colors, count])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full"
          style={{
            backgroundColor: particle.color,
            top: `${particle.y}%`,
            left: direction === 'right' ? '-10%' : '110%',
          }}
          animate={{
            x: direction === 'right' ? [0, 120] : [0, -120],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  )
}

function UnifiedStrategyScene() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [hoveredCapability, setHoveredCapability] = useState(null)
  const [hoveredSolution, setHoveredSolution] = useState(null)

  const sourceColors = dataSources.map(s => s.color)
  const outcomeColors = outcomes.map(o => o.color)

  return (
    <div className="scene">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className={`text-eyebrow text-sm ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
            The Elastic Search AI Platform
          </span>
          <h2 className={`text-headline text-4xl md:text-5xl font-extrabold mt-4 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            <span className="gradient-text">All Your Data</span>, Real-Time, At Scale
          </h2>
          <p className={`text-paragraph text-lg mt-3 max-w-2xl mx-auto ${isDark ? 'text-elastic-light-grey/80' : 'text-elastic-ink'}`}>
            Accelerate mission outcomes by finding insights from any data source
          </p>
        </motion.div>

        {/* Main Platform Visualization */}
        <div className="relative">
          {/* Using 5 columns: sources | arrow | platform | arrow | outcomes */}
          <div className="grid gap-3 items-stretch" style={{ gridTemplateColumns: '1fr 60px 4fr 60px 1fr' }}>
            
            {/* Left: Data Sources */}
            <motion.div 
              className="flex flex-col justify-center"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p className={`text-xs uppercase tracking-widest mb-3 text-center ${isDark ? 'text-white/40' : 'text-elastic-dev-blue/40'}`}>
                Any Data Source
              </p>
              <div className="space-y-2">
                {dataSources.map((source, index) => (
                  <motion.div
                    key={source.id}
                    className={`p-2 rounded-lg border text-center text-xs relative overflow-hidden ${
                      isDark 
                        ? 'bg-white/[0.03] border-white/10' 
                        : 'bg-white/80 border-elastic-dev-blue/10'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    whileHover={{ scale: 1.02, borderColor: source.color }}
                  >
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 w-1"
                      style={{ backgroundColor: source.color }}
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    />
                    <span className={isDark ? 'text-white/70' : 'text-elastic-dev-blue/70'}>
                      {source.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Left Arrow with flowing particles */}
            <motion.div 
              className="relative flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <FlowingParticles direction="right" colors={sourceColors} count={10} />
            </motion.div>

            {/* Center: Platform Architecture */}
            <motion.div 
              className="flex flex-col justify-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              {/* Solutions Row */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                {solutions.map((solution, index) => (
                  <motion.div
                    key={solution.id}
                    className={`relative px-4 py-3 rounded-xl border-2 cursor-pointer transition-all text-center ${
                      hoveredSolution === solution.id
                        ? 'scale-[1.02]'
                        : ''
                    } ${isDark ? 'bg-white/[0.03]' : 'bg-white/90'}`}
                    style={{ 
                      borderColor: solution.color,
                      borderTopWidth: '4px',
                    }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    onMouseEnter={() => setHoveredSolution(solution.id)}
                    onMouseLeave={() => setHoveredSolution(null)}
                    whileHover={{ y: -3 }}
                  >
                    <div className={`text-xs mb-1 ${isDark ? 'text-white/40' : 'text-elastic-dev-blue/40'}`}>
                      {solution.tagline}
                    </div>
                    <div className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
                      {solution.label}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Main Platform Box */}
              <motion.div
                className={`relative p-5 rounded-2xl border-2 ${
                  isDark 
                    ? 'bg-elastic-dev-blue/50 border-elastic-blue/30' 
                    : 'bg-white border-elastic-blue/20 shadow-lg'
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className={`text-center text-sm font-semibold mb-4 ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
                  Search AI Platform
                </div>

                {/* Capabilities Row */}
                <div className="grid grid-cols-7 gap-1 items-end">
                  {platformCapabilities.map((cap, index) => (
                    <motion.div
                      key={cap.id}
                      className={`relative px-2 py-2 rounded-lg text-center cursor-pointer transition-all ${
                        cap.core 
                          ? isDark 
                            ? 'bg-elastic-blue/30 border border-elastic-blue/50' 
                            : 'bg-elastic-blue/10 border border-elastic-blue/30'
                          : isDark 
                            ? 'bg-white/[0.05] border border-white/10' 
                            : 'bg-elastic-light-grey border border-elastic-dev-blue/10'
                      } ${hoveredCapability === cap.id ? 'scale-105 z-10' : ''}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + index * 0.05 }}
                      onMouseEnter={() => setHoveredCapability(cap.id)}
                      onMouseLeave={() => setHoveredCapability(null)}
                    >
                      <div className="text-base mb-1"><FontAwesomeIcon icon={cap.icon} /></div>
                      <div className={`text-[10px] leading-tight ${
                        cap.core 
                          ? isDark ? 'text-white font-medium' : 'text-elastic-blue font-medium'
                          : isDark ? 'text-white/60' : 'text-elastic-dev-blue/60'
                      }`}>
                        {cap.label}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Search AI Lake Badge */}
                <div className="grid grid-cols-7 gap-1 mt-3">
                  <div className="col-span-2" />
                  <motion.div
                    className="col-span-3"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 }}
                  >
                    <div className={`w-full py-1.5 rounded-full text-xs font-medium text-center ${
                      isDark 
                        ? 'bg-elastic-teal/20 text-elastic-teal border border-elastic-teal/30' 
                        : 'bg-elastic-blue/10 text-elastic-blue border border-elastic-blue/30'
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
              >
                {deploymentOptions.map((option, index) => (
                  <motion.div
                    key={option.id}
                    className={`px-3 py-2 rounded-xl border text-center ${
                      isDark 
                        ? 'bg-white/[0.02] border-white/10' 
                        : 'bg-white/60 border-elastic-dev-blue/10'
                    }`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 + index * 0.1 }}
                    whileHover={{ y: -2 }}
                  >
                    <div className={`text-xs font-medium ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
                      {option.label}
                    </div>
                    <div className={`text-[10px] ${isDark ? 'text-white/40' : 'text-elastic-dev-blue/40'}`}>
                      {option.desc}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Arrow with flowing particles */}
            <motion.div 
              className="relative flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <FlowingParticles direction="right" colors={outcomeColors} count={8} />
            </motion.div>

            {/* Right: Outcomes */}
            <motion.div 
              className="flex flex-col justify-center"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <p className={`text-xs uppercase tracking-widest mb-3 text-center ${isDark ? 'text-white/40' : 'text-elastic-dev-blue/40'}`}>
                Outcomes
              </p>
              <div className="space-y-2">
                {outcomes.map((outcome, index) => (
                  <motion.div
                    key={outcome.id}
                    className={`p-2 rounded-lg border text-center relative overflow-hidden ${
                      isDark 
                        ? 'bg-elastic-teal/5 border-elastic-teal/20' 
                        : 'bg-elastic-blue/5 border-elastic-blue/20'
                    }`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.1 + index * 0.05 }}
                    whileHover={{ scale: 1.02, borderColor: outcome.color }}
                  >
                    <motion.div
                      className="absolute right-0 top-0 bottom-0 w-1"
                      style={{ backgroundColor: outcome.color }}
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ delay: 1.3 + index * 0.1 }}
                    />
                    <span className="mr-1 text-sm"><FontAwesomeIcon icon={outcome.icon} /></span>
                    <span className={`text-xs ${isDark ? 'text-white/70' : 'text-elastic-dev-blue/70'}`}>
                      {outcome.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom: Key Value Props */}
        <motion.div
          className="grid md:grid-cols-3 gap-4 mt-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
        >
          {[
            {
              title: 'One Platform',
              desc: 'Search, Observability, and Security unified on a single data layer',
              color: '#0B64DD',
            },
            {
              title: 'Any Deployment',
              desc: 'Self-managed, cloud-hosted, or fully serverless—your choice',
              color: '#48EFCF',
            },
            {
              title: 'Real-Time Insights',
              desc: 'From ingestion to action in milliseconds, at petabyte scale',
              color: '#F04E98',
            },
          ].map((prop, index) => (
            <motion.div
              key={prop.title}
              className={`p-5 rounded-xl border transition-all ${
                isDark 
                  ? 'bg-white/[0.02] border-white/10 hover:bg-white/[0.05]' 
                  : 'bg-white/80 border-elastic-dev-blue/10 hover:bg-white'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 + index * 0.1 }}
              whileHover={{ y: -3 }}
            >
              <div 
                className="w-2 h-2 rounded-full mb-3"
                style={{ backgroundColor: prop.color }}
              />
              <h3 className={`text-headline text-lg font-bold mb-1 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
                {prop.title}
              </h3>
              <p className={`text-paragraph text-sm ${isDark ? 'text-elastic-light-grey/70' : 'text-elastic-ink'}`}>
                {prop.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default UnifiedStrategyScene

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'

const pillars = [
  {
    id: 'elasticsearch',
    name: 'Elasticsearch',
    tagline: 'The Foundation',
    description: 'The distributed search and analytics engine at the heart of everything',
    color: '#0B64DD',
    features: [
      { title: 'Open by Design', desc: 'Flexibility, transparency, and interoperability' },
      { title: 'Built for Performance', desc: 'Instant results at unprecedented scale' },
      { title: 'Wired for Innovation', desc: 'Continuously pushing boundaries' },
    ],
    assumptions: [
      'Assumes data quality and structure are in place',
      'Relevance requires iteration—not set-and-forget',
      'AI search maturity varies by organization',
    ],
  },
  {
    id: 'security',
    name: 'Elastic Security',
    tagline: 'Protect Everything',
    description: 'Unified SIEM, endpoint, and cloud security for modern threats',
    color: '#F04E98',
    features: [
      { title: 'Open Detection', desc: 'Community-driven, customizable threat detection' },
      { title: 'Rapid Response', desc: 'Accelerate investigation and response at any scale' },
      { title: 'Future-Ready', desc: 'Stay ahead of evolving attack techniques' },
    ],
    assumptions: [
      'Assumes willingness to tune detections over time',
      'Requires clarity on data sources and coverage',
      'Elastic complements controls—doesn\'t replace them',
    ],
  },
  {
    id: 'observability',
    name: 'Elastic Observability',
    tagline: 'See Everything',
    description: 'Logs, metrics, traces, and APM in one unified view',
    color: '#48EFCF',
    features: [
      { title: 'Unified Data', desc: 'All observability data in one ecosystem' },
      { title: 'Instant Insights', desc: 'Accelerate root cause analysis at any scale' },
      { title: 'Always Evolving', desc: 'Ready for LLM observability and beyond' },
    ],
    assumptions: [
      'Assumes access to raw telemetry data',
      'Requires ownership of instrumentation strategy',
      'Tradeoff between flexibility and opinionation',
    ],
  },
]

function PlatformScene() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [activePillar, setActivePillar] = useState(null)
  const [hoveredPillar, setHoveredPillar] = useState(null)

  return (
    <div className="scene">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-elastic-teal text-sm font-mono uppercase tracking-widest">
            The Solution
          </span>
          <h2 className={`text-5xl md:text-6xl font-bold mt-4 ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
            The <span className="gradient-text">Elastic</span> Platform
          </h2>
          <p className={`text-xl mt-4 max-w-2xl mx-auto ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/60'}`}>
            One unified platform for Search, Security, and Observability
          </p>
        </motion.div>

        {/* Platform visualization */}
        <div className="relative">
          {/* Pillar cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.id}
                className="relative"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.15 }}
              >
                <motion.div
                  className={`relative p-8 rounded-3xl border transition-all duration-300 cursor-pointer overflow-hidden ${
                    activePillar === pillar.id
                      ? isDark ? 'bg-white/10 border-white/20' : 'bg-white border-elastic-dev-blue/20'
                      : isDark ? 'bg-white/[0.03] border-white/10 hover:bg-white/[0.05]' : 'bg-white/80 border-elastic-dev-blue/10 hover:bg-white'
                  }`}
                  onClick={() => setActivePillar(activePillar === pillar.id ? null : pillar.id)}
                  onMouseEnter={() => setHoveredPillar(pillar.id)}
                  onMouseLeave={() => setHoveredPillar(null)}
                  whileHover={{ y: -5 }}
                >
                  {/* Glow effect */}
                  <motion.div
                    className="absolute inset-0 opacity-0"
                    style={{
                      background: `radial-gradient(circle at 50% 0%, ${pillar.color}20, transparent 60%)`,
                    }}
                    animate={{
                      opacity: hoveredPillar === pillar.id || activePillar === pillar.id ? 1 : 0,
                    }}
                  />

                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: `${pillar.color}20` }}
                  >
                    <div
                      className="w-6 h-6 rounded-full"
                      style={{ backgroundColor: pillar.color }}
                    />
                  </div>

                  {/* Content */}
                  <div className="relative">
                    <p className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: pillar.color }}>
                      {pillar.tagline}
                    </p>
                    <h3 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
                      {pillar.name}
                    </h3>
                    <p className={`mb-6 ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/60'}`}>
                      {pillar.description}
                    </p>

                    {/* Features list */}
                    <motion.div
                      className="space-y-4"
                      initial={false}
                      animate={{
                        height: activePillar === pillar.id ? 'auto' : 0,
                        opacity: activePillar === pillar.id ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      style={{ overflow: 'hidden' }}
                    >
                      {pillar.features.map((feature, i) => (
                        <div key={feature.title} className="flex gap-3">
                          <div
                            className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                            style={{ backgroundColor: pillar.color }}
                          />
                          <div>
                          <div className={`font-medium ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>{feature.title}</div>
                          <div className={`text-sm ${isDark ? 'text-white/40' : 'text-elastic-dev-blue/50'}`}>{feature.desc}</div>
                          </div>
                        </div>
                      ))}
                      
                      {/* Assumptions section */}
                      <div className={`mt-4 pt-4 border-t ${isDark ? 'border-white/10' : 'border-elastic-dev-blue/10'}`}>
                        <p className={`text-xs uppercase tracking-widest mb-3 ${isDark ? 'text-white/30' : 'text-elastic-dev-blue/40'}`}>
                          Works best when
                        </p>
                        {pillar.assumptions.map((assumption, i) => (
                          <div key={i} className="flex gap-2 mb-2">
                            <span className={`text-sm ${isDark ? 'text-white/40' : 'text-elastic-dev-blue/50'}`}>→</span>
                            <span className={`text-sm ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/60'}`}>{assumption}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>

                    {/* Expand indicator */}
                    <div className="mt-4 flex items-center gap-2 text-sm" style={{ color: pillar.color }}>
                      <span>{activePillar === pillar.id ? 'Less' : 'Learn more'}</span>
                      <motion.span
                        animate={{ rotate: activePillar === pillar.id ? 180 : 0 }}
                      >
                        ↓
                      </motion.span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlatformScene


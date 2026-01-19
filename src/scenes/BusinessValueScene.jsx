import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'

const valueMetrics = [
  {
    id: 'risk',
    title: 'Risk Reduction',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    color: '#48EFCF',
    description: 'Reduce likelihood and severity of threats',
    metrics: ['Threats mitigated', 'Vulnerability reduction', 'Compliance adherence'],
    value: '60%',
    valueLabel: 'reduction in vulnerabilities',
    before: 'Reactive security with blind spots and delayed detection',
    after: 'Proactive threat hunting with full visibility and automated response',
  },
  {
    id: 'resilience',
    title: 'Resilience',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    color: '#0B64DD',
    description: 'Respond and recover faster from disruptions',
    metrics: ['Response time', 'Incidents avoided', 'Downtime prevented'],
    value: '70%',
    valueLabel: 'faster incident response',
    before: 'Hours spent jumping between tools during outages',
    after: 'Minutes to root cause with correlated data and AI assistance',
  },
  {
    id: 'time',
    title: 'Time Efficiency',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: '#F04E98',
    description: 'Save time through automation and optimization',
    metrics: ['Manual labor reduced', 'SLA adherence', 'Automation gains'],
    value: '50%',
    valueLabel: 'less manual investigation',
    before: 'Analysts drowning in manual log correlation and alert triage',
    after: 'Teams focused on high-value work with automated insights',
  },
  {
    id: 'cost',
    title: 'Cost Savings',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: '#FEC514',
    description: 'Reduce operational costs and prevent losses',
    metrics: ['OpEx reduction', 'Fraud prevented', 'Legal avoidance'],
    value: '40%',
    valueLabel: 'lower total cost of ownership',
    before: 'Multiple vendors, redundant data, unpredictable licensing',
    after: 'Unified platform with transparent, scalable pricing',
  },
]

function AnimatedValue({ value, color }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (isInView) {
      const numericValue = parseInt(value)
      let current = 0
      const interval = setInterval(() => {
        current += 2
        if (current >= numericValue) {
          setDisplayValue(numericValue)
          clearInterval(interval)
        } else {
          setDisplayValue(current)
        }
      }, 30)
      return () => clearInterval(interval)
    }
  }, [isInView, value])

  return (
    <span ref={ref} style={{ color }}>
      {displayValue}%
    </span>
  )
}

function BusinessValueScene() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [activeCard, setActiveCard] = useState(null)

  return (
    <div className="scene">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-elastic-yellow text-sm font-mono uppercase tracking-widest">
            Desired Outcomes
          </span>
          <h2 className={`text-5xl md:text-6xl font-bold mt-4 ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
            Where Do You <span className="gradient-text">Want to Be?</span>
          </h2>
          <p className={`mt-4 text-lg max-w-2xl mx-auto ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/60'}`}>
            Before we talk solutions, let's align on the outcomes that matter most
          </p>
        </motion.div>

        {/* Value cards grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {valueMetrics.map((metric, index) => (
            <motion.div
              key={metric.id}
              className="relative group"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <motion.div
                className={`relative p-8 rounded-3xl border transition-all duration-500 cursor-pointer overflow-hidden ${
                  activeCard === metric.id
                    ? isDark ? 'bg-white/10 border-white/20' : 'bg-white border-elastic-dev-blue/20 shadow-lg'
                    : isDark ? 'bg-white/[0.02] border-white/10' : 'bg-white/80 border-elastic-dev-blue/10'
                }`}
                onClick={() => setActiveCard(activeCard === metric.id ? null : metric.id)}
                whileHover={{ scale: 1.02 }}
              >
                {/* Background glow */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, ${metric.color}10, transparent 60%)`,
                  }}
                  animate={{
                    opacity: activeCard === metric.id ? 1 : 0.3,
                  }}
                />

                {/* Content */}
                <div className="relative">
                  {/* Header row */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center"
                        style={{ backgroundColor: `${metric.color}20`, color: metric.color }}
                      >
                        {metric.icon}
                      </div>
                      <div>
                        <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>{metric.title}</h3>
                        <p className={`text-sm ${isDark ? 'text-white/40' : 'text-elastic-dev-blue/50'}`}>{metric.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Big value number */}
                  <div className="mb-6">
                    <div className="text-6xl font-bold">
                      <AnimatedValue value={metric.value} color={metric.color} />
                    </div>
                    <p className={`mt-1 ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/60'}`}>{metric.valueLabel}</p>
                  </div>

                  {/* Metrics list with before/after */}
                    <motion.div
                      className="space-y-3"
                      initial={false}
                      animate={{
                        height: activeCard === metric.id ? 'auto' : 0,
                        opacity: activeCard === metric.id ? 1 : 0,
                      }}
                      style={{ overflow: 'hidden' }}
                    >
                      {/* Before/After transformation */}
                      <div className={`pt-4 border-t ${isDark ? 'border-white/10' : 'border-elastic-dev-blue/10'}`}>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className={`p-3 rounded-lg ${isDark ? 'bg-red-500/10' : 'bg-red-50'}`}>
                            <p className="text-xs uppercase tracking-wider text-red-400 mb-1">Before</p>
                            <p className={`text-sm ${isDark ? 'text-white/70' : 'text-elastic-dev-blue/70'}`}>{metric.before}</p>
                          </div>
                          <div className={`p-3 rounded-lg ${isDark ? 'bg-green-500/10' : 'bg-green-50'}`}>
                            <p className="text-xs uppercase tracking-wider text-green-400 mb-1">After</p>
                            <p className={`text-sm ${isDark ? 'text-white/70' : 'text-elastic-dev-blue/70'}`}>{metric.after}</p>
                          </div>
                        </div>
                        
                        <p className={`text-xs uppercase tracking-widest mb-3 ${isDark ? 'text-white/30' : 'text-elastic-dev-blue/40'}`}>Key Metrics</p>
                      {metric.metrics.map((m, i) => (
                        <motion.div
                          key={m}
                          className="flex items-center gap-3 py-2"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: metric.color }}
                          />
                          <span className={isDark ? 'text-white/70' : 'text-elastic-dev-blue/70'}>{m}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Expand hint */}
                  <div
                    className="mt-4 text-sm flex items-center gap-2"
                    style={{ color: metric.color }}
                  >
                    <span>{activeCard === metric.id ? 'Less' : 'View metrics'}</span>
                    <motion.span animate={{ rotate: activeCard === metric.id ? 180 : 0 }}>
                      ↓
                    </motion.span>
                  </div>
                </div>

                {/* Progress bar at bottom */}
                <motion.div
                  className="absolute bottom-0 left-0 h-1"
                  style={{ backgroundColor: metric.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${parseInt(metric.value)}%` }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom summary */}
        <motion.div
          className={`mt-12 text-center p-8 rounded-2xl bg-gradient-to-r border ${
            isDark 
              ? 'from-elastic-teal/10 via-elastic-blue/10 to-elastic-pink/10 border-white/10' 
              : 'from-elastic-blue/5 via-elastic-teal/5 to-elastic-pink/5 border-elastic-dev-blue/10'
          }`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <p className={`text-xl ${isDark ? 'text-white/70' : 'text-elastic-dev-blue/70'}`}>
            Elastic provides <span className={`font-semibold ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>measurable outcomes</span> that 
            align technology investment with business priorities
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default BusinessValueScene


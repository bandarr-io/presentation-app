import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'

const problemPatterns = [
  {
    id: 'observability',
    name: 'Observability',
    color: '#F04E98',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    patterns: [
      'Disconnected logs, metrics, traces',
      'MTTR stays high despite lots of data',
      'Tool sprawl and cost pressure',
      'Weak correlation to customer impact',
    ],
  },
  {
    id: 'security',
    name: 'Security',
    color: '#FF957D',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    patterns: [
      'Too many alerts, not enough signal',
      'Expensive or rigid SIEM',
      'Slow investigations',
      'Hard to adapt detections to new threats',
    ],
  },
  {
    id: 'search',
    name: 'Search / Product',
    color: '#FEC514',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    patterns: [
      'Users can\'t find what they expect',
      'Relevance tuning is slow or brittle',
      'Search performance doesn\'t scale',
      'Pressure to adopt semantic / AI search',
    ],
  },
]

function ChallengesScene() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [activeCategory, setActiveCategory] = useState(problemPatterns[0])
  const [hoveredPattern, setHoveredPattern] = useState(null)

  return (
    <div className="scene">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header with transition text */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-elastic-pink text-sm font-mono uppercase tracking-widest">
            Problem Orientation
          </span>
          <h2 className={`text-5xl md:text-6xl font-bold mt-4 mb-5 ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
            Common <span className="gradient-text">Problem Patterns</span>
          </h2>
          <motion.p
            className={`text-lg md:text-xl max-w-3xl mx-auto ${isDark ? 'text-white/60' : 'text-elastic-dev-blue/60'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Elastic is broad, so rather than walk through everything, let's orient around the 
            <span className={isDark ? ' text-white' : ' text-elastic-dev-blue'}> problems teams typically solve </span> 
            with it—then focus on what's most relevant for you.
          </motion.p>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          className="flex justify-center gap-5 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {problemPatterns.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category)}
              className={`relative px-8 py-4 rounded-full font-medium text-lg transition-all ${
                activeCategory.id === category.id
                  ? 'text-white'
                  : isDark 
                    ? 'text-white/60 hover:text-white/80 bg-white/5' 
                    : 'text-elastic-dev-blue/60 hover:text-elastic-dev-blue/80 bg-elastic-dev-blue/5'
              }`}
            >
              {activeCategory.id === category.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: category.color }}
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-3">
                {category.icon}
                {category.name}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Patterns grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory.id}
            className="grid md:grid-cols-2 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeCategory.patterns.map((pattern, index) => (
              <motion.div
                key={pattern}
                className={`relative p-8 rounded-2xl border overflow-hidden cursor-pointer group ${
                  isDark 
                    ? 'bg-white/[0.03] border-white/10' 
                    : 'bg-white/80 border-elastic-dev-blue/10'
                }`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setHoveredPattern(index)}
                onMouseLeave={() => setHoveredPattern(null)}
                whileHover={{ scale: 1.02, borderColor: activeCategory.color }}
              >
                {/* Glow effect on hover */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${activeCategory.color}15, transparent 70%)`,
                  }}
                />

                {/* Number indicator */}
                <div
                  className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center text-base font-mono"
                  style={{ 
                    backgroundColor: `${activeCategory.color}20`,
                    color: activeCategory.color,
                  }}
                >
                  {String(index + 1).padStart(2, '0')}
                </div>

                <div className="relative flex items-center gap-4">
                  <div 
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: activeCategory.color }}
                  />
                  <p className={`text-xl font-medium pr-14 ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
                    {pattern}
                  </p>
                </div>

                {/* Animated underline */}
                <motion.div
                  className="absolute bottom-0 left-0 h-1 rounded-full"
                  style={{ backgroundColor: activeCategory.color }}
                  initial={{ width: 0 }}
                  animate={{ width: hoveredPattern === index ? '100%' : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Closing question */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className={`text-xl md:text-2xl ${isDark ? 'text-white/70' : 'text-elastic-dev-blue/70'}`}>
            Does any of these areas align with what you're currently experiencing?
          </p>
          <p className={`text-lg mt-3 ${isDark ? 'text-white/40' : 'text-elastic-dev-blue/50'}`}>
            Or is there a <span style={{ color: activeCategory.color }}>more pressing matter</span> we should focus on?
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default ChallengesScene

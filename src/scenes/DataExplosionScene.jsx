import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'

function AnimatedCounter({ target, suffix = '', duration = 2 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      let start = 0
      const end = parseInt(target)
      const incrementTime = (duration * 1000) / end
      
      const timer = setInterval(() => {
        start += Math.ceil(end / 50)
        if (start >= end) {
          setCount(end)
          clearInterval(timer)
        } else {
          setCount(start)
        }
      }, incrementTime * 2)

      return () => clearInterval(timer)
    }
  }, [isInView, target, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

function DataExplosionScene() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [isAiEraHovered, setIsAiEraHovered] = useState(false)

  const eras = [
    { name: 'Mainframe', year: '1960s', color: '#153385', structuredHeight: 40, unstructuredHeight: 0 },
    { name: 'PC / Client', year: '1980s', color: '#0B64DD', structuredHeight: 55, unstructuredHeight: 0 },
    { name: 'Internet', year: '1990s', color: '#48EFCF', structuredHeight: 60, unstructuredHeight: 40 },
    { name: 'Virtual', year: '2010s', color: '#FEC514', structuredHeight: 75, unstructuredHeight: 75 },
    { name: 'AI Era', year: '2020s', color: '#F04E98', active: true, structuredHeight: 80, unstructuredHeight: 120 },
  ]

  return (
    <div className="scene !py-6">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section header */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.span
            className="text-elastic-pink text-sm font-mono uppercase tracking-widest"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            The Challenge
          </motion.span>
          <motion.h2
            className={`text-4xl md:text-5xl font-bold mt-2 ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            An Unprecedented{' '}
            <span className="gradient-text">Data Explosion</span>
          </motion.h2>
        </motion.div>

        {/* Main content - Side by side layout */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Left: Stacked stat cards */}
          <div className="space-y-3">
            {/* 175 ZB Card */}
            <motion.div
              className={`relative p-5 rounded-2xl border overflow-hidden group ${
                isDark 
                  ? 'bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10' 
                  : 'bg-white/80 border-elastic-dev-blue/10 shadow-lg'
              }`}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.01 }}
            >
              <div className={`absolute top-0 right-0 w-48 h-48 rounded-full blur-[80px] transition-colors ${
                isDark ? 'bg-elastic-teal/10 group-hover:bg-elastic-teal/20' : 'bg-elastic-teal/20 group-hover:bg-elastic-teal/30'
              }`} />
              
              <div className="relative flex items-center">
                <div className="w-1/2">
                  <div className={`text-4xl md:text-5xl font-bold ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
                    <AnimatedCounter target="175" /> 
                    <span className="text-elastic-teal">ZB</span>
                  </div>
                  <p className={`text-sm mt-1 ${isDark ? 'text-white/60' : 'text-elastic-dev-blue/60'}`}>
                    of data generated in 2025
                  </p>
                  <p className={`text-[10px] mt-1 italic ${isDark ? 'text-white/30' : 'text-elastic-dev-blue/30'}`}>
                    Source: IDC/Seagate "Data Age 2025"
                  </p>
                </div>
                {/* Growth trend indicator - bar chart style */}
                <div className="w-1/2 flex items-end justify-center gap-1 h-20 pb-2">
                  {[15, 20, 28, 40, 58, 85].map((height, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 rounded-t-sm bg-gradient-to-t from-elastic-teal/60 to-elastic-teal"
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ delay: 0.4 + i * 0.1, duration: 0.5, ease: 'easeOut' }}
                    />
                  ))}
                  {/* Arrow indicator */}
                  <motion.div 
                    className="flex flex-col items-center justify-end ml-1"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.3 }}
                  >
                    <svg className="w-6 h-6 text-elastic-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* 90% Unstructured Card */}
            <motion.div
              className={`relative p-5 rounded-2xl border overflow-hidden group ${
                isDark 
                  ? 'bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10' 
                  : 'bg-white/80 border-elastic-dev-blue/10 shadow-lg'
              }`}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.01 }}
            >
              <div className={`absolute top-0 right-0 w-48 h-48 rounded-full blur-[80px] transition-colors ${
                isDark ? 'bg-elastic-pink/10 group-hover:bg-elastic-pink/20' : 'bg-elastic-pink/15 group-hover:bg-elastic-pink/25'
              }`} />
              
              <div className="relative flex items-center">
                <div className="w-1/2">
                  <div className={`text-4xl md:text-5xl font-bold ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
                    <AnimatedCounter target="90" suffix="%" />
                  </div>
                  <p className={`text-sm mt-1 ${isDark ? 'text-white/60' : 'text-elastic-dev-blue/60'}`}>
                    of enterprise data is unstructured
                  </p>
                  <p className={`text-[10px] mt-1 italic ${isDark ? 'text-white/30' : 'text-elastic-dev-blue/30'}`}>
                    Source: IBM Research
                  </p>
                </div>
                {/* Pie visualization - larger and centered */}
                <div className="w-1/2 flex items-center justify-center gap-4">
                  <div className="relative w-20 h-20">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="14"
                        className={isDark ? 'text-white/10' : 'text-elastic-dev-blue/10'} />
                      <motion.circle cx="50" cy="50" r="42" fill="none" stroke="#F04E98" strokeWidth="14"
                        strokeDasharray="263.9"
                        initial={{ strokeDashoffset: 263.9 }}
                        animate={{ strokeDashoffset: 26.39 }}
                        transition={{ delay: 0.6, duration: 1, ease: 'easeOut' }} />
                    </svg>
                    <div className={`absolute inset-0 flex items-center justify-center text-sm font-bold ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
                      90%
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-elastic-pink" />
                      <span className={isDark ? 'text-white/70' : 'text-elastic-dev-blue/70'}>Unstructured</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded ${isDark ? 'bg-white/20' : 'bg-elastic-dev-blue/20'}`} />
                      <span className={isDark ? 'text-white/70' : 'text-elastic-dev-blue/70'}>Structured</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 68% Dark Data Card */}
            <motion.div
              className={`relative p-5 rounded-2xl border overflow-hidden group ${
                isDark 
                  ? 'bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10' 
                  : 'bg-white/80 border-elastic-dev-blue/10 shadow-lg'
              }`}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.01 }}
            >
              <div className={`absolute top-0 right-0 w-48 h-48 rounded-full blur-[80px] transition-colors ${
                isDark ? 'bg-elastic-yellow/10 group-hover:bg-elastic-yellow/20' : 'bg-elastic-yellow/20 group-hover:bg-elastic-yellow/30'
              }`} />
              
              <div className="relative flex items-center">
                <div className="w-1/2">
                  <div className={`text-4xl md:text-5xl font-bold ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
                    <AnimatedCounter target="68" suffix="%" />
                  </div>
                  <p className={`text-sm mt-1 ${isDark ? 'text-white/60' : 'text-elastic-dev-blue/60'}`}>
                    of data is "dark data"
                  </p>
                  <p className={`text-[10px] mt-1 italic ${isDark ? 'text-white/30' : 'text-elastic-dev-blue/30'}`}>
                    Source: Seagate/IDC Research
                  </p>
                </div>
                {/* Visualization - stacked bar */}
                <div className="w-1/2 flex flex-col gap-2">
                  <div className={`w-full h-14 rounded-xl overflow-hidden flex ${isDark ? 'bg-white/5' : 'bg-elastic-dev-blue/5'}`}>
                    <motion.div
                      className="h-full bg-elastic-yellow flex items-center justify-center"
                      initial={{ width: 0 }}
                      animate={{ width: '68%' }}
                      transition={{ delay: 0.7, duration: 0.8, ease: 'easeOut' }}
                    >
                      <span className="text-elastic-dev-blue font-bold text-sm">68%</span>
                    </motion.div>
                    <div className={`h-full flex-1 flex items-center justify-center ${isDark ? 'bg-white/15' : 'bg-elastic-dev-blue/15'}`}>
                      <span className={`font-medium text-sm ${isDark ? 'text-white/60' : 'text-elastic-dev-blue/60'}`}>32%</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded bg-elastic-yellow" />
                      <span className={isDark ? 'text-white/70' : 'text-elastic-dev-blue/70'}>Unused</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className={`w-3 h-3 rounded ${isDark ? 'bg-white/15' : 'bg-elastic-dev-blue/15'}`} />
                      <span className={isDark ? 'text-white/70' : 'text-elastic-dev-blue/70'}>Leveraged</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Era timeline (no card, larger) */}
          <motion.div
            className="relative flex flex-col justify-center h-full"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className={`text-sm uppercase tracking-widest mb-6 text-center ${isDark ? 'text-white/40' : 'text-elastic-dev-blue/40'}`}>
              The Evolution of Data
            </h3>
            
            <div className="flex items-end gap-3 h-80">
              {eras.map((era, index) => {
                // Static heights for structured data, unstructured grows on hover for AI Era
                const structuredHeight = era.structuredHeight
                const unstructuredHeight = era.active && isAiEraHovered 
                  ? 270 // Grow to fill most of the container on hover
                  : era.unstructuredHeight
                const totalHeight = structuredHeight + unstructuredHeight
                
                return (
                  <motion.div
                    key={era.name}
                    className={`flex-1 flex flex-col items-center ${era.active ? 'cursor-pointer' : ''}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.08 }}
                    onMouseEnter={() => era.active && setIsAiEraHovered(true)}
                    onMouseLeave={() => era.active && setIsAiEraHovered(false)}
                  >
                    {/* Stacked bar with static pixel heights */}
                    <div
                      className={`w-full flex flex-col overflow-hidden rounded-t-lg`}
                      style={{ opacity: era.active ? 1 : 0.85 }}
                    >
                      {/* Unstructured data portion (top section, pink) */}
                      <motion.div
                        className="w-full"
                        style={{ backgroundColor: '#F04E98' }}
                        initial={{ height: 0 }}
                        animate={{ height: unstructuredHeight }}
                        transition={{ duration: 0.3 }}
                      />
                      {/* Structured data portion (bottom section, lighter color) */}
                      <motion.div
                        className="w-full"
                        style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(16,28,63,0.15)' }}
                        initial={{ height: 0 }}
                        animate={{ height: structuredHeight }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <div className="mt-2 text-center">
                      <div className={`text-xs font-semibold ${era.active ? 'text-elastic-pink' : isDark ? 'text-white/70' : 'text-elastic-dev-blue/70'}`}>
                        {era.name}
                      </div>
                      <div className={`text-[10px] ${isDark ? 'text-white/40' : 'text-elastic-dev-blue/50'}`}>{era.year}</div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
            
            {/* Legend for the split */}
            <div className="flex justify-center gap-4 mt-4">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-elastic-pink" />
                <span className={`text-xs ${isDark ? 'text-white/60' : 'text-elastic-dev-blue/60'}`}>Unstructured</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className={`w-3 h-3 rounded-sm ${isDark ? 'bg-white/15' : 'bg-elastic-dev-blue/15'}`} />
                <span className={`text-xs ${isDark ? 'text-white/60' : 'text-elastic-dev-blue/60'}`}>Structured</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Cost of Inaction */}
        <motion.div
          className={`p-5 rounded-xl border ${
            isDark 
              ? 'bg-elastic-pink/5 border-elastic-pink/20' 
              : 'bg-elastic-pink/5 border-elastic-pink/15'
          }`}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex flex-col gap-2 text-center">
            <p className={`text-lg font-medium ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
              The cost of inaction?{' '}
              <span className="text-elastic-pink font-bold">
                Most data goes unsearched, unanalyzed, unutilized.
              </span>
            </p>
            <p className={`text-base ${isDark ? 'text-white/60' : 'text-elastic-dev-blue/60'}`}>
              Speed. Scale. Flexibility. Innovation demands all three—
              <span className={isDark ? 'text-elastic-teal' : 'text-elastic-blue'}> simultaneously</span>.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default DataExplosionScene

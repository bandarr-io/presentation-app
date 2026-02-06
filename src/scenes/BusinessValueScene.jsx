import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faShieldHalved, 
  faRocket, 
  faClock, 
  faCoins,
  faHandPointer,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons'

const valueAreas = [
  {
    id: 'risk',
    title: 'Risk Reduction',
    subtitle: 'Reduce likelihood & severity of threats',
    icon: faShieldHalved,
    color: '#48EFCF',
    talking: 'We help reduce your attack surface, detect threats faster, and improve your overall security posture.',
  },
  {
    id: 'time',
    title: 'Time Efficiency',
    subtitle: 'Do more with less',
    icon: faClock,
    color: '#F04E98',
    talking: 'Your teams spend less time on manual tasks and more time on high-value work through unified tooling and automation.',
  },
  {
    id: 'resilience',
    title: 'Resilience',
    subtitle: 'Respond & recover faster',
    icon: faRocket,
    color: '#0B64DD',
    talking: 'When incidents happen, you get to root cause faster with correlated data and AI-assisted investigation.',
  },
  {
    id: 'cost',
    title: 'Cost Savings',
    subtitle: 'Reduce expenses & prevent losses',
    icon: faCoins,
    color: '#FEC514',
    talking: 'Consolidate tools, eliminate data duplication, and get predictable licensing that scales with your needs.',
  },
]

function BusinessValueScene() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [activeArea, setActiveArea] = useState(null)
  const [visitedAreas, setVisitedAreas] = useState(new Set())

  const handleAreaClick = (areaId) => {
    setActiveArea(activeArea === areaId ? null : areaId)
    setVisitedAreas(prev => new Set([...prev, areaId]))
  }

  const allVisited = visitedAreas.size === valueAreas.length

  return (
    <div className="scene !py-6">
      <div className="max-w-[90%] mx-auto w-full h-full flex flex-col">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className={`text-eyebrow text-sm ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
            Business Value
          </span>
          <motion.h2 
            className={`text-headline text-4xl md:text-5xl font-extrabold mt-2 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Elastic helps organizations in{' '}
            <span className="relative inline-block">
              <span className={isDark ? 'text-elastic-teal' : 'text-elastic-blue'}>four key areas</span>
              <motion.div 
                className={`absolute -bottom-1 left-0 right-0 h-1 rounded-full ${isDark ? 'bg-elastic-teal/30' : 'bg-elastic-blue/30'}`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              />
            </span>
          </motion.h2>
        </motion.div>

        {/* Main interactive area */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative">
            {/* Visual connection line behind cards */}
            <motion.div 
              className="absolute left-8 right-8 top-1/2 h-0.5 -translate-y-1/2 z-0"
              style={{ 
                background: isDark 
                  ? 'linear-gradient(90deg, #48EFCF40, #F04E9840, #0B64DD40, #FEC51440)' 
                  : 'linear-gradient(90deg, #48EFCF60, #F04E9860, #0B64DD60, #FEC51460)'
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            />
            
            <div className="flex gap-4 items-stretch relative z-10">
              {/* Value area buttons */}
              {valueAreas.map((area, index) => {
                const isVisited = visitedAreas.has(area.id)
                const isActive = activeArea === area.id
                
                // Create a solid background color for active state (blend color with base)
                const getActiveBackground = () => {
                  if (!isActive) return isDark ? '#101C3F' : '#FFFFFF'
                  // Mix the area color with the base background at ~10% opacity equivalent
                  if (isDark) {
                    // Darken the color and mix with dev-blue
                    return area.id === 'risk' ? '#12283F' 
                      : area.id === 'time' ? '#1A1C3F' 
                      : area.id === 'resilience' ? '#101C4A' 
                      : '#1A2030' // cost
                  }
                  // Light mode - lighten
                  return area.id === 'risk' ? '#E8FEFA' 
                    : area.id === 'time' ? '#FEF0F6' 
                    : area.id === 'resilience' ? '#E8F0FE' 
                    : '#FFFCEF' // cost
                }

                return (
                  <motion.button
                    key={area.id}
                    className={`relative flex flex-col items-center text-center p-6 rounded-2xl border-2 transition-all duration-300 w-56 ${
                      isActive 
                        ? 'border-opacity-100' 
                        : isVisited 
                          ? 'border-opacity-60'
                          : 'border-opacity-20 hover:border-opacity-50'
                    }`}
                    style={{ 
                      borderColor: area.color,
                      backgroundColor: getActiveBackground()
                    }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    onClick={() => handleAreaClick(area.id)}
                    whileHover={{ y: -4 }}
                  >
                    {/* Visited checkmark */}
                    <AnimatePresence>
                      {isVisited && !isActive && (
                        <motion.div
                          className="absolute top-2 right-2"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                        >
                          <FontAwesomeIcon 
                            icon={faCheckCircle} 
                            className="text-sm"
                            style={{ color: area.color }}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Icon */}
                    <motion.div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${area.color}20` }}
                      animate={{ 
                        scale: isActive ? 1.1 : 1,
                      }}
                    >
                      <FontAwesomeIcon 
                        icon={area.icon} 
                        className="text-3xl"
                        style={{ color: area.color }}
                      />
                    </motion.div>

                    {/* Title */}
                    <h3 
                      className="text-xl font-bold mb-1"
                      style={{ color: area.color }}
                    >
                      {area.title}
                    </h3>

                    {/* Subtitle */}
                    <p className={`text-paragraph text-base ${isDark ? 'text-elastic-light-grey/70' : 'text-elastic-ink'}`}>
                      {area.subtitle}
                    </p>

                    {/* Active indicator */}
                    <motion.div
                      className="absolute -bottom-1.5 -translate-x-1/2 translate-y-1/2 w-3 h-3 rounded-full"
                      style={{ backgroundColor: area.color }}
                      animate={{
                        scale: isActive ? 1 : 0,
                        opacity: isActive ? 1 : 0,
                      }}
                    />

                    {/* Glow effect when active */}
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-2xl pointer-events-none"
                        style={{ 
                          boxShadow: `0 0 40px ${area.color}30`,
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      />
                    )}
                  </motion.button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Expanded talking point */}
        <div className="h-36 flex items-center justify-center mt-8">
          <AnimatePresence mode="wait">
            {activeArea ? (
              <motion.div
                key={activeArea}
                className="max-w-3xl text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div 
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-3"
                  style={{ 
                    backgroundColor: `${valueAreas.find(a => a.id === activeArea)?.color}20`,
                  }}
                >
                  <FontAwesomeIcon 
                    icon={valueAreas.find(a => a.id === activeArea)?.icon} 
                    className="text-lg"
                    style={{ color: valueAreas.find(a => a.id === activeArea)?.color }}
                  />
                  <span 
                    className="font-semibold text-lg"
                    style={{ color: valueAreas.find(a => a.id === activeArea)?.color }}
                  >
                    {valueAreas.find(a => a.id === activeArea)?.title}
                  </span>
                </div>
                <p className={`text-2xl leading-relaxed ${isDark ? 'text-white/80' : 'text-elastic-dev-blue/80'}`}>
                  {valueAreas.find(a => a.id === activeArea)?.talking}
                </p>
              </motion.div>
            ) : allVisited ? (
              <motion.div
                key="summary"
                className="max-w-3xl text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="inline-flex items-center gap-3 mb-3">
                  {valueAreas.map((area, i) => (
                    <motion.div
                      key={area.id}
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${area.color}30` }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <FontAwesomeIcon 
                        icon={area.icon} 
                        className="text-sm"
                        style={{ color: area.color }}
                      />
                    </motion.div>
                  ))}
                </div>
                <p className={`text-2xl leading-relaxed font-medium ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
                  Elastic delivers across all four areas with a{' '}
                  <span className={isDark ? 'text-elastic-teal' : 'text-elastic-blue'}>unified platform</span>.
                </p>
              </motion.div>
            ) : (
              <motion.p
                key="prompt"
                className={`text-xl flex items-center gap-3 ${isDark ? 'text-white/40' : 'text-elastic-dev-blue/40'}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <FontAwesomeIcon icon={faHandPointer} className="text-lg" />
                Which of these matters most to your organization?
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default BusinessValueScene

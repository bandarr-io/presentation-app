import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

function Navigation({ scenes, currentScene, onNavigate, onNext, onPrev }) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <>
      {/* Bottom navigation bar - subtle and minimal */}
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 opacity-40 hover:opacity-80 transition-opacity duration-300">
        {/* Prev arrow */}
        <button
          onClick={onPrev}
          disabled={currentScene === 0}
          className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
            isDark 
              ? 'hover:bg-white/10' 
              : 'hover:bg-elastic-dev-blue/10'
          } ${currentScene === 0 ? 'opacity-30 cursor-not-allowed' : 'opacity-100'}`}
        >
          <svg className={`w-3 h-3 ${isDark ? 'text-white/60' : 'text-elastic-dev-blue/60'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Scene dots */}
        <div className="flex items-center gap-1.5 px-2 py-1">
          {scenes.map((scene, index) => (
            <motion.button
              key={scene.id}
              onClick={() => onNavigate(index)}
              className="group relative"
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Tooltip */}
              <span className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 backdrop-blur-sm rounded text-[10px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none ${
                isDark 
                  ? 'bg-white/10 text-white/80' 
                  : 'bg-elastic-dev-blue/10 text-elastic-dev-blue/80'
              }`}>
                {scene.title}
              </span>
              
              {/* Dot */}
              <motion.div
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  index === currentScene
                    ? isDark ? 'bg-white/80' : 'bg-elastic-dev-blue/80'
                    : isDark 
                      ? 'bg-white/25 hover:bg-white/50'
                      : 'bg-elastic-dev-blue/25 hover:bg-elastic-dev-blue/50'
                }`}
                animate={{
                  scale: index === currentScene ? 1.4 : 1,
                }}
              />
            </motion.button>
          ))}
        </div>

        {/* Next arrow */}
        <button
          onClick={onNext}
          disabled={currentScene === scenes.length - 1}
          className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
            isDark 
              ? 'hover:bg-white/10' 
              : 'hover:bg-elastic-dev-blue/10'
          } ${currentScene === scenes.length - 1 ? 'opacity-30 cursor-not-allowed' : 'opacity-100'}`}
        >
          <svg className={`w-3 h-3 ${isDark ? 'text-white/60' : 'text-elastic-dev-blue/60'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>


    </>
  )
}

export default Navigation

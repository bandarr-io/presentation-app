import { motion } from 'framer-motion'
import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'

// Color palette that cycles based on position in the agenda
const colorPalette = [
  '#0B64DD',  // Blue
  '#48EFCF',  // Teal
  '#F04E98',  // Pink
  '#FF957D',  // Light Poppy
  '#FEC514',  // Yellow
]

function AgendaScene({ scenes = [] }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [hoveredItem, setHoveredItem] = useState(null)

  // Filter out scenes that shouldn't appear in the agenda
  // Colors are assigned based on position, cycling through the palette
  const agendaItems = scenes
    .filter(scene => !scene.hideFromAgenda)
    .map((scene, index) => ({
      id: index + 1,
      title: scene.title,
      description: scene.description || '',
      color: colorPalette[index % colorPalette.length],
      duration: scene.duration || '',
    }))

  return (
    <div className="scene">
      <div className="max-w-5xl mx-auto w-full">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-elastic-blue text-sm font-mono uppercase tracking-widest">
            Overview
          </span>
          <h2 className={`text-5xl md:text-6xl font-bold mt-4 ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
            Today's <span className="gradient-text">Agenda</span>
          </h2>
          <p className={`text-lg mt-4 max-w-2xl mx-auto ${isDark ? 'text-white/60' : 'text-elastic-dev-blue/60'}`}>
            A roadmap for our conversation
          </p>
        </motion.div>

        {/* Agenda Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {agendaItems.map((item, index) => (
            <motion.div
              key={item.id}
              className={`relative p-5 rounded-xl border overflow-hidden cursor-pointer group ${
                isDark 
                  ? 'bg-white/[0.03] border-white/10' 
                  : 'bg-white/80 border-elastic-dev-blue/10'
              }`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.08 }}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              whileHover={{ scale: 1.02 }}
            >
              {/* Left accent bar */}
              <motion.div
                className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl"
                style={{ backgroundColor: item.color }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: hoveredItem === item.id ? 1 : 0.3 }}
                transition={{ duration: 0.2 }}
              />

              {/* Glow effect on hover */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: `radial-gradient(circle at 0% 50%, ${item.color}15, transparent 60%)`,
                }}
              />

              <div className="relative flex items-center gap-4">
                {/* Number */}
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-mono flex-shrink-0"
                  style={{ 
                    backgroundColor: `${item.color}20`,
                    color: item.color,
                  }}
                >
                  {String(item.id).padStart(2, '0')}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className={`text-sm ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/60'}`}>
                      {item.description}
                    </p>
                  )}
                </div>

                {/* Duration badge */}
                {item.duration && (
                  <div className={`px-3 py-1 rounded-full text-xs font-medium flex-shrink-0 ${
                    isDark ? 'bg-white/5 text-white/40' : 'bg-elastic-dev-blue/5 text-elastic-dev-blue/50'
                  }`}>
                    {item.duration}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AgendaScene

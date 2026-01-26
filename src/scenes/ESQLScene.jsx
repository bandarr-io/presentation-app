import { motion } from 'framer-motion'
import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faLayerGroup,
  faGaugeHigh,
  faBullseye,
  faMagnifyingGlassChart,
  faDatabase,
  faFilter,
  faChartBar,
  faTableList
} from '@fortawesome/free-solid-svg-icons'

const pipeStages = [
  { 
    id: 'from',
    command: 'FROM logs-*',
    description: 'Start with your data source',
    icon: faDatabase,
    color: '#0B64DD',
    widthPercent: 100,
    label: '1M events'
  },
  { 
    id: 'where',
    command: 'WHERE event.category == "authentication"',
    description: 'Filter to relevant events',
    icon: faFilter,
    color: '#F04E98',
    widthPercent: 50,
    label: 'Filtered to 50K events'
  },
  { 
    id: 'stats',
    command: 'STATS count = COUNT(*) BY user.name',
    description: 'Aggregate and group',
    icon: faChartBar,
    color: '#48EFCF',
    widthPercent: 45,
    label: 'Counts for all 500 users'
  },
  { 
    id: 'sort',
    command: 'SORT count DESC',
    description: 'Order results',
    icon: faTableList,
    color: '#FEC514',
    widthPercent: 40,
    label: 'Sorted by counts'
  },
  { 
    id: 'limit',
    command: 'LIMIT 10',
    description: 'Focus on top results',
    icon: faBullseye,
    color: '#FF957D',
    widthPercent: 27,
    label: 'Top 10 results'
  },
]

const capabilities = [
  {
    icon: faLayerGroup,
    title: 'Concurrent Processing',
    description: 'Multi-stage queries run in parallel—aggregate, enrich, and visualize without switching tools',
    color: '#0B64DD'
  },
  {
    icon: faGaugeHigh,
    title: 'High Performance',
    description: 'Queries execute close to the data—fast even on large datasets and nested queries',
    color: '#F04E98'
  },
  {
    icon: faBullseye,
    title: 'Precision Results',
    description: 'Layered, conditional logic delivers fewer false positives and more context',
    color: '#48EFCF'
  },
  {
    icon: faMagnifyingGlassChart,
    title: 'Search to Insight',
    description: 'Search, calculate, and transform all in the same interface',
    color: '#FEC514'
  },
]

function ESQLScene() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [activeStage, setActiveStage] = useState(0)

  const selectStage = (index) => {
    setActiveStage(index)
  }

  return (
    <div className="scene !py-4">
      <div className="max-w-[98%] mx-auto w-full h-full flex flex-col">
        {/* Header */}
        <motion.div
          className="text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-elastic-teal text-sm font-mono uppercase tracking-widest block mb-2">
            Elasticsearch | Query Language
          </span>
          <h2 className={`text-4xl md:text-5xl font-bold ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
            <span className="text-elastic-blue">ES|QL</span>: Piped Queries for{' '}
            <span className="text-elastic-pink">Faster Investigations</span>
          </h2>
          <p className={`text-lg mt-2 ${isDark ? 'text-white/60' : 'text-elastic-dev-blue/60'}`}>
            Iterate on your questions at runtime—from search to insight in fewer steps
          </p>
        </motion.div>

        {/* Main content */}
        <div className="flex-1 flex gap-6 min-h-0 justify-center">
          {/* Left - Query Builder */}
          <motion.div 
            className="w-96 flex flex-col gap-4"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Query display */}
            <div className={`flex-1 p-4 rounded-2xl border ${isDark ? 'bg-white/[0.03] border-white/10' : 'bg-white border-elastic-dev-blue/10'}`}>
              <div className="mb-4">
                <div className={`text-xs uppercase tracking-wider ${isDark ? 'text-white/40' : 'text-elastic-dev-blue/40'}`}>
                  ES|QL Query
                </div>
              </div>

              {/* Query stages */}
              <div className="space-y-2 font-mono text-sm">
                {pipeStages.map((stage, index) => {
                  const isIncluded = index <= activeStage
                  const isCurrent = index === activeStage
                  
                  return (
                    <motion.div
                      key={stage.id}
                      className={`p-3 rounded-lg cursor-pointer transition-all ${
                        isCurrent
                          ? 'border-2'
                          : isIncluded
                            ? 'border border-opacity-50'
                            : isDark ? 'bg-white/5 border border-white/5' : 'bg-elastic-dev-blue/5 border border-elastic-dev-blue/5'
                      }`}
                      style={{
                        borderColor: isIncluded ? stage.color : undefined,
                        backgroundColor: isIncluded ? `${stage.color}15` : undefined,
                      }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ 
                        opacity: isIncluded ? 1 : 0.4, 
                        x: 0,
                        scale: isCurrent ? 1.02 : 1
                      }}
                      transition={{ duration: 0.2 }}
                      onClick={() => selectStage(index)}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className="flex items-start gap-2">
                        {index > 0 && (
                          <span className="text-elastic-teal font-bold">|</span>
                        )}
                        <div className="flex-1">
                          <code className={isIncluded ? (isDark ? 'text-white' : 'text-elastic-dev-blue') : (isDark ? 'text-white/40' : 'text-elastic-dev-blue/40')}>
                            {stage.command}
                          </code>
                          {isCurrent && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              className={`text-xs mt-1 ${isDark ? 'text-white/40' : 'text-elastic-dev-blue/40'}`}
                            >
                              {stage.description}
                            </motion.div>
                          )}
                        </div>
                        {isIncluded && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-6 h-6 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: `${stage.color}30` }}
                          >
                            <FontAwesomeIcon 
                              icon={stage.icon} 
                              className="text-xs"
                              style={{ color: stage.color }}
                            />
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </motion.div>

          {/* Center - Data Flow Visualization */}
          <motion.div 
            className={`flex-1 max-w-md rounded-2xl border p-6 ${isDark ? 'bg-white/[0.02] border-white/10' : 'bg-white/50 border-elastic-dev-blue/10'}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="h-full flex flex-col">
              <div className={`text-center mb-4 ${isDark ? 'text-white/60' : 'text-elastic-dev-blue/60'}`}>
                <span className="text-sm font-medium">Data Transformation</span>
              </div>

              {/* Flow visualization */}
              <div className="flex-1 flex flex-col justify-between">
                {pipeStages.map((stage, index) => {
                  const isIncluded = index <= activeStage
                  const isCurrent = index === activeStage
                  
                  return (
                    <div key={stage.id} className="flex items-center gap-3">
                      {/* Stage indicator */}
                      <motion.div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          isIncluded ? '' : 'opacity-30'
                        }`}
                        style={{ backgroundColor: isIncluded ? `${stage.color}30` : isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}
                        animate={{ 
                          scale: isCurrent ? [1, 1.1, 1] : 1,
                        }}
                        transition={{ duration: 0.5, repeat: isCurrent ? Infinity : 0 }}
                      >
                        <FontAwesomeIcon 
                          icon={stage.icon} 
                          style={{ color: isIncluded ? stage.color : isDark ? '#666' : '#999' }}
                        />
                      </motion.div>

                      {/* Data bar */}
                      <div className="flex-1 h-10 rounded-lg overflow-hidden bg-white/5 relative">
                        <motion.div
                          className="h-full rounded-lg flex items-center justify-end pr-3"
                          style={{ backgroundColor: stage.color }}
                          initial={{ width: 0 }}
                          animate={{ 
                            width: isIncluded ? `${stage.widthPercent}%` : 0,
                            opacity: isIncluded ? 1 : 0.3
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {isIncluded && (
                            <motion.span
                              className="text-xs font-bold text-white whitespace-nowrap"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.1 }}
                            >
                              {stage.label}
                            </motion.span>
                          )}
                        </motion.div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Bottom message */}
              <motion.div 
                className={`mt-4 text-center ${isDark ? 'text-white/40' : 'text-elastic-dev-blue/40'}`}
                key={activeStage}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <span className="text-sm">
                  {activeStage === pipeStages.length - 1 ? (
                    <>From <span className="text-elastic-blue font-medium">1M events</span> to <span className="text-elastic-poppy font-medium">10 results</span> in one query</>
                  ) : (
                    <>Click each stage to build your query</>
                  )}
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Right - Capabilities */}
          <motion.div 
            className="w-80 flex flex-col gap-3"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            {capabilities.map((cap, index) => (
              <motion.div
                key={cap.title}
                className={`flex-1 p-4 rounded-2xl border ${isDark ? 'bg-white/[0.03] border-white/10' : 'bg-white border-elastic-dev-blue/10'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <div className="flex items-start gap-3">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${cap.color}20` }}
                  >
                    <FontAwesomeIcon 
                      icon={cap.icon} 
                      className="text-lg"
                      style={{ color: cap.color }}
                    />
                  </div>
                  <div>
                    <div className={`font-bold text-base mb-1 ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
                      {cap.title}
                    </div>
                    <div className={`text-sm leading-relaxed ${isDark ? 'text-white/60' : 'text-elastic-dev-blue/60'}`}>
                      {cap.description}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ESQLScene


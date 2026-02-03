import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faChartColumn, faBrain, faCodeBranch } from '@fortawesome/free-solid-svg-icons'

const stats = [
  { value: '5B+', label: 'Downloads', description: 'Open source downloads worldwide' },
  { value: '54%', label: 'Fortune 500', description: 'Trust Elastic for their data needs' },
  { value: '40+', label: 'Countries', description: 'Global presence and support' },
  { value: '3,000+', label: 'Employees', description: 'Distributed across the globe' },
]

const highlights = [
  { icon: faMagnifyingGlass, title: 'Search Pioneer', desc: 'Built on Apache Lucene, the gold standard for search', color: '#48EFCF' },
  { icon: faChartColumn, title: 'Data at Scale', desc: 'Petabytes of data processed daily by our customers', color: '#0B64DD' },
  { icon: faBrain, title: 'AI-Native', desc: 'Vector search & ML built into the platform from day one', color: '#F04E98' },
  { icon: faCodeBranch, title: 'Open Source DNA', desc: 'Transparent, extensible, community-driven', color: '#FEC514' },
]

function AboutElasticScene() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className="scene">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className={`text-eyebrow text-sm ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
            Who We Are
          </span>
          <h2 className={`text-headline text-5xl md:text-6xl font-extrabold mt-4 mb-5 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            About <span className="gradient-text">Elastic</span>
          </h2>
          <p className={`text-paragraph text-lg md:text-xl max-w-3xl mx-auto ${isDark ? 'text-elastic-light-grey' : 'text-elastic-ink'}`}>
            The Search AI Company—powering search, observability, and security for thousands of organizations worldwide.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className={`relative p-6 rounded-2xl border text-center overflow-hidden group ${
                isDark 
                  ? 'bg-white/[0.03] border-white/10' 
                  : 'bg-white/80 border-elastic-dev-blue/10'
              }`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.03 }}
            >
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${isDark ? 'rgba(72, 239, 207, 0.1)' : 'rgba(11, 100, 221, 0.1)'}, transparent 70%)`,
                }}
              />
              
              <div className={`text-code text-5xl md:text-6xl font-bold mb-2 ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
                {stat.value}
              </div>
              <div className={`text-headline text-xl font-bold mb-1 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
                {stat.label}
              </div>
              <div className={`text-paragraph text-base ${isDark ? 'text-elastic-light-grey/60' : 'text-elastic-ink/70'}`}>
                {stat.description}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Highlights */}
        <motion.div
          className="grid md:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              className={`p-6 rounded-xl border transition-all ${
                isDark 
                  ? 'bg-white/[0.02] border-white/10 hover:bg-white/[0.05]' 
                  : 'bg-white/60 border-elastic-dev-blue/10 hover:bg-white'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              whileHover={{ y: -3 }}
            >
              <div className="text-2xl mb-3" style={{ color: item.color }}>
                <FontAwesomeIcon icon={item.icon} />
              </div>
              <h3 className={`text-headline text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
                {item.title}
              </h3>
              <p className={`text-paragraph text-base ${isDark ? 'text-elastic-light-grey/70' : 'text-elastic-ink'}`}>
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default AboutElasticScene

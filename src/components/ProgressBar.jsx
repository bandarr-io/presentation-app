import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

function ProgressBar({ current, total }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const progress = ((current + 1) / total) * 100

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 h-1 ${isDark ? 'bg-white/5' : 'bg-elastic-dev-blue/5'}`}>
      <motion.div
        className={`h-full ${isDark ? 'bg-gradient-to-r from-elastic-teal via-elastic-blue to-elastic-pink' : 'bg-gradient-to-r from-elastic-dev-blue to-elastic-blue'}`}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
    </div>
  )
}

export default ProgressBar


import { motion } from 'framer-motion'

function ProgressBar({ current, total }) {
  const progress = ((current + 1) / total) * 100

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-white/5">
      <motion.div
        className="h-full bg-gradient-to-r from-elastic-teal via-elastic-blue to-elastic-pink"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
    </div>
  )
}

export default ProgressBar


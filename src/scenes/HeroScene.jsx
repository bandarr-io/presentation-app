import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'

function HeroScene() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [particles, setParticles] = useState([])

  useEffect(() => {
    // Generate floating data particles
    const newParticles = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="scene relative overflow-hidden">
      {/* Animated data particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className={`absolute rounded-full ${isDark ? 'bg-elastic-blue/40' : 'bg-elastic-blue/30'}`}
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Animated connecting lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <motion.path
          d="M0,50 Q25,30 50,50 T100,50"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 1 }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#48EFCF" />
            <stop offset="50%" stopColor="#0B64DD" />
            <stop offset="100%" stopColor="#F04E98" />
          </linearGradient>
        </defs>
      </svg>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto text-center">
        {/* Elastic Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-10"
        >
          <img 
            src={isDark 
              ? "/Elastic Logo+tagline_secondary white.svg" 
              : "/Elastic Logo+tagline _ secondary black.png"
            }
            alt="Elastic - The Search AI Company" 
            className="h-15 w-auto mx-auto object-contain mb-10"
          />
        </motion.div>

        {/* Main title */}
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <span className={isDark ? 'text-white' : 'text-elastic-dev-blue'}>The Elastic Search AI Platform:</span>
          <br />
          <span className="gradient-text">Transforming Data into Action</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className={`text-xl md:text-2xl max-w-3xl mx-auto ${
            isDark ? 'text-white/60' : 'text-elastic-dev-blue/60'
          }`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          Unleash the Power of Real-Time Insights, Scale, and Innovation
        </motion.p>
      </div>

      {/* Bottom decorative element */}
      <motion.div
        className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent to-transparent ${
          isDark ? 'via-elastic-teal/50' : 'via-elastic-blue/30'
        }`}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      />
    </div>
  )
}

export default HeroScene

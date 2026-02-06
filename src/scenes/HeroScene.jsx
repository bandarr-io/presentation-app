import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useCallback, useMemo } from 'react'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faPlay } from '@fortawesome/free-solid-svg-icons'

// Search Bar Component
function HeroSearchBar({ text, isTyping, onShowAnswer, searchComplete, showCursor = true }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  
  return (
    <motion.div
      className={`relative flex items-center mx-auto px-8 py-5 rounded-full border-2 ${
        isDark 
          ? 'bg-white/[0.03] border-white/20' 
          : 'bg-white border-elastic-dev-blue/20'
      }`}
      style={{ width: '800px' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring' }}
    >
      {/* Text area with inline cursor */}
      <div className="flex-1 min-h-[40px] flex items-center">
        <span className={`text-2xl md:text-3xl font-light ${
          isDark ? 'text-white' : 'text-elastic-dev-blue'
        }`}>
          {text}
        </span>
        {/* Blinking cursor after text */}
        {showCursor && (
          <motion.span
            className={`inline-block w-0.5 h-8 ml-1 ${isDark ? 'bg-white' : 'bg-elastic-dev-blue'}`}
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
          />
        )}
      </div>
      
      {/* Search icon / button - shows answer */}
      <motion.button
        onClick={onShowAnswer}
        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
          isTyping 
            ? isDark 
              ? 'bg-elastic-teal/20 text-elastic-teal cursor-not-allowed'
              : 'bg-elastic-blue/20 text-elastic-blue cursor-not-allowed'
            : searchComplete
              ? isDark 
                ? 'bg-elastic-teal/30 text-elastic-teal hover:bg-elastic-teal hover:text-white' 
                : 'bg-elastic-blue/20 text-elastic-blue hover:bg-elastic-blue hover:text-white'
              : isDark 
                ? 'bg-white/10 text-white/60 hover:bg-elastic-teal hover:text-white' 
                : 'bg-elastic-dev-blue/10 text-elastic-dev-blue/60 hover:bg-elastic-blue hover:text-white'
        }`}
        whileHover={!isTyping ? { scale: 1.1 } : {}}
        whileTap={!isTyping ? { scale: 0.95 } : {}}
        disabled={isTyping}
        title="Show answer"
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} className="text-xl" />
      </motion.button>
    </motion.div>
  )
}

function HeroScene() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [searchText, setSearchText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [searchComplete, setSearchComplete] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)

  // The question to type
  const questionText = "The Elastic Search AI Platform"

  // Memoize particles to prevent re-randomizing on re-render
  const particles = useMemo(() => 
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
      xOffset: Math.random() * 50 - 25,
    })), []
  )

  // Typing animation
  const startTyping = useCallback(() => {
    if (isTyping || searchComplete) return
    
    setIsTyping(true)
    setSearchText('')
    let index = 0
    
    const typeInterval = setInterval(() => {
      if (index < questionText.length) {
        setSearchText(questionText.slice(0, index + 1))
        index++
      } else {
        clearInterval(typeInterval)
        setIsTyping(false)
        setSearchComplete(true)
      }
    }, 80) // Typing speed
    
    return () => clearInterval(typeInterval)
  }, [isTyping, searchComplete])

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
              x: [0, particle.xOffset, 0],
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
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[500px]">
        <AnimatePresence mode="wait">
          {!showAnswer ? (
            /* Search Phase */
            <motion.div
              key="search"
              className="w-full text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
            >
              {/* Search Bar */}
              <HeroSearchBar 
                text={searchText}
                isTyping={isTyping}
                searchComplete={searchComplete}
                onShowAnswer={() => {
                  if (!showAnswer) {
                    if (!searchComplete) {
                      setSearchText(questionText)
                      setSearchComplete(true)
                    }
                    setShowAnswer(true)
                  }
                }}
                showCursor={!searchComplete}
              />
              
              {/* Prompt to click */}
              {!searchText && !isTyping && (
                <motion.p
                  className={`text-center mt-6 text-sm ${isDark ? 'text-white/40' : 'text-elastic-blue/60'}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Click search to discover...
                </motion.p>
              )}
            </motion.div>
          ) : (
            /* Answer Phase - Logo and Content */
            <motion.div
              key="answer"
              className="w-full text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Elastic Logo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="mb-8"
              >
                <img 
                  src={isDark 
                    ? "/Elastic Logo+tagline_secondary white.svg" 
                    : "/Elastic Logo+tagline _ secondary black.png"
                  }
                  alt="Elastic - The Search AI Company" 
                  className="h-16 w-auto mx-auto object-contain"
                />
              </motion.div>

              {/* Main title */}
              <motion.h1
                className="text-headline text-5xl md:text-7xl font-extrabold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <span className={isDark ? 'text-white' : 'text-elastic-dark-ink'}>The Elastic Search AI Platform:</span>
                <br />
                <motion.span 
                  className="gradient-text"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  Transforming Data into Action
                </motion.span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                className={`text-paragraph text-xl md:text-2xl max-w-3xl mx-auto ${
                  isDark ? 'text-elastic-light-grey' : 'text-elastic-blue'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                Unleash the Power of Real-Time Insights, Scale, and Innovation
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
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

      {/* Floating play button - subtle, for starting typing animation */}
      <AnimatePresence>
        {!searchComplete && !isTyping && (
          <motion.button
            onClick={startTyping}
            className={`fixed bottom-4 right-14 z-40 w-7 h-7 rounded-full flex items-center justify-center transition-all ${
              isDark 
                ? 'bg-white/5 hover:bg-white/15 text-white/30 hover:text-white/60' 
                : 'bg-elastic-dev-blue/5 hover:bg-elastic-dev-blue/15 text-elastic-dev-blue/30 hover:text-elastic-dev-blue/60'
            }`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title="Start typing animation"
          >
            <FontAwesomeIcon icon={faPlay} className="text-[10px] ml-0.5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}

export default HeroScene

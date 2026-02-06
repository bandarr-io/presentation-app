import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faMagnifyingGlass, 
  faClock, 
  faBolt,
  faPlay,
  faRotate,
  faBox,
  faLayerGroup
} from '@fortawesome/free-solid-svg-icons'

// Lego piece colors
const colors = {
  blue: '#0B64DD',
  teal: '#48EFCF',
  pink: '#F04E98',
  yellow: '#FEC514',
  orange: '#FF957D',
  purple: '#9B59B6',
}

// Generate random lego pieces for a bin
const generateRandomPieces = (count) => {
  const shapes = ['square', 'rectangle', 'small']
  const colorKeys = Object.keys(colors)
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    color: colorKeys[Math.floor(Math.random() * colorKeys.length)],
    shape: shapes[Math.floor(Math.random() * shapes.length)],
    x: Math.random() * 65 + 25,
    y: Math.random() * 60 + 25,
    rotation: Math.random() * 360,
  }))
}

// Generate organized pieces (sorted by color)
const generateOrganizedPieces = (color, count) => {
  const shapes = ['square', 'rectangle', 'small']
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    color,
    shape: shapes[i % 3],
    x: 15 + (i % 4) * 22,
    y: 20 + Math.floor(i / 4) * 25,
    rotation: 0,
  }))
}

// Lego piece component
const LegoPiece = ({ piece, isHighlighted, isSearching, small }) => {
  const sizeMultiplier = small ? 0.7 : 1
  const baseSize = (piece.shape === 'small' ? 12 : piece.shape === 'square' ? 16 : 20) * sizeMultiplier
  const height = (piece.shape === 'rectangle' ? 10 : baseSize) * sizeMultiplier
  
  return (
    <motion.div
      className="absolute rounded-sm"
      style={{
        left: `${piece.x}%`,
        top: `${piece.y}%`,
        width: baseSize,
        height: height,
        backgroundColor: colors[piece.color],
        border: `1px solid rgba(0,0,0,0.2)`,
        boxShadow: isHighlighted 
          ? `0 0 ${small ? '5px 2px' : '10px 3px'} ${colors[piece.color]}` 
          : '1px 1px 2px rgba(0,0,0,0.3)',
      }}
      initial={{ rotate: piece.rotation, scale: 0 }}
      animate={{ 
        rotate: piece.rotation, 
        scale: isHighlighted ? 1.3 : 1,
        opacity: isSearching && !isHighlighted ? 0.3 : 1,
      }}
      transition={{ duration: 0.3 }}
    />
  )
}

// Bin component for random pieces (Schema on Read)
const Bin = ({ pieces, label, isSearching, highlightColor, highlightShape, searchProgress, small }) => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  
  return (
    <div className={`relative overflow-hidden ${
      small ? 'rounded-lg border' : 'rounded-xl border-2'
    } ${
      isDark ? 'bg-white/5 border-white/20' : 'bg-white/50 border-elastic-dev-blue/20'
    }`} style={{ height: small ? '60px' : '120px' }}>
      {/* Bin label */}
      {label && (
        <div className={`absolute top-0.5 left-1 font-mono ${
          small ? 'text-[8px]' : 'text-[10px]'
        } ${isDark ? 'text-white/40' : 'text-elastic-dev-blue/40'}`}>
          {label}
        </div>
      )}
      
      {/* Search scanning effect */}
      {isSearching && searchProgress !== undefined && (
        <motion.div
          className={`absolute left-0 right-0 bg-elastic-teal/50 ${small ? 'h-0.5' : 'h-1'}`}
          style={{ top: `${searchProgress}%` }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 0.3, repeat: Infinity }}
        />
      )}
      
      {/* Pieces */}
      {pieces.map((piece) => (
        <LegoPiece
          key={piece.id}
          piece={piece}
          isHighlighted={highlightColor === piece.color && (!highlightShape || highlightShape === piece.shape)}
          isSearching={isSearching}
          small={small}
        />
      ))}
    </div>
  )
}

// Organized Bin component for Schema on Write (6 color compartments per hour)
const colorOrder = ['blue', 'teal', 'pink', 'yellow', 'orange', 'purple']

const OrganizedBin = ({ label, highlightColor, isSearching }) => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  
  return (
    <div className={`relative overflow-hidden rounded-lg border ${
      isDark ? 'bg-white/5 border-white/20' : 'bg-white/50 border-elastic-dev-blue/20'
    }`} style={{ height: '60px' }}>
      {/* Bin label */}
      {label && (
        <div className={`absolute top-0.5 left-1 font-mono text-[8px] z-10 ${
          isDark ? 'text-white/40' : 'text-elastic-dev-blue/40'
        }`}>
          {label}
        </div>
      )}
      
      {/* 6 color compartments in a 3x2 grid */}
      <div className="absolute inset-0 pt-3 px-0.5 pb-0.5 grid grid-cols-3 grid-rows-2 gap-0.5">
        {colorOrder.map((color) => {
          const isHighlighted = highlightColor === color
          return (
            <motion.div
              key={color}
              className="rounded-sm"
              style={{
                backgroundColor: colors[color],
                border: '1px solid rgba(0,0,0,0.2)',
                boxShadow: isHighlighted 
                  ? `0 0 8px 2px ${colors[color]}` 
                  : '1px 1px 2px rgba(0,0,0,0.3)',
              }}
              animate={{
                scale: isHighlighted ? 1.05 : 1,
                opacity: isSearching && !isHighlighted ? 0.3 : 1,
              }}
              transition={{ duration: 0.3 }}
            />
          )
        })}
      </div>
    </div>
  )
}

function SchemaScene() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  
  const [phase, setPhase] = useState('idle') // idle, searching-read, found-read, searching-write, found-write, complete
  const [searchProgress, setSearchProgress] = useState(0)
  const [readTime, setReadTime] = useState(0)
  const [writeTime, setWriteTime] = useState(0)
  const [readBinIndex, setReadBinIndex] = useState(0)
  
  // Generate bins for schema on read (random pieces) - 24 bins, one per hour
  const [readBins] = useState(() => 
    Array.from({ length: 24 }, (_, i) => ({
      id: i,
      label: `Hour ${i + 1}`,
      pieces: generateRandomPieces(6),
    }))
  )
  
  // Generate bins for schema on write (24 hourly bins, each with 6 color compartments)
  const [writeBins] = useState(() => 
    Array.from({ length: 24 }, (_, i) => ({
      id: i,
      label: `Hour ${i + 1}`,
    }))
  )

  const runReadSearch = () => {
    if (phase === 'searching-read') return
    setPhase('searching-read')
    setSearchProgress(0)
    setReadTime(0)
    setReadBinIndex(0)
    
    // Simulate schema on read - slow, bin by bin (0.5 seconds per bin = 12 seconds total for 24 bins)
    let readTimer = 0
    const readInterval = setInterval(() => {
      readTimer += 100
      setReadTime(readTimer)
      setSearchProgress((readTimer % 500) / 5)
      setReadBinIndex(Math.floor(readTimer / 500))
      
      if (readTimer >= 12000) {
        clearInterval(readInterval)
        setPhase('found-read')
      }
    }, 100)
  }

  const runWriteSearch = () => {
    if (phase === 'searching-write') return
    setPhase('searching-write')
    setWriteTime(0)
    
    // Simulate schema on write - show the highlight for 800ms so people can see it
    // Use 300ms (0.3s) so math works out to 40x faster (12000 / 300 = 40)
    setTimeout(() => {
      setWriteTime(300)
      setPhase('found-write')
    }, 800)
  }

  const reset = () => {
    setPhase('idle')
    setSearchProgress(0)
    setReadTime(0)
    setWriteTime(0)
    setReadBinIndex(0)
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
          <span className={`text-eyebrow text-sm block mb-2 ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
            Elastic Common Schema
          </span>
          <h2 className={`text-headline text-4xl md:text-5xl font-extrabold ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            Schema on Read vs <span className="gradient-text">Schema on Write</span>
          </h2>
          <p className={`text-lg mt-2 ${isDark ? 'text-white/60' : 'text-elastic-dev-blue/60'}`}>
            How you organize data determines how fast you can find it
          </p>
        </motion.div>

        {/* Main comparison */}
        <div className="flex-1 flex gap-6 min-h-0">
          {/* Schema on Read (Splunk) */}
          <motion.div 
            className={`flex-1 rounded-2xl border p-4 ${
              isDark ? 'bg-white/[0.02] border-white/10' : 'bg-white/50 border-elastic-dev-blue/10'
            }`}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className={`text-lg font-bold ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
                  Schema on Read
                </div>
                <div className={`text-sm ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'}`}>
                  Organize when searching
                </div>
              </div>
              <div className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                isDark ? 'bg-orange-500/20 text-orange-400' : 'bg-orange-100 text-orange-600'
              }`}>
                Traditional SIEM
              </div>
            </div>

            {/* Bins grid - 24 bins in 6 columns */}
            <div className="grid grid-cols-6 gap-1 mb-3">
              {readBins.map((bin, index) => (
                <Bin
                  key={bin.id}
                  pieces={bin.pieces}
                  label={bin.label}
                  isSearching={phase === 'searching-read' && readBinIndex === index}
                  highlightColor={(phase === 'found-read' || phase === 'searching-write' || phase === 'complete') ? 'blue' : null}
                  searchProgress={phase === 'searching-read' && readBinIndex === index ? searchProgress : undefined}
                  small
                />
              ))}
            </div>

            {/* Process explanation */}
            <div className={`p-3 rounded-xl text-sm ${isDark ? 'bg-white/5' : 'bg-elastic-dev-blue/5'}`}>
              <div className="flex items-start gap-2">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="text-orange-400 mt-1" />
                <div>
                  <div className={`font-medium ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
                    "Find all blue squares"
                  </div>
                  <div className={`text-xs mt-1 ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'}`}>
                    Must scan every bin, piece by piece, sorting as you go
                  </div>
                </div>
              </div>
            </div>

            {/* Timer */}
            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faClock} className={`${isDark ? 'text-white/40' : 'text-elastic-dev-blue/40'}`} />
                <span className={`text-sm ${isDark ? 'text-white/60' : 'text-elastic-dev-blue/60'}`}>
                  Search time:
                </span>
              </div>
              <motion.div 
                className={`text-2xl font-mono font-bold ${
                  phase === 'complete' ? 'text-orange-400' : isDark ? 'text-white' : 'text-elastic-dev-blue'
                }`}
                key={readTime}
              >
                {(readTime / 1000).toFixed(1)}s
              </motion.div>
            </div>
          </motion.div>

          {/* Center action - Two buttons */}
          <motion.div 
            className="flex flex-col items-center justify-center gap-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            {/* Schema on Read button */}
            <div className="flex flex-col items-center">
              <button
                onClick={runReadSearch}
                disabled={phase === 'searching-read'}
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                  phase === 'searching-read'
                    ? 'bg-orange-500/50 text-white cursor-not-allowed'
                    : 'bg-gradient-to-r from-orange-400 to-orange-600 text-white hover:scale-110'
                }`}
              >
                <FontAwesomeIcon 
                  icon={phase === 'searching-read' ? faMagnifyingGlass : faPlay} 
                  className={phase === 'searching-read' ? 'text-lg animate-pulse' : 'text-lg ml-0.5 -scale-x-100'}
                />
              </button>
              <div className={`text-xs mt-1 ${isDark ? 'text-white/40' : 'text-elastic-dev-blue/40'}`}>
                Search Read
              </div>
            </div>

            {/* Result comparison */}
            {readTime > 0 && writeTime > 0 && (
              <motion.div
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className={`text-3xl font-bold ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
                  {Math.round(readTime / writeTime)}x
                </div>
                <div className={`text-xs ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'}`}>
                  faster
                </div>
              </motion.div>
            )}

            {/* Schema on Write button */}
            <div className="flex flex-col items-center">
              <button
                onClick={runWriteSearch}
                disabled={phase === 'searching-write'}
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                  phase === 'searching-write'
                    ? isDark 
                      ? 'bg-elastic-teal/50 text-white cursor-not-allowed'
                      : 'bg-elastic-blue/50 text-white cursor-not-allowed'
                    : isDark
                      ? 'bg-gradient-to-r from-elastic-teal to-elastic-blue text-white hover:scale-110'
                      : 'bg-gradient-to-r from-elastic-dev-blue to-elastic-blue text-white hover:scale-110'
                }`}
              >
                <FontAwesomeIcon 
                  icon={phase === 'searching-write' ? faBolt : faPlay} 
                  className={phase === 'searching-write' ? 'text-lg animate-pulse' : 'text-lg ml-0.5'}
                />
              </button>
              <div className={`text-xs mt-1 ${isDark ? 'text-white/40' : 'text-elastic-dev-blue/40'}`}>
                Search Write
              </div>
            </div>

            {/* Reset button */}
            {(readTime > 0 || writeTime > 0) && phase !== 'searching-read' && phase !== 'searching-write' && (
              <button
                onClick={reset}
                className="text-xs text-white/40 hover:text-white/60 flex items-center gap-1"
              >
                <FontAwesomeIcon icon={faRotate} className="text-[10px]" />
                Reset
              </button>
            )}
          </motion.div>

          {/* Schema on Write (Elastic) */}
          <motion.div 
            className={`flex-1 rounded-2xl border p-4 ${
              isDark ? 'bg-white/[0.02] border-white/10' : 'bg-white/50 border-elastic-dev-blue/10'
            }`}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className={`text-lg font-bold ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
                  Schema on Write
                </div>
                <div className={`text-sm ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'}`}>
                  Organize before storing
                </div>
              </div>
              <img 
                src="/logo-elastic-glyph-color.png" 
                alt="Elastic" 
                className="h-12 w-auto"
              />
            </div>

            {/* Organized bins grid - 24 bins in 6 columns, each with 6 color compartments */}
            <div className="grid grid-cols-6 gap-1 mb-3">
              {writeBins.map((bin) => (
                <OrganizedBin
                  key={bin.id}
                  label={bin.label}
                  isSearching={phase === 'searching-write'}
                  highlightColor={(phase === 'searching-write' || phase === 'found-write' || phase === 'complete') ? 'blue' : null}
                />
              ))}
            </div>

            {/* Process explanation */}
            <div className={`p-3 rounded-xl text-sm ${isDark ? 'bg-white/5' : 'bg-elastic-dev-blue/5'}`}>
              <div className="flex items-start gap-2">
                <FontAwesomeIcon icon={faBolt} className={`mt-1 ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`} />
                <div>
                  <div className={`font-medium ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
                    "Find all blue squares"
                  </div>
                  <div className={`text-xs mt-1 ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'}`}>
                    Data pre-sorted by color. Jump directly to blue bins.
                  </div>
                </div>
              </div>
            </div>

            {/* Timer */}
            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faClock} className={`${isDark ? 'text-white/40' : 'text-elastic-dev-blue/40'}`} />
                <span className={`text-sm ${isDark ? 'text-white/60' : 'text-elastic-dev-blue/60'}`}>
                  Search time:
                </span>
              </div>
              <motion.div 
                className={`text-2xl font-mono font-bold ${
                  phase === 'complete' ? 'text-elastic-teal' : isDark ? 'text-white' : 'text-elastic-dev-blue'
                }`}
                key={writeTime}
              >
                {(writeTime / 1000).toFixed(1)}s
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom insight - shows after both searches complete */}
        <AnimatePresence>
          {readTime > 0 && writeTime > 0 && (
            <motion.div 
              className={`mt-4 p-4 rounded-xl text-center ${isDark ? 'bg-white/[0.03]' : 'bg-white/60'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className={`text-lg font-bold mb-3 ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
                Unified Fields for <span className="gradient-text">Unified Intelligence</span>
              </div>
              <div className="flex items-center justify-center gap-8 mb-3">
                <div className="flex items-center gap-3">
                  <FontAwesomeIcon icon={faBox} className="text-elastic-pink text-xl" />
                  <div className="text-left">
                    <div className={`text-sm font-bold ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
                      Elastic Common Schema (ECS)
                    </div>
                    <div className={`text-xs ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'}`}>
                      Standardized field names across all data sources
                    </div>
                  </div>
                </div>
                <div className={`w-px h-10 ${isDark ? 'bg-white/10' : 'bg-elastic-dev-blue/10'}`} />
                <div className="flex items-center gap-3">
                  <FontAwesomeIcon icon={faLayerGroup} className="text-elastic-yellow text-xl" />
                  <div className="text-left">
                    <div className={`text-sm font-bold ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
                      Pre-indexed & Normalized
                    </div>
                    <div className={`text-xs ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'}`}>
                      Data ready for instant correlation & search
                    </div>
                  </div>
                </div>
              </div>
              <div className={`text-sm ${isDark ? 'text-white/60' : 'text-elastic-dev-blue/60'}`}>
                Enabling consistent search, detection, and response across all your data.
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default SchemaScene


import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, Reorder } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faXmark, faEye, faEyeSlash, faRotateLeft, faGripVertical, faClock, faCheck } from '@fortawesome/free-solid-svg-icons'
import { useTheme } from '../context/ThemeContext'

const STORAGE_KEY = 'presentation-scene-config'

export function useEnabledScenes(allScenes) {
  const [config, setConfig] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch {
        return {
          enabledIds: allScenes.map(s => s.id),
          order: allScenes.map(s => s.id),
          durations: {}
        }
      }
    }
    return {
      enabledIds: allScenes.map(s => s.id),
      order: allScenes.map(s => s.id),
      durations: {}
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config))
  }, [config])

  const toggleScene = (sceneId) => {
    setConfig(prev => {
      if (prev.enabledIds.includes(sceneId)) {
        if (prev.enabledIds.length <= 1) return prev
        return { ...prev, enabledIds: prev.enabledIds.filter(id => id !== sceneId) }
      }
      return { ...prev, enabledIds: [...prev.enabledIds, sceneId] }
    })
  }

  const updateOrder = (newOrder) => {
    setConfig(prev => ({ ...prev, order: newOrder }))
  }

  const updateDuration = (sceneId, duration) => {
    setConfig(prev => ({
      ...prev,
      durations: { ...prev.durations, [sceneId]: duration }
    }))
  }

  const resetToDefault = () => {
    setConfig({
      enabledIds: allScenes.map(s => s.id),
      order: allScenes.map(s => s.id),
      durations: {}
    })
  }

  // Build ordered and filtered scenes
  const orderedScenes = config.order
    .map(id => allScenes.find(s => s.id === id))
    .filter(Boolean)
  
  // Add any new scenes not in the order (in case scenes were added)
  allScenes.forEach(scene => {
    if (!orderedScenes.find(s => s.id === scene.id)) {
      orderedScenes.push(scene)
    }
  })

  const enabledScenes = orderedScenes
    .filter(s => config.enabledIds.includes(s.id))
    .map(s => ({
      ...s,
      duration: config.durations[s.id] || s.duration
    }))

  return {
    enabledSceneIds: config.enabledIds,
    enabledScenes,
    orderedScenes,
    customDurations: config.durations,
    toggleScene,
    updateOrder,
    updateDuration,
    resetToDefault
  }
}

function SceneItem({ scene, index, isEnabled, isLastEnabled, onToggle, customDuration, onUpdateDuration, isDark }) {
  const [isEditingDuration, setIsEditingDuration] = useState(false)
  const [durationValue, setDurationValue] = useState(customDuration || scene.duration || '')
  const inputRef = useRef(null)

  useEffect(() => {
    if (isEditingDuration && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditingDuration])

  const handleDurationSubmit = () => {
    onUpdateDuration(scene.id, durationValue)
    setIsEditingDuration(false)
  }

  const displayDuration = customDuration || scene.duration

  return (
    <Reorder.Item
      value={scene.id}
      className={`p-4 rounded-xl transition-all ${
        isEnabled
          ? isDark 
            ? 'bg-elastic-teal/20 border-2 border-elastic-teal/50' 
            : 'bg-elastic-teal/10 border-2 border-elastic-teal/30'
          : isDark
            ? 'bg-white/[0.03] border-2 border-transparent'
            : 'bg-elastic-dev-blue/[0.03] border-2 border-transparent'
      }`}
      whileDrag={{ scale: 1.02, boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}
    >
      <div className="flex items-center gap-3">
        {/* Drag Handle */}
        <div className={`cursor-grab active:cursor-grabbing p-1 ${
          isDark ? 'text-white/30 hover:text-white/60' : 'text-elastic-dev-blue/30 hover:text-elastic-dev-blue/60'
        }`}>
          <FontAwesomeIcon icon={faGripVertical} />
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => !isLastEnabled && onToggle(scene.id)}
          disabled={isLastEnabled}
          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
            isEnabled
              ? 'bg-elastic-teal text-elastic-dev-blue'
              : isDark ? 'bg-white/10 text-white/40 hover:bg-white/20' : 'bg-elastic-dev-blue/10 text-elastic-dev-blue/40 hover:bg-elastic-dev-blue/20'
          } ${isLastEnabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
        >
          <FontAwesomeIcon icon={isEnabled ? faEye : faEyeSlash} className="text-sm" />
        </button>

        {/* Scene Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className={`text-xs font-mono px-2 py-0.5 rounded ${
              isDark ? 'bg-white/10 text-white/50' : 'bg-elastic-dev-blue/10 text-elastic-dev-blue/50'
            }`}>
              {index + 1}
            </span>
            <h3 className={`font-semibold truncate ${
              isEnabled
                ? isDark ? 'text-white' : 'text-elastic-dev-blue'
                : isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'
            }`}>
              {scene.title}
            </h3>
          </div>
          {scene.description && (
            <p className={`text-xs mt-1 truncate ${
              isDark ? 'text-white/40' : 'text-elastic-dev-blue/40'
            }`}>
              {scene.description}
            </p>
          )}
        </div>

        {/* Duration Editor */}
        <div className="flex-shrink-0">
          {isEditingDuration ? (
            <div className="flex items-center gap-1">
              <input
                ref={inputRef}
                type="text"
                value={durationValue}
                onChange={(e) => setDurationValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleDurationSubmit()
                  if (e.key === 'Escape') setIsEditingDuration(false)
                }}
                onBlur={handleDurationSubmit}
                className={`w-20 px-2 py-1 text-xs rounded border ${
                  isDark 
                    ? 'bg-white/10 border-white/20 text-white' 
                    : 'bg-white border-elastic-dev-blue/20 text-elastic-dev-blue'
                }`}
                placeholder="e.g. 5 min"
              />
              <button
                onClick={handleDurationSubmit}
                className="w-6 h-6 rounded flex items-center justify-center bg-elastic-teal text-elastic-dev-blue"
              >
                <FontAwesomeIcon icon={faCheck} className="text-xs" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditingDuration(true)}
              className={`flex items-center gap-1 text-xs px-2 py-1 rounded transition-all ${
                isDark 
                  ? 'bg-white/10 text-white/50 hover:bg-white/20 hover:text-white/70' 
                  : 'bg-elastic-dev-blue/10 text-elastic-dev-blue/50 hover:bg-elastic-dev-blue/20'
              }`}
              title="Click to edit duration"
            >
              <FontAwesomeIcon icon={faClock} className="text-[10px]" />
              {displayDuration || 'Set time'}
            </button>
          )}
        </div>
      </div>
    </Reorder.Item>
  )
}

export default function SceneSettings({ 
  scenes, 
  enabledSceneIds, 
  orderedScenes,
  customDurations,
  onToggle, 
  onUpdateOrder,
  onUpdateDuration,
  onReset 
}) {
  const [isOpen, setIsOpen] = useState(false)
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const enabledCount = enabledSceneIds.length
  const totalCount = scenes.length

  // Use ordered scenes for display
  const displayScenes = orderedScenes || scenes
  const orderedIds = displayScenes.map(s => s.id)

  const handleReorder = (newOrder) => {
    if (onUpdateOrder) {
      onUpdateOrder(newOrder)
    }
  }

  // Calculate total presentation time
  const totalTime = displayScenes
    .filter(s => enabledSceneIds.includes(s.id))
    .reduce((acc, s) => {
      const duration = customDurations?.[s.id] || s.duration || ''
      const match = duration.match(/(\d+)/)
      return acc + (match ? parseInt(match[1]) : 0)
    }, 0)

  return (
    <>
      {/* Settings Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-4 right-4 z-40 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-lg ${
          isDark 
            ? 'bg-white/10 hover:bg-white/20 text-white/70 hover:text-white' 
            : 'bg-elastic-dev-blue/10 hover:bg-elastic-dev-blue/20 text-elastic-dev-blue/70 hover:text-elastic-dev-blue'
        }`}
        title="Scene Settings"
      >
        <FontAwesomeIcon icon={faGear} className="text-sm" />
      </button>

      {/* Settings Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setIsOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className={`fixed right-0 top-0 bottom-0 w-[420px] z-50 shadow-2xl overflow-hidden flex flex-col ${
                isDark ? 'bg-elastic-dev-blue' : 'bg-white'
              }`}
            >
              {/* Header */}
              <div className={`p-6 border-b flex-shrink-0 ${isDark ? 'border-white/10' : 'border-elastic-dev-blue/10'}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
                      Scene Settings
                    </h2>
                    <p className={`text-sm mt-1 ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'}`}>
                      {enabledCount} of {totalCount} scenes • ~{totalTime} min total
                    </p>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      isDark ? 'hover:bg-white/10 text-white/60' : 'hover:bg-elastic-dev-blue/10 text-elastic-dev-blue/60'
                    }`}
                  >
                    <FontAwesomeIcon icon={faXmark} className="text-xl" />
                  </button>
                </div>

                {/* Instructions & Reset */}
                <div className="mt-4 flex items-center justify-between">
                  <p className={`text-xs ${isDark ? 'text-white/40' : 'text-elastic-dev-blue/40'}`}>
                    Drag to reorder • Click eye to toggle • Click time to edit
                  </p>
                  <button
                    onClick={onReset}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2 transition-all ${
                      isDark 
                        ? 'bg-white/10 hover:bg-white/20 text-white/70' 
                        : 'bg-elastic-dev-blue/10 hover:bg-elastic-dev-blue/20 text-elastic-dev-blue/70'
                    }`}
                  >
                    <FontAwesomeIcon icon={faRotateLeft} />
                    Reset
                  </button>
                </div>
              </div>

              {/* Scene List */}
              <div className="flex-1 overflow-y-auto p-4">
                <Reorder.Group 
                  axis="y" 
                  values={orderedIds} 
                  onReorder={handleReorder}
                  className="space-y-2"
                >
                  {displayScenes.map((scene, index) => {
                    const isEnabled = enabledSceneIds.includes(scene.id)
                    const isLastEnabled = isEnabled && enabledCount === 1

                    return (
                      <SceneItem
                        key={scene.id}
                        scene={scene}
                        index={index}
                        isEnabled={isEnabled}
                        isLastEnabled={isLastEnabled}
                        onToggle={onToggle}
                        customDuration={customDurations?.[scene.id]}
                        onUpdateDuration={onUpdateDuration}
                        isDark={isDark}
                      />
                    )
                  })}
                </Reorder.Group>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

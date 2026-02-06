import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, Reorder } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faGear, faXmark, faEye, faEyeSlash, faRotateLeft, faGripVertical, faClock, faCheck,
  faUsers, faSliders, faPlus, faTrash, faDownload, faUpload
} from '@fortawesome/free-solid-svg-icons'
import { useTheme } from '../context/ThemeContext'
import { useTeamConfig } from '../context/TeamContext'

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

// Utility function to resize and compress images
function resizeImage(file, maxSize = 200) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        let width = img.width
        let height = img.height

        // Calculate new dimensions (maintain aspect ratio, fit in maxSize square)
        if (width > height) {
          if (width > maxSize) {
            height = Math.round((height * maxSize) / width)
            width = maxSize
          }
        } else {
          if (height > maxSize) {
            width = Math.round((width * maxSize) / height)
            height = maxSize
          }
        }

        canvas.width = width
        canvas.height = height

        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, width, height)

        // Convert to base64 with quality compression
        const dataUrl = canvas.toDataURL('image/jpeg', 0.8)
        resolve(dataUrl)
      }
      img.onerror = reject
      img.src = e.target.result
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

// Team Member Editor Component
function TeamMemberEditor({ member, index, onUpdate, onDelete, isDark }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [imageError, setImageError] = useState(false)
  const fileInputRef = useRef(null)

  const handleChange = (field, value) => {
    onUpdate({ ...member, [field]: value })
    if (field === 'photo') setImageError(false)
  }

  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0]
    const inputElement = event.target // Capture ref before async
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    // Validate file size (max 5MB before compression)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image must be less than 5MB')
      return
    }

    setIsUploading(true)
    try {
      const dataUrl = await resizeImage(file, 200)
      handleChange('photo', dataUrl)
    } catch (err) {
      console.error('Failed to process image:', err)
      alert('Failed to process image')
    } finally {
      setIsUploading(false)
      // Reset input using captured ref
      if (inputElement) {
        inputElement.value = ''
        inputElement.blur() // Remove focus from hidden input
      }
    }
  }

  const handleClearPhoto = () => {
    handleChange('photo', null)
    setImageError(false)
  }

  const inputClass = `w-full px-3 py-2 text-sm rounded-lg border ${
    isDark 
      ? 'bg-white/5 border-white/10 text-white placeholder-white/30' 
      : 'bg-white border-elastic-dev-blue/10 text-elastic-dev-blue placeholder-elastic-dev-blue/30'
  }`

  // Check if photo is a data URL (uploaded) or a path/URL
  const isDataUrl = member.photo?.startsWith('data:')
  const hasPhoto = member.photo && !imageError

  return (
    <div className={`rounded-xl border overflow-hidden ${
      isDark ? 'bg-white/[0.03] border-white/10' : 'bg-elastic-dev-blue/[0.02] border-elastic-dev-blue/10'
    }`}>
      {/* Header - always visible */}
      <div 
        className={`p-3 flex items-center gap-3 cursor-pointer ${
          isDark ? 'hover:bg-white/5' : 'hover:bg-elastic-dev-blue/5'
        }`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Avatar preview */}
        {hasPhoto ? (
          <img 
            src={member.photo}
            alt={member.name || 'Member'}
            className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
            onError={() => setImageError(true)}
          />
        ) : (
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0"
            style={{ 
              backgroundColor: isDark ? `${member.color}30` : `${member.color}20`,
              color: member.color 
            }}
          >
            {member.initials || '?'}
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <div className={`font-medium truncate ${isDark ? 'text-white' : 'text-elastic-dev-blue'}`}>
            {member.name || 'New Member'}
          </div>
          <div className={`text-xs truncate ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'}`}>
            {member.role || 'No role set'}
          </div>
        </div>

        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onDelete(); }}
          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
            isDark ? 'hover:bg-red-500/20 text-white/40 hover:text-red-400' : 'hover:bg-red-500/10 text-elastic-dev-blue/40 hover:text-red-500'
          }`}
        >
          <FontAwesomeIcon icon={faTrash} className="text-xs" />
        </button>
      </div>

      {/* Expanded form */}
      <AnimatePresence mode="wait">
        {isExpanded && (
          <motion.div
            key={`expanded-${member.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div 
              className={`p-3 pt-0 space-y-3 border-t ${isDark ? 'border-white/10' : 'border-elastic-dev-blue/10'}`}
              onClick={(e) => e.stopPropagation()} // Prevent clicks from toggling expand
            >
              {/* Photo Upload Section */}
              <div className="pt-3">
                <label className={`text-xs mb-2 block ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'}`}>Photo</label>
                <div className="flex items-start gap-3">
                  {/* Photo Preview */}
                  <div className="relative">
                    {hasPhoto ? (
                      <img 
                        src={member.photo}
                        alt={member.name || 'Member'}
                        className="w-16 h-16 rounded-xl object-cover"
                        style={{ border: `2px solid ${member.color}` }}
                        onError={() => setImageError(true)}
                      />
                    ) : (
                      <div 
                        className="w-16 h-16 rounded-xl flex items-center justify-center text-xl font-bold"
                        style={{ 
                          backgroundColor: isDark ? `${member.color}30` : `${member.color}20`,
                          color: member.color,
                          border: `2px dashed ${member.color}50`
                        }}
                      >
                        {member.initials || '?'}
                      </div>
                    )}
                    {isUploading && (
                      <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      </div>
                    )}
                  </div>

                  {/* Upload Controls */}
                  <div className="flex-1 space-y-2">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                        disabled={isUploading}
                        className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-2 transition-all ${
                          isDark 
                            ? 'bg-elastic-teal/20 hover:bg-elastic-teal/30 text-elastic-teal' 
                            : 'bg-elastic-blue/10 hover:bg-elastic-blue/20 text-elastic-blue'
                        } ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <FontAwesomeIcon icon={faUpload} />
                        Upload
                      </button>
                      {hasPhoto && (
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); handleClearPhoto(); }}
                          className={`px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-2 transition-all ${
                            isDark 
                              ? 'bg-red-500/10 hover:bg-red-500/20 text-red-400' 
                              : 'bg-red-500/5 hover:bg-red-500/10 text-red-500'
                          }`}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      )}
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      tabIndex={-1}
                      aria-hidden="true"
                    />
                    
                    {/* URL Input (alternative to upload) */}
                    <input
                      type="text"
                      value={isDataUrl ? '' : (member.photo || '')}
                      onChange={(e) => handleChange('photo', e.target.value)}
                      className={`${inputClass} text-xs`}
                      placeholder="Or paste URL: /photos/name.jpg"
                      disabled={isDataUrl}
                    />
                    {isDataUrl && (
                      <p className={`text-[10px] ${isDark ? 'text-white/30' : 'text-elastic-dev-blue/30'}`}>
                        ✓ Photo uploaded (stored in browser)
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`text-xs mb-1 block ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'}`}>Name</label>
                  <input
                    type="text"
                    value={member.name || ''}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className={inputClass}
                    placeholder="Full Name"
                  />
                </div>
                <div>
                  <label className={`text-xs mb-1 block ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'}`}>Initials</label>
                  <input
                    type="text"
                    value={member.initials || ''}
                    onChange={(e) => handleChange('initials', e.target.value.toUpperCase().slice(0, 3))}
                    className={inputClass}
                    placeholder="AB"
                    maxLength={3}
                  />
                </div>
              </div>

              <div>
                <label className={`text-xs mb-1 block ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'}`}>Role</label>
                <input
                  type="text"
                  value={member.role || ''}
                  onChange={(e) => handleChange('role', e.target.value)}
                  className={inputClass}
                  placeholder="Job Title"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`text-xs mb-1 block ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'}`}>Email</label>
                  <input
                    type="email"
                    value={member.email || ''}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className={inputClass}
                    placeholder="email@elastic.co"
                  />
                </div>
                <div>
                  <label className={`text-xs mb-1 block ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'}`}>Phone</label>
                  <input
                    type="text"
                    value={member.phone || ''}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className={inputClass}
                    placeholder="123.456.7890"
                  />
                </div>
              </div>

              <div>
                <label className={`text-xs mb-1 block ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'}`}>Accent Color</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={member.color || '#0B64DD'}
                    onChange={(e) => handleChange('color', e.target.value)}
                    className="w-10 h-10 rounded-lg cursor-pointer border-0"
                  />
                  <input
                    type="text"
                    value={member.color || '#0B64DD'}
                    onChange={(e) => handleChange('color', e.target.value)}
                    className={`${inputClass} flex-1`}
                    placeholder="#0B64DD"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Team Editor Panel
function TeamEditorPanel({ isDark }) {
  const { teamConfig, updateTeamConfig, resetTeamConfig } = useTeamConfig()
  const fileInputRef = useRef(null)

  const handleTitleChange = (value) => {
    updateTeamConfig({ ...teamConfig, title: value })
  }

  const handleSubtitleChange = (value) => {
    updateTeamConfig({ ...teamConfig, subtitle: value })
  }

  const handleMemberUpdate = (index, updatedMember) => {
    const newMembers = [...teamConfig.members]
    newMembers[index] = updatedMember
    updateTeamConfig({ ...teamConfig, members: newMembers })
  }

  const handleMemberDelete = (index) => {
    const newMembers = teamConfig.members.filter((_, i) => i !== index)
    updateTeamConfig({ ...teamConfig, members: newMembers })
  }

  const handleAddMember = () => {
    const newMember = {
      id: `member-${Date.now()}`,
      name: '',
      role: '',
      email: '',
      phone: '',
      color: '#0B64DD',
      initials: '',
      photo: null
    }
    updateTeamConfig({ ...teamConfig, members: [...teamConfig.members, newMember] })
  }

  const handleExport = () => {
    const dataStr = JSON.stringify(teamConfig, null, 2)
    const blob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'team.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleImport = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const config = JSON.parse(e.target.result)
        updateTeamConfig(config)
      } catch (err) {
        alert('Invalid JSON file')
      }
    }
    reader.readAsText(file)
    event.target.value = '' // Reset input
  }

  const inputClass = `w-full px-3 py-2 text-sm rounded-lg border ${
    isDark 
      ? 'bg-white/5 border-white/10 text-white placeholder-white/30' 
      : 'bg-white border-elastic-dev-blue/10 text-elastic-dev-blue placeholder-elastic-dev-blue/30'
  }`

  return (
    <div className="space-y-4">
      {/* Header Settings */}
      <div className={`p-4 rounded-xl ${isDark ? 'bg-white/[0.03]' : 'bg-elastic-dev-blue/[0.02]'}`}>
        <h3 className={`text-sm font-semibold mb-3 ${isDark ? 'text-white/70' : 'text-elastic-dev-blue/70'}`}>
          Page Header
        </h3>
        <div className="space-y-3">
          <div>
            <label className={`text-xs mb-1 block ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'}`}>Title</label>
            <input
              type="text"
              value={teamConfig.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={`text-xs mb-1 block ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'}`}>Subtitle</label>
            <input
              type="text"
              value={teamConfig.subtitle}
              onChange={(e) => handleSubtitleChange(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Team Members */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className={`text-sm font-semibold ${isDark ? 'text-white/70' : 'text-elastic-dev-blue/70'}`}>
            Team Members ({teamConfig.members.length})
          </h3>
          <button
            type="button"
            onClick={handleAddMember}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2 transition-all ${
              isDark 
                ? 'bg-elastic-teal/20 hover:bg-elastic-teal/30 text-elastic-teal' 
                : 'bg-elastic-blue/10 hover:bg-elastic-blue/20 text-elastic-blue'
            }`}
          >
            <FontAwesomeIcon icon={faPlus} />
            Add Member
          </button>
        </div>

        <div className="space-y-2">
          {teamConfig.members.map((member, index) => (
            <TeamMemberEditor
              key={member.id}
              member={member}
              index={index}
              onUpdate={(updated) => handleMemberUpdate(index, updated)}
              onDelete={() => handleMemberDelete(index)}
              isDark={isDark}
            />
          ))}

          {teamConfig.members.length === 0 && (
            <div className={`text-center py-8 rounded-xl border-2 border-dashed ${
              isDark ? 'border-white/10 text-white/30' : 'border-elastic-dev-blue/10 text-elastic-dev-blue/30'
            }`}>
              <FontAwesomeIcon icon={faUsers} className="text-2xl mb-2" />
              <p className="text-sm">No team members yet</p>
              <p className="text-xs mt-1">Click "Add Member" to get started</p>
            </div>
          )}
        </div>
      </div>

      {/* Import/Export */}
      <div className={`p-4 rounded-xl ${isDark ? 'bg-white/[0.03]' : 'bg-elastic-dev-blue/[0.02]'}`}>
        <h3 className={`text-sm font-semibold mb-3 ${isDark ? 'text-white/70' : 'text-elastic-dev-blue/70'}`}>
          Import / Export
        </h3>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleExport}
            className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-2 transition-all ${
              isDark 
                ? 'bg-white/10 hover:bg-white/20 text-white/70' 
                : 'bg-elastic-dev-blue/10 hover:bg-elastic-dev-blue/20 text-elastic-dev-blue/70'
            }`}
          >
            <FontAwesomeIcon icon={faDownload} />
            Export JSON
          </button>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-2 transition-all ${
              isDark 
                ? 'bg-white/10 hover:bg-white/20 text-white/70' 
                : 'bg-elastic-dev-blue/10 hover:bg-elastic-dev-blue/20 text-elastic-dev-blue/70'
            }`}
          >
            <FontAwesomeIcon icon={faUpload} />
            Import JSON
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleImport}
            className="hidden"
            tabIndex={-1}
            aria-hidden="true"
          />
        </div>
        <button
          type="button"
          onClick={resetTeamConfig}
          className={`w-full mt-2 px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-2 transition-all ${
            isDark 
              ? 'bg-red-500/10 hover:bg-red-500/20 text-red-400' 
              : 'bg-red-500/5 hover:bg-red-500/10 text-red-500'
          }`}
        >
          <FontAwesomeIcon icon={faRotateLeft} />
          Reset to Default (from file)
        </button>
      </div>
    </div>
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
  const [activeTab, setActiveTab] = useState('scenes') // 'scenes' or 'team'
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

      {/* Settings Panel - Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="settings-backdrop"
            initial={{ opacity: 0, pointerEvents: 'auto' }}
            animate={{ opacity: 1, pointerEvents: 'auto' }}
            exit={{ opacity: 0, pointerEvents: 'none' }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Settings Panel - Content */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            key="settings-panel"
            initial={{ opacity: 0, x: 300, pointerEvents: 'auto' }}
            animate={{ opacity: 1, x: 0, pointerEvents: 'auto' }}
            exit={{ opacity: 0, x: 300, pointerEvents: 'none' }}
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
                      Settings
                    </h2>
                    <p className={`text-sm mt-1 ${isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'}`}>
                      {activeTab === 'scenes' 
                        ? `${enabledCount} of ${totalCount} scenes • ~${totalTime} min total`
                        : 'Customize your team'}
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

                {/* Tab Buttons */}
                <div className={`mt-4 flex gap-2 p-1 rounded-xl ${isDark ? 'bg-white/5' : 'bg-elastic-dev-blue/5'}`}>
                  <button
                    onClick={() => setActiveTab('scenes')}
                    className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all ${
                      activeTab === 'scenes'
                        ? isDark 
                          ? 'bg-elastic-teal text-elastic-dev-blue' 
                          : 'bg-elastic-blue text-white'
                        : isDark 
                          ? 'text-white/60 hover:text-white/80' 
                          : 'text-elastic-dev-blue/60 hover:text-elastic-dev-blue/80'
                    }`}
                  >
                    <FontAwesomeIcon icon={faSliders} />
                    Scenes
                  </button>
                  <button
                    onClick={() => setActiveTab('team')}
                    className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all ${
                      activeTab === 'team'
                        ? isDark 
                          ? 'bg-elastic-teal text-elastic-dev-blue' 
                          : 'bg-elastic-blue text-white'
                        : isDark 
                          ? 'text-white/60 hover:text-white/80' 
                          : 'text-elastic-dev-blue/60 hover:text-elastic-dev-blue/80'
                    }`}
                  >
                    <FontAwesomeIcon icon={faUsers} />
                    Team
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-4">
                {activeTab === 'scenes' ? (
                  <>
                    {/* Instructions & Reset */}
                    <div className="mb-4 flex items-center justify-between">
                      <p className={`text-xs ${isDark ? 'text-white/40' : 'text-elastic-dev-blue/40'}`}>
                        Drag to reorder • Click eye to toggle
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

                    {/* Scene List */}
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
                  </>
                ) : (
                  <TeamEditorPanel isDark={isDark} />
                )}
              </div>
            </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

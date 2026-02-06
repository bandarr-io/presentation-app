import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'
import { useTeamConfig } from '../context/TeamContext'

function TeamScene() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [hoveredMember, setHoveredMember] = useState(null)
  const [copiedEmail, setCopiedEmail] = useState(null)
  const [imageErrors, setImageErrors] = useState({})
  
  // Use shared team config hook (syncs with Settings panel)
  const { teamConfig, isLoading } = useTeamConfig()

  // Reset image errors when team config changes (new photos uploaded)
  useEffect(() => {
    setImageErrors({})
  }, [teamConfig])

  const handleImageError = (memberId) => {
    setImageErrors(prev => ({ ...prev, [memberId]: true }))
  }

  const handleCopyEmail = async (email, id) => {
    try {
      await navigator.clipboard.writeText(email)
      setCopiedEmail(id)
      setTimeout(() => setCopiedEmail(null), 2000)
    } catch (err) {
      console.error('Failed to copy email')
    }
  }

  // Show loading state briefly
  if (isLoading) {
    return (
      <div className="scene flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={isDark ? 'text-white/50' : 'text-elastic-dev-blue/50'}
        >
          Loading team...
        </motion.div>
      </div>
    )
  }

  return (
    <div className="scene">
      <div className="max-w-5xl mx-auto w-full">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className={`text-eyebrow text-sm ${isDark ? 'text-elastic-teal' : 'text-elastic-blue'}`}>
            Your Support
          </span>
          <h2 className={`text-headline text-5xl md:text-6xl font-extrabold mt-4 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
            {teamConfig.title.includes('Elastic') ? (
              <>
                {teamConfig.title.split('Elastic')[0]}
                <span className="gradient-text">Elastic{teamConfig.title.split('Elastic')[1]}</span>
              </>
            ) : (
              teamConfig.title
            )}
          </h2>
          <p className={`text-paragraph text-xl mt-4 max-w-2xl mx-auto ${isDark ? 'text-elastic-light-grey/80' : 'text-elastic-ink'}`}>
            {teamConfig.subtitle}
          </p>
        </motion.div>

        {/* Team grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {teamConfig.members.map((member, index) => (
            <motion.div
              key={member.id}
              className="relative group"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              onMouseEnter={() => setHoveredMember(member.id)}
              onMouseLeave={() => setHoveredMember(null)}
            >
              <motion.div
                className={`relative p-6 rounded-3xl border overflow-hidden ${
                  isDark ? 'bg-white/[0.03] border-white/10' : 'bg-white/80 border-elastic-dev-blue/10'
                }`}
                whileHover={{ scale: 1.02, borderColor: isDark ? member.color : '#0B64DD' }}
                transition={{ duration: 0.2 }}
              >
                {/* Background glow */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: isDark 
                      ? `radial-gradient(circle at 30% 30%, ${member.color}15, transparent 60%)`
                      : `radial-gradient(circle at 30% 30%, rgba(11, 100, 221, 0.1), transparent 60%)`,
                  }}
                />

                <div className="relative flex items-start gap-5">
                  {/* Avatar */}
                  <motion.div
                    className="relative flex-shrink-0"
                    animate={{
                      scale: hoveredMember === member.id ? 1.05 : 1,
                    }}
                  >
                    {member.photo && !imageErrors[member.id] ? (
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="w-20 h-20 rounded-2xl object-cover"
                        style={{ border: `2px solid ${isDark ? member.color : '#0B64DD'}` }}
                        onError={() => handleImageError(member.id)}
                      />
                    ) : (
                      <div
                        className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold"
                        style={{ 
                          backgroundColor: isDark ? `${member.color}20` : 'rgba(11, 100, 221, 0.1)',
                          color: isDark ? member.color : '#0B64DD',
                        }}
                      >
                        {member.initials}
                      </div>
                    )}
                    
                    {/* Online indicator */}
                    <motion.div
                      className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-elastic-dev-blue"
                      style={{ backgroundColor: isDark ? member.color : '#0B64DD' }}
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.5,
                      }}
                    />
                  </motion.div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-headline text-xl font-bold mb-1 ${isDark ? 'text-white' : 'text-elastic-dark-ink'}`}>
                      {member.name}
                    </h3>
                    <p className={`text-paragraph text-sm mb-4 ${isDark ? 'text-elastic-light-grey/70' : 'text-elastic-ink'}`}>
                      {member.role}
                    </p>

                    {/* Contact details */}
                    <div className="space-y-2">
                      {/* Email */}
                      <button
                        onClick={() => handleCopyEmail(member.email, member.id)}
                        className={`flex items-center gap-2 text-sm transition-colors group/email ${
                          isDark ? 'text-white/70 hover:text-white' : 'text-elastic-dev-blue/70 hover:text-elastic-dev-blue'
                        }`}
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="truncate">{member.email}</span>
                        <span className={`text-xs transition-opacity ${copiedEmail === member.id ? 'opacity-100' : 'opacity-0 group-hover/email:opacity-100'}`} style={{ color: isDark ? member.color : '#0B64DD' }}>
                          {copiedEmail === member.id ? 'Copied!' : 'Click to copy'}
                        </span>
                      </button>

                      {/* Phone */}
                      <a
                        href={`tel:${member.phone?.replace(/\./g, '') || ''}`}
                        className={`flex items-center gap-2 text-sm transition-colors ${
                          isDark ? 'text-white/70 hover:text-white' : 'text-elastic-dev-blue/70 hover:text-elastic-dev-blue'
                        }`}
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span>{member.phone}</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Decorative corner */}
                <div
                  className="absolute top-0 right-0 w-20 h-20 opacity-10"
                  style={{
                    background: isDark 
                      ? `linear-gradient(135deg, ${member.color}, transparent)`
                      : `linear-gradient(135deg, #0B64DD, transparent)`,
                  }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Empty state */}
        {teamConfig.members.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className={`text-lg ${isDark ? 'text-white/40' : 'text-elastic-dev-blue/40'}`}>
              No team members configured.
            </p>
            <p className={`text-sm mt-2 ${isDark ? 'text-white/30' : 'text-elastic-dev-blue/30'}`}>
              Click the ⚙️ settings button to add team members.
            </p>
          </motion.div>
        )}

        {/* Bottom message */}
        {teamConfig.members.length > 0 && (
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <p className={isDark ? 'text-white/40' : 'text-elastic-dev-blue/50'}>
              <span className={isDark ? 'text-white/60' : 'text-elastic-dev-blue/70'}> </span>
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default TeamScene

import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'

const TEAM_STORAGE_KEY = 'presentation-team-config'

// Default team config
const DEFAULT_TEAM_CONFIG = {
  title: 'Meet Your Elastic Team',
  subtitle: "Before we dive in—here's who you'll be working with today",
  members: []
}

const TeamContext = createContext(null)

export function TeamProvider({ children }) {
  const [teamConfig, setTeamConfig] = useState(() => {
    // Initialize from localStorage synchronously to avoid flash
    const savedConfig = localStorage.getItem(TEAM_STORAGE_KEY)
    if (savedConfig) {
      try {
        return JSON.parse(savedConfig)
      } catch (e) {
        console.warn('Invalid localStorage team config')
      }
    }
    return DEFAULT_TEAM_CONFIG
  })
  const [isLoading, setIsLoading] = useState(true)

  // Load team config from file if nothing in localStorage
  useEffect(() => {
    const loadFromFile = async () => {
      const savedConfig = localStorage.getItem(TEAM_STORAGE_KEY)
      if (!savedConfig) {
        // No localStorage, try loading from JSON file
        try {
          const response = await fetch('/config/team.json')
          if (response.ok) {
            const config = await response.json()
            setTeamConfig(config)
            localStorage.setItem(TEAM_STORAGE_KEY, JSON.stringify(config))
          }
        } catch (error) {
          console.warn('Could not load team config:', error)
        }
      }
      setIsLoading(false)
    }
    loadFromFile()
  }, [])

  // Memoized update function
  const updateTeamConfig = useCallback((newConfig) => {
    setTeamConfig(newConfig)
    // Save to localStorage immediately
    localStorage.setItem(TEAM_STORAGE_KEY, JSON.stringify(newConfig))
  }, [])

  // Memoized reset function
  const resetTeamConfig = useCallback(async () => {
    localStorage.removeItem(TEAM_STORAGE_KEY)
    // Reload from JSON file
    try {
      const response = await fetch('/config/team.json')
      if (response.ok) {
        const config = await response.json()
        setTeamConfig(config)
        return
      }
    } catch {
      // Fall through to default
    }
    setTeamConfig(DEFAULT_TEAM_CONFIG)
  }, [])

  // Memoize the context value to prevent unnecessary re-renders
  // But ensure it updates when teamConfig changes
  const contextValue = useMemo(() => ({
    teamConfig,
    updateTeamConfig,
    resetTeamConfig,
    isLoading
  }), [teamConfig, updateTeamConfig, resetTeamConfig, isLoading])

  return (
    <TeamContext.Provider value={contextValue}>
      {children}
    </TeamContext.Provider>
  )
}

export function useTeamConfig() {
  const context = useContext(TeamContext)
  if (!context) {
    throw new Error('useTeamConfig must be used within a TeamProvider')
  }
  return context
}

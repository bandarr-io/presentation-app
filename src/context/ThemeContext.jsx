import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()
const THEME_STORAGE_KEY = 'presentation-theme'

export function ThemeProvider({ children }) {
  // Initialize from localStorage, default to 'dark'
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY)
    return saved === 'light' || saved === 'dark' ? saved : 'dark'
  })

  useEffect(() => {
    // Apply theme class to document
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(theme)
    // Persist to localStorage
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

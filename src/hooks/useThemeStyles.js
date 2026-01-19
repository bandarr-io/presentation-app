import { useTheme } from '../context/ThemeContext'

export function useThemeStyles() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return {
    theme,
    isDark,
    // Text colors
    textPrimary: isDark ? 'text-white' : 'text-elastic-dev-blue',
    textSecondary: isDark ? 'text-white/70' : 'text-elastic-dev-blue/70',
    textMuted: isDark ? 'text-white/40' : 'text-elastic-dev-blue/50',
    textAccent: isDark ? 'text-elastic-teal' : 'text-elastic-blue',
    // Background colors
    bgCard: isDark ? 'bg-white/[0.03]' : 'bg-white/80',
    bgCardHover: isDark ? 'bg-white/[0.05]' : 'bg-white/95',
    bgCardAlt: isDark ? 'bg-white/5' : 'bg-white/60',
    // Border colors
    border: isDark ? 'border-white/10' : 'border-elastic-dev-blue/10',
    borderHover: isDark ? 'border-white/20' : 'border-elastic-dev-blue/20',
    // Accent backgrounds
    accentBg: isDark ? 'bg-elastic-teal/10' : 'bg-elastic-blue/10',
    accentBorder: isDark ? 'border-elastic-teal/30' : 'border-elastic-blue/20',
  }
}


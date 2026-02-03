import { useTheme } from '../context/ThemeContext'

/**
 * Brand-aligned theme styles following Elastic Brand Guidelines
 * 
 * Dark theme (Developer Blue background):
 *   - Headlines: White
 *   - Paragraphs: Light Gray (#F5F7FA)
 *   - Eyebrows: Light Teal (#48EFCF)
 * 
 * Light theme (Light Gray/White background):
 *   - Headlines: Dark Ink (#1C1E23)
 *   - Paragraphs: Ink (#343741)
 *   - Eyebrows: Elastic Blue (#0B64DD)
 */
export function useThemeStyles() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return {
    theme,
    isDark,
    // Text colors - Brand aligned
    textHeadline: isDark ? 'text-white' : 'text-elastic-dark-ink',
    textParagraph: isDark ? 'text-elastic-light-grey' : 'text-elastic-ink',
    textEyebrow: isDark ? 'text-elastic-teal' : 'text-elastic-blue',
    // Legacy aliases (for compatibility)
    textPrimary: isDark ? 'text-white' : 'text-elastic-dark-ink',
    textSecondary: isDark ? 'text-elastic-light-grey' : 'text-elastic-ink',
    textMuted: isDark ? 'text-white/40' : 'text-elastic-ink/60',
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


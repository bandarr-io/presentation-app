/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        elastic: {
          // Core colors (Elastic Brand)
          blue: '#0B64DD',        // Elastic Blue
          teal: '#48EFCF',        // Light Teal
          poppy: '#FF957D',       // Light Poppy
          pink: '#F04E98',        // Pink
          yellow: '#FEC514',      // Yellow
          midnight: '#153385',    // Midnight
          'dev-blue': '#101C3F',  // Developer Blue
          // Text colors
          'dark-ink': '#1C1E23',  // Dark Ink (headlines on light)
          'ink': '#343741',       // Ink (paragraphs on light)
          // Background colors
          'light-grey': '#F5F7FA',
          white: '#FFFFFF',
        }
      },
      fontFamily: {
        // Headlines: Mier B Extrabold (licensed) with fallbacks
        headline: ['Mier B', 'Inter', 'system-ui', 'sans-serif'],
        // Paragraphs & UI: Inter
        body: ['Inter', 'system-ui', 'sans-serif'],
        // Code & Numerals: Space Mono
        mono: ['Space Mono', 'monospace'],
      },
      // Brand typography specs
      letterSpacing: {
        'eyebrow': '0.08em', // 8% for eyebrows
      },
      lineHeight: {
        'headline': '1.14',    // 114% for headlines
        'paragraph': '1.55',   // 155% for paragraphs/captions
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(72, 239, 207, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(72, 239, 207, 0.6)' },
        }
      }
    },
  },
  plugins: [],
}


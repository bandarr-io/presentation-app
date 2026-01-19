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
          // Primary colors
          midnight: '#153385',
          blue: '#0B64DD',
          teal: '#48EFCF',
          yellow: '#FEC514',
          pink: '#F04E98',
          poppy: '#FF957D',
          // Background colors
          'dev-blue': '#101C3F',
          'dark-ink': '#1C1E23',
          'light-grey': '#F5F7FA',
          white: '#FFFFFF',
        }
      },
      fontFamily: {
        display: ['Outfit', 'system-ui', 'sans-serif'],
        body: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
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


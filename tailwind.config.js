/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Cursor-inspired color palette
        background: {
          primary: '#0d1117',    // Main background
          secondary: '#161b22',  // Secondary background
          tertiary: '#21262d',   // Tertiary background
          hover: '#30363d',      // Hover states
        },
        border: {
          primary: '#30363d',    // Primary borders
          secondary: '#21262d',  // Secondary borders
          accent: '#f0f6fc',     // Accent borders
        },
        text: {
          primary: '#f0f6fc',    // Primary text
          secondary: '#8b949e',  // Secondary text
          tertiary: '#6e7681',   // Tertiary text
          accent: '#58a6ff',     // Accent text (blue)
          success: '#3fb950',    // Success text (green)
          warning: '#d29922',    // Warning text (yellow)
          error: '#f85149',      // Error text (red)
        },
        accent: {
          blue: '#58a6ff',       // Cursor blue
          purple: '#bc8cff',     // Cursor purple
          green: '#3fb950',      // Cursor green
          orange: '#ffa657',     // Cursor orange
          red: '#f85149',        // Cursor red
          yellow: '#d29922',     // Cursor yellow
        },
        // Status colors
        status: {
          draft: '#6e7681',      // Gray for draft
          validated: '#d29922',  // Yellow for validated
          approved: '#3fb950',   // Green for approved
        },
        // Interactive elements
        interactive: {
          hover: '#30363d',
          active: '#21262d',
          focus: '#58a6ff',
          disabled: '#484f58',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'cursor': '0 8px 24px rgba(0, 0, 0, 0.4)',
        'cursor-sm': '0 4px 12px rgba(0, 0, 0, 0.3)',
        'cursor-lg': '0 16px 48px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

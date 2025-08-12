/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00f0ff',
          dark: '#00c4d1',
        },
        secondary: {
          DEFAULT: '#7928CA',
          dark: '#5c1f9e',
        },
        dark: {
          DEFAULT: '#0a0a0a',
          light: '#1a1a1a',
          lighter: '#2a2a2a',
        },
        accent: {
          red: '#ff3366',
          yellow: '#ffd700',
          green: '#00ff9d',
          blue: '#00f0ff',
          purple: '#9c27b0',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        mono: ['var(--font-roboto-mono)'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      boxShadow: {
        'neon': '0 0 10px theme("colors.primary.DEFAULT"), 0 0 20px theme("colors.primary.DEFAULT/0.5")',
        'neon-sm': '0 0 5px theme("colors.primary.DEFAULT"), 0 0 10px theme("colors.primary.DEFAULT/0.5")',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

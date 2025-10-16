/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        text: '#e5e5e5',
        'text-muted': '#a3a3a3',
        accent: '#e5e5e5',
        gold: '#c9a974',
      },
      fontFamily: {
        serif: ['"Academy Engraved"', 'serif'],
        sans: ['"Barlow"', '"Inter"', 'system-ui', 'sans-serif'],
        decorative: ['"Bon Vivant"', 'cursive'],
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
        'pulse-glow': 'pulse-glow 4s infinite ease-in-out',
        'subtle-pulse': 'subtle-pulse 15s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-custom': 'spin 2s cubic-bezier(.68,.1,.27,.9) infinite',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.2', transform: 'scale(1)' },
          '50%': { opacity: '0.4', transform: 'scale(1.05)' },
        },
        'subtle-pulse': {
          '0%, 100%': { opacity: '0.03' },
          '50%': { opacity: '0.08' },
        }
      }
    },
  },
  plugins: [],
}

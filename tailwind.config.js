/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#2b2116',
        text: '#f0ebe1',
        'text-muted': '#e4dcca',
        accent: '#a9742a',
        gold: '#a9742a',
        'brand-earthen': '#2b2116',
        'brand-nutmeg': '#4e3b2d',
        'brand-sesame': '#e4dcca',
        'brand-cashew': '#f0ebe1',
        'brand-gold': '#a9742a',
      },
      fontFamily: {
        serif: ['"Bagatela"', 'serif'],
        sans: ['"Roc Grotesk"', '"Inter"', 'system-ui', 'sans-serif'],
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

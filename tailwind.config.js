/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        /* Deep coffee-brown surfaces, darkest first */
        coffee: {
          950: '#1A100D',
          900: '#241714',
          850: '#2A1915',
          800: '#2F1D18',
          700: '#3A241E',
          600: '#4A2F27',
          500: '#5C3B31',
        },
        cream: {
          DEFAULT: '#F5EAD6',
          100: '#FBF6EA',
          200: '#EFE2CB',
          300: '#E2D0B2',
        },
        sand: {
          DEFAULT: '#DCC7AA',
          dark: '#C9AE8C',
        },
        gold: {
          DEFAULT: '#D8B47A',
          300: '#E4C89C',
          500: '#C6A163',
          600: '#A98449',
        },
        muted: '#BDA58D',
        /* Hairline border used across the whole site */
        line: 'rgba(245,234,214,0.15)',
      },
      fontFamily: {
        sans: [
          'Vazirmatn',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Tahoma',
          'sans-serif',
        ],
      },
      maxWidth: {
        shell: '1240px',
        prose: '62ch',
      },
      borderRadius: {
        card: '10px',
        modal: '14px',
        pill: '999px',
      },
      boxShadow: {
        lift: '0 32px 64px -38px rgba(0,0,0,0.85)',
        card: '0 22px 48px -32px rgba(0,0,0,0.8)',
        modal: '0 48px 100px -40px rgba(0,0,0,0.9)',
        header: '0 1px 0 0 rgba(245,234,214,0.08), 0 22px 44px -32px rgba(0,0,0,0.9)',
        gold: '0 0 0 1px rgba(216,180,122,0.4)',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'none' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.96)' },
          to: { opacity: '1', transform: 'none' },
        },
        'image-in': {
          from: { transform: 'scale(1.05)' },
          to: { transform: 'scale(1)' },
        },
        'overlay-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'slide-in': {
          from: { opacity: '0', transform: 'translateX(-22px)' },
          to: { opacity: '1', transform: 'none' },
        },
        'toast-in': {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to: { opacity: '1', transform: 'none' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.9s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 0.7s ease-out both',
        'scale-in': 'scale-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
        'image-in': 'image-in 1.8s cubic-bezier(0.22, 1, 0.36, 1) both',
        'overlay-in': 'overlay-in 0.6s ease-out both',
        'slide-in': 'slide-in 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        'toast-in': 'toast-in 0.45s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
}

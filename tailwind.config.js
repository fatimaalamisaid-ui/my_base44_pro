/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#F2F5F8',
          100: '#E4EAF0',
          200: '#C6D2DE',
          300: '#9AAFC2',
          400: '#65809A',
          500: '#3D5B77',
          600: '#2A4159',
          700: '#1E3145',
          800: '#162434',
          900: '#0E1A26',
          950: '#08111A',
        },
        champagne: {
          50: '#FBF8F1',
          100: '#F6EFE0',
          200: '#ECDCC0',
          300: '#DFC79A',
          400: '#D2B27B',
          500: '#C39F60',
          600: '#A98449',
          700: '#87683A',
        },
        cream: {
          50: '#FDFCFA',
          100: '#F8F5EF',
          200: '#F1ECE2',
          300: '#E5DFD2',
        },
        mist: '#F4F6F8',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      letterSpacing: {
        label: '0.18em',
        wide2: '0.08em',
      },
      maxWidth: {
        shell: '1240px',
        prose2: '62ch',
      },
      borderRadius: {
        card: '14px',
        pill: '999px',
      },
      boxShadow: {
        soft: '0 2px 10px -4px rgba(8, 17, 26, 0.10)',
        lift: '0 24px 50px -28px rgba(8, 17, 26, 0.35)',
        header: '0 1px 0 0 rgba(8, 17, 26, 0.06), 0 12px 30px -24px rgba(8, 17, 26, 0.30)',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(28px)' },
          to: { opacity: '1', transform: 'none' },
        },
        'image-in': {
          from: { transform: 'scale(1.04)' },
          to: { transform: 'scale(1)' },
        },
        'overlay-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.9s cubic-bezier(0.22, 1, 0.36, 1) both',
        'image-in': 'image-in 1.6s cubic-bezier(0.22, 1, 0.36, 1) both',
        'overlay-in': 'overlay-in 0.6s ease-out both',
      },
    },
  },
  plugins: [],
}

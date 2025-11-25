/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f3f8',
          100: '#e0e7f0',
          200: '#c1cfe1',
          900: '#0f172a',
          950: '#09101d',
        },
        lime: {
          400: '#c4e538',
          500: '#C0DC2D',
        },
        success: '#10b981',
        accent: '#f59e0b',
      },
      fontFamily: {
        'funnel-display': ['Funnel Display', 'sans-serif'],
        'funnel-sans': ['Funnel Sans', 'sans-serif'],
        'space-grotesk': ['Space Grotesk', 'sans-serif'],
        'lexend': ['Lexend', 'sans-serif'],
      },
      fontSize: {
        'h1': ['64px', { lineHeight: '1.1', fontWeight: '800' }],
        'h2': ['48px', { lineHeight: '1.2', fontWeight: '700' }],
        'h3': ['32px', { lineHeight: '1.3', fontWeight: '700' }],
        'body': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '20px',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.15)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.2)',
        'glow': '0 0 20px rgba(192, 220, 45, 0.3)',
        'glow-lg': '0 0 40px rgba(192, 220, 45, 0.4)',
      },
      backdropBlur: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
      },
      animation: {
        'glass-float': 'glassFloat 6s ease-in-out infinite',
        'icon-hop': 'iconHop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'confetti': 'confetti 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'step-slide': 'stepSlide 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'badge-pulse': 'badgePulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        glassFloat: {
          '0%, 100%': { transform: 'translateY(0px)', opacity: '0.8' },
          '50%': { transform: 'translateY(-10px)', opacity: '1' },
        },
        iconHop: {
          '0%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-8px) scale(1.1)' },
          '100%': { transform: 'translateY(0) scale(1)' },
        },
        confetti: {
          '0%': { transform: 'translateY(-20px) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(80px) rotate(360deg)', opacity: '0' },
        },
        stepSlide: {
          'from': { opacity: '0', transform: 'translateX(20px)' },
          'to': { opacity: '1', transform: 'translateX(0)' },
        },
        badgePulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
    },
  },
  plugins: [],
};

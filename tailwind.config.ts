import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#0a0a0f',
          950: '#050505',
        },
        cyber: {
          cyan: '#06b6d4',
          indigo: '#6366f1',
          purple: '#a855f7',
          pink: '#ec4899',
          emerald: '#10b981',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      backdropBlur: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '24px',
      },
      animation: {
        'pulse-glow': 'pulseGlow 4s infinite ease-in-out',
        'spin-outer': 'spinOuter 20s linear infinite',
        'spin-middle': 'spinMiddle 14s linear infinite',
        'spin-inner': 'spinInner 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.15', transform: 'scale(1)' },
          '50%': { opacity: '0.35', transform: 'scale(1.05)' },
        },
        spinOuter: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        spinMiddle: {
          '0%': { transform: 'rotate(360deg) rotateX(45deg)' },
          '100%': { transform: 'rotate(0deg) rotateX(45deg)' },
        },
        spinInner: {
          '0%': { transform: 'rotate(0deg) rotateY(60deg)' },
          '100%': { transform: 'rotate(360deg) rotateY(60deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config

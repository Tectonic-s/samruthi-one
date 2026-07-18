import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#F7C83C',
          hover: '#E6B400',
          muted: 'rgba(247,200,60,0.12)',
        },
        ink: {
          DEFAULT: '#0A0A0A',
          soft: 'rgba(10,10,10,0.62)',
          faint: 'rgba(10,10,10,0.42)',
        },
        line: 'rgba(10,10,10,0.08)',
        paper: {
          DEFAULT: '#FFFFFF',
          soft: '#F5F5F3',
        },
        surface: {
          DEFAULT: '#FAFAF9',
          hover: '#F5F5F3',
        },
      },
      fontFamily: {
        heading: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      borderRadius: {
        'card': '16px',
        'button': '12px',
      },
      boxShadow: {
        'card': '0 1px 2px rgba(10,10,10,0.04), 0 4px 12px rgba(10,10,10,0.04)',
        'card-hover': '0 2px 4px rgba(10,10,10,0.05), 0 12px 32px rgba(10,10,10,0.09)',
        'pill': '0 1px 2px rgba(10,10,10,0.06), 0 6px 16px rgba(10,10,10,0.08)',
      },
    },
  },
  plugins: [],
}

export default config

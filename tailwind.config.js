import { fontFamily } from 'tailwindcss/defaultTheme';
import tailwindcssAnimate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './src/components/**/*.{html,js,jsx,ts,tsx}',
    './src/pages/**/*.{html,js,jsx,ts,tsx}',
    './src/routes/**/*.{html,js,ts,jsx,tsx}',
    './index.html',
  ],
  theme: {
    container: {
      center: 'true',
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['Pretendard', ...fontFamily.sans],
        pretendard: ['Pretendard', 'sans-serif'],
      },
      colors: {
        white: '#FFFFFF',
        black: '#1B1B1B',
        green: '#22C55E',
        blue: {
          50: '#edf1ff',
          100: '#d4e4ff',
          200: '#b4d1ff',
          300: '#90b2fe',
          400: '#6190fe',
          500: '#3a74fe',
          600: '#2552bd',
          700: '#1b52bd',
          800: '#214582',
          900: '#1b316b',
        },
        gray: {
          50: '#f7f7f7',
          100: '#e4e4e4',
          200: '#d7d7d7',
          300: '#c4c4c4',
          400: '#a5a5a5',
          500: '#7a7a7a',
          600: '#858585',
          700: '#777777',
          800: '#404040',
          900: '#1b1b1b',
        },
        red: {
          50: '#fee2e2',
          100: '#fecaca',
          200: '#fca5a5',
          300: '#f87171',
          400: '#ef4444',
          500: '#dc2626',
          600: '#b91c1c',
          700: '#991b1b',
          800: '#7f1d1d',
          900: '#641e1e',
        },
        background: '#FFFFFF',
        foreground: '#020617',
        border: '#e2e8f0',
        input: '#e2e8f0',
        ring: '#020617',
        primary: {
          DEFAULT: '#3a74fe',
          foreground: '#f8fafc',
        },
        secondary: {
          DEFAULT: '#f1f5f9',
          foreground: '#1e293b',
        },
        destructive: {
          DEFAULT: '#ef4444',
          foreground: '#f8fafc',
        },
        muted: {
          DEFAULT: '#f1f5f9',
          foreground: '#64748b',
        },
        accent: {
          DEFAULT: '#f1f5f9',
          foreground: '#1e293b',
        },
        popover: {
          DEFAULT: '#ffffff',
          foreground: '#020617',
        },
        card: {
          DEFAULT: '#ffffff',
          foreground: '#020617',
        },
        chart: {
          1: '#f97316',
          2: '#2a9d8f',
          3: '#1a374d',
          4: '#eab308',
          5: '#fb923c',
        },
      },
      borderRadius: {
        lg: '12px',
        md: '8px',
        sm: '4px',
      },
      spacing: {
        0.75: '3px',
        4.5: '18px',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

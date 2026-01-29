/** @type {import('tailwindcss').Config} */
import animate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'Helvetica Neue', 'Roboto', 'sans-serif'],
        jakarta: ['Plus Jakarta Sans', 'sans-serif'],
      },
      colors: {
        // Premium Color System - MoneyHive Gold
        primary: {
          DEFAULT: '#E3B23C',
          50: '#fef9ed',
          100: '#fdf2d6',
          200: '#fae3ad',
          300: '#f7cf7a',
          400: '#f3b645',
          500: '#E3B23C',
          600: '#ca8a1a',
          700: '#a86518',
          800: '#894f1a',
          900: '#72421a',
          950: '#42210b',
        },
        // Safety override: anything using Tailwind's yellow will match our brand accent
        yellow: {
          DEFAULT: '#E3B23C',
          50: '#fef9ed',
          100: '#fdf2d6',
          200: '#fae3ad',
          300: '#f7cf7a',
          400: '#f3b645',
          500: '#E3B23C',
          600: '#ca8a1a',
          700: '#a86518',
          800: '#894f1a',
          900: '#72421a',
          950: '#42210b',
        },
        'secondary': '#2D3142', // Deep Navy
        'supporting': '#4F5D75', // Slate Gray
        'foundation': {
          light: '#FAFAFA',
          dark: '#1A1B1F'
        },
        // Shadcn/ui compatible colors
        // NOTE: our CSS variables are RGB triplets (e.g. "227 178 60"), so use rgb(var(--x))
        border: "rgb(var(--border))",
        input: "rgb(var(--input))",
        ring: "rgb(var(--ring))",
        background: "rgb(var(--background))",
        foreground: "rgb(var(--foreground))",
        muted: {
          DEFAULT: "rgb(var(--muted))",
          foreground: "rgb(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "rgb(var(--accent))",
          foreground: "rgb(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "rgb(var(--popover))",
          foreground: "rgb(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "rgb(var(--card))",
          foreground: "rgb(var(--card-foreground))",
        },
      },
      boxShadow: {
        'button': '0px 8px 24px rgba(227, 178, 60, 0.2)',
        'button-hover': '0px 10px 32px rgba(227, 178, 60, 0.35)',
        'card': '0px 4px 16px rgba(45, 49, 66, 0.08)',
        'card-hover': '0px 8px 32px rgba(45, 49, 66, 0.12)',
      },
      borderRadius: {
        lg: '12px',
        md: '8px',
        sm: '4px',
      },
      fontSize: {
        'h1': ['48px', { lineHeight: '64px', fontWeight: '700' }],
        'h2': ['36px', { lineHeight: '48px', fontWeight: '700' }],
        'h3': ['24px', { lineHeight: '32px', fontWeight: '700' }],
        'body': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'body-lg': ['18px', { lineHeight: '28px', fontWeight: '400' }],
        'caption': ['14px', { lineHeight: '20px', fontWeight: '400' }],
      },
      spacing: {
        'section': '24px',
        'component': '8px',
      },
      transitionDuration: {
        'mode': '300ms',
      },
      transitionTimingFunction: {
        'mode': 'ease-in-out',
      },
      animation: {
        'button-pulse': 'button-pulse 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'fade-in': 'fadeInUp 0.6s ease-out forwards',
      },
      keyframes: {
        'button-pulse': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'fadeInUp': {
          'from': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
    },
  },
  plugins: [
    animate,
    typography,
  ],
};
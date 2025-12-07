import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#000000',
          navy: '#1a1f3a',
          purple: '#2d1b3d',
        },
        accent: {
          cyan: '#00B8D4',
          'cyan-light': '#00E5FF',
          teal: '#0a2027',
        },
        background: {
          DEFAULT: '#000000',
          card: '#0a2027',
        },
        text: {
          DEFAULT: '#FFFFFF',
          gray: '#B8C5D6',
          light: '#E5E7EB',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'Ubuntu', 'Montserrat', 'sans-serif'],
        display: ['Poppins', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #000000 0%, #1a1f3a 50%, #2d1b3d 100%)',
        'gradient-hero': 'linear-gradient(135deg, #000000 0%, #1a1f3a 50%, #2d1b3d 100%)',
        'gradient-accent': 'linear-gradient(135deg, #00B8D4 0%, #0a2027 100%)',
        'gradient-banner': 'linear-gradient(90deg, #00B8D4 0%, #0a2027 100%)',
      },
      borderRadius: {
        'card': '24px',
        'button': '32px',
      },
      boxShadow: {
        'glow-cyan': '0 0 30px rgba(0, 184, 212, 0.5)',
        'glow-purple': '0 0 30px rgba(45, 27, 61, 0.4)',
        'card': '0 8px 32px rgba(0, 0, 0, 0.4)',
      },
    },
  },
  plugins: [],
} satisfies Config;

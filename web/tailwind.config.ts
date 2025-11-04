import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#FF4500',
          dark: '#CC3700'
        }
      },
      fontFamily: {
        display: ['Ivy Presto', 'serif'],
        sans: ['Inter', 'sans-serif']
      }
    }
  },
  plugins: []
};

export default config;


import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        mineshaft: {
          DEFAULT: '#131313',
          50: '#CFCFCF',
          100: '#C4C4C4',
          200: '#B0B0B0',
          300: '#9C9C9C',
          400: '#878787',
          500: '#737373',
          600: '#5E5E5E',
          700: '#4A4A4A',
          800: '#363636',
          900: '#212121',
          950: '#131313',
        },
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
        '10xl': '104rem',
      },
    },
  },
  plugins: [],
};
export default config;

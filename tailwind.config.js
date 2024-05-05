/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'mono': ['Space Grotesk',
        {
          fontFeatureSettings: "'ss02' 1, 'ss03' 1",
        }
        // ...defaultTheme.fontFamily.mono, 
      ],
      'sans': ['Open Sans', ...defaultTheme.fontFamily.sans],
      'karrik': ["Karrik"],
      },
      colors: {
        'offwhite': '#f7ede2',
        'almost-white': '#fffcfa',
        'cyellow': '#f6bd60',
        'cpink': '#f5cac3',
        'cgreen': '#84a59d',
        'cdpink': '#f28482',
        'cblack': '#2e2e30',
        'coffee': '#9f6d3a',
        'clblue': '#778DA9',
        'cbrown': '#422613',
        'cstone': "#C0B7B1",
      }
    },
  },
  plugins: [],
}


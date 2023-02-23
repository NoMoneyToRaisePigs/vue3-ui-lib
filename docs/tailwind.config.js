const tailwindConfig = require('../tailwind.config')

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...tailwindConfig,
  content: ['./**/*.{vue,js,ts,jsx,tsx}', './index.html', './iframe.html'],
  theme: {
    ...tailwindConfig.theme,
    extend: {},
  },
}

/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin')

const components = require('./tailwind.components')

module.exports = {
  content: [
    './src/**/*.{vue,js,ts}',
  ],
  theme: {
    spacing: {
      0: '0',
      2: 'var(--space-xxxxs)',
      4: 'var(--space-xxxs)',
      8: 'var(--space-xxs)',
      12: 'var(--space-xs)',
      16: 'var(--space-sm)',
      24: 'var(--space-md)',
      32: 'var(--space-lg)',
      40: 'var(--space-xl)',
      48: 'var(--space-xxl)',
      80: 'var(--space-xxxl)',
    },
    borderRadius: {
      xs: '2px',
      sm: '4px',
      md: '8px',
      lg: '16px',
    },
    extend: {},
  },
  plugins: [
    plugin(function ({ addComponents }) {
      // Add your custom styles here
      addComponents(components)
    }),
  ],
}

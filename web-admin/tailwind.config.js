const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('../libs/ui/tailwind.config')],
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}',
    ),
    ...createGlobPatternsForDependencies(__dirname)
  ],
  theme: {
    extend: {},
    fontFamily: {
      sans: ['Calibre', ...fontFamily.sans],
    },
  },
  plugins: [],
};

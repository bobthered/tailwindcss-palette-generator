const tailwindcssPaletteGenerator = require('./index.js');

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: tailwindcssPaletteGenerator({
        colors: [
          '#EF4444',
          '10B981',
          'c310c6',
          {
            hex: '404040',
            shades: {
              50: {
                intensity: 0.95,
                type: 'lighten',
              },
              100: {
                intensity: 0.9,
                type: 'lighten',
              },
              200: {
                intensity: 0.75,
                type: 'lighten',
              },
              300: {
                intensity: 0.6,
                type: 'lighten',
              },
              400: {
                intensity: 0.3,
                type: 'lighten',
              },
              500: {
                intensity: 0,
                type: 'lighten',
              },
              600: {
                intensity: 0.15,
                type: 'darken',
              },
              700: {
                intensity: 0.3,
                type: 'darken',
              },
              800: {
                intensity: 0.75,
                type: 'darken',
              },
              900: {
                intensity: 0.9,
                type: 'darken',
              },
            },
          },
        ],
        colorNames: ['primary', 'secondary', 'purple', 'gray'],
      }),
    },
  },
  variants: {},
  plugins: [],
};

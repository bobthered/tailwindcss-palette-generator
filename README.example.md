# tailwindcss-color-palette

Quickly generate color palettes from a base color.

## Requirements

1. Node.js installed ( [download](https://nodejs.org/en/) )
2. tailwindcss installed ( [instructions](https://tailwindcss.com/docs/installation) )
3. Create tailwindcss configuration file ( [instructions](https://tailwindcss.com/docs/configuration) )

## Install

```console
npm install tailwindcss-color-palette
```

## Usage

```js
// tailwindcss.config.js

const plugin = require('tailwindcss/plugin');

// import palette generator package
const paletteGenerator = require('tailwindcss-palette-generator');

module.exports = {
  purge: [],
  theme: {
    extend: {
      colors: paletteGenerator([{ name: 'red', color: '#ED1C24' }]),
    },
  },
  variants: {},
  plugins: [],
};
```

## Syntax

function

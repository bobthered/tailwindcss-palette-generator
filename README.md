<div align="center">

<img src="https://raw.githubusercontent.com/bobthered/tailwindcss-palette-generator/main/assets/logo-tailwindcss.png" style="width:10rem">

<h1>Tailwindcss Palette Generator</h1>
<h3>Quickly generate <a href="https://www.tailwindcss.com">tailwindcss</a> color palettes from a base color or colors.</h3>

<div style="padding-top:1rem; padding-bottom:1rem;">
  <a href="https://badge.fury.io/js/%40bobthered%2Ftailwindcss-palette-generator">
    <img src="https://badge.fury.io/js/%40bobthered%2Ftailwindcss-palette-generator.svg"
         alt="NPM">
  </a>
</div>

</div>

[Demo](#demo) • [Key Features](#key-features) • [Installation](#installation) • [Usage](#usage) • [Examples](#examples)

## Demo

Interactive [demo](https://bobthered.github.io/tailwindcss-palette-generator) generating tailwindcss palettes

## Key Features

- Generate color palette with as little as a hex value ( [See Example](#example-1) )
- Generate multiple color palettes ( [See Example](#example-2) )
- Customize the palette shade names & lightnesses ( [See Example](#example-3) )
- Default color naming applied automatically or can be overwritten ( [See Example](#example-4) )
- Zero (0) dependencies
- Typescript support
- Preserve Supplied Color

## Installation

```
npm i @bobthered/tailwindcss-palette-generator
```

## Usage

### Example - Basic<a name="example-1"></a>

```js
// tailwind.config.js
const {
  tailwindcssPaletteGenerator,
} = require("@bobthered/tailwindcss-palette-generator");

module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: tailwindcssPaletteGenerator("#FF0040"),
    },
  },
  plugins: [],
};
```

### Example - Multiple Colors<a name="example-2"></a>

```js
// tailwind.config.js
const {
  tailwindcssPaletteGenerator,
} = require("@bobthered/tailwindcss-palette-generator");

module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: tailwindcssPaletteGenerator(["#FF0040", "#FFBB00"]),
    },
  },
  plugins: [],
};
```

### Example - Custom Shades and Lightness<a name="example-3"></a>

```js
// tailwind.config.js
const {
  tailwindcssPaletteGenerator,
} = require("@bobthered/tailwindcss-palette-generator");

module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: tailwindcssPaletteGenerator({
        colors: ["#FF0040"],
        shades: [
          { name: "light", lightness: 95 },
          { name: "normal", lightness: 46 },
          { name: "dark", lightness: 7 },
        ],
      }),
    },
  },
  plugins: [],
};
```

### Example - Override color names<a name="example-4"></a>

```js
// tailwind.config.js
const {
  tailwindcssPaletteGenerator,
} = require("@bobthered/tailwindcss-palette-generator");

module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: tailwindcssPaletteGenerator({
        colors: ["#FF0040", "#FFBB00"],
        names: ["red", "yellow"],
      }),
    },
  },
  plugins: [],
};
```

# Welcome to tailwindcss-palette-generator 👋

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000)
[![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)](https://github.com/bobthered/tailwindcss-palette-generator#readme)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/bobthered/tailwindcss-palette-generator/graphs/commit-activity)
[![License: MIT](https://img.shields.io/github/license/bobthered/tailwindcss-palette-generator)](https://github.com/bobthered/tailwindcss-palette-generator/blob/master/LICENSE)

> Quickly generate tailwind color palettes from a base color.

### 🏠 [Homepage](https://github.com/bobthered/tailwindcss-palette-generator#readme)

---

## Requirements

1. Node.js installed ( [download](https://nodejs.org/en/) )
2. tailwindcss installed ( [instructions](https://tailwindcss.com/docs/installation) )
3. tailwindcss configuration file created ( [instructions](https://tailwindcss.com/docs/configuration) )

---

## Install

```sh
npm install @bobthered/tailwindcss-palette-generator
```

---

## Syntax

```js
/**
 * @param {Array.<{name: String, color: String | Array, [alpha]: Number, [mode]: String}>} colors
 * @param {Object} [options]
 */

paletteGenerator(colors, [options]);
```

---

## Usage

[Additional Examples](/EXAMPLES.md)

```js
// tailwindcss.config.js
// import palette generator package
const paletteGenerator = require('@bobthered/tailwindcss-palette-generator');

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

---

## Paramaters

**colors** [*Array*] _required_<br>

- name
  - required
  - Type: String
- color
  - required
  - Type: String or Array
- alpha
  - optional
  - Type: Number
  - Range: 0.0 to 1.0
- mode
  - optional
  - Type: String
  - Values: 'hex', '#hex', 'rgb', 'rgba', 'hsl', 'hsla'

**options** [*Object*] _optional_<br>

- alpha
  - optional
  - Type: Number
  - Range: 0.0 to 1.0
- output
  - optional
  - Type: String
  - Values: 'hex', '#hex', 'rgb', 'rgba', 'hsl', 'hsla'
- shades
  - optional
  - Type: Object
  - Values:
    - color
      - required
      - Type: String or Array
    - percent
      - optional
      - Type: Number
      - Range: 0.0 to 1.0
    - alpha
      - optional
      - Type: Number
      - Range: 0.0 to 1.0
    - mode
      - optional
      - Type: String
      - Values: 'hex', '#hex', 'rgb', 'rgba', 'hsl', 'hsla'

## Author

👤 **Bob McAleavey**

- Website: bobthered.com
- Github: [@bobthered](https://github.com/bobthered)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

Feel free to check [issues page](https://github.com/bobthered/tailwindcss-palette-generator/issues). You can also take a look at the [contributing guide](https://github.com/bobthered/tailwindcss-palette-generator/blob/master/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2020 [Bob McAleavey](https://github.com/bobthered).

This project is [MIT](https://github.com/bobthered/tailwindcss-palette-generator/blob/master/LICENSE) licensed.

---

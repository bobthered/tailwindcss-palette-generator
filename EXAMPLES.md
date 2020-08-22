# tailwindcss-palette-generator | Examples

## Basic

Provide an object array of colors with [`name`] and [`color`] parameter values

```js
paletteGenerator([{ name: 'red', color: '#ED1C24' }]);
```

```js
// output
{
  red: {
     '50': '#FFFAFB',
    '100': '#FDE4E5',
    '200': '#FABCBE',
    '300': '#F58287',
    '400': '#F14D53',
    '500': '#ED1C24',
    '600': '#BA161C',
    '700': '#820F14',
    '800': '#46080B',
    '900': '#1C0304',
    '950': '#050101'
  }
}
```

---

## Multiple Colors

Provide multiple objects in the first [`colors`] parameter

```js
paletteGenerator([
  { name: 'red',  color: '#ED1C24' },
  { name: 'gray', color: '#A0AEC0' },
]);
```

```js
// output
{
  red: {
     '50': '#FFFAFB',
    '100': '#FDE4E5',
    '200': '#FABCBE',
    '300': '#F58287',
    '400': '#F14D53',
    '500': '#ED1C24',
    '600': '#BA161C',
    '700': '#820F14',
    '800': '#46080B',
    '900': '#1C0304',
    '950': '#050101'
  },
  gray: {
     '50': '#FDFDFE',
    '100': '#F4F5F7',
    '200': '#E3E7EC',
    '300': '#CBD2DC',
    '400': '#B4BFCE',
    '500': '#A0AEC0',
    '600': '#7E8997',
    '700': '#58606A',
    '800': '#2F3339',
    '900': '#131517',
    '950': '#030304'
  }
}
```

---

## Input Mode

Specify the input mode of each color with the optional [`mode`] parameter

```js
paletteGenerator([{ name: 'red', color: [237, 28, 36], mode: 'RGB' }]);
```

```js
// output
{
  red: {
     '50': '#FFFAFB',
    '100': '#FDE4E5',
    '200': '#FABCBE',
    '300': '#F58287',
    '400': '#F14D53',
    '500': '#ED1C24',
    '600': '#BA161C',
    '700': '#820F14',
    '800': '#46080B',
    '900': '#1C0304',
    '950': '#050101'
  }
}
```

---

## Output Mode

Specify the output mode in the optional [`output`] parameter

```js
paletteGenerator([{ name: 'red', color: '#ED1C24' }], { output: 'HSL' });
```

```js
// output
{
  red: {
     '50': 'hsl(348, 100%, 99%)',
    '100': 'hsl(358,  86%, 94%)',
    '200': 'hsl(358,  86%, 86%)',
    '300': 'hsl(357,  85%, 74%)',
    '400': 'hsl(358,  85%, 62%)',
    '500': 'hsl(358,  85%, 52%)',
    '600': 'hsl(358,  79%, 41%)',
    '700': 'hsl(357,  79%, 28%)',
    '800': 'hsl(357,  79%, 15%)',
    '900': 'hsl(358,  81%,  6%)',
    '950': 'hsl(  0,  67%,  1%)'
  }
}
```

---

## Alpha

Specify the value [`0.0 - 1.0`] in the optional [`alpha`] parameter along with a suitable [`output`] value [`RGBA | HSLA`]

```js
paletteGenerator([{ name: 'red', color: '#ED1C24' }], {
  alpha: 0.5,
  output: 'RGBA',
});
```

```js
// output
{
  red: {
     '50': 'rgba(255, 250, 251, 0.5)',
    '100': 'rgba(253, 228, 229, 0.5)',
    '200': 'rgba(250, 188, 190, 0.5)',
    '300': 'rgba(245, 130, 135, 0.5)',
    '400': 'rgba(241,  77,  83, 0.5)',
    '500': 'rgba(237,  28,  36, 0.5)',
    '600': 'rgba(186,  22,  28, 0.5)',
    '700': 'rgba(130,  15,  20, 0.5)',
    '800': 'rgba( 70,   8,  11, 0.5)',
    '900': 'rgba( 28,   3,   4, 0.5)',
    '950': 'rgba(  5,   1,   1, 0.5)'
  }
}
```

---

## Shades

Specify the shades in the optional [`shades`] parameter

```js
paletteGenerator([{ name: 'red', color: '#ED1C24' }], {
  shades: {
    lightest: { color: '#ffffff', percent: 0.88  },
    lighter:  { color: '#ffffff', percent: 0.705 },
    light:    { color: '#ffffff', percent: 0.215 },
    base:     { color: '#ffffff', percent: 0     },
    dark:     { color: '#000000', percent: 0.215 },
    darker:   { color: '#000000', percent: 0.45  },
    darkest:  { color: '#000000', percent: 0.705 },
  },
});
```

```js
// output
{
  red: {
    lightest: '#FDE4E5',
    lighter:  '#FABCBE',
    light:    '#F14D53',
    base:     '#ED1C24',
    dark:     '#BA161C',
    darker:   '#820F14',
    darkest:  '#46080B'
  }
}
```

const tailwindcssPaletteGenerator = (input, mode = 'hex') => {
  // addColor function
  const addColor = color => {
    let colorParams = {
      hex: '',
      name: '',
      shades: params.shades,
    };

    // check input params
    if (typeof color === 'string') colorParams.hex = color;
    if (typeof color === 'object' && Array.isArray(color)) {
      colorParams.name = color.shift();
      colorParams.hex = color.shift();
    }
    if (typeof color === 'object' && !Array.isArray(color)) {
      if (Object.keys(color).length === 1) {
        colorParams.name = Object.keys(color)[0];
        colorParams.hex = Object.values(color)[0];
      }
      if (Object.keys(color).length !== 1)
        colorParams = Object.assign(colorParams, color);
    }

    // check if string is invalid
    if (!/^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/.test(colorParams.hex)) return;

    // add hash tag if needed
    if (!/^#/.test(colorParams.hex)) colorParams.hex = '#' + colorParams.hex;

    // if no name present, get a default name
    if (colorParams.name === '') colorParams.name = params.colorNames.shift();

    // set palette name
    palette[colorParams.name] = {};

    // generate shades
    Object.keys(colorParams.shades).forEach(shade => {
      palette[colorParams.name][shade] =
        colorParams.shades[shade].type === 'lighten'
          ? lighten(colorParams.hex, colorParams.shades[shade].intensity)
          : darken(colorParams.hex, colorParams.shades[shade].intensity);
    });
  };

  // darken function
  const darken = (hex, intensity) => {
    // get r, g, b values
    let { r, g, b } = hexToRgb(hex);

    // darken the r, g, b values
    r = Math.round(r * (1 - intensity));
    g = Math.round(g * (1 - intensity));
    b = Math.round(b * (1 - intensity));

    // return the new hex color
    return mode === 'hsl' ? rgbToHsl(r, g, b) : rgbToHex(r, g, b);
  };

  // lighten function
  const lighten = (hex, intensity) => {
    // get r, g, b values
    let { r, g, b } = hexToRgb(hex);

    // lighten the r, g, b values
    r = Math.round(r + (255 - r) * intensity);
    g = Math.round(g + (255 - g) * intensity);
    b = Math.round(b + (255 - b) * intensity);

    // return the new hex color
    return mode === 'hsl' ? rgbToHsl(r, g, b) : rgbToHex(r, g, b);
  };

  // hexToRgb function
  const hexToRgb = string => {
    // get the r,g,b values
    const [r, g, b] = string
      .replace('#', '')
      .match(/.{1,2}/g)
      .map(a => parseInt(a, 16));

    return { r, g, b };
  };

  // rgbToHex function
  const rgbToHex = (r, g, b) => `#${toHex(r)}${toHex(g)}${toHex(b)}`;

  function rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if (max == min) {
      h = s = 0; // achromatic
    } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return `hsl(var(--brand-hue, ${Math.floor(h * 360)}) ${Math.floor(s * 100)}% ${Math.floor(l * 100)}%)`;
  }

  // toHex function
  const toHex = n => `0${n.toString(16)}`.slice(-2).toUpperCase();

  // initiate palette
  const palette = {};

  // set default params
  let params = {
    colors: [],
    colorNames: [
      'primary',
      'secondary',
      'tertiary',
      'quaternary',
      'quinary',
      'senary',
      'septenary',
      'octonary',
      'nonary',
      'denary',
    ],
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
        intensity: 0.1,
        type: 'darken',
      },
      700: {
        intensity: 0.25,
        type: 'darken',
      },
      800: {
        intensity: 0.4,
        type: 'darken',
      },
      900: {
        intensity: 0.51,
        type: 'darken',
      },
    },
  };

  // check input params
  if (typeof input === 'string') params.colors.push(input);
  if (typeof input === 'object' && Array.isArray(input)) params.colors = input;
  if (typeof input === 'object' && !Array.isArray(input))
    params = Object.assign(params, input);

  // loop through colors
  params.colors.forEach(addColor);

  return palette;
};

module.exports = tailwindcssPaletteGenerator;

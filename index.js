const generateColor = ({ hex, shades }) => {
  // convert hex to hsl
  const colorHSL = hexToHSL(hex);

  // initiate shade object
  const obj = {};

  // generate shades
  shades = shades.forEach(({ name, lightness }) => {
    // deconstruct h & s
    const { h, s } = colorHSL;

    // generate shade hsl
    const hsl = { h, s, l: lightness };

    // convert hsl to hex
    const hex = hslToHEX(hsl);

    // update shade object
    obj[name] = hex;
  });

  return obj;
};

const hexToHSL = hex => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  try {
    let r = parseInt(result[1], 16);
    let g = parseInt(result[2], 16);
    let b = parseInt(result[3], 16);
    (r /= 255), (g /= 255), (b /= 255);
    var max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    var h,
      s,
      l = (max + min) / 2;
    if (max == min) {
      h = s = 0; // achromatic
    } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }
    const HSL = new Object();
    HSL['h'] = Math.round(h * 360);
    HSL['s'] = Math.round(s * 100);
    HSL['l'] = Math.round(l * 100);
    return HSL;
  } catch (error) {
    console.log(hex);
    return { h: 0, s: 0, l: 0 };
  }
};
const hslToHEX = ({ h, s, l }) => {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0'); // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};

const tailwindcssPaletteGenerator = props => {
  // defaults
  const colors = [];
  const names = [
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
  ];
  const shades = [
    { name: '50', lightness: 98 },
    { name: '100', lightness: 95 },
    { name: '200', lightness: 90 },
    { name: '300', lightness: 82 },
    { name: '400', lightness: 64 },
    { name: '500', lightness: 46 },
    { name: '600', lightness: 33 },
    { name: '700', lightness: 24 },
    { name: '800', lightness: 14 },
    { name: '900', lightness: 7 },
    { name: '950', lightness: 4 },
  ];

  // check props type
  if (typeof props === 'string') props = { colors: [props], names, shades };
  if (typeof props === 'object' && Array.isArray(props))
    props = { colors: props, names, shades };
  if (typeof props === 'object' && !Array.isArray(props))
    props = Object.assign({ colors, names, shades }, props);

  // initiate palette
  const palette = {};

  // loop through palette
  props.colors.forEach((hex, i) => {
    const name = props.names[i];
    const color = generateColor({ hex, shades });
    palette[name] = color;
  });

  return palette;
};

module.exports = tailwindcssPaletteGenerator;

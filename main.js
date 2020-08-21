import colorConvert from 'color-convert';

const paletteGenerator = (colors, options = {}) => {
  const defaults = {
    alpha: 1,
    output: '#HEX',
    shades: {
      '50': { color: '#ffffff', percent: 0.98 },
      '100': { color: '#ffffff', percent: 0.88 },
      '200': { color: '#ffffff', percent: 0.705 },
      '300': { color: '#ffffff', percent: 0.45 },
      '400': { color: '#ffffff', percent: 0.215 },
      '500': { color: '#ffffff', percent: 0 },
      '600': { color: '#000000', percent: 0.215 },
      '700': { color: '#000000', percent: 0.45 },
      '800': { color: '#000000', percent: 0.705 },
      '900': { color: '#000000', percent: 0.88 },
      '950': { color: '#000000', percent: 0.98 },
    },
  };

  options = Object.assign(defaults, options);

  const palette = {};

  colors.map(color => {
    const name = color.name;
    const mode = color.mode || 'HEX';
    color = color.color;

    palette[name] = {};

    Object.keys(options.shades).map(shade => {
      const mixAlpha = options.shades[shade].alpha || options.alpha;
      const mixColor = options.shades[shade].color;
      const mixMode = options.shades[shade].mode || 'HEX';
      const percent = options.shades[shade].percent;
      palette[name][shade] = mix(
        mixMode.toLowerCase() === 'rgb'
          ? mixColor
          : colorConvert[mixMode.toLowerCase()].rgb.raw(mixColor),
        mode.toLowerCase() === 'rgb'
          ? color
          : colorConvert[mode.toLowerCase()].rgb.raw(color),
        percent,
      );
      if (options.output.toUpperCase() === 'HEX') {
        palette[name][shade] = colorConvert.rgb.hex(palette[name][shade], {
          hashTag: false,
        });
      }
      if (options.output.toUpperCase() === '#HEX') {
        palette[name][shade] = `#${colorConvert.rgb.hex(palette[name][shade])}`;
      }
      if (options.output.toUpperCase() === 'RGB') {
        palette[name][shade] = `rgb(${palette[name][shade].join(', ')})`;
      }
      if (options.output.toUpperCase() === 'RGBA') {
        palette[name][shade] = `rgba(${palette[name][shade].join(
          ', ',
        )}, ${mixAlpha})`;
      }
      if (options.output.toUpperCase() === 'HSL') {
        palette[name][shade] = `hsl(${colorConvert.rgb
          .hsl(palette[name][shade])
          .map((param, i) => (i === 0 ? param : `${param}%`))
          .join(', ')})`;
      }
      if (options.output.toUpperCase() === 'HSLA') {
        palette[name][shade] = `hsla(${colorConvert.rgb
          .hsl(palette[name][shade])
          .map((param, i) => (i === 0 ? param : `${param}%`))
          .join(', ')}, ${mixAlpha})`;
      }
    });
  });

  return palette;
};

const mix = (rgb1, rgb2, percentage = 0.5) =>
  rgb1.map((color, i) =>
    Math.round(rgb1[i] * percentage + rgb2[i] * (1 - percentage)),
  );

module.exports = paletteGenerator;

import { type Options, type Palette } from './types.js';
import { generateColor } from './generateColor.js';

export const tailwindcssPaletteGenerator = (options: string | string[] | Options): Palette => {
	// set default values
	const defaults: Options = {
		colors: [],
		names: [
			'primary',
			'secondary',
			'tertiary',
			'quaternary',
			'quinary',
			'senary',
			'septenary',
			'octonary',
			'nonary',
			'denary'
		],
		preserve: true,
		shades: [
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
			{ name: '950', lightness: 4 }
		]
	};

	// update options based on input
	if (typeof options === 'string') options = { colors: [options] };
	if (typeof options === 'object' && Array.isArray(options)) options = { colors: options };

	// merge options with defaults
	options = Object.assign(defaults, options);

	// destructure options
	const { colors, names, preserve, shades } = options;

	if (colors === undefined || names === undefined || preserve === undefined || shades === undefined)
		return {};

	// create palette
	const palette: Palette = colors.reduce(
		(obj: Record<string | number, Record<string | number, string>>, hex, index) => {
			const name = names[index];
			const color = generateColor({ hex, preserve, shades });
			obj[name] = color;
			return obj;
		},
		{}
	);

	return palette;
};

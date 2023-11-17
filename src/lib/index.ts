import { generateColor } from './generateColor.js';
import type { Color, Palette, Shade } from './interfaces.js';

const tailwindcssPaletteGenerator = (
	options:
		| string
		| string[]
		| { colors?: string[]; names?: string[]; preserve?: boolean; shades?: Shade[] }
) => {
	// defaults
	let colors: string[] = [];
	let names: string[] = [
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
	];
	let preserve: boolean = true;
	let shades: Shade[] = [
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
	];

	// check options type
	if (typeof options === 'string') options = { colors: [options], names, preserve, shades };
	if (typeof options === 'object' && Array.isArray(options))
		options = { colors: options, names, preserve, shades };
	if (typeof options === 'object' && !Array.isArray(options))
		options = Object.assign({ colors, names, preserve, shades }, options);

	// initiate palette
	const palette: Palette = {};

	// destructure options
	({ colors = colors, names = names, preserve = preserve, shades = shades } = options);

	// loop through palette
	colors.forEach((hex: string, i: number) => {
		const name: string = names[i];
		const color: Color = generateColor({ hex, preserve, shades });
		palette[name] = color;
	});

	return palette;
};

export { tailwindcssPaletteGenerator };

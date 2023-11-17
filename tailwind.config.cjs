import { tailwindcssPaletteGenerator } from './src/lib/index.ts'
import hexToHSL from './src/lib/hexToHSL';
import hslToHex from './src/lib/hslToHex'

const { s, l } = hexToHSL('#64748b');
const color = hslToHex({ h: 258, s, l })

/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/sveltewind/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: tailwindcssPaletteGenerator({
				colors: [color],
				names: ['slate']
			}),
			fontFamily: {
				mono: ['Fira Code', 'ui-monospace', 'SFMono-Regular'],
				sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system'],
			}
		}
	},

	plugins: []
};

module.exports = config;
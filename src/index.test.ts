import { tailwindcssPaletteGenerator } from '../dist/esm/minified';
import { describe, it, expect } from 'vitest';

describe('Examples', () => {
	it("Single String -    tailwindcssPaletteGenerator('#d2a8ff')", () => {
		const palette = tailwindcssPaletteGenerator('#d2a8ff');
		expect(palette).toStrictEqual({
			primary: {
				'100': '#f2e5ff',
				'200': '#e5ccff',
				'300': '#d2a8ff',
				'400': '#a047ff',
				'50': '#faf5ff',
				'500': '#7100eb',
				'600': '#5100a8',
				'700': '#3b007a',
				'800': '#230047',
				'900': '#110024',
				'950': '#0a0014'
			}
		});
	});
	it("Array of Strings - tailwindcssPaletteGenerator(['#d2a8ff', '#123456'])", () => {
		const palette = tailwindcssPaletteGenerator(['#d2a8ff', '#123456']);
		expect(palette).toStrictEqual({
			primary: {
				'100': '#f2e5ff',
				'200': '#e5ccff',
				'300': '#d2a8ff',
				'400': '#a047ff',
				'50': '#faf5ff',
				'500': '#7100eb',
				'600': '#5100a8',
				'700': '#3b007a',
				'800': '#230047',
				'900': '#110024',
				'950': '#0a0014'
			},
			secondary: {
				'100': '#eaf2fb',
				'200': '#d5e6f6',
				'300': '#b3d1ef',
				'400': '#68a3df',
				'50': '#f7fafd',
				'500': '#2975c2',
				'600': '#1d548b',
				'700': '#123456',
				'800': '#0c243b',
				'900': '#06121d',
				'950': '#040a11'
			}
		});
	});
	it(`Override names -   tailwindcssPaletteGenerator({ colors: ['#d2a8ff', '#123456'], names: ['purple', 'blue-zodiac'] })`, () => {
		const palette = tailwindcssPaletteGenerator({
			colors: ['#d2a8ff', '#123456'],
			names: ['purple', 'blue-zodiac']
		});
		expect(palette).toStrictEqual({
			'blue-zodiac': {
				'100': '#eaf2fb',
				'200': '#d5e6f6',
				'300': '#b3d1ef',
				'400': '#68a3df',
				'50': '#f7fafd',
				'500': '#2975c2',
				'600': '#1d548b',
				'700': '#123456',
				'800': '#0c243b',
				'900': '#06121d',
				'950': '#040a11'
			},
			purple: {
				'100': '#f2e5ff',
				'200': '#e5ccff',
				'300': '#d2a8ff',
				'400': '#a047ff',
				'50': '#faf5ff',
				'500': '#7100eb',
				'600': '#5100a8',
				'700': '#3b007a',
				'800': '#230047',
				'900': '#110024',
				'950': '#0a0014'
			}
		});
	});
	it(`Override shades -  tailwindcssPaletteGenerator({ colors: ['#d2a8ff'], shades: [{ name: 'light', lightness: 95 }, { name: 'normal', lightness: 46 }, { name: 'dark', lightness: 7 }] })`, () => {
		const palette = tailwindcssPaletteGenerator({
			colors: ['#d2a8ff'],
			shades: [
				{ name: 'light', lightness: 95 },
				{ name: 'normal', lightness: 46 },
				{ name: 'dark', lightness: 7 }
			]
		});
		expect(palette).toStrictEqual({
			primary: {
				dark: '#110024',
				light: '#d2a8ff',
				normal: '#7100eb'
			}
		});
	});
});

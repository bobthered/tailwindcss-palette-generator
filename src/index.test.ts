import hexToHSL from '$lib/hexToHSL.js';
import hslToHEX from '$lib/hslToHex.js';
import { tailwindcssPaletteGenerator } from '$lib/index.js';
import { describe, it, expect } from 'vitest';

const colors = [
	{ hex: '#ffffff', shade: '50' },
	{ hex: '#000000', shade: '950' },
	{ hex: '#0ea5e9', shade: '500' }
];

describe('Basic Usage', () => {
	colors.map(({ hex, shade }) => {
		it(hex, () => {
			const palette = tailwindcssPaletteGenerator(hex);
			expect(palette.primary[shade]).toBe(hex);
		});
	});
});

describe('Multiple Colors', () => {
	colors.map(({ hex, shade }, i) => {
		const { hex: secondaryHex, shade: secondaryShade } = colors[(i + 1) % colors.length];
		it(`[${hex}, ${secondaryHex}]`, () => {
			const palette = tailwindcssPaletteGenerator([hex, secondaryHex]);
			expect(palette.primary[shade]).toBe(hex);
			expect(palette.secondary[secondaryShade]).toBe(secondaryHex);
		});
	});
});

describe('Custom Shades', () => {
	colors.map(({ hex }) => {
		const totalShades = Math.floor(Math.random() * 5) + 2;
		const shades = [...Array(totalShades)].map((_, i) => {
			return { name: i, lightness: Math.floor(i * (100 / (totalShades - 1))) };
		});
		it(`shades: ${JSON.stringify(shades)}`, () => {
			const palette = tailwindcssPaletteGenerator({
				colors: [hex],
				preserve: false,
				shades
			});
			expect(Object.keys(palette.primary)).toEqual(
				[...Array(totalShades)].map((_, i) => i.toString())
			);
		});
	});
});

describe('Custom Color Names', () => {
	colors.map(({ hex, shade }, i) => {
		it(`colors: [${hex}], names: ['firstColor', 'secondColor']`, () => {
			const { hex: secondaryHex, shade: secondaryShade } = colors[(i + 1) % colors.length];
			const palette = tailwindcssPaletteGenerator({
				colors: [hex, secondaryHex],
				names: ['firstColor', 'secondColor']
			});
			expect(palette['firstColor'][shade]).toBe(hex);
			expect(palette['secondColor'][secondaryShade]).toBe(secondaryHex);
		});
	});
});

import { get } from 'svelte/store';
import hexToHSL from '$lib/hexToHSL.js';
import hexToRGB from '$lib/hexToRGB.js';
import { settings } from '$stores';

export const colorModeShade = (hex: string) => {
	const { colorMode } = get(settings);
	if (colorMode === 'hex') return /\#/.test(hex) ? hex : `#${hex}`;
	if (colorMode === 'hsl') {
		const { h, s, l } = hexToHSL(hex);
		return `hsl(${h}, ${s}%, ${l}%)`;
	}
	if (colorMode === 'rgb') {
		const { r, g, b }: { r: number; g: number; b: number } | null = hexToRGB(hex);
		return `rgb(${r}, ${g}, ${b})`;
	}
};

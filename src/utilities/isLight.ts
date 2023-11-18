import hexToRGB from '$lib/hexToRGB.js';

export const isLight = (hex: string) => {
	const { r, g, b } = hexToRGB(hex);
	const hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));

	return hsp > 127.5;
};

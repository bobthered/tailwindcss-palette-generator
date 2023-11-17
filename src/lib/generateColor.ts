import hexToHSL from './hexToHSL.js';
import hslToHex from './hslToHex.js';
import type { Color, HSL, Shade } from './interfaces.js';

const generateColor = ({
	hex,
	preserve,
	shades
}: {
	hex: string;
	preserve: boolean;
	shades: Shade[];
}): Color => {
	// convert hex to hsl
	const colorHSL = hexToHSL(hex);

	// initiate shade object
	const obj: Color = {};

	// initiate lightnessDelta object
	const lightnessDelta: { [key: string]: number } = {};

	// generate shades
	shades.forEach(({ name, lightness }: Shade) => {
		// deconstruct h & s
		const { h, s, l } = colorHSL;

		// generate shade hsl
		const hsl: HSL = { h, s, l: lightness };

		// convert hsl to hex
		const hex = hslToHex(hsl);

		// update shade object
		obj[name] = hex;

		// update lightnessDelta if preserving color
		if (preserve) lightnessDelta[name] = Math.abs(l - lightness);
	});

	// if preserving color, inject original color
	if (preserve) {
		const [closestShade] = Object.keys(lightnessDelta).sort(
			(a, b) => lightnessDelta[a] - lightnessDelta[b]
		);
		obj[closestShade] = hex;
	}

	return obj;
};

export { generateColor };

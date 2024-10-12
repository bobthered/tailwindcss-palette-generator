import { hexToHSL } from './hexToHSL.js';
import { hslToHex } from './hslToHex.js';
import { type Color, type HSL, type Shade } from './types.js';

export const generateColor = ({
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

	// initiate lightnessDelta map
	const lightnessDelta: Record<string | number, number> = {};

	// create object
	const obj: Color = shades.reduce((obj: Record<string | number, string>, { name, lightness }) => {
		// destructure h, s, l
		const { h, s, l } = colorHSL;

		// generate shade hsl
		const hsl: HSL = { h, s, l: lightness };

		// convert hsl to hex
		const hex = hslToHex(hsl);

		// update map
		obj[name] = hex;

		// update lightnessDelta if preserving color
		if (preserve) lightnessDelta[name] = Math.abs(l - lightness);

		return obj;
	}, {});

	// if preserving color, inject original color at closest shade
	if (preserve) {
		const [closestShade] = Object.keys(lightnessDelta).sort(
			(a, b) => lightnessDelta[a] - lightnessDelta[b]
		);
		obj[closestShade] = hex;
	}

	return obj;
};

import { hexToHSL } from './hexToHSL.js';
import { hslToHex } from './hslToHex.js';
import { type Color, type HSL, type Shade } from './types.js';

/**
 * Default anchor shade lightness (shade 500 = 46).
 * Used as the reference point for proportional scaling when anchor mode is enabled.
 */
const ANCHOR_LIGHTNESS = 46;

/**
 * Scales shade lightness values so the input color's actual lightness
 * lands exactly at the anchor shade (500), and other shades distribute
 * proportionally between 0–100.
 *
 * Shades lighter than the anchor scale between the color's lightness and 100.
 * Shades darker than the anchor scale between 0 and the color's lightness.
 */
const scaleLightness = (shadeLightness: number, colorLightness: number): number => {
	if (shadeLightness >= ANCHOR_LIGHTNESS) {
		// Lighter shades: map [ANCHOR_LIGHTNESS..100] → [colorLightness..100]
		const ratio = (shadeLightness - ANCHOR_LIGHTNESS) / (100 - ANCHOR_LIGHTNESS);
		return colorLightness + ratio * (100 - colorLightness);
	}
	// Darker shades: map [0..ANCHOR_LIGHTNESS] → [0..colorLightness]
	const ratio = shadeLightness / ANCHOR_LIGHTNESS;
	return ratio * colorLightness;
};

export const generateColor = ({
	hex,
	preserve,
	anchor,
	shades
}: {
	hex: string;
	preserve: boolean;
	anchor: boolean;
	shades: Shade[];
}): Color => {
	// convert hex to hsl
	const colorHSL = hexToHSL(hex);

	// initiate lightnessDelta map (used by preserve mode)
	const lightnessDelta: Record<string | number, number> = {};

	// create object
	const obj: Color = shades.reduce((obj: Record<string | number, string>, { name, lightness }) => {
		// destructure h, s, l
		const { h, s, l } = colorHSL;

		// When anchor is enabled, scale lightness so the input color anchors at shade 500
		const adjustedLightness = anchor ? Math.round(scaleLightness(lightness, l)) : lightness;

		// generate shade hsl
		const hsl: HSL = { h, s, l: adjustedLightness };

		// convert hsl to hex
		const hex = hslToHex(hsl);

		// update map
		obj[name] = hex;

		// update lightnessDelta if preserving color (non-anchor mode)
		if (preserve && !anchor) lightnessDelta[name] = Math.abs(l - lightness);

		return obj;
	}, {});

	if (anchor) {
		// Force the exact input hex at shade 500 to avoid any rounding drift
		const anchorShade = shades.find((s) => s.lightness === ANCHOR_LIGHTNESS);
		if (anchorShade) {
			obj[anchorShade.name] = hex.startsWith('#') ? hex : `#${hex}`;
		}
	} else if (preserve) {
		const [closestShade] = Object.keys(lightnessDelta).sort(
			(a, b) => (lightnessDelta[a] ?? 0) - (lightnessDelta[b] ?? 0)
		);
		obj[closestShade] = hex;
	}

	return obj;
};

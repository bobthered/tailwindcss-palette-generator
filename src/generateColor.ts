import hexToHSL from "./hexToHSL";
import hslToHex from "./hslToHex";
import { Color, HSL, Shade } from "./interfaces";

const generateColor = ({
  hex,
  shades,
}: {
  hex: string;
  shades: Shade[];
}): Color => {
  // convert hex to hsl
  const colorHSL = hexToHSL(hex);

  // initiate shade object
  const obj: Color = {};

  // generate shades
  shades.forEach(({ name, lightness }: Shade) => {
    // deconstruct h & s
    const { h, s } = colorHSL;

    // generate shade hsl
    const hsl: HSL = { h, s, l: lightness };

    // convert hsl to hex
    const hex = hslToHex(hsl);

    // update shade object
    obj[name] = hex;
  });

  return obj;
};

export { generateColor };

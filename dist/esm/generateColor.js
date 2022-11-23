import hexToHSL from "./hexToHSL";
import hslToHex from "./hslToHex";
const generateColor = ({ hex, shades, }) => {
    // convert hex to hsl
    const colorHSL = hexToHSL(hex);
    // initiate shade object
    const obj = {};
    // generate shades
    shades.forEach(({ name, lightness }) => {
        // deconstruct h & s
        const { h, s } = colorHSL;
        // generate shade hsl
        const hsl = { h, s, l: lightness };
        // convert hsl to hex
        const hex = hslToHex(hsl);
        // update shade object
        obj[name] = hex;
    });
    return obj;
};
export { generateColor };

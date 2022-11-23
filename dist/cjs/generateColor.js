"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateColor = void 0;
const hexToHSL_1 = __importDefault(require("./hexToHSL"));
const hslToHex_1 = __importDefault(require("./hslToHex"));
const generateColor = ({ hex, shades, }) => {
    // convert hex to hsl
    const colorHSL = (0, hexToHSL_1.default)(hex);
    // initiate shade object
    const obj = {};
    // generate shades
    shades.forEach(({ name, lightness }) => {
        // deconstruct h & s
        const { h, s } = colorHSL;
        // generate shade hsl
        const hsl = { h, s, l: lightness };
        // convert hsl to hex
        const hex = (0, hslToHex_1.default)(hsl);
        // update shade object
        obj[name] = hex;
    });
    return obj;
};
exports.generateColor = generateColor;

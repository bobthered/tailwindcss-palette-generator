"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tailwindcssPaletteGenerator = void 0;
const generateColor_1 = require("./generateColor");
const tailwindcssPaletteGenerator = (options) => {
    // defaults
    let colors = [];
    let names = [
        "primary",
        "secondary",
        "tertiary",
        "quaternary",
        "quinary",
        "senary",
        "septenary",
        "octonary",
        "nonary",
        "denary",
    ];
    let shades = [
        { name: "50", lightness: 98 },
        { name: "100", lightness: 95 },
        { name: "200", lightness: 90 },
        { name: "300", lightness: 82 },
        { name: "400", lightness: 64 },
        { name: "500", lightness: 46 },
        { name: "600", lightness: 33 },
        { name: "700", lightness: 24 },
        { name: "800", lightness: 14 },
        { name: "900", lightness: 7 },
        { name: "950", lightness: 4 },
    ];
    // check options type
    if (typeof options === "string")
        options = { colors: [options], names, shades };
    if (typeof options === "object" && Array.isArray(options))
        options = { colors: options, names, shades };
    if (typeof options === "object" && !Array.isArray(options))
        options = Object.assign({ colors, names, shades }, options);
    // initiate palette
    const palette = {};
    // destructure options
    ({ colors, names, shades } = options);
    // loop through palette
    colors.forEach((hex, i) => {
        const name = names[i];
        const color = (0, generateColor_1.generateColor)({ hex, shades });
        palette[name] = color;
    });
    return palette;
};
exports.tailwindcssPaletteGenerator = tailwindcssPaletteGenerator;

import { Color, Shade } from "./interfaces";
declare const generateColor: ({ hex, shades, }: {
    hex: string;
    shades: Shade[];
}) => Color;
export { generateColor };

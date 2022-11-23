interface Color {
    [key: string]: string;
}
interface HSL {
    h: number;
    s: number;
    l: number;
}
interface Palette {
    [key: string]: Color;
}
interface Shade {
    name: string;
    lightness: number;
}
export { Color, HSL, Palette, Shade };

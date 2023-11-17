import { redirect } from "@sveltejs/kit";
import { randomColor } from "./index.js";

export const load = ({ url }) => {
    let { colors, colorMode, preserve } = Object.fromEntries(url.searchParams);
    let mustRedirect = false;
    if (colors === undefined || colorMode === undefined || preserve === undefined) mustRedirect = true;
    if (colors === undefined) {
        const { hex, name } = randomColor();
        colors = [{ hex, name }]
    }
    if (colorMode === undefined) colorMode = 'hex';
    if (preserve === undefined) preserve = true;
    if (mustRedirect) {
        throw redirect(303, `/?colors=${encodeURIComponent(JSON.stringify(colors))}&colorMode=${encodeURIComponent(colorMode)}&preserve=${encodeURIComponent(preserve)}`)
    }
    return {}
}
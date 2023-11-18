import { get } from 'svelte/store';
import { searchParams } from '$stores';
import { randomColor, softRefreshPage } from '$utilities';

export const initiateSearchParams = () => {
	let { colors, colorMode, preserve, showToast } = Object.fromEntries(get(searchParams));
	if (colors === undefined) {
		const { hex, name } = randomColor();
		colors = [{ hex, name }];
	}
	if (colorMode === undefined) colorMode = 'hex';
	if (preserve === undefined) preserve = true;
	if (showToast === undefined) showToast = true;
	let query = new URLSearchParams();
	query.set('colors', JSON.stringify(colors));
	query.set('colorMode', colorMode);
	query.set('preserve', preserve);
	query.set('showToast', showToast);
	softRefreshPage(query);
};

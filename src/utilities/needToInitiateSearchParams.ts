import { get } from 'svelte/store';
import { searchParams } from '$stores';

export const needToInitiateSearchParams = () => {
	let { colors, colorMode, preserve, showToast } = Object.fromEntries(get(searchParams));
	if (
		colors === undefined ||
		colorMode === undefined ||
		preserve === undefined ||
		showToast === undefined
	)
		return true;
	return false;
};

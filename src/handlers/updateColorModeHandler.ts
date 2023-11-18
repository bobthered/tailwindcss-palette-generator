import { get } from 'svelte/store';
import { toast } from '$components/Toast/index.js';
import { searchParams } from '$stores';
import { softRefreshPage } from '$utilities';

export const updateColorModeHandler = (e) => {
	let query = new URLSearchParams(get(searchParams).toString());
	query.set('colorMode', e.target.value);
	toast(`Set mode to ${e.target.value}`);
	softRefreshPage(query);
};

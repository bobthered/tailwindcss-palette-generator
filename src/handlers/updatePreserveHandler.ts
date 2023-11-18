import { get } from 'svelte/store';
import { toast } from '$components/Toast/index.js';
import { searchParams } from '$stores';
import { softRefreshPage } from '$utilities';

export const updatePreserveHandler = (e) => {
	let query = new URLSearchParams(get(searchParams).toString());
	query.set('preserve', e.target.checked);
	toast(`Set preserve to ${e.target.checked}`);
	softRefreshPage(query);
};

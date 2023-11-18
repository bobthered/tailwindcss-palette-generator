import { get } from 'svelte/store';
import { toast } from '$components/Toast/index.js';
import { searchParams } from '$stores';
import { softRefreshPage } from '$utilities';

export const updateShowToastHandler = (e) => {
	let query = new URLSearchParams(get(searchParams).toString());
	query.set('showToast', e.target.checked);
	toast(`Turn toasts ${e.target.checked ? 'on' : 'off'}`);
	softRefreshPage(query);
};

import { get } from 'svelte/store';
import { toast } from '$components/Toast/index.js';
import { searchParams } from '$stores';
import { softRefreshPage } from '$utilities';

export const updateColorNameHandler = (e, index: number) => {
	const name = e.target.innerHTML;
	let query = new URLSearchParams(get(searchParams).toString());
	let colors = JSON.parse(query.get('colors'));
	colors[index].name = name;
	query.set('colors', JSON.stringify(colors));
	toast(`Updated name to "${name}"`);
	softRefreshPage(query);
};

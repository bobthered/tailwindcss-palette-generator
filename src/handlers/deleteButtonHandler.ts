import { get } from 'svelte/store';
import { toast } from '$components/Toast/index.js';
import { searchParams } from '$stores';
import { colorModeShade, softRefreshPage } from '$utilities';

export const deleteButtonHandler = (index: number) => {
	let query = new URLSearchParams(get(searchParams).toString());
	let colors = JSON.parse(query.get('colors'));
	const { hex } = colors[index];
	colors = colors.filter((_, i) => i !== index);
	query.set('colors', JSON.stringify(colors));
	toast(`Deleted ${colorModeShade(hex)}`);
	softRefreshPage(query);
};

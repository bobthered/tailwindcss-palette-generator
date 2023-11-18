import { get } from 'svelte/store';
import { toast } from '$components/Toast/index.js';
import { searchParams } from '$stores';
import { colorModeShade, randomColor, softRefreshPage } from '$utilities';

export const addRandomColorHandler = () => {
	const { hex, name } = randomColor();
	let query = new URLSearchParams(get(searchParams).toString());
	const colors = [...JSON.parse(query.get('colors')), { hex, name }];
	query.set('colors', JSON.stringify(colors));
	toast(`Added ${colorModeShade(hex)}`);
	softRefreshPage(query);
};

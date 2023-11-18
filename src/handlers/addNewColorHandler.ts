import colorNamer from 'color-namer';
import { get } from 'svelte/store';
import { toast } from '$components/Toast/index.js';
import { searchParams } from '$stores';
import { colorModeShade, softRefreshPage } from '$utilities';

export const addNewColorHandler = (hex: string) => {
	hex = hex.replace(/\#/g, '');
	const {
		ntc: [closest]
	} = colorNamer(hex);
	const { name } = closest;
	let query = new URLSearchParams(get(searchParams).toString());
	const colors = [
		...JSON.parse(query.get('colors')),
		{ hex, name: name.toLowerCase().replace(/\s/g, '-') }
	];
	query.set('colors', JSON.stringify(colors));
	toast(`Added ${colorModeShade(hex)}`);
	softRefreshPage(query);
};

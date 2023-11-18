import colorNamer from 'color-namer';
import { get } from 'svelte/store';
import { toast } from '$components/Toast/index.js';
import { searchParams } from '$stores';
import { colorModeShade, softRefreshPage } from '$utilities';

export const updateColorHexHandler = (
	e: CustomEvent<any>,
	index: number,
	showToast: boolean = false
) => {
	const hex = e.target.value.replace(/\#/g, '');
	let query = new URLSearchParams(get(searchParams).toString());
	let colors = JSON.parse(query.get('colors'));
	const {
		ntc: [closest]
	} = colorNamer(hex);
	const { name } = closest;
	colors[index] = { name: name.toLowerCase().replace(/\s/g, '-'), hex };
	query.set('colors', JSON.stringify(colors));
	if (showToast) toast(`Updated color to ${colorModeShade(hex)}`);
	softRefreshPage(query);
};

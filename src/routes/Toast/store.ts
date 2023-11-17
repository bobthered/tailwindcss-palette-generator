import { writable } from 'svelte/store';

const { subscribe, update } = writable<string[]>([]);

const toast = (text: string, options: { duration: number } = { duration: 5000 }) => {
	update((state) => [...state, text]);
	setTimeout(() => {
		update((state) => {
			const [_, ...rest] = state;
			return rest;
		});
	}, options.duration);
};

export { toast, subscribe };

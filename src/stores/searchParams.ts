import { writable } from 'svelte/store';

export const searchParams = writable(new URLSearchParams());

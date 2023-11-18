import { writable } from 'svelte/store';

export const settings = writable({ colorMode: 'hex', preserve: true, showToast: true });

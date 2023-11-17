<script>
	import { theme } from 'sveltewind/stores';
	import { sveltewind } from 'sveltewind/themes';
	import '../app.postcss';
	import { Toasts } from './Toast';

	theme.set(sveltewind);
	theme.set({
		buttonError: 'bg-red-500 hover:bg-red-600 focus:bg-red-600 focus:ring-red-500/30',
		buttonIcon: 'px-3',
		select: 'py-3 text-sm leading-6 font-semibold'
	});
</script>

<div class="relative">
	<Toasts />
	<slot />
</div>

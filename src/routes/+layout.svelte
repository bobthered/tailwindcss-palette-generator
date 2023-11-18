<script>
	import { theme } from 'sveltewind/stores';
	import { sveltewind } from 'sveltewind/themes';
	import { Toasts } from '$components';
	import '../app.postcss';

	theme.set(sveltewind);
	theme.set({
		buttonError: 'bg-red-500 hover:bg-red-600 focus:bg-red-600 focus:ring-red-500/30',
		buttonIcon: 'px-3',
		checkbox: 'text-white',
		header: 'ring-0 flex-col justify-between lg:flex-row lg:justify-between',
		nav: 'flex-row overflow-y-visible',
		select: 'py-3 text-sm leading-6 font-semibold'
	});
</script>

<div class="relative">
	<Toasts />
	<slot />
</div>

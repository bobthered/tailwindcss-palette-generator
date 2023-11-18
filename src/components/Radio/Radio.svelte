<script lang="ts">
	import { current_component } from 'svelte/internal';
	import { Radio } from 'sveltewind/components';
	import { twMerge } from 'tailwind-merge';
	import { getEvents } from '$actions';
	import { theme } from '$stores';

	// props (external)
	export let group;
	export let style = undefined;
	export let use = [];
	export let value;

	// props (internal)
	const events = getEvents(current_component);
</script>

<Radio bind:group {value} {style} use={[events, ...use]}>
	<svelte:fragment slot="handle">
		<div
			class={twMerge(
				$theme.button,
				group !== value
					? 'bg-slate-500 hover:bg-slate-600 focus:bg-slate-600 focus:ring-slate-600/30'
					: undefined
			)}
		>
			<slot />
		</div>
	</svelte:fragment>
</Radio>

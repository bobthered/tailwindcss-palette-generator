<script lang="ts">
	import { cubicInOut } from 'svelte/easing';
	import { twMerge } from 'tailwind-merge';
	import { Card } from '$components';

	// props (external)
	export let scale = 1;
	export let translateY = 1;

	// props (internal)
	const duration = 500;
	const fadeOut = (node: Node) => {
		return {
			duration,
			css: (t: number) => {
				const eased = cubicInOut(t);
				return `
                    opacity:${eased};
                `;
			}
		};
	};
	const slideUp = (node: Node, direction: number = 1) => {
		return {
			duration,
			css: (t: number) => {
				const eased = cubicInOut(t);
				return `transform:translateY(${(1 - eased) * 200 * direction}%)`;
			}
		};
	};
	$: style = `transform:scale(${scale}) translateY(${translateY}%)`;
	$: styleLg = `transform:scale(${scale}) translateY(-${translateY}%)`;
</script>

<div class="absolute top-4 right-4 lg:hidden" in:slideUp={-1} out:fadeOut>
	<Card
		class={twMerge(
			'w-[calc(100dvw_-_2rem)] lg:w-auto py-2 transition duration-200 pointer-events-auto',
			$$props.class
		)}
		{style}
	>
		<slot />
	</Card>
</div>
<div class="absolute right-4 bottom-4 hidden lg:block" in:slideUp={1} out:fadeOut>
	<Card
		class={twMerge(
			'w-[calc(100dvw_-_2rem)] lg:w-auto py-2 transition duration-200 pointer-events-auto',
			$$props.class
		)}
		style={styleLg}
	>
		<slot />
	</Card>
</div>

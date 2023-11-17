<script lang="ts">
	import { cubicInOut } from 'svelte/easing';
	import { Card } from 'sveltewind/components';
	import { twMerge } from 'tailwind-merge';

	// props (external)
	export let style: string | undefined = undefined;

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
	const slideUp = (node: Node) => {
		return {
			duration,
			css: (t: number) => {
				const eased = cubicInOut(t);
				return `transform:translateY(${(1 - eased) * 200}%)`;
			}
		};
	};
</script>

<div class="absolute bottom-4 right-4" in:slideUp out:fadeOut>
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

<script lang="ts">
	import { Toast, subscribe } from './index.js';

	let toasts: string[] = [];

	subscribe((state) => (toasts = state));
</script>

<div class="fixed z-[1] top-0 left-0 w-[100dvw] h-[100dvh] overflow-hidden pointer-events-none">
	{#each toasts as text, i}
		<Toast
			style="transform:scale({1 - (toasts.length - 1 - i) * 0.1}) translateY(-{(toasts.length -
				1 -
				i) *
				25}%);"
		>
			<!-- <Toast> -->
			{text}
		</Toast>
	{/each}
</div>

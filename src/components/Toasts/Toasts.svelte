<script lang="ts">
	import { settings } from '$stores';
	import { Toast, subscribe } from '../Toast/index.js';

	let toasts: string[] = [];

	subscribe((state) => (toasts = state));
</script>

{#if $settings.showToast}
	<div class="fixed z-[100] top-0 left-0 w-[100dvw] h-[100dvh] overflow-hidden pointer-events-none">
		{#each toasts as text, i}
			<Toast
				scale={1 - (toasts.length - 1 - i) * 0.1}
				translateY={(toasts.length - 1 - i) * 25}
				style="transform:scale({1 - (toasts.length - 1 - i) * 0.1}) translateY(-{(toasts.length -
					1 -
					i) *
					25}%);"
			>
				{text}
			</Toast>
		{/each}
	</div>
{/if}

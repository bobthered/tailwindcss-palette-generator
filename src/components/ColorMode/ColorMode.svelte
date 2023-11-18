<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import { Fieldset, Radio } from '$components';
	import { updateColorModeHandler } from '$handlers';
	import { settings, theme } from '$stores';

	// props (internal)
	const colorModeOptions = ['hex', 'hsl', 'rgb'].map((label) => {
		return { label, value: label };
	});
</script>

<Fieldset legend="Mode">
	<div class="flex space-x-2">
		{#each colorModeOptions as { label, value }}
			<Radio bind:group={$settings.colorMode} on:change={(e) => updateColorModeHandler(e)} {value}>
				{label}
			</Radio>
		{/each}
	</div>
</Fieldset>

<script lang="ts">
	import { Checkbox } from '$components';
	import { updatePreserveHandler } from '$handlers';
	import { settings } from '$stores';
</script>

<Checkbox bind:checked={$settings.preserve} on:change={(e) => updatePreserveHandler(e)}>
	Preserve?
</Checkbox>

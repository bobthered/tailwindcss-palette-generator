<script lang="ts">
	import { Checkbox } from '$components';
	import { updateShowToastHandler } from '$handlers';
	import { settings } from '$stores';
</script>

<Checkbox bind:checked={$settings.showToast} on:change={(e) => updateShowToastHandler(e)}>
	Show Toasts?
</Checkbox>

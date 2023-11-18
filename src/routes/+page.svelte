<script lang="ts">
	import { afterUpdate } from 'svelte';
	import { download } from 'sveltewind/utilities';
	import { twMerge } from 'tailwind-merge';
	import { page } from '$app/stores';
	import { Button, Container, Header, Icon, Input, Nav } from '$components';
	import { toast } from '$components/Toast/index.js';
	import {
		deleteButtonHandler,
		updateColorHexHandler,
		updateColorModeHandler,
		updateColorNameHandler,
		updatePreserveHandler
	} from '$handlers';
	import { Clipboard, EyeDropper, Trash } from '$icons';
	import { tailwindcssPaletteGenerator } from '$lib/index.js';
	import { searchParams, settings, theme } from '$stores';
	import {
		colorModeShade,
		initiateSearchParams,
		isLight,
		needToInitiateSearchParams
	} from '$utilities';

	import type { Palette } from '$lib/interfaces.js';

	// props (internal)
	let palette: Palette = {};

	afterUpdate(() => {
		$searchParams = $page.url.searchParams;
		if (needToInitiateSearchParams()) return initiateSearchParams();
		const searchParamsObj = Object.fromEntries($searchParams);
		const colors = JSON.parse(searchParamsObj.colors);
		$settings.colorMode = searchParamsObj.colorMode;
		$settings.preserve = searchParamsObj.preserve === 'true';
		$settings.showToast = searchParamsObj.showToast === 'true';
		palette = tailwindcssPaletteGenerator(
			colors.reduce(
				(obj, color) => {
					obj.colors = [...obj.colors, `#${color.hex}`];
					obj.names = [...obj.names, color.name];
					return obj;
				},
				{ colors: [], names: [], preserve: $settings.preserve }
			)
		);
	});
</script>

<svelte:head>
	<title>Tailwindcss Palette Generator - @bobthered/tailwindcss-palette-generator</title>
</svelte:head>

<div class="min-h-[100svh] max-h-[100svh] overflow-hidden flex flex-col">
	<div class="flex-grow overflow-auto relative">
		<Header />
		<Container>
			<div class="flex flex-col space-y-8 pb-8">
				{#if Object.keys(palette).length > 0}
					<div
						class="grid grid-cols-1 lg:gap-4 items-start lg:grid-cols-[repeat(2,fit-content(0))_repeat(11,1fr)] lg:gap-x-2 text-xs"
					>
						<div class="hidden lg:block col-span-2"></div>
						{#each Object.keys(palette[Object.keys(palette)[0]]) as shade}
							<div class="hidden lg:block text-center">{shade}</div>
						{/each}
						{#each Object.keys(palette) as key, i}
							<div class="flex flex-col justify-between space-y-2 pt-4 lg:pt-0">
								<Button
									class={twMerge($theme.buttonIcon, $theme.buttonError)}
									on:click={() => deleteButtonHandler(i)}
									disabled={Object.keys(palette).length === 1 ? 'disabled' : undefined}
								>
									<Icon src={Trash} />
								</Button>
								<!-- svelte-ignore a11y-label-has-associated-control -->
								<label class="relative">
									<Input
										class="absolute left-0 bottom-0 opacity-0 peer w-0 h-0 p-0"
										on:change={(e) => updateColorHexHandler(e, i, true)}
										on:input={(e) => updateColorHexHandler(e, i)}
										type="color"
										value={palette[key]['500']}
									/>
									<div
										class={twMerge(
											$theme.button,
											$theme.buttonIcon,
											'peer-focus:ring-violet-500/30 cursor-pointer'
										)}
									>
										<Icon class="pointer-events-none" src={EyeDropper}></Icon>
									</div>
								</label>
							</div>
							<div
								class="whitespace-nowrap py-4 lg:py-0 text-sm text-center lg:text-left font-semibold lg:text-xs"
								contenteditable="true"
								on:input={(e) => updateColorNameHandler(e, i)}
							>
								{key}
							</div>
							{#each Object.keys(palette[key]) as shade}
								<div class="flex flex-col space-y-2">
									<Button
										class={twMerge(
											'group relative h-12 lg:h-auto lg:aspect-[4/3] transition duration-200 scale-100 hover:scale-105 focus:scale-105',
											isLight(palette[key][shade]) ? 'text-slate-900' : 'text-white'
										)}
										on:click={(e) => {
											e.preventDefault();
											download.clipboard(colorModeShade(palette[key][shade]));
											toast(`Copied ${colorModeShade(palette[key][shade])}`);
										}}
										style="background-color:{palette[key][shade]}"
									>
										<div class="lg:hidden">
											{shade} - {colorModeShade(palette[key][shade])}
										</div>
										<Icon
											class="hidden lg:block transition duration-200 opacity-0 group-hover:opacity-100 absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-[calc(-50%_+_.25rem)] group-hover:translate-y-[-50%]"
											src={Clipboard}
										/>
									</Button>
									<div
										class="hidden lg:block text-center leading-4 {$settings.colorMode === 'hex'
											? 'text-sm'
											: 'text-[.625rem]'}"
									>
										{colorModeShade(palette[key][shade])}
									</div>
								</div>
							{/each}
						{/each}
					</div>
				{/if}
			</div>
		</Container>
	</div>
	<Nav class="lg:hidden" />
</div>

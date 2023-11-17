<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import colorNamer from 'color-namer';
	import {
		Button,
		Checkbox,
		Container,
		Fieldset,
		H1,
		Icon,
		Input,
		Select
	} from 'sveltewind/components';
	import { Clipboard, EyeDropper, Trash } from 'sveltewind/components/icons';
	import { theme } from 'sveltewind/stores';
	import { download } from 'sveltewind/utilities';
	import { twMerge } from 'tailwind-merge';
	import { randomColor } from './index.js';
	import { tailwindcssPaletteGenerator } from '$lib/index.js';
	import hexToHSL from '$lib/hexToHSL.js';
	import hexToRGB from '$lib/hexToRGB.js';
	import type { Palette } from '$lib/interfaces.js';
	import { toast } from './Toast/index.js';
	import { afterUpdate, onMount } from 'svelte';

	// components

	// utilities
	const colorModeShade = (hex, mode) => {
		if (mode === 'hex') return hex;
		if (mode === 'hsl') {
			const { h, s, l } = hexToHSL(hex);
			return `hsl(${h}, ${s}%, ${l}%)`;
		}
		if (mode === 'rgb') {
			const { r, g, b } = hexToRGB(hex);
			return `rgb(${r}, ${g}, ${b})`;
		}
	};
	const isLight = (hex: string) => {
		const { r, g, b } = hexToRGB(hex);
		const hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));

		return hsp > 127.5;
	};
	const softRefreshPage = async (query: URLSearchParams) => {
		const options = {
			keepFocus: true,
			noScroll: true,
			replaceState: true
		};
		goto(`?${query.toString()}`, options);
	};

	// handlers
	const addColorHandler = () => {
		const { hex, name } = randomColor();
		let query = new URLSearchParams($page.url.searchParams.toString());
		const colors = [...JSON.parse(query.get('colors')), { hex, name }];
		query.set('colors', JSON.stringify(colors));
		softRefreshPage(query);
	};
	const deleteButtonHandler = (index: number) => {
		let query = new URLSearchParams($page.url.searchParams.toString());
		let colors = JSON.parse(query.get('colors'));
		colors = colors.filter((_, i) => i !== index);
		query.set('colors', JSON.stringify(colors));
		softRefreshPage(query);
	};
	const updateColorHexHandler = (e: CustomEvent<any>, index: number) => {
		const hex = e.target.value.replace(/\#/g, '');
		let query = new URLSearchParams($page.url.searchParams.toString());
		let colors = JSON.parse(query.get('colors'));
		const {
			ntc: [closest]
		} = colorNamer(hex);
		const { name } = closest;
		colors[index] = { name: name.toLowerCase().replace(/\s/g, '-'), hex };
		query.set('colors', JSON.stringify(colors));
		softRefreshPage(query);
	};
	const updateColorModeHandler = (e) => {
		let query = new URLSearchParams($page.url.searchParams.toString());
		query.set('colorMode', e.target.value);
		softRefreshPage(query);
	};
	const updateColorNameHandler = (e, index) => {
		const name = e.target.innerHTML;
		let query = new URLSearchParams($page.url.searchParams.toString());
		let colors = JSON.parse(query.get('colors'));
		colors[index].name = name;
		query.set('colors', JSON.stringify(colors));
		softRefreshPage(query);
	};
	const updatePreserveHandler = (e) => {
		let query = new URLSearchParams($page.url.searchParams.toString());
		query.set('preserve', e.target.checked);
		softRefreshPage(query);
	};

	// props (internal)
	let colorMode = 'hex';
	const colorModeOptions = ['hex', 'hsl', 'rgb'].map((label) => {
		return { label, value: label };
	});
	let palette: Palette = {};
	let preserve = true;

	afterUpdate(() => {
		let searchParams = Object.fromEntries($page.url.searchParams);
		const colors = JSON.parse(searchParams.colors);
		colorMode = searchParams.colorMode;
		preserve = searchParams.preserve === 'true';
		palette = tailwindcssPaletteGenerator(
			colors.reduce(
				(obj, color) => {
					obj.colors = [...obj.colors, `#${color.hex}`];
					obj.names = [...obj.names, color.name];
					return obj;
				},
				{ colors: [], names: [], preserve }
			)
		);
	});
</script>

<svelte:head>
	<title>Tailwindcss Palette Generator - @bobthered/tailwindcss-palette-generator</title>
</svelte:head>

<div
	class="min-h-[100dvh] overflow-auto pt-[env(safe-area-top)] pb-[env(safe-area-bottom)] pl-[env(safe-area-left]) pr-[env(safe-area-right)"
>
	<Container>
		<div class="flex flex-col space-y-8 py-8">
			<H1 class="text-slate-900 dark:text-white">Tailwindcss Palette Generator</H1>
			{#if Object.keys(palette).length > 0}
				<div class="flex items-end space-x-4">
					<Button on:click={addColorHandler} type="submit">Add Color</Button>
					<Fieldset legend="Mode">
						<Select
							bind:value={colorMode}
							on:change={updateColorModeHandler}
							options={colorModeOptions}
						/>
					</Fieldset>
					<Checkbox bind:checked={preserve} on:change={updatePreserveHandler}>Preserve?</Checkbox>
				</div>
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
									on:change={(e) => updateColorHexHandler(e, i)}
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
							class="whitespace-nowrap py-4 lg:py-0"
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
										download.clipboard(colorModeShade(palette[key][shade], colorMode));
										toast(`Copied ${colorModeShade(palette[key][shade], colorMode)}`);
									}}
									style="background-color:{palette[key][shade]}"
								>
									<div class="lg:hidden">
										{colorModeShade(palette[key][shade], colorMode)}
									</div>
									<Icon
										class="hidden lg:block transition duration-200 opacity-0 group-hover:opacity-100 absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-[calc(-50%_+_.25rem)] group-hover:translate-y-[-50%]"
										src={Clipboard}
									/>
								</Button>
								<div
									class="hidden lg:block text-center leading-4 {colorMode === 'hex'
										? 'text-sm'
										: 'text-[.625rem]'}"
								>
									{colorModeShade(palette[key][shade], colorMode)}
								</div>
							</div>
						{/each}
					{/each}
				</div>
			{/if}
		</div>
	</Container>
</div>

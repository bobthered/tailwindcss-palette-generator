<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import { Nav } from 'sveltewind/components';
	import { theme } from 'sveltewind/stores';
	import { imask } from '$actions';
	import {
		A,
		Button,
		ColorMode,
		Fieldset,
		Form,
		Icon,
		Input,
		Modal,
		Preserve,
		Radio,
		ShowToast,
		Textarea
	} from '$components';
	import { toast } from '$components/Toast/index.js';
	import { addNewColorHandler, addRandomColorHandler } from '$handlers';
	import { ArrowDownOnSquare, Clipboard, Cog6Tooth, Dice, EyeDropper, Github, Plus } from '$icons';
	import { tailwindcssPaletteGenerator } from '$lib/index.js';
	import { searchParams, settings } from '$stores';
	import { download } from '$utilities';

	// utilities
	const getClipboardText = (clipboardOption: string) => {
		let { colors, colorMode, preserve } = Object.fromEntries($searchParams);
		if (colors === undefined || colorMode === undefined || preserve === undefined) return '';
		colors = JSON.parse(colors);
		if (clipboardOption === 'Colors') {
			const palette = tailwindcssPaletteGenerator(
				colors.reduce(
					(obj, color) => {
						obj.colors = [...obj.colors, `#${color.hex}`];
						obj.names = [...obj.names, color.name];
						return obj;
					},
					{ colors: [], names: [], preserve: $settings.preserve }
				)
			);
			return JSON.stringify(palette, null, 4);
		}
		if (clipboardOption === 'tailwind.config.cjs') {
			return `const { tailwindcssPaletteGenerator } = require("@bobthered/tailwindcss-palette-generator");

/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: tailwindcssPaletteGenerator({
				colors: [
					${colors.map(({ hex }) => `'#${hex}'`).join(', \r\n\t\t\t\t\t')}
				],
				names: [
					${colors.map(({ name }) => `'${name}'`).join(', \r\n\t\t\t\t\t')}
				]
			})
		}
	},

	plugins: []
};

module.exports = config;`;
		}
	};

	// props (internal)
	let clipboardOption = 'tailwind.config.cjs';
	const clipboardOptions = ['Colors', 'tailwind.config.cjs'];
	let clipboardText = '';
	const masks = {
		hex: { mask: '{#}HHHHHH', blocks: { H: { mask: /^([0-9]|[A-F]|[a-f])$/ } } },
		hsl: {
			mask: '{hsl(}H{, }P{%, }P{%)}',
			blocks: {
				H: {
					mask: Number,
					min: 0,
					max: 360
				},
				P: {
					mask: Number,
					min: 0,
					max: 100
				}
			}
		}
	};
	let modal = {
		clipboard: {},
		new: {},
		settings: {}
	};
	let newColorElem;
	let newColorElemLg;

	$: if ($searchParams) clipboardText = getClipboardText(clipboardOption);
</script>

<Nav
	class={twMerge(
		'flex justify-between pb-[env-safe-area-bottom] lg:justify-end lg:space-x-2',
		$$props.class
	)}
>
	<Form
		class="flex-row space-y-0 hidden lg:flex relative"
		on:submit={(e) => {
			e.preventDefault();
			let value = newColorElemLg.value.replace(/\#/g, '');
			// check if only 3 digits
			if (value.length === 3)
				value = value
					.split('')
					.map((v) => `${v}${v}`)
					.join('');
			// check if value isn't 6 digits
			if (value.length !== 6) return;
			addNewColorHandler(value);
			newColorElemLg.value = '';
		}}
	>
		<input
			class={twMerge($theme.input, 'w-[14rem]')}
			bind:this={newColorElemLg}
			placeholder="#000000"
			use:imask={masks.hex}
		/>
		<div class="flex space-x-0 absolute top-0 right-0">
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label class="relative">
				<Input
					class="absolute left-0 bottom-0 opacity-0 peer w-0 h-0 p-0"
					on:input={(e) => (newColorElemLg.value = e.target.value.toUpperCase())}
					type="color"
				/>
				<div
					class={twMerge(
						$theme.button,
						$theme.buttonIcon,
						'peer-focus:ring-violet-500/30 cursor-pointer scale-[.75]'
					)}
				>
					<Icon class="pointer-events-none" src={EyeDropper}></Icon>
				</div>
			</label>
			<Button class={twMerge($theme.buttonIcon, ' scale-[.75]')} type="submit">
				<Icon src={Plus} />
			</Button>
		</div>
	</Form>

	<Button
		class={twMerge($theme.buttonIcon, 'rounded-none w-full lg:rounded-lg lg:w-auto lg:hidden')}
		on:click={modal.new.toggle}
	>
		<Icon src={Plus} />
	</Button>
	<Button
		class={twMerge($theme.buttonIcon, 'rounded-none w-full lg:rounded-lg lg:w-auto')}
		on:click={() => addRandomColorHandler()}
	>
		<Icon src={Dice} />
	</Button>
	<Button
		class={twMerge($theme.buttonIcon, 'rounded-none w-full lg:rounded-lg lg:w-auto')}
		on:click={modal.clipboard.toggle}
	>
		<Icon src={Clipboard} />
	</Button>
	<Button
		class={twMerge($theme.buttonIcon, 'rounded-none w-full lg:rounded-lg lg:w-auto')}
		on:click={modal.settings.toggle}
	>
		<Icon src={Cog6Tooth} />
	</Button>
	<A
		class={twMerge(
			$theme.button,
			$theme.buttonIcon,
			'hidden lg:block rounded-none w-full lg:rounded-lg lg:w-auto'
		)}
		href="https://github.com/bobthered/tailwindcss-palette-generator"
	>
		<Icon src={Github} />
	</A>
</Nav>

<Modal
	bind:close={modal.clipboard.close}
	bind:isOpen={modal.clipboard.isOpen}
	bind:open={modal.clipboard.open}
	bind:toggle={modal.clipboard.toggle}
	class="overflow-hidden"
>
	<div class="flex flex-col space-y-4 overflow-hidden p-[1px]">
		<div class="flex space-x-2">
			{#each clipboardOptions as value}
				<Radio bind:group={clipboardOption} {value}>{value}</Radio>
			{/each}
		</div>
		<pre
			class={twMerge(
				$theme.input,
				'font-mono text-xs font-medium overflow-auto'
			)}>{clipboardText}</pre>
		<Button
			on:click={() => {
				download.clipboard(clipboardText);
				toast('Copied to clipboard');
			}}
		>
			Copy
		</Button>
	</div>
</Modal>
<Modal
	bind:close={modal.new.close}
	bind:isOpen={modal.new.isOpen}
	bind:open={modal.new.open}
	bind:toggle={modal.new.toggle}
>
	<Form
		on:submit={(e) => {
			e.preventDefault();
			let value = newColorElem.value.replace(/\#/g, '');
			// check if only 3 digits
			if (value.length === 3)
				value = value
					.split('')
					.map((v) => `${v}${v}`)
					.join('');
			// check if value isn't 6 digits
			if (value.length !== 6) return;
			addNewColorHandler(value);
			newColorElem.value = '';
		}}
	>
		<Fieldset legend="hex">
			<div class="relative">
				<input
					class={twMerge($theme.input, 'w-full')}
					bind:this={newColorElem}
					placeholder="#000000"
					use:imask={masks.hex}
				/>
				<div class="flex space-x-0 absolute top-0 right-0">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="relative">
						<Input
							class="absolute left-0 bottom-0 opacity-0 peer w-0 h-0 p-0"
							on:input={(e) => (newColorElem.value = e.target.value.toUpperCase())}
							type="color"
						/>
						<div
							class={twMerge(
								$theme.button,
								$theme.buttonIcon,
								'peer-focus:ring-violet-500/30 cursor-pointer scale-[.75]'
							)}
						>
							<Icon class="pointer-events-none" src={EyeDropper}></Icon>
						</div>
					</label>
					<Button class={twMerge($theme.buttonIcon, ' scale-[.75]')} type="submit">
						<Icon src={Plus} />
					</Button>
				</div>
			</div>
		</Fieldset>
		<Button class={twMerge($theme.buttonIcon)} type="submit">Add</Button>
	</Form>
</Modal>
<Modal
	bind:close={modal.settings.close}
	bind:isOpen={modal.settings.isOpen}
	bind:open={modal.settings.open}
	bind:toggle={modal.settings.toggle}
>
	<div class="flex flex-col space-y-4">
		<ColorMode />
		<Preserve />
		<ShowToast />
	</div>
</Modal>

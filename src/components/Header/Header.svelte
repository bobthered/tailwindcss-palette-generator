<script lang="ts">
	import { Header } from 'sveltewind/components';
	import { Container, H1, Nav } from '$components';
</script>

<Header
	class="space-y-4 lg:space-y-0 relative lg:sticky lg:top-0 z-[1] py-4 bg-white/[.5] dark:bg-slate-900/[.75] backdrop-blur-lg"
>
	<Container>
		<div class="flex items-center justify-between">
			<H1 class="text-[1.375rem] lg:text-[2rem] text-center text-slate-900 dark:text-white">
				Tailwindcss Palette Generator
			</H1>
			<Nav class="hidden lg:flex" />
		</div>
	</Container>
</Header>

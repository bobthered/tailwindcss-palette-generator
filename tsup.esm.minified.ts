import { type Options, defineConfig } from 'tsup';

const config: Options = {
	bundle: true,
	clean: true,
	dts: true,
	entry: ['./src/lib/index.ts'],
	format: ['esm'],
	minify: 'terser',
	outDir: './dist/esm/minified/',
	outExtension: () => {
		return { js: '.mjs' };
	},
	sourcemap: true,
	splitting: true
};

export default defineConfig(config);

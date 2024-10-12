import { type Options, defineConfig } from 'tsup';

const config: Options = {
	bundle: true,
	clean: true,
	dts: true,
	entry: ['./src/lib/index.ts'],
	format: ['cjs'],
	minify: 'terser',
	outDir: './dist/cjs/minified/',
	// outExtension: () => {
	// 	return { js: '.mjs' };
	// },
	sourcemap: true,
	splitting: true
};

export default defineConfig(config);

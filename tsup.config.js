import { defineConfig } from 'tsup';

const config = {
	entry: [
		'./src/lib/generateColor.ts',
		'./src/lib/hexToHSL.ts',
		'./src/lib/hexToRGB.ts',
		'./src/lib/hslToHex.ts',
		'./src/lib/index.ts',
		'./src/lib/interfaces.ts'
	],
	format: ['cjs', 'esm'],
	dts: true,
	sourcemap: true,
	minify: 'terser'
};

export default defineConfig(config);

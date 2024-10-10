import { defineConfig } from 'tsup';
import { readdir } from 'fs/promises';

const entries = await readdir('./src/lib');

const config = {
	entry: entries.map((entry) => `./src/lib/${entry}`),
	format: ['cjs', 'esm'],
	dts: true,
	sourcemap: true,
	minify: 'terser'
	// entry: entries,
	// dts: true,
	// sourcemap: true,
	// minify: 'terser',
	// outDir: 'dist'
};

export default defineConfig(config);

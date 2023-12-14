import { defineConfig } from 'tailwindcss-patch';

export default defineConfig({
	patch: {
		output: {
			filename: '.tw-patch/tw-class-list.json',
			loose: true,
			removeUniversalSelector: true,
		},
		tailwindcss: {
			config: './tailwind.config.js',
		},
	},
	mangle: {
		classGenerator: {
			classPrefix: 'ç',
		},
	},
});

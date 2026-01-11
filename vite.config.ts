import tailwindcss from "@tailwindcss/vite";
import {defineConfig} from "vite";
import {svelte} from "@sveltejs/vite-plugin-svelte";
import {svgPlugin} from "./src/vite/svgPlugin";
import {shikiPlugin} from "./src/vite/shikiPlugin";
import {resolve} from "node:path";

export default defineConfig({
	plugins: [tailwindcss(), svelte(), shikiPlugin(), svgPlugin("icon")],
	resolve: {
		alias: {
			"@": resolve(import.meta.dirname, "./src"),
		},
	},
	esbuild: {
		target: "ES2024",
	},
	server: {
		hmr: false,
	},
});

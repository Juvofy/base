import tailwindcss from "@tailwindcss/vite";
import {defineConfig} from "vite";
import {svelte} from "@sveltejs/vite-plugin-svelte";
import {svgPlugin} from "./src/vite/svgPlugin.ts";
import {shikiPlugin} from "./src/vite/shikiPlugin.ts";
import {resolve} from "node:path";

export default defineConfig({
	plugins: [tailwindcss(), svelte(), shikiPlugin(), svgPlugin("icon")],
	resolve: {
		alias: {
			"@": resolve(import.meta.dirname, "./src"),
			"@juvofy/lib": resolve(import.meta.dirname, "./src"),
		},
		extensions: [".ts", ".js", ".svelte"],
	},
	esbuild: {
		target: "ES2024",
	},
	server: {
		hmr: false,
	},
});

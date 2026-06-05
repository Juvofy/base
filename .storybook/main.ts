import type {StorybookConfig} from "@storybook/svelte-vite";
import {resolve} from "path";
import {fileURLToPath} from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const config: StorybookConfig = {
	stories: ["../src/stories/**/*.stories.svelte"],
	addons: ["@storybook/addon-svelte-csf"],
	framework: {
		name: "@storybook/svelte-vite",
		options: {},
	},
	async viteFinal(config) {
		const {default: tailwindcss} = await import("@tailwindcss/vite");
		const {svgPlugin} = await import("../src/vite/svgPlugin.js");

		config.plugins = [...(config.plugins ?? []), tailwindcss(), svgPlugin("icon")];
		config.resolve = {
			...config.resolve,
			alias: {
				...(typeof config.resolve?.alias === "object" && !Array.isArray(config.resolve.alias)
					? config.resolve.alias
					: {}),
				"@": resolve(__dirname, "../src"),
				"@juvofy/lib": resolve(__dirname, "../src"),
			},
		};

		return config;
	},
};

export default config;

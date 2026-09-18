// This file has been automatically migrated to valid ESM format by Storybook.
import type {StorybookConfig} from "@storybook/svelte-vite";
import {resolve} from "path";
import {fileURLToPath} from "url";

const dirname = fileURLToPath(new URL(".", import.meta.url));

const config: StorybookConfig = {
	stories: ["../src/stories/**/*.stories.svelte", "../src/stories/**/*.mdx"],
	docs: {
		defaultName: "Docs",
	},
	addons: ["@storybook/addon-svelte-csf", "@storybook/addon-docs"],
	framework: {
		name: "@storybook/svelte-vite",
		options: {},
	},
	async viteFinal(config) {
		const {default: tailwindcss} = await import("@tailwindcss/vite");
		const {svelte} = await import("@sveltejs/vite-plugin-svelte");
		const {svgPlugin} = await import("../src/vite/svgPlugin.js");

		config.plugins = [svelte(), ...(config.plugins ?? []), tailwindcss(), svgPlugin("icon")];
		config.resolve = {
			...config.resolve,
			extensions: [".ts", ".js", ".svelte"],
			alias: {
				...(typeof config.resolve?.alias === "object" && !Array.isArray(config.resolve.alias)
					? config.resolve.alias
					: {}),
				"@": resolve(dirname, "../src"),
				"@juvofy/lib": resolve(dirname, "../src"),
			},
		};

		return config;
	},
};

export default config;

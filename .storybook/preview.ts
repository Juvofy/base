import "../src/app.tw.css";
import type {Preview} from "@storybook/svelte-vite";
import {themes} from "storybook/theming";

/**
 * Every story wraps its markup in `<App lang="...">` to provide the Dialog/Toast/locale
 * context, but that's plumbing, not part of the demo - strip it from the "Show code" preview.
 */
function stripAppWrapper(code: string): string {
	const lines = code.split("\n");

	if (!/^<App\b/.test(lines[0] ?? "")) {
		return code;
	}

	if (!/^<\/App>$/.test(lines.at(-1)?.trim() ?? "")) {
		return code;
	}

	return lines
		.slice(1, -1)
		.map(line => line.replace(/^\t/, ""))
		.join("\n");
}

const preview: Preview = {
	parameters: {
		layout: "padded",
		docs: {
			theme: themes.dark,
			source: {
				transform: stripAppWrapper,
			},
		},
	},
	tags: ["autodocs"],
};

export default preview;

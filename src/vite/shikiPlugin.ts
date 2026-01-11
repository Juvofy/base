import {readFile} from "fs/promises";
import {basename} from "path";
import {codeToHtml} from "shiki";
import type {Plugin} from "vite";
import type {Props} from "@juvofy/lib/components/aot/Shiki.svelte";
import {createAOTComponentPlugin} from "@juvofy/lib/vite/createAOTComponentPlugin";
import {resolveShikiLanguage} from "@juvofy/lib/vite/resolveShikiLanguage";

export function shikiPlugin(): Plugin {
	return createAOTComponentPlugin({
		name: "svelte-shiki-plugin",
		param: "shiki",
		source: "@juvofy/lib/components/aot/Shiki.svelte",
		async getVariables(ctx): Promise<Props["vars"]> {
			const theme = ctx.parameters.get("theme") ?? "github-dark-default";
			const code = await readFile(ctx.id, "utf-8");

			return {
				raw: await codeToHtml(code, {
					lang: resolveShikiLanguage(ctx.id),
					theme,
				}),
				filename: basename(ctx.id),
			};
		},
	});
}

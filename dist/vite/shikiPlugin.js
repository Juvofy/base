import { readFile } from "fs/promises";
import { basename } from "path";
import { codeToHtml } from "shiki";
import { createAOTComponentPlugin } from "@juvofy/lib/vite/createAOTComponentPlugin";
import { resolveShikiLanguage } from "@juvofy/lib/vite/resolveShikiLanguage";
export function shikiPlugin() {
    return createAOTComponentPlugin({
        name: "svelte-shiki-plugin",
        param: "shiki",
        source: "@juvofy/lib/components/aot/Shiki.svelte",
        async getVariables(ctx) {
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

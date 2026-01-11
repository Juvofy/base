import assert from "node:assert";
import { compile } from "svelte/compiler";
import { basename } from "node:path";
import { stripIndent } from "common-tags";
export function createAOTComponentPlugin({ source, param, name, ...hooks }) {
    const virtualFileNameSuffix = ".aot";
    const pathParamName = "__path";
    let dev = false;
    return {
        name,
        enforce: "pre",
        async load(id, opts) {
            const [filename, search] = id.split("?");
            if (!filename?.endsWith(virtualFileNameSuffix)) {
                return;
            }
            const parameters = new URLSearchParams(search);
            if (!parameters.has(param)) {
                return;
            }
            const resolvedFilePath = parameters.get(pathParamName);
            assert.ok(resolvedFilePath, "Do not use virtual files directly.");
            parameters.delete(pathParamName);
            const code = stripIndent `
				<script>
					import AOT from "${source}";
					const props = $props();
				</script>

				<AOT
					{...props}
					vars={${JSON.stringify(await hooks.getVariables.call(this, {
                id: resolvedFilePath,
                parameters,
            }))}}
				/>
			`;
            const { js, warnings } = compile(code, {
                generate: opts?.ssr ? "server" : "client",
                dev,
                filename,
                outputFilename: `${basename(filename)}.svelte`,
            });
            warnings.forEach(this.warn, this);
            return js;
        },
        async resolveId(source, importer, options) {
            const [filename, search] = source.split("?");
            if (!filename || !search) {
                return;
            }
            const parameters = new URLSearchParams(search);
            if (!parameters.has(param)) {
                return;
            }
            const resolved = await this.resolve(filename, importer, options);
            if (!resolved) {
                return;
            }
            parameters.set(pathParamName, resolved.id);
            return `${resolved.id}${virtualFileNameSuffix}?${parameters}`;
        },
        config(_, env) {
            dev = env.command === "serve";
        },
    };
}

import { readFile } from "node:fs/promises";
import { XMLBuilder, XMLParser } from "fast-xml-parser";
import { createAOTComponentPlugin } from "@juvofy/lib/vite/createAOTComponentPlugin";
const parserOptions = Object.freeze({
    attributesGroupName: "attributes",
    attributeNamePrefix: "",
    cdataPropName: "__cdata",
    ignoreDeclaration: true,
    ignorePiTags: true,
    ignoreAttributes: false,
});
const parser = new XMLParser(parserOptions);
const builder = new XMLBuilder(parserOptions);
/**
 * Not all <svg> attributes are supported by <symbol>
 * See https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/symbol#attributes
 * and https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/svg#attributes
 */
const bannedAttributeNames = ["version", "baseProfile"];
export function svgPlugin(param) {
    let iconId = 0;
    return createAOTComponentPlugin({
        param,
        source: "@juvofy/lib/components/aot/Svg.svelte",
        async getVariables(ctx) {
            const rawContent = await readFile(ctx.id, "utf-8");
            const parsed = parser.parse(rawContent);
            if (!parsed.svg) {
                throw new SyntaxError("Invalid SVG File: Missing root <svg> tag.");
            }
            const attributes = parsed.svg[parserOptions.attributesGroupName];
            if (typeof attributes === "string") {
                throw new SyntaxError("Invalid SVG File: <attributes> is not a valid tag.");
            }
            if (typeof attributes === "object") {
                for (const banned of bannedAttributeNames) {
                    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
                    delete attributes[banned];
                }
            }
            return {
                attributes: typeof attributes === "object" ? attributes : {},
                fileId: `svg${--iconId}`,
                raw: builder.build(parsed.svg),
            };
        },
        name: "svelte-svg-plugin",
    });
}

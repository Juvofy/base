import type { Plugin, Rollup } from "vite";
export interface AOTPluginContext {
    /**
     * The path of the file that is being processed.
     */
    id: string;
    /**
     * The parameters extracted from the URL.
     * (should include the `param` parameter set in the plugin options)
     */
    parameters: URLSearchParams;
}
export interface AOTPluginOptions<T> {
    /**
     * The name of the AOT component plugin, used for identification.
     */
    name: string;
    /**
     * The query parameter that triggers the  AOT component plugin. Does **not** include the leading `?`.
     */
    param: string;
    /**
     * The function that processes the original file content and optionally query parameters.
     * It should return variables that will be injected into the Svelte component.
     */
    getVariables(this: Rollup.PluginContext, ctx: AOTPluginContext): T | Promise<T>;
    /**
     * The path of the Svelte component that will be used as a template for the AOT component.
     * Vite must be able to resolve it from anywhere, so use an alias or an absolute specifier.
     *
     * @example
     * source: "/component/Comp.svelte"
     */
    source: string;
}
export declare function createAOTComponentPlugin<T>({ source, param, name, ...hooks }: AOTPluginOptions<T>): Plugin;

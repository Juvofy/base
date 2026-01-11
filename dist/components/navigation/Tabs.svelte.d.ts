import { type Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { SvelteMap } from "svelte/reactivity";
declare const variants: Record<"border" | "box" | "lift", import("svelte/elements").ClassValue>;
export interface Props extends HTMLAttributes<HTMLDivElement> {
    children: Snippet;
    variant?: keyof typeof variants;
    tab?: string;
    role?: undefined;
}
export interface Tabs {
    current: string;
    readonly tabs: string[];
    readonly listId: string;
    readonly panelId: string;
    readonly content: SvelteMap<string, Snippet>;
}
declare const getTabContext: () => {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<Props>): void;
};
export { getTabContext };
declare const Tabs: import("svelte").Component<Props, {}, "tab">;
type Tabs = ReturnType<typeof Tabs>;
export default Tabs;

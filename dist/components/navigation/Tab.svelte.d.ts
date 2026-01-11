import type { Snippet } from "svelte";
import type { HTMLButtonAttributes } from "svelte/elements";
export interface Props extends HTMLButtonAttributes {
    id: string;
    label: string | Snippet;
    children: Snippet;
    tab?: string;
    type?: undefined;
    role?: undefined;
}
declare const Tab: import("svelte").Component<Props, {}, "">;
type Tab = ReturnType<typeof Tab>;
export default Tab;

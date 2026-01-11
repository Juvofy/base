import { tw } from "@juvofy/lib/utils/tw";
import type { Snippet } from "svelte";
import type { HTMLDetailsAttributes } from "svelte/elements";
declare const icons: tw.Prefixed<["collapse-arrow", "collapse-plus"], tw.PrefixedMap<["collapse-arrow", "collapse-plus"], "collapse">>;
export interface Props extends HTMLDetailsAttributes {
    children?: never;
    content: Snippet;
    label: Snippet;
    icon?: tw.InferPrefixed<typeof icons>;
}
declare const Accordion: import("svelte").Component<Props, {}, "">;
type Accordion = ReturnType<typeof Accordion>;
export default Accordion;

import { tw } from "@juvofy/lib/utils/tw";
import type { Snippet } from "svelte";
import type { HTMLAnchorAttributes, HTMLButtonAttributes } from "svelte/elements";
declare const variants: tw.Prefixed<["btn-primary", "btn-secondary", "btn-warning", "btn-success", "btn-accent", "btn-info", "btn-neutral", "btn-error"], tw.PrefixedMap<["btn-primary", "btn-secondary", "btn-warning", "btn-success", "btn-accent", "btn-info", "btn-neutral", "btn-error"], "btn">>;
declare const sizes: tw.Prefixed<["btn-xs", "btn-sm", "btn-md", "btn-lg", "btn-xl"], tw.PrefixedMap<["btn-xs", "btn-sm", "btn-md", "btn-lg", "btn-xl"], "btn">>;
export type Props = (HTMLButtonAttributes | (HTMLAnchorAttributes & {
    type: "link";
})) & {
    children: Snippet;
    variant?: tw.InferPrefixed<typeof variants>;
    size?: tw.InferPrefixed<typeof sizes>;
};
declare const Button: import("svelte").Component<Props, {}, "">;
type Button = ReturnType<typeof Button>;
export default Button;

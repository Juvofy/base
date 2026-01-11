import { tw } from "@juvofy/lib/utils/tw";
import type { HTMLAttributes } from "svelte/elements";
declare const variants: tw.Prefixed<["badge-primary", "badge-secondary", "badge-warning", "badge-success", "badge-accent", "badge-info", "badge-neutral", "badge-error"], tw.PrefixedMap<["badge-primary", "badge-secondary", "badge-warning", "badge-success", "badge-accent", "badge-info", "badge-neutral", "badge-error"], "badge">>;
declare const sizes: tw.Prefixed<["badge-xs", "badge-sm", "badge-md", "badge-lg", "badge-xl"], tw.PrefixedMap<["badge-xs", "badge-sm", "badge-md", "badge-lg", "badge-xl"], "badge">>;
declare const decorations: tw.Prefixed<["badge-outline", "badge-dash", "badge-soft", "badge-ghost"], tw.PrefixedMap<["badge-outline", "badge-dash", "badge-soft", "badge-ghost"], "badge">>;
export interface Props extends HTMLAttributes<HTMLSpanElement> {
    variant?: tw.InferPrefixed<typeof variants>;
    size?: tw.InferPrefixed<typeof sizes>;
    decoration?: tw.InferPrefixed<typeof decorations>;
}
declare const Badge: import("svelte").Component<Props, {}, "">;
type Badge = ReturnType<typeof Badge>;
export default Badge;

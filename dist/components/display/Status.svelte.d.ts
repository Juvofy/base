import { tw } from "@juvofy/lib/utils/tw.ts";
import type { HTMLAttributes } from "svelte/elements";
declare const variants: tw.Prefixed<["status-primary", "status-secondary", "status-warning", "status-success", "status-accent", "status-info", "status-neutral", "status-error"], tw.PrefixedMap<["status-primary", "status-secondary", "status-warning", "status-success", "status-accent", "status-info", "status-neutral", "status-error"], "status">>;
declare const sizes: tw.Prefixed<["status-xs", "status-sm", "status-md", "status-lg", "status-xl"], tw.PrefixedMap<["status-xs", "status-sm", "status-md", "status-lg", "status-xl"], "status">>;
export interface Props extends HTMLAttributes<HTMLSpanElement> {
    children?: never;
    variant?: tw.InferPrefixed<typeof variants>;
    size?: tw.InferPrefixed<typeof sizes>;
}
declare const Status: import("svelte").Component<Props, {}, "">;
type Status = ReturnType<typeof Status>;
export default Status;

import { tw } from "@juvofy/lib/utils/tw";
import type { HTMLInputAttributes } from "svelte/elements";
declare const variants: tw.Prefixed<["range-primary", "range-secondary", "range-warning", "range-success", "range-accent", "range-info", "range-neutral", "range-error"], tw.PrefixedMap<["range-primary", "range-secondary", "range-warning", "range-success", "range-accent", "range-info", "range-neutral", "range-error"], "range">>;
declare const sizes: tw.Prefixed<["range-xs", "range-sm", "range-md", "range-lg", "range-xl"], tw.PrefixedMap<["range-xs", "range-sm", "range-md", "range-lg", "range-xl"], "range">>;
export interface Props extends Omit<HTMLInputAttributes, "size"> {
    type?: "range";
    group?: never;
    checked?: never;
    variant?: tw.InferPrefixed<typeof variants>;
    size?: tw.InferPrefixed<typeof sizes>;
    input?: HTMLInputElement;
}
declare const Slider: import("svelte").Component<Props, {}, "value" | "input">;
type Slider = ReturnType<typeof Slider>;
export default Slider;

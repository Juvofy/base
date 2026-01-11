import type { HTMLInputAttributes } from "svelte/elements";
import DualRangeInput from "@stanko/dual-range-input";
import { tw } from "@juvofy/lib/utils/tw.ts";
declare class DoubleRangeSlider extends DualRangeInput {
    update(method?: "floor" | "ceil"): void;
    private updateInputProgressValue;
}
declare const variants: tw.Prefixed<["range-primary", "range-secondary", "range-warning", "range-success", "range-accent", "range-info", "range-neutral", "range-error"], tw.PrefixedMap<["range-primary", "range-secondary", "range-warning", "range-success", "range-accent", "range-info", "range-neutral", "range-error"], "range">>;
export interface Props extends HTMLInputAttributes {
    type?: "range";
    placeholder?: never;
    pattern?: never;
    value?: [number, number];
    variant?: tw.InferPrefixed<typeof variants>;
}
export default DoubleRangeSlider;

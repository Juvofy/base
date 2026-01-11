import { tw } from "@juvofy/lib/utils/tw";
import type { HTMLAttributes } from "svelte/elements";
declare const variants: tw.Prefixed<["box-primary", "box-secondary", "box-warning", "box-success", "box-accent", "box-info", "box-neutral", "box-error"], tw.PrefixedMap<["box-primary", "box-secondary", "box-warning", "box-success", "box-accent", "box-info", "box-neutral", "box-error"], "box">>;
declare const countdownUnits: readonly ["days", "hours", "minutes", "seconds"];
export type CountdownUnit = (typeof countdownUnits)[number];
export interface Props extends HTMLAttributes<HTMLDivElement> {
    value: Partial<Record<CountdownUnit, number>> | {
        till: Date;
    };
    variant?: tw.InferPrefixed<typeof variants>;
}
declare const Countdown: import("svelte").Component<Props, {}, "">;
type Countdown = ReturnType<typeof Countdown>;
export default Countdown;

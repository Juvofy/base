import type { HTMLAttributes } from "svelte/elements";
export interface Props extends HTMLAttributes<HTMLSpanElement> {
    value: number;
    digits?: number;
    interval?: number;
}
declare const CountdownDigit: import("svelte").Component<Props, {}, "value">;
type CountdownDigit = ReturnType<typeof CountdownDigit>;
export default CountdownDigit;

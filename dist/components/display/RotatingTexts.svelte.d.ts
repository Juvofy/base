import type { HTMLAttributes } from "svelte/elements";
export interface Props extends HTMLAttributes<HTMLSpanElement> {
    texts: [string] | [string, string] | [string, string, string] | [string, string, string, string] | [string, string, string, string, string] | [string, string, string, string, string, string];
}
declare const RotatingTexts: import("svelte").Component<Props, {}, "">;
type RotatingTexts = ReturnType<typeof RotatingTexts>;
export default RotatingTexts;

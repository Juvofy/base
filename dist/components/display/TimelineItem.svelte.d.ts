import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
export interface Props extends HTMLAttributes<HTMLLIElement> {
    start: Snippet;
    middle: Snippet;
    end: Snippet;
    children?: never;
    box?: "start" | "end" | "both" | "none";
}
declare const TimelineItem: import("svelte").Component<Props, {}, "">;
type TimelineItem = ReturnType<typeof TimelineItem>;
export default TimelineItem;

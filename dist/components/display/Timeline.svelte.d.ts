import { tw } from "@juvofy/lib/utils/tw";
import type { HTMLAttributes } from "svelte/elements";
declare const directions: tw.Prefixed<["timeline-horizontal", "timeline-vertical"], tw.PrefixedMap<["timeline-horizontal", "timeline-vertical"], "timeline">>;
export interface Props extends HTMLAttributes<HTMLUListElement> {
    direction?: tw.InferPrefixed<typeof directions>;
    snap?: boolean;
    compact?: boolean;
}
declare const Timeline: import("svelte").Component<Props, {}, "">;
type Timeline = ReturnType<typeof Timeline>;
export default Timeline;

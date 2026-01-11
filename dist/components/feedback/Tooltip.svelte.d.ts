import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
declare const placements: Record<"left" | "top" | "right" | "bottom", import("svelte/elements").ClassValue>;
export interface Props extends HTMLAttributes<HTMLDivElement> {
    placement: keyof typeof placements;
    content: string | Snippet;
    children: Snippet;
}
declare const Tooltip: import("svelte").Component<Props, {}, "">;
type Tooltip = ReturnType<typeof Tooltip>;
export default Tooltip;

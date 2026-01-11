import type { HTMLAttributes } from "svelte/elements";
import { type Props as BadgeProps } from "../display/Badge.svelte";
type BadgeVariant = Exclude<BadgeProps["variant"], undefined>;
export interface Props extends HTMLAttributes<HTMLDivElement> {
    options: string[];
    value?: string[];
    placeholder?: string;
    searchLabel?: string;
    nothingFoundLabel?: string;
    variant?: BadgeVariant;
}
declare const Combobox: import("svelte").Component<Props, {}, "value">;
type Combobox = ReturnType<typeof Combobox>;
export default Combobox;

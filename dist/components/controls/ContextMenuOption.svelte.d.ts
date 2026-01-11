import type { Snippet } from "svelte";
import type { HTMLButtonAttributes } from "svelte/elements";
export interface BaseProps extends HTMLButtonAttributes {
    onclick?: undefined;
    type?: undefined;
}
export interface PropsWithoutSubmenu extends BaseProps {
    children: Snippet;
    content?: undefined;
    submenu?: undefined;
    onuse?(this: void): void;
}
export interface PropsWithSubmenu extends BaseProps {
    children?: undefined;
    content: Snippet;
    submenu: Snippet;
    onuse?: undefined;
}
export type Props = PropsWithSubmenu | PropsWithoutSubmenu;
declare const ContextMenuOption: import("svelte").Component<Props, {}, "">;
type ContextMenuOption = ReturnType<typeof ContextMenuOption>;
export default ContextMenuOption;

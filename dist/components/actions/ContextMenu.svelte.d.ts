import { type Snippet } from "svelte";
import { SvelteMap } from "svelte/reactivity";
import type { Attachment } from "svelte/attachments";
export interface ContextMenuInterface {
    contextMenu: Attachment<HTMLElement>;
    close: VoidFunction;
    open(this: void, x: number, y: number): void;
}
export interface Props {
    content: Snippet<[ContextMenuInterface]>;
    menu: Snippet;
    children?: undefined;
    oncontextmenu?: undefined;
}
export type SubmenuData = [content: Snippet, opener?: HTMLButtonElement];
export declare const MIN_SCREEN_OFFSET = 4;
declare const getSubmenu: () => SvelteMap<string, SubmenuData>;
export { getSubmenu };
declare const ContextMenu: import("svelte").Component<Props, {
    open: (x: number, y: number) => void;
    close: () => void;
}, "">;
type ContextMenu = ReturnType<typeof ContextMenu>;
export default ContextMenu;

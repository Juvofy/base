import type { Attachment } from "svelte/attachments";
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
declare const Dropdown: import("svelte").Component<HTMLAttributes<HTMLUListElement> & {
    children?: never;
    name?: never;
    content: Snippet;
    root?: HTMLUListElement;
    button: Snippet<[{
        popover: Attachment<HTMLButtonElement>;
        anchorName: string;
    }]>;
}, {}, "root">;
type Dropdown = ReturnType<typeof Dropdown>;
export default Dropdown;

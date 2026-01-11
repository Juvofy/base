import Folder from "@material-symbols/svg-400/rounded/folder.svg?icon";
import type { Component } from "svelte";
import type { HTMLAttributes, MouseEventHandler } from "svelte/elements";
type File = {
    name: string;
    onclick?: MouseEventHandler<HTMLButtonElement>;
};
type Folder = {
    name: string;
    content: (File | Folder)[];
};
export interface Props extends HTMLAttributes<HTMLUListElement> {
    content: Folder["content"];
    children?: never;
}
declare const FileTree: Component<Props, {}, "">;
type FileTree = ReturnType<typeof FileTree>;
export default FileTree;

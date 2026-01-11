import type { HTMLAttributes } from "svelte/elements";
export interface Props extends HTMLAttributes<HTMLDivElement> {
    files?: File[];
}
declare const FileUploader: import("svelte").Component<Props, {}, "files">;
type FileUploader = ReturnType<typeof FileUploader>;
export default FileUploader;

import type { HTMLAttributes } from "svelte/elements";
export interface Props extends HTMLAttributes<HTMLDivElement> {
    vars: {
        raw: string;
        filename: string;
    };
}
declare const Shiki: import("svelte").Component<Props, {}, "">;
type Shiki = ReturnType<typeof Shiki>;
export default Shiki;

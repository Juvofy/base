import type { HTMLAttributes, MouseEventHandler } from "svelte/elements";
import type { Snippet } from "svelte";
/**
 * Map of input types to their options.
 */
export interface Inputs {
    none: [boolean, Record<never, never>];
    file: [FileList, FileOptions];
    range: [number, NumberOptions];
    number: [number, NumberOptions];
    tel: [string, TextOptions];
    text: [string, TextOptions];
    email: [string, TextOptions];
    search: [string, TextOptions];
    password: [string, TextOptions];
    radio: [string, SelectionOptions];
    select: [string, SelectionOptions];
    textarea: [string, TextareaOptions];
    checkbox: [string[], SelectionOptions];
    toggle: [string[], SelectionOptions];
}
export interface CommonInputOptions {
}
export type DialogOptions<I extends keyof Inputs = keyof Inputs> = {
    type: I;
    closeWhenBackdropClicked?: boolean;
    inputOptions?: Inputs[I][1];
    title?: string | Snippet;
    value?: Inputs[I][0];
    body?: string | Snippet;
    cancelButton?: string | boolean | Snippet;
    confirmButton?: string | boolean | Snippet;
};
export interface FileOptions {
    accept?: string;
    multiple?: boolean;
}
export interface NumberOptions {
    min?: number;
    max?: number;
    step?: number;
    placeholder?: string;
}
export interface TextareaOptions {
    rows?: number;
    cols?: number;
    placeholder?: string;
}
export interface TextOptions {
    /**
     * Regular expression used to validate the input
     */
    pattern?: RegExp;
    placeholder?: string;
}
export interface SelectionOptions {
    [x: string]: string;
}
export interface Props extends HTMLAttributes<HTMLDialogElement> {
    element?: HTMLDialogElement;
    onclick?: undefined;
    children?: undefined;
}
export declare const escapeOnBackdrop: MouseEventHandler<HTMLDialogElement>;
declare const Dialog: import("svelte").Component<Props, {
    close: () => void;
    cancel: () => void;
    isOpen: () => boolean;
    fire: <I extends keyof Inputs = "none">({ type, ...dialogOptions }: Partial<DialogOptions<I>>) => Promise<false | Inputs[I][0]>;
}, "element">;
type Dialog = ReturnType<typeof Dialog>;
export default Dialog;

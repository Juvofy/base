import { tw } from "@juvofy/lib/utils/tw";
import type { HTMLAttributes } from "svelte/elements";
declare const variants: tw.Prefixed<["alert-warning", "alert-success", "alert-info", "alert-error"], tw.PrefixedMap<["alert-warning", "alert-success", "alert-info", "alert-error"], "alert">>;
export interface ToastItem {
    variant?: tw.InferPrefixed<typeof variants>;
    text: string;
}
export interface Props extends HTMLAttributes<HTMLDivElement> {
    children?: never;
}
declare const Toast: import("svelte").Component<Props, {
    addToQueue: (item: ToastItem, timeout?: number) => void;
}, "">;
type Toast = ReturnType<typeof Toast>;
export default Toast;

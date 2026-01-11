import { type Snippet } from "svelte";
import "./app.tw.css";
export declare class AppState {
    toast: {
        $on?(type: string, callback: (e: any) => void): () => void;
        $set?(props: Partial<import("./components/feedback/Toast.svelte").Props>): void;
    } & {
        addToQueue: (item: import("./components/feedback/Toast.svelte").ToastItem, timeout?: number) => void;
    };
    dialog: {
        $on?(type: string, callback: (e: any) => void): () => void;
        $set?(props: Partial<import("./components/actions/Dialog.svelte").Props>): void;
    } & {
        close: () => void;
        cancel: () => void;
        isOpen: () => boolean;
        fire: <I extends keyof import("./components/actions/Dialog.svelte").Inputs = "none">({ type, ...dialogOptions }: Partial<import("./components/actions/Dialog.svelte").DialogOptions<I>>) => Promise<false | import("./components/actions/Dialog.svelte").Inputs[I][0]>;
    };
    theme: string;
}
declare const getApp: () => AppState;
export { getApp };
declare const getLocale: () => string;
export { getLocale };
type $$ComponentProps = {
    children: Snippet;
};
declare const App: import("svelte").Component<$$ComponentProps, {}, "">;
type App = ReturnType<typeof App>;
export default App;

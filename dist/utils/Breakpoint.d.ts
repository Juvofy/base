import { MediaQuery } from "svelte/reactivity";
import defaultTheme from "tailwindcss/defaultTheme";
export type BreakpointName = keyof typeof defaultTheme.screens;
export type BreakpointConfig = {
    up?: BreakpointName;
    down: BreakpointName;
} | {
    up: BreakpointName;
    down?: BreakpointName;
} | {
    exact: BreakpointName;
};
export declare class Breakpoint extends MediaQuery {
    constructor(config: BreakpointConfig);
    static buildMediaQuery(config: BreakpointConfig): string;
}

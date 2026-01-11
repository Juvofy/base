import { MediaQuery } from "svelte/reactivity";
import defaultTheme from "tailwindcss/defaultTheme";
export class Breakpoint extends MediaQuery {
    constructor(config) {
        super(Breakpoint.buildMediaQuery(config));
    }
    static buildMediaQuery(config) {
        const conditions = ["screen"];
        if ("exact" in config) {
            conditions.push(`(width: ${defaultTheme.screens[config.exact]})`);
        }
        else {
            if (config.down) {
                conditions.push(`(min-width: ${defaultTheme.screens[config.down]})`);
            }
            if (config.up) {
                conditions.push(`(max-width: ${defaultTheme.screens[config.up]})`);
            }
        }
        return conditions.join(" and ");
    }
}

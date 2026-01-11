import {MediaQuery} from "svelte/reactivity";
import defaultTheme from "tailwindcss/defaultTheme";

export type BreakpointName = keyof typeof defaultTheme.screens;
export type BreakpointConfig =
	| {up?: BreakpointName; down: BreakpointName}
	| {up: BreakpointName; down?: BreakpointName}
	| {exact: BreakpointName};

export class Breakpoint extends MediaQuery {
	constructor(config: BreakpointConfig) {
		super(Breakpoint.buildMediaQuery(config));
	}

	static buildMediaQuery(config: BreakpointConfig) {
		const conditions = ["screen"];
		if ("exact" in config) {
			conditions.push(`(width: ${defaultTheme.screens[config.exact]})`);
		} else {
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

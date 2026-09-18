import {MediaQuery} from "svelte/reactivity";
import defaultTheme from "tailwindcss/defaultTheme";

/** Name of a Tailwind screen size (`"sm"`, `"md"`, `"lg"`, ...), taken from `tailwindcss/defaultTheme`. */
export type BreakpointName = keyof typeof defaultTheme.screens;

/**
 * Describes the range a {@link Breakpoint} should match.
 *
 * - `down` sets the lower bound (`min-width`) - the viewport must be at least this wide.
 * - `up` sets the upper bound (`max-width`) - the viewport must be at most this wide.
 * - `exact` matches only that single breakpoint's width, ignoring `up`/`down`.
 */
export type BreakpointConfig =
	| {up?: BreakpointName; down: BreakpointName}
	| {up: BreakpointName; down?: BreakpointName}
	| {exact: BreakpointName};

/**
 * A reactive Tailwind breakpoint matcher, built on Svelte's `MediaQuery`. Its `.current`
 * property (inherited from `MediaQuery`) updates automatically as the viewport is resized.
 *
 * @example
 * ```svelte
 * <script lang="ts">
 *   import {Breakpoint} from "@juvofy/lib/utils/Breakpoint";
 *
 *   // true once the viewport is at least "md" wide.
 *   const isDesktop = new Breakpoint({down: "md"});
 * </script>
 *
 * {#if isDesktop.current}
 *   <DesktopNav />
 * {:else}
 *   <MobileNav />
 * {/if}
 * ```
 */
export class Breakpoint extends MediaQuery {
	constructor(config: BreakpointConfig) {
		super(Breakpoint.buildMediaQuery(config));
	}

	/** Builds the raw `@media` condition string (without `@media`) used by a {@link Breakpoint}. */
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

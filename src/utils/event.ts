import type {Attachment} from "svelte/attachments";
import type {EventHandler} from "svelte/elements";
import {on} from "svelte/events";

/**
 * Creates a Svelte attachment that listens for `event` on the element it's attached to, for as
 * long as the attachment stays mounted. A thin wrapper around `svelte/events`'s `on`, but usable
 * with the `{@attach ...}` syntax instead of an action, and with `element.tagName`-appropriate
 * event map overloads for HTML/SVG/MathML elements.
 *
 * @param event The DOM event name to listen for (e.g. `"click"`, `"pointerdown"`).
 * @param action Handler called with the event. Omit it to attach nothing (useful when the
 * handler is conditional).
 * @returns A Svelte `Attachment` to use with `{@attach event(...)}`.
 *
 * @example
 * ```svelte
 * <script lang="ts">
 *   import {event} from "@juvofy/lib/utils/event";
 * </script>
 *
 * <button {@attach event("click", () => console.log("clicked"))}>Click me</button>
 * ```
 */
export function event<E extends keyof HTMLElementEventMap, T extends HTMLElement>(
	event: E,
	action?: EventHandler<HTMLElementEventMap[E], T>,
): Attachment<T>;
export function event<E extends keyof SVGElementEventMap, T extends SVGElement>(
	event: E,
	action?: EventHandler<SVGElementEventMap[E], T>,
): Attachment<T>;
export function event<E extends keyof MathMLElementEventMap, T extends MathMLElement>(
	event: E,
	action?: EventHandler<MathMLElementEventMap[E], T>,
): Attachment<T>;
export function event<E extends string, T extends Element>(
	event: E,
	action?: EventHandler<Event, T>,
): Attachment<T>;
export function event(event: string, action?: EventHandler): Attachment {
	return function (element: Element) {
		return action && on(element, event, action as EventListener);
	};
}

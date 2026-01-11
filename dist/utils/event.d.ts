import type { Attachment } from "svelte/attachments";
import type { EventHandler } from "svelte/elements";
export declare function event<E extends keyof HTMLElementEventMap, T extends HTMLElement>(event: E, action?: EventHandler<HTMLElementEventMap[E], T>): Attachment<T>;
export declare function event<E extends keyof SVGElementEventMap, T extends SVGElement>(event: E, action?: EventHandler<SVGElementEventMap[E], T>): Attachment<T>;
export declare function event<E extends keyof MathMLElementEventMap, T extends MathMLElement>(event: E, action?: EventHandler<MathMLElementEventMap[E], T>): Attachment<T>;
export declare function event<E extends string, T extends Element>(event: E, action?: EventHandler<Event, T>): Attachment<T>;

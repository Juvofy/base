/// <reference types="svelte" />
/// <reference types="vite/client" />

declare module "*?icon" {
	import type {Component} from "svelte";
	import type {SVGAttributes} from "svelte/elements";

	const Icon: Component<SVGAttributes<SVGSVGElement>>;
	export default Icon;
}

declare module "*?shiki" {
	import type {Component} from "svelte";
	import type {HTMLAttributes} from "svelte/elements";

	const Icon: Component<HTMLAttributes<HTMLDivElement>>;
	export default Icon;
}

declare module "*&shiki" {
	export {default} from "?shiki";
}

/// <reference types="svelte" />
/// <reference types="vite/client" />

declare module "*?icon" {
	import type {IconComponent} from "@juvofy/lib/components/IconComponent";

	const Icon: IconComponent;
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

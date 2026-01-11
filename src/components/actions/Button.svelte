<script lang="ts" module>
	import {tw} from "@juvofy/lib/utils/tw";
	import type {Snippet} from "svelte";
	import type {HTMLAnchorAttributes, HTMLButtonAttributes} from "svelte/elements";

	const variants = tw.prefixed(
		"btn-primary",
		"btn-secondary",
		"btn-warning",
		"btn-success",
		"btn-accent",
		"btn-info",
		"btn-neutral",
		"btn-error",
	);

	const sizes = tw.prefixed("btn-xs", "btn-sm", "btn-md", "btn-lg", "btn-xl");

	export type Props = (HTMLButtonAttributes | (HTMLAnchorAttributes & {type: "link"})) & {
		children: Snippet;
		variant?: tw.InferPrefixed<typeof variants>;
		size?: tw.InferPrefixed<typeof sizes>;
	};
</script>

<script lang="ts">
	const {variant, size, class: customClass, children, ...props}: Props = $props();
</script>

{#if props.type === "link"}
	<a {...props} class={["btn", variants(variant), sizes(size), customClass]}>
		{@render children()}
	</a>
{:else}
	<button type="button" {...props} class={["btn", variants(variant), sizes(size), customClass]}>
		{@render children()}
	</button>
{/if}

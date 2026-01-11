<script lang="ts" module>
	import {tw} from "@juvofy/lib/utils/tw";
	import type {HTMLAttributes} from "svelte/elements";

	const variants = tw.prefixed(
		"badge-primary",
		"badge-secondary",
		"badge-warning",
		"badge-success",
		"badge-accent",
		"badge-info",
		"badge-neutral",
		"badge-error",
	);
	const sizes = tw.prefixed("badge-xs", "badge-sm", "badge-md", "badge-lg", "badge-xl");
	const decorations = tw.prefixed("badge-outline", "badge-dash", "badge-soft", "badge-ghost");

	export interface Props extends HTMLAttributes<HTMLSpanElement> {
		variant?: tw.InferPrefixed<typeof variants>;
		size?: tw.InferPrefixed<typeof sizes>;
		decoration?: tw.InferPrefixed<typeof decorations>;
	}
</script>

<script lang="ts">
	const {variant, size, decoration, class: customClass, children, ...props}: Props = $props();
</script>

<span {...props} class={[customClass, "badge", variants(variant), sizes(size), decorations(decoration)]}>
	{@render children?.()}
</span>

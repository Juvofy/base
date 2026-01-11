<script lang="ts" module>
	import {tw} from "@juvofy/lib/utils/tw";
	import type {HTMLAttributes} from "svelte/elements";
	import type {Snippet} from "svelte";

	const sizes = tw.prefixed("card-xs", "card-sm", "card-md", "card-lg", "card-xl");
	const decorations = tw.prefixed("card-border", "card-dash");

	export interface Props extends HTMLAttributes<HTMLDivElement> {
		image?: Snippet;
		decoration?: tw.InferPrefixed<typeof decorations>;
		size?: tw.InferPrefixed<typeof sizes>;
	}
</script>

<script lang="ts">
	const {children, image, class: customClass, decoration, size, ...props}: Props = $props();
</script>

<div {...props} class={[customClass, "card", sizes(size), decorations(decoration)]}>
	<figure>
		{@render image?.()}
	</figure>
	<div class="card-body">
		{@render children?.()}
	</div>
</div>

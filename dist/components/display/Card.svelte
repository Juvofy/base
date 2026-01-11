<script lang="ts" module>import { tw } from "@juvofy/lib/utils/tw";
const sizes = tw.prefixed("card-xs", "card-sm", "card-md", "card-lg", "card-xl");
const decorations = tw.prefixed("card-border", "card-dash");
</script>

<script lang="ts">const { children, image, class: customClass, decoration, size, ...props } = $props();
</script>

<div {...props} class={[customClass, "card", sizes(size), decorations(decoration)]}>
	<figure>
		{@render image?.()}
	</figure>
	<div class="card-body">
		{@render children?.()}
	</div>
</div>

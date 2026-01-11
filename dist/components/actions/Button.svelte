<script lang="ts" module>import { tw } from "@juvofy/lib/utils/tw";
const variants = tw.prefixed(
  "btn-primary",
  "btn-secondary",
  "btn-warning",
  "btn-success",
  "btn-accent",
  "btn-info",
  "btn-neutral",
  "btn-error"
);
const sizes = tw.prefixed("btn-xs", "btn-sm", "btn-md", "btn-lg", "btn-xl");
</script>

<script lang="ts">const { variant, size, class: customClass, children, ...props } = $props();
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

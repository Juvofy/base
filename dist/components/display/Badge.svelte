<script lang="ts" module>import { tw } from "@juvofy/lib/utils/tw.ts";
const variants = tw.prefixed(
  "badge-primary",
  "badge-secondary",
  "badge-warning",
  "badge-success",
  "badge-accent",
  "badge-info",
  "badge-neutral",
  "badge-error"
);
const sizes = tw.prefixed("badge-xs", "badge-sm", "badge-md", "badge-lg", "badge-xl");
const decorations = tw.prefixed("badge-outline", "badge-dash", "badge-soft", "badge-ghost");
</script>

<script lang="ts">const { variant, size, decoration, class: customClass, children, ...props } = $props();
</script>

<span {...props} class={[customClass, "badge", variants(variant), sizes(size), decorations(decoration)]}>
	{@render children?.()}
</span>

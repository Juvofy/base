<script lang="ts" module>import { tw } from "@juvofy/lib/utils/tw.ts";
const variants = tw.prefixed(
  "status-primary",
  "status-secondary",
  "status-warning",
  "status-success",
  "status-accent",
  "status-info",
  "status-neutral",
  "status-error"
);
const sizes = tw.prefixed("status-xs", "status-sm", "status-md", "status-lg", "status-xl");
</script>

<script lang="ts">const { variant, size, class: customClass, ...props } = $props();
</script>

<span {...props} class={[customClass, "status", variants(variant), sizes(size)]}></span>

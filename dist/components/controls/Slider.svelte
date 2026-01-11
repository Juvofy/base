<script lang="ts" module>import { tw } from "@juvofy/lib/utils/tw";
const variants = tw.prefixed(
  "range-primary",
  "range-secondary",
  "range-warning",
  "range-success",
  "range-accent",
  "range-info",
  "range-neutral",
  "range-error"
);
const sizes = tw.prefixed("range-xs", "range-sm", "range-md", "range-lg", "range-xl");
</script>

<script lang="ts">let {
  value = $bindable(),
  input = $bindable(),
  type = "range",
  size,
  variant,
  class: customClass,
  ...rest
} = $props();
const min = $derived(Number(rest.min ?? 0));
const max = $derived(Number(rest.max ?? 100));
const progressValue = $derived((value - min) / (max - min) * 100);
</script>

<input
	{...rest}
	{type}
	bind:value
	bind:this={input}
	class={["range range-thin", variants(variant), sizes(size), customClass]}
	style:--progress-value="{progressValue}%"
/>

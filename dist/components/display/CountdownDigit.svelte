<script lang="ts" module></script>

<script lang="ts">let { value = $bindable(), interval, digits, class: customClass } = $props();
let timeoutId = NaN;
$effect(() => {
  if (interval !== void 0) {
    timeoutId = window.setInterval(() => {
      value--;
    }, interval);
  }
  return () => {
    window.clearInterval(timeoutId);
  };
});
</script>

<span class={[customClass, "countdown"]}>
	<span style:--value={value} style:--digits={digits} aria-live="polite" aria-label={value.toString()}>
		{value}
	</span>
</span>

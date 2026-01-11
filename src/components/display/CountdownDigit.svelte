<script lang="ts" module>
	import type {HTMLAttributes} from "svelte/elements";

	export interface Props extends HTMLAttributes<HTMLSpanElement> {
		value: number;
		digits?: number;
		interval?: number;
	}
</script>

<script lang="ts">
	let {value = $bindable(), interval, digits, class: customClass}: Props = $props();
	let timeoutId = NaN;

	$effect(() => {
		if (interval !== undefined) {
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

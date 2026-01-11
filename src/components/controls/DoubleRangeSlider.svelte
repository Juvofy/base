<script lang="ts" module>
	import type {HTMLInputAttributes} from "svelte/elements";
	import DualRangeInput from "@stanko/dual-range-input";
	import {tw} from "@juvofy/lib/utils/tw.ts";

	class DoubleRangeSlider extends DualRangeInput {
		override update(method?: "floor" | "ceil"): void {
			super.update(method);
			this.updateInputProgressValue(this.$min);
			this.updateInputProgressValue(this.$max);
		}

		private updateInputProgressValue(input: HTMLInputElement) {
			const min = Number(input.min);
			const max = Number(input.max || "100");
			const value = Number(input.value);
			input.style.setProperty("--progress-value", `${((value - min) / (max - min)) * 100}%`);
		}
	}

	const variants = tw.prefixed(
		"range-primary",
		"range-secondary",
		"range-warning",
		"range-success",
		"range-accent",
		"range-info",
		"range-neutral",
		"range-error",
	);

	export interface Props extends HTMLInputAttributes {
		type?: "range";
		placeholder?: never;
		pattern?: never;
		value?: [number, number];
		variant?: tw.InferPrefixed<typeof variants>;
	}
</script>

<script lang="ts">
	const {
		min,
		max,
		variant,
		style,
		type = "range",
		value = $bindable([Number(min ?? 0), Number(max ?? 100)]),
		class: customClass,
		...props
	}: Props = $props();

	let minInput = $state<HTMLInputElement>();
	let maxInput = $state<HTMLInputElement>();

	$effect(() => {
		if (!minInput || !maxInput) {
			return;
		}
		const dri = new DoubleRangeSlider(minInput, maxInput);
		return () => dri.destroy();
	});
</script>

<div
	class={[customClass, variants(variant), "range inline-flex"]}
	style:padding-inline-end="calc(var(--range-thumb-size) * 2)"
	style:--dri-thumb-width="var(--range-thumb-size)"
	{style}
>
	<input
		{...props}
		class="range range-thin w-[unset] rounded-r-none shrink-0"
		style="--range-dir: -1;"
		min={min ?? 0}
		max={max ?? 100}
		{type}
		bind:this={minInput}
		bind:value={value[0]}
	/>
	<input
		{...props}
		class="range range-thin w-[unset] rounded-l-none shrink-0"
		min={min ?? 0}
		max={max ?? 100}
		{type}
		bind:this={maxInput}
		bind:value={value[1]}
	/>
</div>

<style>
	input.rounded-r-none::-webkit-slider-runnable-track {
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
	}

	input.rounded-l-none::-webkit-slider-runnable-track {
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
	}

	input.rounded-r-none::-moz-range-track {
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
	}

	input.rounded-l-none::-moz-range-track {
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
	}

	input.rounded-r-none::-ms-track {
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
	}

	input.rounded-l-none::-ms-track {
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
	}
</style>

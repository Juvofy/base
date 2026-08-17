<script module>
	import {defineMeta} from "@storybook/addon-svelte-csf";
	import App from "../App.svelte";
	import DoubleRangeSlider from "@juvofy/lib/components/controls/DoubleRangeSlider.svelte";

	const {Story} = defineMeta({
		title: "Controls/DoubleRangeSlider",
		argTypes: {
			variant: {
				control: "select",
				options: [
					undefined,
					"primary",
					"secondary",
					"warning",
					"success",
					"accent",
					"info",
					"neutral",
					"error",
				],
			},
			min: {control: "number"},
			max: {control: "number"},
		},
	});
</script>

<script lang="ts">
	let priceRange = $state<[number, number]>([200, 800]);
</script>

<Story name="Price Filter">
	<App lang="en">
		<span>
			Price range: {priceRange[0]}€ &ndash; {priceRange[1]}€
		</span>
		<DoubleRangeSlider min={0} max={1000} bind:value={priceRange} />
	</App>
</Story>

<Story name="Interactive" args={{variant: undefined, min: 0, max: 100}}>
	{#snippet template(args)}
		<App lang="en">
			<DoubleRangeSlider variant={args.variant} min={args.min} max={args.max} />
		</App>
	{/snippet}
</Story>

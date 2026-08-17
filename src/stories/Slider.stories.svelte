<script module>
	import {defineMeta} from "@storybook/addon-svelte-csf";
	import App from "../App.svelte";
	import Slider from "@juvofy/lib/components/controls/Slider.svelte";

	const {Story} = defineMeta({
		title: "Controls/Slider",
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
			size: {
				control: "select",
				options: ["xs", "sm", "md", "lg", "xl"],
			},
			min: {control: "number"},
			max: {control: "number"},
		},
	});
</script>

<Story name="Interactive" args={{variant: undefined, size: "md", min: 0, max: 100}}>
	{#snippet template(args)}
		<App lang="en">
			<Slider variant={args.variant} size={args.size} min={args.min} max={args.max} />
		</App>
	{/snippet}
</Story>

<script module>
	import {defineMeta} from "@storybook/addon-svelte-csf";
	import App from "../App.svelte";
	import Status from "@juvofy/lib/components/display/Status.svelte";

	const {Story} = defineMeta({
		title: "Display/Status",
		argTypes: {
			variant: {
				control: "select",
				options: [
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
		},
	});
</script>

<Story name="Variants">
	<App>
		<span><Status variant="primary" /> Primary</span>
		<span><Status variant="secondary" /> Secondary</span>
		<span><Status variant="warning" /> Warning</span>
		<span><Status variant="success" /> Success</span>
		<span><Status variant="accent" /> Accent</span>
		<span><Status variant="info" /> Info</span>
		<span><Status variant="neutral" /> Neutral</span>
		<span><Status variant="error" /> Error</span>
	</App>
</Story>

<Story name="Sizes">
	<App>
		<span><Status size="xs" /> Extra Small</span>
		<span><Status size="sm" /> Small</span>
		<span><Status size="md" /> Medium</span>
		<span><Status size="lg" /> Large</span>
		<span><Status size="xl" /> Extra Large</span>
	</App>
</Story>

<Story name="Interactive" args={{variant: "primary", size: "md"}}>
	{#snippet template(args)}
		<App>
			<span><Status variant={args.variant} size={args.size} /> {args.variant ?? "default"}</span>
		</App>
	{/snippet}
</Story>

<script module>
	import {defineMeta} from "@storybook/addon-svelte-csf";
	import App from "../App.svelte";
	import Badge from "@juvofy/lib/components/display/Badge.svelte";

	const {Story} = defineMeta({
		title: "Display/Badge",
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
			decoration: {
				control: "select",
				options: [undefined, "outline", "dash", "soft", "ghost"],
			},
		},
	});
</script>

<Story name="Variants">
	<App>
		<Badge variant="primary">Primary</Badge>
		<Badge variant="secondary">Secondary</Badge>
		<Badge variant="warning">Warning</Badge>
		<Badge variant="success">Success</Badge>
		<Badge variant="accent">Accent</Badge>
		<Badge variant="info">Info</Badge>
		<Badge variant="neutral">Neutral</Badge>
		<Badge variant="error">Error</Badge>
	</App>
</Story>

<Story name="Sizes">
	<App>
		<Badge size="xs">Extra Small</Badge>
		<Badge size="sm">Small</Badge>
		<Badge size="md">Medium</Badge>
		<Badge size="lg">Large</Badge>
		<Badge size="xl">Extra Large</Badge>
	</App>
</Story>

<Story name="Decorations">
	<App>
		<Badge decoration="outline">Outline</Badge>
		<Badge decoration="dash">Dash</Badge>
		<Badge decoration="soft">Soft</Badge>
		<Badge decoration="ghost">Ghost</Badge>
	</App>
</Story>

<Story name="Interactive" args={{variant: "primary", size: "md"}}>
	{#snippet template(args)}
		<App>
			<Badge variant={args.variant} size={args.size} decoration={args.decoration}>Badge</Badge>
		</App>
	{/snippet}
</Story>

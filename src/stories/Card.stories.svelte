<script module>
	import {defineMeta} from "@storybook/addon-svelte-csf";
	import App from "../App.svelte";
	import Card from "@juvofy/lib/components/display/Card.svelte";

	const {Story} = defineMeta({
		title: "Display/Card",
		argTypes: {
			size: {
				control: "select",
				options: ["xs", "sm", "md", "lg", "xl"],
			},
			decoration: {
				control: "select",
				options: [undefined, "border", "dash"],
			},
		},
	});
</script>

<Story name="Sizes">
	<App>
		<Card size="xs" class="bg-base-100 shadow-sm">Extra Small</Card>
		<Card size="sm" class="bg-base-100 shadow-sm">Small</Card>
		<Card size="md" class="bg-base-100 shadow-sm">Medium</Card>
		<Card size="lg" class="bg-base-100 shadow-sm">Large</Card>
		<Card size="xl" class="bg-base-100 shadow-sm">Extra Large</Card>
	</App>
</Story>

<Story name="Decorations">
	<App>
		<Card decoration="border" class="bg-base-100">Border</Card>
		<Card decoration="dash" class="bg-base-100">Dash</Card>
	</App>
</Story>

<Story name="Interactive" args={{size: "md"}}>
	{#snippet template(args)}
		<App>
			<Card size={args.size} decoration={args.decoration} class="bg-base-100 shadow-sm">
				Card content
			</Card>
		</App>
	{/snippet}
</Story>

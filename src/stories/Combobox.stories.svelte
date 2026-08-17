<script module>
	import {defineMeta} from "@storybook/addon-svelte-csf";
	import App from "../App.svelte";
	import Combobox from "@juvofy/lib/components/controls/Combobox.svelte";

	const {Story} = defineMeta({
		title: "Controls/Combobox",
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
			placeholder: {control: "text"},
			searchLabel: {control: "text"},
			nothingFoundLabel: {control: "text"},
		},
	});
</script>

<Story name="Basic">
	<App lang="en">
		<Combobox options={["Option 1", "Option 2", "Option 3"]} />
	</App>
</Story>

<Story name="Many Options">
	<App lang="en">
		<Combobox
			options={[
				"Apple",
				"Banana",
				"Cherry",
				"Date",
				"Elderberry",
				"Figs",
				"Grape",
				"Honeydew",
				"Iceberg Lettuce",
				"Jackfruit",
				"Kiwi",
				"Lemon",
				"Mango",
				"Nut",
				"Orange",
				"Papaya",
				"Quince",
				"Raspberry",
				"Strawberry",
				"Tangerine",
				"Ugli Fruit",
				"Vanilla",
				"Walnut",
				"Xigua",
				"Yuzu",
				"Zucchini",
			]}
		/>
	</App>
</Story>

<Story
	name="Interactive"
	args={{
		variant: "primary",
		searchLabel: "Search...",
		nothingFoundLabel: "Nothing found...",
	}}
>
	{#snippet template(args)}
		<App lang="en">
			<Combobox
				options={["Option 1", "Option 2", "Option 3"]}
				variant={args.variant}
				searchLabel={args.searchLabel}
				nothingFoundLabel={args.nothingFoundLabel}
			/>
		</App>
	{/snippet}
</Story>

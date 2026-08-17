<script module>
	import {defineMeta} from "@storybook/addon-svelte-csf";
	import App from "../App.svelte";
	import Accordion from "@juvofy/lib/components/display/Accordion.svelte";
	import AccordionGroup from "@juvofy/lib/components/display/AccordionGroup.svelte";

	const {Story} = defineMeta({
		title: "Display/Accordion",
		argTypes: {
			icon: {
				control: "radio",
				options: ["arrow", "plus"],
			},
		},
	});
</script>

<Story name="Group">
	<App lang="en">
		<AccordionGroup class="w-full">
			<Accordion icon="arrow" class="bg-base-200 border-base-300 border">
				{#snippet label()}Lorem{/snippet}
				{#snippet content()}
					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut cumque neque tenetur
					perferendis quam repellat fuga distinctio qui! Non ducimus fugiat deserunt est molestiae
					dolor illo odit accusantium dolores aperiam.
				{/snippet}
			</Accordion>
			<Accordion icon="arrow" class="bg-base-200 border-base-300 border">
				{#snippet label()}Ipsum{/snippet}
				{#snippet content()}
					Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
					veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
					consequat.
				{/snippet}
			</Accordion>
		</AccordionGroup>
	</App>
</Story>

<Story name="Interactive" args={{icon: "arrow"}}>
	{#snippet template(args)}
		<App lang="en">
			<AccordionGroup class="w-full">
				<Accordion icon={args.icon} class="bg-base-200 border-base-300 border">
					{#snippet label()}Lorem{/snippet}
					{#snippet content()}
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut cumque neque tenetur
						perferendis quam repellat fuga distinctio qui!
					{/snippet}
				</Accordion>
				<Accordion icon={args.icon} class="bg-base-200 border-base-300 border">
					{#snippet label()}Ipsum{/snippet}
					{#snippet content()}
						Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
					{/snippet}
				</Accordion>
			</AccordionGroup>
		</App>
	{/snippet}
</Story>

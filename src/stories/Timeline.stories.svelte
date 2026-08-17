<script module>
	import {defineMeta} from "@storybook/addon-svelte-csf";
	import App from "../App.svelte";
	import Timeline from "@juvofy/lib/components/display/Timeline.svelte";
	import TimelineItem from "@juvofy/lib/components/display/TimelineItem.svelte";

	const {Story} = defineMeta({
		title: "Display/Timeline",
		argTypes: {
			direction: {
				control: "radio",
				options: ["horizontal", "vertical"],
			},
		},
	});
</script>

<Story name="Horizontal">
	<App lang="en">
		<Timeline direction="horizontal">
			<TimelineItem>
				{#snippet start()}The Bite Of{/snippet}
				{#snippet middle()}X{/snippet}
				{#snippet end()}87{/snippet}
			</TimelineItem>
			<TimelineItem>
				{#snippet start()}Warframe{/snippet}
				{#snippet middle()}X{/snippet}
				{#snippet end()}1999{/snippet}
			</TimelineItem>
			<TimelineItem>
				{#snippet start()}Blade Runner{/snippet}
				{#snippet middle()}X{/snippet}
				{#snippet end()}2049{/snippet}
			</TimelineItem>
		</Timeline>
	</App>
</Story>

<Story name="Vertical">
	<App lang="en">
		<Timeline direction="vertical">
			<TimelineItem>
				{#snippet start()}The Bite Of{/snippet}
				{#snippet middle()}X{/snippet}
				{#snippet end()}87{/snippet}
			</TimelineItem>
			<TimelineItem>
				{#snippet start()}Warframe{/snippet}
				{#snippet middle()}X{/snippet}
				{#snippet end()}1999{/snippet}
			</TimelineItem>
			<TimelineItem>
				{#snippet start()}Blade Runner{/snippet}
				{#snippet middle()}X{/snippet}
				{#snippet end()}2049{/snippet}
			</TimelineItem>
		</Timeline>
	</App>
</Story>

<script lang="ts" module>
	import Timeline from "@juvofy/lib/components/display/Timeline.svelte";
	import TimelineItem from "@juvofy/lib/components/display/TimelineItem.svelte";
</script>

<Timeline direction="vertical">
	<TimelineItem>
		{#snippet start()}
			The Bite Of
		{/snippet}
		{#snippet middle()}
			X
		{/snippet}
		{#snippet end()}
			87
		{/snippet}
	</TimelineItem>
	<TimelineItem>
		{#snippet start()}
			Warframe
		{/snippet}
		{#snippet middle()}
			X
		{/snippet}
		{#snippet end()}
			1999
		{/snippet}
	</TimelineItem>
	<TimelineItem>
		{#snippet start()}
			Blade Runner
		{/snippet}
		{#snippet middle()}
			X
		{/snippet}
		{#snippet end()}
			2049
		{/snippet}
	</TimelineItem>
</Timeline>

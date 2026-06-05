<script module>
	import {defineMeta} from "@storybook/addon-svelte-csf";
	import App from "../App.svelte";
	import DatePicker from "@juvofy/lib/components/controls/DatePicker.svelte";

	const {Story} = defineMeta({
		title: "Controls/DatePicker",
		argTypes: {
			type: {
				control: "radio",
				options: ["date", "range"],
			},
		},
	});
</script>

<script lang="ts">
	let bookingDate = $state<string>();
</script>

<Story name="Date">
	<App>
		<DatePicker type="date" />
	</App>
</Story>

<Story name="Range">
	<App>
		<span>Book a flight</span>
		<DatePicker type="range" bind:value={bookingDate} />
		<span>
			{#if !bookingDate}
				You have no flights booked
			{:else}
				You have booked a flight on {bookingDate}
			{/if}
		</span>
	</App>
</Story>

<Story name="Interactive" args={{type: "date"}}>
	{#snippet template(args)}
		<App>
			<DatePicker type={args.type} />
		</App>
	{/snippet}
</Story>

<script lang="ts" module>import DatePicker from "@juvofy/lib/components/controls/DatePicker.svelte";
</script>

<script lang="ts">let bookingDate = $state();
</script>

<span>Book a flight</span>
<DatePicker type="range" bind:value={bookingDate} />
<span>
	{#if !bookingDate}
		You have no flights booked
	{:else}
		You have booked a flight on {bookingDate}
	{/if}
</span>

<script lang="ts">
	import {getApp} from "@juvofy/lib/App.svelte";
	import Button from "@juvofy/lib/components/actions/Button.svelte";

	const app = getApp();

	function alert() {
		app.dialog.fire({
			type: "none",
			title: "Alert",
			body: "This is an alert message.",
		});
	}
</script>

<!-- This is included once in App.svelte -->
<!-- <Dialog bind:this={app.dialog} /> -->

<Button onclick={alert} class="w-fit" variant="primary">Open dialog</Button>

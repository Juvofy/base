<script lang="ts">
	import {getApp} from "@juvofy/lib/App.svelte";
	import Button from "@juvofy/lib/components/actions/Button.svelte";

	const app = getApp();

	function alert() {
		app.toast.addToQueue({
			variant: "error",
			text: "french toast",
		});
	}
</script>

<!-- This is included once in App.svelte -->
<!-- <Toast bind:this={app.toast} /> -->

<Button onclick={alert} class="w-fit" variant="primary">Open sandwich</Button>

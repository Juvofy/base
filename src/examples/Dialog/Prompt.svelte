<script lang="ts">
	import {getApp} from "@juvofy/lib/App.svelte";
	import Button from "@juvofy/lib/components/actions/Button.svelte";

	const app = getApp();

	function prompt() {
		app.dialog.fire({
			type: "text",
			title: "Asking",
			body: "How are you?",
		});
	}
</script>

<!-- This is included once in App.svelte -->
<!-- <Dialog bind:this={app.dialog} /> -->

<Button onclick={prompt} class="w-fit" variant="primary">Open dialog</Button>

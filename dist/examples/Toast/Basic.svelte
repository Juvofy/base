<script lang="ts">import { getApp } from "@juvofy/lib/App.svelte";
import Button from "@juvofy/lib/components/actions/Button.svelte";
const app = getApp();
function alert() {
  app.toast.addToQueue({
    text: "toasted"
  });
}
</script>

<!-- This is included once in App.svelte -->
<!-- <Toast bind:this={app.toast} /> -->

<Button onclick={alert} class="w-fit" variant="primary">Open toast</Button>

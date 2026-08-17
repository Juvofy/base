<script module>
	import {defineMeta} from "@storybook/addon-svelte-csf";
	import Toast from "@juvofy/lib/components/feedback/Toast.svelte";
	import Button from "@juvofy/lib/components/actions/Button.svelte";

	const {Story} = defineMeta({
		title: "Feedback/Toast",
		argTypes: {
			variant: {
				control: "select",
				options: [undefined, "warning", "success", "info", "error"],
			},
			text: {control: "text"},
		},
	});
</script>

<script lang="ts">
	let variantsToast = $state<Toast>({addToQueue() {}});
	let interactiveToast = $state<Toast>({addToQueue() {}});
</script>

<Story name="Variants">
	<div class="flex gap-2 flex-wrap">
		<Button
			onclick={() => variantsToast.addToQueue({text: "Success!", variant: "success"})}
			variant="success"
			class="w-fit">Success</Button
		>
		<Button
			onclick={() => variantsToast.addToQueue({text: "Warning!", variant: "warning"})}
			variant="warning"
			class="w-fit">Warning</Button
		>
		<Button
			onclick={() => variantsToast.addToQueue({text: "Error!", variant: "error"})}
			variant="error"
			class="w-fit">Error</Button
		>
		<Button
			onclick={() => variantsToast.addToQueue({text: "Info!", variant: "info"})}
			variant="info"
			class="w-fit">Info</Button
		>
	</div>
	<Toast bind:this={variantsToast} />
</Story>

<Story name="Interactive" args={{variant: "success", text: "Hello!"}}>
	{#snippet template(args)}
		<Button
			onclick={() => interactiveToast.addToQueue({text: args.text, variant: args.variant})}
			variant="primary"
			class="w-fit"
		>
			Show toast
		</Button>
		<Toast bind:this={interactiveToast} />
	{/snippet}
</Story>

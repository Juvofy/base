<script module>
	import {defineMeta} from "@storybook/addon-svelte-csf";
	import Dialog from "@juvofy/lib/components/actions/Dialog.svelte";
	import Button from "@juvofy/lib/components/actions/Button.svelte";

	const {Story} = defineMeta({
		title: "Actions/Dialog",
		argTypes: {
			type: {
				control: "select",
				options: ["none", "text", "email", "password", "number", "textarea"],
			},
			title: {control: "text"},
			body: {control: "text"},
		},
	});
</script>

<script lang="ts">
	let alertDialog = $state<Dialog>({
		cancel() {},
		close() {},
		fire: () => Promise.resolve(false),
		isOpen: () => false,
	});

	let promptDialog = $state<Dialog>({
		cancel() {},
		close() {},
		fire: () => Promise.resolve(false),
		isOpen: () => false,
	});

	let interactiveDialog = $state<Dialog>({
		cancel() {},
		close() {},
		fire: () => Promise.resolve(false),
		isOpen: () => false,
	});
</script>

<Story name="Alert">
	<Button
		onclick={() => alertDialog.fire({type: "none", title: "Alert", body: "This is an alert message."})}
		class="w-fit"
		variant="primary"
	>
		Open dialog
	</Button>
	<Dialog bind:this={alertDialog} />
</Story>

<Story name="Prompt">
	<Button
		onclick={() => promptDialog.fire({type: "text", title: "Asking", body: "How are you?"})}
		class="w-fit"
		variant="primary"
	>
		Open dialog
	</Button>
	<Dialog bind:this={promptDialog} />
</Story>

<Story name="Interactive" args={{type: "text", title: "Title", body: "Body text"}}>
	{#snippet template(args)}
		<Button
			onclick={() => interactiveDialog.fire({type: args.type, title: args.title, body: args.body})}
			class="w-fit"
			variant="primary"
		>
			Open dialog
		</Button>
		<Dialog bind:this={interactiveDialog} />
	{/snippet}
</Story>

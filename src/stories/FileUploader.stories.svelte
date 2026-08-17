<script module>
	import {defineMeta} from "@storybook/addon-svelte-csf";
	import App from "../App.svelte";
	import FileUploader from "@juvofy/lib/components/controls/FileUploader.svelte";

	const {Story} = defineMeta({
		title: "Controls/FileUploader",
		argTypes: {
			accepts: {control: "text"},
		},
	});
</script>

<Story name="Basic">
	<App lang="en">
		<FileUploader />
	</App>
</Story>

<Story name="Interactive" args={{accepts: ""}}>
	{#snippet template(args)}
		<App lang="en">
			<FileUploader accepts={args.accepts || undefined} />
		</App>
	{/snippet}
</Story>

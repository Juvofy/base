<script module>
	import {defineMeta} from "@storybook/addon-svelte-csf";
	import App from "../App.svelte";
	import FileTree from "@juvofy/lib/components/display/FileTree.svelte";

	const {Story} = defineMeta({
		title: "Display/FileTree",
	});
</script>

<Story name="Basic">
	<App>
		<FileTree
			content={[
				{name: "resume.pdf"},
				{
					name: "My Files",
					content: [
						{name: "Project-final.svg"},
						{name: "Project-final-2.jpg"},
						{
							name: "Images",
							content: [
								{name: "Screenshot1.png"},
								{name: "Screenshot2.png"},
								{name: "Others", content: [{name: "Screenshot3.png"}]},
							],
						},
					],
				},
				{name: "reports-final-2.pdf"},
			]}
		/>
	</App>
</Story>

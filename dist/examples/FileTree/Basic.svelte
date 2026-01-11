<script lang="ts">import FileTree from "@juvofy/lib/components/display/FileTree.svelte";
</script>

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

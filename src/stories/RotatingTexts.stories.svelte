<script module>
	import {defineMeta} from "@storybook/addon-svelte-csf";
	import App from "../App.svelte";
	import RotatingTexts from "@juvofy/lib/components/display/RotatingTexts.svelte";

	const {Story} = defineMeta({
		title: "Display/RotatingTexts",
	});
</script>

<Story name="Rotating Word">
	<App>
		<div class="flex items-center gap-2">
			<span>Come Buy Our</span>
			<RotatingTexts texts={["Computers", "Phones", "Laptops", "KV-1"]} />
		</div>
	</App>
</Story>

<Story name="Rotating Sentence">
	<App>
		<RotatingTexts texts={["We", "Have", "Laptops", "On", "Sale!"]} />
	</App>
</Story>

<script module>
	import {defineMeta} from "@storybook/addon-svelte-csf";
	import App from "../App.svelte";
	import Dropdown from "@juvofy/lib/components/actions/Dropdown.svelte";
	import Button from "@juvofy/lib/components/actions/Button.svelte";

	const {Story} = defineMeta({
		title: "Actions/Dropdown",
	});
</script>

<Story name="Button">
	<App>
		<Dropdown>
			{#snippet button({popover})}
				<Button variant="primary" class="w-fit" {@attach popover}>Open</Button>
			{/snippet}
			{#snippet content()}
				<li><span>Item 1</span></li>
				<li><span>Item 2</span></li>
			{/snippet}
		</Dropdown>
	</App>
</Story>

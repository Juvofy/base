<script lang="ts" module>
	import Dropdown from "@juvofy/lib/components/actions/Dropdown.svelte";
	import Button from "@juvofy/lib/components/actions/Button.svelte";
</script>

<Dropdown>
	{#snippet button({popover})}
		<Button variant="primary" class="w-fit" {@attach popover}>Open</Button>
	{/snippet}
	{#snippet content()}
		<li><span>Item 1</span></li>
		<li><span>Item 2</span></li>
	{/snippet}
</Dropdown>

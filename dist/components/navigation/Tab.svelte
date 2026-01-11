<script lang="ts" module>import { getTabContext } from "./Tabs.svelte";
</script>

<script lang="ts">const { class: customClass, label, children, id, ...props } = $props();
const tabs = getTabContext();
const isActive = $derived.by(() => {
  if (tabs.content.has(tabs.current)) {
    return tabs.current === id;
  }
  return tabs.content.keys().next().value === id;
});
$effect(() => {
  tabs.content.set(id, children);
  return () => {
    tabs.content.delete(id);
  };
});
</script>

<button
	onclick={() => {
		tabs.current = id;
	}}
	{...props}
	type="button"
	role="tab"
	class={[customClass, "tab"]}
	style:--tab-bg="#1e1e1e"
	aria-selected={isActive}
>
	{#if typeof label === "string"}
		{label}
	{:else}
		{@render label()}
	{/if}
</button>

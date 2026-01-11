<script lang="ts" module>import { onDestroy } from "svelte";
import { SvelteMap } from "svelte/reactivity";
const sources = new SvelteMap();
</script>

<script lang="ts">const { vars, ...props } = $props();
const { width, height, ...attributes } = $derived(vars.attributes);
const instanceId = $props.id();
$effect(() => {
  if (!sources.has(vars.fileId)) {
    sources.set(vars.fileId, instanceId);
  }
});
const isSource = $derived(sources.get(vars.fileId) === instanceId);
onDestroy(() => {
  if (isSource) {
    sources.delete(vars.fileId);
  }
});
const aspectRatio = $derived.by(() => {
  let [, , w, h] = attributes.viewBox?.split(" ") ?? [, , width, height];
  return Number(w) / Number(h) || void 0;
});
</script>

<svg {...props} style:aspect-ratio={aspectRatio}>
	{#if isSource}
		<symbol {...attributes} id={vars.fileId}>
			{@html vars.raw}
		</symbol>
	{/if}
	<use href="#{vars.fileId}" />
</svg>

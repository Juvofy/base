<script lang="ts" module>import { createContext } from "svelte";
const [getAccordion, setAccordion] = createContext();
export { getAccordion };
</script>

<script lang="ts">const { name, class: customClass, children, ...props } = $props();
const id = $props.id();
const accordionName = $derived(name ?? id);
setAccordion({
  get name() {
    return accordionName;
  }
});
</script>

<div {...props} class={[customClass, "join join-vertical"]}>
	{@render children?.()}
</div>

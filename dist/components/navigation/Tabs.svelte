<script lang="ts" module>import { tw } from "@juvofy/lib/utils/tw";
import { createContext } from "svelte";
import { SvelteMap } from "svelte/reactivity";
const variants = tw.map({
  lift: "tabs-lift",
  box: "tabs-box",
  border: "tabs-border"
});
const [getTabContext, setTabContext] = createContext();
export { getTabContext };
</script>

<script lang="ts">let {
  variant,
  id: customId,
  class: customClass,
  children,
  tab = $bindable(""),
  ...props
} = $props();
const tabs = $state([]);
const contentMap = new SvelteMap();
const generatedId = $props.id();
const id = $derived(customId ?? generatedId);
const panelId = $derived(`${id}.panel`);
setTabContext({
  get current() {
    return tab;
  },
  set current(value) {
    tab = value;
  },
  get tabs() {
    return tabs;
  },
  get listId() {
    return id;
  },
  get panelId() {
    return panelId;
  },
  get content() {
    return contentMap;
  }
});
const content = $derived.by(() => {
  if (contentMap.has(tab)) {
    return contentMap.get(tab);
  }
  return contentMap.values().next().value;
});
</script>

<div {...props} role="tablist" {id} class={["tabs", variant && variants[variant], customClass]}>
	{@render children()}
</div>

<div {...props} id={panelId} role="tabpanel" aria-labelledby={id}>
	{@render content?.()}
</div>

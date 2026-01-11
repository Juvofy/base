<script lang="ts" module>import { tw } from "@juvofy/lib/utils/tw";
import { getAccordion } from "./AccordionGroup.svelte";
const icons = tw.prefixed("collapse-arrow", "collapse-plus");
</script>

<script lang="ts">const { label, icon, content, class: customClass, ...props } = $props();
const accordion = getAccordion();
const name = $derived(accordion.name);
</script>

<details {name} {...props} class={[customClass, "collapse", icons(icon)]}>
	<summary class="collapse-title">
		{@render label()}
	</summary>
	<div class="collapse-content">
		{@render content()}
	</div>
</details>

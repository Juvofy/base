<script lang="ts" module>
	import {tw} from "@juvofy/lib/utils/tw";
	import type {Snippet} from "svelte";
	import type {HTMLDetailsAttributes} from "svelte/elements";
	import {getAccordion} from "./AccordionGroup.svelte";

	const icons = tw.prefixed("collapse-arrow", "collapse-plus");

	export interface Props extends HTMLDetailsAttributes {
		children?: never;
		content: Snippet;
		label: Snippet;
		icon?: tw.InferPrefixed<typeof icons>;
	}
</script>

<script lang="ts">
	const {label, icon, content, class: customClass, ...props}: Props = $props();
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

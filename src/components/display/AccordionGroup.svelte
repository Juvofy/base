<script lang="ts" module>
	import type {HTMLAttributes} from "svelte/elements";
	import {createContext} from "svelte";

	export interface Props extends HTMLAttributes<HTMLDivElement> {
		name?: string;
	}

	const [getAccordion, setAccordion] = createContext<{name: string}>();
	export {getAccordion};
</script>

<script lang="ts">
	const {name, class: customClass, children, ...props}: Props = $props();
	const id = $props.id();
	const accordionName = $derived(name ?? id);

	setAccordion({
		get name() {
			return accordionName;
		},
	});
</script>

<div {...props} class={[customClass, "join join-vertical"]}>
	{@render children?.()}
</div>

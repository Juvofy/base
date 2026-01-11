<script lang="ts" module>
	import {tw} from "@juvofy/lib/utils/tw";
	import type {Snippet} from "svelte";
	import type {HTMLAttributes} from "svelte/elements";

	const placements = tw.map({
		top: "tooltip-top",
		left: "tooltip-left",
		right: "tooltip-right",
		bottom: "tooltip-bottom",
	});

	export interface Props extends HTMLAttributes<HTMLDivElement> {
		placement: keyof typeof placements;
		content: string | Snippet;
		children: Snippet;
	}
</script>

<script lang="ts">
	const {placement, class: customClass, content, children, ...rest}: Props = $props();
</script>

{#if typeof content === "string"}
	<div data-tip={content} class={["tooltip", placement && placements[placement], customClass]} {...rest}>
		{@render children()}
	</div>
{:else}
	<div class={["tooltip", placement, customClass]} {...rest}>
		<div class="tooltip-content">
			{@render content()}
		</div>
		{@render children()}
	</div>
{/if}

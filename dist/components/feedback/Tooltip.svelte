<script lang="ts" module>import { tw } from "@juvofy/lib/utils/tw";
const placements = tw.map({
  top: "tooltip-top",
  left: "tooltip-left",
  right: "tooltip-right",
  bottom: "tooltip-bottom"
});
</script>

<script lang="ts">const { placement, class: customClass, content, children, ...rest } = $props();
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

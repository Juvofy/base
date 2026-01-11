<script lang="ts" module>
	import {tw} from "@juvofy/lib/utils/tw";
	import type {HTMLAttributes} from "svelte/elements";

	const directions = tw.prefixed("timeline-horizontal", "timeline-vertical");

	export interface Props extends HTMLAttributes<HTMLUListElement> {
		direction?: tw.InferPrefixed<typeof directions>;
		snap?: boolean;
		compact?: boolean;
	}
</script>

<script lang="ts">
	const {snap, direction, class: customClass, children, compact, ...props}: Props = $props();
</script>

<ul
	{...props}
	class={[
		customClass,
		directions(direction),
		"timeline",
		snap && "timeline-snap",
		compact && "timeline-compact",
	]}
>
	{@render children?.()}
</ul>

<script lang="ts" module>import { tw } from "@juvofy/lib/utils/tw";
const directions = tw.prefixed("timeline-horizontal", "timeline-vertical");
</script>

<script lang="ts">const { snap, direction, class: customClass, children, compact, ...props } = $props();
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

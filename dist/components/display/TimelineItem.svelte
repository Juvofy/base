<script lang="ts" module></script>

<script lang="ts">const { start, middle, end, class: customClass, box = "none", ...props } = $props();
</script>

<li {...props} class={[customClass, "group"]}>
	<hr class="group-first:hidden" />
	<div class={["timeline-start", (box === "start" || box === "both") && "timeline-box"]}>
		{@render start()}
	</div>
	<div class="timeline-middle">
		{@render middle()}
	</div>
	<div class={["timeline-end", (box === "end" || box === "both") && "timeline-box"]}>
		{@render end()}
	</div>
	<hr class="group-last:hidden" />
</li>

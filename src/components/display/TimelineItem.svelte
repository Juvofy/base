<script lang="ts" module>
	import type {Snippet} from "svelte";
	import type {HTMLAttributes} from "svelte/elements";

	export interface Props extends HTMLAttributes<HTMLLIElement> {
		start: Snippet;
		middle: Snippet;
		end: Snippet;
		children?: never;
		box?: "start" | "end" | "both" | "none";
	}
</script>

<script lang="ts">
	const {start, middle, end, class: customClass, box = "none", ...props}: Props = $props();
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

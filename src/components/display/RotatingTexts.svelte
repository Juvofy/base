<script lang="ts" module>
	import type {HTMLAttributes} from "svelte/elements";

	export interface Props extends HTMLAttributes<HTMLSpanElement> {
		texts:
			| [string]
			| [string, string]
			| [string, string, string]
			| [string, string, string, string]
			| [string, string, string, string, string]
			| [string, string, string, string, string, string];
	}
</script>

<script lang="ts">
	const {texts, class: customClass, children, ...props}: Props = $props();
</script>

<span {...props} class={[customClass, "text-rotate"]}>
	<span class="justify-items-center">
		{#each texts as text, index (index)}
			<span>{text}</span>
		{/each}
	</span>
</span>

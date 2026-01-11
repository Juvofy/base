<script lang="ts" module></script>

<script lang="ts">const { texts, class: customClass, children, ...props } = $props();
</script>

<span {...props} class={[customClass, "text-rotate"]}>
	<span class="justify-items-center">
		{#each texts as text, index (index)}
			<span>{text}</span>
		{/each}
	</span>
</span>

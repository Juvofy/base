<script lang="ts" module>import Badge from "../display/Badge.svelte";
import Close from "@material-symbols/svg-400/rounded/close.svg?icon";
</script>

<script lang="ts">const componentId = $props.id();
let { files = $bindable([]), id = componentId } = $props();
</script>

<div
	class="relative min-h-32 bg-base-100 border border-dashed border-primary rounded-box pt-8 p-4 block text-center"
>
	<input
		{id}
		type="file"
		multiple
		class="appearance-none absolute inset-0 size-0 opacity-0 z-1"
		onchange={event => {
			if (event.currentTarget.files?.length) {
				files.push(...event.currentTarget.files);
			} else {
				files = [];
			}
		}}
	/>
	<label class="btn btn-primary" for={id}> Choose files </label>
	{#if files?.length}
		<div class="flex flex-wrap gap-1 mt-4 relative z-2">
			{#each files as file (file)}
				<Badge class="truncate w-fit text-secondary-content" variant="secondary">
					{file.name}
					<button
						class="rounded-field hover:bg-current/25"
						onclick={event => {
							event.stopPropagation();
							files = files.filter(f => f !== file);
						}}
					>
						<Close class="size-[1.5em] fill-current" />
					</button>
				</Badge>
			{/each}
		</div>
	{/if}
</div>

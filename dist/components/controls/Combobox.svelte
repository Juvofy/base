<script lang="ts" module>import Dropdown from "../actions/Dropdown.svelte";
import { escapeRegexPart } from "@juvofy/lib/utils/escapeRegexPart";
import Badge, {} from "../display/Badge.svelte";
import { event } from "@juvofy/lib/utils/event";
import { tw } from "@juvofy/lib/utils/tw";
const mark = tw.map({
  primary: "text-primary",
  secondary: "text-secondary",
  warning: "text-warning",
  success: "text-success",
  accent: "text-accent",
  info: "text-info",
  neutral: "text-neutral",
  error: "text-error"
});
</script>

<script lang="ts">let {
  value = $bindable([]),
  class: customClass,
  options,
  variant = "primary",
  searchLabel = "Search...",
  nothingFoundLabel = "Nothing found...",
  ...rest
} = $props();
let search = $state();
let popover = $state();
let inputWidth = $state(0);
async function hidePopoverOnBlur({ currentTarget }) {
  await new Promise(requestAnimationFrame);
  if (popover && !popover.contains(document.activeElement) && currentTarget !== document.activeElement) {
    popover.hidePopover();
  }
}
</script>

<div class={[customClass, "flex flex-col gap-4"]} {...rest}>
	<Dropdown
		popover="manual"
		class="max-h-50"
		bind:root={popover}
		style="width: {inputWidth}px;"
		onfocusout={hidePopoverOnBlur}
	>
		{#snippet button({anchorName})}
			<label class="input w-full" style:anchor-name={anchorName} bind:clientWidth={inputWidth}>
				<input
					placeholder={searchLabel}
					bind:value={search}
					{@attach event("focus", () => popover?.showPopover())}
					{@attach event("click", () => popover?.showPopover())}
					{@attach event("keydown", e => popover?.togglePopover(e.key !== "Enter" || undefined))}
					{@attach event("blur", hidePopoverOnBlur)}
				/>
			</label>
		{/snippet}
		{#snippet content()}
			{#each options as opt (opt)}
				{@const match = search ? opt.matchAll(RegExp(escapeRegexPart(search), "gi")).toArray() : []}
				{@const parts = match.map(({0: match, index}, i, {[i - 1]: prev, length}) => ({
					match,
					before: opt.slice(prev ? prev.index + prev[0].length : 0, index),
					after: i + 1 === length ? opt.slice(index + match.length, opt.length) : "",
				}))}
				{#if !search || match.length > 0}
					<li class="peer">
						<button
							class="empty:hidden"
							onclick={() => {
								popover?.hidePopover();

								const index = value.indexOf(opt);
								if (index === -1) {
									value.push(opt);
								} else {
									value.splice(index, 1);
								}
							}}
							onmousedown={e => e.preventDefault()}
						>
							<span class="peer">
								{#if search}
									{#each parts as { before, match, after } (before + match + after)}
										{before}<span class={mark[variant]}>{match}</span>{after}
									{/each}
								{:else}
									{opt}
								{/if}
							</span>
							{#if value.includes(opt)}
								<span class="ml-auto">&check;</span>
							{/if}
						</button>
					</li>
				{/if}
			{/each}
			<li class="menu-disabled peer-first:hidden py-1">{nothingFoundLabel}</li>
		{/snippet}
	</Dropdown>
	<div class="flex flex-wrap gap-2">
		{#each value as selected (selected)}
			<Badge variant="accent">
				{selected}
			</Badge>
		{/each}
	</div>
</div>

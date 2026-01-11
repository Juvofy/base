<script lang="ts" module>import { escapeOnBackdrop } from "./Dialog.svelte";
import { createContext } from "svelte";
import { SvelteMap } from "svelte/reactivity";
import { event } from "@juvofy/lib/utils/event";
export const MIN_SCREEN_OFFSET = 4;
const [getSubmenu, setSubmenu] = createContext();
export { getSubmenu };
</script>

<script lang="ts">const { content, menu } = $props();
let desiredPosition = $state([0, 0]);
let menuWidth = $state(0);
let menuHeight = $state(0);
let screenWidth = $state(0);
let screenHeight = $state(0);
let scrollX = $state(0);
let scrollY = $state(0);
const [left, top] = $derived.by(() => {
  const [x, y] = desiredPosition;
  const desiredX = x + scrollX;
  const desiredY = y + scrollY;
  const maxX = screenWidth - menuWidth;
  const maxY = screenHeight - menuHeight;
  const minX = 0;
  const minY = 0;
  const clampedX = Math.max(minX, Math.min(desiredX, maxX));
  const clampedY = Math.max(minY, Math.min(desiredY, maxY));
  return [`${clampedX}px`, `${clampedY}px`];
});
const submenuItems = new SvelteMap();
function clear() {
  submenuItems.clear();
  submenuItems.set("$self", [menu]);
}
export function open(x, y) {
  desiredPosition = [x, y];
  dialog?.showModal();
}
export function close() {
  dialog?.close();
}
let dialog = $state();
clear();
setSubmenu(submenuItems);
</script>

<svelte:window bind:scrollX bind:scrollY bind:innerHeight={screenHeight} bind:innerWidth={screenWidth} />

{@render content({
	close,
	open,
	contextMenu: event("contextmenu", e => {
		if (dialog !== undefined) {
			e.preventDefault();
			e.stopPropagation();
			open(e.clientX, e.clientY);
		}
	}),
})}

<dialog
	role="menu"
	class="absolute m-0 p-0 border-0 overflow-hidden bg-transparent"
	style:left
	style:top
	onclose={clear}
	onclick={escapeOnBackdrop}
	bind:this={dialog}
>
	<div
		bind:clientHeight={menuHeight}
		bind:clientWidth={menuWidth}
		style:--divider-m="0"
		class={[
			"backdrop:bg-transparent bg-transparent m-0",
			"border-0 p-0 flex gap-px pointer-events-none",
		]}
	>
		{#each submenuItems.values() as submenu (submenu)}
			{@const [item, button] = submenu}
			<form
				method="dialog"
				class="bg-base-200 rounded-box h-fit"
				style:margin-top="{button?.parentElement?.offsetTop ?? 0}px"
				onsubmit={e => {
					e.submitter?.dispatchEvent(new Event("contextmenu:action"));
				}}
			>
				<ul class="menu pointer-events-auto h-fit shadow [&_hr]:hidden">
					{@render item()}
				</ul>
			</form>
		{/each}
	</div>
</dialog>

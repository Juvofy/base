<script lang="ts" module>import { event } from "@juvofy/lib/utils/event";
import Chevron from "@juvofy/lib/assets/chevron-right.svg?icon";
import { assert } from "@juvofy/lib/utils/assert";
import { getSubmenu } from "../actions/ContextMenu.svelte";
</script>

<script lang="ts">const { children, content, submenu, onuse, ...props } = $props();
const submenuItems = getSubmenu();
const instanceId = $props.id();
</script>

<li>
	{#if children}
		<button type="submit" {...props} {@attach event("contextmenu:action", onuse)}>
			{@render children()}
		</button>
	{:else}
		<button
			{...props}
			type="button"
			class="flex justify-between gap-2"
			onclick={e => {
				let isSubitem = false;
				if (submenuItems.has(instanceId)) {
					// Close the item and its children
					for (const id of submenuItems.keys()) {
						if ((isSubitem ||= id === instanceId)) {
							submenuItems.delete(id);
						}
					}
				} else if (submenu) {
					const menu = e.currentTarget.closest("ul.menu");
					assert(menu, "ContextMenuOption cannot be used outside ContextMenu");

					// Close potential siblings and their children
					const siblings = Array.from(menu.querySelectorAll("button"));

					for (const [id, [, button]] of submenuItems) {
						if (button && (isSubitem ||= siblings.includes(button))) {
							submenuItems.delete(id);
						}
					}
					submenuItems.set(instanceId, [submenu, e.currentTarget]);
				}
			}}
		>
			<span>{@render content()}</span>
			<Chevron class="size-[1em]" />
		</button>
	{/if}
</li>

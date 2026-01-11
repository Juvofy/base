<script lang="ts" module>
	import {tw} from "@juvofy/lib/utils/tw";
	import type {HTMLAttributes} from "svelte/elements";
	import {slide} from "svelte/transition";
	import Close from "@material-symbols/svg-400/rounded/close.svg?icon";
	import Button from "../actions/Button.svelte";

	const variants = tw.prefixed("alert-warning", "alert-success", "alert-info", "alert-error");

	export interface ToastItem {
		variant?: tw.InferPrefixed<typeof variants>;
		text: string;
	}

	export interface Props extends HTMLAttributes<HTMLDivElement> {
		children?: never;
	}
</script>

<script lang="ts">
	const {class: customClass, children, ...props}: Props = $props();
	let queue = $state.raw<ToastItem[]>([]);
	export function addToQueue(item: ToastItem, timeout = 3000) {
		queue = [...queue, item];
		setTimeout(() => {
			queue = queue.filter(i => i !== item);
		}, timeout);
	}
</script>

<div {...props} class={[customClass, "toast"]}>
	{#each queue as item (item)}
		<div class={["alert gap-2", variants(item.variant)]} out:slide>
			{item.text}
			<Button
				class="btn-circle btn-ghost btn-xs btn-square not-hover:-ml-6 transition-all not-hover:opacity-0"
				variant={item.variant}
				onclick={() => {
					queue = queue.filter(i => i !== item);
				}}
			>
				<Close class="fill-current size-[1em]" />
			</Button>
		</div>
	{/each}
</div>

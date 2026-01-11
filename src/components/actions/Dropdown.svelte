<script lang="ts">
	import type {Attachment} from "svelte/attachments";
	import type {Snippet} from "svelte";
	import type {HTMLAttributes} from "svelte/elements";

	const popoverAttachment: Attachment<HTMLButtonElement> = element => {
		element.popoverTargetElement = root ?? null;
		element.style.setProperty("anchor-name", `--${id}`);
	};

	interface Props extends HTMLAttributes<HTMLUListElement> {
		children?: never;
		name?: never;
		content: Snippet;
		root?: HTMLUListElement;
		button: Snippet<[{popover: typeof popoverAttachment; anchorName: string}]>;
	}

	const componentId = $props.id();
	let {
		content,
		button,
		class: customClass,
		root = $bindable(),
		popover = "auto",
		id = componentId,
		...props
	}: Props = $props();
</script>

{@render button({popover: popoverAttachment, anchorName: `--${id}`})}

<ul
	{...props}
	{popover}
	class={[customClass, "dropdown menu min-w-52 rounded-box bg-base-100 shadow-sm"]}
	bind:this={root}
	style:position-anchor="--{id}"
>
	{@render content()}
</ul>

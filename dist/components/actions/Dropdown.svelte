<script lang="ts">const popoverAttachment = (element) => {
  element.popoverTargetElement = root ?? null;
  element.style.setProperty("anchor-name", `--${id}`);
};
const componentId = $props.id();
let {
  content,
  button,
  class: customClass,
  root = $bindable(),
  popover = "auto",
  id = componentId,
  ...props
} = $props();
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

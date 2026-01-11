<script lang="ts" module>
	import {getLocale} from "@juvofy/lib/App.svelte";
	import Calendar, {type Props, type CalendarType} from "./Calendar.svelte";
	export type {Props, CalendarType};

	const placeholderDate = new Date(2000, 9, 15);
</script>

<script lang="ts" generics="Type extends CalendarType">
	const componentId = $props.id();
	const locale = getLocale();
	const placeholder = placeholderDate.toLocaleDateString(locale).replace(/\d/g, "x");
	let {value = $bindable(), id = componentId, class: customClass, ...rest}: Props<Type> = $props();
</script>

<button
	{id}
	popovertarget="popover-{id}"
	class={["input input-border", customClass]}
	style:anchor-name="--{componentId}"
>
	{#if rest.type === "range"}
		{#if value}
			{value
				.split("/")
				.map(part => new Date(part).toLocaleDateString(locale))
				.join(" - ")}
		{:else}
			{placeholder} - {placeholder}
		{/if}
	{:else}
		{value ? new Date(value).toLocaleDateString(locale) : placeholder}
	{/if}
</button>

<div
	popover
	id="popover-{id}"
	class="dropdown bg-base-100 rounded-box shadow-lg"
	style:position-anchor="--{componentId}"
>
	<Calendar {...rest} bind:value />
</div>

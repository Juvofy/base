<script lang="ts" module>
	import "cally";
	import type {CalendarDateProps, CalendarRangeProps} from "cally";
	import type {HTMLAttributes} from "svelte/elements";
	import {onMount} from "svelte";
	import {event} from "@juvofy/lib/utils/event";
	import Next from "@material-symbols/svg-400/rounded/chevron_right.svg?icon";
	import Prev from "@material-symbols/svg-400/rounded/chevron_left.svg?icon";
	import type {PropsUnion} from "@juvofy/lib/utils/PropsUnion";
	import {range} from "@juvofy/lib/utils/Range";
	import {getLocale} from "@juvofy/lib/App.svelte";

	type PropMap = {
		range: CalendarRangeProps;
		date: CalendarDateProps;
	};

	export type CalendarType = keyof PropMap;

	type Base<Type extends CalendarType> = Omit<PropMap[Type], `on${string}` | "locale"> & {
		onchange?(this: void): void;
		onfocusday?(this: void, value: Date): void;
		onrangeend?: Type extends "range" ? (this: void, value: Date) => void : never;
		onrangestart?: Type extends "range" ? (this: void, value: Date) => void : never;
	};

	export type Props<Type extends CalendarType> = HTMLAttributes<
		HTMLElementTagNameMap[`calendar-${Type}`]
	> &
		PropsUnion<Base<"range">, Base<"date">> & {type: Type};
</script>

<script lang="ts" generics="Type extends CalendarType">
	let {
		type,
		class: customClass,
		months = 1,
		onrangeend,
		onrangestart,
		onfocusday,
		onchange,
		min,
		max,
		today,
		focusedDate,
		tentative,
		firstDayOfWeek,
		showOutsideDays,
		formatWeekday,
		isDateDisallowed,
		getDayParts,
		value = $bindable(),
		...rest
	}: Props<Type> = $props();

	let instance = $state<HTMLElementTagNameMap[typeof tag]>();

	const tag = $derived(`calendar-${type}` as const);
	const locale = getLocale();

	function rangeend(event: Event) {
		if (onrangeend && event instanceof CustomEvent && event.detail instanceof Date) {
			onrangeend(event.detail);
		}
	}

	function rangestart(event: Event) {
		if (onrangestart && event instanceof CustomEvent && event.detail instanceof Date) {
			onrangestart(event.detail);
		}
	}

	function focusday(event: Event) {
		if (onfocusday && event instanceof CustomEvent && event.detail instanceof Date) {
			onfocusday(event.detail);
		}
	}

	function change(event: Event) {
		const element = event.currentTarget;
		if (!instance || event.defaultPrevented) {
			return;
		}

		value = instance.value;
		onchange?.();
	}

	onMount(() => {
		if (!instance) {
			return;
		}
		if (value) {
			instance.value = value;
		} else {
			value = instance.value;
		}
	});

	$effect(() => {
		if (!instance || !showOutsideDays) {
			return;
		}
		instance.showOutsideDays = showOutsideDays;
	});

	$effect(() => {
		if (!instance || !isDateDisallowed) {
			return;
		}
		instance.isDateDisallowed = isDateDisallowed;
	});

	$effect(() => {
		if (!instance || !getDayParts) {
			return;
		}
		instance.getDayParts = getDayParts;
	});
</script>

<svelte:element
	this={tag}
	{@attach event("rangeend", rangeend)}
	{@attach event("rangestart", rangestart)}
	{@attach event("focusday", focusday)}
	{@attach event("change", change)}
	bind:this={instance}
	first-day-of-week={firstDayOfWeek}
	focused-date={focusedDate}
	{locale}
	{min}
	{max}
	{today}
	{months}
	class={["cally", customClass]}
	{...rest}
>
	<span slot="next">
		<Next class="size-4 fill-current" />
	</span>
	<span slot="previous">
		<Prev class="size-4 fill-current" />
	</span>
	{#each range(months) as monthIndex (monthIndex)}
		<calendar-month offset={monthIndex}></calendar-month>
	{/each}
</svelte:element>

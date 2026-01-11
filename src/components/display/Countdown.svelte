<script lang="ts" module>
	import {tw} from "@juvofy/lib/utils/tw";
	import type {HTMLAttributes} from "svelte/elements";
	import CountdownDigit from "./CountdownDigit.svelte";
	import {getLocale} from "@juvofy/lib/App.svelte";

	const variants = tw.prefixed(
		"box-primary",
		"box-secondary",
		"box-warning",
		"box-success",
		"box-accent",
		"box-info",
		"box-neutral",
		"box-error",
	);

	const countdownUnits = ["days", "hours", "minutes", "seconds"] as const;
	export type CountdownUnit = (typeof countdownUnits)[number];

	export interface Props extends HTMLAttributes<HTMLDivElement> {
		value: Partial<Record<CountdownUnit, number>> | {till: Date};
		variant?: tw.InferPrefixed<typeof variants>;
	}
</script>

<script lang="ts">
	const {value, class: customClass, variant, ...props}: Props = $props();
	const variantClass = $derived(variants(variant));
	const locale = getLocale();

	const formatters = countdownUnits.reduce(
		(previous, unit) => ({
			...previous,
			[unit]: new Intl.NumberFormat(locale, {
				unitDisplay: "long",
				unit: unit.slice(0, -1),
			}),
		}),
		{} as Record<CountdownUnit, Intl.NumberFormat>,
	);

	const end = $derived.by(() => {
		if ("till" in value) {
			return value.till.getTime();
		}
		const {days = 0, hours = 0, minutes = 0, seconds = 0} = value;
		return Date.now() + days * 864e5 + hours * 36e5 + minutes * 6e4 + seconds * 1e3;
	});

	function getDifference() {
		const difference = end - Date.now();
		const days = Math.floor(difference / 864e5);
		const hours = Math.floor((difference % 864e5) / 36e5);
		const minutes = Math.floor((difference % 36e5) / 6e4);
		const seconds = Math.floor((difference % 6e4) / 1e3);
		return {days, hours, minutes, seconds};
	}

	let difference = $state(getDifference());
	let timeoutId = NaN;

	$effect(() => {
		timeoutId = window.setTimeout(function set() {
			difference = getDifference();
			timeoutId = window.setTimeout(set, 1000);
		}, 1000);

		return () => window.clearTimeout(timeoutId);
	});
</script>

<div {...props} class={[customClass, "grid auto-cols-max grid-flow-col gap-5 text-center"]}>
	{#each countdownUnits as unit (unit)}
		{@const value = difference[unit]}
		{@const parts = formatters[unit].formatToParts(value)}
		<div class={[variantClass, "rounded-box flex flex-col", {"p-2": variant}]}>
			<CountdownDigit {value} digits={2} class="text-5xl" />
			<span class="text-sm">
				{parts.find(part => part.type === "unit")?.value ?? unit}
			</span>
		</div>
	{/each}
</div>

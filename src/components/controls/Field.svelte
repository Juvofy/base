<script lang="ts" module>
	import type {EventHandler, HTMLAttributes, HTMLInputAttributes} from "svelte/elements";
	import email from "@material-symbols/svg-400/rounded/mail.svg?icon";
	import password from "@material-symbols/svg-400/rounded/key_vertical.svg?icon";
	import url from "@material-symbols/svg-400/rounded/link_2.svg?icon";
	import tel from "@material-symbols/svg-400/rounded/call.svg?icon";
	import search from "@material-symbols/svg-400/rounded/search.svg?icon";
	import type {IconComponent} from "../IconComponent";
	import {event} from "@juvofy/lib/utils/event";
	import {assert} from "@juvofy/lib/utils/assert";

	export type InputType = "email" | "password" | "search" | "tel" | "text" | "url";

	const typeToSymbolMap: Record<InputType, IconComponent | null> = {
		email,
		search,
		password,
		tel,
		url,
		text: null,
	};

	export interface Props extends HTMLAttributes<HTMLInputElement> {
		value?: string;
		type?: InputType;
		disabled?: boolean;
		minlength?: number;
		maxlength?: number;
		name?: string;
		pattern?: string | RegExp;
		placeholder?: string;
		readonly?: boolean;
		required?: boolean;
		validationMessage?: string;
	}

	const typeToInputMode: Record<InputType, Extract<HTMLInputAttributes["inputmode"], string>> = {
		email: "email",
		password: "text",
		search: "search",
		tel: "tel",
		url: "url",
		text: "text",
	};
</script>

<script lang="ts">
	const componentId = $props.id();
	let {
		type = "text",
		pattern,
		id = componentId,
		class: customClass,
		value = $bindable(),
		validationMessage = $bindable(),
		...props
	}: Props = $props();

	const onvalidate: EventHandler<Event, HTMLInputElement> = event => {
		event.preventDefault();
		validationMessage = event.currentTarget.validationMessage || undefined;
	};

	const onchange: EventHandler<Event, HTMLInputElement> = event => {
		event.currentTarget.checkValidity();
		validationMessage = event.currentTarget.validationMessage || undefined;
	};

	const Symbol = $derived(typeToSymbolMap[type]);
	const errorId = $derived(`error-${id}`);
	const patternToUse = $derived.by(() => {
		if (!pattern && type === "tel") {
			return "(\\+\\d{1,3})?([0-9]|[- ]){7,15}";
		}
		if (pattern instanceof RegExp) {
			const source = pattern.source;
			assert(source.startsWith("^"), `Pattern must start with "^": ${source}`);
			assert(source.endsWith("$"), `Pattern must end with "$": ${source}`);
			assert(pattern.flags.includes("v"), `Pattern must include "v" flag: ${source}`);
			return source;
		}
		return pattern;
	});
</script>

<div>
	<label for={id} class={["input validator", customClass]}>
		{#if Symbol}
			<Symbol class="fill-current h-[1em]" />
		{/if}
		<input
			aria-invalid={validationMessage !== undefined}
			aria-errormessage={errorId}
			{...props}
			inputmode={typeToInputMode[type]}
			{type}
			{id}
			pattern={patternToUse}
			{@attach event("invalid", onvalidate)}
			{@attach event("change", onchange)}
		/>
	</label>
	<div class="validator-hint" id={errorId}>
		{validationMessage}
	</div>
</div>

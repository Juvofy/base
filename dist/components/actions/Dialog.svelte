<script lang="ts" module>import Button from "./Button.svelte";
import { event } from "@juvofy/lib/utils/event.ts";
function isInputType(options, ...inputs) {
  return inputs.includes(options.type);
}
export const escapeOnBackdrop = (event2) => {
  if (event2.target === event2.currentTarget) {
    event2.currentTarget.close();
  }
};
const SAVE_VALUE = "dialog-save-value";
</script>

<script lang="ts">let { element = $bindable(), class: customClass, ...attributes } = $props();
let options = $state();
export function close() {
  element?.close(SAVE_VALUE);
}
export function cancel() {
  element?.close();
}
export function isOpen() {
  return element ? element.open : false;
}
export function fire({
  type = "none",
  ...dialogOptions
}) {
  return new Promise((resolve, reject) => {
    if (!element) {
      return reject("Dialog element is not initialized.");
    }
    if (isOpen()) {
      return reject("Dialog is already open.");
    }
    options = {
      type,
      ...dialogOptions
    };
    element.showModal();
    element.addEventListener(
      "close",
      function() {
        if (!options || !isInputType(options, options.type)) {
          return;
        }
        resolve(this.returnValue === SAVE_VALUE && (options.value ?? type === "none"));
        this.returnValue = "";
        options = void 0;
      },
      { once: true }
    );
  });
}
const id = $props.id();
</script>

{#snippet dialogPart(value: string | true | Snippet, defaultValue?: string)}
	{#if typeof value === "function"}
		{@render value()}
	{:else if typeof value === "string"}
		{value}
	{:else}
		{defaultValue}
	{/if}
{/snippet}

<dialog
	bind:this={element}
	class={[customClass, "modal"]}
	{...attributes}
	{id}
	{@attach event("click", (options?.closeWhenBackdropClicked ?? true) ? escapeOnBackdrop : () => {})}
>
	{#if options}
		<div class="modal-box">
			<h3 class="text-lg font-bold empty:hidden">
				{options.title}
			</h3>
			{#if options.body}
				<p class="py-4">
					{@render dialogPart(options.body)}
				</p>
			{/if}
			{#if isInputType(options, "select")}
				<select class="select w-full" bind:value={options.value}>
					{#each Object.entries(options.inputOptions ?? {}) as [value, label] (value + label)}
						<option {value}>{label}</option>
					{/each}
				</select>
			{:else if isInputType(options, "textarea")}
				<textarea class="textarea w-full" {...options.inputOptions} bind:value={options.value}
				></textarea>
			{:else if isInputType(options, "checkbox", "toggle", "radio")}
				{@const rest: HTMLInputAttributes = {class: options.type, name: id}}
				<div class="flex flex-col gap-2">
					{#each Object.entries(options.inputOptions ?? {}) as [value, label], i (value + label)}
						<label class="flex gap-2">
							{#if options.type === "radio"}
								<input
									defaultChecked={!i}
									{...rest}
									{value}
									type="radio"
									bind:group={options.value}
								/>
							{:else}
								<input {...rest} {value} type="checkbox" bind:group={options.value} />
							{/if}
							<span>{label}</span>
						</label>
					{/each}
				</div>
			{:else if isInputType(options, "number", "range")}
				<input
					{...options.inputOptions}
					class={[{number: "number", range: "range"}[options.type], "w-full"]}
					bind:value={() => options!.value, v => (options!.value = Number(v))}
				/>
			{:else if isInputType(options, "tel", "email", "search", "text", "password")}
				{@const {pattern, ...props} = options.inputOptions ?? {}}
				<input
					{...props}
					class="input w-full"
					pattern={pattern?.source}
					bind:value={options.value}
				/>
			{:else if isInputType(options, "file")}
				<input
					type="file"
					class="file-input w-full"
					{...options.inputOptions}
					bind:files={options.value}
				/>
			{/if}

			<form class="modal-action" action="javascript:this.{id}.close({JSON.stringify(SAVE_VALUE)})">
				{#if options.confirmButton !== false}
					<Button
						variant="primary"
						formmethod="post"
						type="submit"
						disabled={!options.value && options?.type !== "none"}
					>
						{@render dialogPart(options?.confirmButton ?? true, "OK")}
					</Button>
				{/if}
				{#if options.cancelButton !== false}
					<Button formmethod="dialog" type="submit">
						{@render dialogPart(options?.cancelButton ?? true, "Cancel")}
					</Button>
				{/if}
			</form>
		</div>
	{/if}
</dialog>

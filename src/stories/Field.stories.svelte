<script module>
	import {defineMeta} from "@storybook/addon-svelte-csf";
	import App from "../App.svelte";
	import Field from "@juvofy/lib/components/controls/Field.svelte";

	const {Story} = defineMeta({
		title: "Controls/Field",
		argTypes: {
			type: {
				control: "select",
				options: ["text", "email", "password", "search", "tel", "url"],
			},
			placeholder: {control: "text"},
			disabled: {control: "boolean"},
			required: {control: "boolean"},
		},
	});
</script>

<Story name="Email">
	<App lang="en">
		<Field type="email" placeholder="Enter your email" />
	</App>
</Story>

<Story name="Password">
	<App lang="en">
		<Field type="password" minlength={8} />
	</App>
</Story>

<Story
	name="Interactive"
	args={{type: "email", placeholder: "Enter value...", disabled: false, required: false}}
>
	{#snippet template(args)}
		<App lang="en">
			<Field
				type={args.type}
				placeholder={args.placeholder}
				disabled={args.disabled}
				required={args.required}
			/>
		</App>
	{/snippet}
</Story>

<script lang="ts" module>import Accordion from "@juvofy/lib/components/display/Accordion.svelte";
import AccordionGroup from "@juvofy/lib/components/display/AccordionGroup.svelte";
</script>

<AccordionGroup class="w-full">
	<Accordion icon="arrow" class="bg-base-200 border-base-300 border">
		{#snippet label()}
			Lorem
		{/snippet}
		{#snippet content()}
			Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut cumque neque tenetur perferendis
			quam repellat fuga distinctio qui! Non ducimus fugiat deserunt est molestiae dolor illo odit
			accusantium dolores aperiam.
		{/snippet}
	</Accordion>
	<Accordion icon="arrow" class="bg-base-200 border-base-300 border">
		{#snippet label()}
			Lorem
		{/snippet}
		{#snippet content()}
			Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut cumque neque tenetur perferendis
			quam repellat fuga distinctio qui! Non ducimus fugiat deserunt est molestiae dolor illo odit
			accusantium dolores aperiam.
		{/snippet}
	</Accordion>
</AccordionGroup>

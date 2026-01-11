<script lang="ts" module>const svelteFiles = import.meta.glob("./*/*.svelte", {
  eager: true,
  import: "default"
});
const svelteFilesSource = import.meta.glob("./*/*.svelte", {
  eager: true,
  import: "default",
  query: "?theme=github-dark-default&shiki"
});
const sections = /* @__PURE__ */ new Map();
for (const [path, Component] of Object.entries(svelteFiles)) {
  const Source = svelteFilesSource[path];
  const [, section, name] = path.replace(".svelte", "").split("/");
  if (!Source || !section || !name) {
    throw new Error(`Invalid path: ${path}`);
  }
  const array = sections.get(section);
  if (array) {
    array.push([name, Component, Source]);
  } else {
    sections.set(section, [[name, Component, Source]]);
  }
}
</script>

<div class="flex flex-col gap-16">
	{#each sections as [name, examples] (name)}
		<section class="flex flex-col gap-4">
			<h2 class="text-4xl font-bold mb-4">{name}</h2>
			{#each examples as [name, Component, Source] (Component)}
				<article class="flex flex-col gap-4">
					<h3 class="text-2xl font-bold">{name}</h3>
					<div class="bg-base-200 p-4 rounded-box flex flex-col gap-4">
						<Component />
					</div>
					<Source />
				</article>
			{/each}
		</section>
	{/each}
</div>

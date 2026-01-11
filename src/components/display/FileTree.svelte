<script lang="ts" module>
	import Folder from "@material-symbols/svg-400/rounded/folder.svg?icon";
	import FolderOpen from "@material-symbols/svg-400/rounded/folder_open.svg?icon";
	import description from "@material-symbols/svg-400/rounded/description.svg?icon";
	import article from "@material-symbols/svg-400/rounded/article.svg?icon";
	import table_chart from "@material-symbols/svg-400/rounded/table_chart.svg?icon";
	import code from "@material-symbols/svg-400/rounded/code.svg?icon";
	import image from "@material-symbols/svg-400/rounded/image.svg?icon";
	import movie from "@material-symbols/svg-400/rounded/movie.svg?icon";
	import audio_file from "@material-symbols/svg-400/rounded/audio_file.svg?icon";
	import archive from "@material-symbols/svg-400/rounded/archive.svg?icon";
	import inventory_2 from "@material-symbols/svg-400/rounded/inventory_2.svg?icon";
	import data_object from "@material-symbols/svg-400/rounded/data_object.svg?icon";
	import terminal from "@material-symbols/svg-400/rounded/terminal.svg?icon";
	import database from "@material-symbols/svg-400/rounded/database.svg?icon";
	import picture_as_pdf from "@material-symbols/svg-400/rounded/picture_as_pdf.svg?icon";
	import draft from "@material-symbols/svg-400/rounded/draft.svg?icon";
	import type {Component} from "svelte";
	import type {HTMLAttributes, MouseEventHandler, SVGAttributes} from "svelte/elements";

	const EXTENSION_TO_SYMBOL_MAP: Record<string, Component<SVGAttributes<SVGSVGElement>>> = {
		// Document formats
		"pdf": picture_as_pdf,
		"doc": description,
		"docx": description,
		"odt": description,
		"txt": article,
		"md": article,
		"rtf": article,
		"log": article,

		// Spreadsheet and Data
		"xls": table_chart,
		"xlsx": table_chart,
		"csv": table_chart,
		"tsv": table_chart,
		"sql": database,
		"db": database,

		// Programming and Markup
		"js": code,
		"ts": code,
		"jsx": code,
		"tsx": code,
		"py": code,
		"java": code,
		"cpp": code,
		"c": code,
		"html": code,
		"css": code,
		"scss": code,

		// Media - Image
		"jpg": image,
		"jpeg": image,
		"png": image,
		"gif": image,
		"webp": image,
		"svg": image,
		"heic": image,

		// Media - Video
		"mp4": movie,
		"mov": movie,
		"avi": movie,
		"mkv": movie,
		"webm": movie,

		// Media - Audio
		"mp3": audio_file,
		"wav": audio_file,
		"flac": audio_file,
		"ogg": audio_file,
		"m4a": audio_file,

		// Compressed and Archives
		"zip": archive,
		"rar": archive,
		"7z": archive,
		"tar": inventory_2,
		"gz": inventory_2,

		// Configuration and Data Objects
		"json": data_object,
		"yaml": data_object,
		"yml": data_object,
		"xml": data_object,
		"toml": data_object,

		// Executables and Scripts
		"exe": terminal,
		"msi": terminal,
		"sh": terminal,
		"bat": terminal,
	};

	/**
	 * Determines the most appropriate Material Symbol for a given file extension.
	 *
	 * @param filenameOrPath - The full path or filename of the file.
	 * @returns The name of the Material Symbol to render.
	 */
	function getIconForFile(filenameOrPath: string) {
		if (!filenameOrPath.trim()) {
			return draft;
		}
		const lastDotIndex = filenameOrPath.lastIndexOf(".");
		const extension = filenameOrPath.slice(((lastDotIndex - 1) >>> 0) + 2).toLowerCase();

		return EXTENSION_TO_SYMBOL_MAP[extension] ?? draft;
	}

	type File = {name: string; onclick?: MouseEventHandler<HTMLButtonElement>};
	type Folder = {name: string; content: (File | Folder)[]};

	export interface Props extends HTMLAttributes<HTMLUListElement> {
		content: Folder["content"];
		children?: never;
	}
</script>

<script lang="ts">
	const {content, class: customClass, ...rest}: Props = $props();
</script>

{#snippet buildContent(content: Folder["content"])}
	{#each content as item (item.name)}
		<li>
			{#if "content" in item}
				<details>
					<summary>
						<FolderOpen class="size-4 fill-current [details:not(:open)>summary>&]:hidden" />
						<Folder class="size-4 fill-current [details:open>summary>&]:hidden" />
						{item.name}
					</summary>
					<ul>
						{@render buildContent(item.content)}
					</ul>
				</details>
			{:else}
				{@const Icon = getIconForFile(item.name)}
				<button onclick={item.onclick} type="button">
					<Icon class="size-4 fill-current" />
					{item.name}
				</button>
			{/if}
		</li>
	{/each}
{/snippet}

<ul class={["menu menu-xs bg-base-200 rounded-box max-w-xs w-full", customClass]} {...rest}>
	{@render buildContent(content)}
</ul>

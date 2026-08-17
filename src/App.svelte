<script lang="ts" module>
	import Dialog from "./components/actions/Dialog.svelte";
	import Toast from "./components/feedback/Toast.svelte";
	import {createContext, type Snippet} from "svelte";
	import "./app.tw.css";

	export class AppState {
		public toast = $state<Toast>({
			addToQueue() {
				// Toast is not initialized.
			},
		});
		public dialog = $state<Dialog>({
			cancel() {
				// Dialog is not initialized.
			},
			close() {
				// Dialog is not initialized.
			},
			fire: () => Promise.resolve(false),
			isOpen: () => false,
		});

		public theme = $state("light-custom");
	}

	const [getApp, setApp] = createContext<AppState>();
	export {getApp};

	export const [getLocale, setLocale] = createContext<() => string>();
</script>

<script lang="ts">
	const app = new AppState();
	setApp(app);

	const {children, lang}: {children: Snippet; lang: string} = $props();

	setLocale(() => lang);
</script>

<div class="contents" {lang}>
	{@render children()}

	<Dialog bind:this={app.dialog} />
	<Toast bind:this={app.toast} />
</div>

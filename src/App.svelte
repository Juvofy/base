<script lang="ts" module>
	import Dialog from "./components/actions/Dialog.svelte";
	import Toast from "./components/feedback/Toast.svelte";
	import {createContext, type Snippet} from "svelte";

	export class App {
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

	const [getApp, setApp] = createContext<App>();
	export {getApp};

	const [getLocale, setLocale] = createContext<string>();
	export {getLocale};
</script>

<script lang="ts">
	const app = new App();
	setApp(app);
	setLocale(document.documentElement.lang);

	const {children}: {children: Snippet} = $props();
</script>

<Dialog bind:this={app.dialog} />
<Toast bind:this={app.toast} />

{@render children()}

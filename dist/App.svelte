<script lang="ts" module>import Dialog from "./components/actions/Dialog.svelte";
import Toast from "./components/feedback/Toast.svelte";
import { createContext } from "svelte";
import "./app.tw.css";
export class AppState {
  toast = $state({
    addToQueue() {
    }
  });
  dialog = $state({
    cancel() {
    },
    close() {
    },
    fire: () => Promise.resolve(false),
    isOpen: () => false
  });
  theme = $state("light-custom");
}
const [getApp, setApp] = createContext();
export { getApp };
const [getLocale, setLocale] = createContext();
export { getLocale };
</script>

<script lang="ts">const app = new AppState();
setApp(app);
setLocale(document.documentElement.lang);
const { children } = $props();
</script>

<Dialog bind:this={app.dialog} />
<Toast bind:this={app.toast} />

{@render children()}

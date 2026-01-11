import { mount } from "svelte";
import "./app.tw.css";
import Examples from "./examples/Examples.svelte";
const app = mount(Examples, {
    target: document.body.appendChild(document.createElement("div")),
});
export default app;

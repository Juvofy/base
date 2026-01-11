import { on } from "svelte/events";
export function event(event, action) {
    return function (element) {
        return action && on(element, event, action);
    };
}

import { tw } from "@juvofy/lib/utils/tw";
import type { HTMLAttributes } from "svelte/elements";
import type { Snippet } from "svelte";
declare const sizes: tw.Prefixed<["card-xs", "card-sm", "card-md", "card-lg", "card-xl"], tw.PrefixedMap<["card-xs", "card-sm", "card-md", "card-lg", "card-xl"], "card">>;
declare const decorations: tw.Prefixed<["card-border", "card-dash"], tw.PrefixedMap<["card-border", "card-dash"], "card">>;
export interface Props extends HTMLAttributes<HTMLDivElement> {
    image?: Snippet;
    decoration?: tw.InferPrefixed<typeof decorations>;
    size?: tw.InferPrefixed<typeof sizes>;
}
declare const Card: import("svelte").Component<Props, {}, "">;
type Card = ReturnType<typeof Card>;
export default Card;

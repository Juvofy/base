import type {HTMLAttributes} from "svelte/elements";

export interface Props extends HTMLAttributes<HTMLDivElement> {
	vars: {
		raw: string;
		filename: string;
	};
}

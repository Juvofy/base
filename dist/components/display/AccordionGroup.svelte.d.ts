import type { HTMLAttributes } from "svelte/elements";
export interface Props extends HTMLAttributes<HTMLDivElement> {
    name?: string;
}
declare const getAccordion: () => {
    name: string;
};
export { getAccordion };
declare const AccordionGroup: import("svelte").Component<Props, {}, "">;
type AccordionGroup = ReturnType<typeof AccordionGroup>;
export default AccordionGroup;

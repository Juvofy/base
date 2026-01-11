import "cally";
import type { CalendarDateProps, CalendarRangeProps } from "cally";
import type { HTMLAttributes } from "svelte/elements";
import type { PropsUnion } from "@juvofy/lib/utils/PropsUnion";
type PropMap = {
    range: CalendarRangeProps;
    date: CalendarDateProps;
};
export type CalendarType = keyof PropMap;
type Base<Type extends CalendarType> = Omit<PropMap[Type], `on${string}` | "locale"> & {
    onchange?(this: void): void;
    onfocusday?(this: void, value: Date): void;
    onrangeend?: Type extends "range" ? (this: void, value: Date) => void : never;
    onrangestart?: Type extends "range" ? (this: void, value: Date) => void : never;
};
export type Props<Type extends CalendarType> = HTMLAttributes<HTMLElementTagNameMap[`calendar-${Type}`]> & PropsUnion<Base<"range">, Base<"date">> & {
    type: Type;
};
declare function $$render<Type extends CalendarType>(): {
    props: Props<Type>;
    exports: {};
    bindings: "value";
    slots: {};
    events: {};
};
declare class __sveltets_Render<Type extends CalendarType> {
    props(): ReturnType<typeof $$render<Type>>['props'];
    events(): ReturnType<typeof $$render<Type>>['events'];
    slots(): ReturnType<typeof $$render<Type>>['slots'];
    bindings(): "value";
    exports(): {};
}
interface $$IsomorphicComponent {
    new <Type extends CalendarType>(options: import('svelte').ComponentConstructorOptions<ReturnType<__sveltets_Render<Type>['props']>>): import('svelte').SvelteComponent<ReturnType<__sveltets_Render<Type>['props']>, ReturnType<__sveltets_Render<Type>['events']>, ReturnType<__sveltets_Render<Type>['slots']>> & {
        $$bindings?: ReturnType<__sveltets_Render<Type>['bindings']>;
    } & ReturnType<__sveltets_Render<Type>['exports']>;
    <Type extends CalendarType>(internal: unknown, props: ReturnType<__sveltets_Render<Type>['props']> & {}): ReturnType<__sveltets_Render<Type>['exports']>;
    z_$$bindings?: ReturnType<__sveltets_Render<any>['bindings']>;
}
declare const Calendar: $$IsomorphicComponent;
type Calendar<Type extends CalendarType> = InstanceType<typeof Calendar<Type>>;
export default Calendar;

import { type Props, type CalendarType } from "./Calendar.svelte";
export type { Props, CalendarType };
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
declare const DatePicker: $$IsomorphicComponent;
type DatePicker<Type extends CalendarType> = InstanceType<typeof DatePicker<Type>>;
export default DatePicker;

import type { ClassValue } from "svelte/elements";
/** Provides autocompletion for tailwindcss */
declare function tw<const T extends ClassValue[]>(...classes: T): T;
declare namespace tw {
    var map: <K extends string>(object: Record<K, ClassValue>) => Record<K, ClassValue>;
    var prefixed: <const Keys extends [string, ...string[]]>(...keys: Keys) => tw.Prefixed<Keys>;
}
declare namespace tw {
    type ExtractPrefix<T extends string> = T extends `${infer Prefix}-${infer Postfix}` ? ExtractPrefix<Postfix> extends "" ? Prefix : `${Prefix}-${ExtractPrefix<Postfix>}` : "";
    type PrefixedMap<Keys extends string[], Prefix extends string> = {
        [K in keyof Keys as Keys[K] extends `${Prefix}-${infer Variant}` ? Variant : never]: Keys[K];
    };
    type Prefixed<Keys extends string[], Map extends object = PrefixedMap<Keys, ExtractPrefix<Keys[number]>>> = <K extends keyof Map>(key?: K) => Map[K] | undefined;
    type InferPrefixed<P extends Prefixed<string[], object>> = Parameters<P>[0];
}
export { tw };

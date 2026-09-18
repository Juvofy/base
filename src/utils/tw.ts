import type {ClassValue} from "svelte/elements";
import {assert} from "./assert.js";

/**
 * Provides editor autocompletion for Tailwind classes without changing the value at runtime -
 * it just returns its arguments as-is. Meant to be used wherever you'd otherwise write a plain
 * array/string of classes, so tools like the Tailwind IntelliSense extension can recognize it.
 *
 * @example
 * ```ts
 * const classes = tw("flex", "items-center", "gap-2");
 * // classes === ["flex", "items-center", "gap-2"]
 * ```
 */
function tw<const T extends ClassValue[]>(...classes: T): T {
	return classes;
}

/**
 * Like {@link tw}, but for an object of named class groups instead of a flat list - handy for
 * `daisyui`/variant-style class maps where each key documents what the classes are for.
 *
 * @example
 * ```ts
 * const variants = tw.map({
 *   primary: "bg-primary text-primary-content",
 *   ghost: "bg-transparent",
 * });
 * ```
 */
tw.map = function <K extends string>(object: Record<K, ClassValue>) {
	return object;
};

declare namespace tw {
	export type ExtractPrefix<T extends string> = T extends `${infer Prefix}-${infer Postfix}`
		? ExtractPrefix<Postfix> extends ""
			? Prefix
			: `${Prefix}-${ExtractPrefix<Postfix>}`
		: "";

	export type PrefixedMap<Keys extends string[], Prefix extends string> = {
		[K in keyof Keys as Keys[K] extends `${Prefix}-${infer Variant}` ? Variant : never]: Keys[K];
	};

	export type Prefixed<
		Keys extends string[],
		Map extends object = PrefixedMap<Keys, ExtractPrefix<Keys[number]>>,
	> = <K extends keyof Map>(key?: K) => Map[K] | undefined;

	export type InferPrefixed<P extends Prefixed<string[], object>> = Parameters<P>[0];
}

/**
 * Given a list of dash-prefixed keys that all share the same prefix (e.g. Tailwind's
 * `"btn-primary"`, `"btn-secondary"`), finds that shared prefix and returns a function that
 * turns a bare suffix (`"primary"`) back into the full key (`"btn-primary"`) - with the suffix
 * autocompleted/type-checked against the keys you passed in. Calling the returned function with
 * `undefined` returns `undefined`, so it's safe to use directly with an optional prop.
 *
 * @example
 * ```ts
 * const variant = tw.prefixed("btn-primary", "btn-secondary", "btn-ghost");
 * variant("primary"); // "btn-primary"
 * variant(undefined); // undefined
 * ```
 */
tw.prefixed = function <const Keys extends [string, ...string[]]>(...keys: Keys) {
	const [firstKey, ...restKeys] = keys;

	let prefixLength = 0;

	while (prefixLength < firstKey.length) {
		if (restKeys.every(key => key[prefixLength] === firstKey[prefixLength])) {
			prefixLength++;
		} else {
			break;
		}
	}

	assert(firstKey[prefixLength - 1] === "-", "Prefix must end with a dash");
	return ((v?: string) => v && firstKey.slice(0, prefixLength) + v) as tw.Prefixed<Keys>;
};

export {tw};

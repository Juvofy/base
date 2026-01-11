import type {ClassValue} from "svelte/elements";
import {assert} from "./assert";

/** Provides autocompletion for tailwindcss */
function tw<const T extends ClassValue[]>(...classes: T): T {
	return classes;
}

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

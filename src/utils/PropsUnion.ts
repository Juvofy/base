type PropsUnionPart<A, B> = A & {
	[K in keyof B as K extends keyof A ? never : K]?: undefined;
};

/**
 * Combines two prop shapes `A` and `B` into a discriminated-by-presence union: a value must
 * satisfy `A` *or* `B`, but can't mix fields from both. Unlike a plain `A | B`, every field
 * unique to the other side is still listed (as optional `undefined`), so destructuring or
 * narrowing on those keys doesn't require a cast.
 *
 * @example
 * ```ts
 * type Props = PropsUnion<{href: string}, {onclick: () => void}>;
 * // OK: { href: string }
 * // OK: { onclick: () => void }
 * // Error: { href: string; onclick: () => void } - can't have both
 * ```
 */
export type PropsUnion<A, B> = PropsUnionPart<A, B> | PropsUnionPart<B, A>;

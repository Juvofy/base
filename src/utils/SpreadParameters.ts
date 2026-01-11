/**
 * Type that every `Parameters<?>` type satisfies.
 *
 * ```ts
 * declare function array<T extends SpreadParameters>(...array: T): T;
 * ```
 */
export type SpreadParameters = [] | any[];

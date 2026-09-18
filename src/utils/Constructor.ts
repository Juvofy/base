import type {SpreadParameters} from "./SpreadParameters";

/**
 * Matches any class (concrete or `abstract`) that produces instances of `T`, regardless of its
 * constructor's argument list. Useful for mixin functions and factories that accept "a class",
 * not just "a value".
 *
 * @example
 * ```ts
 * function withTimestamp<T extends Constructor<object>>(Base: T) {
 *   return class extends Base {
 *     createdAt = new Date();
 *   };
 * }
 * ```
 */
export type Constructor<T> = abstract new (...args: SpreadParameters) => T;

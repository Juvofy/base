/**
 * Asserts that a condition is true, narrowing its type for the rest of the scope. Throws
 * otherwise. Unlike Node's `assert`, the thrown value is whatever you pass in `thrown` -
 * not wrapped in an `AssertionError` - so you can throw your own error instances.
 *
 * @param condition Condition to assert
 * @param thrown Optional value to throw if the condition is false. If not provided, the undefined value will be thrown.
 *
 * @example
 * ```ts
 * function getFirst<T>(items: T[]): T {
 *   assert(items.length > 0, new Error("items must not be empty"));
 *   // `items[0]` is safe here, and items.length is known to be > 0.
 *   return items[0];
 * }
 * ```
 */
function assert(condition: unknown, thrown?: unknown): asserts condition {
	if (!condition) {
		throw thrown;
	}
}

assert.ok = assert;
export {assert, assert as ok};
export default assert;

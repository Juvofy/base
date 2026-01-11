/**
 * Asserts that a condition is true.
 *
 * @param condition Condition to assert
 * @param thrown Optional value to throw if the condition is false. If not provided, the undefined value will be thrown.
 */
export function assert(condition, thrown) {
    if (!condition) {
        throw thrown;
    }
}

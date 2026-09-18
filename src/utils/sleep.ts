/**
 * Returns a `Promise` that resolves after `ms` milliseconds. A `setTimeout` you can `await`.
 *
 * @param ms Delay in milliseconds.
 *
 * @example
 * ```ts
 * console.log("start");
 * await sleep(1000);
 * console.log("one second later");
 * ```
 */
export function sleep(ms: number) {
	return new Promise<void>(resolve => setTimeout(resolve, ms));
}

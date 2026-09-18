/**
 * A lazy, iterable numeric range from `start` (inclusive) to `end` (exclusive), stepping by
 * `step` each time. Counts down instead of up when `step` is negative. Usually created via the
 * {@link range} helper rather than directly.
 *
 * @example
 * ```ts
 * [...new Range(0, 5, 1)]; // [0, 1, 2, 3, 4]
 * [...new Range(10, 0, -2)]; // [10, 8, 6, 4, 2]
 * ```
 */
export class Range implements Iterable<number> {
	public readonly step: number;
	public readonly end: number;
	public readonly start: number;

	constructor(start: number, end: number, step: number) {
		this.start = start;
		this.end = end;
		this.step = step;
	}

	*[Symbol.iterator](): Iterator<number> {
		let current = this.start;

		while (this.step > 0 ? current < this.end : current > this.end) {
			yield current;
			current += this.step;
		}
	}
}

/**
 * Builds a {@link Range} - a lazy iterable of numbers - Python-`range()`-style: one argument is
 * the exclusive end (starting at 0), two arguments are start and end, and three add a step.
 *
 * @example
 * ```ts
 * [...range(3)]; // [0, 1, 2]
 * [...range(2, 5)]; // [2, 3, 4]
 * [...range(0, 10, 3)]; // [0, 3, 6, 9]
 *
 * for (const i of range(5)) {
 *   console.log(i);
 * }
 * ```
 */
function range(end: number): Range;
function range(start: number, end: number): Range;
function range(start: number, end: number, step: number): Range;
function range(start: number, end?: number, step = 1): Range {
	if (typeof end === "undefined") {
		return new Range(0, start, step);
	}
	return new Range(start, end, step);
}

export {range};

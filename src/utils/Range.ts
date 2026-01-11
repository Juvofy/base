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

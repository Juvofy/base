export class Range {
    step;
    end;
    start;
    constructor(start, end, step) {
        this.start = start;
        this.end = end;
        this.step = step;
    }
    *[Symbol.iterator]() {
        let current = this.start;
        while (this.step > 0 ? current < this.end : current > this.end) {
            yield current;
            current += this.step;
        }
    }
}
function range(start, end, step = 1) {
    if (typeof end === "undefined") {
        return new Range(0, start, step);
    }
    return new Range(start, end, step);
}
export { range };

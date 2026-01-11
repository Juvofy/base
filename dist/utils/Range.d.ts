export declare class Range implements Iterable<number> {
    readonly step: number;
    readonly end: number;
    readonly start: number;
    constructor(start: number, end: number, step: number);
    [Symbol.iterator](): Iterator<number>;
}
declare function range(end: number): Range;
declare function range(start: number, end: number): Range;
declare function range(start: number, end: number, step: number): Range;
export { range };

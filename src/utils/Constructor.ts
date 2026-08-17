import type {SpreadParameters} from "./SpreadParameters";

export type Constructor<T> = abstract new (...args: SpreadParameters) => T;

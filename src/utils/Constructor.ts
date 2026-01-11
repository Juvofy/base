import type {SpreadParameters} from "./SpreadParameters";

export type Constructor<T = any> = abstract new (...args: SpreadParameters) => T;

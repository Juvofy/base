import type { SpreadParameters } from "./SpreadParameters";
type TaskValue<Result, Args extends SpreadParameters> = {
    status: "initial";
} | {
    status: "loading";
    promise: Promise<Result>;
    args: Args;
} | {
    status: "success";
    result: Result;
} | {
    status: "error";
    error: unknown;
};
export declare class Task<Result, Args extends SpreadParameters = []> {
    value: TaskValue<Result, Args>;
    private readonly callback;
    constructor(callback: (...args: Args) => Promise<Result>);
    start(...args: Args): Promise<Result>;
    hasStatus<S extends TaskValue<Result, Args>["status"]>(status: S): this is Task<Result, Args> & {
        value: Extract<TaskValue<Result, Args>, {
            status: S;
        }>;
    };
}
export {};

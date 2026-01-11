import type { SpreadParameters } from "./SpreadParameters";
type TaskValue<Result, Variables extends SpreadParameters> = {
    status: "initial";
} | {
    status: "loading";
    promise: Promise<Result>;
    variables: Variables;
} | {
    status: "success";
    result: Result;
} | {
    status: "error";
    error: unknown;
};
export declare class Task<Result, Variables extends SpreadParameters = []> {
    value: TaskValue<Result, Variables>;
    private readonly callback;
    constructor(callback: (...variables: Variables) => Promise<Result>);
    start(...variables: Variables): Promise<Result>;
    hasStatus<S extends TaskValue<Result, Variables>["status"]>(status: S): this is Task<Result, Variables> & {
        value: Extract<TaskValue<Result, Variables>, {
            status: S;
        }>;
    };
}
export {};

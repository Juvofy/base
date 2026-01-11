import type {SpreadParameters} from "./SpreadParameters";

type TaskValue<Result, Args extends SpreadParameters> =
	| {status: "initial"}
	| {status: "loading"; promise: Promise<Result>; args: Args}
	| {status: "success"; result: Result}
	| {status: "error"; error: unknown};

export class Task<Result, Args extends SpreadParameters = []> {
	public value = $state.raw<TaskValue<Result, Args>>({status: "initial"});
	private readonly callback: (...args: Args) => Promise<Result>;

	constructor(callback: (...args: Args) => Promise<Result>) {
		this.callback = callback;
	}

	public async start(...args: Args): Promise<Result> {
		const promise = this.callback(...args);
		this.value = {
			status: "loading",
			promise,
			args,
		};
		try {
			const result = await promise;
			if (this.value.status === "loading" && promise === this.value.promise) {
				this.value = {
					status: "success",
					result,
				};
			}
			return result;
		} catch (error) {
			if (this.value.status === "loading" && promise === this.value.promise) {
				this.value = {status: "error", error};
			}
			throw error;
		}
	}

	public hasStatus<S extends TaskValue<Result, Args>["status"]>(
		status: S
	): this is Task<Result, Args> & {value: Extract<TaskValue<Result, Args>, {status: S}>} {
		return this.value.status === status;
	}
}

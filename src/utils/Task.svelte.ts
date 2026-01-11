import type {SpreadParameters} from "./SpreadParameters";

type TaskValue<Result, Variables extends SpreadParameters> =
	| {status: "initial"}
	| {status: "loading"; promise: Promise<Result>; variables: Variables}
	| {status: "success"; result: Result}
	| {status: "error"; error: unknown};

export class Task<Result, Variables extends SpreadParameters = []> {
	public value = $state.raw<TaskValue<Result, Variables>>({status: "initial"});
	private readonly callback: (...variables: Variables) => Promise<Result>;

	constructor(callback: (...variables: Variables) => Promise<Result>) {
		this.callback = callback;
	}

	public async start(...variables: Variables): Promise<Result> {
		const promise = this.callback(...variables);
		this.value = {
			status: "loading",
			promise,
			variables,
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

	public hasStatus<S extends TaskValue<Result, Variables>["status"]>(
		status: S
	): this is Task<Result, Variables> & {value: Extract<TaskValue<Result, Variables>, {status: S}>} {
		return this.value.status === status;
	}
}

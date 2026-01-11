export class Task {
    value = $state.raw({ status: "initial" });
    callback;
    constructor(callback) {
        this.callback = callback;
    }
    async start(...args) {
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
        }
        catch (error) {
            if (this.value.status === "loading" && promise === this.value.promise) {
                this.value = { status: "error", error };
            }
            throw error;
        }
    }
    hasStatus(status) {
        return this.value.status === status;
    }
}

export class InvalidPathError extends DOMException {
	public readonly path: string;

	constructor(path: string) {
		super(`String '${path}' is not a valid path.`, "InvalidPathError");
		this.path = path;
	}
}

export class EntryAlreadyExistsError extends DOMException {
	public readonly path: string;

	constructor(path: string) {
		super(`Entry '${path}' already exists.`, "EntryAlreadyExistsError");
		this.path = path;
	}
}

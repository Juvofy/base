export function createFileSystemError(name: string, defaultMessage?: ((path: string) => string) | string) {
	return class FileSystemError extends DOMException {
		public static defaultMessage = defaultMessage;
		public readonly path: string;

		constructor(path: string, message = defaultMessage) {
			super(typeof message === "function" ? message(path) : message, name);
			this.path = path;
		}
	};
}

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

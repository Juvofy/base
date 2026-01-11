export function createFileSystemError(name, defaultMessage) {
    return class FileSystemError extends DOMException {
        static defaultMessage = defaultMessage;
        path;
        constructor(path, message = defaultMessage) {
            super(typeof message === "function" ? message(path) : message, name);
            this.path = path;
        }
    };
}
export class InvalidPathError extends DOMException {
    path;
    constructor(path) {
        super(`String '${path}' is not a valid path.`, "InvalidPathError");
        this.path = path;
    }
}
export class EntryAlreadyExistsError extends DOMException {
    path;
    constructor(path) {
        super(`Entry '${path}' already exists.`, "EntryAlreadyExistsError");
        this.path = path;
    }
}

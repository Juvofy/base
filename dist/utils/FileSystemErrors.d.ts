export declare class InvalidPathError extends DOMException {
    readonly path: string;
    constructor(path: string);
}
export declare class EntryAlreadyExistsError extends DOMException {
    readonly path: string;
    constructor(path: string);
}

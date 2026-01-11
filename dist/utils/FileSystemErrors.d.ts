export declare function createFileSystemError(name: string, defaultMessage?: ((path: string) => string) | string): {
    new (path: string, message?: string | ((path: string) => string) | undefined): {
        readonly path: string;
        readonly code: number;
        readonly message: string;
        readonly name: string;
        readonly INDEX_SIZE_ERR: 1;
        readonly DOMSTRING_SIZE_ERR: 2;
        readonly HIERARCHY_REQUEST_ERR: 3;
        readonly WRONG_DOCUMENT_ERR: 4;
        readonly INVALID_CHARACTER_ERR: 5;
        readonly NO_DATA_ALLOWED_ERR: 6;
        readonly NO_MODIFICATION_ALLOWED_ERR: 7;
        readonly NOT_FOUND_ERR: 8;
        readonly NOT_SUPPORTED_ERR: 9;
        readonly INUSE_ATTRIBUTE_ERR: 10;
        readonly INVALID_STATE_ERR: 11;
        readonly SYNTAX_ERR: 12;
        readonly INVALID_MODIFICATION_ERR: 13;
        readonly NAMESPACE_ERR: 14;
        readonly INVALID_ACCESS_ERR: 15;
        readonly VALIDATION_ERR: 16;
        readonly TYPE_MISMATCH_ERR: 17;
        readonly SECURITY_ERR: 18;
        readonly NETWORK_ERR: 19;
        readonly ABORT_ERR: 20;
        readonly URL_MISMATCH_ERR: 21;
        readonly QUOTA_EXCEEDED_ERR: 22;
        readonly TIMEOUT_ERR: 23;
        readonly INVALID_NODE_TYPE_ERR: 24;
        readonly DATA_CLONE_ERR: 25;
        stack?: string;
        cause?: unknown;
    };
    defaultMessage: string | ((path: string) => string) | undefined;
    readonly INDEX_SIZE_ERR: 1;
    readonly DOMSTRING_SIZE_ERR: 2;
    readonly HIERARCHY_REQUEST_ERR: 3;
    readonly WRONG_DOCUMENT_ERR: 4;
    readonly INVALID_CHARACTER_ERR: 5;
    readonly NO_DATA_ALLOWED_ERR: 6;
    readonly NO_MODIFICATION_ALLOWED_ERR: 7;
    readonly NOT_FOUND_ERR: 8;
    readonly NOT_SUPPORTED_ERR: 9;
    readonly INUSE_ATTRIBUTE_ERR: 10;
    readonly INVALID_STATE_ERR: 11;
    readonly SYNTAX_ERR: 12;
    readonly INVALID_MODIFICATION_ERR: 13;
    readonly NAMESPACE_ERR: 14;
    readonly INVALID_ACCESS_ERR: 15;
    readonly VALIDATION_ERR: 16;
    readonly TYPE_MISMATCH_ERR: 17;
    readonly SECURITY_ERR: 18;
    readonly NETWORK_ERR: 19;
    readonly ABORT_ERR: 20;
    readonly URL_MISMATCH_ERR: 21;
    readonly QUOTA_EXCEEDED_ERR: 22;
    readonly TIMEOUT_ERR: 23;
    readonly INVALID_NODE_TYPE_ERR: 24;
    readonly DATA_CLONE_ERR: 25;
};
export declare class InvalidPathError extends DOMException {
    readonly path: string;
    constructor(path: string);
}
export declare class EntryAlreadyExistsError extends DOMException {
    readonly path: string;
    constructor(path: string);
}

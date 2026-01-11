/**
 * A wrapper for the File System Access API (OPFS) providing
 * high-level utility methods for file and directory management.
 */
export declare class FileSystem {
    #private;
    constructor(root: FileSystemDirectoryHandle);
    /** The name of the current directory handle. */
    get name(): string;
    /**
     * Initializes the FileSystem by requesting the origin private file system root.
     * @returns A promise resolving to a new FileSystem instance.
     */
    static boot(): Promise<FileSystem>;
    /**
     * Writes data to a file. Creates the file and parent directories if they don't exist.
     * @param path Path where the file should be saved.
     * @param data Content to write (Blob, String, etc).
     * @param options.type MIME type for the file.
     * @param options.silent If true, overwrites existing files without throwing an error.
     */
    writeFile(path: string, data: BlobPart, { type, silent }?: {
        type?: string | undefined;
        silent?: boolean | undefined;
    }): Promise<void>;
    /**
     * Retrieves the File object for a given path.
     */
    getFile(path: string): Promise<File>;
    /**
     * Ensures a file exists at the given path without writing data to it.
     */
    createFilePath(path: string): Promise<void>;
    /**
     * Returns a new FileSystem instance scoped to the provided directory path.
     */
    getDirectory(path: string, create?: boolean): Promise<FileSystem>;
    /**
     * Creates a directory (and any necessary parent directories).
     */
    createDirectory(path: string): Promise<void>;
    /**
     * Checks if a file exists at the specified path.
     */
    fileExists(path: string): Promise<boolean>;
    /**
     * Lists the names of all entries in a directory.
     */
    list(path?: string): Promise<string[]>;
    /**
     * Returns the File or FileSystem (directory) objects for all items in a path.
     */
    listContents(path?: string): Promise<(File | FileSystem)[]>;
    /**
     * Removes a file or directory.
     * @param path The path to the entry.
     */
    deleteFile(path: string): Promise<void>;
}
declare global {
    interface FileSystemDirectoryHandle {
        keys(): AsyncIterableIterator<string>;
        values(): AsyncIterableIterator<FileSystemFileHandle | FileSystemDirectoryHandle>;
    }
}

import { assert } from "./assert";
import { InvalidPathError, EntryAlreadyExistsError } from "./FileSystemErrors";
/**
 * A wrapper for the File System Access API (OPFS) providing
 * high-level utility methods for file and directory management.
 */
export class FileSystem {
    #root;
    constructor(root) {
        this.#root = root;
    }
    /** The name of the current directory handle. */
    get name() {
        return this.#root.name;
    }
    /**
     * Initializes the FileSystem by requesting the origin private file system root.
     * @returns A promise resolving to a new FileSystem instance.
     */
    static async boot() {
        return new this(await navigator.storage.getDirectory());
    }
    /**
     * Internal helper to split a path into parent segments and the final target name.
     * @throws {InvalidPathError} If the path is empty or malformed.
     */
    #processFilePath(path) {
        const segments = path.split("/");
        const filename = segments.pop();
        assert(filename, new InvalidPathError(path));
        return { segments, filename };
    }
    /**
     * Retrieves a file handle from a path.
     */
    async #getFileHandle(path, { create = false, silent = false }) {
        const { segments, filename } = this.#processFilePath(path);
        const directory = await this.#getDirectoryFromSegments(segments, create);
        if (!silent && (await this.#doesFileExist(filename, directory))) {
            throw new EntryAlreadyExistsError(path);
        }
        return directory.getFileHandle(filename, { create });
    }
    /**
     * Recursively traverses directory segments to find or create a target directory.
     */
    async #getDirectoryFromSegments([first, ...segments], create, dir = this.#root) {
        if (first) {
            return this.#getDirectoryFromSegments(segments, create, await dir.getDirectoryHandle(first, { create }));
        }
        else {
            return dir;
        }
    }
    /**
     * Checks if a file exists within a specific directory handle.
     */
    async #doesFileExist(name, dir) {
        try {
            await dir.getFileHandle(name);
            return true;
        }
        catch (error) {
            if (error instanceof DOMException && error.name === "NotFoundError") {
                return false;
            }
            throw error;
        }
    }
    /**
     * Writes data to a file. Creates the file and parent directories if they don't exist.
     * @param path Path where the file should be saved.
     * @param data Content to write (Blob, String, etc).
     * @param options.type MIME type for the file.
     * @param options.silent If true, overwrites existing files without throwing an error.
     */
    async writeFile(path, data, { type = "", silent = false } = {}) {
        const file = await this.#getFileHandle(path, { create: true, silent });
        const blob = data instanceof Blob && !type ? data : new Blob([data], { type });
        const writable = await file.createWritable();
        await writable.write(blob);
        await writable.close();
    }
    /**
     * Retrieves the File object for a given path.
     */
    async getFile(path) {
        const file = await this.#getFileHandle(path, { create: true, silent: true });
        return file.getFile();
    }
    /**
     * Ensures a file exists at the given path without writing data to it.
     */
    async createFilePath(path) {
        await this.#getFileHandle(path, { create: true });
    }
    /**
     * Returns a new FileSystem instance scoped to the provided directory path.
     */
    async getDirectory(path, create = false) {
        const root = await this.#getDirectoryFromSegments(path.split("/"), create);
        return new FileSystem(root);
    }
    /**
     * Creates a directory (and any necessary parent directories).
     */
    async createDirectory(path) {
        await this.#getDirectoryFromSegments(path.split("/"), true);
    }
    /**
     * Checks if a file exists at the specified path.
     */
    async fileExists(path) {
        const { segments, filename } = this.#processFilePath(path);
        const directory = await this.#getDirectoryFromSegments(segments, false);
        return this.#doesFileExist(filename, directory);
    }
    /**
     * Lists the names of all entries in a directory.
     */
    async list(path = "") {
        const dir = await this.#getDirectoryFromSegments(path.split("/"), false);
        const result = [];
        for await (const f of dir.keys()) {
            result.push(f);
        }
        return result;
    }
    /**
     * Returns the File or FileSystem (directory) objects for all items in a path.
     */
    async listContents(path = "") {
        const dir = await this.#getDirectoryFromSegments(path.split("/"), false);
        const result = [];
        for await (const f of dir.values()) {
            if (f.kind === "file") {
                result.push(await f.getFile());
            }
            else {
                result.push(new FileSystem(f));
            }
        }
        return result;
    }
    /**
     * Removes a file or directory.
     * @param path The path to the entry.
     */
    async deleteFile(path) {
        const { segments, filename } = this.#processFilePath(path);
        const directory = await this.#getDirectoryFromSegments(segments, false);
        await directory.removeEntry(filename);
    }
}

import { assert } from "./assert.ts";
import { InvalidPathError, EntryAlreadyExistsError } from "./FileSystemErrors.ts";
export class FileSystem {
    root;
    constructor(root) {
        this.root = root;
    }
    get name() {
        return this.root.name;
    }
    static async boot() {
        return new this(await navigator.storage.getDirectory());
    }
    processFilePath(path) {
        const segments = path.split("/");
        const filename = segments.pop();
        assert(filename, new InvalidPathError(path));
        return { segments, filename };
    }
    async getFileHandle(path, { create = false, silent = false }) {
        const { segments, filename } = this.processFilePath(path);
        const directory = await this.getDirectoryFromSegments(segments, create);
        if (!silent && (await this.doesFileExist(filename, directory))) {
            throw new EntryAlreadyExistsError(path);
        }
        return directory.getFileHandle(filename, { create });
    }
    async getDirectoryFromSegments([first, ...segments], create, dir = this.root) {
        if (first) {
            return this.getDirectoryFromSegments(segments, create, await dir.getDirectoryHandle(first, { create }));
        }
        else {
            return dir;
        }
    }
    async doesFileExist(name, dir) {
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
    async writeFile(path, data, { type = "", silent = false }) {
        const file = await this.getFileHandle(path, { create: true, silent });
        const blob = data instanceof Blob && !type ? data : new Blob([data], { type });
        const writable = await file.createWritable();
        await writable.write(blob);
        await writable.close();
    }
    async getFile(path) {
        const file = await this.getFileHandle(path, { create: true });
        return file.getFile();
    }
    async createFilePath(path) {
        await this.getFileHandle(path, { create: true });
    }
    async getDirectory(path, create = false) {
        const root = await this.getDirectoryFromSegments(path.split("/"), create);
        return new FileSystem(root);
    }
    async createDirectory(path) {
        await this.getDirectoryFromSegments(path.split("/"), true);
    }
    async fileExists(path) {
        const { segments, filename } = this.processFilePath(path);
        const directory = await this.getDirectoryFromSegments(segments, false);
        return this.doesFileExist(filename, directory);
    }
    async list(path = "") {
        const dir = await this.getDirectoryFromSegments(path.split("/"), false);
        const result = [];
        for await (const f of dir.keys()) {
            result.push(f);
        }
        return result;
    }
    async listContents(path = "") {
        const dir = await this.getDirectoryFromSegments(path.split("/"), false);
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
}

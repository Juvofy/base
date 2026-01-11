export declare class FileSystem {
    private readonly root;
    private constructor();
    get name(): string;
    static boot(): Promise<FileSystem>;
    private processFilePath;
    private getFileHandle;
    private getDirectoryFromSegments;
    private doesFileExist;
    writeFile(path: string, data: BlobPart, { type, silent }: {
        type?: string | undefined;
        silent?: boolean | undefined;
    }): Promise<void>;
    getFile(path: string): Promise<File>;
    createFilePath(path: string): Promise<void>;
    getDirectory(path: string, create?: boolean): Promise<FileSystem>;
    createDirectory(path: string): Promise<void>;
    fileExists(path: string): Promise<boolean>;
    list(path?: string): Promise<string[]>;
    listContents(path?: string): Promise<(File | FileSystem)[]>;
}
declare global {
    interface FileSystemDirectoryHandle {
        keys(): AsyncIterableIterator<string>;
        values(): AsyncIterableIterator<FileSystemFileHandle | FileSystemDirectoryHandle>;
    }
}

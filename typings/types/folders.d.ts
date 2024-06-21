export interface Folder {
    name: string;
    children?: Folder[];
}
export interface Stats {
    codelines: number;
    chars: number;
    folders: number;
    files: number;
    deepestLevel: number;
}
//# sourceMappingURL=folders.d.ts.map
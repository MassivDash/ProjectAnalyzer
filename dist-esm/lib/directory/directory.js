"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDirectoryStructure = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sloc_1 = __importDefault(require("sloc"));
const __1 = require("../");
function getDirectoryStructure(dirPath, patterns = []) {
    const name = path_1.default.basename(dirPath) || dirPath;
    const item = { name };
    let itemStat;
    // check if name is on the list of ignore files
    try {
        itemStat = fs_1.default.statSync(dirPath);
    }
    catch (err) {
        console.error(`Error reading path: ${err}`);
        return null;
    }
    if ((0, __1.checkForIgnore)(patterns, name)) {
        return null;
    }
    if (itemStat.isFile()) {
        const fullName = path_1.default.extname(dirPath).toLowerCase();
        const extension = fullName.split(".").pop() || "";
        const commonExtensions = [
            "md",
            "mdx",
            "js",
            "ts",
            "tsx",
            "jsx",
            "astro",
            "mjs",
            "cjs",
            "json",
            "yml",
            "yaml",
            "toml",
            "html",
            "css",
            "scss",
            "sass",
            "less",
            "styl",
            "graphql",
            "gql",
            "vue",
            "svelte",
            "php",
            "py",
            "rb",
            "java",
            "kt",
            "swift",
            "go",
            "rs",
            "r",
            "cs",
        ];
        if (!commonExtensions.includes(extension)) {
            console.log(`Reading file: ${dirPath}`);
            const fileContent = fs_1.default.readFileSync(dirPath, "utf-8");
            let lines = 0;
            try {
                const slocStats = (0, sloc_1.default)(fileContent, extension);
                lines = slocStats.source;
                console.log(slocStats);
            }
            catch (err) {
                console.error(`Error reading file: ${err}`);
                lines = fileContent.split("\n").length;
            }
            const chars = fileContent.length;
            const stats = {
                codelines: lines,
                chars,
                folders: 0,
                files: 1,
                deepestLevel: 0,
            };
            return { item, stats };
        }
        else {
            const stats = {
                codelines: 0,
                chars: 0,
                folders: 0,
                files: 1,
                deepestLevel: 0,
            };
            return { item, stats };
        }
    }
    if (itemStat.isDirectory()) {
        const children = fs_1.default
            .readdirSync(dirPath)
            .map((child) => getDirectoryStructure(path_1.default.join(dirPath, child), patterns))
            .filter((e) => !!e);
        // Filter out null values
        item.children = (0, __1.sortDirectoryStructure)(children.map((i) => i === null || i === void 0 ? void 0 : i.item));
        const stats = {
            codelines: 0,
            chars: 0,
            folders: 1,
            files: 0,
            deepestLevel: 0,
        };
        for (const child of children) {
            if (child) {
                stats.folders += child.stats.folders;
                stats.files += child.stats.files;
                stats.codelines += child.stats.codelines;
                stats.chars += child.stats.chars;
                stats.deepestLevel = Math.max(stats.deepestLevel, child.stats.deepestLevel + 1);
            }
        }
        // Recursively calculate the total stats
        const totalStats = {
            codelines: stats.codelines,
            chars: stats.chars,
            folders: stats.folders,
            files: stats.files,
            deepestLevel: stats.deepestLevel,
        };
        return { item, stats: totalStats };
    }
    return null;
}
exports.getDirectoryStructure = getDirectoryStructure;
//# sourceMappingURL=directory.js.map
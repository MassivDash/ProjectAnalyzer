"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPatterns = exports.checkForIgnore = void 0;
const picomatch_1 = __importDefault(require("picomatch"));
const fs_1 = __importDefault(require("fs"));
const checkForIgnore = (patterns, name) => patterns.some((pattern) => {
    if (pattern.startsWith("!")) {
        return !picomatch_1.default.matchBase(name, pattern);
    }
    else {
        return picomatch_1.default.matchBase(name, pattern);
    }
});
exports.checkForIgnore = checkForIgnore;
// Read the .gitingore file and get the patterns
const getPatterns = (gitignore = "./.gitignore") => {
    let patterns = [];
    try {
        const gitignoreContent = fs_1.default.readFileSync(gitignore, "utf8");
        patterns = gitignoreContent.split("\n").filter((e) => !!e);
        return patterns;
    }
    catch (err) {
        if (err.code !== "ENOENT") {
            console.error(`Error reading .gitignore file: ${err}`);
            return patterns;
        }
    }
    return patterns;
};
exports.getPatterns = getPatterns;
//# sourceMappingURL=ignore.js.map
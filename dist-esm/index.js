"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const lib_1 = require("./lib");
const getStructureRatio = (stats) => {
    const { codelines, chars, folders, files, deepestLevel } = stats;
    return (folders * deepestLevel) / ((files * codelines) / chars);
};
const patterns = (0, lib_1.getPatterns)();
const data = (0, lib_1.getDirectoryStructure)(process.cwd(), patterns);
// sort the first level of children, move the .files to the end
const structure = data === null || data === void 0 ? void 0 : data.item;
if (!structure) {
    console.error("No structure found");
    process.exit(1);
}
// Sort the top level of the structure
const finalStructure = Object.assign(Object.assign({}, structure), (structure.children && {
    children: (0, lib_1.sortDirectoryStructure)(structure.children),
}));
fs_1.default.writeFile("output.json", JSON.stringify(finalStructure, null, 2), (err) => {
    if (err) {
        console.error(`Error writing file: ${err}`);
        return;
    }
});
const dataStats = data === null || data === void 0 ? void 0 : data.stats;
const finalScore = getStructureRatio(dataStats);
console.log(dataStats, finalScore);
fs_1.default.writeFile("stats.json", JSON.stringify(Object.assign(Object.assign({}, dataStats), { finalScore }), null, 2), (err) => {
    if (err) {
        console.error(`Error writing file: ${err}`);
        return;
    }
    console.log("Successfully wrote file stats.json");
});
//# sourceMappingURL=index.js.map
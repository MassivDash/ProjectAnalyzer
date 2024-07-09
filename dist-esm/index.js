"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const lib_1 = require("./lib");
const getStructureRatio = (stats) => {
    const { codelines, chars, folders, files, deepestLevel } = stats;
    const fileToDirectoryRatio = files / folders;
    const normalizedLines = codelines / 20;
    const normializedChars = chars / 230;
    const baseComplexity = fileToDirectoryRatio * 0.4 +
        normalizedLines * 0.3 +
        normializedChars * 0.3 +
        deepestLevel * 0.1;
    const scaleFactor = 1 + Math.log2(files + folders + 1);
    const complexity = baseComplexity * scaleFactor;
    return Math.floor(complexity);
};
(0, lib_1.createSpacer)(2);
(0, lib_1.logWithColor)("magenta", (0, lib_1.createSplashScreen)());
(0, lib_1.logWithColor)("green", "Starting analysis...");
(0, lib_1.createSpacer)(2);
const patterns = (0, lib_1.getPatterns)();
const data = (0, lib_1.getDirectoryStructure)(process.cwd(), patterns);
// sort the first level of children, move the .files to the end
const structure = data === null || data === void 0 ? void 0 : data.item;
if (!structure) {
    (0, lib_1.logWithColor)("red", "Error reading directory structure");
    process.exit(1);
}
// Sort the top level of the structure
const finalStructure = Object.assign(Object.assign({}, structure), (structure.children && {
    children: (0, lib_1.sortDirectoryStructure)(structure.children),
}));
fs_1.default.writeFile("output.json", JSON.stringify(finalStructure, null, 2), (err) => {
    if (err) {
        (0, lib_1.logWithColor)("red", `Error writing file: ${err}`);
        (0, lib_1.createSpacer)(2);
        return;
    }
});
const dataStats = data === null || data === void 0 ? void 0 : data.stats;
const finalScore = getStructureRatio(dataStats);
const table = (0, lib_1.createTable)(["Metric", "Value"], Object.entries(dataStats).map(([key, value]) => [key, value.toString()]));
(0, lib_1.createSpacer)(2);
(0, lib_1.logWithColor)("yellow", table);
(0, lib_1.createSpacer)(2);
(0, lib_1.logWithColor)("blue", (0, lib_1.createAsciiBox)(finalScore));
(0, lib_1.createSpacer)(2);
const thisProject = { value: Number(finalScore), label: "this project" };
const otherScores = [
    { value: 1, label: "hello world" },
    { value: 545038, label: "react" },
    { value: 74227, label: "nest.js" },
    { value: 2100659, label: "next.js" },
];
const sortedScores = [thisProject, ...otherScores].sort((a, b) => a.value - b.value);
const points = sortedScores.map(({ value, label }, i) => ({
    x: i,
    y: value,
    label: label,
}));
const graph = (0, lib_1.plotXYGraph)(points, 40, 40);
console.log(graph);
fs_1.default.writeFile("stats.json", JSON.stringify(Object.assign(Object.assign({}, dataStats), { finalScore }), null, 2), (err) => {
    if (err) {
        console.error(`Error writing file: ${err}`);
        return;
    }
    (0, lib_1.createSpacer)(2);
    console.log("Successfully wrote file stats.json");
    (0, lib_1.createSpacer)(2);
});
//# sourceMappingURL=index.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortDirectoryStructure = void 0;
function sortDirectoryStructure(array) {
    return array.sort((a, b) => {
        if (a.children && !b.children) {
            return -1;
        }
        if (!a.children && b.children) {
            return 1;
        }
        if (a.name.startsWith(".") && !b.name.startsWith(".")) {
            return -1;
        }
        if (!a.name.startsWith(".") && b.name.startsWith(".")) {
            return 1;
        }
        if (!a.children && !a.name.startsWith(".") && b.children) {
            return -1;
        }
        if (a.children && !b.children && !b.name.startsWith(".")) {
            return 1;
        }
        return a.name.localeCompare(b.name);
    });
}
exports.sortDirectoryStructure = sortDirectoryStructure;
//# sourceMappingURL=sort.js.map
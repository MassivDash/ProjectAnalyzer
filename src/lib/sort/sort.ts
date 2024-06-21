import type { Folder } from "../../types/folders";
export function sortDirectoryStructure(array: Folder[]) {
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

import type { Folder } from "../../types/folders";

export function sortDirectoryStructure(folders: Folder[]) {
  return folders.sort((a, b) => {
    const aIsHidden = a.name.startsWith(".");
    const bIsHidden = b.name.startsWith(".");
    const aIsFolder = !!a.children;
    const bIsFolder = !!b.children;

    // Hidden folders first
    if (aIsHidden && aIsFolder && (!bIsHidden || !bIsFolder)) return -1;
    if (bIsHidden && bIsFolder && (!aIsHidden || !aIsFolder)) return 1;

    // Then regular folders
    if (aIsFolder && !bIsFolder) return -1;
    if (!aIsFolder && bIsFolder) return 1;

    // Then hidden files
    if (aIsHidden && !bIsHidden) return -1;
    if (!aIsHidden && bIsHidden) return 1;

    // Alphabetical sorting within the same category
    return a.name.localeCompare(b.name);
  });
}

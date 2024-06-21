import fs from "fs";
import path from "path";
import mime from "mime-types";
import { checkForIgnore, sortDirectoryStructure } from "../";
import type { Folder, Stats } from "../../types/folders";

export function getDirectoryStructure(
  dirPath: string,
  patterns: string[] = []
): { item: Folder; stats: Stats } | null {
  const name = path.basename(dirPath) || dirPath;
  const item: Folder = { name };
  let itemStat: fs.Stats;

  // check if name is on the list of ignore files

  try {
    itemStat = fs.statSync(dirPath);
  } catch (err) {
    console.error(`Error reading path: ${err}`);
    return null;
  }

  if (checkForIgnore(patterns, name)) {
    return null;
  }

  if (itemStat.isFile()) {
    const fileExtension = path.extname(dirPath).toLowerCase();
    const mimeType = mime.lookup(fileExtension);
    if (mimeType && mimeType.startsWith("text/")) {
      const fileContent = fs.readFileSync(dirPath, "utf-8");
      const lines = fileContent.split("\n").length;
      const chars = fileContent.length;
      const stats: Stats = {
        codelines: lines,
        chars,
        folders: 0,
        files: 1,
        deepestLevel: 0,
      };
      return { item, stats };
    } else {
      const stats: Stats = {
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
    const children = fs
      .readdirSync(dirPath)
      .map((child) =>
        getDirectoryStructure(path.join(dirPath, child), patterns)
      )
      .filter((e) => !!e);

    // Filter out null values
    item.children = sortDirectoryStructure(
      children.map((i) => i?.item) as Folder[]
    );

    const stats: Stats = {
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
        stats.deepestLevel = Math.max(
          stats.deepestLevel,
          child.stats.deepestLevel + 1
        );
      }
    }

    // Recursively calculate the total stats
    const totalStats: Stats = {
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

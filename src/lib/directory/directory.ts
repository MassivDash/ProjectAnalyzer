import fs from "fs";
import path from "path";
import sloc from "sloc";
import {
  checkForIgnore,
  sortDirectoryStructure,
  createTable,
  logWithColor,
  createSpacer,
} from "../";
import type { Folder, Stats } from "../../types/folders";

interface SlocStats {
  total: number;
  source: number;
  comment: number;
  single: number;
  block: number;
  mixed: number;
  empty: number;
  todo: number;
  blockEmpty: number;
}

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
    console.error(`File system read error:  ${err}`);
    return null;
  }

  if (checkForIgnore(patterns, name)) {
    return null;
  }

  if (itemStat.isFile()) {
    const fullName = path.extname(dirPath).toLowerCase();
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
      "wasm",
      "webmanifest",
    ];

    if (commonExtensions.includes(extension)) {
      const fileContent = fs.readFileSync(dirPath, "utf-8");

      let lines = 0;

      try {
        const slocStats: SlocStats = sloc(fileContent, extension as string);
        lines = slocStats.source;

        const headers = [
          "total",
          "source",
          "comment",
          "single",
          "block",
          "mixed",
          "empty",
          "todo",
          "blockEmpty",
        ];

        createSpacer(2);
        logWithColor(
          "yellow",
          createTable(
            headers,
            Object.entries(slocStats).map(([key, value]) => [
              key,
              value.toString(),
            ])
          )
        );
      } catch (err) {
        lines = fileContent.split(/\r?\n/).length;

        logWithColor(
          "red",
          `sloc unable to parse file: ${name}, counting lines instead. ${lines} found`
        );
      }
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

import fs from "fs";

import {
  sortDirectoryStructure,
  getDirectoryStructure,
  getPatterns,
} from "./lib";
import type { Folder, Stats } from "./types/folders";

const getStructureRatio = (stats: Stats) => {
  const { codelines, chars, folders, files, deepestLevel } = stats;

  const fileToDirectoryRatio = files / folders;
  const normalizedLines = codelines / 20;
  const normializedChars = chars / 230;

  const baseComplexity =
    fileToDirectoryRatio * 0.4 +
    normalizedLines * 0.3 +
    normializedChars * 0.3 +
    deepestLevel * 0.1;

  const scaleFactor = 1 + Math.log2(files + folders + 1);

  const complexity = baseComplexity * scaleFactor;

  return Math.floor(complexity);
};

interface Structure {
  item: Folder;
  stats: Stats;
}

const patterns = getPatterns();

const data: Structure | null = getDirectoryStructure(process.cwd(), patterns);

// sort the first level of children, move the .files to the end
const structure = data?.item;

if (!structure) {
  console.error("No structure found");
  process.exit(1);
}

// Sort the top level of the structure
const finalStructure = {
  ...structure,
  ...(structure.children && {
    children: sortDirectoryStructure(structure.children),
  }),
};

fs.writeFile("output.json", JSON.stringify(finalStructure, null, 2), (err) => {
  if (err) {
    console.error(`Error writing file: ${err}`);
    return;
  }
});

const dataStats: Stats = data?.stats;
const finalScore: number = getStructureRatio(dataStats);

console.log(dataStats, finalScore);

fs.writeFile(
  "stats.json",
  JSON.stringify({ ...dataStats, finalScore }, null, 2),
  (err) => {
    if (err) {
      console.error(`Error writing file: ${err}`);
      return;
    }

    console.log("Successfully wrote file stats.json");
  }
);

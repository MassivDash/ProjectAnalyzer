import fs from "fs";

import {
  sortDirectoryStructure,
  getDirectoryStructure,
  getPatterns,
} from "./lib";
import type { Folder, Stats } from "./types/folders";

const getStructureRatio = (stats: Stats) => {
  const { codelines, chars, folders, files, deepestLevel } = stats;
  return (folders * deepestLevel) / ((files * codelines) / chars);
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

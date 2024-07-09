import fs from "fs";

import {
  sortDirectoryStructure,
  getDirectoryStructure,
  getPatterns,
  createAsciiBox,
  createTable,
  plotXYGraph,
  createSplashScreen,
  createSpacer,
  logWithColor,
  getStructureRatio,
} from "./lib";
import type { Folder, Stats } from "./types/folders";

interface Structure {
  item: Folder;
  stats: Stats;
}

createSpacer(2);
logWithColor("magenta", createSplashScreen());
logWithColor("green", "Starting analysis...");

createSpacer(2);

const patterns = getPatterns();

const data: Structure | null = getDirectoryStructure(process.cwd(), patterns);

// sort the first level of children, move the .files to the end
const structure = data?.item;

if (!structure) {
  logWithColor("red", "Error reading directory structure");
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
    logWithColor("red", `Error writing file: ${err}`);
    createSpacer(2);
    return;
  }
});

const dataStats: Stats = data?.stats;
const finalScore: number = getStructureRatio(dataStats);

const table = createTable(
  ["Metric", "Value"],
  Object.entries(dataStats).map(([key, value]) => [key, value.toString()])
);

createSpacer(2);
logWithColor("yellow", table);
createSpacer(2);
logWithColor("blue", createAsciiBox(finalScore));
createSpacer(2);

const thisProject = { value: Number(finalScore), label: "this project" };
const otherScores = [
  { value: 1, label: "hello world" },
  { value: 545038, label: "react" },
  { value: 74227, label: "nest.js" },
  { value: 2100659, label: "next.js" },
];

const sortedScores = [thisProject, ...otherScores].sort(
  (a, b) => a.value - b.value
);

const points = sortedScores.map(({ value, label }, i) => ({
  x: i,
  y: value,
  label: label,
}));

const graph = plotXYGraph(points, 40, 40);

console.log(graph);

fs.writeFile(
  "stats.json",
  JSON.stringify({ ...dataStats, finalScore }, null, 2),
  (err) => {
    if (err) {
      console.error(`Error writing file: ${err}`);
      return;
    }

    createSpacer(2);
    console.log("Successfully wrote file stats.json");
    createSpacer(2);
  }
);

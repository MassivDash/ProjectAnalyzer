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
  getComplexityScore,
} from "./lib";

import testScores from "./data/finalReport.json";

type RecordedScore = {
  finalScore: number;
  name: string;
};

import type { Folder, Stats } from "./types/folders";

interface Structure {
  item: Folder;
  stats: Stats;
}

function runAnalysis() {
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

  fs.writeFile(
    "output.json",
    JSON.stringify(finalStructure, null, 2),
    (err) => {
      if (err) {
        logWithColor("red", `Error writing file: ${err}`);
        return;
      }
    }
  );

  const dataStats: Stats = data?.stats;

  const finalScore: number = getComplexityScore(dataStats);

  const table = createTable(
    ["Metric", "Value"],
    Object.entries(dataStats).map(([key, value]) => [key, value.toString()])
  );

  createSpacer(2);
  logWithColor("green", "Analysis complete");
  createSpacer(2);

  logWithColor("yellow", "Analysis results:");
  createSpacer(1);
  logWithColor("yellow", table);
  createSpacer(2);
  logWithColor("yellow", "Final score:");
  createSpacer(2);
  logWithColor("yellow", createAsciiBox(finalScore));
  createSpacer(2);

  const thisProject = { value: Number(finalScore), label: "this project" };
  const recordedScores: RecordedScore[] = (
    testScores as { projects: RecordedScore[] }
  ).projects;

  const sortedScores = [
    thisProject,
    ...recordedScores.map((item) => ({
      value: item.finalScore,
      label: item.name,
    })),
  ].sort((a, b) => {
    if (a.value < b.value) {
      return -1;
    }
    if (a.value > b.value) {
      return 1;
    }
    return 0;
  });

  const points = sortedScores.map(({ value, label }, i) => ({
    x: i,
    y: value,
    label: label,
  }));

  const graph = plotXYGraph(points, 80, 40);

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
}

export {
  runAnalysis,
  RecordedScore,
  Structure,
  Stats,
  getComplexityScore,
  getDirectoryStructure,
  sortDirectoryStructure,
};

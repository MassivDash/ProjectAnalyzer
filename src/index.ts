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
  writeFile,
  convertToMarkdown,
  printTree,
  collectArgs,
  silentMode,
  sortScores,
} from "./lib";
import type { Config } from "./types";

import testScores from "./data/finalReport.json";

type RecordedScore = {
  finalScore: number;
  name: string;
};

import type { Structure, Stats } from "./types/folders";

function runAnalysis(config?: Config | undefined): void {
  const _config = config || collectArgs();

  // Kill consoles if silent mode is activated
  silentMode(_config?.silent || false);

  // Splash screen
  createSpacer(2);
  logWithColor("magenta", createSplashScreen());
  logWithColor("green", "Starting analysis...");
  createSpacer(2);

  // Get the ignore patterns, for folder analysis,
  //.gitigonre + standard list is used
  const ignorePatterns = getPatterns();

  // Get the directory structure
  const data: Structure | null = getDirectoryStructure(
    process.cwd(),
    ignorePatterns
  );

  if (!data) {
    logWithColor("red", "Error reading directory structure");
    throw new Error("Error reading directory structure");
  }

  // sort the first level of children, move the .files to the end
  const structure = data?.item;

  // Sort the top level of the structure
  const finalStructure = {
    ...structure,
    ...(structure?.children && {
      children: sortDirectoryStructure(structure.children),
    }),
  };

  // -t, --tree
  // output folder structure as a tree

  if (_config?.tree) {
    createSpacer(2);
    printTree(finalStructure);
    createSpacer(2);
  }

  const dataStats: Stats = data?.stats;

  if (
    !dataStats ||
    !dataStats.files ||
    !dataStats.folders ||
    !dataStats.chars ||
    !dataStats.codelines ||
    !dataStats.deepestLevel
  ) {
    logWithColor("red", "Error reading directory stats, exiting");
    throw new Error("Error reading directory stats");
  }

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

  const thisProject = { finalScore: Number(finalScore), name: "this project" };
  const recordedScores: RecordedScore[] = (
    testScores as { projects: RecordedScore[] }
  ).projects;

  const sortedScores = [thisProject, ...recordedScores].sort(sortScores);

  const points = sortedScores.map(({ finalScore, name }, i) => ({
    x: i,
    y: finalScore,
    label: name,
  }));

  const graph = plotXYGraph(points, 40, 40);

  console.log(graph);

  if (_config?.markdown) {
    // Write the markdown file
    const markdown = convertToMarkdown({ dataStats, finalScore });
    writeFile(
      _config.reportPath ? _config.reportPath : "analysis.md",
      markdown
    );
  }
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

export default runAnalysis;

import { expect, test } from "vitest";
import { getComplexityScore } from "./formula";
import fs from "fs";

const stats = {
  chars: 644,
  codelines: 39,
  deepestLevel: 1,
  files: 2,
  folders: 1,
};

test("Calculates complexity score", () => {
  expect(getComplexityScore(stats)).toBe(1);
});

test("Complexity distribution", () => {
  const projects = [
    { files: 2, folders: 1, lines: 69, chars: 644, depth: 1 },
    { files: 5, folders: 2, lines: 100, chars: 1000, depth: 2 },
    { files: 10, folders: 3, lines: 500, chars: 5000, depth: 3 },
    { files: 20, folders: 5, lines: 1000, chars: 10000, depth: 4 },
    { files: 50, folders: 10, lines: 5000, chars: 50000, depth: 5 },
    { files: 100, folders: 15, lines: 10000, chars: 100000, depth: 6 },
    { files: 200, folders: 20, lines: 20000, chars: 200000, depth: 7 },
    { files: 500, folders: 30, lines: 50000, chars: 500000, depth: 8 },
    { files: 1000, folders: 50, lines: 100000, chars: 1000000, depth: 9 },
    { files: 2000, folders: 100, lines: 200000, chars: 2000000, depth: 10 },
  ];

  // Remap projects, calculate the complexity score for each project and sort them,
  // print the results to json file
  // print the results as a markdown table in markdown file

  const projectsLetters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  const results = projects.map((project, index) => {
    const stats = {
      chars: project.chars,
      codelines: project.lines,
      deepestLevel: project.depth,
      files: project.files,
      folders: project.folders,
    };
    return {
      ...project,
      name: projectsLetters[index],
      complexity: getComplexityScore(stats),
    };
  });

  fs.writeFileSync("./docs/complexity.json", JSON.stringify(results, null, 2));

  const table = `| Project | Files | Directories | Total Lines | Total Chars | Tree Depth | Complexity |
| ------- | ----- | ----------- | ----------- | ----------- | ---------- | ---------- |
${results
  .map(({ complexity, ...project }, index) => {
    return `${projectsLetters[index]} | ${Object.values(project).join(
      " | "
    )} | ${complexity.toFixed(2)} |`;
  })
  .join("\n")}`;

  fs.writeFileSync("./docs/complexity.md", table);

  expect(results[0]).toStrictEqual({
    files: 2,
    folders: 1,
    lines: 69,
    chars: 644,
    depth: 1,
    complexity: 1,
    name: "A",
  });
  expect(results[1]).toStrictEqual({
    files: 5,
    folders: 2,
    lines: 100,
    chars: 1000,
    depth: 2,
    complexity: 3,
    name: "B",
  });
});

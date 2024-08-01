import type { Stats } from "../../types/folders";

interface MarkdownPros {
  dataStats: Stats;
  finalScore: number;
}

export const convertToMarkdown = ({ dataStats, finalScore }: MarkdownPros) => {
  const { files, folders, chars, codelines, deepestLevel } = dataStats;
  // Create a markdown table and print
  const markdownTable = `# Analysis Results  

| Files | Folders | Characters | Code Lines | Deepest Level | Complexity Score |
| ----- | ------- | ---------- | ---------- | ------------- | ---------------- |
| ${files} | ${folders} | ${chars} | ${codelines} | ${deepestLevel} | ${finalScore} |
`;
  return markdownTable;
};

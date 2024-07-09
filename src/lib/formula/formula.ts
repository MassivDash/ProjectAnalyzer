import type { Stats } from "../../types/folders";

export const getStructureRatio = (stats: Stats) => {
  const { codelines, chars, folders, files, deepestLevel } = stats;

  const fileToDirectoryRatio = files / folders / 3;
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

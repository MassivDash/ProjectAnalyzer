import type { Stats } from "../../types/folders";

interface BaseStats {
  normalizedLinesBase: number;
  normalizedCharsBase: number;
  normalizedFoldersBase: number;
}

export const getComplexityScore = (
  stats: Stats,
  baseStats: BaseStats = {
    normalizedLinesBase: 400,
    normalizedCharsBase: 4000,
    normalizedFoldersBase: 3,
  }
) => {
  const { codelines, chars, folders, files, deepestLevel } = stats;

  const fileToDirectoryRatio = files / folders;
  const normalizedLines = codelines / baseStats.normalizedLinesBase;
  const normalizedChars = chars / baseStats.normalizedCharsBase;

  const baseComplexity =
    fileToDirectoryRatio * 0.2 +
    normalizedLines * 0.2 +
    normalizedChars * 0.2 +
    deepestLevel * 0.1;

  const scaleFactor = 1 + Math.log2(files + folders + 1);

  const complexity = baseComplexity * scaleFactor;

  return Math.floor(complexity);
};

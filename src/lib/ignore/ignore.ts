import picomatch from "picomatch";
import fs from "fs";

const standardIgnorePatterns = [
  "node_modules",
  "dist",
  ".git",
  ".vscode",
  ".idea",
  ".DS_Store",
  "package-lock.json",
  "yarn.lock",
  "stats.json",
  ".yarn",
  "target",
];

export const checkForIgnore = (patterns: string[], name: string) =>
  patterns.some((pattern) => {
    if (pattern.startsWith("!")) {
      return !picomatch.matchBase(name, pattern);
    } else {
      return picomatch.matchBase(name, pattern);
    }
  });

export const getPatterns = (gitignore: string = "./.gitignore"): string[] => {
  let patterns: string[] = [];
  try {
    const gitignoreContent = fs.readFileSync(gitignore, "utf8");
    patterns = gitignoreContent.split("\n").filter((e) => !!e);
    return patterns.concat(standardIgnorePatterns);
  } catch (err) {
    if (err.code !== "ENOENT") {
      console.error(`Error reading .gitignore file: ${err}`);
      return patterns.concat(standardIgnorePatterns);
    }
  }
  return patterns.concat(standardIgnorePatterns);
};

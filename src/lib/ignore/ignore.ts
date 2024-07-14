import picomatch from "picomatch";
import fs from "fs";
import { standardIgnorePatterns } from "./ignoreList";

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
  } catch (err) {
    if (err.code !== "ENOENT") {
      console.error(`Error reading .gitignore file: ${err}, using defaults`);
      patterns = standardIgnorePatterns;
    }
  }

  const uniquePatterns = [...new Set(patterns.concat(standardIgnorePatterns))];
  return uniquePatterns;
};

import picomatch from "picomatch";
import fs from "fs";

export const checkForIgnore = (patterns: string[], name: string) =>
  patterns.some((pattern) => {
    if (pattern.startsWith("!")) {
      return !picomatch.matchBase(name, pattern);
    } else {
      return picomatch.matchBase(name, pattern);
    }
  });

// Read the .gitingore file and get the patterns
export const getPatterns = (gitignore: string = "./.gitignore"): string[] => {
  let patterns: string[] = [];
  try {
    const gitignoreContent = fs.readFileSync(gitignore, "utf8");
    patterns = gitignoreContent.split("\n").filter((e) => !!e);
    return patterns;
  } catch (err) {
    if (err.code !== "ENOENT") {
      console.error(`Error reading .gitignore file: ${err}`);
      return patterns;
    }
  }
  return patterns;
};

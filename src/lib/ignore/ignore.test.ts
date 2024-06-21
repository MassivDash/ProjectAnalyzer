import { expect, test } from "vitest";
import { getPatterns, checkForIgnore } from "./ignore";

test("Reads the .gitignore file and returns an array of patterns", () => {
  expect(getPatterns("./test/.gitignore")).toStrictEqual([
    ".git",
    "node_modules",
    "coverage",
    ".env",
    "!vscode/extensions.json",
  ]);
});

test("Checks if a file should be ignored", () => {
  expect(checkForIgnore([".git", "node_modules"], ".git")).toBeTruthy();
  expect(checkForIgnore([".git", "node_modules"], "test")).toBeFalsy();
  expect(checkForIgnore(["!vscode/extensions.json"], "vscode")).toBeFalsy();
  expect(
    checkForIgnore(["!vscode/extensions.json"], "vscode/extensions.json")
  ).toBeFalsy();
  expect(checkForIgnore(["!.github/actions/*/dist"], "next.js")).toBeFalsy();
});

import { expect, test } from "vitest";
import { getPatterns, checkForIgnore } from "./ignore";
import { standardIgnorePatterns } from "./ignoreList";

test("Reads the .gitignore file and returns an array of patterns", () => {
  const ignoreList = [
    ...new Set([
      ".git",
      "node_modules",
      "coverage",
      ".env",
      "!vscode/extensions.json",
      ...standardIgnorePatterns,
    ]),
  ];

  expect(getPatterns("./test/testFolder/.gitignore")).toStrictEqual(ignoreList);
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

test("It will return the defaults, if no .gitignore file is found", () => {
  expect(getPatterns("./test/testFolder/.gitignore2")).toStrictEqual([
    ...standardIgnorePatterns,
  ]);
});

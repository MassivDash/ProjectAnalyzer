import { sortDirectoryStructure, sortScores } from "./sort";
import { describe, test, expect } from "vitest";

describe("sortDirectoryStructure", () => {
  test("should sort the array correctly", () => {
    const array = [
      { name: "folder1", children: [] },
      { name: ".hiddenFolder", children: [] },
      { name: "folder2", children: [] },
      { name: "file1.txt" },
      { name: ".hiddenFile.txt" },
    ];

    const sortedArray = sortDirectoryStructure(array);

    expect(sortedArray).toEqual([
      { name: ".hiddenFolder", children: [] },
      { name: "folder1", children: [] },
      { name: "folder2", children: [] },
      { name: ".hiddenFile.txt" },
      { name: "file1.txt" },
    ]);
  });
});
test("should sort the array with hidden folders correctly", () => {
  const array = [
    { name: "folder1", children: [] },
    { name: ".hiddenFolder", children: [] },
    { name: "folder2", children: [] },
    { name: "file1.txt" },
    { name: ".hiddenFile.txt" },
  ];

  const sortedArray = sortDirectoryStructure(array);

  expect(sortedArray).toEqual([
    { name: ".hiddenFolder", children: [] },
    { name: "folder1", children: [] },
    { name: "folder2", children: [] },
    { name: ".hiddenFile.txt" },
    { name: "file1.txt" },
  ]);
});

test("should sort the array with mixed folders and files correctly", () => {
  const array = [
    { name: ".folder1", children: [] },
    { name: ".folder2", children: [] },
    { name: "folder3", children: [] },
    { name: "file1.txt" },
    { name: "file2.txt" },
    { name: "file3.txt" },
  ];

  const sortedArray = sortDirectoryStructure(array);

  expect(sortedArray).toEqual([
    { name: ".folder1", children: [] },
    { name: ".folder2", children: [] },
    { name: "folder3", children: [] },
    { name: "file1.txt" },
    { name: "file2.txt" },
    { name: "file3.txt" },
  ]);
});

test("should sort scores correctly", () => {
  const scores = [{ finalScore: 10 }, { finalScore: 5 }, { finalScore: 15 }];

  const sortedScores = scores.sort(sortScores);

  expect(sortedScores).toEqual([
    { finalScore: 5 },
    { finalScore: 10 },
    { finalScore: 15 },
  ]);
});

test("should sort scores correctly with equal scores", () => {
  const scores = [
    { finalScore: 10 },
    { finalScore: 5 },
    { finalScore: 15 },
    { finalScore: 10 },
  ];

  const sortedScores = scores.sort(sortScores);

  expect(sortedScores).toEqual([
    { finalScore: 5 },
    { finalScore: 10 },
    { finalScore: 10 },
    { finalScore: 15 },
  ]);
});

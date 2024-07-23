import * as main from "../index";
import { test, expect, vi, beforeAll, afterAll } from "vitest";
import * as directory from "../lib/directory/directory";
import * as formula from "../lib/formula/formula";
import fs from "fs";

import type { Folder, Stats } from "../types/folders";

vi.mock("process", () => ({
  stdout: {
    write: () => true,
  },
}));

vi.mock("console", () => ({
  log: () => true,
  error: () => true,
}));

const processStdoutWriteMock = vi
  .spyOn(process.stdout, "write")
  .mockImplementation(() => true);

const fsWriteFileMock = vi.spyOn(fs, "writeFile");

const mainMock = vi.spyOn(main, "runAnalysis");
const getDirectoryStructureMock = vi.spyOn(directory, "getDirectoryStructure");
const getComplexityScoreMock = vi.spyOn(formula, "getComplexityScore");

const consoleLogMock = vi.spyOn(console, "log").mockImplementation(() => true);

beforeAll(() => {
  vi.clearAllMocks();
});

afterAll(() => {
  vi.clearAllMocks();
});

test("calls getDirectoryStructure function", async () => {
  main.runAnalysis();
  expect(getDirectoryStructureMock).toHaveBeenCalled();
});

test("calls runAnalysis function", async () => {
  main.runAnalysis();
  expect(mainMock).toHaveBeenCalled();
  expect(consoleLogMock).toHaveBeenCalled();
  expect(getDirectoryStructureMock).toHaveBeenCalled();
  expect(getComplexityScoreMock).toHaveBeenCalled();
  expect(processStdoutWriteMock).toHaveBeenCalled();
});

test("throws error on no structure", async () => {
  getDirectoryStructureMock.mockImplementation(() => null);
  expect(() => main.runAnalysis()).toThrowError(
    "Error reading directory structure"
  );
});

test("throws error on no stats", async () => {
  getDirectoryStructureMock.mockImplementation(() => ({
    item: {} as Folder,
    stats: null as unknown as Stats,
  }));
  expect(() => main.runAnalysis()).toThrowError(
    "Error reading directory stats"
  );
});

test("throws error on write file", async () => {
  fsWriteFileMock.mockImplementation((() => {
    throw new Error("Error writing file: stats.json");
  }) as unknown as typeof fs.writeFile);
  expect(() => main.runAnalysis()).toThrowError(
    "Error writing file: stats.json"
  );
});

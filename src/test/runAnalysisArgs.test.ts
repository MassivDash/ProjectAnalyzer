import * as main from "../index";
import { test, expect, vi, beforeAll, afterAll } from "vitest";
import * as directory from "../lib/directory/directory";
import * as formula from "../lib/formula/formula";
import fs from "fs";

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

test("calls runAnalysis silent", async () => {
  main.runAnalysis({ silent: true });
  expect(mainMock).toHaveBeenCalled();
  expect(consoleLogMock).not.toHaveBeenCalled();
  expect(getDirectoryStructureMock).toHaveBeenCalled();
  expect(getComplexityScoreMock).toHaveBeenCalled();
  expect(processStdoutWriteMock).not.toHaveBeenCalled();
  expect(fsWriteFileMock).not.toHaveBeenCalled();
});

test("calls runAnalysis silent", async () => {
  main.runAnalysis({ reportPath: "test.md" });
  expect(mainMock).toHaveBeenCalled();
  expect(consoleLogMock).not.toHaveBeenCalled();
  expect(getDirectoryStructureMock).toHaveBeenCalled();
  expect(getComplexityScoreMock).toHaveBeenCalled();
  expect(processStdoutWriteMock).not.toHaveBeenCalled();
  expect(fsWriteFileMock).not.toHaveBeenCalled();
});

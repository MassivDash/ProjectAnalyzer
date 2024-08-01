import { expect, test, vi, beforeEach, afterAll } from "vitest";
import fs from "fs";
import { writeFile } from "./writeFile";

const fsWriteFileMock = vi.spyOn(fs, "writeFile");

beforeEach(() => {
  vi.clearAllMocks();
});

afterAll(() => {
  vi.clearAllMocks();
});

test("writes a file", async () => {
  writeFile("test.md", "test");
  expect(fsWriteFileMock).toHaveBeenCalled();
  expect(fsWriteFileMock).toHaveBeenCalledWith(
    "test.md",
    "test",
    expect.any(Function)
  );
});

test("throws error on write file", async () => {
  fsWriteFileMock.mockImplementationOnce(((name, data, cb) => {
    return cb(new Error("Error writing file: test.md"));
  }) as never);
  expect(() => writeFile("test.md", "test")).toThrowError(
    "Error writing file: test.md"
  );
});

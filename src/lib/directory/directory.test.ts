import { expect, test, vi, beforeAll, afterAll } from "vitest";
import { getDirectoryStructure } from "./directory";

const testFolder = {
  name: "testFolder",
  children: [
    {
      name: "subfolder",
      children: [
        {
          name: "test.test",
        },
      ],
    },
    {
      name: ".gitignore",
    },
    {
      name: "testFile.test",
    },
    {
      name: "testFile2.test",
    },
  ],
};

const stats = {
  chars: 0,
  codelines: 0,
  deepestLevel: 2,
  files: 4,
  folders: 2,
};

vi.mock("console", () => ({
  log: () => true,
  error: () => true,
}));

vi.mock("process", () => ({
  stderr: {
    write: () => true,
  },
}));

const consoleErrorSpy = vi
  .spyOn(console, "error")
  .mockImplementation(() => true);

beforeAll(() => {
  vi.clearAllMocks();
});

afterAll(() => {
  vi.clearAllMocks();
});

test("Reads the test dir structure and returns an object", () => {
  expect(getDirectoryStructure("./test/testFolder")).toStrictEqual({
    item: testFolder,
    stats,
  });
});

test("errors if the directory does not exist", () => {
  expect(getDirectoryStructure("./test/nonExistentFolder")).toEqual(null);
  expect(consoleErrorSpy).toHaveBeenCalled();
});

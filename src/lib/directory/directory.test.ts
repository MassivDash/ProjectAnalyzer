import { expect, test } from "vitest";
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

test("Reads the test dir structure and returns an object", () => {
  expect(getDirectoryStructure("./test/testFolder")).toStrictEqual({
    item: testFolder,
    stats,
  });
});

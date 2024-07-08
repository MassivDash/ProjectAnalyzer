import { expect, test } from "vitest";
import { getDirectoryStructure } from "./directory";

const testFolder = {
  name: "test",
  children: [
    {
      name: "testFolder",
      children: [
        {
          name: "testFile.test",
        },
        {
          name: "testFile2.test",
        },
      ],
    },
    {
      name: ".gitignore",
    },
    {
      name: "test.test",
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
  expect(getDirectoryStructure("./test")).toStrictEqual({
    item: testFolder,
    stats,
  });
});

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

test("Reads the test dir structure and returns an object", () => {
  expect(getDirectoryStructure("./test")).toStrictEqual(testFolder);
});

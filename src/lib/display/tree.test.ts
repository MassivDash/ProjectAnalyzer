import { printTree } from "./tree";
import { Folder } from "../../types/folders";
import { expect, test, vi } from "vitest";
test("prints tree with no children", () => {
  const node: Folder = {
    name: "Folder 1",
  };

  const consoleLogMock = vi.spyOn(console, "log");
  printTree(node);
  expect(consoleLogMock).toHaveBeenCalledWith("Folder 1");
});

test("prints tree with children", () => {
  const node: Folder = {
    name: "Folder 1",
    children: [
      {
        name: "Folder 1.1",
        children: [
          {
            name: "Folder 1.1",
          },
          {
            name: "Folder 1.2",
          },
        ],
      },
      {
        name: "Folder 1.2",
        children: [
          {
            name: "Folder 1.1",
          },
          {
            name: "Folder 1.2",
          },
          {
            name: "Folder 1.3",
            children: undefined,
          },
        ],
      },
    ],
  };

  const consoleLogMock = vi.spyOn(console, "log");
  printTree(node);
  expect(consoleLogMock).toHaveBeenCalledWith("Folder 1");
});

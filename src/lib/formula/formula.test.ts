import { expect, test } from "vitest";
import { getComplexityScore } from "./formula";

const stats = {
  chars: 644,
  codelines: 39,
  deepestLevel: 1,
  files: 3,
  folders: 1,
};

test("Calculates complexity score", () => {
  expect(getComplexityScore(stats)).toBe(1);
});

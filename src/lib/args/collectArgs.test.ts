import { collectArgs } from "./collectArgs";
import { expect, test, vi, beforeEach, describe } from "vitest";
import { displayHelpIntoConsole } from "../";

vi.mock("../", () => ({
  displayHelpIntoConsole: vi.fn(),
}));

vi.mock("process", () => ({
  argv: [],
  exit: vi.fn(),
}));

const processExitMock = vi.spyOn(process, "exit");

describe("collectArgs", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("should return the default config when no arguments are passed", () => {
    const config = collectArgs();
    expect(config).toEqual({
      markdown: false,
      silent: false,
      reportPath: undefined,
      tree: false,
    });
  });

  test("should set markdown to true when -m or --markdown is passed", () => {
    vi.spyOn(process, "argv", "get").mockReturnValue([
      "node",
      "script.js",
      "-m",
    ]);
    const config = collectArgs();
    expect(config.markdown).toBe(true);
  });

  test("should set silent to true when -s or --silent is passed", () => {
    vi.spyOn(process, "argv", "get").mockReturnValue([
      "node",
      "script.js",
      "-s",
    ]);
    const config = collectArgs();
    expect(config.silent).toBe(true);
  });

  test("should set reportPath to the next argument after -p or --path", () => {
    vi.spyOn(process, "argv", "get").mockReturnValue([
      "node",
      "script.js",
      "-p",
      "path/to/report",
    ]);
    const config = collectArgs();
    expect(config.reportPath).toBe("path/to/report");
  });

  test("should set tree to true when -t or --tree is passed", () => {
    vi.spyOn(process, "argv", "get").mockReturnValue([
      "node",
      "script.js",
      "-t",
    ]);
    const config = collectArgs();
    expect(config.tree).toBe(true);
  });

  test("should call displayHelpIntoConsole and exit when --help is passed", () => {
    vi.spyOn(process, "argv", "get").mockReturnValue([
      "node",
      "script.js",
      "--help",
    ]);

    processExitMock.mockImplementation((() => {
      return true;
    }) as never);

    collectArgs();
    expect(displayHelpIntoConsole).toHaveBeenCalled();

    expect(processExitMock).toHaveBeenCalled();
  });
});

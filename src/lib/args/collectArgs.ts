import type { Config } from "src/types";
import { displayHelpIntoConsole } from "../";

export const collectArgs = (): Config => {
  const config: Config = {
    markdown: false,
    silent: false,
    reportPath: undefined,
    tree: false,
  };

  // Collect args from the process

  const args = process.argv.slice(2);
  console.log("Command-line arguments:", args);

  // if help is passed as an argument, print the help message

  if (args.includes("-h") || args.includes("--help")) {
    displayHelpIntoConsole();
    process.exit(0);
  }

  // Collect all the additional args

  if (args.includes("-m") || args.includes("--markdown")) {
    config.markdown = true;
  }

  if (args.includes("-s") || args.includes("--silent")) {
    config.silent = true;
  }

  const pathIndex = args.findIndex((arg) => arg === "-p" || arg === "--path");
  if (pathIndex !== -1 && pathIndex + 1 < args.length) {
    config.reportPath = args[pathIndex + 1];
  }

  if (args.includes("-t") || args.includes("--tree")) {
    config.tree = true;
  }

  return config;
};

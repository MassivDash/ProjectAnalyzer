import fs from "fs";
import { createSpacer } from "../";

export const writeFile = (filename: string, data: string) => {
  fs.writeFile(filename, data, (err) => {
    if (err) {
      createSpacer(2);
      console.error(`Error writing file: ${err}`);
      createSpacer(2);
      throw new Error(`Error writing file: ${err}`);
    }
  });
};

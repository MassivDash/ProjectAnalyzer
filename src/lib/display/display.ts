export function createTable(headers: string[], rows: string[][]): string {
  // Calculate column widths
  const colWidths: number[] = headers.map((header, i) => {
    return Math.max(header.length, ...rows.map((row) => row[i].length));
  });

  // Function to create a row string
  const createRow = (row: string[]): string => {
    return row.map((cell, i) => cell.padEnd(colWidths[i])).join(" | ");
  };

  // Create the table string
  let table: string = createRow(headers) + "\n";
  table += colWidths.map((width) => "-".repeat(width)).join("-|-") + "\n";
  rows.forEach((row) => {
    table += createRow(row) + "\n";
  });

  return table;
}
export function plotXYGraph(
  points: { x: number; y: number; label?: string }[],
  width: number = 40,
  height: number = 20
): void {
  const graph: string[][] = Array(height)
    .fill(null)
    .map(() => Array(width).fill(" "));
  const xMax = Math.max(...points.map((p) => p.x));
  const xMin = Math.min(...points.map((p) => p.x));
  const yMax = Math.max(...points.map((p) => p.y));
  const yMin = Math.min(...points.map((p) => p.y));
  // Draw axes
  for (let i = 0; i < height; i++) graph[i][0] = "│";
  for (let i = 0; i < width; i++) graph[height - 1][i] = "─";
  graph[height - 1][0] = "└";
  // Plot points
  points.forEach((point) => {
    const x = Math.round(((point.x - xMin) / (xMax - xMin)) * (width - 2)) + 1;
    const y = Math.round(((yMax - point.y) / (yMax - yMin)) * (height - 2));
    if (x >= 0 && x < width && y >= 0 && y < height) {
      graph[y][x] = "●";
    }
  });
  // Add labels
  points.forEach((point) => {
    const x = Math.round(((point.x - xMin) / (xMax - xMin)) * (width - 2)) + 1;
    const y = Math.round(((yMax - point.y) / (yMax - yMin)) * (height - 2));
    if (x >= 0 && x < width && y >= 0 && y < height && point.label) {
      const label =
        point.label === "this project"
          ? `\x1b[33m${point.label}\x1b[0m`
          : point.label;
      graph[y][x + 1] = label;
    }
  });
  // Print graph
  console.log(graph.map((row) => row.join("")).join("\n"));
  // Print x-axis labels
  console.log(`${xMin}${" ".repeat(width - 2)}${xMax}`);
  // Print y-axis labels
  console.log(`y: ${yMin} to ${yMax}`);
}

export function createAsciiBox(number: number): string {
  const numberStr = number.toString();
  const boxWidth = numberStr.length + 4; // 2 spaces padding on each side
  const horizontalBorder = "+".padEnd(boxWidth - 1, "-") + "+";
  const emptyLine = "|" + " ".repeat(boxWidth - 2) + "|";
  const numberLine = `| ${numberStr} |`;

  return [
    horizontalBorder,
    emptyLine,
    numberLine,
    emptyLine,
    horizontalBorder,
  ].join("\n");
}
export function createSpacer(lines: number): void {
  for (let i = 0; i < lines; i++) {
    console.log(" ");
  }
}

export function createSplashScreen(): string {
  // Read package.json

  // Extract name and version
  const name = "Project Analyser";
  const version = "1.0.0";

  // Create the splash screen content
  const splashContent =
    createSpacer(2) +
    createTable(["Name", "Version"], [[name, version]]) +
    createSpacer(2);

  return splashContent;
}

export function logWithColor(color: string, message: string): void {
  const colors: { [key: string]: string } = {
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",
    reset: "\x1b[0m",
  };

  const colorCode = colors[color] || colors.reset;

  if (!process.env.BLOCK_STDOUT) {
    process.stdout.write(`\r${colorCode}${message}${colors.reset}\x1b[K`);
  }
}

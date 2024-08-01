import { Folder } from "../../types/folders";

export function printTree(node: Folder, prefix: string = ""): void {
  console.log(prefix + node.name);
  if (node.children && node.children.length > 0) {
    const newPrefix = prefix + "  ";
    for (const [index, child] of node.children.entries()) {
      const isLast = index === node.children.length - 1;
      printTree(child, newPrefix + (isLast ? "└─ " : "├─ "));
    }
  }
}

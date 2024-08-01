import { Folder } from "../../types/folders";

export function printTree(node: Folder, prefix: string = ""): void {
  console.log(prefix + node.name);
  if (node.children) {
    const newPrefix = prefix + "  ";
    node.children.forEach((child, index) => {
      if (child.children) {
        const isLast = index === (node?.children?.length ?? 0) - 1;
        printTree(child, newPrefix + (isLast ? "└─ " : "├─ "));
      }
    });
  }
}

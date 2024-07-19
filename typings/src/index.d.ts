import { sortDirectoryStructure, getDirectoryStructure, getComplexityScore } from "./lib";
type RecordedScore = {
    finalScore: number;
    name: string;
};
import type { Folder, Stats } from "./types/folders";
interface Structure {
    item: Folder;
    stats: Stats;
}
declare function runAnalysis(): void;
export { runAnalysis, RecordedScore, Structure, Stats, getComplexityScore, getDirectoryStructure, sortDirectoryStructure, };
//# sourceMappingURL=index.d.ts.map
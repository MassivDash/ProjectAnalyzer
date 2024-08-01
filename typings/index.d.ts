import { sortDirectoryStructure, getDirectoryStructure, getComplexityScore } from "./lib";
import type { Config } from "./types";
type RecordedScore = {
    finalScore: number;
    name: string;
};
import type { Structure, Stats } from "./types/folders";
declare function runAnalysis(config?: Config | undefined): void;
export { runAnalysis, RecordedScore, Structure, Stats, getComplexityScore, getDirectoryStructure, sortDirectoryStructure, };
export default runAnalysis;
//# sourceMappingURL=index.d.ts.map
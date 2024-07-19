import type { Stats } from "../../types/folders";
interface BaseStats {
    normalizedLinesBase: number;
    normalizedCharsBase: number;
    normalizedFoldersBase: number;
}
export declare const getComplexityScore: (stats: Stats, baseStats?: BaseStats) => number;
export {};
//# sourceMappingURL=formula.d.ts.map
export declare function createTable(headers: string[], rows: string[][]): string;
export declare function plotXYGraph(points: {
    x: number;
    y: number;
    label?: string;
}[], width?: number, height?: number): void;
export declare function createAsciiBox(number: number): string;
export declare function createSpacer(lines: number): void;
export declare function createSplashScreen(): string;
export declare function logWithColor(color: string, message: string): void;
export declare const silentMode: (active: boolean) => void;
//# sourceMappingURL=display.d.ts.map
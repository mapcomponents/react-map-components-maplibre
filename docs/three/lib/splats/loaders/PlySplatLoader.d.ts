import { Loader } from 'three';
import { GaussianSplattingMesh } from '../GaussianSplattingMesh';
declare const enum PLYType {
    FLOAT = 0,
    INT = 1,
    UINT = 2,
    DOUBLE = 3,
    UCHAR = 4,
    UNDEFINED = 5
}
declare const enum PLYValue {
    MIN_X = 0,
    MIN_Y = 1,
    MIN_Z = 2,
    MAX_X = 3,
    MAX_Y = 4,
    MAX_Z = 5,
    MIN_SCALE_X = 6,
    MIN_SCALE_Y = 7,
    MIN_SCALE_Z = 8,
    MAX_SCALE_X = 9,
    MAX_SCALE_Y = 10,
    MAX_SCALE_Z = 11,
    PACKED_POSITION = 12,
    PACKED_ROTATION = 13,
    PACKED_SCALE = 14,
    PACKED_COLOR = 15,
    X = 16,
    Y = 17,
    Z = 18,
    SCALE_0 = 19,
    SCALE_1 = 20,
    SCALE_2 = 21,
    DIFFUSE_RED = 22,
    DIFFUSE_GREEN = 23,
    DIFFUSE_BLUE = 24,
    OPACITY = 25,
    F_DC_0 = 26,
    F_DC_1 = 27,
    F_DC_2 = 28,
    F_DC_3 = 29,
    ROT_0 = 30,
    ROT_1 = 31,
    ROT_2 = 32,
    ROT_3 = 33,
    UNDEFINED = 34
}
export interface PlyProperty {
    value: PLYValue;
    type: PLYType;
    offset: number;
}
export interface PLYHeader {
    vertexCount: number;
    chunkCount: number;
    rowVertexLength: number;
    rowChunkLength: number;
    vertexProperties: PlyProperty[];
    chunkProperties: PlyProperty[];
    dataView: DataView;
    buffer: ArrayBuffer;
}
/**
 * Loader for .ply Gaussian Splatting files
 */
export declare class PlySplatLoader extends Loader {
    private static readonly ROW_OUTPUT_LENGTH;
    private static readonly SH_C0;
    private static readonly PLY_CONVERSION_BATCH_SIZE;
    load(url: string, onLoad: (mesh: GaussianSplattingMesh) => void, onProgress?: (event: ProgressEvent) => void, onError?: (event: unknown) => void): void;
    parse(plyBuffer: ArrayBuffer, onLoad: (mesh: GaussianSplattingMesh) => void, onError?: (error: unknown) => void): void;
    static ConvertPLYToSplatAsync(data: ArrayBuffer): Promise<ArrayBuffer>;
    static ConvertPLYToSplat(data: ArrayBuffer, useCoroutine?: boolean): Generator<void, ArrayBuffer, void>;
    private static getCompressedChunks;
    private static getSplat;
    private static typeNameToEnum;
    private static valueNameToEnum;
    static ParseHeader(data: ArrayBuffer): PLYHeader | null;
}
export {};
//# sourceMappingURL=PlySplatLoader.d.ts.map
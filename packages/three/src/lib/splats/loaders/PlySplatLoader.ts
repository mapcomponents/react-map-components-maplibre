/**
 * This file is part of mapbox-3d-tiles.
 * Copyright (c) 2024 Jianshun Yang
 * Licensed under the MIT License.
 * Source: https://github.com/yangjs6/mapbox-3d-tiles
 */

import { Vector3, FileLoader, Loader, Quaternion, MathUtils } from 'three';
import { GaussianSplattingMesh } from '../GaussianSplattingMesh';
import { createYieldingScheduler, runCoroutineAsync } from '../../utils/coroutine';

const unpackUnorm = (value: number, bits: number): number => {
    const t = (1 << bits) - 1;
    return (value & t) / t;
};

const unpack111011 = (value: number, result: Vector3): void => {
    result.x = unpackUnorm(value >>> 21, 11);
    result.y = unpackUnorm(value >>> 11, 10);
    result.z = unpackUnorm(value, 11);
};

const unpack8888 = (value: number, result: Uint8ClampedArray): void => {
    result[0] = unpackUnorm(value >>> 24, 8) * 255;
    result[1] = unpackUnorm(value >>> 16, 8) * 255;
    result[2] = unpackUnorm(value >>> 8, 8) * 255;
    result[3] = unpackUnorm(value, 8) * 255;
};

const unpackRot = (value: number, result: Quaternion): void => {
    const norm = 1.0 / (Math.sqrt(2) * 0.5);
    const a = (unpackUnorm(value >>> 20, 10) - 0.5) * norm;
    const b = (unpackUnorm(value >>> 10, 10) - 0.5) * norm;
    const c = (unpackUnorm(value, 10) - 0.5) * norm;
    const m = Math.sqrt(1.0 - (a * a + b * b + c * c));

    switch (value >>> 30) {
        case 0: result.set(m, a, b, c); break;
        case 1: result.set(a, m, b, c); break;
        case 2: result.set(a, b, m, c); break;
        case 3: result.set(a, b, c, m); break;
    }
};

interface CompressedPLYChunk {
    min: Vector3;
    max: Vector3;
    minScale: Vector3;
    maxScale: Vector3;
}

const enum PLYType { FLOAT, INT, UINT, DOUBLE, UCHAR, UNDEFINED }

const enum PLYValue {
    MIN_X, MIN_Y, MIN_Z, MAX_X, MAX_Y, MAX_Z,
    MIN_SCALE_X, MIN_SCALE_Y, MIN_SCALE_Z,
    MAX_SCALE_X, MAX_SCALE_Y, MAX_SCALE_Z,
    PACKED_POSITION, PACKED_ROTATION, PACKED_SCALE, PACKED_COLOR,
    X, Y, Z, SCALE_0, SCALE_1, SCALE_2,
    DIFFUSE_RED, DIFFUSE_GREEN, DIFFUSE_BLUE, OPACITY,
    F_DC_0, F_DC_1, F_DC_2, F_DC_3,
    ROT_0, ROT_1, ROT_2, ROT_3,
    UNDEFINED,
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
export class PlySplatLoader extends Loader {
    private static readonly ROW_OUTPUT_LENGTH = 3 * 4 + 3 * 4 + 4 + 4;
    private static readonly SH_C0 = 0.28209479177387814;
    private static readonly PLY_CONVERSION_BATCH_SIZE = 32768;


    override load(
        url: string,
        onLoad: (mesh: GaussianSplattingMesh) => void,
        onProgress?: (event: ProgressEvent) => void,
        onError?: (event: unknown) => void
    ): void {
        const loader = new FileLoader(this.manager);
        loader.setPath(this.path);
        loader.setResponseType('arraybuffer');
        loader.setRequestHeader(this.requestHeader);
        loader.setWithCredentials(this.withCredentials);

        loader.load(
            url,
            buffer => this.parse(buffer as ArrayBuffer, onLoad, onError),
            onProgress,
            onError
        );
    }

    parse(
        plyBuffer: ArrayBuffer,
        onLoad: (mesh: GaussianSplattingMesh) => void,
        onError?: (error: unknown) => void
    ): void {
        PlySplatLoader.ConvertPLYToSplatAsync(plyBuffer)
            .then(splatsData => {
                const mesh = new GaussianSplattingMesh();
                return mesh.loadDataAsync(splatsData).then(() => onLoad(mesh));
            })
            .catch(error => {
                if (onError) {
                    onError(error);
                } else {
                    console.error(error);
                }
            });
    }

    static async ConvertPLYToSplatAsync(data: ArrayBuffer): Promise<ArrayBuffer> {
        return runCoroutineAsync(PlySplatLoader.ConvertPLYToSplat(data, true), createYieldingScheduler());
    }

    static *ConvertPLYToSplat(data: ArrayBuffer, useCoroutine = false): Generator<void, ArrayBuffer, void> {
        const header = PlySplatLoader.ParseHeader(data);
        if (!header) return data;

        const offset = { value: 0 };
        const compressedChunks = PlySplatLoader.getCompressedChunks(header, offset);

        for (let i = 0; i < header.vertexCount; i++) {
            PlySplatLoader.getSplat(header, i, compressedChunks, offset);
            if (useCoroutine && i % PlySplatLoader.PLY_CONVERSION_BATCH_SIZE === 0) {
                yield;
            }
        }

        return header.buffer;
    }

    private static getCompressedChunks(header: PLYHeader, offset: { value: number }): CompressedPLYChunk[] | null {
        if (!header.chunkCount) return null;

        const { dataView, chunkProperties, rowChunkLength, chunkCount } = header;
        const chunks: CompressedPLYChunk[] = [];

        for (let i = 0; i < chunkCount; i++) {
            const chunk: CompressedPLYChunk = {
                min: new Vector3(),
                max: new Vector3(),
                minScale: new Vector3(),
                maxScale: new Vector3(),
            };

            for (const prop of chunkProperties) {
                if (prop.type !== PLYType.FLOAT) continue;
                const value = dataView.getFloat32(prop.offset + offset.value, true);

                switch (prop.value) {
                    case PLYValue.MIN_X: chunk.min.x = value; break;
                    case PLYValue.MIN_Y: chunk.min.y = value; break;
                    case PLYValue.MIN_Z: chunk.min.z = value; break;
                    case PLYValue.MAX_X: chunk.max.x = value; break;
                    case PLYValue.MAX_Y: chunk.max.y = value; break;
                    case PLYValue.MAX_Z: chunk.max.z = value; break;
                    case PLYValue.MIN_SCALE_X: chunk.minScale.x = value; break;
                    case PLYValue.MIN_SCALE_Y: chunk.minScale.y = value; break;
                    case PLYValue.MIN_SCALE_Z: chunk.minScale.z = value; break;
                    case PLYValue.MAX_SCALE_X: chunk.maxScale.x = value; break;
                    case PLYValue.MAX_SCALE_Y: chunk.maxScale.y = value; break;
                    case PLYValue.MAX_SCALE_Z: chunk.maxScale.z = value; break;
                }
            }

            chunks.push(chunk);
            offset.value += rowChunkLength;
        }

        return chunks;
    }

    private static getSplat(
        header: PLYHeader,
        index: number,
        compressedChunks: CompressedPLYChunk[] | null,
        offset: { value: number }
    ): void {
        const q = new Quaternion();
        const temp3 = new Vector3();

        const { buffer, dataView, vertexProperties, rowVertexLength } = header;
        const rowLen = PlySplatLoader.ROW_OUTPUT_LENGTH;

        const position = new Float32Array(buffer, index * rowLen, 3);
        const scale = new Float32Array(buffer, index * rowLen + 12, 3);
        const rgba = new Uint8ClampedArray(buffer, index * rowLen + 24, 4);
        const rot = new Uint8ClampedArray(buffer, index * rowLen + 28, 4);

        const chunkIndex = index >> 8;
        let r0 = 255, r1 = 0, r2 = 0, r3 = 0;

        for (const prop of vertexProperties) {
            let value: number;
            switch (prop.type) {
                case PLYType.FLOAT: value = dataView.getFloat32(offset.value + prop.offset, true); break;
                case PLYType.INT: value = dataView.getInt32(offset.value + prop.offset, true); break;
                case PLYType.UINT: value = dataView.getUint32(offset.value + prop.offset, true); break;
                case PLYType.DOUBLE: value = dataView.getFloat64(offset.value + prop.offset, true); break;
                case PLYType.UCHAR: value = dataView.getUint8(offset.value + prop.offset); break;
                default: continue;
            }

            const chunk = compressedChunks?.[chunkIndex];

            switch (prop.value) {
                case PLYValue.PACKED_POSITION:
                    unpack111011(value, temp3);
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    position[0] = MathUtils.lerp(chunk!.min.x, chunk!.max.x, temp3.x);
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    position[1] = -MathUtils.lerp(chunk!.min.y, chunk!.max.y, temp3.y);
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    position[2] = MathUtils.lerp(chunk!.min.z, chunk!.max.z, temp3.z);
                    break;
                case PLYValue.PACKED_ROTATION:
                    unpackRot(value, q);
                    r0 = q.w; r1 = q.z; r2 = q.y; r3 = q.x;
                    break;
                case PLYValue.PACKED_SCALE:
                    unpack111011(value, temp3);
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    scale[0] = Math.exp(MathUtils.lerp(chunk!.minScale.x, chunk!.maxScale.x, temp3.x));
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    scale[1] = Math.exp(MathUtils.lerp(chunk!.minScale.y, chunk!.maxScale.y, temp3.y));
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    scale[2] = Math.exp(MathUtils.lerp(chunk!.minScale.z, chunk!.maxScale.z, temp3.z));
                    break;
                case PLYValue.PACKED_COLOR: unpack8888(value, rgba); break;
                case PLYValue.X: position[0] = value; break;
                case PLYValue.Y: position[1] = value; break;
                case PLYValue.Z: position[2] = value; break;
                case PLYValue.SCALE_0: scale[0] = Math.exp(value); break;
                case PLYValue.SCALE_1: scale[1] = Math.exp(value); break;
                case PLYValue.SCALE_2: scale[2] = Math.exp(value); break;
                case PLYValue.DIFFUSE_RED: rgba[0] = value; break;
                case PLYValue.DIFFUSE_GREEN: rgba[1] = value; break;
                case PLYValue.DIFFUSE_BLUE: rgba[2] = value; break;
                case PLYValue.F_DC_0: rgba[0] = (0.5 + PlySplatLoader.SH_C0 * value) * 255; break;
                case PLYValue.F_DC_1: rgba[1] = (0.5 + PlySplatLoader.SH_C0 * value) * 255; break;
                case PLYValue.F_DC_2: rgba[2] = (0.5 + PlySplatLoader.SH_C0 * value) * 255; break;
                case PLYValue.F_DC_3: rgba[3] = (0.5 + PlySplatLoader.SH_C0 * value) * 255; break;
                case PLYValue.OPACITY: rgba[3] = (1 / (1 + Math.exp(-value))) * 255; break;
                case PLYValue.ROT_0: r0 = value; break;
                case PLYValue.ROT_1: r1 = value; break;
                case PLYValue.ROT_2: r2 = value; break;
                case PLYValue.ROT_3: r3 = value; break;
            }
        }

        q.set(r1, r2, r3, r0).normalize();
        rot[0] = q.w * 128 + 128;
        rot[1] = q.x * 128 + 128;
        rot[2] = q.y * 128 + 128;
        rot[3] = q.z * 128 + 128;
        offset.value += rowVertexLength;
    }

    private static typeNameToEnum(name: string): PLYType {
        switch (name) {
            case 'float': return PLYType.FLOAT;
            case 'int': return PLYType.INT;
            case 'uint': return PLYType.UINT;
            case 'double': return PLYType.DOUBLE;
            case 'uchar': return PLYType.UCHAR;
            default: return PLYType.UNDEFINED;
        }
    }

    private static valueNameToEnum(name: string): PLYValue {
        const map: Record<string, PLYValue> = {
            min_x: PLYValue.MIN_X, min_y: PLYValue.MIN_Y, min_z: PLYValue.MIN_Z,
            max_x: PLYValue.MAX_X, max_y: PLYValue.MAX_Y, max_z: PLYValue.MAX_Z,
            min_scale_x: PLYValue.MIN_SCALE_X, min_scale_y: PLYValue.MIN_SCALE_Y, min_scale_z: PLYValue.MIN_SCALE_Z,
            max_scale_x: PLYValue.MAX_SCALE_X, max_scale_y: PLYValue.MAX_SCALE_Y, max_scale_z: PLYValue.MAX_SCALE_Z,
            packed_position: PLYValue.PACKED_POSITION, packed_rotation: PLYValue.PACKED_ROTATION,
            packed_scale: PLYValue.PACKED_SCALE, packed_color: PLYValue.PACKED_COLOR,
            x: PLYValue.X, y: PLYValue.Y, z: PLYValue.Z,
            scale_0: PLYValue.SCALE_0, scale_1: PLYValue.SCALE_1, scale_2: PLYValue.SCALE_2,
            diffuse_red: PLYValue.DIFFUSE_RED, red: PLYValue.DIFFUSE_RED,
            diffuse_green: PLYValue.DIFFUSE_GREEN, green: PLYValue.DIFFUSE_GREEN,
            diffuse_blue: PLYValue.DIFFUSE_BLUE, blue: PLYValue.DIFFUSE_BLUE,
            f_dc_0: PLYValue.F_DC_0, f_dc_1: PLYValue.F_DC_1, f_dc_2: PLYValue.F_DC_2, f_dc_3: PLYValue.F_DC_3,
            opacity: PLYValue.OPACITY,
            rot_0: PLYValue.ROT_0, rot_1: PLYValue.ROT_1, rot_2: PLYValue.ROT_2, rot_3: PLYValue.ROT_3,
        };
        return map[name] ?? PLYValue.UNDEFINED;
    }

    static ParseHeader(data: ArrayBuffer): PLYHeader | null {
        const ubuf = new Uint8Array(data);
        const headerText = new TextDecoder().decode(ubuf.slice(0, 1024 * 10));
        const headerEnd = 'end_header\n';
        const headerEndIndex = headerText.indexOf(headerEnd);

        if (headerEndIndex < 0) return null;

        const vertexMatch = /element vertex (\d+)\n/.exec(headerText);
        if (!vertexMatch) return null;
        const vertexCount = parseInt(vertexMatch[1]);

        const chunkMatch = /element chunk (\d+)\n/.exec(headerText);
        const chunkCount = chunkMatch ? parseInt(chunkMatch[1]) : 0;

        const offsets: Record<string, number> = {
            double: 8, int: 4, uint: 4, float: 4, short: 2, ushort: 2, uchar: 1, list: 0,
        };

        const enum ElementMode { Vertex, Chunk }
        let mode = ElementMode.Chunk;
        let rowVertexOffset = 0;
        let rowChunkOffset = 0;

        const vertexProperties: PlyProperty[] = [];
        const chunkProperties: PlyProperty[] = [];

        for (const line of headerText.slice(0, headerEndIndex).split('\n')) {
            if (line.startsWith('property ')) {
                const [, typeName, name] = line.split(' ');
                const property: PlyProperty = {
                    value: PlySplatLoader.valueNameToEnum(name),
                    type: PlySplatLoader.typeNameToEnum(typeName),
                    offset: mode === ElementMode.Chunk ? rowChunkOffset : rowVertexOffset,
                };

                if (mode === ElementMode.Chunk) {
                    chunkProperties.push(property);
                    rowChunkOffset += offsets[typeName] ?? 0;
                } else {
                    vertexProperties.push(property);
                    rowVertexOffset += offsets[typeName] ?? 0;
                }
            } else if (line.startsWith('element ')) {
                const [, type] = line.split(' ');
                mode = type === 'chunk' ? ElementMode.Chunk : ElementMode.Vertex;
            }
        }

        return {
            vertexCount,
            chunkCount,
            rowVertexLength: rowVertexOffset,
            rowChunkLength: rowChunkOffset,
            vertexProperties,
            chunkProperties,
            dataView: new DataView(data, headerEndIndex + headerEnd.length),
            buffer: new ArrayBuffer(PlySplatLoader.ROW_OUTPUT_LENGTH * vertexCount),
        };
    }
}

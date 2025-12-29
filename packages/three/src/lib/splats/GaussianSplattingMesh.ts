/**
 * This file is part of mapbox-3d-tiles.
 * Copyright (c) 2024 Jianshun Yang
 * Licensed under the MIT License.
 * Source: https://github.com/yangjs6/mapbox-3d-tiles
 */

import {
    BufferGeometry,
    Camera,
    Group,
    Material,
    Mesh,
    Scene,
    Vector2,
    Vector3,
    Quaternion,
    Matrix4,
    WebGLRenderer,
    DataTexture,
    PixelFormat,
    UnsignedIntType,
    FloatType,
    UnsignedByteType,
    HalfFloatType,
    DataUtils,
    RGBAFormat,
    RGBAIntegerFormat,
    ClampToEdgeWrapping,
    Box3,
    InstancedBufferGeometry,
    BufferAttribute,
    UVMapping,
    LinearFilter,
    NearestFilter,
    RGFormat,
    Sphere,
} from 'three';
import { GaussianSplattingGeometry } from './GaussianSplattingGeometry';
import { GaussianSplattingMaterial } from './GaussianSplattingMaterial';
import { Coroutine, createYieldingScheduler, runCoroutineAsync, runCoroutineSync } from '../utils/coroutine';
import { GaussianSplattingSorter } from './GaussianSplattingSorter';

export type Nullable<T> = T | null;

const toHalfFloat = (val: number) => DataUtils.toHalfFloat(val);

/**
 * Gaussian Splatting mesh renderer
 */
export class GaussianSplattingMesh extends Mesh {
    private static readonly ROW_OUTPUT_LENGTH = 3 * 4 + 3 * 4 + 4 + 4;
    private static readonly SPLAT_BATCH_SIZE = 327680;

    private vertexCount = 0;
    private worker: Nullable<GaussianSplattingSorter> = null;
    private frameIdLastUpdate = -1;
    private frameIdThisUpdate = 0;
    private cameraMatrix: Matrix4 | null = null;
    private internalModelViewMatrix: Matrix4 | null = null;
    private canPostToWorker = false;
    private covariancesATextureInternal: Nullable<DataTexture> = null;
    private covariancesBTextureInternal: Nullable<DataTexture> = null;
    private centersTextureInternal: Nullable<DataTexture> = null;
    private colorsTextureInternal: Nullable<DataTexture> = null;
    private splatPositions: Nullable<Float32Array> = null;
    private splatPositions2: Nullable<Float32Array> = null;
    private splatIndex: Nullable<Float32Array> = null;
    private shTexturesInternal: Nullable<DataTexture[]> = null;
    private splatsDataInternal: Nullable<ArrayBuffer> = null;
    private readonly keepInRam: boolean = false;

    private oldDirection = new Vector3();
    private useRGBACovariants = true;
    private tmpCovariances = [0, 0, 0, 0, 0, 0];
    private sortIsDirty = false;
    private lastSortTime = 0;
    private sortThrottleMs = 200;
    private shDegreeValue = 0;

    private tempQuaternion = new Quaternion();
    private tempPosition = new Vector3();
    private tempScale = new Vector3();
    private tempColor = new Uint8Array(4);
    private tempMatrix = new Matrix4();

    declare boundingBox: Box3 | null;
    declare boundingSphere: Sphere | null;
    readonly isGaussianSplattingMesh = true as const;
    readyToDisplay = false;
    override readonly type = 'GaussianSplattingMesh' as const;

    get shDegree() { return this.shDegreeValue; }
    get splatsData() { return this.splatsDataInternal; }
    get covariancesATexture() { return this.covariancesATextureInternal; }
    get covariancesBTexture() { return this.covariancesBTextureInternal; }
    get centersTexture() { return this.centersTextureInternal; }
    get colorsTexture() { return this.colorsTextureInternal; }
    get shTextures() { return this.shTexturesInternal; }

    constructor() {
        super();
        this.geometry = GaussianSplattingGeometry.build();
        this.material = GaussianSplattingMaterial.build();
        this.setEnabled(false);
    }

    setEnabled(enabled: boolean): void {
        this.visible = enabled;
    }

    postToWorker(forced = false): Promise<void> | undefined {
        const frameId = this.frameIdThisUpdate;
        if ((forced || frameId !== this.frameIdLastUpdate) && this.worker && this.cameraMatrix && this.canPostToWorker) {
            this.internalModelViewMatrix = new Matrix4().multiplyMatrices(this.cameraMatrix, this.matrixWorld);

            const invCamera = this.cameraMatrix.clone().invert();
            const modelView = new Matrix4().multiplyMatrices(invCamera, this.matrixWorld);
            const newDirection = new Vector3(0, 0, 1).transformDirection(modelView);
            const dot = newDirection.dot(this.oldDirection);

            if (forced || Math.abs(dot - 1) >= 0.01) {
                this.oldDirection.copy(newDirection);
                this.frameIdLastUpdate = frameId;
                this.canPostToWorker = false;
                return this.worker.sortDataAsync(this.internalModelViewMatrix.elements);
            }
        }
        return undefined;
    }

    override onBeforeRender(renderer: WebGLRenderer, scene: Scene, camera: Camera, geometry: BufferGeometry, material: Material, group: Group): void {
        this.frameIdThisUpdate = renderer.info.render.frame;
        
        const now = performance.now();
        if (now - this.lastSortTime > this.sortThrottleMs) {
            this.lastSortTime = now;
            this.sortDataAsync(camera).catch((err) => {
                if (err.name !== 'AbortError') {
                    console.warn('Splat sorting error:', err);
                }
            });
        }

        GaussianSplattingMaterial.updateUniforms(renderer, camera, this);
        super.onBeforeRender(renderer, scene, camera, geometry, material, group);
    }

    loadDataAsync(data: ArrayBuffer): Promise<void> {
        return this.updateDataAsync(data);
    }

    dispose(): void {
        this.covariancesATextureInternal?.dispose();
        this.covariancesBTextureInternal?.dispose();
        this.centersTextureInternal?.dispose();
        this.colorsTextureInternal?.dispose();
        this.shTexturesInternal?.forEach(tex => tex.dispose());

        this.covariancesATextureInternal = null;
        this.covariancesBTextureInternal = null;
        this.centersTextureInternal = null;
        this.colorsTextureInternal = null;
        this.shTexturesInternal = null;

        this.worker?.terminate();
        this.worker = null;
    }

    private copyTextures(source: GaussianSplattingMesh): void {
        this.covariancesATextureInternal = source.covariancesATexture?.clone() ?? null;
        this.covariancesBTextureInternal = source.covariancesBTexture?.clone() ?? null;
        this.centersTextureInternal = source.centersTexture?.clone() ?? null;
        this.colorsTextureInternal = source.colorsTexture?.clone() ?? null;
        if (source.shTexturesInternal) {
            this.shTexturesInternal = source.shTexturesInternal.map(tex => tex.clone());
        }
    }

    // @ts-expect-error - Return type differs from base class
    override clone(): GaussianSplattingMesh {
        const cloned = new GaussianSplattingMesh();
        cloned.geometry = this.geometry.clone();
        cloned.material = (this.material as Material).clone();
        cloned.vertexCount = this.vertexCount;
        cloned.copyTextures(this);
        cloned.splatPositions = this.splatPositions;
        cloned.readyToDisplay = false;
        cloned.instantiateWorker();
        return cloned;
    }

    private makeSplatFromComponents(
        sourceIndex: number,
        destinationIndex: number,
        position: Vector3,
        scale: Vector3,
        quaternion: Quaternion,
        color: Uint8Array,
        covA: Uint16Array,
        covB: Uint16Array,
        colorArray: Uint8Array,
        minimum: Vector3,
        maximum: Vector3,
    ): void {
        quaternion.w = -quaternion.w;
        scale = scale.multiplyScalar(2);

        const te = this.tempMatrix.elements;
        const covBSItemSize = this.useRGBACovariants ? 4 : 2;

        this.splatPositions![4 * sourceIndex + 0] = position.x;
        this.splatPositions![4 * sourceIndex + 1] = position.y;
        this.splatPositions![4 * sourceIndex + 2] = position.z;

        this.splatPositions2![4 * sourceIndex + 0] = position.x;
        this.splatPositions2![4 * sourceIndex + 1] = position.y;
        this.splatPositions2![4 * sourceIndex + 2] = position.z;

        minimum.min(position);
        maximum.max(position);

        const { x, y, z, w } = quaternion;
        const x2 = x + x, y2 = y + y, z2 = z + z;
        const xx = x * x2, xy = x * y2, xz = x * z2;
        const yy = y * y2, yz = y * z2, zz = z * z2;
        const wx = w * x2, wy = w * y2, wz = w * z2;
        const { x: sx, y: sy, z: sz } = scale;

        te[0] = (1 - (yy + zz)) * sx;
        te[1] = (xy + wz) * sy;
        te[2] = (xz - wy) * sz;
        te[4] = (xy - wz) * sx;
        te[5] = (1 - (xx + zz)) * sy;
        te[6] = (yz + wx) * sz;
        te[8] = (xz + wy) * sx;
        te[9] = (yz - wx) * sy;
        te[10] = (1 - (xx + yy)) * sz;

        const covariances = this.tmpCovariances;
        covariances[0] = te[0] * te[0] + te[1] * te[1] + te[2] * te[2];
        covariances[1] = te[0] * te[4] + te[1] * te[5] + te[2] * te[6];
        covariances[2] = te[0] * te[8] + te[1] * te[9] + te[2] * te[10];
        covariances[3] = te[4] * te[4] + te[5] * te[5] + te[6] * te[6];
        covariances[4] = te[4] * te[8] + te[5] * te[9] + te[6] * te[10];
        covariances[5] = te[8] * te[8] + te[9] * te[9] + te[10] * te[10];

        let factor = -10000;
        for (let i = 0; i < 6; i++) {
            factor = Math.max(factor, Math.abs(covariances[i]));
        }

        this.splatPositions![4 * sourceIndex + 3] = factor;
        this.splatPositions2![4 * sourceIndex + 3] = factor;

        covA[destinationIndex * 4 + 0] = toHalfFloat(covariances[0] / factor);
        covA[destinationIndex * 4 + 1] = toHalfFloat(covariances[1] / factor);
        covA[destinationIndex * 4 + 2] = toHalfFloat(covariances[2] / factor);
        covA[destinationIndex * 4 + 3] = toHalfFloat(covariances[3] / factor);
        covB[destinationIndex * covBSItemSize + 0] = toHalfFloat(covariances[4] / factor);
        covB[destinationIndex * covBSItemSize + 1] = toHalfFloat(covariances[5] / factor);

        colorArray[destinationIndex * 4 + 0] = color[0];
        colorArray[destinationIndex * 4 + 1] = color[1];
        colorArray[destinationIndex * 4 + 2] = color[2];
        colorArray[destinationIndex * 4 + 3] = color[3];
    }

    private makeSplatFromBuffer(sourceIndex: number, destinationIndex: number, fBuffer: Float32Array, uBuffer: Uint8Array, covA: Uint16Array, covB: Uint16Array, colorArray: Uint8Array, minimum: Vector3, maximum: Vector3): void {
        const baseF = 8 * sourceIndex;
        const baseU = 32 * sourceIndex;

        this.tempPosition.set(fBuffer[baseF], fBuffer[baseF + 1], fBuffer[baseF + 2]);
        this.tempScale.set(fBuffer[baseF + 3], fBuffer[baseF + 4], fBuffer[baseF + 5]);

        this.tempQuaternion.set(
            (uBuffer[baseU + 29] - 127.5) / 127.5,
            (uBuffer[baseU + 30] - 127.5) / 127.5,
            (uBuffer[baseU + 31] - 127.5) / 127.5,
            (uBuffer[baseU + 28] - 127.5) / 127.5
        ).normalize();

        this.tempColor[0] = uBuffer[baseU + 24];
        this.tempColor[1] = uBuffer[baseU + 25];
        this.tempColor[2] = uBuffer[baseU + 26];
        this.tempColor[3] = uBuffer[baseU + 27];

        this.makeSplatFromComponents(sourceIndex, destinationIndex, this.tempPosition, this.tempScale, this.tempQuaternion, this.tempColor, covA, covB, colorArray, minimum, maximum);
    }

    private updateTextures(covA: Uint16Array, covB: Uint16Array, colorArray: Uint8Array, sh?: Uint8Array[]): void {
        const textureSize = this.getTextureSize(this.vertexCount);

        const createF32Texture = (data: Float32Array, w: number, h: number, format: PixelFormat) => {
            const tex = new DataTexture(data, w, h, format, FloatType, UVMapping, ClampToEdgeWrapping, ClampToEdgeWrapping, LinearFilter, LinearFilter);
            tex.generateMipmaps = false;
            tex.needsUpdate = true;
            return tex;
        };

        const createU8Texture = (data: Uint8Array, w: number, h: number, format: PixelFormat) => {
            const tex = new DataTexture(data, w, h, format, UnsignedByteType, UVMapping, ClampToEdgeWrapping, ClampToEdgeWrapping, LinearFilter, LinearFilter);
            tex.generateMipmaps = false;
            tex.needsUpdate = true;
            return tex;
        };

        const createU32Texture = (data: Uint32Array, w: number, h: number, format: PixelFormat) => {
            const tex = new DataTexture(data, w, h, format, UnsignedIntType, UVMapping, ClampToEdgeWrapping, ClampToEdgeWrapping, NearestFilter, NearestFilter);
            tex.generateMipmaps = false;
            tex.needsUpdate = true;
            return tex;
        };

        const createF16Texture = (data: Uint16Array, w: number, h: number, format: PixelFormat) => {
            const tex = new DataTexture(data, w, h, format, HalfFloatType, UVMapping, ClampToEdgeWrapping, ClampToEdgeWrapping, LinearFilter, LinearFilter);
            tex.generateMipmaps = false;
            tex.needsUpdate = true;
            return tex;
        };

        this.covariancesATextureInternal = createF16Texture(covA, textureSize.x, textureSize.y, RGBAFormat);
        this.covariancesBTextureInternal = createF16Texture(covB, textureSize.x, textureSize.y, this.useRGBACovariants ? RGBAFormat : RGFormat);
        this.centersTextureInternal = createF32Texture(this.splatPositions!, textureSize.x, textureSize.y, RGBAFormat);
        this.colorsTextureInternal = createU8Texture(colorArray, textureSize.x, textureSize.y, RGBAFormat);

        if (sh) {
            this.shTexturesInternal = sh.map(shData => {
                const buffer = new Uint32Array(shData.buffer);
                const shTexture = createU32Texture(buffer, textureSize.x, textureSize.y, RGBAIntegerFormat);
                shTexture.wrapS = ClampToEdgeWrapping;
                shTexture.wrapT = ClampToEdgeWrapping;
                return shTexture;
            });
        }

        this.instantiateWorker();
    }

    private updateBoundingInfo(minimum: Vector3, maximum: Vector3): void {
        this.boundingBox = new Box3(minimum, maximum);
        this.boundingSphere = this.boundingBox.getBoundingSphere(new Sphere());
    }

    private *updateDataCoroutine(data: ArrayBuffer, isAsync: boolean, sh?: Uint8Array[]): Coroutine<void> {
        if (!this.covariancesATextureInternal) {
            this.readyToDisplay = false;
        }

        const uBuffer = new Uint8Array(data);
        const fBuffer = new Float32Array(uBuffer.buffer);

        if (this.keepInRam) {
            this.splatsDataInternal = data;
        }

        this.shDegreeValue = sh ? sh.length : 0;
        const vertexCount = uBuffer.length / GaussianSplattingMesh.ROW_OUTPUT_LENGTH;

        if (vertexCount !== this.vertexCount) {
            this.vertexCount = vertexCount;
            this.geometry = GaussianSplattingGeometry.build(this.vertexCount);
            this.material = GaussianSplattingMaterial.build(this.shDegreeValue);
            this.updateSplatIndexBuffer(this.vertexCount);
        }

        const textureSize = this.getTextureSize(vertexCount);
        const textureLength = textureSize.x * textureSize.y;

        this.splatPositions = new Float32Array(4 * textureLength);
        this.splatPositions2 = new Float32Array(4 * vertexCount);
        const covA = new Uint16Array(textureLength * 4);
        const covB = new Uint16Array((this.useRGBACovariants ? 4 : 2) * textureLength);
        const colorArray = new Uint8Array(textureLength * 4);

        const minimum = new Vector3(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE);
        const maximum = new Vector3(-Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE);

        for (let i = 0; i < vertexCount; i++) {
            this.makeSplatFromBuffer(i, i, fBuffer, uBuffer, covA, covB, colorArray, minimum, maximum);
            if (isAsync && i % GaussianSplattingMesh.SPLAT_BATCH_SIZE === 0) {
                yield;
            }
        }

        this.updateTextures(covA, covB, colorArray, sh);
        this.updateBoundingInfo(minimum, maximum);
        this.setEnabled(true);
        this.postToWorker(true);
    }

    async updateDataAsync(data: ArrayBuffer, sh?: Uint8Array[]): Promise<void> {
        return runCoroutineAsync(this.updateDataCoroutine(data, true, sh), createYieldingScheduler());
    }

    updateData(data: ArrayBuffer, sh?: Uint8Array[]): void {
        runCoroutineSync(this.updateDataCoroutine(data, false, sh));
    }

    sortDataAsync(camera: Camera, forced = false): Promise<void> {
        if (!this.worker || !camera) {
            return Promise.resolve();
        }

        this.cameraMatrix = camera.matrixWorldInverse;
        return this.postToWorker(forced) ?? Promise.resolve();
    }


    private updateSplatIndexBuffer(vertexCount: number): void {
        if (!this.splatIndex || vertexCount > this.splatIndex.length) {
            this.splatIndex = new Float32Array(vertexCount);
            for (let j = 0; j < vertexCount; j++) {
                this.splatIndex[j] = j;
            }
            (this.geometry.attributes.splatIndex as BufferAttribute).set(this.splatIndex);
            this.geometry.attributes.splatIndex.needsUpdate = true;
        }
        (this.geometry as InstancedBufferGeometry).instanceCount = vertexCount;
    }

    private instantiateWorker(): void {
        if (!this.vertexCount) return;

        this.updateSplatIndexBuffer(this.vertexCount);
        this.worker?.terminate();
        this.worker = new GaussianSplattingSorter();

        this.worker.init(this.splatPositions2!, this.vertexCount);
        this.canPostToWorker = true;

        this.worker.onmessage = (splatIndex) => {
            if (this.splatIndex && splatIndex) {
                for (let j = 0; j < this.vertexCount; j++) {
                    this.splatIndex[j] = splatIndex[j];
                }
                (this.geometry.attributes.splatIndex as BufferAttribute).set(this.splatIndex);
            }

            this.geometry.attributes.splatIndex.needsUpdate = true;
            this.canPostToWorker = true;
            this.readyToDisplay = true;

            if (this.sortIsDirty) {
                this.postToWorker(true);
                this.sortIsDirty = false;
            }
        };
    }

    private getTextureSize(length: number): Vector2 {
        const maxTextureSize = 4096;
        const width = maxTextureSize;
        let height = 1;

        while (width * height < length) {
            height *= 2;
        }

        if (height > width) {
            console.error(`GaussianSplatting texture size: (${width}, ${height}), maxTextureSize: ${width}`);
            height = width;
        }

        return new Vector2(width, height);
    }
}

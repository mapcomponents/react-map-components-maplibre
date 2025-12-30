import { Box3, BufferGeometry, Camera, DataTexture, Group, InstancedBufferGeometry, Material, Mesh, Scene, ShaderMaterial, Sphere, WebGLRenderer } from 'three';
export type Nullable<T> = T | null;
/**
 * Geometry for Gaussian Splatting
 */
export declare class GaussianSplattingGeometry {
    static build(maxSplatCount?: number): InstancedBufferGeometry;
}
/**
 * Radix sort-based depth sorter for Gaussian Splatting
 */
export declare class GaussianSplattingSorter {
    private static readonly BATCH_SIZE;
    private static workCount;
    vertexCount: number;
    positions: Float32Array | null;
    hasInit: boolean;
    splatIndex: Uint32Array | null;
    depthValues: Int32Array | null;
    tempDepths: Int32Array | null;
    tempIndices: Uint32Array | null;
    abortController: AbortController | null;
    onmessage: ((splatIndex: Uint32Array) => void) | null;
    terminate(): void;
    private initSortData;
    private sortData;
    init(positions: Float32Array, vertexCount: number): void;
    sortDataAsync(viewProj: number[]): Promise<void>;
}
/**
 * Material for Gaussian Splatting
 */
export declare class GaussianSplattingMaterial {
    static build(shDegree?: number): ShaderMaterial;
    static updateUniforms(renderer: WebGLRenderer, camera: Camera, mesh: GaussianSplattingMesh): void;
}
/**
 * Gaussian Splatting mesh renderer
 */
export declare class GaussianSplattingMesh extends Mesh {
    private static readonly ROW_OUTPUT_LENGTH;
    private static readonly SPLAT_BATCH_SIZE;
    private vertexCount;
    private worker;
    private frameIdLastUpdate;
    private frameIdThisUpdate;
    private cameraMatrix;
    private internalModelViewMatrix;
    private canPostToWorker;
    private covariancesATextureInternal;
    private covariancesBTextureInternal;
    private centersTextureInternal;
    private colorsTextureInternal;
    private splatPositions;
    private splatPositions2;
    private splatIndex;
    private shTexturesInternal;
    private splatsDataInternal;
    private readonly keepInRam;
    private oldDirection;
    private useRGBACovariants;
    private tmpCovariances;
    private sortIsDirty;
    private lastSortTime;
    private sortThrottleMs;
    private shDegreeValue;
    private tempQuaternion;
    private tempPosition;
    private tempScale;
    private tempColor;
    private tempMatrix;
    boundingBox: Box3 | null;
    boundingSphere: Sphere | null;
    readonly isGaussianSplattingMesh: true;
    readyToDisplay: boolean;
    readonly type: "GaussianSplattingMesh";
    get shDegree(): number;
    get splatsData(): Nullable<ArrayBuffer>;
    get covariancesATexture(): Nullable<DataTexture>;
    get covariancesBTexture(): Nullable<DataTexture>;
    get centersTexture(): Nullable<DataTexture>;
    get colorsTexture(): Nullable<DataTexture>;
    get shTextures(): Nullable<DataTexture[]>;
    constructor();
    setEnabled(enabled: boolean): void;
    postToWorker(forced?: boolean): Promise<void> | undefined;
    onBeforeRender(renderer: WebGLRenderer, scene: Scene, camera: Camera, geometry: BufferGeometry, material: Material, group: Group): void;
    loadDataAsync(data: ArrayBuffer): Promise<void>;
    dispose(): void;
    private copyTextures;
    clone(): GaussianSplattingMesh;
    private makeSplatFromComponents;
    private makeSplatFromBuffer;
    private updateTextures;
    private updateBoundingInfo;
    private updateDataCoroutine;
    updateDataAsync(data: ArrayBuffer, sh?: Uint8Array[]): Promise<void>;
    updateData(data: ArrayBuffer, sh?: Uint8Array[]): void;
    sortDataAsync(camera: Camera, forced?: boolean): Promise<void>;
    private updateSplatIndexBuffer;
    private instantiateWorker;
    private getTextureSize;
}
//# sourceMappingURL=GaussianSplattingMesh.d.ts.map
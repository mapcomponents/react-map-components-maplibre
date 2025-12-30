import { Loader } from 'three';
import { GaussianSplattingMesh } from '../GaussianSplattingMesh';
/**
 * Loader for .splat Gaussian Splatting files
 */
export declare class SplatLoader extends Loader {
    load(url: string, onLoad: (mesh: GaussianSplattingMesh) => void, onProgress?: (event: ProgressEvent) => void, onError?: (event: unknown) => void): void;
    parse(buffer: ArrayBuffer, onLoad: (mesh: GaussianSplattingMesh) => void, onError?: (error: unknown) => void): void;
}
//# sourceMappingURL=SplatLoader.d.ts.map
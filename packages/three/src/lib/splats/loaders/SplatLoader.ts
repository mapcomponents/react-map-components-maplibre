/**
 * This file is part of mapbox-3d-tiles.
 * Copyright (c) 2024 Jianshun Yang
 * Licensed under the MIT License.
 * Source: https://github.com/yangjs6/mapbox-3d-tiles
 */

import { FileLoader, Loader, LoadingManager } from 'three';
import { GaussianSplattingMesh } from '../GaussianSplattingMesh';

/**
 * Loader for .splat Gaussian Splatting files
 */
export class SplatLoader extends Loader {
    constructor(manager?: LoadingManager) {
        super(manager);
    }

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
        buffer: ArrayBuffer,
        onLoad: (mesh: GaussianSplattingMesh) => void,
        onError?: (error: unknown) => void
    ): void {
        const mesh = new GaussianSplattingMesh();
        mesh.loadDataAsync(buffer)
            .then(() => onLoad(mesh))
            .catch(error => {
                if (onError) {
                    onError(error);
                } else {
                    console.error(error);
                }
            });
    }
}

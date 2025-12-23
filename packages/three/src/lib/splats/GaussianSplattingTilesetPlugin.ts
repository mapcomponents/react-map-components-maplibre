/**
 * This file is part of mapbox-3d-tiles.
 * Copyright (c) 2024 Jianshun Yang
 * Licensed under the MIT License.
 * Source: https://github.com/yangjs6/mapbox-3d-tiles
 */

import { Object3D, Vector3, Camera } from 'three';

interface Tiles {
    addEventListener(type: string, callback: () => void): void;
    removeEventListener(type: string, callback: () => void): void;
    forEachLoadedModel(callback: (scene: Object3D, tile: unknown) => void): void;
}

interface GaussianSplattingChild extends Object3D {
    isGaussianSplattingMesh?: boolean;
    boundingBox?: { getCenter(target: Vector3): Vector3 };
}

/**
 * Plugin for managing Gaussian Splatting meshes within a tileset
 */
export class GaussianSplattingTilesetPlugin {
    private tiles: Tiles | null = null;
    private camera: Camera;
    private boundUpdateBefore = () => this.onUpdateBefore();
    private boundUpdateAfter = () => this.onUpdateAfter();

    constructor(_: unknown, camera: Camera) {
        this.camera = camera;
    }

    init(tiles: Tiles): void {
        this.tiles = tiles;
        tiles.addEventListener('update-before', this.boundUpdateBefore);
        tiles.addEventListener('update-after', this.boundUpdateAfter);
    }

    dispose(): void {
        if (!this.tiles) return;
        this.tiles.removeEventListener('update-before', this.boundUpdateBefore);
        this.tiles.removeEventListener('update-after', this.boundUpdateAfter);
    }

    private onUpdateBefore(): void {}

    private onUpdateAfter(): void {
        const { tiles, camera } = this;
        if (!tiles || !camera) return;

        const center = new Vector3();
        const cameraMatrix = camera.matrixWorldInverse;

        tiles.forEachLoadedModel((scene: Object3D) => {
            if (!scene) return;

            scene.traverse((child: GaussianSplattingChild) => {
                if (!child.isGaussianSplattingMesh || !child.boundingBox) return;

                child.boundingBox.getCenter(center);
                center.z = 0;
                center.applyMatrix4(child.matrixWorld);
                center.applyMatrix4(cameraMatrix);
                child.renderOrder = -center.length();
            });
        });
    }
}

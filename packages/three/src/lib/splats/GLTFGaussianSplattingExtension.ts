/**
 * This file is part of mapbox-3d-tiles.
 * Copyright (c) 2024 Jianshun Yang
 * Licensed under the MIT License.
 * Source: https://github.com/yangjs6/mapbox-3d-tiles
 */

import { Box3, BufferGeometry, Camera, Group, Mesh, Sphere, Vector3 } from 'three';
import { GLTFLoaderPlugin, GLTFParser } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { GaussianSplattingMesh } from './GaussianSplattingMesh';

const EXT_NAME = 'KHR_gaussian_splatting';

const ATTRIBUTES: Record<string, string> = {
    POSITION: 'position',
    COLOR_0: 'color',
    _SCALE: 'scale',
    _ROTATION: 'rotation',
    _OPACITY: 'opacity',
};

const WEBGL_COMPONENT_TYPES: Record<number, typeof Int8Array | typeof Uint8Array | typeof Int16Array | typeof Uint16Array | typeof Uint32Array | typeof Float32Array> = {
    5120: Int8Array,
    5121: Uint8Array,
    5122: Int16Array,
    5123: Uint16Array,
    5125: Uint32Array,
    5126: Float32Array,
};

export class GLTFGaussianSplattingExtension implements GLTFLoaderPlugin {
    name = EXT_NAME;
    parser: GLTFParser;
    camera?: Camera;

    constructor(parser: GLTFParser, camera?: Camera) {
        this.parser = parser;
        this.camera = camera;
    }

    loadMesh(meshIndex: number): Promise<Group | Mesh> | null {
        const { parser, camera } = this;
        const { json } = parser;

        if (!json.extensionsUsed?.includes(EXT_NAME)) {
            return null;
        }

        const primitives = json.meshes[meshIndex].primitives;

        return this.loadGeometries(primitives).then(geometries => {
            const meshPromises = geometries.map(geometry => this.createSplatMesh(geometry, camera));
            return Promise.all(meshPromises).then(splatMeshes => {
                const group = new Group();
                splatMeshes.forEach(mesh => group.add(mesh));
                parser.associations.set(group, { meshes: meshIndex });
                return group;
            });
        });
    }

    private async createSplatMesh(geometry: BufferGeometry, camera?: Camera): Promise<GaussianSplattingMesh> {
        const splatMesh = new GaussianSplattingMesh();
        await splatMesh.updateDataFromGeometryAsync(geometry);
        geometry.dispose();
        if (camera) {
            await splatMesh.sortDataAsync(camera);
        }
        return splatMesh;
    }

    private loadGeometries(primitives: unknown[]): Promise<BufferGeometry[]> {
        return Promise.all(
            primitives.map(primitive => this.addPrimitiveAttributes(new BufferGeometry(), primitive))
        );
    }

    private addPrimitiveAttributes(geometry: BufferGeometry, primitiveDef: unknown): Promise<BufferGeometry> {
        const { parser } = this;
        const attributes = (primitiveDef as { attributes: Record<string, number> }).attributes;
        const pending: Promise<void>[] = [];

        for (const [gltfName, accessorIndex] of Object.entries(attributes)) {
            const threeName = ATTRIBUTES[gltfName] || gltfName.toLowerCase();
            if (threeName in geometry.attributes) continue;

            pending.push(
                parser.getDependency('accessor', accessorIndex).then(accessor => {
                    geometry.setAttribute(threeName, accessor);
                })
            );
        }

        const indices = (primitiveDef as { indices?: number }).indices;
        if (indices !== undefined && !geometry.index) {
            pending.push(
                parser.getDependency('accessor', indices).then(accessor => {
                    geometry.setIndex(accessor);
                })
            );
        }

        this.computeBounds(geometry, primitiveDef);
        return Promise.all(pending).then(() => geometry);
    }

    private computeBounds(geometry: BufferGeometry, primitiveDef: unknown): void {
        const { parser } = this;
        const attributes = (primitiveDef as { attributes: Record<string, number> }).attributes;

        if (attributes.POSITION === undefined) return;

        const accessor = parser.json.accessors[attributes.POSITION];
        const { min, max } = accessor;

        if (!min || !max) {
            console.warn('THREE.GLTFLoader: Missing min/max properties for accessor POSITION.');
            return;
        }

        const box = new Box3(
            new Vector3(min[0], min[1], min[2]),
            new Vector3(max[0], max[1], max[2])
        );

        if (accessor.normalized) {
            const scale = getNormalizedComponentScale(WEBGL_COMPONENT_TYPES[accessor.componentType]);
            box.min.multiplyScalar(scale);
            box.max.multiplyScalar(scale);
        }

        const targets = (primitiveDef as { targets?: Array<{ POSITION?: number }> }).targets;
        if (targets) {
            this.expandBoundsWithMorphTargets(box, targets, parser);
        }

        geometry.boundingBox = box;
        const sphere = new Sphere();
        box.getCenter(sphere.center);
        sphere.radius = box.min.distanceTo(box.max) / 2;
        geometry.boundingSphere = sphere;
    }

    private expandBoundsWithMorphTargets(
        box: Box3,
        targets: Array<{ POSITION?: number }>,
        parser: GLTFParser
    ): void {
        const maxDisplacement = new Vector3();
        const vector = new Vector3();

        for (const target of targets) {
            if (target.POSITION === undefined) continue;

            const accessor = parser.json.accessors[target.POSITION];
            const { min, max } = accessor;

            if (!min || !max) {
                console.warn('THREE.GLTFLoader: Missing min/max properties for accessor POSITION.');
                continue;
            }

            vector.set(
                Math.max(Math.abs(min[0]), Math.abs(max[0])),
                Math.max(Math.abs(min[1]), Math.abs(max[1])),
                Math.max(Math.abs(min[2]), Math.abs(max[2]))
            );

            if (accessor.normalized) {
                const scale = getNormalizedComponentScale(WEBGL_COMPONENT_TYPES[accessor.componentType]);
                vector.multiplyScalar(scale);
            }

            maxDisplacement.max(vector);
        }

        box.expandByVector(maxDisplacement);
    }
}

function getNormalizedComponentScale(constructor: typeof Int8Array | typeof Uint8Array | typeof Int16Array | typeof Uint16Array | typeof Uint32Array | typeof Float32Array): number {
    switch (constructor) {
        case Int8Array: return 1 / 127;
        case Uint8Array: return 1 / 255;
        case Int16Array: return 1 / 32767;
        case Uint16Array: return 1 / 65535;
        default: throw new Error('THREE.GLTFLoader: Unsupported normalized accessor component type.');
    }
}

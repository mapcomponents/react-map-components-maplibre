/**
 * Derived from mapbox-3d-tiles by Jianshun Yang (MIT License)
 * https://github.com/yangjs6/mapbox-3d-tiles
 */

import {
    BufferAttribute,
    BufferGeometry,
    DynamicDrawUsage,
    InstancedBufferAttribute,
    InstancedBufferGeometry,
} from 'three';

export class GaussianSplattingGeometry {
    static build(maxSplatCount = 1): InstancedBufferGeometry {
        const baseGeometry = new BufferGeometry();

        // Triangle vertices (slightly faster than quad due to fewer shader invocations)
        baseGeometry.setIndex([0, 1, 2]);
        const positions = new BufferAttribute(new Float32Array([
            -3.0, -2.0, 0.0,
             3.0, -2.0, 0.0,
             0.0,  4.0, 0.0,
        ]), 3);
        baseGeometry.setAttribute('position', positions);

        const geometry = new InstancedBufferGeometry();
        geometry.setIndex(baseGeometry.getIndex());
        geometry.setAttribute('position', baseGeometry.getAttribute('position'));

        const splatIndexes = new InstancedBufferAttribute(new Float32Array(maxSplatCount), 1, false);
        splatIndexes.setUsage(DynamicDrawUsage);
        geometry.setAttribute('splatIndex', splatIndexes);
        geometry.instanceCount = 0;

        return geometry;
    }
}

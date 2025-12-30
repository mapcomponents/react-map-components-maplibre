/**
 * Derived from mapbox-3d-tiles by Jianshun Yang (MIT License)
 * https://github.com/yangjs6/mapbox-3d-tiles
 */

import { type Map as MaplibreMap, MercatorCoordinate, LngLatLike } from 'maplibre-gl';
import { Vector3, Quaternion, Matrix4 } from 'three';

type Position = number[];

const DEG_TO_RAD = Math.PI / 180;
const RAD_TO_DEG = 180 / Math.PI;

export default class ThreejsUtils {
    static updateWorldMatrix(map: MaplibreMap | null, refCenter: LngLatLike | null = null): Matrix4 {
        if (!map) return new Matrix4();

        const center = refCenter ?? map.getCenter();
        const origin = MercatorCoordinate.fromLngLat(center);
        const scale = origin.meterInMercatorCoordinateUnits();

        return new Matrix4().compose(
            new Vector3(origin.x, origin.y, origin.z),
            new Quaternion(),
            new Vector3(scale, -scale, scale)
        );
    }

    static toScenePositionMercator(worldMatrixInv: Matrix4, mercator: MercatorCoordinate): Vector3 {
        return new Vector3(mercator.x, mercator.y, mercator.z).applyMatrix4(worldMatrixInv);
    }

    static toMapPositionMercator(worldMatrix: Matrix4, position: Vector3): MercatorCoordinate {
        const transformed = position.clone().applyMatrix4(worldMatrix);
        return new MercatorCoordinate(transformed.x, transformed.y, transformed.z);
    }

    static toScenePosition(worldMatrixInv: Matrix4, position: LngLatLike, altitude?: number): Vector3 {
        return this.toScenePositionMercator(worldMatrixInv, MercatorCoordinate.fromLngLat(position, altitude));
    }

    static toMapPosition(worldMatrix: Matrix4, position: Vector3): Position {
        const mercator = this.toMapPositionMercator(worldMatrix, position);
        const lngLat = mercator.toLngLat();
        return [lngLat.lng, lngLat.lat, mercator.toAltitude()];
    }

    static degToRad(degrees: number): number {
        return degrees * DEG_TO_RAD;
    }

    static radToDeg(radians: number): number {
        return radians * RAD_TO_DEG;
    }
}

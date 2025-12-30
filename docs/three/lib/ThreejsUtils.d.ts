import { Map as MaplibreMap, MercatorCoordinate, LngLatLike } from 'maplibre-gl';
import { Vector3, Matrix4 } from 'three';
type Position = number[];
export default class ThreejsUtils {
    static updateWorldMatrix(map: MaplibreMap | null, refCenter?: LngLatLike | null): Matrix4;
    static toScenePositionMercator(worldMatrixInv: Matrix4, mercator: MercatorCoordinate): Vector3;
    static toMapPositionMercator(worldMatrix: Matrix4, position: Vector3): MercatorCoordinate;
    static toScenePosition(worldMatrixInv: Matrix4, position: LngLatLike, altitude?: number): Vector3;
    static toMapPosition(worldMatrix: Matrix4, position: Vector3): Position;
    static degToRad(degrees: number): number;
    static radToDeg(radians: number): number;
}
export {};
//# sourceMappingURL=ThreejsUtils.d.ts.map
import { LngLatLike } from 'maplibre-gl';
import * as THREE from 'three';
/**
 * Renders obj or gltf 3D Models on the MapLibreMap referenced by props.mapId
 *
 * @component
 */
export interface MlThreeModelLayerProps {
    mapId?: string;
    url: string;
    position?: {
        x: number;
        y: number;
        z: number;
    };
    mapPosition?: LngLatLike;
    altitude?: number;
    rotation?: {
        x: number;
        y: number;
        z: number;
    };
    scale?: {
        x: number;
        y: number;
        z: number;
    } | number;
    enableTransformControls?: boolean;
    transformMode?: 'translate' | 'rotate' | 'scale';
    onTransformChange?: (object: THREE.Object3D) => void;
    init?: () => void;
    onDone?: () => void;
}
declare const MlThreeModelLayer: (props: MlThreeModelLayerProps) => import("react/jsx-runtime").JSX.Element | null;
export default MlThreeModelLayer;
//# sourceMappingURL=MlThreeModelLayer.d.ts.map
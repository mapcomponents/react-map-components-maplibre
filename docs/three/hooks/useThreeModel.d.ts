import { LngLatLike } from 'maplibre-gl';
import * as THREE from 'three';
export interface ThreeModelTransform {
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
    position?: {
        x: number;
        y: number;
        z: number;
    };
}
export type ModelLoader = (url: string, onSuccess: (object: THREE.Object3D) => void) => void;
export interface UseThreeModelProps {
    url: string;
    position: LngLatLike;
    transform?: ThreeModelTransform;
    init?: () => void;
    onDone?: () => void;
    loaders: Record<string, ModelLoader>;
    customLoaders?: Record<string, ModelLoader>;
}
/**
 * Hook to manage loading, transforming, and rendering a 3D model in the MapLibre/Three.js context.
 */
export declare const useThreeModel: (props: UseThreeModelProps) => THREE.Object3D<THREE.Object3DEventMap> | undefined;
//# sourceMappingURL=useThreeModel.d.ts.map
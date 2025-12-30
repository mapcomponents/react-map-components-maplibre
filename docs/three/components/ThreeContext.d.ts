import { Scene, PerspectiveCamera, Group, Matrix4 } from 'three';
import { Map as MapboxMap } from 'maplibre-gl';
import { default as ThreejsSceneRenderer } from '../lib/ThreejsSceneRenderer';
export interface ThreeContextType {
    scene: Scene | undefined;
    camera: PerspectiveCamera | undefined;
    renderer: ThreejsSceneRenderer | undefined;
    map: MapboxMap | undefined;
    sceneRoot: Group | undefined;
    worldMatrix: Matrix4 | undefined;
    worldMatrixInv: Matrix4 | undefined;
}
export declare const ThreeContext: import('react').Context<ThreeContextType>;
export declare const useThree: () => ThreeContextType;
//# sourceMappingURL=ThreeContext.d.ts.map
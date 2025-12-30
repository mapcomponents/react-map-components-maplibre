import { Map as MaplibreMap } from 'maplibre-gl';
import { Scene, PerspectiveCamera, Matrix4, Group } from 'three';
export default class ThreejsSceneHelper {
    createScene(createLight?: boolean): Scene;
    createGroup(parent: Scene | Group, name: string): Group;
    createCamera(sceneRoot: Group, name: string): PerspectiveCamera;
    private buildPerspectiveMatrix;
    private buildOrthographicMatrix;
    private calcProjectionMatrix;
    updateCameraForRender(camera: PerspectiveCamera, map: MaplibreMap, matrix: any, worldMatrix: Matrix4, worldMatrixInv: Matrix4): void;
    private extractCameraParams;
    private extractMVPMatrix;
    private updateCameraTransform;
    createEnvTexture(envTexture: string, scene: Scene): void;
}
//# sourceMappingURL=ThreejsSceneHelper.d.ts.map
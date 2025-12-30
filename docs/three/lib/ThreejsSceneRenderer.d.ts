import { Map as MaplibreMap } from 'maplibre-gl';
import { WebGLRenderer, Scene, Camera } from 'three';
export default class ThreejsSceneRenderer {
    private renderer;
    private labelRenderer;
    /**
     * Creates a ThreejsSceneRenderer instance.
     *
     * @param map - The MapLibre map instance
     * @param gl - The WebGL2 rendering context from MapLibre
     */
    constructor(map: MaplibreMap, gl: WebGL2RenderingContext);
    private createLabelRenderer;
    getRenderer(): WebGLRenderer;
    render(scene: Scene, camera: Camera): void;
    dispose(): void;
}
//# sourceMappingURL=ThreejsSceneRenderer.d.ts.map
/**
 * Derived from mapbox-3d-tiles by Jianshun Yang (MIT License)
 * https://github.com/yangjs6/mapbox-3d-tiles
 */

import { type Map as MaplibreMap } from 'maplibre-gl';
import { WebGLRenderer, Scene, Camera } from 'three';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

export default class ThreejsSceneRenderer {
    private renderer: WebGLRenderer;
    private labelRenderer: CSS2DRenderer;
    private interleaved: boolean;
    private canvas?: HTMLCanvasElement;

    /**
     * Creates a ThreejsSceneRenderer instance.
     * 
     * @param map - The MapLibre map instance
     * @param gl - The WebGL2 rendering context from MapLibre
     * @param interleaved - If true (default), shares WebGL context with MapLibre map.
     *                      If false, creates a dedicated canvas on top of the map.
     */
    constructor(map: MaplibreMap, gl: WebGL2RenderingContext, interleaved: boolean = true) {
        this.interleaved = interleaved;

        if (interleaved) {
            // Interleaved mode: share WebGL context with MapLibre
            if (!gl || gl.isContextLost()) {
                throw new Error('WebGL context is lost or invalid');
            }

            this.renderer = new WebGLRenderer({
                alpha: true,
                antialias: true,
                canvas: map.getCanvas(),
                context: gl,
            });
            this.renderer.autoClear = false;
        } else {
            // Non-interleaved mode: create a dedicated canvas on top of the map
            this.canvas = this.createOverlayCanvas(map);
            this.renderer = new WebGLRenderer({
                alpha: true,
                antialias: true,
                canvas: this.canvas,
            });
            this.renderer.setPixelRatio(window.devicePixelRatio);
            this.renderer.setSize(
                map.getContainer().clientWidth,
                map.getContainer().clientHeight
            );
            this.renderer.autoClear = true;
        }

        this.renderer.shadowMap.enabled = true;
        this.labelRenderer = this.createLabelRenderer(map);
    }

    /**
     * Creates an overlay canvas for non-interleaved mode.
     */
    private createOverlayCanvas(map: MaplibreMap): HTMLCanvasElement {
        const container = map.getContainer();
        const canvas = document.createElement('canvas');
        
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.pointerEvents = 'none';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.width = container.clientWidth * window.devicePixelRatio;
        canvas.height = container.clientHeight * window.devicePixelRatio;

        container.appendChild(canvas);

        // Handle resize events
        map.on('resize', () => {
            const { clientWidth, clientHeight } = container;
            canvas.width = clientWidth * window.devicePixelRatio;
            canvas.height = clientHeight * window.devicePixelRatio;
            this.renderer.setSize(clientWidth, clientHeight);
        });

        return canvas;
    }

    private createLabelRenderer(map: MaplibreMap): CSS2DRenderer {
        const container = map.getContainer();
        const labelRenderer = new CSS2DRenderer();

        labelRenderer.setSize(container.clientWidth, container.clientHeight);
        labelRenderer.domElement.style.position = 'absolute';
        labelRenderer.domElement.style.top = '0px';
        labelRenderer.domElement.style.pointerEvents = 'none';

        map._container.appendChild(labelRenderer.domElement);
        map.on('resize', () => {
            const { clientWidth, clientHeight } = map.getContainer();
            labelRenderer.setSize(clientWidth, clientHeight);
        });

        return labelRenderer;
    }

    getRenderer(): WebGLRenderer {
        return this.renderer;
    }

    /**
     * Returns whether the renderer is in interleaved mode.
     */
    isInterleaved(): boolean {
        return this.interleaved;
    }

    render(scene: Scene, camera: Camera): void {
        if (this.interleaved) {
            // In interleaved mode, reset WebGL state to avoid conflicts with MapLibre
            // but DO NOT clear the depth buffer - we want to preserve MapLibre's depth
            // information so Three.js objects can be properly occluded by MapLibre 3D
            // content (fill-extrusion buildings, terrain, etc.) and vice versa.
            this.renderer.resetState();
        } else {
            // In non-interleaved mode, clear the canvas before rendering
            this.renderer.clear();
        }
        this.renderer.render(scene, camera);
        this.labelRenderer.render(scene, camera);
    }

    dispose(): void {
        this.labelRenderer.domElement?.parentNode?.removeChild(this.labelRenderer.domElement);
        
        // In non-interleaved mode, also remove the dedicated canvas
        if (!this.interleaved && this.canvas) {
            this.canvas.parentNode?.removeChild(this.canvas);
            this.canvas = undefined;
        }
        
        this.renderer?.dispose();
    }
}

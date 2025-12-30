import React, { useEffect, useState, useRef } from 'react';
import { useMap } from '@mapcomponents/react-maplibre';
import { Scene, PerspectiveCamera, Group, Matrix4 } from 'three';
import { LngLatLike, CustomLayerInterface } from 'maplibre-gl';
import ThreejsSceneHelper from '../lib/ThreejsSceneHelper';
import ThreejsSceneRenderer from '../lib/ThreejsSceneRenderer';
import ThreejsUtils from '../lib/ThreejsUtils';
import { ThreeContext } from './ThreeContext';

export interface ThreeProviderProps {
    mapId?: string;
    id: string;
    refCenter?: LngLatLike;
    envTexture?: string;
    envIntensity?: number;
    createLight?: boolean;
    children?: React.ReactNode;
    /**
     * Id of an existing layer in the MapLibre instance to help specify the layer order.
     * The Three.js layer will be rendered visually beneath the layer with the specified id.
     */
    beforeId?: string;
}

export const ThreeProvider: React.FC<ThreeProviderProps> = ({
    mapId,
    id,
    refCenter,
    envTexture,
    envIntensity = 1,
    createLight = true,
    children,
    beforeId
}) => {
    const { map } = useMap({ mapId, waitForLayer: beforeId });
    const [scene, setScene] = useState<Scene>();
    const [camera, setCamera] = useState<PerspectiveCamera>();
    const [renderer, setRenderer] = useState<ThreejsSceneRenderer>();
    const [sceneRoot, setSceneRoot] = useState<Group>();
    const [worldMatrix, setWorldMatrix] = useState<Matrix4>();
    const [worldMatrixInv, setWorldMatrixInv] = useState<Matrix4>();
    
    const helperRef = useRef(new ThreejsSceneHelper());
    const worldMatrixRef = useRef<Matrix4>(new Matrix4());
    const worldMatrixInvRef = useRef<Matrix4>(new Matrix4());
    const rendererRef = useRef<ThreejsSceneRenderer | undefined>(undefined);

    useEffect(() => {
        if (!map) return;

        const helper = helperRef.current;
        const threeScene = helper.createScene(createLight);
        const root = helper.createGroup(threeScene, 'scene-root');
        const threeCamera = helper.createCamera(root, 'camera-for-render');
        
        const customLayer: CustomLayerInterface = {
            id: id,
            type: 'custom',
            renderingMode: '3d',
            onAdd: (mapInstance, gl) => {
                const threeRenderer = new ThreejsSceneRenderer(mapInstance, gl as WebGL2RenderingContext);
                rendererRef.current = threeRenderer;
                setRenderer(threeRenderer);

                const center = refCenter || mapInstance.getCenter();
                worldMatrixRef.current = ThreejsUtils.updateWorldMatrix(mapInstance, center);
                worldMatrixInvRef.current = worldMatrixRef.current.clone().invert();
                setWorldMatrix(worldMatrixRef.current);
                setWorldMatrixInv(worldMatrixInvRef.current);

                if (envTexture) {
                    helper.createEnvTexture(envTexture, threeScene);
                }
                threeScene.environmentIntensity = envIntensity;

                mapInstance.triggerRepaint();
            },
            render: (gl, matrix) => {
                if (!rendererRef.current || !threeScene || !threeCamera) return;

                helper.updateCameraForRender(
                    threeCamera, 
                    map.map, 
                    matrix, 
                    worldMatrixRef.current, 
                    worldMatrixInvRef.current
                );

                rendererRef.current.render(threeScene, threeCamera);
                map.triggerRepaint();
            },
            onRemove: () => {
                if (rendererRef.current) {
                    rendererRef.current.dispose();
                    rendererRef.current = undefined;
                }
                setRenderer(undefined);
            }
        };

        if (!map.getLayer(id)) {
            map.addLayer(customLayer, beforeId);
        }

        setScene(threeScene);
        setCamera(threeCamera);
        setSceneRoot(root);

        return () => {
            if (map.getLayer(id)) {
                map.removeLayer(id);
            }
            // Cleanup is handled in onRemove
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [map, id]); // Re-run if map or id changes.

    // Handle dynamic prop changes
    useEffect(() => {
        if (scene && envTexture) {
             helperRef.current.createEnvTexture(envTexture, scene);
        }
    }, [scene, envTexture]);

    useEffect(() => {
        if (scene) {
            scene.environmentIntensity = envIntensity;
        }
    }, [scene, envIntensity]);

    // Handle refCenter change
    useEffect(() => {
        if (map && refCenter) {
             worldMatrixRef.current = ThreejsUtils.updateWorldMatrix(map.map, refCenter);
             worldMatrixInvRef.current = worldMatrixRef.current.clone().invert();
             setWorldMatrix(worldMatrixRef.current);
             setWorldMatrixInv(worldMatrixInvRef.current);
             map.triggerRepaint();
        }
    }, [map, refCenter]);


    return (
        <ThreeContext.Provider value={{ scene, camera, renderer, map: map?.map, sceneRoot, worldMatrix, worldMatrixInv }}>
            {children}
        </ThreeContext.Provider>
    );
};

import { createContext, useContext } from 'react';
import { Scene, PerspectiveCamera, Group } from 'three';
import { Map as MapboxMap } from 'maplibre-gl';
import ThreejsSceneRenderer from '../lib/ThreejsSceneRenderer';

export interface ThreeContextType {
    scene: Scene | undefined;
    camera: PerspectiveCamera | undefined;
    renderer: ThreejsSceneRenderer | undefined;
    map: MapboxMap | undefined;
    sceneRoot: Group | undefined;
}

export const ThreeContext = createContext<ThreeContextType>({
    scene: undefined,
    camera: undefined,
    renderer: undefined,
    map: undefined,
    sceneRoot: undefined,
});

export const useThree = () => useContext(ThreeContext);

import { createContext, useContext } from 'react';
import { Scene, PerspectiveCamera, Group, Matrix4 } from 'three';
import { Map as MapboxMap } from 'maplibre-gl';
import ThreejsSceneRenderer from '../lib/ThreejsSceneRenderer';

export interface ThreeContextType {
	scene: Scene | undefined;
	camera: PerspectiveCamera | undefined;
	renderer: ThreejsSceneRenderer | undefined;
	map: MapboxMap | undefined;
	sceneRoot: Group | undefined;
	worldMatrix: Matrix4 | undefined;
	worldMatrixInv: Matrix4 | undefined;
}

export const ThreeContext = createContext<ThreeContextType>({
	scene: undefined,
	camera: undefined,
	renderer: undefined,
	map: undefined,
	sceneRoot: undefined,
	worldMatrix: undefined,
	worldMatrixInv: undefined,
});

export const useThree = () => useContext(ThreeContext);

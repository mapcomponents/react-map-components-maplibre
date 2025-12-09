import { useEffect, useRef } from 'react';
import maplibregl, { CustomLayerInterface, LngLatLike } from 'maplibre-gl';
import * as THREE from 'three';
import { useMap } from '@mapcomponents/react-maplibre';
import { GLTFLoader } from 'three-stdlib';

/**
 * Renders obj or gltf 3D Models on the MapLibreMap referenced by props.mapId
 *
 * @component
 */

export interface MlThreeJsLayerProps {
	mapId?: string;
	url: string;
	position: number[];
	rotation: number[];
	scale: number;
	init?: () => void;
	onDone?: () => void;
}

type ThreeJsCustomLayer = CustomLayerInterface & {
	camera?: THREE.Camera;
	scene?: THREE.Scene;
	map?: maplibregl.Map;
	renderer?: THREE.WebGLRenderer;
};

const convertDegreeToRadians = (degree: number) => {
	return degree * (Math.PI / 180);
};

const MlThreeJsLayer = (props: MlThreeJsLayerProps) => {
	const mapHook = useMap({mapId: props.mapId});

	const layerName = '3d-model';
	const initializedRef = useRef(false);
	const initFuncRef = useRef(props.init);

	const cleanup = () => {
		if (mapHook.map && mapHook.map.style) {
			if (mapHook.map.getLayer(layerName)) {
				mapHook.map.removeLayer(layerName);
			}
		}
	};

	useEffect(() => {
		if (typeof initFuncRef.current === 'function') {
			initFuncRef.current();
		}
		return cleanup;
	}, []);

	useEffect(() => {
		if (!mapHook.map || initializedRef.current) return;

		initializedRef.current = true;

		// parameters to ensure the model is georeferenced correctly on the map
		const modelOrigin = props.position ?? [7.099771581806502, 50.73395746209983];
		// 50.73395746209983, 7.099771581806502
		const modelAltitude = props.position[2] ?? 0;
		const modelRotate = props.rotation
			? [
					convertDegreeToRadians(props.rotation[0]),
					convertDegreeToRadians(props.rotation[1]),
					convertDegreeToRadians(props.rotation[2]),
				]
			: [Math.PI / 2, 90, 0];

		const modelAsMercatorCoordinate = maplibregl.MercatorCoordinate.fromLngLat(
			modelOrigin as LngLatLike,
			modelAltitude
		);

		// transformation parameters to position, rotate and scale the 3D model onto the map
		const modelTransform = {
			translateX: modelAsMercatorCoordinate.x + 0.0000008,
			translateY: modelAsMercatorCoordinate.y + 0.0000018,
			translateZ: modelAsMercatorCoordinate.z,
			rotateX: modelRotate[0],
			rotateY: modelRotate[1],
			rotateZ: modelRotate[2],
			/* Since our 3D model is in real world meters, a scale transform needs to be
			 * applied since the CustomLayerInterface expects units in MercatorCoordinates.
			 */
			scale: props.scale ?? modelAsMercatorCoordinate.meterInMercatorCoordinateUnits() + 0.00000003,
		};

		//var THREE = window.THREE;

		// configuration of the custom layer for a 3D model per the CustomLayerInterface
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const customLayer: ThreeJsCustomLayer = {
			id: '3d-model',
			type: 'custom',
			renderingMode: '3d',
			camera: undefined,
			scene: undefined,
			onAdd: function (map: maplibregl.Map, gl: WebGL2RenderingContext) {
				// eslint-disable-next-line @typescript-eslint/no-this-alias
				const self = this;
				this.camera = new THREE.Camera();
				this.scene = new THREE.Scene();


				const sunLight = new THREE.DirectionalLight(0xffffff, 3); // RGB(229, 227, 165), intensity 4
				sunLight.position.set(
					-5.619660954998525e-14,
					888.4981803423489,
					-458.8801406994369
				);
				console.log(sunLight.position);
				sunLight.name = "sunlight";
				this.scene.add(sunLight);

// Enable shadows if needed (deck.gl had _shadow: false)
				sunLight.castShadow = false; // Set to true to enable

				// use the three.js GLTF loader to add the 3D model to the three.js scene
				const loader = new GLTFLoader();
				loader.load(
					props.url,
					function (gltf: { scene: THREE.Object3D<THREE.Object3DEventMap> }) {
						gltf.scene.traverse((node) => {
							if ((node as THREE.Mesh).isMesh) {
								node.castShadow = true;
							}
						});
						self.scene?.add(gltf.scene);
						if (typeof props.onDone === 'function') {
							props.onDone();
						}
					}.bind(this)
				);
				this.map = map;

				// use the Mapbox GL JS map canvas for three.js
				this.renderer = new THREE.WebGLRenderer({
					canvas: map.getCanvas(),
					context: gl,
					antialias: true,
				});

				this.renderer.autoClear = false;
				this.renderer.shadowMap.enabled = true;
				this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
			},
			render: function (_gl, matrix) {
				const rotationX = new THREE.Matrix4().makeRotationAxis(
					new THREE.Vector3(1, 0, 0),
					modelTransform.rotateX
				);
				const rotationY = new THREE.Matrix4().makeRotationAxis(
					new THREE.Vector3(0, 1, 0),
					modelTransform.rotateY
				);
				const rotationZ = new THREE.Matrix4().makeRotationAxis(
					new THREE.Vector3(0, 0, 1),
					modelTransform.rotateZ
				);

				const m = new THREE.Matrix4().fromArray(
					Object.values(matrix.defaultProjectionData.mainMatrix)
				);
				const l = new THREE.Matrix4()
					.makeTranslation(
						modelTransform.translateX,
						modelTransform.translateY,
						modelTransform.translateZ
					)
					.scale(
						new THREE.Vector3(modelTransform.scale, -modelTransform.scale, modelTransform.scale)
					)
					.multiply(rotationX)
					.multiply(rotationY)
					.multiply(rotationZ);

				if (this.camera && this.scene) {
					this.camera.projectionMatrix = m.multiply(l);
					this.renderer?.resetState();
					this.renderer?.render(this.scene, this.camera);
					this.map?.triggerRepaint();
				}
			},
		};

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		mapHook.map?.addLayer(customLayer);

		if (mapHook.map?.getLayer(layerName)) {
			mapHook.map.setLayoutProperty(layerName, 'visibility', 'visible');
		}
	}, [mapHook.map, props]);

	return <></>;
};

export default MlThreeJsLayer;

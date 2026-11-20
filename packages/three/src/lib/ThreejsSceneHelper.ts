/**
 * Derived from mapbox-3d-tiles by Jianshun Yang (MIT License)
 * https://github.com/yangjs6/mapbox-3d-tiles
 */

import type { CustomRenderMethodInput, Map as MaplibreMap } from 'maplibre-gl';
import {
	Scene,
	PerspectiveCamera,
	Matrix4,
	Group,
	EquirectangularReflectionMapping,
	DirectionalLight,
	AmbientLight,
	Vector3,
	Quaternion,
	Euler,
} from 'three';
import { HDRLoader } from 'three/examples/jsm/loaders/HDRLoader.js';
import ThreejsUtils from './ThreejsUtils';

export default class ThreejsSceneHelper {
	createScene(createLight = true): Scene {
		const scene = new Scene();

		if (createLight) {
			const dirLight = new DirectionalLight(0xffffff, 4);
			dirLight.position.set(1, 2, 3);
			scene.add(dirLight);

			const ambLight = new AmbientLight(0xffffff, 0.2);
			scene.add(ambLight);
		}

		return scene;
	}

	createGroup(parent: Scene | Group, name: string): Group {
		const group = new Group();
		group.name = name;
		parent.add(group);
		return group;
	}

	createCamera(_sceneRoot: Group, name: string): PerspectiveCamera {
		// Keep the render camera detached so Three.js does not overwrite its per-frame map matrix.
		const camera = new PerspectiveCamera();
		camera.name = name;

		return camera;
	}

	private buildPerspectiveMatrix(
		fov: number,
		aspect: number,
		near: number,
		far: number
	): Float64Array {
		const f = 1.0 / Math.tan(fov / 2);
		const nf = 1.0 / (near - far);

		return new Float64Array([
			f / aspect,
			0,
			0,
			0,
			0,
			f,
			0,
			0,
			0,
			0,
			(far + near) * nf,
			-1,
			0,
			0,
			2 * far * near * nf,
			0,
		]);
	}

	updateCameraForRender(
		camera: PerspectiveCamera,
		map: MaplibreMap,
		renderInput: CustomRenderMethodInput,
		worldMatrix: Matrix4
	): void {
		const { width, height } = map.getCanvas();
		const aspect = width / height;
		camera.fov = ThreejsUtils.radToDeg(renderInput.fov);
		camera.aspect = aspect;
		camera.near = renderInput.nearZ;
		camera.far = renderInput.farZ;

		const cleanProjection = this.buildPerspectiveMatrix(
			renderInput.fov,
			aspect,
			renderInput.nearZ,
			renderInput.farZ
		);
		(camera as any)._cleanProjectionMatrix = cleanProjection;

		const mvpMatrix = new Matrix4()
			.fromArray(Array.from(renderInput.defaultProjectionData.mainMatrix))
			.multiply(worldMatrix);

		camera.projectionMatrix.fromArray(Array.from(renderInput.projectionMatrix));
		camera.projectionMatrixInverse.copy(camera.projectionMatrix).invert();

		const viewMatrix = new Matrix4().multiplyMatrices(camera.projectionMatrixInverse, mvpMatrix);

		camera.matrixWorld.copy(viewMatrix).invert();
		camera.matrixWorldInverse.copy(viewMatrix);
		camera.matrixAutoUpdate = false;
		camera.matrixWorldAutoUpdate = false;

		this.updateCameraTransform(camera);
	}

	private updateCameraTransform(camera: PerspectiveCamera): void {
		const position = new Vector3();
		const quaternion = new Quaternion();
		const scale = new Vector3();

		camera.matrixWorld.decompose(position, quaternion, scale);
		camera.position.copy(position);
		camera.rotation.copy(new Euler().setFromQuaternion(quaternion, 'YXZ'));
	}

	createEnvTexture(envTexture: string, scene: Scene): void {
		if (!envTexture?.endsWith('.hdr')) return;

		new HDRLoader().load(envTexture, (texture) => {
			texture.mapping = EquirectangularReflectionMapping;
			scene.environment = texture;
			scene.environmentRotation.x = Math.PI / 2;
		});
	}
}

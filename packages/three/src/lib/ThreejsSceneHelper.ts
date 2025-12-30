/**
 * Derived from mapbox-3d-tiles by Jianshun Yang (MIT License)
 * https://github.com/yangjs6/mapbox-3d-tiles
 */

import { type Map as MaplibreMap } from 'maplibre-gl';
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

	createCamera(sceneRoot: Group, name: string): PerspectiveCamera {
		const camera = new PerspectiveCamera();
		camera.name = name;

		const group = new Group();
		group.name = `${name}-parent`;
		group.add(camera);

		sceneRoot.add(group);
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

	private buildOrthographicMatrix(
		left: number,
		right: number,
		bottom: number,
		top: number,
		near: number,
		far: number
	): Float64Array {
		const lr = 1 / (left - right);
		const bt = 1 / (bottom - top);
		const nf = 1 / (near - far);

		return new Float64Array([
			-2 * lr,
			0,
			0,
			0,
			0,
			-2 * bt,
			0,
			0,
			0,
			0,
			2 * nf,
			0,
			(left + right) * lr,
			(top + bottom) * bt,
			(far + near) * nf,
			1,
		]);
	}

	private calcProjectionMatrix(transform: any, fov: number, nearZ: number, farZ: number): Matrix4 {
		const offset = transform.centerOffset;
		const aspect = transform.width / transform.height;

		const perspective = this.buildPerspectiveMatrix(fov, aspect, nearZ, farZ);
		perspective[8] = (-offset.x * 2) / transform.width;
		perspective[9] = (offset.y * 2) / transform.height;

		if (!transform.isOrthographic) {
			return new Matrix4().fromArray(perspective);
		}

		const cameraToCenterDistance = (0.5 * transform.height) / Math.tan(fov / 2.0);
		const halfHeight = cameraToCenterDistance * Math.tan(fov * 0.5);
		const halfWidth = halfHeight * aspect;

		const ortho = this.buildOrthographicMatrix(
			-halfWidth - offset.x,
			halfWidth - offset.x,
			-halfHeight + offset.y,
			halfHeight + offset.y,
			nearZ,
			farZ
		);

		const transitionPitch = 15;
		const t = Math.min(transform.pitch / transitionPitch, 1.0);
		const eased = t * t * t * t * t;

		const blended = new Float64Array(16);
		for (let i = 0; i < 16; i++) {
			blended[i] = (1 - eased) * ortho[i] + eased * perspective[i];
		}

		return new Matrix4().fromArray(blended);
	}

	updateCameraForRender(
		camera: PerspectiveCamera,
		map: MaplibreMap,
		matrix: any,
		worldMatrix: Matrix4,
		worldMatrixInv: Matrix4
	): void {
		const transform = map.transform;

		const { fov, nearZ, farZ, aspect } = this.extractCameraParams(matrix, transform);

		camera.fov = ThreejsUtils.radToDeg(fov);
		camera.aspect = aspect;
		camera.near = nearZ;
		camera.far = farZ;

		const cleanProjection = this.buildPerspectiveMatrix(fov, aspect, nearZ, farZ);
		(camera as any)._cleanProjectionMatrix = cleanProjection;

		const mvpMatrix = this.extractMVPMatrix(matrix, worldMatrix);
		const projectionMatrix = this.calcProjectionMatrix(transform, fov, nearZ, farZ);

		camera.projectionMatrix.copy(projectionMatrix);
		camera.projectionMatrixInverse.copy(projectionMatrix).invert();

		const viewMatrix = new Matrix4().multiplyMatrices(camera.projectionMatrixInverse, mvpMatrix);

		camera.matrixWorld.copy(viewMatrix).invert();
		camera.matrixWorldInverse.copy(viewMatrix);
		camera.matrixAutoUpdate = false;
		camera.matrixWorldAutoUpdate = false;

		this.updateCameraTransform(camera);
	}

	private extractCameraParams(matrix: any, transform: any) {
		const aspect = transform.width / transform.height;

		if (matrix.fov !== undefined) {
			return {
				fov: matrix.fov,
				nearZ: matrix.nearZ,
				farZ: matrix.farZ,
				aspect,
			};
		}

		const cameraToCenterDistance = transform.cameraToCenterDistance;
		const fov =
			cameraToCenterDistance && transform.height
				? 2 * Math.atan(transform.height / 2 / cameraToCenterDistance)
				: 0.6435;

		return {
			fov,
			nearZ: transform.nearZ || 0.1,
			farZ: transform.farZ || 10000,
			aspect,
		};
	}

	private extractMVPMatrix(matrix: any, worldMatrix: Matrix4): Matrix4 {
		let baseMatrix: Matrix4;

		if (matrix.defaultProjectionData?.mainMatrix) {
			baseMatrix = new Matrix4().fromArray(Object.values(matrix.defaultProjectionData.mainMatrix));
		} else if (matrix.modelViewProjectionMatrix) {
			baseMatrix = new Matrix4().fromArray(matrix.modelViewProjectionMatrix);
		} else {
			const arr = Array.isArray(matrix) ? matrix : Array.from(matrix);
			baseMatrix = new Matrix4().fromArray(arr);
		}

		return new Matrix4().multiplyMatrices(baseMatrix, worldMatrix);
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

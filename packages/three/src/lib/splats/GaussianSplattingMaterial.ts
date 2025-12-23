/**
 * Derived from mapbox-3d-tiles by Jianshun Yang (MIT License)
 * https://github.com/yangjs6/mapbox-3d-tiles
 */

import { Camera, DoubleSide, NormalBlending, ShaderMaterial, Vector2, WebGLRenderer } from 'three';
import { fragmentShaderSource, vertexShaderSource } from './GaussianSplattingShaders';
import { GaussianSplattingMesh } from './GaussianSplattingMesh';

export class GaussianSplattingMaterial {
    static build(shDegree = 0): ShaderMaterial {
        return new ShaderMaterial({
            uniforms: {
                invViewport: { value: new Vector2() },
                dataTextureSize: { value: new Vector2() },
                focal: { value: new Vector2() },
                covariancesATexture: { value: null },
                covariancesBTexture: { value: null },
                centersTexture: { value: null },
                colorsTexture: { value: null },
                shTexture0: { value: null },
                shTexture1: { value: null },
                shTexture2: { value: null },
            },
            defines: { SH_DEGREE: shDegree },
            vertexShader: vertexShaderSource,
            fragmentShader: fragmentShaderSource,
            transparent: true,
            alphaTest: 1.0,
            blending: NormalBlending,
            depthTest: true,
            depthWrite: true,
            side: DoubleSide,
        });
    }

    static updateUniforms(renderer: WebGLRenderer, camera: Camera, mesh: GaussianSplattingMesh): void {
        const material = mesh.material as ShaderMaterial;
        if (!material?.uniforms) return;

        const { uniforms } = material;
        const renderSize = renderer.getSize(new Vector2());

        uniforms.invViewport.value.set(1 / renderSize.x, 1 / renderSize.y);

        if (camera) {
            const cleanMatrix = (camera as any)._cleanProjectionMatrix;
            const elements = cleanMatrix?.elements ?? cleanMatrix ?? camera.projectionMatrix.elements;

            uniforms.focal.value.set(
                elements[0] * 0.5 * renderSize.x,
                elements[5] * 0.5 * renderSize.y
            );
        }

        if (mesh.covariancesATexture) {
            const { width, height } = mesh.covariancesATexture.image;
            uniforms.dataTextureSize.value.set(width, height);
            uniforms.covariancesATexture.value = mesh.covariancesATexture;
            uniforms.covariancesBTexture.value = mesh.covariancesBTexture;
            uniforms.centersTexture.value = mesh.centersTexture;
            uniforms.colorsTexture.value = mesh.colorsTexture;

            mesh.shTextures?.forEach((tex, i) => {
                uniforms[`shTexture${i}`].value = tex;
            });
        }

        material.uniformsNeedUpdate = true;
    }
}

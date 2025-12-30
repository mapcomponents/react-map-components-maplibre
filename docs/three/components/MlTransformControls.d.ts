import * as THREE from 'three';
export interface MlTransformControlsProps {
    target?: THREE.Object3D;
    mode?: 'translate' | 'rotate' | 'scale';
    enabled?: boolean;
    space?: 'world' | 'local';
    size?: number;
    onObjectChange?: (object: THREE.Object3D) => void;
}
declare const MlTransformControls: (props: MlTransformControlsProps) => null;
export default MlTransformControls;
//# sourceMappingURL=MlTransformControls.d.ts.map
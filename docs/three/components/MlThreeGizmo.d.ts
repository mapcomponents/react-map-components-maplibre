import * as THREE from 'three';
export interface MlThreeGizmoProps {
    target?: THREE.Object3D;
    mode?: 'translate' | 'rotate' | 'scale';
    enabled?: boolean;
    space?: 'world' | 'local';
    size?: number;
    onObjectChange?: (object: THREE.Object3D) => void;
}
declare const MlThreeGizmo: (props: MlThreeGizmoProps) => null;
export default MlThreeGizmo;
//# sourceMappingURL=MlThreeGizmo.d.ts.map
/// <reference types="react" />
export interface MlScaleReferenceProps {
    mapId?: string;
    insertBeforeLayer?: string | undefined;
    maxWidth?: number;
    unit?: string;
}
declare const MlScaleReference: (props: MlScaleReferenceProps) => JSX.Element;
export default MlScaleReference;

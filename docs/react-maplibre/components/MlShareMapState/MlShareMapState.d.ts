export interface MapState {
    lat?: number;
    lng?: number;
    zoom?: number;
    bearing?: number;
    pitch?: number;
    layers?: {
        visible: boolean;
        id: string;
    }[];
}
/**
 * TODO: Add short & useful description
 *
 * @param {object} props
 * @param {string} props.mapId Id of the target MapLibre instance in mapContext
 *
 * @component
 */
export interface MlShareMapStateProps {
    mapId?: string;
    idPrefix?: string;
    active?: boolean;
}
export interface LayerStatesInterface {
    [key: string]: boolean;
}
declare const MlShareMapState: (props: MlShareMapStateProps) => import("react/jsx-runtime").JSX.Element;
export default MlShareMapState;
//# sourceMappingURL=MlShareMapState.d.ts.map
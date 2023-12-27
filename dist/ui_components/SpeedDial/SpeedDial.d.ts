/// <reference types="react" />
export interface SpeedDialProps {
    /**
     * Id of the target MapLibre instance in mapContext
     */
    mapId?: string;
}
declare const SpeedDial: {
    (): JSX.Element;
    defaultProps: {
        mapId: undefined;
    };
};
export default SpeedDial;

/// <reference types="react" />
import { createExportOptions } from 'src/hooks/useExportMap/lib';
export interface MlCreatePngButtonProps {
    /**
     * Id of the target MapLibre instance in mapContext
     */
    mapId?: string;
    /**
     * Option overrides for the createExport function
     */
    exportOptions?: createExportOptions;
}
/**
 * Renders a button that will create a Png file of the current map view (dimensions adjusted to fit DIN A4 paper).
 */
declare const MlCreatePngButton: {
    (props: MlCreatePngButtonProps): JSX.Element;
    defaultProps: {
        mapId: undefined;
    };
};
export default MlCreatePngButton;

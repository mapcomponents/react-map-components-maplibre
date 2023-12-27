/// <reference types="react" />
import { createExportOptions } from 'src/hooks/useExportMap/lib';
export interface MlCreatePdfButtonProps {
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
 * Renders a button that will create a PDF version of the current map view (dimensions adjusted to fit Din A4 Paper).
 */
declare const MlCreatePdfButton: {
    (props: MlCreatePdfButtonProps): JSX.Element;
    defaultProps: {
        mapId: undefined;
    };
};
export default MlCreatePdfButton;

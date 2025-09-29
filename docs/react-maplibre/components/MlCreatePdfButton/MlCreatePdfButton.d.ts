import { createExportOptions } from '../../hooks/useExportMap/lib';
export interface MlCreatePdfButtonProps {
    /**
     * ID of the target MapLibre instance in mapContext
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
declare const MlCreatePdfButton: (props: MlCreatePdfButtonProps) => import("react/jsx-runtime").JSX.Element;
export default MlCreatePdfButton;
//# sourceMappingURL=MlCreatePdfButton.d.ts.map
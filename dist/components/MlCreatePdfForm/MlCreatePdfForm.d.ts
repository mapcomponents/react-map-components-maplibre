/// <reference types="react" />
import { createPdfResolverParams } from '../../hooks/useExportMap/lib';
import { SxProps } from '@mui/material';
interface MlCreatePdfFormProps {
    /**
     * Id of the target MapLibre instance in mapContext
     */
    mapId?: string;
    /**
     * sx props that will be applied to the form control components
     */
    formControlStyles?: SxProps;
    /**
     * Function that will be called before the PDF is created.
     * Allowing to access and manipulate the jspdf instance before the PDF is created.
     */
    onCreatePdf?: (options: createPdfResolverParams) => createPdfResolverParams;
}
export type { MlCreatePdfFormProps };
/**
 * Create PDF Form Component
 *
 */
declare const MlCreatePdfForm: {
    (props: MlCreatePdfFormProps): JSX.Element;
    defaultProps: {
        mapId: undefined;
    };
};
export default MlCreatePdfForm;

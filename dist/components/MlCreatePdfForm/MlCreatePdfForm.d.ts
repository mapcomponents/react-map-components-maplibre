import { createPdfResolverParams } from '../../hooks/exportMap/lib';
import { SxProps } from '@mui/material';
interface MlCreatePdfFormProps {
    /**
     * Id of the target MapLibre instance in mapContext
     */
    mapId?: string;
    formControlStyles?: SxProps;
    onCreatePdf?: (options: createPdfResolverParams) => createPdfResolverParams;
    excludeLayerIds?: Array<string>;
    includeLayerIds?: Array<string>;
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

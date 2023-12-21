/// <reference types="react" />
import { SxProps } from '@mui/material';
import { LayerConfig } from '../../contexts/LayerContext';
export interface AddLayerButtonProps {
    sx?: SxProps;
    /**
     * An string array, to filter the supported file types that would be shown to the user
     * Default is: ['geojson', 'wms', 'csv', 'topojson', 'osm', 'gpx', 'kml', 'tcx']
     */
    layerTypes?: string[];
    onComplete?: (config: LayerConfig) => void;
}
declare const AddLayerButton: {
    (props: AddLayerButtonProps): JSX.Element;
    defaultProps: {};
};
export default AddLayerButton;

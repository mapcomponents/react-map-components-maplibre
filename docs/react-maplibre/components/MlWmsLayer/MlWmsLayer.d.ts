import { RasterLayerSpecification, RasterSourceSpecification } from 'maplibre-gl';
export interface MlWmsLayerProps {
    urlParameters?: {
        [key: string]: string;
    };
    url: string;
    visible?: boolean;
    attribution?: string;
    mapId?: string;
    sourceOptions?: RasterSourceSpecification;
    layerOptions?: RasterLayerSpecification;
    insertBeforeLayer?: string;
    layerId?: string;
}
/**
 * Adds a WMS raster source & layer to the maplibre-gl instance
 *
 * @param {object} props
 * @param {object} props.urlParameters URL query parameters that will be added to the WMS URL. A layers property (string) is mandatory. Any value defined on this attribute will extend the default object
 * @param {string} props.url WMS URL
 * @param {bool}	 props.visible Sets layer "visibility" property to "visible" if true or "none" if false
 * @param {string} props.attribution MapLibre attribution shown in the bottom right of the map, if this layer is visible
 * @param {string} props.mapId Id of the target MapLibre instance in mapContext
 * @param {object} props.sourceOptions Object that is passed to the MapLibre.addSource call as config option parameter
 * @param {object} props.layerOptions Object that is passed to the MapLibre.addLayer call as config option parameter
 * @param {string} props.insertBeforeLayer Id of an existing layer in the mapLibre instance to help specify the layer order
                                                                                     This layer will be visually beneath the layer with the "insertBeforeLayer" id
 *
 * @component
 */
declare const MlWmsLayer: (props: MlWmsLayerProps) => import("react/jsx-runtime").JSX.Element;
export default MlWmsLayer;
//# sourceMappingURL=MlWmsLayer.d.ts.map
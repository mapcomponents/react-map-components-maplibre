import { SymbolLayerSpecification } from 'maplibre-gl';
import { Feature, FeatureCollection } from 'geojson';
export interface MlImageMarkerLayerProps {
    /**
     * Id of the target MapLibre instance in mapContext
     */
    mapId?: string;
    /**
     * The layerId of an existing layer this layer should be rendered visually beneath
     * https://maplibre.org/maplibre-gl-js-docs/api/map/#map#addlayer - see "beforeId" property
     */
    insertBeforeLayer?: string;
    /**
     * Id of the layer that will be added by this component to the maplibre-gl instance
     */
    layerId?: string;
    /**
     * Id of the image that will be added by this component to the maplibre-gl instance
     */
    imageId?: string;
    /**
     * Path or URL to a supported raster image
     */
    imgSrc?: string;
    /**
     * Javascript object that is passed the addLayer command as first parameter.
     */
    options?: {
        source?: {
            type?: string | undefined;
            data: Feature | FeatureCollection | undefined;
        };
        layout?: SymbolLayerSpecification['layout'];
        paint?: SymbolLayerSpecification['paint'];
    };
}
declare const MlImageMarkerLayer: (props: MlImageMarkerLayerProps) => import("react/jsx-runtime").JSX.Element;
export default MlImageMarkerLayer;
//# sourceMappingURL=MlImageMarkerLayer.d.ts.map
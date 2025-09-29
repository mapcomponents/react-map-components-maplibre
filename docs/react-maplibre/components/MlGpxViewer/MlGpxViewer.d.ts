import { FeatureCollection } from 'geojson';
import { MetadataType } from '../../hooks/useGpx/useGpx';
export interface MlGpxViewerProps {
    /**
     * Id of the target MapLibre instance in mapHook
     */
    mapId?: string;
    /**
     * The layerId of an existing layer this layer should be rendered visually beneath
     * https://maplibre.org/maplibre-gl-js-docs/api/map/#map#addlayer - see "beforeId" property
     */
    insertBeforeLayer?: string;
    /**
     * Prefix of the component id this component uses when adding elements to the MapLibreGl-instance
     */
    idPrefix?: string;
    gpxData: string | undefined;
    onParseGpxData: (arg0: {
        geojson: FeatureCollection | undefined;
        metadata: MetadataType[];
    }) => void;
}
/**
 * MlGpxViewer visualizes a given GPX Track on the map
 */
declare const MlGpxViewer: (props: MlGpxViewerProps) => import("react/jsx-runtime").JSX.Element;
export default MlGpxViewer;
//# sourceMappingURL=MlGpxViewer.d.ts.map
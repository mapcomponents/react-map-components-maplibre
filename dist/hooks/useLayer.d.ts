import { useMapType } from './useMap';
import { SourceSpecification, LayerSpecification, MapMouseEvent, GeoJSONFeature, Style, MapEventType, Map, VideoSourceSpecification, ImageSourceSpecification } from 'maplibre-gl';
import MapLibreGlWrapper from '../components/MapLibreMap/lib/MapLibreGlWrapper';
import { GeoJSONObject } from '@turf/turf';
type getLayerType = Style['getLayer'];
type useLayerType = {
    map: MapLibreGlWrapper | undefined;
    layer: ReturnType<getLayerType> | undefined;
    layerId: string;
    componentId: string;
    mapHook: useMapType;
};
export type MapEventHandler = (ev: MapMouseEvent & {
    features?: GeoJSONFeature[] | undefined;
} & Record<string, unknown>) => void;
export interface useLayerProps {
    mapId?: string;
    layerId?: string;
    idPrefix?: string;
    insertBeforeLayer?: string;
    insertBeforeFirstSymbolLayer?: boolean;
    geojson?: GeoJSONObject;
    options: Partial<LayerSpecification & {
        source?: Partial<Exclude<SourceSpecification, VideoSourceSpecification | ImageSourceSpecification>>;
        id?: string;
    }>;
    onHover?: (ev: MapEventType & unknown) => Map | void;
    onClick?: (ev: MapEventType & unknown) => Map | void;
    onLeave?: (ev: MapEventType & unknown) => Map | void;
}
declare function useLayer(props: useLayerProps): useLayerType;
declare namespace useLayer {
    var defaultProps: {};
}
export default useLayer;

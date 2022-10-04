import { useMapType } from './useMap';
import { SourceSpecification, LayerSpecification } from 'maplibre-gl';
import MapLibreGlWrapper from '../components/MapLibreMap/lib/MapLibreGlWrapper';
import { MapLayerMouseEvent } from 'maplibre-gl';
import { GeoJSONObject } from '@turf/turf';
declare type useLayerType = {
    map: MapLibreGlWrapper | undefined;
    layer: LayerSpecification;
    layerId: string;
    componentId: string;
    mapHook: useMapType;
};
interface useLayerProps {
    mapId?: string;
    layerId?: string;
    idPrefix?: string;
    insertBeforeLayer?: string;
    insertBeforeFirstSymbolLayer?: boolean;
    geojson?: GeoJSONObject;
    source?: SourceSpecification | string;
    options: Partial<LayerSpecification>;
    onHover?: MapLayerMouseEvent;
    onClick?: MapLayerMouseEvent;
    onLeave?: MapLayerMouseEvent;
}
declare function useLayer(props: useLayerProps): useLayerType;
export default useLayer;

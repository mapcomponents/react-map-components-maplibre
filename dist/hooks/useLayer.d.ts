import { useMapType } from "./useMap";
import { LayerSpecification } from "maplibre-gl";
import MapLibreGlWrapper from "../components/MapLibreMap/lib/MapLibreGlWrapper";
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
    geojson?: object;
    options: LayerSpecification;
    onHover?: Function;
    onClick?: Function;
    onLeave?: Function;
}
declare function useLayer(props: useLayerProps): useLayerType;
export default useLayer;

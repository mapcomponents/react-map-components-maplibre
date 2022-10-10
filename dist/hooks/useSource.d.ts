import { useMapType } from "./useMap";
import MapLibreGlWrapper from "../components/MapLibreMap/lib/MapLibreGlWrapper";
import { SourceSpecification } from "maplibre-gl";
declare type useSourceType = {
    map: MapLibreGlWrapper | undefined;
    source: SourceSpecification;
    componentId: string;
    mapHook: useMapType;
};
interface useSourceProps {
    mapId?: string;
    idPrefix?: string;
    source: SourceSpecification;
    sourceId: string;
}
declare function useSource(props: useSourceProps): useSourceType;
export default useSource;

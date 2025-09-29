import { useMapType } from './useMap';
import { default as MapLibreGlWrapper } from '../components/MapLibreMap/lib/MapLibreGlWrapper';
import { Source, SourceSpecification } from 'maplibre-gl';
type useSourceType = {
    map: MapLibreGlWrapper | undefined;
    source: Source | undefined;
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
//# sourceMappingURL=useSource.d.ts.map
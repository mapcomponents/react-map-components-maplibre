import { default as MapLibreGlWrapper, LayerState } from '../components/MapLibreMap/lib/MapLibreGlWrapper';
type useMapType = {
    map: MapLibreGlWrapper | undefined;
    mapIsReady: boolean;
    componentId: string;
    layers: (LayerState | undefined)[];
    cleanup: () => void;
};
declare function useMap(props?: {
    mapId?: string;
    waitForLayer?: string;
}): useMapType;
export default useMap;
export type { useMapType };
//# sourceMappingURL=useMap.d.ts.map
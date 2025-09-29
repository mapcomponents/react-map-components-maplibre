import { FitBoundsOptions } from 'maplibre-gl';
export interface useFitLayerBoundsPros {
    layerId: string;
    type: 'geojson' | 'wms' | 'vt';
    fitBoundsOptions?: FitBoundsOptions;
}
declare function useFitLayerBounds(props: useFitLayerBoundsPros): void;
export default useFitLayerBounds;
//# sourceMappingURL=useFitLayerBounds.d.ts.map
import { FeatureCollection } from 'geojson';
export interface useTemporalControllerProps {
    geojson: FeatureCollection;
    timeField: string;
    initialVal?: number;
    minVal?: number;
    maxVal?: number;
    mapId: string | undefined;
}
export default function useFilterData(props: useTemporalControllerProps): {
    filteredData: FeatureCollection<import('geojson').Geometry, import('geojson').GeoJsonProperties> | undefined;
    minVal: any;
    maxVal: any;
};
//# sourceMappingURL=useFilterData.d.ts.map
import { FeatureCollection } from '@turf/turf';
export interface useTemporalControllerProps {
    geojson: FeatureCollection;
    timeField: string;
    initialVal?: number;
    minVal?: number;
    maxVal?: number;
    mapId: string | undefined;
}
export default function useFilterData(props: useTemporalControllerProps): {
    filteredData: FeatureCollection<import("@turf/turf").Geometry | import("@turf/turf").GeometryCollection, import("@turf/turf").Properties> | undefined;
    minVal: any;
    maxVal: any;
};

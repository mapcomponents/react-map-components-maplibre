import { FeatureCollection } from '@turf/turf';
interface useGpxProps {
    /**
     * a string containing GPX data that is supposed to be parsed and converted to GeoJSON by this hook
     */
    data?: string;
}
export interface MetadataType {
    title: string;
    value: string;
    id: number;
}
/**
 * useGpx hook converts GPX data to GeoJSON
 *
 */
declare const useGpx: {
    (props: useGpxProps): {
        geojson: FeatureCollection<import("@turf/turf").Geometry | import("@turf/turf").GeometryCollection, import("@turf/turf").Properties> | undefined;
        metadata: MetadataType[];
    };
    defaultProps: {
        data: undefined;
    };
};
export default useGpx;

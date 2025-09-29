import { FeatureCollection } from 'geojson';
export interface useGpxProps {
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
        geojson: FeatureCollection<import('geojson').Geometry, import('geojson').GeoJsonProperties> | undefined;
        metadata: MetadataType[];
    };
    defaultProps: {
        data: undefined;
    };
};
export default useGpx;
//# sourceMappingURL=useGpx.d.ts.map
export default drawUtils;
declare namespace drawUtils {
    function getMatchingVertices(vertex: any, featureId: any, allFeatures: any, map: any): {
        featureId: any;
        coord_path: string;
        lng: any;
        lat: any;
    }[];
    function getDrawInstance(map: any): any;
}

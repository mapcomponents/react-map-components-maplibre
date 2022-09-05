export default create_midpoint;
declare function create_midpoint(parent: any, startVertex: any, endVertex: any): {
    type: string;
    properties: {
        meta: string;
        parent: any;
        lng: number;
        lat: number;
        coord_path: any;
    };
    geometry: {
        type: string;
        coordinates: number[];
    };
} | null;

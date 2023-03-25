import React from "react";
import { FeatureCollection } from '@turf/turf';
type ContextProps = {
    data: FeatureCollection;
    setData: Function;
    getEmptyFeatureCollection: Function;
};
declare const GeoJsonContext: React.Context<Partial<ContextProps>>;
export declare const GeoJsonContextProvider: React.Provider<Partial<ContextProps>>;
export default GeoJsonContext;

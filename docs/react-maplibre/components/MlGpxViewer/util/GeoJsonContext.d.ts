import { default as React } from '../../../../../../node_modules/.pnpm/react@19.1.0/node_modules/react';
import { FeatureCollection } from 'geojson';
type ContextProps = {
    data: FeatureCollection;
    setData: (data: FeatureCollection) => void;
    getEmptyFeatureCollection: () => FeatureCollection;
};
declare const GeoJsonContext: React.Context<Partial<ContextProps>>;
export declare const GeoJsonContextProvider: React.Provider<Partial<ContextProps>>;
export default GeoJsonContext;
//# sourceMappingURL=GeoJsonContext.d.ts.map
import { default as React, ReactNode } from '../../../../node_modules/.pnpm/react@19.1.0/node_modules/react';
import { default as MapLibreGlWrapper } from '../components/MapLibreMap/lib/MapLibreGlWrapper';
export interface MapContextType {
    mapIds: string[];
    mapExists: (map_id: string | undefined) => boolean;
    maps: {
        [key: string]: MapLibreGlWrapper;
    };
    map: MapLibreGlWrapper | undefined;
    getMap: (map_id: string | undefined) => MapLibreGlWrapper;
    setMap: (map: MapLibreGlWrapper) => void;
    removeMap: (map_id: string | undefined) => void;
    registerMap: (map_id: string | undefined, map: MapLibreGlWrapper) => void;
}
declare const MapContext: React.Context<MapContextType>;
/**
 * MapComponentsProvider must be imported and wrapped around component where at least one of its child nodes requires access to a MapLibre-gl or openlayers instance that is registered in this mapContext.
MapComponentsProvider must be used one level higher than the first use of MapContext.
 *
 * MapComponentsProvider requires at least one use of the MapLibreMap component somewhere down the component tree that will create the MapLibre-gl object and set the reference at MapContext.map. For MapLibre maps it is a good idea to provide a mapId attribute to the MapLibreMap Component even if you are only using a single map instance at start. It will make a later transition to using multiple instances within the same project much easier.
 */
declare const MapComponentsProvider: ({ children }: {
    children: ReactNode;
}) => import("react/jsx-runtime").JSX.Element;
export { MapComponentsProvider };
export default MapContext;
//# sourceMappingURL=MapContext.d.ts.map
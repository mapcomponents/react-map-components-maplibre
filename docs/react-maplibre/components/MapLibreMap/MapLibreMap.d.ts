import { FC } from '../../../../../node_modules/.pnpm/react@19.1.0/node_modules/react';
import { MapOptions as MapOptionsType } from 'maplibre-gl';
export type MapLibreMapProps = {
    /**
     * Id of the MapLibreGl(Wrapper) instance in mapContext
     */
    mapId?: string;
    /**
     * Config object that is passed to the MapLibreGl constructor as first parameter.
     * See https://maplibre.org/maplibre-gl-js-docs/api/map/ for a formal documentation of al
     * available properties.
     */
    options?: Partial<MapOptionsType>;
    /**
     * css style definition passed to the map container DOM element
     */
    style?: object;
};
type MapLibreMapComponent = FC<MapLibreMapProps> & {
    defaultProps: MapLibreMapProps;
};
/**
 * Creates a MapLibreGlWrapper instance and registers it in MapContext
 * after the MapLibre-gl load event has fired.
 *
 * MapLibreMap returns the html node that will be used by MapLibre-gl to render the map.
 * This Component must be kept unaware of any related components that interact with the MapLibre-gl
 * instance.
 *
 * @category Map components
 */
declare const MapLibreMap: MapLibreMapComponent;
export default MapLibreMap;
//# sourceMappingURL=MapLibreMap.d.ts.map
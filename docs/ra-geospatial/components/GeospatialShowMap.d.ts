import { default as React } from 'react';
import { InputProps } from 'react-admin';
import { MapLibreMap } from '@mapcomponents/react-maplibre';
export interface GeospatialShowMapProps extends InputProps<any> {
    MapLibreMapProps?: React.ComponentProps<typeof MapLibreMap>;
    embeddedMap?: boolean;
    mapId?: string;
}
declare function GeospatialShowMap(props: GeospatialShowMapProps): import("react/jsx-runtime").JSX.Element;
export default GeospatialShowMap;
//# sourceMappingURL=GeospatialShowMap.d.ts.map
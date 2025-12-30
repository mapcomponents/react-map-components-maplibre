import { default as React } from 'react';
import { LngLatLike } from 'maplibre-gl';
export interface ThreeProviderProps {
    mapId?: string;
    id: string;
    refCenter?: LngLatLike;
    envTexture?: string;
    envIntensity?: number;
    createLight?: boolean;
    children?: React.ReactNode;
    /**
     * Id of an existing layer in the MapLibre instance to help specify the layer order.
     * The Three.js layer will be rendered visually beneath the layer with the specified id.
     */
    beforeId?: string;
}
export declare const ThreeProvider: React.FC<ThreeProviderProps>;
//# sourceMappingURL=ThreeProvider.d.ts.map
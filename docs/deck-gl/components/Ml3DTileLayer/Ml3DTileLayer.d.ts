import { Tile3DLayerProps } from '@deck.gl/geo-layers';
export interface Ml3DTileLayerProps extends Tile3DLayerProps {
    /**
     * Id of the target MapLibre instance in mapContext
     */
    mapId?: string;
    /**
     * Id of an existing layer in the mapLibre instance to help specify the layer order
     * This layer will be visually beneath the layer with the "beforeId" id.
     */
    beforeId?: string;
}
declare const Ml3DTileLayer: (props: Ml3DTileLayerProps) => import("react/jsx-runtime").JSX.Element;
export default Ml3DTileLayer;
//# sourceMappingURL=Ml3DTileLayer.d.ts.map
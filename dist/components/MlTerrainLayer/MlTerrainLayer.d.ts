/// <reference types="react" />
import { TerrainSpecification } from 'maplibre-gl';
interface MlTerrainLayerProps {
    /**
     * Id of the target MapLibre instance in mapContext
     */
    mapId?: string;
    /**
     * Source of tiles with possibles options
     */
    sourceOptions?: object;
    /**
     * Options for new exaggeration value
     */
    terrainOptions?: TerrainSpecification;
}
export type { MlTerrainLayerProps };
/**
 * Create Terrain Layer Component
 *
 */
declare const MlTerrainLayer: {
    (props: MlTerrainLayerProps): JSX.Element;
    defaultProps: {
        mapId: undefined;
    };
};
export default MlTerrainLayer;

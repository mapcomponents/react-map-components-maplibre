import { Feature, FeatureCollection } from 'geojson';
import { LayerSpecification } from 'maplibre-gl';
declare const getDefaultLayerTypeByGeometry: (geojson: Feature | FeatureCollection | undefined) => LayerSpecification["type"];
export default getDefaultLayerTypeByGeometry;
//# sourceMappingURL=getDefaultLayerTypeByGeometry.d.ts.map
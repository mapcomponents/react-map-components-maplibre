import { Feature, FeatureCollection } from 'geojson';
import { LayerSpecification } from 'maplibre-gl';

const mapGeometryTypesToLayerTypes: Record<string, LayerSpecification['type']> = {
	Position: 'circle',
	Point: 'circle',
	MultiPoint: 'circle',
	LineString: 'line',
	MultiLineString: 'line',
	Polygon: 'fill',
	MultiPolygon: 'fill',
	GeometryCollection: 'circle',
};

const getDefaultLayerTypeByGeometry = (
	geojson: Feature | FeatureCollection | undefined
): LayerSpecification['type'] => {
	if (geojson?.type === 'Feature') {
		return mapGeometryTypesToLayerTypes?.[geojson?.geometry?.type]
			? mapGeometryTypesToLayerTypes[geojson.geometry.type]
			: 'circle';
	}
	if (geojson?.type === 'FeatureCollection') {
		if (geojson.features.length) {
			return getDefaultLayerTypeByGeometry(geojson.features[0]);
		}
		return 'circle';
	}
	return 'fill';
};
export default getDefaultLayerTypeByGeometry;

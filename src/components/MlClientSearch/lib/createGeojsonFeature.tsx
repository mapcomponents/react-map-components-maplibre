type FeatureType = 'Point' | 'MultiPoint' | 'LineString' | 'MultiLineString' | 'Polygon';
// Exclude 'GeometryCollection' from the GeoJSON geometry types
type ExcludedGeometryCollection =
	| GeoJSON.Point
	| GeoJSON.MultiPoint
	| GeoJSON.LineString
	| GeoJSON.MultiLineString
	| GeoJSON.Polygon;

// Determine the GeoJSON-Feature-Type
function determineFeatureType(coordinates: ExcludedGeometryCollection['coordinates']): FeatureType {
	if (Array.isArray(coordinates)) {
		if (
			coordinates.length === 2 &&
			typeof coordinates[0] === 'number' &&
			typeof coordinates[1] === 'number'
		) {
			return 'Point';
		} else if (Array.isArray(coordinates[0])) {
			if (
				coordinates.every(
					(coord) =>
						Array.isArray(coord) &&
						coord.length === 2 &&
						typeof coord[0] === 'number' &&
						typeof coord[1] === 'number'
				)
			) {
				return 'LineString';
			} else if (coordinates.every((coord) => Array.isArray(coord) && Array.isArray(coord[0]))) {
				// an array of arrays can be a multi-linestring or polygon,
				// if the first and last coordinate is the same, it is a polygon
				if (
					coordinates[0][0][0] === coordinates[0][coordinates[0].length - 1][0] &&
					coordinates[0][0][1] === coordinates[0][coordinates[0].length - 1][1]
				) {
					return 'Polygon';
				} else {
					return 'MultiLineString';
				}
			}
		}
	}
	throw new Error('Invalid coordinate structure for a GeoJSON feature type determination.');
}

// Create GeoJSON-Features
export function createGeoJSONFeature(
	coordinates: ExcludedGeometryCollection['coordinates']
): GeoJSON.Feature<ExcludedGeometryCollection> {
	const featureType: FeatureType = determineFeatureType(coordinates);
	return {
		type: 'Feature',
		geometry: {
			type: featureType,
			coordinates: coordinates as ExcludedGeometryCollection['coordinates'],
		} as ExcludedGeometryCollection,
		properties: {},
	};
}

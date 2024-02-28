type Coordinates = number[] | number[][] | number[][][];
type FeatureType = 'Point' | 'LineString' | 'MultiLineString' | 'Polygon' | 'Unknown';

interface GeoJSONFeature {
	type: 'Feature';
	geometry: {
		type: FeatureType;
		coordinates: Coordinates;
	};
}

// Determine the GeoJSON-Feature-Type
function determineFeatureType(coordinates: number[] | number[][] | number[][][]): FeatureType {
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
export function createGeoJSONFeature(coordinates: Coordinates): GeoJSONFeature {
	const featureType = determineFeatureType(coordinates);
	return {
		type: 'Feature',
		geometry: {
			type: featureType,
			coordinates,
		},
	};
}

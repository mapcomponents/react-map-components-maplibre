import { LngLatLike, RequestParameters, ResponseCallback } from 'maplibre-gl';
import { Feature, FeatureCollection, Geometry, GeometryCollection, Properties } from '@turf/turf';
import { feature as topojsonFeature } from 'topojson-client';
import protocolPathParser from './utils/protocolPathParser';
import getProtocolData from './utils/getProtocolData';

type TopoJson = {
	type?: 'Topology';
	objects?: { key: string; features?: Feature | FeatureCollection };
	arcs?: LngLatLike[];
	transform?: { scale: [number, number]; translate: LngLatLike };
};

function reduceFeatures(geojson: FeatureCollection) {
	const newFeatures: any = [];
	geojson.features.forEach((e: any) => {
		if (!e.features) {
			newFeatures.push({
				type: e.type,
				geometry: e.geometry,
				properties: e.properties,
			});
		} else {
			e.features.forEach((el: Feature<Geometry | GeometryCollection, Properties>) => {
				newFeatures.push({ type: el.type, geometry: el.geometry, properties: el.properties });
			});
		}
	});
	return newFeatures as Feature<Geometry | GeometryCollection, Properties>[];
}

async function convertTopojson(params: { filename: string }): Promise<FeatureCollection> {
	/**
	 * Loads TopoJSON data and converts it into a GeoJSON FeatureCollection
	 */
	const geojson = await new Promise<FeatureCollection>((resolve) => {
		let topoJsonData: TopoJson = {};

		getProtocolData(params.filename).then((rawData) => {
			try {
				topoJsonData = JSON.parse(rawData);
			} catch (e) {
				throw 'Invalid TopoJson';
			}
			// Convert the data
			let result: FeatureCollection = {
				type: 'FeatureCollection',
				features: [],
			};

			if (topoJsonData.type === 'Topology' && topoJsonData.objects !== undefined) {
				
				// add the "fromObject" property in each topojson feature
				Object.keys(topoJsonData.objects).map((key) => {
					if (topoJsonData.objects?.[key].type === 'GeometryCollection') {
						topoJsonData.objects?.[key].geometries?.forEach(
							(e: Feature) => (e.properties = { fromObject: key, ...e.properties })
						);
					} else if (
						topoJsonData?.objects?.[key] &&
						topoJsonData?.objects?.[key]?.type !== 'GeometryCollection'
					) {
						topoJsonData.objects[key].properties = {
							fromObject: key,
							...topoJsonData.objects?.[key].properties,
						};
					}
				});

				//convert the data into a geoJson object
				result = {
					type: 'FeatureCollection',
					features: Object.keys(topoJsonData.objects).map((key) =>
						topojsonFeature(topoJsonData as any, key)
					),
				};
				result.features = reduceFeatures(result);
			}

			resolve(result);
		});
	});

	return geojson;
}

const TopojsonProtocolHandler = (params: RequestParameters, callback: ResponseCallback<any>) => {
	const parsedParams = protocolPathParser(params.url);

	convertTopojson(parsedParams).then((data) => {
		if (data !== undefined) {
			callback(null, data, null, null);
		} else {
			callback(new Error('Topojson not found'));
		}
	});
	return { cancel: () => {} };
};

export { TopojsonProtocolHandler, convertTopojson };
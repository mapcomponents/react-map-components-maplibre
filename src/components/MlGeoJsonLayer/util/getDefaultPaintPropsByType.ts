import { LayerSpecification, RasterLayerSpecification } from 'maplibre-gl';

const getDefaultPaintPropsByType = (
	type: string,
	defaultPaintOverrides?: { [key: string]: unknown }
): Exclude<LayerSpecification['paint'], RasterLayerSpecification['paint']> => {
	switch (type) {
		case 'fill':
			if (defaultPaintOverrides?.fill) {
				return defaultPaintOverrides.fill;
			}
			return {
				'fill-color': 'rgba(10,240,256,0.6)',
				'fill-outline-color': 'rgba(20,230,256,0.8)',
			};
		case 'line':
			if (defaultPaintOverrides?.line) {
				return defaultPaintOverrides.line;
			}
			return {
				'line-color': 'rgb(203,211,2)',
				'line-width': 5,
				'line-blur': 0,
			};
		case 'circle':
			if (defaultPaintOverrides?.circle) {
				return defaultPaintOverrides.circle;
			}
			return {
				'circle-color': 'rgba(10,240,256,0.8)',
				'circle-stroke-color': '#fff',
				'circle-stroke-width': 2,
				'circle-radius': 4,
			};
		default:
			return {};
	}
};

export default getDefaultPaintPropsByType;

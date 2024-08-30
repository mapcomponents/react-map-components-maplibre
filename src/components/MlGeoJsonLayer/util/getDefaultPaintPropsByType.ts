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
				'fill-color': 'rgba(0, 158, 224,0.6)',
				'fill-outline-color': 'rgba(0, 158, 224,0.8)',
			};
		case 'line':
			if (defaultPaintOverrides?.line) {
				return defaultPaintOverrides.line;
			}
			return {
				'line-color': 'rgb(0, 158, 224)',
				'line-width': 5,
				'line-blur': 0,
			};
		case 'circle':
			if (defaultPaintOverrides?.circle) {
				return defaultPaintOverrides.circle;
			}
			return {
				'circle-color': 'rgb(0, 158, 224)',
				//'circle-stroke-color': 'rgba(255, 255, 255, 0.5)',
				//'circle-stroke-width': 2,
				'circle-radius': 6,
			};
		default:
			return {};
	}
};

export default getDefaultPaintPropsByType;

import React, { useEffect } from 'react';
import useAddImage from './useAddImage';
import useMap from '../useMap';
import mapContextDecorator from '../../decorators/LowZoomDecorator';
import MlGeoJsonLayer, {
	MlGeoJsonLayerProps,
} from '../../components/MlGeoJsonLayer/MlGeoJsonLayer';
import { DataDrivenPropertyValueSpecification } from 'maplibre-gl';
import wg_locations from '../../components//MlGeoJsonLayer/assets/wg_locations.json';
import wg_marker from '../../../public/assets/marker.png';

const storyoptions = {
	title: 'hooks/useAddImage',
	component: useAddImage,
	argTypes: {},
	decorators: mapContextDecorator,
};
export default storyoptions;

const Template = (props: MlGeoJsonLayerProps) => {
	const mapHook = useMap({ mapId: undefined });

	useAddImage({
		imageId: 'wgLogo',
		imagePath: wg_marker,
	});
	useEffect(() => {
		mapHook.map?.flyTo({ center: [10.251805123900311, 51.11826171422632], zoom: 5 });
	}, [mapHook.map]);

	return (
		<>
			<MlGeoJsonLayer
				layout={{
					'icon-image': 'wgLogo',
					'icon-size': {
						property: 'Mitarbeitende',
						stops: [
							[3, 0.02],
							[26, 0.15],
						],
					} as DataDrivenPropertyValueSpecification<number>,
					'icon-anchor': 'bottom'
				}}
				{...props}
			/>
		</>
	);
};

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {
	geojson: wg_locations,
	type: 'symbol',
};

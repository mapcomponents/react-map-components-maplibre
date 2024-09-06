import React, { useEffect, useRef, useState } from 'react';
import MapContextDecorator from '../../decorators/MapContextDecorator';
import MlOgcApiFeatures, {
	MlOgcApiFeaturesProps,
	OgcApiFeaturesParamsTypes,
} from './MlOgcApiFeatures';
import useMap from '../../hooks/useMap';
import TopToolbar from '../../ui_components/TopToolbar';
import Button from '@mui/material/Button';

const storyoptions = {
	title: 'MapComponents/MlOgcApiFeatures',
	component: MlOgcApiFeatures,
	argTypes: {},
	decorators: MapContextDecorator,
};
export default storyoptions;

const PointTemplate = (props: MlOgcApiFeaturesProps) => {
	const [showLayer, setShowLayer] = useState(true);
	const mapHook = useMap({
		mapId: props.mapId,
	});
	const initializedRef = useRef(false);

	useEffect(() => {
		if (!mapHook.map || initializedRef.current) return;
		initializedRef.current = true;
		mapHook.map.map.flyTo({ center: [7.100175528281227, 50.73487992742369], zoom: 8 });
	}, [mapHook.map]);
	const bbox = '6.154193673464448,49.97699076849764,8.024616036745385,51.523418007730754';
	const ogcApiFeatureParams: OgcApiFeaturesParamsTypes = {
		bbox: bbox,
	};

	return (
		<>
			<TopToolbar
				unmovableButtons={
					<Button
						color="primary"
						variant={showLayer ? 'contained' : 'outlined'}
						onClick={() => setShowLayer(!showLayer)}
					>
						OGC API Feature Points
					</Button>
				}
			/>
			<MlOgcApiFeatures
				visible={showLayer}
				ogcApiUrl={props.ogcApiUrl}
				mapId={props.mapId}
				ogcApiFeatureParams={ogcApiFeatureParams}
			></MlOgcApiFeatures>
		</>
	);
};
export const Point = PointTemplate.bind({});
Point.parameters = {};
Point.args = {
	ogcApiUrl: 'https://geo.kreis-viersen.de/ows/osm-daten/wfs3/collections/hoflaeden_nrw/items.json',
	mapId: 'map_1',
};

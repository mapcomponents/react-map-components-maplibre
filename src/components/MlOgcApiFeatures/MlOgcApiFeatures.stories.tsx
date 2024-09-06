import React, { useEffect, useRef, useState } from 'react';
import MapContextDecorator from '../../decorators/MapContextDecorator';
import MlOgcApiFeatures, {
	MlOgcApiFeaturesProps,
	OgcApiFeaturesParamsTypes,
} from './MlOgcApiFeatures';
import useMap from '../../hooks/useMap';
import TopToolbar from '../../ui_components/TopToolbar';
import Button from '@mui/material/Button';
import Sidebar from '../../ui_components/Sidebar';
import { FormControl, TextField } from '@mui/material';

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
		mapHook.map.map.jumpTo({ center: [7.100175528281227, 50.73487992742369], zoom: 8 });
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

const OGCLoaderTemplate = (props: MlOgcApiFeaturesProps) => {
	const [openSidebar, setOpenSidebar] = useState(true);
	const [ogcApiUrl, setOgcApiUrl] = useState(
		'https://geo.kreis-viersen.de/ows/osm-daten/wfs3/collections/hoflaeden_nrw/items.json?limit=100'
	);
	const mapHook = useMap({
		mapId: props.mapId,
	});
	const initializedRef = useRef(false);

	useEffect(() => {
		if (!mapHook.map || initializedRef.current) return;
		initializedRef.current = true;
		mapHook.map.map.jumpTo({ center: [7.6616, 51.4332], zoom: 6 });
	}, [mapHook.map]);

	return (
		<>
			<TopToolbar
				unmovableButtons={
					<Button
						color="primary"
						variant={openSidebar ? 'contained' : 'outlined'}
						onClick={() => setOpenSidebar(!openSidebar)}
					>
						OGC API Feature Loader
					</Button>
				}
			/>
			<Sidebar open={openSidebar} setOpen={setOpenSidebar} name={'OGC API Feature Loader'}>
				<FormControl fullWidth sx={{ marginTop: '10px' }}>
					<TextField
						label="OGC API Features URL"
						variant="standard"
						value={ogcApiUrl}
						onChange={(ev) => setOgcApiUrl(ev.target.value)}
						sx={{ marginBottom: '10px' }}
					/>
				</FormControl>
			</Sidebar>
			{
				//only render if valid url
				(() => {
					try {
						return !!new URL(ogcApiUrl);
					} catch {
						return false;
					}
				})() && (
					<MlOgcApiFeatures ogcApiUrl={new URL(ogcApiUrl)} mapId={props.mapId}></MlOgcApiFeatures>
				)
			}
		</>
	);
};
export const OgcApiLoader = OGCLoaderTemplate.bind({});
OgcApiLoader.parameters = {};
OgcApiLoader.args = {
	mapId: 'map_1',
};

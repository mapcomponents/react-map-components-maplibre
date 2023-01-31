import React, { useMemo } from 'react';
import { MapComponentsProvider } from '../index';
import MapLibreMap from '../components/MapLibreMap/MapLibreMap';
import './style.css';
import MlNavgiationTools from '../components/MlNavigationTools/MlNavigationTools';
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles';
import getTheme from '../ui_components/MapcomponentsTheme';

const decorators = [
	(Story, context) => {
		const theme = useMemo(() => getTheme(context?.globals?.theme), [context?.globals?.theme]);

		return (
			<div className="fullscreen_map">
				<MUIThemeProvider theme={theme}>
					<MapComponentsProvider>
						<div
							style={{
								overflow: 'hidden',
								position: 'absolute',
								top: '0',
								bottom: '0',
								left: '0',
								right: '0',
							}}
						>
							<Story />
							<div className="maps">
								<MapLibreMap
									mapId="map_1"
									options={{
										//style: "mapbox://styles/mapbox/light-v10",
										//center: [-87.62712, 41.89033],
										zoom: 14.5,
										//pitch: 45,
										//style: "https://wms.wheregroup.com/tileserver/style/osm-bright.json",
										style: 'https://wms.wheregroup.com/tileserver/style/osm-liberty.json',
										//center: [8.607, 53.1409349],
										//zoom: 13,
										center: [7.0851268, 50.73884],
										//maxBounds: [
										//	[1.40625, 43.452919],
										//	[17.797852, 55.973798],
										//],
									}}
								/>
								<MapLibreMap
									mapId="map_2"
									options={{
										//style: "mapbox://styles/mapbox/light-v10",
										//center: [-87.62712, 41.89033],
										zoom: 14.5,
										//pitch: 45,
										style: 'https://wms.wheregroup.com/tileserver/style/osm-bright.json',
										//style: "https://wms.wheregroup.com/tileserver/style/osm-liberty.json",
										//center: [8.607, 53.1409349],
										//zoom: 13,
										center: [7.0851268, 50.73884],
										//maxBounds: [
										//	[1.40625, 43.452919],
										//	[17.797852, 55.973798],
										//],
									}}
								/>

								<MlNavgiationTools
									sx={{ top: '10px', right: '5px' }}
									showZoomButtons={false}
									mapId="map_1"
								/>
							</div>
						</div>
					</MapComponentsProvider>
				</MUIThemeProvider>
			</div>
		);
	},
];

export default decorators;

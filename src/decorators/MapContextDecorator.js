import React, {  useMemo } from 'react';

import { MapComponentsProvider } from '../index';
import MapLibreMap from '../components/MapLibreMap/MapLibreMap';
import './style.css';
import MlNavgiationTools from '../components/MlNavigationTools/MlNavigationTools';
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles';

const decorators = [
	(Story, context) => {
		const theme = useMemo(
			() =>
				createTheme({
					palette: {
						mode: context?.globals?.theme ? context?.globals?.theme : 'light',
					},
				}),
			[context?.globals?.theme]
		);
		return (
			<div className="fullscreen_map">
				<MUIThemeProvider theme={theme}>
					<MapComponentsProvider>
						<Story />
						<MapLibreMap
							options={{
								zoom: 14.5,
								style: 'https://wms.wheregroup.com/tileserver/style/osm-bright.json',
								center: [7.0851268, 50.73884],
							}}
							mapId="map_1"
						/>
						<MlNavgiationTools
							sx={{ bottom: '25px', right: 0 }}
							showZoomButtons={false}
							mapId="map_1"
						/>
					</MapComponentsProvider>
				</MUIThemeProvider>
			</div>
		);
	},
];

export default decorators;

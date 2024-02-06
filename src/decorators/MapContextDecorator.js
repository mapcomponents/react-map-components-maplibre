import React, { useMemo } from 'react';

import { MapComponentsProvider } from '../index';
import MapLibreMap from '../components/MapLibreMap/MapLibreMap';
import './style.css';
import MlNavgiationTools from '../components/MlNavigationTools/MlNavigationTools';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import getTheme from '../ui_components/MapcomponentsTheme';

const decorators = [
	(Story, context) => {
		const theme = useMemo(() => getTheme(context?.globals?.theme), [context?.globals?.theme]);


		return (<div className="fullscreen_map">
				<MapComponentsProvider>
					<MUIThemeProvider theme={theme}>
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
							showZoomButtons={false}
							mapId="map_1"
						/>
					</MUIThemeProvider>
				</MapComponentsProvider>
			</div>
		);
	},
];

export default decorators;

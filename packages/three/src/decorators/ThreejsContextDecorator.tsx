import React, { useMemo } from 'react';
import { ThreeProvider } from '../contexts/ThreeProvider';
import {
	MapComponentsProvider,
	MapLibreMap,
	MlNavigationTools,
	getTheme,
} from '@mapcomponents/react-maplibre';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import './style.css';

const decorators = [
	(Story: any, context: any) => {
		const theme = useMemo(() => getTheme(context?.globals?.theme), [context?.globals?.theme]);
		return (
			<div className="fullscreen_map">
				<MapComponentsProvider>
					<MUIThemeProvider theme={theme}>
						<ThreeProvider mapId="map_1" id="three-scene-layer" beforeId="water_name_line">
							<Story />
						</ThreeProvider>
						<MapLibreMap
							options={{
								zoom: 14.5,
								style: 'https://wms.wheregroup.com/tileserver/style/osm-liberty.json',
								center: [7.099771581806502, 50.73395746209983],
							}}
							mapId="map_1"
						/>
						<MlNavigationTools
							sx={{ bottom: '25px', right: '5px' }}
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

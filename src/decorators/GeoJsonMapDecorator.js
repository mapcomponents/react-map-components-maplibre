import React, { useMemo } from 'react';

import { MapComponentsProvider } from '../index';
import MapLibreMap from '../components/MapLibreMap/MapLibreMap';
import './style.css';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import getTheme from '../ui_components/MapcomponentsTheme';

const decorators = [
	(Story, context) => {
		const theme = useMemo(() => getTheme(context?.globals?.theme), [context?.globals?.theme]);
const storyZoom = context.name === "Heat Map" || context.name === "Circle" || context.name === "Symbol" ? 3 : 15;
const storyCenter = context.name === "Heat Map" || context.name === "Circle" || context.name === "Symbol" ? [4.542400, 39.44518] : [7.104418060409521, 50.73394661255866];

		return (
			<div className="fullscreen_map">
				<MapComponentsProvider>
					<MUIThemeProvider theme={theme}>
						<Story />
						<MapLibreMap
							options={{
								zoom: storyZoom,
								style: 'https://wms.wheregroup.com/tileserver/style/osm-bright.json',
								center: storyCenter,
							}}
							mapId="map_1"
						/>
					</MUIThemeProvider>
				</MapComponentsProvider>
			</div>
		);
	},
];

export default decorators;
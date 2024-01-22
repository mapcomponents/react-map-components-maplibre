import React, { useMemo } from 'react';
import MlScaleReference from '../components/MlScaleReference/MlScaleReference';
import { MapComponentsProvider } from '../index';
import MapLibreMap from '../components/MapLibreMap/MapLibreMap';
import './style.css';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import getTheme from '../ui_components/MapcomponentsTheme';

const decorators = [
	(Story, context) => {
		const theme = useMemo(() => getTheme(context?.globals?.theme), [context?.globals?.theme]);

		return (
			<div className="fullscreen_map">
				<MapComponentsProvider>
					<MUIThemeProvider theme={theme}>
						<Story />
						<MapLibreMap
							options={{
								zoom: 3,
								style: 'https://wms.wheregroup.com/tileserver/style/osm-bright.json',
								center: [4.5424, 39.44518],
							}}
							mapId="map_1"
						/>
						{(context.name == 'Catalogue Demo' || context.name == 'Example Config') && (
							<MlScaleReference
								horizontalOffset="12px"
								verticalOffset={context.name == 'Catalogue Demo' ? '70px' : '6px'}
							/>
						)}
					</MUIThemeProvider>
				</MapComponentsProvider>
			</div>
		);
	},
];

export default decorators;
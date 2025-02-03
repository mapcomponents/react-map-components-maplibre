import React, { useMemo, ReactElement, FC } from 'react';

import { MapComponentsProvider } from '../index';
import MapLibreMap, { MapLibreMapProps } from '../components/MapLibreMap/MapLibreMap';
import './style.css';
import MlNavigationTools from '../components/MlNavigationTools/MlNavigationTools';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import getTheme from '../ui_components/MapcomponentsTheme';
import MlScaleReference from '../components/MlScaleReference/MlScaleReference';
import { Decorator } from '@storybook/react';
import { Paper } from '@mui/material';

interface StoryContext {
	globals: {
		theme?: 'dark' | 'light';
	};
	name: string;
}

const makeMapContextDecorators = (options: MapLibreMapProps['options']): Decorator[] => {
	return [
		(Story: FC, context?: StoryContext): ReactElement => {
			const theme = useMemo(() => getTheme(context?.globals?.theme), [context?.globals?.theme]);
			console.log(context?.name);
			return (
				<div className="fullscreen_map">
					<MapComponentsProvider>
						<MUIThemeProvider theme={theme}>
							{(context?.name === 'Example Config' || context?.name === 'Catalogue Demo') && (
								<Paper
									sx={{
										position: 'fixed',
										top: '70px',
										right: '20px',
										zIndex: 1300,
									}}
								>
									<MlScaleReference />
								</Paper>
							)}
							<Story />
							<MapLibreMap
								options={{
									zoom: 14.5,
									style: 'https://wms.wheregroup.com/tileserver/style/osm-bright.json',
									center: [7.0851268, 50.73884],
									...(options ? { ...options } : {}),
								}}
								mapId="map_1"
							/>
							<MlNavigationTools showZoomButtons={false} mapId="map_1" />
						</MUIThemeProvider>
					</MapComponentsProvider>
				</div>
			);
		},
	];
};

export default makeMapContextDecorators({});
export { makeMapContextDecorators };

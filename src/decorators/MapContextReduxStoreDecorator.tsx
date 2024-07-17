import React, { useMemo, ReactElement, FC } from 'react';

import { MapComponentsProvider } from '../index';
import MapLibreMap, { MapLibreMapProps } from '../components/MapLibreMap/MapLibreMap';
import './style.css';
import MlNavigationTools from '../components/MlNavigationTools/MlNavigationTools';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import getTheme from '../ui_components/MapcomponentsTheme';
import { Decorator } from '@storybook/react';
import store from '../stores/map.store';
import { Provider as ReduxStoreProvider } from 'react-redux';

interface StoryContext {
	globals: {
		theme?: 'dark' | 'light';
	};
}

const makeMapContextDecorators = (options: MapLibreMapProps['options']): Decorator[] => {
	return [
		(Story: FC, context?: StoryContext): ReactElement => {
			const theme = useMemo(() => getTheme(context?.globals?.theme), [context?.globals?.theme]);

			return (
				<div className="fullscreen_map">
					<MapComponentsProvider>
						<ReduxStoreProvider store={store}>
							<MUIThemeProvider theme={theme}>
								<Story />
								<MapLibreMap
									options={{
										zoom: 12.5,
										style: 'https://wms.wheregroup.com/tileserver/style/osm-bright.json',
										center: [7.0851268, 50.73884],
										...(options ? { ...options } : {}),
									}}
									mapId="map_1"
								/>
								<MlNavigationTools showZoomButtons={false} mapId="map_1" />
							</MUIThemeProvider>
						</ReduxStoreProvider>
					</MapComponentsProvider>
				</div>
			);
		},
	];
};

export default makeMapContextDecorators({});
export { makeMapContextDecorators };

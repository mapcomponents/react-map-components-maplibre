import { useMemo } from 'react';

import {
	getTheme,
	MapComponentsProvider,
	MapLibreMap,
	MlNavigationTools,
} from '@mapcomponents/react-maplibre';
import './style.css';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { DeckGlContextProvider } from '../contexts/DeckGlContext';

const decorators = [
	(Story: any, context: any) => {
		const theme = useMemo(() => getTheme(context?.globals?.theme), [context?.globals?.theme]);

		return (
			<div className="fullscreen_map">
				<MapComponentsProvider>
					<MUIThemeProvider theme={theme}>
						<DeckGlContextProvider mapId={context.mapId}>
							<Story />
						</DeckGlContextProvider>
						<MapLibreMap
							options={
								context?.parameters?.mapOptions
									? {
											style: 'https://wms.wheregroup.com/tileserver/style/osm-bright.json',
											...context.parameters.mapOptions,
										}
									: {
											zoom: 14.5,
											style: 'https://wms.wheregroup.com/tileserver/style/osm-bright.json',
											center: [7.0851268, 50.73884],
										}
							}
							mapId="map_1"
						/>
						<MlNavigationTools showZoomButtons={false} mapId="map_1" />
					</MUIThemeProvider>
				</MapComponentsProvider>
			</div>
		);
	},
];

export default decorators;

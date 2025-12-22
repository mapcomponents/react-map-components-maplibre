import { useMemo } from 'react';

import {
	MapComponentsProvider,
	MapLibreMap,
	MlNavigationTools,
	getTheme,
} from '@mapcomponents/react-maplibre';
import './style.css';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';

const decorators = [
	// eslint-disable-next-line
	(Story: any, context: any) => {
		const theme = useMemo(() => getTheme(context?.globals?.theme), [context?.globals?.theme]);

		return (
			<div className="fullscreen_map">
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

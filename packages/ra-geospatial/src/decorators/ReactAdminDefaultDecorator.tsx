import React from 'react';
import DataContextProvider from '../contexts/DataContext';
import { MapComponentsProvider, MapLibreMap } from '@mapcomponents/react-maplibre';
import { Admin, CustomRoutes, defaultLightTheme } from 'react-admin';
import { dataProvider } from '../contexts/dataProvider';
import { Route } from 'react-router-dom';

export const ReactAdminDefaultDecorator = (Story: React.ComponentType, context: any) => (
	<DataContextProvider>
		<MapComponentsProvider>
			<Admin
				dataProvider={dataProvider}
				layout={context.parameters?.layout}
				theme={defaultLightTheme}
				key={context.parameters?.name}
			>
				<CustomRoutes>
					<Route path={'/'} element={<Story />} />
				</CustomRoutes>
			</Admin>
			{!context.args.embeddedMap && (
				<MapLibreMap
					mapId="map_1"
					options={{
						zoom: 14.5,
						style: 'https://wms.wheregroup.com/tileserver/style/klokantech-basic.json',
						center: [7.080590113226776, 50.740545567043426],
					}}
					style={{
						position: 'absolute',
						top: 0,
						right: 0,
						left: 0,
						bottom: 0,
					}}
				/>
			)}
		</MapComponentsProvider>
	</DataContextProvider>
);

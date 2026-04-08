import { useEffect, useState } from 'react';

import MapContextDecorator from '../../decorators/MapContextDecorator';
import Sidebar from '../Sidebar';

import { Button } from '@mui/material';
import TopToolbar from '../TopToolbar';
import AddLayerButton from './AddLayerButton';
import { LayerConfig as ContextLayerConfig } from '../../contexts/LayerContext';
import {
	LayerConfig,
	setMapConfig,
	setLayerInMapConfig,
	useMapStore,
	updateLayerOrder,
} from '../../stores/map.store';
import LayerTree from '../LayerTree/LayerTree';
import LayerOnMap from '../LayerTree/LayerOnMap';
import { v4 as uuidv4 } from 'uuid';

const MAP_CONFIG_KEY = 'addLayerConfig';

const storyoptions = {
	title: 'UiComponents/AddLayerButton',
	component: AddLayerButton,
	argTypes: {},
	decorators: MapContextDecorator,
};
export default storyoptions;

/** Convert the old LayerContext shape into a Zustand store LayerConfig */
function contextConfigToStoreLayer(config: ContextLayerConfig): LayerConfig {
	const uuid = uuidv4();
	if (config.type === 'wms') {
		return {
			type: 'wms',
			uuid,
			name: config.name ?? 'WMS Layer',
			config: config.config as LayerConfig & { type: 'wms' } extends { config: infer C } ? C : never,
		} as LayerConfig;
	}
	if (config.type === 'vt') {
		return {
			type: 'vt',
			uuid,
			name: config.name ?? 'Vector Tile Layer',
			visible: true,
			config: config.config,
		} as unknown as LayerConfig;
	}
	// geojson (default)
	return {
		type: 'geojson',
		uuid,
		name: config.name ?? 'GeoJSON Layer',
		configurable: true,
		config: config.config,
	} as unknown as LayerConfig;
}

const AddLayerExample: any = () => {
	const [openSidebar, setOpenSidebar] = useState(true);

	useEffect(() => {
		setMapConfig(MAP_CONFIG_KEY, {
			name: 'Add Layer Demo',
			mapProps: { center: [7.0851268, 50.73884], zoom: 12 },
			layers: [],
			layerOrder: [],
		});
	}, []);

	const handleAddLayer = (config: ContextLayerConfig) => {
		const storeState = useMapStore.getState();
		const mapConfig = storeState.mapConfigs[MAP_CONFIG_KEY];
		if (!mapConfig) return;

		const newLayer = contextConfigToStoreLayer(config);
		setLayerInMapConfig(MAP_CONFIG_KEY, newLayer);
		updateLayerOrder(MAP_CONFIG_KEY, [...mapConfig.layerOrder, { uuid: newLayer.uuid }]);
	};

	return (
		<>
			<TopToolbar
				buttons={
					<>
						<Button
							variant={openSidebar ? 'contained' : 'outlined'}
							onClick={() => setOpenSidebar(!openSidebar)}
							sx={{ marginRight: { xs: '0px', sm: '10px' } }}
						>
							Sidebar
						</Button>
					</>
				}
			/>
			<Sidebar open={openSidebar} setOpen={setOpenSidebar} name={'Layers'}>
				<AddLayerButton onComplete={handleAddLayer} />
				<LayerTree mapConfigKey={MAP_CONFIG_KEY} />
			</Sidebar>
			<LayerOnMap mapConfigKey={MAP_CONFIG_KEY} />
		</>
	);
};
export const AddLayerExample_Story = AddLayerExample.bind({});
AddLayerExample_Story.storyName = 'Add Layer Button';
AddLayerExample_Story.parameters = {};
AddLayerExample_Story.args = {};

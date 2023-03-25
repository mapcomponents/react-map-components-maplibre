import React, { useEffect, useState } from 'react';

import LayerList from '../LayerList/LayerList';
import LayerListItem from '../LayerList/LayerListItem';

import mapContextDecorator from '../../decorators/MapContextDecorator';
import Sidebar from '../Sidebar';
import MlGeoJsonLayer from '../../components/MlGeoJsonLayer/MlGeoJsonLayer';
import MlWmsLayer from '../../components/MlWmsLayer/MlWmsLayer';
import LayerListFolder from '../LayerList/LayerListFolder';

import style from './assets/style.json';
import MlVectorTileLayer from '../../components/MlVectorTileLayer/MlVectorTileLayer';
import { LayerSpecification } from 'maplibre-gl';
import { Feature, FeatureCollection } from '@turf/turf';
import { Button } from '@mui/material';
import TopToolbar from '../TopToolbar';
import AddLayerButton from './AddLayerButton';
import LayerListItemFactory from '../LayerList/LayerListItemFactory';
import { LayerConfig } from './AddLayerPopup';

const storyoptions = {
	title: 'UiComponents/AddLayerButton',
	component: AddLayerButton,
	argTypes: {},
	decorators: mapContextDecorator,
};
export default storyoptions;

const FolderTemplate = () => {
	const [openSidebar, setOpenSidebar] = useState(true);
	const [layers, setLayers] = useState<LayerConfig[]>([]);

	return (
		<>
			<TopToolbar
				buttons={
					<Button
						variant={openSidebar ? 'contained' : 'outlined'}
						onClick={() => setOpenSidebar(!openSidebar)}
						sx={{ marginRight: { xs: '0px', sm: '10px' } }}
					>
						Sidebar
					</Button>
				}
			/>
			<Sidebar open={openSidebar} setOpen={setOpenSidebar} name={'Layers'}>
				<AddLayerButton onComplete={(config) => setLayers((current) => [...current, config])} />
				<LayerList>
					<LayerListItemFactory layers={layers} />
				</LayerList>
			</Sidebar>
		</>
	);
};
export const FolderExample = FolderTemplate.bind({});

FolderExample.parameters = {};
FolderExample.args = {};

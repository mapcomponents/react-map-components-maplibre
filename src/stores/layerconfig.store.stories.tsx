import AddLayerButton from '../ui_components/AddLayerButton/AddLayerButton';
import EmptyMapReduxStoreDecorator from '../decorators/EmptyMapReduxStoreDecorator';
import React, { useEffect, useState } from 'react';
import TopToolbar from '../ui_components/TopToolbar';
import { Button } from '@mui/material';
import Sidebar from '../ui_components/Sidebar';
import LayerListItemFactory from '../ui_components/LayerList/LayerListItemFactory';
import LayerList from '../ui_components/LayerList/LayerList';
import SelectStyleButton from '../ui_components/SelectStyleButton/SelectStyleButton';
import { useSelector, useDispatch } from 'react-redux';
import { addLayer, LayerConfig } from './layerconfig.store';

const storyoptions = {
	title: 'ReduxExample/LayerList',
	component: AddLayerButton,
	argTypes: {},
	decorators: EmptyMapReduxStoreDecorator,
};

export default storyoptions;

const FolderTemplate = () => {
	const [openSidebar, setOpenSidebar] = useState(true);

	const layerConfigStore = useSelector((state) => state);
	console.log(layerConfigStore);
	const layers = layerConfigStore.mapConfig.layers;
	const dispatch = useDispatch();

	useEffect(() => {
		const _layersString = localStorage.getItem('layers');
		const _layers: LayerConfig[] = _layersString ? JSON.parse(_layersString) : [];
		_layers.forEach((layer) => dispatch(addLayer('layerKey', layer)));
	}, []);

	useEffect(() => {
		if (layers.length > 0) {
			localStorage.setItem('layers', JSON.stringify(layers));
		}
	}, [layers]);

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
						<Button
							onClick={() => {
								localStorage.clear();
								location.reload();
							}}
						>
							reset
						</Button>
					</>
				}
			/>
			<Sidebar open={openSidebar} setOpen={setOpenSidebar} name={'Layers'}>
				<AddLayerButton onComplete={(config) => dispatch(addLayer('layerKey', config))} />
				<SelectStyleButton sx={{ marginLeft: '5px' }} />
				<LayerList>
					<LayerListItemFactory
						layers={layers}
						setLayers={layers}
						insertBeforeLayer="order-content"
						sortable={false}
					/>
				</LayerList>
			</Sidebar>
		</>
	);
};
export const FolderExample = FolderTemplate.bind({});

FolderExample.parameters = {};
FolderExample.args = {};

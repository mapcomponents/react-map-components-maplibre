import React, { useContext, useEffect, useState } from 'react';

import LayerList from '../LayerList/LayerList';

import mapContextDecorator from '../../decorators/EmptyMapDecorator';
import Sidebar from '../Sidebar';

import { Button } from '@mui/material';
import TopToolbar from '../TopToolbar';
import AddLayerButton from './AddLayerButton';
import LayerListItemFactory from '../LayerList/LayerListItemFactory';
import LayerContext, { LayerConfig } from '../../contexts/LayerContext';
import SelectStyleButton from '../SelectStyleButton/SelectStyleButton';

import style from '../LayerList/assets/style.json';

const storyoptions = {
	title: 'UiComponents/AddLayerButton',
	component: AddLayerButton,
	argTypes: {},
	decorators: mapContextDecorator,
};
export default storyoptions;

const FolderTemplate = () => {
	const [openSidebar, setOpenSidebar] = useState(true);
	const layerContext = useContext(LayerContext);

	useEffect(() => {
		let _layers = localStorage.getItem('layers');
		_layers = _layers ? JSON.parse(_layers) : [];
		layerContext.setLayers(_layers as unknown as LayerConfig[]);
	}, []);

	useEffect(() => {
		if (layerContext.layers.length > 0) {
			localStorage.setItem('layers', JSON.stringify(layerContext.layers));
		}
	}, [layerContext.layers]);

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
				<AddLayerButton
					onComplete={(config) => layerContext.setLayers((current) => [...current, config])}
				/>
				<LayerList>
					<LayerListItemFactory layers={layerContext.layers} setLayers={layerContext.setLayers} />
				</LayerList>
			</Sidebar>
		</>
	);
};
export const FolderExample = FolderTemplate.bind({});

FolderExample.parameters = {};
FolderExample.args = {};

const StyleJsonTemplate = () => {
	const [openSidebar, setOpenSidebar] = useState(true);

	const layerContext = useContext(LayerContext);

	useEffect(() => {
		let _layers = localStorage.getItem('layers');
		_layers = _layers ? JSON.parse(_layers) : [];
		layerContext.setLayers(_layers as unknown as LayerConfig[]);
	}, []);

	useEffect(() => {
		if (layerContext.layers.length > 0) {
			localStorage.setItem('layers', JSON.stringify(layerContext.layers));
		}
	}, [layerContext.layers]);
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
			<Sidebar open={openSidebar} setOpen={setOpenSidebar} name={'LayerList style'}>
				<AddLayerButton
					onComplete={(config) => layerContext.setLayers((current) => [...current, config])}
				/>
					<SelectStyleButton sx={{marginLeft:'5px'}} />
				<LayerList style={style}>
					<LayerListItemFactory layers={layerContext.layers} />
				</LayerList>
			</Sidebar>
		</>
	);
};

export const StyleJsonExample = StyleJsonTemplate.bind({});

StyleJsonExample.parameters = {};
StyleJsonExample.args = {};

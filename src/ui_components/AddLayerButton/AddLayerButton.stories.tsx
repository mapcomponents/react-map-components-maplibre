import React, { useContext, useEffect, useState } from 'react';

import LayerList from '../LayerList/LayerList';

import EmptyMapDecorator from '../../decorators/EmptyMapDecorator';
import Sidebar from '../Sidebar';

import { Button } from '@mui/material';
import TopToolbar from '../TopToolbar';
import AddLayerButton from './AddLayerButton';
import LayerListItemFactory from '../LayerList/LayerListItemFactory';
import LayerContext, { LayerConfig } from '../../contexts/LayerContext';
import SelectStyleButton from '../SelectStyleButton/SelectStyleButton';
import { LayerSpecification, StyleSpecification } from 'maplibre-gl';
import GruvboxStyle from '../../omt_styles/gruvbox';

const storyoptions = {
	title: 'UiComponents/AddLayerButton',
	component: AddLayerButton,
	argTypes: {},
	decorators: EmptyMapDecorator,
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
				<AddLayerButton
					onComplete={(config) => layerContext.setLayers((current) => [...current, config])}
				/>
				<SelectStyleButton sx={{ marginLeft: '5px' }} />
				<LayerList>
					<LayerListItemFactory
						layers={layerContext.layers}
						setLayers={layerContext.setLayers}
						insertBeforeLayer="order-content"
						sortable={true}
					/>
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
			localStorage.setItem(
				'mc_background_style',
				JSON.stringify({
					backgroundLayers: layerContext.backgroundLayers,
					symbolLayers: layerContext.symbolLayers,
				})
			);
		}
	}, [layerContext.backgroundLayers, layerContext.symbolLayers]);

	useEffect(() => {
		const _bgStyle = localStorage.getItem('mc_background_style');
		const _parsedBgStyle: { [key: string]: LayerSpecification[] } = _bgStyle
			? JSON.parse(_bgStyle)
			: { backgroundLayers: [], symbolLayers: [] };

		if (_parsedBgStyle.backgroundLayers.length > 0) {
			layerContext.setBackgroundLayers(
				_parsedBgStyle?.backgroundLayers as unknown as LayerSpecification[]
			);
			layerContext.setSymbolLayers(_parsedBgStyle?.symbolLayers as unknown as LayerSpecification[]);
		} else {
			layerContext.updateStyle(GruvboxStyle as StyleSpecification);
		}
	}, []);

	useEffect(() => {
		if (layerContext.layers.length > 0) {
			console.log(layerContext.layers);
			localStorage.setItem('layers', JSON.stringify(layerContext.layers));
		}
	}, [layerContext.layers]);
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
			<Sidebar open={openSidebar} setOpen={setOpenSidebar} name={'LayerListItemFactory'}>
				<AddLayerButton
					onComplete={(config) => {
						layerContext.setLayers((current) => {
							console.log([config, ...current]);
							return [config, ...current];
						});
					}}
				/>
				<SelectStyleButton sx={{ marginLeft: '5px' }} />
				<LayerList>
					<LayerListItemFactory layers={layerContext.layers} setLayers={layerContext.setLayers} />
				</LayerList>
			</Sidebar>
		</>
	);
};

export const StyleJsonExample = StyleJsonTemplate.bind({});

StyleJsonExample.parameters = {};
StyleJsonExample.args = {};

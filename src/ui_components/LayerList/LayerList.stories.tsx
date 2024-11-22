import React, { useEffect, useState } from 'react';
import { LayerSpecification } from 'maplibre-gl';
import { Feature, FeatureCollection } from 'geojson';
import { Button } from '@mui/material';
import LayerList from './LayerList';
import LayerListItem from './LayerListItem';
import LayerListFolder from './LayerListFolder';
import sample_geojson_1 from './assets/sample_1.json';
import sample_geojson_2 from './assets/sample_2.json';
import sample_geojson_polygon from './assets/sample_polygon_1.json';
import sample_geojson_points from './assets/sample_points_1.json';
import TopToolbar from '../TopToolbar';
import Sidebar from '../Sidebar';
import style from '../../omt_styles/monokai';
import mapContextDecorator from '../../decorators/EmptyMapDecorator';
import MlGeoJsonLayer, {
	MlGeoJsonLayerProps,
} from '../../components/MlGeoJsonLayer/MlGeoJsonLayer';
import MlWmsLayer from '../../components/MlWmsLayer/MlWmsLayer';
import MlVectorTileLayer from '../../components/MlVectorTileLayer/MlVectorTileLayer';

const storyoptions = {
	title: 'UiComponents/LayerList',
	component: LayerList,
	argTypes: {},
	decorators: mapContextDecorator,
};
export default storyoptions;

const FolderTemplate = () => {
	const [openSidebar, setOpenSidebar] = useState(true);

	return (
		<>
			<TopToolbar
				unmovableButtons={
					<Button
						variant={openSidebar ? 'contained' : 'outlined'}
						onClick={() => setOpenSidebar(!openSidebar)}
					>
						Sidebar
					</Button>
				}
			/>
			<Sidebar open={openSidebar} setOpen={setOpenSidebar} name={'Layers'}>
				<LayerList>
					<LayerListFolder visible={true} name={'GeoJSON Layers'}>
						<LayerListItem
							layerComponent={<MlGeoJsonLayer geojson={sample_geojson_1 as Feature} />}
							visible={true}
							configurable={false}
							type="layer"
							name="GeoJSON Layer"
							key="GeoJSONLayer"
						/>
						<LayerListItem
							layerComponent={<MlGeoJsonLayer geojson={sample_geojson_2 as Feature} />}
							visible={true}
							configurable={true}
							type="layer"
							name="GeoJSON Layer 2"
							description="A visualization of a GeoJSON LineString"
							key="GeoJSONLayer2"
						/>
					</LayerListFolder>
				</LayerList>
			</Sidebar>
		</>
	);
};
export const FolderExample = FolderTemplate.bind({});

FolderExample.parameters = {};
FolderExample.args = {};

const VectortileTemplate = () => {
	const [openSidebar, setOpenSidebar] = useState(true);

	const [layerState, setLayerState] = useState({
		layerId: 'openmaptiles',
		sourceOptions: {
			type: 'vector' as const,
			tiles: ['https://wms.wheregroup.com/tileserver/tile/world-0-14/{z}/{x}/{y}.pbf'],
		},
		layers: [...style.layers] as LayerSpecification[],
	});

	useEffect(() => {
		console.log(layerState);
	}, [layerState]);

	return (
		<>
			<TopToolbar
				unmovableButtons={
					<Button
						variant={openSidebar ? 'contained' : 'outlined'}
						onClick={() => setOpenSidebar(!openSidebar)}
					>
						Sidebar
					</Button>
				}
			/>
			<Sidebar open={openSidebar} setOpen={setOpenSidebar} name={'Vector Tile Layer'}>
				<LayerList>
					<LayerListItem
						layerComponent={<MlVectorTileLayer {...layerState} />}
						setLayerState={setLayerState}
						visible={true}
						configurable={false}
						type="layer"
						name="Vector style"
					/>
				</LayerList>
			</Sidebar>
		</>
	);
};

export const VectortileExample = VectortileTemplate.bind({});

VectortileExample.parameters = {};
VectortileExample.args = {};

const WmsLayerTemplate = () => {
	const [openSidebar, setOpenSidebar] = useState(true);

	const [layerState, setLayerState] = useState({
		layerId: 'openmaptiles',
		sourceOptions: {
			type: 'vector' as const,
			tiles: ['https://wms.wheregroup.com/tileserver/tile/world-0-14/{z}/{x}/{y}.pbf'],
		},
		layers: [...style.layers] as LayerSpecification[],
	});

	useEffect(() => {
		console.log(layerState);
	}, [layerState]);

	return (
		<>
			<TopToolbar
				unmovableButtons={
					<Button
						variant={openSidebar ? 'contained' : 'outlined'}
						onClick={() => setOpenSidebar(!openSidebar)}
					>
						Sidebar
					</Button>
				}
			/>
			<Sidebar open={openSidebar} setOpen={setOpenSidebar} name={'Layer List'}>
				<LayerList>
					<LayerListItem
						layerComponent={
							<MlWmsLayer
								url="https://www.wms.nrw.de/geobasis/wms_nw_uraufnahme"
								urlParameters={{
									layers: 'nw_uraufnahme_rw',
								}}
							/>
						}
						setLayerState={setLayerState}
						visible={true}
						configurable={false}
						type="layer"
						name="WMS Layer"
					/>
				</LayerList>
			</Sidebar>
		</>
	);
};
export const WmsLayerExample = WmsLayerTemplate.bind({});

WmsLayerExample.parameters = {};
WmsLayerExample.args = {};

const GeoJsonLayerTemplate = () => {
	const [openSidebar, setOpenSidebar] = useState(true);

	return (
		<>
			<TopToolbar
				unmovableButtons={
					<Button
						variant={openSidebar ? 'contained' : 'outlined'}
						onClick={() => setOpenSidebar(!openSidebar)}
					>
						Sidebar
					</Button>
				}
			/>
			<Sidebar open={openSidebar} setOpen={setOpenSidebar} name={'Layers'}>
				<LayerList>
					<LayerListItem
						layerComponent={<MlGeoJsonLayer geojson={sample_geojson_points as FeatureCollection} />}
						visible={true}
						configurable={true}
						type="layer"
						name="Point GeoJSON Layer"
					/>
					<LayerListItem
						layerComponent={<MlGeoJsonLayer geojson={sample_geojson_1 as Feature} />}
						visible={true}
						configurable={true}
						type="layer"
						name="Line GeoJSON Layer"
					/>
					<LayerListItem
						layerComponent={
							<MlGeoJsonLayer geojson={sample_geojson_polygon as FeatureCollection} />
						}
						visible={true}
						configurable={true}
						type="layer"
						name="Polygon GeoJSON Layer"
					/>
				</LayerList>
			</Sidebar>
		</>
	);
};
export const GeoJsonLayerExample = GeoJsonLayerTemplate.bind({});

GeoJsonLayerExample.parameters = {};
GeoJsonLayerExample.args = {};

const ConfigurableTemplate = () => {
	const [layerOneState, setLayerOneState] = useState({ geojson: sample_geojson_1 as Feature });
	const [layerTwoState, setLayerTwoState] = useState({ geojson: sample_geojson_2 as Feature });
	const [openSidebar, setOpenSidebar] = useState(true);

	useEffect(() => {
		console.log(layerOneState, layerTwoState);
	}, [layerOneState, layerTwoState]);

	return (
		<>
			<TopToolbar
				unmovableButtons={
					<Button
						variant={openSidebar ? 'contained' : 'outlined'}
						onClick={() => setOpenSidebar(!openSidebar)}
					>
						Sidebar
					</Button>
				}
			/>
			<Sidebar open={openSidebar} setOpen={setOpenSidebar} name={'Layers'}>
				<LayerList>
					<LayerListItem
						layerComponent={<MlGeoJsonLayer {...layerOneState} />}
						setLayerState={setLayerOneState}
						visible={true}
						configurable={true}
						type="layer"
						name="GeoJSON Layer"
					/>
					<LayerListItem
						layerComponent={<MlGeoJsonLayer {...layerTwoState} />}
						setLayerState={setLayerTwoState}
						visible={true}
						configurable={true}
						type="layer"
						name="configurable GeoJSON Layer"
						description="A visualization of a GeoJSON LineString"
					/>
				</LayerList>
			</Sidebar>
		</>
	);
};
export const ConfigurableExample = ConfigurableTemplate.bind({});

ConfigurableExample.parameters = {};
ConfigurableExample.args = {};

const LabelTemplate = () => {
	const [layerOneState, setLayerOneState] = useState({
		geojson: sample_geojson_1 as Feature,
		type: 'symbol' as const,
		options: {
			layout: {
				'symbol-placement': 'line',
				'text-field': '{name}',
				'text-justify': 'auto',
				'text-font': ['Open Sans Regular'],
			},
			paint: {
				'text-color': 'white',
			},
		},
	});
	const [openSidebar, setOpenSidebar] = useState(true);

	return (
		<>
			<TopToolbar
				unmovableButtons={
					<Button
						variant={openSidebar ? 'contained' : 'outlined'}
						onClick={() => setOpenSidebar(!openSidebar)}
					>
						Sidebar
					</Button>
				}
			/>
			<Sidebar open={openSidebar} setOpen={setOpenSidebar} name={'Layers'}>
				<LayerList>
					<LayerListItem
						layerComponent={<MlGeoJsonLayer {...(layerOneState as MlGeoJsonLayerProps)} />}
						setLayerState={setLayerOneState}
						visible={true}
						configurable={true}
						type="layer"
						name="GeoJSON Layer"
					/>
				</LayerList>
			</Sidebar>
		</>
	);
};
export const LabelExample = LabelTemplate.bind({});

LabelExample.parameters = {};
LabelExample.args = {};

import { Checkbox, IconButton, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import React, { useMemo, useState } from 'react';
import getDefaulLayerTypeByGeometry from '../../components/MlGeoJsonLayer/util/getDefaultLayerTypeByGeometry';
import LayerPropertyForm from './util/LayerPropertyForm';
import getDefaultPaintPropsByType from '../../components/MlGeoJsonLayer/util/getDefaultPaintPropsByType';
import LayerListFolder from './LayerListFolder';
import { LayerSpecification } from 'maplibre-gl';
import LayerListItemVectorLayer from './util/LayerListItemVectorLayer';
import {useEffect} from 'react';

type Props = {
	layerComponent: JSX.Element;
	visible: boolean;
	configurable: boolean;
	type?: 'background' | 'background-labels' | 'layer' | 'wms-layer' | 'vector-tile-layer';
	name: string;
	description?: string;
};

function LayerListItem({
	layerComponent,
	visible = true,
	type = 'layer',
	name,
	description,
	configurable,
}: Props) {
	const [localVisible, setLocalVisible] = useState(true);
	const [paintPropsFormVisible, setPaintPropsFormVisible] = useState(false);
	const [paintProps, setPaintProps] = useState(
		layerComponent?.props?.paint ||
			getDefaultPaintPropsByType(
				layerComponent?.props?.type || getDefaulLayerTypeByGeometry(layerComponent.props.geojson)
			)
	);
	const [layers, setLayers] = useState(layerComponent?.props?.layers);

	const _visible = useMemo(() => {
		if (!visible) {
			return false;
		}
		return localVisible;
	}, [visible, localVisible]);

useEffect(() => {
	console.log('layers changed', layers);
	
}, [layers])

	const _layerComponent = useMemo(() => {
				console.log(layers);
		if (layerComponent && type === 'layer') {
			if (layerComponent?.props?.layers) {
				console.log(layers);
				
				return React.cloneElement(layerComponent, {layers:layers});
			} else {
				return React.cloneElement(layerComponent, {
					layout: {
						visibility: _visible ? 'visible' : 'none',
					},
					paint: paintProps,
				});
			}
		}
		return <></>;
	}, [type, layerComponent, paintProps, layers, _visible]);

	const layerType = useMemo(() => {
		if (layerComponent && type === 'layer') {
			if (layerComponent.props.type) {
				return layerComponent.props.type;
			}
			if (layerComponent.props.geojson) {
				return getDefaulLayerTypeByGeometry(layerComponent.props.geojson);
			}
		}

		return undefined;
	}, [layerComponent]);

	return (
		<>
			<ListItem
				sx={{
					paddingRight: configurable ? '56px' : 0,
				}}
				secondaryAction={
					configurable ? (
						<IconButton
							edge="end"
							aria-label="comments"
							onClick={() => {
								setPaintPropsFormVisible((current) => {
									return !current;
								});
							}}
						>
							<TuneIcon />
						</IconButton>
					) : undefined
				}
			>
				<ListItemIcon>
					<Checkbox
						disabled={!visible}
						checked={localVisible}
						onClick={() => {
							setLocalVisible((val) => !val);
						}}
					/>
				</ListItemIcon>
				<ListItemText primary={name} secondary={description} />
				{_layerComponent}
			</ListItem>
			{configurable && paintPropsFormVisible && (
				<LayerPropertyForm
					paintProps={paintProps}
					setPaintProps={setPaintProps}
					layerType={layerType}
				/>
			)}

			{layers && (
				<LayerListFolder visible={true}>
					{layers?.map((el: LayerSpecification, idx:number) => (
						<>
								<LayerListItemVectorLayer layers={layers} setLayers={setLayers} id={'' + idx} key={'' + idx} />
						</>
					))}
				</LayerListFolder>
			)}
		</>
	);
}

export default LayerListItem;

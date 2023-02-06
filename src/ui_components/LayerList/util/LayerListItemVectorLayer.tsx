import { ListItem, IconButton, ListItemIcon, Checkbox, ListItemText } from '@mui/material';
import React, { useEffect, useState } from 'react';
import LayerPropertyForm from './LayerPropertyForm';
import TuneIcon from '@mui/icons-material/Tune';
import { LayerSpecification } from 'maplibre-gl';
import { MlVectorTileLayerProps } from '../../../components/MlVectorTileLayer/MlVectorTileLayer';

type Props = {
	id: string;
	configurable?: boolean;
	vtProps: MlVectorTileLayerProps;
	setVtProps: ((state: unknown) => void) | undefined;
};

export default function LayerListItemVectorLayer({ configurable, vtProps, setVtProps, id }: Props) {
	const [paintPropsFormVisible, setPaintPropsFormVisible] = useState(false);
	const [visible, setVisible] = useState(true);
	const [paintProps, setPaintProps] = useState(vtProps.layers[id].paint);

	useEffect(() => {
		if (!setVtProps) return;

		const _paintProps = { ...paintProps };
		const _layers = [...vtProps.layers];
		if (!_layers[id].layout) {
			_layers[id].layout = { visibility: visible ? 'visible' : 'none' };
		} else {
			_layers[id].layout.visibility = visible ? 'visible' : 'none';
		}

		setVtProps({ ...vtProps, layers: _layers });
	}, [visible, id, setVtProps, vtProps]);

	useEffect(() => {
		if (!setVtProps) return;

		const _paintProps = { ...paintProps };
		const _layers = [...vtProps.layers];
		_layers[id].paint = _paintProps;

		setVtProps({ ...vtProps, layers: _layers });
	}, [paintProps, id, setVtProps, vtProps]);

	return (
		<>
			<ListItem
				key={id}
				sx={{
					paddingRight: configurable ? '56px' : 0,
					paddingLeft: 0,
					paddingTop: 0,
					paddingBottom: '4px',
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
							sx={{ padding: '4px', marginTop: '-3px' }}
						>
							<TuneIcon />
						</IconButton>
					) : undefined
				}
			>
				<ListItemIcon sx={{ minWidth: '30px' }}>
					<Checkbox
						checked={visible}
						onClick={() => {
							setVisible((val) => !val);
						}}
					/>
				</ListItemIcon>
				<ListItemText primary={vtProps.layers[id].id} />
			</ListItem>
			{configurable && paintPropsFormVisible && (
				<LayerPropertyForm
					paintProps={paintProps}
					setPaintProps={setPaintProps}
					layerType={vtProps.layers[id].type}
				/>
			)}
		</>
	);
}

LayerListItemVectorLayer.defaultProps = {
	configurable: true,
};

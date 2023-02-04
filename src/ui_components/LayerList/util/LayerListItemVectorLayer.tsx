import { ListItem, IconButton, ListItemIcon, Checkbox, ListItemText } from '@mui/material';
import React, { useEffect, useState } from 'react';
import LayerPropertyForm from './LayerPropertyForm';
import TuneIcon from '@mui/icons-material/Tune';
import { LayerSpecification } from 'maplibre-gl';
import { DefaultConfig } from '../../../../dist/components/MlNavigationTools/MlNavigationTools.stories';

type Props = {
	id: string;
	configurable?: boolean;
	layers: LayerSpecification[];
	setLayers: React.Dispatch<any>;
};

export default function LayerListItemVectorLayer({ configurable, layers, setLayers, id }: Props) {
	const [paintPropsFormVisible, setPaintPropsFormVisible] = useState(false);
	const [visible, setVisible] = useState(true);
	const [paintProps, setPaintProps] = useState(layers[id].paint);

	useEffect(() => {
    console.log('update props', paintProps);
    
    const _paintProps = {...paintProps}
		setLayers((_layers: LayerSpecification[]) => {
			_layers[id].paint = _paintProps;
    console.log('update props setLayers', _paintProps);
			return [..._layers];
		});
	}, [paintProps,id,setLayers]);

	return (
		<>
			<ListItem
				key={id}
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
						checked={visible}
						onClick={() => {
							setVisible((val) => !val);
						}}
					/>
				</ListItemIcon>
				<ListItemText primary={layers[id].id} />
			</ListItem>
			{configurable && paintPropsFormVisible && (
				<LayerPropertyForm
					paintProps={paintProps}
					setPaintProps={setPaintProps}
					layerType={layers[id].type}
				/>
			)}
		</>
	);
}

LayerListItemVectorLayer.defaultProps = {
	configurable: true,
};

import React, { useEffect, useState } from 'react';
import { ListItem, IconButton, ListItemIcon, Checkbox, ListItemText, styled } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import LayerPropertyForm from './LayerPropertyForm';
import { MlVectorTileLayerProps } from '../../../components/MlVectorTileLayer/MlVectorTileLayer';

export const ListItemStyled = styled(ListItem)((configurable) => ({
	paddingRight: configurable ? '56px' : 0,
	paddingLeft: 0,
	paddingTop: 0,
	paddingBottom: '4px',
}));
const TuneIconButton = styled(IconButton)({
	padding: '4px',
	marginTop: '-3px',
});
export const CheckboxListItemIcon = styled(ListItemIcon)({
	minWidth: '30px',
});
export const CheckboxStyled = styled(Checkbox)({
	padding: 0,
});

interface LayerListItemVectorLayerProps {
	id: string;
	configurable?: boolean;
	vtProps: MlVectorTileLayerProps;
	setVtProps: ((state: unknown) => void) | undefined;
	visibleMaster?: boolean;
}

type idIsStringObject = {[key:string]:any}

function LayerListItemVectorLayer({
	configurable,
	vtProps,
	setVtProps,
	id,
	...props
}: LayerListItemVectorLayerProps) {
	const [paintPropsFormVisible, setPaintPropsFormVisible] = useState(false);
	const [visible, setVisible] = useState(true);
	const [paintProps, setPaintProps] = useState((vtProps.layers as idIsStringObject)[id].paint);

	useEffect(() => {
		if (
			!setVtProps ||
			(typeof (vtProps.layers as idIsStringObject)[id]?.layout?.visibility === 'undefined' && visible) ||
			(!visible && (vtProps.layers as idIsStringObject)[id]?.layout?.visibility === 'none') ||
			(visible && (vtProps.layers as idIsStringObject)[id]?.layout?.visibility === 'visible')
		)
			return;

		const _layers = [...vtProps.layers];
		if (!(_layers as idIsStringObject)[id].layout) {
			(_layers as idIsStringObject)[id].layout = { visibility: visible ? 'visible' : 'none' };
		} else {
			(_layers as idIsStringObject)[id].layout.visibility = visible ? 'visible' : 'none';
		}

		setVtProps({ ...vtProps, layers: _layers });
	}, [visible, id, setVtProps, vtProps]);

	useEffect(() => {
		setVisible(!!props.visibleMaster);
	}, [props.visibleMaster]);

	useEffect(() => {
		if (!setVtProps) return;

		if (JSON.stringify(paintProps) !== JSON.stringify((vtProps.layers as idIsStringObject)[id].paint)) {
			const _paintProps = { ...paintProps };
			const _layers = [...vtProps.layers];
			(_layers as idIsStringObject)[id].paint = _paintProps;
			setVtProps({ ...vtProps, layers: _layers });
		}
	}, [paintProps, id, setVtProps, vtProps]);

	return (
		<>
			<ListItemStyled
				key={id}
				secondaryAction={
					configurable ? (
						<TuneIconButton
							edge="end"
							aria-label="comments"
							onClick={() => {
								setPaintPropsFormVisible((current) => {
									return !current;
								});
							}}
						>
							<TuneIcon />
						</TuneIconButton>
					) : undefined
				}
			>
				<CheckboxListItemIcon>
					<CheckboxStyled
						checked={visible}
						onClick={() => {
							setVisible((val) => !val);
						}}
					/>
				</CheckboxListItemIcon>
				<ListItemText primary={(vtProps.layers as idIsStringObject)[id].id} variant="layerlist" />
			</ListItemStyled>
			{configurable && paintPropsFormVisible && (
				<LayerPropertyForm
					paintProps={paintProps}
					setPaintProps={setPaintProps}
					layerType={(vtProps.layers as idIsStringObject)[id].type}
				/>
			)}
		</>
	);
}

LayerListItemVectorLayer.defaultProps = {
	configurable: true,
};

export default LayerListItemVectorLayer;

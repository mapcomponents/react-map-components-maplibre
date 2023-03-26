import { Dialog } from '@mui/material';
import React, { useState } from 'react';
import GeoJsonLayerForm from './LayerConfigForms/GeoJsonLayerForm';
import LayerTypeForm from './LayerConfigForms/LayerTypeForm';
import WmsLayerForm from './LayerConfigForms/WmsLayerForm';
import { LayerConfig } from 'src/contexts/LayerContext';

export interface AddLayerPopupProps {
	open: boolean;
	setOpen: (open: boolean) => void;
	onChange?: (config: LayerConfig) => void;
	onComplete?: (config: LayerConfig) => void;
}

const AddLayerPopup = (props: AddLayerPopupProps) => {
	const [layerConfig, setLayerConfig] = useState<LayerConfig>();

	const updateLayerType = (type: LayerConfig['type']) => {
		setLayerConfig({ type, config: {} });
	};

	const handleCancel = () => {
		props.setOpen(false);
		setLayerConfig(undefined);
	};

	return (
		<Dialog open={props.open} onClose={handleCancel} PaperProps={{ sx: { padding: '20px' } }}>
			{!layerConfig?.type && <LayerTypeForm onSelect={updateLayerType} />}
			{layerConfig?.type === 'geojson' && (
				<GeoJsonLayerForm
					onSubmit={(config) => {
						props?.onComplete?.({ ...layerConfig, config: config });
						handleCancel();
					}}
					onCancel={handleCancel}
				/>
			)}
			{layerConfig?.type === 'wms' && (
				<WmsLayerForm
					onSubmit={(config) => {
						props?.onComplete?.({ ...layerConfig, config: config });
						handleCancel();
					}}
					onCancel={handleCancel}
				/>
			)}
		</Dialog>
	);
};

AddLayerPopup.defaultProps = {};

export default AddLayerPopup;

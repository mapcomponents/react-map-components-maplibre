import { Dialog } from '@mui/material';
import React, { useState } from 'react';
import GeoJsonLayerForm from './LayerConfigForms/GeoJsonLayerForm';
import LayerTypeForm from './LayerConfigForms/LayerTypeForm';
import WmsLayerForm from './LayerConfigForms/WmsLayerForm';
import { LayerConfig } from 'src/contexts/LayerContext';
import ProtocolHandlerLayerForm from './LayerConfigForms/ProtocolHandlerLayerForm';

export interface AddLayerPopupProps {
	open: boolean;
	config?: LayerConfig;
	setOpen: (open: boolean) => void;
	onChange?: (config: LayerConfig) => void;
	onComplete?: (config: LayerConfig) => void;
}

type validTypes=  LayerConfig['type'] | 'csv';

const AddLayerPopup = (props: AddLayerPopupProps) => {	
	const [layerConfig, setLayerConfig] = useState<LayerConfig | undefined>(props?.config);
	const [originType, setOriginType] = useState<string>();

	console.log(originType)
	const updateLayerType = (type: validTypes) => {
		setOriginType(type)
			if (type === 'csv'){				
				setLayerConfig({ type: 'geojson', config: {} } as LayerConfig);
			}else {
				setLayerConfig({ type, config: {} } as LayerConfig);
			}		
		
	};

	const handleCancel = () => {
		props.setOpen(false);
		setLayerConfig(undefined);
	};

	return (
		<Dialog open={props.open} onClose={handleCancel} PaperProps={{ sx: { padding: '20px' } }}>
			{!layerConfig?.type && <LayerTypeForm onSelect={updateLayerType} />}
			{layerConfig?.type === 'geojson' && originType === 'geojson' && (
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
{layerConfig?.type === 'geojson' && originType === 'csv' && (
				<ProtocolHandlerLayerForm
					originType='csv'
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

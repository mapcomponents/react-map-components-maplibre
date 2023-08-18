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
	layerTypes: string[]; 
	setOpen: (open: boolean) => void;
	onChange?: (config: LayerConfig) => void;
	onComplete?: (config: LayerConfig) => void;
}

type validTypes = LayerConfig['type']|'csv'|'topojson'|'osm'|'gpx'|'kml'|'tcx';


const AddLayerPopup = (props: AddLayerPopupProps) => {
	const [layerConfig, setLayerConfig] = useState<LayerConfig | undefined>(props?.config);
	const [originType, setOriginType] = useState<string>();
	const layerTypes = props.layerTypes || ['geojosn', 'wms', 'csv', 'topojson', 'osm', 'gpx', 'kml', 'tcx'];
	const supportedProtocols = layerTypes.filter((el)=> el!== 'wms' && el !=='geojson');

	const updateLayerType = (type: validTypes) => {
		setOriginType(type);
		if (supportedProtocols.includes(type)) {
			setLayerConfig({ type: 'geojson', config: {} } as LayerConfig);
		} else {
			setLayerConfig({ type, config: {} } as LayerConfig);
		}
	};

	const handleCancel = () => {
		props.setOpen(false);
		setLayerConfig(undefined);
	};

	const ProtocolTypeFormulars = () => {
		return (
			<>
				{supportedProtocols.map((el, idx) => {
					return (
						<>
							{layerConfig?.type === 'geojson' && originType === el && (
								<ProtocolHandlerLayerForm
									key={idx}
									originType={el}
									onSubmit={(config) => {
										props?.onComplete?.({
											...layerConfig,
											config: config,
											type: 'geojson',
										});
										handleCancel();
									}}
									onCancel={handleCancel}
								/>
							)}
						</>
					);
				})}
			</>
		);
	};

	return (
		<Dialog open={props.open} onClose={handleCancel} PaperProps={{ sx: { padding: '20px' } }}>
			{!layerConfig?.type && <LayerTypeForm onSelect={updateLayerType} layerTypes={layerTypes} />}
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
			<ProtocolTypeFormulars />
		</Dialog>
	);
};

AddLayerPopup.defaultProps = {};

export default AddLayerPopup;

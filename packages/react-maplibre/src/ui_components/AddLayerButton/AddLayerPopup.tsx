import { Dialog } from '@mui/material';
import { useState } from 'react';
import GeoJsonLayerForm from './LayerConfigForms/GeoJsonLayerForm';
import LayerTypeForm from './LayerConfigForms/LayerTypeForm';
import WmsLayerForm from './LayerConfigForms/WmsLayerForm';
import ProtocolHandlerLayerForm from './LayerConfigForms/ProtocolHandlerLayerForm';
import MbtilesLayerForm from './LayerConfigForms/MbtilesLayerForm';
import { MlVectorTileLayerProps } from '../../components/MlVectorTileLayer/MlVectorTileLayer';
import { LayerConfig } from '../../contexts/LayerContext';

export interface AddLayerPopupProps {
	open: boolean;
	config?: LayerConfig;
	layerTypes: string[];
	setOpen: (open: boolean) => void;
	onChange?: (config: LayerConfig) => void;
	onComplete?: (config: LayerConfig) => void;
}

type validTypes =
	| LayerConfig['type']
	| 'csv'
	| 'mbtiles'
	| 'topojson'
	| 'osm'
	| 'gpx'
	| 'kml'
	| 'tcx';

const AddLayerPopup = (props: AddLayerPopupProps) => {
	const [layerConfig, setLayerConfig] = useState<LayerConfig | undefined>(props?.config);
	const [originType, setOriginType] = useState<string>();
	const layerTypes = props.layerTypes;
	const supportedProtocols = layerTypes.filter(
		(el) => el !== 'wms' && el !== 'geojson' && el !== 'mbtiles'
	);

	const validTypes: string[] = [
		'wms',
		'geojson',
		'vt',
		'csv',
		'mbtiles',
		'topojson',
		'osm',
		'gpx',
		'kml',
		'tcx',
	];

	const updateLayerType = (type: validTypes) => {
		setOriginType(type);
		if (supportedProtocols.includes(type)) {
			setLayerConfig({ type: 'geojson', config: {} } as LayerConfig);
		} else if (type === 'mbtiles') {
			setLayerConfig({ type: 'vt', config: { layers: [] } });
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
		<Dialog open={props.open} onClose={handleCancel}>
			{!layerConfig?.type && (
				<LayerTypeForm
					onSelect={(type: string) => {
						if (validTypes.includes(type)) updateLayerType(type as validTypes);
					}}
					layerTypes={layerTypes}
				/>
			)}
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
			{layerConfig?.type === 'vt' && originType !== undefined && (
				<MbtilesLayerForm
					config={layerConfig as unknown as MlVectorTileLayerProps}
					originType={originType}
					onSubmit={(config) => {
						if (layerConfig) {
							props?.onComplete?.({ ...layerConfig, config: config } as LayerConfig);
							handleCancel();
						}
					}}
					onCancel={handleCancel}
				/>
			)}
			<ProtocolTypeFormulars key={'protocol'} />
		</Dialog>
	);
};

AddLayerPopup.defaultProps = {};

export default AddLayerPopup;

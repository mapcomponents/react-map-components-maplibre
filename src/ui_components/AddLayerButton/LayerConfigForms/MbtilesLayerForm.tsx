import {
	Button,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextareaAutosize,
} from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { mbTilesProtocolHandler } from '../../../protocol_handlers/mbtiles';
import useAddProtocol from '../../../hooks/useAddProtocol/useAddProtocol';
import useMap from '../../../hooks/useMap';
import { MlVectorTileLayerProps } from 'src/components/MlVectorTileLayer/MlVectorTileLayer';
import { LayerSpecification } from 'maplibre-gl';
import MbtilesLayerPropFormular from './utils/MbtilesLayerPropFormular';

export interface WmsLayerConfig {
	url: string;
}

export interface MbtilesLayerFormProps {
	originType: string;
	config: MlVectorTileLayerProps;
	mapId?: string;
	onSubmit: (config: MlVectorTileLayerProps) => void;
	onCancel: () => void;
}

export default function MbtilesLayerForm(props: MbtilesLayerFormProps) {
	const [config, setConfig] = React.useState<MlVectorTileLayerProps>(props.config);
	const [fileName, setFileName] = useState<string>();
	const [filePath, setFilePath] = useState<string>();
	const [layers, setLayers] = useState<LayerSpecification[]>([]);
	const mapHook = useMap({ mapId: props.mapId });


	useAddProtocol({
		protocol: 'mbtiles',
		handler: mbTilesProtocolHandler,
	});

	const configIsValid = useMemo(() => {
		if (!fileName) return false;

		return true;
	}, [fileName]);

	useEffect(() => {



		if (typeof fileName !== 'undefined' && typeof filePath !== 'undefined') {
			setConfig({
				//url: 'mbtiles://mbtiles/countries.mbtiles/{z}/{x}/{y}',
				url: 'mbtiles://' + filePath + '/{z}/{x}/{y}',
			  layers: [
					{
						id: 'countries',
						type: 'fill',
						'source-layer': 'countries',
						layout: {},
						paint: { "fill-color": "#f9a5f5", "fill-opacity": 0.5 },							
					},
				] as LayerSpecification[], 
				layerId: fileName,
				sourceOptions: {					
					type: 'vector',
					minzoom: 0,
					maxzoom: 1,
				},
			});
		}
	}, [fileName, mapHook.map, filePath]);

	return (
		<>
			<DialogTitle> Layer from mbtiles file</DialogTitle>
			<DialogContent>
				<Button variant="contained" component="label" sx={{ marginTop: '10px' }}>
					Select origin file
					<input
						type="file"
						hidden
						accept={props.originType}
						onChange={(ev) => {
							setFileName(ev.target.files?.[0].name);

							if (ev.target.files?.[0]) {
								const dataUrl = URL.createObjectURL(ev.target.files?.[0]);
								setFilePath(dataUrl);
							}
						}}
					/>
				</Button>
				<MbtilesLayerPropFormular setter={setLayers} />
				</DialogContent>
			<DialogActions>
				<Button onClick={props.onCancel}>Cancel</Button>
				<Button disabled={!configIsValid} onClick={() => props.onSubmit(config)}>
					Add
				</Button>
			</DialogActions>
		</>
	);
}

import {
	Button,
	DialogActions,
	DialogTitle,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
} from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { MlGeoJsonLayerProps } from 'src/components/MlGeoJsonLayer/MlGeoJsonLayer';
import useAddProtocol from '../../../hooks/useAddProtocol/useAddProtocol';
import useMap from '../../../hooks/useMap';
import { CSVProtocolHandler } from '../../../protocol_handlers/csv';
import { TopojsonProtocolHandler } from '../../../protocol_handlers/topojson';
import { OSMProtocolHandler } from '../../../protocol_handlers/osm';
import { XMLProtocolHandler } from '../../../protocol_handlers/xml';

export interface ProtocolHandlerLayerFormProps {
	originType: string;
	config?: MlGeoJsonLayerProps;
	mapId?: string;
	onSubmit: (config: MlGeoJsonLayerProps) => void;
	onCancel: () => void;
}


const handlers = {
	csv: CSVProtocolHandler,
	topojson: TopojsonProtocolHandler, 
	osm: OSMProtocolHandler,
	gpx: XMLProtocolHandler, 
	kml: XMLProtocolHandler,
	tcx: XMLProtocolHandler,
};

const types: string[] = ['fill', 'line', 'circle'];
export default function ProtocolHandlerLayerForm(props: ProtocolHandlerLayerFormProps) {
	const [config, setConfig] = useState<Partial<MlGeoJsonLayerProps>>({ type: 'circle' });
	const [fileName, setFileName] = useState<string>();
	const [filePath, setFilePath] = useState<string>();
	const mapHook = useMap({ mapId: props.mapId });

	console.log(handlers.csv)

	useAddProtocol({
		protocol: props.originType,
		handler: handlers[props.originType],
	});

	const configIsValid = useMemo(() => {
		if (!config?.type) return false;
		return true;
	}, [config]);

	useEffect(() => {
		if (typeof fileName !== 'undefined' && typeof filePath !== 'undefined') {
			if (!mapHook.map?.getSource(fileName)) {
				mapHook.map?.addSource(fileName, {
					type: 'geojson',
					data: props.originType + '://' + filePath,
				});
			}
			config.options = { source: fileName };
		}

		return () => {};
	}, [fileName, mapHook.map, filePath]);

	//the temporally storage adress of the uploaded file will be revoked, after source and layer are loaded in the map  
	useEffect(() => {
		if (filePath && fileName && mapHook.map?.getLayer(fileName)) {
			URL.revokeObjectURL(filePath);
		}
	}, [fileName, filePath, mapHook.map]);

	return (
		<>
			<DialogTitle>Layer from {props.originType}</DialogTitle>
			<FormControl fullWidth>
				<InputLabel id="type-label">Type</InputLabel>
				<Select
					labelId="type-label"
					value={config.type}
					label="Type"
					onChange={(ev: SelectChangeEvent) =>
						setConfig((current) => ({
							...current,
							type: ev.target.value as MlGeoJsonLayerProps['type'],
						}))
					}
				>
					{types.map((type) => (
						<MenuItem key={type} value={type}>
							{type}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<FormControl fullWidth>
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
			</FormControl>
			<DialogActions>
				<Button onClick={props.onCancel}>Cancel</Button>
				<Button
					disabled={!configIsValid}
					onClick={() => props.onSubmit(config as MlGeoJsonLayerProps)}
				>
					Add
				</Button>
			</DialogActions>
		</>
	);
}

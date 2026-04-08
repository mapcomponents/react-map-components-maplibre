import {
	Box,
	Button,
	Chip,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	FormControl,
	FormHelperText,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	Typography,
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RouteIcon from '@mui/icons-material/Route';
import { useEffect, useMemo, useState } from 'react';
import useAddProtocol from '../../../hooks/useAddProtocol/useAddProtocol';
import CSVOptionsFormular from './utils/CSVOptionsFomular';
import OsmOptionsFomular from './utils/OsmOptionsFomular';
import useMap from '../../../hooks/useMap';
import { CSVProtocolHandler } from '../../../protocol_handlers/csv';
import { TopojsonProtocolHandler } from '../../../protocol_handlers/topojson';
import { OSMProtocolHandler } from '../../../protocol_handlers/osm';
import { XMLProtocolHandler } from '../../../protocol_handlers/xml';
import * as csv2geojsonType from '../../../protocol_handlers/csv2geojson';
import { MlGeoJsonLayerProps } from '../../../components/MlGeoJsonLayer/MlGeoJsonLayer';
import { useTranslation } from 'react-i18next';

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
	const { t } = useTranslation();
	const [config, setConfig] = useState<Partial<MlGeoJsonLayerProps>>({ type: 'circle' });
	const [fileName, setFileName] = useState<string>();
	const [filePath, setFilePath] = useState<string>();
	const [optionsObject, setOptionsObject] = useState<csv2geojsonType.csvOptions>({});
	const mapHook = useMap({ mapId: props.mapId });
	const optionsURL = '?' + new URLSearchParams(optionsObject as string).toString();

	useAddProtocol({
		protocol: props.originType,
		handler: (handlers as { [key: string]: any })[props.originType],
	});

	const configIsValid = useMemo(() => {
		if (!config?.type) return false;
		if (filePath && fileName) return true;
		return false;
	}, [config, filePath, fileName]);

	useEffect(() => {
		if (typeof fileName !== 'undefined' && typeof filePath !== 'undefined') {
			if (!mapHook.map?.getSource(fileName))
				mapHook.map?.addSource(fileName, {
					type: 'geojson',
					data: optionsObject
						? props.originType + '://' + filePath + optionsURL
						: props.originType + '://' + filePath,
				});
			config.options = { source: fileName };
		}
		return () => {};
	}, [fileName, mapHook.map, filePath]);

	useEffect(() => {
		if (filePath && fileName && mapHook.map?.getLayer(fileName)) {
			URL.revokeObjectURL(filePath);
		}
	}, [fileName, filePath, mapHook.map]);

	function addOption(newObject: JSON) {
		const newOptions = { ...optionsObject, ...newObject };
		return setOptionsObject(newOptions);
	}

	return (
		<>
			<DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1, pb: 1 }}>
				<RouteIcon color="primary" />
				{t(
					`addLayerButton.${props.originType}.title`,
					`Add ${props.originType.toUpperCase()} Layer`
				)}
			</DialogTitle>
			<DialogContent sx={{ minWidth: 400, display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
				<Typography variant="body2" color="text.secondary">
					{t(
						`addLayerButton.${props.originType}.description`,
						`Load geographic data from a ${props.originType.toUpperCase()} file`
					)}
				</Typography>
				<FormControl size="small" fullWidth>
					<InputLabel id="protocol-type-label">
						{t('addLayerButton.geojson.renderType', 'Render type')}
					</InputLabel>
					<Select
						labelId="protocol-type-label"
						value={config.type}
						label={t('addLayerButton.geojson.renderType', 'Render type')}
						onChange={(ev: SelectChangeEvent) =>
							setConfig((current) => ({
								...current,
								type: ev.target.value as MlGeoJsonLayerProps['type'],
							}))
						}
					>
						{types.map((type) => (
							<MenuItem key={type} value={type}>
								{t(`addLayerButton.geojson.type.${type}`, type)}
							</MenuItem>
						))}
					</Select>
					<FormHelperText>
						{t('addLayerButton.geojson.renderTypeHelp', 'How the geometry will be rendered on the map')}
					</FormHelperText>
				</FormControl>
				<Divider />
				<Box>
					<Button
						variant="outlined"
						component="label"
						startIcon={fileName ? <CheckCircleIcon color="success" /> : <UploadFileIcon />}
						color={fileName ? 'success' : 'primary'}
						fullWidth
						sx={{ py: 1.5 }}
					>
						{fileName
							? t('addLayerButton.fileLoaded', 'File loaded')
							: t(`addLayerButton.${props.originType}.selectFile`, `Select ${props.originType.toUpperCase()} file`)}
						<input
							type="file"
							hidden
							accept={`.${props.originType}`}
							onChange={(ev) => {
								setFileName(ev.target.files?.[0].name);
								if (ev.target.files?.[0]) {
									const dataUrl = URL.createObjectURL(ev.target.files[0]);
									setFilePath(dataUrl);
								}
							}}
						/>
					</Button>
					{fileName && (
						<Box sx={{ mt: 1 }}>
							<Chip
								size="small"
								icon={<CheckCircleIcon />}
								color="success"
								variant="outlined"
								label={fileName}
							/>
						</Box>
					)}
				</Box>
				{props.originType === 'csv' && <CSVOptionsFormular setter={addOption} />}
				{props.originType === 'osm' && <OsmOptionsFomular setter={addOption} />}
			</DialogContent>
			<DialogActions sx={{ px: 3, pb: 2 }}>
				<Button onClick={props.onCancel} color="inherit">
					{t('common.cancel', 'Cancel')}
				</Button>
				<Button
					variant="contained"
					disabled={!configIsValid}
					onClick={() => props.onSubmit(config as MlGeoJsonLayerProps)}
				>
					{t('addLayerButton.addLayer', 'Add layer')}
				</Button>
			</DialogActions>
		</>
	);
}

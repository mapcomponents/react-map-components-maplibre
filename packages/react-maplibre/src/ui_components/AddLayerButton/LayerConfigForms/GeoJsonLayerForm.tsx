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
	TextField,
	Typography,
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PlaceIcon from '@mui/icons-material/Place';
import React, { useMemo } from 'react';
import { MlGeoJsonLayerProps } from '../../../components/MlGeoJsonLayer/MlGeoJsonLayer';
import { useTranslation } from 'react-i18next';

export interface GeoJsonLayerFormProps {
	config?: MlGeoJsonLayerProps;
	onSubmit: (config: MlGeoJsonLayerProps, name?: string) => void;
	onCancel: () => void;
}

const types: string[] = ['fill', 'line', 'circle'];

export default function GeoJsonLayerForm(props: GeoJsonLayerFormProps) {
	const { t } = useTranslation();
	const [config, setConfig] = React.useState<Partial<MlGeoJsonLayerProps>>({ type: 'circle' });
	const [layerName, setLayerName] = React.useState('');
	const [fileName, setFileName] = React.useState<string | null>(null);

	const configIsValid = useMemo(() => {
		if (!config?.type || !config?.geojson) return false;
		return true;
	}, [config]);

	return (
		<>
			<DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1, pb: 1 }}>
				<PlaceIcon color="primary" />
				{t('addLayerButton.geojson.title', 'Add GeoJSON Layer')}
			</DialogTitle>
			<DialogContent sx={{ minWidth: 400, display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
				<TextField
					label={t('addLayerButton.layerName', 'Layer name')}
					value={layerName}
					size="small"
					fullWidth
					placeholder={t('addLayerButton.layerNamePlaceholder', 'e.g. My Points') as string}
					onChange={(e) => setLayerName(e.target.value)}
				/>
				<FormControl size="small" fullWidth>
					<InputLabel id="geojson-type-label">
						{t('addLayerButton.geojson.renderType', 'Render type')}
					</InputLabel>
					<Select
						labelId="geojson-type-label"
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
							: t('addLayerButton.uploadFile', 'Upload GeoJSON file')}
						<input
							type="file"
							hidden
							accept=".geojson,.json"
							onChange={(ev) => {
								const file = ev.target.files?.[0];
								if (!file) return;
								setFileName(file.name);
								file.text().then((data) =>
									setConfig((current) => ({ ...current, geojson: JSON.parse(data) }))
								);
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
					{!fileName && (
						<Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
							{t('addLayerButton.geojson.fileHelp', 'Accepts .geojson and .json files')}
						</Typography>
					)}
				</Box>
			</DialogContent>
			<DialogActions sx={{ px: 3, pb: 2 }}>
				<Button onClick={props.onCancel} color="inherit">
					{t('common.cancel', 'Cancel')}
				</Button>
				<Button
					variant="contained"
					disabled={!configIsValid}
					onClick={() =>
						props.onSubmit(
							config as MlGeoJsonLayerProps,
							layerName || undefined,
						)
					}
				>
					{t('addLayerButton.addLayer', 'Add layer')}
				</Button>
			</DialogActions>
		</>
	);
}

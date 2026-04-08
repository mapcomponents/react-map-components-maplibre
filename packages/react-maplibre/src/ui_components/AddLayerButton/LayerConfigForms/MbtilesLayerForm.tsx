import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	Button,
	Chip,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	List,
	ListItem,
	ListItemText,
	Typography,
} from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useEffect, useMemo, useState } from 'react';
import useMap from '../../../hooks/useMap';
import { LayerSpecification } from 'maplibre-gl';
import MbtilesLayerPropFormular from './utils/MbtilesLayerPropFormular';
import { MlVectorTileLayerProps } from '../../../components/MlVectorTileLayer/MlVectorTileLayer';
import { useTranslation } from 'react-i18next';

export interface MbtilesLayerFormProps {
	originType: string;
	config: MlVectorTileLayerProps;
	mapId?: string;
	onSubmit: (config: MlVectorTileLayerProps) => void;
	onCancel: () => void;
}

export default function MbtilesLayerForm(props: MbtilesLayerFormProps) {
	const { t } = useTranslation();
	const [config, setConfig] = React.useState<MlVectorTileLayerProps>(props.config);
	const [fileName, setFileName] = useState<string>();
	const [filePath, setFilePath] = useState<string>();
	const [layers, setLayers] = useState<LayerSpecification[]>([]);
	const mapHook = useMap({ mapId: props.mapId });

	const configIsValid = useMemo(() => !!fileName, [fileName]);

	useEffect(() => {
		if (typeof fileName !== 'undefined' && typeof filePath !== 'undefined') {
			setConfig({
				url: 'mbtiles://' + filePath + '/{z}/{x}/{y}',
				layers: layers,
				layerId: fileName,
				sourceOptions: {
					type: 'vector',
					minzoom: 0,
					maxzoom: 1,
				},
			});
		}
	}, [fileName, mapHook.map, filePath, layers]);

	return (
		<>
			<DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1, pb: 1 }}>
				<MapIcon color="primary" />
				{t('addLayerButton.mbtiles.title', 'Add MBTiles Layer')}
			</DialogTitle>
			<DialogContent sx={{ minWidth: 420, display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
				<Typography variant="body2" color="text.secondary">
					{t(
						'addLayerButton.mbtiles.description',
						'Load a local MBTiles vector tile file. You can optionally define layer render properties below.'
					)}
				</Typography>
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
							: t('addLayerButton.mbtiles.selectFile', 'Select MBTiles file')}
						<input
							type="file"
							hidden
							accept={props.originType}
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
				<Divider />
				<Accordion disableGutters elevation={0} sx={{ border: '1px solid', borderColor: 'divider', '&:before': { display: 'none' } }}>
					<AccordionSummary expandIcon={<ExpandMoreIcon />}>
						<Typography variant="subtitle2">
							{t('addLayerButton.mbtiles.layerProps', 'Layer render properties')}
						</Typography>
						{layers.length > 0 && (
							<Chip
								size="small"
								label={layers.length}
								color="primary"
								sx={{ ml: 1 }}
							/>
						)}
					</AccordionSummary>
					<AccordionDetails>
						{layers.length > 0 ? (
							<List dense disablePadding>
								{layers.map((el, idx) => (
									<ListItem key={idx} disableGutters>
										<ListItemText
											primary={`${idx + 1}. ${(el as { id?: string }).id ?? 'layer'}`}
											secondary={el.type}
										/>
									</ListItem>
								))}
							</List>
						) : (
							<Typography variant="body2" color="text.secondary">
								{t('addLayerButton.mbtiles.noLayers', 'No layer properties defined yet')}
							</Typography>
						)}
						<Box sx={{ mt: 1 }}>
							<MbtilesLayerPropFormular setter={setLayers} />
						</Box>
					</AccordionDetails>
				</Accordion>
			</DialogContent>
			<DialogActions sx={{ px: 3, pb: 2 }}>
				<Button onClick={props.onCancel} color="inherit">
					{t('common.cancel', 'Cancel')}
				</Button>
				<Button
					variant="contained"
					disabled={!configIsValid}
					onClick={() => props.onSubmit(config)}
				>
					{t('addLayerButton.addLayer', 'Add layer')}
				</Button>
			</DialogActions>
		</>
	);
}

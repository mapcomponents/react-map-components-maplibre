import {
	Button,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	FormHelperText,
	InputAdornment,
	TextField,
	Typography,
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import HttpIcon from '@mui/icons-material/Http';
import React, { useMemo } from 'react';
import { wmsConfig } from '../types';
import { useTranslation } from 'react-i18next';

export interface WmsLayerFormProps {
	onSubmit: (config: wmsConfig) => void;
	onCancel: () => void;
}

export default function WmsLayerForm(props: WmsLayerFormProps) {
	const { t } = useTranslation();
	const [config, setConfig] = React.useState<wmsConfig>({ url: '' });
	const [layerName, setLayerName] = React.useState('');

	const configIsValid = useMemo(() => {
		if (!config?.url) return false;
		return true;
	}, [config]);

	const isValidUrl = !config.url || config.url.startsWith('http://') || config.url.startsWith('https://');

	return (
		<>
			<DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1, pb: 1 }}>
				<ImageIcon color="primary" />
				{t('addLayerButton.wms.title', 'Add WMS Layer')}
			</DialogTitle>
			<DialogContent sx={{ minWidth: 420, display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
				<Typography variant="body2" color="text.secondary">
					{t(
						'addLayerButton.wms.description',
						'Connect to a Web Map Service (WMS) by entering its base URL. The service capabilities will be loaded automatically.'
					)}
				</Typography>
				<TextField
					label={t('addLayerButton.layerName', 'Layer name')}
					value={layerName}
					size="small"
					fullWidth
					placeholder={t('addLayerButton.layerNamePlaceholder', 'e.g. My WMS Layer') as string}
					onChange={(e) => setLayerName(e.target.value)}
				/>
				<FormControl fullWidth>
					<TextField
						id="wms-url-input"
						label={t('addLayerButton.wms.url', 'WMS URL')}
						size="small"
						value={config.url}
						error={!isValidUrl}
						slotProps={{
							input: {
								startAdornment: (
									<InputAdornment position="start">
										<HttpIcon fontSize="small" color="action" />
									</InputAdornment>
								),
							},
						}}
						placeholder="https://"
						onChange={(ev) => setConfig({ ...config, url: ev.target.value })}
					/>
					{!isValidUrl && (
						<FormHelperText error>
							{t('addLayerButton.wms.invalidUrl', 'URL must start with http:// or https://')}
						</FormHelperText>
					)}
					{isValidUrl && (
						<FormHelperText>
							{t('addLayerButton.wms.urlHelp', 'Enter the base URL of the WMS endpoint')}
						</FormHelperText>
					)}
				</FormControl>
			</DialogContent>
			<DialogActions sx={{ px: 3, pb: 2 }}>
				<Button onClick={props.onCancel} color="inherit">
					{t('common.cancel', 'Cancel')}
				</Button>
				<Button
					variant="contained"
					disabled={!configIsValid || !isValidUrl}
					onClick={() => props.onSubmit(config)}
				>
					{t('addLayerButton.addLayer', 'Add layer')}
				</Button>
			</DialogActions>
		</>
	);
}

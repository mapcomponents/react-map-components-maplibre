import {
	Button,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	InputLabel,
	OutlinedInput,
} from '@mui/material';
import React, { useMemo } from 'react';
import { wmsConfig } from 'src/contexts/LayerContext';

export interface WmsLayerConfig {
	url: string;
}

export interface WmsLayerFormProps {
	onSubmit: (config: wmsConfig) => void;
	onCancel: () => void;
}

export default function WmsLayerForm(props: WmsLayerFormProps) {
	const [config, setConfig] = React.useState<wmsConfig>({ url: '' });

	const configIsValid = useMemo(() => {
		if (!config?.url) return false;

		return true;
	}, [config]);

	return (
		<>
			<DialogTitle>WMS layer</DialogTitle>
			<DialogContent>
				<FormControl fullWidth sx={{ marginTop: '10px' }}>
					<InputLabel htmlFor="wms-url-input">WMS URL</InputLabel>
					<OutlinedInput
						id="wms-url-input"
						label="WMS URL"
						value={config.url}
						onChange={(ev) => setConfig({ ...config, url: ev.target.value })}
					/>
				</FormControl>
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

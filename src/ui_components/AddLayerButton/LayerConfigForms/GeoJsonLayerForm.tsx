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
import React, { useMemo } from 'react';
import { MlGeoJsonLayerProps } from 'src/components/MlGeoJsonLayer/MlGeoJsonLayer';


export interface GeoJsonLayerFormProps {
	config?: MlGeoJsonLayerProps;
	onSubmit: (config: MlGeoJsonLayerProps) => void;
	onCancel: () => void;
}

const types: string[] = [
	'fill',
	'line',
	'circle',
];
export default function GeoJsonLayerForm(props: GeoJsonLayerFormProps) {

	const [config, setConfig] = React.useState<Partial<MlGeoJsonLayerProps>>({ type: 'circle' });

	const configIsValid = useMemo(() => {
		if (!config?.type || !config?.geojson) return false;

		return true;
	}, [config]);

	return (
		<>
			<DialogTitle>GeoJSON layer</DialogTitle>
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
					Upload File
					<input
						type="file"
						hidden
						onChange={(ev) => {
							ev.target.files?.[0]
								.text()
								.then((data) =>
									setConfig((current) => ({ ...current, geojson: JSON.parse(data) }))
								);
						}}
					/>
				</Button>
			</FormControl>
			<DialogActions>
				<Button onClick={props.onCancel}>Cancel</Button>
				<Button disabled={!configIsValid} onClick={() => props.onSubmit(config as MlGeoJsonLayerProps)}>
					Add
				</Button>
			</DialogActions>
		</>
	);
}

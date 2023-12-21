import {
	Accordion,
	AccordionSummary,
	Button,
	DialogActions,
	DialogContent,
	DialogTitle,
	Typography,
} from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import useMap from '../../../hooks/useMap';
import { MlVectorTileLayerProps } from 'src/components/MlVectorTileLayer/MlVectorTileLayer';
import { LayerSpecification } from 'maplibre-gl';
import MbtilesLayerPropFormular from './utils/MbtilesLayerPropFormular';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

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
	const [expanded, setExpanded] = useState<boolean>(false);

	console.log(layers)

	const LayersToCall = () => {
		return (
			<>
				{layers.map((el, idx) => (
					<Typography variant="body2" key={idx}>
						{idx + 1}: {JSON.stringify(el)}
					</Typography>
				))}
			</>
		);
	};

	/**
	 * A Vector Tile layer configuration with a mbtile Protocol url will passed to the onComplete function of the addLayerButton.
	 * In order to visdualize the file content, a mbtiles ProtocolHandler must be added to the map Instanz.
	 * See the MapComponents AddLayerButton demo and the documentation of useAddProtocolHook to find out more about Protocol handlers.
	 */

	/* example values: 
	*	 	id: 'countries',
	*		type: 'fill',
	*		'source-layer': 'countries',
	*   layout: {},
	*   paint: { "fill-color": "#f9a5f5", "fill-opacity": 0.5 },		
	*/
							
		
	const configIsValid = useMemo(() => {
		if (!fileName) return false;

		return true;
	}, [fileName]);

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

				<Accordion expanded={expanded}>
					<AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
						<Typography>MB-Tile Layer properties</Typography>
						<Button onClick={() => setExpanded(!expanded)}>
							{expanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
						</Button>
					</AccordionSummary>
					<Typography variant="body1"> Layers</Typography>
					{layers.length > 0 ? <LayersToCall /> : <Typography variant="body2"> 0 </Typography>}
					<MbtilesLayerPropFormular setter={setLayers} />
				</Accordion>
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

import {
	FormControl,
	MenuItem,
	Select,
	InputLabel,
	Button,
	FormLabel,
	FormControlLabel,
	Radio,
	RadioGroup,
} from '@mui/material';
import React, { useState, useMemo, useRef, useEffect } from 'react';
import useMap from '../../hooks/useMap';

import * as turf from '@turf/turf';

import createPdf from './lib/createPdf';
import pdfutils from './lib/pdf.utils';
import templates from './lib/pdf.templates';
import MlGeoJsonLayer from '../MlGeoJsonLayer/MlGeoJsonLayer';
import { BBox, bbox } from '@turf/turf';

const qualityOptions = [
	{
		value: '72dpi',
		label: 'Draft (72dpi)',
	},
	{
		value: '150dpi',
		label: 'Medium (150dpi)',
	},
	{
		value: '300dpi',
		label: 'High (300dpi)',
	},
];

interface MlCreatePdfFormProps {
	/**
	 * Id of the target MapLibre instance in mapContext
	 */
	mapId?: string;
	/**
	 * Id of an existing layer in the mapLibre instance to help specify the layer order
	 * This layer will be visually beneath the layer with the "insertBeforeLayer" id.
	 */
	insertBeforeLayer?: string;
	formControlStyles?: any;
}

/**
 * Create PDF Form Component
 *
 */
const MlCreatePdfForm = (props: MlCreatePdfFormProps) => {
	const mapHook = useMap({
		mapId: props.mapId,
		waitForLayer: props.insertBeforeLayer,
	});
	const initializedRef = useRef(false);

	const [format, setFormat] = useState('A4');
	const [quality, setQuality] = useState('72dpi');
	const [orientation, setOrientation] = useState('portrait');

	const formControlStyles = useMemo(() => {
		return {
			margin: '5px 0 15px 0 ',
			...props.formControlStyles,
		};
	}, [props.formControlStyles]);

	const template = useMemo(() => {
		return orientation === 'portrait'
			? templates[format][quality]
			: { width: templates[format][quality].height, height: templates[format][quality].width };
	}, [format, quality, orientation]);

	const previewGeojson = useMemo(() => {
		if (!mapHook.map) return;
		const { lng, lat } = mapHook.map.map.getCenter();
		//const bbox = pdfutils.getPrintBbox(
		//	lng,
		//	lat,
		//	template.width,
		//	template.height,
		//	mapHook.map.map.getPixelRatio()
		//);
		const canvasHeight = mapHook.map.map._canvas.height;
		const canvasWidth = mapHook.map.map._canvas.width;
		const bboxPixelHeight = Math.ceil(canvasHeight / 2);
		const bboxPixelWidth = Math.ceil((template.width / template.height) * bboxPixelHeight);

		console.log(orientation === 'portrait', template.height / template.width);
		console.log(template.width / template.height);
		console.log(orientation);
		console.log(bboxPixelWidth, bboxPixelHeight);
		console.log([
			Math.floor(canvasHeight / 2 - bboxPixelHeight / 2),
			Math.floor(canvasWidth / 2 - bboxPixelWidth / 2),
		]);
		console.log([
			Math.floor(canvasHeight / 2 + bboxPixelHeight / 2),
			Math.floor(canvasWidth / 2 + bboxPixelWidth / 2),
		]);

		const topLeft = mapHook.map.map.unproject([
			Math.floor(canvasWidth / 2 - bboxPixelWidth / 2),
			Math.floor(canvasHeight / 2 - bboxPixelHeight / 2),
		]);
		const bottomRight = mapHook.map.map.unproject([
			Math.floor(canvasWidth / 2 + bboxPixelWidth / 2),
			Math.floor(canvasHeight / 2 + bboxPixelHeight / 2),
		]);
		console.log(topLeft, bottomRight);
		const bbox = [topLeft.lng, topLeft.lat, bottomRight.lng, bottomRight.lat];

		return turf.bboxPolygon(bbox as BBox);
	}, [mapHook.map, template, orientation]);

	useEffect(() => {
		if (!mapHook.map || initializedRef.current) return;
		// the MapLibre-gl instance (mapHook.map) is accessible here
		// initialize the layer and add it to the MapLibre-gl instance or do something else with it
		initializedRef.current = true;
	}, [mapHook.map, props.mapId]);

	return (
		<>
			<FormControl fullWidth sx={formControlStyles}>
				<InputLabel id="format-select-label">Format</InputLabel>
				<Select
					labelId="format-select-label"
					id="format-select"
					label="Format"
					value={format}
					onChange={(event) => {
						setFormat(event.target.value);
					}}
				>
					{Object.keys(templates).map((el) => (
						<MenuItem key={el} value={el}>
							{el}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<FormControl fullWidth sx={formControlStyles}>
				<FormLabel id="orientation-radio-buttons-group-label">Orientation</FormLabel>
				<RadioGroup
					row
					aria-labelledby="orientation-radio-buttons-group-label"
					name="orientation-radio-buttons-group"
					value={orientation}
					onChange={(event) => {
						setOrientation(event.target.value);
					}}
				>
					<FormControlLabel value="portrait" control={<Radio />} label="Portrait" />
					<FormControlLabel value="landscape" control={<Radio />} label="Landscape" />
				</RadioGroup>
			</FormControl>
			<FormControl fullWidth sx={formControlStyles}>
				<InputLabel id="quality-select-label">Qualität</InputLabel>
				<Select
					labelId="quality-select-label"
					id="quality-select"
					label="Qualität"
					value={quality}
					onChange={(event) => {
						setQuality(event.target.value);
					}}
				>
					{qualityOptions.map((el) => (
						<MenuItem key={el.value} value={el.value}>
							{el.label}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<FormControl fullWidth sx={formControlStyles}>
				<Button
					variant="contained"
					onClick={() => {
						if (mapHook.map) {
							const bbox = turf.bbox(previewGeojson);
							createPdf(
								mapHook.map,
								{
									width: template.width,
									height: template.height,
									bbox: bbox,
									format: format.toLowerCase(),
									orientation: orientation,
								},
								null,
								() => {
									console.log('hey');
								}
							);
						}
					}}
				>
					PDF erstellen
				</Button>
			</FormControl>
			<MlGeoJsonLayer geojson={previewGeojson} />
		</>
	);
};

MlCreatePdfForm.defaultProps = {
	mapId: undefined,
};
export default MlCreatePdfForm;

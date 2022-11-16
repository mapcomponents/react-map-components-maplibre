import React, { useContext, useMemo, useCallback } from 'react';
import PdfContext from './PdfContext';
import PdfPreview from './PdfPreview'
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

import useMap from '../../../hooks/useMap';
import useExportMap from '../../../hooks/useExportMap';
import { createPdfResolverParams } from '../../../hooks/useExportMap/lib';

import * as turf from '@turf/turf';

import templates from './pdf.templates';

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

interface PdfFormProps {
	/**
	 * Id of the target MapLibre instance in mapContext
	 */
	mapId?: string;
	onCreatePdf?: (options:createPdfResolverParams) => createPdfResolverParams;
}

export default function PdfForm(props:PdfFormProps) {
	const pdfContext = useContext(PdfContext);
	const mapHook = useMap({
		// eslint-disable-next-line react/prop-types
		mapId: props.mapId,
	});
	const mapExporter = useExportMap({ mapId: props.mapId });

	const createPdfHandler = useCallback(() => {
		console.log(pdfContext.template ,
			pdfContext.format ,
			pdfContext.orientation ,
			pdfContext.geojsonRef?.current?.bbox ,
			pdfContext.geojsonRef?.current)
		if (
			mapHook.map &&
			mapExporter.createExport &&
			pdfContext.template &&
			pdfContext.format &&
			pdfContext.orientation &&
			pdfContext.geojsonRef?.current?.bbox &&
			pdfContext.geojsonRef?.current
		) {
			const bbox = turf.bbox(pdfContext.geojsonRef.current);

			console.log('TEST');
			
			mapExporter
				.createExport({
					width: pdfContext.template.width,
					height: pdfContext.template.height,
					bbox: bbox,
					bboxUnrotated: pdfContext.geojsonRef.current.bbox,
					bearing: pdfContext.geojsonRef.current?.properties?.bearing || 0,
					format: pdfContext.format.toLowerCase(),
					orientation: pdfContext.orientation,
				})
				.then((res) => res.createPdf())
				.then((res) => {
					if (typeof props.onCreatePdf === 'function') {
						props.onCreatePdf(res);
					}
					return res.downloadPdf();
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}, [mapHook.map, pdfContext]);

	const formControlStyles = useMemo(
		() => {
			return {
				margin: '5px 0 15px 0 ',
				//...props.formControlStyles,
			};
		},
		[
			/*props.formControlStyles*/
		]
	);

	return (
		<>
			<FormControl fullWidth sx={formControlStyles}>
				<InputLabel id="format-select-label">Format</InputLabel>
				<Select
					labelId="format-select-label"
					id="format-select"
					label="Format"
					value={pdfContext.format}
					onChange={(event) => {
						pdfContext.setFormat?.(event.target.value);
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
					value={pdfContext.orientation}
					onChange={(event) => {
						pdfContext.setOrientation?.(event.target.value);
					}}
				>
					<FormControlLabel value="portrait" control={<Radio />} label="Portrait" />
					<FormControlLabel value="landscape" control={<Radio />} label="Landscape" />
				</RadioGroup>
			</FormControl>
			<FormControl fullWidth sx={formControlStyles}>
				<InputLabel id="quality-select-label">Quality</InputLabel>
				<Select
					labelId="quality-select-label"
					id="quality-select"
					label="Qualität"
					value={pdfContext.quality}
					onChange={(event) => {
						pdfContext.setQuality?.(event.target.value);
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
				<Button variant="contained" onClick={createPdfHandler}>
					PDF erstellen
				</Button>
			</FormControl>
			<PdfPreview orientation={pdfContext.orientation} geojsonRef={pdfContext.geojsonRef} />
		</>
	);
}

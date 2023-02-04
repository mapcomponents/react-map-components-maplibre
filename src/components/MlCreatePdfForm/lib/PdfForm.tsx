import React, { useContext, useMemo, useCallback, useState } from 'react';
import PdfContext from './PdfContext';
import PdfPreview from './PdfPreview';
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
	CircularProgress,
} from '@mui/material';

import useMap from '../../../hooks/useMap';
import useExportMap from '../../../hooks/useExportMap';
import { createPdfResolverParams } from '../../../hooks/useExportMap/lib';

import * as turf from '@turf/turf';

import templates from './pdf.templates';
import { PdfPreviewOptions } from './pdfContext';

const scaleOptions = [
	{
		value: 0,
		label: 'free scale',
	},
	{
		value: 250,
		label: '1/250',
	},
	{
		value: 500,
		label: '1/500',
	},
	{
		value: 750,
		label: '1/750',
	},
	{
		value: 1000,
		label: '1/1000',
	},
	{
		value: 1500,
		label: '1/1500',
	},
	{
		value: 2000,
		label: '1/2000',
	},
	{
		value: 10000,
		label: '1/10000',
	},
	{
		value: 100000,
		label: '1/100000',
	},
];
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
	onCreatePdf?: (options: createPdfResolverParams) => createPdfResolverParams;
}

export default function PdfForm(props: PdfFormProps) {
	const [loading, setLoading] = useState(false);
	const pdfContext = useContext(PdfContext);
	const mapHook = useMap({
		// eslint-disable-next-line react/prop-types
		mapId: props.mapId,
	});
	const mapExporter = useExportMap({ mapId: props.mapId });

	const createPdfHandler = useCallback(() => {
		if (
			mapHook.map &&
			mapExporter.createExport &&
			pdfContext.template &&
			pdfContext.format &&
			pdfContext.options?.orientation &&
			pdfContext.geojsonRef?.current?.bbox &&
			pdfContext.geojsonRef?.current
		) {
			setLoading(true);
			const bbox = turf.bbox(pdfContext.geojsonRef.current);

			mapExporter
				.createExport({
					width: pdfContext.template.width,
					height: pdfContext.template.height,
					bbox: bbox,
					bboxUnrotated: pdfContext.geojsonRef.current.bbox,
					bearing: (pdfContext.geojsonRef.current?.properties?.bearing as number) || 0,
					format: pdfContext.format.toLowerCase(),
					orientation: pdfContext.options.orientation,
				})
				.then((res) => res.createPdf())
				.then((res) => {
					if (typeof props.onCreatePdf === 'function') {
						props.onCreatePdf(res);
					}
					setLoading(false);
					return res.downloadPdf();
				})
				.catch((error) => {
					console.log(error);
					setLoading(false);
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
					value={pdfContext.options?.orientation}
					onChange={(event) => {
						if (!pdfContext.setOptions) return;

						pdfContext.setOptions((val: PdfPreviewOptions) => ({
							...val,
							orientation: event.target.value as 'landscape' | 'portrait',
						}));
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
				<InputLabel id="quality-select-label">Scale</InputLabel>
				<Select
					labelId="quality-select-label"
					id="quality-select"
					label="Qualität"
					value={pdfContext?.options?.fixedScale}
					onChange={(event) => {
						pdfContext.setOptions?.((val) => ({
							...val,
							fixedScale: event.target.value as number,
						}));
					}}
				>
					{scaleOptions.map((el, idx) => (
						<MenuItem key={idx} value={el.value}>
							{el.label}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<FormControl fullWidth sx={formControlStyles}>
				<Button
					variant="contained"
					className="createPdfButton"
					onClick={createPdfHandler}
					disabled={loading}
				>
					PDF erstellen
				</Button>
				{loading && (
          <CircularProgress
            size={24}
            sx={{
              color: 'primary.main',
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
            }}
          />
        )}
			</FormControl>
			{pdfContext.options && pdfContext.setOptions && (
				<PdfPreview
					options={pdfContext.options}
					setOptions={pdfContext.setOptions}
					geojsonRef={pdfContext.geojsonRef}
				/>
			)}
		</>
	);
}

import React, { useContext, useMemo, useCallback, useState } from 'react';
import PdfContext from './PdfContext';
import { FormControl, Button, CircularProgress, useMediaQuery } from '@mui/material';

import useMap from '../../../hooks/useMap';
import useExportMap from '../../../hooks/useExportMap';
import { createPdfResolverParams } from '../../../hooks/useExportMap/lib';

import * as turf from '@turf/turf';

interface CreatePdfButtonProps {
	/**
	 * Id of the target MapLibre instance in mapContext
	 */
	mapId?: string;
	onCreatePdf?: (options: createPdfResolverParams) => createPdfResolverParams;
}

export default function CreatePdfButton(props: CreatePdfButtonProps) {
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

	const mediaIsMobile = useMediaQuery('(max-width: 950px)');

	const formControlStyles = useMemo(
		() => {
			return {
				margin: mediaIsMobile ? '1px 0 8px 0 ' : '5px 0 15px 0 ',
				//...props.formControlStyles,
			};
		},
		[
			/*props.formControlStyles*/
		]
	);

	return (
		<FormControl fullWidth sx={formControlStyles}>
			<Button
				variant="contained"
				className="createPdfButton"
				onClick={createPdfHandler}
				disabled={loading}
				sx={{ marginBottom: '16px' }}
			>
				create PDF
			</Button>
			{loading && (
				<CircularProgress
					size={24}
					sx={{
						color: 'primary.main',
						position: 'absolute',
						top: '25%',
						left: '50%',
						marginTop: '-12px',
						marginLeft: '-12px',
					}}
				/>
			)}
		</FormControl>
	);
}

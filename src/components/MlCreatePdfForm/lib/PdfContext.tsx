import React, { useState, useRef, useMemo, MutableRefObject } from 'react';
import templates from './pdf.templates';
import { AllGeoJSON } from '@turf/turf';
import { PdfPreviewOptions } from './pdfContext';
import { GeoJSONFeature } from 'maplibre-gl';

interface PdfContextInterface {
	options: PdfPreviewOptions;
	setOptions: (arg1: (val: PdfPreviewOptions) => PdfPreviewOptions) => void;
	format: string;
	setFormat: (format: string) => void;
	quality: string;
	setQuality: (quality: string) => void;
	orientation: string;
	setOrientation: (orientation: string) => void;
	geojsonRef: MutableRefObject<
		| {
				type: 'Feature';
				bbox: [number, number, number, number];
				geometry: { type: 'Polygon'; coordinates: number[] };
				properties: { bearing: number };
		  }
		| undefined
	>;
	template: { width: number; height: number };
}

const PdfContext = React.createContext<Partial<PdfContextInterface>>({});

const defaultTemplate = templates['A4']['72dpi'];
const PdfContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [format, setFormat] = useState('A4');
	const [quality, setQuality] = useState('72dpi');
	const [options, setOptions] = useState({
		center: undefined,
		scale: undefined,
		rotate: 0,
		width: 210,
		height: 297,
		orientation: 'portrait',
		fixedScale: 0,
	});

	const geojsonRef = useRef();

	const template = useMemo(() => {
		if (typeof templates[format][quality] !== 'undefined') {
			return options.orientation === 'portrait'
				? templates[format][quality]
				: {
						width: templates[format][quality].height,
						height: templates[format][quality].width,
				  };
		}
		return defaultTemplate;
	}, [format, quality, options.orientation]);

	const value = {
		options,
		setOptions,
		format,
		setFormat,
		quality,
		setQuality,
		geojsonRef,
		template,
	};

	// eslint-disable-next-line
	// @ts-ignore:
	return <PdfContext.Provider value={value}>{children}</PdfContext.Provider>;
};

export { PdfContextProvider };
export default PdfContext;

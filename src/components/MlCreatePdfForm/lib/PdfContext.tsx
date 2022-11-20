import React, { useState, useRef, useMemo, MutableRefObject } from 'react';
import templates from './pdf.templates';
import {  AllGeoJSON } from '@turf/turf';

interface PdfContextInterface {
	format: string;
	setFormat: (format: string) => void;
	quality: string;
	setQuality: (quality: string) => void;
	orientation: string;
	setOrientation: (orientation: string) => void;
	geojsonRef: MutableRefObject<AllGeoJSON | undefined>;
	template: { width: number; height: number };
}

const PdfContext = React.createContext<Partial<PdfContextInterface>>({});

const defaultTemplate = templates['A4']['72dpi'];
const PdfContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [format, setFormat] = useState('A4');
	const [quality, setQuality] = useState('72dpi');
	const [orientation, setOrientation] = useState('portrait');

	const geojsonRef = useRef();
	const zoomRef = useRef();

	const template = useMemo(() => {
		if (typeof templates[format][quality] !== 'undefined') {
			return orientation === 'portrait'
				? templates[format][quality]
				: {
						width: templates[format][quality].height,
						height: templates[format][quality].width,
				  };
		}
		return defaultTemplate;
	}, [format, quality, orientation]);

	const value = {
		format,
		setFormat,
		quality,
		setQuality,
		orientation,
		setOrientation,
		geojsonRef,
		zoomRef,
		template,
	};

	return <PdfContext.Provider value={value}>{children}</PdfContext.Provider>;
};

export { PdfContextProvider };
export default PdfContext;

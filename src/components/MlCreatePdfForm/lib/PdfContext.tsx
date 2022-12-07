import React, { useState, useRef, useMemo } from 'react';
import templates from './pdf.templates';
import { PdfContextInterface, PdfPreviewOptions } from './pdfContext';


const PdfContext = React.createContext<PdfContextInterface>({} as PdfContextInterface);

const defaultTemplate = templates['A4']['72dpi'];
const PdfContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [format, setFormat] = useState('A4');
	const [quality, setQuality] = useState('72dpi');
	const [options, setOptions] = useState<PdfPreviewOptions>({
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

	return <PdfContext.Provider value={value}>{children}</PdfContext.Provider>;
};

export { PdfContextProvider };
export default PdfContext;

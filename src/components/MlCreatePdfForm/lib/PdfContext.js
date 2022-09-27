import React, { useState, useRef, useMemo } from "react";
import templates from './pdf.templates';

const PdfContext = React.createContext({});

// eslint-disable-next-line react/prop-types
const PdfContextProvider = ({ children }) => {
	const [format, setFormat] = useState('A4');
	const [quality, setQuality] = useState('72dpi');
	const [orientation, setOrientation] = useState('portrait');

	const geojsonRef = useRef();

	const template = useMemo(() => {
		return orientation === 'portrait'
			? templates[format][quality]
			: {
					width: templates[format][quality].height,
					height: templates[format][quality].width,
			  };
	}, [format, quality, orientation]);

	const value = {
    format,
    setFormat,
    quality,
    setQuality,
    orientation,
    setOrientation,
    geojsonRef,
    template,
	};

	return <PdfContext.Provider value={value}>{children}</PdfContext.Provider>;
};

export { PdfContextProvider };
export default PdfContext;
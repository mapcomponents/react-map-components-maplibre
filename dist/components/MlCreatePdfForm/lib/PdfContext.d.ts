import React, { MutableRefObject } from 'react';
import { Feature } from '@turf/turf';
interface PdfContextInterface {
    format: string;
    setFormat: (format: string) => void;
    quality: string;
    setQuality: (quality: string) => void;
    orientation: string;
    setOrientation: (orientation: string) => void;
    geojsonRef: MutableRefObject<Feature | undefined>;
    template: {
        width: number;
        height: number;
    };
}
declare const PdfContext: React.Context<Partial<PdfContextInterface>>;
declare const PdfContextProvider: ({ children }: {
    children: React.ReactNode;
}) => JSX.Element;
export { PdfContextProvider };
export default PdfContext;

import React from 'react';
import { PdfPreviewOptions } from './pdfContext';
import { Feature } from '@turf/turf';
type Props = {
    /**
     * Id of the target MapLibre instance in mapContext
     */
    mapId?: string;
    /**
     * Polygon GeoJson Feature representing the printing area
     */
    geojsonRef: React.MutableRefObject<Feature | undefined>;
    /**
     * a state variable containing the PDF previews current state
     */
    options: PdfPreviewOptions;
    /**
     * setter function to update the current PDF preview state
     */
    setOptions: (arg1: (val: PdfPreviewOptions) => PdfPreviewOptions) => void;
};
/**
 * PdfPreview component renders a transformable (drag, scale, rotate) preview of the desired export or print content
 */
export default function PdfPreview(props: Props): JSX.Element;
export {};

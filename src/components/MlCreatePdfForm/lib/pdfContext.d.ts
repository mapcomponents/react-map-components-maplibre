import { Feature } from '@turf/turf';
export interface PdfPreviewOptions {
	center: [number, number] | undefined;
	scale: [number, number] | undefined;
	rotate: number;
	width: number;
	height: number;
	fixedScale?: number | false;
	orientation: 'portrait' | 'landscape';
}

export interface PdfContextInterface {
	options: PdfPreviewOptions;
	setOptions: (arg1: (val: PdfPreviewOptions) => PdfPreviewOptions) => void;
	format: string;
	setFormat: (format: string) => void;
	quality: string;
	setQuality: (quality: string) => void;

	geojsonRef: MutableRefObject<Feature | undefined>;
	template: { width: number; height: number };
}

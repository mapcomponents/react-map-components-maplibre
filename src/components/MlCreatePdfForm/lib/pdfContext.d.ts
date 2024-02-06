import { Feature } from '@turf/turf';
export interface PdfPreviewOptions {
	center: [number, number] | undefined;
	scale: [number, number] | undefined;
	rotate: number;
	width: number;
	height: number;
	fixedScale?: number | false;
	orientation: 'portrait' | 'landscape';
	title: string | undefined;
	comment: string | undefined;
}

export interface PdfContextInterface {
	options: PdfPreviewOptions;
	setOptions: (arg1: (val: PdfPreviewOptions) => PdfPreviewOptions) => void;
	format: string;
	setFormat: (format: string) => void;
	quality: string;
	setQuality: (quality: string) => void;
	title: string;
	setTitle: (title: string) => void;
	comment: string;
	setComment: (comment: string) => void;

	geojsonRef: MutableRefObject<Feature | undefined>;
	template: { width: number; height: number };
}

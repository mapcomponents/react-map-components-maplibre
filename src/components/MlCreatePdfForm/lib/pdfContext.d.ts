export interface PdfPreviewOptions {
	center: [number, number] | undefined;
	scale: [number, number] | undefined;
	rotate: number;
	width: number;
	height: number;
	fixedScale?: number | false;
	orientation: 'portrait' | 'landscape';
}

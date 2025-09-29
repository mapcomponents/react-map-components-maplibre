import { Map } from 'maplibre-gl';
import { default as jsPDF } from 'jspdf';
import { default as MapLibreGlWrapper } from '../../components/MapLibreMap/lib/MapLibreGlWrapper';
import { BBox } from 'geojson';
interface createExportOptions {
    map: MapLibreGlWrapper;
    width: number;
    height: number;
    bbox: BBox;
    bboxUnrotated: BBox;
    bearing: number;
    format: string;
    orientation: string;
}
export type { createExportOptions };
declare const createExport: (options: createExportOptions) => Promise<createExportResolverParams>;
interface createExportResolverParams extends createExportOptions {
    createPdf: (_options?: createJsPdfOptions) => Promise<createPdfResolverParams>;
    createPng: (_options?: createPngOptions) => Promise<createPngResolverParams>;
    renderMap: Map;
    hiddenContainer: HTMLDivElement;
}
export type { createExportResolverParams };
interface createJsPdfOptions extends createExportOptions {
    renderMap: Map;
    hiddenContainer: HTMLDivElement;
}
export type { createJsPdfOptions };
interface createPdfResolverParams extends createJsPdfOptions {
    formData: FormData;
    pdf: jsPDF;
    downloadPdf: (_options?: downloadPdfOptions) => Promise<downloadPdfOptions>;
}
interface downloadPdfOptions extends createJsPdfOptions {
    pdf: jsPDF;
}
export type { createPdfResolverParams };
interface createPngOptions extends createExportOptions {
    renderMap: Map;
    hiddenContainer: HTMLDivElement;
}
export type { createPngOptions };
interface createPngResolverParams extends createPngOptions {
    png: string;
    downloadPng: (_options?: downloadPngOptions) => Promise<downloadPngOptions>;
}
export type { createPngResolverParams };
interface downloadPngOptions extends createPngOptions {
    png: string;
    name?: string;
}
export { createExport };
//# sourceMappingURL=lib.d.ts.map
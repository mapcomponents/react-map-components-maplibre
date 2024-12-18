/// <reference types="react" />
import { createPdfResolverParams } from '../../../hooks/useExportMap/lib';
interface PdfFormProps {
    /**
     * Id of the target MapLibre instance in mapContext
     */
    mapId?: string;
    onCreatePdf?: (options: createPdfResolverParams) => createPdfResolverParams;
}
export default function PdfForm(props: PdfFormProps): JSX.Element;
export {};

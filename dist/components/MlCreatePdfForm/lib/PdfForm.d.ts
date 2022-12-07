import { createPdfResolverParams } from '../../../hooks/exportMap/lib';
interface PdfFormProps {
    /**
     * Id of the target MapLibre instance in mapContext
     */
    mapId?: string;
    onCreatePdf?: (options: createPdfResolverParams) => createPdfResolverParams;
}
export default function PdfForm(props: PdfFormProps): JSX.Element;
export {};

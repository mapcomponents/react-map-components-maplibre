/// <reference types="react" />
interface PdfPreviewProps {
    /**
     * Id of the target MapLibre instance in mapContext
     */
    mapId?: string;
    /**
     * Id of an existing layer in the mapLibre instance to help specify the layer order
     * This layer will be visually beneath the layer with the "insertBeforeLayer" id.
     */
    insertBeforeLayer?: string;
}
export default function PdfPreview(props: PdfPreviewProps): JSX.Element;
export {};

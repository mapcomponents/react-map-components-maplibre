import { default as React } from '../../../../../../node_modules/.pnpm/react@19.1.0/node_modules/react';
import { SxProps } from '@mui/material';
import { createPdfResolverParams } from '../../../hooks/useExportMap/lib';
export interface PdfFormProps {
    /**
     * Id of the target MapLibre instance in mapContext
     */
    mapId?: string;
    /**
     * Function that will be called before the PDF is created.
     * Allowing to access and manipulate the jspdf instance before the PDF is created.
     */
    onCreatePdf?: (options: createPdfResolverParams) => createPdfResolverParams;
    /**
     * sx props that will be applied to the form control components
     */
    formControlStyles?: SxProps;
    /**
     * Define additional form fields that will be added to the bottom of the create-PDF form.
     * Values of form elements added this way are accessible inside the function passed to the onCreatePdf property using options.formData.get('{form_el_name}').
     * Make sure all form elements added this way have a name property defined to be able to access the value when rendering the PDF.
     */
    additionalFields?: React.ReactNode;
}
export default function PdfForm(props: PdfFormProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=PdfForm.d.ts.map
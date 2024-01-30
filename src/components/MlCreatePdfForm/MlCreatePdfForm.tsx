import React from 'react';
import PdfForm from './lib/PdfForm';
import { PdfContextProvider } from './lib/PdfContext';
import { createPdfResolverParams } from '../../hooks/useExportMap/lib';
import { SxProps } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

interface MlCreatePdfFormProps {
	/**
	 * Id of the target MapLibre instance in mapContext
	 */
	mapId?: string;
	/**
	 * sx props that will be applied to the form control components
	 */
	formControlStyles?: SxProps;
	/**
	 * Function that will be called before the PDF is created.
	 * Allowing to access and manipulate the jspdf instance before the PDF is created.
	 */
	onCreatePdf?: (options: createPdfResolverParams) => createPdfResolverParams;
}

export type { MlCreatePdfFormProps };

/**
 * Create PDF Form Component
 *
 */

const MlCreatePdfForm = (props: MlCreatePdfFormProps) => {
	return (
		<>
			<PdfContextProvider>
				<PdfForm />
			</PdfContextProvider>
		</>
	);
};

MlCreatePdfForm.defaultProps = {
	mapId: undefined,
};
export default MlCreatePdfForm;

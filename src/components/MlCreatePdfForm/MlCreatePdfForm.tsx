import React from 'react';
import PdfForm, { PdfFormProps } from './lib/PdfForm';
import { PdfContextProvider } from './lib/PdfContext';


/**
 * Create PDF Form Component
 *
 */
const MlCreatePdfForm = (props: PdfFormProps) => {
	return (
		<>
			<PdfContextProvider>
				<PdfForm {...props} />
			</PdfContextProvider>
		</>
	);
};

MlCreatePdfForm.defaultProps = {
	mapId: undefined,
};
export default MlCreatePdfForm;

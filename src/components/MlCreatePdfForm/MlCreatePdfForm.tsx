import React, { useState, useMemo, useRef, useCallback } from 'react';
import PdfPreview from './lib/PdfPreview';
import PdfForm from './lib/PdfForm';
import { PdfContextProvider } from './lib/PdfContext';

interface MlCreatePdfFormProps {
	/**
	 * Id of the target MapLibre instance in mapContext
	 */
	mapId?: string;
	/**
	 * Id of an existing layer in the mapLibre instance to help specify the layer order
	 * This layer will be visually beneath the layer with the "insertBeforeLayer" id.
	 */
	insertBeforeLayer?: string;
	formControlStyles?: any;
}

/**
 * Create PDF Form Component
 *
 */
const MlCreatePdfForm = (props: MlCreatePdfFormProps) => {

	return (
		<>
			<PdfContextProvider>
			  <PdfForm />
				<PdfPreview  />
			</PdfContextProvider>
		</>
	);
};

MlCreatePdfForm.defaultProps = {
	mapId: undefined,
};
export default MlCreatePdfForm;

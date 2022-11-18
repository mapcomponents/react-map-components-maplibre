import React from 'react';
import PdfPreview from './lib/PdfPreview';
import PdfForm from './lib/PdfForm';
import { PdfContextProvider } from './lib/PdfContext';
import { createPdfResolverParams } from '../../hooks/useExportMap/lib';
import { SxProps } from '@mui/material';

interface MlCreatePdfFormProps {
	/**
	 * Id of the target MapLibre instance in mapContext
	 */
	mapId?: string;
	formControlStyles?: SxProps;
	onCreatePdf?: (options:createPdfResolverParams) => createPdfResolverParams;
	excludeLayerIds?: Array<string>;
	includeLayerIds?: Array<string>;
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
				<PdfForm {...props} />
				<PdfPreview />
			</PdfContextProvider>
		</>
	);
};

MlCreatePdfForm.defaultProps = {
	mapId: undefined,
};
export default MlCreatePdfForm;

import React, { useState } from 'react';
import PdfForm, {
	PdfFormProps,
} from '@mapcomponents/react-maplibre/src/components/MlCreatePdfForm/lib/PdfForm';
import { PdfContextProvider } from '@mapcomponents/react-maplibre/src/components/MlCreatePdfForm/lib/PdfContext';
import { Dialog, DialogContent, DialogTitle, Button, Paper } from '@mui/material';
import Draggable from 'react-draggable';
import '@mapcomponents/react-maplibre/src/components/MlCreatePdfForm/lib/preview.css';

const PaperComponent = (props: object) => {
	const nodeRef = React.useRef<HTMLDivElement>(null);

	return (
		<Draggable
			nodeRef={nodeRef as React.RefObject<HTMLDivElement>}
			handle="#draggable-dialog-title"
			cancel={'[class*="MuiDialogContent-root"]'}
		>
			<Paper {...props} ref={nodeRef} />
		</Draggable>
	);
};

interface CreatePdfFormStationComponentProps extends PdfFormProps {
	/**
	 * Show button to toggle PDF form display
	 */
	showButton?: boolean;
}

const CreatePdfFormStationComponent = (props: CreatePdfFormStationComponentProps) => {
	const { showButton = true, ...pdfFormProps } = props;

	const [open, setOpen] = useState(false);

	const handleToggle = () => {
		setOpen(!open);
	};

	return (
		<>
			{showButton && (
				<Button
					variant={open ? 'contained' : 'outlined'}
					onClick={handleToggle}
					sx={{ margin: '8px' }}
				>
					PDF
				</Button>
			)}
			{open && (
				<Dialog
					open={open}
					onClose={() => setOpen(false)}
					hideBackdrop={true}
					PaperComponent={PaperComponent}
					aria-labelledby="draggable-dialog-title"
					disableScrollLock
					sx={{
						justifyContent: 'flex-start',
						minHeight: '40px',
						maxWidth: '300px',
					}}
				>
					<DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
						Create PDF
					</DialogTitle>
					<DialogContent>
						<PdfContextProvider>
							<PdfForm {...pdfFormProps} />
						</PdfContextProvider>
					</DialogContent>
				</Dialog>
			)}
		</>
	);
};

export default CreatePdfFormStationComponent;

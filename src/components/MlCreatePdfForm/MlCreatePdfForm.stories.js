import React, { useState } from 'react';

import MlCreatePdfForm from './MlCreatePdfForm';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';

import TopToolbar from '../../ui_components/TopToolbar';

import mapContextDecorator from '../../decorators/MapContextDecorator';
const PaperComponent = (props) => {
	return (
		<Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
			<Paper {...props} />
		</Draggable>
	);
};

const MlDialog = ({ title, children }) => {
	return (
		<Dialog
			open={true}
			hideBackdrop={true}
			PaperComponent={PaperComponent}
			aria-labelledby="draggable-dialog-title"
			sx={{
				justifyContent: 'flex-start',
				maxWidth: '300px',
			}}
		>
			<DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
				{title}
			</DialogTitle>
			<DialogContent>{children}</DialogContent>
		</Dialog>
	);
};

const storyoptions = {
	title: 'MapComponents/MlCreatePdfForm',
	component: MlCreatePdfForm,
	argTypes: {},
	decorators: mapContextDecorator,
};
export default storyoptions;

const Template = (args) => {
	const [showCreatePdfForm, setShowCreatePdfForm] = useState(false);

	return (
		<>
			<TopToolbar>
				<Button variant="contained" onClick={() => setShowCreatePdfForm(true)}>
					PDF
				</Button>
			</TopToolbar>
			{showCreatePdfForm && (
				<MlDialog title="Create PDF">
					<MlCreatePdfForm />
				</MlDialog>
			)}
		</>
	);
};
export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {};

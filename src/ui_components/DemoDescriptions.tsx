import React from 'react';
import { Box, Typography } from '@mui/material';

export interface DemoDescriptionItem {
	item: string,
	description: string;
	};


interface DemoDescriptionsProps {
	section: string;
	json: DemoDescriptionItem[];
	title: string;
}
function DemoDescriptions(props: DemoDescriptionsProps) {

	const itemToDisplay = ()=>{ return props.json.filter((el)=>el.item === props.section)}


	return (
	itemToDisplay()[0].description && (
			<>
				<Typography variant="h5" marginBottom={3}>{props.title}</Typography>
				<Typography variant="body1">{itemToDisplay()[0].description}</Typography>
				
			</>
		)
	);
}

export default DemoDescriptions;


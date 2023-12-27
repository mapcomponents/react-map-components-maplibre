import React, { useState } from 'react';
import { List, ListItem, Checkbox, Typography, Button } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';

interface OsmOptionsFomularProps {
	setter: any;
}

const optionFields = [
	'completeFeature',
	'allFeatures',
	'renderTagged',
	'excludeWay',
	'suppressWay',
];

function OsmOptionsFomular(props: OsmOptionsFomularProps) {
	const [open, setOpen] = useState<boolean>(false);

	return (
		<>
			<Typography> Options </Typography>
			<Button onClick={() => setOpen(!open)}>
				{open ? <IndeterminateCheckBoxIcon /> : <AddBoxIcon />}
			</Button>
			<List>
				{open &&
					optionFields?.map((el) => {
						return (
							<>
								<ListItem>
									<Typography> {el} </Typography>
									<Checkbox										
										onChange={(ev) => {
											const newObject = {};
											newObject[el] = ev.target.value === 'on' ? true : false;
											props.setter(newObject);
										}}
									/>
								</ListItem>
							</>
						);
					})}
			</List>
		</>
	);
}

export default OsmOptionsFomular;

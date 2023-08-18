import React, { useState } from 'react';
import { List, ListItem, TextField, Typography, Button } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';

interface CSVOptionsFormulaProps {
	setter: any;
}

const optionFields = ['latfield', 'lonfield', 'delimiter'];

function CSVOptionsFormular(props: CSVOptionsFormulaProps) {
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
								</ListItem>
								<ListItem>
									<TextField
										size="small"
										onChange={(ev) => {
											const newObject = {};
											newObject[el] = ev.target.value;
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

export default CSVOptionsFormular;

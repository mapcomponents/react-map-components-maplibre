import React from 'react';
import { List, ListItem, TextField, Typography } from '@mui/material';

interface CSVOptionsFormulaProps {
	setter: any;	
}

const optionFields=['latfield', 'lonfield', 'delimiter'];

function CSVOptionsFormular(props: CSVOptionsFormulaProps) {

	return (
		<>
			<List>
			{optionFields?.map((el) => {
					return (
						<>
							<ListItem>
								<Typography> {el} </Typography>
							</ListItem>
							<ListItem>
								<TextField
									onChange={(ev) => {
										const newObject = {}; 
										newObject[el] = ev.target.value
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

import React from 'react';
import { List, ListItem, Checkbox, Typography } from '@mui/material';


interface OsmOptionsFomularProps {
	setter: any;	
}

const optionFields=['completeFeature', 'allFeatures', 'renderTagged', 'excludeWay', 'suppressWay'];

function OsmOptionsFomular(props: OsmOptionsFomularProps) {

	return (
		<>
			<List>
			{optionFields?.map((el) => {
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

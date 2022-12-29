import React, {useState} from 'react';
import { Drawer, Typography, List, ListItem } from '@mui/material';

import useCreateWidget from './createWidget';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface userControlsProps {
	showOptions: boolean;
	step: number;
	minVal: number;
	maxVal: number;
	fadeIn: number;
	open: boolean;
	setFadeIn: Function;
	fadeOut: number;
	setFadeOut: Function;
	setStep: Function;
	featuresColor: string;
	setFeatureColor: Function;
	labels: boolean;
	setLabels: Function;
	labelColor: string;
	setlabelColor: Function;
	labelFadeIn: number;
	setLabelFadein: Function;
	labelFadeOut: number;
	setLabelFadeOut: Function;
	accumulate: boolean;
	setAccumulate: Function;
}

export default function UserControls(props: userControlsProps) {
	const featuresOptionsList = [
		{ id: 1, targetProp: 'fadeIn', type: 'slider', setter: props.setFadeIn, max: 15 },
		{ id: 2, targetProp: 'fadeOut', type: 'slider', setter: props.setFadeOut, max: 15 },
		{
			id: 3,
			targetProp: 'featuresColor',
			type: 'colorpicker',
			setter: props.setFeatureColor,
			max: 0,
		},
	];

	const labelsOptionsList = [
		{ id: 4, targetProp: 'labels', type: 'boolean', setter: props.setLabels, max: 0 },
		{ id: 5, targetProp: 'labelColor', type: 'colorpicker', setter: props.setlabelColor, max: 0 },
		{ id: 6, targetProp: 'labelFadeIn', type: 'slider', setter: props.setLabelFadein, max: 15 },
		{ id: 7, targetProp: 'labelFadeOut', type: 'slider', setter: props.setLabelFadeOut, max: 15 },
	];

	const playerOptionsList = [
		{ id: 8, targetProp: 'accumulate', type: 'boolean', setter: props.setAccumulate, max: 0 },
		{ id: 9, targetProp: 'step', type: 'numberfield', setter: props.setStep, max: 0 },
	];

	const accordions = [
		{ key: 'Features', list: featuresOptionsList },
		{ key: 'Labels', list: labelsOptionsList },
		{ key: 'Player', list: playerOptionsList },


	];const [expanded, setExpanded] = useState('panel1');

	/*
	const handleChange = (panel: string) => (event, newExpanded) => {
		setExpanded(newExpanded ? panel : false);
	  };
*/
	function Sublists(): JSX.Element {
		return (
			<>
				{accordions.map((el, index) => {


					return (
						<>
							<Accordion key={index}
							 //expanded={expanded === 'panel1'} onChange={handleChange('panel'+ (index+1))}
								sx={{width: '100%'}} 
								onClick={(ev)=>ev.preventDefault() }>
								<AccordionSummary key={index} 
								 expandIcon={<ExpandMoreIcon />}
								>
									<Typography> {el.key} </Typography>
								</AccordionSummary>
								<AccordionDetails>
									<List>
										{el.list.map((el) => {
											return (
												<ListItem
													key={el.id}
													sx={{
														boxShadow: 'inset 0px 0px 10px rgb(50 50 50 / 10%)',
														borderRadius: '5px',
													}}
												>
													{useCreateWidget(el.type, el.targetProp, el.setter, el.max, props)}
												</ListItem>
											);
										})}
									</List>
								</AccordionDetails>
							</Accordion>
						</>
					);
				})}
			</>
		);
	}

	return (
		<Drawer
			anchor="bottom"
			open={props.showOptions}
			variant="persistent"
			sx={{
				flexShrink: 0,

				'& .MuiDrawer-paper': {
					width: '25%',
					height: 'auto',
					alignItems: 'center',
					marginLeft: '4%',
					marginBottom: '80px',
					
				},
			}}
		>
			<Sublists />
		</Drawer>
	);
}


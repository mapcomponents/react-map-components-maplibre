import React, { useState,  } from 'react';
import { Drawer, Typography, List, ListItem, Collapse, IconButton, Grid, useMediaQuery } from '@mui/material';
import useCreateWidget from './createWidget';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { ClickAwayListener } from '@mui/base';


export interface userControlsProps {
	showOptions: boolean;
	onClose: React.Dispatch<React.SetStateAction<boolean>>;
	step: number;
	minVal: number;
	maxVal: number;
	sections: {
		key: string;
		list: {
			id: number;
			targetProp: string;
			type: string;
			setter: Function;
			max: number;
		}[];
	}[]
}

interface optionsList {
	id: number;
	targetProp: string;
	type: string;
	setter: () => void;
	max: number;
}

export default function UserControls(props: userControlsProps) {

	
	const [expanded, setExpanded] = useState('');
	const mediaIsMobile = useMediaQuery("(max-width:900px)");

			
	const handleExpander = (str: string) => {
		if (str === expanded) {
			setExpanded('');
		} else {
			setExpanded(str);
		}
	};

	function Sublists(): JSX.Element {
		return (
			<>
				{props.sections?.map((el) => {
					return (								
								<Grid container sx={{padding: '20px'}} key={el.key}>
									<Grid item xs={10}>
										<Typography> {el.key} </Typography>
									</Grid>
									<Grid item xs={2}>
										<IconButton  onClick={() => handleExpander(el.key)}>
											{expanded === el.key ? <ExpandMore /> : <ExpandLess />}
										</IconButton>
									</Grid>
									<Grid item xs={12}>
										<List >
											{el.list?.map((element: optionsList, index) => {
												return (
													<Collapse in={expanded === el.key} key={el.key + "_collapse" + index}>
														<ListItem
															key={element.id}
															sx={{
																boxShadow: 'inset 0px 0px 10px rgb(50 50 50 / 10%)',
																borderRadius: '5px',
															}}
														>
															{useCreateWidget(
																element.type,
																element.targetProp,
																element.setter,
																element.max,
																props
															)}
														</ListItem>
													</Collapse>
												);
											})}
										</List>
									</Grid>
								</Grid>
						
				
					);
				})}
			</>
		);
	}

	return (
		<>
		<ClickAwayListener
        mouseEvent="onMouseDown"
        touchEvent="onTouchStart"
        onClickAway={() => props.showOptions && props.onClose(false)}
      >
		<Drawer
			anchor="bottom"
			open={props.showOptions}
			variant="persistent"			
			sx={{
				flexShrink: 0,

				'& .MuiDrawer-paper': {
					width: mediaIsMobile? '70%': '25%',
					height: 'auto',
					alignItems: 'center',
					marginLeft: '4%',
					marginBottom: '80px',
				},
			}}
		>
			<Sublists />
		</Drawer>
		</ClickAwayListener>
		</>
	);
}

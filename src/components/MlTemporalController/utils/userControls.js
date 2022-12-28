import React from 'react';
import { Drawer, Slider, Typography } from '@mui/material';

export default function UserControls(props) {

	return (
		<Drawer
			anchor="bottom"
			open={props.showOptions}
			variant="persistent"
			sx={{
				flexShrink: 0,
					
				

				'& .MuiDrawer-paper': {
					width: '20%',
					height: '240px',
					alignItems: 'center',
					marginLeft: '4%',
					padding: 5,	
				},
			}}
		>
      <Typography id={'fadeIn_setter'}>
					Fade In
				</Typography>
			<Slider 
      value={props.fadeIn}
	  size={'small'}
      defaultValue={props.fadeIn}
      max={15}
      onChange={(e)=>props.setFadeIn(e.target.value)}
      />
		</Drawer>
	);
}

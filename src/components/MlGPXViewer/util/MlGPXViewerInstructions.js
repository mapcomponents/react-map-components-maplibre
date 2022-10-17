import React from 'react';
import { Button, Paper, Icon, Typography } from '@mui/material';
import { color, fontSize } from '@mui/system';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import zIndex from '@mui/material/styles/zIndex';
import MlGPXDemoViewer from '../util/demoViewer';


export default function MlGPXViewerInstructions() {
	return (
        <>
        <Button variant="contained" sx={{zIndex: 1600}}> Guide me through</Button>
        
		<div
			style={{
				width: 450,
				height: 450,
				position: 'fixed',
				right: '5px',
				bottom: '25px',
				display: 'block',
				flexDirection: 'column',
				gap: '5px',
				zIndex: 900,
				borderRadius: 360,
				right: -120,
				bottom: -120,
				backgroundColor: "steelblue",
                alignItems:"center" ,
			}}
		>
			<h3 style={{marginTop:100, marginLeft:100, color: "white", textAlign: "left"}}> You can load your own <br />
            GPX file here </h3>
            <ReplyAllIcon sx={{color:"white", fontSize:80, transform:"rotate(180deg)", marginTop:1, marginLeft:22}} />
		</div>
		<MlGPXDemoViewer />
        </> );
    
}

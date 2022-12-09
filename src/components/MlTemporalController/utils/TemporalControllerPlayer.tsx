import React, { useState, useEffect, useRef } from 'react';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import StopIcon from '@mui/icons-material/Stop';
import FastForwardIcon from '@mui/icons-material/FastForward';
import FastRewindIcon from '@mui/icons-material/FastRewind';

import { Slider, Drawer, Button, Grid } from '@mui/material';

interface TemporalControllerPlayerProps {
	currentVal: number;
	isPlaying: boolean;
	step: number;
	minVal: number;
	maxVal: number;
	returnCurrent: any;
	returnPlaying: any;
	open: boolean;
}

export default function TemporalControllerPlayer(props: TemporalControllerPlayerProps) {
	const [currentVal, setCurrentVal] = useState(props.currentVal);
	const [isPlaying, setIsPlaying] = useState(props.isPlaying);
	const range = props.maxVal - props.minVal;

	const intervalRef: any = useRef();

	useEffect(() => {
		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, []);

	useEffect(() => {
		props.returnCurrent(currentVal);
		props.returnPlaying(isPlaying);
	}, [currentVal, isPlaying]);

	const play = React.useCallback(() => {
		let counter = currentVal - props.minVal;
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
		}

		intervalRef.current = setInterval(function () {
			if (counter >= range) {
				clearInterval(intervalRef.current);
				setIsPlaying(false);
			} else {
				setCurrentVal((val) => val + props.step);
			}
			counter = counter + props.step;
		}, 200);
	}, [props.step, props.maxVal, currentVal]);

	const handlePlay = () => {
		setIsPlaying(true);
		play();
	};
	const handlePause = () => {
		setIsPlaying(!isPlaying);
		if (isPlaying) {
			clearInterval(intervalRef.current);
		} else if (!isPlaying) {
			play();
		}
	};

	const handleStop = () => {
		clearInterval(intervalRef.current);
		setCurrentVal(props.minVal);
		setIsPlaying(false);
	};

	const handleFastRewind = () => {
		if (isPlaying) {
			clearInterval(intervalRef.current);
			setCurrentVal(currentVal - range / 10);
			play();
		} else {
			setCurrentVal(currentVal - range / 10);
		}
	};
	const handleFastForward = () => {
		if (isPlaying) {
			clearInterval(intervalRef.current);
			setCurrentVal(currentVal + range / 10);
			play();
		} else {
			setCurrentVal(currentVal + range / 10);
		}
	};

	//Slider

	const handleChange = (e: any) => {
		if (!isPlaying) {
			setCurrentVal(e.target.value);
		} else {
			clearInterval(intervalRef.current);
			setCurrentVal(e.target.value);
			play();
		}
	};

	return (
		<>
			<Drawer
				anchor="bottom"
				open={props.open || true}
				variant="persistent"
				sx={{
					flexShrink: 0,

					'& .MuiDrawer-paper': {
						width: 'auto',
						height: 90,
						alignItems: 'center',
					},
				}}
			>
				<Grid>
					<Button onClick={handleFastRewind}>
						<FastRewindIcon />
					</Button>
					<Button onClick={handleStop}>
						<StopIcon />
					</Button>
					<Button onClick={handlePlay} disabled={isPlaying}>
						<PlayArrowIcon />
					</Button>
					<Button onClick={handlePause}>
						<PauseIcon />
					</Button>
					<Button onClick={handleFastForward}>
						<FastForwardIcon />
					</Button>
				</Grid>

				<Slider
					sx={{
						position: 'flex',
						width: '95%',
						paddingTop: '10px',
						alignSelf: 'center',
					}}
					aria-label="Custom marks"
					defaultValue={props.minVal}
					value={currentVal}
					step={props.step}
					onChange={handleChange}
					min={props.minVal}
					max={props.maxVal}
				/>
			</Drawer>
		</>
	);
}

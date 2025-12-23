import { useState } from 'react';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export interface ThreeObjectControlsProps {
	showLayer: boolean;
	setShowLayer: (show: boolean) => void;
	scale: number;
	setScale: (scale: number) => void;
	rotation: { x: number; y: number; z: number };
	setRotation: (rotation: { x: number; y: number; z: number }) => void;
	useMapCoords: boolean;
	setUseMapCoords: (use: boolean) => void;
	mapPosition: { lng: number; lat: number };
	setMapPosition: (position: { lng: number; lat: number }) => void;
	altitude: number;
	setAltitude: (altitude: number) => void;
	position: { x: number; y: number; z: number };
	setPosition: (position: { x: number; y: number; z: number }) => void;
	layerName?: string;
}

export const ThreeObjectControls = ({
	showLayer,
	setShowLayer,
	scale,
	setScale,
	rotation,
	setRotation,
	useMapCoords,
	setUseMapCoords,
	mapPosition,
	setMapPosition,
	altitude,
	setAltitude,
	position,
	setPosition,
	layerName = 'Layer',
}: ThreeObjectControlsProps) => {
	return (
		<Box sx={{ padding: '10px' }}>
			<Button
				color="primary"
				variant={showLayer ? 'contained' : 'outlined'}
				onClick={() => setShowLayer(!showLayer)}
				sx={{ marginBottom: '20px' }}
			>
				{showLayer ? 'Hide' : 'Show'} {layerName}
			</Button>
			<Button
				color="secondary"
				variant={useMapCoords ? 'contained' : 'outlined'}
				onClick={() => setUseMapCoords(!useMapCoords)}
				sx={{ marginBottom: '20px', marginLeft: '10px' }}
			>
				{useMapCoords ? 'Map Coords' : 'Scene Coords'}
			</Button>
			<Typography gutterBottom>Scale: {scale.toFixed(2)}</Typography>
			<Slider
				value={scale}
				onChange={(e, newValue) => setScale(newValue as number)}
				min={0.01}
				max={5}
				step={0.01}
				valueLabelDisplay="auto"
			/>
			<Typography gutterBottom>Rotation X: {rotation.x}°</Typography>
			<Slider
				value={rotation.x}
				onChange={(e, newValue) => setRotation({ ...rotation, x: newValue as number })}
				min={0}
				max={360}
				valueLabelDisplay="auto"
			/>
			<Typography gutterBottom>Rotation Y: {rotation.y}°</Typography>
			<Slider
				value={rotation.y}
				onChange={(e, newValue) => setRotation({ ...rotation, y: newValue as number })}
				min={0}
				max={360}
				valueLabelDisplay="auto"
			/>
			<Typography gutterBottom>Rotation Z: {rotation.z}°</Typography>
			<Slider
				value={rotation.z}
				onChange={(e, newValue) => setRotation({ ...rotation, z: newValue as number })}
				min={0}
				max={360}
				valueLabelDisplay="auto"
			/>
			{useMapCoords ? (
				<>
					<Typography gutterBottom>Longitude: {mapPosition.lng.toFixed(6)}</Typography>
					<Slider
						value={mapPosition.lng}
						onChange={(e, newValue) => setMapPosition({ ...mapPosition, lng: newValue as number })}
						min={7.09}
						max={7.11}
						step={0.0001}
						valueLabelDisplay="auto"
					/>
					<Typography gutterBottom>Latitude: {mapPosition.lat.toFixed(6)}</Typography>
					<Slider
						value={mapPosition.lat}
						onChange={(e, newValue) => setMapPosition({ ...mapPosition, lat: newValue as number })}
						min={50.73}
						max={50.74}
						step={0.0001}
						valueLabelDisplay="auto"
					/>
					<Typography gutterBottom>Altitude: {altitude} m</Typography>
					<Slider
						value={altitude}
						onChange={(e, newValue) => setAltitude(newValue as number)}
						min={-100}
						max={500}
						valueLabelDisplay="auto"
					/>
				</>
			) : (
				<>
					<Typography gutterBottom>Position X: {position.x}</Typography>
					<Slider
						value={position.x}
						onChange={(e, newValue) => setPosition({ ...position, x: newValue as number })}
						min={-100}
						max={100}
						valueLabelDisplay="auto"
					/>
					<Typography gutterBottom>Position Y: {position.y}</Typography>
					<Slider
						value={position.y}
						onChange={(e, newValue) => setPosition({ ...position, y: newValue as number })}
						min={-100}
						max={100}
						valueLabelDisplay="auto"
					/>
					<Typography gutterBottom>Position Z: {position.z}</Typography>
					<Slider
						value={position.z}
						onChange={(e, newValue) => setPosition({ ...position, z: newValue as number })}
						min={-500}
						max={100}
						valueLabelDisplay="auto"
					/>
				</>
			)}
		</Box>
	);
};

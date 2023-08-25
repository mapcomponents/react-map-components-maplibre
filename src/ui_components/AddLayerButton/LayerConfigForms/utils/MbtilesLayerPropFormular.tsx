import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Button, FormControl, InputLabel, TextField, Typography } from '@mui/material';
import { LayerSpecification } from 'maplibre-gl';

interface MbtilesLayerPropFormularProps {
	setter: Dispatch<SetStateAction<LayerSpecification[]>>;
}

const LayerSpecificationKeys = [
	'id',
	'type',
	'metadata',
	'source',
	'source-layer',
	'layout',
	'paint',
	'options',
];

export default function MbtilesLayerPropFormular(props: MbtilesLayerPropFormularProps) {
	const [layers, setLayers] = useState<LayerSpecification[]>([]);
	const newLayer = {
	id: undefined ,
	type: undefined,
	metadata: undefined ,
	source:undefined ,
	'source-layer':undefined ,
	layout: undefined,
	paint: undefined,
	options: undefined,
	};
	const toJSON = ['paint', 'layout', 'options', 'metadata'];

	console.log('newLayer:  ', JSON.stringify(newLayer));

	useEffect(() => {
		props.setter(layers);
	}, [layers]);

	const TextFields = () => {
		
		return (
			<>
				{LayerSpecificationKeys.map((key) => {
					return (
						<>
							<TextField
								label={key}
								onChange={(ev) =>
									newLayer[key] = ev.target.value
								}
							/>
						</>
					);
				})}
			</>
		);
	};

	function addLayer() {

		toJSON.map((key)=>{
			if (typeof newLayer[key] !== 'undefined'){
				try{
					newLayer[key] = JSON.parse(newLayer[key])
				} catch{
					alert("Invalid JSON format, try again")
				}
				
			}
			
		})

		setLayers((current) => {
			if (current.length > 0) {
				return [current, newLayer] as LayerSpecification[];
			} else {
				return [newLayer] as LayerSpecification[];
			}
		});
	}
	return (
		<>
			<FormControl fullWidth>
				<TextFields />
			</FormControl>
			<Button onClick={addLayer}> Add</Button>
		</>
	);
}

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Button, FormControl, TextField } from '@mui/material';
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
	};
	const toJSON = ['paint', 'layout', 'options', 'metadata'];


	useEffect(() => {
		props.setter(layers);
	}, [layers]);

	const TextFields = () => {
		
		return (
			<>
				{LayerSpecificationKeys.map((key) => {
					return (
						<React.Fragment key={key + '_fragment'}>
							<TextField
								label={key}
								onChange={(ev) =>
									newLayer[key] = ev.target.value
								}
							/>
						</React.Fragment>
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
				return [ newLayer, ...current] as LayerSpecification[];
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

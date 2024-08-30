import React, { useCallback, useEffect, useRef, useState } from 'react';

import MlHighlightFeature, { MlHighlightFeatureProps } from './MlHighlightFeature';

import mapContextDecorator from '../../decorators/MapContextDecorator';

import examplePolygons from '../MlGeoJsonLayer/assets/sample_1.json';
import exampleLines from './assets/sample_lines.json';
import examplePoints from './assets/sample_points.json';
import MlGeoJsonLayer from '../MlGeoJsonLayer/MlGeoJsonLayer';
import { Feature, FeatureCollection } from '@turf/turf';
import useMap from '../../hooks/useMap';
import TopToolbar from '../../ui_components/TopToolbar';
import { Button, Menu, MenuItem, Typography } from '@mui/material';

const storyoptions = {
	title: 'MapComponents/MlHighlightFeature',
	component: MlHighlightFeature,
	argTypes: {},
	decorators: mapContextDecorator,
};
export default storyoptions;

interface TemplateProps extends MlHighlightFeatureProps {
	type:
		| 'symbol'
		| 'circle'
		| 'fill'
		| 'line'
		| 'heatmap'
		| 'fill-extrusion'
		| 'hillshade'
		| 'background'
		| undefined;
	sample: FeatureCollection;
}

const configTitles = {
	circle: 'Highlight point geometries',
	line: 'Highlight line geometries',
	polygon: 'Highlight polygon geometries',
};

const Template = (props: TemplateProps) => {
	const [selectedFeatures, setSelectedFeatures] = useState<Feature[] | undefined>(props.features);
	const selectedId = useRef<number[]>([]);
	const mapHook = useMap({
		mapId: undefined,
	});
	const initializedRef = useRef(false);

	useEffect(() => {
		if (!mapHook.map || initializedRef.current) return;

		initializedRef.current = true;
		mapHook.map.map.flyTo({ center: [7.105175528281227, 50.73348799274236], zoom: 15 });
	}, [mapHook.map]);

	const handleClick = useCallback((event: any) => {
		const featureId = event.features[0].id;
		const featureExists = selectedId.current.includes(featureId);

		setSelectedFeatures((current) => {
			if (featureExists) {
				selectedId.current = selectedId.current.filter((id) => id !== featureId);
				return current?.filter((feature) => feature.id !== featureId);
			} else {
				selectedId.current.push(featureId);
				return [
					...(current || []),
					{
						type: event.features[0].type,
						geometry: event.features[0].geometry,
						id: featureId,
					} as Feature,
				];
			}
		});
	}, []);

	return (
		<>
			<MlHighlightFeature
				features={selectedFeatures}
				offset={props.offset}
				paint={props.paint}
				insertBeforeLayer={props.insertBeforeLayer}
				variant='dark'
			/>

			<MlGeoJsonLayer type={props.type} geojson={props.sample} onClick={handleClick}/>
		</>
	);
};

export const Polygon = Template.bind({});
Polygon.parameters = {};
Polygon.args = {
	sample: examplePolygons,
	type: 'fill',
	offset: -5,
	//paint: { 'line-color': "#3598DB" },
};

export const Line = Template.bind({});
Line.parameters = {};
Line.args = { sample: exampleLines, type: 'line'};

export const Circle = Template.bind({});
Circle.parameters = {};
Circle.args = { sample: examplePoints, type: 'circle', offset: 8 };

/// Catalogue Story

const catalogueTemplate = () => {
	const [selectedLayer, setSelectedLayer] = useState<string>('polygon');

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLayerSelect = (layer: string) => {
		setSelectedLayer(layer);
	};

	return (
		<>
			<TopToolbar
				unmovableButtons={
					<>
						<Typography variant="h6" color={'ButtonText'} marginRight={'20px'}>
							{configTitles[selectedLayer]}
						</Typography>

						<Button
							id="basic-button"
							variant="contained"
							aria-controls={open ? 'basic-menu' : undefined}
							aria-haspopup="true"
							aria-expanded={open ? 'true' : undefined}
							onClick={handleClick}
						>
							Example Configs
						</Button>
						<Menu
							id="basic-menu"
							anchorEl={anchorEl}
							open={open}
							onClose={handleClose}
							MenuListProps={{
								'aria-labelledby': 'basic-button',
							}}
						>
							<MenuItem onClick={() => handleLayerSelect('polygon')}>
								Polygon Configuration
							</MenuItem>
							<MenuItem onClick={() => handleLayerSelect('circle')}>Circle Configuration</MenuItem>
							<MenuItem onClick={() => handleLayerSelect('line')}>Line Configuration</MenuItem>
						</Menu>
						{selectedLayer === 'circle' && <Template {...Circle.args} />}
						{selectedLayer === 'line' && <Template {...Line.args} />}
						{selectedLayer === 'polygon' && <Template {...Polygon.args} />}
					</>
				}
			/>
		</>
	);
};

export const CatalogueDemo = catalogueTemplate.bind({});
CatalogueDemo.parameters = {};
CatalogueDemo.args = {};

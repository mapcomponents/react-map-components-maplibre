import React, { useState } from 'react';
import MlTemporalController, { MlTemporalControllerProps } from './MlTemporalController';
import temporalControllerDecorator from '../../decorators/LowZoomDecorator';
import { Typography, Button } from '@mui/material';
import TopToolbar from '../../ui_components/TopToolbar';
import african_independency from './assets/african_independency.json';
import earthq_5plus from './assets/earthq_5plus.json';
import jakobsweg from './assets/jackobsweg.json';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import useMap from '../../hooks/useMap';

const storyoptions = {
	title: 'MapComponents/MlTemporalController',
	component: MlTemporalController,
	argTypes: {},
	decorators: temporalControllerDecorator,
	parameters: {
		sourceLink: 'components/MlTemporalController/MlTemporalController.tsx',
	},
};
export default storyoptions;

const titels = {
	fill: 'African countries by independency year',
	line: 'St. James Trials in the North Rhein Region by stage number',
	circle: 'Earthquakes with 5 or more magnitude',
};

const Template = (props: MlTemporalControllerProps) => {
	const type = props.type || 'circle';

	return (
		<>
			<TopToolbar
				unmovableButtons={
					<Typography variant="h6" color={'ButtonText'}>
						{titels[type]}
					</Typography>
				}
			/>

			<MlTemporalController {...props} />
		</>
	);
};

const catalogueTemplate = () => {
	const [selectedConfig, setSelectedConfig] = useState<string>('Fill');
	const [titleNr, setTitleNr] = useState<number>(0);
	const mapHook = useMap({
		mapId: undefined,
	});

	const titels = [
		'African countries by independency year',
		'Earthquakes with 5 or more magnitude',
		'St. James Trials in the North Rhein Region by stage number',
	];

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleConfigSelect = (config: string) => {
		setSelectedConfig(config);
		if (config === 'Fill') {
			setTitleNr(0);
		}
		if (config === 'Circle') {
			setTitleNr(1);
		}
		if (config === 'Line') {
			setTitleNr(2);
			mapHook.map?.map.flyTo({ center: [7.0082, 51.1274], zoom: 7.2 });
		}
	};

	return (
		<>
			<TopToolbar
				unmovableButtons={
					<>
						<Typography variant="h6" color={'ButtonText'} marginRight="20px">
							{titels[titleNr]}
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
							<MenuItem onClick={() => handleConfigSelect('Fill')}>Fill Configuration</MenuItem>
							<MenuItem onClick={() => handleConfigSelect('Circle')}>Circle Configuration</MenuItem>
							<MenuItem onClick={() => handleConfigSelect('Line')}>Line Configuration</MenuItem>
						</Menu>
					</>
				}
			/>
			{selectedConfig === 'Fill' && (
				<MlTemporalController
					geojson={FillConfig.args.geojson}
					timeField={FillConfig.args.timeField}
					type={FillConfig.args.type}
					labelField={FillConfig.args.labelField}
					interval={FillConfig.args.interval}
					accumulate={FillConfig.args.accumulate}
					initialVal={FillConfig.args.initialVal}
					fitBounds={FillConfig.args.fitBounds}
					displayCurrentValue={FillConfig.args.displayCurrentValue}
					attribution={FillConfig.args.attribution}
				/>
			)}
			{selectedConfig === 'Circle' && (
				<MlTemporalController
					geojson={CircleConfig.args.geojson}
					type={CircleConfig.args.type}
					timeField={CircleConfig.args.timeField}
					labelField={CircleConfig.args.labelField}
					accumulate={CircleConfig.args.accumulate}
					step={CircleConfig.args.step}
					minVal={CircleConfig.args.minVal}
					fitBounds={CircleConfig.args.fitBounds}
					onClick={CircleConfig.args.onClick}
					displayCurrentValue={CircleConfig.args.displayCurrentValue}
					attribution={CircleConfig.args.attribution}
				/>
			)}
			{selectedConfig === 'Line' && (
				<MlTemporalController
					geojson={LineConfig.args.geojson}
					interval={LineConfig.args.interval}
					step={LineConfig.args.step}
					timeField={LineConfig.args.timeField}
					fadeIn={LineConfig.args.fadeIn}
					fadeOut={LineConfig.args.fadeOut}
					labelFadeIn={LineConfig.args.labelFadeIn}
					labelFadeOut={LineConfig.args.labelFadeOut}
					type={LineConfig.args.type}
					labelField={LineConfig.args.labelField}
					featuresColor={LineConfig.args.featuresColor}
					accumulate={LineConfig.args.accumulate}
					fitBounds={LineConfig.args.fitBounds}
					displayCurrentValue={LineConfig.args.displayCurrentValue}
					attribution={LineConfig.args.attribution}
				/>
			)}
		</>
	);
};

export const FillConfig = Template.bind({});
FillConfig.parameters = {};
FillConfig.args = {
	geojson: african_independency,
	path: 'african_independency.json',
	timeField: 'africa_independency_year',
	type: 'fill',
	labelField: 'africa_independency_year',
	interval: 150,
	accumulate: true,
	initialVal: 1904,
	fitBounds: true,
	displayCurrentValue: true,
	attribution: 'Made with Natural Earth.',
};

export const CircleConfig = Template.bind({});
CircleConfig.parameters = {};
CircleConfig.args = {
	geojson: earthq_5plus,
	type: 'circle',
	timeField: 'Year',
	labelField: 'LocationName',
	accumulate: false,
	step: 0.3,
	minVal: 1900,
	fitBounds: true,
	onClick: () => console.log('clicked'),
	displayCurrentValue: true,
	attribution:
		'National Geophysical Data Center / World Data Service (NGDC/WDS): NCEI/WDS Global Significant Earthquake Database. NOAA National Centers for Environmental Information. doi:10.7289/V5TD9V7K',
};

export const LineConfig = Template.bind({});
LineConfig.parameters = {};
LineConfig.args = {
	geojson: jakobsweg,
	interval: 150,
	step: 0.5,
	timeField: 'etape',
	fadeIn: 2,
	fadeOut: 2,
	labelFadeIn: 2,
	labelFadeOut: 2,
	type: 'line',
	labelField: 'name',
	featuresColor: 'red',
	accumulate: true,
	fitBounds: false,
	displayCurrentValue: true,
	attribution: 'Source: deutsche-jakobswege.de ',
};

export const CatalogueDemo = catalogueTemplate.bind({});
CatalogueDemo.parameters = {};
CatalogueDemo.args = {};

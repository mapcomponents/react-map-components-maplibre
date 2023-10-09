import React, { useState } from 'react';
import MlTemporalController, { MlTemporalControllerProps } from './MlTemporalController';
import temporalControllerDecorator from '../../decorators/LowZoomDecorator';
import { Typography, FormGroup, FormControlLabel, Switch } from '@mui/material';
import TopToolbar from '../../ui_components/TopToolbar';
import african_independency from './assets/african_independency.json';
import earthq_5plus from './assets/earthq_5plus.json';
import jakobsweg from './assets/jackobsweg.json';
import Sidebar from '../../ui_components/Sidebar';

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
	const [openSidebar, setOpenSidebar] = useState(true);

	const [selectedConfig, setSelectedConfig] = useState<string | undefined>();

	const handleConfigSelect = (config: string) => {
		if (config === selectedConfig) {
			setSelectedConfig(undefined);
		} else {
			setSelectedConfig(config);
		}
	};

	return (
		<>
			<Sidebar open={openSidebar} setOpen={setOpenSidebar} name={'Configuration Examples'}>
				<FormGroup>
					<FormControlLabel
						control={
							<Switch
								checked={selectedConfig === 'Fill'}
								onChange={() => handleConfigSelect('Fill')}
							/>
						}
						label="Fill Configuration"
					/>
					<FormControlLabel
						control={
							<Switch
								checked={selectedConfig === 'Circle'}
								onChange={() => handleConfigSelect('Circle')}
							/>
						}
						label="Circle Configuration"
					/>
					<FormControlLabel
						control={
							<Switch
								checked={selectedConfig === 'Line'}
								onChange={() => handleConfigSelect('Line')}
							/>
						}
						label="Line Configuration"
					/>
				</FormGroup>
			</Sidebar>
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
	fitBounds: true,
	displayCurrentValue: true,
	attribution: 'Source: deutsche-jakobswege.de ',
};

export const catalogueDemo = catalogueTemplate.bind({});
catalogueDemo.parameters = {};
catalogueDemo.args = {};

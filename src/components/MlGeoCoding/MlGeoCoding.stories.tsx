import React, { useEffect, useState } from 'react';

import MlGeoCoding from './MlGeoCoding';

import mapContextDecorator from '../../decorators/MapContextDecorator';

const storyoptions = {
	title: 'MapComponents/MlGeoCoding',
	component: MlGeoCoding,
	argTypes: {},
	decorators: mapContextDecorator,
	parameters: { docs: { source: { type: 'code' } } },
};

export default storyoptions;
interface TemplateProps {
	mapId: string;
	label: string;
}

const Template = (args: TemplateProps) => {
	interface AutoCompleteOptionType {
		title: string;
		lat: number;
		lng: number;
		id: string | number;
	}

	interface AddressType {
		railway: string;
		boundingbox: string[];
		class: string;
		display_name: string;
		importance: number;
		lat: string;
		licence: string;
		lon: string;
		name: string;
		osm_id: number;
		osm_type: string;
		place_id: number;
		place_rank: number;
		type: string;
	}

	const [searchValue, setSearchValue] = useState('');

	const [autoCompleteOptionArr, setAutoCompleteOptionArr] = useState<AutoCompleteOptionType[]>([
	
	]);

	useEffect(() => {
		const apiUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${searchValue},&limit=7`;

		searchValue &&
			fetch(apiUrl)
				.then((res) => res.json())
				.then((res: AddressType[]) => {
					console.log(res[0]);
					const optionsResArr = res.map((el) => ({
						title: el.display_name,
						lng: parseInt(el.lon),
						lat: parseInt(el.lat),
						id: el.place_id,
					}));
					setAutoCompleteOptionArr(optionsResArr);
				})
				.catch((err) => console.error(err));
	}, [searchValue]);

	return (
		<MlGeoCoding
			mapId={args.mapId}
			label={args.label}
			handleChangeVal={setSearchValue}
			autoCompleteOptionArr={autoCompleteOptionArr}
		/>
	);
};

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {
	mapId: 'map_1',
	label: 'Search',
};

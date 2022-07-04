import useSource from "./useSource";
import React from "react"

import mapContextDecorator from "../decorators/MapContextDecorator";
import MlGeoJsonLayer from "../components/MlGeoJsonLayer/MlGeoJsonLayer"
import wg_geojson from "./assets/pointWG.json"

const storyoptions = {
	title: "Hooks/UseSource",
	component: useSource,
	argTypes: {},
	decorators: mapContextDecorator,
};
export default storyoptions;

const Template = (args) => {
	const source = useSource({ ...args });
	console.log(source);
	return (
		<>
		</>
	);

}

export const useSourceExample = Template.bind({});

useSourceExample.args = {
	mapId: "map_1",
	sourceId: "my-source",
	data: wg_geojson,
	type: "geojson",
}


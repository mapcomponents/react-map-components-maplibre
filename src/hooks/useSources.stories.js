import useSource from "./useSource";
import React from "react"

import mapContextDecorator from "../decorators/MapContextDecorator";
import MlGeoJsonLayer from "../components/MlGeoJsonLayer/MlGeoJsonLayer"
import sample_geojson from "../components/MlGeoJsonLayer/assets/sample_1.json"
import wg_geojson from "./assets/pointWG.json"

const storyoptions = {
	title: "Hooks/UseSource",
	component: useSource,
	argTypes: {},
	decorators: mapContextDecorator,
};
export default storyoptions;

const Template = (args) => {
	useSource({ ...args });
	return (
		<>
			<MlGeoJsonLayer type="line" geojson={sample_geojson} />
		</>
	);

}

export const useSourceExample = Template.bind({});

useSourceExample.args = {
	mapId: "map_1",
	sourceId: "my-data",
	geojson: wg_geojson
}

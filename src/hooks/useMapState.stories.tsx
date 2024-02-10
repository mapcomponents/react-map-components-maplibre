import React, { FunctionComponent, useEffect } from "react";

import useMapState from "./useMapState";

import mapContextDecoratorHooks from "../decorators/MapContextDecoratorHooks";

interface StoryOptions {
	title: string;
	component: React.ComponentType<any>;
	argTypes: any;
	decorators: any;
}

const storyOptions: StoryOptions = {
	title: "Hooks/useMapState",
	component: useMapState as unknown as FunctionComponent<any>,
	argTypes: {},
	decorators: mapContextDecoratorHooks,
};

export default storyOptions;

const Template: React.FC<any> = (props) => {
	const mapState = useMapState({ ...props });

	useEffect(() => {
		// Your useEffect logic here
	}, [mapState.layers]);

	return (
		<>
			<div
				style={{
					position: "fixed",
					zIndex: 10000,
					display: "flex",
					flexWrap: "wrap",
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					maxHeight: '100VH',
					backgroundColor: "rgba(80,80,80,.8)",
					padding: "50px",
					fontSize: "20px",
					color: "#51ff09",
					overflow: 'hidden',
					pointerEvents: "none",
				}}
			>
				<pre>{JSON.stringify(mapState, null, "\t")}</pre>
			</div>
		</>
	);
};

export const ViewportOnly = Template.bind({});
ViewportOnly.parameters = {};
ViewportOnly.args = {
	mapId: "map_1",
	watch: {
		viewport: true,
		layers: false,
		sources: false,
	},
};

export const IncludeBaseLayers = Template.bind({});
IncludeBaseLayers.parameters = {};
IncludeBaseLayers.args = {
	mapId: "map_1",
	watch: {
		viewport: false,
		layers: true,
		sources: false,
	},
	filter: {
		includeBaseLayers: true,
	},
};

export const MatchLayerIdString = Template.bind({});
MatchLayerIdString.parameters = {};
MatchLayerIdString.args = {
	mapId: "map_1",
	watch: {
		viewport: false,
		layers: true,
		sources: false,
	},
	filter: {
		includeBaseLayers: true,
		matchLayerIds: "water",
	},
};

export const MatchLayerIdRegexp = Template.bind({});
MatchLayerIdRegexp.parameters = {};
MatchLayerIdRegexp.args = {
	mapId: "map_1",
	watch: {
		viewport: false,
		layers: true,
		sources: false,
	},
	filter: {
		includeBaseLayers: true,
		matchLayerIds: "water",
	},
};

export const NonBaseLayersOnly = Template.bind({});
NonBaseLayersOnly.parameters = {};
NonBaseLayersOnly.args = {
	mapId: "map_1",
	watch: {
		viewport: false,
		layers: true,
		sources: false,
	},
	filter: {
		includeBaseLayers: false,
	},
};

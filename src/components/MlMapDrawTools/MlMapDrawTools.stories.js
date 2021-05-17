import React from "react";

import MlMapDrawTools from "./MlMapDrawTools";

import TopToolbar from "../../ui_components/TopToolbar";

import mapContextDecorator from "../../decorators/MapContextDecorator";

const storyoptions = {
  title: "MapComponents/MlMapDrawTools",
  component: MlMapDrawTools,
  argTypes: {},
  decorators: mapContextDecorator,
};
export default storyoptions;

const Template = (args) => {
  return (
    <TopToolbar>
      <MlMapDrawTools />
    </TopToolbar>
  );
};

export const ExampleConfig = Template.bind({});

ExampleConfig.args = {
  //  colora: "#ffffff",
  //  options: {
  //    style: "https://wms.wheregroup.com/tileserver/style/osm-bright.json",
  //    center: [8.607, 53.1409349],
  //    maxBounds: [
  //      [1.40625, 43.452919],
  //      [17.797852, 55.973798],
  //    ],
  //  },
};

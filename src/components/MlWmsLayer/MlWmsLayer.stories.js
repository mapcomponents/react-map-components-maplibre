import React from "react";

import MlWmsLayer from "./MlWmsLayer";
import TopToolbar from "../../ui_components/TopToolbar";
import mapContextDecorator from "../../decorators/MapContextDecorator";

const storyoptions = {
  title: "MapComponents/MlWmsLayer",
  component: MlWmsLayer,
  argTypes: {
    url: {},
    layer: {},
  },
  decorators: mapContextDecorator,
};
export default storyoptions;

const Template = (args) => (
  <TopToolbar>
    <MlWmsLayer
      url={args.url}
      layer={args.layer}
      sourceOptions={args.sourceOptions}
    />
  </TopToolbar>
);

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {
  url: "https://www.wms.nrw.de/geobasis/wms_nw_uraufnahme",
  layer: "nw_uraufnahme_rw",
  sourceOptions: {
    minzoom: 13,
    maxzoom: 20,
  },
};
//

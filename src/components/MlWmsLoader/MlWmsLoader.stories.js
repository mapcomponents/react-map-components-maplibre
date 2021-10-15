import React from "react";

import MlWmsLoader from "./MlWmsLoader";

import mapContextDecorator from "../../decorators/MapContextDecorator";

const storyoptions = {
  title: "MapComponents/MlWmsLoader",
  component: MlWmsLoader,
  argTypes: {
    url: {},
    layer: {},
  },
  decorators: mapContextDecorator,
};
export default storyoptions;

const Template = (props) => <MlWmsLoader {...props} />;

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {
  url: "https://www.wms.nrw.de/geobasis/wms_nw_uraufnahme",
};

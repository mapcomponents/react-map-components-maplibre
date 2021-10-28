import React from "react";

import MlWmsFeatureInfoPopup from "./MlWmsFeatureInfoPopup";

import mapContextDecorator from "../../decorators/MapContextDecorator";

const storyoptions = {
  title: "MapComponents/MlWmsFeatureInfoPopup",
  component: MlWmsFeatureInfoPopup,
  argTypes: {
    url: {},
    layer: {},
  },
  decorators: mapContextDecorator,
};
export default storyoptions;

const Template = (args) => <MlWmsFeatureInfoPopup />;

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {};

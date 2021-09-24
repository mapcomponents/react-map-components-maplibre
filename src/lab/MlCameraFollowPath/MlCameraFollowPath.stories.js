import React, { useContext, useEffect } from "react";

import MlCameraFollowPath from "./MlCameraFollowPath";

import { LoadingOverlayContext } from "../../ui_components/LoadingOverlayContext";
import mapContextDecorator from "../../decorators/MapContextDecorator";

const storyoptions = {
  title: "MapComponentsLab/MlCameraFollowPath",
  component: MlCameraFollowPath,
  argTypes: {
    url: {},
    layer: {},
  },
  decorators: mapContextDecorator,
};
export default storyoptions;

const Template = (args) => {
  const loadingOverlayContext = useContext(LoadingOverlayContext);

  useEffect(() => {
    setTimeout(() => {
      loadingOverlayContext.setLoadingDone(true);
    }, 3000);
  }, []);

  return <MlCameraFollowPath />;
};

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {};

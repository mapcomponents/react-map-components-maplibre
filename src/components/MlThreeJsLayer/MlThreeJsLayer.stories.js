import React, { useContext } from "react";

import TopToolbar from "../../ui_components/TopToolbar";
import MlThreeJsLayer from "./MlThreeJsLayer";

import mapContextDecorator from "../../decorators/MapContextDecorator";
import { LoadingOverlayContext } from "../../ui_components/LoadingOverlayContext";

const storyoptions = {
  title: "MapComponents/MlThreeJsLayer",
  component: MlThreeJsLayer,
  argTypes: {
    options: {
      control: {
        type: "object",
      },
    },
  },
  decorators: mapContextDecorator,
};
export default storyoptions;

const Template = (args) => {
  const loadingOverlayContext = useContext(LoadingOverlayContext);

  return (
    <TopToolbar>
      <MlThreeJsLayer
        init={() => loadingOverlayContext?.setControlled?.(true)}
        onDone={() =>
          setTimeout(() => loadingOverlayContext?.setLoadingDone?.(true), 1200)
        }
      />
    </TopToolbar>
  );
};

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};

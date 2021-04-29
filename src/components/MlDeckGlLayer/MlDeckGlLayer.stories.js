import React, { useEffect, useContext } from "react";

import TopToolbar from "../../ui_components/TopToolbar";
import MlDeckGlLayer from "./MlDeckGlLayer";

import { LoadingOverlayContext } from "../../ui_components/LoadingOverlayContext";
import mapContextDecorator from "../../decorators/MapContextDecorator";

import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default {
  title: "MapComponents/MlDeckGlLayer",
  component: MlDeckGlLayer,
  argTypes: {
    options: {
      control: {
        type: "object",
      },
    },
  },
  decorators: mapContextDecorator,
};
//<MlCompositeLayer />

const Template = (args) => {
  const loadingOverlayContext = useContext(LoadingOverlayContext);

  useEffect(() => {
    console.log(loadingOverlayContext);
  }, []);
  return (
    <TopToolbar>
      <MlDeckGlLayer
        init={() => loadingOverlayContext.setControlled(true)}
        onDone={() => loadingOverlayContext.setLoadingDone(true)}
      />
    </TopToolbar>
  );
};

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};

import React, { useState } from "react";

import MlWmsLayer from "./MlWmsLayer";
import TopToolbar from "../../ui_components/TopToolbar";
import Button from "@mui/material/Button";

import multiMapContextDecorator from "../../decorators/MultiMapContextDecorator";

import "../../App.css";

const storyoptions = {
  title: "MapComponents/MlWmsLayer",
  component: MlWmsLayer,
  argTypes: {
    url: {},
    layer: {},
  },
  decorators: multiMapContextDecorator,
};
export default storyoptions;

const Template = (props) => {
  const [showLayer, setShowLayer] = useState(true);

  return (
    <>
      <TopToolbar>
        <Button
          color="primary"
          variant={showLayer ? "contained" : "outlined"}
          onClick={() => setShowLayer(!showLayer)}
        >
          WMS
        </Button>
      </TopToolbar>
      <MlWmsLayer visible={showLayer} {...props} />
    </>
  );
};

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {
  mapId: "map_2",
  url: "https://www.wms.nrw.de/geobasis/wms_nw_uraufnahme",
  urlParameters: {
    layers: "nw_uraufnahme_rw",
  },
};
//

import React, { useState, useEffect } from "react";

import MlOsmLayer from "./MlOsmLayer";
import TopToolbar from "../../ui_components/TopToolbar";
import Button from "@mui/material/Button";

import mapContextDecorator from "../../decorators/MapContextDecorator";

const storyoptions = {
  title: "MapComponents/MlOsmLayer",
  component: MlOsmLayer,
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

const Template = (props) => {
  const [showLayer, setShowLayer] = useState(true);

  return (
    <TopToolbar>
      <Button
        color="primary"
        variant={showLayer ? "contained" : "outlined"}
        onClick={() => setShowLayer(!showLayer)}
      >
        OSM
      </Button>
      {showLayer && <MlOsmLayer {...props} />}
    </TopToolbar>
  );
};

// <MapLibreMap options={args.options} />
export const ExampleConfig = Template.bind({});
ExampleConfig.args = {
  sourceOptions: {
    tiles: ["https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg"],
    attribution:
      'Map tiles by <a target="_top" rel="noopener" href="http://stamen.com">Stamen Design</a>, under <a target="_top" rel="noopener" href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a target="_top" rel="noopener" href="http://openstreetmap.org">OpenStreetMap</a>, under <a target="_top" rel="noopener" href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>',
  },
  layerOptions: {},
};

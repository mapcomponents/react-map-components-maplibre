import React from "react";

import MlMapDrawTools from "./MlMapDrawTools";

import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default {
  title: "MapComponents/MlMapDrawTools",
  component: MlMapDrawTools,
  argTypes: {},
};

const Template = (args) => {
  return (
    <div className="navbar">
      <MlMapDrawTools />
    </div>
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

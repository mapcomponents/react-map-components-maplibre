import React from "react";

import MlCreatePdfButton from "./MlCreatePdfButton";
import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default {
  title: "MapComponents/MlCreatePdfButton",
  component: MlCreatePdfButton,
  argTypes: {
    options: {
      control: {
        type: "object",
      },
    },
  },
};

const Template = (args) => (
  <>
    <div className="navbar">
      <MlCreatePdfButton />
    </div>
  </>
);

// <MapLibreMap options={args.options} />
export const ExampleConfig = Template.bind({});
//ExampleConfig.args = {
//  //  options: {
//  //    style: "https://wms.wheregroup.com/tileserver/style/osm-bright.json",
//  //    center: [8.607, 53.1409349],
//  //    maxBounds: [
//  //      [1.40625, 43.452919],
//  //      [17.797852, 55.973798],
//  //    ],
//  //  },
//};

import React from "react";

import MlWmsLoader from "./MlWmsLoader";

import mapContextDecorator from "../../decorators/MapContextDecorator";
import Sidebar from "../../ui_components/Sidebar";

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

const Template = (props) => {
  return (
    <>
      <Sidebar sx={{ width: "380px" }} classes={{ paper: { paddingTop: "20px" } }}>
        <MlWmsLoader {...props} />
      </Sidebar>
    </>
  );
};

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {
  /**
   * try https://maps.heigit.org/histosm/wms or https://magosm.magellium.com/geoserver/wms
   *
   */
  url: "https://www.wms.nrw.de/geobasis/wms_nw_vdop",
};

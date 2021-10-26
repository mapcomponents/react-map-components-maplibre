import React, { useState } from "react";

import MlWmsLoader from "./MlWmsLoader";

import TextField from "@mui/material/TextField";
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
  const [url, setUrl] = useState("");

  return (
    <>
      <Sidebar sx={{ width: "500px", wordBreak: "break-word" }}>
        <TextField
          label="WMS Url"
          variant="standard"
          value={url}
          onChange={(ev) => setUrl(ev.target.value)}
        />
        <MlWmsLoader {...props} url={url} />
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

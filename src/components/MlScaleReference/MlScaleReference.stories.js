import React from "react";

import MlScaleReference from "./MlScaleReference";

import TopToolbar from "../../ui_components/TopToolbar";
import mapContextDecorator from "../../decorators/MapContextDecorator";
import useMediaQuery from "@mui/material/useMediaQuery";

const storyoptions = {
  title: "MapComponents/MlScaleReference",
  component: MlScaleReference,
  argTypes: {
    url: {},
    layer: {},
  },
  decorators: mapContextDecorator,
};
export default storyoptions;

const Template = (props) => {
  const mediaIsMobile = useMediaQuery("(max-width:900px)");
  return(
    <>
      {props.show === "toolbar" && (
        <TopToolbar>
          <MlScaleReference {...props} />
        </TopToolbar>
      )}
      {props.show === "overlay" && (
        <div
          style={{
            position: "absolute",
            zIndex: 100000,
            bottom: mediaIsMobile ? "40px" : "20px",
            right: "20px",
          }}
        >
          <MlScaleReference {...props} />
        </div>
      )}
    </>
  );
}

export const Toolbar = Template.bind({});
Toolbar.args = {
  show: "toolbar",
};

export const Overlay = Template.bind({});
Overlay.args = {
  show: "overlay",
};

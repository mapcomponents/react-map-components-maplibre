import React from "react";

import MlScaleReference from "./MlScaleReference";

import TopToolbar from "../../ui_components/TopToolbar";
import mapContextDecorator from "../../decorators/MapContextDecorator";

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

const Template = (props) => (
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
          bottom: "20px",
          right: "20px",
        }}
      >
        <MlScaleReference {...props} />
      </div>
    )}
  </>
);

export const Toolbar = Template.bind({});
Toolbar.args = {
  show: "toolbar",
};

export const Overlay = Template.bind({});
Overlay.args = {
  show: "overlay",
};

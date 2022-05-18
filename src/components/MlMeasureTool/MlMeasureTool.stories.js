import React from "react";

import MlMeasureTool from "./MlMeasureTool";

import mapContextDecorator from "../../decorators/MapContextDecorator";
import StraightenOutlinedIcon from "@mui/icons-material/StraightenOutlined";
import SquareFootOutlinedIcon from "@mui/icons-material/SquareFootOutlined";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

const storyoptions = {
  title: "MapComponents/MlMeasureTool",
  component: MlMeasureTool,
  argTypes: {
  },
  decorators: mapContextDecorator,
};
export default storyoptions;

const Template = (args) => (
  <div style={{ width: "200px", position: "absolute", zIndex:105 }}>
    <Grid
      container
      style={{
        textAlign: "left",
        alignItems: "center",
      }}
    >
      <SquareFootOutlinedIcon />

      <h4 style={{ margin: "0px" }}>Measure Polygon</h4>
    </Grid>

    <Box m={2} style={{ textAlign: "left" }}>
      <MlMeasureTool measureTool={"polygon"} />
    </Box>
  </div>
)

const LineTemplate = (args) => (
  <div style={{ width: "200px", position: "absolute", zIndex:105, }}>
    <Grid
      container
      style={{
        textAlign: "left",
        alignItems: "center",
      }}
    >
      <StraightenOutlinedIcon />

      <h4 style={{ margin: "0px" }}>Measure Line</h4>
    </Grid>

    <Box m={2} style={{ textAlign: "left" }}>
      <MlMeasureTool measureTool={"line"} />
    </Box>
  </div>
)

export const MeasureLine = LineTemplate.bind( {});
MeasureLine.parameters = {};
MeasureLine.args = {};

export const MeasurePolygon = Template.bind({});
MeasurePolygon.parameters = {};
MeasurePolygon.args = {};


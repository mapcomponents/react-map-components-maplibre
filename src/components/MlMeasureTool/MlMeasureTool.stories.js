import React, { useRef, useState } from "react";

import MlMeasureTool from "./MlMeasureTool";

import mapContextDecorator from "../../decorators/MapContextDecorator";
import StraightenOutlinedIcon from "@mui/icons-material/StraightenOutlined";
import SquareFootOutlinedIcon from "@mui/icons-material/SquareFootOutlined";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { MenuItem, Select } from "@mui/material";

const storyoptions = {
  title: "MapComponents/MlMeasureTool",
  component: MlMeasureTool,
  argTypes: {},
  decorators: mapContextDecorator,
};
export default storyoptions;

const Template = (args) => {
  const [unit, setUnit] = useState("kilometers");
  const handleChange = (event) => {
    setUnit(event.target.value);
  };

  return (
    <div style={{ width: "200px", position: "absolute", zIndex: 105 }}>
      <Select
        name={"units"}
        onChange={handleChange}
        label={"Unit for measurement"}
        defaultValue={"kilometers"}
      >
        <MenuItem value={"kilometers"}>Kilometers</MenuItem>
        <MenuItem value={"miles"}>Miles</MenuItem>
      </Select>
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
        Area: <MlMeasureTool measureType={"polygon"} unit={unit} />
      </Box>
    </div>
  );
};

const LineTemplate = (args) => {
  const [unit, setUnit] = useState("kilometers");
  const handleChange = (event) => {
    setUnit(event.target.value);
  };

  return (
    <div style={{ width: "200px", position: "absolute", zIndex: 105 }}>
      <Select
        name={"units"}
        onChange={handleChange}
        label={"Unit for measurement"}
        defaultValue={"kilometers"}
      >
        <MenuItem value={"kilometers"}> Kilometers</MenuItem>
        <MenuItem value={"miles"}> Miles</MenuItem>
      </Select>
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
        Length: <MlMeasureTool measureType={"line"} unit={unit} />
      </Box>
    </div>
  );
};

export const MeasureLine = LineTemplate.bind({});
MeasureLine.parameters = {};
MeasureLine.args = {};

export const MeasurePolygon = Template.bind({});
MeasurePolygon.parameters = {};
MeasurePolygon.args = {};

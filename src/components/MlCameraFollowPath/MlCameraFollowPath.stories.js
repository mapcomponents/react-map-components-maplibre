import React, { useState } from "react";
import MlCameraFollowPath from "./MlCameraFollowPath";
import TopToolbar from "../../ui_components/TopToolbar";
import mapContextDecorator from "../../decorators/MapContextDecorator";
import { Button, Slider, Typography } from "@mui/material";
import { MlGeoJsonLayer, MlNavigationTools } from "@mapcomponents/react-maplibre";

const storyoptions = {
  title: "MapComponents/MlCameraFollowPath",
  component: MlCameraFollowPath,
  argTypes: {
    url: {},
    layer: {},
  },
  decorators: mapContextDecorator,
};
export default storyoptions;

const routeJson = {
  type: "Feature",
  properties: {},
  geometry: {
    type: "LineString",
    coordinates: [
      [7.10942788610961, 50.708209240168],
      [7.10966149846967, 50.7088867160122],
      [7.10910082880551, 50.7108256986007],
      [7.10856352037736, 50.7126945974813],
      [7.1083532692533, 50.7142598002937],
      [7.10814301812924, 50.7160118929942],
      [7.10793276700518, 50.7169463424345],
      [7.10776923835314, 50.7176004570426],
      [7.10713848498096, 50.718838602551],
      [7.10699831756492, 50.7199599418793],
      [7.106900786313568, 50.72118132611057],
    ],
  },
};

const marks = [
  {
    value: 15,
    label: '15',
  },
  {
    value: 16,
    label: '16',
  },
  {
    value: 17,
    label: '17',
  },
  {
    value: 18,
    label: '18',
  },
  {
    value: 19,
    label: '19',
  },
  {
    value: 20,
    label: '20',
  },
];

const Template = (args) => {
  const [pause, setPause] = useState(false);
  const [zoom, setZoom] = useState(18);
  const [speed, setSpeed] = useState(1);
  const [pitch, setPitch] = useState("3D");
  const [disable, setDisable] = useState(false);

  const CameraFollowPath = MlCameraFollowPath({
    route: routeJson,
    pause: pause,
    pitch: pitch,
    zoom: zoom,
    speed: speed,
  });

  function doPlay(event) {
    setPause(false);
    setTimeout(() => {
      CameraFollowPath.play();
    }, 10);
    setDisable(true);
  }
  function doReset() {
    setPause(true);
    CameraFollowPath.reset();
    setDisable(false);
    setPitch("3D");
    setZoom(18);
    setSpeed(1);
  }
  function doPitch() {
    if (pitch === "2D") {
      setPitch("3D");
    } else {
      setPitch("2D");
    }
  }

  return (
    <>
      <TopToolbar>
        <Button disabled={disable} onClick={doPlay}>
          Start
        </Button>
        <Button
          disabled={!disable}
          onClick={() => (setPause(true), setDisable(false))}
        >
          Pause
        </Button>
        <Button onClick={doReset}>Reset</Button>
        <Typography
          id="discrete-slider"
          style={{ color: "#121212", marginLeft: "10px", marginRight: "10px" }}
        >
          Zoom:
        </Typography>
        <Slider
          value={zoom}
          onChange={(ev, value) => {
            setZoom(value);
          }}
          getAriaValueText={(value) => value}
          aria-labelledby="discrete-slider"
          //valueLabelDisplay="auto"
          step={1}
          marks={marks}
          min={15}
          max={20}
          sx={{
            marginTop: "20px",
            paddingBottom: "20px",
            marginRight: "10px",
            maxWidth: "200px",
          }}
        />
        <Typography
          id="discrete-slider2"
          style={{ color: "#121212", marginLeft: "10px", marginRight: "10px" }}
        >
          Speed:
        </Typography>
        <Slider
          value={speed}
          onChange={(ev, value) => {
            setSpeed(value);
          }}
          getAriaValueText={(value) => value}
          aria-labelledby="discrete-slider2"
          //valueLabelDisplay="auto"
          step={0.1}
          marks
          min={0.1}
          max={2}
          sx={{
            marginRight: "10px",
            maxWidth: "200px",
          }}
        />
        <Button onClick={doPitch}>{pitch === "2D" ? "3D" : "2D"}</Button>
      </TopToolbar>
      <MlGeoJsonLayer
        geojson={routeJson}
        type="line"
        paint={{
          "line-width": 2,
          "line-color": "blue",
        }}
      />
      <MlNavigationTools />
    </>
  );
};;;;

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {};

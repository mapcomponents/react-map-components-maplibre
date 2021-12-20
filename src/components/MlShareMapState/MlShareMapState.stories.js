import React, { useState} from "react";

import MlShareMapState from "./MlShareMapState";
import mapContextDecorator from "../../decorators/MapContextDecorator";
import useMapState from "../../hooks/useMapState";
import MlLayer from "../MlLayer/MlLayer";

const storyoptions = {
  title: "MapComponents/MlShareMapState",
  component: MlShareMapState,
  argTypes: {},
  decorators: mapContextDecorator,
};
export default storyoptions;

const Template = (args) => {
  const [watchState, setWatchState] = useState(false);
  const [testLayerVisible, setTestLayerVisible] = useState(true);
  const mapState = useMapState({
      watch : {
        viewport : false,
        layers : true,
        sources : false
      },
      filter : {
        includeBaseLayers : false
      }
    }
  )

  return (
    <>
      <button
        style={{ zIndex: "1000", position: "absolute" }}
        onClick={() => setWatchState(!watchState)}
      >
        watch map state {watchState?1:0}
      </button>
      <button
        style={{ zIndex: "1000", position: "absolute" }}
        onClick={() => setTestLayerVisible(!testLayerVisible)}
      >
        visibility {testLayerVisible?1:0}
      </button>
      <MlShareMapState active={watchState} />
      <MlLayer layerId={"MlLayer-testLayer"} options={{layout: {visibility: (testLayerVisible ? "visible":"none")}}} />
      <MlLayer layerId={"MlLayer-testLayer2"} options={{layout: {visibility: (testLayerVisible ? "visible":"none")}}} />
      <MlLayer layerId={"MlLayer-testLayer3"} options={{layout: {visibility: (testLayerVisible ? "visible":"none")}}} />
    </>
  );
};

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {};

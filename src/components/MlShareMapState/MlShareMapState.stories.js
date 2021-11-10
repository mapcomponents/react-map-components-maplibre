import React, { useState} from "react";

import MlShareMapState from "./MlShareMapState";
import mapContextDecorator from "../../decorators/MapContextDecorator";

const storyoptions = {
  title: "MapComponents/MlShareMapState",
  component: MlShareMapState,
  argTypes: {},
  decorators: mapContextDecorator,
};
export default storyoptions;

const Template = (args) => {
  const [watchState, setWatchState] = useState(true);

  return (
    <>
      <button
        style={{ zIndex: "1000", position: "absolute" }}
        onClick={() => setWatchState(!watchState)}
      >
        watch map state {watchState?1:0}
      </button>
      <MlShareMapState active={watchState} />
    </>
  );
};

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {};

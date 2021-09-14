import React from "react";

import MlLaufwettbewerbApp from "./MlLaufwettbewerbApp";

import { AppContextProvider } from "./assets/AppContext";
import emptyMapContextDecorator from "../../decorators/EmptyMapContextDecorator";
import "./style.css";

const storyoptions = {
  title: "Applications/MlLaufwettbewerbApp",
  component: MlLaufwettbewerbApp,
  argTypes: {
    url: {},
    layer: {},
  },
  decorators: emptyMapContextDecorator,
};
export default storyoptions;

const Template = (args) => (
  <>
    <AppContextProvider>
      <div className="lw_map">
        <MlLaufwettbewerbApp />
      </div>
    </AppContextProvider>
  </>
);

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {};

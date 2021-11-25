import React, { useContext, useState } from "react";
import { mount, configure } from "enzyme";
import { waitFor } from "@testing-library/react";
import { MapContext, MapComponentsProvider } from "@mapcomponents/react-core";
import MlFollowGps from "./MlFollowGps";
import MapLibreMap from "./../MapLibreMap/MapLibreMap";

const mockGeolocation = {
  watchPosition: jest.fn(),
  clearWatch: jest.fn(),
}

global.navigator.geolocation = mockGeolocation;

global.navigator.geolocation.watchPosition.mockReturnValue(1);

const MlFollowGPSTestComponent = (props) => {
  const [componentVisible, setComponentVisible] = useState(true);

  return (
    <>
      <MapLibreMap />

      {componentVisible && <MlFollowGps {...props} />}

      <button
        className="toggle_layer_visible"
        onClick={() => {
          setComponentVisible(!componentVisible);
        }}
      >
        toggle component
      </button>
    </>
  );
};

let testAttributes = {};

describe("<MlFollowGps>", () => {
  it("should call navigator.geolocation.watchPosition once", async () => {
    const wrapper = mount(
      <MapComponentsProvider>
        <MlFollowGPSTestComponent {...testAttributes} />
      </MapComponentsProvider>
    );

    wrapper.find("MlFollowGps button").simulate("click");
    await waitFor(() => expect(mockGeolocation.watchPosition).toHaveBeenCalledTimes(1));
  });

  it("should call navigator.geolocation.clearWatch once, after MlFollowGPSButton has been pressed twice", async () => {
    const wrapper = mount(
      <MapComponentsProvider>
        <MlFollowGPSTestComponent {...testAttributes} />
      </MapComponentsProvider>
    );

    wrapper.find("MlFollowGps button").simulate("click");
    wrapper.find("MlFollowGps button").simulate("click");
    //wrapper.find(".toggle_layer_visible").simulate("click");

    await waitFor(() => expect(mockGeolocation.clearWatch).toHaveBeenCalledTimes(1));
  });
});

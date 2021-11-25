import React, { useContext, useState } from "react";
import { mount, configure } from "enzyme";
import { waitFor } from "@testing-library/react";
import { MapContext, MapComponentsProvider } from "@mapcomponents/react-core";
import MlNavigationCompass from "./MlNavigationCompass";
import MapLibreMap from "./../MapLibreMap/MapLibreMap";
import maplibregl from "maplibre-gl/dist/maplibre-gl";
import { mockMapLibreMethods } from "../../setupTests";

jest.mock("@mapbox/mapbox-gl-draw", () => {
  return function () {
    return {
      set: jest.fn(),
    };
  };
});
const mapLibreInstance = new maplibregl.Map();

const MlNavigationCompassTestComponent = (props) => {
  const [componentVisible, setComponentVisible] = useState(true);

  return (
    <>
      <MapLibreMap />

      {componentVisible && <MlNavigationCompass {...props} />}

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

describe("<MlNavigationCompass>", () => {
  it("should register 1 event listener to the maplibre instance", async () => {
    const wrapper = mount(
      <MapComponentsProvider>
        <MlNavigationCompassTestComponent {...testAttributes} />
      </MapComponentsProvider>
    );

    // MapLibreGlWrapper now subscribes to "data", "move" events on its own
    await waitFor(() => expect(mockMapLibreMethods.on).toHaveBeenCalledTimes(3));
  });

  it("should deregister 1 event listener to the maplibre instance", async () => {
    const wrapper = mount(
      <MapComponentsProvider>
        <MlNavigationCompassTestComponent {...testAttributes} />
      </MapComponentsProvider>
    );

    // MapLibreGlWrapper now subscribes to "data", "move" events on its own
    expect(mockMapLibreMethods.on).toHaveBeenCalledTimes(3);

    wrapper.find(".toggle_layer_visible").simulate("click");

    expect(mockMapLibreMethods.off).toHaveBeenCalledTimes(1);
  });
});

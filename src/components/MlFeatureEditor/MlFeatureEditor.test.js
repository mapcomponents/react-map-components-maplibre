import React, { useContext, useState } from "react";
import { mount, configure } from "enzyme";
import { waitFor } from "@testing-library/react";
import { MapContext, MapComponentsProvider } from "@mapcomponents/react-core";
import MlFeatureEditor from "./MlFeatureEditor";
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

const MlFeatureEditorTestComponent = (props) => {
  const [layerVisible, setLayerVisible] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const mapContext = useContext(MapContext);

  return (
    <>
      <MapLibreMap />

      {layerVisible && <MlFeatureEditor {...props} />}

      <button
        className="toggle_layer_visible"
        onClick={() => {
          setLayerVisible(!layerVisible);
        }}
      >
        toggle layer visible
      </button>
      <button
        className="trigger_refresh"
        onClick={() => {
          setRefreshTrigger(refreshTrigger + 1);
        }}
      >
        refresh
      </button>
      <div className="layers_json">
        {mapContext.map && refreshTrigger && JSON.stringify(mapContext.map.layers)}
      </div>
      <div className="sources_json">
        {mapContext.map && refreshTrigger && JSON.stringify(mapContext.map.sources)}
      </div>
    </>
  );
};

let testAttributes = {
  mode: "custom_select",
  geojson: {
    type: "Feature",
    properties: {},
    geometry: {
      coordinates: [
        [
          [7.0904979943736635, 50.73948334574527],
          [7.087554458473562, 50.73827346433987],
          [7.093562913197076, 50.73723639825727],
          [7.096294028980594, 50.7387727842636],
          [7.0904979943736635, 50.73948334574527],
        ],
      ],
      type: "Polygon",
    },
  },
};

describe("<MlFeatureEditor>", () => {
  it("should register 2 event listeners to the maplibre instance", async () => {
    const wrapper = mount(
      <MapComponentsProvider>
        <MlFeatureEditorTestComponent {...testAttributes} />
      </MapComponentsProvider>
    );

    // MapLibreGlWrapper now subscribes to "data", "move" events on its own
    await waitFor(() => expect(mockMapLibreMethods.on).toHaveBeenCalledTimes(4));
  });

  it("should deregister 2 event listeners to the maplibre instance", async () => {
    const wrapper = mount(
      <MapComponentsProvider>
        <MlFeatureEditorTestComponent {...testAttributes} />
      </MapComponentsProvider>
    );

    // MapLibreGlWrapper now subscribes to "data", "move" events on its own
    expect(mockMapLibreMethods.on).toHaveBeenCalledTimes(4);

    wrapper.find(".toggle_layer_visible").simulate("click");

    expect(mockMapLibreMethods.off).toHaveBeenCalledTimes(2);
  });

  it("should add MapBox-Gl-draw instance using map.addControl to the maplibre instance", async () => {
    const wrapper = mount(
      <MapComponentsProvider>
        <MlFeatureEditorTestComponent {...testAttributes} />
      </MapComponentsProvider>
    );

    expect(mockMapLibreMethods.addControl).toHaveBeenCalledTimes(1);
  });

  it("should remove MapBox-Gl-draw instance using map.addControl to the maplibre instance", async () => {
    const wrapper = mount(
      <MapComponentsProvider>
        <MlFeatureEditorTestComponent {...testAttributes} />
      </MapComponentsProvider>
    );

    expect(mockMapLibreMethods.addControl).toHaveBeenCalledTimes(1);

    wrapper.find(".toggle_layer_visible").simulate("click");

    expect(mockMapLibreMethods.removeControl).toHaveBeenCalledTimes(1);
  });
});

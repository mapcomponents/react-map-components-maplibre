import React, { useContext, useState } from "react";
import { mount } from "enzyme";
import { MapContext, MapComponentsProvider } from "@mapcomponents/react-core";
import MapLibreMap from "./../components/MapLibreMap/MapLibreMap";

const layerRemovalTest = (
  ComponentName,
  Component,
  regexLayerNameTest,
  humanReadableLayerName,
  beforeWrapperInit,
  afterWrapperInit,
  createWrapperFunction
) => {
  const TestComponent = (props) => {
    const [layerVisible, setLayerVisible] = useState(true);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const mapContext = useContext(MapContext);

    return (
      <>
        <MapLibreMap />

        {layerVisible && Component}

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
          {mapContext.map &&
            refreshTrigger &&
            JSON.stringify(mapContext.map.map.layers)}
        </div>
      </>
    );
  };

  const createWrapper =
    (typeof createWrapperFunction === "function" && createWrapperFunction) ||
    (() =>
      mount(
        <MapComponentsProvider>
          <TestComponent />
        </MapComponentsProvider>
      ));

  describe(ComponentName, () => {
    it(
      "should add a Layer with the id '" +
        humanReadableLayerName +
        "' to the MapLibre instance",
      async () => {
        if (typeof beforeWrapperInit === "function") {
          await beforeWrapperInit();
        }

        const wrapper = createWrapper(TestComponent);

        if (typeof afterWrapperInit === "function") {
          await afterWrapperInit();
        }

        wrapper.find(".trigger_refresh").simulate("click");

        expect(regexLayerNameTest.test(wrapper.find(".layers_json").text())).toEqual(
          true
        );
      }
    );

    it(
      "should remove a Layer with the id '" +
        humanReadableLayerName +
        "' from the MapLibre instance",
      async () => {
        if (typeof beforeWrapperInit === "function") {
          await beforeWrapperInit();
        }

        const wrapper = createWrapper(TestComponent);

        if (typeof afterWrapperInit === "function") {
          await afterWrapperInit();
        }

        wrapper.find(".trigger_refresh").simulate("click");

        expect(regexLayerNameTest.test(wrapper.find(".layers_json").text())).toEqual(
          true
        );

        wrapper.find(".toggle_layer_visible").simulate("click");
        wrapper.find(".trigger_refresh").simulate("click");

        expect(regexLayerNameTest.test(wrapper.find(".layers_json").text())).toEqual(
          false
        );
      }
    );
  });
};

export default layerRemovalTest;

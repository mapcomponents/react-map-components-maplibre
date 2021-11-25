import React, { useContext, useState } from "react";
import { mount, configure } from "enzyme";
import { MapContext, MapComponentsProvider } from "@mapcomponents/react-core";
import MapLibreMap from "./../components/MapLibreMap/MapLibreMap";

const sourceRemovalTest = (
  ComponentName,
  Component,
  regexLayerNameTest,
  humanReadableLayerName,
  beforeWrapperInit,
  afterWrapperInit
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
        <div className="sources_json">
          {mapContext.map &&
            refreshTrigger &&
            JSON.stringify(mapContext.map.map.sources)}
        </div>
      </>
    );
  };

  const createWrapper = () =>
    mount(
      <MapComponentsProvider>
        <TestComponent />
      </MapComponentsProvider>
    );

  describe(ComponentName, () => {
    it(
      "should add a Source with the id '" +
        humanReadableLayerName +
        "' to the MapLibre instance",
      async () => {
        if (typeof beforeWrapperInit === "function") {
          await beforeWrapperInit();
        }

        const wrapper = createWrapper();

        if (typeof afterWrapperInit === "function") {
          await afterWrapperInit();
        }

        wrapper.find(".trigger_refresh").simulate("click");

        expect(
          regexLayerNameTest.test(wrapper.find(".sources_json").text())
        ).toEqual(true);
      }
    );

    it(
      "should remove a Source with the id '" +
        humanReadableLayerName +
        "' from the MapLibre instance",
      async () => {
        if (typeof beforeWrapperInit === "function") {
          await beforeWrapperInit();
        }

        const wrapper = createWrapper();

        if (typeof afterWrapperInit === "function") {
          await afterWrapperInit();
        }

        wrapper.find(".trigger_refresh").simulate("click");

        expect(
          regexLayerNameTest.test(wrapper.find(".sources_json").text())
        ).toEqual(true);

        wrapper.find(".toggle_layer_visible").simulate("click");
        wrapper.find(".trigger_refresh").simulate("click");

        expect(
          regexLayerNameTest.test(wrapper.find(".sources_json").text())
        ).toEqual(false);
      }
    );
  });
};

export default sourceRemovalTest;

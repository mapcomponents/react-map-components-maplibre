import React, { useContext, useState } from "react";
import { mount, configure } from "enzyme";
import { waitFor } from "@testing-library/react";
import { MapContext, MapComponentsProvider } from "react-map-components-core";
import MapLibreMap from "./../MapLibreMap/MapLibreMap";
import MlLayer from "./MlLayer";

const MlLayerTestComponent = (props) => {
  const mapContext = useContext(MapContext);

  return (
    <>
    </>
  );
};

describe("<MlLayer>", () => {
  it("should ...", async () => {
    const wrapper = mount(
      <MlLayer>
        <MlLayerTestComponent />
      </MlLayer>
    );

    expect(wrapper.find(".map_count").text()).toEqual("1");
  });
});

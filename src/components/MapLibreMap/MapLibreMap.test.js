import React, { useContext } from "react";
import { mount, configure } from "enzyme";
import { waitFor } from "@testing-library/react";
import maplibregl from "maplibre-gl";
import { MapContext, MapComponentsProvider } from "react-map-components-core";
import MapLibreMap from "./MapLibreMap";

const MapLibreMapTestComponent = () => {
  const mapContext = useContext(MapContext);

  return (
    <>
      <div className="map_count">{mapContext.mapIds.length}</div>
      <MapLibreMap />
    </>
  );
};

describe("<MapLibreMap>", () => {
  it("should register an anonymous maplibre object to mapContext", async () => {
    const wrapper = mount(
      <MapComponentsProvider>
        <MapLibreMapTestComponent />
      </MapComponentsProvider>
    );

    await waitFor(() => expect(wrapper.find(".map_count").text()).toEqual("1"));

    expect(wrapper.find(".map_count").text()).toEqual("1");
  });
});

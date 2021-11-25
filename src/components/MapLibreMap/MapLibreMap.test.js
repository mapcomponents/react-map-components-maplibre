import React, { useContext, useState } from "react";
import { mount, configure } from "enzyme";
import { waitFor } from "@testing-library/react";
import { MapContext, MapComponentsProvider } from "@mapcomponents/react-core";
import MapLibreMap from "./MapLibreMap";

const MapLibreMapTestComponent = (props) => {
  const mapContext = useContext(MapContext);
  const [mapIsVisible, setMapIsVisible] = useState(true);

  return (
    <>
      <button
        className="toggle_map_is_visible"
        onClick={() => {
          setMapIsVisible(!mapIsVisible);
        }}
      >
        toggle mapIsVisible
      </button>
      <div className="map_count">{mapContext.mapIds.length}</div>

      {!props.mapId && mapIsVisible && <MapLibreMap />}
      {props.mapId && (
        <>
          <div className="map_1_exists">
            {mapContext.getMap(props.mapId) ? "true" : "false"}
          </div>
          {mapIsVisible && <MapLibreMap mapId={props.mapId} />}
        </>
      )}
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

    expect(wrapper.find(".map_count").text()).toEqual("1");
  });

  it("should remove an anonymous maplibre object from mapContext", async () => {
    const wrapper = mount(
      <MapComponentsProvider>
        <MapLibreMapTestComponent />
      </MapComponentsProvider>
    );

    expect(wrapper.find(".map_count").text()).toEqual("1");

    wrapper.find(".toggle_map_is_visible").simulate("click");

    expect(wrapper.find(".map_count").text()).toEqual("0");
  });

  it("should register a maplibre object with the id 'map_1' to mapContext", async () => {
    const wrapper = mount(
      <MapComponentsProvider>
        <MapLibreMapTestComponent mapId="map_1" />
      </MapComponentsProvider>
    );

    expect(wrapper.find(".map_1_exists").text()).toEqual("true");
  });

  it("should remove a maplibre object with the id 'map_1' to mapContext", async () => {
    const wrapper = mount(
      <MapComponentsProvider>
        <MapLibreMapTestComponent mapId="map_1" />
      </MapComponentsProvider>
    );

    expect(wrapper.find(".map_1_exists").text()).toEqual("true");

    wrapper.find(".toggle_map_is_visible").simulate("click");

    expect(wrapper.find(".map_1_exists").text()).toEqual("false");
  });
});

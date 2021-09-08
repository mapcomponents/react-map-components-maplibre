import React, { useContext } from "react";
import { mount, configure } from "enzyme";
import { waitFor } from "@testing-library/react";
import maplibregl from "maplibre-gl";
import { MapContext, MapComponentsProvider } from "react-map-components-core";
import MapLibreMap from "./MapLibreMap";

/*
jest.mock("maplibre-gl", () => ({
  __esModule: true,
  default: jest.fn({
    Map: function () {
      return {
        addSource: jest.fn(),
        removeSource: jest.fn(),
        addLayer: jest.fn(),
        on: jest.fn(),
        off: jest.fn(),
        setLayerZoomRange: jest.fn(),
        getLayer: jest.fn(),
        addImage: jest.fn(),
        loadImage: jest.fn(),
        removeImage: jest.fn(),
        hasImage: jest.fn(),
        getSource: jest.fn().mockReturnValue({ setData: jest.fn() }),
        project: jest.fn(),
      };
    },
  }),
}));
*/

jest.mock("maplibre-gl/dist/maplibre-gl", () => {
  const originalModule = jest.requireActual("maplibre-gl/dist/maplibre-gl");

  return {
    ...originalModule,
    GeolocateControl: jest.fn(),
    Map: function () {
      return {
        addControl: jest.fn(),
        on: jest.fn(),
        once: (eventName, callback) => {
          callback();
        },
        remove: jest.fn(),
        addSource: jest.fn(),
        removeSource: jest.fn(),
        addLayer: jest.fn(),
        off: jest.fn(),
        setLayerZoomRange: jest.fn(),
        getLayer: jest.fn(),
        addImage: jest.fn(),
        loadImage: jest.fn(),
        removeImage: jest.fn(),
        hasImage: jest.fn(),
        getSource: jest.fn().mockReturnValue({ setData: jest.fn() }),
        project: jest.fn(),
      };
    },
    NavigationControl: jest.fn(),
  };
});

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

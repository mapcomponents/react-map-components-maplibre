import React, { useRef, useEffect, useContext, useState } from "react";
import { mount } from "enzyme";
import { MapContext, MapComponentsProvider } from "@mapcomponents/react-core";
import { v4 as uuidv4 } from "uuid";
import MapLibreMap from "../MapLibreMap";

// create plain MapLibre mock for this test
var mockMapLibreMethods = {
  addLayer: jest.fn(),
  removeLayer: jest.fn(),
  addSource: jest.fn(),
  removeSource: jest.fn(),
  addImage: jest.fn(),
  removeImage: jest.fn(),
  addControl: jest.fn(),
  removeControl: jest.fn(),
  on: jest.fn(),
  off: jest.fn(),
  once: (eventName, callback) => {
    callback();
  },
  getLayer: () => ({}),
  getSource: () => ({}),
  hasImage: () => ({}),
};
mockMapLibreMethods.style = {
  ...mockMapLibreMethods,
};
jest.mock("maplibre-gl/dist/maplibre-gl", () => {
  const originalModule = jest.requireActual("maplibre-gl/dist/maplibre-gl");

  return {
    ...originalModule,
    Map: function () {
      return {
        ...mockMapLibreMethods,
      };
    },
    NavigationControl: jest.fn(),
  };
});

const MapLibreGlWrapperTestComponent = (props) => {
  const [childrenAreVisible, setChildrenAreVisible] = useState(true);

  return (
    <>
      <button
        className="toggle_children_are_visible"
        onClick={() => {
          setChildrenAreVisible(!childrenAreVisible);
        }}
      >
        toggle children
      </button>

      <MapLibreMap />
      {childrenAreVisible && props.children}
    </>
  );
};

const MlTestComponentTemplate = (props) => {
  const mapContext = useContext(MapContext);

  const initializedRef = useRef(false);
  const mapRef = useRef(undefined);
  const componentId = useRef(
    (props.idPrefix ? props.idPrefix : "LayerTestComponent-") + uuidv4()
  );

  useEffect(() => {
    let _componentId = componentId.current;

    return () => {
      if (mapRef.current) {
        mapRef.current.cleanup(_componentId);
        mapRef.current = undefined;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapContext.mapExists(props.mapId) || initializedRef.current) return;
    // the MapLibre-gl instance (mapContext.map) is accessible here
    // initialize the layer and add it to the MapLibre-gl instance or do something else with it
    initializedRef.current = true;
    mapRef.current = mapContext.getMap(props.mapId);

    props.afterInit(mapRef.current, componentId.current);
  }, [mapContext.mapIds, mapContext, props]);

  return <></>;
};
// add & remove layer tests
const LayerTestComponent = (props) => {
  return (
    <MlTestComponentTemplate
      {...props}
      afterInit={(map, componentId) => {
        for (let i = 0; i < props.cnt; i++) {
          map.addLayer({ id: uuidv4() }, undefined, componentId);
        }
      }}
    />
  );
};

describe("MapLibreGlWrapper - layer tests", () => {
  it("should add a layer using addLayer to MapLibreGl", async () => {
    const wrapper = mount(
      <MapComponentsProvider>
        <MapLibreGlWrapperTestComponent>
          <LayerTestComponent cnt={1} />
        </MapLibreGlWrapperTestComponent>
      </MapComponentsProvider>
    );

    expect(mockMapLibreMethods.addLayer).toHaveBeenCalledTimes(1);
  });

  it("should remove a layer using removeLayer from MapLibreGl using MapLibreGlWrapper.cleanup(componentId)", async () => {
    const wrapper = mount(
      <MapComponentsProvider>
        <MapLibreGlWrapperTestComponent>
          <LayerTestComponent cnt={1} />
        </MapLibreGlWrapperTestComponent>
      </MapComponentsProvider>
    );

    expect(mockMapLibreMethods.addLayer).toHaveBeenCalledTimes(1);

    wrapper.find(".toggle_children_are_visible").simulate("click");

    expect(mockMapLibreMethods.removeLayer).toHaveBeenCalledTimes(1);
  });

  it("should remove 3 layers using removeLayer from MapLibreGl using MapLibreGlWrapper.cleanup(componentId)", async () => {
    const wrapper = mount(
      <MapComponentsProvider>
        <MapLibreGlWrapperTestComponent>
          <LayerTestComponent cnt={3} />
        </MapLibreGlWrapperTestComponent>
      </MapComponentsProvider>
    );

    expect(mockMapLibreMethods.addLayer).toHaveBeenCalledTimes(3);

    wrapper.find(".toggle_children_are_visible").simulate("click");

    expect(mockMapLibreMethods.removeLayer).toHaveBeenCalledTimes(3);
  });
});

// add & remove source tests
const SourceTestComponent = (props) => {
  return (
    <MlTestComponentTemplate
      {...props}
      afterInit={(map, componentId) => {
        for (let i = 0; i < props.cnt; i++) {
          map.addSource(uuidv4(), {}, undefined, componentId);
        }
      }}
    />
  );
};

describe("MapLibreGlWrapper - source tests", () => {
  it("should add a source using addSource to MapLibreGl", async () => {
    const wrapper = mount(
      <MapComponentsProvider>
        <MapLibreGlWrapperTestComponent>
          <SourceTestComponent cnt={1} />
        </MapLibreGlWrapperTestComponent>
      </MapComponentsProvider>
    );

    expect(mockMapLibreMethods.addSource).toHaveBeenCalledTimes(1);
  });

  it("should remove a source using removeSource from MapLibreGl using MapLibreGlWrapper.cleanup(componentId)", async () => {
    const wrapper = mount(
      <MapComponentsProvider>
        <MapLibreGlWrapperTestComponent>
          <SourceTestComponent cnt={1} />
        </MapLibreGlWrapperTestComponent>
      </MapComponentsProvider>
    );

    expect(mockMapLibreMethods.addSource).toHaveBeenCalledTimes(1);

    wrapper.find(".toggle_children_are_visible").simulate("click");

    expect(mockMapLibreMethods.removeSource).toHaveBeenCalledTimes(1);
  });

  it("should remove 3 sources using removeSource from MapLibreGl using MapLibreGlWrapper.cleanup(componentId)", async () => {
    const wrapper = mount(
      <MapComponentsProvider>
        <MapLibreGlWrapperTestComponent>
          <SourceTestComponent cnt={3} />
        </MapLibreGlWrapperTestComponent>
      </MapComponentsProvider>
    );

    expect(mockMapLibreMethods.addSource).toHaveBeenCalledTimes(3);

    wrapper.find(".toggle_children_are_visible").simulate("click");

    expect(mockMapLibreMethods.removeSource).toHaveBeenCalledTimes(3);
  });
});

// add & remove image tests
const ImageTestComponent = (props) => {
  return (
    <MlTestComponentTemplate
      {...props}
      afterInit={(map, componentId) => {
        for (let i = 0; i < props.cnt; i++) {
          map.addImage(uuidv4(), {}, componentId);
        }
      }}
    />
  );
};

describe("MapLibreGlWrapper - image tests", () => {
  it("should add an image using addImage to MapLibreGl", async () => {
    const wrapper = mount(
      <MapComponentsProvider>
        <MapLibreGlWrapperTestComponent>
          <ImageTestComponent cnt={1} />
        </MapLibreGlWrapperTestComponent>
      </MapComponentsProvider>
    );

    expect(mockMapLibreMethods.addImage).toHaveBeenCalledTimes(1);
  });

  it("should remove an image using removeImage from MapLibreGl using MapLibreGlWrapper.cleanup(componentId)", async () => {
    const wrapper = mount(
      <MapComponentsProvider>
        <MapLibreGlWrapperTestComponent>
          <ImageTestComponent cnt={1} />
        </MapLibreGlWrapperTestComponent>
      </MapComponentsProvider>
    );

    expect(mockMapLibreMethods.addImage).toHaveBeenCalledTimes(1);

    wrapper.find(".toggle_children_are_visible").simulate("click");

    expect(mockMapLibreMethods.removeImage).toHaveBeenCalledTimes(1);
  });

  it("should remove 3 images using removeImage from MapLibreGl using MapLibreGlWrapper.cleanup(componentId)", async () => {
    const wrapper = mount(
      <MapComponentsProvider>
        <MapLibreGlWrapperTestComponent>
          <ImageTestComponent cnt={3} />
        </MapLibreGlWrapperTestComponent>
      </MapComponentsProvider>
    );

    expect(mockMapLibreMethods.addImage).toHaveBeenCalledTimes(3);

    wrapper.find(".toggle_children_are_visible").simulate("click");

    expect(mockMapLibreMethods.removeImage).toHaveBeenCalledTimes(3);
  });
});

// add & remove event listener tests
const EventTestComponent = (props) => {
  return (
    <MlTestComponentTemplate
      {...props}
      afterInit={(map, componentId) => {
        for (let i = 0; i < props.cnt; i++) {
          map.on("event", () => ({}), componentId);
        }
      }}
    />
  );
};

describe("MapLibreGlWrapper - event tests", () => {
  it("should add a event listener using on to MapLibreGl", async () => {
    const wrapper = mount(
      <MapComponentsProvider>
        <MapLibreGlWrapperTestComponent>
          <EventTestComponent cnt={1} />
        </MapLibreGlWrapperTestComponent>
      </MapComponentsProvider>
    );

    // MapLibreGlWrapper now subscribes to "data", "move" events on its own
    expect(mockMapLibreMethods.on).toHaveBeenCalledTimes(3);
  });

  it("should remove an event using off from MapLibreGl using MapLibreGlWrapper.cleanup(componentId)", async () => {
    const wrapper = mount(
      <MapComponentsProvider>
        <MapLibreGlWrapperTestComponent>
          <EventTestComponent cnt={1} />
        </MapLibreGlWrapperTestComponent>
      </MapComponentsProvider>
    );

    // MapLibreGlWrapper now subscribes to "data", "move" events on its own
    expect(mockMapLibreMethods.on).toHaveBeenCalledTimes(3);

    wrapper.find(".toggle_children_are_visible").simulate("click");

    expect(mockMapLibreMethods.off).toHaveBeenCalledTimes(1);
  });

  it("should remove 3 events using off from MapLibreGl using MapLibreGlWrapper.cleanup(componentId)", async () => {
    const wrapper = mount(
      <MapComponentsProvider>
        <MapLibreGlWrapperTestComponent>
          <EventTestComponent cnt={3} />
        </MapLibreGlWrapperTestComponent>
      </MapComponentsProvider>
    );

    // MapLibreGlWrapper now subscribes to "data", "move" events on its own
    expect(mockMapLibreMethods.on).toHaveBeenCalledTimes(5);

    wrapper.find(".toggle_children_are_visible").simulate("click");

    expect(mockMapLibreMethods.off).toHaveBeenCalledTimes(3);
  });
});
// add & remove controls tests
const ControlTestComponent = (props) => {
  return (
    <MlTestComponentTemplate
      {...props}
      afterInit={(map, componentId) => {
        for (let i = 0; i < props.cnt; i++) {
          map.addControl({}, "top-left", componentId);
        }
      }}
    />
  );
};

describe("MapLibreGlWrapper - control tests", () => {
  it("should add a control using addControl to MapLibreGl", async () => {
    const wrapper = mount(
      <MapComponentsProvider>
        <MapLibreGlWrapperTestComponent>
          <ControlTestComponent cnt={1} />
        </MapLibreGlWrapperTestComponent>
      </MapComponentsProvider>
    );

    expect(mockMapLibreMethods.addControl).toHaveBeenCalledTimes(1);
  });

  it("should remove a control using removeControl from MapLibreGl using MapLibreGlWrapper.cleanup(componentId)", async () => {
    const wrapper = mount(
      <MapComponentsProvider>
        <MapLibreGlWrapperTestComponent>
          <ControlTestComponent cnt={1} />
        </MapLibreGlWrapperTestComponent>
      </MapComponentsProvider>
    );

    expect(mockMapLibreMethods.addControl).toHaveBeenCalledTimes(1);

    wrapper.find(".toggle_children_are_visible").simulate("click");

    expect(mockMapLibreMethods.removeControl).toHaveBeenCalledTimes(1);
  });

  it("should remove 3 controls using removeControl from MapLibreGl using MapLibreGlWrapper.cleanup(componentId)", async () => {
    const wrapper = mount(
      <MapComponentsProvider>
        <MapLibreGlWrapperTestComponent>
          <ControlTestComponent cnt={3} />
        </MapLibreGlWrapperTestComponent>
      </MapComponentsProvider>
    );

    expect(mockMapLibreMethods.addControl).toHaveBeenCalledTimes(3);

    wrapper.find(".toggle_children_are_visible").simulate("click");

    expect(mockMapLibreMethods.removeControl).toHaveBeenCalledTimes(3);
  });
});

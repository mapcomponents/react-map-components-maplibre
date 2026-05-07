---
sidebar_position: 0
---

# MlGeoJsonLayer

The MlGeoJsonLayer component allows you to display any kind of GeoJSON data on the map using circle, fill, line, heatmap, symbol, or fill-extrusion layer types. It creates a source (if needed), a layer and adds it to the MapLibre-gl instance with the id given in the mapId prop.

### Basic Usage

In its simplest form, you only need to provide the geojson prop to the MlGeoJsonLayer component, and all other properties are optional. The layer type will be automatically determined by the type of the geojson data passed to the geojson prop.

```jsx
import { MlGeoJsonLayer } from "@mapcomponents/react-maplibre";

const geojson = {
  type: "Feature",
  geometry: {
    type: "Point",
    coordinates: [0, 0],
  },
  properties: {
    name: "Null Island",
  },
};

function IslandLayers() {
  return <MlGeoJsonLayer geojson={geojson} />;
}
```

In this example, we're creating a MlGeoJsonLayer component and passing a geojson object as its only required prop. This object contains a single feature, which is a point located at coordinates [0, 0]. The layer type will automatically be determined as a circle layer, since the feature is of type Point. The resulting map will display a single point at Null Island.

### Advanced Usage

#### Circle, Line, and Fill Layer

You can further customize the appearance of the MlGeoJsonLayer by providing a options.paint object and a options.layout object to the component's props that adheres to the Mapbox style LayerSpecification. These objects are passed to the addLayer method of the MapLibre instance and allow you to adjust the visual properties of the layer, such as color, opacity, line width, and more. If properies change state during runtime MlGeoJsonLayer component will update the layer in the MapLibre-gl instance accordingly. You can refer to the MapLibre documentation for a full list of available properties.

- [MapLibre docs - Mapbox Layer Specification - Layers](https://maplibre.org/maplibre-style/layers/#fill)
- [Mapbox Layer Specification - Layers](https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/)

##### Example: Circle Layer

To create a circle layer, set the type prop to 'circle' and provide the necessary paint properties in the paint prop:

```jsx
import { MlGeoJsonLayer } from "@mapcomponents/react-maplibre";

const pointGeojson = {
  type: "Feature",
  geometry: {
    type: "Point",
    coordinates: [10.0, 50.0],
  },
  properties: {
    radius: 10,
  },
};

function Layers() {
  return (
    <MlGeoJsonLayer
      geojson={pointGeojson}
      type="circle"
      paint={{
        "circle-color": "blue",
        "circle-radius": ["get", "radius"],
      }}
    />
  );
}
```

This will create a blue circle with a radius of 10 pixels at the coordinates [10.0, 50.0]. The radius of the circle is specified in the properties object of the GeoJSON feature.

##### Example: Line Layer

To create a line layer, set the type prop to 'line' and provide the necessary paint properties in the paint prop:

```jsx
import { MlGeoJsonLayer } from "@mapcomponents/react-maplibre";

const lineGeojson = {
  type: "Feature",
  geometry: {
    type: "LineString",
    coordinates: [
      [10.0, 50.0],
      [20.0, 60.0],
      [30.0, 70.0],
    ],
  },
};

function Layers() {
  return (
    <MlGeoJsonLayer
      geojson={lineGeojson}
      type="line"
      paint={{
        "line-color": "red",
        "line-width": 2,
      }}
    />
  );
}
```

This will create a red line with a width of 2 pixels that connects the three coordinates [10.0, 50.0], [20.0, 60.0], and [30.0, 70.0].

##### Example: Fill Layer

To create a fill layer, set the type prop to 'fill' and provide the necessary paint properties in the paint prop:

```jsx
import { MlGeoJsonLayer } from "@mapcomponents/react-maplibre";

const polygonGeojson = {
  type: "Feature",
  geometry: {
    type: "Polygon",
    coordinates: [
      [
        [10.0, 50.0],
        [20.0, 60.0],
        [30.0, 50.0],
        [20.0, 40.0],
      ],
    ],
  },
};

function Layers() {
  return (
    <MlGeoJsonLayer
      geojson={polygonGeojson}
      type="fill"
      paint={{
        "fill-color": "green",
      }}
    />
  );
}
```

This will create a green polygon that fills the area defined by the four coordinates [10.0, 50.0], [20.0, 60.0], [30.0, 50.0], and [20.0, 40.0].

#### Labels

You can add labels using the the MlGeoJsonLayer by providing a text-field property in the layout object. This property specifies the text that should be displayed for each feature. Additionally, you can customize the appearance of the labels using other properties in the layout and paint objects.

##### Example: Labels

```jsx
import React from "react";
import { MlGeoJsonLayer } from "@mapcomponents/react-maplibre";

const lineGeojson = {
  type: "Feature",
  geometry: {
    type: "LineString",
    coordinates: [
      [0, 0],
      [0, 40],
    ],
  },
  properties: {
    name: "Sample Route",
  },
};

const Labels = () => {
  return (
    <MlGeoJsonLayer
      type="symbol"
      geojson={lineGeojson}
      options={{
        layout: {
          "symbol-placement": "line",
          "text-field": "{name}",
          "text-justify": "auto",
          "text-font": ["Open Sans Regular"],
        },
        paint: {
          "text-color": "white",
        },
      }}
    />
  );
};
```

Here we are rendering a label for a LineString feature using the MlGeoJsonLayer component. The type prop is set to 'symbol' to indicate that we want to use a symbol layer to render the label. We pass the lineGeojson object to the geojson prop to specify the data we want to render.

To add a label to the line, we set the layout prop to an object with the 'symbol-placement' key set to 'line' and the 'text-field' key set to 'name'. This tells MapLibre to place the label along the line and use the name property of each feature as the label text.

#### Default Paint Overrides

You can override the default paint properties of the layer type implied by the type prop using the defaultPaintOverrides prop. This allows you to easily customize the appearance of specific types of layers without having to specify a complete paint object. You can provide an object with the keys circle, fill, and/or line, each containing a set of properties to be used for the respective layer type.

You are able to find all the available properties in the Mapbox style documentation for layers:

- [MapLibre docs - Mapbox Layer Specification - Layers](https://maplibre.org/maplibre-style/layers/#fill)
- [Mapbox Layer Specification - Layers](https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/)

```jsx
import { useState } from "react";
import { MlGeoJsonLayer } from "@mapcomponents/react-maplibre";

const polygonGeojson = {
  type: "Feature",
  properties: {},
  geometry: {
    type: "Polygon",
    coordinates: [
      [
        [0, 0],
        [0, 10],
        [10, 10],
        [10, 0],
        [0, 0],
      ],
    ],
  },
};

const defaultPaintOverrides = {
  circle: {
    "circle-color": "blue",
  },
  line: {
    "line-color": "red",
    "line-width": 2,
  },
  fill: {
    "fill-color": "green",
  },
};

function Layers() {
  const [layerType, setLayerType] = useState("fill");

  return (
    <>
      <select value={layerType} onChange={(e) => setLayerType(e.target.value)}>
        <option value="circle">Circle Layer</option>
        <option value="line">Line Layer</option>
        <option value="fill">Fill Layer</option>
      </select>
      <MlGeoJsonLayer
        geojson={polygonGeojson}
        defaultPaintOverrides={defaultPaintOverrides}
        type={layerType}
      />
    </>
  );
}
```

For this example, we have a basic polygon geometry defined in polygonGeojson. We also define defaultPaintOverrides to specify different default styles for the circle, line, and fill layer types. This could be loaded from a separate file or derived from a central colortheme in real-world application.

The App component renders a selected element that allows the user to switch between the three different layer types. The selected layer type is stored in the layerType state variable, and is passed to the MlGeoJsonLayer component as `type` prop.

The defaultPaintOverrides prop is also passed to the MlGeoJsonLayer component, which allows us to specify the default styles for each layer type. When a new layer type is selected in the select element, the layerType state variable is updated, which causes the MlGeoJsonLayer component to re-render with the new layer type and updated default styles.

#### Heatmap Layer

The Heatmap Layer is used to display the density of points in a GeoJSON data source. The intensity of the heatmap color is determined by the density of points, with more intense colors indicating areas with a higher density of points.

To use the Heatmap Layer, you need to pass the GeoJSON data source to the geojson prop and set the type prop to 'heatmap'. Additionally, you can customize the appearance of the heatmap using the options prop, where you can set the paint properties such as heatmap-weight, heatmap-color, heatmap-radius, and heatmap-opacity.

Here's an example configuration with earthquake data that has a mag property (for magnitude):

```jsx
<MlGeoJsonLayer
  geojson={earthquakesGeojson}
  options={{
    // paint examples copied from https://maplibre.org/maplibre-gl-js-docs/example/heatmap-layer/
    paint: {
      // Increase the heatmap weight based on frequency and property magnitude
      "heatmap-weight": ["interpolate", ["linear"], ["get", "mag"], 0, 0, 6, 1],
      // Increase the heatmap color weight by zoom level
      // heatmap-intensity is a multiplier on top of heatmap-weight
      "heatmap-intensity": ["interpolate", ["linear"], ["zoom"], 0, 1, 9, 3],
      // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
      // Begin color ramp at 0-stop with a 0-transparancy color
      // to create a blur-like effect.
      "heatmap-color": [
        "interpolate",
        ["linear"],
        ["heatmap-density"],
        0,
        "rgba(33,102,172,0)",
        0.2,
        "rgb(103,169,207)",
        0.4,
        "rgb(209,229,240)",
        0.6,
        "rgb(253,219,199)",
        0.8,
        "rgb(239,138,98)",
        1,
        "rgb(178,24,43)",
      ],
      // Adjust the heatmap radius by zoom level
      "heatmap-radius": ["interpolate", ["linear"], ["zoom"], 0, 2, 9, 20],
      // Transition from heatmap to circle layer by zoom level
      "heatmap-opacity": ["interpolate", ["linear"], ["zoom"], 7, 1, 9, 0],
    },
  }}
  type="heatmap"
/>
```

In the code above, the heatmap-weight is increased based on the mag property of each earthquake point, and the heatmap-intensity is increased as the zoom level increases. The heatmap-color is set to a blue-to-red color ramp with a transparency gradient to create a blur-like effect. The heatmap-radius is adjusted based on the zoom level and the heatmap-opacity is set to transition from a fully visible heatmap at zoom level 7 to a fully transparent heatmap at zoom level 9.

<!-- <iframe
  id="iframe--mapcomponents-mlgeojsonlayer--heat-map-earthquakes"
  title="Heat Map Earthquakes"
  src="https://mapcomponents.github.io/react-map-components-maplibre/iframe.html?viewMode=story&amp;id=mapcomponents-mlgeojsonlayer--heat-map-earthquakes"
  allowfullscreen=""
  loading="lazy"
  style={{ width: "100%", height: "500px", border: "0px none" }}
></iframe> -->

### Links

- [MlGeoJsonLayer Documentation](https://mapcomponents.github.io/react-map-components-maplibre/?path=/docs/mapcomponents-mlgeojsonlayer--linestring)
- [MlGeoJsonLayer Code](https://github.com/mapcomponents/react-map-components-maplibre/blob/main/src/components/MlGeoJsonLayer/MlGeoJsonLayer.tsx)
- [MapLibre on Github](https://github.com/maplibre/maplibre-gl-js)
- [MapLibre Docs](https://maplibre.org/maplibre-gl-js-docs/)
- [Mapbox Layer Specification](https://maplibre.org/maplibre-style/)
- [MapLibre docs - Mapbox Layer Specification - Layers](https://maplibre.org/maplibre-style/layers/#fill)
- [Mapbox Layer Specification - Layers](https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/)

#### GeoJSON Resources

- [GeoJSON Specification](https://tools.ietf.org/html/rfc7946)
- [GeoJSON.io](https://geojson.io/)
- [Awesome GeoJSON](https://github.com/tmcw/awesome-geojson)

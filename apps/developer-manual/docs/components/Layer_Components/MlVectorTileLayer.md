---
sidebar_position: 1
---

# MlVectorTileLayer

The `MlVectorTileLayer` component dynamically adds vector tile layers to a MapLibre instance. This component is useful for adding custom vector tile layers into maps, offering flexibility in terms of layer management and styling.

### Functionality

- **Layer Initialization**: When the component mounts, it initializes vector tile layers using the provided `layers` prop, which contains one or more layer specifications.
- **Layer Addition**: Each layer in the `layers` array is added to the map. This process includes setting the source, source-layer, zoom limits, layout, and paint properties for each layer.
- **Layer Update on Prop Changes**: The component listens for changes in the `layers` prop. If a change is detected (like adding or removing a layer), it re-runs the layer creation process to update the map accordingly.
- **Style Update Handling**: The component also monitors changes in the layout and paint properties of each layer. If any changes are detected, it updates these properties on the map in real-time, ensuring that the map's appearance is consistent with the component's props.
- **Layer Id Management**: Each layer gets a unique identifier, either provided through the `layerId` prop or generated automatically. This ensures proper handling and referencing of layers within the map.

Visit the storybook for a [complete list of properties & documentation](https://mapcomponents.github.io/react-map-components-maplibre/?path=/docs/mapcomponents-mlvectortilelayer--example-config).

### Basic Usage

```jsx
<MlVectorTileLayer
  url={
    "https://wms.wheregroup.com/tileserver/tile/tileserver.php?/europe-0-14/index.json?/europe-0-14/{z}/{x}/{y}.pbf"
  }
  layers={[
    {
      id: "water",
      type: "fill",
      "source-layer": "water",
      layout: {},
      paint: { "fill-color": "#3935e5", "fill-opacity": 0.5 },
      maxzoom: 20,
    },
    {
      id: "buildings",
      type: "fill",
      "source-layer": "building",
      layout: {},
      paint: { "fill-color": "#717875" },
      maxzoom: 20,
    },
  ]}
  sourceOptions={{
    minzoom: 0,
  }}
/>
```

<iframe
  id="iframe--core-maplibremap--style-change-config"
  title="Style Change Config"
  src="https://mapcomponents.github.io/react-map-components-maplibre/iframe.html?viewMode=story&amp;id=mapcomponents-mlvectortilelayer--example-config"
  allowfullscreen=""
  loading="lazy"
  style={{ width: "100%", height: "500px", border: "0px none" }}
></iframe>

### Links

- storybook: https://mapcomponents.github.io/react-map-components-maplibre/?path=/docs/mapcomponents-mlvectortilelayer--example-config
- Vector Tiles: https://docs.mapbox.com/vector-tiles/reference/
- Spec: https://maplibre.org/maplibre-style-spec/

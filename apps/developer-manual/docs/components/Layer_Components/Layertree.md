---
sidebar_position: 4
---

# Layertree

The LayerList and LayerListItem components (along with related components) provide functionalities that help with building a custom layer tree for your WebGIS Application.
Layer Components are passed to a `LayerListItem` component as `layerComponent`

### Functionalities

The layers visibility can be toggled on or off on the sidebar, and if the option is enabled, the user can also edit some basic properties of each layer, such as the color of the features, the radius of the point, the thickness of the line and others, depending on the type of the layer in question.

The list items can be nested using LayerListFolder components. The `visibility` checkbox of LayerListFolder components will act as a master switch for all child layers.

## Basic Usage

The code sample below show the usage of the `LayerList` component in combination with `LayerListItem`, `LayerListFolder` and `MlGeoJsonLayer`.

```tsx
<LayerList>
  <LayerListItem
    layerComponent={<MlGeoJsonLayer {...layerOneState} />}
    setLayerState={setLayerOneState}
    visible={true}
    configurable={true}
    type="layer"
    name="GeoJSON Layer"
  />
  <LayerListItem
    layerComponent={<MlGeoJsonLayer {...layerTwoState} />}
    setLayerState={setLayerTwoState}
    visible={true}
    configurable={true}
    type="layer"
    name="configurable GeoJSON Layer"
    description="A visualization of a GeoJSON LineString"
  />
</LayerList>
```

<iframe
  id="iframe--core-maplibremap--style-change-config"
  title="Style Change Config"
  src="https://mapcomponents.github.io/react-map-components-maplibre/iframe.html?args=&id=uicomponents-layerlist--geo-json-layer-example&viewMode=story"
  allowfullscreen=""
  loading="lazy"
  style={{ width: "100%", height: "500px", border: "0px none" }}
></iframe>

## Advanced Usage

To render a layer tree with a folder named `GeoJSON Layers` that has two child elements representing the two layers added by `MlGeoJsonLayer` components passed to the `layerComponent` props of the two `LayerListItem` elements.

```tsx
<LayerList>
  <LayerListFolder visible={true} name={"GeoJSON Layers"}>
    <LayerListItem
      layerComponent={<MlGeoJsonLayer geojson={sample_geojson_1 as Feature} />}
      visible={true}
      configurable={false}
      type="layer"
      name="GeoJSON Layer"
      key="GeoJSONLayer"
    />
    <LayerListItem
      layerComponent={<MlGeoJsonLayer geojson={sample_geojson_2 as Feature} />}
      visible={true}
      configurable={true}
      type="layer"
      name="GeoJSON Layer 2"
      description="A visualization of a GeoJSON LineString"
      key="GeoJSONLayer2"
    />
  </LayerListFolder>
</LayerList>
```

<iframe
  id="iframe--core-maplibremap--style-change-config"
  title="Style Change Config"
  src="https://mapcomponents.github.io/react-map-components-maplibre/iframe.html?viewMode=story&amp;id=uicomponents-layerlist--folder-example"
  allowfullscreen=""
  loading="lazy"
  style={{ width: "100%", height: "500px", border: "0px none" }}
></iframe>

<!-- <iframe
  id="iframe--core-maplibremap--style-change-config"
  title="Style Change Config"
  src="https://mapcomponents.github.io/react-map-components-maplibre/iframe.html?viewMode=story&amp;id=uicomponents-layerlist--vectortile-example"
  allowfullscreen=""
  loading="lazy"
  style={{ width: "100%", height: "500px", border: "0px none" }}
></iframe> -->

## Links

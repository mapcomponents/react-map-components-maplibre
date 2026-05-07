---
sidebar_position: 2
---

# MlWMSLoader

The MlWmsLoader component serves as a Web Map Service (WMS) loader in a React application, handling the loading of WMS capabilities and managing the representation of WMS layers on a map. This component integrates with a MapLibre instance, utilizing several hooks and components for its operations.

Visit the storybook for a [complete list of properties & documentation](https://mapcomponents.github.io/react-map-components-maplibre/?path=/docs/mapcomponents-mlwmsloader--example-config).

### Functionality:

- **WMS Capabilities Loading:** It loads WMS capabilities from a URL provided as `url` property. This includes parsing the getCapabilities XML document from the WMS server and handling any potential errors in this process.

- **Layer Management:** The component dynamically creates and manages MlWmsLayer components for each layer offered by the WMS, based on the loaded capabilities. Layers can be toggled visible or invisible.

- **Feature Information Retrieval:** If enabled, the component will register click handlers on the map, handle getFeatureInfo requests and display the results in a popup. This allows users to click on the map to retrieve information about features from WMS layers. This functionality is optional and can be activated or deactivated.

- **UI Interaction:** It renders as a LayerListFolder with a list of layers with checkboxes to toggle their visibility, and supports custom actions such as deleting a layer or retrieving feature information. This way it integrates well with the LayerList component. The UI also accommodates custom buttons as part of the list items.

- **Map Interaction:** The component can optionally zoom to the extent of the WMS layer after loading getCapabilities.

- **Attribution Handling:** It handles attributions for each layer, aggregating them based on visibility and layer properties.

### Basic Usage

```jsx
<MlWmsLoader
  url={"https://magosm.magellium.com/geoserver/wms"}
  zoomToExtent={true}
/>
```

<iframe
  id="iframe--core-maplibremap--style-change-config"
  title="Style Change Config"
  src="https://mapcomponents.github.io/react-map-components-maplibre/iframe.html?args=&id=mapcomponents-mlwmsloader--example-config&viewMode=story"
  allowfullscreen=""
  loading="lazy"
  style={{ width: "100%", height: "500px", border: "0px none" }}
></iframe>

https://mapcomponents.github.io/react-map-components-maplibre/?path=/docs/mapcomponents-mlwmsloader--example-config

### Links

- storybook: https://mapcomponents.github.io/react-map-components-maplibre/?path=/docs/mapcomponents-mlwmsloader--example-config
- Wikipedia: https://en.wikipedia.org/wiki/Web_Map_Service
- WMS spec: https://www.ogc.org/standards/wms

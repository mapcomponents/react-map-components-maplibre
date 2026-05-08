# LayerContext

## Overview
`LayerContext` is a React context provider tailored for managing the state of map layers in a mapping application. It centralizes the handling of various map layers, including WMS, GeoJSON, and Vector Tiles. Primarily, it manages the state of layers, such as their order and visibility, but does not create layers directly.

## TypeScript Data Structures

### LayerContextType
- `layers`: LayerConfig[] - Array of configured layers.
- `setLayers`: Function - Method to update the layer configurations.
- `backgroundLayers`: MlVectorTileLayerProps['layers'] - Defines background layer specifications.
- `setBackgroundLayers`: Function - Assigns background layer specifications.
- `symbolLayers`: MlVectorTileLayerProps['layers'] - Specifies symbol layer configurations.
- `setSymbolLayers`: Function - Allocates symbol layer specifications.
- `updateStyle`: Function - Refreshes the map style.
- `vtLayerConfig`: `Partial<MlVectorTileLayerProps>` - Settings for vector tile layers.
- `setTileUrl`: Function - Updates the URL for tile layers.
- `tileUrl`: string - Tile layer URL.
- `moveUp`: Function - Elevates a layer in the stack.
- `moveDown`: Function - Lowers a layer in the stack.
- `moveLayer`: Function - Relocates a layer based on specified criteria.

### LayerConfig
A union type encompassing various layer configurations:
- `type`: 'wms' | 'geojson' | 'vt' - Specifies the category of layer.
- `name?`: string - Layer designation.
- `id?`: string - Unique identifier for the layer.
- `config`: wmsConfig | MlGeoJsonLayerProps | MlVectorTileLayerProps - Detailed configuration for the layer.

### wmsConfig
- `featureInfoActive?`: boolean - Toggles the active state of feature information.
- `config?`: wmsLoaderConfigProps - Configuration settings for WMS layers.
- `url`: string - WMS service URL.

### wmsLoaderConfigProps
- `getFeatureInfoUrl`: string - Endpoint for retrieving feature details.
- `layers`: Layer[] - Collection of WMS layers.
- `name`: string - Identifiable name of the WMS layer.
- `open`: boolean - Status indicating if the layer is active.
- `visible`: boolean - Controls the layer's visibility.
- `wmsUrl`: string - Endpoint of the WMS service.


## Functionality

### Layer State Management
- Adds, removes, and updates various layer types (WMS, GeoJSON, VT).
- Maintains layer order and visibility, facilitating dynamic map updates.

### Layer Manipulation
- `moveUp`, `moveDown`, and `moveLayer` offer reordering capabilities.
- Generates unique IDs for layers using `uuidv4` when not provided. Unique ids are importand for the identification of individual layers and will come handy when creating lists of react components based of the `layers:LayerConfig[]` state.

### Style Adjustment
- `updateStyle` enables real-time style modifications.
- Categorizes layers into `backgroundLayers` and `symbolLayers` for detailed styling control.

## Deprecation Notice
- The existing LayerContext is slated for deprecation and will be superseded by a more efficient, Redux-based state management system. This upgrade aims to enhance performance and flexibility in managing map layers.


## Basic Usage


## Advanced Usage


## Links
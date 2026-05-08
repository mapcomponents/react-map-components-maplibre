---
sidebar_position: 5
---

# 6. Layertree

The `LayerList` and `LayerListItem` components will help us to build a custom layer tree.

### Add `Layers` Component to the Sidebar

1. **The existing `Layers` component needs to be a child of the Sidebar:**

   ```javascript
   <Sidebar open={true} name={"Sidebar"}>
     <Layers />
   </Sidebar>
   ```

### Add `LayerList` and `LayerListItem` Component to the Sidebar

1. **The components `LayerList` and `LayerListItem` need to be imported:**

   ```javascript
   import {
     LayerList,
     LayerListItem,
     MlGeoJsonLayer,
     MlVectorTileLayer,
   } from "@mapcomponents/react-maplibre";
   ```

2. **... and integrated into the JSX:**

   We need a `LayerList` component and for each existing `layer` component a `LayerListItem` component.
   The `layer` component is passed in the `layerComponent` attribute.

   For the `LayerListItem` component of the `MlVectorTileLayer`, we pass the setter function of the `bgLayerState` state variable in the `setLayerState` attribute.

   For the `LayerListItem` component of the `MlGeoJsonLayer`, we pass the `MlGeoJsonLayer` Component.
   Because the GeoJSON file contains polygons, we can integrate it as both a `fill` and a `line` layer.

   The LayerListItem components are conditionally included based on the respective state variables `laender` or `bgLayerState.layers`.

   ```javascript
   <LayerList>
     {bgLayerState.layers && (
       <LayerListItem
         name="Background"
         setLayerState={setBgLayerState}
         configurable={false}
         layerComponent={<MlVectorTileLayer {...bgLayerState} />}
       />
     )}
     {laender && (
       <LayerListItem
         name="Länder"
         layerComponent={
           <MlGeoJsonLayer
             insertBeforeLayer="waterway-name"
             mapId="map_1"
             geojson={laender}
           />
         }
       />
     )}
     {laender && (
       <LayerListItem
         name="Länder Outline"
         configurable={true}
         layerComponent={
           <MlGeoJsonLayer
             type="line"
             insertBeforeLayer="waterway-name"
             mapId="map_1"
             geojson={laender}
           />
         }
       />
     )}
   </LayerList>
   ```

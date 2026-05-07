---
sidebar_position: 0
---

# 1. Vectortile Map

When starting a project using the template, the base map is created by initializing the `MapLibre` instance with a `style.json` file. Alternatively, the base map can be implemented using a `vector tile layer`. This method allows for runtime adjustments to the background style without the need to refresh the entire `style` property of the `MapLibre` instance.

1. **Comment Out the Style Property**: In the `src/App.tsx` file, comment out the `style` property within the `options` attribute of the `MapLibreMap` component.

   ```javascript
   <MapLibreMap
     options={{
       //style: "https://wms.wheregroup.com/tileserver/style/osm-bright.json",
       zoom: 4,
     }}
     style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}
   />
   ```

2. **Add mapId, center and adjust zoom**:

   ```javascript
   <MapLibreMap
     mapId="map_1"
     options={{
       zoom: 5,
       center: [10.447683, 51.163361],
       //style: "https://wms.wheregroup.com/tileserver/style/osm-bright.json",
     }}
     style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}
   />
   ```

3. **Create a New Component File**: Establish a new file at `src/components/Layers.jsx`.

4. **Define a State Variable**: Initiate a `state` variable named `bgLayerState` as follows:

   ```javascript
   import { useState } from "react";
   import { useEffect, useState } from "react";

   export default function Layers() {
     const [bgLayerState, setBgLayerState] = useState({
       url: "https://wms.wheregroup.com/tileserver/tile/tileserver.php?/europe-0-14/index.json?/europe-0-14/{z}/{x}/{y}.pbf",
       layerId: "openmaptiles",
     });

     return <></>;
   }
   ```

5. **Fetch Background Style**: Utilize a fetch operation within the initialization effect to acquire the background style from the specified URL. And insert the `layers property` from the fetched style.json into the `layers` property of the `state` variable:

   ```javascript
   fetch("https://wms.wheregroup.com/tileserver/style/osm-bright.json")
     .then((response) => response.json())
     .then((data) => {
       setBgLayerState((current) => {
         return { ...current, layers: data.layers };
       });
     });
   ```

6. **Include the MlVectorTileLayer Component**: In the JSX, add the [MlVectorTileLayer](/docs/components/Layer_Components/MlVectorTileLayer) component. Use the spread operator to pass all properties of the bgLayerState variable as attributes to the component:

   ```javascript
   return<>{bgLayerState.layers && <MlVectorTileLayer {...bgLayerState} />;}</>;
   ```

7. **Import and Use the New Component**: `import Layers from "./components/Layers"` in `src/App.tsx` and render it within the application's JSX.

<img src={require("/img/quick_start_vectortile_map.png").default} width="1000" />

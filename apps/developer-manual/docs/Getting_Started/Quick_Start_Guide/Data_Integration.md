---
sidebar_position: 4
---

# 5. Data Integration

Display the federal states using the MlGeoJsonLayer component on the map.

The dataset can be accessed at the following URL:
https://raw.githubusercontent.com/isellsoap/deutschlandGeoJSON/main/2_bundeslaender/4_niedrig.geo.json

The file components/Layers.jsx will now be extended:

1. **Add MlGeoJMlGeoJsonLayer-Component:** `import {MlGeoJsonLayer} from "@mapcomponents/react-maplibre"` in `src/components/Layers.jsx`.

2. **Define the `State Variable` that will hold the GeoJSON data**:

   ```javascript
   const [laender, setLaender] = useState();
   ```

3. **Fetch the GeoJSON Data**:
   Use an effect to fetch the data when the component mounts. Once the data is fetched, store it in a `state variable`. Now, integrate this operation into the existing `useEffect` hook that is used for fetching background tiles.

   ```javascript
   useEffect(() => {
     fetch("https://wms.wheregroup.com/tileserver/style/osm-bright.json")
       .then((response) => response.json())
       .then((data) =>
         setBgLayerState((current) => {
           return { ...current, layers: data.layers };
         })
       );
     fetch(
       "https://raw.githubusercontent.com/isellsoap/deutschlandGeoJSON/main/2_bundeslaender/4_niedrig.geo.json"
     )
       .then((res) => res.json())
       .then((data) => setLaender(data));
   }, []);
   ```

4. **Include the MlGeoJMlGeoJsonLayer Component**: In the JSX, add the [MlGeoJMlGeoJsonLayer](/docs/components/Layer_Components/MlGeoJsonLayer) component.

   ```javascript
   {
     laender && (
       <MlGeoJsonLayer
         insertBeforeLayer="waterway-name"
         mapId="map_1"
         geojson={laender}
       />
     );
   }
   ```

# Geojson

## Step-by-Step Guide: Adding GeoJSON Data Using MlGeoJsonLayer

#### Step 1: Import the MlGeoJsonLayer Component

Start by importing the `MlGeoJsonLayer` component in a new react component:

```javascript
import { MlGeoJsonLayer } from "@mapcomponents/react-map-components-maplibre";
```

#### Step 2: Prepare Your GeoJSON Data

Create a GeoJSON file with sample data. Here's an example GeoJSON object representing a single point feature located at coordinates [0, 0].

```json
// public/geojson/sample-data.geojson
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [0, 0]
      },
      "properties": {
        "name": "Null Island"
      }
    }
  ]
}
```

Place this file inside a geojson folder within the `public` directory of the React app.

#### Step 3: Load GeoJSON Data Dynamically

Use the fetch API to load the GeoJSON data at runtime. This method avoids bundling the data with the application, which can significantly increase the build size and negatively impact performance. Instead, the data is loaded when the component mounts, resulting in faster initial load times.

Here’s how the GeoJSON data can be fetched and written to state using the useState and useEffect React hooks:

```javascript
import React, { useState, useEffect } from "react";

const MyMapComponent = () => {
  const [geoJsonData, setGeoJsonData] = useState(null);

  useEffect(() => {
    fetch("/geojson/sample-data.geojson")
      .then((response) => response.json())
      .then((data) => setGeoJsonData(data))
      .catch((error) => console.error("Error loading GeoJSON:", error));
  }, []);

  // ... Rest of the component in step 4
};
```

#### Step 4: Add the MlGeoJsonLayer to Your Map

Once your GeoJSON data is loaded, you can add it to your map using the MlGeoJsonLayer component. Use the options prop to specify layer options such as id, type, and paint properties.

```javascript
return (
  <>
    {geoJsonData && (
      <MlGeoJsonLayer
        geojson={geoJsonData}
        layerId="my-geojson-layer"
        type="circle"
        options={{
          paint: {
            "circle-radius": 10,
            "circle-color": "#007cbf",
          },
        }}
      />
    )}
  </>
);
```

#### Step 5: Handle Events (Optional)

Optionally, if you need to handle events like click or hover on the GeoJSON layer, you can pass event handler functions in the options prop.

```javascript
<MlGeoJsonLayer
  geojson={geoJsonData}
  layerId="my-geojson-layer"
  type="circle"
  options={{
    paint: {
      "circle-radius": 10,
      "circle-color": "#007cbf",
    },
  }}
  onClick={(event) => {
    // Handle click event
  }}
  onHover={(event) => {
    // Handle hover event
  }}
/>
```

#### Complete Code Example

```javascript
import React, { useState, useEffect } from "react";
import { MlGeoJsonLayer } from "@mapcomponents/react-map-components-maplibre";

const MyMapComponent = () => {
  const [geoJsonData, setGeoJsonData] = useState(null);

  useEffect(() => {
    fetch("/geojson/sample-data.geojson")
      .then((response) => response.json())
      .then((data) => setGeoJsonData(data))
      .catch((error) => console.error("Error loading GeoJSON:", error));
  }, []);

  return (
    <>
      {geoJsonData && (
        <MlGeoJsonLayer
          geojson={geoJsonData}
          layerId="my-geojson-layer"
          type="circle"
          options={{
            paint: {
              "circle-radius": 10,
              "circle-color": "#007cbf",
            },
          }}
        />
      )}
    </>
  );
};

export default MyMapComponent;
```

#### Step 5: Create a GeoJSON DataContext

Instead of fetching and storing GeoJSON data within the map component, you can create a dedicated context. This allows you to easily share and manage the state of your GeoJSON data across multiple components.

First, set up the GeoJSON context (GeoJsonContext.js):

```javascript
import React, { createContext, useState, useEffect } from "react";

export const GeoJsonDataContext = createContext(null);

export const GeoJsonDataProvider = ({ children }) => {
  const [geoJsonData, setGeoJsonData] = useState(null);

  useEffect(() => {
    fetch("/geojson/sample-data.geojson")
      .then((response) => response.json())
      .then((data) => setGeoJsonData(data))
      .catch((error) => console.error("Error loading GeoJSON:", error));
  }, []);

  return (
    <GeoJsonDataContext.Provider value={geoJsonData}>
      {children}
    </GeoJsonDataContext.Provider>
  );
};
```

#### Step 6: Use the GeoJSON DataContext in Your Map Component

Now, within your map component, you can consume the GeoJsonDataContext to access the GeoJSON data.

```javascript
import React, { useContext } from "react";
import { MlGeoJsonLayer } from "@mapcomponents/react-map-components-maplibre";
import { GeoJsonDataContext } from "./GeoJsonContext";

const MyMapComponent = () => {
  const geoJsonData = useContext(GeoJsonDataContext);

  return (
    <>
      {geoJsonData && (
        <MlGeoJsonLayer
          geojson={geoJsonData}
          layerId="my-geojson-layer"
          type="circle"
          options={{
            paint: {
              "circle-radius": 10,
              "circle-color": "#007cbf",
            },
          }}
        />
      )}
    </>
  );
};

export default MyMapComponent;
```

#### Step 7: Wrap Your Application with the GeoJsonDataProvider

Finally, ensure that your application, or at least the part of the app tree that needs access to the GeoJSON data, is wrapped with the GeoJsonDataProvider.

```javascript
import React from "react";
import { GeoJsonDataProvider } from "./GeoJsonContext";
import MyMapComponent from "./MyMapComponent";

const App = () => {
  return (
    <GeoJsonDataProvider>
      <MyMapComponent />
    </GeoJsonDataProvider>
  );
};

export default App;
```

By using this context, any component within the provider can access the GeoJSON data without needing to fetch it directly. This avoids prop drilling and allows for a more maintainable and scalable application structure.

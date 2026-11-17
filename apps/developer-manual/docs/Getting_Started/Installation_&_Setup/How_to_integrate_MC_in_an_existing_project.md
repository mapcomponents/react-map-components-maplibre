---
sidebar_position: 1
---

# How to integrate MC in an existing project

### 1. Add @mapcomponents/react-maplibre as a dependency

```bash
yarn add @mapcomponents/react-maplibre maplibre-gl
```

MapComponents 2 is ESM-only because MapLibre GL JS 6 no longer provides a CommonJS entry point. Use an ESM-capable bundler; loading the package with `require()` is not supported.

### 2. Add the MapComponentsProvider

Add the MapComponentsProvider to your application's React DOM at an appropriate place. Only **components within this provider** can render a map canvas or interact with a MapLibre-GL instance.

**Exampe Integration:** Integrate MapComponentsProvider in `src/main.tsx`.

```javascript
import React from "react";
import ReactDOM from "react-dom/client";
import { setWorkerUrl } from "maplibre-gl";
import maplibreWorkerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";
import { MapComponentsProvider } from "@mapcomponents/react-maplibre";
import { StyleContextProvider } from "./contexts/StyleContext";
import App from "./App";
import "./index.css";

setWorkerUrl(maplibreWorkerUrl);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
<React.StrictMode>
 <StyleContextProvider>
   <MapComponentsProvider>
     <App />
   </MapComponentsProvider>
 </StyleContextProvider>
</React.StrictMode>
);
```

MapLibre GL JS 6 ships as ESM and requires bundler-generated worker URLs. The example uses Vite's `?worker&url` import; for other bundlers, follow the [MapLibre installation guide](https://maplibre.org/maplibre-gl-js/docs/#installation).

**For efficient map rendering and interaction management**:
Ensure that only necessary components are within the provider's scope.
If your app heavily relies on map interactions, place the provider, for example, in the index.js entry point. For applications where the map is a smaller feature, position it higher in the JSX tree. This approach ensures efficient map rendering and interaction management.

### 3. Add a MapLibreMap component

Add the MapLibreMap component where the map canvas should be placed in your app:

```javascript
import React from "react";
import { MapLibreMap } from "@mapcomponents/react-maplibre";

const App = () => {
  return (
    <MapLibreMap
      options={{
        center: [8.607, 53.1409349],
        style: "https://wms.wheregroup.com/tileserver/style/osm-bright.json",
        zoom: 14,
      }}
    />
  );
};

export default App;
```

<iframe
  id="iframe--core-maplibremap-config"
  title="MaplibreMap Config"
  src="https://mapcomponents.github.io/react-map-components-maplibre/iframe.html?viewMode=story&amp;id=core-maplibremap--example-config"
  allowfullscreen=""
  loading="lazy"
  style={{ width: "100%", height: "500px", border: "0px none" }}
></iframe>

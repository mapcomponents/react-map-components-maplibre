---
sidebar_position: 0
---

# MapLibreMap

The MapLibreMap component provides an easy way to create a map on your web page using MapLibre-gl. The component handles the creation of a required canvas HTML element and registration of the maplibre-gl instance with MapContext, a central registry in the MapComponents framework. This allows you to build more advanced maps by adding other components to your application that interact with this map instance.

## Basic Usage

To use the `MapLibreMap` component, simply import it and use it in your JSX code like this:

```jsx
import { MapLibreMap } from "@mapcomponents/react-maplibre";

function Map() {
  return (
    <MapLibreMap
      options={{
        style: "https://wms.wheregroup.com/tileserver/style/osm-bright.json",
        center: [8.607, 53.1409349],
        zoom: 14,
      }}
      style={{
        position: "absolute",
        height: "100vh",
        width: "100vw",
      }}
    />
  );
}
```

The MapLibreMap component takes three props:

- mapId: A string that represents the ID of the MapLibre-gl (wrapper) instance in mapContext.
- style: A CSS style definition passed to the map container HTML element.
- options: A config object that is passed to the MapLibre-gl constructor as the first parameter.

## Advanced Usage

You can customize the background style of your map by changing the options.style prop, which is a URL that refers to a style JSON file that adheres the Mapbox style specification or the resolved object. Here's an example of how to create a MapLibreMap component that allows the user to switch between two different styles:

```jsx
import { useState } from "react";
import { Button } from "@mui/material";
import { MapLibreMap } from "@mapcomponents/react-maplibre";
import { TopToolbar } from "./Toolbar";

const styles = [
  {
    name: "OSM-Bright",
    url: "https://wms.wheregroup.com/tileserver/style/osm-bright.json",
  },
  {
    name: "OSM-Fiord-Color",
    url: "https://wms.wheregroup.com/tileserver/style/osm-fiord-color.json",
  },
];

const StyleChangeTemplate = (args) => {
  const [activeStyle, setActiveStyle] = useState(styles[1].url);

  return (
    <>
      <TopToolbar
        buttons={styles.map((style) => (
          <Button
            key={style.name}
            variant={activeStyle === style.url ? "contained" : "outlined"}
            onClick={() => {
              setActiveStyle(style.url);
            }}
            sx={{ marginRight: { xs: "0px", sm: "10px" } }}
          >
            {style.name}
          </Button>
        ))}
      />
      <MapLibreMap options={{ ...args.options, style: activeStyle }} />
    </>
  );
};
```

<iframe
  id="iframe--core-maplibremap--style-change-config"
  title="Style Change Config"
  src="https://mapcomponents.github.io/react-map-components-maplibre/iframe.html?viewMode=story&amp;id=core-maplibremap--style-change-config"
  allowfullscreen=""
  loading="lazy"
  style={{ width: "100%", height: "500px", border: "0px none" }}
></iframe>

In this example, we define an array of two styles and map over them to create two Button components that allow the user to switch between them. We use the activeStyle state variable to keep track of the currently selected style.

## Links

- [MapLibreMap Documentation](https://mapcomponents.github.io/react-map-components-maplibre/?path=/docs/core-maplibremap--example-config)
- [Mapbox Style Specification](https://docs.mapbox.com/mapbox-gl-js/style-spec/)

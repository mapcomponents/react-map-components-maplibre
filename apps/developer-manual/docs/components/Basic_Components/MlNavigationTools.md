# MlNavigationTools

### Overview

`MlNavigationTools` is a React component for map interaction and navigation controls in web applications, integrating functionalities such as 3D view toggling, zooming, GPS following, and centering on the current location. It is designed for use with MapLibre-based maps and offers customizable options for map navigation.

### Functionality

#### Core Features

- **Compass:** Displays a compass for orientation on the map.
- **3D View Toggle:** Allows users to switch between 2D and 3D views of the map, controlled by the `show3DButton` prop. It toggles the map's pitch between 0 and 60 degrees.
- **Zoom Controls:** Two buttons enable users to zoom in or out, respecting the map's zoom limits.
- **GPS Follow and Center Location:** Features to activate GPS tracking (`showFollowGpsButton`) and center the map on the current location (`showCenterLocationButton`).

#### Additional Configurations

- **Layering and Insertion:** Specifies the target MapLibre instance (`mapId`) and the layer for visual rendering (`insertBeforeLayer`).
- **Custom JSX Elements:** Renders additional JSX elements below the navigation buttons (`children` prop).
- **Styling:** Custom styling for the NavigationTools container (`sx` prop).
- **Responsive Design:** Adapts to different screen sizes (`mediaIsMobile`), altering positioning and margins.

#### Internal Mechanisms

- **Map Interaction:** Uses a `useMap` hook for interacting with the MapLibre instance.
- **State Management:** Manages internal state to track the map's pitch.
- **Event Handling:** Listens to the `pitchend` event to update pitch state.

#### Default Properties

- `mapId`: undefined
- `show3DButton`: true
- `showFollowGpsButton`: true
- `showCenterLocationButton`: false
- `showZoomButtons`: true

### Usage

`MlNavigationTools` is used in web applications for map interactions, providing an interface for basic navigations like zooming, 2D/3D view toggling, and advanced features like GPS tracking and centering on the current location.

#### Basic Usage

```javascript
import { MlNavigationTools } from "@mapcomponents/react-maplibre";
```

```javascript
<MlNavigationTools showFollowGpsButton={false} showZoomButtons={false} />
```

#### Advanced Usage

With one custom button:

```javascript
import { MlNavigationTools } from "@mapcomponents/react-maplibre";
import BuildIcon from "@mui/icons-material/Build";
import Button from "@mui/material/Button";
```

```javascript
<MlNavigationTools
  sx={{ top: "80px" }}
  show3DButton={true}
  showFollowGpsButton={true}
  showCenterLocationButton={false}
  showZoomButtons={true}
>
  <Button variant="navtools" onClick={() => {}}>
    <BuildIcon sx={{ fontSize: { xs: "1.4em", md: "1em" } }} />
  </Button>
</MlNavigationTools>
```

<iframe
  id="iframe--core-maplibremap--style-change-config"
  title="Style Change Config"
  src="https://mapcomponents.github.io/react-map-components-maplibre/iframe.html?viewMode=story&amp;id=mapcomponents-mlnavigationtools--custom-button"
  allowfullscreen=""
  loading="lazy"
  style={{ width: "100%", height: "500px", border: "0px none" }}
></iframe>

### Links

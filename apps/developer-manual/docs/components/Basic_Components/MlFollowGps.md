# MlFollowGps

Adds a button that makes the map follow the users GPS position using `navigator.geolocation.watchPosition` if activated. The component is part of the `MlNavigationtools` component. If the browser API access is denied the button will get disabled.
It provides GPS tracking functionality, allowing a map to follow the user's current position and orientation.

Visit the storybook for a [complete list of properties & documentation](https://mapcomponents.github.io/react-map-components-maplibre/?path=/docs/mapcomponents-mlfollowgps--standard-config).

### Functionality

- **GPS Position Tracking:** The component tracks the user's GPS position using the `navigator.geolocation.watchPosition` method.

- **Map Centering Options:** Users have the option to automatically center the map on their current position. This can be set to occur either once when the component is activated or continuously as the location updates. The centering behavior can be smooth (using `flyTo`) or direct (using `setCenter`).

- **User Location Display:** If enabled, the user's location is marked on the map. This visual representation is customizable and is achieved through a GeoJSON Point feature.

- **Orientation Display:** The component can show the device's orientation relative to the user's location. This is visually represented as a cone on the map, indicating the direction in which the device is facing.

- **Accuracy Circle Visualization:** For a more accurate representation, a circle indicating the GPS accuracy can be displayed around the user's location. The geolocation API provides this information as a radius in meters, which is used to draw a circle around the user's location.

## Basic Usage

```jsx
<MlFollowGps followUserPosition={false} />
```

<iframe
  id="iframe--core-maplibremap--style-change-config"
  title="Style Change Config"
  src="https://mapcomponents.github.io/react-map-components-maplibre/iframe.html?args=&id=mapcomponents-mlfollowgps--catalogue-demo&viewMode=story"
  allowfullscreen=""
  loading="lazy"
  style={{ width: "100%", height: "500px", border: "0px none" }}
></iframe>

## Links

- storybook: https://mapcomponents.github.io/react-map-components-maplibre/?path=/docs/mapcomponents-mlfollowgps--standard-config
- geolocation API: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API

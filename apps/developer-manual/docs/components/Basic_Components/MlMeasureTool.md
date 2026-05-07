# MlMeasureTool

The `MlMeasureTool` facilitates the measurement of either area or length on a map. It integrates with a feature editor component (MlFeatureEditor) to allow users to draw geometries (polygons or lines) directly onto the map. This component supports both polygon and line measurements, with configurable units of measurement.

Visit the storybook for a [complete list of properties & documentation](https://mapcomponents.github.io/react-map-components-maplibre/?path=/docs/mapcomponents-mlmeasuretool--measure-line).

### Functionality:

- **Measurement Types:** The component can measure either areas (polygons) or lengths (lines), determined by the `measureType` prop.

- **Units of Measurement:** It supports various units of measurement (like kilometers, miles), specified through the `unit` prop. The display adjusts automatically between square units for area measurement and linear units for length.

- **Measurement Calculation:** When a geometry is drawn or modified, the component calculates the area (in square units) or length (in linear units) of the feature. For areas, the calculation is done in square kilometers or square miles, and for lengths, in kilometers or miles. The component can also display smaller units (meters or inches) for more precise measurements.

- **Change Handling:** The component has an `onChange` callback prop, which is triggered every time there's a change in the measurement. This callback receives the new measurement value, the unit of measurement, and the corresponding GeoJSON object as parameters.

- **Responsive Design:** The component updates its state and UI based on changes in the selected features or unit of measurement.

**Note:** There can only be one active MlMeasureTool or MlFeatureEditor (used by MlMeasureTool to draw measure geometries) component used per map instance at a time.

## Basic Usage

### Measure line example

```jsx
<MlMeasureTool measureType={"line"} unit={"kilometers"} />
```

<iframe
  id="iframe--core-maplibremap--style-change-config"
  title="Style Change Config"
  src="https://mapcomponents.github.io/react-map-components-maplibre/iframe.html?viewMode=story&amp;id=mapcomponents-mlmeasuretool--measure-line"
  allowfullscreen=""
  loading="lazy"
  style={{ width: "100%", height: "500px", border: "0px none" }}
></iframe>

https://mapcomponents.github.io/react-map-components-maplibre/?path=/docs/mapcomponents-mlmeasuretool--measure-line

### Measure polygon example

```jsx
<MlMeasureTool measureType={"polygon"} unit={"kilometers"} />
```

<iframe
  id="iframe--core-maplibremap--style-change-config"
  title="Style Change Config"
  src="https://mapcomponents.github.io/react-map-components-maplibre/iframe.html?viewMode=story&amp;id=mapcomponents-mlmeasuretool--measure-polygon"
  allowfullscreen=""
  loading="lazy"
  style={{ width: "100%", height: "500px", border: "0px none" }}
></iframe>

https://mapcomponents.github.io/react-map-components-maplibre/?path=/docs/mapcomponents-mlmeasuretool--measure-polygon

## Links

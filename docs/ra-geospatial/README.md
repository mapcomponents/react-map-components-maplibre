<img src="https://avatars.githubusercontent.com/u/64851912" alt="MapComponents logo" width="80"/>

# @mapcomponents/ra-geospatial

[![npm version](https://badge.fury.io/js/@mapcomponents%2Fra-geospatial.svg)](https://badge.fury.io/js/@mapcomponents%2Fra-geospatial) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT) ![downloads](https://img.shields.io/npm/dt/@mapcomponents%2Fra-geospatial.svg) ![downloads](https://img.shields.io/npm/dm/@mapcomponents%2Fra-geospatial.svg)

Input and view components to work with geospatial data in react admin. This package is based on @mapcomponents/react-maplibre and uses MapLibre-gl to display geospatial data on a map.

![RaGeospatialInput & RaGeospatialShow](https://github.com/mapcomponents/ra-geospatial/blob/main/assets/ra_geospatial_screenshots.png?raw=true)

RaGeospatialInput & RaGeospatialShow used to edit a polygon geometry in a react-admin application.

## Demos

- [react admin & mapcomponents Demo](https://cioddi.github.io/mc-react-admin-apps/react-admin-demo)
- [webGIS Demo (embeddedMap: false)](https://cioddi.github.io/mc-react-admin-apps/webgis-demo)

## Installation

```bash
yarn add @mapcomponents/ra-geospatial
```

## Exports

### RaGeospatialInput

Input component to edit or create geospatial data.

### RaGeospatialShow

Show component to display geospatial data.

#### Props

- **embeddedMap**: boolean (default: false) - If true, the map will be embedded in the component. If false, the component will not create it's own MapContext and add a MapLibreMap component but instead expect a MapContext and a MapLibreMap component to be present in the parent component.

## Examples

```JSX
import {
  RaGeospatialInput,
  RaGeospatialShow,
} from "@mapcomponents/ra-geospatial";

export const PoiEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="title" />
      <TextInput source="geom" />
      <RaGeospatialInput source="geom" />
    </SimpleForm>
  </Edit>
);
export const PoiCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="title" />
      <TextInput source="geom" />
      <RaGeospatialInput source="geom" />
    </SimpleForm>
  </Create>
);

export const PoiShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="title" />
      <RaGeospatialShow source="geom" />
    </SimpleShowLayout>
  </Show>
);
```

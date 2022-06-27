<img src="https://avatars.githubusercontent.com/u/64851912" alt="MapComponents logo" width="200"/>

# [MapComponents MapLibre](https://mapcomponents.org/)

[![npm version](https://badge.fury.io/js/@mapcomponents%2Freact-maplibre.svg)](https://badge.fury.io/js/@mapcomponents%2Freact-maplibre) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT) ![downloads](https://img.shields.io/npm/dt/@mapcomponents%2Freact-maplibre.svg) ![downloads](https://img.shields.io/npm/dm/@mapcomponents%2Freact-maplibre.svg)

![Tests](https://github.com/mapcomponents/react-map-components-maplibre/actions/workflows/node_version_test.yml/badge.svg)

@mapcomponents/react-maplibre is a react component library for declarative GIS application development.
## Links

- Documentation: https://mapcomponents.github.io/react-map-components-maplibre/
- Catalogue: https://www.mapcomponents.org/

## Getting started

Use our Codesandbox template to quickly try out this library without any setup required. https://codesandbox.io/s/base-template-n0vp9

### **How to use @mapcomponents/react-maplibre in ...**

### **... a new project**

The easiest way to start a new project using this framework is to bootstrap a react application using our [create-react-app-template](https://github.com/mapcomponents/react-map-components-maplibre-cra-template).

**Requirements:**

1. node.js >=16
2. yarn

Run the following commands in the terminal:

1. `npx create-react-app {your-app-name} --template @mapcomponents/cra-template`
2. `cd {your-app-name}`
3. `yarn start`

This will start a development server that serves the mapcomponents app on port 3000 of your local machine as well as a browser tab with live reload enabled. This reloads the affected parts of the application if changes are detected to the corresponding files in the filesystem. Open the project folder in the IDE of your choice and start building your map client.

### **... an existing react project**

In this case, navigate to your project folder in a terminal and execute the following steps:

1. Add @mapcomponents/react-maplibre as a dependency to your project using `yarn add @mapcomponents/react-maplibre` or `npm i @mapcomponents/react-maplibre` depending on which package manager you prefer.
2. Add the MapComponentsProvider (named export of this module) to your applications react-DOM where it makes sense. Only children of this component will be able to render a map canvas or interact with a maplibre-gl instance. Place it in the index.js entrypoint if your application is a dedicated map app and all components have a high probability to interact with the maplibre-gl instance. Place it somewhere higher in the JSX tree if the map constitutes only a small portion of your app and components outside of the MapComponentsProvider have no need to interact with the map instance.
3. Add a MapLibreMap component to the react-DOM wherever the map canvas is supposed to be placed.

## How it works
### Anatomy of a MapComponent

A MapComponent is a react component that accepts at least 1 attribute "mapId" (there are some exceptions) and is expected to retrieve a maplibre-gl instance from mapContext and directly manipulate it or watch its state. 
An example implementation of basic required functions for the maplibre instance retrieval process using the useMap hook, can be seen in [./components/MlComponentTemplate/MlComponentTemplate.tsx](https://github.com/mapcomponents/react-map-components-maplibre/blob/main/src/components/MlComponentTemplate/MlComponentTemplate.tsx)
If no attribute mapId is provided the map component is expected to work with the map instance provided by mapContext at ```mapContext.map``` (the first maplibre instance that is registered in MapContext).


### Cleanup functions

To make sure a component cleans up anything it has added to the MapLibre instance when it is removed from reactDOM, declare a reference to the map instance using the useRef hook. 

**- Retrieve the maplibre instance using the useMap hook**

This happens within the effect that discovers the map instance for the first time (watch the mapContext.mapIds state variable for added or removed map engine instances).

```js

  const mapHook = useMap({
    mapId: props.mapId,
    waitForLayer: props.insertBeforeLayer,
  });

  useEffect(() => {
    if (!mapHook.map) return;
    // the MapLibre-gl instance (mapHook.map) is accessible here
    // initialize the layer and add it to the MapLibre-gl instance or do something else with it

    // optionally add layers, sources, event listeners, controls, images to the MapLibre instance that are required by this component
    mapHook.map.addLayer(
        {/*layer-config*/},
        props.insertBeforeLayer,
        mapHook.componentId)

  }, [mapHook.map]);

```
**- Component cleanup function**

After everything has been undone set the map reference (mapRef.current) to undefined.

```js

  useEffect(() => {

    return () => {
      // This is the cleanup function, it is called when this react component is removed from react-dom
        mapHook.cleanup();
    };
  }, []);

```


**- addLayer, addSource, addImage, addControls, on**

The functions mentioned above have been overridden in the MapLibreGlWrapper instance that is referenced by mapHook.map.
All five functions expect an additional optional parameter "component_id" (string) as their last or optional parameter (except for the beforeLayerId parameter of the addLayer function, which should be defined as props.beforeLayerId to make sure the parent component is able to control the layer order).
A uuid `componentId` property is generated and available on the object returned by mapHook.
MapLibreGlWrapper uses the component_id to keep track of everything that has been added by a specific component (including implicitly added sources), enabling a safe and simple cleanup by calling ```mapHook.cleanup()``` as shown in the cleanup function example above.

## more links

- @mapcomponents/react-maplibre-lab storybook: https://mapcomponents.github.io/react-map-components-maplibre-lab

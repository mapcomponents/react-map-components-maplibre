<img src="https://avatars.githubusercontent.com/u/64851912" alt="MapComponents logo" width="200"/>

# [MapComponents MapLibre](https://mapcomponents.org/)

[![npm version](https://badge.fury.io/js/@mapcomponents%2Freact-maplibre.svg)](https://badge.fury.io/js/@mapcomponents%2Freact-maplibre) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT) ![downloads](https://img.shields.io/npm/dt/@mapcomponents%2Freact-maplibre.svg) ![downloads](https://img.shields.io/npm/dm/@mapcomponents%2Freact-maplibre.svg)

![Tests](https://github.com/mapcomponents/react-map-components-maplibre/actions/workflows/node_version_test.yml/badge.svg)


## Getting started (Using the storybook dev server)

1. Clone the repository and ```cd``` into the folder 
2. Run ```yarn``` to install all dependencies.
3. Run ```yarn start``` to start the storybook server. It will watch files for changes and reload affected components. If cleanup functions are incomplete it might be required to reload the browser tab.

### Create a new component

1. Run ```yarn create-component {component-name}``` to create a new map component based on ./src/components/MlComponentTemplate/. It has to start with a capital letter and preferably with the prefix "Ml" if it is a MapLibre component, to follow the naming conventions of this repository.
2. The new component should become available within your storybook webinterface. Start the component development inside the component file (former MlComponentTemplate.js) and see the changes reflected in your browser.
3. Once the component is ready to be published to the MapComponents catalogue, remove the ```_``` from the meta.json file ({component_name}.meta_.json) and to have it included in the next release.

### Create a new example application

1. Follow all steps of "Create a new component"
2. Change the value of the property "type" in {component_name}.meta.json to "application"

## Project setup

### Starting a new project

Fork our codesandbox project setup template to get started instantly. https://codesandbox.io/s/base-template-n0vp9

### Integrate MapComponents into an existing react project

1. Add the dependency ```yarn add @mapcomponents/react-maplibre```
2. Add a MapcomponentsProvider to your react-dom (e.g.  https://codesandbox.io/s/base-template-n0vp9?file=/src/index.js)
3. Add a MapLibreMap and any MapComponent you like to use in your app below MapcomponentsProvider.
## Anatomy of a MapComponent

A MapComponent is a react component that accepts at least 1 attribute "mapId" (there are some exceptions) and is expected to retrieve a maplibre-gl instance from mapContext and directly manipulate it or watch its state. 
An example implementation of basic required functions for the maplibre instance retrieval process using the functions getMap, mapExists provided by mapContext, both accepting "mapId" (string) as parameter, can be seen in ./components/MlComponentTemplate/MlComponentTemplate.js. 
If no attribute mapId is provided the map component is expected to work with the map instance provided by mapContext at ```mapContext.map``` (it is recommended to retrieve it using ```mapContext.getMap(props.mapId)```).


### File structure

```
./src/components/{component_name}/
├── {component_name}.doc.en.md
├── {component_name}.doc.de.md
├── {component_name}.meta.json 
├── {component_name}.js 
├── {component_name}.test.js 
└── {component_name}.stories.js
```

### {component_name}.js

React component implementation

#### Common conventions

##### Cleanup functions

To make sure a component cleans up anything it has added to the MapLibre instance when it is removed from reactDOM declare a reference to the map instance using the useRef hook. 

**- Reference declaration**

```js
  const mapRef = useRef(undefined);
```

**- Component cleanup function**

After everything has been undone set the map reference (mapRef.current) to undefined.

```js
  useEffect(() => {
    let _componentId = componentId.current;

    return () => {
      // This is the cleanup function, it is called when this react component is removed from react-dom
      if (mapRef.current) {
        mapRef.current.cleanup(_componentId);

        mapRef.current = undefined;
      }
    };
  }, []);
```

**- Reference population**

This happens within the effect that discovers the map instance for the first time (watch the mapContext.mapIds state variable for added or removed map engine instances).

```js
  useEffect(() => {
    if (!mapContext.mapExists(props.mapId) || initializedRef.current) return;
    // the MapLibre-gl instance (mapContext.map) is accessible here
    // initialize the layer and add it to the MapLibre-gl instance or do something else with it

    // set initializedRef.current to true to make sure this function gets only called once
    initializedRef.current = true;

    // populate the map reference
    mapRef.current = mapContext.getMap(props.mapId);

    // optionally add layers, sources, event listeners, controls, images to the MapLibre instance that are required by this component
    // see the next section about adding content to the MapLibre instance

  }, [mapContext.mapIds, mapContext, props, transitionToGeojson]);
```

**- addLayer, addSource, addImage, addControls, on**

The function mentioned above have been overriden in the MapLibreGlWrapper instance that is returned by the mapContext.getMap(props.mapId) function. 
All five functions expect an additional optional parameter "component_id" (string) as last or optional parameter (except for the beforeLayerId parameter of the addLayer function, which should be defined as props.beforeLayerId to make sure the parent component is able to control the layer order).
MapLibreGlWrapper uses the component_id to keep track of everything that has been added by a specific component (including implicitly added sources), enabling a safe and simple cleanup by calling ```mapRef.current.cleanup(component_id)``` as shown in the cleanup function example above.

### {component_name}.meta.json *//catalogue only*

Additional meta data regarding the component, this file is required for the component to become listed in the catalogue

```json
{
  "name":        "{component_name}", // must be identical to the react component name (string)
  "title":       "",                 // english component title (string)
  "description": "",                 // english short description (string)
  "i18n":{
    "de":{
      "title":       "",                 // german component title (string)
      "description": "",                 // german short description (string)
    }
  },
  "tags":        [ "Map add-on" ],   // list of tags (Array<string>)
  "category":    "add-ons",          // category (string)
  "type":        "component",        // type "component" or "application" (string)
}
```

### {component_name}.doc.en.md *//catalogue only*
### {component_name}.doc.de.md *//catalogue only*

Description text, that is shown on the catalogue component detail page below the main image

### {component_name}.stories.js *//storybook only*

Example implementation of a component in context with all required dependent components to showcase the basic functionality of a single component. Decorators to choose from are located in ./src/decorators/. During development the command ```yarn start``` will start a server (localhost:6006) with live reload functionality. In case of example applications the stories are used as a wrapper to make the application available in the storybook build that is later used to access working demos from within the catalogue.

More information on writing storybook stories for react components: https://storybook.js.org/docs/react/get-started/browse-stories

# Tests

```
yarn test
```

will watch the filesystem for changes and run all jest tests for affected components.


# Building the documentation

Install the dependencies globally:

```
yarn global add jsdoc parcel-bundler
```

Build the documentation:

```
yarn docs-create
```

Serve the documentation:

```
yarn docs-serve
```

# Catalogue

## Screenshots

To make a component screenshot appear in the catalogue manually create a png like ./public/thumbnails/{component_name}.png and push it to the repository, it will be included in the catalogue in the next catalogue deployment.
# MapComponents MapLibre

## Getting started

1. Clone the repository 
2. ```cd``` into the folder and 
3. Run ```yarn``` to install all dependencies.
4. Run ```yarn storybook``` to start the storybook server. It will watch files for changes and hot-reload affected components. If cleanup functions are incomplete it can be required to reload the browser.

### Create a new component

2. Run ```yarn create-component {component-name}``` to create a new Map-component based on ./src/components/MlComponentTemplate/. It must start with a capital letter because it is a react component and preferably start with the prefix "Ml" if it is a MapLibre component, to follow the naming conventions of this repository.
2. The new component should become available within your storybook webinterface. Start the component development inside the component file (former MlComponentTemplate.js) and see the changes reflected in your browser.
3. Once the component is ready to be published to the MapComponents catalogue, remove the ```_``` from the meta.json file ({component_name}.meta_.json) and it will be included in the next release.

### Create a new example application

1. Follow all steps of "Create a new component"
2. Change the value of the property "type" in {component_name}.meta.json to "application"

## Anatomy of a MapComponent

A MapComponent is a react component that accepts at least 1 attribute "mapId" and is expected to retrieve and directly manipulate a maplibre-gl instance from mapContext. 
An example implementation of basic required functions for the maplibre instance retrieval process using the functions getMap, mapExists provided by mapContext, both accepting "mapId" (string) as parameter, can be seen in ./components/MlComponentTemplate/MlComponentTemplate.js. 
If no attribute mapId is provided the map component is expected to work with the map instance provided by mapContext at ```mapContext.map``` (always retrieve it using ```mapContext.getMap(props.mapId)```).


### File structure

```
./src/components/{component_name}/
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

To make sure a component cleans up the MapLibre instance after it has been removed from reactDOM declare a reference to the map instance using the useRef hook. 

**- Reference declaration**

```
  const mapRef = useRef(null);
```

**- Component cleanup function**

After everything has been undone it is important to set the map reference (mapRef.current) to null.

```
  useEffect(() => {
    let _componentId = componentId.current;

    return () => {
      // This is the cleanup function, it is called when this react component is removed from react-dom
      if (mapRef.current) {
        mapRef.current.cleanup(_componentId);

        mapRef.current = null;
      }
    };
  }, []);
```

**- Reference population**

This happens within the effect where the targeted (through props.mapId) map instance is discovered for the first time.

```
  useEffect(() => {
    if (!mapContext.mapExists(props.mapId) || initializedRef.current) return;
    // the MapLibre-gl instance (mapContext.map) is accessible here
    // initialize the layer and add it to the MapLibre-gl instance or do something else with it

    // set initializedRef.current to true to make sure this function gets only called once
    initializedRef.current = true;

    // populate the mapRef.current variable
    mapRef.current = mapContext.getMap(props.mapId);

    // optionally add layers, sources, event listeners, controls, images to the MapLibre instance that are required by this component
    // see the next section about adding content to the MapLibre instance

  }, [mapContext.mapIds, mapContext, props, transitionToGeojson]);
```

**- addLayer, addSource, addImage, addControls, on**

The function mentioned above have been overriden in the MapLibreWrapper instance that is return by the mapContext.getMap(props.mapId) function. 
All five functions expect an additional optional parameter "component_id" (string) as last or optional parameter (except for the beforeLayerId parameter of the addLayer function, which should be defined as props.beforeLayerId to make sure the parent component is able to control the layer order).
MapLibreGlWrapper uses the component_id to keep track of everything that has been added by a specific component (including inmplicitly added sources), enabling a safe and simple cleanup by calling ```mapRef.current.cleanup(component_id)``` as shown in the cleanup function example above.

### {component_name}.meta.json

Additional meta data regarding the component, this file is required for the component to become listed in the catalogue

```
{
  "name":        "{component_name}", // must be identical to the react component name (string)
  "title":       "",                 // german component title (string)
  "description": "",                 // german short description (string)
  "tags":        [ "Map add-on" ],   // list of tags (Array<string>)
  "category":    "add-ons",          // category (string)
  "type":        "component",        // type "component" or "application" (string)
}
```

### {component_name}.doc.de.md

Description text, that is shown on the catalogue component detail page below the main image

### {component_name}.stories.js

Example implementation of a component in context with all required dependent components to showcase the basic functionality of a single component. Decorators to choose from are located in ./src/decorators/. During development the command ```yarn storybook``` will start a server (localhost:6006) with live reload functionality. In case of example applications the stories are used as a wrapper to make the application available in the storybook build that is later used to access working demos from within the catalogue.

Storybook stories are also used to generate screenshots of each component. The command ```yarn test``` will run automated jest tests. To make a component screenshot appear in the catalogue manually create a png like ./public/thumbnails/{component_name}.png and push it to the repository, it will be included in the catalogue in the next catalogue deployment.

More information on writing storybook stories for react components: https://storybook.js.org/docs/react/get-started/browse-stories

## LoadingOverlay and LoadingOverlayProvider (currently located in ./ui_components/)

The loading overlay component is added in the storybook decorator.
Without any further configuration it will listen for new MapLibre instances registered in MapContext and fade out once all of them have fired an "IDLE" event. For more precise control the LoadingOverlayContext provides a ```loadingOverlayContext.setControlled(true)``` function that will, if called with true as first parameter, switch the LoadingOverlay to manual control. Once the application has loaded completely call the ```loadingOverlayContext.setLoadingDone(true)``` function to trigger the LoadingOverlay Component to fade out.

For decorator integration examples check the storybook decorators located in ./decorators/.
For controlled LoadingOverlay examples please see MlLaermkarte (story & component).

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

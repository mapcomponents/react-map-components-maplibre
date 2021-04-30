# MapComponents MapLibre

## Getting started

1. Clone the repository 
2. ```cd``` into the folder and 
3. Run ```yarn``` to install all dependencies.
4. Run ```yarn storybook``` to start the storybook server. It will watch files for changes and hot-reload affected components. If cleanup functions are incomplete it can be required to reload the browser.

### Create a new component

1. Duplicate the folder MlComponentTemplate
2. Rename (the "MlComponentTemplate" part) of the new folder and the containing files to whatever you want to call the new component. It must start with a capital letter because it is a react component and preferably start with the prefix "Ml" if it is a MapLibre component, to follow the naming conventions of this repository.
3. The new component should become available within your storybook webinterface. Start the component development inside the component file (former MlComponentTemplate.js) and see the changes reflected in your browser.
4. Once the component is ready to be published to the MapComponents catalogue, remove the ```_``` from the meta.json file ({component_name}.meta_.json) and it will be included in the next release.

### Create a new example application

1. Follow all steps of "Create a new component"
2. Change the value of the property "type" in {component_name}.meta.json to "application"

## Anatomy of a MapComponent

A MapComponent is a react component that accepts at least 1 attribute "mapId" and is expected to retrieve and directly manipulate a maplibre-gl instance from mapContext. 
An example implementation of basic required functions for the maplibre instance retrieval process using the functions getMap, mapExists provided by mapContext, both accepting "mapId" (string) as parameter, can be seen in ./components/MlBasicCompontent.js. For components with a basic functionality it may be sufficient to make use of the MlBasicComponent and just provide the attributes "mapId" (string), "mapIsReady" (function), "cleanup" (function) as can be seen in ./components/MlDeckGlLayer/MlDeckGlLayer.
If no attribute mapId is provided the map component is expected to work with the map instance provided by mapContext at ```mapContext.map```.


### File structure

```
./src/components/{component_name}/
├── {component_name}.doc.de.md
├── {component_name}.meta.json 
├── {component_name}.js 
└── {component_name}.stories.js
```

### {component_name}.js

React component implementation

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
  "price":       5000                // price in € (integer)
}
```

### {component_name}.doc.de.md

Description text, that is shown on the catalogue component detail page below the main image

### {component_name}.stories.js

Example implementation of a component in context with all required dependent components to showcase the basic functionality of a single component. Decorators to choose from are located in ./src/decorators/. During development the command ```yarn storybook``` will start a server (localhost:6006) with live reload functionality. In case of example applications the stories are used as a wrapper to make the application available in the storybook build that is later used to access working demos from within the catalogue.

Storybook stories are also used to generate screenshots of each component. The command ```yarn test``` (requires a running instance of ```yarn storybook``` at localhost:6006) will run automated visual regression tests for each defined story using the storyshots plugin and place the resulting screenshots in ```./src/__image_snapshots__/```. A curated list of component story screenshots is located in ```./public/__image_snapshots__/```. Screenshots that turned out well can be manually copied into this folder and committed to git to be used in the next catalogue build.

More information on writing storybook stories for react components: https://storybook.js.org/docs/react/get-started/browse-stories

## LoadingOverlay and LoadingOverlayProvider (currently located in ./ui_components/)

The loading overlay component is added in the storybook decorator.
Without any further configuration it will listen for new MapLibre instances registered in MapContext and fade out once all of them have fired an "IDLE" event. For more precise control the LoadingOverlayContext provides a ```loadingOverlayContext.setControlled(true)``` function that will, if called with true as first parameter, switch the LoadingOverlay to manual control. Once the application has loaded completely call the ```loadingOverlayContext.setLoadingDone(true)``` function to trigger the LoadingOverlay Component to fade out.

For decorator integration examples check the storybook decorators located in ./decorators/.
For controlled LoadingOverlay examples please see MlLaermkarte (story & component).

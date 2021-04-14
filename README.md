# MapComponents MapLibre


## Anatomy of a MapComponent

A MapComponent is a react component that accepts at least 1 attribute "mapId" and is expected to retrieve and directly manipulate a maplibre-gl instance from mapContext. 
An example implementation of basic required functions for the maplibre instance retrieval process (getMap, mapExists [Now that I am writing this I realize that these functions should be provided by mapContext instead, both accepting "mapId" (string) as parameter]) can be seen in ./components/MlBasicCompontent. For components with a basic functionality it may be sufficient to make use of the MlBasicComponent and just provide the attribute "mapId" (string), "mapIsReady" (function), "cleanup" (function) as can be seen in ./components/.
If no attribute mapId is provided the map component is expected to work with the map instance provided by mapContext at ```mapContext.map```.


### File structure

```
./src/components/{component_name}/
├── {component_name}.doc.de.md // description text, that is shown on the catalogue component detail page below the main image
├── {component_name}.js // react component implementation
├── {component_name}.meta.json // additional meta data regarding the component, this file is required for the component to become listed in the catalogue
└── {component_name}.stories.js // example implementation of a component in context with all required dependent components to showcase the basic functionality of a single component. Decorators to choose from are located in ./src/decorators/. During development the command ```yarn storybook``` will start a server (localhost:6006) with live reload functionality. In case of example applications the stories are used as a wrapper to make the application available in the storybook build that is later used to access working demos from within the catalogue.
```



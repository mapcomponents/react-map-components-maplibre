# MapComponents MapLibre


## Anatomy of a MapComponent

A MapComponent is a react component that accepts at least 1 attribute "mapId" and is expected to retrieve and directly manipulate a maplibre-gl instance from mapContext. 
An example implementation of basic required functions for the maplibre instance retrieval process (getMap, mapExists [Now that I am writing this I realize that these functions should be provided by mapContext instead, both accepting "mapId" (string) as parameter]) can be seen in ./components/MlBasicCompontent. For components with a basic functionality it may be sufficient to make use of the MlBasicComponent and just provide the attribute "mapId" (string), "mapIsReady" (function), "cleanup" (function) as can be seen in ./components/.
If no attribute mapId is provided the map component is expected to work with the map instance provided by mapContext at ```mapContext.map```.


### File structure

```
./src/components/{component_name}/
├── {component_name}.doc.de.md
├── {component_name}.meta.json 
├── {component_name}.js 
└── {component_name}.stories.js
```

### MlThreeJsLayer.js

React component implementation

### MlThreeJsLayer.meta.json

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

### MlThreeJsLayer.doc.de.md

Description text, that is shown on the catalogue component detail page below the main image

### MlThreeJsLayer.stories.js

Example implementation of a component in context with all required dependent components to showcase the basic functionality of a single component. Decorators to choose from are located in ./src/decorators/. During development the command ```yarn storybook``` will start a server (localhost:6006) with live reload functionality. In case of example applications the stories are used as a wrapper to make the application available in the storybook build that is later used to access working demos from within the catalogue.

Storybook stories are also used to generate screenshots of each component. The command ```yarn test``` (requires a running instance of ```yarn storybook``` at localhost:6006) will run automated visual regression tests for each defined story using the storyshots plugin and place the resulting screenshots in ./src/__image_snapshots__/. A curated list of component story screenshots is located in ./public/__image_snapshots__/. Screenshots that turned out well can be manually copied into this folder and committed to git to be used in the next catalogue build.

More information on writing storybook stories for react components: https://storybook.js.org/docs/react/get-started/browse-stories

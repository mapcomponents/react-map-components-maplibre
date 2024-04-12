### Anatomy of a MapComponent

A MapComponent is a react component that accepts at least 1 attribute "mapId" (there are some exceptions) and is expected to retrieve a maplibre-gl instance from mapContext and directly manipulate it or watch its state. 
An example implementation of basic required functions for the maplibre instance retrieval process using the useMap hook, can be seen in [./components/MlComponentTemplate/MlComponentTemplate.tsx](https://github.com/mapcomponents/react-map-components-maplibre/blob/main/src/components/MlComponentTemplate/MlComponentTemplate.tsx)
If no attribute mapId is provided the map component is expected to work with the map instance provided by mapContext at ```mapContext.map``` (the first maplibre instance that is registered in MapContext).


### Cleanup functions

Once a component is removed from reactDOM we need to make sure everything it has added to the maplibre-gl instance is removed with it. The mapHook offers a convenient way to do this. 

**- Retrieve the maplibre instance using the useMap hook**

Add `mapHook.map` to the dependency array of e.g. a useEffect hook to trigger it once the map instance becomes available.

```js

  const mapHook = useMap({
    mapId: props.mapId,
    waitForLayer: props.insertBeforeLayer,
  });

  useEffect(() => {
    if (!mapHook.map) return;
    // the MapLibre-gl instance (mapHook.map) is accessible here
    // initialize the layer and add it to the MapLibre-gl instance 

    // optionally add layers, sources, event listeners, controls, images to the MapLibre instance that are required by this component
    mapHook.map.addLayer(
        {/*layer-config*/},
        props.insertBeforeLayer,
        mapHook.componentId)

    return () => {
      mapHook.cleanup();
    }

  }, [mapHook.map]);

```
**- Component cleanup function**

`mapHook.cleanup()` will remove all ressources from the maplibre-gl instance that have been added using `mapHook.componentId` as additional parameter in `map.addLayer`, `map.addSource`, `map.on`, `map.addImage` or `map.addControl` calls.

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

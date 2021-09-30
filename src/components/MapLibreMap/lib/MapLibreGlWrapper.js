import maplibregl from "maplibre-gl/dist/maplibre-gl";

const MapLibreGlWrapper = function (props) {
  let self = this;

  // element registration and cleanup on a component level is experimental
  this.registeredElements = {};
  this.baseLayers = [];
  this.firstSymbolLayer = undefined;

  this.initRegisteredElements = (componentId, force) => {
    if (
      typeof self.registeredElements[componentId] === "undefined" ||
      (force !== "undefined" && force)
    ) {
      self.registeredElements[componentId] = {
        layers: [],
        sources: [],
        images: [],
        events: [],
        controls: [],
      };
    }
  };

  this.addLayer = (layer, beforeId, componentId) => {
    if (!self.map.style) {
      return;
    }
    if (
      componentId &&
      typeof componentId === "string" &&
      typeof layer.id !== "undefined"
    ) {
      self.initRegisteredElements(componentId);
      self.registeredElements[componentId].layers.push(layer.id);
    }

    self.map.addLayer(layer, beforeId);
  };

  this.addSource = (sourceId, source, options, componentId) => {
    if (!self.map.style) {
      return;
    }
    if (typeof options === "string" && typeof componentId === "undefined") {
      return self.addSource.call(self, sourceId, source, undefined, options);
    }
    if (
      componentId &&
      typeof componentId === "string" &&
      typeof sourceId !== "undefined"
    ) {
      self.initRegisteredElements(componentId);
      self.registeredElements[componentId].sources.push(sourceId);
    }

    self.map.addSource(sourceId, source, options);
  };

  this.addImage = (id, image, ref, componentId) => {
    if (!self.map.style) {
      return;
    }
    if (typeof ref === "string" && typeof componentId === "undefined") {
      return self.addImage.call(self, id, image, undefined, ref);
    }
    if (
      componentId &&
      typeof componentId === "string" &&
      typeof id !== "undefined"
    ) {
      self.initRegisteredElements(componentId);
      self.registeredElements[componentId].images.push(id);
    }

    self.map.addImage(id, image, ref);
  };

  this.on = (type, layerId, listener, componentId) => {
    if (typeof listener === "string" && typeof layerId === "function") {
      return self.on.call(self, type, undefined, layerId, listener);
    }

    let _arguments = [type, layerId, listener];
    if (!layerId) {
      _arguments = [type, listener];
    }

    if (componentId && typeof componentId === "string") {
      self.initRegisteredElements(componentId);
      self.registeredElements[componentId].events.push(_arguments);
    }

    self.map.on(..._arguments);
  };

  this.addControl = (control, position, componentId) => {
    if (componentId && typeof componentId === "string") {
      self.initRegisteredElements(componentId);
      self.registeredElements[componentId].controls.push(control);
    }

    self.map.addControl(control, position);
  };

  // cleanup function that remove anything that has been added to the maplibre instance referenced with componentId
  // be aware that this function only works with explicitly added elements e.g. sources implizitly added by addLayer calls still require manual removal
  this.cleanup = (componentId) => {
    //console.log("cleanup " + componentId);
    //console.log(self.registeredElements[componentId]);
    if (
      self.map.style &&
      typeof self.registeredElements[componentId] !== "undefined"
    ) {
      // cleanup layers
      self.registeredElements[componentId].layers.forEach((item) => {
        if (self.map.style.getLayer(item)) {
          self.map.style.removeLayer(item);
        }
      });

      // cleanup sources
      self.registeredElements[componentId].sources.forEach((item) => {
        if (self.map.style.getSource(item)) {
          self.map.style.removeSource(item);
        }
      });

      // cleanup images
      self.registeredElements[componentId].images.forEach((item) => {
        if (self.map.hasImage(item)) {
          self.map.style.removeImage(item);
        }
      });

      // cleanup events
      self.registeredElements[componentId].events.forEach((item) => {
        self.map.off(...item);
      });

      // cleanup controls
      self.registeredElements[componentId].controls.forEach((item) => {
        self.map.removeControl(item);
      });

      self.initRegisteredElements(componentId, true);
    }
  };

  // add style prop functions that require map._update to be called afterwards
  let updatingStyleFunctions = [
    //"addLayer",
    "moveLayer",
    "removeLayer",
    //"addSource",
    "removeSource",
    "setPaintProperty",
    "setLayoutProperty",
  ];
  updatingStyleFunctions.map((item) => {
    this[item] = (...props) => {
      if (self.map && this.map.style && typeof self.map.style[item] === "function") {
        self.map.style[item](...props);
      }
      return self.map._update ? self.map._update(true) : undefined;
    };
  });

  // add style prop functions
  let styleFunctions = [
    "getLayer",
    "getSource",
    "listImages",
    "getPaintProperty",
    "getLayoutProperty",
    "removeImage",
  ];
  styleFunctions.map((item) => {
    this[item] = (...props) => {
      if (self.map && self.map.style) {
        return self.map.style[item](...props);
      }
      return false;
    };
  });

  this.addNativeMaplibreFunctionsAndProps = () => {
    //  add MapLibre-gl functions
    Object.keys(this.map.__proto__).forEach((item) => {
      if (typeof this[item] === "undefined") {
        this[item] = (...props) => self.map[item](...props);
      }
    });

    //  add MapLibre-gl properties
    Object.keys(this.map).forEach((item) => {
      if (typeof this[item] === "undefined") {
        this[item] = self.map[item];
      }
    });
  };

  // add functions that are missing on the MapLibre instances prototype
  let missingFunctions = [
    "getZoom",
    "setZoom",
    "getCenter",
    "setCenter",
    "getBearing",
    "setBearing",
    "getPitch",
    "setPitch",
    "jumpTo",
    "flyTo",
    "panTo",
    "panBy",
    "panBy",
    "zoomTo",
    "zoomIn",
    "zoomOut",
    "getPadding",
    "setPadding",
    "rotateTo",
    "resetNorth",
    "resetNorthPitch",
    "snapToNorth",
    "cameraForBounds",
    "fitBounds",
    "fitScreenCoordinates",
    "getFreeCameraOptions",
    "setFreeCameraOptions",
    "easeTo",
    "stop",
  ];
  missingFunctions.forEach((item) => {
    this[item] = (...props) => {
      if (typeof self.map[item] === "function") {
        return self.map[item].call(self.map, ...props);
      }
      return undefined;
    };
  });

  // initialize the MapLibre-gl instance
  let initializeMapLibre = async () => {
    // if mapOptions style URL is given and if it is not a mapbox URL fetch the json and initialize the mapbox object
    if (
      typeof props.mapOptions.style === "string" &&
      props.mapOptions.style.indexOf("mapbox://") === -1
    ) {
      await fetch(props.mapOptions.style)
        .then((response) => response.json())
        .then((styleJson) => {
          styleJson.layers.forEach((item) => {
            self.baseLayers.push(item.id);
            if (!self.firstSymbolLayer && item.type === "symbol") {
              self.firstSymbolLayer = item.id;
            }
          });
          self.styleJson = styleJson;
          props.mapOptions.style = styleJson;
        });
    }

    self.map = new maplibregl.Map(props.mapOptions);

    self.addNativeMaplibreFunctionsAndProps();

    if (typeof props.onReady === "function") {
      props.onReady(self.map, self);
    }
  };
  initializeMapLibre();
};

export default MapLibreGlWrapper;

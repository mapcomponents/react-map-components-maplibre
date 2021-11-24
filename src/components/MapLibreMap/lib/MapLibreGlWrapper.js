import maplibregl from "maplibre-gl/dist/maplibre-gl";

/**
 * Creates a MapLibre-gl-js instance and offers all of the native MapLibre functions and properties as well as additional functionality such as element registration & cleanup and more events.
 *
 * @param {object} props
 *
 * @class
 */
const MapLibreGlWrapper = function (props) {
  // closure variable to safely point to the object context of the current MapLibreGlWrapper instance
  let self = this;

  // element registration and cleanup on a component level is experimental
  this.registeredElements = {};

  // array of base layer ids, all layers that have been added by the style passed to the MapLibreGl coonstructor
  this.baseLayers = [];

  // layer id of the first symbol layer
  this.firstSymbolLayer = undefined;

  // event handlers registered in MapLibreGlWrapper
  this.eventHandlers = {
    layerchange: [],
    viewportchange: [],
  };

  // functions and properties provided by the wrapper
  // Add new functions and properties introduced by the wrapper to this object to prevent collisions due to future MapLibre API changes
  this.wrapper = {
    /**
     * Subscribe the given event handler to an event
     *
     * @param {string} eventName
     * @param {function} handler
     * @param {object} options
     * @param {string} componentId
     * @returns {undefined}
     */
    on: (eventName, handler, options, componentId) => {
      if (!self.eventHandlers[eventName]) return;

      if(typeof options === 'string'){
        componentId = options;
        options = {};
      }

      self.eventHandlers[eventName].push({ handler, options });

      let _arguments = [eventName, handler];
      if (componentId && typeof componentId === "string") {
        self.initRegisteredElements(componentId);
        self.registeredElements[componentId].wrapperEvents.push(_arguments);
      }
    },
    /**
     * Unsubscribes the given event handler from an event
     *
     * @param {string} eventName
     * @param {function} handler
     * @returns {undefined}
     */
    off: (eventName, handler) => {
      if (!self.eventHandlers[eventName]) return;

      self.eventHandlers[eventName] = self.eventHandlers[eventName].filter((item) => {
        if (!Object.is(item.handler, handler)) {
          return item;
        }
      });
    },
    /**
     * Calls all event handlers that have been subscribed to the given eventName
     *
     * @param {string} eventName
     * @param {object} context
     * @returns {undefined}
     */
    fire: (eventName, context) => {
      if (!self.eventHandlers[eventName]) return;

      var scope = context || window;
      let event = new Event(eventName);
      event.data = self;

      self.eventHandlers[eventName].forEach(function (item) {
        item.handler.call(scope, event);
      });
    },
    /**
     * Array containing an object for each layer in the MapLibre instance providing information on visibility, loading state, order, paint & layout properties
     */
    layerState: {},
    /**
     * Maps layerIds to layerState in JSON string form for quick deep comparisons
     */
    layerStateStrings: {},
    /**
     * Previous Version of layerStateString
     */
    oldLayerStateStrings: {},
    /**
     * Builds the layer info object for a given layer id
     *
     * @param {string} layer
     * @returns object
     */
    buildLayerObject: (layer) => {
      //if (self.baseLayers.indexOf(layer.id) === -1) {
        let paint = {};
        let values = layer.paint?._values;
        Object.keys(values || {}).map((propName) => {
          paint[propName] =
            typeof values[propName].value !== "undefined"
              ? values[propName].value.value
              : values[propName];
        });
        let layout = {};
        values = layer.layout?._values;
        Object.keys(values || {}).map((propName) => {
          layout[propName] =
            typeof values[propName].value !== "undefined"
              ? values[propName].value.value
              : values[propName];
        });
        return {
          id: layer.id,
          type: layer.type,
          visible: layer.visibility === "none" ? false : true,
          baseLayer: self.baseLayers.indexOf(layer.id) !== -1,
          paint,
          layout,
          //filter: layers[layerId].filter,
          //layout: layers[layerId].layout,
          //maxzoom: layers[layerId].maxzoom,
          //metadata: layers[layerId].metadata,
          //minzoom: layers[layerId].minzoom,
          //paint: layers[layerId].paint.get(),
          //source: layers[layerId].source,
          //sourceLayer: layers[layerId].sourceLayer,
        };
      //}
    },
    /**
     * Returns an array of layer state info objects for all layers in the MapLibre instance
     *
     * @returns array
     */
    buildLayerObjects: () => {
      return self.style._order
        .map((layerId) => {
          return self.wrapper.buildLayerObject(self.map.style._layers[layerId]);
        })
        .filter((n) => n);
    },
    /**
     * Updates layer state info objects
     */
    refreshLayerState: () => {
      self.wrapper.layerState = self.wrapper.buildLayerObjects();
      self.wrapper.layerStateStrings = self.wrapper.layerState.map(el => JSON.stringify(el));
    },
    /**
     * Object containing information on the current viewport state
     */
    viewportState: {},
    /**
     * The same data as viewportState in JSON string form for quick deep comparisons
     */
    viewportStateString: "{}",
    /**
     * Previous version of viewportStateString
     */
    oldViewportStateString: "{}",
    getViewport: () => (typeof self.map.getCenter === 'function'?{
      center: (({ lng, lat, ...rest }) => ({ lng, lat }))(self.map.getCenter()),
      zoom: self.map.getZoom(),
      bearing: self.map.getBearing(),
      pitch: self.map.getPitch(),
    }:{}),
    viewportRefreshEnabled: true,
    viewportRefreshWaiting: false,
    refreshViewport: (force) => {
      if (self.wrapper.viewportRefreshEnabled || force) {
        self.wrapper.viewportRefreshEnabled = false;
        self.wrapper.viewportState = self.wrapper.getViewport();
        self.wrapper.viewportStateString = JSON.stringify(self.wrapper.viewportState);
        setTimeout(() => {
          self.wrapper.viewportRefreshEnabled = true;
          if (self.wrapper.viewportRefreshWaiting) {
            self.wrapper.viewportRefreshWaiting = false;
            self.wrapper.refreshViewport();
          }
        }, 50);
      }else{
          self.wrapper.viewportRefreshWaiting = true;
      }
    },
  };

  /**
   * Initializes an empty registered elements object for the given componentId
   *
   * @param {string} componentId
   * @param {boolean} force
   */
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
        wrapperEvents: [],
      };
    }
  };

  /**
   * Overrides MapLibre-gl-js addLayer function providing an additional componentId parameter for the wrapper element registration.
   *
   * @param {object} layer
   * @param {string} beforeId
   * @param {string} componentId
   * @returns {undefined}
   */
  this.addLayer = (layer, beforeId, componentId) => {
    if (!self.map.style) {
      return;
    }
    if (componentId && typeof componentId === "string" && typeof layer.id !== "undefined") {
      self.initRegisteredElements(componentId);
      self.registeredElements[componentId].layers.push(layer.id);

      if (typeof layer.source === "object") {
        self.registeredElements[componentId].sources.push(layer.id);
      }
    }

    self.map.addLayer(layer, beforeId);
  };

  /**
   * Overrides MapLibre-gl-js addSource function providing an additional componentId parameter for the wrapper element registration.
   *
   * @param {string} sourceId
   * @param {object} source
   * @param {object} options
   * @param {string} componentId
   * @returns {undefined}
   */
  this.addSource = (sourceId, source, options, componentId) => {
    if (!self.map.style) {
      return;
    }
    if (typeof options === "string" && typeof componentId === "undefined") {
      return self.addSource.call(self, sourceId, source, undefined, options);
    }
    if (componentId && typeof componentId === "string" && typeof sourceId !== "undefined") {
      self.initRegisteredElements(componentId);
      self.registeredElements[componentId].sources.push(sourceId);
    }

    self.map.addSource(sourceId, source, options);
  };

  /**
   * Overrides MapLibre-gl-js addImage function providing an additional componentId parameter for the wrapper element registration.
   *
   * @param {string} id
   * @param {*} image
   * @param {*} ref
   * @param {string} componentId
   * @returns {undefined}
   */
  this.addImage = (id, image, ref, componentId) => {
    if (!self.map.style) {
      return;
    }
    if (typeof ref === "string" && typeof componentId === "undefined") {
      return self.addImage.call(self, id, image, undefined, ref);
    }
    if (componentId && typeof componentId === "string" && typeof id !== "undefined") {
      self.initRegisteredElements(componentId);
      self.registeredElements[componentId].images.push(id);
    }

    self.map.addImage(id, image, ref);
  };

  /**
   * Overrides MapLibre-gl-js on function providing an additional componentId parameter for the wrapper element registration.
   *
   * @param {string} type
   * @param {string} layerId
   * @param {function} listener
   * @param {string} componentId
   * @returns {undefined}
   */
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

  /**
   * Overrides MapLibre-gl-js addControl function providing an additional componentId parameter for the wrapper element registration.
   *
   * @param {object} control
   * @param {string} position
   * @param {string} componentId
   */
  this.addControl = (control, position, componentId) => {
    if (componentId && typeof componentId === "string") {
      self.initRegisteredElements(componentId);
      self.registeredElements[componentId].controls.push(control);
    }

    self.map.addControl(control, position);
  };

  /**
   * Removes anything that has been added to the maplibre instance referenced with componentId
   *
   * @param {string} componentId
   */
  this.cleanup = (componentId) => {
    if (self.map.style && typeof self.registeredElements[componentId] !== "undefined") {
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

      // cleanup wrapper events
      self.registeredElements[componentId].wrapperEvents.forEach((item) => {
        self.wrapper.off(...item);
      });

      self.initRegisteredElements(componentId, true);
    }
  };

  // add style prop functions that require map._update to be called afterwards
  let updatingStyleFunctions = [
    "moveLayer",
    "removeLayer",
    "removeSource",
    "setPaintProperty",
    "setLayoutProperty",
  ];
  updatingStyleFunctions.forEach((item) => {
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
  styleFunctions.forEach((item) => {
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
        .then((response) => {
          if(response.ok){
            return response.json()
          }else{
            throw new Error('error loading map style.json')
          }
        })
        .then((styleJson) => {
          styleJson.layers.forEach((item) => {
            self.baseLayers.push(item.id);
            if (!self.firstSymbolLayer && item.type === "symbol") {
              self.firstSymbolLayer = item.id;
            }
          });
          self.styleJson = styleJson;
          props.mapOptions.style = styleJson;
        })
        .catch((error) => {
          console.log(error);
        });
    }

    self.map = new maplibregl.Map(props.mapOptions);

    self.addNativeMaplibreFunctionsAndProps();
    self.wrapper.refreshViewport(true);
    self.wrapper.fire("viewportchange");

    self.map.on("move", () => {
      self.wrapper.refreshViewport();
      if (self.wrapper.viewportStateString !== self.wrapper.oldViewportStateString) {
        self.wrapper.oldViewportStateString = self.wrapper.viewportStateString;
        self.wrapper.fire("viewportchange");
      }
    });
    self.map.on("data", () => {
      self.wrapper.refreshLayerState();
      self.wrapper.fire("layerchange");
    });
    if (typeof props.onReady === "function") {
      props.onReady(self.map, self);
    }
  };
  initializeMapLibre();
};

export default MapLibreGlWrapper;

import React, { useRef, useContext, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { MapContext } from 'react-map-components-core';
import maplibregl from 'maplibre-gl/dist/maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import maplibregl$1 from 'maplibre-gl/dist/maplibre-gl-unminified';
import { v4 } from 'uuid';
import Button from '@material-ui/core/Button';
import maplibregl$2, { Popup } from 'maplibre-gl';
import jsPDF from 'jspdf';
import PrinterIcon from '@material-ui/icons/Print';
import { lineString, length, lineChunk, bbox } from '@turf/turf';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import Point from '@mapbox/point-geometry';
import extent from '@mapbox/geojson-extent';
import syncMove from '@mapbox/mapbox-gl-sync-move';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import FileCopy from '@material-ui/icons/FileCopy';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var MapLibreGlWrapper = function MapLibreGlWrapper(props) {
  var _this = this;

  var self = this; // element registration and cleanup on a component level is experimental

  this.registeredElements = {};
  this.baseLayers = [];
  this.firstSymbolLayer = undefined;

  this.initRegisteredElements = function (componentId, force) {
    if (typeof self.registeredElements[componentId] === "undefined" || force !== "undefined" && force) {
      self.registeredElements[componentId] = {
        layers: [],
        sources: [],
        images: [],
        events: [],
        controls: []
      };
    }
  };

  this.addLayer = function (layer, beforeId, componentId) {
    if (!self.map.style) {
      return;
    }

    if (componentId && typeof componentId === "string" && typeof layer.id !== "undefined") {
      self.initRegisteredElements(componentId);
      self.registeredElements[componentId].layers.push(layer.id);

      if (_typeof(layer.source) === "object") {
        self.registeredElements[componentId].sources.push(layer.id);
      }
    }

    self.map.addLayer(layer, beforeId);
  };

  this.addSource = function (sourceId, source, options, componentId) {
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

  this.addImage = function (id, image, ref, componentId) {
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

  this.on = function (type, layerId, listener, componentId) {
    var _self$map;

    if (typeof listener === "string" && typeof layerId === "function") {
      return self.on.call(self, type, undefined, layerId, listener);
    }

    var _arguments = [type, layerId, listener];

    if (!layerId) {
      _arguments = [type, listener];
    }

    if (componentId && typeof componentId === "string") {
      self.initRegisteredElements(componentId);
      self.registeredElements[componentId].events.push(_arguments);
    }

    (_self$map = self.map).on.apply(_self$map, _toConsumableArray(_arguments));
  };

  this.addControl = function (control, position, componentId) {
    if (componentId && typeof componentId === "string") {
      self.initRegisteredElements(componentId);
      self.registeredElements[componentId].controls.push(control);
    }

    self.map.addControl(control, position);
  }; // cleanup function that remove anything that has been added to the maplibre instance referenced with componentId
  // be aware that this function only works with explicitly added elements e.g. sources implizitly added by addLayer calls still require manual removal


  this.cleanup = function (componentId) {
    //console.log("cleanup " + componentId);
    //console.log(self.registeredElements[componentId]);
    if (self.map.style && typeof self.registeredElements[componentId] !== "undefined") {
      // cleanup layers
      self.registeredElements[componentId].layers.forEach(function (item) {
        if (self.map.style.getLayer(item)) {
          self.map.style.removeLayer(item);
        }
      }); // cleanup sources

      self.registeredElements[componentId].sources.forEach(function (item) {
        if (self.map.style.getSource(item)) {
          self.map.style.removeSource(item);
        }
      }); // cleanup images

      self.registeredElements[componentId].images.forEach(function (item) {
        if (self.map.hasImage(item)) {
          self.map.style.removeImage(item);
        }
      }); // cleanup events

      self.registeredElements[componentId].events.forEach(function (item) {
        var _self$map2;

        (_self$map2 = self.map).off.apply(_self$map2, _toConsumableArray(item));
      }); // cleanup controls

      self.registeredElements[componentId].controls.forEach(function (item) {
        self.map.removeControl(item);
      });
      self.initRegisteredElements(componentId, true);
    }
  }; // add style prop functions that require map._update to be called afterwards


  var updatingStyleFunctions = ["moveLayer", "removeLayer", "removeSource", "setPaintProperty", "setLayoutProperty"];
  updatingStyleFunctions.forEach(function (item) {
    _this[item] = function () {
      if (self.map && _this.map.style && typeof self.map.style[item] === "function") {
        var _self$map$style;

        (_self$map$style = self.map.style)[item].apply(_self$map$style, arguments);
      }

      return self.map._update ? self.map._update(true) : undefined;
    };
  }); // add style prop functions

  var styleFunctions = ["getLayer", "getSource", "listImages", "getPaintProperty", "getLayoutProperty", "removeImage"];
  styleFunctions.forEach(function (item) {
    _this[item] = function () {
      if (self.map && self.map.style) {
        var _self$map$style2;

        return (_self$map$style2 = self.map.style)[item].apply(_self$map$style2, arguments);
      }

      return false;
    };
  });

  this.addNativeMaplibreFunctionsAndProps = function () {
    //  add MapLibre-gl functions
    Object.keys(_this.map.__proto__).forEach(function (item) {
      if (typeof _this[item] === "undefined") {
        _this[item] = function () {
          var _self$map3;

          return (_self$map3 = self.map)[item].apply(_self$map3, arguments);
        };
      }
    }); //  add MapLibre-gl properties

    Object.keys(_this.map).forEach(function (item) {
      if (typeof _this[item] === "undefined") {
        _this[item] = self.map[item];
      }
    });
  }; // add functions that are missing on the MapLibre instances prototype


  var missingFunctions = ["getZoom", "setZoom", "getCenter", "setCenter", "getBearing", "setBearing", "getPitch", "setPitch", "jumpTo", "flyTo", "panTo", "panBy", "panBy", "zoomTo", "zoomIn", "zoomOut", "getPadding", "setPadding", "rotateTo", "resetNorth", "resetNorthPitch", "snapToNorth", "cameraForBounds", "fitBounds", "fitScreenCoordinates", "getFreeCameraOptions", "setFreeCameraOptions", "easeTo", "stop"];
  missingFunctions.forEach(function (item) {
    _this[item] = function () {
      if (typeof self.map[item] === "function") {
        var _self$map$item;

        for (var _len = arguments.length, props = new Array(_len), _key = 0; _key < _len; _key++) {
          props[_key] = arguments[_key];
        }

        return (_self$map$item = self.map[item]).call.apply(_self$map$item, [self.map].concat(props));
      }

      return undefined;
    };
  }); // initialize the MapLibre-gl instance

  var initializeMapLibre = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(typeof props.mapOptions.style === "string" && props.mapOptions.style.indexOf("mapbox://") === -1)) {
                _context.next = 3;
                break;
              }

              _context.next = 3;
              return fetch(props.mapOptions.style).then(function (response) {
                return response.json();
              }).then(function (styleJson) {
                styleJson.layers.forEach(function (item) {
                  self.baseLayers.push(item.id);

                  if (!self.firstSymbolLayer && item.type === "symbol") {
                    self.firstSymbolLayer = item.id;
                  }
                });
                self.styleJson = styleJson;
                props.mapOptions.style = styleJson;
              });

            case 3:
              self.map = new maplibregl.Map(props.mapOptions);
              self.addNativeMaplibreFunctionsAndProps();

              if (typeof props.onReady === "function") {
                props.onReady(self.map, self);
              }

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function initializeMapLibre() {
      return _ref.apply(this, arguments);
    };
  }();

  initializeMapLibre();
};

/**
 * The MapLibreMap component will create the MapLibre-gl instance and set the reference at MapContext.map after the MapLibre-gl load event has fired. That way (since the map refence is created using the useState hook) you can use the react useEffect hook in depending components to access the MapLibre-gl instance like ```useEffect(() => { \/** code *\/ }, [mapContext.map])``` and be sure the code is executed once the MapLibre-gl instance has fired the load event.
 *
 * MapLibreMap returns the html node that will be used by MapLibre-gl to render the map.
 * This Component must be kept unaware of any related components that interact with the MapLibre-gl instance.
 */

var MapLibreMap = function MapLibreMap(props) {
  var map = useRef(null);
  var mapContainer = useRef(null);
  var mapContext = useContext(MapContext);
  var mapContextRef = useRef(mapContext);
  var mapIdRef = useRef(props.mapId);
  var mapOptions = props.options;
  useEffect(function () {
    var mapId = mapIdRef.current;
    var _mapContext = mapContextRef.current;
    return function () {
      _mapContext.removeMap(mapId);

      map.current.remove();
      map.current = null;
    };
  }, []);
  useEffect(function () {
    if (mapContainer.current) {
      // TODO: adjust defaults
      var defaultOptions = {
        lng: 8.607,
        lat: 53.1409349,
        zoom: 10,
        container: mapContainer.current,
        accessToken: "pk.eyJ1IjoibWF4dG9iaSIsImEiOiJjaW1rcWQ5bWMwMDJvd2hrbWZ2ZTBhcnM5In0.NcGt5NmLP5Q1WC7P5u6qUA"
      };
      map.current = new MapLibreGlWrapper({
        mapOptions: _objectSpread2(_objectSpread2({}, defaultOptions), mapOptions),
        onReady: function onReady(map, wrapper) {
          map.once("load", function () {
            if (props.mapId) {
              mapContext.registerMap(props.mapId, wrapper);
            } else {
              mapContext.setMap(wrapper);
            }
          }); // TODO: remove this line

          window.map = wrapper;
        }
      });
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [mapContainer]);
  return /*#__PURE__*/React.createElement("div", {
    ref: mapContainer,
    className: "mapContainer"
  });
};

MapLibreMap.propTypes = {
  options: PropTypes.object
};

/**
 * The MapLibreMap component will create the MapLibre-gl instance and set the reference at MapContext.map after the MapLibre-gl load event has fired. That way (since the map refence is created using the useState hook) you can use the react useEffect hook in depending components to access the MapLibre-gl instance like ```useEffect(() => { \/** code *\/ }, [mapContext.map])``` and be sure the code is executed once the MapLibre-gl instance has fired the load event.
 *
 * MapLibreMap returns the html node that will be used by MapLibre-gl to render the map.
 * This Component must be kept unaware of any related components that interact with the MapLibre-gl instance.
 */

var MapLibreMap$1 = function MapLibreMap(props) {
  var map = useRef(null);
  var mapContainer = useRef(null);
  var mapContext = useContext(MapContext);
  var mapOptions = props.options;
  useEffect(function () {
    return function () {
      mapContext.removeMap(props.mapId);
      map.current.remove();
      map.current = null;
    };
  }, []);
  useEffect(function () {
    if (mapContainer.current) {
      // TODO: adjust defaults
      var defaultOptions = {
        lng: 8.607,
        lat: 53.1409349,
        zoom: 10,
        container: mapContainer.current,
        accessToken: "pk.eyJ1IjoibWF4dG9iaSIsImEiOiJjaW1rcWQ5bWMwMDJvd2hrbWZ2ZTBhcnM5In0.NcGt5NmLP5Q1WC7P5u6qUA"
      };
      map.current = new maplibregl$1.Map(_objectSpread2(_objectSpread2({}, defaultOptions), mapOptions));
      map.current.on("load", function () {
        if (props.mapId) {
          mapContext.registerMap(props.mapId, map.current);
        } else {
          mapContext.setMap(map.current);
        }
      }); // TODO: remove this line

      window.map = map.current;
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [mapContainer]);
  return /*#__PURE__*/React.createElement("div", {
    ref: mapContainer,
    className: "mapContainer"
  });
};

MapLibreMap$1.propTypes = {
  options: PropTypes.object
};

var MlComponentTemplate = function MlComponentTemplate(props) {
  // Use a useRef hook to reference the layer object to be able to access it later inside useEffect hooks
  var mapContext = useContext(MapContext);
  var initializedRef = useRef(false);
  var mapRef = useRef(undefined);
  var componentId = useRef((props.idPrefix ? props.idPrefix : "MlComponentTemplate-") + v4());
  useEffect(function () {
    var _componentId = componentId.current;
    return function () {
      // This is the cleanup function, it is called when this react component is removed from react-dom
      // try to remove anything this component has added to the MapLibre-gl instance
      // e.g.: remove the layer
      // mapContext.getMap(props.mapId).removeLayer(layerRef.current);
      // check for the existence of map.style before calling getLayer or getSource
      if (mapRef.current) {
        mapRef.current.cleanup(_componentId);
        mapRef.current = undefined;
      }
    };
  }, []);
  useEffect(function () {
    if (!mapContext.mapExists(props.mapId) || initializedRef.current) return; // the MapLibre-gl instance (mapContext.map) is accessible here
    // initialize the layer and add it to the MapLibre-gl instance or do something else with it

    initializedRef.current = true;
    mapRef.current = mapContext.getMap(props.mapId);
    mapRef.current.setCenter([7.132122000552613, 50.716405378037706]);
    console.log(componentId.current);
  }, [mapContext.mapIds, mapContext, props.mapId]);
  return /*#__PURE__*/React.createElement(React.Fragment, null);
};

var paintDefaults = {
  "fill-extrusion-color": "hsl(196, 61%, 83%)",
  "fill-extrusion-height": {
    property: "render_height",
    type: "identity"
  },
  "fill-extrusion-base": {
    property: "render_min_height",
    type: "identity"
  },
  "fill-extrusion-opacity": 1
};
/**
 * MlCompositeLayer returns a Button that will add a standard OSM tile layer to the maplibre-gl instance.
 */

var MlCompositeLayer = function MlCompositeLayer(_ref) {
  var paint = _ref.paint,
      sourceId = _ref.sourceId,
      sourceLayer = _ref.sourceLayer,
      minZoom = _ref.minZoom;
  var mapContext = useContext(MapContext);
  var mapRef = useRef(null);

  var _useState = useState(true),
      _useState2 = _slicedToArray(_useState, 2),
      showLayer = _useState2[0],
      setShowLayer = _useState2[1];

  var layerName = "building-3d";

  var componentCleanup = function componentCleanup() {
    if (mapRef.current) {
      if (mapRef.current.style && mapRef.current.getLayer(layerName)) {
        mapRef.current.removeLayer(layerName);
      }

      if (mapRef.current.style && mapRef.current.getSource(layerName)) {
        mapRef.current.removeSource(layerName);
      }

      mapRef.current = null;
    }
  };

  useEffect(function () {
    return componentCleanup;
  }, []);
  useEffect(function () {
    if (!mapContext.map) return; // cleanup fragments left in MapLibre-gl from previous component uses

    componentCleanup();

    var addCompositeLayer = function addCompositeLayer() {
      if (!mapContext.map.getLayer(layerName)) {
        var lastLabelLayerId = false;

        if (mapContext.map.getLayer("waterway-name")) {
          lastLabelLayerId = "waterway-name";
        }

        if (mapContext.map.getLayer("poi_label")) {
          lastLabelLayerId = "poi_label";
        }

        mapContext.map.addLayer({
          id: layerName,
          type: "fill-extrusion",
          source: sourceId || "openmaptiles",
          "source-layer": sourceLayer || "building",
          minzoom: minZoom || 14,
          paint: _objectSpread2(_objectSpread2({}, paintDefaults), paint)
        }, lastLabelLayerId);
      }
    };

    addCompositeLayer();
  }, [mapContext.map, minZoom, paint, sourceId, sourceLayer]);
  useEffect(function () {
    if (!mapContext.map) return;
    mapRef.current = mapContext.map;

    if (mapRef.current.getLayer(layerName)) {
      // toggle layer visibility by changing the layout object's visibility property
      if (showLayer) {
        mapRef.current.setLayoutProperty(layerName, "visibility", "visible");
      } else {
        mapRef.current.setLayoutProperty(layerName, "visibility", "none");
      }
    } //

  }, [showLayer, mapContext]);
  return /*#__PURE__*/React.createElement(Button, {
    color: "primary",
    variant: showLayer ? "contained" : "outlined",
    onClick: function onClick() {
      return setShowLayer(!showLayer);
    }
  }, "Composite");
};

var nmMap = {
  street: ["footway", "street", "road", "street_name", "residential", "path", "pedestrian", "road_reference", "road_reference_intl", "square", "place"],
  number: ["house_number", "street_number"],
  place: ["city", "village", "hamlet", "locality", "croft", "neighbourhood", "suburb", "city_district", "district", "quarter", "borough", "city_block", "residential", "commercial", "industrial", "houses", "subdivision", "allotments", "postal_city", "town", "municipality", "local_administrative_area"],
  zip: ["postcode", "partial_postcode"],
  state: ["state", "province", "state_code"]
};

var nmConverter = function nmConverter(nmAddress) {
  var addressArr = [];

  for (var key in nmMap) {
    nmMap[key].some(function (element) {
      if (nmAddress.hasOwnProperty(element)) {
        addressArr.push(nmAddress[element]);
        return true;
      }

      return false;
    });
  }

  return addressArr.join(", ");
};

var toPixels = function toPixels(length) {
  var conversionFactor = 96;
  conversionFactor /= 25.4;
  return conversionFactor * length + "px";
};

var createPdf = function createPdf(map, locationValue, setLoading) {
  setLoading(true);
  var width = 210;
  var height = 297; // Calculate pixel ratio

  var actualPixelRatio = window.devicePixelRatio; // Create map container

  var hidden = document.createElement("div");
  hidden.className = "hidden-map";
  document.body.appendChild(hidden);
  var container = document.createElement("div");
  container.style.width = toPixels(width);
  container.style.height = toPixels(height);
  hidden.appendChild(container); //Render map

  var renderMap = new maplibregl$2.Map({
    container: container,
    center: map.getCenter(),
    zoom: map.getZoom(),
    bearing: map.getBearing(),
    pitch: map.getPitch(),
    interactive: false,
    preserveDrawingBuffer: true,
    fadeDuration: 0,
    attributionControl: false
  });
  var style = map.getStyle();

  var _loop = function _loop(name) {
    var src = style.sources[name];
    Object.keys(src).forEach(function (key) {
      //delete properties if value is undefined.
      // for instance, raster-dem might has undefined value in "url" and "bounds"
      if (!src[key]) {
        delete src[key];
      }
    });
  };

  for (var name in style.sources) {
    _loop(name);
  }

  renderMap.setStyle(style);
  renderMap.once("idle", function () {
    var _hidden$parentNode;

    // TO DO: It is still under development
    var pdf = new jsPDF({
      orientation: "p",
      unit: "mm",
      compress: true
    });
    Object.defineProperty(window, "devicePixelRatio", {
      get: function get() {
        return 300 / 96;
      }
    });
    var offsetX = 2.5;
    var offsetY = 2.5;
    var marginTop = 3;
    var marginBottom = 3;
    var innerMargin = 2;
    var logo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKgAAACxCAMAAABnTAbVAAAC8VBMVEUAAAD/AACAAACqAFW/AECZMzOqK1W2JEm/IECqHDmzGk25F0aqFUCxJzu2JEmqIkSvIEC0HjyqHEeuG0OzGkC2GD2uI0axIUO1IECtHz2xHUWzHEKtG0CwGj6zIkS1IUKyHz60HkSvHUKxHECzHD6uG0OxIUGzIECuHz6wHkOyHkG0HUCwHD6xHEOzIUGvIECxHz6zH0KvHkGxHUCyHT+vHEKwHEGyIECzHz+wH0KxHkGzHkCwHT+xHUKyHEGvIECxHz+yH0KzHkGwHkCxHj+zHUKwHUGxHECyHz+wH0GxH0GyHkCwHj+xHUGyHUGzHUCwHz+xH0GyH0GwHkCxHj+yHkGwHUCxHUCyHT+wH0GxH0CxHkCyHj+wHkGxHkCyHUCwHT+xH0GyH0CwH0CxHj+yHkGwHkCxHUCxHT+yHUGwH0CxH0CyHj+wHkGxHkCyHkCwHT+xHUGxH0CyH0CxHz+xHkGyHkCwHkCxHj+yHUGwHUCxH0CwHkGxHkCxHkCyHj+xHUGxHUCyH0CwHz+xHkGyHkCwHkCxHj+xHkGwHUCxHUCxHz+yH0GxHkCyHj+wHkGxHUCxHUCwHz+xH0GxHkCyHkCxHj+xHkGyHkCxHUCxHT+yH0GwHkCxHkCxHj+wHkGxHkCxHkCyHT+xH0GxH0CyHkCxHj+xHkGxHkCwHkCxHT+xHUCwH0CxHkCxHj+yHkCxHkCxHkCyHj+xHUCxH0CxHkCwHj+xHkCxHkCwHkCxHj+xHkCyHUCxH0CxHj+xHkCxHkCxHkCxHj+wHkCxHUCxH0CyHj+xHkCxHkCyHkCxHj+xHkCxHUCxHz+xHkCwHkCxHkCxHj+yHkCxHkCxHkCxHkCxHkCxHkCxHj+xHkCwHkCxHT+xHkCxHkCxHkCxHj+xHkCxHkCxHkCxHj+xH0CxHkCxHkCyHj+xHkCxHkCxHkCxHj+xHkCxHkCxHkCxHj+xHkCxHkCxHkCxHj+xHkCxHkCxHkCxHj+xHkCxHkD///9g21WfAAAA+XRSTlMAAQIDBAUGBwgJCgsMDQ4PEBESExQVFhcYGRobHB0eHyEiIyQlJicoKSorLC0uLzAxMjM0NTY3ODk6Ozw9Pj9AQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVpbXF1eX2BhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ent8fn+AgYKDhIWGh4iJiouMjY6PkZKTlJWWl5iZmpucnZ6foKGio6SlpqeoqaqrrK2ur7CxsrO0tba3uLm6u7y9vr/AwcLDxMXGx8jJysvMzc/Q0dLT1NXW19ja29zd3uDh4uPk5ebn6Onq6+zt7u/w8fLz9PX29/j5+vv8/f7v1AMKAAAAAWJLR0T61W0GSgAACWZJREFUGBnVwXlAVHUCB/DvmxkuD0QswFo3TcwzS0p01RVMpUytLKxMSVNpLUsLj7VDo7btsNTssrTMdAtWNjNbkyzF3EotwrXMI7XwAAxE5Jz5/rcaMMx782Z452/p84GV2na+ZmRqasrwxE4OtFRhI/+29SS9qn/86PGUKLQ4CW+X0p/n+xeTnGhB4v/NgIpXj3aihZhRyaCOPNYRwrW+KwkKmWxWTVYfiBRy49qzxW0hN5FaeLLiIUrv5UUkl0Au9iy1qXk1BgJIIzZ7eMG1kHuBmpVMkWCz0LQC1itzQkb6hTpsiYOdQmcfZ6M8yPWmLoWDYBsp9SCbZENuDPWpmgKbJO+mr9WQm0y95sEO8Zso9z7k7qJuj8JyzofPUeFjyA2nfvfDYl23089eyPWkfrXDYCXXI1X0Vy5BxllC/U50hHU676aqbpDLogEfoEFUR5g0qoTqJkJuAo0YjQZPpcIMab6bAayBXMgxGrDfiXrhBVnRMOyiTxhQkQtyGTTidjS4quZIEgzqfYRBjIFc2Pc0YCcaLWbdXyUY8acSBrMBCgPqqJ+nExpEniL/FQn9hpczKHdPKCyiAfeh0SMkf+wDvSbWsBlroCCtpX6volFkOcmzqdBntofN8QyGQkQudcuF12qe554DPWZRg70hUAjNoV6fwyuFv1nuhGYT3dRiDpRCVlCnHHiFlfM3m9tCo5trqUlFX/hJO0ddFqJJLut9HQ1NrquiRoc7wM/V31GPa9DkGTbIvwga9C+nZrlO+Al9opqabYWPqWy0NwbNuvQEdXgJKuI/oEaVfeFjFL32xaEZYV+yQeWBbVlZq15f9sp7W/YcrmYAS6AmOY9aeCbA13Vssv8SBPcazzuaPS/5Yvhy9bhtYfZxqlgiQU3SFg+bUzUJMtfTR0EUgpnK2s/n9oQ6qe+cT85R6SUnVPVYXsag9iVCLo2+dkQgsKv3zI9FUBGpuR7KbY6CulZ3bqplICfmhUHhWcpsdCGgi6FB16dOUeaHeATSbtyKI/Tn2TEtAn7yKLdSgkmt55ygr9M3I4ies9fkV7PJwXVTO0HFxbVUWAjTWj10kr7eikRQIb3vSJ8//5l5aSN7RyGAJ6nkuQXmRS1108eRZJgUeZp+yvvAAoP20od7VRxMeZEqDkXDAiFPuumjLCMExo3yUM2nLljhhhL6+iHVAYO6nqK6TFii05eU2ZfmhBHdf2YA7mRYIiybcnvTwqDbgJMM6Gh7WML5JhVOPvNH6CLNqmYQ62ENaSmVatbfFArNEvIoV7Phvmti2rXukrJgazXPmw6LLKa/4uUDHdAi/h8eylQtjoNX1H355JlOsIb0PtUUrhgTgeAcoza5KfddD8hIN37LjbBI+BdUV/HJI4NCEIBr2LKjVNrcFkquhypvh0UuOsCAzm5bktYnBHLRQx/d9Cv9veeCir550bBI3yoGVXv40xWZGdNT09LTH12yZmcR1X0VDlVtR8Aqc2mBXzrCdo7PaN44CHBZKc36CELMpUk1XSBE6EGa8xYEmUBT3L0giLSLZnwIYW6iGbdCGMdhGlcaAXHm07g3IVCHczRsHER6l0bVRkGk22jUTgjVpooGPQuxttCg8RDrARp0OcTqRWPKJYjlqqQh+RBtDw1ZD9FW0pDnIdqDNCQDoo2iIVMgWiINGQvRLqchwyBaFA35M0STamjEIAh3mkYMhnClNOJ6CHeGRqRCuCoakQ7RImhIJkSLoyFvQbSraMhWiDaWhhyFaDNpiKcdBFtOYwZCsG00ZjrEkoppzGsQqzsNyodY99CgukgI9TaNSoZIUiGNWgSREmjYfyDSszSsrj3EcRyjceMgTgpNWAlx1tGEYhdEiaygGddBlIdoyisQJKKQphx3QYxZNGk0hAj7mSblQIiZNKs2DgJEn6RpcyDACpr3kwu2S3TTAnfAbq58WmEP7PYYgzq1fdXf56anT5/ycOayNZ8WMaChsNeQWgZy4NXJie0hFzciY2MF1WyDrWJ/oaritfdchgAiRr18jP5ugI0cW6jCnZsWgaAcwzd6qPCdA/Z5mv4Ozr8EGvR4pZpyE2CbSR4qHU53QaP4LA99FbaDTW6po8L+iU7oMHg3fS2DPYZVUe50uhP6uBbWsom7P+xw7RnKrYuFfgMPsUl+KKw39FfKHEqBIW3Xs8lSWC61ijKrW8Egx1I2uQ0We8BNX1WzYMIsNxuVd4eVnIspc6gfTJnkZqP/RsM6l26nTG4UTHqAXl+1gVWGn6DMhnCYlkmvz8JhidDFHsqsdMICb9BrUxtY4M97KbdMghXCvqFXwWUwq+NaKjwHi3Qto1dhf5gSOruMCu9IsMqdbFI11wnDwmcepdLmEFhnHX18PQDGtM44Tj+72sBCl5yhD88/+0G/K18sor/CWFhqDuV2psfCq/UMNCdm9rdUU5cMa4V8TwVP/uszRicmJAyZ9m5ZJfCXpBAE4Lx2wWc1VLcQVhvHIN4DxrM0J2NwBBRikmdmlzCgrQ5YzbGfgaUA0k6eV1OQ8/y9qSMHJQy96e4HH389r5hBFcXBelMZ0DEngEQPdZsCG4T9zECewgUrqdcOCXZYyACqL8UFHYqoT21f2OJyD9WtQr1p1Oc52GQ3VXl6oZ6URz1OtYFNHqaqj9AovoI6LIBd/kBVQ+E1m9qVRMI2P1LFDjRx5FGzx2GfN+nPMxA+OpVQo7L2sM9k+suGzHhq9AJs1Jl+arpBbhW1uRJ2KqXSMii0LqAWu2Crb6hQGgOlrr9Sgxmw1ftUSIe/MR42q7I9bPU05bZLUPEEm5UDe02jTGU3qJHWsjn3wl7jKbMA6iK+YjO6wF430te3IQgg9hCDOgCbJdNH+RUIqMtxBvMybDaAPiYhiH5lDOJW2Kwfm7yBoJIqGFhX2CyJXgURCG74OQZS4YDNxrJR6RVozohKBrAHdpvEBjUj0LyUCqpbDbvdzwaTocWQUqqaB7stYr1MaJNQRDV3wG7v8DdrJGjU7SBVXA+7fcELPgyFZh2+oL/+sJmjjOd9HAYdWuXQzxWwWS+e92EodJEWeagQA5tNJ7khFHrdUk65cNgsh8wOhX4991GmFewVVs7nHTAiYil9tYO9Uuruh1F3n2GTONjr6dEwrnMevfrBXrEwwzGvig3GomXrvoP1HkQLJ6WV8II30OJ1XO0huQu/AwN3k5Vh+B1wpP3EIfhdCE2fhv+X/wF/AO+L9vuzfwAAAABJRU5ErkJggg==";
    var textBuffer = 1;
    var lineHeight = 3.25;
    var text = locationValue ? nmConverter(locationValue.address) : "";
    var textChunksSeperator = text.split(",");
    var textChunks = [];

    if (textChunks.length) {
      textChunksSeperator.forEach(function (chunk) {
        var limitChunks = chunk.match(/.{1,34}/g);
        textChunks.push.apply(textChunks, _toConsumableArray(limitChunks));
      });
    } //Render map image


    pdf.addImage(renderMap.getCanvas().toDataURL("image/png"), "png", 0, 0, 210, 297, null, "FAST"); //Render lower left Copyright box

    pdf.setFillColor("white");
    pdf.rect(138, 287, 297, 10, "F");
    pdf.setFontSize(10); // optional

    pdf.text("Datenquelle: © OpenStreetMap-Mitwirkende", 140, pdf.internal.pageSize.height - 3); //Render infobox

    pdf.setFillColor("white");
    var infoBoxSize = textChunks.length * lineHeight + marginTop + marginBottom + lineHeight * 2 + innerMargin * 2 + textBuffer;
    pdf.rect(offsetX, 2, 66.5, infoBoxSize, "F");
    pdf.setFontSize(10);
    pdf.text("Karten PDF:", 6, offsetY + marginTop); //Render inner infobox

    pdf.rect(6, 7, 60, textChunks.length * lineHeight + innerMargin * 2 + textBuffer);
    pdf.setFontSize(10); //Write out address

    textChunks.forEach(function (text, i) {
      pdf.text(text.trim(), 8, 10 + i * 3.5 + innerMargin);
    }); //Add WG Logo

    pdf.addImage(logo, "png", 5, offsetY + marginTop + lineHeight * 2 + textChunks.length * 3 + innerMargin * 2, 3, 3, null, "FAST"); //Add WG Url

    pdf.setFontSize(10);
    pdf.text("wheregroup.com", 40, offsetY + marginTop + lineHeight * 2 + textChunks.length * lineHeight + innerMargin * 2 + textBuffer); //Set pdfs props

    pdf.setProperties({
      title: "Map export",
      subject: "Map export",
      creator: "WhereGroup GmbH",
      author: "(c)WhereGroup GmbH, (c)OpenStreetMap"
    });
    pdf.save("Map.pdf");
    renderMap.remove();
    (_hidden$parentNode = hidden.parentNode) === null || _hidden$parentNode === void 0 ? void 0 : _hidden$parentNode.removeChild(hidden);
    Object.defineProperty(window, "devicePixelRatio", {
      get: function get() {
        return actualPixelRatio;
      }
    });
    setLoading(false);
    console.log("end create PDF");
  });
};

/**
 * MlCreatePdfButton returns a Button that will create a PDF version of the current map view (dimensions adjusted to fit Din A4 Paper).
 * It expects a MapLibre-gl instance accessible in mapContext.map.
 */

var MlCreatePdfButton = function MlCreatePdfButton() {
  var mapContext = useContext(MapContext);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
    color: "primary",
    variant: "contained",
    onClick: function onClick() {
      createPdf(mapContext.map, null, function () {});
    }
  }, /*#__PURE__*/React.createElement(PrinterIcon, null)));
};

var _showNextTransitionSegment = function _showNextTransitionSegment(props, layerId, map, transitionInProgressRef, transitionGeojsonDataRef, transitionGeojsonCommonDataRef, currentTransitionStepRef, msPerStep) {
  var _arguments = arguments;
  console.log("SHOW NEXT TRANSITION SEGMENT CALLED");

  if (typeof map.getSource(layerId) === "undefined" || !transitionInProgressRef.current) {
    setTimeout(function () {
      return _showNextTransitionSegment.apply(void 0, _toConsumableArray(_arguments));
    }, msPerStep);
    return;
  }

  if (typeof transitionGeojsonDataRef.current[currentTransitionStepRef.current] !== "undefined") {
    var newData = currentTransitionStepRef.current + 1 === transitionGeojsonDataRef.current.length ? props.geojson : lineString([].concat(_toConsumableArray(transitionGeojsonCommonDataRef.current), _toConsumableArray(transitionGeojsonDataRef.current[currentTransitionStepRef.current].geometry.coordinates)));
    map.getSource(layerId).setData(newData);

    if (typeof props.onTransitionFrame === "function") {
      props.onTransitionFrame(newData);
    }

    currentTransitionStepRef.current++;

    if (transitionInProgressRef.current && currentTransitionStepRef.current < transitionGeojsonDataRef.current.length) {
      setTimeout(function () {
        return _showNextTransitionSegment.apply(void 0, _toConsumableArray(_arguments));
      }, msPerStep);
    } else {
      if (typeof props.onTransitionEnd === "function") {
        props.onTransitionEnd(props.geojson);
      }

      transitionInProgressRef.current = false;
    }
  }
};

var _transitionToGeojson = function _transitionToGeojson(newGeojson, props, transitionGeojsonCommonDataRef, transitionGeojsonDataRef, transitionInProgressRef, oldGeojsonRef, msPerStep, currentTransitionStepRef, map, layerId) {
  // create the transition geojson between oldGeojsonRef.current and props.geojson
  //console.log("start transition");
  // create a geojson that contains no common point between the two line features
  var transitionCoordinatesShort = [];
  var transitionCoordinatesLong = [];
  var targetCoordinates = [];
  var srcCoordinates = [];
  transitionGeojsonCommonDataRef.current = [];
  var sourceGeojson = oldGeojsonRef.current || {
    geometry: {
      type: "LineString",
      coordinates: []
    },
    properties: {},
    type: "Feature"
  };
  var targetGeojson = newGeojson;
  var longerGeojson = targetGeojson;
  var shorterGeojson = sourceGeojson;
  var reverseOrder = false; // In case one geojson is missing completely use the first two coordinates of the other geojson

  if (typeof longerGeojson.geometry === "undefined" && typeof shorterGeojson.geometry !== "undefined" && shorterGeojson.geometry.coordinates.length > 1) {
    longerGeojson = lineString(shorterGeojson.geometry.coordinates.slice(0, 2));
  } else if (typeof shorterGeojson.geometry === "undefined" && typeof longerGeojson.geometry !== "undefined" && longerGeojson.geometry.coordinates.length > 1) {
    shorterGeojson = lineString(longerGeojson.geometry.coordinates.slice(0, 2));
  } else if (typeof shorterGeojson.geometry === "undefined" && typeof longerGeojson.geometry === "undefined") {
    return;
  }

  if (longerGeojson.geometry.coordinates.length < shorterGeojson.geometry.coordinates.length) {
    longerGeojson = sourceGeojson;
    shorterGeojson = targetGeojson;
    reverseOrder = true;
  } //console.log(shorterGeojson);
  //console.log(longerGeojson);


  if (longerGeojson && shorterGeojson) {
    for (var i = 0, len = longerGeojson.geometry.coordinates.length; i < len; i++) {
      if (typeof shorterGeojson.geometry.coordinates[i] !== "undefined" && longerGeojson.geometry.coordinates[i][0] === shorterGeojson.geometry.coordinates[i][0] && longerGeojson.geometry.coordinates[i][1] === shorterGeojson.geometry.coordinates[i][1]) {
        // if coordinates are equal
        transitionGeojsonCommonDataRef.current.push(longerGeojson.geometry.coordinates[i]);
      } else {
        if (typeof longerGeojson.geometry.coordinates[i] !== "undefined") {
          transitionCoordinatesLong.push(longerGeojson.geometry.coordinates[i]);
        }

        if (typeof shorterGeojson.geometry.coordinates[i] !== "undefined") {
          transitionCoordinatesShort.push(shorterGeojson.geometry.coordinates[i]);
        }
      }
    }
  }

  if (reverseOrder) {
    targetCoordinates = transitionCoordinatesShort;
    srcCoordinates = transitionCoordinatesLong;
  } else {
    targetCoordinates = transitionCoordinatesLong;
    srcCoordinates = transitionCoordinatesShort;
  }

  if (targetCoordinates.length < 2 && srcCoordinates < 2) return; // create props.transitionTime / msPerStep (=: transitionSteps) Versions of transitionGeojsonCommonDataRef.current + transitionCoordinates making the transitionCoordinates transitionCoordinatesDistance / transitionSteps longer on each step

  var transitionSteps = props.transitionTime / msPerStep;
  var srcCoordinatesDistance = srcCoordinates.length > 1 ? Math.round(length(lineString(srcCoordinates))) : 0;
  var targetCoordinatesDistance = targetCoordinates.length > 1 ? Math.round(length(lineString(targetCoordinates))) : 0;
  var transitionDistance = targetCoordinatesDistance + srcCoordinatesDistance;
  var srcCoordinatesShare = srcCoordinatesDistance / transitionDistance;
  var srcTransitionSteps = Math.round(transitionSteps * srcCoordinatesShare);
  var srcPerStepDistance = Math.round(srcCoordinatesDistance / srcTransitionSteps * 100) / 100;
  var targetCoordinatesShare = targetCoordinatesDistance / transitionDistance;
  var targetTransitionSteps = Math.round(transitionSteps * targetCoordinatesShare);
  var targetPerStepDistance = Math.round(targetCoordinatesDistance / targetTransitionSteps * 100) / 100;
  transitionGeojsonDataRef.current = []; // use srcPerStepDistance as src coordinates are always animated backwards

  var tmpLinestring = {};
  var tmpChunks = {};

  if (srcCoordinates.length > 1) {
    tmpChunks = lineChunk(lineString(srcCoordinates), srcPerStepDistance //{reverse:true}
    ); // for some reason turf.lineChunk returns the full lineString as element 0, chunks start at 1

    tmpLinestring = tmpChunks.features[1];

    for (i = 1; i < srcTransitionSteps; i++) {
      transitionGeojsonDataRef.current.push(tmpLinestring);

      if (typeof tmpChunks.features[i + 1] !== "undefined") {
        tmpLinestring = lineString([].concat(_toConsumableArray(tmpLinestring.geometry.coordinates), _toConsumableArray(tmpChunks.features[i + 1].geometry.coordinates)));
      } else {
        transitionGeojsonDataRef.current.push(tmpLinestring);
        break;
      }
    }

    transitionGeojsonDataRef.current.reverse();
  }

  if (targetCoordinates.length > 1) {
    tmpChunks = lineChunk(lineString(targetCoordinates), targetPerStepDistance); // for some reason turf.lineChunk returns the full lineString as element 0, chunks start at 1

    tmpLinestring = tmpChunks.features[1];

    for (i = 1; i < targetTransitionSteps; i++) {
      transitionGeojsonDataRef.current.push(tmpLinestring);

      if (typeof tmpChunks.features[i + 1] !== "undefined") {
        tmpLinestring = lineString([].concat(_toConsumableArray(tmpLinestring.geometry.coordinates), _toConsumableArray(tmpChunks.features[i + 1].geometry.coordinates)));
      } else {
        transitionGeojsonDataRef.current.push(tmpLinestring);
        break;
      }
    }
  }

  transitionGeojsonDataRef.current.push(props.geojson);
  currentTransitionStepRef.current = 1;
  transitionInProgressRef.current = true;
  setTimeout(function () {
    return _showNextTransitionSegment(props, layerId, map, transitionInProgressRef, transitionGeojsonDataRef, transitionGeojsonCommonDataRef, currentTransitionStepRef, msPerStep);
  }, msPerStep);
};

var msPerStep = 50;

var MlGeoJsonLayer = function MlGeoJsonLayer(props) {
  // Use a useRef hook to reference the layer object to be able to access it later inside useEffect hooks
  var mapContext = useContext(MapContext);
  var oldGeojsonRef = useRef(null);
  var mapRef = useRef(null);
  var initializedRef = useRef(false);
  var transitionInProgressRef = useRef(false);
  var currentTransitionStepRef = useRef(false);
  var transitionGeojsonDataRef = useRef([]);
  var transitionGeojsonCommonDataRef = useRef([]);
  var componentId = useRef((props.layerId ? props.layerId : "MlGeoJsonLayer-") + (props.idSuffix || v4()));
  useEffect(function () {
    var _componentId = componentId.current;
    return function () {
      // This is the cleanup function, it is called when this react component is removed from react-dom
      if (mapRef.current) {
        mapRef.current.cleanup(_componentId);
        mapRef.current = null;
      }
    };
  }, []);
  useEffect(function () {
    if (!mapContext.mapExists(props.mapId) || !mapContext.getMap(props.mapId).style || !mapContext.getMap(props.mapId).getLayer(componentId.current)) return; // the MapLibre-gl instance (mapContext.map) is accessible here
    // initialize the layer and add it to the MapLibre-gl instance or do something else with it

    for (var key in props.paint) {
      mapContext.getMap(props.mapId).setPaintProperty(componentId.current, key, props.paint[key]);
    }
  }, [props.paint, mapContext, props.mapId]);
  var transitionToGeojson = useCallback(function (newGeojson) {
    console.log("TRANSITION CALLED");

    _transitionToGeojson(newGeojson, props, transitionGeojsonCommonDataRef, transitionGeojsonDataRef, transitionInProgressRef, oldGeojsonRef, msPerStep, currentTransitionStepRef, mapRef.current, componentId.current);
  }, [props]);
  useEffect(function () {
    if (!mapContext.mapExists(props.mapId) || !mapContext.getMap(props.mapId).getSource(componentId.current)) return; // the MapLibre-gl instance (mapContext.map) is accessible here
    // initialize the layer and add it to the MapLibre-gl instance or do something else with it

    if (typeof props.transitionTime !== "undefined" && props.type === "line" && oldGeojsonRef.current) {
      transitionInProgressRef.current = false;
      currentTransitionStepRef.current = false;
      transitionGeojsonDataRef.current = [];
      transitionGeojsonCommonDataRef.current = [];
      transitionToGeojson(props.geojson);
    } else {
      mapContext.getMap(props.mapId).getSource(componentId.current).setData(props.geojson);
    }

    oldGeojsonRef.current = props.geojson;
  }, [props.geojson, props.mapId, mapContext, props.type, transitionToGeojson, props.transitionTime]);
  useEffect(function () {
    if (!mapContext.mapExists(props.mapId) || initializedRef.current) return; // the MapLibre-gl instance (mapContext.map) is accessible here
    // initialize the layer and add it to the MapLibre-gl instance or do something else with it

    if (props.geojson) {
      initializedRef.current = true;
      var geojson = props.geojson;

      if (props.type === "line" && typeof props.transitionTime !== "undefined" && props.transitionTime && typeof props.geojson.geometry !== "undefined") {
        var tmpChunks = lineChunk(props.geojson, 0.01);
        geojson = tmpChunks.features[0];
      }

      mapRef.current = mapContext.getMap(props.mapId);
      mapRef.current.addLayer({
        id: componentId.current,
        source: {
          type: "geojson",
          data: geojson
        },
        type: props.type || "line",
        paint: props.paint || {
          "line-color": "rgb(100,200,100)",
          "line-width": 10
        }
      }, props.insertBeforeLayer, componentId.current);

      if (props.type === "line" && typeof props.transitionTime !== "undefined" && typeof props.geojson.geometry !== "undefined") {
        transitionToGeojson(props.geojson);
        setTimeout(function () {
          oldGeojsonRef.current = props.geojson;
        }, props.transitionTime / 2);
      }
    }
  }, [mapContext.mapIds, mapContext, props.geojson, props.insertBeforeLayer, props.mapId, props.type, props.transitionTime, props.paint, transitionToGeojson]);
  return /*#__PURE__*/React.createElement(React.Fragment, null);
};

var MlImageMarkerLayer = function MlImageMarkerLayer(props) {
  // Use a useRef hook to reference the layer object to be able to access it later inside useEffect hooks
  var mapRef = useRef(null);
  var componentId = useRef((props.idPrefix ? props.idPrefix : "MlOsmLayer-") + v4());
  var mapContext = useContext(MapContext);
  var layerInitializedRef = useRef(false);
  var idPostfixRef = useRef(props.idSuffix || new Date().getTime());
  var imageIdRef = useRef(props.imageId || "img_" + new Date().getTime());
  var layerId = (props.layerId || "MlImageMarkerLayer-") + idPostfixRef.current;
  useEffect(function () {
    var _componentId = componentId.current;
    return function () {
      // This is the cleanup function, it is called when this react component is removed from react-dom
      if (mapRef.current) {
        mapRef.current.cleanup(_componentId);
        mapRef.current = null;
      }
    };
  }, []);
  useEffect(function () {
    if (!mapRef.current || mapRef.current && !mapContext.getMap(props.mapId).getLayer(layerId) || !props.options) return; // the MapLibre-gl instance (mapContext.map) is accessible here
    // initialize the layer and add it to the MapLibre-gl instance or do something else with it

    var key;

    if (props.options.layout) {
      for (key in props.options.layout) {
        mapContext.getMap(props.mapId).setLayoutProperty(layerId, key, props.options.layout[key]);
      }
    }

    if (props.options.paint) {
      for (key in props.options.paint) {
        mapContext.getMap(props.mapId).setPaintProperty(layerId, key, props.options.paint[key]);
      }
    }
  }, [props.options, layerId, mapContext, props.mapId]);
  var addLayer = useCallback(function () {
    var tmpOptions = _objectSpread2({
      id: layerId,
      layout: {}
    }, props.options);

    tmpOptions.layout["icon-image"] = imageIdRef.current;
    mapRef.current.addLayer(tmpOptions, props.insertBeforeLayer, componentId.current);
  }, [props, imageIdRef, layerId]);
  useEffect(function () {
    if (!mapRef.current || mapRef.current && !mapContext.getMap(props.mapId).getLayer(layerId) || !props.options) {
      return;
    } // the MapLibre-gl instance (mapContext.map) is accessible here
    // initialize the layer and add it to the MapLibre-gl instance or do something else with it


    mapRef.current.getSource(layerId).setData(props.geojson);
  }, [props.geojson, layerId, mapContext, props]);
  useEffect(function () {
    if (!props.options || !mapContext.mapExists(props.mapId) || layerInitializedRef.current) return; // the MapLibre-gl instance (mapContext.map) is accessible here
    // initialize the layer and add it to the MapLibre-gl instance or do something else with it

    mapRef.current = mapContext.getMap(props.mapId);
    layerInitializedRef.current = true;

    if (props.imgSrc) {
      mapRef.current.loadImage(props.imgSrc, function (error, image) {
        if (error) throw error;
        mapRef.current.addImage(imageIdRef.current, image, componentId.current);
      });
    }

    addLayer();
  }, [mapContext.mapIds, mapContext, props, layerId, addLayer]);
  return /*#__PURE__*/React.createElement(React.Fragment, null);
};

var MlLayer = function MlLayer(props) {
  // Use a useRef hook to reference the layer object to be able to access it later inside useEffect hooks
  var mapContext = useContext(MapContext);
  var layerInitializedRef = useRef(false);
  var mapRef = useRef(null);
  var componentId = useRef((props.layerId ? props.layerId : "MlLayer-") + v4());
  var idSuffixRef = useRef(props.idSuffix || new Date().getTime());
  var layerId = (props.layerId || "MlLayer-") + idSuffixRef.current;
  var layerPaintConfRef = useRef(undefined);
  var layerLayoutConfRef = useRef(undefined);
  useEffect(function () {
    var _componentId = componentId.current;
    return function () {
      if (mapRef.current) {
        mapRef.current.cleanup(_componentId);
        mapRef.current = null;
      }
    };
  }, []);
  useEffect(function () {
    if (!mapContext.mapExists(props.mapId) || !layerInitializedRef.current || !props.options) return; // the MapLibre-gl instance (mapContext.map) is accessible here
    // initialize the layer and add it to the MapLibre-gl instance or do something else with it

    var key;
    var layoutString = JSON.stringify(props.options.layout);

    if (props.options.layout && layoutString !== layerLayoutConfRef.current) {
      for (key in props.options.layout) {
        mapRef.current.setLayoutProperty(layerId, key, props.options.layout[key]);
      }

      layerLayoutConfRef.current = layoutString;
    }

    var paintString = JSON.stringify(props.options.paint);

    if (props.options.paint && paintString === layerPaintConfRef.current) {
      for (key in props.options.paint) {
        mapRef.current.setPaintProperty(layerId, key, props.options.paint[key]);
      }
    }
  }, [props.options, layerId, mapContext, props]);
  useEffect(function () {
    if (!props.options || !mapContext.mapExists(props.mapId) || layerInitializedRef.current) return; // the MapLibre-gl instance (mapContext.map) is accessible here
    // initialize the layer and add it to the MapLibre-gl instance or do something else with it

    mapRef.current = mapContext.getMap(props.mapId);
    layerInitializedRef.current = true;
    mapRef.current.addLayer(_objectSpread2({
      id: layerId
    }, props.options), props.insertBeforeLayer, componentId.current);
    layerPaintConfRef.current = JSON.stringify(props.options.paint);
    layerLayoutConfRef.current = JSON.stringify(props.options.layout);
  }, [mapContext.mapIds, mapContext, props, layerId]);
  return /*#__PURE__*/React.createElement(React.Fragment, null);
};

/**
 * MlOsmLayer returns a Button that will add a standard OSM tile layer to the maplibre-gl instance.
 */

var MlOsmLayer = function MlOsmLayer(props) {
  var mapContext = useContext(MapContext);
  var mapRef = useRef(undefined);

  var _useState = useState(true),
      _useState2 = _slicedToArray(_useState, 2),
      showLayer = _useState2[0],
      setShowLayer = _useState2[1];

  var componentId = useRef((props.idPrefix ? props.idPrefix : "MlOsmLayer-") + v4());
  var initializedRef = useRef(false);
  var sourceIdRef = useRef((props.idPrefix ? props.idPrefix : "MlOsmLayer-source-") + v4());
  var layerIdRef = useRef((props.idPrefix ? props.idPrefix : "MlOsmLayer-layer-") + v4());
  useEffect(function () {
    var _componentId = componentId.current;
    return function () {
      // This is the cleanup function, it is called when this react component is removed from react-dom
      if (mapRef.current) {
        mapRef.current.cleanup(_componentId);
        mapRef.current = null;
      }
    };
  }, []);
  useEffect(function () {
    if (!mapContext.mapExists(props.mapId) || initializedRef.current) return;
    initializedRef.current = true;
    mapRef.current = mapContext.getMap(props.mapId);
    mapRef.current.addSource(sourceIdRef.current, _objectSpread2({
      type: "raster",
      tileSize: 256
    }, props.sourceOptions), componentId.current);
    mapRef.current.addLayer(_objectSpread2({
      id: layerIdRef.current,
      type: "raster",
      source: sourceIdRef.current,
      minzoom: 0,
      maxzoom: 22
    }, props.layerOptions), props.insertBeforeLayer, componentId.current);
  }, [mapContext.mapIds, props, mapContext]);
  useEffect(function () {
    if (!mapRef.current) return; // toggle layer visibility by changing the layout object's visibility property

    if (showLayer) {
      mapRef.current.setLayoutProperty(layerIdRef.current, "visibility", "visible");
    } else {
      mapRef.current.setLayoutProperty(layerIdRef.current, "visibility", "none");
    }
  }, [showLayer]);
  return /*#__PURE__*/React.createElement(Button, {
    color: "primary",
    variant: showLayer ? "contained" : "outlined",
    onClick: function onClick() {
      return setShowLayer(!showLayer);
    }
  }, "OSM");
};

/**
 * MlVectorTileLayer returns a Button that will add a standard OSM tile layer to the maplibre-gl instance.
 */

var MlVectorTileLayer = function MlVectorTileLayer(props) {
  var mapContext = useContext(MapContext);
  var layerName = "vector-tile-layer-";
  var sourceName = "vector-tile-source-";
  var idSuffixRef = useRef(new Date().getTime());
  var layerIdsRef = useRef({});
  var layerPaintConfsRef = useRef({});
  var initializedRef = useRef(false);
  var mapRef = useRef(null);

  var cleanup = function cleanup() {
    if (mapRef.current && mapRef.current.style) {
      for (var key in layerIdsRef.current) {
        if (mapRef.current.getLayer(layerIdsRef.current[key])) {
          mapRef.current.removeLayer(layerIdsRef.current[key]);
        }
      }

      if (mapRef.current.getSource(sourceName + idSuffixRef.current)) {
        mapRef.current.removeSource(sourceName + idSuffixRef.current);
      }
    }
  };

  useEffect(function () {
    return cleanup;
  }, []);
  useEffect(function () {
    if (!mapContext.mapExists(props.mapId) || initializedRef.current) return;
    initializedRef.current = true;
    mapRef.current = mapContext.getMap(props.mapId); // Add the new layer to the openlayers instance once it is available

    mapRef.current.addSource(sourceName + idSuffixRef.current, {
      type: "vector",
      tiles: [props.url],
      tileSize: 512,
      attribution: "" //...props.sourceOptions,

    });

    for (var key in props.layers) {
      var layerId = layerName + "_" + key + "_" + idSuffixRef.current;
      layerIdsRef.current[key] = layerId;
      mapRef.current.addLayer(_objectSpread2({
        id: layerId,
        source: sourceName + idSuffixRef.current,
        type: "line",
        minzoom: 0,
        maxzoom: 22,
        layout: {},
        paint: {
          "line-opacity": 0.5,
          "line-color": "rgb(80, 80, 80)",
          "line-width": 2
        }
      }, props.layers[key]));
      layerPaintConfsRef.current[key] = JSON.stringify(props.layers[key].paint);
    }
  }, [mapContext.mapIds, props, mapContext]);
  useEffect(function () {
    if (!mapRef.current) return; // the MapLibre-gl instance (mapContext.map) is accessible here
    // initialize the layer and add it to the MapLibre-gl instance or do something else with it

    for (var key in props.layers) {
      if (mapRef.current.getLayer(layerIdsRef.current[key])) {
        var layerConfString = JSON.stringify(props.layers[key].paint);

        if (layerConfString !== layerPaintConfsRef.current[key]) {
          for (var paintKey in props.layers[key].paint) {
            mapContext.getMap(props.mapId).setPaintProperty(layerIdsRef.current[key], paintKey, props.layers[key].paint[paintKey]);
          }
        }

        layerPaintConfsRef.current[key] = layerConfString;
      }
    }
  }, [props.layers, props, mapContext]);
  useEffect(function () {
    if (!mapRef.current) return; // toggle layer visibility by changing the layout object's visibility property

    if (props.visible) {
      mapRef.current.setLayoutProperty(layerName + idSuffixRef.current, "visibility", "visible");
    } else {
      mapRef.current.setLayoutProperty(layerName + idSuffixRef.current, "visibility", "none");
    }
  }, [props.visible]);
  return /*#__PURE__*/React.createElement(React.Fragment, null);
};

/**
 * MlWmsLayer returns a Button that will add a standard OSM tile layer to the maplibre-gl instance.
 */

var MlWmsLayer = function MlWmsLayer(props) {
  var mapContext = useContext(MapContext);

  var _useState = useState(true),
      _useState2 = _slicedToArray(_useState, 2),
      showLayer = _useState2[0],
      setShowLayer = _useState2[1];

  var componentId = useRef((props.idPrefix ? props.idPrefix : "MlWmsLayer-") + v4());
  var mapRef = useRef(null);
  var initializedRef = useRef(false);
  useEffect(function () {
    var _componentId = componentId.current;
    return function () {
      // This is the cleanup function, it is called when this react component is removed from react-dom
      if (mapRef.current) {
        mapRef.current.cleanup(_componentId);
        mapRef.current = null;
      }
    };
  }, []);
  useEffect(function () {
    if (!mapContext.mapExists(props.mapId) || initializedRef.current) return;
    initializedRef.current = true;
    mapRef.current = mapContext.getMap(props.mapId); // Add the new layer to the openlayers instance once it is available

    mapRef.current.addSource(componentId.current, {
      type: "raster",
      tiles: [props.url + "?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&width=256&height=256&layers=" + props.layer],
      tileSize: 256,
      attribution: "" //...props.sourceOptions,

    }, componentId.current);
    mapRef.current.addLayer(_objectSpread2({
      id: componentId.current,
      type: "raster",
      source: componentId.current,
      minzoom: 0,
      maxzoom: 10
    }, props.sourceOptions), props.insertBeforeLayer, componentId.current);
  }, [mapContext.mapIds, mapContext, props]);
  useEffect(function () {
    if (!mapRef.current) return; // toggle layer visibility by changing the layout object's visibility property

    if (showLayer) {
      mapRef.current.setLayoutProperty(componentId.current, "visibility", "visible");
    } else {
      mapRef.current.setLayoutProperty(componentId.current, "visibility", "none");
    }
  }, [showLayer]);
  return /*#__PURE__*/React.createElement(Button, {
    color: "primary",
    variant: showLayer ? "contained" : "outlined",
    onClick: function onClick() {
      return setShowLayer(!showLayer);
    }
  }, "WMS");
};

var classes = {
  CONTROL_BASE: 'mapboxgl-ctrl',
  CONTROL_PREFIX: 'mapboxgl-ctrl-',
  CONTROL_BUTTON: 'mapbox-gl-draw_ctrl-draw-btn',
  CONTROL_BUTTON_LINE: 'mapbox-gl-draw_line',
  CONTROL_BUTTON_POLYGON: 'mapbox-gl-draw_polygon',
  CONTROL_BUTTON_POINT: 'mapbox-gl-draw_point',
  CONTROL_BUTTON_TRASH: 'mapbox-gl-draw_trash',
  CONTROL_BUTTON_COMBINE_FEATURES: 'mapbox-gl-draw_combine',
  CONTROL_BUTTON_UNCOMBINE_FEATURES: 'mapbox-gl-draw_uncombine',
  CONTROL_GROUP: 'mapboxgl-ctrl-group',
  ATTRIBUTION: 'mapboxgl-ctrl-attrib',
  ACTIVE_BUTTON: 'active',
  BOX_SELECT: 'mapbox-gl-draw_boxselect'
};
var cursors = {
  ADD: 'add',
  MOVE: 'move',
  DRAG: 'drag',
  POINTER: 'pointer',
  NONE: 'none'
};
var types = {
  POLYGON: 'polygon',
  LINE: 'line_string',
  POINT: 'point'
};
var geojsonTypes = {
  FEATURE: 'Feature',
  POLYGON: 'Polygon',
  LINE_STRING: 'LineString',
  POINT: 'Point',
  FEATURE_COLLECTION: 'FeatureCollection',
  MULTI_PREFIX: 'Multi',
  MULTI_POINT: 'MultiPoint',
  MULTI_LINE_STRING: 'MultiLineString',
  MULTI_POLYGON: 'MultiPolygon'
};
var events = {
  CREATE: 'draw.create',
  DELETE: 'draw.delete',
  UPDATE: 'draw.update',
  SELECTION_CHANGE: 'draw.selectionchange',
  MODE_CHANGE: 'draw.modechange',
  ACTIONABLE: 'draw.actionable',
  RENDER: 'draw.render',
  COMBINE_FEATURES: 'draw.combine',
  UNCOMBINE_FEATURES: 'draw.uncombine'
};
var updateActions = {
  MOVE: 'move',
  CHANGE_COORDINATES: 'change_coordinates'
};
var meta = {
  FEATURE: 'feature',
  MIDPOINT: 'midpoint',
  VERTEX: 'vertex'
};
var activeStates = {
  ACTIVE: 'true',
  INACTIVE: 'false'
};
var LAT_MIN = -90;
var LAT_RENDERED_MIN = -85;
var LAT_MAX = 90;
var LAT_RENDERED_MAX = 85;
var LNG_MIN = -270;
var LNG_MAX = 270;

function isOfMetaType(type) {
  return function (e) {
    var featureTarget = e.featureTarget;
    if (!featureTarget) return false;
    if (!featureTarget.properties) return false;
    return featureTarget.properties.meta === type;
  };
}
function isShiftMousedown(e) {
  if (!e.originalEvent) return false;
  if (!e.originalEvent.shiftKey) return false;
  return e.originalEvent.button === 0;
}
function isActiveFeature(e) {
  if (!e.featureTarget) return false;
  if (!e.featureTarget.properties) return false;
  return e.featureTarget.properties.active === activeStates.ACTIVE && e.featureTarget.properties.meta === meta.FEATURE;
}
function isInactiveFeature(e) {
  if (!e.featureTarget) return false;
  if (!e.featureTarget.properties) return false;
  return e.featureTarget.properties.active === activeStates.INACTIVE && e.featureTarget.properties.meta === meta.FEATURE;
}
function noTarget(e) {
  return e.featureTarget === undefined;
}
function isFeature(e) {
  if (!e.featureTarget) return false;
  if (!e.featureTarget.properties) return false;
  return e.featureTarget.properties.meta === meta.FEATURE;
}
function isVertex(e) {
  var featureTarget = e.featureTarget;
  if (!featureTarget) return false;
  if (!featureTarget.properties) return false;
  return featureTarget.properties.meta === meta.VERTEX;
}
function isShiftDown(e) {
  if (!e.originalEvent) return false;
  return e.originalEvent.shiftKey === true;
}
function isEscapeKey(e) {
  return e.keyCode === 27;
}
function isEnterKey(e) {
  return e.keyCode === 13;
}

var doubleClickZoom = {
  enable: function enable(ctx) {
    setTimeout(function () {
      // First check we've got a map and some context.
      if (!ctx.map || !ctx.map.doubleClickZoom || !ctx._ctx || !ctx._ctx.store || !ctx._ctx.store.getInitialConfigValue) return; // Now check initial state wasn't false (we leave it disabled if so)

      if (!ctx._ctx.store.getInitialConfigValue("doubleClickZoom")) return;
      ctx.map.doubleClickZoom.enable();
    }, 0);
  },
  disable: function disable(ctx) {
    setTimeout(function () {
      if (!ctx.map || !ctx.map.doubleClickZoom) return; // Always disable here, as it's necessary in some cases.

      ctx.map.doubleClickZoom.disable();
    }, 0);
  }
};

function isEventAtCoordinates(event, coordinates) {
  if (!event.lngLat) return false;
  return event.lngLat.lng === coordinates[0] && event.lngLat.lat === coordinates[1];
}

/**
 * Returns GeoJSON for a Point representing the
 * vertex of another feature.
 *
 * @param {string} parentId
 * @param {Array<number>} coordinates
 * @param {string} path - Dot-separated numbers indicating exactly
 *   where the point exists within its parent feature's coordinates.
 * @param {boolean} selected
 * @return {GeoJSON} Point
 */

var create_vertex = function create_vertex(parentId, coordinates, path, selected) {
  return {
    type: geojsonTypes.FEATURE,
    properties: {
      meta: meta.VERTEX,
      parent: parentId,
      coord_path: path,
      active: selected ? activeStates.ACTIVE : activeStates.INACTIVE
    },
    geometry: {
      type: geojsonTypes.POINT,
      coordinates: coordinates
    }
  };
};

var CustomPolygonMode = {};

CustomPolygonMode.onSetup = function () {
  console.log("Change mode: custom polygon");
  var polygon = this.newFeature({
    type: geojsonTypes.FEATURE,
    properties: {},
    geometry: {
      type: geojsonTypes.POLYGON,
      coordinates: [[]]
    }
  });
  this.addFeature(polygon);
  this.clearSelectedFeatures();
  doubleClickZoom.disable(this);
  this.updateUIClasses({
    mouse: cursors.ADD
  });
  this.activateUIButton(types.POLYGON);
  this.setActionableState({
    trash: true
  });
  return {
    polygon: polygon,
    currentVertexPosition: 0
  };
};

CustomPolygonMode.clickAnywhere = function (state, e) {
  if (state.currentVertexPosition > 0 && isEventAtCoordinates(e, state.polygon.coordinates[0][state.currentVertexPosition - 1])) {
    return this.changeMode("custom_select", {
      featureIds: [state.polygon.id]
    });
  }

  this.updateUIClasses({
    mouse: cursors.ADD
  });
  state.polygon.updateCoordinate("0.".concat(state.currentVertexPosition), e.lngLat.lng, e.lngLat.lat);
  state.currentVertexPosition++;
  state.polygon.updateCoordinate("0.".concat(state.currentVertexPosition), e.lngLat.lng, e.lngLat.lat);
  this.map.fire(events.CREATE, {
    features: [state.polygon.toGeoJSON()]
  });
};

CustomPolygonMode.clickOnVertex = function (state) {
  return this.changeMode("custom_select", {
    featureIds: [state.polygon.id]
  });
};

CustomPolygonMode.onMouseMove = function (state, e) {
  state.polygon.updateCoordinate("0.".concat(state.currentVertexPosition), e.lngLat.lng, e.lngLat.lat);

  if (isVertex(e)) {
    this.updateUIClasses({
      mouse: cursors.POINTER
    });
  }
};

CustomPolygonMode.onTap = CustomPolygonMode.onClick = function (state, e) {
  if (isVertex(e)) return this.clickOnVertex(state, e);
  return this.clickAnywhere(state, e);
};

CustomPolygonMode.onKeyUp = function (state, e) {
  if (isEscapeKey(e)) {
    this.deleteFeature([state.polygon.id], {
      silent: true
    });
    this.changeMode("custom_select");
  } else if (isEnterKey(e)) {
    this.changeMode("custom_select", {
      featureIds: [state.polygon.id]
    });
  }
};

CustomPolygonMode.onStop = function (state) {
  this.updateUIClasses({
    mouse: cursors.NONE
  });
  doubleClickZoom.enable(this);
  this.activateUIButton(); // check to see if we've deleted this feature

  if (this.getFeature(state.polygon.id) === undefined) return; //remove last added coordinate

  state.polygon.removeCoordinate("0.".concat(state.currentVertexPosition));

  if (state.polygon.isValid()) {
    this.map.fire(events.CREATE, {
      features: [state.polygon.toGeoJSON()]
    });
  } else {
    this.deleteFeature([state.polygon.id], {
      silent: true
    });
    this.changeMode("custom_select", {}, {
      silent: true
    });
  }
};

CustomPolygonMode.toDisplayFeatures = function (state, geojson, display) {
  var isActivePolygon = geojson.properties.id === state.polygon.id;
  geojson.properties.active = isActivePolygon ? activeStates.ACTIVE : activeStates.INACTIVE;
  if (!isActivePolygon) return display(geojson); // Don't render a polygon until it has two positions
  // (and a 3rd which is just the first repeated)

  if (geojson.geometry.coordinates.length === 0) return;
  var coordinateCount = geojson.geometry.coordinates[0].length; // 2 coordinates after selecting a draw type
  // 3 after creating the first point

  if (coordinateCount < 3) {
    return;
  }

  geojson.properties.meta = meta.FEATURE;
  display(create_vertex(state.polygon.id, geojson.geometry.coordinates[0][0], "0.0", false));

  if (coordinateCount > 3) {
    // Add a start position marker to the map, clicking on this will finish the feature
    // This should only be shown when we're in a valid spot
    var endPos = geojson.geometry.coordinates[0].length - 3;
    display(create_vertex(state.polygon.id, geojson.geometry.coordinates[0][endPos], "0.".concat(endPos), false));
  }

  if (coordinateCount <= 4) {
    // If we've only drawn two positions (plus the closer),
    // make a LineString instead of a Polygon
    var lineCoordinates = [[geojson.geometry.coordinates[0][0][0], geojson.geometry.coordinates[0][0][1]], [geojson.geometry.coordinates[0][1][0], geojson.geometry.coordinates[0][1][1]]]; // create an initial vertex so that we can track the first point on mobile devices

    display({
      type: geojsonTypes.FEATURE,
      properties: geojson.properties,
      geometry: {
        coordinates: lineCoordinates,
        type: geojsonTypes.LINE_STRING
      }
    });

    if (coordinateCount === 3) {
      return;
    }
  } // render the Polygon


  return display(geojson);
};

CustomPolygonMode.onTrash = function (state) {
  this.deleteFeature([state.polygon.id], {
    silent: true
  });
  this.changeMode("custom_select");
};

/**
 * Returns a Point representing a mouse event's position
 * relative to a containing element.
 *
 * @param {MouseEvent} mouseEvent
 * @param {Node} container
 * @returns {Point}
 */

function mouseEventPoint(mouseEvent, container) {
  var rect = container.getBoundingClientRect();
  return new Point(mouseEvent.clientX - rect.left - (container.clientLeft || 0), mouseEvent.clientY - rect.top - (container.clientTop || 0));
}

var create_midpoint = function create_midpoint(parent, startVertex, endVertex) {
  var startCoord = startVertex.geometry.coordinates;
  var endCoord = endVertex.geometry.coordinates; // If a coordinate exceeds the projection, we can't calculate a midpoint,
  // so run away

  if (startCoord[1] > LAT_RENDERED_MAX || startCoord[1] < LAT_RENDERED_MIN || endCoord[1] > LAT_RENDERED_MAX || endCoord[1] < LAT_RENDERED_MIN) {
    return null;
  }

  var mid = {
    lng: (startCoord[0] + endCoord[0]) / 2,
    lat: (startCoord[1] + endCoord[1]) / 2
  };
  return {
    type: geojsonTypes.FEATURE,
    properties: {
      meta: meta.MIDPOINT,
      parent: parent,
      lng: mid.lng,
      lat: mid.lat,
      coord_path: endVertex.properties.coord_path
    },
    geometry: {
      type: geojsonTypes.POINT,
      coordinates: [mid.lng, mid.lat]
    }
  };
};

function createSupplementaryPoints(geojson) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var basePath = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var _geojson$geometry = geojson.geometry,
      type = _geojson$geometry.type,
      coordinates = _geojson$geometry.coordinates;
  var featureId = geojson.properties && geojson.properties.id;
  var supplementaryPoints = [];

  if (type === geojsonTypes.POINT) {
    // For points, just create a vertex
    supplementaryPoints.push(create_vertex(featureId, coordinates, basePath, isSelectedPath(basePath)));
  } else if (type === geojsonTypes.POLYGON) {
    // Cycle through a Polygon's rings and
    // process each line
    coordinates.forEach(function (line, lineIndex) {
      processLine(line, basePath !== null ? "".concat(basePath, ".").concat(lineIndex) : String(lineIndex));
    });
  } else if (type === geojsonTypes.LINE_STRING) {
    processLine(coordinates, basePath);
  } else if (type.indexOf(geojsonTypes.MULTI_PREFIX) === 0) {
    processMultiGeometry();
  }

  function processLine(line, lineBasePath) {
    var firstPointString = "";
    var lastVertex = null;
    line.forEach(function (point, pointIndex) {
      var pointPath = lineBasePath !== undefined && lineBasePath !== null ? "".concat(lineBasePath, ".").concat(pointIndex) : String(pointIndex);
      var vertex = create_vertex(featureId, point, pointPath, isSelectedPath(pointPath)); // If we're creating midpoints, check if there was a
      // vertex before this one. If so, add a midpoint
      // between that vertex and this one.

      if (options.midpoints && lastVertex) {
        var midpoint = create_midpoint(featureId, lastVertex, vertex);

        if (midpoint) {
          supplementaryPoints.push(midpoint);
        }
      }

      lastVertex = vertex; // A Polygon line's last point is the same as the first point. If we're on the last
      // point, we want to draw a midpoint before it but not another vertex on it
      // (since we already a vertex there, from the first point).

      var stringifiedPoint = JSON.stringify(point);

      if (firstPointString !== stringifiedPoint) {
        supplementaryPoints.push(vertex);
      }

      if (pointIndex === 0) {
        firstPointString = stringifiedPoint;
      }
    });
  }

  function isSelectedPath(path) {
    if (!options.selectedPaths) return false;
    return options.selectedPaths.indexOf(path) !== -1;
  } // Split a multi-geometry into constituent
  // geometries, and accumulate the supplementary points
  // for each of those constituents


  function processMultiGeometry() {
    var subType = type.replace(geojsonTypes.MULTI_PREFIX, "");
    coordinates.forEach(function (subCoordinates, index) {
      var subFeature = {
        type: geojsonTypes.FEATURE,
        properties: geojson.properties,
        geometry: {
          type: subType,
          coordinates: subCoordinates
        }
      };
      supplementaryPoints = supplementaryPoints.concat(createSupplementaryPoints(subFeature, options, index));
    });
  }

  return supplementaryPoints;
}

function StringSet(items) {
  this._items = {};
  this._nums = {};
  this._length = items ? items.length : 0;
  if (!items) return;

  for (var i = 0, l = items.length; i < l; i++) {
    this.add(items[i]);
    if (items[i] === undefined) continue;
    if (typeof items[i] === 'string') this._items[items[i]] = i;else this._nums[items[i]] = i;
  }
}

StringSet.prototype.add = function (x) {
  if (this.has(x)) return this;
  this._length++;
  if (typeof x === 'string') this._items[x] = this._length;else this._nums[x] = this._length;
  return this;
};

StringSet.prototype.delete = function (x) {
  if (this.has(x) === false) return this;
  this._length--;
  delete this._items[x];
  delete this._nums[x];
  return this;
};

StringSet.prototype.has = function (x) {
  if (typeof x !== 'string' && typeof x !== 'number') return false;
  return this._items[x] !== undefined || this._nums[x] !== undefined;
};

StringSet.prototype.values = function () {
  var _this = this;

  var values = [];
  Object.keys(this._items).forEach(function (k) {
    values.push({
      k: k,
      v: _this._items[k]
    });
  });
  Object.keys(this._nums).forEach(function (k) {
    values.push({
      k: JSON.parse(k),
      v: _this._nums[k]
    });
  });
  return values.sort(function (a, b) {
    return a.v - b.v;
  }).map(function (a) {
    return a.k;
  });
};

StringSet.prototype.clear = function () {
  this._length = 0;
  this._items = {};
  this._nums = {};
  return this;
};

var LAT_MIN$1 = LAT_MIN,
    LAT_MAX$1 = LAT_MAX,
    LAT_RENDERED_MIN$1 = LAT_RENDERED_MIN,
    LAT_RENDERED_MAX$1 = LAT_RENDERED_MAX,
    LNG_MIN$1 = LNG_MIN,
    LNG_MAX$1 = LNG_MAX; // Ensure that we do not drag north-south far enough for
// - any part of any feature to exceed the poles
// - any feature to be completely lost in the space between the projection's
//   edge and the poles, such that it couldn't be re-selected and moved back

var constrain_feature_movement = function constrain_feature_movement(geojsonFeatures, delta) {
  // "inner edge" = a feature's latitude closest to the equator
  var northInnerEdge = LAT_MIN$1;
  var southInnerEdge = LAT_MAX$1; // "outer edge" = a feature's latitude furthest from the equator

  var northOuterEdge = LAT_MIN$1;
  var southOuterEdge = LAT_MAX$1;
  var westEdge = LNG_MAX$1;
  var eastEdge = LNG_MIN$1;
  geojsonFeatures.forEach(function (feature) {
    var bounds = extent(feature);
    var featureSouthEdge = bounds[1];
    var featureNorthEdge = bounds[3];
    var featureWestEdge = bounds[0];
    var featureEastEdge = bounds[2];
    if (featureSouthEdge > northInnerEdge) northInnerEdge = featureSouthEdge;
    if (featureNorthEdge < southInnerEdge) southInnerEdge = featureNorthEdge;
    if (featureNorthEdge > northOuterEdge) northOuterEdge = featureNorthEdge;
    if (featureSouthEdge < southOuterEdge) southOuterEdge = featureSouthEdge;
    if (featureWestEdge < westEdge) westEdge = featureWestEdge;
    if (featureEastEdge > eastEdge) eastEdge = featureEastEdge;
  }); // These changes are not mutually exclusive: we might hit the inner
  // edge but also have hit the outer edge and therefore need
  // another readjustment

  var constrainedDelta = delta;

  if (northInnerEdge + constrainedDelta.lat > LAT_RENDERED_MAX$1) {
    constrainedDelta.lat = LAT_RENDERED_MAX$1 - northInnerEdge;
  }

  if (northOuterEdge + constrainedDelta.lat > LAT_MAX$1) {
    constrainedDelta.lat = LAT_MAX$1 - northOuterEdge;
  }

  if (southInnerEdge + constrainedDelta.lat < LAT_RENDERED_MIN$1) {
    constrainedDelta.lat = LAT_RENDERED_MIN$1 - southInnerEdge;
  }

  if (southOuterEdge + constrainedDelta.lat < LAT_MIN$1) {
    constrainedDelta.lat = LAT_MIN$1 - southOuterEdge;
  }

  if (westEdge + constrainedDelta.lng <= LNG_MIN$1) {
    constrainedDelta.lng += Math.ceil(Math.abs(constrainedDelta.lng) / 360) * 360;
  }

  if (eastEdge + constrainedDelta.lng >= LNG_MAX$1) {
    constrainedDelta.lng -= Math.ceil(Math.abs(constrainedDelta.lng) / 360) * 360;
  }

  return constrainedDelta;
};

var move_features = function move_features(features, delta) {
  var constrainedDelta = constrain_feature_movement(features.map(function (feature) {
    return feature.toGeoJSON();
  }), delta);
  features.forEach(function (feature) {
    var currentCoordinates = feature.getCoordinates();

    var moveCoordinate = function moveCoordinate(coord) {
      var point = {
        lng: coord[0] + constrainedDelta.lng,
        lat: coord[1] + constrainedDelta.lat
      };
      return [point.lng, point.lat];
    };

    var moveRing = function moveRing(ring) {
      return ring.map(function (coord) {
        return moveCoordinate(coord);
      });
    };

    var moveMultiPolygon = function moveMultiPolygon(multi) {
      return multi.map(function (ring) {
        return moveRing(ring);
      });
    };

    var nextCoordinates;

    if (feature.type === geojsonTypes.POINT) {
      nextCoordinates = moveCoordinate(currentCoordinates);
    } else if (feature.type === geojsonTypes.LINE_STRING || feature.type === geojsonTypes.MULTI_POINT) {
      nextCoordinates = currentCoordinates.map(moveCoordinate);
    } else if (feature.type === geojsonTypes.POLYGON || feature.type === geojsonTypes.MULTI_LINE_STRING) {
      nextCoordinates = currentCoordinates.map(moveRing);
    } else if (feature.type === geojsonTypes.MULTI_POLYGON) {
      nextCoordinates = currentCoordinates.map(moveMultiPolygon);
    }

    feature.incomingCoords(nextCoordinates);
  });
};

var CustomSelectMode = {};

CustomSelectMode.onSetup = function (opts) {
  var _this = this;

  console.log("Change mode: custom select"); // turn the opts into state.

  var state = {
    dragMoveLocation: null,
    boxSelectStartLocation: null,
    boxSelectElement: undefined,
    boxSelecting: false,
    canBoxSelect: false,
    dragMoving: false,
    canDragMove: false,
    initiallySelectedFeatureIds: opts.featureIds || []
  };
  this.setSelected(state.initiallySelectedFeatureIds.filter(function (id) {
    return _this.getFeature(id) !== undefined;
  }));
  this.fireActionable();
  this.setActionableState({
    combineFeatures: true,
    uncombineFeatures: true,
    trash: true
  });
  return state;
};

CustomSelectMode.fireUpdate = function () {
  this.map.fire(events.UPDATE, {
    action: updateActions.MOVE,
    features: this.getSelected().map(function (f) {
      return f.toGeoJSON();
    })
  });
};

CustomSelectMode.fireActionable = function () {
  var _this2 = this;

  var selectedFeatures = this.getSelected();
  var multiFeatures = selectedFeatures.filter(function (feature) {
    return _this2.isInstanceOf("MultiFeature", feature);
  });
  var combineFeatures = false;

  if (selectedFeatures.length > 1) {
    combineFeatures = true;
    var featureType = selectedFeatures[0].type.replace("Multi", "");
    selectedFeatures.forEach(function (feature) {
      if (feature.type.replace("Multi", "") !== featureType) {
        combineFeatures = false;
      }
    });
  }

  var uncombineFeatures = multiFeatures.length > 0;
  var trash = selectedFeatures.length > 0;
  this.setActionableState({
    combineFeatures: combineFeatures,
    uncombineFeatures: uncombineFeatures,
    trash: trash
  });
};

CustomSelectMode.getUniqueIds = function (allFeatures) {
  if (!allFeatures.length) return [];
  var ids = allFeatures.map(function (s) {
    return s.properties.id;
  }).filter(function (id) {
    return id !== undefined;
  }).reduce(function (memo, id) {
    memo.add(id);
    return memo;
  }, new StringSet());
  return ids.values();
};

CustomSelectMode.stopExtendedInteractions = function (state) {
  if (state.boxSelectElement) {
    if (state.boxSelectElement.parentNode) state.boxSelectElement.parentNode.removeChild(state.boxSelectElement);
    state.boxSelectElement = null;
  }

  this.map.dragPan.enable();
  state.boxSelecting = false;
  state.canBoxSelect = false;
  state.dragMoving = false;
  state.canDragMove = false;
};

CustomSelectMode.onStop = function () {
  doubleClickZoom.enable(this);
};

CustomSelectMode.onMouseMove = function (state) {
  // On mousemove that is not a drag, stop extended interactions.
  // This is useful if you drag off the canvas, release the button,
  // then move the mouse back over the canvas --- we don't allow the
  // interaction to continue then, but we do let it continue if you held
  // the mouse button that whole time
  return this.stopExtendedInteractions(state);
};

CustomSelectMode.onMouseOut = function (state) {
  // As soon as you mouse leaves the canvas, update the feature
  if (state.dragMoving) return this.fireUpdate();
};

CustomSelectMode.onTap = CustomSelectMode.onClick = function (state, e) {
  // Click (with or without shift) on no feature
  if (noTarget(e)) return this.clickAnywhere(state, e); // also tap

  if (isOfMetaType(meta.VERTEX)(e)) return this.clickOnVertex(state, e); //tap

  if (isFeature(e)) return this.clickOnFeature(state, e);
};

CustomSelectMode.clickAnywhere = function (state) {
  var _this3 = this;

  // Clear the re-render selection
  var wasSelected = this.getSelectedIds();

  if (wasSelected.length) {
    this.clearSelectedFeatures();
    wasSelected.forEach(function (id) {
      return _this3.doRender(id);
    });
  }

  doubleClickZoom.enable(this);
  this.stopExtendedInteractions(state);
};

CustomSelectMode.clickOnVertex = function (state, e) {
  // Enter direct select mode
  this.changeMode("custom_direct_select", {
    featureId: e.featureTarget.properties.parent,
    coordPath: e.featureTarget.properties.coord_path,
    startPos: e.lngLat //    groupMove_vertices: matchingVertices,

  });
  this.updateUIClasses({
    mouse: cursors.MOVE
  });
};

CustomSelectMode.startOnActiveFeature = function (state, e) {
  // Stop any already-underway extended interactions
  this.stopExtendedInteractions(state); // Disable map.dragPan immediately so it can't start

  this.map.dragPan.disable(); // Re-render it and enable drag move

  this.doRender(e.featureTarget.properties.id); // Set up the state for drag moving

  state.canDragMove = true;
  state.dragMoveLocation = e.lngLat;
};

CustomSelectMode.clickOnFeature = function (state, e) {
  var _this4 = this;

  // Stop everything
  doubleClickZoom.disable(this);
  this.stopExtendedInteractions(state);
  var isShiftClick = isShiftDown(e);
  var selectedFeatureIds = this.getSelectedIds();
  var featureId = e.featureTarget.properties.id;
  var isFeatureSelected = this.isSelected(featureId); // Click (without shift) on any selected feature but a point

  if (!isShiftClick && isFeatureSelected && this.getFeature(featureId).type !== geojsonTypes.POINT) {
    // Enter direct select mode
    return this.changeMode("custom_direct_select", {
      featureId: featureId
    });
  } // Shift-click on a selected feature


  if (isFeatureSelected && isShiftClick) {
    // Deselect it
    this.deselect(featureId);
    this.updateUIClasses({
      mouse: cursors.POINTER
    });

    if (selectedFeatureIds.length === 1) {
      doubleClickZoom.enable(this);
    } // Shift-click on an unselected feature

  } else if (!isFeatureSelected && isShiftClick) {
    // Add it to the selection
    this.select(featureId);
    this.updateUIClasses({
      mouse: cursors.MOVE
    }); // Click (without shift) on an unselected feature
  } else if (!isFeatureSelected && !isShiftClick) {
    // Make it the only selected feature
    selectedFeatureIds.forEach(function (id) {
      return _this4.doRender(id);
    });
    this.setSelected(featureId);
    this.updateUIClasses({
      mouse: cursors.MOVE
    });
  } // No matter what, re-render the clicked feature


  this.doRender(featureId);
};

CustomSelectMode.onMouseDown = function (state, e) {
  if (isActiveFeature(e)) return this.startOnActiveFeature(state, e);
  if (this.drawConfig.boxSelect && isShiftMousedown(e)) return this.startBoxSelect(state, e);
};

CustomSelectMode.startBoxSelect = function (state, e) {
  this.stopExtendedInteractions(state);
  this.map.dragPan.disable(); // Enable box select

  state.boxSelectStartLocation = mouseEventPoint(e.originalEvent, this.map.getContainer());
  state.canBoxSelect = true;
};

CustomSelectMode.onTouchStart = function (state, e) {
  if (isActiveFeature(e)) return this.startOnActiveFeature(state, e);
};

CustomSelectMode.onDrag = function (state, e) {
  if (state.canDragMove) return this.dragMove(state, e);
  if (this.drawConfig.boxSelect && state.canBoxSelect) return this.whileBoxSelect(state, e);
};

CustomSelectMode.whileBoxSelect = function (state, e) {
  state.boxSelecting = true;
  this.updateUIClasses({
    mouse: cursors.ADD
  }); // Create the box node if it doesn't exist

  if (!state.boxSelectElement) {
    state.boxSelectElement = document.createElement("div");
    state.boxSelectElement.classList.add(classes.BOX_SELECT);
    this.map.getContainer().appendChild(state.boxSelectElement);
  } // Adjust the box node's width and xy position


  var current = mouseEventPoint(e.originalEvent, this.map.getContainer());
  var minX = Math.min(state.boxSelectStartLocation.x, current.x);
  var maxX = Math.max(state.boxSelectStartLocation.x, current.x);
  var minY = Math.min(state.boxSelectStartLocation.y, current.y);
  var maxY = Math.max(state.boxSelectStartLocation.y, current.y);
  var translateValue = "translate(".concat(minX, "px, ").concat(minY, "px)");
  state.boxSelectElement.style.transform = translateValue;
  state.boxSelectElement.style.WebkitTransform = translateValue;
  state.boxSelectElement.style.width = "".concat(maxX - minX, "px");
  state.boxSelectElement.style.height = "".concat(maxY - minY, "px");
};

CustomSelectMode.dragMove = function (state, e) {
  // Dragging when drag move is enabled
  state.dragMoving = true;
  e.originalEvent.stopPropagation();
  var delta = {
    lng: e.lngLat.lng - state.dragMoveLocation.lng,
    lat: e.lngLat.lat - state.dragMoveLocation.lat
  };
  move_features(this.getSelected(), delta);
  state.dragMoveLocation = e.lngLat;
};

CustomSelectMode.onMouseUp = function (state, e) {
  var _this5 = this;

  // End any extended interactions
  if (state.dragMoving) {
    this.fireUpdate();
  } else if (state.boxSelecting) {
    var bbox = [state.boxSelectStartLocation, mouseEventPoint(e.originalEvent, this.map.getContainer())];
    var featuresInBox = this.featuresAt(null, bbox, "click");
    var idsToSelect = this.getUniqueIds(featuresInBox).filter(function (id) {
      return !_this5.isSelected(id);
    });

    if (idsToSelect.length) {
      this.select(idsToSelect);
      idsToSelect.forEach(function (id) {
        return _this5.doRender(id);
      });
      this.updateUIClasses({
        mouse: cursors.MOVE
      });
    }
  }

  this.stopExtendedInteractions(state);
};

CustomSelectMode.toDisplayFeatures = function (state, geojson, display) {
  geojson.properties.active = this.isSelected(geojson.properties.id) ? activeStates.ACTIVE : activeStates.INACTIVE;
  display(geojson);
  this.fireActionable();
  if (geojson.properties.active !== activeStates.ACTIVE || geojson.geometry.type === geojsonTypes.POINT) return;
  createSupplementaryPoints(geojson).forEach(display);
};

CustomSelectMode.onTrash = function () {
  this.deleteFeature(this.getSelectedIds());
  this.fireActionable();
};

CustomSelectMode.onCombineFeatures = function () {
  var selectedFeatures = this.getSelected();
  if (selectedFeatures.length === 0 || selectedFeatures.length < 2) return;
  var coordinates = [],
      featuresCombined = [];
  var featureType = selectedFeatures[0].type.replace("Multi", "");

  for (var i = 0; i < selectedFeatures.length; i++) {
    var feature = selectedFeatures[i];

    if (feature.type.replace("Multi", "") !== featureType) {
      return;
    }

    if (feature.type.includes("Multi")) {
      feature.getCoordinates().forEach(function (subcoords) {
        coordinates.push(subcoords);
      });
    } else {
      coordinates.push(feature.getCoordinates());
    }

    featuresCombined.push(feature.toGeoJSON());
  }

  if (featuresCombined.length > 1) {
    var multiFeature = this.newFeature({
      type: geojsonTypes.FEATURE,
      properties: featuresCombined[0].properties,
      geometry: {
        type: "Multi".concat(featureType),
        coordinates: coordinates
      }
    });
    this.addFeature(multiFeature);
    this.deleteFeature(this.getSelectedIds(), {
      silent: true
    });
    this.setSelected([multiFeature.id]);
    this.map.fire(events.COMBINE_FEATURES, {
      createdFeatures: [multiFeature.toGeoJSON()],
      deletedFeatures: featuresCombined
    });
  }

  this.fireActionable();
};

CustomSelectMode.onUncombineFeatures = function () {
  var _this6 = this;

  var selectedFeatures = this.getSelected();
  if (selectedFeatures.length === 0) return;
  var createdFeatures = [];
  var featuresUncombined = [];

  var _loop = function _loop(i) {
    var feature = selectedFeatures[i];

    if (_this6.isInstanceOf("MultiFeature", feature)) {
      feature.getFeatures().forEach(function (subFeature) {
        _this6.addFeature(subFeature);

        subFeature.properties = feature.properties;
        createdFeatures.push(subFeature.toGeoJSON());

        _this6.select([subFeature.id]);
      });

      _this6.deleteFeature(feature.id, {
        silent: true
      });

      featuresUncombined.push(feature.toGeoJSON());
    }
  };

  for (var i = 0; i < selectedFeatures.length; i++) {
    _loop(i);
  }

  if (createdFeatures.length > 1) {
    this.map.fire(events.UNCOMBINE_FEATURES, {
      createdFeatures: createdFeatures,
      deletedFeatures: featuresUncombined
    });
  }

  this.fireActionable();
};

var drawUtils = {
  getMatchingVertices: function getMatchingVertices(vertex, featureId, allFeatures, map) {
    // number of decimals should probably be dynamic depending on zoom level
    var decimals = 5;
    var matchingVertices = [];
    var v_lng = vertex[0].toFixed(decimals);
    var v_lat = vertex[1].toFixed(decimals);

    for (var i = 0; i < allFeatures.length; i++) {
      if (allFeatures[i].id !== featureId) {
        for (var k = 0; k < allFeatures[i].geometry.coordinates.length; k++) {
          for (var m = 0; m < allFeatures[i].geometry.coordinates[k].length; m++) {
            if (v_lng === allFeatures[i].geometry.coordinates[k][m][0].toFixed(decimals) && v_lat === allFeatures[i].geometry.coordinates[k][m][1].toFixed(decimals)) {
              matchingVertices.push({
                featureId: allFeatures[i].id,
                coord_path: k + "." + m,
                //feature: map.getFeature(allFeatures[i].id),
                lng: allFeatures[i].geometry.coordinates[k][m][0],
                lat: allFeatures[i].geometry.coordinates[k][m][1]
              });
            }
          }
        }
      }
    }

    return matchingVertices;
  },
  getDrawInstance: function getDrawInstance(map) {
    for (var i = map._controls.length - 1; i >= 0; i--) {
      if (map._controls[i].options && map._controls[i].options.defaultMode === "custom_select") {
        return map._controls[i];
      }
    }

    return null;
  }
};

var isVertex$1 = isOfMetaType(meta.VERTEX);
var isMidpoint = isOfMetaType(meta.MIDPOINT);
var DirectSelect = {}; // INTERNAL FUCNTIONS

DirectSelect.fireUpdate = function () {
  this.map.fire(events.UPDATE, {
    action: updateActions.CHANGE_COORDINATES,
    features: this.getSelected().map(function (f) {
      return f.toGeoJSON();
    })
  });
};

DirectSelect.fireActionable = function (state) {
  this.setActionableState({
    combineFeatures: false,
    uncombineFeatures: false,
    trash: state.selectedCoordPaths.length > 0
  });
};

DirectSelect.startDragging = function (state, e) {
  this.map.dragPan.disable();
  state.canDragMove = true;
  state.dragMoveLocation = e.lngLat;
};

DirectSelect.stopDragging = function (state) {
  this.map.dragPan.enable();
  state.dragMoving = false;
  state.canDragMove = false;
  state.dragMoveLocation = null;
};

DirectSelect.onVertex = function (state, e) {
  this.startDragging(state, e);
  var about = e.featureTarget.properties;
  var selectedIndex = state.selectedCoordPaths.indexOf(about.coord_path);

  if (!isShiftDown(e) && selectedIndex === -1) {
    state.selectedCoordPaths = [about.coord_path];
  } else if (isShiftDown(e) && selectedIndex === -1) {
    state.selectedCoordPaths.push(about.coord_path);
  } // currently this work with single selected vertices only


  var allFeatures = drawUtils.getDrawInstance(this.map).getAll();
  var matchingVertices = drawUtils.getMatchingVertices(e.featureTarget._geometry.coordinates, e.featureTarget.properties.parent, allFeatures.features, this.map);
  state.groupMove_vertices = matchingVertices;

  for (var i = 0; i < state.groupMove_vertices.length; i++) {
    state.groupMove_vertices[i].feature = this.getFeature(state.groupMove_vertices[i].featureId);
  }

  var selectedCoordinates = this.pathsToCoordinates(state.featureId, state.selectedCoordPaths);
  this.setSelectedCoordinates(selectedCoordinates);
};

DirectSelect.onMidpoint = function (state, e) {
  this.startDragging(state, e);
  var about = e.featureTarget.properties;
  state.feature.addCoordinate(about.coord_path, about.lng, about.lat);
  this.fireUpdate();
  state.selectedCoordPaths = [about.coord_path];
};

DirectSelect.pathsToCoordinates = function (featureId, paths) {
  return paths.map(function (coord_path) {
    return {
      feature_id: featureId,
      coord_path: coord_path
    };
  });
};

DirectSelect.onFeature = function (state, e) {
  if (state.selectedCoordPaths.length === 0) this.startDragging(state, e);else this.stopDragging(state);
};

DirectSelect.dragFeature = function (state, e, delta) {
  move_features(this.getSelected(), delta);
  state.dragMoveLocation = e.lngLat;
};

DirectSelect.dragVertex = function (state, e, delta) {
  var selectedCoords = state.selectedCoordPaths.map(function (coord_path) {
    return state.feature.getCoordinate(coord_path);
  });
  var selectedCoordPoints = selectedCoords.map(function (coords) {
    return {
      type: geojsonTypes.FEATURE,
      properties: {},
      geometry: {
        type: geojsonTypes.POINT,
        coordinates: coords
      }
    };
  });
  var constrainedDelta = constrain_feature_movement(selectedCoordPoints, delta);

  for (var i = 0; i < selectedCoords.length; i++) {
    var coord = selectedCoords[i];
    state.feature.updateCoordinate(state.selectedCoordPaths[i], coord[0] + constrainedDelta.lng, coord[1] + constrainedDelta.lat);

    for (var k = 0; k < state.groupMove_vertices.length; k++) {
      var coord_path_m = state.groupMove_vertices[k].coord_path.split(".");

      if (typeof coord_path_m[0] !== "undefined" && typeof coord_path_m[1] !== "undefined" && typeof state.groupMove_vertices[k].feature.coordinates[coord_path_m[0]] !== "undefined" && typeof state.groupMove_vertices[k].feature.coordinates[coord_path_m[0]][coord_path_m[1]] !== "undefined") {
        var coord_m = state.groupMove_vertices[k].feature.coordinates[coord_path_m[0]][coord_path_m[1]];
        state.groupMove_vertices[k].feature.updateCoordinate(state.groupMove_vertices[k].coord_path, coord_m[0] + constrainedDelta.lng, coord_m[1] + constrainedDelta.lat);
      }
    }
  }
};

DirectSelect.clickNoTarget = function () {
  this.changeMode("custom_select");
};

DirectSelect.clickInactive = function () {
  this.changeMode("custom_select");
};

DirectSelect.clickActiveFeature = function (state) {
  state.selectedCoordPaths = [];
  this.clearSelectedCoordinates();
  state.feature.changed();
}; // EXTERNAL FUNCTIONS


DirectSelect.onSetup = function (opts) {
  var featureId = opts.featureId;
  var feature = this.getFeature(featureId);

  if (!feature) {
    throw new Error("You must provide a featureId to enter direct_select mode");
  }

  if (feature.type === geojsonTypes.POINT) {
    throw new TypeError("direct_select mode doesn't handle point features");
  }

  var state = {
    featureId: featureId,
    feature: feature,
    dragMoveLocation: opts.startPos || null,
    dragMoving: false,
    canDragMove: false,
    selectedCoordPaths: opts.coordPath ? [opts.coordPath] : [],
    groupMove_vertices: opts.groupMove_vertices ? opts.groupMove_vertices : []
  };
  this.setSelectedCoordinates(this.pathsToCoordinates(featureId, state.selectedCoordPaths));
  this.setSelected(featureId);
  doubleClickZoom.disable(this);
  this.setActionableState({
    trash: true
  });
  return state;
};

DirectSelect.onStop = function () {
  doubleClickZoom.enable(this);
  this.clearSelectedCoordinates();
};

DirectSelect.toDisplayFeatures = function (state, geojson, push) {
  if (state.featureId === geojson.properties.id) {
    geojson.properties.active = activeStates.ACTIVE;
    push(geojson);
    createSupplementaryPoints(geojson, {
      map: this.map,
      midpoints: true,
      selectedPaths: state.selectedCoordPaths
    }).forEach(push);
  } else {
    geojson.properties.active = activeStates.INACTIVE;
    push(geojson);
  }

  this.fireActionable(state);
};

DirectSelect.onTrash = function (state) {
  // Uses number-aware sorting to make sure '9' < '10'. Comparison is reversed because we want them
  // in reverse order so that we can remove by index safely.
  state.selectedCoordPaths.sort(function (a, b) {
    return b.localeCompare(a, "en", {
      numeric: true
    });
  }).forEach(function (id) {
    return state.feature.removeCoordinate(id);
  });
  this.fireUpdate();
  state.selectedCoordPaths = [];
  this.clearSelectedCoordinates();
  this.fireActionable(state);

  if (state.feature.isValid() === false) {
    this.deleteFeature([state.featureId]);
    this.changeMode("custom_select", {});
  }
};

DirectSelect.onMouseMove = function (state, e) {
  // On mousemove that is not a drag, stop vertex movement.
  var isFeature = isActiveFeature(e);
  var onVertex = isVertex$1(e);
  var noCoords = state.selectedCoordPaths.length === 0;
  if (isFeature && noCoords) this.updateUIClasses({
    mouse: cursors.MOVE
  });else if (onVertex && !noCoords) this.updateUIClasses({
    mouse: cursors.MOVE
  });else this.updateUIClasses({
    mouse: cursors.NONE
  });
  this.stopDragging(state);
};

DirectSelect.onMouseOut = function (state) {
  // As soon as you mouse leaves the canvas, update the feature
  if (state.dragMoving) this.fireUpdate();
};

DirectSelect.onTouchStart = DirectSelect.onMouseDown = function (state, e) {
  if (isVertex$1(e)) return this.onVertex(state, e);
  if (isActiveFeature(e)) return this.onFeature(state, e);
  if (isMidpoint(e)) return this.onMidpoint(state, e);
};

DirectSelect.onDrag = function (state, e) {
  if (state.canDragMove !== true) return;
  state.dragMoving = true;
  e.originalEvent.stopPropagation();
  var delta = {
    lng: e.lngLat.lng - state.dragMoveLocation.lng,
    lat: e.lngLat.lat - state.dragMoveLocation.lat
  };
  if (state.selectedCoordPaths.length > 0) this.dragVertex(state, e, delta);else this.dragFeature(state, e, delta);
  state.dragMoveLocation = e.lngLat;
};

DirectSelect.onClick = function (state, e) {
  if (noTarget(e)) return this.clickNoTarget(state, e);
  if (isActiveFeature(e)) return this.clickActiveFeature(state, e);
  if (isInactiveFeature(e)) return this.clickInactive(state, e);
  this.stopDragging(state);
};

DirectSelect.onTap = function (state, e) {
  if (noTarget(e)) return this.clickNoTarget(state, e);
  if (isActiveFeature(e)) return this.clickActiveFeature(state, e);
  if (isInactiveFeature(e)) return this.clickInactive(state, e);
};

DirectSelect.onTouchEnd = DirectSelect.onMouseUp = function (state) {
  if (state.dragMoving) {
    this.fireUpdate();
  }

  this.stopDragging(state);
};

function MlFeatureEditor(props) {
  var mapRef = useRef(null);
  var draw = useRef(null);
  var mapContext = useContext(MapContext);
  var componentId = useRef((props.idPrefix ? props.idPrefix : "MlFeatureEditor-") + v4());
  var onChangeRef = useRef(props.onChange);

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      drawToolsInitialized = _useState2[0],
      setDrawToolsInitialized = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      drawToolsReady = _useState4[0],
      setDrawToolsReady = _useState4[1];

  var _useState5 = useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      mouseUpTrigger = _useState6[0],
      setMouseUpTrigger = _useState6[1];

  var modeChangeHandler = function modeChangeHandler(e) {
    console.log("MlFeatureEditor mode change to " + e.mode); //setDrawMode(e.mode);
  };

  var mouseUpHandler = function mouseUpHandler() {
    console.log("mouseup");
    setMouseUpTrigger(Math.random());
  };

  useEffect(function () {
    var _componentId = componentId.current;
    return function () {
      if (mapRef.current) {
        mapRef.current.cleanup(_componentId); //mapRef.current.removeControl(draw.current, "top-left");

        mapRef.current = null;
      }
    };
  }, []);
  useEffect(function () {
    if (mapContext.mapExists(props.mapId) && mapContext.getMap(props.mapId).style && !drawToolsInitialized) {
      mapRef.current = mapContext.getMap(props.mapId);
      setDrawToolsInitialized(true);

      if (mapRef.current && mapRef.current.style && mapRef.current.getSource("mapbox-gl-draw-cold") && draw.current && typeof draw.current.remove !== "undefined") {
        // remove old Mapbox-gl-Draw from Mapbox instance when hot-reloading this component during development
        draw.current.remove();
      }

      draw.current = new MapboxDraw({
        displayControlsDefault: false,
        defaultMode: props.mode || "custom_select",
        modes: Object.assign({
          custom_polygon: CustomPolygonMode,
          custom_select: CustomSelectMode,
          custom_direct_select: DirectSelect
        }, MapboxDraw.modes)
      });
      mapRef.current.on("draw.modechange", modeChangeHandler, componentId.current);
      mapRef.current.addControl(draw.current, "top-left", componentId.current);
      mapRef.current.on("mouseup", mouseUpHandler, componentId.current);
      setDrawToolsReady(true);
    }
  }, [mapContext.map, mapContext, props, drawToolsInitialized]);
  useEffect(function () {
    if (draw.current && props.geojson && props.geojson.geometry && props.geojson.geometry.coordinates) {
      draw.current.set({
        type: "FeatureCollection",
        features: [props.geojson]
      });
    }
  }, [props.geojson, drawToolsReady]);
  useEffect(function () {
    if (draw.current && mouseUpTrigger) {
      // update drawnFeatures state object
      var currentFeatureCollection = draw.current.getAll();

      if (typeof onChangeRef.current === "function") {
        onChangeRef.current(currentFeatureCollection.features);
      }
    }
  }, [mouseUpTrigger]);
  useEffect(function () {
    if (props.mode && draw.current) {
      draw.current.changeMode(props.mode);
    }
  }, [props.mode]);
  return /*#__PURE__*/React.createElement(React.Fragment, null);
}

var MlBasicComponent = function MlBasicComponent(props) {
  // Use a useRef hook to reference the layer object to be able to access it later inside useEffect hooks
  // without the requirement of adding it to the dependency list (ignore the false eslint exhaustive deps warning)
  // const layerRef = useRef(null);
  var mapContext = useContext(MapContext);
  useEffect(function () {
    if (!mapContext.mapExists()) return;
    return function () {
      // This is the cleanup function, it is called when this react component is removed from react-dom
      // try to remove anything this component has added to the MapLibre-gl instance
      // e.g.: remove the layer
      // mapContext.map.removeLayer(layerRef.current);
      if (typeof props.cleanup === "function") {
        props.cleanup(mapContext.getMap(props.mapId));
      }
    };
  });
  useEffect(function () {
    if (!mapContext.mapExists(props.mapId)) return; // the MapLibre-gl instance (mapContext.map) is accessible here
    // initialize the layer and add it to the MapLibre-gl instance

    if (typeof props.mapIsReady === "function") {
      props.mapIsReady(mapContext.getMap(props.mapId));
    }
  }, [mapContext.mapIds, mapContext, props]);
  return /*#__PURE__*/React.createElement(React.Fragment, null);
};

/**
 *
 * MlLayerMagnify returns a Button that will add a standard OSM tile layer to the maplibre-gl instance.
 */

var MlLayerMagnify = function MlLayerMagnify(props) {
  var mapContext = useContext(MapContext);
  var syncMoveInitializedRef = useRef(false);
  var syncCleanupFunctionRef = useRef(null);

  var _useState = useState(50),
      _useState2 = _slicedToArray(_useState, 2),
      swipeX = _useState2[0],
      setSwipeX = _useState2[1];

  var swipeXRef = useRef(50);

  var _useState3 = useState(50),
      _useState4 = _slicedToArray(_useState3, 2),
      swipeY = _useState4[0],
      setSwipeY = _useState4[1];

  var swipeYRef = useRef(50);
  var magnifierRadiusRef = useRef(props.magnifierRadius || 200);

  var _useState5 = useState(magnifierRadiusRef.current),
      _useState6 = _slicedToArray(_useState5, 2),
      magnifierRadius = _useState6[0],
      setMagnifierRadius = _useState6[1];

  var mapExists = useCallback(function () {
    if (!props.map1Id || !props.map2Id) {
      return false;
    }

    if (!mapContext.mapExists(props.map1Id) || !mapContext.mapExists(props.map2Id)) {
      return false;
    }

    return true;
  }, [props, mapContext]);
  var onResize = useRef(function () {
    if (!mapExists()) return;
    onMove({
      clientX: swipeXRef.current,
      clientY: swipeYRef.current
    });
  });
  useEffect(function () {
    window.addEventListener("resize", onResize.current);
    var _onResize = onResize.current;
    return function () {
      window.removeEventListener("resize", _onResize);

      if (syncCleanupFunctionRef.current) {
        syncCleanupFunctionRef.current();
      }
    };
  }, []);
  var onMove = useCallback(function (e) {
    if (!mapExists()) return;
    var bounds = mapContext.map.getCanvas().getBoundingClientRect();
    var clientX = e.clientX || (typeof e.touches !== "undefined" && typeof e.touches[0] !== "undefined" ? e.touches[0].clientX : 0);
    var clientY = e.clientY || (typeof e.touches !== "undefined" && typeof e.touches[0] !== "undefined" ? e.touches[0].clientY : 0);
    clientX -= bounds.x;
    clientY -= bounds.y;
    var swipeX_tmp = (clientX / bounds.width * 100).toFixed(2);
    var swipeY_tmp = (clientY / bounds.height * 100).toFixed(2);

    if (swipeXRef.current !== swipeX_tmp || swipeYRef.current !== swipeY_tmp) {
      setSwipeX(swipeX_tmp);
      swipeXRef.current = swipeX_tmp;
      setSwipeY(swipeY_tmp);
      swipeYRef.current = swipeY_tmp;
      mapContext.maps[props.map2Id].getContainer().style.clipPath = "circle(".concat(magnifierRadiusRef.current, "px at ") + swipeXRef.current * bounds.width / 100 + "px " + swipeYRef.current * bounds.height / 100 + "px)";
    }
  }, [mapContext, mapExists, props]);
  useEffect(function () {
    if (!mapExists() || syncMoveInitializedRef.current) return;
    syncMoveInitializedRef.current = true;
    syncCleanupFunctionRef.current = syncMove(mapContext.getMap(props.map1Id).map, mapContext.getMap(props.map2Id).map);

    if (mapContext.maps[props.map1Id].getCanvas().clientWidth > mapContext.maps[props.map1Id].getCanvas().clientHeight && magnifierRadiusRef.current * 2 > mapContext.maps[props.map1Id].getCanvas().clientHeight) {
      magnifierRadiusRef.current = Math.floor(mapContext.maps[props.map1Id].getCanvas().clientHeight / 2);
      setMagnifierRadius(magnifierRadiusRef.current);
    }

    if (mapContext.maps[props.map1Id].getCanvas().clientHeight > mapContext.maps[props.map1Id].getCanvas().clientWidth && magnifierRadiusRef.current * 2 > mapContext.maps[props.map1Id].getCanvas().clientWidth) {
      magnifierRadiusRef.current = Math.floor(mapContext.maps[props.map1Id].getCanvas().clientWidth / 2);
      setMagnifierRadius(magnifierRadiusRef.current);
    }

    onMove({
      clientX: mapContext.maps[props.map1Id].getCanvas().clientWidth / 2,
      clientY: mapContext.maps[props.map1Id].getCanvas().clientHeight / 2
    });
  }, [mapContext.mapIds, mapContext, mapExists, props, onMove]);

  var onDown = function onDown(e) {
    if (e.touches) {
      document.addEventListener("touchmove", onMove);
      document.addEventListener("touchend", onTouchEnd);
    } else {
      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onMouseUp);
    }
  };

  var onTouchEnd = function onTouchEnd() {
    document.removeEventListener("touchmove", onMove);
    document.removeEventListener("touchend", onTouchEnd);
  };

  var onMouseUp = function onMouseUp() {
    document.removeEventListener("mousemove", onMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  var onWheel = function onWheel(e) {
    var evCopy = new WheelEvent(e.type, e);
    mapContext.map.getCanvas().dispatchEvent(evCopy);
  };

  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: swipeX + "%",
      top: swipeY + "%",
      borderRadius: "50%",
      width: magnifierRadius * 2 + 1 + "px",
      height: magnifierRadius * 2 + 1 + "px",
      background: "rgba(0,0,0,0)",
      border: "2px solid #fafafa",
      boxShadow: "1px 2px 2px rgba(19, 19, 19, .5), inset 1px 1px 1px rgba(19, 19, 19, .2)",
      cursor: "pointer",
      zIndex: "110",
      marginLeft: magnifierRadius * -1 - 1 + "px",
      marginTop: magnifierRadius * -1 - 1 + "px",
      textAlign: "center",
      lineHeight: "91px",
      fontSize: "2em",
      color: "#fafafa",
      userSelect: "none"
    },
    onTouchStart: onDown,
    onMouseDown: onDown,
    onWheel: onWheel
  });
};

/**
 * MlLayerSwipe returns a Button that will add a standard OSM tile layer to the maplibre-gl instance.
 */

var MlLayerSwipe = function MlLayerSwipe(props) {
  var mapContext = useContext(MapContext);
  var initializedRef = useRef(false);

  var _useState = useState(50),
      _useState2 = _slicedToArray(_useState, 2),
      swipeX = _useState2[0],
      setSwipeX = _useState2[1];

  var swipeXRef = useRef(50);
  var syncCleanupFunctionRef = useRef(null);
  var mapExists = useCallback(function () {
    if (!props.map1Id || !props.map2Id) {
      return false;
    }

    if (!mapContext.mapExists(props.map1Id) || !mapContext.mapExists(props.map2Id)) {
      return false;
    }

    return true;
  }, [mapContext, props.map1Id, props.map2Id]);

  var cleanup = function cleanup() {
    if (syncCleanupFunctionRef.current) {
      syncCleanupFunctionRef.current();
    }
  };

  var onMove = useCallback(function (e) {
    if (!mapExists()) return;
    var bounds = mapContext.map.getCanvas().getBoundingClientRect();
    var clientX = e.clientX || (typeof e.touches !== "undefined" && typeof e.touches[0] !== "undefined" ? e.touches[0].clientX : 0);
    clientX -= bounds.x;
    var swipeX_tmp = (clientX / bounds.width * 100).toFixed(2);

    if (swipeXRef.current !== swipeX_tmp) {
      setSwipeX(swipeX_tmp);
      swipeXRef.current = swipeX_tmp;
      var clipA = "rect(0, " + swipeXRef.current * bounds.width / 100 + "px, 999em, 0)";
      mapContext.getMap(props.map2Id).getContainer().style.clip = clipA;
    }
  }, [mapContext, mapExists, props.map2Id]);
  useEffect(function () {
    return cleanup;
  }, []);
  useEffect(function () {
    if (!mapExists() || initializedRef.current) return;
    initializedRef.current = true;
    syncCleanupFunctionRef.current = syncMove(mapContext.getMap(props.map1Id).map, mapContext.getMap(props.map2Id).map);
    onMove({
      clientX: mapContext.maps[props.map1Id].getCanvas().clientWidth / 2
    });
  }, [mapContext.mapIds, mapContext, props, onMove, mapExists]);

  var onDown = function onDown(e) {
    if (e.touches) {
      document.addEventListener("touchmove", onMove);
      document.addEventListener("touchend", onTouchEnd);
    } else {
      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onMouseUp);
    }
  };

  var onTouchEnd = function onTouchEnd() {
    document.removeEventListener("touchmove", onMove);
    document.removeEventListener("touchend", onTouchEnd);
  };

  var onMouseUp = function onMouseUp() {
    document.removeEventListener("mousemove", onMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: swipeX + "%",
      top: "50%",
      borderRadius: "50%",
      width: "100px",
      height: "100px",
      background: "#0066ff",
      border: "3px solid #eaebf1",
      cursor: "pointer",
      zIndex: "110",
      marginLeft: "-50px",
      marginTop: "-50px",
      textAlign: "center",
      lineHeight: "91px",
      fontSize: "2em",
      color: "#fafafa",
      userSelect: "none"
    },
    onTouchStart: onDown,
    onMouseDown: onDown
  });
};

var GeoJsonContext = /*#__PURE__*/React.createContext({});
var GeoJsonContextProvider = GeoJsonContext.Provider;

var toGeoJSON = function () {
  var removeSpace = /\s*/g,
      trimSpace = /^\s*|\s*$/g,
      splitSpace = /\s+/; // generate a short, numeric hash of a string

  function okhash(x) {
    if (!x || !x.length) return 0;

    for (var i = 0, h = 0; i < x.length; i++) {
      h = (h << 5) - h + x.charCodeAt(i) | 0;
    }

    return h;
  } // all Y children of X


  function get(x, y) {
    return x.getElementsByTagName(y);
  }

  function attr(x, y) {
    return x.getAttribute(y);
  }

  function attrf(x, y) {
    return parseFloat(attr(x, y));
  } // one Y child of X, if any, otherwise null


  function get1(x, y) {
    var n = get(x, y);
    return n.length ? n[0] : null;
  } // https://developer.mozilla.org/en-US/docs/Web/API/Node.normalize


  function norm(el) {
    if (el.normalize) {
      el.normalize();
    }

    return el;
  } // cast array x into numbers


  function numarray(x) {
    for (var j = 0, o = []; j < x.length; j++) {
      o[j] = parseFloat(x[j]);
    }

    return o;
  } // get the content of a text node, if any


  function nodeVal(x) {
    if (x) {
      norm(x);
    }

    return x && x.textContent || "";
  } // get the contents of multiple text nodes, if present


  function getMulti(x, ys) {
    var o = {},
        n,
        k;

    for (k = 0; k < ys.length; k++) {
      n = get1(x, ys[k]);
      if (n) o[ys[k]] = nodeVal(n);
    }

    return o;
  } // add properties of Y to X, overwriting if present in both


  function extend(x, y) {
    for (var k in y) {
      x[k] = y[k];
    }
  } // get one coordinate from a coordinate array, if any


  function coord1(v) {
    return numarray(v.replace(removeSpace, "").split(","));
  } // get all coordinates from a coordinate array as [[],[]]


  function coord(v) {
    var coords = v.replace(trimSpace, "").split(splitSpace),
        o = [];

    for (var i = 0; i < coords.length; i++) {
      o.push(coord1(coords[i]));
    }

    return o;
  }

  function coordPair(x) {
    var ll = [attrf(x, "lon"), attrf(x, "lat")],
        ele = get1(x, "ele"),
        // handle namespaced attribute in browser
    heartRate = get1(x, "gpxtpx:hr") || get1(x, "hr"),
        time = get1(x, "time"),
        e;

    if (ele) {
      e = parseFloat(nodeVal(ele));

      if (!isNaN(e)) {
        ll.push(e);
      }
    }

    return {
      coordinates: ll,
      time: time ? nodeVal(time) : null,
      heartRate: heartRate ? parseFloat(nodeVal(heartRate)) : null
    };
  } // create a new feature collection parent object


  function fc() {
    return {
      type: "FeatureCollection",
      features: []
    };
  }

  var serializer;

  if (typeof XMLSerializer !== "undefined") {
    /* istanbul ignore next */
    serializer = new XMLSerializer();
  } else {
    var isNodeEnv = (typeof process === "undefined" ? "undefined" : _typeof(process)) === "object" && !process.browser;
    var isTitaniumEnv = (typeof Titanium === "undefined" ? "undefined" : _typeof(Titanium)) === "object";

    if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object" && (isNodeEnv || isTitaniumEnv)) {
      serializer = new (require("xmldom").XMLSerializer)();
    } else {
      throw new Error("Unable to initialize serializer");
    }
  }

  function xml2str(str) {
    // IE9 will create a new XMLSerializer but it'll crash immediately.
    // This line is ignored because we don't run coverage tests in IE9

    /* istanbul ignore next */
    if (str.xml !== undefined) return str.xml;
    return serializer.serializeToString(str);
  }

  var t = {
    kml: function kml(doc) {
      var gj = fc(),
          // styleindex keeps track of hashed styles in order to match features
      styleIndex = {},
          styleByHash = {},
          // stylemapindex keeps track of style maps to expose in properties
      styleMapIndex = {},
          // atomic geospatial types supported by KML - MultiGeometry is
      // handled separately
      geotypes = ["Polygon", "LineString", "Point", "Track", "gx:Track"],
          // all root placemarks in the file
      placemarks = get(doc, "Placemark"),
          styles = get(doc, "Style"),
          styleMaps = get(doc, "StyleMap");

      for (var k = 0; k < styles.length; k++) {
        var hash = okhash(xml2str(styles[k])).toString(16);
        styleIndex["#" + attr(styles[k], "id")] = hash;
        styleByHash[hash] = styles[k];
      }

      for (var l = 0; l < styleMaps.length; l++) {
        styleIndex["#" + attr(styleMaps[l], "id")] = okhash(xml2str(styleMaps[l])).toString(16);
        var pairs = get(styleMaps[l], "Pair");
        var pairsMap = {};

        for (var m = 0; m < pairs.length; m++) {
          pairsMap[nodeVal(get1(pairs[m], "key"))] = nodeVal(get1(pairs[m], "styleUrl"));
        }

        styleMapIndex["#" + attr(styleMaps[l], "id")] = pairsMap;
      }

      for (var j = 0; j < placemarks.length; j++) {
        gj.features = gj.features.concat(getPlacemark(placemarks[j]));
      }

      function kmlColor(v) {
        var color, opacity;
        v = v || "";

        if (v.substr(0, 1) === "#") {
          v = v.substr(1);
        }

        if (v.length === 6 || v.length === 3) {
          color = v;
        }

        if (v.length === 8) {
          opacity = parseInt(v.substr(0, 2), 16) / 255;
          color = "#" + v.substr(6, 2) + v.substr(4, 2) + v.substr(2, 2);
        }

        return [color, isNaN(opacity) ? undefined : opacity];
      }

      function gxCoord(v) {
        return numarray(v.split(" "));
      }

      function gxCoords(root) {
        var elems = get(root, "coord"),
            coords = [],
            times = [];
        if (elems.length === 0) elems = get(root, "gx:coord");

        for (var i = 0; i < elems.length; i++) {
          coords.push(gxCoord(nodeVal(elems[i])));
        }

        var timeElems = get(root, "when");

        for (var j = 0; j < timeElems.length; j++) {
          times.push(nodeVal(timeElems[j]));
        }

        return {
          coords: coords,
          times: times
        };
      }

      function getGeometry(root) {
        var geomNode,
            geomNodes,
            i,
            j,
            k,
            geoms = [],
            coordTimes = [];

        if (get1(root, "MultiGeometry")) {
          return getGeometry(get1(root, "MultiGeometry"));
        }

        if (get1(root, "MultiTrack")) {
          return getGeometry(get1(root, "MultiTrack"));
        }

        if (get1(root, "gx:MultiTrack")) {
          return getGeometry(get1(root, "gx:MultiTrack"));
        }

        for (i = 0; i < geotypes.length; i++) {
          geomNodes = get(root, geotypes[i]);

          if (geomNodes) {
            for (j = 0; j < geomNodes.length; j++) {
              geomNode = geomNodes[j];

              if (geotypes[i] === "Point") {
                geoms.push({
                  type: "Point",
                  coordinates: coord1(nodeVal(get1(geomNode, "coordinates")))
                });
              } else if (geotypes[i] === "LineString") {
                geoms.push({
                  type: "LineString",
                  coordinates: coord(nodeVal(get1(geomNode, "coordinates")))
                });
              } else if (geotypes[i] === "Polygon") {
                var rings = get(geomNode, "LinearRing"),
                    coords = [];

                for (k = 0; k < rings.length; k++) {
                  coords.push(coord(nodeVal(get1(rings[k], "coordinates"))));
                }

                geoms.push({
                  type: "Polygon",
                  coordinates: coords
                });
              } else if (geotypes[i] === "Track" || geotypes[i] === "gx:Track") {
                var track = gxCoords(geomNode);
                geoms.push({
                  type: "LineString",
                  coordinates: track.coords
                });
                if (track.times.length) coordTimes.push(track.times);
              }
            }
          }
        }

        return {
          geoms: geoms,
          coordTimes: coordTimes
        };
      }

      function getPlacemark(root) {
        var geomsAndTimes = getGeometry(root),
            i,
            properties = {},
            name = nodeVal(get1(root, "name")),
            address = nodeVal(get1(root, "address")),
            styleUrl = nodeVal(get1(root, "styleUrl")),
            description = nodeVal(get1(root, "description")),
            timeSpan = get1(root, "TimeSpan"),
            timeStamp = get1(root, "TimeStamp"),
            extendedData = get1(root, "ExtendedData"),
            lineStyle = get1(root, "LineStyle"),
            polyStyle = get1(root, "PolyStyle"),
            visibility = get1(root, "visibility");
        if (!geomsAndTimes.geoms.length) return [];
        if (name) properties.name = name;
        if (address) properties.address = address;

        if (styleUrl) {
          if (styleUrl[0] !== "#") {
            styleUrl = "#" + styleUrl;
          }

          properties.styleUrl = styleUrl;

          if (styleIndex[styleUrl]) {
            properties.styleHash = styleIndex[styleUrl];
          }

          if (styleMapIndex[styleUrl]) {
            properties.styleMapHash = styleMapIndex[styleUrl];
            properties.styleHash = styleIndex[styleMapIndex[styleUrl].normal];
          } // Try to populate the lineStyle or polyStyle since we got the style hash


          var style = styleByHash[properties.styleHash];

          if (style) {
            if (!lineStyle) lineStyle = get1(style, "LineStyle");
            if (!polyStyle) polyStyle = get1(style, "PolyStyle");
            var iconStyle = get1(style, "IconStyle");

            if (iconStyle) {
              var icon = get1(iconStyle, "Icon");

              if (icon) {
                var href = nodeVal(get1(icon, "href"));
                if (href) properties.icon = href;
              }
            }
          }
        }

        if (description) properties.description = description;

        if (timeSpan) {
          var begin = nodeVal(get1(timeSpan, "begin"));
          var end = nodeVal(get1(timeSpan, "end"));
          properties.timespan = {
            begin: begin,
            end: end
          };
        }

        if (timeStamp) {
          properties.timestamp = nodeVal(get1(timeStamp, "when"));
        }

        if (lineStyle) {
          var linestyles = kmlColor(nodeVal(get1(lineStyle, "color"))),
              color = linestyles[0],
              opacity = linestyles[1],
              width = parseFloat(nodeVal(get1(lineStyle, "width")));
          if (color) properties.stroke = color;
          if (!isNaN(opacity)) properties["stroke-opacity"] = opacity;
          if (!isNaN(width)) properties["stroke-width"] = width;
        }

        if (polyStyle) {
          var polystyles = kmlColor(nodeVal(get1(polyStyle, "color"))),
              pcolor = polystyles[0],
              popacity = polystyles[1],
              fill = nodeVal(get1(polyStyle, "fill")),
              outline = nodeVal(get1(polyStyle, "outline"));
          if (pcolor) properties.fill = pcolor;
          if (!isNaN(popacity)) properties["fill-opacity"] = popacity;
          if (fill) properties["fill-opacity"] = fill === "1" ? properties["fill-opacity"] || 1 : 0;
          if (outline) properties["stroke-opacity"] = outline === "1" ? properties["stroke-opacity"] || 1 : 0;
        }

        if (extendedData) {
          var datas = get(extendedData, "Data"),
              simpleDatas = get(extendedData, "SimpleData");

          for (i = 0; i < datas.length; i++) {
            properties[datas[i].getAttribute("name")] = nodeVal(get1(datas[i], "value"));
          }

          for (i = 0; i < simpleDatas.length; i++) {
            properties[simpleDatas[i].getAttribute("name")] = nodeVal(simpleDatas[i]);
          }
        }

        if (visibility) {
          properties.visibility = nodeVal(visibility);
        }

        if (geomsAndTimes.coordTimes.length) {
          properties.coordTimes = geomsAndTimes.coordTimes.length === 1 ? geomsAndTimes.coordTimes[0] : geomsAndTimes.coordTimes;
        }

        var feature = {
          type: "Feature",
          geometry: geomsAndTimes.geoms.length === 1 ? geomsAndTimes.geoms[0] : {
            type: "GeometryCollection",
            geometries: geomsAndTimes.geoms
          },
          properties: properties
        };
        if (attr(root, "id")) feature.id = attr(root, "id");
        return [feature];
      }

      return gj;
    },
    gpx: function gpx(doc) {
      var i,
          tracks = get(doc, "trk"),
          routes = get(doc, "rte"),
          waypoints = get(doc, "wpt"),
          // a feature collection
      gj = fc(),
          feature;

      for (i = 0; i < tracks.length; i++) {
        feature = getTrack(tracks[i]);
        if (feature) gj.features.push(feature);
      }

      for (i = 0; i < routes.length; i++) {
        feature = getRoute(routes[i]);
        if (feature) gj.features.push(feature);
      }

      for (i = 0; i < waypoints.length; i++) {
        gj.features.push(getPoint(waypoints[i]));
      }

      function initializeArray(arr, size) {
        for (var h = 0; h < size; h++) {
          arr.push(null);
        }

        return arr;
      }

      function getPoints(node, pointname) {
        var pts = get(node, pointname),
            line = [],
            times = [],
            heartRates = [],
            l = pts.length;
        if (l < 2) return {}; // Invalid line in GeoJSON

        for (var i = 0; i < l; i++) {
          var c = coordPair(pts[i]);
          line.push(c.coordinates);
          if (c.time) times.push(c.time);

          if (c.heartRate || heartRates.length) {
            if (!heartRates.length) initializeArray(heartRates, i);
            heartRates.push(c.heartRate || null);
          }
        }

        return {
          line: line,
          times: times,
          heartRates: heartRates
        };
      }

      function getTrack(node) {
        var segments = get(node, "trkseg"),
            track = [],
            times = [],
            heartRates = [],
            line;

        for (var i = 0; i < segments.length; i++) {
          line = getPoints(segments[i], "trkpt");

          if (line) {
            if (line.line) track.push(line.line);
            if (line.times && line.times.length) times.push(line.times);

            if (heartRates.length || line.heartRates && line.heartRates.length) {
              if (!heartRates.length) {
                for (var s = 0; s < i; s++) {
                  heartRates.push(initializeArray([], track[s].length));
                }
              }

              if (line.heartRates && line.heartRates.length) {
                heartRates.push(line.heartRates);
              } else {
                heartRates.push(initializeArray([], line.line.length || 0));
              }
            }
          }
        }

        if (track.length === 0) return;
        var properties = getProperties(node);
        extend(properties, getLineStyle(get1(node, "extensions")));
        if (times.length) properties.coordTimes = track.length === 1 ? times[0] : times;
        if (heartRates.length) properties.heartRates = track.length === 1 ? heartRates[0] : heartRates;
        return {
          type: "Feature",
          properties: properties,
          geometry: {
            type: track.length === 1 ? "LineString" : "MultiLineString",
            coordinates: track.length === 1 ? track[0] : track
          }
        };
      }

      function getRoute(node) {
        var line = getPoints(node, "rtept");
        if (!line.line) return;
        var prop = getProperties(node);
        extend(prop, getLineStyle(get1(node, "extensions")));
        var routeObj = {
          type: "Feature",
          properties: prop,
          geometry: {
            type: "LineString",
            coordinates: line.line
          }
        };
        return routeObj;
      }

      function getPoint(node) {
        var prop = getProperties(node);
        extend(prop, getMulti(node, ["sym"]));
        return {
          type: "Feature",
          properties: prop,
          geometry: {
            type: "Point",
            coordinates: coordPair(node).coordinates
          }
        };
      }

      function getLineStyle(extensions) {
        var style = {};

        if (extensions) {
          var lineStyle = get1(extensions, "line");

          if (lineStyle) {
            var color = nodeVal(get1(lineStyle, "color")),
                opacity = parseFloat(nodeVal(get1(lineStyle, "opacity"))),
                width = parseFloat(nodeVal(get1(lineStyle, "width")));
            if (color) style.stroke = color;
            if (!isNaN(opacity)) style["stroke-opacity"] = opacity; // GPX width is in mm, convert to px with 96 px per inch

            if (!isNaN(width)) style["stroke-width"] = width * 96 / 25.4;
          }
        }

        return style;
      }

      function getProperties(node) {
        var prop = getMulti(node, ["name", "cmt", "desc", "type", "time", "keywords"]),
            links = get(node, "link");
        if (links.length) prop.links = [];

        for (var i = 0, link; i < links.length; i++) {
          link = {
            href: attr(links[i], "href")
          };
          extend(link, getMulti(links[i], ["text", "type"]));
          prop.links.push(link);
        }

        return prop;
      }

      return gj;
    }
  };
  return t;
}();

/**
 * MlGPXViewer returns a dropzone and a button to load a GPX Track into the map.
 */

var MlGPXViewer = function MlGPXViewer(props) {
  var dataSource = useContext(GeoJsonContext);
  var componentId = useRef((props.idPrefix ? props.idPrefix : "MlGpxViewer-") + v4());
  var mapContext = useContext(MapContext);
  var mapId = props.mapId;
  var initializedRef = useRef(false);
  var mapRef = useRef(null);
  var sourceName = "import-source";
  var layerNameLines = "importer-layer-lines";
  var layerNamePoints = "importer-layer-points";

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      open = _useState2[0],
      setIsOpen = _useState2[1];

  var dropZone = useRef(null);

  var _useState3 = useState(0),
      _useState4 = _slicedToArray(_useState3, 2),
      zIndex = _useState4[0],
      setZIndex = _useState4[1];

  var _useState5 = useState([]),
      _useState6 = _slicedToArray(_useState5, 2),
      metaData = _useState6[0],
      setMetaData = _useState6[1];

  var fileupload = useRef(null);
  var popup = useRef(new Popup({
    closeButton: false,
    closeOnClick: true
  }));
  useEffect(function () {
    var _componentId = componentId.current;
    var _popup = popup.current;
    return function () {
      // This is the cleanup function, it is called when this react component is removed from react-dom
      if (mapRef.current) {
        mapRef.current.cleanup(_componentId);
        mapRef.current.getCanvas().style.cursor = "";
        mapRef.current = null;
      }

      _popup.remove();
    };
  }, []);
  useEffect(function () {
    if (!mapContext.mapExists(mapId) || initializedRef.current) return;
    initializedRef.current = true;
    mapRef.current = mapContext.getMap(mapId);
    mapRef.current.addSource(sourceName, {
      type: "geojson",
      data: dataSource.data
    }, componentId.current);
    mapRef.current.addLayer({
      id: layerNameLines,
      source: sourceName,
      type: "line",
      paint: {
        "line-width": 4,
        "line-color": "rgba(212, 55, 23,0.5)"
      }
    }, props.insertBeforeLayer, componentId.current);
    mapRef.current.addLayer({
      id: layerNamePoints,
      source: sourceName,
      type: "circle",
      paint: {
        "circle-color": "rgba(72, 77, 99,0.5)",
        "circle-radius": 7
      },
      filter: ["==", "$type", "Point"]
    }, props.insertBeforeLayer, componentId.current);
    [layerNameLines, layerNamePoints].forEach(function (layerName) {
      mapRef.current.setLayoutProperty(layerName, "visibility", "visible");
    });
    mapRef.current.on("mouseenter", layerNamePoints, function (e) {
      // Change the cursor style as a UI indicator.
      mapContext.getMap(props.mapId).getCanvas().style.cursor = "pointer";
      var coordinates = e.features[0].geometry.coordinates.slice(); //const description = e.features[0].properties.desc;

      var name = e.features[0].properties.name; // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.

      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      } // Populate the popup and set its coordinates
      // based on the feature found.


      popup.current.setLngLat(coordinates).setHTML(name).addTo(mapRef.current);
    });
    mapRef.current.on("mouseleave", "places", function () {
      mapRef.current.getCanvas().style.cursor = "";
      popup.current.remove();
    });
    mapRef.current.setZoom(10);
  }, [mapContext.mapIds, mapContext, dataSource.data, mapId, props]);
  useEffect(function () {
    var dropZoneCurrent = dropZone.current;

    var raiseDropZoneAndStopDefault = function raiseDropZoneAndStopDefault(event) {
      setZIndex(1000);
      stopDefault(event);
    };

    var lowerDropZone = function lowerDropZone() {
      setZIndex(0);
    };

    var lowerDropZoneAndStopDefault = function lowerDropZoneAndStopDefault(event) {
      setZIndex(0);
      stopDefault(event);
    };

    window.addEventListener("dragenter", raiseDropZoneAndStopDefault);
    window.addEventListener("dragover", stopDefault);
    dropZoneCurrent.addEventListener("dragleave", lowerDropZone);
    window.addEventListener("drop", lowerDropZoneAndStopDefault);
    return function () {
      window.removeEventListener("dragenter", raiseDropZoneAndStopDefault);
      window.removeEventListener("dragover", stopDefault);
      window.removeEventListener("drop", stopDefault);
      dropZoneCurrent.removeEventListener("dragleave", lowerDropZone);
      window.removeEventListener("drop", function (event) {
        return lowerDropZoneAndStopDefault;
      });
    };
  });

  var stopDefault = function stopDefault(event) {
    event.preventDefault();
    event.stopPropagation();
  };

  useEffect(function () {
    if (!mapRef.current) return;
    var visibility = props.visible ? "visible" : "none";
    [layerNameLines, layerNamePoints].forEach(function (layerName) {
      mapRef.current.setLayoutProperty(layerName, "visibility", visibility);
    });
  }, [props.visible]);

  var dropHandler = function dropHandler(event) {
    event.preventDefault();

    if (event.dataTransfer.items) {
      if (event.dataTransfer.items.length > 1) {
        return false;
      } // If dropped items aren't files, reject them


      if (event.dataTransfer.items[0].kind === "file") {
        var reader = new FileReader();

        reader.onload = function (payload) {
          addGPXToMap(payload.currentTarget.result);
        };

        var file = event.dataTransfer.items[0].getAsFile();
        reader.readAsText(file);
      }
    }
  };

  var addGPXToMap = function addGPXToMap(gpxAsString) {
    if (!mapRef.current) return;

    try {
      setMetaData([]);
      console.log(gpxAsString);
      var domParser = new DOMParser();
      var gpxDoc = domParser.parseFromString(gpxAsString, "application/xml");
      var metadata = gpxDoc.querySelector("metadata");
      metadata.childNodes.forEach(function (node) {
        var value = node.textContent;
        var title = node.nodeName;

        if (node.nodeName === "link") {
          value = node.getAttribute("href");
        }

        if (!!value.trim().length) {
          var metaDatEntry = {
            title: title,
            value: value,
            id: new Date().getTime()
          };
          setMetaData(function (prevState) {
            return [].concat(_toConsumableArray(prevState), [metaDatEntry]);
          });
        }
      });
      var data = toGeoJSON.gpx(gpxDoc);
      dataSource.setData(data);
      mapRef.current.getSource(sourceName).setData(data);
      var bounds = bbox(data);
      mapRef.current.fitBounds(bounds);
    } catch (e) {
      console.log(e);
    }
  };

  var toogleDrawer = function toogleDrawer() {
    setIsOpen(function (prevState) {
      return !prevState;
    });
  };

  var fileUploadOnChange = function fileUploadOnChange() {
    var file = fileupload.current.files[0];
    if (!file) return false;
    var reader = new FileReader();

    reader.onload = function (payload) {
      addGPXToMap(payload.currentTarget.result);
    };

    reader.readAsText(file);
  };

  var manualUpload = function manualUpload() {
    fileupload.current.click();
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(IconButton, {
    onClick: manualUpload,
    style: {
      position: "absolute",
      right: "5px",
      bottom: "75px",
      backgroundColor: "rgba(255,255,255,1)",
      zIndex: 1000
    }
  }, /*#__PURE__*/React.createElement("input", {
    ref: fileupload,
    onChange: fileUploadOnChange,
    type: "file",
    id: "input",
    multiple: true,
    style: {
      display: "none"
    }
  }), /*#__PURE__*/React.createElement(FileCopy, null)), /*#__PURE__*/React.createElement(IconButton, {
    onClick: toogleDrawer,
    style: {
      position: "absolute",
      right: "5px",
      bottom: "25px",
      backgroundColor: "rgba(255,255,255,1)",
      zIndex: 1000
    }
  }, /*#__PURE__*/React.createElement(InfoIcon, null)), /*#__PURE__*/React.createElement(Drawer, {
    variant: "persistent",
    anchor: "left",
    open: open
  }, /*#__PURE__*/React.createElement(Typography, {
    variant: "h6",
    style: {
      textAlign: "center",
      padding: "1em"
    },
    noWrap: true
  }, "Informationen zur Route"), /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement(List, null, metaData.map(function (item) {
    return /*#__PURE__*/React.createElement(ListItem, {
      key: "item--".concat(item.id)
    }, /*#__PURE__*/React.createElement(ListItemText, {
      primary: item.value
    }));
  }))), /*#__PURE__*/React.createElement("div", {
    onDrop: dropHandler,
    ref: dropZone,
    style: {
      position: "absolute",
      left: "0",
      top: "0",
      backgroundColor: "rgba(255,255,255,0.5)",
      width: "100%",
      height: "100%",
      zIndex: zIndex
    }
  }, /*#__PURE__*/React.createElement(Typography, {
    variant: "h6",
    style: {
      top: "50%",
      position: "absolute",
      left: "50%",
      msTransform: "translate(-50%, -50%)",
      transform: " translate(-50%, -50%)"
    },
    noWrap: true
  }, "Gpx-Datei ablegen")));
};

MlGPXViewer.defaultProps = {
  visible: true
};

var GeoJsonProvider = function GeoJsonProvider(_ref) {
  var children = _ref.children;

  var _useState = useState({
    type: "FeatureCollection",
    features: []
  }),
      _useState2 = _slicedToArray(_useState, 2),
      data = _useState2[0],
      setData = _useState2[1];

  var getEmptyFeatureCollection = function getEmptyFeatureCollection() {
    return {
      type: "FeatureCollection",
      features: []
    };
  };

  var value = {
    data: data,
    setData: setData,
    getEmptyFeatureCollection: getEmptyFeatureCollection
  };
  return /*#__PURE__*/React.createElement(GeoJsonContextProvider, {
    value: value
  }, children);
};

GeoJsonProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export { GeoJsonContext, GeoJsonProvider, MapLibreMap, MapLibreMap$1 as MapLibreMapDebug, MlBasicComponent, MlComponentTemplate, MlCompositeLayer, MlCreatePdfButton, MlFeatureEditor, MlGPXViewer, MlGeoJsonLayer, MlImageMarkerLayer, MlLayer, MlLayerMagnify, MlLayerSwipe, MlOsmLayer, MlVectorTileLayer, MlWmsLayer };
//# sourceMappingURL=index.esm.js.map

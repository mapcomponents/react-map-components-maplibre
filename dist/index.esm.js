import React, { useRef, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { MapContext } from 'react-map-components-core';
import maplibregl from 'maplibre-gl/dist/maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import maplibregl$1 from 'maplibre-gl/dist/maplibre-gl-unminified';
import Button from '@material-ui/core/Button';
import maplibregl$2 from 'maplibre-gl';
import jsPDF from 'jspdf';
import PrinterIcon from '@material-ui/icons/Print';
import { lineString, length, lineChunk, lineDistance, along, bearing, point } from '@turf/turf';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import Point from '@mapbox/point-geometry';
import extent from '@mapbox/geojson-extent';

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

  var self = this;
  this.map = props.map; // add style prop functions that require map._update to be called afterwards

  var updatingStyleFunctions = ["addLayer", "moveLayer", "removeLayer", "addSource", "removeSource", "setPaintProperty", "setLayoutProperty"];
  updatingStyleFunctions.map(function (item) {
    _this[item] = function () {
      if (self.map && _this.map.style && typeof self.map.style[item] === "function") {
        var _self$map$style;

        (_self$map$style = self.map.style)[item].apply(_self$map$style, arguments);
      }

      return self.map._update ? self.map._update(true) : undefined;
    };
  }); // add style prop functions

  var styleFunctions = ["listImages", "getPaintProperty", "getLayoutProperty"];
  styleFunctions.map(function (item) {
    _this[item] = function () {
      if (self.map && self.map.style) {
        var _self$map$style2;

        return (_self$map$style2 = self.map.style)[item].apply(_self$map$style2, arguments);
      }

      return false;
    };
  }); //  add MapLibre-gl functions

  Object.keys(this.map.__proto__).forEach(function (item) {
    if (typeof _this[item] === "undefined") {
      _this[item] = function () {
        var _self$map;

        return (_self$map = self.map)[item].apply(_self$map, arguments);
      };
    }
  }); //  add MapLibre-gl properties

  Object.keys(this.map).forEach(function (item) {
    if (typeof _this[item] === "undefined") {
      _this[item] = self.map[item];
    }
  });
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
      map.current = new maplibregl.Map(_objectSpread2(_objectSpread2({}, defaultOptions), mapOptions));
      map.current.once("load", function () {
        var mlWrapper = new MapLibreGlWrapper({
          map: map.current
        });

        if (props.mapId) {
          mapContext.registerMap(props.mapId, mlWrapper);
        } else {
          mapContext.setMap(mlWrapper);
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
  useEffect(function () {
    return function () {// This is the cleanup function, it is called when this react component is removed from react-dom
      // try to remove anything this component has added to the MapLibre-gl instance
      // e.g.: remove the layer
      // mapContext.getMap(props.mapId).removeLayer(layerRef.current);
      // check for the existence of map.style before calling getLayer or getSource
    };
  }, []);
  useEffect(function () {
    if (!mapContext.mapExists(props.mapId)) return; // the MapLibre-gl instance (mapContext.map) is accessible here
    // initialize the layer and add it to the MapLibre-gl instance or do something else with it

    mapContext.getMap(props.mapId).setCenter([7.132122000552613, 50.716405378037706]);
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

  for (var _i = 0, _Object$entries = Object.entries(nmMap); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        key = _Object$entries$_i[0],
        value = _Object$entries$_i[1];

    value.some(function (element) {
      if (nmAddress.hasOwnProperty(element)) {
        addressArr.push(nmAddress[element]);
        return true;
      }
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
  console.log("start create PDF");
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

  console.log(style);
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
    var logo = "data:image/png;base64,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";
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

var _showNextTransitionSegment = function _showNextTransitionSegment(props, layerId, map, transitionInProgressRef, transitionGeojsonDataRef, transitionGeojsonCommonDataRef, idSuffixRef, currentTransitionStepRef, msPerStep) {
  var _arguments = arguments;
  console.log("SHOW NEXT TRANSITION SEGMENT CALLED");

  if (typeof map.getSource(layerId + idSuffixRef.current) === "undefined" || !transitionInProgressRef.current) {
    setTimeout(function () {
      return _showNextTransitionSegment.apply(void 0, _toConsumableArray(_arguments));
    }, msPerStep);
    return;
  }

  if (typeof transitionGeojsonDataRef.current[currentTransitionStepRef.current] !== "undefined") {
    var newData = currentTransitionStepRef.current + 1 === transitionGeojsonDataRef.current.length ? props.geojson : lineString([].concat(_toConsumableArray(transitionGeojsonCommonDataRef.current), _toConsumableArray(transitionGeojsonDataRef.current[currentTransitionStepRef.current].geometry.coordinates)));
    map.getSource(layerId + idSuffixRef.current).setData(newData);

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

var _transitionToGeojson = function _transitionToGeojson(newGeojson, props, transitionGeojsonCommonDataRef, transitionGeojsonDataRef, transitionInProgressRef, oldGeojsonRef, msPerStep, currentTransitionStepRef, map, layerId, idSuffixRef) {
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
    return _showNextTransitionSegment(props, layerId, map, transitionInProgressRef, transitionGeojsonDataRef, transitionGeojsonCommonDataRef, idSuffixRef, currentTransitionStepRef, msPerStep);
  }, msPerStep);
};

var msPerStep = 50;

var MlGeoJsonLayer = function MlGeoJsonLayer(props) {
  // Use a useRef hook to reference the layer object to be able to access it later inside useEffect hooks
  var mapContext = useContext(MapContext);
  var idSuffixRef = useRef(props.idSuffix || new Date().getTime());
  var oldGeojsonRef = useRef(null);
  var mapRef = useRef(null);
  var transitionInProgressRef = useRef(false);
  var currentTransitionStepRef = useRef(false);
  var transitionGeojsonDataRef = useRef([]);
  var transitionGeojsonCommonDataRef = useRef([]);
  var layerId = props.layerId || "MlGeoJsonLayer-";
  useEffect(function () {
    var layerSourceId = layerId + idSuffixRef.current;
    return function () {
      // This is the cleanup function, it is called when this react component is removed from react-dom
      if (mapRef.current) {
        if (mapRef.current.style && mapRef.current.getLayer(layerSourceId)) {
          mapRef.current.removeLayer(layerSourceId);
        }

        if (mapRef.current.style && mapRef.current.getSource(layerSourceId)) {
          mapRef.current.removeSource(layerSourceId);
        }

        mapRef.current = null;
      }
    };
  }, []);
  useEffect(function () {
    if (!mapContext.mapExists(props.mapId) || !mapContext.getMap(props.mapId).style || !mapContext.getMap(props.mapId).getLayer(layerId + idSuffixRef.current)) return; // the MapLibre-gl instance (mapContext.map) is accessible here
    // initialize the layer and add it to the MapLibre-gl instance or do something else with it

    for (var key in props.paint) {
      mapContext.getMap(props.mapId).setPaintProperty(layerId + idSuffixRef.current, key, props.paint[key]);
    }
  }, [props.paint, layerId, mapContext, props.mapId]);
  var transitionToGeojson = useCallback(function (newGeojson) {
    console.log("TRANSITION CALLED");

    _transitionToGeojson(newGeojson, props, transitionGeojsonCommonDataRef, transitionGeojsonDataRef, transitionInProgressRef, oldGeojsonRef, msPerStep, currentTransitionStepRef, mapRef.current, layerId, idSuffixRef);
  }, [props]);
  useEffect(function () {
    if (!mapContext.mapExists(props.mapId) || !mapContext.getMap(props.mapId).getSource(layerId + idSuffixRef.current)) return; // the MapLibre-gl instance (mapContext.map) is accessible here
    // initialize the layer and add it to the MapLibre-gl instance or do something else with it

    if (typeof props.transitionTime !== "undefined" && props.type === "line" && oldGeojsonRef.current) {
      transitionInProgressRef.current = false;
      currentTransitionStepRef.current = false;
      transitionGeojsonDataRef.current = [];
      transitionGeojsonCommonDataRef.current = [];
      transitionToGeojson(props.geojson);
    } else {
      mapContext.getMap(props.mapId).getSource(layerId + idSuffixRef.current).setData(props.geojson);
    }

    oldGeojsonRef.current = props.geojson;
  }, [props.geojson, layerId, props.mapId, mapContext, props.type, transitionToGeojson, props.transitionTime]);
  useEffect(function () {
    if (!mapContext.mapExists(props.mapId)) return; // the MapLibre-gl instance (mapContext.map) is accessible here
    // initialize the layer and add it to the MapLibre-gl instance or do something else with it

    if (!mapContext.getMap(props.mapId).getSource(layerId + idSuffixRef.current) && props.geojson) {
      var geojson = props.geojson;

      if (props.type === "line" && typeof props.transitionTime !== "undefined" && props.transitionTime && typeof props.geojson.geometry !== "undefined") {
        var tmpChunks = lineChunk(props.geojson, 0.01);
        geojson = tmpChunks.features[0];
      }

      mapRef.current = mapContext.getMap(props.mapId);
      mapContext.getMap(props.mapId).addLayer({
        id: layerId + idSuffixRef.current,
        source: {
          type: "geojson",
          data: geojson
        },
        type: props.type || "line",
        paint: props.paint || {
          "line-color": "rgb(100,200,100)",
          "line-width": 10
        }
      }, props.insertBeforeLayer);

      if (props.type === "line" && typeof props.transitionTime !== "undefined" && typeof props.geojson.geometry !== "undefined") {
        transitionToGeojson(props.geojson);
        setTimeout(function () {
          oldGeojsonRef.current = props.geojson;
        }, props.transitionTime / 2);
      }
    }
  }, [mapContext.mapIds, mapContext, layerId, props.geojson, props.insertBeforeLayer, props.mapId, props.type, props.transitionTime, props.paint, transitionToGeojson]);
  return /*#__PURE__*/React.createElement(React.Fragment, null);
};

var MlImageMarkerLayer = function MlImageMarkerLayer(props) {
  // Use a useRef hook to reference the layer object to be able to access it later inside useEffect hooks
  var mapRef = useRef(null);
  var mapContext = useContext(MapContext);
  var layerInitializedRef = useRef(false);
  var idPostfixRef = useRef(props.idSuffix || new Date().getTime());
  var imageIdRef = useRef(props.imageId || "img_" + new Date().getTime());
  var layerId = (props.layerId || "MlImageMarkerLayer-") + idPostfixRef.current;
  useEffect(function () {
    return function () {
      if (mapRef.current) {
        // This is the cleanup function, it is called when this react component is removed from react-dom
        if (mapRef.current.style && mapRef.current.getLayer(layerId)) {
          mapRef.current.removeLayer(layerId);
        }

        if (mapRef.current.style && mapRef.current.getSource(layerId)) {
          mapRef.current.removeSource(layerId);
        }

        mapRef.current = null;
      }
    };
  }, []);
  useEffect(function () {
    if (!mapRef.current || mapRef.current && !mapContext.getMap(props.mapId).getLayer(layerId) || !props.options) return; // the MapLibre-gl instance (mapContext.map) is accessible here
    // initialize the layer and add it to the MapLibre-gl instance or do something else with it

    if (props.options.layout) {
      for (var key in props.options.layout) {
        mapContext.getMap(props.mapId).setLayoutProperty(layerId, key, props.options.layout[key]);
      }
    }

    if (props.options.paint) {
      for (var key in props.options.paint) {
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
    mapRef.current.addLayer(tmpOptions);
  }, [mapContext, props.options, props, imageIdRef, layerId]);
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
        mapRef.current.addImage(imageIdRef.current, image);
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
  var idSuffixRef = useRef(props.idSuffix || new Date().getTime());
  var layerId = (props.layerId || "MlLayer-") + idSuffixRef.current;
  useEffect(function () {
    return function () {
      if (mapRef.current) {
        // This is the cleanup function, it is called when this react component is removed from react-dom
        if (mapRef.current.style && mapRef.current.getLayer(layerId)) {
          mapRef.current.removeLayer(layerId);
        }

        if (mapRef.current.style && mapRef.current.getSource(layerId)) {
          mapRef.current.removeSource(layerId);
        }

        mapRef.current = null;
      }
    };
  }, []);
  useEffect(function () {
    if (!mapContext.mapExists(props.mapId) || !mapContext.getMap(props.mapId).getLayer(layerId) || !props.options) return; // the MapLibre-gl instance (mapContext.map) is accessible here
    // initialize the layer and add it to the MapLibre-gl instance or do something else with it

    if (props.options.layout) {
      for (var key in props.options.layout) {
        mapContext.getMap(props.mapId).setLayoutProperty(layerId, key, props.options.layout[key]);
      }
    }

    if (props.options.paint) {
      for (var key in props.options.paint) {
        mapContext.getMap(props.mapId).setPaintProperty(layerId, key, props.options.paint[key]);
      }
    }
  }, [props.options]);
  useEffect(function () {
    if (!props.options || !mapContext.mapExists(props.mapId) || layerInitializedRef.current) return; // the MapLibre-gl instance (mapContext.map) is accessible here
    // initialize the layer and add it to the MapLibre-gl instance or do something else with it

    mapRef.current = mapContext.getMap(props.mapId);

    if (!mapRef.current.getLayer(layerId)) {
      layerInitializedRef.current = true;
      mapContext.getMap(props.mapId).addLayer(_objectSpread2({
        id: layerId
      }, props.options));
    }
  }, [mapContext.mapIds, mapContext, props, layerId]);
  return /*#__PURE__*/React.createElement(React.Fragment, null);
};

/**
 * MlOsmLayer returns a Button that will add a standard OSM tile layer to the maplibre-gl instance.
 */

var MlOsmLayer = function MlOsmLayer(props) {
  var mapContext = useContext(MapContext);
  var mapRef = useRef(null);
  var layerInitializedRef = useRef(false);

  var _useState = useState(true),
      _useState2 = _slicedToArray(_useState, 2),
      showLayer = _useState2[0],
      setShowLayer = _useState2[1];

  var idPostfixRef = useRef(new Date().getTime());
  useEffect(function () {
    return function () {
      // This is the cleanup function, it is called when this react component is removed from react-dom
      if (mapRef.current) {
        if (mapRef.current.style && mapRef.current.getLayer("raster-tile-layer-" + idPostfixRef.current)) {
          mapRef.current.removeLayer("raster-tile-layer-" + idPostfixRef.current);
        }

        if (mapRef.current.style && mapRef.current.getSource("raster-tile-source-" + idPostfixRef.current)) {
          mapRef.current.removeSource("raster-tile-source-" + idPostfixRef.current);
        }

        mapRef.current = null;
      }
    };
  }, []);
  useEffect(function () {
    if (!mapContext.mapExists(props.mapId) || layerInitializedRef.current) return;
    layerInitializedRef.current = true;
    mapRef.current = mapContext.getMap(props.mapId);
    mapRef.current.addSource("raster-tile-source-" + idPostfixRef.current, _objectSpread2({
      type: "raster",
      tileSize: 256
    }, props.sourceOptions));
    mapRef.current.addLayer(_objectSpread2({
      id: "raster-tile-layer-" + idPostfixRef.current,
      type: "raster",
      source: "raster-tile-source-" + idPostfixRef.current,
      minzoom: 0,
      maxzoom: 22
    }, props.layerOptions));
  }, [mapContext.mapIds]);
  useEffect(function () {
    if (!mapRef.current) return; // toggle layer visibility by changing the layout object's visibility property

    if (showLayer) {
      mapRef.current.setLayoutProperty("raster-tile-layer-" + idPostfixRef.current, "visibility", "visible");
    } else {
      mapRef.current.setLayoutProperty("raster-tile-layer-" + idPostfixRef.current, "visibility", "none");
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

  var _useState = useState(true),
      _useState2 = _slicedToArray(_useState, 2),
      showLayer = _useState2[0],
      setShowLayer = _useState2[1];

  var layerName = "vector-tile-layer-";
  var sourceName = "vector-tile-source-";
  var idPostfixRef = useRef(new Date().getTime());
  var layerIdsRef = useRef({});
  var initializedRef = useRef(false);
  var mapRef = useRef(null);

  var cleanup = function cleanup() {
    if (mapRef.current && mapRef.current.style) {
      for (var key in layerIdsRef.current) {
        if (mapRef.current.getLayer(layerIdsRef.current[key])) {
          mapRef.current.removeLayer(layerIdsRef.current[key]);
        }
      }

      if (mapRef.current.getSource(sourceName + idPostfixRef.current)) {
        mapRef.current.removeSource(sourceName + idPostfixRef.current);
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

    mapRef.current.addSource(sourceName + idPostfixRef.current, {
      type: "vector",
      tiles: [props.url],
      tileSize: 512,
      attribution: "" //...props.sourceOptions,

    });

    for (var key in props.layers) {
      var layerId = layerName + "_" + key + "_" + idPostfixRef.current;
      layerIdsRef.current[key] = layerId;
      mapRef.current.addLayer(_objectSpread2({
        id: layerId,
        source: sourceName + idPostfixRef.current,
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
    }
  }, [mapContext.mapIds]);
  useEffect(function () {
    if (!mapContext.mapExists(props.mapId)) return; // the MapLibre-gl instance (mapContext.map) is accessible here
    // initialize the layer and add it to the MapLibre-gl instance or do something else with it

    for (var key in props.layers) {
      if (mapRef.current.getLayer(layerIdsRef.current[key])) {
        for (var paintKey in props.layers[key].paint) {
          mapContext.getMap(props.mapId).setPaintProperty(layerIdsRef.current[key], paintKey, props.layers[key].paint[paintKey]);
        }
      }
    }
  }, [props.layers]);
  useEffect(function () {
    if (!mapRef.current) return; // toggle layer visibility by changing the layout object's visibility property

    if (showLayer) {
      mapRef.current.setLayoutProperty(layerName + idPostfixRef.current, "visibility", "visible");
    } else {
      mapRef.current.setLayoutProperty(layerName + idPostfixRef.current, "visibility", "none");
    }
  }, [showLayer]);
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

  var idPostfixRef = useRef(new Date().getTime());
  var mapRef = useRef(null);
  var initializedRef = useRef(false);
  useEffect(function () {
    return function () {
      // This is the cleanup function, it is called when this react component is removed from react-dom
      if (mapRef.current) {
        if (mapRef.current.style && mapRef.current.getLayer("raster-tile-layer-" + idPostfixRef.current)) {
          mapRef.current.removeLayer("raster-tile-layer-" + idPostfixRef.current);
        }

        if (mapRef.current.style && mapRef.current.getSource("raster-tile-source-" + idPostfixRef.current)) {
          mapRef.current.removeSource("raster-tile-source-" + idPostfixRef.current);
        }

        mapRef.current = null;
      }
    };
  }, []);
  useEffect(function () {
    if (!mapContext.mapExists(props.mapId) || initializedRef.current) return;
    initializedRef.current = true;
    mapRef.current = mapContext.getMap(props.mapId); // Add the new layer to the openlayers instance once it is available

    mapRef.current.addSource("raster-tile-source-" + idPostfixRef.current, {
      type: "raster",
      tiles: [props.url + "?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&width=256&height=256&layers=" + props.layer],
      tileSize: 256,
      attribution: "" //...props.sourceOptions,

    });
    mapRef.current.addLayer(_objectSpread2({
      id: "raster-tile-layer-" + idPostfixRef.current,
      type: "raster",
      source: "raster-tile-source-" + idPostfixRef.current,
      minzoom: 0,
      maxzoom: 10
    }, props.sourceOptions));
  }, [mapContext.mapIds]);
  useEffect(function () {
    if (!mapRef.current) return; // toggle layer visibility by changing the layout object's visibility property

    if (showLayer) {
      mapRef.current.setLayoutProperty("raster-tile-layer-" + idPostfixRef.current, "visibility", "visible");
    } else {
      mapRef.current.setLayoutProperty("raster-tile-layer-" + idPostfixRef.current, "visibility", "none");
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

      if (!ctx._ctx.store.getInitialConfigValue('doubleClickZoom')) return;
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

function createVertex (parentId, coordinates, path, selected) {
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
}

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
  display(createVertex(state.polygon.id, geojson.geometry.coordinates[0][0], "0.0", false));

  if (coordinateCount > 3) {
    // Add a start position marker to the map, clicking on this will finish the feature
    // This should only be shown when we're in a valid spot
    var endPos = geojson.geometry.coordinates[0].length - 3;
    display(createVertex(state.polygon.id, geojson.geometry.coordinates[0][endPos], "0.".concat(endPos), false));
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

function createMidpoint (parent, startVertex, endVertex) {
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
}

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
    supplementaryPoints.push(createVertex(featureId, coordinates, basePath, isSelectedPath(basePath)));
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
      var vertex = createVertex(featureId, point, pointPath, isSelectedPath(pointPath)); // If we're creating midpoints, check if there was a
      // vertex before this one. If so, add a midpoint
      // between that vertex and this one.

      if (options.midpoints && lastVertex) {
        var midpoint = createMidpoint(featureId, lastVertex, vertex);

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

function constrainFeatureMovement (geojsonFeatures, delta) {
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
}

function moveFeatures (features, delta) {
  var constrainedDelta = constrainFeatureMovement(features.map(function (feature) {
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
}

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
  moveFeatures(this.getSelected(), delta);
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
  moveFeatures(this.getSelected(), delta);
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
  var constrainedDelta = constrainFeatureMovement(selectedCoordPoints, delta);

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

  var _useState7 = useState([]),
      _useState8 = _slicedToArray(_useState7, 2),
      drawnFeatures = _useState8[0],
      setDrawnFeatures = _useState8[1];

  var modeChangeHandler = function modeChangeHandler(e) {
    console.log("MlFeatureEditor mode change to " + e.mode); //setDrawMode(e.mode);
  };

  var mouseUpHandler = function mouseUpHandler() {
    console.log("mouseup");
    setMouseUpTrigger(Math.random());
  };

  useEffect(function () {
    return function () {
      if (mapRef.current) {
        if (mapRef.current.style) {
          mapRef.current.off("draw.modechange", modeChangeHandler);
          mapRef.current.off("mouseup", mouseUpHandler);
        }

        mapRef.current.removeControl(draw.current, "top-left");
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
      mapRef.current.on("draw.modechange", modeChangeHandler);
      mapRef.current.addControl(draw.current, "top-left");
      mapRef.current.on("mouseup", mouseUpHandler);
      setDrawToolsReady(true);
    }
  }, [mapContext.map, mapContext, props, drawnFeatures, drawToolsInitialized]);
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

      if (typeof props.onChange === "function") {
        props.onChange(currentFeatureCollection.features);
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

var MlCameraFollowPath = function MlCameraFollowPath(props) {
  // Use a useRef hook to reference the layer object to be able to access it later inside useEffect hooks
  // without the requirement of adding it to the dependency list (ignore the false eslint exhaustive deps warning)
  var mapContext = useContext(MapContext);
  var initializedRef = useRef(false);
  var clearIntervalRef = useRef(false); // default path, for testing default behaviour

  var route = useMemo(function () {
    return props.path || [[7.09222, 50.725055], [7.0577, 50.7621]];
  }, [props.path]);
  useEffect(function () {
    return function () {
      clearIntervalRef.current = true; // This is the cleanup function, it is called when this react component is removed from react-dom
      // try to remove anything this component has added to the MapLibre-gl instance
      // e.g.: remove the layer
      // mapContext.getMap(props.mapId).removeLayer(layerRef.current);
    };
  }, []);
  var disableInteractivity = useCallback(function () {
    mapContext.map["scrollZoom"].disable();
    mapContext.map["boxZoom"].disable();
    mapContext.map["dragRotate"].disable();
    mapContext.map["dragPan"].disable();
    mapContext.map["keyboard"].disable();
    mapContext.map["doubleClickZoom"].disable();
    mapContext.map["touchZoomRotate"].disable();
  }, [mapContext.map]);
  var enableInteractivity = useCallback(function () {
    mapContext.map["scrollZoom"].enable();
    mapContext.map["boxZoom"].enable();
    mapContext.map["dragRotate"].enable();
    mapContext.map["dragPan"].enable();
    mapContext.map["keyboard"].enable();
    mapContext.map["doubleClickZoom"].enable();
    mapContext.map["touchZoomRotate"].enable();
  }, [mapContext.map]);
  useEffect(function () {
    if (!mapContext.mapExists() || initializedRef.current) return; // the MapLibre-gl instance (mapContext.map) is accessible here
    // initialize the layer and add it to the MapLibre-gl instance or do something else with it

    initializedRef.current = true;
    var kmPerStep = props.kmPerStep || 0.01;
    var routeDistance = lineDistance(lineString(route));
    var zoomOutTo = props.zoomOutTo || 14;
    var stepDuration = props.stepDuration || 70;
    var step = 1;
    var zoom = props.initialZoom || 18;
    var zoomSteps = 0.04;
    disableInteractivity();

    if (mapContext.map.getZoom() !== zoom) {
      mapContext.map.setZoom(zoom);
    }

    var timer = window.setInterval(function () {
      console.log(mapContext.map);

      if (clearIntervalRef.current) {
        window.clearInterval(timer);
        enableInteractivity();
      }

      var alongRoute = along(lineString(route), step * kmPerStep).geometry.coordinates;

      if (step * kmPerStep < routeDistance) {
        mapContext.map.panTo(alongRoute, {
          bearing: bearing(point([mapContext.map.getCenter().lng, mapContext.map.getCenter().lat]), point(alongRoute)),
          duration: stepDuration,
          essential: true
        });
        step++;
        console.log("PAN MOVE");
      } else if (zoom > zoomOutTo) {
        zoom = zoom - zoomSteps;
        mapContext.map.setZoom(zoom);
        console.log("ZOOM OUT");
      } else {
        window.clearInterval(timer);
        console.log("ENABLE CONTROLS");
        enableInteractivity();
      }
    }, stepDuration);
  }, [mapContext.mapIds, mapContext, props, disableInteractivity, enableInteractivity, route]);
  return /*#__PURE__*/React.createElement(React.Fragment, null);
};

export { MapLibreMap, MapLibreMap$1 as MapLibreMapDebug, MlCameraFollowPath, MlComponentTemplate, MlCompositeLayer, MlCreatePdfButton, MlFeatureEditor, MlGeoJsonLayer, MlImageMarkerLayer, MlLayer, MlOsmLayer, MlVectorTileLayer, MlWmsLayer };
//# sourceMappingURL=index.esm.js.map

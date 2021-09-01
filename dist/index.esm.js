import React, { useRef, useContext, useEffect, useMemo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { MapContext, SimpleDataContext } from 'react-map-components-core';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { lineDistance, lineString, along, bearing, point, length, lineChunk } from '@turf/turf';
import Button from '@material-ui/core/Button';
import jsPDF from 'jspdf';
import PrinterIcon from '@material-ui/icons/Print';
import { HexagonLayer } from '@deck.gl/aggregation-layers';
import '@deck.gl/layers';
import 'd3';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';

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

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
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
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
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

MapLibreMap.propTypes = {
  options: PropTypes.object
};

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

var MlComponentTemplate = function MlComponentTemplate(props) {
  // Use a useRef hook to reference the layer object to be able to access it later inside useEffect hooks
  var mapContext = useContext(MapContext);
  useEffect(function () {
    return function () {// This is the cleanup function, it is called when this react component is removed from react-dom
      // try to remove anything this component has added to the MapLibre-gl instance
      // e.g.: remove the layer
      // mapContext.getMap(props.mapId).removeLayer(layerRef.current);
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

  var _useState = useState(true),
      _useState2 = _slicedToArray(_useState, 2),
      showLayer = _useState2[0],
      setShowLayer = _useState2[1];

  var layerName = "building-3d";

  var componentCleanup = function componentCleanup() {
    if (mapContext.map.style && mapContext.map.getLayer(layerName)) {
      mapContext.map.removeLayer(layerName);
    }
  };

  useEffect(function () {
    return function () {
      componentCleanup();
    };
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

        if (lastLabelLayerId) {
          console.log(_objectSpread2({}, paint));
          mapContext.map.addLayer({
            id: layerName,
            type: "fill-extrusion",
            source: sourceId || "openmaptiles",
            "source-layer": sourceLayer || "building",
            minzoom: minZoom || 14,
            paint: _objectSpread2(_objectSpread2({}, paintDefaults), paint)
          }, lastLabelLayerId);
        }
      }
    };

    addCompositeLayer(); //mapContext.map.setZoom(16.5);
    //mapContext.map.setPitch(45);
  }, [mapContext.map, componentCleanup, minZoom, paint, sourceId, sourceLayer]);
  useEffect(function () {
    if (!mapContext.map) return;

    if (mapContext.map.getLayer(layerName)) {
      // toggle layer visibility by changing the layout object's visibility property
      if (showLayer) {
        mapContext.map.setLayoutProperty(layerName, "visibility", "visible");
      } else {
        mapContext.map.setLayoutProperty(layerName, "visibility", "none");
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

  var renderMap = new maplibregl.Map({
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

var msPerStep = 50;

var MlGeoJsonLayer = function MlGeoJsonLayer(props) {
  // Use a useRef hook to reference the layer object to be able to access it later inside useEffect hooks
  var mapContext = useContext(MapContext);
  var idPostfixRef = useRef(props.idSuffix || new Date().getTime());
  var oldGeojsonRef = useRef(null);
  var mapRef = useRef(null);
  var transitionInProgressRef = useRef(false);
  var currentTransitionStepRef = useRef(false);
  var transitionGeojsonDataRef = useRef([]);
  var transitionGeojsonCommonDataRef = useRef([]);
  var layerId = props.layerId || "MlGeoJsonLayer-";
  useEffect(function () {
    var mapObject = mapContext.getMap(props.mapId);
    var layerSourceId = layerId + idPostfixRef.current;
    return function () {
      // This is the cleanup function, it is called when this react component is removed from react-dom
      if (mapObject && mapObject.style && mapObject.getLayer(layerSourceId)) {
        mapObject.removeLayer(layerSourceId);
      }

      if (mapObject && mapObject.style && mapObject.getSource(layerSourceId)) {
        mapObject.removeSource(layerSourceId);
      }
    };
  }, []);
  useEffect(function () {
    if (!mapContext.mapExists(props.mapId) || !mapContext.getMap(props.mapId).style || !mapContext.getMap(props.mapId).getLayer(layerId + idPostfixRef.current)) return; // the MapLibre-gl instance (mapContext.map) is accessible here
    // initialize the layer and add it to the MapLibre-gl instance or do something else with it

    for (var key in props.paint) {
      mapContext.getMap(props.mapId).setPaintProperty(layerId + idPostfixRef.current, key, props.paint[key]);
    }
  }, [props.paint, layerId, mapContext, props.mapId]);
  var showNextTransitionSegment = useCallback(function () {
    if (typeof mapRef.current.getSource(layerId + idPostfixRef.current) === "undefined" || !transitionInProgressRef.current) {
      setTimeout(showNextTransitionSegment, msPerStep);
      return;
    }

    if (typeof transitionGeojsonDataRef.current[currentTransitionStepRef.current] !== "undefined") {
      var newData = currentTransitionStepRef.current + 1 === transitionGeojsonDataRef.current.length ? props.geojson : lineString([].concat(_toConsumableArray(transitionGeojsonCommonDataRef.current), _toConsumableArray(transitionGeojsonDataRef.current[currentTransitionStepRef.current].geometry.coordinates)));
      mapRef.current.getSource(layerId + idPostfixRef.current).setData(newData);

      if (typeof props.onTransitionFrame === "function") {
        props.onTransitionFrame(newData);
      }

      currentTransitionStepRef.current++;

      if (transitionInProgressRef.current && currentTransitionStepRef.current < transitionGeojsonDataRef.current.length) {
        setTimeout(showNextTransitionSegment, msPerStep);
      } else {
        if (typeof props.onTransitionEnd === "function") {
          props.onTransitionEnd(props.geojson);
        }

        transitionInProgressRef.current = false;
      }
    }
  }, [props, layerId]);
  var transitionToGeojson = useCallback(function (newGeojson) {
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
    setTimeout(showNextTransitionSegment, msPerStep);
  }, [props.geojson, showNextTransitionSegment, props.transitionTime]);
  useEffect(function () {
    if (!mapContext.mapExists(props.mapId) || !mapContext.getMap(props.mapId).getSource(layerId + idPostfixRef.current)) return; // the MapLibre-gl instance (mapContext.map) is accessible here
    // initialize the layer and add it to the MapLibre-gl instance or do something else with it

    if (typeof props.transitionTime !== "undefined" && props.type === "line" && oldGeojsonRef.current) {
      transitionInProgressRef.current = false;
      currentTransitionStepRef.current = false;
      transitionGeojsonDataRef.current = [];
      transitionGeojsonCommonDataRef.current = [];
      transitionToGeojson(props.geojson);
    } else {
      mapContext.getMap(props.mapId).getSource(layerId + idPostfixRef.current).setData(props.geojson);
    }

    oldGeojsonRef.current = props.geojson;
  }, [props.geojson, layerId, props.mapId, mapContext, props.type, transitionToGeojson, props.transitionTime]);
  useEffect(function () {
    if (!mapContext.mapExists(props.mapId)) return; // the MapLibre-gl instance (mapContext.map) is accessible here
    // initialize the layer and add it to the MapLibre-gl instance or do something else with it

    if (!mapContext.getMap(props.mapId).getSource(layerId + idPostfixRef.current) && props.geojson) {
      var geojson = props.geojson;

      if (props.type === "line" && typeof props.transitionTime !== "undefined" && props.transitionTime && typeof props.geojson.geometry !== "undefined") {
        var tmpChunks = lineChunk(props.geojson, 0.01);
        geojson = tmpChunks.features[0];
      }

      mapRef.current = mapContext.getMap(props.mapId);
      mapContext.getMap(props.mapId).addLayer({
        id: layerId + idPostfixRef.current,
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

/**
 * MlHillshadeLayer returns a Button that will add a standard OSM tile layer to the maplibre-gl instance.
 */

var MlHillshadeLayer = function MlHillshadeLayer() {
  var mapContext = useContext(MapContext);
  var layerRef = useRef(null);

  var _useState = useState(true),
      _useState2 = _slicedToArray(_useState, 2),
      showLayer = _useState2[0],
      setShowLayer = _useState2[1];

  var idPostfixRef = useRef(new Date().getTime());

  var componentCleanup = function componentCleanup() {
    if (mapContext.map.style && mapContext.map.getLayer("hillshading")) {
      mapContext.map.removeLayer("hillshading");
    }

    if (mapContext.map.style && mapContext.map.getSource("hillshading-source")) {
      mapContext.map.removeSource("hillshading-source");
    }
  };

  useEffect(function () {
    if (!mapContext.map) return;
    return function () {
      componentCleanup();
    };
  }, []);
  useEffect(function () {
    if (!mapContext.map) return; // cleanup fragments left in MapLibre-gl from previous component uses

    componentCleanup();
    mapContext.map.addSource("hillshading-source", {
      type: "raster-dem",
      url: "mapbox://mapbox.terrain-rgb"
    });
    mapContext.map.addLayer({
      id: "hillshading",
      source: "hillshading-source",
      type: "hillshade"
    });
    mapContext.map.setLayoutProperty("hillshading", "visibility", "visible");
    mapContext.map.setZoom(10); //mapContext.map.setPitch(45);
  }, [mapContext.map]);
  useEffect(function () {
    if (!mapContext.map) return; // toggle layer visibility by changing the layout object's visibility property

    if (showLayer) {
      mapContext.map.setLayoutProperty("hillshading", "visibility", "visible");
    } else {
      mapContext.map.setLayoutProperty("hillshading", "visibility", "none");
    } //

  }, [showLayer, mapContext]);
  return /*#__PURE__*/React.createElement(Button, {
    color: "primary",
    variant: showLayer ? "contained" : "outlined",
    onClick: function onClick() {
      return setShowLayer(!showLayer);
    }
  }, "Hillshade");
};

var MlImageMarkerLayer = function MlImageMarkerLayer(props) {
  // Use a useRef hook to reference the layer object to be able to access it later inside useEffect hooks
  var mapContext = useContext(MapContext);
  var layerInitializedRef = useRef(false);
  var idPostfixRef = useRef(props.idSuffix || new Date().getTime());
  var imageIdRef = useRef(props.imageId || "img_" + new Date().getTime());
  var layerId = (props.layerId || "MlImageMarkerLayer-") + idPostfixRef.current;
  useEffect(function () {
    return function () {
      if (mapContext.getMap(props.mapId)) {
        // This is the cleanup function, it is called when this react component is removed from react-dom
        if (mapContext.getMap(props.mapId).style && mapContext.getMap(props.mapId).getLayer(layerId)) {
          mapContext.getMap(props.mapId).removeLayer(layerId);
        }

        if (mapContext.getMap(props.mapId).style && mapContext.getMap(props.mapId).getSource(layerId)) {
          mapContext.getMap(props.mapId).removeSource(layerId);
        }
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
  }, [props.options, layerId, mapContext, props.mapId]);
  var addLayer = useCallback(function () {
    var tmpOptions = _objectSpread2({
      id: layerId
    }, props.options);

    tmpOptions.layout["icon-image"] = imageIdRef.current;
    mapContext.getMap(props.mapId).addLayer(tmpOptions);
  }, [mapContext, props.options, props, imageIdRef, layerId]);
  useEffect(function () {
    if (!mapContext.mapExists(props.mapId) || !mapContext.getMap(props.mapId).getSource(layerId)) {
      return;
    } // the MapLibre-gl instance (mapContext.map) is accessible here
    // initialize the layer and add it to the MapLibre-gl instance or do something else with it


    mapContext.getMap(props.mapId).getSource(layerId).setData(props.geojson);
  }, [props.geojson, layerId, mapContext, props]);
  useEffect(function () {
    if (!props.options || !mapContext.mapExists(props.mapId) || layerInitializedRef.current) return; // the MapLibre-gl instance (mapContext.map) is accessible here
    // initialize the layer and add it to the MapLibre-gl instance or do something else with it

    if (!mapContext.getMap(props.mapId).getLayer(layerId)) {
      layerInitializedRef.current = true;

      if (!mapContext.getMap(props.mapId).hasImage(imageIdRef.current)) {
        mapContext.getMap(props.mapId).loadImage(props.imgSrc, function (error, image) {
          if (error) throw error;
          mapContext.getMap(props.mapId).addImage(imageIdRef.current, image);
          addLayer();
        });
      } else {
        addLayer();
      }
    }
  }, [mapContext.mapIds, mapContext, props, layerId, addLayer]);
  return /*#__PURE__*/React.createElement(React.Fragment, null);
};

var DeckGlContext = /*#__PURE__*/React.createContext({});
var DeckGlContextProvider = DeckGlContext.Provider;

var useStyles = makeStyles(function (theme) {
  return {
    root: {
      flexGrow: 1,
      zIndex: 120,
      position: "absolute",
      top: 0,
      left: 0,
      right: 0
    },
    AppBar: {
      backgroundColor: "#fafafa",
      minHeight: "62px"
    }
  };
});
function TopToolbar(props) {
  var classes = useStyles();
  return /*#__PURE__*/React.createElement("div", {
    className: classes.root
  }, /*#__PURE__*/React.createElement(AppBar, {
    className: classes.AppBar,
    position: "static"
  }, /*#__PURE__*/React.createElement(Toolbar, null, props.children)));
}

function ValueLabelComponent(props) {
  var children = props.children,
      open = props.open,
      value = props.value;
  return /*#__PURE__*/React.createElement(Tooltip, {
    open: open,
    enterTouchDelay: 0,
    placement: "top",
    title: value
  }, children);
}

var getColorRange = function getColorRange(layerOpacity) {
  return [[1, 152, 189, Math.round(80 * layerOpacity)], [73, 227, 206, Math.round(90 * layerOpacity)], [216, 254, 181, Math.round(100 * layerOpacity)], [254, 237, 177, Math.round(110 * layerOpacity)], [254, 173, 84, Math.round(120 * layerOpacity)], [209, 55, 78, Math.round(150 * layerOpacity)]];
};

var MlLaermkarte = function MlLaermkarte(props) {
  // Use a useRef hook to reference the layer object to be able to access it later inside useEffect hooks
  // without the requirement of adding it to the dependency list (ignore the false eslint exhaustive deps warning)
  var initializedRef = useRef(false);
  var mapContext = useContext(MapContext);
  var deckGlContext = useContext(DeckGlContext);
  var simpleDataContext = useContext(SimpleDataContext);
  var layerName = "deckgl-layer";

  var _useState = useState(0.8),
      _useState2 = _slicedToArray(_useState, 2),
      layerOpacity = _useState2[0],
      setLayerOpacity = _useState2[1];

  var _useState3 = useState(16),
      _useState4 = _slicedToArray(_useState3, 2),
      radius = _useState4[0],
      setRadius = _useState4[1];

  var _useState5 = useState(0.3),
      _useState6 = _slicedToArray(_useState5, 2),
      elevationScale = _useState6[0],
      setElevationScale = _useState6[1];

  var deckLayerProps = useMemo(function () {
    return {
      id: layerName,
      onClick: function onClick(obj) {
        console.log(obj); //mapContext.map.zoomIn();
        //mapContext.map.panTo(obj.coordinate);
        //setRadius(radius - 5);
      },
      data: simpleDataContext.data ? simpleDataContext.data.features : [],
      type: HexagonLayer,
      colorRange: getColorRange(layerOpacity),
      coverage: 0.9,
      elevationRange: [30, 75],
      elevationScale: elevationScale,
      extruded: true,
      autoHighlight: true,
      getPosition: function getPosition(d) {
        return d.geometry.coordinates;
      },
      pickable: true,
      radius: radius,
      upperPercentile: 100,
      material: {
        ambient: 0.8,
        diffuse: 0.5,
        shininess: 20,
        specularColor: [51, 51, 51]
      },
      transitions: {
        elevationScale: 1500
      },
      getColorValue: function getColorValue(points) {
        var elVal = points.reduce(function (acc, point) {
          if (!point.properties && point.source.properties) return acc < point.source.properties.dba ? point.source.properties.dba : acc;
          return acc < point.properties.dba ? point.properties.dba : acc;
        }, -Infinity);
        return Math.round(elVal);
      },
      getElevationValue: function getElevationValue(points) {
        var elVal = points.reduce(function (acc, point) {
          if (!point.properties && point.source.properties) return acc < point.source.properties.dba ? point.source.properties.dba : acc;
          return acc < point.properties.dba ? point.properties.dba : acc;
        }, -Infinity);
        return Math.round(elVal);
      }
    };
  }, [radius, layerOpacity, simpleDataContext.data, elevationScale]);
  useEffect(function () {
    if (!deckGlContext.deckGl) return;
    console.log("update props");
    deckGlContext.deckGl.setProps({
      layers: [new HexagonLayer(_objectSpread2({}, deckLayerProps))]
    });
  }, [radius, layerOpacity, elevationScale]);
  useEffect(function () {
    if (typeof props.init === "function") {
      props.init();
    }

    if (!mapContext.mapExists(props.mapId)) return;
    return function () {
      if (deckGlContext.deckGl) {
        deckGlContext.deckGl.setProps({
          layers: []
        });
        initializedRef.current = false;
      }
    };
  }, []);
  useEffect(function () {
    if (!simpleDataContext.data || !mapContext.mapExists() || !deckGlContext.deckGl || deckGlContext.deckGl && mapContext.mapExists() && simpleDataContext.data && initializedRef.current) return;
    initializedRef.current = true; // for debugging

    window.DeckGlMapLibreLayer = deckGlContext.maplibreLayer;
    deckGlContext.deckGl.setProps({
      layers: [new HexagonLayer(_objectSpread2(_objectSpread2({}, deckLayerProps), {}, {
        data: simpleDataContext.data.features,
        radius: radius
      }))]
    });

    if (typeof props.onDone === "function") {
      console.log("hide overlay");
      props.onDone();
    }
  }, [mapContext.mapIds, mapContext, deckGlContext.deckGl, deckGlContext.maplibreLayer, deckLayerProps, radius, setRadius, simpleDataContext.data]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TopToolbar, {
    style: {
      alignItems: "flex-end"
    }
  }, /*#__PURE__*/React.createElement(Typography, {
    id: "discrete-slider",
    style: {
      color: "#121212",
      marginRight: "5px"
    }
  }, "Radius"), /*#__PURE__*/React.createElement(Slider, {
    value: radius,
    onChange: function onChange(ev, value) {
      setRadius(value);
    },
    getAriaValueText: function getAriaValueText(value) {
      return value;
    },
    "aria-labelledby": "discrete-slider",
    valueLabelDisplay: "auto",
    ValueLabelComponent: ValueLabelComponent,
    step: 5,
    marks: true,
    min: 10,
    max: 70,
    style: {
      marginRight: "10px",
      maxWidth: "200px"
    }
  }), /*#__PURE__*/React.createElement(Typography, {
    id: "discrete-slider",
    style: {
      color: "#121212",
      marginRight: "5px"
    }
  }, "Deckkraft"), /*#__PURE__*/React.createElement(Slider, {
    value: layerOpacity,
    onChange: function onChange(ev, value) {
      setLayerOpacity(value);
    },
    getAriaValueText: function getAriaValueText(value) {
      return value;
    },
    "aria-labelledby": "discrete-slider",
    valueLabelDisplay: "auto",
    ValueLabelComponent: ValueLabelComponent,
    step: 0.02,
    marks: true,
    min: 0.01,
    max: 1.0,
    style: {
      marginRight: "10px",
      maxWidth: "200px"
    }
  }), /*#__PURE__*/React.createElement(Typography, {
    id: "discrete-slider",
    style: {
      color: "#121212",
      marginRight: "5px"
    }
  }, "H\xF6he"), /*#__PURE__*/React.createElement(Slider, {
    value: elevationScale,
    onChange: function onChange(ev, value) {
      setElevationScale(value);
    },
    getAriaValueText: function getAriaValueText(value) {
      return value;
    },
    "aria-labelledby": "discrete-slider",
    valueLabelDisplay: "auto",
    ValueLabelComponent: ValueLabelComponent,
    step: 0.1,
    marks: true,
    min: 0,
    max: 4.0,
    style: {
      marginRight: "10px",
      maxWidth: "200px"
    }
  })));
};

var MlLayer = function MlLayer(props) {
  // Use a useRef hook to reference the layer object to be able to access it later inside useEffect hooks
  var mapContext = useContext(MapContext);
  var layerInitializedRef = useRef(false);
  var idPostfixRef = useRef(props.idSuffix || new Date().getTime());
  var layerId = (props.layerId || "MlLayer-") + idPostfixRef.current;
  useEffect(function () {
    return function () {
      if (mapContext.getMap(props.mapId)) {
        // This is the cleanup function, it is called when this react component is removed from react-dom
        if (mapContext.getMap(props.mapId).style && mapContext.getMap(props.mapId).getLayer(layerId)) {
          mapContext.getMap(props.mapId).removeLayer(layerId);
        }

        if (mapContext.getMap(props.mapId).style && mapContext.getMap(props.mapId).getSource(layerId)) {
          mapContext.getMap(props.mapId).removeSource(layerId);
        }
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

    console.log(props.options);

    if (!mapContext.getMap(props.mapId).getLayer(layerId)) {
      layerInitializedRef.current = true;
      console.log(layerId);
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

var MlOsmLayer = function MlOsmLayer() {
  var mapContext = useContext(MapContext);

  var _useState = useState(true),
      _useState2 = _slicedToArray(_useState, 2),
      showLayer = _useState2[0],
      setShowLayer = _useState2[1];

  var idPostfixRef = useRef(new Date().getTime());
  useEffect(function () {
    if (!mapContext.map) return;
    return function () {
      if (mapContext.map.style && mapContext.map.getLayer("raster-tile-layer-" + idPostfixRef.current)) {
        mapContext.map.removeLayer("raster-tile-layer-" + idPostfixRef.current);
      }

      if (mapContext.map.style && mapContext.map.getSource("raster-tile-source-" + idPostfixRef.current)) {
        mapContext.map.removeSource("raster-tile-source-" + idPostfixRef.current);
      }
    };
  }, []);
  useEffect(function () {
    if (!mapContext.map) return; // Add the new layer to the openlayers instance once it is available
    //mapContext.map.addSource("vector-tile-source-" + idPostfixRef.current, {
    //  type: "vector",
    //  style: "https://wms.wheregroup.com/tileserver/style/osm-bright.json",
    //  tileSize: 512,
    //  attribution: "",
    //});

    mapContext.map.addSource("raster-tile-source-" + idPostfixRef.current, {
      type: "raster",
      tiles: ["https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg"],
      tileSize: 256,
      attribution: 'Map tiles by <a target="_top" rel="noopener" href="http://stamen.com">Stamen Design</a>, under <a target="_top" rel="noopener" href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a target="_top" rel="noopener" href="http://openstreetmap.org">OpenStreetMap</a>, under <a target="_top" rel="noopener" href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>'
    });
    mapContext.map.addLayer({
      id: "raster-tile-layer-" + idPostfixRef.current,
      type: "raster",
      source: "raster-tile-source-" + idPostfixRef.current,
      minzoom: 0,
      maxzoom: 22
    });
  }, [mapContext.map]);
  useEffect(function () {
    if (!mapContext.map) return; // toggle layer visibility by changing the layout object's visibility property

    if (showLayer) {
      mapContext.map.setLayoutProperty("raster-tile-layer-" + idPostfixRef.current, "visibility", "visible");
    } else {
      mapContext.map.setLayoutProperty("raster-tile-layer-" + idPostfixRef.current, "visibility", "none");
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

  var cleanup = function cleanup() {
    for (var key in layerIdsRef.current) {
      if (mapContext.map.style && mapContext.map.getLayer(layerIdsRef.current[key])) {
        mapContext.map.removeLayer(layerIdsRef.current[key]);
      }
    }

    if (mapContext.map.style && mapContext.map.getSource(sourceName + idPostfixRef.current)) {
      mapContext.map.removeSource(sourceName + idPostfixRef.current);
    }
  };

  useEffect(function () {
    if (!mapContext.map) return;
    return function () {
      cleanup();
    };
  }, []);
  useEffect(function () {
    if (!mapContext.map) return;
    cleanup(); // Add the new layer to the openlayers instance once it is available

    mapContext.map.addSource(sourceName + idPostfixRef.current, {
      type: "vector",
      tiles: [props.url],
      tileSize: 512,
      attribution: "" //...props.sourceOptions,

    });

    for (var key in props.layers) {
      var layerId = layerName + "_" + key + "_" + idPostfixRef.current;
      layerIdsRef.current[key] = layerId;
      mapContext.map.addLayer(_objectSpread2({
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
  }, [mapContext.map]);
  useEffect(function () {
    if (!mapContext.mapExists(props.mapId)) return; // the MapLibre-gl instance (mapContext.map) is accessible here
    // initialize the layer and add it to the MapLibre-gl instance or do something else with it

    for (var key in props.layers) {
      if (mapContext.map.getLayer(layerIdsRef.current[key])) {
        for (var paintKey in props.layers[key].paint) {
          console.log(props.layers[key].paint[paintKey]);
          mapContext.getMap(props.mapId).setPaintProperty(layerIdsRef.current[key], paintKey, props.layers[key].paint[paintKey]);
        }
      }
    }
  }, [props.layers]);
  useEffect(function () {
    if (!mapContext.map) return; // toggle layer visibility by changing the layout object's visibility property

    if (showLayer) {
      mapContext.map.setLayoutProperty(layerName + idPostfixRef.current, "visibility", "visible");
    } else {
      mapContext.map.setLayoutProperty(layerName + idPostfixRef.current, "visibility", "none");
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

  var cleanup = function cleanup() {
    if (mapContext.map.style && mapContext.map.getLayer("raster-tile-layer-" + idPostfixRef.current)) {
      mapContext.map.removeLayer("raster-tile-layer-" + idPostfixRef.current);
    }

    if (mapContext.map.style && mapContext.map.getSource("raster-tile-source-" + idPostfixRef.current)) {
      mapContext.map.removeSource("raster-tile-source-" + idPostfixRef.current);
    }
  };

  useEffect(function () {
    if (!mapContext.map) return;
    return function () {
      cleanup();
    };
  }, []);
  useEffect(function () {
    if (!mapContext.map) return;
    cleanup(); // Add the new layer to the openlayers instance once it is available

    mapContext.map.addSource("raster-tile-source-" + idPostfixRef.current, {
      type: "raster",
      tiles: [props.url + "?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&width=256&height=256&layers=" + props.layer],
      tileSize: 256,
      attribution: "" //...props.sourceOptions,

    });
    mapContext.map.addLayer(_objectSpread2({
      id: "raster-tile-layer-" + idPostfixRef.current,
      type: "raster",
      source: "raster-tile-source-" + idPostfixRef.current,
      minzoom: 0,
      maxzoom: 10
    }, props.sourceOptions), props.belowLayerId);
  }, [mapContext.map]);
  useEffect(function () {
    if (!mapContext.map) return; // toggle layer visibility by changing the layout object's visibility property

    if (showLayer) {
      mapContext.map.setLayoutProperty("raster-tile-layer-" + idPostfixRef.current, "visibility", "visible");
    } else {
      mapContext.map.setLayoutProperty("raster-tile-layer-" + idPostfixRef.current, "visibility", "none");
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

/**
 * MlWmsLayerMulti returns a Button that will add a standard OSM tile layer to the maplibre-gl instance.
 */

var MlWmsLayerMulti = function MlWmsLayerMulti(props) {
  var mapContext = useContext(MapContext);

  var _useState = useState(true),
      _useState2 = _slicedToArray(_useState, 2),
      showLayer = _useState2[0],
      setShowLayer = _useState2[1];

  var idPostfixRef = useRef(new Date().getTime());

  var mapExists = function mapExists() {
    if (!props.mapId) {
      return false;
    }

    if (mapContext.mapIds.indexOf(props.mapId) === -1) {
      return false;
    }

    return true;
  };

  var cleanup = function cleanup() {
    if (mapExists()) {
      if (mapContext.maps[props.mapId].style && mapContext.maps[props.mapId].getLayer("raster-tile-layer-" + idPostfixRef.current)) {
        mapContext.maps[props.mapId].removeLayer("raster-tile-layer-" + idPostfixRef.current);
      }

      if (mapContext.maps[props.mapId].style && mapContext.maps[props.mapId].getSource("raster-tile-source-" + idPostfixRef.current)) {
        mapContext.maps[props.mapId].removeSource("raster-tile-source-" + idPostfixRef.current);
      }
    }
  };

  useEffect(function () {
    if (!mapExists()) return;
    return function () {
      cleanup();
    };
  }, []);
  useEffect(function () {
    console.log(mapContext);
    if (!mapExists()) return;
    cleanup();
    console.log("HALLO"); // Add the new layer to the openlayers instance once it is available

    mapContext.maps[props.mapId].addSource("raster-tile-source-" + idPostfixRef.current, {
      type: "raster",
      tiles: [props.url + "?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&width=256&height=256&layers=" + props.layer],
      tileSize: 256,
      attribution: "" //...props.sourceOptions,

    });
    mapContext.maps[props.mapId].addLayer(_objectSpread2({
      id: "raster-tile-layer-" + idPostfixRef.current,
      type: "raster",
      source: "raster-tile-source-" + idPostfixRef.current,
      minzoom: 0,
      maxzoom: 10
    }, props.sourceOptions));
    console.log("WMS Layer added to " + props.mapId);
  }, [mapContext.mapIds]);
  useEffect(function () {
    if (!mapExists()) return; // toggle layer visibility by changing the layout object's visibility property

    if (showLayer) {
      mapContext.maps[props.mapId].setLayoutProperty("raster-tile-layer-" + idPostfixRef.current, "visibility", "visible");
    } else {
      mapContext.maps[props.mapId].setLayoutProperty("raster-tile-layer-" + idPostfixRef.current, "visibility", "none");
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

export { MapLibreMap, MlCameraFollowPath, MlComponentTemplate, MlCompositeLayer, MlCreatePdfButton, MlGeoJsonLayer, MlHillshadeLayer, MlImageMarkerLayer, MlLaermkarte, MlLayer, MlOsmLayer, MlVectorTileLayer, MlWmsLayer, MlWmsLayerMulti };
//# sourceMappingURL=index.esm.js.map

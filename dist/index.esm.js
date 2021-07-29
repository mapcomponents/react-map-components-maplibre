import React, { useRef, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { MapContext, SimpleDataContext } from 'react-map-components-core';
import maplibregl, { Popup } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import Button from '@material-ui/core/Button';
import { distance, center, lineDistance, lineString, along, bearing, point, length, lineChunk, bbox, lineOffset } from '@turf/turf';
import jsPDF from 'jspdf';
import PrinterIcon from '@material-ui/icons/Print';
import { csv } from 'd3';
import { AmbientLight, PointLight, LightingEffect } from '@deck.gl/core';
import { HexagonLayer } from '@deck.gl/aggregation-layers';
import { MapboxLayer } from '@deck.gl/mapbox';
import { TerrainLayer } from '@deck.gl/geo-layers';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import FileCopy from '@material-ui/icons/FileCopy';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import '@deck.gl/layers';
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import { isVertex as isVertex$1, isEscapeKey, isEnterKey, noTarget, isOfMetaType, isFeature, isShiftDown, isActiveFeature, isShiftMousedown, isInactiveFeature } from '@mapbox/mapbox-gl-draw/src/lib/common_selectors';
import doubleClickZoom from '@mapbox/mapbox-gl-draw/src/lib/double_click_zoom';
import { geojsonTypes, cursors, types, events, activeStates, meta, updateActions, classes } from '@mapbox/mapbox-gl-draw/src/constants';
import isEventAtCoordinates from '@mapbox/mapbox-gl-draw/src/lib/is_event_at_coordinates';
import createVertex from '@mapbox/mapbox-gl-draw/src/lib/create_vertex';
import mouseEventPoint from '@mapbox/mapbox-gl-draw/src/lib/mouse_event_point';
import createSupplementaryPoints from '@mapbox/mapbox-gl-draw/src/lib/create_supplementary_points';
import StringSet from '@mapbox/mapbox-gl-draw/src/lib/string_set';
import constrainFeatureMovement from '@mapbox/mapbox-gl-draw/src/lib/constrain_feature_movement';
import moveFeatures from '@mapbox/mapbox-gl-draw/src/lib/move_features';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import { polygon, lineString as lineString$1 } from '@turf/helpers';
import { Camera, Scene, DirectionalLight, WebGLRenderer, Matrix4, Vector3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

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
    if (mapContext.map.getLayer("raster-tile-layer-" + idPostfixRef.current)) {
      mapContext.map.removeLayer("raster-tile-layer-" + idPostfixRef.current);
    }

    if (mapContext.map.getSource("raster-tile-source-" + idPostfixRef.current)) {
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

var MlAerialPhotograph = function MlAerialPhotograph() {
  var mapContext = useContext(MapContext);

  var _useState = useState({
    name: "",
    class: "",
    x: "",
    y: "",
    z: ""
  }),
      _useState2 = _slicedToArray(_useState, 2),
      legendData = _useState2[0],
      setLegendData = _useState2[1];

  useEffect(function () {
    if (!mapContext.map) return;
    mapContext.map.transform._maxZoom = 19.99;
    mapContext.map.addLayer({
      id: "mapData",
      source: "openmaptiles",
      "source-layer": "water",
      type: "fill",
      paint: {
        "fill-opacity": 0
      }
    });
    mapContext.map.addLayer({
      id: "greenData",
      source: "openmaptiles",
      "source-layer": "landcover",
      type: "fill",
      paint: {
        "fill-opacity": 0
      }
    });
    mapContext.map.addLayer({
      id: "placeData",
      source: "openmaptiles",
      "source-layer": "poi",
      type: "circle",
      filter: ["has", "name"],
      paint: {
        "circle-opacity": 0,
        "circle-radius": {
          stops: [[0, 0], [20, 500]],
          base: 2
        }
      }
    });
    mapContext.map.addLayer({
      id: "riverData",
      source: "openmaptiles",
      type: "line",
      "source-layer": "waterway",
      filter: ["==", "class", "river"],
      paint: {
        "line-opacity": 0,
        "line-width": 150
      }
    });
    mapContext.map.on("mousemove", function (e) {
      var features = mapContext.map.queryRenderedFeatures(e.point, {
        layers: ["mapData", "greenData", "placeData", "riverData"]
      }); //let bigFeatures = mapContext.map.queryRenderedFeatures(e.point, {layers: ["cityData"]})
      //let cityName = bigFeatures.find(element => element.properties.class === "city") || {properties: {name: ""}}

      var closestFeature = getClosestFeature(features, Object.values(e.point));

      if (features[0]) {
        setLegendData({
          name: closestFeature.properties.name,
          class: closestFeature.properties.class,
          x: closestFeature._vectorTileFeature._x,
          y: closestFeature._vectorTileFeature._y,
          z: closestFeature._vectorTileFeature._z
        });
      }
    });
  }, [mapContext.map]);

  function getClosestFeature(featureCollection, mousePoint, identifier) {
    identifier = identifier || true;
    var closestFeature = featureCollection[0];

    for (var i in featureCollection) {
      if (featureCollection[i].layer["source-layer"] === identifier) {
        if (distance(center(featureCollection[i]), mousePoint) > distance(center(closestFeature), mousePoint)) {
          closestFeature = featureCollection[i];
        }
      }
    }

    return closestFeature;
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(MlWmsLayer, {
    url: "https://www.wms.nrw.de/geobasis/wms_nw_dop",
    layer: "nw_dop_rgb",
    sourceOptions: {
      maxzoom: 20
    },
    belowLayerId: "waterway-name"
  }), /*#__PURE__*/React.createElement("hr", {
    style: {
      width: "100%",
      color: "black",
      padding: "none",
      height: "3px"
    }
  }), /*#__PURE__*/React.createElement("ul", {
    style: {
      "paddingLeft": 0
    }
  }, Object.keys(legendData).map(function (key) {
    return /*#__PURE__*/React.createElement("li", null, " ", "".concat(key, ": ").concat(legendData[key] || ""), " ");
  })));
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
    if (mapContext.map.getLayer(layerName)) {
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

var DATA_URL = "/assets/verspaetungen_gueterverkehr_2016.csv"; // eslint-disable-line
//"https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/3d-heatmap/heatmap-data.csv"; // eslint-disable-line

var ambientLight = new AmbientLight({
  color: [255, 255, 255],
  intensity: 1.0
});
var pointLight1 = new PointLight({
  color: [255, 255, 255],
  intensity: 0.8,
  position: [-0.144528, 49.739968, 80000]
});
var pointLight2 = new PointLight({
  color: [255, 255, 255],
  intensity: 0.8,
  position: [-3.807751, 54.104682, 8000]
});
var lightingEffect = new LightingEffect({
  ambientLight: ambientLight,
  pointLight1: pointLight1,
  pointLight2: pointLight2
});
var material = {
  ambient: 0.64,
  diffuse: 0.6,
  shininess: 32,
  specularColor: [51, 51, 51]
};
var colorRange = [[1, 152, 189], [73, 227, 206], [216, 254, 181], [254, 237, 177], [254, 173, 84], [209, 55, 78]];
/**
 * MlDeckGlLayer adds deck.gl hexagonlayer to the maplibre-gl instance.
 */

var MlDeckGlLayer = function MlDeckGlLayer(_ref) {
  var init = _ref.init,
      onDone = _ref.onDone;
  var mapContext = useContext(MapContext);

  var _useState = useState(true),
      _useState2 = _slicedToArray(_useState, 2),
      showLayer = _useState2[0],
      setShowLayer = _useState2[1];

  var layerName = "deckgl-layer";
  var initializedRef = useRef(false);
  useEffect(function () {
    if (typeof init === "function") {
      init();
    }

    return function () {
      if (mapContext.mapExists() && mapContext.getMap().getLayer(layerName)) {
        mapContext.getMap().removeLayer(layerName);
      }
    };
  }, []);

  var mapIsReady = function mapIsReady(map) {
    if (initializedRef.current) return;
    initializedRef.current = true;
    console.log("load heatmap data");
    csv(DATA_URL).then(function (response) {
      var data = response.map(function (d) {
        return {
          coordinates: [Number(d.LON), Number(d.LAT)],
          minutes: d.Verspätungsminuten
        };
      });
      console.log("Add deckgl Layer");
      var mapBoxLayer = new MapboxLayer({
        effects: [lightingEffect],
        id: layerName,
        //type: ScatterplotLayer,
        //data: [
        //  { position: [7.0851268, 50.73884], color: [255, 0, 0], radius: 1000 },
        //],
        //getPosition: (d) => d.position,
        //getColor: (d) => d.color,
        //getRadius: (d) => d.radius,
        //opacity: 0.3,
        type: HexagonLayer,
        colorRange: colorRange,
        coverage: 1,
        data: data,
        elevationRange: [0, 3000],
        elevationScale: data && data.length ? 50 : 0,
        extruded: true,
        getPosition: function getPosition(d) {
          return d.coordinates;
        },
        pickable: true,
        radius: 10000,
        upperPercentile: 100,
        material: material,
        autoHighlight: true,
        transitions: {
          elevationScale: 3000
        }
      });
      window.mapBoxLayer = mapBoxLayer;
      map.addLayer(mapBoxLayer, "water-name-lakeline");

      if (typeof onDone === "function") {
        console.log("hide overlay");
        onDone();
      }
    });
    map.setZoom(6);
    map.setPitch(45);
    map.setCenter({
      lng: 10.388616936080325,
      lat: 50.98176525739561
    });
  };

  useEffect(function () {
    if (!mapContext.map) return; // toggle layer visibility by changing the layout object's visibility property

    if (showLayer) {
      mapContext.map.setLayoutProperty(layerName, "visibility", "visible");
    } else {
      mapContext.map.setLayoutProperty(layerName, "visibility", "none");
    }
  }, [showLayer]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(MlBasicComponent, {
    mapIsReady: mapIsReady
  }), /*#__PURE__*/React.createElement(Button, {
    color: "primary",
    variant: showLayer ? "contained" : "outlined",
    onClick: function onClick() {
      return setShowLayer(!showLayer);
    }
  }, "DB Versp\xE4tungen im G\xFCterverkehr 2016 (deck.gl)"));
};

/**
 * MlDeckGlTerrainLayer adds kepler.gl layer to the maplibre-gl instance.
 */

var MlDeckGlTerrainLayer = function MlDeckGlTerrainLayer() {
  var mapContext = useContext(MapContext);

  var _useState = useState(true),
      _useState2 = _slicedToArray(_useState, 2),
      showLayer = _useState2[0],
      setShowLayer = _useState2[1];

  var showLayerRef = useRef(true);
  var layerName = "deckgl-terrain-layer";
  var ELEVATION_DECODER = {
    rScaler: 6553.6,
    gScaler: 25.6,
    bScaler: 0.1,
    offset: -10000
  };
  var TERRAIN_IMAGE = "https://api.mapbox.com/v4/mapbox.terrain-rgb/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWF4dG9iaSIsImEiOiJjaW1rcWQ5bWMwMDJvd2hrbWZ2ZTBhcnM5In0.NcGt5NmLP5Q1WC7P5u6qUA";
  var SURFACE_IMAGE = "https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1IjoibWF4dG9iaSIsImEiOiJjaW1rcWQ5bWMwMDJvd2hrbWZ2ZTBhcnM5In0.NcGt5NmLP5Q1WC7P5u6qUA";
  var rotateCamera = useCallback(function (timestamp) {
    if (mapContext.map) {
      // clamp the rotation between 0 -360 degrees
      // Divide timestamp by 100 to slow rotation to ~10 degrees / sec
      mapContext.map.rotateTo(timestamp / 100 % 360, {
        duration: 0
      }); // Request the next frame of the animation.

      console.log(showLayer);

      if (showLayerRef.current) {
        requestAnimationFrame(rotateCamera);
      }
    }
  }, [showLayerRef, mapContext.map]);

  var cleanup = function cleanup(map) {
    if (map.getLayer(layerName)) {
      map.removeLayer(layerName);
    }
  };

  var mapIsReady = function mapIsReady(map) {
    map.addLayer(new MapboxLayer({
      id: layerName,
      type: TerrainLayer,
      minZoom: 0,
      maxZoom: 23,
      strategy: "no-overlap",
      elevationDecoder: ELEVATION_DECODER,
      elevationData: TERRAIN_IMAGE,
      texture: SURFACE_IMAGE,
      wireframe: false,
      color: [255, 255, 255]
    }), "water-name-lakeline"); //    setTimeout(() => {
    //      map.setZoom(13);
    //      map.setPitch(45);
    //      map.setCenter({ lng: 11.647776401389137, lat: 46.48726512556033 });
    //      rotateCamera(0);
    //    }, 500);
  };

  useEffect(function () {
    if (!mapContext.map) return; // toggle layer visibility by changing the layout object's visibility property

    if (showLayer) {
      showLayerRef.current = true;
      mapContext.map.setLayoutProperty(layerName, "visibility", "visible");
      rotateCamera(0);
    } else {
      showLayerRef.current = false;
      mapContext.map.setLayoutProperty(layerName, "visibility", "none");
    }
  }, [showLayer]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(MlBasicComponent, {
    cleanup: cleanup,
    mapIsReady: mapIsReady
  }), /*#__PURE__*/React.createElement(Button, {
    color: "primary",
    variant: showLayer ? "contained" : "outlined",
    onClick: function onClick() {
      return setShowLayer(!showLayer);
    }
  }, "Terrain Layer"));
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
      if (mapObject && mapObject.getLayer(layerSourceId)) {
        mapObject.removeLayer(layerSourceId);
      }

      if (mapObject && mapObject.getSource(layerSourceId)) {
        mapObject.removeSource(layerSourceId);
      }
    };
  }, []);
  useEffect(function () {
    if (!mapContext.mapExists(props.mapId) || !mapContext.getMap(props.mapId).getLayer(layerId + idPostfixRef.current)) return; // the MapLibre-gl instance (mapContext.map) is accessible here
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

var GeoJsonContext = /*#__PURE__*/React.createContext({});
var GeoJsonContextProvider = GeoJsonContext.Provider;

var toGeoJSON = require("./gpxConverter");
/**
 * MlGPXViewer returns a dropzone and a button to load a GPX Track into the map.
 */


var MlGPXViewer = function MlGPXViewer(props) {
  console.log(GeoJsonContext);
  var dataSource = useContext(GeoJsonContext);
  console.log(dataSource);
  var mapContext = useContext(MapContext);
  var mapId = props.mapId;
  var sourceName = "import-source";
  var layerNameLines = "importer-layer-lines";
  var layerNamePoints = "importer-layer-points";

  var _useState = useState(true),
      _useState2 = _slicedToArray(_useState, 2),
      showLayer = _useState2[0],
      setShowLayer = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      open = _useState4[0],
      setIsOpen = _useState4[1];

  var dropZone = useRef(null);

  var _useState5 = useState(0),
      _useState6 = _slicedToArray(_useState5, 2),
      zIndex = _useState6[0],
      setZIndex = _useState6[1];

  var _useState7 = useState([]),
      _useState8 = _slicedToArray(_useState7, 2),
      metaData = _useState8[0],
      setMetaData = _useState8[1];

  var fileupload = useRef(null);
  var popup = new Popup({
    closeButton: false,
    closeOnClick: true
  });

  var componentCleanup = function componentCleanup() {
    var map = null;

    if (mapId) {
      map = mapContext.maps[mapId];
    } else {
      map = mapContext.map;
    }

    [layerNameLines, layerNamePoints].forEach(function (layerName) {
      if (map.getLayer(layerName)) {
        map.removeLayer(layerName);
      }
    });

    if (map.getSource(sourceName)) {
      map.removeSource(sourceName);
    }

    map.getCanvas().style.cursor = "";
    popup.remove();
  };

  useEffect(function () {
    if (!mapContext.map) return;
    return function () {
      componentCleanup();
    };
  }, []);
  useEffect(function () {
    if (!mapContext.map) return;
    var map = null;

    if (mapId) {
      map = mapContext.maps[mapId];
    } else {
      map = mapContext.map;
    } // cleanup fragments left in MapLibre-gl from previous component uses


    componentCleanup();
    map.addSource(sourceName, {
      type: "geojson",
      data: dataSource.data
    });
    map.addLayer({
      id: layerNameLines,
      source: sourceName,
      type: "line",
      paint: {
        "line-width": 4,
        "line-color": "rgba(212, 55, 23,0.5)"
      }
    });
    map.addLayer({
      id: layerNamePoints,
      source: sourceName,
      type: "circle",
      paint: {
        "circle-color": "rgba(72, 77, 99,0.5)",
        "circle-radius": 7
      },
      filter: ["==", "$type", "Point"]
    });
    [layerNameLines, layerNamePoints].forEach(function (layerName) {
      map.setLayoutProperty(layerName, "visibility", "visible");
    });
    map.on("mouseenter", layerNamePoints, function (e) {
      // Change the cursor style as a UI indicator.
      map.getCanvas().style.cursor = "pointer";
      var coordinates = e.features[0].geometry.coordinates.slice();
      var description = e.features[0].properties.desc;
      var name = e.features[0].properties.name; // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.

      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      } // Populate the popup and set its coordinates
      // based on the feature found.


      popup.setLngLat(coordinates).setHTML(name).addTo(map);
    });
    map.on("mouseleave", "places", function () {
      map.getCanvas().style.cursor = "";
      popup.remove();
    });
    map.setZoom(10);
  }, [mapContext.map]);
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
    if (!mapContext.map) return;
    var map = null;

    if (mapId) {
      map = mapContext.maps[mapId];
    } else {
      map = mapContext.map;
    }

    var visibility = showLayer ? "visible" : "none";
    [layerNameLines, layerNamePoints].forEach(function (layerName) {
      map.setLayoutProperty(layerName, "visibility", visibility);
    });
  }, [showLayer, mapContext]);

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
    var map = null;

    if (mapId) {
      map = mapContext.maps[mapId];
    } else {
      map = mapContext.map;
    }

    try {
      setMetaData([]);
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
      map.getSource(sourceName).setData(data);
      var bounds = bbox(data);
      map.fitBounds(bounds);
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
    if (mapContext.map.getLayer("hillshading")) {
      mapContext.map.removeLayer("hillshading");
    }

    if (mapContext.map.getSource("hillshading-source")) {
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
        if (mapContext.getMap(props.mapId).getLayer(layerId)) {
          mapContext.getMap(props.mapId).removeLayer(layerId);
        }

        if (mapContext.getMap(props.mapId).getSource(layerId)) {
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
        if (mapContext.getMap(props.mapId).getLayer(layerId)) {
          mapContext.getMap(props.mapId).removeLayer(layerId);
        }

        if (mapContext.getMap(props.mapId).getSource(layerId)) {
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

  if (isVertex$1(e)) {
    this.updateUIClasses({
      mouse: cursors.POINTER
    });
  }
};

CustomPolygonMode.onTap = CustomPolygonMode.onClick = function (state, e) {
  if (isVertex$1(e)) return this.clickOnVertex(state, e);
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

var move_features = function move_features(features, delta, allFeatures) {
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
      if (map._controls[i].constructor.name === "MapboxDraw" || map._controls[i].constructor.name === "ye") {
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

var isVertex = isOfMetaType(meta.VERTEX);
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
  var onVertex = isVertex(e);
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
  if (isVertex(e)) return this.onVertex(state, e);
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

function MlMapDrawTools() {
  var draw = useRef(null);
  var mapContext = useContext(MapContext);

  var _useState = useState(true),
      _useState2 = _slicedToArray(_useState, 2),
      firstLoad = _useState2[0],
      setFirstLoad = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      mouseUpTrigger = _useState4[0],
      setMouseUpTrigger = _useState4[1]; //const [groupCloseVertices, setGroupCloseVertices] = useState(false);


  var _useState5 = useState(null),
      _useState6 = _slicedToArray(_useState5, 2),
      storedMapFeatures = _useState6[0],
      setStoredMapFeatures = _useState6[1];

  var _useState7 = useState([]),
      _useState8 = _slicedToArray(_useState7, 2),
      drawnFeatures = _useState8[0],
      setDrawnFeatures = _useState8[1];

  var _useState9 = useState(true),
      _useState10 = _slicedToArray(_useState9, 2),
      drawModeActive = _useState10[0],
      setDrawModeActive = _useState10[1];

  var _useState11 = useState("custom_select"),
      _useState12 = _slicedToArray(_useState11, 2),
      currentDrawMode = _useState12[0],
      setCurrentDrawMode = _useState12[1];

  var _useState13 = useState(""),
      _useState14 = _slicedToArray(_useState13, 2),
      selectedFeatureId = _useState14[0],
      setSelectedFeatureId = _useState14[1];

  useEffect(function () {
    // retrieve stored features from localstorage
    var storedMapFeaturesStr = localStorage.getItem("storedMapFeatures");

    if (storedMapFeaturesStr) {
      var storedMapFeaturesObj = JSON.parse(storedMapFeaturesStr);
      setStoredMapFeatures(storedMapFeaturesObj);
      setDrawnFeatures(storedMapFeaturesObj.features);
    }
  }, []);
  useEffect(function () {
    if (mapContext.map && firstLoad) {
      setFirstLoad(false);

      if (mapContext.map.getSource("mapbox-gl-draw-cold") && window.MapboxDraw && typeof window.MapboxDraw.remove !== "undefined") {
        // remove old Mapbox-gl-Draw from Mapbox instance when hot-reloading this component during development
        window.MapboxDraw.remove();
      }

      window.MapLibreObj = mapContext.map;
      draw.current = new MapboxDraw({
        displayControlsDefault: false,
        defaultMode: "custom_select",
        modes: Object.assign({
          custom_polygon: CustomPolygonMode,
          custom_select: CustomSelectMode,
          custom_direct_select: DirectSelect
        }, MapboxDraw.modes)
      });
      mapContext.map.on("draw.modechange", function (e) {
        console.log("modechange");
        setCurrentDrawMode(e.mode);
      });
      window.MapboxDraw = draw.current; // sadly there is no featureAdd event available in MapLibre

      mapContext.map.addControl(draw.current, "top-left");
      mapContext.map.on("mouseup", function () {
        setMouseUpTrigger(Math.random());
      });

      if (storedMapFeatures) {
        draw.current.set(storedMapFeatures);
      }
    }
  }, [mapContext.map, drawnFeatures, firstLoad]);
  useEffect(function () {
    if (draw.current) {
      // update drawnFeatures state object
      var currentFeatureCollection = draw.current.getAll();

      if (currentDrawMode === "custom_polygon" || currentDrawMode === "custom_select") {
        setDrawnFeatures(_toConsumableArray(currentFeatureCollection.features));
        localStorage.setItem("storedMapFeatures", JSON.stringify(currentFeatureCollection));
      } // update selected feature


      var selectedFeature = draw.current.getSelected();

      for (var i = 0; i < drawnFeatures.length; i++) {
        if (typeof selectedFeature.features[0] !== "undefined" && selectedFeature.features[0].id === drawnFeatures[i].id) {
          setSelectedFeatureId(selectedFeature.features[0].id);
        }
      }
    }
  }, [mouseUpTrigger]);
  useEffect(function () {
    if (draw.current) {
      switch (currentDrawMode) {
        case "custom_polygon":
          draw.current.changeMode("custom_polygon");
          break;

        case "custom_select":
        default:
          draw.current.changeMode("custom_select");
          break;
      }
    }
  }, [currentDrawMode]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
    color: "primary",
    variant: drawModeActive ? "contained" : "outlined",
    onClick: function onClick() {
      return setDrawModeActive(!drawModeActive);
    },
    style: {}
  }, "Draw"), drawModeActive && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
    variant: currentDrawMode === "custom_select" || currentDrawMode === "custom_direct_select" ? "contained" : "outlined",
    onClick: function onClick() {
      return setCurrentDrawMode("custom_select");
    },
    style: {}
  }, "Select"), /*#__PURE__*/React.createElement(Button, {
    variant: currentDrawMode === "custom_polygon" ? "contained" : "outlined",
    onClick: function onClick() {
      return setCurrentDrawMode(currentDrawMode !== "custom_polygon" ? "custom_polygon" : "custom_select");
    },
    style: {}
  }, "Polygon"), /*#__PURE__*/React.createElement(Button, {
    variant: "contained",
    onClick: function onClick() {
      localStorage.setItem("storedMapFeatures", "");
      setStoredMapFeatures(null);
      setDrawnFeatures([]);
      draw.current.deleteAll();
    },
    style: {}
  }, /*#__PURE__*/React.createElement(DeleteIcon, null)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: "34px",
      top: "96px",
      backgroundColor: "#f8f9fa",
      borderRadius: "4px",
      width: "150px",
      height: "200px"
    }
  }, /*#__PURE__*/React.createElement(List, {
    dense: false
  }, drawnFeatures.map(function (feature, id) {
    return /*#__PURE__*/React.createElement(ListItem, {
      key: id,
      style: {
        color: "#000",
        backgroundColor: selectedFeatureId === feature.id ? "#00ffff" : "#fff"
      }
    }, /*#__PURE__*/React.createElement(ListItemText, {
      primary: feature.type,
      secondary: id
    }));
  })))));
}

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
      if (mapContext.map.getLayer("raster-tile-layer-" + idPostfixRef.current)) {
        mapContext.map.removeLayer("raster-tile-layer-" + idPostfixRef.current);
      }

      if (mapContext.map.getSource("raster-tile-source-" + idPostfixRef.current)) {
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
 * MlSpatialElevationProfile returns a Button that will add a standard OSM tile layer to the maplibre-gl instance.
 */

var MlSpatialElevationProfile = function MlSpatialElevationProfile(_ref) {
  var _ref$elevationFactor = _ref.elevationFactor,
      elevationFactor = _ref$elevationFactor === void 0 ? 1 : _ref$elevationFactor,
      _ref$mapId = _ref.mapId,
      mapId = _ref$mapId === void 0 ? null : _ref$mapId;
  var mapContext = useContext(MapContext);
  var dataSource = useContext(GeoJsonContext);
  var sourceName = "elevationprofile";
  var layerName = "elevationprofile-layer";
  console.log(elevationFactor);

  var createStep = function createStep(x, y, z, x2, y2) {
    var line = lineString$1([[x, y], [x2, y2]]);
    var offsetLine = lineOffset(line, 5, {
      units: 'meters'
    });
    var x3 = offsetLine.geometry.coordinates[0][0];
    var y3 = offsetLine.geometry.coordinates[0][1];
    var x4 = offsetLine.geometry.coordinates[1][0];
    var y4 = offsetLine.geometry.coordinates[1][1];
    return polygon([[[x, y], [x2, y2], [x4, y4], [x3, y3], [x, y]]], {
      height: z * elevationFactor
    });
  };

  var cleanUp = function cleanUp() {
    var map = mapContext.maps[mapId] || mapContext.map;
    [layerName].forEach(function (layerName) {
      if (map.getLayer(layerName)) {
        map.removeLayer(layerName);
      }
    });

    if (map.getSource(sourceName)) {
      map.removeSource(sourceName);
    }
  };

  useEffect(function () {
    var map = mapContext.maps[mapId] || mapContext.map;
    if (!map) return;
    map.addSource(sourceName, {
      type: "geojson",
      data: dataSource.data
    });
    map.addLayer({
      id: layerName,
      source: sourceName,
      type: "fill-extrusion",
      paint: {
        "fill-extrusion-height": ["get", "height"],
        "fill-extrusion-opacity": 0.9,
        "fill-extrusion-color": ["interpolate", ["linear"], ["get", "height"], 0, "rgba(0, 0, 255, 0)", 0.1, "royalblue", 0.3, "cyan", 0.5, "lime", 0.7, "yellow", 1, "yellow"]
      }
    });
    return cleanUp;
  }, [mapContext.map]);
  useEffect(function () {
    var _map$getSource;

    var map = mapContext.maps[mapId] || mapContext.map;
    if (!map) return;
    var data = dataSource.data;
    var line = data.features.find(function (element) {
      return element.geometry.type === "LineString";
    });
    var heights = line.geometry.coordinates.map(function (coordinate, index) {
      return coordinate[2];
    });
    var min = Math.min.apply(Math, _toConsumableArray(heights));
    var max = Math.max.apply(Math, _toConsumableArray(heights)) - min;
    max = max === 0 ? 1 : max;
    map.setPaintProperty(layerName, "fill-extrusion-color", ["interpolate", ["linear"], ["get", "height"], 0, "rgb(0,255,55)", max * elevationFactor, "rgb(255,0,0)"]);

    var lerp = function lerp(x, y, a) {
      return x * (1 - a) + y * a;
    };

    var points = [];
    line.geometry.coordinates.forEach(function (coordinate, index) {
      //const point = createPoint(coordinate[0],coordinate[1],coordinate[2]-min);
      //points.push(point);
      if (line.geometry.coordinates[index + 1]) {
        var wayLength = distance([coordinate[0], coordinate[1]], [line.geometry.coordinates[index + 1][0], line.geometry.coordinates[index + 1][1]], {
          units: "kilometers"
        });
        var listLength = ~~(wayLength * 1000 / 10);
        listLength = listLength < 1 ? 1 : listLength;

        for (var i = 0; i < listLength; i++) {
          var x = lerp(line.geometry.coordinates[index][0], line.geometry.coordinates[index + 1][0], i / listLength);
          var y = lerp(line.geometry.coordinates[index][1], line.geometry.coordinates[index + 1][1], i / listLength);
          var z = lerp(line.geometry.coordinates[index][2] - min, line.geometry.coordinates[index + 1][2] - min, i / listLength);
          var x2 = lerp(line.geometry.coordinates[index][0], line.geometry.coordinates[index + 1][0], (i + 1) / listLength);
          var y2 = lerp(line.geometry.coordinates[index][1], line.geometry.coordinates[index + 1][1], (i + 1) / listLength);
          var point = createStep(x, y, z, x2, y2);
          points.push(point);
        }
      }
    });
    var newData = dataSource.getEmptyFeatureCollection();
    newData.features = points;
    (_map$getSource = map.getSource(sourceName)) === null || _map$getSource === void 0 ? void 0 : _map$getSource.setData(newData);
  }, [dataSource.data]);
  return /*#__PURE__*/React.createElement(React.Fragment, null);
};

/**
 * MlThreeJsLayer returns a Button that will add a standard OSM tile layer to the maplibre-gl instance.
 */

var MlThreeJsLayer = function MlThreeJsLayer(_ref) {
  var init = _ref.init,
      onDone = _ref.onDone;
  var mapContext = useContext(MapContext);
  var layerRef = useRef(null);
  var layerName = "3d-model";

  var _useState = useState(true),
      _useState2 = _slicedToArray(_useState, 2),
      showLayer = _useState2[0],
      setShowLayer = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      play = _useState4[0],
      setPlay = _useState4[1];

  var showLayerRef = useRef(true);
  var idPostfixRef = useRef(new Date().getTime());

  var componentCleanup = function componentCleanup() {
    if (mapContext.map.getLayer(layerName)) {
      mapContext.map.removeLayer(layerName);
    }

    if (mapContext.map.getSource(layerName + "-source")) {
      mapContext.map.removeSource(layerName + "-source");
    }
  };

  var rotateCamera = useCallback(function (timestamp) {
    if (!play || !mapContext.map) return; // clamp the rotation between 0 -360 degrees
    // Divide timestamp by 100 to slow rotation to ~10 degrees / sec

    mapContext.map.rotateTo(timestamp / 100 % 360, {
      duration: 0
    }); // Request the next frame of the animation.

    if (showLayerRef.current && play) {
      requestAnimationFrame(rotateCamera);
    }
  }, [play]);
  useEffect(function () {
  }, [play]);
  useEffect(function () {
    if (typeof init === "function") {
      init();
    }

    if (!mapContext.map) return;
    return function () {
      componentCleanup();
    };
  }, []);
  useEffect(function () {
    if (!mapContext.map) return; // cleanup fragments left in MapLibre-gl from previous component uses

    componentCleanup(); // parameters to ensure the model is georeferenced correctly on the map

    var modelOrigin = [7.1300753566457304, 50.71596191210998];
    var modelAltitude = 0;
    var modelRotate = [Math.PI / 2, 90, 0];
    var modelAsMercatorCoordinate = maplibregl.MercatorCoordinate.fromLngLat(modelOrigin, modelAltitude); // transformation parameters to position, rotate and scale the 3D model onto the map

    var modelTransform = {
      translateX: modelAsMercatorCoordinate.x + 0.0000008,
      translateY: modelAsMercatorCoordinate.y + 0.0000018,
      translateZ: modelAsMercatorCoordinate.z,
      rotateX: modelRotate[0],
      rotateY: modelRotate[1],
      rotateZ: modelRotate[2],

      /* Since our 3D model is in real world meters, a scale transform needs to be
       * applied since the CustomLayerInterface expects units in MercatorCoordinates.
       */
      scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits() + 0.00000003
    }; //var THREE = window.THREE;
    // configuration of the custom layer for a 3D model per the CustomLayerInterface

    var customLayer = {
      id: "3d-model",
      type: "custom",
      renderingMode: "3d",
      onAdd: function onAdd(map, gl) {
        this.camera = new Camera();
        this.scene = new Scene(); // create two three.js lights to illuminate the model

        var directionalLight = new DirectionalLight(0xffffff);
        directionalLight.position.set(0, -70, 100).normalize();
        this.scene.add(directionalLight);
        var directionalLight2 = new DirectionalLight(0xffffff);
        directionalLight2.position.set(0, 70, 100).normalize();
        this.scene.add(directionalLight2); // use the three.js GLTF loader to add the 3D model to the three.js scene

        var loader = new GLTFLoader();
        loader.load( //"/assets/3D/posttower_simple.gltf",
        "/assets/3D/godzilla_simple.glb", //"https://docs.mapbox.com/mapbox-gl-js/assets/34M_17/34M_17.gltf",
        function (gltf) {
          this.scene.add(gltf.scene);

          if (typeof onDone === "function") {
            onDone();
          }
        }.bind(this));
        var loader = new GLTFLoader();
        loader.load("/assets/3D/posttower.gltf", //"/assets/3D/posttower_wh.gltf.glb",
        //"https://docs.mapbox.com/mapbox-gl-js/assets/34M_17/34M_17.gltf",
        function (gltf) {
          this.scene.add(gltf.scene);
        }.bind(this));
        this.map = map; // use the Mapbox GL JS map canvas for three.js

        this.renderer = new WebGLRenderer({
          canvas: map.getCanvas(),
          context: gl,
          antialias: true
        });
        this.renderer.autoClear = false;
      },
      render: function render(gl, matrix) {
        var rotationX = new Matrix4().makeRotationAxis(new Vector3(1, 0, 0), modelTransform.rotateX);
        var rotationY = new Matrix4().makeRotationAxis(new Vector3(0, 1, 0), modelTransform.rotateY);
        var rotationZ = new Matrix4().makeRotationAxis(new Vector3(0, 0, 1), modelTransform.rotateZ);
        var m = new Matrix4().fromArray(matrix);
        var l = new Matrix4().makeTranslation(modelTransform.translateX, modelTransform.translateY, modelTransform.translateZ).scale(new Vector3(modelTransform.scale, -modelTransform.scale, modelTransform.scale)).multiply(rotationX).multiply(rotationY).multiply(rotationZ);
        this.camera.projectionMatrix = m.multiply(l);
        this.renderer.resetState();
        this.renderer.render(this.scene, this.camera);
        this.map.triggerRepaint();
      }
    };
    mapContext.map.addLayer(customLayer);

    if (mapContext.map.getLayer(layerName)) {
      mapContext.map.setLayoutProperty(layerName, "visibility", "visible");
    }

    mapContext.map.setCenter([7.130255969902919, 50.7143656091998]);
    mapContext.map.setZoom(15);
    mapContext.map.setPitch(45);
  }, [mapContext.map]);
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
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
    color: "primary",
    variant: showLayer ? "contained" : "outlined",
    onClick: function onClick() {
      setShowLayer(!showLayer);
      showLayerRef.current = !showLayer;
    }
  }, "3D"));
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
      if (mapContext.map.getLayer(layerIdsRef.current[key])) {
        mapContext.map.removeLayer(layerIdsRef.current[key]);
      }
    }

    if (mapContext.map.getSource(sourceName + idPostfixRef.current)) {
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
      if (mapContext.maps[props.mapId].getLayer("raster-tile-layer-" + idPostfixRef.current)) {
        mapContext.maps[props.mapId].removeLayer("raster-tile-layer-" + idPostfixRef.current);
      }

      if (mapContext.maps[props.mapId].getSource("raster-tile-source-" + idPostfixRef.current)) {
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

export { MapLibreMap, MlAerialPhotograph, MlCameraFollowPath, MlComponentTemplate, MlCompositeLayer, MlCreatePdfButton, MlDeckGlLayer, MlDeckGlTerrainLayer, MlGPXViewer, MlGeoJsonLayer, MlHillshadeLayer, MlImageMarkerLayer, MlLaermkarte, MlLayer, MlMapDrawTools, MlOsmLayer, MlSpatialElevationProfile, MlThreeJsLayer, MlVectorTileLayer, MlWmsLayer, MlWmsLayerMulti };
//# sourceMappingURL=index.esm.js.map

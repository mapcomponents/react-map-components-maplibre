import * as React from 'react';
import React__default, { useState, useRef, useContext, useEffect, useCallback, Children, isValidElement, cloneElement, useMemo } from 'react';
import { Map as Map$1 } from '!maplibre-gl';
import { v4 } from 'uuid';
import PropTypes from 'prop-types';
import { Map as Map$2, Popup } from 'maplibre-gl';
import jsPDF from 'jspdf';
import styled$3 from '@emotion/styled';
import { keyframes } from '@emotion/react';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import { Button as Button$2 } from '@mui/material';
import * as turf from '@turf/turf';
import { point, circle, lineArc, bbox, lineOffset, distance } from '@turf/turf';
import { css } from '@emotion/css';
import syncMove from '@mapbox/mapbox-gl-sync-move';
import * as ReactDOM from 'react-dom';
import ReactDOM__default from 'react-dom';
import WMSCapabilities from 'wms-capabilities';
import * as d3 from 'd3';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
}

var MapContext = React__default.createContext({});
/**
 * MapComponentsProvider must be imported and wrapped around component where at least one of its child nodes requires access to a MapLibre-gl or openlayers instance that is registered in this mapContext.
MapComponentsProvider must be used one level higher than the first use of MapContext.
 *
 * MapComponentsProvider requires at least one use of the MapLibreMap component somewhere down the component tree that will create the MapLibre-gl object and set the reference at MapContext.map. For MapLibre maps it is a good idea to provide a mapId attribute to the MapLibreMap Component even if you are only using a single map instance at start. It will make a later transition to using multiple instances within the same project much easier.
 */
var MapComponentsProvider = function (_a) {
    var children = _a.children;
    var _b = useState(undefined), map = _b[0], setMap = _b[1];
    var _c = useState([]), mapIds = _c[0], setMapIds = _c[1];
    var mapIds_raw = useRef([]);
    var maps = useRef({});
    var removeMap = function (mapId) {
        if (mapId) {
            if (typeof maps.current[mapId] !== "undefined") {
                delete maps.current[mapId];
            }
            var mapIdIndex = mapIds_raw.current.indexOf(mapId);
            if (mapIdIndex > -1) {
                mapIds_raw.current.splice(mapIdIndex, 1);
            }
            setMapIds(__spreadArray([], mapIds_raw.current, true));
            if (mapIds.length === 1 && map) {
                setMap(undefined);
            }
        }
        else {
            setMap(undefined);
            removeMap("anonymous_map");
        }
    };
    var setMapHandler = function (mapInstance) {
        setMap(mapInstance);
        if (mapIds.length === 0) {
            var mapId = "anonymous_map";
            setMapIds(__spreadArray(__spreadArray([], mapIds, true), [mapId], false));
            maps.current[mapId] = mapInstance;
        }
    };
    var value = {
        map: map,
        setMap: setMapHandler,
        maps: maps.current,
        mapIds: mapIds,
        registerMap: function (mapId, mapInstance) {
            if (mapId && mapInstance) {
                maps.current[mapId] = mapInstance;
                mapIds_raw.current.push(mapId);
                setMapIds(__spreadArray([], mapIds_raw.current, true));
                if (!map) {
                    setMap(mapInstance);
                }
            }
        },
        removeMap: removeMap,
        mapExists: function (mapId) {
            if (mapId && Object.keys(maps.current).indexOf(mapId) === -1) {
                return false;
            }
            else if (!mapId && !map) {
                return false;
            }
            return true;
        },
        getMap: function (mapId) {
            if (mapId && mapIds.indexOf(mapId) !== -1) {
                return maps.current[mapId];
            }
            else if (!mapId && map) {
                return map;
            }
            return null;
        },
    };
    //@ts-ignore
    return React__default.createElement(MapContext.Provider, { value: value }, children);
};

/**
 * Creates a MapLibre-gl-js instance and offers all of the native MapLibre functions and properties as well as additional functionality such as element registration & cleanup and more events.
 *
 * @param {object} props
 *
 * @class
 */
var MapLibreGlWrapper = /** @class */ (function () {
    function MapLibreGlWrapper(props) {
        var _this = this;
        // closure variable to safely point to the object context of the current MapLibreGlWrapper instance
        var self = this;
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
            on: function (eventName, handler, options, componentId) {
                if (!self.eventHandlers[eventName])
                    return;
                if (typeof options === "string") {
                    componentId = options;
                    options = {};
                }
                self.eventHandlers[eventName].push({ handler: handler, options: options });
                var _arguments = [eventName, handler];
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
            off: function (eventName, handler) {
                if (!self.eventHandlers[eventName])
                    return;
                self.eventHandlers[eventName] = self.eventHandlers[eventName].filter(function (item) {
                    if (!Object.is(item.handler, handler)) {
                        return item;
                    }
                    return false;
                });
            },
            /**
             * Calls all event handlers that have been subscribed to the given eventName
             *
             * @param {string} eventName
             * @param {object} context
             * @returns {undefined}
             */
            fire: function (eventName, context) {
                if (!self.eventHandlers[eventName])
                    return;
                var scope = context || window;
                var event = new Event(eventName);
                self.eventHandlers[eventName].forEach(function (item) {
                    item.handler.call(scope, event, self);
                });
            },
            /**
             * Array containing an object for each layer in the MapLibre instance providing information on visibility, loading state, order, paint & layout properties
             */
            layerState: [],
            /**
             * Maps layerIds to layerState in JSON string form for quick deep comparisons
             */
            layerStateString: "",
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
            buildLayerObject: function (layer) {
                //if (self.baseLayers.indexOf(layer.id) === -1) {
                //let paint = {};
                //let values = layer.paint?._values;
                //Object.keys(values || {}).map((propName) => {
                //  paint[propName] =
                //    typeof values[propName].value !== "undefined"
                //      ? values[propName].value.value
                //      : values[propName];
                //});
                //let layout = {};
                //values = layer.layout?._values;
                //Object.keys(values || {}).map((propName) => {
                //  layout[propName] =
                //    typeof values[propName].value !== "undefined"
                //      ? values[propName].value.value
                //      : values[propName];
                //});
                return {
                    id: layer.id,
                    type: layer.type,
                    visible: layer.visibility === "none" ? false : true,
                    baseLayer: self.baseLayers.indexOf(layer.id) !== -1,
                    //paint,
                    //layout,
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
            buildLayerObjects: function () {
                // @ts-ignore
                return self.style._order
                    .map(function (layerId) {
                    return self.wrapper.buildLayerObject(self.map.style._layers[layerId]);
                })
                    .filter(function (n) { return n; });
            },
            /**
             * Updates layer state info objects
             */
            refreshLayerState: function () {
                self.wrapper.layerState = self.wrapper.buildLayerObjects();
                if (JSON.stringify(self.wrapper.layerState) !==
                    self.wrapper.layerStateString) {
                    self.wrapper.fire("layerchange");
                    self.wrapper.layerStateString = JSON.stringify(self.wrapper.layerState);
                }
            },
            /**
             * Object containing information on the current viewport state
             */
            viewportState: {
                center: { lng: 0, lat: 0 },
                zoom: 0,
                bearing: 0,
                pitch: 0
            },
            /**
             * The same data as viewportState in JSON string form for quick deep comparisons
             */
            viewportStateString: "{}",
            /**
             * Previous version of viewportStateString
             */
            oldViewportStateString: "{}",
            getViewport: function () {
                return typeof self.map.getCenter === "function"
                    ? {
                        center: (function (_a) {
                            var lng = _a.lng, lat = _a.lat;
                            return ({ lng: lng, lat: lat });
                        })(self.map.getCenter()),
                        zoom: self.map.getZoom(),
                        bearing: self.map.getBearing(),
                        pitch: self.map.getPitch(),
                    }
                    : {};
            },
            refreshViewport: function () {
                self.wrapper.viewportState = self.wrapper.getViewport();
            },
        };
        /**
         * Initializes an empty registered elements object for the given componentId
         *
         * @param {string} componentId
         * @param {boolean} force
         */
        this.initRegisteredElements = function (componentId, force) {
            if (typeof self.registeredElements[componentId] === "undefined" ||
                (typeof force !== "undefined" && force)) {
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
        this.addLayer = function (layer, beforeId, componentId) {
            if (!self.map.style) {
                return;
            }
            if (componentId &&
                typeof componentId === "string" &&
                typeof layer.id !== "undefined") {
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
        this.addSource = function (sourceId, source, componentId) {
            if (!self.map.style) {
                return;
            }
            if (componentId &&
                typeof componentId === "string" &&
                typeof sourceId !== "undefined") {
                self.initRegisteredElements(componentId);
                self.registeredElements[componentId].sources.push(sourceId);
            }
            self.map.addSource(sourceId, source);
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
        this.addImage = function (id, image, ref, componentId) {
            if (!self.map.style) {
                return;
            }
            if (typeof ref === "string" && typeof componentId === "undefined") {
                return self.addImage.call(self, id, image, undefined, ref);
            }
            if (componentId &&
                typeof componentId === "string" &&
                typeof id !== "undefined") {
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
         * @param {function} handler
         * @param {string} componentId
         * @returns {undefined}
         */
        this.on = function (type, layerId, handler, componentId) {
            var _a;
            if (typeof handler === "string" && typeof layerId === "function") {
                return self.on.call(self, type, undefined, layerId, handler);
            }
            var _arguments = [type, layerId, handler];
            if (!layerId) {
                _arguments = [type, handler];
            }
            if (componentId && typeof componentId === "string") {
                self.initRegisteredElements(componentId);
                self.registeredElements[componentId].events.push(_arguments);
            }
            // @ts-ignore:
            (_a = self.map).on.apply(_a, _arguments);
        };
        /**
         * Overrides MapLibre-gl-js addControl function providing an additional componentId parameter for the wrapper element registration.
         *
         * @param {object} control
         * @param {string} position
         * @param {string} componentId
         */
        this.addControl = function (control, position, componentId) {
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
        this.cleanup = function (componentId) {
            if (self.map.style &&
                typeof self.registeredElements[componentId] !== "undefined") {
                // cleanup layers
                self.registeredElements[componentId].layers.forEach(function (item) {
                    if (self.map.style.getLayer(item)) {
                        self.map.style.removeLayer(item);
                    }
                });
                // cleanup sources
                self.registeredElements[componentId].sources.forEach(function (item) {
                    if (self.map.style.getSource(item)) {
                        self.map.style.removeSource(item);
                    }
                });
                // cleanup images
                self.registeredElements[componentId].images.forEach(function (item) {
                    if (self.map.hasImage(item)) {
                        self.map.style.removeImage(item);
                    }
                });
                // cleanup events
                self.registeredElements[componentId].events.forEach(function (item) {
                    var _a;
                    // @ts-ignore
                    (_a = self.map).off.apply(_a, item);
                });
                // cleanup controls
                self.registeredElements[componentId].controls.forEach(function (item) {
                    self.map.removeControl(item);
                });
                // cleanup wrapper events
                self.registeredElements[componentId].wrapperEvents.forEach(function (item) {
                    var _a;
                    (_a = self.wrapper).off.apply(_a, item);
                });
                self.initRegisteredElements(componentId, true);
            }
        };
        // add style prop functions that require map._update to be called afterwards
        var updatingStyleFunctions = [
            "moveLayer",
            "removeLayer",
            "removeSource",
            "setPaintProperty",
            "setLayoutProperty",
        ];
        updatingStyleFunctions.forEach(function (item) {
            _this[item] = function () {
                var _a;
                var props = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    props[_i] = arguments[_i];
                }
                if (self.map &&
                    _this.map.style &&
                    typeof self.map.style[item] === "function") {
                    (_a = self.map.style)[item].apply(_a, props);
                }
                return self.map._update ? self.map._update(true) : undefined;
            };
        });
        // add style prop functions
        var styleFunctions = [
            "getLayer",
            "getSource",
            "listImages",
            "getPaintProperty",
            "getLayoutProperty",
            "removeImage",
        ];
        styleFunctions.forEach(function (item) {
            _this[item] = function () {
                var _a;
                var props = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    props[_i] = arguments[_i];
                }
                if (self.map && self.map.style) {
                    return (_a = self.map.style)[item].apply(_a, props);
                }
                return false;
            };
        });
        this.addNativeMaplibreFunctionsAndProps = function () {
            //  add MapLibre-gl functions
            Object.getOwnPropertyNames(Object.getPrototypeOf(_this.map)).forEach(function (item) {
                if (typeof _this[item] === "undefined") {
                    _this[item] = function () {
                        var _a;
                        var props = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            props[_i] = arguments[_i];
                        }
                        return (_a = self.map)[item].apply(_a, props);
                    };
                }
            });
            //  add MapLibre-gl properties
            Object.keys(_this.map).forEach(function (item) {
                if (typeof _this[item] === "undefined") {
                    _this[item] = self.map[item];
                }
            });
        };
        // add functions that are missing on the MapLibre instances prototype
        var missingFunctions = [
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
        missingFunctions.forEach(function (item) {
            _this[item] = function () {
                var _a;
                var props = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    props[_i] = arguments[_i];
                }
                if (typeof self.map[item] === "function") {
                    return (_a = self.map[item]).call.apply(_a, __spreadArray([self.map], props, false));
                }
                return undefined;
            };
        });
        // initialize the MapLibre-gl instance
        var initializeMapLibre = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(typeof props.mapOptions.style === "string" &&
                            props.mapOptions.style.indexOf("mapbox://") === -1)) return [3 /*break*/, 2];
                        return [4 /*yield*/, fetch(props.mapOptions.style)
                                .then(function (response) {
                                if (response.ok) {
                                    return response.json();
                                }
                                else {
                                    throw new Error("error loading map style.json");
                                }
                            })
                                .then(function (styleJson) {
                                styleJson.layers.forEach(function (item) {
                                    self.baseLayers.push(item.id);
                                    if (!self.firstSymbolLayer && item.type === "symbol") {
                                        self.firstSymbolLayer = item.id;
                                    }
                                });
                                self.styleJson = styleJson;
                                props.mapOptions.style = styleJson;
                            })
                                .catch(function (error) {
                                console.log(error);
                            })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        self.map = new Map$1(props.mapOptions);
                        self.addNativeMaplibreFunctionsAndProps();
                        self.wrapper.refreshViewport();
                        self.wrapper.fire("viewportchange");
                        self.map.on("load", function () {
                            self.addNativeMaplibreFunctionsAndProps();
                        });
                        self.map.on("move", function () {
                            self.wrapper.viewportState = self.wrapper.getViewport();
                            self.wrapper.fire("viewportchange");
                        });
                        self.map.on("idle", function () {
                            self.wrapper.refreshLayerState();
                        });
                        self.map.on("data", function () {
                            self.wrapper.refreshLayerState();
                        });
                        if (typeof props.onReady === "function") {
                            props.onReady(self.map, self);
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        initializeMapLibre();
    }
    return MapLibreGlWrapper;
}());

var defaultProps$2 = {
    mapId: undefined,
    options: {
        center: { lng: 8.607, lat: 53.1409349 },
        zoom: 11,
        container: '',
        style: {
            version: 8,
            name: "blank",
            center: [0, 0],
            zoom: 0,
            sources: {},
            layers: [
                {
                    id: "background",
                    type: "background",
                    paint: {
                        "background-color": "rgba(80,0,0,0)",
                    },
                },
            ],
        },
    },
};
/**
 * Creates a MapLibreGlWrapper instance and registers it in MapContext
 * after the MapLibre-gl load event has fired.
 *
 * MapLibreMap returns the html node that will be used by MapLibre-gl to render the map.
 * This Component must be kept unaware of any related components that interact with the MapLibre-gl
 * instance.
 *
 * @category Map components
 */
var MapLibreMap = function (props) {
    var map = useRef(null);
    var mapContainer = useRef();
    var mapContext = useContext(MapContext);
    var mapIdRef = useRef(props.mapId);
    var initializedRef = useRef(false);
    useEffect(function () {
        var mapId = mapIdRef.current;
        return function () {
            var _a, _b;
            mapContext.removeMap(mapId);
            (_b = (_a = map.current) === null || _a === void 0 ? void 0 : _a.remove) === null || _b === void 0 ? void 0 : _b.call(_a);
            map.current = null;
        };
    }, []);
    useEffect(function () {
        if (initializedRef.current)
            return;
        if (mapContainer.current) {
            initializedRef.current = true;
            map.current = new MapLibreGlWrapper({
                mapOptions: __assign({ style: '', container: mapContainer.current }, props.options),
                onReady: function (map, wrapper) {
                    map.once("load", function () {
                        if (props.mapId) {
                            mapContext.registerMap(props.mapId, wrapper);
                        }
                        else {
                            mapContext.setMap(wrapper);
                        }
                    });
                },
            });
        }
    }, [props.options, props.mapId]);
    return React__default.createElement("div", { ref: mapContainer, className: "mapContainer", style: props.style });
};
MapLibreMap.defaultProps = defaultProps$2;

/**
 * React hook that allows subscribing to map state changes
 *
 * @component
 */
function useMapState(props) {
    // Use a useRef hook to reference the layer object to be able to access it later inside useEffect hooks
    var mapContext = useContext(MapContext);
    var initializedRef = useRef(false);
    var mapRef = useRef();
    var _a = useState(), viewport = _a[0], setViewport = _a[1];
    var viewportRef = useRef(undefined);
    var _b = useState([]), layers = _b[0], setLayers = _b[1];
    var layersRef = useRef();
    //const mapRef = useRef(props.map);
    var componentId = useRef(v4());
    /**
     * returns the element if it matches the defined filter criteria
     * to be used as filter function on the layers array
     *
     * @param {object} layer
     */
    var layerIdFilter = useCallback(function (layer) {
        var _a, _b;
        if (!((_a = props === null || props === void 0 ? void 0 : props.filter) === null || _a === void 0 ? void 0 : _a.includeBaseLayers) && layer.baseLayer) {
            return false;
        }
        if (typeof ((_b = props.filter) === null || _b === void 0 ? void 0 : _b.matchLayerIds) !== "undefined") {
            if (props.filter.matchLayerIds instanceof RegExp) {
                return props.filter.matchLayerIds.test(layer.id);
            }
            else {
                return layer.id.includes(props.filter.matchLayerIds);
            }
        }
        return true;
    }, [props.filter]);
    var refreshLayerState = useCallback(function () {
        if (!mapRef.current)
            return;
        var _layerState = mapRef.current.wrapper.layerState.filter(layerIdFilter);
        var _layerStateString = JSON.stringify(_layerState);
        if (layersRef.current !== _layerStateString) {
            layersRef.current = _layerStateString;
            setLayers(_layerState);
        }
    }, [layerIdFilter]);
    useEffect(function () {
        var _componentId = componentId.current;
        return function () {
            // cleanup all event listeners
            if (mapRef.current) {
                mapRef.current.cleanup(_componentId);
                mapRef.current = undefined;
            }
            initializedRef.current = false;
        };
    }, []);
    useEffect(function () {
        var _a, _b, _c, _d;
        if (!mapContext.mapExists(props.mapId) || initializedRef.current)
            return;
        // the MapLibre-gl instance (mapContext.getMap(props.mapId)) is accessible here
        // initialize the layer and add it to the MapLibre-gl instance or do something else with it
        initializedRef.current = true;
        mapRef.current = mapContext.getMap(props.mapId);
        if (!mapRef.current) {
            initializedRef.current = false;
            return;
        }
        if ((_a = props === null || props === void 0 ? void 0 : props.watch) === null || _a === void 0 ? void 0 : _a.viewport) {
            setViewport(mapRef.current.wrapper.viewportState);
            // register viewportchange event handler
            mapRef.current.wrapper.on("viewportchange", function () {
                var _a, _b;
                if (viewportRef.current !== ((_a = mapRef.current) === null || _a === void 0 ? void 0 : _a.wrapper.viewportStateString)) {
                    setViewport((_b = mapRef.current) === null || _b === void 0 ? void 0 : _b.wrapper.viewportState);
                }
            }, componentId.current);
        }
        // register layerchange event handler
        if ((_b = props === null || props === void 0 ? void 0 : props.watch) === null || _b === void 0 ? void 0 : _b.layers) {
            refreshLayerState();
            mapRef.current.wrapper.on("layerchange", refreshLayerState, {
                includeBaseLayers: (_c = props === null || props === void 0 ? void 0 : props.filter) === null || _c === void 0 ? void 0 : _c.includeBaseLayers,
                matchLayerIds: (_d = props === null || props === void 0 ? void 0 : props.filter) === null || _d === void 0 ? void 0 : _d.matchLayerIds,
            }, componentId.current);
        }
    }, [mapContext.mapIds, mapContext, props.mapId, refreshLayerState, props]);
    return {
        layers: layers,
        viewport: viewport,
    };
}
useMapState.defaultProps = {
    mapId: undefined,
    watch: {
        layers: true,
        sources: false,
        viewport: false,
    },
    filter: {
        includeBaseLayers: false,
    },
};
useMapState.propTypes = {
    /**
     * Id of the target MapLibre instance in mapContext
     */
    mapId: PropTypes.string,
    /**
     * Defines map Resources to watch
     */
    watch: PropTypes.shape({
        layers: PropTypes.bool,
        sources: PropTypes.bool,
        viewport: PropTypes.bool,
    }),
    /**
     * Filter string or RegExp to more explicitly define the elements watched and increase performance
     * strings will be matched using layerId.includes(matchString)
     * RegExps will be matched using matchRegExp.test(layerId)
     */
    filter: PropTypes.shape({
        includeBaseLayers: PropTypes.bool,
        matchLayerIds: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(RegExp)]),
        matchSourceIds: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(RegExp)]),
    }),
};

function useMap(props) {
    // Use a useRef hook to reference the layer object to be able to access it later inside useEffect hooks
    var mapContext = useContext(MapContext);
    var _a = useState(), map = _a[0], setMap = _a[1];
    var mapState = useMapState({
        mapId: props.mapId,
        watch: {
            viewport: false,
            layers: props.waitForLayer ? true : false,
            sources: false,
        },
        filter: {
            includeBaseLayers: true,
        },
    });
    var initializedRef = useRef(false);
    var mapRef = useRef(undefined);
    var componentId = useRef(v4());
    var _b = useState(false), mapIsReady = _b[0], setMapIsReady = _b[1];
    var cleanup = function () {
        if (mapRef.current) {
            mapRef.current.cleanup(componentId.current);
            mapRef.current = undefined;
        }
        initializedRef.current = false;
        setMapIsReady(false);
    };
    useEffect(function () {
        return cleanup;
    }, []);
    useEffect(function () {
        var _a;
        if (!mapContext.mapExists(props.mapId) || initializedRef.current)
            return;
        // check if waitForLayer (string, layer id of the layer this hook is supposed to wait for)
        // exists as layer in the MapLibre instance
        if (props.waitForLayer) {
            var layerFound_1 = false;
            (_a = mapState === null || mapState === void 0 ? void 0 : mapState.layers) === null || _a === void 0 ? void 0 : _a.forEach(function (layer) {
                if (layer.id === props.waitForLayer) {
                    layerFound_1 = true;
                }
            });
            if (!layerFound_1) {
                return;
            }
        }
        // the MapLibre-gl instance (mapContext.getMap(props.mapId)) is accessible here
        // initialize the layer and add it to the MapLibre-gl instance or do something else with it
        initializedRef.current = true;
        mapRef.current = mapContext.getMap(props.mapId);
        setMap(mapRef.current);
        setMapIsReady(true);
    }, [mapContext.mapIds, mapState.layers, mapContext, props.waitForLayer, props.mapId]);
    return {
        map: map,
        mapIsReady: mapIsReady,
        componentId: componentId.current,
        layers: mapState.layers,
        cleanup: cleanup,
    };
}

/**
 * Component template
 *
 */
var MlComponentTemplate = function (props) {
    var mapHook = useMap({
        mapId: props.mapId,
        waitForLayer: props.insertBeforeLayer,
    });
    var initializedRef = useRef(false);
    useEffect(function () {
        if (!mapHook.map || initializedRef.current)
            return;
        // the MapLibre-gl instance (mapHook.map) is accessible here
        // initialize the layer and add it to the MapLibre-gl instance or do something else with it
        initializedRef.current = true;
        mapHook.map.map.setCenter([7.132122000552613, 50.716405378037706]);
    }, [mapHook.map, props.mapId]);
    return React__default.createElement(React__default.Fragment, null);
};
MlComponentTemplate.defaultProps = {
    mapId: undefined,
};

var nmMap = {
    street: [
        "footway",
        "street",
        "road",
        "street_name",
        "residential",
        "path",
        "pedestrian",
        "road_reference",
        "road_reference_intl",
        "square",
        "place",
    ],
    number: ["house_number", "street_number"],
    place: [
        "city",
        "village",
        "hamlet",
        "locality",
        "croft",
        "neighbourhood",
        "suburb",
        "city_district",
        "district",
        "quarter",
        "borough",
        "city_block",
        "residential",
        "commercial",
        "industrial",
        "houses",
        "subdivision",
        "allotments",
        "postal_city",
        "town",
        "municipality",
        "local_administrative_area",
    ],
    zip: ["postcode", "partial_postcode"],
    state: ["state", "province", "state_code"],
};
var nmConverter = function (nmAddress) {
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

var toPixels = function (length) {
    var conversionFactor = 96;
    conversionFactor /= 25.4;
    return conversionFactor * length + "px";
};
var createPdf = function (map, locationValue, setLoading) {
    setLoading(true);
    var width = 210;
    var height = 297;
    // Calculate pixel ratio
    var actualPixelRatio = window.devicePixelRatio;
    // Create map container
    var hidden = document.createElement("div");
    hidden.className = "hidden-map";
    document.body.appendChild(hidden);
    var container = document.createElement("div");
    container.style.width = toPixels(width);
    container.style.height = toPixels(height);
    hidden.appendChild(container);
    var style = map.map.getStyle();
    var _loop_1 = function (name_1) {
        var src = style.sources[name_1];
        Object.keys(src).forEach(function (key) {
            //delete properties if value is undefined.
            // for instance, raster-dem might has undefined value in "url" and "bounds"
            if (!src[key]) {
                delete src[key];
            }
        });
    };
    for (var name_1 in style.sources) {
        _loop_1(name_1);
    }
    //Render map
    var renderMap = new Map$2({
        container: container,
        center: map.map.getCenter(),
        zoom: map.map.getZoom(),
        bearing: map.map.getBearing(),
        pitch: map.map.getPitch(),
        interactive: false,
        preserveDrawingBuffer: true,
        fadeDuration: 0,
        attributionControl: false,
        style: style
    });
    renderMap.once("idle", function () {
        var _a;
        // TO DO: It is still under development
        var pdf = new jsPDF({
            orientation: "p",
            unit: "mm",
            compress: true,
        });
        Object.defineProperty(window, "devicePixelRatio", {
            get: function () {
                return 300 / 96;
            },
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
                if (limitChunks) {
                    textChunks.push.apply(textChunks, limitChunks);
                }
            });
        }
        //Render map image
        pdf.addImage(renderMap.getCanvas().toDataURL("image/png"), "png", 0, 0, 210, 297, undefined, "FAST");
        //Render lower left Copyright box
        pdf.setFillColor("white");
        pdf.rect(138, 287, 297, 10, "F");
        pdf.setFontSize(10); // optional
        pdf.text("Datenquelle: © OpenStreetMap-Mitwirkende", 140, pdf.internal.pageSize.height - 3);
        //Render infobox
        pdf.setFillColor("white");
        var infoBoxSize = textChunks.length * lineHeight +
            marginTop +
            marginBottom +
            lineHeight * 2 +
            innerMargin * 2 +
            textBuffer;
        pdf.rect(offsetX, 2, 66.5, infoBoxSize, "F");
        pdf.setFontSize(10);
        pdf.text("Karten PDF:", 6, offsetY + marginTop);
        //Render inner infobox
        pdf.rect(6, 7, 60, textChunks.length * lineHeight + innerMargin * 2 + textBuffer);
        pdf.setFontSize(10);
        //Write out address
        textChunks.forEach(function (text, i) {
            pdf.text(text.trim(), 8, 10 + i * 3.5 + innerMargin);
        });
        //Add WG Logo
        pdf.addImage(logo, "png", 5, offsetY + marginTop + lineHeight * 2 + textChunks.length * 3 + innerMargin * 2, 3, 3, undefined, "FAST");
        //Add WG Url
        pdf.setFontSize(10);
        pdf.text("wheregroup.com", 40, offsetY +
            marginTop +
            lineHeight * 2 +
            textChunks.length * lineHeight +
            innerMargin * 2 +
            textBuffer);
        //Set pdfs props
        pdf.setProperties({
            title: "Map export",
            subject: "Map export",
            creator: "WhereGroup GmbH",
            author: "(c)WhereGroup GmbH, (c)OpenStreetMap",
        });
        pdf.save("Map.pdf");
        renderMap.remove();
        (_a = hidden.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(hidden);
        Object.defineProperty(window, "devicePixelRatio", {
            get: function () {
                return actualPixelRatio;
            },
        });
        setLoading(false);
    });
};

function getAugmentedNamespace(n) {
	if (n.__esModule) return n;
	var a = Object.defineProperty({}, '__esModule', {value: true});
	Object.keys(n).forEach(function (k) {
		var d = Object.getOwnPropertyDescriptor(n, k);
		Object.defineProperty(a, k, d.get ? d : {
			enumerable: true,
			get: function () {
				return n[k];
			}
		});
	});
	return a;
}

var Print = {};

var interopRequireDefault = {exports: {}};

(function (module) {
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;
}(interopRequireDefault));

var createSvgIcon$1 = {};

const defaultGenerator = componentName => componentName;

const createClassNameGenerator = () => {
  let generate = defaultGenerator;
  return {
    configure(generator) {
      generate = generator;
    },

    generate(componentName) {
      return generate(componentName);
    },

    reset() {
      generate = defaultGenerator;
    }

  };
};

const ClassNameGenerator = createClassNameGenerator();
var ClassNameGenerator$1 = ClassNameGenerator;

function chainPropTypes(propType1, propType2) {
  if (process.env.NODE_ENV === 'production') {
    return () => null;
  }

  return function validate(...args) {
    return propType1(...args) || propType2(...args);
  };
}

function _extends$3() {
  _extends$3 = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$3.apply(this, arguments);
}

function isPlainObject(item) {
  return item !== null && typeof item === 'object' && item.constructor === Object;
}
function deepmerge(target, source, options = {
  clone: true
}) {
  const output = options.clone ? _extends$3({}, target) : target;

  if (isPlainObject(target) && isPlainObject(source)) {
    Object.keys(source).forEach(key => {
      // Avoid prototype pollution
      if (key === '__proto__') {
        return;
      }

      if (isPlainObject(source[key]) && key in target && isPlainObject(target[key])) {
        // Since `output` is a clone of `target` and we have narrowed `target` in this block we can cast to the same type.
        output[key] = deepmerge(target[key], source[key], options);
      } else {
        output[key] = source[key];
      }
    });
  }

  return output;
}

function isClassComponent$1(elementType) {
  // elementType.prototype?.isReactComponent
  const {
    prototype = {}
  } = elementType;
  return Boolean(prototype.isReactComponent);
}

function acceptingRef(props, propName, componentName, location, propFullName) {
  const element = props[propName];
  const safePropName = propFullName || propName;

  if (element == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window === 'undefined') {
    return null;
  }

  let warningHint;
  const elementType = element.type;
  /**
   * Blacklisting instead of whitelisting
   *
   * Blacklisting will miss some components, such as React.Fragment. Those will at least
   * trigger a warning in React.
   * We can't whitelist because there is no safe way to detect React.forwardRef
   * or class components. "Safe" means there's no public API.
   *
   */

  if (typeof elementType === 'function' && !isClassComponent$1(elementType)) {
    warningHint = 'Did you accidentally use a plain function component for an element instead?';
  }

  if (warningHint !== undefined) {
    return new Error(`Invalid ${location} \`${safePropName}\` supplied to \`${componentName}\`. ` + `Expected an element that can hold a ref. ${warningHint} ` + 'For more information see https://mui.com/r/caveat-with-refs-guide');
  }

  return null;
}

const elementAcceptingRef = chainPropTypes(PropTypes.element, acceptingRef);
elementAcceptingRef.isRequired = chainPropTypes(PropTypes.element.isRequired, acceptingRef);
var elementAcceptingRef$1 = elementAcceptingRef;

function isClassComponent(elementType) {
  // elementType.prototype?.isReactComponent
  const {
    prototype = {}
  } = elementType;
  return Boolean(prototype.isReactComponent);
}

function elementTypeAcceptingRef(props, propName, componentName, location, propFullName) {
  const propValue = props[propName];
  const safePropName = propFullName || propName;

  if (propValue == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window === 'undefined') {
    return null;
  }

  let warningHint;
  /**
   * Blacklisting instead of whitelisting
   *
   * Blacklisting will miss some components, such as React.Fragment. Those will at least
   * trigger a warning in React.
   * We can't whitelist because there is no safe way to detect React.forwardRef
   * or class components. "Safe" means there's no public API.
   *
   */

  if (typeof propValue === 'function' && !isClassComponent(propValue)) {
    warningHint = 'Did you accidentally provide a plain function component instead?';
  }

  if (warningHint !== undefined) {
    return new Error(`Invalid ${location} \`${safePropName}\` supplied to \`${componentName}\`. ` + `Expected an element type that can hold a ref. ${warningHint} ` + 'For more information see https://mui.com/r/caveat-with-refs-guide');
  }

  return null;
}

var elementTypeAcceptingRef$1 = chainPropTypes(PropTypes.elementType, elementTypeAcceptingRef);

// This module is based on https://github.com/airbnb/prop-types-exact repository.
// However, in order to reduce the number of dependencies and to remove some extra safe checks
// the module was forked.
const specialProperty = 'exact-prop: \u200b';
function exactProp(propTypes) {
  if (process.env.NODE_ENV === 'production') {
    return propTypes;
  }

  return _extends$3({}, propTypes, {
    [specialProperty]: props => {
      const unsupportedProps = Object.keys(props).filter(prop => !propTypes.hasOwnProperty(prop));

      if (unsupportedProps.length > 0) {
        return new Error(`The following props are not supported: ${unsupportedProps.map(prop => `\`${prop}\``).join(', ')}. Please remove them.`);
      }

      return null;
    }
  });
}

/**
 * WARNING: Don't import this directly.
 * Use `MuiError` from `@mui/utils/macros/MuiError.macro` instead.
 * @param {number} code
 */
function formatMuiErrorMessage(code) {
  // Apply babel-plugin-transform-template-literals in loose mode
  // loose mode is safe iff we're concatenating primitives
  // see https://babeljs.io/docs/en/babel-plugin-transform-template-literals#loose

  /* eslint-disable prefer-template */
  let url = 'https://mui.com/production-error/?code=' + code;

  for (let i = 1; i < arguments.length; i += 1) {
    // rest params over-transpile for this case
    // eslint-disable-next-line prefer-rest-params
    url += '&args[]=' + encodeURIComponent(arguments[i]);
  }

  return 'Minified MUI error #' + code + '; visit ' + url + ' for the full message.';
  /* eslint-enable prefer-template */
}

var reactIs = {exports: {}};

var reactIs_production_min = {};

/** @license React v17.0.2
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var b=60103,c=60106,d=60107,e$1=60108,f$1=60114,g$1=60109,h$1=60110,k=60112,l=60113,m$1=60120,n$1=60115,p$1=60116,q$1=60121,r=60122,u=60117,v=60129,w=60131;
if("function"===typeof Symbol&&Symbol.for){var x=Symbol.for;b=x("react.element");c=x("react.portal");d=x("react.fragment");e$1=x("react.strict_mode");f$1=x("react.profiler");g$1=x("react.provider");h$1=x("react.context");k=x("react.forward_ref");l=x("react.suspense");m$1=x("react.suspense_list");n$1=x("react.memo");p$1=x("react.lazy");q$1=x("react.block");r=x("react.server.block");u=x("react.fundamental");v=x("react.debug_trace_mode");w=x("react.legacy_hidden");}
function y(a){if("object"===typeof a&&null!==a){var t=a.$$typeof;switch(t){case b:switch(a=a.type,a){case d:case f$1:case e$1:case l:case m$1:return a;default:switch(a=a&&a.$$typeof,a){case h$1:case k:case p$1:case n$1:case g$1:return a;default:return t}}case c:return t}}}var z=g$1,A=b,B=k,C=d,D=p$1,E=n$1,F=c,G=f$1,H=e$1,I=l;reactIs_production_min.ContextConsumer=h$1;reactIs_production_min.ContextProvider=z;reactIs_production_min.Element=A;reactIs_production_min.ForwardRef=B;reactIs_production_min.Fragment=C;reactIs_production_min.Lazy=D;reactIs_production_min.Memo=E;reactIs_production_min.Portal=F;reactIs_production_min.Profiler=G;reactIs_production_min.StrictMode=H;
reactIs_production_min.Suspense=I;reactIs_production_min.isAsyncMode=function(){return !1};reactIs_production_min.isConcurrentMode=function(){return !1};reactIs_production_min.isContextConsumer=function(a){return y(a)===h$1};reactIs_production_min.isContextProvider=function(a){return y(a)===g$1};reactIs_production_min.isElement=function(a){return "object"===typeof a&&null!==a&&a.$$typeof===b};reactIs_production_min.isForwardRef=function(a){return y(a)===k};reactIs_production_min.isFragment=function(a){return y(a)===d};reactIs_production_min.isLazy=function(a){return y(a)===p$1};reactIs_production_min.isMemo=function(a){return y(a)===n$1};
reactIs_production_min.isPortal=function(a){return y(a)===c};reactIs_production_min.isProfiler=function(a){return y(a)===f$1};reactIs_production_min.isStrictMode=function(a){return y(a)===e$1};reactIs_production_min.isSuspense=function(a){return y(a)===l};reactIs_production_min.isValidElementType=function(a){return "string"===typeof a||"function"===typeof a||a===d||a===f$1||a===v||a===e$1||a===l||a===m$1||a===w||"object"===typeof a&&null!==a&&(a.$$typeof===p$1||a.$$typeof===n$1||a.$$typeof===g$1||a.$$typeof===h$1||a.$$typeof===k||a.$$typeof===u||a.$$typeof===q$1||a[0]===r)?!0:!1};
reactIs_production_min.typeOf=y;

var reactIs_development = {};

/** @license React v17.0.2
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (process.env.NODE_ENV !== "production") {
  (function() {

// ATTENTION
// When adding new symbols to this file,
// Please consider also adding to 'react-devtools-shared/src/backend/ReactSymbols'
// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var REACT_ELEMENT_TYPE = 0xeac7;
var REACT_PORTAL_TYPE = 0xeaca;
var REACT_FRAGMENT_TYPE = 0xeacb;
var REACT_STRICT_MODE_TYPE = 0xeacc;
var REACT_PROFILER_TYPE = 0xead2;
var REACT_PROVIDER_TYPE = 0xeacd;
var REACT_CONTEXT_TYPE = 0xeace;
var REACT_FORWARD_REF_TYPE = 0xead0;
var REACT_SUSPENSE_TYPE = 0xead1;
var REACT_SUSPENSE_LIST_TYPE = 0xead8;
var REACT_MEMO_TYPE = 0xead3;
var REACT_LAZY_TYPE = 0xead4;
var REACT_BLOCK_TYPE = 0xead9;
var REACT_SERVER_BLOCK_TYPE = 0xeada;
var REACT_FUNDAMENTAL_TYPE = 0xead5;
var REACT_DEBUG_TRACING_MODE_TYPE = 0xeae1;
var REACT_LEGACY_HIDDEN_TYPE = 0xeae3;

if (typeof Symbol === 'function' && Symbol.for) {
  var symbolFor = Symbol.for;
  REACT_ELEMENT_TYPE = symbolFor('react.element');
  REACT_PORTAL_TYPE = symbolFor('react.portal');
  REACT_FRAGMENT_TYPE = symbolFor('react.fragment');
  REACT_STRICT_MODE_TYPE = symbolFor('react.strict_mode');
  REACT_PROFILER_TYPE = symbolFor('react.profiler');
  REACT_PROVIDER_TYPE = symbolFor('react.provider');
  REACT_CONTEXT_TYPE = symbolFor('react.context');
  REACT_FORWARD_REF_TYPE = symbolFor('react.forward_ref');
  REACT_SUSPENSE_TYPE = symbolFor('react.suspense');
  REACT_SUSPENSE_LIST_TYPE = symbolFor('react.suspense_list');
  REACT_MEMO_TYPE = symbolFor('react.memo');
  REACT_LAZY_TYPE = symbolFor('react.lazy');
  REACT_BLOCK_TYPE = symbolFor('react.block');
  REACT_SERVER_BLOCK_TYPE = symbolFor('react.server.block');
  REACT_FUNDAMENTAL_TYPE = symbolFor('react.fundamental');
  symbolFor('react.scope');
  symbolFor('react.opaque.id');
  REACT_DEBUG_TRACING_MODE_TYPE = symbolFor('react.debug_trace_mode');
  symbolFor('react.offscreen');
  REACT_LEGACY_HIDDEN_TYPE = symbolFor('react.legacy_hidden');
}

// Filter certain DOM attributes (e.g. src, href) if their values are empty strings.

var enableScopeAPI = false; // Experimental Create Event Handle API.

function isValidElementType(type) {
  if (typeof type === 'string' || typeof type === 'function') {
    return true;
  } // Note: typeof might be other than 'symbol' or 'number' (e.g. if it's a polyfill).


  if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || type === REACT_DEBUG_TRACING_MODE_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || type === REACT_LEGACY_HIDDEN_TYPE || enableScopeAPI ) {
    return true;
  }

  if (typeof type === 'object' && type !== null) {
    if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_BLOCK_TYPE || type[0] === REACT_SERVER_BLOCK_TYPE) {
      return true;
    }
  }

  return false;
}

function typeOf(object) {
  if (typeof object === 'object' && object !== null) {
    var $$typeof = object.$$typeof;

    switch ($$typeof) {
      case REACT_ELEMENT_TYPE:
        var type = object.type;

        switch (type) {
          case REACT_FRAGMENT_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_SUSPENSE_TYPE:
          case REACT_SUSPENSE_LIST_TYPE:
            return type;

          default:
            var $$typeofType = type && type.$$typeof;

            switch ($$typeofType) {
              case REACT_CONTEXT_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_LAZY_TYPE:
              case REACT_MEMO_TYPE:
              case REACT_PROVIDER_TYPE:
                return $$typeofType;

              default:
                return $$typeof;
            }

        }

      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }

  return undefined;
}
var ContextConsumer = REACT_CONTEXT_TYPE;
var ContextProvider = REACT_PROVIDER_TYPE;
var Element = REACT_ELEMENT_TYPE;
var ForwardRef = REACT_FORWARD_REF_TYPE;
var Fragment = REACT_FRAGMENT_TYPE;
var Lazy = REACT_LAZY_TYPE;
var Memo = REACT_MEMO_TYPE;
var Portal = REACT_PORTAL_TYPE;
var Profiler = REACT_PROFILER_TYPE;
var StrictMode = REACT_STRICT_MODE_TYPE;
var Suspense = REACT_SUSPENSE_TYPE;
var hasWarnedAboutDeprecatedIsAsyncMode = false;
var hasWarnedAboutDeprecatedIsConcurrentMode = false; // AsyncMode should be deprecated

function isAsyncMode(object) {
  {
    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
      hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

      console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 18+.');
    }
  }

  return false;
}
function isConcurrentMode(object) {
  {
    if (!hasWarnedAboutDeprecatedIsConcurrentMode) {
      hasWarnedAboutDeprecatedIsConcurrentMode = true; // Using console['warn'] to evade Babel and ESLint

      console['warn']('The ReactIs.isConcurrentMode() alias has been deprecated, ' + 'and will be removed in React 18+.');
    }
  }

  return false;
}
function isContextConsumer(object) {
  return typeOf(object) === REACT_CONTEXT_TYPE;
}
function isContextProvider(object) {
  return typeOf(object) === REACT_PROVIDER_TYPE;
}
function isElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}
function isForwardRef(object) {
  return typeOf(object) === REACT_FORWARD_REF_TYPE;
}
function isFragment(object) {
  return typeOf(object) === REACT_FRAGMENT_TYPE;
}
function isLazy(object) {
  return typeOf(object) === REACT_LAZY_TYPE;
}
function isMemo(object) {
  return typeOf(object) === REACT_MEMO_TYPE;
}
function isPortal(object) {
  return typeOf(object) === REACT_PORTAL_TYPE;
}
function isProfiler(object) {
  return typeOf(object) === REACT_PROFILER_TYPE;
}
function isStrictMode(object) {
  return typeOf(object) === REACT_STRICT_MODE_TYPE;
}
function isSuspense(object) {
  return typeOf(object) === REACT_SUSPENSE_TYPE;
}

reactIs_development.ContextConsumer = ContextConsumer;
reactIs_development.ContextProvider = ContextProvider;
reactIs_development.Element = Element;
reactIs_development.ForwardRef = ForwardRef;
reactIs_development.Fragment = Fragment;
reactIs_development.Lazy = Lazy;
reactIs_development.Memo = Memo;
reactIs_development.Portal = Portal;
reactIs_development.Profiler = Profiler;
reactIs_development.StrictMode = StrictMode;
reactIs_development.Suspense = Suspense;
reactIs_development.isAsyncMode = isAsyncMode;
reactIs_development.isConcurrentMode = isConcurrentMode;
reactIs_development.isContextConsumer = isContextConsumer;
reactIs_development.isContextProvider = isContextProvider;
reactIs_development.isElement = isElement;
reactIs_development.isForwardRef = isForwardRef;
reactIs_development.isFragment = isFragment;
reactIs_development.isLazy = isLazy;
reactIs_development.isMemo = isMemo;
reactIs_development.isPortal = isPortal;
reactIs_development.isProfiler = isProfiler;
reactIs_development.isStrictMode = isStrictMode;
reactIs_development.isSuspense = isSuspense;
reactIs_development.isValidElementType = isValidElementType;
reactIs_development.typeOf = typeOf;
  })();
}

if (process.env.NODE_ENV === 'production') {
  reactIs.exports = reactIs_production_min;
} else {
  reactIs.exports = reactIs_development;
}

// https://github.com/JamesMGreene/Function.name/blob/58b314d4a983110c3682f1228f845d39ccca1817/Function.name.js#L3

const fnNameMatchRegex = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function getFunctionName(fn) {
  const match = `${fn}`.match(fnNameMatchRegex);
  const name = match && match[1];
  return name || '';
}

function getFunctionComponentName(Component, fallback = '') {
  return Component.displayName || Component.name || getFunctionName(Component) || fallback;
}

function getWrappedName(outerType, innerType, wrapperName) {
  const functionName = getFunctionComponentName(innerType);
  return outerType.displayName || (functionName !== '' ? `${wrapperName}(${functionName})` : wrapperName);
}
/**
 * cherry-pick from
 * https://github.com/facebook/react/blob/769b1f270e1251d9dbdce0fcbd9e92e502d059b8/packages/shared/getComponentName.js
 * originally forked from recompose/getDisplayName with added IE11 support
 */


function getDisplayName(Component) {
  if (Component == null) {
    return undefined;
  }

  if (typeof Component === 'string') {
    return Component;
  }

  if (typeof Component === 'function') {
    return getFunctionComponentName(Component, 'Component');
  } // TypeScript can't have components as objects but they exist in the form of `memo` or `Suspense`


  if (typeof Component === 'object') {
    switch (Component.$$typeof) {
      case reactIs.exports.ForwardRef:
        return getWrappedName(Component, Component.render, 'ForwardRef');

      case reactIs.exports.Memo:
        return getWrappedName(Component, Component.type, 'memo');

      default:
        return undefined;
    }
  }

  return undefined;
}

function HTMLElementType(props, propName, componentName, location, propFullName) {
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  const propValue = props[propName];
  const safePropName = propFullName || propName;

  if (propValue == null) {
    return null;
  }

  if (propValue && propValue.nodeType !== 1) {
    return new Error(`Invalid ${location} \`${safePropName}\` supplied to \`${componentName}\`. ` + `Expected an HTMLElement.`);
  }

  return null;
}

const refType = PropTypes.oneOfType([PropTypes.func, PropTypes.object]);
var refType$1 = refType;

// It should to be noted that this function isn't equivalent to `text-transform: capitalize`.
//
// A strict capitalization should uppercase the first letter of each word in the sentence.
// We only handle the first word.
function capitalize(string) {
  if (typeof string !== 'string') {
    throw new Error(process.env.NODE_ENV !== "production" ? `MUI: \`capitalize(string)\` expects a string argument.` : formatMuiErrorMessage(7));
  }

  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Safe chained function.
 *
 * Will only create a new function if needed,
 * otherwise will pass back existing functions or null.
 */
function createChainedFunction(...funcs) {
  return funcs.reduce((acc, func) => {
    if (func == null) {
      return acc;
    }

    return function chainedFunction(...args) {
      acc.apply(this, args);
      func.apply(this, args);
    };
  }, () => {});
}

// Corresponds to 10 frames at 60 Hz.
// A few bytes payload overhead when lodash/debounce is ~3 kB and debounce ~300 B.
function debounce(func, wait = 166) {
  let timeout;

  function debounced(...args) {
    const later = () => {
      func.apply(this, args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  }

  debounced.clear = () => {
    clearTimeout(timeout);
  };

  return debounced;
}

function deprecatedPropType(validator, reason) {
  if (process.env.NODE_ENV === 'production') {
    return () => null;
  }

  return (props, propName, componentName, location, propFullName) => {
    const componentNameSafe = componentName || '<<anonymous>>';
    const propFullNameSafe = propFullName || propName;

    if (typeof props[propName] !== 'undefined') {
      return new Error(`The ${location} \`${propFullNameSafe}\` of ` + `\`${componentNameSafe}\` is deprecated. ${reason}`);
    }

    return null;
  };
}

function isMuiElement(element, muiNames) {
  return /*#__PURE__*/React.isValidElement(element) && muiNames.indexOf(element.type.muiName) !== -1;
}

function ownerDocument(node) {
  return node && node.ownerDocument || document;
}

function ownerWindow(node) {
  const doc = ownerDocument(node);
  return doc.defaultView || window;
}

function requirePropFactory(componentNameInError, Component) {
  if (process.env.NODE_ENV === 'production') {
    return () => null;
  } // eslint-disable-next-line react/forbid-foreign-prop-types


  const prevPropTypes = Component ? _extends$3({}, Component.propTypes) : null;

  const requireProp = requiredProp => (props, propName, componentName, location, propFullName, ...args) => {
    const propFullNameSafe = propFullName || propName;
    const defaultTypeChecker = prevPropTypes == null ? void 0 : prevPropTypes[propFullNameSafe];

    if (defaultTypeChecker) {
      const typeCheckerResult = defaultTypeChecker(props, propName, componentName, location, propFullName, ...args);

      if (typeCheckerResult) {
        return typeCheckerResult;
      }
    }

    if (typeof props[propName] !== 'undefined' && !props[requiredProp]) {
      return new Error(`The prop \`${propFullNameSafe}\` of ` + `\`${componentNameInError}\` can only be used together with the \`${requiredProp}\` prop.`);
    }

    return null;
  };

  return requireProp;
}

/**
 * TODO v5: consider making it private
 *
 * passes {value} to {ref}
 *
 * WARNING: Be sure to only call this inside a callback that is passed as a ref.
 * Otherwise, make sure to cleanup the previous {ref} if it changes. See
 * https://github.com/mui/material-ui/issues/13539
 *
 * Useful if you want to expose the ref of an inner component to the public API
 * while still using it inside the component.
 * @param ref A ref callback or ref object. If anything falsy, this is a no-op.
 */
function setRef(ref, value) {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}

const useEnhancedEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;
var useEnhancedEffect$1 = useEnhancedEffect;

let globalId = 0;

function useGlobalId(idOverride) {
  const [defaultId, setDefaultId] = React.useState(idOverride);
  const id = idOverride || defaultId;
  React.useEffect(() => {
    if (defaultId == null) {
      // Fallback to this default id when possible.
      // Use the incrementing value for client-side rendering only.
      // We can't use it server-side.
      // If you want to use random values please consider the Birthday Problem: https://en.wikipedia.org/wiki/Birthday_problem
      globalId += 1;
      setDefaultId(`mui-${globalId}`);
    }
  }, [defaultId]);
  return id;
} // eslint-disable-next-line no-useless-concat -- Workaround for https://github.com/webpack/webpack/issues/14814


const maybeReactUseId = React['useId' + ''];
/**
 *
 * @example <div id={useId()} />
 * @param idOverride
 * @returns {string}
 */

function useId(idOverride) {
  if (maybeReactUseId !== undefined) {
    const reactId = maybeReactUseId();
    return idOverride != null ? idOverride : reactId;
  } // eslint-disable-next-line react-hooks/rules-of-hooks -- `React.useId` is invariant at runtime.


  return useGlobalId(idOverride);
}

function unsupportedProp(props, propName, componentName, location, propFullName) {
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  const propFullNameSafe = propFullName || propName;

  if (typeof props[propName] !== 'undefined') {
    return new Error(`The prop \`${propFullNameSafe}\` is not supported. Please remove it.`);
  }

  return null;
}

/* eslint-disable react-hooks/rules-of-hooks, react-hooks/exhaustive-deps */
function useControlled({
  controlled,
  default: defaultProp,
  name,
  state = 'value'
}) {
  // isControlled is ignored in the hook dependency lists as it should never change.
  const {
    current: isControlled
  } = React.useRef(controlled !== undefined);
  const [valueState, setValue] = React.useState(defaultProp);
  const value = isControlled ? controlled : valueState;

  if (process.env.NODE_ENV !== 'production') {
    React.useEffect(() => {
      if (isControlled !== (controlled !== undefined)) {
        console.error([`MUI: A component is changing the ${isControlled ? '' : 'un'}controlled ${state} state of ${name} to be ${isControlled ? 'un' : ''}controlled.`, 'Elements should not switch from uncontrolled to controlled (or vice versa).', `Decide between using a controlled or uncontrolled ${name} ` + 'element for the lifetime of the component.', "The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.", 'More info: https://fb.me/react-controlled-components'].join('\n'));
      }
    }, [state, name, controlled]);
    const {
      current: defaultValue
    } = React.useRef(defaultProp);
    React.useEffect(() => {
      if (!isControlled && defaultValue !== defaultProp) {
        console.error([`MUI: A component is changing the default ${state} state of an uncontrolled ${name} after being initialized. ` + `To suppress this warning opt to use a controlled ${name}.`].join('\n'));
      }
    }, [JSON.stringify(defaultProp)]);
  }

  const setValueIfUncontrolled = React.useCallback(newValue => {
    if (!isControlled) {
      setValue(newValue);
    }
  }, []);
  return [value, setValueIfUncontrolled];
}

/**
 * https://github.com/facebook/react/issues/14099#issuecomment-440013892
 */

function useEventCallback(fn) {
  const ref = React.useRef(fn);
  useEnhancedEffect$1(() => {
    ref.current = fn;
  });
  return React.useCallback((...args) => // @ts-expect-error hide `this`
  // tslint:disable-next-line:ban-comma-operator
  (0, ref.current)(...args), []);
}

function useForkRef(refA, refB) {
  /**
   * This will create a new function if the ref props change and are defined.
   * This means react will call the old forkRef with `null` and the new forkRef
   * with the ref. Cleanup naturally emerges from this behavior.
   */
  return React.useMemo(() => {
    if (refA == null && refB == null) {
      return null;
    }

    return refValue => {
      setRef(refA, refValue);
      setRef(refB, refValue);
    };
  }, [refA, refB]);
}

// based on https://github.com/WICG/focus-visible/blob/v4.1.5/src/focus-visible.js
let hadKeyboardEvent = true;
let hadFocusVisibleRecently = false;
let hadFocusVisibleRecentlyTimeout;
const inputTypesWhitelist = {
  text: true,
  search: true,
  url: true,
  tel: true,
  email: true,
  password: true,
  number: true,
  date: true,
  month: true,
  week: true,
  time: true,
  datetime: true,
  'datetime-local': true
};
/**
 * Computes whether the given element should automatically trigger the
 * `focus-visible` class being added, i.e. whether it should always match
 * `:focus-visible` when focused.
 * @param {Element} node
 * @returns {boolean}
 */

function focusTriggersKeyboardModality(node) {
  const {
    type,
    tagName
  } = node;

  if (tagName === 'INPUT' && inputTypesWhitelist[type] && !node.readOnly) {
    return true;
  }

  if (tagName === 'TEXTAREA' && !node.readOnly) {
    return true;
  }

  if (node.isContentEditable) {
    return true;
  }

  return false;
}
/**
 * Keep track of our keyboard modality state with `hadKeyboardEvent`.
 * If the most recent user interaction was via the keyboard;
 * and the key press did not include a meta, alt/option, or control key;
 * then the modality is keyboard. Otherwise, the modality is not keyboard.
 * @param {KeyboardEvent} event
 */


function handleKeyDown(event) {
  if (event.metaKey || event.altKey || event.ctrlKey) {
    return;
  }

  hadKeyboardEvent = true;
}
/**
 * If at any point a user clicks with a pointing device, ensure that we change
 * the modality away from keyboard.
 * This avoids the situation where a user presses a key on an already focused
 * element, and then clicks on a different element, focusing it with a
 * pointing device, while we still think we're in keyboard modality.
 */


function handlePointerDown() {
  hadKeyboardEvent = false;
}

function handleVisibilityChange() {
  if (this.visibilityState === 'hidden') {
    // If the tab becomes active again, the browser will handle calling focus
    // on the element (Safari actually calls it twice).
    // If this tab change caused a blur on an element with focus-visible,
    // re-apply the class when the user switches back to the tab.
    if (hadFocusVisibleRecently) {
      hadKeyboardEvent = true;
    }
  }
}

function prepare(doc) {
  doc.addEventListener('keydown', handleKeyDown, true);
  doc.addEventListener('mousedown', handlePointerDown, true);
  doc.addEventListener('pointerdown', handlePointerDown, true);
  doc.addEventListener('touchstart', handlePointerDown, true);
  doc.addEventListener('visibilitychange', handleVisibilityChange, true);
}

function isFocusVisible(event) {
  const {
    target
  } = event;

  try {
    return target.matches(':focus-visible');
  } catch (error) {// Browsers not implementing :focus-visible will throw a SyntaxError.
    // We use our own heuristic for those browsers.
    // Rethrow might be better if it's not the expected error but do we really
    // want to crash if focus-visible malfunctioned?
  } // No need for validFocusTarget check. The user does that by attaching it to
  // focusable events only.


  return hadKeyboardEvent || focusTriggersKeyboardModality(target);
}

function useIsFocusVisible() {
  const ref = React.useCallback(node => {
    if (node != null) {
      prepare(node.ownerDocument);
    }
  }, []);
  const isFocusVisibleRef = React.useRef(false);
  /**
   * Should be called if a blur event is fired
   */

  function handleBlurVisible() {
    // checking against potential state variable does not suffice if we focus and blur synchronously.
    // React wouldn't have time to trigger a re-render so `focusVisible` would be stale.
    // Ideally we would adjust `isFocusVisible(event)` to look at `relatedTarget` for blur events.
    // This doesn't work in IE11 due to https://github.com/facebook/react/issues/3751
    // TODO: check again if React releases their internal changes to focus event handling (https://github.com/facebook/react/pull/19186).
    if (isFocusVisibleRef.current) {
      // To detect a tab/window switch, we look for a blur event followed
      // rapidly by a visibility change.
      // If we don't see a visibility change within 100ms, it's probably a
      // regular focus change.
      hadFocusVisibleRecently = true;
      window.clearTimeout(hadFocusVisibleRecentlyTimeout);
      hadFocusVisibleRecentlyTimeout = window.setTimeout(() => {
        hadFocusVisibleRecently = false;
      }, 100);
      isFocusVisibleRef.current = false;
      return true;
    }

    return false;
  }
  /**
   * Should be called if a blur event is fired
   */


  function handleFocusVisible(event) {
    if (isFocusVisible(event)) {
      isFocusVisibleRef.current = true;
      return true;
    }

    return false;
  }

  return {
    isFocusVisibleRef,
    onFocus: handleFocusVisible,
    onBlur: handleBlurVisible,
    ref
  };
}

// A change of the browser zoom change the scrollbar size.
// Credit https://github.com/twbs/bootstrap/blob/488fd8afc535ca3a6ad4dc581f5e89217b6a36ac/js/src/util/scrollbar.js#L14-L18
function getScrollbarSize(doc) {
  // https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth#usage_notes
  const documentWidth = doc.documentElement.clientWidth;
  return Math.abs(window.innerWidth - documentWidth);
}

function getTypeByValue(value) {
  const valueType = typeof value;

  switch (valueType) {
    case 'number':
      if (Number.isNaN(value)) {
        return 'NaN';
      }

      if (!Number.isFinite(value)) {
        return 'Infinity';
      }

      if (value !== Math.floor(value)) {
        return 'float';
      }

      return 'number';

    case 'object':
      if (value === null) {
        return 'null';
      }

      return value.constructor.name;

    default:
      return valueType;
  }
} // IE 11 support

function ponyfillIsInteger(x) {
  // eslint-disable-next-line no-restricted-globals
  return typeof x === 'number' && isFinite(x) && Math.floor(x) === x;
}

const isInteger = Number.isInteger || ponyfillIsInteger;

function requiredInteger(props, propName, componentName, location) {
  const propValue = props[propName];

  if (propValue == null || !isInteger(propValue)) {
    const propType = getTypeByValue(propValue);
    return new RangeError(`Invalid ${location} \`${propName}\` of type \`${propType}\` supplied to \`${componentName}\`, expected \`integer\`.`);
  }

  return null;
}

function validator(props, propName, ...other) {
  const propValue = props[propName];

  if (propValue === undefined) {
    return null;
  }

  return requiredInteger(props, propName, ...other);
}

function validatorNoop() {
  return null;
}

validator.isRequired = requiredInteger;
validatorNoop.isRequired = validatorNoop;
var integerPropType = process.env.NODE_ENV === 'production' ? validatorNoop : validator;

/**
 * Add keys, values of `defaultProps` that does not exist in `props`
 * @param {object} defaultProps
 * @param {object} props
 * @returns {object} resolved props
 */
function resolveProps(defaultProps, props) {
  const output = _extends$3({}, props);

  Object.keys(defaultProps).forEach(propName => {
    if (output[propName] === undefined) {
      output[propName] = defaultProps[propName];
    }
  });
  return output;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function toVal(mix) {
	var k, y, str='';

	if (typeof mix === 'string' || typeof mix === 'number') {
		str += mix;
	} else if (typeof mix === 'object') {
		if (Array.isArray(mix)) {
			for (k=0; k < mix.length; k++) {
				if (mix[k]) {
					if (y = toVal(mix[k])) {
						str && (str += ' ');
						str += y;
					}
				}
			}
		} else {
			for (k in mix) {
				if (mix[k]) {
					str && (str += ' ');
					str += k;
				}
			}
		}
	}

	return str;
}

function clsx () {
	var i=0, tmp, x, str='';
	while (i < arguments.length) {
		if (tmp = arguments[i++]) {
			if (x = toVal(tmp)) {
				str && (str += ' ');
				str += x;
			}
		}
	}
	return str;
}

/**
 * Determines if a given element is a DOM element name (i.e. not a React component).
 */
function isHostComponent(element) {
  return typeof element === 'string';
}

function composeClasses(slots, getUtilityClass, classes) {
  const output = {};
  Object.keys(slots).forEach( // `Objet.keys(slots)` can't be wider than `T` because we infer `T` from `slots`.
  // @ts-expect-error https://github.com/microsoft/TypeScript/pull/12253#issuecomment-263132208
  slot => {
    output[slot] = slots[slot].reduce((acc, key) => {
      if (key) {
        if (classes && classes[key]) {
          acc.push(classes[key]);
        }

        acc.push(getUtilityClass(key));
      }

      return acc;
    }, []).join(' ');
  });
  return output;
}

const globalStateClassesMapping = {
  active: 'Mui-active',
  checked: 'Mui-checked',
  completed: 'Mui-completed',
  disabled: 'Mui-disabled',
  error: 'Mui-error',
  expanded: 'Mui-expanded',
  focused: 'Mui-focused',
  focusVisible: 'Mui-focusVisible',
  required: 'Mui-required',
  selected: 'Mui-selected'
};
function generateUtilityClass(componentName, slot) {
  const globalStateClass = globalStateClassesMapping[slot];
  return globalStateClass || `${ClassNameGenerator$1.generate(componentName)}-${slot}`;
}

function generateUtilityClasses(componentName, slots) {
  const result = {};
  slots.forEach(slot => {
    result[slot] = generateUtilityClass(componentName, slot);
  });
  return result;
}

var jsxRuntime = {exports: {}};

var reactJsxRuntime_production_min = {};

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty$1.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

/** @license React v17.0.2
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f=React__default,g=60103;reactJsxRuntime_production_min.Fragment=60107;if("function"===typeof Symbol&&Symbol.for){var h=Symbol.for;g=h("react.element");reactJsxRuntime_production_min.Fragment=h("react.fragment");}var m=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,n=Object.prototype.hasOwnProperty,p={key:!0,ref:!0,__self:!0,__source:!0};
function q(c,a,k){var b,d={},e=null,l=null;void 0!==k&&(e=""+k);void 0!==a.key&&(e=""+a.key);void 0!==a.ref&&(l=a.ref);for(b in a)n.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps,a)void 0===d[b]&&(d[b]=a[b]);return {$$typeof:g,type:c,key:e,ref:l,props:d,_owner:m.current}}reactJsxRuntime_production_min.jsx=q;reactJsxRuntime_production_min.jsxs=q;

var reactJsxRuntime_development = {};

/** @license React v17.0.2
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

(function (exports) {

if (process.env.NODE_ENV !== "production") {
  (function() {

var React = React__default;
var _assign = objectAssign;

// ATTENTION
// When adding new symbols to this file,
// Please consider also adding to 'react-devtools-shared/src/backend/ReactSymbols'
// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var REACT_ELEMENT_TYPE = 0xeac7;
var REACT_PORTAL_TYPE = 0xeaca;
exports.Fragment = 0xeacb;
var REACT_STRICT_MODE_TYPE = 0xeacc;
var REACT_PROFILER_TYPE = 0xead2;
var REACT_PROVIDER_TYPE = 0xeacd;
var REACT_CONTEXT_TYPE = 0xeace;
var REACT_FORWARD_REF_TYPE = 0xead0;
var REACT_SUSPENSE_TYPE = 0xead1;
var REACT_SUSPENSE_LIST_TYPE = 0xead8;
var REACT_MEMO_TYPE = 0xead3;
var REACT_LAZY_TYPE = 0xead4;
var REACT_BLOCK_TYPE = 0xead9;
var REACT_SERVER_BLOCK_TYPE = 0xeada;
var REACT_FUNDAMENTAL_TYPE = 0xead5;
var REACT_DEBUG_TRACING_MODE_TYPE = 0xeae1;
var REACT_LEGACY_HIDDEN_TYPE = 0xeae3;

if (typeof Symbol === 'function' && Symbol.for) {
  var symbolFor = Symbol.for;
  REACT_ELEMENT_TYPE = symbolFor('react.element');
  REACT_PORTAL_TYPE = symbolFor('react.portal');
  exports.Fragment = symbolFor('react.fragment');
  REACT_STRICT_MODE_TYPE = symbolFor('react.strict_mode');
  REACT_PROFILER_TYPE = symbolFor('react.profiler');
  REACT_PROVIDER_TYPE = symbolFor('react.provider');
  REACT_CONTEXT_TYPE = symbolFor('react.context');
  REACT_FORWARD_REF_TYPE = symbolFor('react.forward_ref');
  REACT_SUSPENSE_TYPE = symbolFor('react.suspense');
  REACT_SUSPENSE_LIST_TYPE = symbolFor('react.suspense_list');
  REACT_MEMO_TYPE = symbolFor('react.memo');
  REACT_LAZY_TYPE = symbolFor('react.lazy');
  REACT_BLOCK_TYPE = symbolFor('react.block');
  REACT_SERVER_BLOCK_TYPE = symbolFor('react.server.block');
  REACT_FUNDAMENTAL_TYPE = symbolFor('react.fundamental');
  symbolFor('react.scope');
  symbolFor('react.opaque.id');
  REACT_DEBUG_TRACING_MODE_TYPE = symbolFor('react.debug_trace_mode');
  symbolFor('react.offscreen');
  REACT_LEGACY_HIDDEN_TYPE = symbolFor('react.legacy_hidden');
}

var MAYBE_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = '@@iterator';
function getIteratorFn(maybeIterable) {
  if (maybeIterable === null || typeof maybeIterable !== 'object') {
    return null;
  }

  var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];

  if (typeof maybeIterator === 'function') {
    return maybeIterator;
  }

  return null;
}

var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

function error(format) {
  {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    printWarning('error', format, args);
  }
}

function printWarning(level, format, args) {
  // When changing this logic, you might want to also
  // update consoleWithStackDev.www.js as well.
  {
    var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
    var stack = ReactDebugCurrentFrame.getStackAddendum();

    if (stack !== '') {
      format += '%s';
      args = args.concat([stack]);
    }

    var argsWithFormat = args.map(function (item) {
      return '' + item;
    }); // Careful: RN currently depends on this prefix

    argsWithFormat.unshift('Warning: ' + format); // We intentionally don't use spread (or .apply) directly because it
    // breaks IE9: https://github.com/facebook/react/issues/13610
    // eslint-disable-next-line react-internal/no-production-logging

    Function.prototype.apply.call(console[level], console, argsWithFormat);
  }
}

// Filter certain DOM attributes (e.g. src, href) if their values are empty strings.

var enableScopeAPI = false; // Experimental Create Event Handle API.

function isValidElementType(type) {
  if (typeof type === 'string' || typeof type === 'function') {
    return true;
  } // Note: typeof might be other than 'symbol' or 'number' (e.g. if it's a polyfill).


  if (type === exports.Fragment || type === REACT_PROFILER_TYPE || type === REACT_DEBUG_TRACING_MODE_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || type === REACT_LEGACY_HIDDEN_TYPE || enableScopeAPI ) {
    return true;
  }

  if (typeof type === 'object' && type !== null) {
    if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_BLOCK_TYPE || type[0] === REACT_SERVER_BLOCK_TYPE) {
      return true;
    }
  }

  return false;
}

function getWrappedName(outerType, innerType, wrapperName) {
  var functionName = innerType.displayName || innerType.name || '';
  return outerType.displayName || (functionName !== '' ? wrapperName + "(" + functionName + ")" : wrapperName);
}

function getContextName(type) {
  return type.displayName || 'Context';
}

function getComponentName(type) {
  if (type == null) {
    // Host root, text node or just invalid type.
    return null;
  }

  {
    if (typeof type.tag === 'number') {
      error('Received an unexpected object in getComponentName(). ' + 'This is likely a bug in React. Please file an issue.');
    }
  }

  if (typeof type === 'function') {
    return type.displayName || type.name || null;
  }

  if (typeof type === 'string') {
    return type;
  }

  switch (type) {
    case exports.Fragment:
      return 'Fragment';

    case REACT_PORTAL_TYPE:
      return 'Portal';

    case REACT_PROFILER_TYPE:
      return 'Profiler';

    case REACT_STRICT_MODE_TYPE:
      return 'StrictMode';

    case REACT_SUSPENSE_TYPE:
      return 'Suspense';

    case REACT_SUSPENSE_LIST_TYPE:
      return 'SuspenseList';
  }

  if (typeof type === 'object') {
    switch (type.$$typeof) {
      case REACT_CONTEXT_TYPE:
        var context = type;
        return getContextName(context) + '.Consumer';

      case REACT_PROVIDER_TYPE:
        var provider = type;
        return getContextName(provider._context) + '.Provider';

      case REACT_FORWARD_REF_TYPE:
        return getWrappedName(type, type.render, 'ForwardRef');

      case REACT_MEMO_TYPE:
        return getComponentName(type.type);

      case REACT_BLOCK_TYPE:
        return getComponentName(type._render);

      case REACT_LAZY_TYPE:
        {
          var lazyComponent = type;
          var payload = lazyComponent._payload;
          var init = lazyComponent._init;

          try {
            return getComponentName(init(payload));
          } catch (x) {
            return null;
          }
        }
    }
  }

  return null;
}

// Helpers to patch console.logs to avoid logging during side-effect free
// replaying on render function. This currently only patches the object
// lazily which won't cover if the log function was extracted eagerly.
// We could also eagerly patch the method.
var disabledDepth = 0;
var prevLog;
var prevInfo;
var prevWarn;
var prevError;
var prevGroup;
var prevGroupCollapsed;
var prevGroupEnd;

function disabledLog() {}

disabledLog.__reactDisabledLog = true;
function disableLogs() {
  {
    if (disabledDepth === 0) {
      /* eslint-disable react-internal/no-production-logging */
      prevLog = console.log;
      prevInfo = console.info;
      prevWarn = console.warn;
      prevError = console.error;
      prevGroup = console.group;
      prevGroupCollapsed = console.groupCollapsed;
      prevGroupEnd = console.groupEnd; // https://github.com/facebook/react/issues/19099

      var props = {
        configurable: true,
        enumerable: true,
        value: disabledLog,
        writable: true
      }; // $FlowFixMe Flow thinks console is immutable.

      Object.defineProperties(console, {
        info: props,
        log: props,
        warn: props,
        error: props,
        group: props,
        groupCollapsed: props,
        groupEnd: props
      });
      /* eslint-enable react-internal/no-production-logging */
    }

    disabledDepth++;
  }
}
function reenableLogs() {
  {
    disabledDepth--;

    if (disabledDepth === 0) {
      /* eslint-disable react-internal/no-production-logging */
      var props = {
        configurable: true,
        enumerable: true,
        writable: true
      }; // $FlowFixMe Flow thinks console is immutable.

      Object.defineProperties(console, {
        log: _assign({}, props, {
          value: prevLog
        }),
        info: _assign({}, props, {
          value: prevInfo
        }),
        warn: _assign({}, props, {
          value: prevWarn
        }),
        error: _assign({}, props, {
          value: prevError
        }),
        group: _assign({}, props, {
          value: prevGroup
        }),
        groupCollapsed: _assign({}, props, {
          value: prevGroupCollapsed
        }),
        groupEnd: _assign({}, props, {
          value: prevGroupEnd
        })
      });
      /* eslint-enable react-internal/no-production-logging */
    }

    if (disabledDepth < 0) {
      error('disabledDepth fell below zero. ' + 'This is a bug in React. Please file an issue.');
    }
  }
}

var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
var prefix;
function describeBuiltInComponentFrame(name, source, ownerFn) {
  {
    if (prefix === undefined) {
      // Extract the VM specific prefix used by each line.
      try {
        throw Error();
      } catch (x) {
        var match = x.stack.trim().match(/\n( *(at )?)/);
        prefix = match && match[1] || '';
      }
    } // We use the prefix to ensure our stacks line up with native stack frames.


    return '\n' + prefix + name;
  }
}
var reentry = false;
var componentFrameCache;

{
  var PossiblyWeakMap = typeof WeakMap === 'function' ? WeakMap : Map;
  componentFrameCache = new PossiblyWeakMap();
}

function describeNativeComponentFrame(fn, construct) {
  // If something asked for a stack inside a fake render, it should get ignored.
  if (!fn || reentry) {
    return '';
  }

  {
    var frame = componentFrameCache.get(fn);

    if (frame !== undefined) {
      return frame;
    }
  }

  var control;
  reentry = true;
  var previousPrepareStackTrace = Error.prepareStackTrace; // $FlowFixMe It does accept undefined.

  Error.prepareStackTrace = undefined;
  var previousDispatcher;

  {
    previousDispatcher = ReactCurrentDispatcher.current; // Set the dispatcher in DEV because this might be call in the render function
    // for warnings.

    ReactCurrentDispatcher.current = null;
    disableLogs();
  }

  try {
    // This should throw.
    if (construct) {
      // Something should be setting the props in the constructor.
      var Fake = function () {
        throw Error();
      }; // $FlowFixMe


      Object.defineProperty(Fake.prototype, 'props', {
        set: function () {
          // We use a throwing setter instead of frozen or non-writable props
          // because that won't throw in a non-strict mode function.
          throw Error();
        }
      });

      if (typeof Reflect === 'object' && Reflect.construct) {
        // We construct a different control for this case to include any extra
        // frames added by the construct call.
        try {
          Reflect.construct(Fake, []);
        } catch (x) {
          control = x;
        }

        Reflect.construct(fn, [], Fake);
      } else {
        try {
          Fake.call();
        } catch (x) {
          control = x;
        }

        fn.call(Fake.prototype);
      }
    } else {
      try {
        throw Error();
      } catch (x) {
        control = x;
      }

      fn();
    }
  } catch (sample) {
    // This is inlined manually because closure doesn't do it for us.
    if (sample && control && typeof sample.stack === 'string') {
      // This extracts the first frame from the sample that isn't also in the control.
      // Skipping one frame that we assume is the frame that calls the two.
      var sampleLines = sample.stack.split('\n');
      var controlLines = control.stack.split('\n');
      var s = sampleLines.length - 1;
      var c = controlLines.length - 1;

      while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
        // We expect at least one stack frame to be shared.
        // Typically this will be the root most one. However, stack frames may be
        // cut off due to maximum stack limits. In this case, one maybe cut off
        // earlier than the other. We assume that the sample is longer or the same
        // and there for cut off earlier. So we should find the root most frame in
        // the sample somewhere in the control.
        c--;
      }

      for (; s >= 1 && c >= 0; s--, c--) {
        // Next we find the first one that isn't the same which should be the
        // frame that called our sample function and the control.
        if (sampleLines[s] !== controlLines[c]) {
          // In V8, the first line is describing the message but other VMs don't.
          // If we're about to return the first line, and the control is also on the same
          // line, that's a pretty good indicator that our sample threw at same line as
          // the control. I.e. before we entered the sample frame. So we ignore this result.
          // This can happen if you passed a class to function component, or non-function.
          if (s !== 1 || c !== 1) {
            do {
              s--;
              c--; // We may still have similar intermediate frames from the construct call.
              // The next one that isn't the same should be our match though.

              if (c < 0 || sampleLines[s] !== controlLines[c]) {
                // V8 adds a "new" prefix for native classes. Let's remove it to make it prettier.
                var _frame = '\n' + sampleLines[s].replace(' at new ', ' at ');

                {
                  if (typeof fn === 'function') {
                    componentFrameCache.set(fn, _frame);
                  }
                } // Return the line we found.


                return _frame;
              }
            } while (s >= 1 && c >= 0);
          }

          break;
        }
      }
    }
  } finally {
    reentry = false;

    {
      ReactCurrentDispatcher.current = previousDispatcher;
      reenableLogs();
    }

    Error.prepareStackTrace = previousPrepareStackTrace;
  } // Fallback to just using the name if we couldn't make it throw.


  var name = fn ? fn.displayName || fn.name : '';
  var syntheticFrame = name ? describeBuiltInComponentFrame(name) : '';

  {
    if (typeof fn === 'function') {
      componentFrameCache.set(fn, syntheticFrame);
    }
  }

  return syntheticFrame;
}
function describeFunctionComponentFrame(fn, source, ownerFn) {
  {
    return describeNativeComponentFrame(fn, false);
  }
}

function shouldConstruct(Component) {
  var prototype = Component.prototype;
  return !!(prototype && prototype.isReactComponent);
}

function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {

  if (type == null) {
    return '';
  }

  if (typeof type === 'function') {
    {
      return describeNativeComponentFrame(type, shouldConstruct(type));
    }
  }

  if (typeof type === 'string') {
    return describeBuiltInComponentFrame(type);
  }

  switch (type) {
    case REACT_SUSPENSE_TYPE:
      return describeBuiltInComponentFrame('Suspense');

    case REACT_SUSPENSE_LIST_TYPE:
      return describeBuiltInComponentFrame('SuspenseList');
  }

  if (typeof type === 'object') {
    switch (type.$$typeof) {
      case REACT_FORWARD_REF_TYPE:
        return describeFunctionComponentFrame(type.render);

      case REACT_MEMO_TYPE:
        // Memo may contain any component type so we recursively resolve it.
        return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);

      case REACT_BLOCK_TYPE:
        return describeFunctionComponentFrame(type._render);

      case REACT_LAZY_TYPE:
        {
          var lazyComponent = type;
          var payload = lazyComponent._payload;
          var init = lazyComponent._init;

          try {
            // Lazy may contain any component type so we recursively resolve it.
            return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
          } catch (x) {}
        }
    }
  }

  return '';
}

var loggedTypeFailures = {};
var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;

function setCurrentlyValidatingElement(element) {
  {
    if (element) {
      var owner = element._owner;
      var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
      ReactDebugCurrentFrame.setExtraStackFrame(stack);
    } else {
      ReactDebugCurrentFrame.setExtraStackFrame(null);
    }
  }
}

function checkPropTypes(typeSpecs, values, location, componentName, element) {
  {
    // $FlowFixMe This is okay but Flow doesn't know it.
    var has = Function.call.bind(Object.prototype.hasOwnProperty);

    for (var typeSpecName in typeSpecs) {
      if (has(typeSpecs, typeSpecName)) {
        var error$1 = void 0; // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.

        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' + 'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.');
            err.name = 'Invariant Violation';
            throw err;
          }

          error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED');
        } catch (ex) {
          error$1 = ex;
        }

        if (error$1 && !(error$1 instanceof Error)) {
          setCurrentlyValidatingElement(element);

          error('%s: type specification of %s' + ' `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error$1);

          setCurrentlyValidatingElement(null);
        }

        if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error$1.message] = true;
          setCurrentlyValidatingElement(element);

          error('Failed %s type: %s', location, error$1.message);

          setCurrentlyValidatingElement(null);
        }
      }
    }
  }
}

var ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true
};
var specialPropKeyWarningShown;
var specialPropRefWarningShown;
var didWarnAboutStringRefs;

{
  didWarnAboutStringRefs = {};
}

function hasValidRef(config) {
  {
    if (hasOwnProperty.call(config, 'ref')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;

      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }

  return config.ref !== undefined;
}

function hasValidKey(config) {
  {
    if (hasOwnProperty.call(config, 'key')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;

      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }

  return config.key !== undefined;
}

function warnIfStringRefCannotBeAutoConverted(config, self) {
  {
    if (typeof config.ref === 'string' && ReactCurrentOwner.current && self && ReactCurrentOwner.current.stateNode !== self) {
      var componentName = getComponentName(ReactCurrentOwner.current.type);

      if (!didWarnAboutStringRefs[componentName]) {
        error('Component "%s" contains the string ref "%s". ' + 'Support for string refs will be removed in a future major release. ' + 'This case cannot be automatically converted to an arrow function. ' + 'We ask you to manually fix this case by using useRef() or createRef() instead. ' + 'Learn more about using refs safely here: ' + 'https://reactjs.org/link/strict-mode-string-ref', getComponentName(ReactCurrentOwner.current.type), config.ref);

        didWarnAboutStringRefs[componentName] = true;
      }
    }
  }
}

function defineKeyPropWarningGetter(props, displayName) {
  {
    var warnAboutAccessingKey = function () {
      if (!specialPropKeyWarningShown) {
        specialPropKeyWarningShown = true;

        error('%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
      }
    };

    warnAboutAccessingKey.isReactWarning = true;
    Object.defineProperty(props, 'key', {
      get: warnAboutAccessingKey,
      configurable: true
    });
  }
}

function defineRefPropWarningGetter(props, displayName) {
  {
    var warnAboutAccessingRef = function () {
      if (!specialPropRefWarningShown) {
        specialPropRefWarningShown = true;

        error('%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
      }
    };

    warnAboutAccessingRef.isReactWarning = true;
    Object.defineProperty(props, 'ref', {
      get: warnAboutAccessingRef,
      configurable: true
    });
  }
}
/**
 * Factory method to create a new React element. This no longer adheres to
 * the class pattern, so do not use new to call it. Also, instanceof check
 * will not work. Instead test $$typeof field against Symbol.for('react.element') to check
 * if something is a React Element.
 *
 * @param {*} type
 * @param {*} props
 * @param {*} key
 * @param {string|object} ref
 * @param {*} owner
 * @param {*} self A *temporary* helper to detect places where `this` is
 * different from the `owner` when React.createElement is called, so that we
 * can warn. We want to get rid of owner and replace string `ref`s with arrow
 * functions, and as long as `this` and owner are the same, there will be no
 * change in behavior.
 * @param {*} source An annotation object (added by a transpiler or otherwise)
 * indicating filename, line number, and/or other information.
 * @internal
 */


var ReactElement = function (type, key, ref, self, source, owner, props) {
  var element = {
    // This tag allows us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE,
    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    props: props,
    // Record the component responsible for creating this element.
    _owner: owner
  };

  {
    // The validation flag is currently mutative. We put it on
    // an external backing store so that we can freeze the whole object.
    // This can be replaced with a WeakMap once they are implemented in
    // commonly used development environments.
    element._store = {}; // To make comparing ReactElements easier for testing purposes, we make
    // the validation flag non-enumerable (where possible, which should
    // include every environment we run tests in), so the test framework
    // ignores it.

    Object.defineProperty(element._store, 'validated', {
      configurable: false,
      enumerable: false,
      writable: true,
      value: false
    }); // self and source are DEV only properties.

    Object.defineProperty(element, '_self', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: self
    }); // Two elements created in two different places should be considered
    // equal for testing purposes and therefore we hide it from enumeration.

    Object.defineProperty(element, '_source', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: source
    });

    if (Object.freeze) {
      Object.freeze(element.props);
      Object.freeze(element);
    }
  }

  return element;
};
/**
 * https://github.com/reactjs/rfcs/pull/107
 * @param {*} type
 * @param {object} props
 * @param {string} key
 */

function jsxDEV(type, config, maybeKey, source, self) {
  {
    var propName; // Reserved names are extracted

    var props = {};
    var key = null;
    var ref = null; // Currently, key can be spread in as a prop. This causes a potential
    // issue if key is also explicitly declared (ie. <div {...props} key="Hi" />
    // or <div key="Hi" {...props} /> ). We want to deprecate key spread,
    // but as an intermediary step, we will use jsxDEV for everything except
    // <div {...props} key="Hi" />, because we aren't currently able to tell if
    // key is explicitly declared to be undefined or not.

    if (maybeKey !== undefined) {
      key = '' + maybeKey;
    }

    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    if (hasValidRef(config)) {
      ref = config.ref;
      warnIfStringRefCannotBeAutoConverted(config, self);
    } // Remaining properties are added to a new props object


    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    } // Resolve default props


    if (type && type.defaultProps) {
      var defaultProps = type.defaultProps;

      for (propName in defaultProps) {
        if (props[propName] === undefined) {
          props[propName] = defaultProps[propName];
        }
      }
    }

    if (key || ref) {
      var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;

      if (key) {
        defineKeyPropWarningGetter(props, displayName);
      }

      if (ref) {
        defineRefPropWarningGetter(props, displayName);
      }
    }

    return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
  }
}

var ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner;
var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;

function setCurrentlyValidatingElement$1(element) {
  {
    if (element) {
      var owner = element._owner;
      var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
      ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
    } else {
      ReactDebugCurrentFrame$1.setExtraStackFrame(null);
    }
  }
}

var propTypesMisspellWarningShown;

{
  propTypesMisspellWarningShown = false;
}
/**
 * Verifies the object is a ReactElement.
 * See https://reactjs.org/docs/react-api.html#isvalidelement
 * @param {?object} object
 * @return {boolean} True if `object` is a ReactElement.
 * @final
 */

function isValidElement(object) {
  {
    return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
  }
}

function getDeclarationErrorAddendum() {
  {
    if (ReactCurrentOwner$1.current) {
      var name = getComponentName(ReactCurrentOwner$1.current.type);

      if (name) {
        return '\n\nCheck the render method of `' + name + '`.';
      }
    }

    return '';
  }
}

function getSourceInfoErrorAddendum(source) {
  {
    if (source !== undefined) {
      var fileName = source.fileName.replace(/^.*[\\\/]/, '');
      var lineNumber = source.lineNumber;
      return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
    }

    return '';
  }
}
/**
 * Warn if there's no key explicitly set on dynamic arrays of children or
 * object keys are not valid. This allows us to keep track of children between
 * updates.
 */


var ownerHasKeyUseWarning = {};

function getCurrentComponentErrorInfo(parentType) {
  {
    var info = getDeclarationErrorAddendum();

    if (!info) {
      var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;

      if (parentName) {
        info = "\n\nCheck the top-level render call using <" + parentName + ">.";
      }
    }

    return info;
  }
}
/**
 * Warn if the element doesn't have an explicit key assigned to it.
 * This element is in an array. The array could grow and shrink or be
 * reordered. All children that haven't already been validated are required to
 * have a "key" property assigned to it. Error statuses are cached so a warning
 * will only be shown once.
 *
 * @internal
 * @param {ReactElement} element Element that requires a key.
 * @param {*} parentType element's parent's type.
 */


function validateExplicitKey(element, parentType) {
  {
    if (!element._store || element._store.validated || element.key != null) {
      return;
    }

    element._store.validated = true;
    var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);

    if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
      return;
    }

    ownerHasKeyUseWarning[currentComponentErrorInfo] = true; // Usually the current owner is the offender, but if it accepts children as a
    // property, it may be the creator of the child that's responsible for
    // assigning it a key.

    var childOwner = '';

    if (element && element._owner && element._owner !== ReactCurrentOwner$1.current) {
      // Give the component that originally created this child.
      childOwner = " It was passed a child from " + getComponentName(element._owner.type) + ".";
    }

    setCurrentlyValidatingElement$1(element);

    error('Each child in a list should have a unique "key" prop.' + '%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);

    setCurrentlyValidatingElement$1(null);
  }
}
/**
 * Ensure that every element either is passed in a static location, in an
 * array with an explicit keys property defined, or in an object literal
 * with valid key property.
 *
 * @internal
 * @param {ReactNode} node Statically passed child of any type.
 * @param {*} parentType node's parent's type.
 */


function validateChildKeys(node, parentType) {
  {
    if (typeof node !== 'object') {
      return;
    }

    if (Array.isArray(node)) {
      for (var i = 0; i < node.length; i++) {
        var child = node[i];

        if (isValidElement(child)) {
          validateExplicitKey(child, parentType);
        }
      }
    } else if (isValidElement(node)) {
      // This element was passed in a valid location.
      if (node._store) {
        node._store.validated = true;
      }
    } else if (node) {
      var iteratorFn = getIteratorFn(node);

      if (typeof iteratorFn === 'function') {
        // Entry iterators used to provide implicit keys,
        // but now we print a separate warning for them later.
        if (iteratorFn !== node.entries) {
          var iterator = iteratorFn.call(node);
          var step;

          while (!(step = iterator.next()).done) {
            if (isValidElement(step.value)) {
              validateExplicitKey(step.value, parentType);
            }
          }
        }
      }
    }
  }
}
/**
 * Given an element, validate that its props follow the propTypes definition,
 * provided by the type.
 *
 * @param {ReactElement} element
 */


function validatePropTypes(element) {
  {
    var type = element.type;

    if (type === null || type === undefined || typeof type === 'string') {
      return;
    }

    var propTypes;

    if (typeof type === 'function') {
      propTypes = type.propTypes;
    } else if (typeof type === 'object' && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
    // Inner props are checked in the reconciler.
    type.$$typeof === REACT_MEMO_TYPE)) {
      propTypes = type.propTypes;
    } else {
      return;
    }

    if (propTypes) {
      // Intentionally inside to avoid triggering lazy initializers:
      var name = getComponentName(type);
      checkPropTypes(propTypes, element.props, 'prop', name, element);
    } else if (type.PropTypes !== undefined && !propTypesMisspellWarningShown) {
      propTypesMisspellWarningShown = true; // Intentionally inside to avoid triggering lazy initializers:

      var _name = getComponentName(type);

      error('Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', _name || 'Unknown');
    }

    if (typeof type.getDefaultProps === 'function' && !type.getDefaultProps.isReactClassApproved) {
      error('getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');
    }
  }
}
/**
 * Given a fragment, validate that it can only be provided with fragment props
 * @param {ReactElement} fragment
 */


function validateFragmentProps(fragment) {
  {
    var keys = Object.keys(fragment.props);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];

      if (key !== 'children' && key !== 'key') {
        setCurrentlyValidatingElement$1(fragment);

        error('Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.', key);

        setCurrentlyValidatingElement$1(null);
        break;
      }
    }

    if (fragment.ref !== null) {
      setCurrentlyValidatingElement$1(fragment);

      error('Invalid attribute `ref` supplied to `React.Fragment`.');

      setCurrentlyValidatingElement$1(null);
    }
  }
}

function jsxWithValidation(type, props, key, isStaticChildren, source, self) {
  {
    var validType = isValidElementType(type); // We warn in this case but don't throw. We expect the element creation to
    // succeed and there will likely be errors in render.

    if (!validType) {
      var info = '';

      if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
        info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
      }

      var sourceInfo = getSourceInfoErrorAddendum(source);

      if (sourceInfo) {
        info += sourceInfo;
      } else {
        info += getDeclarationErrorAddendum();
      }

      var typeString;

      if (type === null) {
        typeString = 'null';
      } else if (Array.isArray(type)) {
        typeString = 'array';
      } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {
        typeString = "<" + (getComponentName(type.type) || 'Unknown') + " />";
        info = ' Did you accidentally export a JSX literal instead of a component?';
      } else {
        typeString = typeof type;
      }

      error('React.jsx: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', typeString, info);
    }

    var element = jsxDEV(type, props, key, source, self); // The result can be nullish if a mock or a custom function is used.
    // TODO: Drop this when these are no longer allowed as the type argument.

    if (element == null) {
      return element;
    } // Skip key warning if the type isn't valid since our key validation logic
    // doesn't expect a non-string/function type and can throw confusing errors.
    // We don't want exception behavior to differ between dev and prod.
    // (Rendering will throw with a helpful message and as soon as the type is
    // fixed, the key warnings will appear.)


    if (validType) {
      var children = props.children;

      if (children !== undefined) {
        if (isStaticChildren) {
          if (Array.isArray(children)) {
            for (var i = 0; i < children.length; i++) {
              validateChildKeys(children[i], type);
            }

            if (Object.freeze) {
              Object.freeze(children);
            }
          } else {
            error('React.jsx: Static children should always be an array. ' + 'You are likely explicitly calling React.jsxs or React.jsxDEV. ' + 'Use the Babel transform instead.');
          }
        } else {
          validateChildKeys(children, type);
        }
      }
    }

    if (type === exports.Fragment) {
      validateFragmentProps(element);
    } else {
      validatePropTypes(element);
    }

    return element;
  }
} // These two functions exist to still get child warnings in dev
// even with the prod transform. This means that jsxDEV is purely
// opt-in behavior for better messages but that we won't stop
// giving you warnings if you use production apis.

function jsxWithValidationStatic(type, props, key) {
  {
    return jsxWithValidation(type, props, key, true);
  }
}
function jsxWithValidationDynamic(type, props, key) {
  {
    return jsxWithValidation(type, props, key, false);
  }
}

var jsx =  jsxWithValidationDynamic ; // we may want to special case jsxs internally to take advantage of static children.
// for now we can ship identical prod functions

var jsxs =  jsxWithValidationStatic ;

exports.jsx = jsx;
exports.jsxs = jsxs;
  })();
}
}(reactJsxRuntime_development));

if (process.env.NODE_ENV === 'production') {
  jsxRuntime.exports = reactJsxRuntime_production_min;
} else {
  jsxRuntime.exports = reactJsxRuntime_development;
}

function getContainer$1(container) {
  return typeof container === 'function' ? container() : container;
}
/**
 * Portals provide a first-class way to render children into a DOM node
 * that exists outside the DOM hierarchy of the parent component.
 */


const Portal = /*#__PURE__*/React.forwardRef(function Portal(props, ref) {
  const {
    children,
    container,
    disablePortal = false
  } = props;
  const [mountNode, setMountNode] = React.useState(null);
  const handleRef = useForkRef( /*#__PURE__*/React.isValidElement(children) ? children.ref : null, ref);
  useEnhancedEffect$1(() => {
    if (!disablePortal) {
      setMountNode(getContainer$1(container) || document.body);
    }
  }, [container, disablePortal]);
  useEnhancedEffect$1(() => {
    if (mountNode && !disablePortal) {
      setRef(ref, mountNode);
      return () => {
        setRef(ref, null);
      };
    }

    return undefined;
  }, [ref, mountNode, disablePortal]);

  if (disablePortal) {
    if ( /*#__PURE__*/React.isValidElement(children)) {
      return /*#__PURE__*/React.cloneElement(children, {
        ref: handleRef
      });
    }

    return children;
  }

  return mountNode ? /*#__PURE__*/ReactDOM.createPortal(children, mountNode) : mountNode;
});
process.env.NODE_ENV !== "production" ? Portal.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The children to render into the `container`.
   */
  children: PropTypes.node,

  /**
   * An HTML element or function that returns one.
   * The `container` will have the portal children appended to it.
   *
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: PropTypes
  /* @typescript-to-proptypes-ignore */
  .oneOfType([HTMLElementType, PropTypes.func]),

  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: PropTypes.bool
} : void 0;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line
  Portal['propTypes' + ''] = exactProp(Portal.propTypes);
}

var Portal$1 = Portal;

// Is a vertical scrollbar displayed?
function isOverflowing(container) {
  const doc = ownerDocument(container);

  if (doc.body === container) {
    return ownerWindow(container).innerWidth > doc.documentElement.clientWidth;
  }

  return container.scrollHeight > container.clientHeight;
}

function ariaHidden(element, show) {
  if (show) {
    element.setAttribute('aria-hidden', 'true');
  } else {
    element.removeAttribute('aria-hidden');
  }
}

function getPaddingRight(element) {
  return parseInt(ownerWindow(element).getComputedStyle(element).paddingRight, 10) || 0;
}

function ariaHiddenSiblings(container, mountElement, currentElement, elementsToExclude = [], show) {
  const blacklist = [mountElement, currentElement, ...elementsToExclude];
  const blacklistTagNames = ['TEMPLATE', 'SCRIPT', 'STYLE'];
  [].forEach.call(container.children, element => {
    if (blacklist.indexOf(element) === -1 && blacklistTagNames.indexOf(element.tagName) === -1) {
      ariaHidden(element, show);
    }
  });
}

function findIndexOf(items, callback) {
  let idx = -1;
  items.some((item, index) => {
    if (callback(item)) {
      idx = index;
      return true;
    }

    return false;
  });
  return idx;
}

function handleContainer(containerInfo, props) {
  const restoreStyle = [];
  const container = containerInfo.container;

  if (!props.disableScrollLock) {
    if (isOverflowing(container)) {
      // Compute the size before applying overflow hidden to avoid any scroll jumps.
      const scrollbarSize = getScrollbarSize(ownerDocument(container));
      restoreStyle.push({
        value: container.style.paddingRight,
        property: 'padding-right',
        el: container
      }); // Use computed style, here to get the real padding to add our scrollbar width.

      container.style.paddingRight = `${getPaddingRight(container) + scrollbarSize}px`; // .mui-fixed is a global helper.

      const fixedElements = ownerDocument(container).querySelectorAll('.mui-fixed');
      [].forEach.call(fixedElements, element => {
        restoreStyle.push({
          value: element.style.paddingRight,
          property: 'padding-right',
          el: element
        });
        element.style.paddingRight = `${getPaddingRight(element) + scrollbarSize}px`;
      });
    } // Improve Gatsby support
    // https://css-tricks.com/snippets/css/force-vertical-scrollbar/


    const parent = container.parentElement;
    const containerWindow = ownerWindow(container);
    const scrollContainer = (parent == null ? void 0 : parent.nodeName) === 'HTML' && containerWindow.getComputedStyle(parent).overflowY === 'scroll' ? parent : container; // Block the scroll even if no scrollbar is visible to account for mobile keyboard
    // screensize shrink.

    restoreStyle.push({
      value: scrollContainer.style.overflow,
      property: 'overflow',
      el: scrollContainer
    }, {
      value: scrollContainer.style.overflowX,
      property: 'overflow-x',
      el: scrollContainer
    }, {
      value: scrollContainer.style.overflowY,
      property: 'overflow-y',
      el: scrollContainer
    });
    scrollContainer.style.overflow = 'hidden';
  }

  const restore = () => {
    restoreStyle.forEach(({
      value,
      el,
      property
    }) => {
      if (value) {
        el.style.setProperty(property, value);
      } else {
        el.style.removeProperty(property);
      }
    });
  };

  return restore;
}

function getHiddenSiblings(container) {
  const hiddenSiblings = [];
  [].forEach.call(container.children, element => {
    if (element.getAttribute('aria-hidden') === 'true') {
      hiddenSiblings.push(element);
    }
  });
  return hiddenSiblings;
}

/**
 * @ignore - do not document.
 *
 * Proper state management for containers and the modals in those containers.
 * Simplified, but inspired by react-overlay's ModalManager class.
 * Used by the Modal to ensure proper styling of containers.
 */
class ModalManager {
  constructor() {
    this.containers = void 0;
    this.modals = void 0;
    this.modals = [];
    this.containers = [];
  }

  add(modal, container) {
    let modalIndex = this.modals.indexOf(modal);

    if (modalIndex !== -1) {
      return modalIndex;
    }

    modalIndex = this.modals.length;
    this.modals.push(modal); // If the modal we are adding is already in the DOM.

    if (modal.modalRef) {
      ariaHidden(modal.modalRef, false);
    }

    const hiddenSiblings = getHiddenSiblings(container);
    ariaHiddenSiblings(container, modal.mount, modal.modalRef, hiddenSiblings, true);
    const containerIndex = findIndexOf(this.containers, item => item.container === container);

    if (containerIndex !== -1) {
      this.containers[containerIndex].modals.push(modal);
      return modalIndex;
    }

    this.containers.push({
      modals: [modal],
      container,
      restore: null,
      hiddenSiblings
    });
    return modalIndex;
  }

  mount(modal, props) {
    const containerIndex = findIndexOf(this.containers, item => item.modals.indexOf(modal) !== -1);
    const containerInfo = this.containers[containerIndex];

    if (!containerInfo.restore) {
      containerInfo.restore = handleContainer(containerInfo, props);
    }
  }

  remove(modal) {
    const modalIndex = this.modals.indexOf(modal);

    if (modalIndex === -1) {
      return modalIndex;
    }

    const containerIndex = findIndexOf(this.containers, item => item.modals.indexOf(modal) !== -1);
    const containerInfo = this.containers[containerIndex];
    containerInfo.modals.splice(containerInfo.modals.indexOf(modal), 1);
    this.modals.splice(modalIndex, 1); // If that was the last modal in a container, clean up the container.

    if (containerInfo.modals.length === 0) {
      // The modal might be closed before it had the chance to be mounted in the DOM.
      if (containerInfo.restore) {
        containerInfo.restore();
      }

      if (modal.modalRef) {
        // In case the modal wasn't in the DOM yet.
        ariaHidden(modal.modalRef, true);
      }

      ariaHiddenSiblings(containerInfo.container, modal.mount, modal.modalRef, containerInfo.hiddenSiblings, false);
      this.containers.splice(containerIndex, 1);
    } else {
      // Otherwise make sure the next top modal is visible to a screen reader.
      const nextTop = containerInfo.modals[containerInfo.modals.length - 1]; // as soon as a modal is adding its modalRef is undefined. it can't set
      // aria-hidden because the dom element doesn't exist either
      // when modal was unmounted before modalRef gets null

      if (nextTop.modalRef) {
        ariaHidden(nextTop.modalRef, false);
      }
    }

    return modalIndex;
  }

  isTopModal(modal) {
    return this.modals.length > 0 && this.modals[this.modals.length - 1] === modal;
  }

}

/* eslint-disable consistent-return, jsx-a11y/no-noninteractive-tabindex */
const candidatesSelector = ['input', 'select', 'textarea', 'a[href]', 'button', '[tabindex]', 'audio[controls]', 'video[controls]', '[contenteditable]:not([contenteditable="false"])'].join(',');

function getTabIndex(node) {
  const tabindexAttr = parseInt(node.getAttribute('tabindex'), 10);

  if (!Number.isNaN(tabindexAttr)) {
    return tabindexAttr;
  } // Browsers do not return `tabIndex` correctly for contentEditable nodes;
  // https://bugs.chromium.org/p/chromium/issues/detail?id=661108&q=contenteditable%20tabindex&can=2
  // so if they don't have a tabindex attribute specifically set, assume it's 0.
  // in Chrome, <details/>, <audio controls/> and <video controls/> elements get a default
  //  `tabIndex` of -1 when the 'tabindex' attribute isn't specified in the DOM,
  //  yet they are still part of the regular tab order; in FF, they get a default
  //  `tabIndex` of 0; since Chrome still puts those elements in the regular tab
  //  order, consider their tab index to be 0.


  if (node.contentEditable === 'true' || (node.nodeName === 'AUDIO' || node.nodeName === 'VIDEO' || node.nodeName === 'DETAILS') && node.getAttribute('tabindex') === null) {
    return 0;
  }

  return node.tabIndex;
}

function isNonTabbableRadio(node) {
  if (node.tagName !== 'INPUT' || node.type !== 'radio') {
    return false;
  }

  if (!node.name) {
    return false;
  }

  const getRadio = selector => node.ownerDocument.querySelector(`input[type="radio"]${selector}`);

  let roving = getRadio(`[name="${node.name}"]:checked`);

  if (!roving) {
    roving = getRadio(`[name="${node.name}"]`);
  }

  return roving !== node;
}

function isNodeMatchingSelectorFocusable(node) {
  if (node.disabled || node.tagName === 'INPUT' && node.type === 'hidden' || isNonTabbableRadio(node)) {
    return false;
  }

  return true;
}

function defaultGetTabbable(root) {
  const regularTabNodes = [];
  const orderedTabNodes = [];
  Array.from(root.querySelectorAll(candidatesSelector)).forEach((node, i) => {
    const nodeTabIndex = getTabIndex(node);

    if (nodeTabIndex === -1 || !isNodeMatchingSelectorFocusable(node)) {
      return;
    }

    if (nodeTabIndex === 0) {
      regularTabNodes.push(node);
    } else {
      orderedTabNodes.push({
        documentOrder: i,
        tabIndex: nodeTabIndex,
        node
      });
    }
  });
  return orderedTabNodes.sort((a, b) => a.tabIndex === b.tabIndex ? a.documentOrder - b.documentOrder : a.tabIndex - b.tabIndex).map(a => a.node).concat(regularTabNodes);
}

function defaultIsEnabled() {
  return true;
}
/**
 * Utility component that locks focus inside the component.
 */


function TrapFocus(props) {
  const {
    children,
    disableAutoFocus = false,
    disableEnforceFocus = false,
    disableRestoreFocus = false,
    getTabbable = defaultGetTabbable,
    isEnabled = defaultIsEnabled,
    open
  } = props;
  const ignoreNextEnforceFocus = React.useRef();
  const sentinelStart = React.useRef(null);
  const sentinelEnd = React.useRef(null);
  const nodeToRestore = React.useRef(null);
  const reactFocusEventTarget = React.useRef(null); // This variable is useful when disableAutoFocus is true.
  // It waits for the active element to move into the component to activate.

  const activated = React.useRef(false);
  const rootRef = React.useRef(null);
  const handleRef = useForkRef(children.ref, rootRef);
  const lastKeydown = React.useRef(null);
  React.useEffect(() => {
    // We might render an empty child.
    if (!open || !rootRef.current) {
      return;
    }

    activated.current = !disableAutoFocus;
  }, [disableAutoFocus, open]);
  React.useEffect(() => {
    // We might render an empty child.
    if (!open || !rootRef.current) {
      return;
    }

    const doc = ownerDocument(rootRef.current);

    if (!rootRef.current.contains(doc.activeElement)) {
      if (!rootRef.current.hasAttribute('tabIndex')) {
        if (process.env.NODE_ENV !== 'production') {
          console.error(['MUI: The modal content node does not accept focus.', 'For the benefit of assistive technologies, ' + 'the tabIndex of the node is being set to "-1".'].join('\n'));
        }

        rootRef.current.setAttribute('tabIndex', -1);
      }

      if (activated.current) {
        rootRef.current.focus();
      }
    }

    return () => {
      // restoreLastFocus()
      if (!disableRestoreFocus) {
        // In IE11 it is possible for document.activeElement to be null resulting
        // in nodeToRestore.current being null.
        // Not all elements in IE11 have a focus method.
        // Once IE11 support is dropped the focus() call can be unconditional.
        if (nodeToRestore.current && nodeToRestore.current.focus) {
          ignoreNextEnforceFocus.current = true;
          nodeToRestore.current.focus();
        }

        nodeToRestore.current = null;
      }
    }; // Missing `disableRestoreFocus` which is fine.
    // We don't support changing that prop on an open TrapFocus
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);
  React.useEffect(() => {
    // We might render an empty child.
    if (!open || !rootRef.current) {
      return;
    }

    const doc = ownerDocument(rootRef.current);

    const contain = nativeEvent => {
      const {
        current: rootElement
      } = rootRef; // Cleanup functions are executed lazily in React 17.
      // Contain can be called between the component being unmounted and its cleanup function being run.

      if (rootElement === null) {
        return;
      }

      if (!doc.hasFocus() || disableEnforceFocus || !isEnabled() || ignoreNextEnforceFocus.current) {
        ignoreNextEnforceFocus.current = false;
        return;
      }

      if (!rootElement.contains(doc.activeElement)) {
        // if the focus event is not coming from inside the children's react tree, reset the refs
        if (nativeEvent && reactFocusEventTarget.current !== nativeEvent.target || doc.activeElement !== reactFocusEventTarget.current) {
          reactFocusEventTarget.current = null;
        } else if (reactFocusEventTarget.current !== null) {
          return;
        }

        if (!activated.current) {
          return;
        }

        let tabbable = [];

        if (doc.activeElement === sentinelStart.current || doc.activeElement === sentinelEnd.current) {
          tabbable = getTabbable(rootRef.current);
        }

        if (tabbable.length > 0) {
          var _lastKeydown$current, _lastKeydown$current2;

          const isShiftTab = Boolean(((_lastKeydown$current = lastKeydown.current) == null ? void 0 : _lastKeydown$current.shiftKey) && ((_lastKeydown$current2 = lastKeydown.current) == null ? void 0 : _lastKeydown$current2.key) === 'Tab');
          const focusNext = tabbable[0];
          const focusPrevious = tabbable[tabbable.length - 1];

          if (isShiftTab) {
            focusPrevious.focus();
          } else {
            focusNext.focus();
          }
        } else {
          rootElement.focus();
        }
      }
    };

    const loopFocus = nativeEvent => {
      lastKeydown.current = nativeEvent;

      if (disableEnforceFocus || !isEnabled() || nativeEvent.key !== 'Tab') {
        return;
      } // Make sure the next tab starts from the right place.
      // doc.activeElement referes to the origin.


      if (doc.activeElement === rootRef.current && nativeEvent.shiftKey) {
        // We need to ignore the next contain as
        // it will try to move the focus back to the rootRef element.
        ignoreNextEnforceFocus.current = true;
        sentinelEnd.current.focus();
      }
    };

    doc.addEventListener('focusin', contain);
    doc.addEventListener('keydown', loopFocus, true); // With Edge, Safari and Firefox, no focus related events are fired when the focused area stops being a focused area.
    // e.g. https://bugzilla.mozilla.org/show_bug.cgi?id=559561.
    // Instead, we can look if the active element was restored on the BODY element.
    //
    // The whatwg spec defines how the browser should behave but does not explicitly mention any events:
    // https://html.spec.whatwg.org/multipage/interaction.html#focus-fixup-rule.

    const interval = setInterval(() => {
      if (doc.activeElement.tagName === 'BODY') {
        contain();
      }
    }, 50);
    return () => {
      clearInterval(interval);
      doc.removeEventListener('focusin', contain);
      doc.removeEventListener('keydown', loopFocus, true);
    };
  }, [disableAutoFocus, disableEnforceFocus, disableRestoreFocus, isEnabled, open, getTabbable]);

  const onFocus = event => {
    if (nodeToRestore.current === null) {
      nodeToRestore.current = event.relatedTarget;
    }

    activated.current = true;
    reactFocusEventTarget.current = event.target;
    const childrenPropsHandler = children.props.onFocus;

    if (childrenPropsHandler) {
      childrenPropsHandler(event);
    }
  };

  const handleFocusSentinel = event => {
    if (nodeToRestore.current === null) {
      nodeToRestore.current = event.relatedTarget;
    }

    activated.current = true;
  };

  return /*#__PURE__*/jsxRuntime.exports.jsxs(React.Fragment, {
    children: [/*#__PURE__*/jsxRuntime.exports.jsx("div", {
      tabIndex: 0,
      onFocus: handleFocusSentinel,
      ref: sentinelStart,
      "data-test": "sentinelStart"
    }), /*#__PURE__*/React.cloneElement(children, {
      ref: handleRef,
      onFocus
    }), /*#__PURE__*/jsxRuntime.exports.jsx("div", {
      tabIndex: 0,
      onFocus: handleFocusSentinel,
      ref: sentinelEnd,
      "data-test": "sentinelEnd"
    })]
  });
}

process.env.NODE_ENV !== "production" ? TrapFocus.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * A single child content element.
   */
  children: elementAcceptingRef$1,

  /**
   * If `true`, the trap focus will not automatically shift focus to itself when it opens, and
   * replace it to the last focused element when it closes.
   * This also works correctly with any trap focus children that have the `disableAutoFocus` prop.
   *
   * Generally this should never be set to `true` as it makes the trap focus less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableAutoFocus: PropTypes.bool,

  /**
   * If `true`, the trap focus will not prevent focus from leaving the trap focus while open.
   *
   * Generally this should never be set to `true` as it makes the trap focus less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableEnforceFocus: PropTypes.bool,

  /**
   * If `true`, the trap focus will not restore focus to previously focused element once
   * trap focus is hidden or unmounted.
   * @default false
   */
  disableRestoreFocus: PropTypes.bool,

  /**
   * Returns an array of ordered tabbable nodes (i.e. in tab order) within the root.
   * For instance, you can provide the "tabbable" npm dependency.
   * @param {HTMLElement} root
   */
  getTabbable: PropTypes.func,

  /**
   * This prop extends the `open` prop.
   * It allows to toggle the open state without having to wait for a rerender when changing the `open` prop.
   * This prop should be memoized.
   * It can be used to support multiple trap focus mounted at the same time.
   * @default function defaultIsEnabled() {
   *   return true;
   * }
   */
  isEnabled: PropTypes.func,

  /**
   * If `true`, focus is locked.
   */
  open: PropTypes.bool.isRequired
} : void 0;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line
  TrapFocus['propTypes' + ''] = exactProp(TrapFocus.propTypes);
}

function getModalUtilityClass(slot) {
  return generateUtilityClass('MuiModal', slot);
}
generateUtilityClasses('MuiModal', ['root', 'hidden']);

const _excluded$r = ["BackdropComponent", "BackdropProps", "children", "classes", "className", "closeAfterTransition", "component", "components", "componentsProps", "container", "disableAutoFocus", "disableEnforceFocus", "disableEscapeKeyDown", "disablePortal", "disableRestoreFocus", "disableScrollLock", "hideBackdrop", "keepMounted", "manager", "onBackdropClick", "onClose", "onKeyDown", "open", "theme", "onTransitionEnter", "onTransitionExited"];

const useUtilityClasses$e = ownerState => {
  const {
    open,
    exited,
    classes
  } = ownerState;
  const slots = {
    root: ['root', !open && exited && 'hidden']
  };
  return composeClasses(slots, getModalUtilityClass, classes);
};

function getContainer(container) {
  return typeof container === 'function' ? container() : container;
}

function getHasTransition(props) {
  return props.children ? props.children.props.hasOwnProperty('in') : false;
} // A modal manager used to track and manage the state of open Modals.
// Modals don't open on the server so this won't conflict with concurrent requests.


const defaultManager = new ModalManager();
/**
 * Modal is a lower-level construct that is leveraged by the following components:
 *
 * - [Dialog](/api/dialog/)
 * - [Drawer](/api/drawer/)
 * - [Menu](/api/menu/)
 * - [Popover](/api/popover/)
 *
 * If you are creating a modal dialog, you probably want to use the [Dialog](/api/dialog/) component
 * rather than directly using Modal.
 *
 * This component shares many concepts with [react-overlays](https://react-bootstrap.github.io/react-overlays/#modals).
 */

const ModalUnstyled = /*#__PURE__*/React.forwardRef(function ModalUnstyled(props, ref) {
  const {
    BackdropComponent,
    BackdropProps,
    children,
    classes: classesProp,
    className,
    closeAfterTransition = false,
    component = 'div',
    components = {},
    componentsProps = {},
    container,
    disableAutoFocus = false,
    disableEnforceFocus = false,
    disableEscapeKeyDown = false,
    disablePortal = false,
    disableRestoreFocus = false,
    disableScrollLock = false,
    hideBackdrop = false,
    keepMounted = false,
    // private
    // eslint-disable-next-line react/prop-types
    manager = defaultManager,
    onBackdropClick,
    onClose,
    onKeyDown,
    open,

    /* eslint-disable react/prop-types */
    theme,
    onTransitionEnter,
    onTransitionExited
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded$r);

  const [exited, setExited] = React.useState(true);
  const modal = React.useRef({});
  const mountNodeRef = React.useRef(null);
  const modalRef = React.useRef(null);
  const handleRef = useForkRef(modalRef, ref);
  const hasTransition = getHasTransition(props);

  const getDoc = () => ownerDocument(mountNodeRef.current);

  const getModal = () => {
    modal.current.modalRef = modalRef.current;
    modal.current.mountNode = mountNodeRef.current;
    return modal.current;
  };

  const handleMounted = () => {
    manager.mount(getModal(), {
      disableScrollLock
    }); // Fix a bug on Chrome where the scroll isn't initially 0.

    modalRef.current.scrollTop = 0;
  };

  const handleOpen = useEventCallback(() => {
    const resolvedContainer = getContainer(container) || getDoc().body;
    manager.add(getModal(), resolvedContainer); // The element was already mounted.

    if (modalRef.current) {
      handleMounted();
    }
  });
  const isTopModal = React.useCallback(() => manager.isTopModal(getModal()), [manager]);
  const handlePortalRef = useEventCallback(node => {
    mountNodeRef.current = node;

    if (!node) {
      return;
    }

    if (open && isTopModal()) {
      handleMounted();
    } else {
      ariaHidden(modalRef.current, true);
    }
  });
  const handleClose = React.useCallback(() => {
    manager.remove(getModal());
  }, [manager]);
  React.useEffect(() => {
    return () => {
      handleClose();
    };
  }, [handleClose]);
  React.useEffect(() => {
    if (open) {
      handleOpen();
    } else if (!hasTransition || !closeAfterTransition) {
      handleClose();
    }
  }, [open, handleClose, hasTransition, closeAfterTransition, handleOpen]);

  const ownerState = _extends$3({}, props, {
    classes: classesProp,
    closeAfterTransition,
    disableAutoFocus,
    disableEnforceFocus,
    disableEscapeKeyDown,
    disablePortal,
    disableRestoreFocus,
    disableScrollLock,
    exited,
    hideBackdrop,
    keepMounted
  });

  const classes = useUtilityClasses$e(ownerState);

  if (!keepMounted && !open && (!hasTransition || exited)) {
    return null;
  }

  const handleEnter = () => {
    setExited(false);

    if (onTransitionEnter) {
      onTransitionEnter();
    }
  };

  const handleExited = () => {
    setExited(true);

    if (onTransitionExited) {
      onTransitionExited();
    }

    if (closeAfterTransition) {
      handleClose();
    }
  };

  const handleBackdropClick = event => {
    if (event.target !== event.currentTarget) {
      return;
    }

    if (onBackdropClick) {
      onBackdropClick(event);
    }

    if (onClose) {
      onClose(event, 'backdropClick');
    }
  };

  const handleKeyDown = event => {
    if (onKeyDown) {
      onKeyDown(event);
    } // The handler doesn't take event.defaultPrevented into account:
    //
    // event.preventDefault() is meant to stop default behaviors like
    // clicking a checkbox to check it, hitting a button to submit a form,
    // and hitting left arrow to move the cursor in a text input etc.
    // Only special HTML elements have these default behaviors.


    if (event.key !== 'Escape' || !isTopModal()) {
      return;
    }

    if (!disableEscapeKeyDown) {
      // Swallow the event, in case someone is listening for the escape key on the body.
      event.stopPropagation();

      if (onClose) {
        onClose(event, 'escapeKeyDown');
      }
    }
  };

  const childProps = {};

  if (children.props.tabIndex === undefined) {
    childProps.tabIndex = '-1';
  } // It's a Transition like component


  if (hasTransition) {
    childProps.onEnter = createChainedFunction(handleEnter, children.props.onEnter);
    childProps.onExited = createChainedFunction(handleExited, children.props.onExited);
  }

  const Root = components.Root || component;
  const rootProps = componentsProps.root || {};
  return /*#__PURE__*/jsxRuntime.exports.jsx(Portal$1, {
    ref: handlePortalRef,
    container: container,
    disablePortal: disablePortal,
    children: /*#__PURE__*/jsxRuntime.exports.jsxs(Root, _extends$3({
      role: "presentation"
    }, rootProps, !isHostComponent(Root) && {
      as: component,
      ownerState: _extends$3({}, ownerState, rootProps.ownerState),
      theme
    }, other, {
      ref: handleRef,
      onKeyDown: handleKeyDown,
      className: clsx(classes.root, rootProps.className, className),
      children: [!hideBackdrop && BackdropComponent ? /*#__PURE__*/jsxRuntime.exports.jsx(BackdropComponent, _extends$3({
        "aria-hidden": true,
        open: open,
        onClick: handleBackdropClick
      }, BackdropProps)) : null, /*#__PURE__*/jsxRuntime.exports.jsx(TrapFocus, {
        disableEnforceFocus: disableEnforceFocus,
        disableAutoFocus: disableAutoFocus,
        disableRestoreFocus: disableRestoreFocus,
        isEnabled: isTopModal,
        open: open,
        children: /*#__PURE__*/React.cloneElement(children, childProps)
      })]
    }))
  });
});
process.env.NODE_ENV !== "production" ? ModalUnstyled.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * A backdrop component. This prop enables custom backdrop rendering.
   */
  BackdropComponent: PropTypes.elementType,

  /**
   * Props applied to the backdrop element.
   */
  BackdropProps: PropTypes.object,

  /**
   * A single child content element.
   */
  children: elementAcceptingRef$1.isRequired,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * When set to true the Modal waits until a nested Transition is completed before closing.
   * @default false
   */
  closeAfterTransition: PropTypes.bool,

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,

  /**
   * The components used for each slot inside the Modal.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: PropTypes.shape({
    Root: PropTypes.elementType
  }),

  /**
   * The props used for each slot inside the Modal.
   * @default {}
   */
  componentsProps: PropTypes.shape({
    root: PropTypes.object
  }),

  /**
   * An HTML element or function that returns one.
   * The `container` will have the portal children appended to it.
   *
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: PropTypes
  /* @typescript-to-proptypes-ignore */
  .oneOfType([HTMLElementType, PropTypes.func]),

  /**
   * If `true`, the modal will not automatically shift focus to itself when it opens, and
   * replace it to the last focused element when it closes.
   * This also works correctly with any modal children that have the `disableAutoFocus` prop.
   *
   * Generally this should never be set to `true` as it makes the modal less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableAutoFocus: PropTypes.bool,

  /**
   * If `true`, the modal will not prevent focus from leaving the modal while open.
   *
   * Generally this should never be set to `true` as it makes the modal less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableEnforceFocus: PropTypes.bool,

  /**
   * If `true`, hitting escape will not fire the `onClose` callback.
   * @default false
   */
  disableEscapeKeyDown: PropTypes.bool,

  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: PropTypes.bool,

  /**
   * If `true`, the modal will not restore focus to previously focused element once
   * modal is hidden or unmounted.
   * @default false
   */
  disableRestoreFocus: PropTypes.bool,

  /**
   * Disable the scroll lock behavior.
   * @default false
   */
  disableScrollLock: PropTypes.bool,

  /**
   * If `true`, the backdrop is not rendered.
   * @default false
   */
  hideBackdrop: PropTypes.bool,

  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Modal.
   * @default false
   */
  keepMounted: PropTypes.bool,

  /**
   * Callback fired when the backdrop is clicked.
   */
  onBackdropClick: PropTypes.func,

  /**
   * Callback fired when the component requests to be closed.
   * The `reason` parameter can optionally be used to control the response to `onClose`.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`.
   */
  onClose: PropTypes.func,

  /**
   * @ignore
   */
  onKeyDown: PropTypes.func,

  /**
   * If `true`, the component is shown.
   */
  open: PropTypes.bool.isRequired
} : void 0;
var ModalUnstyled$1 = ModalUnstyled;

/** @license MUI v5.5.2
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
function styled$2(tag, options) {
  const stylesFactory = styled$3(tag, options);

  if (process.env.NODE_ENV !== 'production') {
    return (...styles) => {
      const component = typeof tag === 'string' ? `"${tag}"` : 'component';

      if (styles.length === 0) {
        console.error([`MUI: Seems like you called \`styled(${component})()\` without a \`style\` argument.`, 'You must provide a `styles` argument: `styled("div")(styleYouForgotToPass)`.'].join('\n'));
      } else if (styles.some(style => style === undefined)) {
        console.error(`MUI: the styled(${component})(...args) API requires all its args to be defined.`);
      }

      return stylesFactory(...styles);
    };
  }

  return stylesFactory;
}

const responsivePropType = process.env.NODE_ENV !== 'production' ? PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object, PropTypes.array]) : {};
var responsivePropType$1 = responsivePropType;

function merge(acc, item) {
  if (!item) {
    return acc;
  }

  return deepmerge(acc, item, {
    clone: false // No need to clone deep, it's way faster.

  });
}

// For instance with the first breakpoint xs: [xs, sm[.

const values$1 = {
  xs: 0,
  // phone
  sm: 600,
  // tablet
  md: 900,
  // small laptop
  lg: 1200,
  // desktop
  xl: 1536 // large screen

};
const defaultBreakpoints = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ['xs', 'sm', 'md', 'lg', 'xl'],
  up: key => `@media (min-width:${values$1[key]}px)`
};
function handleBreakpoints(props, propValue, styleFromPropValue) {
  const theme = props.theme || {};

  if (Array.isArray(propValue)) {
    const themeBreakpoints = theme.breakpoints || defaultBreakpoints;
    return propValue.reduce((acc, item, index) => {
      acc[themeBreakpoints.up(themeBreakpoints.keys[index])] = styleFromPropValue(propValue[index]);
      return acc;
    }, {});
  }

  if (typeof propValue === 'object') {
    const themeBreakpoints = theme.breakpoints || defaultBreakpoints;
    return Object.keys(propValue).reduce((acc, breakpoint) => {
      // key is breakpoint
      if (Object.keys(themeBreakpoints.values || values$1).indexOf(breakpoint) !== -1) {
        const mediaKey = themeBreakpoints.up(breakpoint);
        acc[mediaKey] = styleFromPropValue(propValue[breakpoint], breakpoint);
      } else {
        const cssKey = breakpoint;
        acc[cssKey] = propValue[cssKey];
      }

      return acc;
    }, {});
  }

  const output = styleFromPropValue(propValue);
  return output;
}

function createEmptyBreakpointObject(breakpointsInput = {}) {
  var _breakpointsInput$key;

  const breakpointsInOrder = breakpointsInput == null ? void 0 : (_breakpointsInput$key = breakpointsInput.keys) == null ? void 0 : _breakpointsInput$key.reduce((acc, key) => {
    const breakpointStyleKey = breakpointsInput.up(key);
    acc[breakpointStyleKey] = {};
    return acc;
  }, {});
  return breakpointsInOrder || {};
}
function removeUnusedBreakpoints(breakpointKeys, style) {
  return breakpointKeys.reduce((acc, key) => {
    const breakpointOutput = acc[key];
    const isBreakpointUnused = !breakpointOutput || Object.keys(breakpointOutput).length === 0;

    if (isBreakpointUnused) {
      delete acc[key];
    }

    return acc;
  }, style);
}

function getPath(obj, path) {
  if (!path || typeof path !== 'string') {
    return null;
  }

  return path.split('.').reduce((acc, item) => acc && acc[item] ? acc[item] : null, obj);
}

function getValue$1(themeMapping, transform, propValueFinal, userValue = propValueFinal) {
  let value;

  if (typeof themeMapping === 'function') {
    value = themeMapping(propValueFinal);
  } else if (Array.isArray(themeMapping)) {
    value = themeMapping[propValueFinal] || userValue;
  } else {
    value = getPath(themeMapping, propValueFinal) || userValue;
  }

  if (transform) {
    value = transform(value);
  }

  return value;
}

function style$1(options) {
  const {
    prop,
    cssProperty = options.prop,
    themeKey,
    transform
  } = options;

  const fn = props => {
    if (props[prop] == null) {
      return null;
    }

    const propValue = props[prop];
    const theme = props.theme;
    const themeMapping = getPath(theme, themeKey) || {};

    const styleFromPropValue = propValueFinal => {
      let value = getValue$1(themeMapping, transform, propValueFinal);

      if (propValueFinal === value && typeof propValueFinal === 'string') {
        // Haven't found value
        value = getValue$1(themeMapping, transform, `${prop}${propValueFinal === 'default' ? '' : capitalize(propValueFinal)}`, propValueFinal);
      }

      if (cssProperty === false) {
        return value;
      }

      return {
        [cssProperty]: value
      };
    };

    return handleBreakpoints(props, propValue, styleFromPropValue);
  };

  fn.propTypes = process.env.NODE_ENV !== 'production' ? {
    [prop]: responsivePropType$1
  } : {};
  fn.filterProps = [prop];
  return fn;
}

function compose(...styles) {
  const handlers = styles.reduce((acc, style) => {
    style.filterProps.forEach(prop => {
      acc[prop] = style;
    });
    return acc;
  }, {});

  const fn = props => {
    return Object.keys(props).reduce((acc, prop) => {
      if (handlers[prop]) {
        return merge(acc, handlers[prop](props));
      }

      return acc;
    }, {});
  };

  fn.propTypes = process.env.NODE_ENV !== 'production' ? styles.reduce((acc, style) => Object.assign(acc, style.propTypes), {}) : {};
  fn.filterProps = styles.reduce((acc, style) => acc.concat(style.filterProps), []);
  return fn;
}

function memoize(fn) {
  const cache = {};
  return arg => {
    if (cache[arg] === undefined) {
      cache[arg] = fn(arg);
    }

    return cache[arg];
  };
}

const properties = {
  m: 'margin',
  p: 'padding'
};
const directions = {
  t: 'Top',
  r: 'Right',
  b: 'Bottom',
  l: 'Left',
  x: ['Left', 'Right'],
  y: ['Top', 'Bottom']
};
const aliases = {
  marginX: 'mx',
  marginY: 'my',
  paddingX: 'px',
  paddingY: 'py'
}; // memoize() impact:
// From 300,000 ops/sec
// To 350,000 ops/sec

const getCssProperties = memoize(prop => {
  // It's not a shorthand notation.
  if (prop.length > 2) {
    if (aliases[prop]) {
      prop = aliases[prop];
    } else {
      return [prop];
    }
  }

  const [a, b] = prop.split('');
  const property = properties[a];
  const direction = directions[b] || '';
  return Array.isArray(direction) ? direction.map(dir => property + dir) : [property + direction];
});
const marginKeys = ['m', 'mt', 'mr', 'mb', 'ml', 'mx', 'my', 'margin', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft', 'marginX', 'marginY', 'marginInline', 'marginInlineStart', 'marginInlineEnd', 'marginBlock', 'marginBlockStart', 'marginBlockEnd'];
const paddingKeys = ['p', 'pt', 'pr', 'pb', 'pl', 'px', 'py', 'padding', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'paddingX', 'paddingY', 'paddingInline', 'paddingInlineStart', 'paddingInlineEnd', 'paddingBlock', 'paddingBlockStart', 'paddingBlockEnd'];
const spacingKeys = [...marginKeys, ...paddingKeys];
function createUnaryUnit(theme, themeKey, defaultValue, propName) {
  const themeSpacing = getPath(theme, themeKey) || defaultValue;

  if (typeof themeSpacing === 'number') {
    return abs => {
      if (typeof abs === 'string') {
        return abs;
      }

      if (process.env.NODE_ENV !== 'production') {
        if (typeof abs !== 'number') {
          console.error(`MUI: Expected ${propName} argument to be a number or a string, got ${abs}.`);
        }
      }

      return themeSpacing * abs;
    };
  }

  if (Array.isArray(themeSpacing)) {
    return abs => {
      if (typeof abs === 'string') {
        return abs;
      }

      if (process.env.NODE_ENV !== 'production') {
        if (!Number.isInteger(abs)) {
          console.error([`MUI: The \`theme.${themeKey}\` array type cannot be combined with non integer values.` + `You should either use an integer value that can be used as index, or define the \`theme.${themeKey}\` as a number.`].join('\n'));
        } else if (abs > themeSpacing.length - 1) {
          console.error([`MUI: The value provided (${abs}) overflows.`, `The supported values are: ${JSON.stringify(themeSpacing)}.`, `${abs} > ${themeSpacing.length - 1}, you need to add the missing values.`].join('\n'));
        }
      }

      return themeSpacing[abs];
    };
  }

  if (typeof themeSpacing === 'function') {
    return themeSpacing;
  }

  if (process.env.NODE_ENV !== 'production') {
    console.error([`MUI: The \`theme.${themeKey}\` value (${themeSpacing}) is invalid.`, 'It should be a number, an array or a function.'].join('\n'));
  }

  return () => undefined;
}
function createUnarySpacing(theme) {
  return createUnaryUnit(theme, 'spacing', 8, 'spacing');
}
function getValue(transformer, propValue) {
  if (typeof propValue === 'string' || propValue == null) {
    return propValue;
  }

  const abs = Math.abs(propValue);
  const transformed = transformer(abs);

  if (propValue >= 0) {
    return transformed;
  }

  if (typeof transformed === 'number') {
    return -transformed;
  }

  return `-${transformed}`;
}
function getStyleFromPropValue(cssProperties, transformer) {
  return propValue => cssProperties.reduce((acc, cssProperty) => {
    acc[cssProperty] = getValue(transformer, propValue);
    return acc;
  }, {});
}

function resolveCssProperty(props, keys, prop, transformer) {
  // Using a hash computation over an array iteration could be faster, but with only 28 items,
  // it's doesn't worth the bundle size.
  if (keys.indexOf(prop) === -1) {
    return null;
  }

  const cssProperties = getCssProperties(prop);
  const styleFromPropValue = getStyleFromPropValue(cssProperties, transformer);
  const propValue = props[prop];
  return handleBreakpoints(props, propValue, styleFromPropValue);
}

function style(props, keys) {
  const transformer = createUnarySpacing(props.theme);
  return Object.keys(props).map(prop => resolveCssProperty(props, keys, prop, transformer)).reduce(merge, {});
}
process.env.NODE_ENV !== 'production' ? marginKeys.reduce((obj, key) => {
  obj[key] = responsivePropType$1;
  return obj;
}, {}) : {};
process.env.NODE_ENV !== 'production' ? paddingKeys.reduce((obj, key) => {
  obj[key] = responsivePropType$1;
  return obj;
}, {}) : {};

function spacing(props) {
  return style(props, spacingKeys);
}

spacing.propTypes = process.env.NODE_ENV !== 'production' ? spacingKeys.reduce((obj, key) => {
  obj[key] = responsivePropType$1;
  return obj;
}, {}) : {};
spacing.filterProps = spacingKeys;

function getBorder(value) {
  if (typeof value !== 'number') {
    return value;
  }

  return `${value}px solid`;
}

const border = style$1({
  prop: 'border',
  themeKey: 'borders',
  transform: getBorder
});
const borderTop = style$1({
  prop: 'borderTop',
  themeKey: 'borders',
  transform: getBorder
});
const borderRight = style$1({
  prop: 'borderRight',
  themeKey: 'borders',
  transform: getBorder
});
const borderBottom = style$1({
  prop: 'borderBottom',
  themeKey: 'borders',
  transform: getBorder
});
const borderLeft = style$1({
  prop: 'borderLeft',
  themeKey: 'borders',
  transform: getBorder
});
const borderColor = style$1({
  prop: 'borderColor',
  themeKey: 'palette'
});
const borderTopColor = style$1({
  prop: 'borderTopColor',
  themeKey: 'palette'
});
const borderRightColor = style$1({
  prop: 'borderRightColor',
  themeKey: 'palette'
});
const borderBottomColor = style$1({
  prop: 'borderBottomColor',
  themeKey: 'palette'
});
const borderLeftColor = style$1({
  prop: 'borderLeftColor',
  themeKey: 'palette'
});
const borderRadius = props => {
  if (props.borderRadius !== undefined && props.borderRadius !== null) {
    const transformer = createUnaryUnit(props.theme, 'shape.borderRadius', 4, 'borderRadius');

    const styleFromPropValue = propValue => ({
      borderRadius: getValue(transformer, propValue)
    });

    return handleBreakpoints(props, props.borderRadius, styleFromPropValue);
  }

  return null;
};
borderRadius.propTypes = process.env.NODE_ENV !== 'production' ? {
  borderRadius: responsivePropType$1
} : {};
borderRadius.filterProps = ['borderRadius'];
const borders = compose(border, borderTop, borderRight, borderBottom, borderLeft, borderColor, borderTopColor, borderRightColor, borderBottomColor, borderLeftColor, borderRadius);
var borders$1 = borders;

const displayPrint = style$1({
  prop: 'displayPrint',
  cssProperty: false,
  transform: value => ({
    '@media print': {
      display: value
    }
  })
});
const displayRaw = style$1({
  prop: 'display'
});
const overflow = style$1({
  prop: 'overflow'
});
const textOverflow = style$1({
  prop: 'textOverflow'
});
const visibility = style$1({
  prop: 'visibility'
});
const whiteSpace = style$1({
  prop: 'whiteSpace'
});
var display = compose(displayPrint, displayRaw, overflow, textOverflow, visibility, whiteSpace);

const flexBasis = style$1({
  prop: 'flexBasis'
});
const flexDirection = style$1({
  prop: 'flexDirection'
});
const flexWrap = style$1({
  prop: 'flexWrap'
});
const justifyContent = style$1({
  prop: 'justifyContent'
});
const alignItems = style$1({
  prop: 'alignItems'
});
const alignContent = style$1({
  prop: 'alignContent'
});
const order = style$1({
  prop: 'order'
});
const flex = style$1({
  prop: 'flex'
});
const flexGrow = style$1({
  prop: 'flexGrow'
});
const flexShrink = style$1({
  prop: 'flexShrink'
});
const alignSelf = style$1({
  prop: 'alignSelf'
});
const justifyItems = style$1({
  prop: 'justifyItems'
});
const justifySelf = style$1({
  prop: 'justifySelf'
});
const flexbox = compose(flexBasis, flexDirection, flexWrap, justifyContent, alignItems, alignContent, order, flex, flexGrow, flexShrink, alignSelf, justifyItems, justifySelf);
var flexbox$1 = flexbox;

const gap = props => {
  if (props.gap !== undefined && props.gap !== null) {
    const transformer = createUnaryUnit(props.theme, 'spacing', 8, 'gap');

    const styleFromPropValue = propValue => ({
      gap: getValue(transformer, propValue)
    });

    return handleBreakpoints(props, props.gap, styleFromPropValue);
  }

  return null;
};
gap.propTypes = process.env.NODE_ENV !== 'production' ? {
  gap: responsivePropType$1
} : {};
gap.filterProps = ['gap'];
const columnGap = props => {
  if (props.columnGap !== undefined && props.columnGap !== null) {
    const transformer = createUnaryUnit(props.theme, 'spacing', 8, 'columnGap');

    const styleFromPropValue = propValue => ({
      columnGap: getValue(transformer, propValue)
    });

    return handleBreakpoints(props, props.columnGap, styleFromPropValue);
  }

  return null;
};
columnGap.propTypes = process.env.NODE_ENV !== 'production' ? {
  columnGap: responsivePropType$1
} : {};
columnGap.filterProps = ['columnGap'];
const rowGap = props => {
  if (props.rowGap !== undefined && props.rowGap !== null) {
    const transformer = createUnaryUnit(props.theme, 'spacing', 8, 'rowGap');

    const styleFromPropValue = propValue => ({
      rowGap: getValue(transformer, propValue)
    });

    return handleBreakpoints(props, props.rowGap, styleFromPropValue);
  }

  return null;
};
rowGap.propTypes = process.env.NODE_ENV !== 'production' ? {
  rowGap: responsivePropType$1
} : {};
rowGap.filterProps = ['rowGap'];
const gridColumn = style$1({
  prop: 'gridColumn'
});
const gridRow = style$1({
  prop: 'gridRow'
});
const gridAutoFlow = style$1({
  prop: 'gridAutoFlow'
});
const gridAutoColumns = style$1({
  prop: 'gridAutoColumns'
});
const gridAutoRows = style$1({
  prop: 'gridAutoRows'
});
const gridTemplateColumns = style$1({
  prop: 'gridTemplateColumns'
});
const gridTemplateRows = style$1({
  prop: 'gridTemplateRows'
});
const gridTemplateAreas = style$1({
  prop: 'gridTemplateAreas'
});
const gridArea = style$1({
  prop: 'gridArea'
});
const grid = compose(gap, columnGap, rowGap, gridColumn, gridRow, gridAutoFlow, gridAutoColumns, gridAutoRows, gridTemplateColumns, gridTemplateRows, gridTemplateAreas, gridArea);
var grid$1 = grid;

const color = style$1({
  prop: 'color',
  themeKey: 'palette'
});
const bgcolor = style$1({
  prop: 'bgcolor',
  cssProperty: 'backgroundColor',
  themeKey: 'palette'
});
const backgroundColor = style$1({
  prop: 'backgroundColor',
  themeKey: 'palette'
});
const palette = compose(color, bgcolor, backgroundColor);
var palette$1 = palette;

const position = style$1({
  prop: 'position'
});
const zIndex$2 = style$1({
  prop: 'zIndex',
  themeKey: 'zIndex'
});
const top = style$1({
  prop: 'top'
});
const right = style$1({
  prop: 'right'
});
const bottom = style$1({
  prop: 'bottom'
});
const left = style$1({
  prop: 'left'
});
var positions = compose(position, zIndex$2, top, right, bottom, left);

const boxShadow = style$1({
  prop: 'boxShadow',
  themeKey: 'shadows'
});
var shadows$2 = boxShadow;

function transform(value) {
  return value <= 1 && value !== 0 ? `${value * 100}%` : value;
}

const width = style$1({
  prop: 'width',
  transform
});
const maxWidth = props => {
  if (props.maxWidth !== undefined && props.maxWidth !== null) {
    const styleFromPropValue = propValue => {
      var _props$theme, _props$theme$breakpoi, _props$theme$breakpoi2;

      const breakpoint = ((_props$theme = props.theme) == null ? void 0 : (_props$theme$breakpoi = _props$theme.breakpoints) == null ? void 0 : (_props$theme$breakpoi2 = _props$theme$breakpoi.values) == null ? void 0 : _props$theme$breakpoi2[propValue]) || values$1[propValue];
      return {
        maxWidth: breakpoint || transform(propValue)
      };
    };

    return handleBreakpoints(props, props.maxWidth, styleFromPropValue);
  }

  return null;
};
maxWidth.filterProps = ['maxWidth'];
const minWidth = style$1({
  prop: 'minWidth',
  transform
});
const height = style$1({
  prop: 'height',
  transform
});
const maxHeight = style$1({
  prop: 'maxHeight',
  transform
});
const minHeight = style$1({
  prop: 'minHeight',
  transform
});
style$1({
  prop: 'size',
  cssProperty: 'width',
  transform
});
style$1({
  prop: 'size',
  cssProperty: 'height',
  transform
});
const boxSizing = style$1({
  prop: 'boxSizing'
});
const sizing = compose(width, maxWidth, minWidth, height, maxHeight, minHeight, boxSizing);
var sizing$1 = sizing;

const fontFamily = style$1({
  prop: 'fontFamily',
  themeKey: 'typography'
});
const fontSize = style$1({
  prop: 'fontSize',
  themeKey: 'typography'
});
const fontStyle = style$1({
  prop: 'fontStyle',
  themeKey: 'typography'
});
const fontWeight = style$1({
  prop: 'fontWeight',
  themeKey: 'typography'
});
const letterSpacing = style$1({
  prop: 'letterSpacing'
});
const textTransform = style$1({
  prop: 'textTransform'
});
const lineHeight = style$1({
  prop: 'lineHeight'
});
const textAlign = style$1({
  prop: 'textAlign'
});
const typographyVariant = style$1({
  prop: 'typography',
  cssProperty: false,
  themeKey: 'typography'
});
const typography = compose(typographyVariant, fontFamily, fontSize, fontStyle, fontWeight, letterSpacing, lineHeight, textAlign, textTransform);
var typography$1 = typography;

const filterPropsMapping = {
  borders: borders$1.filterProps,
  display: display.filterProps,
  flexbox: flexbox$1.filterProps,
  grid: grid$1.filterProps,
  positions: positions.filterProps,
  palette: palette$1.filterProps,
  shadows: shadows$2.filterProps,
  sizing: sizing$1.filterProps,
  spacing: spacing.filterProps,
  typography: typography$1.filterProps
};
const styleFunctionMapping = {
  borders: borders$1,
  display,
  flexbox: flexbox$1,
  grid: grid$1,
  positions,
  palette: palette$1,
  shadows: shadows$2,
  sizing: sizing$1,
  spacing,
  typography: typography$1
};
const propToStyleFunction = Object.keys(filterPropsMapping).reduce((acc, styleFnName) => {
  filterPropsMapping[styleFnName].forEach(propName => {
    acc[propName] = styleFunctionMapping[styleFnName];
  });
  return acc;
}, {});

function objectsHaveSameKeys(...objects) {
  const allKeys = objects.reduce((keys, object) => keys.concat(Object.keys(object)), []);
  const union = new Set(allKeys);
  return objects.every(object => union.size === Object.keys(object).length);
}

function callIfFn(maybeFn, arg) {
  return typeof maybeFn === 'function' ? maybeFn(arg) : maybeFn;
} // eslint-disable-next-line @typescript-eslint/naming-convention


function unstable_createStyleFunctionSx(styleFunctionMapping$1 = styleFunctionMapping) {
  const propToStyleFunction = Object.keys(styleFunctionMapping$1).reduce((acc, styleFnName) => {
    styleFunctionMapping$1[styleFnName].filterProps.forEach(propName => {
      acc[propName] = styleFunctionMapping$1[styleFnName];
    });
    return acc;
  }, {});

  function getThemeValue(prop, value, theme) {
    const inputProps = {
      [prop]: value,
      theme
    };
    const styleFunction = propToStyleFunction[prop];
    return styleFunction ? styleFunction(inputProps) : {
      [prop]: value
    };
  }

  function styleFunctionSx(props) {
    const {
      sx,
      theme = {}
    } = props || {};

    if (!sx) {
      return null; // emotion & styled-components will neglect null
    }
    /*
     * Receive `sxInput` as object or callback
     * and then recursively check keys & values to create media query object styles.
     * (the result will be used in `styled`)
     */


    function traverse(sxInput) {
      let sxObject = sxInput;

      if (typeof sxInput === 'function') {
        sxObject = sxInput(theme);
      } else if (typeof sxInput !== 'object') {
        // value
        return sxInput;
      }

      if (!sxObject) {
        return null;
      }

      const emptyBreakpoints = createEmptyBreakpointObject(theme.breakpoints);
      const breakpointsKeys = Object.keys(emptyBreakpoints);
      let css = emptyBreakpoints;
      Object.keys(sxObject).forEach(styleKey => {
        const value = callIfFn(sxObject[styleKey], theme);

        if (value !== null && value !== undefined) {
          if (typeof value === 'object') {
            if (propToStyleFunction[styleKey]) {
              css = merge(css, getThemeValue(styleKey, value, theme));
            } else {
              const breakpointsValues = handleBreakpoints({
                theme
              }, value, x => ({
                [styleKey]: x
              }));

              if (objectsHaveSameKeys(breakpointsValues, value)) {
                css[styleKey] = styleFunctionSx({
                  sx: value,
                  theme
                });
              } else {
                css = merge(css, breakpointsValues);
              }
            }
          } else {
            css = merge(css, getThemeValue(styleKey, value, theme));
          }
        }
      });
      return removeUnusedBreakpoints(breakpointsKeys, css);
    }

    return Array.isArray(sx) ? sx.map(traverse) : traverse(sx);
  }

  return styleFunctionSx;
}
const styleFunctionSx = unstable_createStyleFunctionSx();
styleFunctionSx.filterProps = ['sx'];
var defaultStyleFunctionSx = styleFunctionSx;

const _excluded$q = ["sx"];

const splitProps = props => {
  const result = {
    systemProps: {},
    otherProps: {}
  };
  Object.keys(props).forEach(prop => {
    if (propToStyleFunction[prop]) {
      result.systemProps[prop] = props[prop];
    } else {
      result.otherProps[prop] = props[prop];
    }
  });
  return result;
};

function extendSxProp(props) {
  const {
    sx: inSx
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded$q);

  const {
    systemProps,
    otherProps
  } = splitProps(other);
  let finalSx;

  if (Array.isArray(inSx)) {
    finalSx = [systemProps, ...inSx];
  } else if (typeof inSx === 'function') {
    finalSx = (...args) => {
      const result = inSx(...args);

      if (!isPlainObject(result)) {
        return systemProps;
      }

      return _extends$3({}, systemProps, result);
    };
  } else {
    finalSx = _extends$3({}, systemProps, inSx);
  }

  return _extends$3({}, otherProps, {
    sx: finalSx
  });
}

const _excluded$p = ["values", "unit", "step"];

const sortBreakpointsValues = values => {
  const breakpointsAsArray = Object.keys(values).map(key => ({
    key,
    val: values[key]
  })) || []; // Sort in ascending order

  breakpointsAsArray.sort((breakpoint1, breakpoint2) => breakpoint1.val - breakpoint2.val);
  return breakpointsAsArray.reduce((acc, obj) => {
    return _extends$3({}, acc, {
      [obj.key]: obj.val
    });
  }, {});
}; // Keep in mind that @media is inclusive by the CSS specification.


function createBreakpoints(breakpoints) {
  const {
    // The breakpoint **start** at this value.
    // For instance with the first breakpoint xs: [xs, sm).
    values = {
      xs: 0,
      // phone
      sm: 600,
      // tablet
      md: 900,
      // small laptop
      lg: 1200,
      // desktop
      xl: 1536 // large screen

    },
    unit = 'px',
    step = 5
  } = breakpoints,
        other = _objectWithoutPropertiesLoose(breakpoints, _excluded$p);

  const sortedValues = sortBreakpointsValues(values);
  const keys = Object.keys(sortedValues);

  function up(key) {
    const value = typeof values[key] === 'number' ? values[key] : key;
    return `@media (min-width:${value}${unit})`;
  }

  function down(key) {
    const value = typeof values[key] === 'number' ? values[key] : key;
    return `@media (max-width:${value - step / 100}${unit})`;
  }

  function between(start, end) {
    const endIndex = keys.indexOf(end);
    return `@media (min-width:${typeof values[start] === 'number' ? values[start] : start}${unit}) and ` + `(max-width:${(endIndex !== -1 && typeof values[keys[endIndex]] === 'number' ? values[keys[endIndex]] : end) - step / 100}${unit})`;
  }

  function only(key) {
    if (keys.indexOf(key) + 1 < keys.length) {
      return between(key, keys[keys.indexOf(key) + 1]);
    }

    return up(key);
  }

  function not(key) {
    // handle first and last key separately, for better readability
    const keyIndex = keys.indexOf(key);

    if (keyIndex === 0) {
      return up(keys[1]);
    }

    if (keyIndex === keys.length - 1) {
      return down(keys[keyIndex]);
    }

    return between(key, keys[keys.indexOf(key) + 1]).replace('@media', '@media not all and');
  }

  return _extends$3({
    keys,
    values: sortedValues,
    up,
    down,
    between,
    only,
    not,
    unit
  }, other);
}

const shape = {
  borderRadius: 4
};
var shape$1 = shape;

/* tslint:enable:unified-signatures */
function createSpacing(spacingInput = 8) {
  // Already transformed.
  if (spacingInput.mui) {
    return spacingInput;
  } // Material Design layouts are visually balanced. Most measurements align to an 8dp grid, which aligns both spacing and the overall layout.
  // Smaller components, such as icons, can align to a 4dp grid.
  // https://material.io/design/layout/understanding-layout.html#usage


  const transform = createUnarySpacing({
    spacing: spacingInput
  });

  const spacing = (...argsInput) => {
    if (process.env.NODE_ENV !== 'production') {
      if (!(argsInput.length <= 4)) {
        console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${argsInput.length}`);
      }
    }

    const args = argsInput.length === 0 ? [1] : argsInput;
    return args.map(argument => {
      const output = transform(argument);
      return typeof output === 'number' ? `${output}px` : output;
    }).join(' ');
  };

  spacing.mui = true;
  return spacing;
}

const _excluded$o = ["breakpoints", "palette", "spacing", "shape"];

function createTheme$1(options = {}, ...args) {
  const {
    breakpoints: breakpointsInput = {},
    palette: paletteInput = {},
    spacing: spacingInput,
    shape: shapeInput = {}
  } = options,
        other = _objectWithoutPropertiesLoose(options, _excluded$o);

  const breakpoints = createBreakpoints(breakpointsInput);
  const spacing = createSpacing(spacingInput);
  let muiTheme = deepmerge({
    breakpoints,
    direction: 'ltr',
    components: {},
    // Inject component definitions.
    palette: _extends$3({
      mode: 'light'
    }, paletteInput),
    spacing,
    shape: _extends$3({}, shape$1, shapeInput)
  }, other);
  muiTheme = args.reduce((acc, argument) => deepmerge(acc, argument), muiTheme);
  return muiTheme;
}

const ThemeContext = /*#__PURE__*/React.createContext(null);

if (process.env.NODE_ENV !== 'production') {
  ThemeContext.displayName = 'ThemeContext';
}

var ThemeContext$1 = ThemeContext;

function useTheme$3() {
  const theme = React.useContext(ThemeContext$1);

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useDebugValue(theme);
  }

  return theme;
}

function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0;
}

function useTheme$2(defaultTheme = null) {
  const contextTheme = useTheme$3();
  return !contextTheme || isObjectEmpty(contextTheme) ? defaultTheme : contextTheme;
}

const systemDefaultTheme$1 = createTheme$1();

function useTheme$1(defaultTheme = systemDefaultTheme$1) {
  return useTheme$2(defaultTheme);
}

const _excluded$n = ["variant"];

function isEmpty$1(string) {
  return string.length === 0;
}
/**
 * Generates string classKey based on the properties provided. It starts with the
 * variant if defined, and then it appends all other properties in alphabetical order.
 * @param {object} props - the properties for which the classKey should be created.
 */


function propsToClassKey(props) {
  const {
    variant
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded$n);

  let classKey = variant || '';
  Object.keys(other).sort().forEach(key => {
    if (key === 'color') {
      classKey += isEmpty$1(classKey) ? props[key] : capitalize(props[key]);
    } else {
      classKey += `${isEmpty$1(classKey) ? key : capitalize(key)}${capitalize(props[key].toString())}`;
    }
  });
  return classKey;
}

const _excluded$m = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"],
      _excluded2$2 = ["theme"],
      _excluded3 = ["theme"];

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

const getStyleOverrides = (name, theme) => {
  if (theme.components && theme.components[name] && theme.components[name].styleOverrides) {
    return theme.components[name].styleOverrides;
  }

  return null;
};

const getVariantStyles = (name, theme) => {
  let variants = [];

  if (theme && theme.components && theme.components[name] && theme.components[name].variants) {
    variants = theme.components[name].variants;
  }

  const variantsStyles = {};
  variants.forEach(definition => {
    const key = propsToClassKey(definition.props);
    variantsStyles[key] = definition.style;
  });
  return variantsStyles;
};

const variantsResolver = (props, styles, theme, name) => {
  var _theme$components, _theme$components$nam;

  const {
    ownerState = {}
  } = props;
  const variantsStyles = [];
  const themeVariants = theme == null ? void 0 : (_theme$components = theme.components) == null ? void 0 : (_theme$components$nam = _theme$components[name]) == null ? void 0 : _theme$components$nam.variants;

  if (themeVariants) {
    themeVariants.forEach(themeVariant => {
      let isMatch = true;
      Object.keys(themeVariant.props).forEach(key => {
        if (ownerState[key] !== themeVariant.props[key] && props[key] !== themeVariant.props[key]) {
          isMatch = false;
        }
      });

      if (isMatch) {
        variantsStyles.push(styles[propsToClassKey(themeVariant.props)]);
      }
    });
  }

  return variantsStyles;
}; // Update /system/styled/#api in case if this changes


function shouldForwardProp(prop) {
  return prop !== 'ownerState' && prop !== 'theme' && prop !== 'sx' && prop !== 'as';
}
const systemDefaultTheme = createTheme$1();

const lowercaseFirstLetter = string => {
  return string.charAt(0).toLowerCase() + string.slice(1);
};

function createStyled(input = {}) {
  const {
    defaultTheme = systemDefaultTheme,
    rootShouldForwardProp = shouldForwardProp,
    slotShouldForwardProp = shouldForwardProp,
    styleFunctionSx = defaultStyleFunctionSx
  } = input;
  return (tag, inputOptions = {}) => {
    const {
      name: componentName,
      slot: componentSlot,
      skipVariantsResolver: inputSkipVariantsResolver,
      skipSx: inputSkipSx,
      overridesResolver
    } = inputOptions,
          options = _objectWithoutPropertiesLoose(inputOptions, _excluded$m); // if skipVariantsResolver option is defined, take the value, otherwise, true for root and false for other slots.


    const skipVariantsResolver = inputSkipVariantsResolver !== undefined ? inputSkipVariantsResolver : componentSlot && componentSlot !== 'Root' || false;
    const skipSx = inputSkipSx || false;
    let label;

    if (process.env.NODE_ENV !== 'production') {
      if (componentName) {
        label = `${componentName}-${lowercaseFirstLetter(componentSlot || 'Root')}`;
      }
    }

    let shouldForwardPropOption = shouldForwardProp;

    if (componentSlot === 'Root') {
      shouldForwardPropOption = rootShouldForwardProp;
    } else if (componentSlot) {
      // any other slot specified
      shouldForwardPropOption = slotShouldForwardProp;
    }

    const defaultStyledResolver = styled$2(tag, _extends$3({
      shouldForwardProp: shouldForwardPropOption,
      label
    }, options));

    const muiStyledResolver = (styleArg, ...expressions) => {
      const expressionsWithDefaultTheme = expressions ? expressions.map(stylesArg => {
        // On the server emotion doesn't use React.forwardRef for creating components, so the created
        // component stays as a function. This condition makes sure that we do not interpolate functions
        // which are basically components used as a selectors.
        // eslint-disable-next-line no-underscore-dangle
        return typeof stylesArg === 'function' && stylesArg.__emotion_real !== stylesArg ? _ref => {
          let {
            theme: themeInput
          } = _ref,
              other = _objectWithoutPropertiesLoose(_ref, _excluded2$2);

          return stylesArg(_extends$3({
            theme: isEmpty(themeInput) ? defaultTheme : themeInput
          }, other));
        } : stylesArg;
      }) : [];
      let transformedStyleArg = styleArg;

      if (componentName && overridesResolver) {
        expressionsWithDefaultTheme.push(props => {
          const theme = isEmpty(props.theme) ? defaultTheme : props.theme;
          const styleOverrides = getStyleOverrides(componentName, theme);

          if (styleOverrides) {
            const resolvedStyleOverrides = {};
            Object.entries(styleOverrides).forEach(([slotKey, slotStyle]) => {
              resolvedStyleOverrides[slotKey] = typeof slotStyle === 'function' ? slotStyle(props) : slotStyle;
            });
            return overridesResolver(props, resolvedStyleOverrides);
          }

          return null;
        });
      }

      if (componentName && !skipVariantsResolver) {
        expressionsWithDefaultTheme.push(props => {
          const theme = isEmpty(props.theme) ? defaultTheme : props.theme;
          return variantsResolver(props, getVariantStyles(componentName, theme), theme, componentName);
        });
      }

      if (!skipSx) {
        expressionsWithDefaultTheme.push(props => {
          const theme = isEmpty(props.theme) ? defaultTheme : props.theme;
          return styleFunctionSx(_extends$3({}, props, {
            theme
          }));
        });
      }

      const numOfCustomFnsApplied = expressionsWithDefaultTheme.length - expressions.length;

      if (Array.isArray(styleArg) && numOfCustomFnsApplied > 0) {
        const placeholders = new Array(numOfCustomFnsApplied).fill(''); // If the type is array, than we need to add placeholders in the template for the overrides, variants and the sx styles.

        transformedStyleArg = [...styleArg, ...placeholders];
        transformedStyleArg.raw = [...styleArg.raw, ...placeholders];
      } else if (typeof styleArg === 'function' && // On the server emotion doesn't use React.forwardRef for creating components, so the created
      // component stays as a function. This condition makes sure that we do not interpolate functions
      // which are basically components used as a selectors.
      // eslint-disable-next-line no-underscore-dangle
      styleArg.__emotion_real !== styleArg) {
        // If the type is function, we need to define the default theme.
        transformedStyleArg = _ref2 => {
          let {
            theme: themeInput
          } = _ref2,
              other = _objectWithoutPropertiesLoose(_ref2, _excluded3);

          return styleArg(_extends$3({
            theme: isEmpty(themeInput) ? defaultTheme : themeInput
          }, other));
        };
      }

      const Component = defaultStyledResolver(transformedStyleArg, ...expressionsWithDefaultTheme);

      if (process.env.NODE_ENV !== 'production') {
        let displayName;

        if (componentName) {
          displayName = `${componentName}${componentSlot || ''}`;
        }

        if (displayName === undefined) {
          displayName = `Styled(${getDisplayName(tag)})`;
        }

        Component.displayName = displayName;
      }

      return Component;
    };

    if (defaultStyledResolver.withConfig) {
      muiStyledResolver.withConfig = defaultStyledResolver.withConfig;
    }

    return muiStyledResolver;
  };
}

function getThemeProps(params) {
  const {
    theme,
    name,
    props
  } = params;

  if (!theme || !theme.components || !theme.components[name] || !theme.components[name].defaultProps) {
    return props;
  }

  return resolveProps(theme.components[name].defaultProps, props);
}

function useThemeProps$1({
  props,
  name,
  defaultTheme
}) {
  const theme = useTheme$1(defaultTheme);
  const mergedProps = getThemeProps({
    theme,
    name,
    props
  });
  return mergedProps;
}

/**
 * Returns a number whose value is limited to the given range.
 * @param {number} value The value to be clamped
 * @param {number} min The lower boundary of the output range
 * @param {number} max The upper boundary of the output range
 * @returns {number} A number in the range [min, max]
 */
function clamp(value, min = 0, max = 1) {
  if (process.env.NODE_ENV !== 'production') {
    if (value < min || value > max) {
      console.error(`MUI: The value provided ${value} is out of range [${min}, ${max}].`);
    }
  }

  return Math.min(Math.max(min, value), max);
}
/**
 * Converts a color from CSS hex format to CSS rgb format.
 * @param {string} color - Hex color, i.e. #nnn or #nnnnnn
 * @returns {string} A CSS rgb color string
 */


function hexToRgb(color) {
  color = color.slice(1);
  const re = new RegExp(`.{1,${color.length >= 6 ? 2 : 1}}`, 'g');
  let colors = color.match(re);

  if (colors && colors[0].length === 1) {
    colors = colors.map(n => n + n);
  }

  return colors ? `rgb${colors.length === 4 ? 'a' : ''}(${colors.map((n, index) => {
    return index < 3 ? parseInt(n, 16) : Math.round(parseInt(n, 16) / 255 * 1000) / 1000;
  }).join(', ')})` : '';
}
/**
 * Returns an object with the type and values of a color.
 *
 * Note: Does not support rgb % values.
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @returns {object} - A MUI color object: {type: string, values: number[]}
 */


function decomposeColor(color) {
  // Idempotent
  if (color.type) {
    return color;
  }

  if (color.charAt(0) === '#') {
    return decomposeColor(hexToRgb(color));
  }

  const marker = color.indexOf('(');
  const type = color.substring(0, marker);

  if (['rgb', 'rgba', 'hsl', 'hsla', 'color'].indexOf(type) === -1) {
    throw new Error(process.env.NODE_ENV !== "production" ? `MUI: Unsupported \`${color}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().` : formatMuiErrorMessage(9, color));
  }

  let values = color.substring(marker + 1, color.length - 1);
  let colorSpace;

  if (type === 'color') {
    values = values.split(' ');
    colorSpace = values.shift();

    if (values.length === 4 && values[3].charAt(0) === '/') {
      values[3] = values[3].slice(1);
    }

    if (['srgb', 'display-p3', 'a98-rgb', 'prophoto-rgb', 'rec-2020'].indexOf(colorSpace) === -1) {
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: unsupported \`${colorSpace}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.` : formatMuiErrorMessage(10, colorSpace));
    }
  } else {
    values = values.split(',');
  }

  values = values.map(value => parseFloat(value));
  return {
    type,
    values,
    colorSpace
  };
}
/**
 * Converts a color object with type and values to a string.
 * @param {object} color - Decomposed color
 * @param {string} color.type - One of: 'rgb', 'rgba', 'hsl', 'hsla'
 * @param {array} color.values - [n,n,n] or [n,n,n,n]
 * @returns {string} A CSS color string
 */

function recomposeColor(color) {
  const {
    type,
    colorSpace
  } = color;
  let {
    values
  } = color;

  if (type.indexOf('rgb') !== -1) {
    // Only convert the first 3 values to int (i.e. not alpha)
    values = values.map((n, i) => i < 3 ? parseInt(n, 10) : n);
  } else if (type.indexOf('hsl') !== -1) {
    values[1] = `${values[1]}%`;
    values[2] = `${values[2]}%`;
  }

  if (type.indexOf('color') !== -1) {
    values = `${colorSpace} ${values.join(' ')}`;
  } else {
    values = `${values.join(', ')}`;
  }

  return `${type}(${values})`;
}
/**
 * Converts a color from hsl format to rgb format.
 * @param {string} color - HSL color values
 * @returns {string} rgb color values
 */

function hslToRgb(color) {
  color = decomposeColor(color);
  const {
    values
  } = color;
  const h = values[0];
  const s = values[1] / 100;
  const l = values[2] / 100;
  const a = s * Math.min(l, 1 - l);

  const f = (n, k = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);

  let type = 'rgb';
  const rgb = [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];

  if (color.type === 'hsla') {
    type += 'a';
    rgb.push(values[3]);
  }

  return recomposeColor({
    type,
    values: rgb
  });
}
/**
 * The relative brightness of any point in a color space,
 * normalized to 0 for darkest black and 1 for lightest white.
 *
 * Formula: https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
 * @returns {number} The relative brightness of the color in the range 0 - 1
 */

function getLuminance(color) {
  color = decomposeColor(color);
  let rgb = color.type === 'hsl' ? decomposeColor(hslToRgb(color)).values : color.values;
  rgb = rgb.map(val => {
    if (color.type !== 'color') {
      val /= 255; // normalized
    }

    return val <= 0.03928 ? val / 12.92 : ((val + 0.055) / 1.055) ** 2.4;
  }); // Truncate at 3 digits

  return Number((0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]).toFixed(3));
}
/**
 * Calculates the contrast ratio between two colors.
 *
 * Formula: https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests
 * @param {string} foreground - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @param {string} background - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @returns {number} A contrast ratio value in the range 0 - 21.
 */

function getContrastRatio(foreground, background) {
  const lumA = getLuminance(foreground);
  const lumB = getLuminance(background);
  return (Math.max(lumA, lumB) + 0.05) / (Math.min(lumA, lumB) + 0.05);
}
/**
 * Sets the absolute transparency of a color.
 * Any existing alpha values are overwritten.
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
 * @param {number} value - value to set the alpha channel to in the range 0 - 1
 * @returns {string} A CSS color string. Hex input values are returned as rgb
 */

function alpha(color, value) {
  color = decomposeColor(color);
  value = clamp(value);

  if (color.type === 'rgb' || color.type === 'hsl') {
    color.type += 'a';
  }

  if (color.type === 'color') {
    color.values[3] = `/${value}`;
  } else {
    color.values[3] = value;
  }

  return recomposeColor(color);
}
/**
 * Darkens a color.
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
 * @param {number} coefficient - multiplier in the range 0 - 1
 * @returns {string} A CSS color string. Hex input values are returned as rgb
 */

function darken(color, coefficient) {
  color = decomposeColor(color);
  coefficient = clamp(coefficient);

  if (color.type.indexOf('hsl') !== -1) {
    color.values[2] *= 1 - coefficient;
  } else if (color.type.indexOf('rgb') !== -1 || color.type.indexOf('color') !== -1) {
    for (let i = 0; i < 3; i += 1) {
      color.values[i] *= 1 - coefficient;
    }
  }

  return recomposeColor(color);
}
/**
 * Lightens a color.
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
 * @param {number} coefficient - multiplier in the range 0 - 1
 * @returns {string} A CSS color string. Hex input values are returned as rgb
 */

function lighten(color, coefficient) {
  color = decomposeColor(color);
  coefficient = clamp(coefficient);

  if (color.type.indexOf('hsl') !== -1) {
    color.values[2] += (100 - color.values[2]) * coefficient;
  } else if (color.type.indexOf('rgb') !== -1) {
    for (let i = 0; i < 3; i += 1) {
      color.values[i] += (255 - color.values[i]) * coefficient;
    }
  } else if (color.type.indexOf('color') !== -1) {
    for (let i = 0; i < 3; i += 1) {
      color.values[i] += (1 - color.values[i]) * coefficient;
    }
  }

  return recomposeColor(color);
}

function createMixins(breakpoints, spacing, mixins) {
  return _extends$3({
    toolbar: {
      minHeight: 56,
      [`${breakpoints.up('xs')} and (orientation: landscape)`]: {
        minHeight: 48
      },
      [breakpoints.up('sm')]: {
        minHeight: 64
      }
    }
  }, mixins);
}

const common = {
  black: '#000',
  white: '#fff'
};
var common$1 = common;

const grey = {
  50: '#fafafa',
  100: '#f5f5f5',
  200: '#eeeeee',
  300: '#e0e0e0',
  400: '#bdbdbd',
  500: '#9e9e9e',
  600: '#757575',
  700: '#616161',
  800: '#424242',
  900: '#212121',
  A100: '#f5f5f5',
  A200: '#eeeeee',
  A400: '#bdbdbd',
  A700: '#616161'
};
var grey$1 = grey;

const purple = {
  50: '#f3e5f5',
  100: '#e1bee7',
  200: '#ce93d8',
  300: '#ba68c8',
  400: '#ab47bc',
  500: '#9c27b0',
  600: '#8e24aa',
  700: '#7b1fa2',
  800: '#6a1b9a',
  900: '#4a148c',
  A100: '#ea80fc',
  A200: '#e040fb',
  A400: '#d500f9',
  A700: '#aa00ff'
};
var purple$1 = purple;

const red = {
  50: '#ffebee',
  100: '#ffcdd2',
  200: '#ef9a9a',
  300: '#e57373',
  400: '#ef5350',
  500: '#f44336',
  600: '#e53935',
  700: '#d32f2f',
  800: '#c62828',
  900: '#b71c1c',
  A100: '#ff8a80',
  A200: '#ff5252',
  A400: '#ff1744',
  A700: '#d50000'
};
var red$1 = red;

const orange = {
  50: '#fff3e0',
  100: '#ffe0b2',
  200: '#ffcc80',
  300: '#ffb74d',
  400: '#ffa726',
  500: '#ff9800',
  600: '#fb8c00',
  700: '#f57c00',
  800: '#ef6c00',
  900: '#e65100',
  A100: '#ffd180',
  A200: '#ffab40',
  A400: '#ff9100',
  A700: '#ff6d00'
};
var orange$1 = orange;

const blue = {
  50: '#e3f2fd',
  100: '#bbdefb',
  200: '#90caf9',
  300: '#64b5f6',
  400: '#42a5f5',
  500: '#2196f3',
  600: '#1e88e5',
  700: '#1976d2',
  800: '#1565c0',
  900: '#0d47a1',
  A100: '#82b1ff',
  A200: '#448aff',
  A400: '#2979ff',
  A700: '#2962ff'
};
var blue$1 = blue;

const lightBlue = {
  50: '#e1f5fe',
  100: '#b3e5fc',
  200: '#81d4fa',
  300: '#4fc3f7',
  400: '#29b6f6',
  500: '#03a9f4',
  600: '#039be5',
  700: '#0288d1',
  800: '#0277bd',
  900: '#01579b',
  A100: '#80d8ff',
  A200: '#40c4ff',
  A400: '#00b0ff',
  A700: '#0091ea'
};
var lightBlue$1 = lightBlue;

const green = {
  50: '#e8f5e9',
  100: '#c8e6c9',
  200: '#a5d6a7',
  300: '#81c784',
  400: '#66bb6a',
  500: '#4caf50',
  600: '#43a047',
  700: '#388e3c',
  800: '#2e7d32',
  900: '#1b5e20',
  A100: '#b9f6ca',
  A200: '#69f0ae',
  A400: '#00e676',
  A700: '#00c853'
};
var green$1 = green;

const _excluded$l = ["mode", "contrastThreshold", "tonalOffset"];
const light = {
  // The colors used to style the text.
  text: {
    // The most important text.
    primary: 'rgba(0, 0, 0, 0.87)',
    // Secondary text.
    secondary: 'rgba(0, 0, 0, 0.6)',
    // Disabled text have even lower visual prominence.
    disabled: 'rgba(0, 0, 0, 0.38)'
  },
  // The color used to divide different elements.
  divider: 'rgba(0, 0, 0, 0.12)',
  // The background colors used to style the surfaces.
  // Consistency between these values is important.
  background: {
    paper: common$1.white,
    default: common$1.white
  },
  // The colors used to style the action elements.
  action: {
    // The color of an active action like an icon button.
    active: 'rgba(0, 0, 0, 0.54)',
    // The color of an hovered action.
    hover: 'rgba(0, 0, 0, 0.04)',
    hoverOpacity: 0.04,
    // The color of a selected action.
    selected: 'rgba(0, 0, 0, 0.08)',
    selectedOpacity: 0.08,
    // The color of a disabled action.
    disabled: 'rgba(0, 0, 0, 0.26)',
    // The background color of a disabled action.
    disabledBackground: 'rgba(0, 0, 0, 0.12)',
    disabledOpacity: 0.38,
    focus: 'rgba(0, 0, 0, 0.12)',
    focusOpacity: 0.12,
    activatedOpacity: 0.12
  }
};
const dark = {
  text: {
    primary: common$1.white,
    secondary: 'rgba(255, 255, 255, 0.7)',
    disabled: 'rgba(255, 255, 255, 0.5)',
    icon: 'rgba(255, 255, 255, 0.5)'
  },
  divider: 'rgba(255, 255, 255, 0.12)',
  background: {
    paper: '#121212',
    default: '#121212'
  },
  action: {
    active: common$1.white,
    hover: 'rgba(255, 255, 255, 0.08)',
    hoverOpacity: 0.08,
    selected: 'rgba(255, 255, 255, 0.16)',
    selectedOpacity: 0.16,
    disabled: 'rgba(255, 255, 255, 0.3)',
    disabledBackground: 'rgba(255, 255, 255, 0.12)',
    disabledOpacity: 0.38,
    focus: 'rgba(255, 255, 255, 0.12)',
    focusOpacity: 0.12,
    activatedOpacity: 0.24
  }
};

function addLightOrDark(intent, direction, shade, tonalOffset) {
  const tonalOffsetLight = tonalOffset.light || tonalOffset;
  const tonalOffsetDark = tonalOffset.dark || tonalOffset * 1.5;

  if (!intent[direction]) {
    if (intent.hasOwnProperty(shade)) {
      intent[direction] = intent[shade];
    } else if (direction === 'light') {
      intent.light = lighten(intent.main, tonalOffsetLight);
    } else if (direction === 'dark') {
      intent.dark = darken(intent.main, tonalOffsetDark);
    }
  }
}

function getDefaultPrimary(mode = 'light') {
  if (mode === 'dark') {
    return {
      main: blue$1[200],
      light: blue$1[50],
      dark: blue$1[400]
    };
  }

  return {
    main: blue$1[700],
    light: blue$1[400],
    dark: blue$1[800]
  };
}

function getDefaultSecondary(mode = 'light') {
  if (mode === 'dark') {
    return {
      main: purple$1[200],
      light: purple$1[50],
      dark: purple$1[400]
    };
  }

  return {
    main: purple$1[500],
    light: purple$1[300],
    dark: purple$1[700]
  };
}

function getDefaultError(mode = 'light') {
  if (mode === 'dark') {
    return {
      main: red$1[500],
      light: red$1[300],
      dark: red$1[700]
    };
  }

  return {
    main: red$1[700],
    light: red$1[400],
    dark: red$1[800]
  };
}

function getDefaultInfo(mode = 'light') {
  if (mode === 'dark') {
    return {
      main: lightBlue$1[400],
      light: lightBlue$1[300],
      dark: lightBlue$1[700]
    };
  }

  return {
    main: lightBlue$1[700],
    light: lightBlue$1[500],
    dark: lightBlue$1[900]
  };
}

function getDefaultSuccess(mode = 'light') {
  if (mode === 'dark') {
    return {
      main: green$1[400],
      light: green$1[300],
      dark: green$1[700]
    };
  }

  return {
    main: green$1[800],
    light: green$1[500],
    dark: green$1[900]
  };
}

function getDefaultWarning(mode = 'light') {
  if (mode === 'dark') {
    return {
      main: orange$1[400],
      light: orange$1[300],
      dark: orange$1[700]
    };
  }

  return {
    main: '#ed6c02',
    // closest to orange[800] that pass 3:1.
    light: orange$1[500],
    dark: orange$1[900]
  };
}

function createPalette(palette) {
  const {
    mode = 'light',
    contrastThreshold = 3,
    tonalOffset = 0.2
  } = palette,
        other = _objectWithoutPropertiesLoose(palette, _excluded$l);

  const primary = palette.primary || getDefaultPrimary(mode);
  const secondary = palette.secondary || getDefaultSecondary(mode);
  const error = palette.error || getDefaultError(mode);
  const info = palette.info || getDefaultInfo(mode);
  const success = palette.success || getDefaultSuccess(mode);
  const warning = palette.warning || getDefaultWarning(mode); // Use the same logic as
  // Bootstrap: https://github.com/twbs/bootstrap/blob/1d6e3710dd447de1a200f29e8fa521f8a0908f70/scss/_functions.scss#L59
  // and material-components-web https://github.com/material-components/material-components-web/blob/ac46b8863c4dab9fc22c4c662dc6bd1b65dd652f/packages/mdc-theme/_functions.scss#L54

  function getContrastText(background) {
    const contrastText = getContrastRatio(background, dark.text.primary) >= contrastThreshold ? dark.text.primary : light.text.primary;

    if (process.env.NODE_ENV !== 'production') {
      const contrast = getContrastRatio(background, contrastText);

      if (contrast < 3) {
        console.error([`MUI: The contrast ratio of ${contrast}:1 for ${contrastText} on ${background}`, 'falls below the WCAG recommended absolute minimum contrast ratio of 3:1.', 'https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast'].join('\n'));
      }
    }

    return contrastText;
  }

  const augmentColor = ({
    color,
    name,
    mainShade = 500,
    lightShade = 300,
    darkShade = 700
  }) => {
    color = _extends$3({}, color);

    if (!color.main && color[mainShade]) {
      color.main = color[mainShade];
    }

    if (!color.hasOwnProperty('main')) {
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${name ? ` (${name})` : ''} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${mainShade}\` property.` : formatMuiErrorMessage(11, name ? ` (${name})` : '', mainShade));
    }

    if (typeof color.main !== 'string') {
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${name ? ` (${name})` : ''} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(color.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });` : formatMuiErrorMessage(12, name ? ` (${name})` : '', JSON.stringify(color.main)));
    }

    addLightOrDark(color, 'light', lightShade, tonalOffset);
    addLightOrDark(color, 'dark', darkShade, tonalOffset);

    if (!color.contrastText) {
      color.contrastText = getContrastText(color.main);
    }

    return color;
  };

  const modes = {
    dark,
    light
  };

  if (process.env.NODE_ENV !== 'production') {
    if (!modes[mode]) {
      console.error(`MUI: The palette mode \`${mode}\` is not supported.`);
    }
  }

  const paletteOutput = deepmerge(_extends$3({
    // A collection of common colors.
    common: common$1,
    // The palette mode, can be light or dark.
    mode,
    // The colors used to represent primary interface elements for a user.
    primary: augmentColor({
      color: primary,
      name: 'primary'
    }),
    // The colors used to represent secondary interface elements for a user.
    secondary: augmentColor({
      color: secondary,
      name: 'secondary',
      mainShade: 'A400',
      lightShade: 'A200',
      darkShade: 'A700'
    }),
    // The colors used to represent interface elements that the user should be made aware of.
    error: augmentColor({
      color: error,
      name: 'error'
    }),
    // The colors used to represent potentially dangerous actions or important messages.
    warning: augmentColor({
      color: warning,
      name: 'warning'
    }),
    // The colors used to present information to the user that is neutral and not necessarily important.
    info: augmentColor({
      color: info,
      name: 'info'
    }),
    // The colors used to indicate the successful completion of an action that user triggered.
    success: augmentColor({
      color: success,
      name: 'success'
    }),
    // The grey colors.
    grey: grey$1,
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold,
    // Takes a background color and returns the text color that maximizes the contrast.
    getContrastText,
    // Generate a rich color object.
    augmentColor,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset
  }, modes[mode]), other);
  return paletteOutput;
}

const _excluded$k = ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"];

function round(value) {
  return Math.round(value * 1e5) / 1e5;
}

const caseAllCaps = {
  textTransform: 'uppercase'
};
const defaultFontFamily = '"Roboto", "Helvetica", "Arial", sans-serif';
/**
 * @see @link{https://material.io/design/typography/the-type-system.html}
 * @see @link{https://material.io/design/typography/understanding-typography.html}
 */

function createTypography(palette, typography) {
  const _ref = typeof typography === 'function' ? typography(palette) : typography,
        {
    fontFamily = defaultFontFamily,
    // The default font size of the Material Specification.
    fontSize = 14,
    // px
    fontWeightLight = 300,
    fontWeightRegular = 400,
    fontWeightMedium = 500,
    fontWeightBold = 700,
    // Tell MUI what's the font-size on the html element.
    // 16px is the default font-size used by browsers.
    htmlFontSize = 16,
    // Apply the CSS properties to all the variants.
    allVariants,
    pxToRem: pxToRem2
  } = _ref,
        other = _objectWithoutPropertiesLoose(_ref, _excluded$k);

  if (process.env.NODE_ENV !== 'production') {
    if (typeof fontSize !== 'number') {
      console.error('MUI: `fontSize` is required to be a number.');
    }

    if (typeof htmlFontSize !== 'number') {
      console.error('MUI: `htmlFontSize` is required to be a number.');
    }
  }

  const coef = fontSize / 14;

  const pxToRem = pxToRem2 || (size => `${size / htmlFontSize * coef}rem`);

  const buildVariant = (fontWeight, size, lineHeight, letterSpacing, casing) => _extends$3({
    fontFamily,
    fontWeight,
    fontSize: pxToRem(size),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight
  }, fontFamily === defaultFontFamily ? {
    letterSpacing: `${round(letterSpacing / size)}em`
  } : {}, casing, allVariants);

  const variants = {
    h1: buildVariant(fontWeightLight, 96, 1.167, -1.5),
    h2: buildVariant(fontWeightLight, 60, 1.2, -0.5),
    h3: buildVariant(fontWeightRegular, 48, 1.167, 0),
    h4: buildVariant(fontWeightRegular, 34, 1.235, 0.25),
    h5: buildVariant(fontWeightRegular, 24, 1.334, 0),
    h6: buildVariant(fontWeightMedium, 20, 1.6, 0.15),
    subtitle1: buildVariant(fontWeightRegular, 16, 1.75, 0.15),
    subtitle2: buildVariant(fontWeightMedium, 14, 1.57, 0.1),
    body1: buildVariant(fontWeightRegular, 16, 1.5, 0.15),
    body2: buildVariant(fontWeightRegular, 14, 1.43, 0.15),
    button: buildVariant(fontWeightMedium, 14, 1.75, 0.4, caseAllCaps),
    caption: buildVariant(fontWeightRegular, 12, 1.66, 0.4),
    overline: buildVariant(fontWeightRegular, 12, 2.66, 1, caseAllCaps)
  };
  return deepmerge(_extends$3({
    htmlFontSize,
    pxToRem,
    fontFamily,
    fontSize,
    fontWeightLight,
    fontWeightRegular,
    fontWeightMedium,
    fontWeightBold
  }, variants), other, {
    clone: false // No need to clone deep

  });
}

const shadowKeyUmbraOpacity = 0.2;
const shadowKeyPenumbraOpacity = 0.14;
const shadowAmbientShadowOpacity = 0.12;

function createShadow(...px) {
  return [`${px[0]}px ${px[1]}px ${px[2]}px ${px[3]}px rgba(0,0,0,${shadowKeyUmbraOpacity})`, `${px[4]}px ${px[5]}px ${px[6]}px ${px[7]}px rgba(0,0,0,${shadowKeyPenumbraOpacity})`, `${px[8]}px ${px[9]}px ${px[10]}px ${px[11]}px rgba(0,0,0,${shadowAmbientShadowOpacity})`].join(',');
} // Values from https://github.com/material-components/material-components-web/blob/be8747f94574669cb5e7add1a7c54fa41a89cec7/packages/mdc-elevation/_variables.scss


const shadows = ['none', createShadow(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), createShadow(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), createShadow(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), createShadow(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), createShadow(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), createShadow(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), createShadow(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), createShadow(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), createShadow(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), createShadow(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), createShadow(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), createShadow(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), createShadow(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), createShadow(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), createShadow(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), createShadow(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), createShadow(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), createShadow(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), createShadow(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), createShadow(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), createShadow(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), createShadow(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), createShadow(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), createShadow(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)];
var shadows$1 = shadows;

const _excluded$j = ["duration", "easing", "delay"];
// Follow https://material.google.com/motion/duration-easing.html#duration-easing-natural-easing-curves
// to learn the context in which each easing should be used.
const easing = {
  // This is the most common easing curve.
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: 'cubic-bezier(0.4, 0, 0.6, 1)'
}; // Follow https://material.io/guidelines/motion/duration-easing.html#duration-easing-common-durations
// to learn when use what timing

const duration = {
  shortest: 150,
  shorter: 200,
  short: 250,
  // most basic recommended timing
  standard: 300,
  // this is to be used in complex animations
  complex: 375,
  // recommended when something is entering screen
  enteringScreen: 225,
  // recommended when something is leaving screen
  leavingScreen: 195
};

function formatMs(milliseconds) {
  return `${Math.round(milliseconds)}ms`;
}

function getAutoHeightDuration(height) {
  if (!height) {
    return 0;
  }

  const constant = height / 36; // https://www.wolframalpha.com/input/?i=(4+%2B+15+*+(x+%2F+36+)+**+0.25+%2B+(x+%2F+36)+%2F+5)+*+10

  return Math.round((4 + 15 * constant ** 0.25 + constant / 5) * 10);
}

function createTransitions(inputTransitions) {
  const mergedEasing = _extends$3({}, easing, inputTransitions.easing);

  const mergedDuration = _extends$3({}, duration, inputTransitions.duration);

  const create = (props = ['all'], options = {}) => {
    const {
      duration: durationOption = mergedDuration.standard,
      easing: easingOption = mergedEasing.easeInOut,
      delay = 0
    } = options,
          other = _objectWithoutPropertiesLoose(options, _excluded$j);

    if (process.env.NODE_ENV !== 'production') {
      const isString = value => typeof value === 'string'; // IE11 support, replace with Number.isNaN
      // eslint-disable-next-line no-restricted-globals


      const isNumber = value => !isNaN(parseFloat(value));

      if (!isString(props) && !Array.isArray(props)) {
        console.error('MUI: Argument "props" must be a string or Array.');
      }

      if (!isNumber(durationOption) && !isString(durationOption)) {
        console.error(`MUI: Argument "duration" must be a number or a string but found ${durationOption}.`);
      }

      if (!isString(easingOption)) {
        console.error('MUI: Argument "easing" must be a string.');
      }

      if (!isNumber(delay) && !isString(delay)) {
        console.error('MUI: Argument "delay" must be a number or a string.');
      }

      if (Object.keys(other).length !== 0) {
        console.error(`MUI: Unrecognized argument(s) [${Object.keys(other).join(',')}].`);
      }
    }

    return (Array.isArray(props) ? props : [props]).map(animatedProp => `${animatedProp} ${typeof durationOption === 'string' ? durationOption : formatMs(durationOption)} ${easingOption} ${typeof delay === 'string' ? delay : formatMs(delay)}`).join(',');
  };

  return _extends$3({
    getAutoHeightDuration,
    create
  }, inputTransitions, {
    easing: mergedEasing,
    duration: mergedDuration
  });
}

// We need to centralize the zIndex definitions as they work
// like global values in the browser.
const zIndex = {
  mobileStepper: 1000,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
};
var zIndex$1 = zIndex;

const _excluded$i = ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"];

function createTheme(options = {}, ...args) {
  const {
    mixins: mixinsInput = {},
    palette: paletteInput = {},
    transitions: transitionsInput = {},
    typography: typographyInput = {}
  } = options,
        other = _objectWithoutPropertiesLoose(options, _excluded$i);

  const palette = createPalette(paletteInput);
  const systemTheme = createTheme$1(options);
  let muiTheme = deepmerge(systemTheme, {
    mixins: createMixins(systemTheme.breakpoints, systemTheme.spacing, mixinsInput),
    palette,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: shadows$1.slice(),
    typography: createTypography(palette, typographyInput),
    transitions: createTransitions(transitionsInput),
    zIndex: _extends$3({}, zIndex$1)
  });
  muiTheme = deepmerge(muiTheme, other);
  muiTheme = args.reduce((acc, argument) => deepmerge(acc, argument), muiTheme);

  if (process.env.NODE_ENV !== 'production') {
    const stateClasses = ['active', 'checked', 'completed', 'disabled', 'error', 'expanded', 'focused', 'focusVisible', 'required', 'selected'];

    const traverse = (node, component) => {
      let key; // eslint-disable-next-line guard-for-in, no-restricted-syntax

      for (key in node) {
        const child = node[key];

        if (stateClasses.indexOf(key) !== -1 && Object.keys(child).length > 0) {
          if (process.env.NODE_ENV !== 'production') {
            const stateClass = generateUtilityClass('', key);
            console.error([`MUI: The \`${component}\` component increases ` + `the CSS specificity of the \`${key}\` internal state.`, 'You can not override it like this: ', JSON.stringify(node, null, 2), '', `Instead, you need to use the '&.${stateClass}' syntax:`, JSON.stringify({
              root: {
                [`&.${stateClass}`]: child
              }
            }, null, 2), '', 'https://mui.com/r/state-classes-guide'].join('\n'));
          } // Remove the style to prevent global conflicts.


          node[key] = {};
        }
      }
    };

    Object.keys(muiTheme.components).forEach(component => {
      const styleOverrides = muiTheme.components[component].styleOverrides;

      if (styleOverrides && component.indexOf('Mui') === 0) {
        traverse(styleOverrides, component);
      }
    });
  }

  return muiTheme;
}

const defaultTheme = createTheme();
var defaultTheme$1 = defaultTheme;

function useThemeProps({
  props,
  name
}) {
  return useThemeProps$1({
    props,
    name,
    defaultTheme: defaultTheme$1
  });
}

const rootShouldForwardProp = prop => shouldForwardProp(prop) && prop !== 'classes';
const styled = createStyled({
  defaultTheme: defaultTheme$1,
  rootShouldForwardProp
});
var styled$1 = styled;

function getSvgIconUtilityClass(slot) {
  return generateUtilityClass('MuiSvgIcon', slot);
}
generateUtilityClasses('MuiSvgIcon', ['root', 'colorPrimary', 'colorSecondary', 'colorAction', 'colorError', 'colorDisabled', 'fontSizeInherit', 'fontSizeSmall', 'fontSizeMedium', 'fontSizeLarge']);

const _excluded$h = ["children", "className", "color", "component", "fontSize", "htmlColor", "inheritViewBox", "titleAccess", "viewBox"];

const useUtilityClasses$d = ownerState => {
  const {
    color,
    fontSize,
    classes
  } = ownerState;
  const slots = {
    root: ['root', color !== 'inherit' && `color${capitalize(color)}`, `fontSize${capitalize(fontSize)}`]
  };
  return composeClasses(slots, getSvgIconUtilityClass, classes);
};

const SvgIconRoot = styled$1('svg', {
  name: 'MuiSvgIcon',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, ownerState.color !== 'inherit' && styles[`color${capitalize(ownerState.color)}`], styles[`fontSize${capitalize(ownerState.fontSize)}`]];
  }
})(({
  theme,
  ownerState
}) => {
  var _theme$transitions, _theme$transitions$cr, _theme$transitions2, _theme$transitions2$d, _theme$typography, _theme$typography$pxT, _theme$typography2, _theme$typography2$px, _theme$typography3, _theme$typography3$px, _theme$palette$ownerS, _theme$palette, _theme$palette$ownerS2, _theme$palette2, _theme$palette2$actio, _theme$palette3, _theme$palette3$actio;

  return {
    userSelect: 'none',
    width: '1em',
    height: '1em',
    display: 'inline-block',
    fill: 'currentColor',
    flexShrink: 0,
    transition: (_theme$transitions = theme.transitions) == null ? void 0 : (_theme$transitions$cr = _theme$transitions.create) == null ? void 0 : _theme$transitions$cr.call(_theme$transitions, 'fill', {
      duration: (_theme$transitions2 = theme.transitions) == null ? void 0 : (_theme$transitions2$d = _theme$transitions2.duration) == null ? void 0 : _theme$transitions2$d.shorter
    }),
    fontSize: {
      inherit: 'inherit',
      small: ((_theme$typography = theme.typography) == null ? void 0 : (_theme$typography$pxT = _theme$typography.pxToRem) == null ? void 0 : _theme$typography$pxT.call(_theme$typography, 20)) || '1.25rem',
      medium: ((_theme$typography2 = theme.typography) == null ? void 0 : (_theme$typography2$px = _theme$typography2.pxToRem) == null ? void 0 : _theme$typography2$px.call(_theme$typography2, 24)) || '1.5rem',
      large: ((_theme$typography3 = theme.typography) == null ? void 0 : (_theme$typography3$px = _theme$typography3.pxToRem) == null ? void 0 : _theme$typography3$px.call(_theme$typography3, 35)) || '2.1875'
    }[ownerState.fontSize],
    // TODO v5 deprecate, v6 remove for sx
    color: (_theme$palette$ownerS = (_theme$palette = theme.palette) == null ? void 0 : (_theme$palette$ownerS2 = _theme$palette[ownerState.color]) == null ? void 0 : _theme$palette$ownerS2.main) != null ? _theme$palette$ownerS : {
      action: (_theme$palette2 = theme.palette) == null ? void 0 : (_theme$palette2$actio = _theme$palette2.action) == null ? void 0 : _theme$palette2$actio.active,
      disabled: (_theme$palette3 = theme.palette) == null ? void 0 : (_theme$palette3$actio = _theme$palette3.action) == null ? void 0 : _theme$palette3$actio.disabled,
      inherit: undefined
    }[ownerState.color]
  };
});
const SvgIcon = /*#__PURE__*/React.forwardRef(function SvgIcon(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiSvgIcon'
  });

  const {
    children,
    className,
    color = 'inherit',
    component = 'svg',
    fontSize = 'medium',
    htmlColor,
    inheritViewBox = false,
    titleAccess,
    viewBox = '0 0 24 24'
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded$h);

  const ownerState = _extends$3({}, props, {
    color,
    component,
    fontSize,
    instanceFontSize: inProps.fontSize,
    inheritViewBox,
    viewBox
  });

  const more = {};

  if (!inheritViewBox) {
    more.viewBox = viewBox;
  }

  const classes = useUtilityClasses$d(ownerState);
  return /*#__PURE__*/jsxRuntime.exports.jsxs(SvgIconRoot, _extends$3({
    as: component,
    className: clsx(classes.root, className),
    ownerState: ownerState,
    focusable: "false",
    color: htmlColor,
    "aria-hidden": titleAccess ? undefined : true,
    role: titleAccess ? 'img' : undefined,
    ref: ref
  }, more, other, {
    children: [children, titleAccess ? /*#__PURE__*/jsxRuntime.exports.jsx("title", {
      children: titleAccess
    }) : null]
  }));
});
process.env.NODE_ENV !== "production" ? SvgIcon.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * Node passed into the SVG element.
   */
  children: PropTypes.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/customization/palette/#adding-new-colors).
   * You can use the `htmlColor` prop to apply a color attribute to the SVG element.
   * @default 'inherit'
   */
  color: PropTypes
  /* @typescript-to-proptypes-ignore */
  .oneOfType([PropTypes.oneOf(['inherit', 'action', 'disabled', 'primary', 'secondary', 'error', 'info', 'success', 'warning']), PropTypes.string]),

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,

  /**
   * The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
   * @default 'medium'
   */
  fontSize: PropTypes
  /* @typescript-to-proptypes-ignore */
  .oneOfType([PropTypes.oneOf(['inherit', 'large', 'medium', 'small']), PropTypes.string]),

  /**
   * Applies a color attribute to the SVG element.
   */
  htmlColor: PropTypes.string,

  /**
   * If `true`, the root node will inherit the custom `component`'s viewBox and the `viewBox`
   * prop will be ignored.
   * Useful when you want to reference a custom `component` and have `SvgIcon` pass that
   * `component`'s viewBox to the root node.
   * @default false
   */
  inheritViewBox: PropTypes.bool,

  /**
   * The shape-rendering attribute. The behavior of the different options is described on the
   * [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/shape-rendering).
   * If you are having issues with blurry icons you should investigate this prop.
   */
  shapeRendering: PropTypes.string,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),

  /**
   * Provides a human-readable title for the element that contains it.
   * https://www.w3.org/TR/SVG-access/#Equivalent
   */
  titleAccess: PropTypes.string,

  /**
   * Allows you to redefine what the coordinates without units mean inside an SVG element.
   * For example, if the SVG element is 500 (width) by 200 (height),
   * and you pass viewBox="0 0 50 20",
   * this means that the coordinates inside the SVG will go from the top left corner (0,0)
   * to bottom right (50,20) and each unit will be worth 10px.
   * @default '0 0 24 24'
   */
  viewBox: PropTypes.string
} : void 0;
SvgIcon.muiName = 'SvgIcon';
var SvgIcon$1 = SvgIcon;

function createSvgIcon(path, displayName) {
  const Component = (props, ref) => /*#__PURE__*/jsxRuntime.exports.jsx(SvgIcon$1, _extends$3({
    "data-testid": `${displayName}Icon`,
    ref: ref
  }, props, {
    children: path
  }));

  if (process.env.NODE_ENV !== 'production') {
    // Need to set `displayName` on the inner component for React.memo.
    // React prior to 16.14 ignores `displayName` on the wrapper.
    Component.displayName = `${displayName}Icon`;
  }

  Component.muiName = SvgIcon$1.muiName;
  return /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(Component));
}

// eslint-disable-next-line @typescript-eslint/naming-convention

const unstable_ClassNameGenerator = {
  configure: generator => {
    console.warn(['MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.', '', "You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead", '', 'The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401', '', 'The updated documentation: https://mui.com/guides/classname-generator/'].join('\n'));
    ClassNameGenerator$1.configure(generator);
  }
};

var utils = /*#__PURE__*/Object.freeze({
    __proto__: null,
    unstable_ClassNameGenerator: unstable_ClassNameGenerator,
    capitalize: capitalize,
    createChainedFunction: createChainedFunction,
    createSvgIcon: createSvgIcon,
    debounce: debounce,
    deprecatedPropType: deprecatedPropType,
    isMuiElement: isMuiElement,
    ownerDocument: ownerDocument,
    ownerWindow: ownerWindow,
    requirePropFactory: requirePropFactory,
    setRef: setRef,
    unstable_useEnhancedEffect: useEnhancedEffect$1,
    unstable_useId: useId,
    unsupportedProp: unsupportedProp,
    useControlled: useControlled,
    useEventCallback: useEventCallback,
    useForkRef: useForkRef,
    useIsFocusVisible: useIsFocusVisible
});

var require$$0 = /*@__PURE__*/getAugmentedNamespace(utils);

(function (exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _utils.createSvgIcon;
  }
});

var _utils = require$$0;
}(createSvgIcon$1));

var _interopRequireDefault$5 = interopRequireDefault.exports;

Object.defineProperty(Print, "__esModule", {
  value: true
});
var default_1$5 = Print.default = void 0;

var _createSvgIcon$5 = _interopRequireDefault$5(createSvgIcon$1);

var _jsxRuntime$5 = jsxRuntime.exports;

var _default$5 = (0, _createSvgIcon$5.default)( /*#__PURE__*/(0, _jsxRuntime$5.jsx)("path", {
  d: "M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"
}), 'Print');

default_1$5 = Print.default = _default$5;

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf(subClass, superClass);
}

var config = {
  disabled: false
};

var timeoutsShape = process.env.NODE_ENV !== 'production' ? PropTypes.oneOfType([PropTypes.number, PropTypes.shape({
  enter: PropTypes.number,
  exit: PropTypes.number,
  appear: PropTypes.number
}).isRequired]) : null;
process.env.NODE_ENV !== 'production' ? PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
  enter: PropTypes.string,
  exit: PropTypes.string,
  active: PropTypes.string
}), PropTypes.shape({
  enter: PropTypes.string,
  enterDone: PropTypes.string,
  enterActive: PropTypes.string,
  exit: PropTypes.string,
  exitDone: PropTypes.string,
  exitActive: PropTypes.string
})]) : null;

var TransitionGroupContext = React__default.createContext(null);

var UNMOUNTED = 'unmounted';
var EXITED = 'exited';
var ENTERING = 'entering';
var ENTERED = 'entered';
var EXITING = 'exiting';
/**
 * The Transition component lets you describe a transition from one component
 * state to another _over time_ with a simple declarative API. Most commonly
 * it's used to animate the mounting and unmounting of a component, but can also
 * be used to describe in-place transition states as well.
 *
 * ---
 *
 * **Note**: `Transition` is a platform-agnostic base component. If you're using
 * transitions in CSS, you'll probably want to use
 * [`CSSTransition`](https://reactcommunity.org/react-transition-group/css-transition)
 * instead. It inherits all the features of `Transition`, but contains
 * additional features necessary to play nice with CSS transitions (hence the
 * name of the component).
 *
 * ---
 *
 * By default the `Transition` component does not alter the behavior of the
 * component it renders, it only tracks "enter" and "exit" states for the
 * components. It's up to you to give meaning and effect to those states. For
 * example we can add styles to a component when it enters or exits:
 *
 * ```jsx
 * import { Transition } from 'react-transition-group';
 *
 * const duration = 300;
 *
 * const defaultStyle = {
 *   transition: `opacity ${duration}ms ease-in-out`,
 *   opacity: 0,
 * }
 *
 * const transitionStyles = {
 *   entering: { opacity: 1 },
 *   entered:  { opacity: 1 },
 *   exiting:  { opacity: 0 },
 *   exited:  { opacity: 0 },
 * };
 *
 * const Fade = ({ in: inProp }) => (
 *   <Transition in={inProp} timeout={duration}>
 *     {state => (
 *       <div style={{
 *         ...defaultStyle,
 *         ...transitionStyles[state]
 *       }}>
 *         I'm a fade Transition!
 *       </div>
 *     )}
 *   </Transition>
 * );
 * ```
 *
 * There are 4 main states a Transition can be in:
 *  - `'entering'`
 *  - `'entered'`
 *  - `'exiting'`
 *  - `'exited'`
 *
 * Transition state is toggled via the `in` prop. When `true` the component
 * begins the "Enter" stage. During this stage, the component will shift from
 * its current transition state, to `'entering'` for the duration of the
 * transition and then to the `'entered'` stage once it's complete. Let's take
 * the following example (we'll use the
 * [useState](https://reactjs.org/docs/hooks-reference.html#usestate) hook):
 *
 * ```jsx
 * function App() {
 *   const [inProp, setInProp] = useState(false);
 *   return (
 *     <div>
 *       <Transition in={inProp} timeout={500}>
 *         {state => (
 *           // ...
 *         )}
 *       </Transition>
 *       <button onClick={() => setInProp(true)}>
 *         Click to Enter
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 *
 * When the button is clicked the component will shift to the `'entering'` state
 * and stay there for 500ms (the value of `timeout`) before it finally switches
 * to `'entered'`.
 *
 * When `in` is `false` the same thing happens except the state moves from
 * `'exiting'` to `'exited'`.
 */

var Transition = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(Transition, _React$Component);

  function Transition(props, context) {
    var _this;

    _this = _React$Component.call(this, props, context) || this;
    var parentGroup = context; // In the context of a TransitionGroup all enters are really appears

    var appear = parentGroup && !parentGroup.isMounting ? props.enter : props.appear;
    var initialStatus;
    _this.appearStatus = null;

    if (props.in) {
      if (appear) {
        initialStatus = EXITED;
        _this.appearStatus = ENTERING;
      } else {
        initialStatus = ENTERED;
      }
    } else {
      if (props.unmountOnExit || props.mountOnEnter) {
        initialStatus = UNMOUNTED;
      } else {
        initialStatus = EXITED;
      }
    }

    _this.state = {
      status: initialStatus
    };
    _this.nextCallback = null;
    return _this;
  }

  Transition.getDerivedStateFromProps = function getDerivedStateFromProps(_ref, prevState) {
    var nextIn = _ref.in;

    if (nextIn && prevState.status === UNMOUNTED) {
      return {
        status: EXITED
      };
    }

    return null;
  } // getSnapshotBeforeUpdate(prevProps) {
  //   let nextStatus = null
  //   if (prevProps !== this.props) {
  //     const { status } = this.state
  //     if (this.props.in) {
  //       if (status !== ENTERING && status !== ENTERED) {
  //         nextStatus = ENTERING
  //       }
  //     } else {
  //       if (status === ENTERING || status === ENTERED) {
  //         nextStatus = EXITING
  //       }
  //     }
  //   }
  //   return { nextStatus }
  // }
  ;

  var _proto = Transition.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.updateStatus(true, this.appearStatus);
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var nextStatus = null;

    if (prevProps !== this.props) {
      var status = this.state.status;

      if (this.props.in) {
        if (status !== ENTERING && status !== ENTERED) {
          nextStatus = ENTERING;
        }
      } else {
        if (status === ENTERING || status === ENTERED) {
          nextStatus = EXITING;
        }
      }
    }

    this.updateStatus(false, nextStatus);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.cancelNextCallback();
  };

  _proto.getTimeouts = function getTimeouts() {
    var timeout = this.props.timeout;
    var exit, enter, appear;
    exit = enter = appear = timeout;

    if (timeout != null && typeof timeout !== 'number') {
      exit = timeout.exit;
      enter = timeout.enter; // TODO: remove fallback for next major

      appear = timeout.appear !== undefined ? timeout.appear : enter;
    }

    return {
      exit: exit,
      enter: enter,
      appear: appear
    };
  };

  _proto.updateStatus = function updateStatus(mounting, nextStatus) {
    if (mounting === void 0) {
      mounting = false;
    }

    if (nextStatus !== null) {
      // nextStatus will always be ENTERING or EXITING.
      this.cancelNextCallback();

      if (nextStatus === ENTERING) {
        this.performEnter(mounting);
      } else {
        this.performExit();
      }
    } else if (this.props.unmountOnExit && this.state.status === EXITED) {
      this.setState({
        status: UNMOUNTED
      });
    }
  };

  _proto.performEnter = function performEnter(mounting) {
    var _this2 = this;

    var enter = this.props.enter;
    var appearing = this.context ? this.context.isMounting : mounting;

    var _ref2 = this.props.nodeRef ? [appearing] : [ReactDOM__default.findDOMNode(this), appearing],
        maybeNode = _ref2[0],
        maybeAppearing = _ref2[1];

    var timeouts = this.getTimeouts();
    var enterTimeout = appearing ? timeouts.appear : timeouts.enter; // no enter animation skip right to ENTERED
    // if we are mounting and running this it means appear _must_ be set

    if (!mounting && !enter || config.disabled) {
      this.safeSetState({
        status: ENTERED
      }, function () {
        _this2.props.onEntered(maybeNode);
      });
      return;
    }

    this.props.onEnter(maybeNode, maybeAppearing);
    this.safeSetState({
      status: ENTERING
    }, function () {
      _this2.props.onEntering(maybeNode, maybeAppearing);

      _this2.onTransitionEnd(enterTimeout, function () {
        _this2.safeSetState({
          status: ENTERED
        }, function () {
          _this2.props.onEntered(maybeNode, maybeAppearing);
        });
      });
    });
  };

  _proto.performExit = function performExit() {
    var _this3 = this;

    var exit = this.props.exit;
    var timeouts = this.getTimeouts();
    var maybeNode = this.props.nodeRef ? undefined : ReactDOM__default.findDOMNode(this); // no exit animation skip right to EXITED

    if (!exit || config.disabled) {
      this.safeSetState({
        status: EXITED
      }, function () {
        _this3.props.onExited(maybeNode);
      });
      return;
    }

    this.props.onExit(maybeNode);
    this.safeSetState({
      status: EXITING
    }, function () {
      _this3.props.onExiting(maybeNode);

      _this3.onTransitionEnd(timeouts.exit, function () {
        _this3.safeSetState({
          status: EXITED
        }, function () {
          _this3.props.onExited(maybeNode);
        });
      });
    });
  };

  _proto.cancelNextCallback = function cancelNextCallback() {
    if (this.nextCallback !== null) {
      this.nextCallback.cancel();
      this.nextCallback = null;
    }
  };

  _proto.safeSetState = function safeSetState(nextState, callback) {
    // This shouldn't be necessary, but there are weird race conditions with
    // setState callbacks and unmounting in testing, so always make sure that
    // we can cancel any pending setState callbacks after we unmount.
    callback = this.setNextCallback(callback);
    this.setState(nextState, callback);
  };

  _proto.setNextCallback = function setNextCallback(callback) {
    var _this4 = this;

    var active = true;

    this.nextCallback = function (event) {
      if (active) {
        active = false;
        _this4.nextCallback = null;
        callback(event);
      }
    };

    this.nextCallback.cancel = function () {
      active = false;
    };

    return this.nextCallback;
  };

  _proto.onTransitionEnd = function onTransitionEnd(timeout, handler) {
    this.setNextCallback(handler);
    var node = this.props.nodeRef ? this.props.nodeRef.current : ReactDOM__default.findDOMNode(this);
    var doesNotHaveTimeoutOrListener = timeout == null && !this.props.addEndListener;

    if (!node || doesNotHaveTimeoutOrListener) {
      setTimeout(this.nextCallback, 0);
      return;
    }

    if (this.props.addEndListener) {
      var _ref3 = this.props.nodeRef ? [this.nextCallback] : [node, this.nextCallback],
          maybeNode = _ref3[0],
          maybeNextCallback = _ref3[1];

      this.props.addEndListener(maybeNode, maybeNextCallback);
    }

    if (timeout != null) {
      setTimeout(this.nextCallback, timeout);
    }
  };

  _proto.render = function render() {
    var status = this.state.status;

    if (status === UNMOUNTED) {
      return null;
    }

    var _this$props = this.props,
        children = _this$props.children;
        _this$props.in;
        _this$props.mountOnEnter;
        _this$props.unmountOnExit;
        _this$props.appear;
        _this$props.enter;
        _this$props.exit;
        _this$props.timeout;
        _this$props.addEndListener;
        _this$props.onEnter;
        _this$props.onEntering;
        _this$props.onEntered;
        _this$props.onExit;
        _this$props.onExiting;
        _this$props.onExited;
        _this$props.nodeRef;
        var childProps = _objectWithoutPropertiesLoose(_this$props, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);

    return (
      /*#__PURE__*/
      // allows for nested Transitions
      React__default.createElement(TransitionGroupContext.Provider, {
        value: null
      }, typeof children === 'function' ? children(status, childProps) : React__default.cloneElement(React__default.Children.only(children), childProps))
    );
  };

  return Transition;
}(React__default.Component);

Transition.contextType = TransitionGroupContext;
Transition.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * A React reference to DOM element that need to transition:
   * https://stackoverflow.com/a/51127130/4671932
   *
   *   - When `nodeRef` prop is used, `node` is not passed to callback functions
   *      (e.g. `onEnter`) because user already has direct access to the node.
   *   - When changing `key` prop of `Transition` in a `TransitionGroup` a new
   *     `nodeRef` need to be provided to `Transition` with changed `key` prop
   *     (see
   *     [test/CSSTransition-test.js](https://github.com/reactjs/react-transition-group/blob/13435f897b3ab71f6e19d724f145596f5910581c/test/CSSTransition-test.js#L362-L437)).
   */
  nodeRef: PropTypes.shape({
    current: typeof Element === 'undefined' ? PropTypes.any : function (propValue, key, componentName, location, propFullName, secret) {
      var value = propValue[key];
      return PropTypes.instanceOf(value && 'ownerDocument' in value ? value.ownerDocument.defaultView.Element : Element)(propValue, key, componentName, location, propFullName, secret);
    }
  }),

  /**
   * A `function` child can be used instead of a React element. This function is
   * called with the current transition status (`'entering'`, `'entered'`,
   * `'exiting'`, `'exited'`), which can be used to apply context
   * specific props to a component.
   *
   * ```jsx
   * <Transition in={this.state.in} timeout={150}>
   *   {state => (
   *     <MyComponent className={`fade fade-${state}`} />
   *   )}
   * </Transition>
   * ```
   */
  children: PropTypes.oneOfType([PropTypes.func.isRequired, PropTypes.element.isRequired]).isRequired,

  /**
   * Show the component; triggers the enter or exit states
   */
  in: PropTypes.bool,

  /**
   * By default the child component is mounted immediately along with
   * the parent `Transition` component. If you want to "lazy mount" the component on the
   * first `in={true}` you can set `mountOnEnter`. After the first enter transition the component will stay
   * mounted, even on "exited", unless you also specify `unmountOnExit`.
   */
  mountOnEnter: PropTypes.bool,

  /**
   * By default the child component stays mounted after it reaches the `'exited'` state.
   * Set `unmountOnExit` if you'd prefer to unmount the component after it finishes exiting.
   */
  unmountOnExit: PropTypes.bool,

  /**
   * By default the child component does not perform the enter transition when
   * it first mounts, regardless of the value of `in`. If you want this
   * behavior, set both `appear` and `in` to `true`.
   *
   * > **Note**: there are no special appear states like `appearing`/`appeared`, this prop
   * > only adds an additional enter transition. However, in the
   * > `<CSSTransition>` component that first enter transition does result in
   * > additional `.appear-*` classes, that way you can choose to style it
   * > differently.
   */
  appear: PropTypes.bool,

  /**
   * Enable or disable enter transitions.
   */
  enter: PropTypes.bool,

  /**
   * Enable or disable exit transitions.
   */
  exit: PropTypes.bool,

  /**
   * The duration of the transition, in milliseconds.
   * Required unless `addEndListener` is provided.
   *
   * You may specify a single timeout for all transitions:
   *
   * ```jsx
   * timeout={500}
   * ```
   *
   * or individually:
   *
   * ```jsx
   * timeout={{
   *  appear: 500,
   *  enter: 300,
   *  exit: 500,
   * }}
   * ```
   *
   * - `appear` defaults to the value of `enter`
   * - `enter` defaults to `0`
   * - `exit` defaults to `0`
   *
   * @type {number | { enter?: number, exit?: number, appear?: number }}
   */
  timeout: function timeout(props) {
    var pt = timeoutsShape;
    if (!props.addEndListener) pt = pt.isRequired;

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return pt.apply(void 0, [props].concat(args));
  },

  /**
   * Add a custom transition end trigger. Called with the transitioning
   * DOM node and a `done` callback. Allows for more fine grained transition end
   * logic. Timeouts are still used as a fallback if provided.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * ```jsx
   * addEndListener={(node, done) => {
   *   // use the css transitionend event to mark the finish of a transition
   *   node.addEventListener('transitionend', done, false);
   * }}
   * ```
   */
  addEndListener: PropTypes.func,

  /**
   * Callback fired before the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEnter: PropTypes.func,

  /**
   * Callback fired after the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool)
   */
  onEntering: PropTypes.func,

  /**
   * Callback fired after the "entered" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEntered: PropTypes.func,

  /**
   * Callback fired before the "exiting" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExit: PropTypes.func,

  /**
   * Callback fired after the "exiting" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExiting: PropTypes.func,

  /**
   * Callback fired after the "exited" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExited: PropTypes.func
} : {}; // Name the function so it is clearer in the documentation

function noop() {}

Transition.defaultProps = {
  in: false,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: false,
  enter: true,
  exit: true,
  onEnter: noop,
  onEntering: noop,
  onEntered: noop,
  onExit: noop,
  onExiting: noop,
  onExited: noop
};
Transition.UNMOUNTED = UNMOUNTED;
Transition.EXITED = EXITED;
Transition.ENTERING = ENTERING;
Transition.ENTERED = ENTERED;
Transition.EXITING = EXITING;
var Transition$1 = Transition;

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

/**
 * Given `this.props.children`, return an object mapping key to child.
 *
 * @param {*} children `this.props.children`
 * @return {object} Mapping of key to child
 */

function getChildMapping(children, mapFn) {
  var mapper = function mapper(child) {
    return mapFn && isValidElement(child) ? mapFn(child) : child;
  };

  var result = Object.create(null);
  if (children) Children.map(children, function (c) {
    return c;
  }).forEach(function (child) {
    // run the map function here instead so that the key is the computed one
    result[child.key] = mapper(child);
  });
  return result;
}
/**
 * When you're adding or removing children some may be added or removed in the
 * same render pass. We want to show *both* since we want to simultaneously
 * animate elements in and out. This function takes a previous set of keys
 * and a new set of keys and merges them with its best guess of the correct
 * ordering. In the future we may expose some of the utilities in
 * ReactMultiChild to make this easy, but for now React itself does not
 * directly have this concept of the union of prevChildren and nextChildren
 * so we implement it here.
 *
 * @param {object} prev prev children as returned from
 * `ReactTransitionChildMapping.getChildMapping()`.
 * @param {object} next next children as returned from
 * `ReactTransitionChildMapping.getChildMapping()`.
 * @return {object} a key set that contains all keys in `prev` and all keys
 * in `next` in a reasonable order.
 */

function mergeChildMappings(prev, next) {
  prev = prev || {};
  next = next || {};

  function getValueForKey(key) {
    return key in next ? next[key] : prev[key];
  } // For each key of `next`, the list of keys to insert before that key in
  // the combined list


  var nextKeysPending = Object.create(null);
  var pendingKeys = [];

  for (var prevKey in prev) {
    if (prevKey in next) {
      if (pendingKeys.length) {
        nextKeysPending[prevKey] = pendingKeys;
        pendingKeys = [];
      }
    } else {
      pendingKeys.push(prevKey);
    }
  }

  var i;
  var childMapping = {};

  for (var nextKey in next) {
    if (nextKeysPending[nextKey]) {
      for (i = 0; i < nextKeysPending[nextKey].length; i++) {
        var pendingNextKey = nextKeysPending[nextKey][i];
        childMapping[nextKeysPending[nextKey][i]] = getValueForKey(pendingNextKey);
      }
    }

    childMapping[nextKey] = getValueForKey(nextKey);
  } // Finally, add the keys which didn't appear before any key in `next`


  for (i = 0; i < pendingKeys.length; i++) {
    childMapping[pendingKeys[i]] = getValueForKey(pendingKeys[i]);
  }

  return childMapping;
}

function getProp(child, prop, props) {
  return props[prop] != null ? props[prop] : child.props[prop];
}

function getInitialChildMapping(props, onExited) {
  return getChildMapping(props.children, function (child) {
    return cloneElement(child, {
      onExited: onExited.bind(null, child),
      in: true,
      appear: getProp(child, 'appear', props),
      enter: getProp(child, 'enter', props),
      exit: getProp(child, 'exit', props)
    });
  });
}
function getNextChildMapping(nextProps, prevChildMapping, onExited) {
  var nextChildMapping = getChildMapping(nextProps.children);
  var children = mergeChildMappings(prevChildMapping, nextChildMapping);
  Object.keys(children).forEach(function (key) {
    var child = children[key];
    if (!isValidElement(child)) return;
    var hasPrev = (key in prevChildMapping);
    var hasNext = (key in nextChildMapping);
    var prevChild = prevChildMapping[key];
    var isLeaving = isValidElement(prevChild) && !prevChild.props.in; // item is new (entering)

    if (hasNext && (!hasPrev || isLeaving)) {
      // console.log('entering', key)
      children[key] = cloneElement(child, {
        onExited: onExited.bind(null, child),
        in: true,
        exit: getProp(child, 'exit', nextProps),
        enter: getProp(child, 'enter', nextProps)
      });
    } else if (!hasNext && hasPrev && !isLeaving) {
      // item is old (exiting)
      // console.log('leaving', key)
      children[key] = cloneElement(child, {
        in: false
      });
    } else if (hasNext && hasPrev && isValidElement(prevChild)) {
      // item hasn't changed transition states
      // copy over the last transition props;
      // console.log('unchanged', key)
      children[key] = cloneElement(child, {
        onExited: onExited.bind(null, child),
        in: prevChild.props.in,
        exit: getProp(child, 'exit', nextProps),
        enter: getProp(child, 'enter', nextProps)
      });
    }
  });
  return children;
}

var values = Object.values || function (obj) {
  return Object.keys(obj).map(function (k) {
    return obj[k];
  });
};

var defaultProps$1 = {
  component: 'div',
  childFactory: function childFactory(child) {
    return child;
  }
};
/**
 * The `<TransitionGroup>` component manages a set of transition components
 * (`<Transition>` and `<CSSTransition>`) in a list. Like with the transition
 * components, `<TransitionGroup>` is a state machine for managing the mounting
 * and unmounting of components over time.
 *
 * Consider the example below. As items are removed or added to the TodoList the
 * `in` prop is toggled automatically by the `<TransitionGroup>`.
 *
 * Note that `<TransitionGroup>`  does not define any animation behavior!
 * Exactly _how_ a list item animates is up to the individual transition
 * component. This means you can mix and match animations across different list
 * items.
 */

var TransitionGroup = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(TransitionGroup, _React$Component);

  function TransitionGroup(props, context) {
    var _this;

    _this = _React$Component.call(this, props, context) || this;

    var handleExited = _this.handleExited.bind(_assertThisInitialized(_this)); // Initial children should all be entering, dependent on appear


    _this.state = {
      contextValue: {
        isMounting: true
      },
      handleExited: handleExited,
      firstRender: true
    };
    return _this;
  }

  var _proto = TransitionGroup.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.mounted = true;
    this.setState({
      contextValue: {
        isMounting: false
      }
    });
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.mounted = false;
  };

  TransitionGroup.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, _ref) {
    var prevChildMapping = _ref.children,
        handleExited = _ref.handleExited,
        firstRender = _ref.firstRender;
    return {
      children: firstRender ? getInitialChildMapping(nextProps, handleExited) : getNextChildMapping(nextProps, prevChildMapping, handleExited),
      firstRender: false
    };
  } // node is `undefined` when user provided `nodeRef` prop
  ;

  _proto.handleExited = function handleExited(child, node) {
    var currentChildMapping = getChildMapping(this.props.children);
    if (child.key in currentChildMapping) return;

    if (child.props.onExited) {
      child.props.onExited(node);
    }

    if (this.mounted) {
      this.setState(function (state) {
        var children = _extends$3({}, state.children);

        delete children[child.key];
        return {
          children: children
        };
      });
    }
  };

  _proto.render = function render() {
    var _this$props = this.props,
        Component = _this$props.component,
        childFactory = _this$props.childFactory,
        props = _objectWithoutPropertiesLoose(_this$props, ["component", "childFactory"]);

    var contextValue = this.state.contextValue;
    var children = values(this.state.children).map(childFactory);
    delete props.appear;
    delete props.enter;
    delete props.exit;

    if (Component === null) {
      return /*#__PURE__*/React__default.createElement(TransitionGroupContext.Provider, {
        value: contextValue
      }, children);
    }

    return /*#__PURE__*/React__default.createElement(TransitionGroupContext.Provider, {
      value: contextValue
    }, /*#__PURE__*/React__default.createElement(Component, props, children));
  };

  return TransitionGroup;
}(React__default.Component);

TransitionGroup.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * `<TransitionGroup>` renders a `<div>` by default. You can change this
   * behavior by providing a `component` prop.
   * If you use React v16+ and would like to avoid a wrapping `<div>` element
   * you can pass in `component={null}`. This is useful if the wrapping div
   * borks your css styles.
   */
  component: PropTypes.any,

  /**
   * A set of `<Transition>` components, that are toggled `in` and out as they
   * leave. the `<TransitionGroup>` will inject specific transition props, so
   * remember to spread them through if you are wrapping the `<Transition>` as
   * with our `<Fade>` example.
   *
   * While this component is meant for multiple `Transition` or `CSSTransition`
   * children, sometimes you may want to have a single transition child with
   * content that you want to be transitioned out and in when you change it
   * (e.g. routes, images etc.) In that case you can change the `key` prop of
   * the transition child as you change its content, this will cause
   * `TransitionGroup` to transition the child out and back in.
   */
  children: PropTypes.node,

  /**
   * A convenience prop that enables or disables appear animations
   * for all children. Note that specifying this will override any defaults set
   * on individual children Transitions.
   */
  appear: PropTypes.bool,

  /**
   * A convenience prop that enables or disables enter animations
   * for all children. Note that specifying this will override any defaults set
   * on individual children Transitions.
   */
  enter: PropTypes.bool,

  /**
   * A convenience prop that enables or disables exit animations
   * for all children. Note that specifying this will override any defaults set
   * on individual children Transitions.
   */
  exit: PropTypes.bool,

  /**
   * You may need to apply reactive updates to a child as it is exiting.
   * This is generally done by using `cloneElement` however in the case of an exiting
   * child the element has already been removed and not accessible to the consumer.
   *
   * If you do need to update a child as it leaves you can provide a `childFactory`
   * to wrap every child, even the ones that are leaving.
   *
   * @type Function(child: ReactElement) -> ReactElement
   */
  childFactory: PropTypes.func
} : {};
TransitionGroup.defaultProps = defaultProps$1;
var TransitionGroup$1 = TransitionGroup;

function Ripple(props) {
  const {
    className,
    classes,
    pulsate = false,
    rippleX,
    rippleY,
    rippleSize,
    in: inProp,
    onExited,
    timeout
  } = props;
  const [leaving, setLeaving] = React.useState(false);
  const rippleClassName = clsx(className, classes.ripple, classes.rippleVisible, pulsate && classes.ripplePulsate);
  const rippleStyles = {
    width: rippleSize,
    height: rippleSize,
    top: -(rippleSize / 2) + rippleY,
    left: -(rippleSize / 2) + rippleX
  };
  const childClassName = clsx(classes.child, leaving && classes.childLeaving, pulsate && classes.childPulsate);

  if (!inProp && !leaving) {
    setLeaving(true);
  }

  React.useEffect(() => {
    if (!inProp && onExited != null) {
      // react-transition-group#onExited
      const timeoutId = setTimeout(onExited, timeout);
      return () => {
        clearTimeout(timeoutId);
      };
    }

    return undefined;
  }, [onExited, inProp, timeout]);
  return /*#__PURE__*/jsxRuntime.exports.jsx("span", {
    className: rippleClassName,
    style: rippleStyles,
    children: /*#__PURE__*/jsxRuntime.exports.jsx("span", {
      className: childClassName
    })
  });
}

process.env.NODE_ENV !== "production" ? Ripple.propTypes = {
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,

  /**
   * @ignore - injected from TransitionGroup
   */
  in: PropTypes.bool,

  /**
   * @ignore - injected from TransitionGroup
   */
  onExited: PropTypes.func,

  /**
   * If `true`, the ripple pulsates, typically indicating the keyboard focus state of an element.
   */
  pulsate: PropTypes.bool,

  /**
   * Diameter of the ripple.
   */
  rippleSize: PropTypes.number,

  /**
   * Horizontal position of the ripple center.
   */
  rippleX: PropTypes.number,

  /**
   * Vertical position of the ripple center.
   */
  rippleY: PropTypes.number,

  /**
   * exit delay
   */
  timeout: PropTypes.number.isRequired
} : void 0;

const touchRippleClasses = generateUtilityClasses('MuiTouchRipple', ['root', 'ripple', 'rippleVisible', 'ripplePulsate', 'child', 'childLeaving', 'childPulsate']);
var touchRippleClasses$1 = touchRippleClasses;

const _excluded$g = ["center", "classes", "className"];

let _ = t => t,
    _t,
    _t2,
    _t3,
    _t4;
const DURATION = 550;
const DELAY_RIPPLE = 80;
const enterKeyframe = keyframes(_t || (_t = _`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`));
const exitKeyframe = keyframes(_t2 || (_t2 = _`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`));
const pulsateKeyframe = keyframes(_t3 || (_t3 = _`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`));
const TouchRippleRoot = styled$1('span', {
  name: 'MuiTouchRipple',
  slot: 'Root'
})({
  overflow: 'hidden',
  pointerEvents: 'none',
  position: 'absolute',
  zIndex: 0,
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  borderRadius: 'inherit'
}); // This `styled()` function invokes keyframes. `styled-components` only supports keyframes
// in string templates. Do not convert these styles in JS object as it will break.

const TouchRippleRipple = styled$1(Ripple, {
  name: 'MuiTouchRipple',
  slot: 'Ripple'
})(_t4 || (_t4 = _`
  opacity: 0;
  position: absolute;

  &.${0} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${0};
    animation-duration: ${0}ms;
    animation-timing-function: ${0};
  }

  &.${0} {
    animation-duration: ${0}ms;
  }

  & .${0} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${0} {
    opacity: 0;
    animation-name: ${0};
    animation-duration: ${0}ms;
    animation-timing-function: ${0};
  }

  & .${0} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
    animation-name: ${0};
    animation-duration: 2500ms;
    animation-timing-function: ${0};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`), touchRippleClasses$1.rippleVisible, enterKeyframe, DURATION, ({
  theme
}) => theme.transitions.easing.easeInOut, touchRippleClasses$1.ripplePulsate, ({
  theme
}) => theme.transitions.duration.shorter, touchRippleClasses$1.child, touchRippleClasses$1.childLeaving, exitKeyframe, DURATION, ({
  theme
}) => theme.transitions.easing.easeInOut, touchRippleClasses$1.childPulsate, pulsateKeyframe, ({
  theme
}) => theme.transitions.easing.easeInOut);
/**
 * @ignore - internal component.
 *
 * TODO v5: Make private
 */

const TouchRipple = /*#__PURE__*/React.forwardRef(function TouchRipple(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiTouchRipple'
  });

  const {
    center: centerProp = false,
    classes = {},
    className
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded$g);

  const [ripples, setRipples] = React.useState([]);
  const nextKey = React.useRef(0);
  const rippleCallback = React.useRef(null);
  React.useEffect(() => {
    if (rippleCallback.current) {
      rippleCallback.current();
      rippleCallback.current = null;
    }
  }, [ripples]); // Used to filter out mouse emulated events on mobile.

  const ignoringMouseDown = React.useRef(false); // We use a timer in order to only show the ripples for touch "click" like events.
  // We don't want to display the ripple for touch scroll events.

  const startTimer = React.useRef(null); // This is the hook called once the previous timeout is ready.

  const startTimerCommit = React.useRef(null);
  const container = React.useRef(null);
  React.useEffect(() => {
    return () => {
      clearTimeout(startTimer.current);
    };
  }, []);
  const startCommit = React.useCallback(params => {
    const {
      pulsate,
      rippleX,
      rippleY,
      rippleSize,
      cb
    } = params;
    setRipples(oldRipples => [...oldRipples, /*#__PURE__*/jsxRuntime.exports.jsx(TouchRippleRipple, {
      classes: {
        ripple: clsx(classes.ripple, touchRippleClasses$1.ripple),
        rippleVisible: clsx(classes.rippleVisible, touchRippleClasses$1.rippleVisible),
        ripplePulsate: clsx(classes.ripplePulsate, touchRippleClasses$1.ripplePulsate),
        child: clsx(classes.child, touchRippleClasses$1.child),
        childLeaving: clsx(classes.childLeaving, touchRippleClasses$1.childLeaving),
        childPulsate: clsx(classes.childPulsate, touchRippleClasses$1.childPulsate)
      },
      timeout: DURATION,
      pulsate: pulsate,
      rippleX: rippleX,
      rippleY: rippleY,
      rippleSize: rippleSize
    }, nextKey.current)]);
    nextKey.current += 1;
    rippleCallback.current = cb;
  }, [classes]);
  const start = React.useCallback((event = {}, options = {}, cb) => {
    const {
      pulsate = false,
      center = centerProp || options.pulsate,
      fakeElement = false // For test purposes

    } = options;

    if (event.type === 'mousedown' && ignoringMouseDown.current) {
      ignoringMouseDown.current = false;
      return;
    }

    if (event.type === 'touchstart') {
      ignoringMouseDown.current = true;
    }

    const element = fakeElement ? null : container.current;
    const rect = element ? element.getBoundingClientRect() : {
      width: 0,
      height: 0,
      left: 0,
      top: 0
    }; // Get the size of the ripple

    let rippleX;
    let rippleY;
    let rippleSize;

    if (center || event.clientX === 0 && event.clientY === 0 || !event.clientX && !event.touches) {
      rippleX = Math.round(rect.width / 2);
      rippleY = Math.round(rect.height / 2);
    } else {
      const {
        clientX,
        clientY
      } = event.touches ? event.touches[0] : event;
      rippleX = Math.round(clientX - rect.left);
      rippleY = Math.round(clientY - rect.top);
    }

    if (center) {
      rippleSize = Math.sqrt((2 * rect.width ** 2 + rect.height ** 2) / 3); // For some reason the animation is broken on Mobile Chrome if the size is even.

      if (rippleSize % 2 === 0) {
        rippleSize += 1;
      }
    } else {
      const sizeX = Math.max(Math.abs((element ? element.clientWidth : 0) - rippleX), rippleX) * 2 + 2;
      const sizeY = Math.max(Math.abs((element ? element.clientHeight : 0) - rippleY), rippleY) * 2 + 2;
      rippleSize = Math.sqrt(sizeX ** 2 + sizeY ** 2);
    } // Touche devices


    if (event.touches) {
      // check that this isn't another touchstart due to multitouch
      // otherwise we will only clear a single timer when unmounting while two
      // are running
      if (startTimerCommit.current === null) {
        // Prepare the ripple effect.
        startTimerCommit.current = () => {
          startCommit({
            pulsate,
            rippleX,
            rippleY,
            rippleSize,
            cb
          });
        }; // Delay the execution of the ripple effect.


        startTimer.current = setTimeout(() => {
          if (startTimerCommit.current) {
            startTimerCommit.current();
            startTimerCommit.current = null;
          }
        }, DELAY_RIPPLE); // We have to make a tradeoff with this value.
      }
    } else {
      startCommit({
        pulsate,
        rippleX,
        rippleY,
        rippleSize,
        cb
      });
    }
  }, [centerProp, startCommit]);
  const pulsate = React.useCallback(() => {
    start({}, {
      pulsate: true
    });
  }, [start]);
  const stop = React.useCallback((event, cb) => {
    clearTimeout(startTimer.current); // The touch interaction occurs too quickly.
    // We still want to show ripple effect.

    if (event.type === 'touchend' && startTimerCommit.current) {
      startTimerCommit.current();
      startTimerCommit.current = null;
      startTimer.current = setTimeout(() => {
        stop(event, cb);
      });
      return;
    }

    startTimerCommit.current = null;
    setRipples(oldRipples => {
      if (oldRipples.length > 0) {
        return oldRipples.slice(1);
      }

      return oldRipples;
    });
    rippleCallback.current = cb;
  }, []);
  React.useImperativeHandle(ref, () => ({
    pulsate,
    start,
    stop
  }), [pulsate, start, stop]);
  return /*#__PURE__*/jsxRuntime.exports.jsx(TouchRippleRoot, _extends$3({
    className: clsx(classes.root, touchRippleClasses$1.root, className),
    ref: container
  }, other, {
    children: /*#__PURE__*/jsxRuntime.exports.jsx(TransitionGroup$1, {
      component: null,
      exit: true,
      children: ripples
    })
  }));
});
process.env.NODE_ENV !== "production" ? TouchRipple.propTypes = {
  /**
   * If `true`, the ripple starts at the center of the component
   * rather than at the point of interaction.
   */
  center: PropTypes.bool,

  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object,

  /**
   * @ignore
   */
  className: PropTypes.string
} : void 0;
var TouchRipple$1 = TouchRipple;

function getButtonBaseUtilityClass(slot) {
  return generateUtilityClass('MuiButtonBase', slot);
}
const buttonBaseClasses = generateUtilityClasses('MuiButtonBase', ['root', 'disabled', 'focusVisible']);
var buttonBaseClasses$1 = buttonBaseClasses;

const _excluded$f = ["action", "centerRipple", "children", "className", "component", "disabled", "disableRipple", "disableTouchRipple", "focusRipple", "focusVisibleClassName", "LinkComponent", "onBlur", "onClick", "onContextMenu", "onDragLeave", "onFocus", "onFocusVisible", "onKeyDown", "onKeyUp", "onMouseDown", "onMouseLeave", "onMouseUp", "onTouchEnd", "onTouchMove", "onTouchStart", "tabIndex", "TouchRippleProps", "touchRippleRef", "type"];

const useUtilityClasses$c = ownerState => {
  const {
    disabled,
    focusVisible,
    focusVisibleClassName,
    classes
  } = ownerState;
  const slots = {
    root: ['root', disabled && 'disabled', focusVisible && 'focusVisible']
  };
  const composedClasses = composeClasses(slots, getButtonBaseUtilityClass, classes);

  if (focusVisible && focusVisibleClassName) {
    composedClasses.root += ` ${focusVisibleClassName}`;
  }

  return composedClasses;
};

const ButtonBaseRoot = styled$1('button', {
  name: 'MuiButtonBase',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root
})({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  boxSizing: 'border-box',
  WebkitTapHighlightColor: 'transparent',
  backgroundColor: 'transparent',
  // Reset default value
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0,
  border: 0,
  margin: 0,
  // Remove the margin in Safari
  borderRadius: 0,
  padding: 0,
  // Remove the padding in Firefox
  cursor: 'pointer',
  userSelect: 'none',
  verticalAlign: 'middle',
  MozAppearance: 'none',
  // Reset
  WebkitAppearance: 'none',
  // Reset
  textDecoration: 'none',
  // So we take precedent over the style of a native <a /> element.
  color: 'inherit',
  '&::-moz-focus-inner': {
    borderStyle: 'none' // Remove Firefox dotted outline.

  },
  [`&.${buttonBaseClasses$1.disabled}`]: {
    pointerEvents: 'none',
    // Disable link interactions
    cursor: 'default'
  },
  '@media print': {
    colorAdjust: 'exact'
  }
});
/**
 * `ButtonBase` contains as few styles as possible.
 * It aims to be a simple building block for creating a button.
 * It contains a load of style reset and some focus/ripple logic.
 */

const ButtonBase = /*#__PURE__*/React.forwardRef(function ButtonBase(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiButtonBase'
  });

  const {
    action,
    centerRipple = false,
    children,
    className,
    component = 'button',
    disabled = false,
    disableRipple = false,
    disableTouchRipple = false,
    focusRipple = false,
    LinkComponent = 'a',
    onBlur,
    onClick,
    onContextMenu,
    onDragLeave,
    onFocus,
    onFocusVisible,
    onKeyDown,
    onKeyUp,
    onMouseDown,
    onMouseLeave,
    onMouseUp,
    onTouchEnd,
    onTouchMove,
    onTouchStart,
    tabIndex = 0,
    TouchRippleProps,
    touchRippleRef,
    type
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded$f);

  const buttonRef = React.useRef(null);
  const rippleRef = React.useRef(null);
  const handleRippleRef = useForkRef(rippleRef, touchRippleRef);
  const {
    isFocusVisibleRef,
    onFocus: handleFocusVisible,
    onBlur: handleBlurVisible,
    ref: focusVisibleRef
  } = useIsFocusVisible();
  const [focusVisible, setFocusVisible] = React.useState(false);

  if (disabled && focusVisible) {
    setFocusVisible(false);
  }

  React.useImperativeHandle(action, () => ({
    focusVisible: () => {
      setFocusVisible(true);
      buttonRef.current.focus();
    }
  }), []);
  const [mountedState, setMountedState] = React.useState(false);
  React.useEffect(() => {
    setMountedState(true);
  }, []);
  const enableTouchRipple = mountedState && !disableRipple && !disabled;
  React.useEffect(() => {
    if (focusVisible && focusRipple && !disableRipple && mountedState) {
      rippleRef.current.pulsate();
    }
  }, [disableRipple, focusRipple, focusVisible, mountedState]);

  function useRippleHandler(rippleAction, eventCallback, skipRippleAction = disableTouchRipple) {
    return useEventCallback(event => {
      if (eventCallback) {
        eventCallback(event);
      }

      const ignore = skipRippleAction;

      if (!ignore && rippleRef.current) {
        rippleRef.current[rippleAction](event);
      }

      return true;
    });
  }

  const handleMouseDown = useRippleHandler('start', onMouseDown);
  const handleContextMenu = useRippleHandler('stop', onContextMenu);
  const handleDragLeave = useRippleHandler('stop', onDragLeave);
  const handleMouseUp = useRippleHandler('stop', onMouseUp);
  const handleMouseLeave = useRippleHandler('stop', event => {
    if (focusVisible) {
      event.preventDefault();
    }

    if (onMouseLeave) {
      onMouseLeave(event);
    }
  });
  const handleTouchStart = useRippleHandler('start', onTouchStart);
  const handleTouchEnd = useRippleHandler('stop', onTouchEnd);
  const handleTouchMove = useRippleHandler('stop', onTouchMove);
  const handleBlur = useRippleHandler('stop', event => {
    handleBlurVisible(event);

    if (isFocusVisibleRef.current === false) {
      setFocusVisible(false);
    }

    if (onBlur) {
      onBlur(event);
    }
  }, false);
  const handleFocus = useEventCallback(event => {
    // Fix for https://github.com/facebook/react/issues/7769
    if (!buttonRef.current) {
      buttonRef.current = event.currentTarget;
    }

    handleFocusVisible(event);

    if (isFocusVisibleRef.current === true) {
      setFocusVisible(true);

      if (onFocusVisible) {
        onFocusVisible(event);
      }
    }

    if (onFocus) {
      onFocus(event);
    }
  });

  const isNonNativeButton = () => {
    const button = buttonRef.current;
    return component && component !== 'button' && !(button.tagName === 'A' && button.href);
  };
  /**
   * IE11 shim for https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/repeat
   */


  const keydownRef = React.useRef(false);
  const handleKeyDown = useEventCallback(event => {
    // Check if key is already down to avoid repeats being counted as multiple activations
    if (focusRipple && !keydownRef.current && focusVisible && rippleRef.current && event.key === ' ') {
      keydownRef.current = true;
      rippleRef.current.stop(event, () => {
        rippleRef.current.start(event);
      });
    }

    if (event.target === event.currentTarget && isNonNativeButton() && event.key === ' ') {
      event.preventDefault();
    }

    if (onKeyDown) {
      onKeyDown(event);
    } // Keyboard accessibility for non interactive elements


    if (event.target === event.currentTarget && isNonNativeButton() && event.key === 'Enter' && !disabled) {
      event.preventDefault();

      if (onClick) {
        onClick(event);
      }
    }
  });
  const handleKeyUp = useEventCallback(event => {
    // calling preventDefault in keyUp on a <button> will not dispatch a click event if Space is pressed
    // https://codesandbox.io/s/button-keyup-preventdefault-dn7f0
    if (focusRipple && event.key === ' ' && rippleRef.current && focusVisible && !event.defaultPrevented) {
      keydownRef.current = false;
      rippleRef.current.stop(event, () => {
        rippleRef.current.pulsate(event);
      });
    }

    if (onKeyUp) {
      onKeyUp(event);
    } // Keyboard accessibility for non interactive elements


    if (onClick && event.target === event.currentTarget && isNonNativeButton() && event.key === ' ' && !event.defaultPrevented) {
      onClick(event);
    }
  });
  let ComponentProp = component;

  if (ComponentProp === 'button' && (other.href || other.to)) {
    ComponentProp = LinkComponent;
  }

  const buttonProps = {};

  if (ComponentProp === 'button') {
    buttonProps.type = type === undefined ? 'button' : type;
    buttonProps.disabled = disabled;
  } else {
    if (!other.href && !other.to) {
      buttonProps.role = 'button';
    }

    if (disabled) {
      buttonProps['aria-disabled'] = disabled;
    }
  }

  const handleOwnRef = useForkRef(focusVisibleRef, buttonRef);
  const handleRef = useForkRef(ref, handleOwnRef);

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      if (enableTouchRipple && !rippleRef.current) {
        console.error(['MUI: The `component` prop provided to ButtonBase is invalid.', 'Please make sure the children prop is rendered in this custom component.'].join('\n'));
      }
    }, [enableTouchRipple]);
  }

  const ownerState = _extends$3({}, props, {
    centerRipple,
    component,
    disabled,
    disableRipple,
    disableTouchRipple,
    focusRipple,
    tabIndex,
    focusVisible
  });

  const classes = useUtilityClasses$c(ownerState);
  return /*#__PURE__*/jsxRuntime.exports.jsxs(ButtonBaseRoot, _extends$3({
    as: ComponentProp,
    className: clsx(classes.root, className),
    ownerState: ownerState,
    onBlur: handleBlur,
    onClick: onClick,
    onContextMenu: handleContextMenu,
    onFocus: handleFocus,
    onKeyDown: handleKeyDown,
    onKeyUp: handleKeyUp,
    onMouseDown: handleMouseDown,
    onMouseLeave: handleMouseLeave,
    onMouseUp: handleMouseUp,
    onDragLeave: handleDragLeave,
    onTouchEnd: handleTouchEnd,
    onTouchMove: handleTouchMove,
    onTouchStart: handleTouchStart,
    ref: handleRef,
    tabIndex: disabled ? -1 : tabIndex,
    type: type
  }, buttonProps, other, {
    children: [children, enableTouchRipple ?
    /*#__PURE__*/

    /* TouchRipple is only needed client-side, x2 boost on the server. */
    jsxRuntime.exports.jsx(TouchRipple$1, _extends$3({
      ref: handleRippleRef,
      center: centerRipple
    }, TouchRippleProps)) : null]
  }));
});
process.env.NODE_ENV !== "production" ? ButtonBase.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * A ref for imperative actions.
   * It currently only supports `focusVisible()` action.
   */
  action: refType$1,

  /**
   * If `true`, the ripples are centered.
   * They won't start at the cursor interaction position.
   * @default false
   */
  centerRipple: PropTypes.bool,

  /**
   * The content of the component.
   */
  children: PropTypes.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: elementTypeAcceptingRef$1,

  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,

  /**
   * If `true`, the ripple effect is disabled.
   *
   * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
   * to highlight the element by applying separate styles with the `.Mui-focusVisible` class.
   * @default false
   */
  disableRipple: PropTypes.bool,

  /**
   * If `true`, the touch ripple effect is disabled.
   * @default false
   */
  disableTouchRipple: PropTypes.bool,

  /**
   * If `true`, the base button will have a keyboard focus ripple.
   * @default false
   */
  focusRipple: PropTypes.bool,

  /**
   * This prop can help identify which element has keyboard focus.
   * The class name will be applied when the element gains the focus through keyboard interaction.
   * It's a polyfill for the [CSS :focus-visible selector](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo).
   * The rationale for using this feature [is explained here](https://github.com/WICG/focus-visible/blob/HEAD/explainer.md).
   * A [polyfill can be used](https://github.com/WICG/focus-visible) to apply a `focus-visible` class to other components
   * if needed.
   */
  focusVisibleClassName: PropTypes.string,

  /**
   * @ignore
   */
  href: PropTypes
  /* @typescript-to-proptypes-ignore */
  .any,

  /**
   * The component used to render a link when the `href` prop is provided.
   * @default 'a'
   */
  LinkComponent: PropTypes.elementType,

  /**
   * @ignore
   */
  onBlur: PropTypes.func,

  /**
   * @ignore
   */
  onClick: PropTypes.func,

  /**
   * @ignore
   */
  onContextMenu: PropTypes.func,

  /**
   * @ignore
   */
  onDragLeave: PropTypes.func,

  /**
   * @ignore
   */
  onFocus: PropTypes.func,

  /**
   * Callback fired when the component is focused with a keyboard.
   * We trigger a `onFocus` callback too.
   */
  onFocusVisible: PropTypes.func,

  /**
   * @ignore
   */
  onKeyDown: PropTypes.func,

  /**
   * @ignore
   */
  onKeyUp: PropTypes.func,

  /**
   * @ignore
   */
  onMouseDown: PropTypes.func,

  /**
   * @ignore
   */
  onMouseLeave: PropTypes.func,

  /**
   * @ignore
   */
  onMouseUp: PropTypes.func,

  /**
   * @ignore
   */
  onTouchEnd: PropTypes.func,

  /**
   * @ignore
   */
  onTouchMove: PropTypes.func,

  /**
   * @ignore
   */
  onTouchStart: PropTypes.func,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),

  /**
   * @default 0
   */
  tabIndex: PropTypes.number,

  /**
   * Props applied to the `TouchRipple` element.
   */
  TouchRippleProps: PropTypes.object,

  /**
   * A ref that points to the `TouchRipple` element.
   */
  touchRippleRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({
    current: PropTypes.shape({
      pulsate: PropTypes.func.isRequired,
      start: PropTypes.func.isRequired,
      stop: PropTypes.func.isRequired
    })
  })]),

  /**
   * @ignore
   */
  type: PropTypes.oneOfType([PropTypes.oneOf(['button', 'reset', 'submit']), PropTypes.string])
} : void 0;
var ButtonBase$1 = ButtonBase;

function getButtonUtilityClass(slot) {
  return generateUtilityClass('MuiButton', slot);
}
const buttonClasses = generateUtilityClasses('MuiButton', ['root', 'text', 'textInherit', 'textPrimary', 'textSecondary', 'outlined', 'outlinedInherit', 'outlinedPrimary', 'outlinedSecondary', 'contained', 'containedInherit', 'containedPrimary', 'containedSecondary', 'disableElevation', 'focusVisible', 'disabled', 'colorInherit', 'textSizeSmall', 'textSizeMedium', 'textSizeLarge', 'outlinedSizeSmall', 'outlinedSizeMedium', 'outlinedSizeLarge', 'containedSizeSmall', 'containedSizeMedium', 'containedSizeLarge', 'sizeMedium', 'sizeSmall', 'sizeLarge', 'fullWidth', 'startIcon', 'endIcon', 'iconSizeSmall', 'iconSizeMedium', 'iconSizeLarge']);
var buttonClasses$1 = buttonClasses;

/**
 * @ignore - internal component.
 */
const ButtonGroupContext = /*#__PURE__*/React.createContext({});

if (process.env.NODE_ENV !== 'production') {
  ButtonGroupContext.displayName = 'ButtonGroupContext';
}

var ButtonGroupContext$1 = ButtonGroupContext;

const _excluded$e = ["children", "color", "component", "className", "disabled", "disableElevation", "disableFocusRipple", "endIcon", "focusVisibleClassName", "fullWidth", "size", "startIcon", "type", "variant"];

const useUtilityClasses$b = ownerState => {
  const {
    color,
    disableElevation,
    fullWidth,
    size,
    variant,
    classes
  } = ownerState;
  const slots = {
    root: ['root', variant, `${variant}${capitalize(color)}`, `size${capitalize(size)}`, `${variant}Size${capitalize(size)}`, color === 'inherit' && 'colorInherit', disableElevation && 'disableElevation', fullWidth && 'fullWidth'],
    label: ['label'],
    startIcon: ['startIcon', `iconSize${capitalize(size)}`],
    endIcon: ['endIcon', `iconSize${capitalize(size)}`]
  };
  const composedClasses = composeClasses(slots, getButtonUtilityClass, classes);
  return _extends$3({}, classes, composedClasses);
};

const commonIconStyles = ownerState => _extends$3({}, ownerState.size === 'small' && {
  '& > *:nth-of-type(1)': {
    fontSize: 18
  }
}, ownerState.size === 'medium' && {
  '& > *:nth-of-type(1)': {
    fontSize: 20
  }
}, ownerState.size === 'large' && {
  '& > *:nth-of-type(1)': {
    fontSize: 22
  }
});

const ButtonRoot = styled$1(ButtonBase$1, {
  shouldForwardProp: prop => rootShouldForwardProp(prop) || prop === 'classes',
  name: 'MuiButton',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, styles[ownerState.variant], styles[`${ownerState.variant}${capitalize(ownerState.color)}`], styles[`size${capitalize(ownerState.size)}`], styles[`${ownerState.variant}Size${capitalize(ownerState.size)}`], ownerState.color === 'inherit' && styles.colorInherit, ownerState.disableElevation && styles.disableElevation, ownerState.fullWidth && styles.fullWidth];
  }
})(({
  theme,
  ownerState
}) => _extends$3({}, theme.typography.button, {
  minWidth: 64,
  padding: '6px 16px',
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create(['background-color', 'box-shadow', 'border-color', 'color'], {
    duration: theme.transitions.duration.short
  }),
  '&:hover': _extends$3({
    textDecoration: 'none',
    backgroundColor: alpha(theme.palette.text.primary, theme.palette.action.hoverOpacity),
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      backgroundColor: 'transparent'
    }
  }, ownerState.variant === 'text' && ownerState.color !== 'inherit' && {
    backgroundColor: alpha(theme.palette[ownerState.color].main, theme.palette.action.hoverOpacity),
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      backgroundColor: 'transparent'
    }
  }, ownerState.variant === 'outlined' && ownerState.color !== 'inherit' && {
    border: `1px solid ${theme.palette[ownerState.color].main}`,
    backgroundColor: alpha(theme.palette[ownerState.color].main, theme.palette.action.hoverOpacity),
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      backgroundColor: 'transparent'
    }
  }, ownerState.variant === 'contained' && {
    backgroundColor: theme.palette.grey.A100,
    boxShadow: theme.shadows[4],
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      boxShadow: theme.shadows[2],
      backgroundColor: theme.palette.grey[300]
    }
  }, ownerState.variant === 'contained' && ownerState.color !== 'inherit' && {
    backgroundColor: theme.palette[ownerState.color].dark,
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      backgroundColor: theme.palette[ownerState.color].main
    }
  }),
  '&:active': _extends$3({}, ownerState.variant === 'contained' && {
    boxShadow: theme.shadows[8]
  }),
  [`&.${buttonClasses$1.focusVisible}`]: _extends$3({}, ownerState.variant === 'contained' && {
    boxShadow: theme.shadows[6]
  }),
  [`&.${buttonClasses$1.disabled}`]: _extends$3({
    color: theme.palette.action.disabled
  }, ownerState.variant === 'outlined' && {
    border: `1px solid ${theme.palette.action.disabledBackground}`
  }, ownerState.variant === 'outlined' && ownerState.color === 'secondary' && {
    border: `1px solid ${theme.palette.action.disabled}`
  }, ownerState.variant === 'contained' && {
    color: theme.palette.action.disabled,
    boxShadow: theme.shadows[0],
    backgroundColor: theme.palette.action.disabledBackground
  })
}, ownerState.variant === 'text' && {
  padding: '6px 8px'
}, ownerState.variant === 'text' && ownerState.color !== 'inherit' && {
  color: theme.palette[ownerState.color].main
}, ownerState.variant === 'outlined' && {
  padding: '5px 15px',
  border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)'}`
}, ownerState.variant === 'outlined' && ownerState.color !== 'inherit' && {
  color: theme.palette[ownerState.color].main,
  border: `1px solid ${alpha(theme.palette[ownerState.color].main, 0.5)}`
}, ownerState.variant === 'contained' && {
  color: theme.palette.getContrastText(theme.palette.grey[300]),
  backgroundColor: theme.palette.grey[300],
  boxShadow: theme.shadows[2]
}, ownerState.variant === 'contained' && ownerState.color !== 'inherit' && {
  color: theme.palette[ownerState.color].contrastText,
  backgroundColor: theme.palette[ownerState.color].main
}, ownerState.color === 'inherit' && {
  color: 'inherit',
  borderColor: 'currentColor'
}, ownerState.size === 'small' && ownerState.variant === 'text' && {
  padding: '4px 5px',
  fontSize: theme.typography.pxToRem(13)
}, ownerState.size === 'large' && ownerState.variant === 'text' && {
  padding: '8px 11px',
  fontSize: theme.typography.pxToRem(15)
}, ownerState.size === 'small' && ownerState.variant === 'outlined' && {
  padding: '3px 9px',
  fontSize: theme.typography.pxToRem(13)
}, ownerState.size === 'large' && ownerState.variant === 'outlined' && {
  padding: '7px 21px',
  fontSize: theme.typography.pxToRem(15)
}, ownerState.size === 'small' && ownerState.variant === 'contained' && {
  padding: '4px 10px',
  fontSize: theme.typography.pxToRem(13)
}, ownerState.size === 'large' && ownerState.variant === 'contained' && {
  padding: '8px 22px',
  fontSize: theme.typography.pxToRem(15)
}, ownerState.fullWidth && {
  width: '100%'
}), ({
  ownerState
}) => ownerState.disableElevation && {
  boxShadow: 'none',
  '&:hover': {
    boxShadow: 'none'
  },
  [`&.${buttonClasses$1.focusVisible}`]: {
    boxShadow: 'none'
  },
  '&:active': {
    boxShadow: 'none'
  },
  [`&.${buttonClasses$1.disabled}`]: {
    boxShadow: 'none'
  }
});
const ButtonStartIcon = styled$1('span', {
  name: 'MuiButton',
  slot: 'StartIcon',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.startIcon, styles[`iconSize${capitalize(ownerState.size)}`]];
  }
})(({
  ownerState
}) => _extends$3({
  display: 'inherit',
  marginRight: 8,
  marginLeft: -4
}, ownerState.size === 'small' && {
  marginLeft: -2
}, commonIconStyles(ownerState)));
const ButtonEndIcon = styled$1('span', {
  name: 'MuiButton',
  slot: 'EndIcon',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.endIcon, styles[`iconSize${capitalize(ownerState.size)}`]];
  }
})(({
  ownerState
}) => _extends$3({
  display: 'inherit',
  marginRight: -4,
  marginLeft: 8
}, ownerState.size === 'small' && {
  marginRight: -2
}, commonIconStyles(ownerState)));
const Button = /*#__PURE__*/React.forwardRef(function Button(inProps, ref) {
  // props priority: `inProps` > `contextProps` > `themeDefaultProps`
  const contextProps = React.useContext(ButtonGroupContext$1);
  const resolvedProps = resolveProps(contextProps, inProps);
  const props = useThemeProps({
    props: resolvedProps,
    name: 'MuiButton'
  });

  const {
    children,
    color = 'primary',
    component = 'button',
    className,
    disabled = false,
    disableElevation = false,
    disableFocusRipple = false,
    endIcon: endIconProp,
    focusVisibleClassName,
    fullWidth = false,
    size = 'medium',
    startIcon: startIconProp,
    type,
    variant = 'text'
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded$e);

  const ownerState = _extends$3({}, props, {
    color,
    component,
    disabled,
    disableElevation,
    disableFocusRipple,
    fullWidth,
    size,
    type,
    variant
  });

  const classes = useUtilityClasses$b(ownerState);

  const startIcon = startIconProp && /*#__PURE__*/jsxRuntime.exports.jsx(ButtonStartIcon, {
    className: classes.startIcon,
    ownerState: ownerState,
    children: startIconProp
  });

  const endIcon = endIconProp && /*#__PURE__*/jsxRuntime.exports.jsx(ButtonEndIcon, {
    className: classes.endIcon,
    ownerState: ownerState,
    children: endIconProp
  });

  return /*#__PURE__*/jsxRuntime.exports.jsxs(ButtonRoot, _extends$3({
    ownerState: ownerState,
    className: clsx(className, contextProps.className),
    component: component,
    disabled: disabled,
    focusRipple: !disableFocusRipple,
    focusVisibleClassName: clsx(classes.focusVisible, focusVisibleClassName),
    ref: ref,
    type: type
  }, other, {
    classes: classes,
    children: [startIcon, children, endIcon]
  }));
});
process.env.NODE_ENV !== "production" ? Button.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The content of the component.
   */
  children: PropTypes.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/customization/palette/#adding-new-colors).
   * @default 'primary'
   */
  color: PropTypes
  /* @typescript-to-proptypes-ignore */
  .oneOfType([PropTypes.oneOf(['inherit', 'primary', 'secondary', 'success', 'error', 'info', 'warning']), PropTypes.string]),

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,

  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,

  /**
   * If `true`, no elevation is used.
   * @default false
   */
  disableElevation: PropTypes.bool,

  /**
   * If `true`, the  keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple: PropTypes.bool,

  /**
   * If `true`, the ripple effect is disabled.
   *
   * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
   * to highlight the element by applying separate styles with the `.Mui-focusVisible` class.
   * @default false
   */
  disableRipple: PropTypes.bool,

  /**
   * Element placed after the children.
   */
  endIcon: PropTypes.node,

  /**
   * @ignore
   */
  focusVisibleClassName: PropTypes.string,

  /**
   * If `true`, the button will take up the full width of its container.
   * @default false
   */
  fullWidth: PropTypes.bool,

  /**
   * The URL to link to when the button is clicked.
   * If defined, an `a` element will be used as the root node.
   */
  href: PropTypes.string,

  /**
   * The size of the component.
   * `small` is equivalent to the dense button styling.
   * @default 'medium'
   */
  size: PropTypes
  /* @typescript-to-proptypes-ignore */
  .oneOfType([PropTypes.oneOf(['small', 'medium', 'large']), PropTypes.string]),

  /**
   * Element placed before the children.
   */
  startIcon: PropTypes.node,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),

  /**
   * @ignore
   */
  type: PropTypes.oneOfType([PropTypes.oneOf(['button', 'reset', 'submit']), PropTypes.string]),

  /**
   * The variant to use.
   * @default 'text'
   */
  variant: PropTypes
  /* @typescript-to-proptypes-ignore */
  .oneOfType([PropTypes.oneOf(['contained', 'outlined', 'text']), PropTypes.string])
} : void 0;
var Button$1 = Button;

/**
 * Renders a button that will create a PDF version of the current map view (dimensions adjusted to fit Din A4 Paper).
 */
var MlCreatePdfButton = function (props) {
    var mapHook = useMap({
        mapId: props.mapId,
        waitForLayer: props.insertBeforeLayer,
    });
    return (React__default.createElement(React__default.Fragment, null,
        React__default.createElement(Button$1, { color: "primary", variant: "contained", onClick: function () {
                if (mapHook.map) {
                    createPdf(mapHook.map, null, function () { });
                }
            } },
            React__default.createElement(default_1$5, null))));
};
MlCreatePdfButton.defaultProps = {
    mapId: undefined,
};

/**
 * Code from https://github.com/mapbox/mapbox-gl-draw
 * and licensed under ISC
 */
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
var types$1 = {
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
var LAT_MIN$1 = -90;
var LAT_RENDERED_MIN$1 = -85;
var LAT_MAX$1 = 90;
var LAT_RENDERED_MAX$1 = 85;
var LNG_MIN$1 = -270;
var LNG_MAX$1 = 270;

/**
 * Code from https://github.com/mapbox/mapbox-gl-draw
 * and licensed under ISC
 */
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
function isVertex$1(e) {
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

/**
 * Code from https://github.com/mapbox/mapbox-gl-draw
 * and licensed under ISC
 */
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

/**
 * Code from https://github.com/mapbox/mapbox-gl-draw
 * and licensed under ISC
 */
function isEventAtCoordinates(event, coordinates) {
  if (!event.lngLat) return false;
  return event.lngLat.lng === coordinates[0] && event.lngLat.lat === coordinates[1];
}

/**
 * Code from https://github.com/mapbox/mapbox-gl-draw
 * and licensed under ISC
 */
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

/**
 * Code from https://github.com/mapbox/mapbox-gl-draw
 * and licensed under ISC
 */
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
  this.activateUIButton(types$1.POLYGON);
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

var pointGeometry = Point;

/**
 * A standalone point geometry with useful accessor, comparison, and
 * modification methods.
 *
 * @class Point
 * @param {Number} x the x-coordinate. this could be longitude or screen
 * pixels, or any other sort of unit.
 * @param {Number} y the y-coordinate. this could be latitude or screen
 * pixels, or any other sort of unit.
 * @example
 * var point = new Point(-77, 38);
 */
function Point(x, y) {
    this.x = x;
    this.y = y;
}

Point.prototype = {

    /**
     * Clone this point, returning a new point that can be modified
     * without affecting the old one.
     * @return {Point} the clone
     */
    clone: function() { return new Point(this.x, this.y); },

    /**
     * Add this point's x & y coordinates to another point,
     * yielding a new point.
     * @param {Point} p the other point
     * @return {Point} output point
     */
    add:     function(p) { return this.clone()._add(p); },

    /**
     * Subtract this point's x & y coordinates to from point,
     * yielding a new point.
     * @param {Point} p the other point
     * @return {Point} output point
     */
    sub:     function(p) { return this.clone()._sub(p); },

    /**
     * Multiply this point's x & y coordinates by point,
     * yielding a new point.
     * @param {Point} p the other point
     * @return {Point} output point
     */
    multByPoint:    function(p) { return this.clone()._multByPoint(p); },

    /**
     * Divide this point's x & y coordinates by point,
     * yielding a new point.
     * @param {Point} p the other point
     * @return {Point} output point
     */
    divByPoint:     function(p) { return this.clone()._divByPoint(p); },

    /**
     * Multiply this point's x & y coordinates by a factor,
     * yielding a new point.
     * @param {Point} k factor
     * @return {Point} output point
     */
    mult:    function(k) { return this.clone()._mult(k); },

    /**
     * Divide this point's x & y coordinates by a factor,
     * yielding a new point.
     * @param {Point} k factor
     * @return {Point} output point
     */
    div:     function(k) { return this.clone()._div(k); },

    /**
     * Rotate this point around the 0, 0 origin by an angle a,
     * given in radians
     * @param {Number} a angle to rotate around, in radians
     * @return {Point} output point
     */
    rotate:  function(a) { return this.clone()._rotate(a); },

    /**
     * Rotate this point around p point by an angle a,
     * given in radians
     * @param {Number} a angle to rotate around, in radians
     * @param {Point} p Point to rotate around
     * @return {Point} output point
     */
    rotateAround:  function(a,p) { return this.clone()._rotateAround(a,p); },

    /**
     * Multiply this point by a 4x1 transformation matrix
     * @param {Array<Number>} m transformation matrix
     * @return {Point} output point
     */
    matMult: function(m) { return this.clone()._matMult(m); },

    /**
     * Calculate this point but as a unit vector from 0, 0, meaning
     * that the distance from the resulting point to the 0, 0
     * coordinate will be equal to 1 and the angle from the resulting
     * point to the 0, 0 coordinate will be the same as before.
     * @return {Point} unit vector point
     */
    unit:    function() { return this.clone()._unit(); },

    /**
     * Compute a perpendicular point, where the new y coordinate
     * is the old x coordinate and the new x coordinate is the old y
     * coordinate multiplied by -1
     * @return {Point} perpendicular point
     */
    perp:    function() { return this.clone()._perp(); },

    /**
     * Return a version of this point with the x & y coordinates
     * rounded to integers.
     * @return {Point} rounded point
     */
    round:   function() { return this.clone()._round(); },

    /**
     * Return the magitude of this point: this is the Euclidean
     * distance from the 0, 0 coordinate to this point's x and y
     * coordinates.
     * @return {Number} magnitude
     */
    mag: function() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    },

    /**
     * Judge whether this point is equal to another point, returning
     * true or false.
     * @param {Point} other the other point
     * @return {boolean} whether the points are equal
     */
    equals: function(other) {
        return this.x === other.x &&
               this.y === other.y;
    },

    /**
     * Calculate the distance from this point to another point
     * @param {Point} p the other point
     * @return {Number} distance
     */
    dist: function(p) {
        return Math.sqrt(this.distSqr(p));
    },

    /**
     * Calculate the distance from this point to another point,
     * without the square root step. Useful if you're comparing
     * relative distances.
     * @param {Point} p the other point
     * @return {Number} distance
     */
    distSqr: function(p) {
        var dx = p.x - this.x,
            dy = p.y - this.y;
        return dx * dx + dy * dy;
    },

    /**
     * Get the angle from the 0, 0 coordinate to this point, in radians
     * coordinates.
     * @return {Number} angle
     */
    angle: function() {
        return Math.atan2(this.y, this.x);
    },

    /**
     * Get the angle from this point to another point, in radians
     * @param {Point} b the other point
     * @return {Number} angle
     */
    angleTo: function(b) {
        return Math.atan2(this.y - b.y, this.x - b.x);
    },

    /**
     * Get the angle between this point and another point, in radians
     * @param {Point} b the other point
     * @return {Number} angle
     */
    angleWith: function(b) {
        return this.angleWithSep(b.x, b.y);
    },

    /*
     * Find the angle of the two vectors, solving the formula for
     * the cross product a x b = |a||b|sin(θ) for θ.
     * @param {Number} x the x-coordinate
     * @param {Number} y the y-coordinate
     * @return {Number} the angle in radians
     */
    angleWithSep: function(x, y) {
        return Math.atan2(
            this.x * y - this.y * x,
            this.x * x + this.y * y);
    },

    _matMult: function(m) {
        var x = m[0] * this.x + m[1] * this.y,
            y = m[2] * this.x + m[3] * this.y;
        this.x = x;
        this.y = y;
        return this;
    },

    _add: function(p) {
        this.x += p.x;
        this.y += p.y;
        return this;
    },

    _sub: function(p) {
        this.x -= p.x;
        this.y -= p.y;
        return this;
    },

    _mult: function(k) {
        this.x *= k;
        this.y *= k;
        return this;
    },

    _div: function(k) {
        this.x /= k;
        this.y /= k;
        return this;
    },

    _multByPoint: function(p) {
        this.x *= p.x;
        this.y *= p.y;
        return this;
    },

    _divByPoint: function(p) {
        this.x /= p.x;
        this.y /= p.y;
        return this;
    },

    _unit: function() {
        this._div(this.mag());
        return this;
    },

    _perp: function() {
        var y = this.y;
        this.y = this.x;
        this.x = -y;
        return this;
    },

    _rotate: function(angle) {
        var cos = Math.cos(angle),
            sin = Math.sin(angle),
            x = cos * this.x - sin * this.y,
            y = sin * this.x + cos * this.y;
        this.x = x;
        this.y = y;
        return this;
    },

    _rotateAround: function(angle, p) {
        var cos = Math.cos(angle),
            sin = Math.sin(angle),
            x = p.x + cos * (this.x - p.x) - sin * (this.y - p.y),
            y = p.y + sin * (this.x - p.x) + cos * (this.y - p.y);
        this.x = x;
        this.y = y;
        return this;
    },

    _round: function() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this;
    }
};

/**
 * Construct a point from an array if necessary, otherwise if the input
 * is already a Point, or an unknown type, return it unchanged
 * @param {Array<Number>|Point|*} a any kind of input value
 * @return {Point} constructed point, or passed-through value.
 * @example
 * // this
 * var point = Point.convert([0, 1]);
 * // is equivalent to
 * var point = new Point(0, 1);
 */
Point.convert = function (a) {
    if (a instanceof Point) {
        return a;
    }
    if (Array.isArray(a)) {
        return new Point(a[0], a[1]);
    }
    return a;
};

/**
 * Code from https://github.com/mapbox/mapbox-gl-draw
 * and licensed under ISC
 */
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
  return new pointGeometry(mouseEvent.clientX - rect.left - (container.clientLeft || 0), mouseEvent.clientY - rect.top - (container.clientTop || 0));
}

/**
 * Code from https://github.com/mapbox/mapbox-gl-draw
 * and licensed under ISC
 */

var create_midpoint = function create_midpoint(parent, startVertex, endVertex) {
  var startCoord = startVertex.geometry.coordinates;
  var endCoord = endVertex.geometry.coordinates; // If a coordinate exceeds the projection, we can't calculate a midpoint,
  // so run away

  if (startCoord[1] > LAT_RENDERED_MAX$1 || startCoord[1] < LAT_RENDERED_MIN$1 || endCoord[1] > LAT_RENDERED_MAX$1 || endCoord[1] < LAT_RENDERED_MIN$1) {
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

/**
 * Code from https://github.com/mapbox/mapbox-gl-draw
 * and licensed under ISC
 */

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

/**
 * Code from https://github.com/mapbox/mapbox-gl-draw
 * and licensed under ISC
 */
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

StringSet.prototype["delete"] = function (x) {
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

var geojsonExtent = {exports: {}};

var geojsonNormalize$1 = normalize;

var types = {
    Point: 'geometry',
    MultiPoint: 'geometry',
    LineString: 'geometry',
    MultiLineString: 'geometry',
    Polygon: 'geometry',
    MultiPolygon: 'geometry',
    GeometryCollection: 'geometry',
    Feature: 'feature',
    FeatureCollection: 'featurecollection'
};

/**
 * Normalize a GeoJSON feature into a FeatureCollection.
 *
 * @param {object} gj geojson data
 * @returns {object} normalized geojson data
 */
function normalize(gj) {
    if (!gj || !gj.type) return null;
    var type = types[gj.type];
    if (!type) return null;

    if (type === 'geometry') {
        return {
            type: 'FeatureCollection',
            features: [{
                type: 'Feature',
                properties: {},
                geometry: gj
            }]
        };
    } else if (type === 'feature') {
        return {
            type: 'FeatureCollection',
            features: [gj]
        };
    } else if (type === 'featurecollection') {
        return gj;
    }
}

function e(t){switch(t&&t.type||null){case"FeatureCollection":return t.features=t.features.reduce(function(t,r){return t.concat(e(r))},[]),t;case"Feature":return t.geometry?e(t.geometry).map(function(e){var r={type:"Feature",properties:JSON.parse(JSON.stringify(t.properties)),geometry:e};return void 0!==t.id&&(r.id=t.id),r}):[t];case"MultiPoint":return t.coordinates.map(function(e){return {type:"Point",coordinates:e}});case"MultiPolygon":return t.coordinates.map(function(e){return {type:"Polygon",coordinates:e}});case"MultiLineString":return t.coordinates.map(function(e){return {type:"LineString",coordinates:e}});case"GeometryCollection":return t.geometries.map(e).reduce(function(e,t){return e.concat(t)},[]);case"Point":case"Polygon":case"LineString":return [t]}}

var index_es = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': e
});

var require$$1 = /*@__PURE__*/getAugmentedNamespace(index_es);

var flatten$1 = function flatten(list) {
    return _flatten(list);

    function _flatten(list) {
        if (Array.isArray(list) && list.length &&
            typeof list[0] === 'number') {
            return [list];
        }
        return list.reduce(function (acc, item) {
            if (Array.isArray(item) && Array.isArray(item[0])) {
                return acc.concat(_flatten(item));
            } else {
                acc.push(item);
                return acc;
            }
        }, []);
    }
};

var geojsonNormalize = geojsonNormalize$1,
    geojsonFlatten = require$$1,
    flatten = flatten$1;

if (!(geojsonFlatten instanceof Function)) geojsonFlatten = geojsonFlatten.default;

var geojsonCoords$1 = function(_) {
    if (!_) return [];
    var normalized = geojsonFlatten(geojsonNormalize(_)),
        coordinates = [];
    normalized.features.forEach(function(feature) {
        if (!feature.geometry) return;
        coordinates = coordinates.concat(flatten(feature.geometry.coordinates));
    });
    return coordinates;
};

var traverse$2 = {exports: {}};

var traverse$1 = traverse$2.exports = function (obj) {
    return new Traverse(obj);
};

function Traverse (obj) {
    this.value = obj;
}

Traverse.prototype.get = function (ps) {
    var node = this.value;
    for (var i = 0; i < ps.length; i ++) {
        var key = ps[i];
        if (!node || !hasOwnProperty.call(node, key)) {
            node = undefined;
            break;
        }
        node = node[key];
    }
    return node;
};

Traverse.prototype.has = function (ps) {
    var node = this.value;
    for (var i = 0; i < ps.length; i ++) {
        var key = ps[i];
        if (!node || !hasOwnProperty.call(node, key)) {
            return false;
        }
        node = node[key];
    }
    return true;
};

Traverse.prototype.set = function (ps, value) {
    var node = this.value;
    for (var i = 0; i < ps.length - 1; i ++) {
        var key = ps[i];
        if (!hasOwnProperty.call(node, key)) node[key] = {};
        node = node[key];
    }
    node[ps[i]] = value;
    return value;
};

Traverse.prototype.map = function (cb) {
    return walk(this.value, cb, true);
};

Traverse.prototype.forEach = function (cb) {
    this.value = walk(this.value, cb, false);
    return this.value;
};

Traverse.prototype.reduce = function (cb, init) {
    var skip = arguments.length === 1;
    var acc = skip ? this.value : init;
    this.forEach(function (x) {
        if (!this.isRoot || !skip) {
            acc = cb.call(this, acc, x);
        }
    });
    return acc;
};

Traverse.prototype.paths = function () {
    var acc = [];
    this.forEach(function (x) {
        acc.push(this.path); 
    });
    return acc;
};

Traverse.prototype.nodes = function () {
    var acc = [];
    this.forEach(function (x) {
        acc.push(this.node);
    });
    return acc;
};

Traverse.prototype.clone = function () {
    var parents = [], nodes = [];
    
    return (function clone (src) {
        for (var i = 0; i < parents.length; i++) {
            if (parents[i] === src) {
                return nodes[i];
            }
        }
        
        if (typeof src === 'object' && src !== null) {
            var dst = copy(src);
            
            parents.push(src);
            nodes.push(dst);
            
            forEach(objectKeys(src), function (key) {
                dst[key] = clone(src[key]);
            });
            
            parents.pop();
            nodes.pop();
            return dst;
        }
        else {
            return src;
        }
    })(this.value);
};

function walk (root, cb, immutable) {
    var path = [];
    var parents = [];
    var alive = true;
    
    return (function walker (node_) {
        var node = immutable ? copy(node_) : node_;
        var modifiers = {};
        
        var keepGoing = true;
        
        var state = {
            node : node,
            node_ : node_,
            path : [].concat(path),
            parent : parents[parents.length - 1],
            parents : parents,
            key : path.slice(-1)[0],
            isRoot : path.length === 0,
            level : path.length,
            circular : null,
            update : function (x, stopHere) {
                if (!state.isRoot) {
                    state.parent.node[state.key] = x;
                }
                state.node = x;
                if (stopHere) keepGoing = false;
            },
            'delete' : function (stopHere) {
                delete state.parent.node[state.key];
                if (stopHere) keepGoing = false;
            },
            remove : function (stopHere) {
                if (isArray(state.parent.node)) {
                    state.parent.node.splice(state.key, 1);
                }
                else {
                    delete state.parent.node[state.key];
                }
                if (stopHere) keepGoing = false;
            },
            keys : null,
            before : function (f) { modifiers.before = f; },
            after : function (f) { modifiers.after = f; },
            pre : function (f) { modifiers.pre = f; },
            post : function (f) { modifiers.post = f; },
            stop : function () { alive = false; },
            block : function () { keepGoing = false; }
        };
        
        if (!alive) return state;
        
        function updateState() {
            if (typeof state.node === 'object' && state.node !== null) {
                if (!state.keys || state.node_ !== state.node) {
                    state.keys = objectKeys(state.node);
                }
                
                state.isLeaf = state.keys.length == 0;
                
                for (var i = 0; i < parents.length; i++) {
                    if (parents[i].node_ === node_) {
                        state.circular = parents[i];
                        break;
                    }
                }
            }
            else {
                state.isLeaf = true;
                state.keys = null;
            }
            
            state.notLeaf = !state.isLeaf;
            state.notRoot = !state.isRoot;
        }
        
        updateState();
        
        // use return values to update if defined
        var ret = cb.call(state, state.node);
        if (ret !== undefined && state.update) state.update(ret);
        
        if (modifiers.before) modifiers.before.call(state, state.node);
        
        if (!keepGoing) return state;
        
        if (typeof state.node == 'object'
        && state.node !== null && !state.circular) {
            parents.push(state);
            
            updateState();
            
            forEach(state.keys, function (key, i) {
                path.push(key);
                
                if (modifiers.pre) modifiers.pre.call(state, state.node[key], key);
                
                var child = walker(state.node[key]);
                if (immutable && hasOwnProperty.call(state.node, key)) {
                    state.node[key] = child.node;
                }
                
                child.isLast = i == state.keys.length - 1;
                child.isFirst = i == 0;
                
                if (modifiers.post) modifiers.post.call(state, child);
                
                path.pop();
            });
            parents.pop();
        }
        
        if (modifiers.after) modifiers.after.call(state, state.node);
        
        return state;
    })(root).node;
}

function copy (src) {
    if (typeof src === 'object' && src !== null) {
        var dst;
        
        if (isArray(src)) {
            dst = [];
        }
        else if (isDate(src)) {
            dst = new Date(src.getTime ? src.getTime() : src);
        }
        else if (isRegExp(src)) {
            dst = new RegExp(src);
        }
        else if (isError(src)) {
            dst = { message: src.message };
        }
        else if (isBoolean(src)) {
            dst = new Boolean(src);
        }
        else if (isNumber(src)) {
            dst = new Number(src);
        }
        else if (isString(src)) {
            dst = new String(src);
        }
        else if (Object.create && Object.getPrototypeOf) {
            dst = Object.create(Object.getPrototypeOf(src));
        }
        else if (src.constructor === Object) {
            dst = {};
        }
        else {
            var proto =
                (src.constructor && src.constructor.prototype)
                || src.__proto__
                || {}
            ;
            var T = function () {};
            T.prototype = proto;
            dst = new T;
        }
        
        forEach(objectKeys(src), function (key) {
            dst[key] = src[key];
        });
        return dst;
    }
    else return src;
}

var objectKeys = Object.keys || function keys (obj) {
    var res = [];
    for (var key in obj) res.push(key);
    return res;
};

function toS (obj) { return Object.prototype.toString.call(obj) }
function isDate (obj) { return toS(obj) === '[object Date]' }
function isRegExp (obj) { return toS(obj) === '[object RegExp]' }
function isError (obj) { return toS(obj) === '[object Error]' }
function isBoolean (obj) { return toS(obj) === '[object Boolean]' }
function isNumber (obj) { return toS(obj) === '[object Number]' }
function isString (obj) { return toS(obj) === '[object String]' }

var isArray = Array.isArray || function isArray (xs) {
    return Object.prototype.toString.call(xs) === '[object Array]';
};

var forEach = function (xs, fn) {
    if (xs.forEach) return xs.forEach(fn)
    else for (var i = 0; i < xs.length; i++) {
        fn(xs[i], i, xs);
    }
};

forEach(objectKeys(Traverse.prototype), function (key) {
    traverse$1[key] = function (obj) {
        var args = [].slice.call(arguments, 1);
        var t = new Traverse(obj);
        return t[key].apply(t, args);
    };
});

var hasOwnProperty = Object.hasOwnProperty || function (obj, key) {
    return key in obj;
};

var extent$2 = Extent;

function Extent(bbox) {
    if (!(this instanceof Extent)) {
        return new Extent(bbox);
    }
    this._bbox = bbox || [Infinity, Infinity, -Infinity, -Infinity];
    this._valid = !!bbox;
}

Extent.prototype.include = function(ll) {
    this._valid = true;
    this._bbox[0] = Math.min(this._bbox[0], ll[0]);
    this._bbox[1] = Math.min(this._bbox[1], ll[1]);
    this._bbox[2] = Math.max(this._bbox[2], ll[0]);
    this._bbox[3] = Math.max(this._bbox[3], ll[1]);
    return this;
};

Extent.prototype.equals = function(_) {
    var other;
    if (_ instanceof Extent) { other = _.bbox(); } else { other = _; }
    return this._bbox[0] == other[0] &&
        this._bbox[1] == other[1] &&
        this._bbox[2] == other[2] &&
        this._bbox[3] == other[3];
};

Extent.prototype.center = function(_) {
    if (!this._valid) return null;
    return [
        (this._bbox[0] + this._bbox[2]) / 2,
        (this._bbox[1] + this._bbox[3]) / 2]
};

Extent.prototype.union = function(_) {
    this._valid = true;
    var other;
    if (_ instanceof Extent) { other = _.bbox(); } else { other = _; }
    this._bbox[0] = Math.min(this._bbox[0], other[0]);
    this._bbox[1] = Math.min(this._bbox[1], other[1]);
    this._bbox[2] = Math.max(this._bbox[2], other[2]);
    this._bbox[3] = Math.max(this._bbox[3], other[3]);
    return this;
};

Extent.prototype.bbox = function() {
    if (!this._valid) return null;
    return this._bbox;
};

Extent.prototype.contains = function(ll) {
    if (!ll) return this._fastContains();
    if (!this._valid) return null;
    var lon = ll[0], lat = ll[1];
    return this._bbox[0] <= lon &&
        this._bbox[1] <= lat &&
        this._bbox[2] >= lon &&
        this._bbox[3] >= lat;
};

Extent.prototype.intersect = function(_) {
    if (!this._valid) return null;

    var other;
    if (_ instanceof Extent) { other = _.bbox(); } else { other = _; }

    return !(
      this._bbox[0] > other[2] ||
      this._bbox[2] < other[0] ||
      this._bbox[3] < other[1] ||
      this._bbox[1] > other[3]
    );
};

Extent.prototype._fastContains = function() {
    if (!this._valid) return new Function('return null;');
    var body = 'return ' +
        this._bbox[0] + '<= ll[0] &&' +
        this._bbox[1] + '<= ll[1] &&' +
        this._bbox[2] + '>= ll[0] &&' +
        this._bbox[3] + '>= ll[1]';
    return new Function('ll', body);
};

Extent.prototype.polygon = function() {
    if (!this._valid) return null;
    return {
        type: 'Polygon',
        coordinates: [
            [
                // W, S
                [this._bbox[0], this._bbox[1]],
                // E, S
                [this._bbox[2], this._bbox[1]],
                // E, N
                [this._bbox[2], this._bbox[3]],
                // W, N
                [this._bbox[0], this._bbox[3]],
                // W, S
                [this._bbox[0], this._bbox[1]]
            ]
        ]
    };
};

var geojsonCoords = geojsonCoords$1,
    traverse = traverse$2.exports,
    extent = extent$2;

var geojsonTypesByDataAttributes = {
    features: ['FeatureCollection'],
    coordinates: ['Point', 'MultiPoint', 'LineString', 'MultiLineString', 'Polygon', 'MultiPolygon'],
    geometry: ['Feature'],
    geometries: ['GeometryCollection']
};

var dataAttributes = Object.keys(geojsonTypesByDataAttributes);

geojsonExtent.exports = function(_) {
    return getExtent(_).bbox();
};

geojsonExtent.exports.polygon = function(_) {
    return getExtent(_).polygon();
};

geojsonExtent.exports.bboxify = function(_) {
    return traverse(_).map(function(value) {
        if (!value) return ;

        var isValid = dataAttributes.some(function(attribute){
            if(value[attribute]) {
                return geojsonTypesByDataAttributes[attribute].indexOf(value.type) !== -1;
            }
            return false;
        });

        if(isValid){
            value.bbox = getExtent(value).bbox();
            this.update(value);
        }

    });
};

function getExtent(_) {
    var ext = extent(),
        coords = geojsonCoords(_);
    for (var i = 0; i < coords.length; i++) ext.include(coords[i]);
    return ext;
}

var extent$1 = geojsonExtent.exports;

/**
 * Code from https://github.com/mapbox/mapbox-gl-draw
 * and licensed under ISC
 */
var LAT_MIN = LAT_MIN$1,
    LAT_MAX = LAT_MAX$1,
    LAT_RENDERED_MIN = LAT_RENDERED_MIN$1,
    LAT_RENDERED_MAX = LAT_RENDERED_MAX$1,
    LNG_MIN = LNG_MIN$1,
    LNG_MAX = LNG_MAX$1; // Ensure that we do not drag north-south far enough for
// - any part of any feature to exceed the poles
// - any feature to be completely lost in the space between the projection's
//   edge and the poles, such that it couldn't be re-selected and moved back

var constrain_feature_movement = function constrain_feature_movement(geojsonFeatures, delta) {
  // "inner edge" = a feature's latitude closest to the equator
  var northInnerEdge = LAT_MIN;
  var southInnerEdge = LAT_MAX; // "outer edge" = a feature's latitude furthest from the equator

  var northOuterEdge = LAT_MIN;
  var southOuterEdge = LAT_MAX;
  var westEdge = LNG_MAX;
  var eastEdge = LNG_MIN;
  geojsonFeatures.forEach(function (feature) {
    var bounds = extent$1(feature);
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

  if (northInnerEdge + constrainedDelta.lat > LAT_RENDERED_MAX) {
    constrainedDelta.lat = LAT_RENDERED_MAX - northInnerEdge;
  }

  if (northOuterEdge + constrainedDelta.lat > LAT_MAX) {
    constrainedDelta.lat = LAT_MAX - northOuterEdge;
  }

  if (southInnerEdge + constrainedDelta.lat < LAT_RENDERED_MIN) {
    constrainedDelta.lat = LAT_RENDERED_MIN - southInnerEdge;
  }

  if (southOuterEdge + constrainedDelta.lat < LAT_MIN) {
    constrainedDelta.lat = LAT_MIN - southOuterEdge;
  }

  if (westEdge + constrainedDelta.lng <= LNG_MIN) {
    constrainedDelta.lng += Math.ceil(Math.abs(constrainedDelta.lng) / 360) * 360;
  }

  if (eastEdge + constrainedDelta.lng >= LNG_MAX) {
    constrainedDelta.lng -= Math.ceil(Math.abs(constrainedDelta.lng) / 360) * 360;
  }

  return constrainedDelta;
};

/**
 * Code from https://github.com/mapbox/mapbox-gl-draw
 * and licensed under ISC
 */

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

/**
 * Code from https://github.com/mapbox/mapbox-gl-draw
 * and licensed under ISC
 */
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

/**
 * Code from https://github.com/mapbox/mapbox-gl-draw
 * and licensed under ISC
 */
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

/**
 * Code from https://github.com/mapbox/mapbox-gl-draw
 * and licensed under ISC
 */
var isVertex = isOfMetaType(meta.VERTEX);
var isMidpoint = isOfMetaType(meta.MIDPOINT);
var DirectSelect = {}; // INTERNAL FUNCTIONS

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

/**
 * GeoJson Feature editor that allows to create or manipulate GeoJson data
 */
var MlFeatureEditor = function (props) {
    var draw = useRef();
    var mapHook = useMap({
        mapId: props.mapId,
        waitForLayer: props.insertBeforeLayer,
    });
    var onChangeRef = useRef(props.onChange);
    var drawToolsInitialized = useRef(false);
    var _a = useState(false), drawToolsReady = _a[0], setDrawToolsReady = _a[1];
    var _b = useState(0), mouseUpTrigger = _b[0], setMouseUpTrigger = _b[1];
    var modeChangeHandler = function (e) {
        console.log("MlFeatureEditor mode change to " + e.mode);
        //setDrawMode(e.mode);
    };
    var mouseUpHandler = function () {
        setMouseUpTrigger(Math.random());
    };
    useEffect(function () {
        var _a;
        if (mapHook.map &&
            !drawToolsInitialized.current) {
            drawToolsInitialized.current = true;
            if (mapHook.map.map.style &&
                mapHook.map.map.getSource("mapbox-gl-draw-cold") &&
                draw.current) {
                // remove old Mapbox-gl-Draw from Mapbox instance when hot-reloading this component during development
                // @ts-ignore
                (_a = draw.current) === null || _a === void 0 ? void 0 : _a.remove();
            }
            draw.current = new MapboxDraw({
                displayControlsDefault: false,
                defaultMode: props.mode || "custom_select",
                // @ts-ignore
                modes: Object.assign({
                    custom_polygon: CustomPolygonMode,
                    custom_select: CustomSelectMode,
                    custom_direct_select: DirectSelect,
                }, MapboxDraw.modes),
            });
            mapHook.map.on("draw.modechange", modeChangeHandler, mapHook.componentId);
            mapHook.map.addControl(draw.current, "top-left", mapHook.componentId);
            mapHook.map.on("mouseup", mouseUpHandler, mapHook.componentId);
            setDrawToolsReady(true);
        }
    }, [mapHook.map, props, drawToolsInitialized]);
    useEffect(function () {
        var _a;
        if (draw.current &&
            ((_a = props.geojson) === null || _a === void 0 ? void 0 : _a.geometry)) {
            draw.current.set({ type: "FeatureCollection", features: [props.geojson] });
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
            // @ts-ignore
            draw.current.changeMode(props.mode);
        }
    }, [props.mode]);
    return (React__default.createElement(React__default.Fragment, null));
};

var legalLayerTypes = [
    "fill",
    "line",
    "symbol",
    "circle",
    "heatmap",
    "fill-extrusion",
    "raster",
    "hillshade",
    "background",
];
function useLayer(props) {
    var mapHook = useMap({
        mapId: props.mapId,
        waitForLayer: props.insertBeforeLayer,
    });
    var layerTypeRef = useRef("");
    var layerPaintConfRef = useRef("");
    var layerLayoutConfRef = useRef("");
    var _a = useState(), layer = _a[0], setLayer = _a[1];
    var initializedRef = useRef(false);
    var layerId = useRef(props.layerId || (props.idPrefix ? props.idPrefix : "Layer-") + mapHook.componentId);
    var createLayer = useCallback(function () {
        var _a, _b;
        if (initializedRef.current || !mapHook.map)
            return;
        initializedRef.current = true;
        mapHook.map.addLayer(__assign(__assign(__assign({}, props.options), (props.geojson
            ? {
                source: {
                    type: "geojson",
                    data: props.geojson,
                },
            }
            : {})), { id: layerId.current }), props.insertBeforeLayer
            ? props.insertBeforeLayer
            : props.insertBeforeFirstSymbolLayer
                ? mapHook.map.firstSymbolLayer
                : undefined, mapHook.componentId);
        setLayer(mapHook.map.map.getLayer(layerId.current));
        if (typeof props.onHover !== "undefined") {
            mapHook.map.on("mousemove", layerId.current, props.onHover, mapHook.componentId);
        }
        if (typeof props.onClick !== "undefined") {
            mapHook.map.on("click", layerId.current, props.onClick, mapHook.componentId);
        }
        if (typeof props.onLeave !== "undefined") {
            mapHook.map.on("mouseleave", layerId.current, props.onLeave, mapHook.componentId);
        }
        layerPaintConfRef.current = JSON.stringify((_a = props.options) === null || _a === void 0 ? void 0 : _a.paint);
        layerLayoutConfRef.current = JSON.stringify((_b = props.options) === null || _b === void 0 ? void 0 : _b.layout);
        layerTypeRef.current = props.options.type;
    }, [props, mapHook.map]);
    useEffect(function () {
        if (!mapHook.map)
            return;
        if (initializedRef.current &&
            legalLayerTypes.indexOf(props.options.type) !== -1 &&
            layerTypeRef.current &&
            props.options.type !== layerTypeRef.current) {
            // remove (cleanup) & reinitialize the layer if type has changed
            cleanup();
        }
        else if (initializedRef.current &&
            (legalLayerTypes.indexOf(props.options.type) === -1 ||
                (legalLayerTypes.indexOf(props.options.type) !== -1 &&
                    props.options.type === layerTypeRef.current))) {
            return;
        }
        createLayer();
    }, [mapHook.map, props.options, createLayer]);
    useEffect(function () {
        var _a, _b, _c, _d;
        if (!initializedRef.current || !((_b = (_a = mapHook.map) === null || _a === void 0 ? void 0 : _a.map) === null || _b === void 0 ? void 0 : _b.getSource(layerId.current)))
            return;
        //@ts-ignore setData only exists on GeoJsonSource
        (_d = (_c = mapHook.map.map.getSource(layerId.current)) === null || _c === void 0 ? void 0 : _c.setData) === null || _d === void 0 ? void 0 : _d.call(_c, props.geojson);
    }, [props.geojson, mapHook.map, props.options.type]);
    useEffect(function () {
        var _a, _b, _c, _d, _e;
        if (!mapHook.map || !((_c = (_b = (_a = mapHook.map) === null || _a === void 0 ? void 0 : _a.map) === null || _b === void 0 ? void 0 : _b.getLayer) === null || _c === void 0 ? void 0 : _c.call(_b, layerId.current)) || !initializedRef.current)
            return;
        var key;
        var layoutString = JSON.stringify(props.options.layout);
        if (props.options.layout && layoutString !== layerLayoutConfRef.current) {
            var oldLayout = JSON.parse(layerLayoutConfRef.current);
            for (key in props.options.layout) {
                if (((_d = props.options.layout) === null || _d === void 0 ? void 0 : _d[key]) && props.options.layout[key] !== oldLayout[key]) {
                    mapHook.map.map.setLayoutProperty(layerId.current, key, props.options.layout[key]);
                }
            }
            layerLayoutConfRef.current = layoutString;
        }
        var paintString = JSON.stringify(props.options.paint);
        if (paintString !== layerPaintConfRef.current) {
            var oldPaint = JSON.parse(layerPaintConfRef.current);
            for (key in props.options.paint) {
                if (((_e = props.options.paint) === null || _e === void 0 ? void 0 : _e[key]) && props.options.paint[key] !== oldPaint[key]) {
                    mapHook.map.map.setPaintProperty(layerId.current, key, props.options.paint[key]);
                }
            }
            layerPaintConfRef.current = paintString;
        }
    }, [props.options, mapHook.map]);
    var cleanup = function () {
        initializedRef.current = false;
        mapHook.cleanup();
    };
    useEffect(function () {
        return function () {
            cleanup();
        };
    }, []);
    return {
        map: mapHook.map,
        layer: layer,
        layerId: layerId.current,
        componentId: mapHook.componentId,
        mapHook: mapHook,
    };
}

/**
 * Adds a fill extrusion layer to the MapLibre instance reference by props.mapId
 *
 */
var MlFillExtrusionLayer = function (props) {
    useLayer({
        mapId: props.mapId,
        layerId: props.layerId || "MlFillExtrusionLayer-" + v4(),
        options: {
            id: "",
            type: "fill-extrusion",
            source: props.sourceId || "openmaptiles",
            "source-layer": props.sourceLayer || "building",
            minzoom: props.minZoom || 14,
            paint: __assign({}, props.paint),
        },
        insertBeforeFirstSymbolLayer: true,
    });
    return React__default.createElement(React__default.Fragment, null);
};
MlFillExtrusionLayer.defaultProps = {
    mapId: undefined,
    paint: {
        "fill-extrusion-color": "hsl(196, 61%, 83%)",
        "fill-extrusion-height": {
            property: "render_height",
            type: "identity",
        },
        "fill-extrusion-base": {
            property: "render_min_height",
            type: "identity",
        },
        "fill-extrusion-opacity": 1,
    },
};

var getDefaultPaintPropsByType = function (type, defaultPaintOverrides) {
    switch (type) {
        case "fill":
            if (defaultPaintOverrides === null || defaultPaintOverrides === void 0 ? void 0 : defaultPaintOverrides.fill) {
                return defaultPaintOverrides.fill;
            }
            return {
                "fill-color": "rgba(10,240,256,0.6)",
            };
        case "line":
            if (defaultPaintOverrides === null || defaultPaintOverrides === void 0 ? void 0 : defaultPaintOverrides.line) {
                return defaultPaintOverrides.line;
            }
            return {
                "line-color": "rgb(203,211,2)",
                "line-width": 5,
            };
        case "circle":
        default:
            if (defaultPaintOverrides === null || defaultPaintOverrides === void 0 ? void 0 : defaultPaintOverrides.circle) {
                return defaultPaintOverrides.circle;
            }
            return {
                "circle-color": "rgba(10,240,256)",
                "circle-stroke-color": "#fff",
                "circle-stroke-width": 2,
            };
    }
};

var mapGeometryTypesToLayerTypes = {
    Position: "circle",
    Point: "circle",
    MultiPoint: "circle",
    LineString: "line",
    MultiLineString: "line",
    Polygon: "fill",
    MultiPolygon: "fill",
    GeometryCollection: "circle",
};
var getDefaulLayerTypeByGeometry = function (geojson) {
    var _a;
    if ((geojson === null || geojson === void 0 ? void 0 : geojson.type) === "Feature") {
        return (mapGeometryTypesToLayerTypes === null || mapGeometryTypesToLayerTypes === void 0 ? void 0 : mapGeometryTypesToLayerTypes[(_a = geojson === null || geojson === void 0 ? void 0 : geojson.geometry) === null || _a === void 0 ? void 0 : _a.type])
            ? mapGeometryTypesToLayerTypes[geojson.geometry.type]
            : "circle";
    }
    if ((geojson === null || geojson === void 0 ? void 0 : geojson.type) === "FeatureCollection") {
        if (geojson.features.length) {
            return getDefaulLayerTypeByGeometry(geojson.features[0]);
        }
        return "circle";
    }
    return "fill";
};

/**
 * Adds source and layer of types "line", "fill" or "circle" to display GeoJSON data on the map.
 *
 * @component
 */
var MlGeoJsonLayer = function (props) {
    var layerType = props.type || getDefaulLayerTypeByGeometry(props.geojson);
    // Use a useRef hook to reference the layer object to be able to access it later inside useEffect hooks
    useLayer({
        mapId: props.mapId,
        layerId: props.layerId || "MlGeoJsonLayer-" + v4(),
        geojson: props.geojson,
        options: __assign(__assign({ paint: props.paint ||
                getDefaultPaintPropsByType(layerType, props.defaultPaintOverrides), layout: props.layout || {} }, props.options), { type: layerType }),
        insertBeforeLayer: props.insertBeforeLayer,
        onHover: props.onHover,
        onClick: props.onClick,
        onLeave: props.onLeave,
    });
    return (React__default.createElement(React__default.Fragment, null));
};

var GpsFixed = {};

var _interopRequireDefault$4 = interopRequireDefault.exports;

Object.defineProperty(GpsFixed, "__esModule", {
  value: true
});
var default_1$4 = GpsFixed.default = void 0;

var _createSvgIcon$4 = _interopRequireDefault$4(createSvgIcon$1);

var _jsxRuntime$4 = jsxRuntime.exports;

var _default$4 = (0, _createSvgIcon$4.default)( /*#__PURE__*/(0, _jsxRuntime$4.jsx)("path", {
  d: "M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"
}), 'GpsFixed');

default_1$4 = GpsFixed.default = _default$4;

/**
 * Adds a button that makes the map follow the users GPS position using
 * navigator.geolocation.watchPosition if activated
 *
 */
var MlFollowGps = function (props) {
    var _a, _b;
    var mapHook = useMap({
        mapId: props.mapId,
        waitForLayer: props.insertBeforeLayer,
    });
    var _c = useState(false), isFollowed = _c[0], setIsFollowed = _c[1];
    var _d = useState(), userLocationGeoJson = _d[0], setUserLocationGeoJson = _d[1];
    var _e = useState(false), locationAccessDenied = _e[0], setLocationAccessDenied = _e[1];
    var _f = useState(), accuracyGeoJson = _f[0], setAccuracyGeoJson = _f[1];
    var _g = useState(0), deviceOrientation = _g[0], setDeviceOrientation = _g[1];
    var getLocationSuccess = useCallback(function (pos) {
        if (!mapHook.map)
            return;
        mapHook.map.map.flyTo({
            center: [pos.coords.longitude, pos.coords.latitude],
            zoom: 18,
            speed: 1,
            curve: 1,
        });
        if (!props.showUserLocation)
            return;
        var geoJsonPoint = point([pos.coords.longitude, pos.coords.latitude]);
        setUserLocationGeoJson(geoJsonPoint);
        setAccuracyGeoJson(circle(geoJsonPoint, pos.coords.accuracy / 1000));
    }, [mapHook.map, props]);
    var getLocationError = function () {
        console.log("Access of user location denied");
        setLocationAccessDenied(true);
    };
    var orientationCone = useMemo(function () {
        if (!userLocationGeoJson) {
            return undefined;
        }
        var radius = 0.02;
        var bearing1 = deviceOrientation - 15;
        var bearing2 = deviceOrientation + 15;
        var options = { steps: 65 };
        var arc = lineArc(userLocationGeoJson, radius, bearing1, bearing2, options);
        var copy = arc;
        copy.geometry.coordinates.push(userLocationGeoJson.geometry.coordinates);
        copy.geometry.coordinates.slice(0, 0);
        return copy;
    }, [deviceOrientation, userLocationGeoJson]);
    var handleOrientation = function (event) {
        setDeviceOrientation(-event.alpha);
    };
    useEffect(function () {
        if (isFollowed) {
            var _handleOrientation_1 = handleOrientation;
            window.addEventListener("deviceorientation", _handleOrientation_1);
            return function () {
                window.removeEventListener("deviceorientation", _handleOrientation_1);
            };
        }
        return;
    }, [isFollowed]);
    useEffect(function () {
        if (!mapHook.map)
            return;
        if (isFollowed) {
            var _watchId_1 = navigator.geolocation.watchPosition(getLocationSuccess, getLocationError);
            return function () {
                navigator.geolocation.clearWatch(_watchId_1);
            };
        }
        return;
    }, [mapHook.map, isFollowed, getLocationSuccess]);
    return (React__default.createElement(React__default.Fragment, null,
        isFollowed && userLocationGeoJson && (React__default.createElement(MlGeoJsonLayer, { geojson: accuracyGeoJson, type: "fill", paint: __assign({ "fill-color": "#cbd300", "fill-opacity": 0.3 }, props.accuracyPaint), insertBeforeLayer: props.insertBeforeLayer })),
        isFollowed && orientationCone && (React__default.createElement(MlGeoJsonLayer, { geojson: orientationCone, type: "fill", paint: {
                "fill-color": "#0000ff",
                "fill-antialias": false,
                "fill-opacity": 0.3,
            }, insertBeforeLayer: props.insertBeforeLayer })),
        isFollowed && userLocationGeoJson && (React__default.createElement(MlGeoJsonLayer, { geojson: userLocationGeoJson, type: "circle", paint: __assign({ "circle-color": "#009ee0", "circle-radius": 5, "circle-stroke-color": "#fafaff", "circle-stroke-width": 1 }, props.circlePaint), insertBeforeLayer: props.insertBeforeLayer })),
        React__default.createElement(Button$2, { sx: __assign({ zIndex: 1002, color: isFollowed ? props.onColor : props.offColor }, props.style), disabled: locationAccessDenied, onClick: function () {
                setIsFollowed(!isFollowed);
            } },
            " ",
            React__default.createElement(default_1$4, { sx: __assign({}, (((_a = props.style) === null || _a === void 0 ? void 0 : _a.fontSize) ? { fontSize: (_b = props.style) === null || _b === void 0 ? void 0 : _b.fontSize } : {})) }),
            " ")));
};
MlFollowGps.defaultProps = {
    mapId: undefined,
    style: {
        minWidth: "30px",
        minHeight: "30px",
        width: "30px",
        height: "30px",
        backgroundColor: "#414141",
        borderRadius: "23%",
        margin: 0.15,
        fontSize: "1.3em",
        ":hover": {
            backgroundColor: "#515151",
            color: "#ececec",
        },
    },
    onColor: "#ececec",
    offColor: "#666",
    showAccuracyCircle: true,
    showUserLocation: true,
    showOrientation: true,
};

var MlImageMarkerLayer = function (props) {
    var mapHook = useMap({
        mapId: props.mapId,
        waitForLayer: props.insertBeforeLayer,
    });
    var layerInitializedRef = useRef(false);
    var imageIdRef = useRef(props.imageId || "img_" + new Date().getTime());
    var layerId = useRef(props.layerId || "MlImageMarkerLayer-" + mapHook.componentId);
    useEffect(function () {
        if (!mapHook.map ||
            (mapHook.map && !mapHook.map.map.getLayer(layerId.current)) ||
            !props.options)
            return;
        // the MapLibre-gl instance (mapContext.map) is accessible here
        // initialize the layer and add it to the MapLibre-gl instance or do something else with it
        var key;
        if (props.options.layout) {
            for (key in props.options.layout) {
                mapHook.map.map.setLayoutProperty(layerId.current, key, props.options.layout[key]);
            }
        }
        if (props.options.paint) {
            for (key in props.options.paint) {
                mapHook.map.map.setPaintProperty(layerId.current, key, props.options.paint[key]);
            }
        }
    }, [props.options, layerId.current, props.mapId]);
    var addLayer = useCallback(function () {
        if (!mapHook.map)
            return;
        var tmpOptions = __assign({ id: layerId.current, layout: {} }, props.options);
        tmpOptions.layout["icon-image"] = imageIdRef.current;
        mapHook.map.addLayer(tmpOptions, props.insertBeforeLayer, mapHook.componentId);
    }, [props, mapHook.map]);
    useEffect(function () {
        if (!props.options || !mapHook.map || layerInitializedRef.current)
            return;
        layerInitializedRef.current = true;
        if (props.imgSrc) {
            mapHook.map.map.loadImage(props.imgSrc, function (error, image) {
                if (error)
                    throw error;
                if (!mapHook.map)
                    return;
                mapHook.map.addImage(imageIdRef.current, image, mapHook.componentId);
            });
        }
        addLayer();
    }, [mapHook.map, addLayer, props]);
    useEffect(function () {
        if (!mapHook.map ||
            (mapHook.map && !mapHook.map.map.getLayer(layerId.current)) ||
            !props.options) {
            return;
        }
        mapHook.map.map
            .getSource(layerId.current)
            .setData(props.options.source.data);
    }, [props.options.source.data, props]);
    return React__default.createElement(React__default.Fragment, null);
};

function getButtonGroupUtilityClass(slot) {
  return generateUtilityClass('MuiButtonGroup', slot);
}
const buttonGroupClasses = generateUtilityClasses('MuiButtonGroup', ['root', 'contained', 'outlined', 'text', 'disableElevation', 'disabled', 'fullWidth', 'vertical', 'grouped', 'groupedHorizontal', 'groupedVertical', 'groupedText', 'groupedTextHorizontal', 'groupedTextVertical', 'groupedTextPrimary', 'groupedTextSecondary', 'groupedOutlined', 'groupedOutlinedHorizontal', 'groupedOutlinedVertical', 'groupedOutlinedPrimary', 'groupedOutlinedSecondary', 'groupedContained', 'groupedContainedHorizontal', 'groupedContainedVertical', 'groupedContainedPrimary', 'groupedContainedSecondary']);
var buttonGroupClasses$1 = buttonGroupClasses;

const _excluded$d = ["children", "className", "color", "component", "disabled", "disableElevation", "disableFocusRipple", "disableRipple", "fullWidth", "orientation", "size", "variant"];

const overridesResolver$2 = (props, styles) => {
  const {
    ownerState
  } = props;
  return [{
    [`& .${buttonGroupClasses$1.grouped}`]: styles.grouped
  }, {
    [`& .${buttonGroupClasses$1.grouped}`]: styles[`grouped${capitalize(ownerState.orientation)}`]
  }, {
    [`& .${buttonGroupClasses$1.grouped}`]: styles[`grouped${capitalize(ownerState.variant)}`]
  }, {
    [`& .${buttonGroupClasses$1.grouped}`]: styles[`grouped${capitalize(ownerState.variant)}${capitalize(ownerState.orientation)}`]
  }, {
    [`& .${buttonGroupClasses$1.grouped}`]: styles[`grouped${capitalize(ownerState.variant)}${capitalize(ownerState.color)}`]
  }, styles.root, styles[ownerState.variant], ownerState.disableElevation === true && styles.disableElevation, ownerState.fullWidth && styles.fullWidth, ownerState.orientation === 'vertical' && styles.vertical];
};

const useUtilityClasses$a = ownerState => {
  const {
    classes,
    color,
    disabled,
    disableElevation,
    fullWidth,
    orientation,
    variant
  } = ownerState;
  const slots = {
    root: ['root', variant, orientation === 'vertical' && 'vertical', fullWidth && 'fullWidth', disableElevation && 'disableElevation'],
    grouped: ['grouped', `grouped${capitalize(orientation)}`, `grouped${capitalize(variant)}`, `grouped${capitalize(variant)}${capitalize(orientation)}`, `grouped${capitalize(variant)}${capitalize(color)}`, disabled && 'disabled']
  };
  return composeClasses(slots, getButtonGroupUtilityClass, classes);
};

const ButtonGroupRoot = styled$1('div', {
  name: 'MuiButtonGroup',
  slot: 'Root',
  overridesResolver: overridesResolver$2
})(({
  theme,
  ownerState
}) => _extends$3({
  display: 'inline-flex',
  borderRadius: theme.shape.borderRadius
}, ownerState.variant === 'contained' && {
  boxShadow: theme.shadows[2]
}, ownerState.disableElevation && {
  boxShadow: 'none'
}, ownerState.fullWidth && {
  width: '100%'
}, ownerState.orientation === 'vertical' && {
  flexDirection: 'column'
}, {
  [`& .${buttonGroupClasses$1.grouped}`]: _extends$3({
    minWidth: 40,
    '&:not(:first-of-type)': _extends$3({}, ownerState.orientation === 'horizontal' && {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0
    }, ownerState.orientation === 'vertical' && {
      borderTopRightRadius: 0,
      borderTopLeftRadius: 0
    }, ownerState.variant === 'outlined' && ownerState.orientation === 'horizontal' && {
      marginLeft: -1
    }, ownerState.variant === 'outlined' && ownerState.orientation === 'vertical' && {
      marginTop: -1
    }),
    '&:not(:last-of-type)': _extends$3({}, ownerState.orientation === 'horizontal' && {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0
    }, ownerState.orientation === 'vertical' && {
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 0
    }, ownerState.variant === 'text' && ownerState.orientation === 'horizontal' && {
      borderRight: `1px solid ${theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)'}`
    }, ownerState.variant === 'text' && ownerState.orientation === 'vertical' && {
      borderBottom: `1px solid ${theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)'}`
    }, ownerState.variant === 'text' && ownerState.color !== 'inherit' && {
      borderColor: alpha(theme.palette[ownerState.color].main, 0.5)
    }, ownerState.variant === 'outlined' && ownerState.orientation === 'horizontal' && {
      borderRightColor: 'transparent'
    }, ownerState.variant === 'outlined' && ownerState.orientation === 'vertical' && {
      borderBottomColor: 'transparent'
    }, ownerState.variant === 'contained' && ownerState.orientation === 'horizontal' && {
      borderRight: `1px solid ${theme.palette.grey[400]}`,
      [`&.${buttonGroupClasses$1.disabled}`]: {
        borderRight: `1px solid ${theme.palette.action.disabled}`
      }
    }, ownerState.variant === 'contained' && ownerState.orientation === 'vertical' && {
      borderBottom: `1px solid ${theme.palette.grey[400]}`,
      [`&.${buttonGroupClasses$1.disabled}`]: {
        borderBottom: `1px solid ${theme.palette.action.disabled}`
      }
    }, ownerState.variant === 'contained' && ownerState.color !== 'inherit' && {
      borderColor: theme.palette[ownerState.color].dark
    }, {
      '&:hover': _extends$3({}, ownerState.variant === 'outlined' && ownerState.orientation === 'horizontal' && {
        borderRightColor: 'currentColor'
      }, ownerState.variant === 'outlined' && ownerState.orientation === 'vertical' && {
        borderBottomColor: 'currentColor'
      })
    }),
    '&:hover': _extends$3({}, ownerState.variant === 'contained' && {
      boxShadow: 'none'
    })
  }, ownerState.variant === 'contained' && {
    boxShadow: 'none'
  })
}));
const ButtonGroup = /*#__PURE__*/React.forwardRef(function ButtonGroup(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiButtonGroup'
  });

  const {
    children,
    className,
    color = 'primary',
    component = 'div',
    disabled = false,
    disableElevation = false,
    disableFocusRipple = false,
    disableRipple = false,
    fullWidth = false,
    orientation = 'horizontal',
    size = 'medium',
    variant = 'outlined'
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded$d);

  const ownerState = _extends$3({}, props, {
    color,
    component,
    disabled,
    disableElevation,
    disableFocusRipple,
    disableRipple,
    fullWidth,
    orientation,
    size,
    variant
  });

  const classes = useUtilityClasses$a(ownerState);
  const context = React.useMemo(() => ({
    className: classes.grouped,
    color,
    disabled,
    disableElevation,
    disableFocusRipple,
    disableRipple,
    fullWidth,
    size,
    variant
  }), [color, disabled, disableElevation, disableFocusRipple, disableRipple, fullWidth, size, variant, classes.grouped]);
  return /*#__PURE__*/jsxRuntime.exports.jsx(ButtonGroupRoot, _extends$3({
    as: component,
    role: "group",
    className: clsx(classes.root, className),
    ref: ref,
    ownerState: ownerState
  }, other, {
    children: /*#__PURE__*/jsxRuntime.exports.jsx(ButtonGroupContext$1.Provider, {
      value: context,
      children: children
    })
  }));
});
process.env.NODE_ENV !== "production" ? ButtonGroup.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The content of the component.
   */
  children: PropTypes.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/customization/palette/#adding-new-colors).
   * @default 'primary'
   */
  color: PropTypes
  /* @typescript-to-proptypes-ignore */
  .oneOfType([PropTypes.oneOf(['inherit', 'primary', 'secondary', 'error', 'info', 'success', 'warning']), PropTypes.string]),

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,

  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,

  /**
   * If `true`, no elevation is used.
   * @default false
   */
  disableElevation: PropTypes.bool,

  /**
   * If `true`, the button keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple: PropTypes.bool,

  /**
   * If `true`, the button ripple effect is disabled.
   * @default false
   */
  disableRipple: PropTypes.bool,

  /**
   * If `true`, the buttons will take up the full width of its container.
   * @default false
   */
  fullWidth: PropTypes.bool,

  /**
   * The component orientation (layout flow direction).
   * @default 'horizontal'
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),

  /**
   * The size of the component.
   * `small` is equivalent to the dense button styling.
   * @default 'medium'
   */
  size: PropTypes
  /* @typescript-to-proptypes-ignore */
  .oneOfType([PropTypes.oneOf(['small', 'medium', 'large']), PropTypes.string]),

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),

  /**
   * The variant to use.
   * @default 'outlined'
   */
  variant: PropTypes
  /* @typescript-to-proptypes-ignore */
  .oneOfType([PropTypes.oneOf(['contained', 'outlined', 'text']), PropTypes.string])
} : void 0;
var ButtonGroup$1 = ButtonGroup;

var ControlPoint = {};

var _interopRequireDefault$3 = interopRequireDefault.exports;

Object.defineProperty(ControlPoint, "__esModule", {
  value: true
});
var default_1$3 = ControlPoint.default = void 0;

var _createSvgIcon$3 = _interopRequireDefault$3(createSvgIcon$1);

var _jsxRuntime$3 = jsxRuntime.exports;

var _default$3 = (0, _createSvgIcon$3.default)( /*#__PURE__*/(0, _jsxRuntime$3.jsx)("path", {
  d: "M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
}), 'ControlPoint');

default_1$3 = ControlPoint.default = _default$3;

var RemoveCircleOutline = {};

var _interopRequireDefault$2 = interopRequireDefault.exports;

Object.defineProperty(RemoveCircleOutline, "__esModule", {
  value: true
});
var default_1$2 = RemoveCircleOutline.default = void 0;

var _createSvgIcon$2 = _interopRequireDefault$2(createSvgIcon$1);

var _jsxRuntime$2 = jsxRuntime.exports;

var _default$2 = (0, _createSvgIcon$2.default)( /*#__PURE__*/(0, _jsxRuntime$2.jsx)("path", {
  d: "M7 11v2h10v-2H7zm5-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
}), 'RemoveCircleOutline');

default_1$2 = RemoveCircleOutline.default = _default$2;

function _extends$2() { _extends$2 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$2.apply(this, arguments); }

var SvgRotateRight = function SvgRotateRight(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$2({
    width: "39.675098mm",
    height: "104.27064mm",
    viewBox: "0 0 39.675098 104.27064"
  }, props), /*#__PURE__*/React.createElement("g", {
    transform: "translate(-86.019554,-58.032633)"
  }, /*#__PURE__*/React.createElement("path", {
    style: {
      strokeWidth: 0.744756
    },
    d: "m 442.74023,219.33594 -117.62695,32.32422 54.71094,31.12304 c -21.99397,41.5931 -32.8507,84.88283 -38.33008,127.89649 -6.86182,50.94051 -5.95715,103.99765 20.23828,155.46484 5.97246,11.72776 13.65817,23.59773 24.38867,35.06641 2.6597,2.84073 5.65602,5.75455 9.12891,8.68164 0.87557,0.7378 1.85363,1.52609 2.95117,2.35547 0.29669,0.22563 0.63616,0.47742 1.02149,0.75586 l 0.58203,0.42578 34.57812,-15.12305 -0.33789,-0.2207 c -0.0265,-0.0151 -0.0842,-0.0587 -0.18359,-0.13086 -0.46723,-0.34885 -0.9819,-0.76796 -1.56055,-1.25 -2.29757,-1.91343 -4.46539,-4.04643 -6.64062,-6.33985 -8.80052,-9.27114 -15.30333,-19.4993 -20.83985,-30.13867 -24.42289,-46.90715 -24.77465,-97.03535 -18.58008,-146.68164 4.94388,-37.37493 13.65299,-74.4847 30.20508,-109.92969 l 58.6211,33.34766 z",
    transform: "scale(0.26458333)"
  })));
};

var _g$1;

function _extends$1() { _extends$1 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$1.apply(this, arguments); }

var SvgRotateLeft = function SvgRotateLeft(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$1({
    width: "39.675098mm",
    height: "104.27064mm",
    viewBox: "0 0 39.675098 104.27064"
  }, props), _g$1 || (_g$1 = /*#__PURE__*/React.createElement("g", {
    transform: "translate(-86.019554,-58.032633)"
  }, /*#__PURE__*/React.createElement("path", {
    d: "m 94.572523,58.032633 31.122127,8.55245 -14.4756,8.234638 c 5.81924,11.004841 8.69175,22.458582 10.1415,33.839279 1.81552,13.47801 1.57616,27.51604 -5.35471,41.13341 -1.58021,3.10296 -3.61373,6.24356 -6.45284,9.27798 -0.70371,0.75161 -1.49649,1.52256 -2.41535,2.29702 -0.23167,0.19521 -0.49044,0.40378 -0.78083,0.62322 -0.0785,0.0597 -0.16832,0.12632 -0.27027,0.19999 l -0.154,0.11265 -9.148793,-4.00131 0.0894,-0.0584 c 0.007,-0.004 0.02228,-0.0155 0.04857,-0.0346 0.123621,-0.0923 0.259794,-0.20319 0.412895,-0.33073 0.607899,-0.50626 1.181468,-1.07062 1.756997,-1.67742 2.328481,-2.45299 4.049011,-5.15919 5.513881,-7.97419 6.46189,-12.41085 6.55496,-25.67394 4.91598,-38.80952 -1.30807,-9.888781 -3.61235,-19.707408 -7.99176,-29.085561 l -15.510171,8.823235 z"
  }))));
};

var _g;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var SvgNeedle = function SvgNeedle(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    width: "75.967445mm",
    height: "234.71339mm",
    viewBox: "0 0 75.967445 234.71339"
  }, props), _g || (_g = /*#__PURE__*/React.createElement("g", {
    transform: "translate(-76.705281,-29.77268)"
  }, /*#__PURE__*/React.createElement("path", {
    d: "m 114.68901,29.77268 37.98372,117.3567 H 76.705281 Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m 114.68901,264.48608 37.98372,-117.3567 H 76.705281 Z"
  }))));
};

var NeedleButton = styled$3.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 40%;\n  display: flex;\n  align-items: center;\n\n  &:hover {\n    cursor: pointer;\n  }\n  path {\n    filter: drop-shadow(0px 0px 15px rgba(0, 0, 0, 0.2));\n  }\n  &:hover path {\n    filter: drop-shadow(0px 0px 13px rgba(255, 255, 255, 0.1));\n  }\n  path:nth-of-type(2) {\n    fill: #343434;\n  }\n  &:hover path:nth-of-type(2) {\n    fill: #434343;\n  }\n  path:nth-of-type(1) {\n    fill: #e90318;\n  }\n  &:hover path:nth-of-type(1) {\n    fill: #fb4052;\n  }\n"], ["\n  width: 40%;\n  display: flex;\n  align-items: center;\n\n  &:hover {\n    cursor: pointer;\n  }\n  path {\n    filter: drop-shadow(0px 0px 15px rgba(0, 0, 0, 0.2));\n  }\n  &:hover path {\n    filter: drop-shadow(0px 0px 13px rgba(255, 255, 255, 0.1));\n  }\n  path:nth-of-type(2) {\n    fill: #343434;\n  }\n  &:hover path:nth-of-type(2) {\n    fill: #434343;\n  }\n  path:nth-of-type(1) {\n    fill: #e90318;\n  }\n  &:hover path:nth-of-type(1) {\n    fill: #fb4052;\n  }\n"])));
var NeedleContainer = styled$3.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  pointer-events: none;\n  display: flex;\n  z-index: 1002;\n  position: absolute;\n  align-items: center;\n\n  margin-left: -30%;\n  path:nth-of-type(2) {\n  }\n  svg g {\n    transform: translate(-76.7053, -29.7727) scale(2, 1);\n  }\n  svg {\n    z-index: 9990;\n    height: 150px;\n    width: 200px;\n  }\n"], ["\n  pointer-events: none;\n  display: flex;\n  z-index: 1002;\n  position: absolute;\n  align-items: center;\n\n  margin-left: -30%;\n  path:nth-of-type(2) {\n  }\n  svg g {\n    transform: translate(-76.7053, -29.7727) scale(2, 1);\n  }\n  svg {\n    z-index: 9990;\n    height: 150px;\n    width: 200px;\n  }\n"])));
var RotateButton = styled$3.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  width: 30%;\n  margin-top: 14px;\n  z-index: 999;\n  display: flex;\n\n  svg:hover {\n    cursor: pointer;\n  }\n  svg:hover path {\n    fill: #ececec;\n    filter: drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.1));\n  }\n  path {\n    fill: #bbb;\n  }\n  svg {\n    transform: scale(0.6);\n    z-index: 9990;\n    height: 172px;\n  }\n"], ["\n  width: 30%;\n  margin-top: 14px;\n  z-index: 999;\n  display: flex;\n\n  svg:hover {\n    cursor: pointer;\n  }\n  svg:hover path {\n    fill: #ececec;\n    filter: drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.1));\n  }\n  path {\n    fill: #bbb;\n  }\n  svg {\n    transform: scale(0.6);\n    z-index: 9990;\n    height: 172px;\n  }\n"])));
/**
 * Navigation component that displays a compass component which indicates the current oriantation of the map it is registered for and offers controls to turn the bearing 90° left/right or reset north to point up.
 *
 * All style props are applied using @emotion/css to allow more complex css selectors.
 *
 * @component
 */
var MlNavigationCompass = function (props) {
    var mapHook = useMap({
        mapId: props.mapId,
        waitForLayer: props.insertBeforeLayer,
    });
    var _a = useState(0), bearing = _a[0], setBearing = _a[1];
    useEffect(function () {
        if (!mapHook.map)
            return;
        var _updateBearing = function () {
            var _a, _b;
            if (!((_b = (_a = mapHook.map) === null || _a === void 0 ? void 0 : _a.map) === null || _b === void 0 ? void 0 : _b.getBearing))
                return;
            setBearing(Math.round(mapHook.map.map.getBearing()));
        };
        mapHook.map.on("rotate", _updateBearing, mapHook.componentId);
        _updateBearing();
        return function () {
            var _a;
            (_a = mapHook.map) === null || _a === void 0 ? void 0 : _a.map.off("rotate", _updateBearing);
        };
    }, [mapHook.map, props.mapId]);
    return (React__default.createElement(React__default.Fragment, null,
        React__default.createElement("div", { className: css(__assign({ zIndex: 1000, top: 0, position: "absolute" }, props.style)) },
            React__default.createElement("div", { className: css(__assign({ position: "absolute", border: "10px solid #bcbcbc", backgroundColor: "#717171", background: "radial-gradient(#717171, #414141)", height: "200px", width: "200px", borderRadius: "50%", display: "flex", justifyContent: "center", transform: "scale(0.2) translateX(-448px) translateY(-448px)" }, props.backgroundStyle)) },
                React__default.createElement(RotateButton, { className: css(__assign({}, props.rotateRightStyle)) },
                    React__default.createElement(SvgRotateRight, { onClick: function () {
                            if (!mapHook.map)
                                return;
                            var bearing = Math.round(mapHook.map.map.getBearing());
                            var rest = Math.round(bearing % 90);
                            if (bearing > 0) {
                                rest = 90 - rest;
                            }
                            if (rest === 0) {
                                rest = 90;
                            }
                            mapHook.map.map.setBearing(Math.round(bearing + Math.abs(rest)));
                        } })),
                React__default.createElement(NeedleButton, { className: css(__assign({}, props.needleStyle)), onClick: function () {
                        var _a;
                        (_a = mapHook.map) === null || _a === void 0 ? void 0 : _a.map.setBearing(0);
                    } },
                    React__default.createElement(NeedleContainer, { style: {
                            transform: "rotate(" + (bearing > 0 ? "-" + bearing : -1 * bearing) + "deg)",
                        } },
                        React__default.createElement(SvgNeedle, null))),
                React__default.createElement(RotateButton, { className: css(__assign({}, props.rotateLeftStyle)) },
                    React__default.createElement(SvgRotateLeft, { onClick: function () {
                            if (!mapHook.map)
                                return;
                            var bearing = Math.round(mapHook.map.map.getBearing());
                            var rest = Math.round(bearing % 90);
                            if (bearing < 0) {
                                rest = 90 + rest;
                            }
                            if (rest === 0) {
                                rest = 90;
                            }
                            mapHook.map.map.setBearing(Math.round(bearing - Math.abs(rest)));
                        } }))))));
};
MlNavigationCompass.propTypes = {
    /**
     * Component id prefix
     */
    idPrefix: PropTypes.string,
    /**
     * Style object to adjust css definitions of the component.
     */
    style: PropTypes.object,
    /**
     * Style object to adjust css definitions of the background.
     */
    backgroundStyle: PropTypes.object,
    /**
     * Style object to adjust css definitions of the compass needle.
     */
    needleStyle: PropTypes.object,
    /**
     * Style object to adjust css definitions of the rotate right button.
     */
    rotateRightStyle: PropTypes.object,
    /**
     * Style object to adjust css definitions of the rotate left button.
     */
    rotateLeftStyle: PropTypes.object,
};
var templateObject_1, templateObject_2, templateObject_3;

/**
 * @deprecated Not used internally. Use `MediaQueryListEvent` from lib.dom.d.ts instead.
 */

function useMediaQueryOld(query, defaultMatches, matchMedia, ssrMatchMedia, noSsr) {
  const supportMatchMedia = typeof window !== 'undefined' && typeof window.matchMedia !== 'undefined';
  const [match, setMatch] = React.useState(() => {
    if (noSsr && supportMatchMedia) {
      return matchMedia(query).matches;
    }

    if (ssrMatchMedia) {
      return ssrMatchMedia(query).matches;
    } // Once the component is mounted, we rely on the
    // event listeners to return the correct matches value.


    return defaultMatches;
  });
  useEnhancedEffect$1(() => {
    let active = true;

    if (!supportMatchMedia) {
      return undefined;
    }

    const queryList = matchMedia(query);

    const updateMatch = () => {
      // Workaround Safari wrong implementation of matchMedia
      // TODO can we remove it?
      // https://github.com/mui/material-ui/pull/17315#issuecomment-528286677
      if (active) {
        setMatch(queryList.matches);
      }
    };

    updateMatch(); // TODO: Use `addEventListener` once support for Safari < 14 is dropped

    queryList.addListener(updateMatch);
    return () => {
      active = false;
      queryList.removeListener(updateMatch);
    };
  }, [query, matchMedia, supportMatchMedia]);
  return match;
} // eslint-disable-next-line no-useless-concat -- Workaround for https://github.com/webpack/webpack/issues/14814


const maybeReactUseSyncExternalStore = React['useSyncExternalStore' + ''];

function useMediaQueryNew(query, defaultMatches, matchMedia, ssrMatchMedia) {
  const getDefaultSnapshot = React.useCallback(() => defaultMatches, [defaultMatches]);
  const getServerSnapshot = React.useMemo(() => {
    if (ssrMatchMedia !== null) {
      const {
        matches
      } = ssrMatchMedia(query);
      return () => matches;
    }

    return getDefaultSnapshot;
  }, [getDefaultSnapshot, query, ssrMatchMedia]);
  const [getSnapshot, subscribe] = React.useMemo(() => {
    if (matchMedia === null) {
      return [getDefaultSnapshot, () => () => {}];
    }

    const mediaQueryList = matchMedia(query);
    return [() => mediaQueryList.matches, notify => {
      // TODO: Use `addEventListener` once support for Safari < 14 is dropped
      mediaQueryList.addListener(notify);
      return () => {
        mediaQueryList.removeListener(notify);
      };
    }];
  }, [getDefaultSnapshot, matchMedia, query]);
  const match = maybeReactUseSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return match;
}

function useMediaQuery(queryInput, options = {}) {
  const theme = useTheme$2(); // Wait for jsdom to support the match media feature.
  // All the browsers MUI support have this built-in.
  // This defensive check is here for simplicity.
  // Most of the time, the match media logic isn't central to people tests.

  const supportMatchMedia = typeof window !== 'undefined' && typeof window.matchMedia !== 'undefined';
  const {
    defaultMatches = false,
    matchMedia = supportMatchMedia ? window.matchMedia : null,
    ssrMatchMedia = null,
    noSsr
  } = getThemeProps({
    name: 'MuiUseMediaQuery',
    props: options,
    theme
  });

  if (process.env.NODE_ENV !== 'production') {
    if (typeof queryInput === 'function' && theme === null) {
      console.error(['MUI: The `query` argument provided is invalid.', 'You are providing a function without a theme in the context.', 'One of the parent elements needs to use a ThemeProvider.'].join('\n'));
    }
  }

  let query = typeof queryInput === 'function' ? queryInput(theme) : queryInput;
  query = query.replace(/^@media( ?)/m, ''); // TODO: Drop `useMediaQueryOld` and use  `use-sync-external-store` shim in `useMediaQueryNew` once the package is stable

  const useMediaQueryImplementation = maybeReactUseSyncExternalStore !== undefined ? useMediaQueryNew : useMediaQueryOld;
  const match = useMediaQueryImplementation(query, defaultMatches, matchMedia, ssrMatchMedia, noSsr);

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useDebugValue({
      query,
      match
    });
  }

  return match;
}

/**
* @component
*/
var MlNavigationTools = function (props) {
    var mapHook = useMap({
        mapId: props.mapId,
        waitForLayer: props.insertBeforeLayer,
    });
    var _a = useState(0), pitch = _a[0], setPitch = _a[1];
    var mediaIsMobile = useMediaQuery("(max-width:900px)");
    var buttonStyle = {
        minWidth: "20px",
        minHeight: "20px",
        width: mediaIsMobile ? "50px" : "30px",
        height: mediaIsMobile ? "50px" : "30px",
        backgroundColor: "#414141",
        borderRadius: "23%",
        //border: "1px solid #bbb",
        //boxShadow: "0px 0px 4px rgba(0,0,0,.5)",
        margin: 0.15,
        fontSize: mediaIsMobile ? "1.5em" : "1.2em",
        ":hover": {
            backgroundColor: "#515151",
        },
        color: "#ececec",
    };
    useEffect(function () {
        if (!mapHook.map)
            return;
        mapHook.map.on("pitchend", function () {
            if (!mapHook.map)
                return;
            setPitch(mapHook.map.map.getPitch());
        }, mapHook.componentId);
        setPitch(mapHook.map.map.getPitch());
    }, [mapHook.map, props.mapId]);
    var zoomIn = function () {
        if (!mapHook.map)
            return;
        if (mapHook.map.map.transform._zoom + 0.5 <=
            mapHook.map.map.transform._maxZoom) {
            mapHook.map.map.easeTo({ zoom: mapHook.map.map.transform._zoom + 0.5 });
        }
    };
    var zoomOut = function () {
        if (!mapHook.map)
            return;
        if (mapHook.map.map.transform._zoom - 0.5 >=
            mapHook.map.map.transform._minZoom) {
            mapHook.map.map.easeTo({ zoom: mapHook.map.map.transform._zoom - 0.5 });
        }
    };
    var adjustPitch = function () {
        if (!mapHook.map)
            return;
        var targetPitch = 60;
        if (mapHook.map.map.getPitch() !== 0) {
            targetPitch = 0;
        }
        mapHook.map.map.easeTo({ pitch: targetPitch });
    };
    return (React__default.createElement("div", { style: {
            zIndex: 501,
            position: "absolute",
            right: mediaIsMobile ? "15px" : "5px",
            bottom: mediaIsMobile ? "40px" : "20px",
            display: "flex",
            flexDirection: "column",
        } },
        React__default.createElement(MlNavigationCompass, { style: {
                width: "31px",
                position: "relative",
                height: mediaIsMobile ? "55px" : "45px",
                marginLeft: mediaIsMobile ? "3px" : "-5px",
                transform: mediaIsMobile ? "scale(1.6)" : "scale(1)",
            }, backgroundStyle: {
                boxShadow: "0px 0px 18px rgba(0,0,0,.5)",
            } }),
        React__default.createElement(Button$1, { sx: __assign(__assign({}, buttonStyle), { fontSize: mediaIsMobile ? '1.4em' : '1em', fontWeight: 600 }), onClick: adjustPitch }, pitch ? "2D" : "3D"),
        React__default.createElement(MlFollowGps, { style: __assign({}, (function (_a) {
                _a.color; var rest = __rest(_a, ["color"]);
                return rest;
            })(buttonStyle)) }),
        React__default.createElement(ButtonGroup$1, { orientation: "vertical", sx: {
                width: "50px",
                border: "none",
                Button: { minWidth: "20px !important", border: "none", padding: 0 },
                "Button:hover": { border: "none" },
            } },
            React__default.createElement(Button$1, { sx: __assign(__assign({}, buttonStyle), { color: "#ececec" }), onClick: zoomIn },
                React__default.createElement(default_1$3, { sx: { fontSize: mediaIsMobile ? "1.5em" : "1.2em" } })),
            React__default.createElement(Button$1, { sx: __assign(__assign({}, buttonStyle), { color: "#ececec" }), onClick: zoomOut },
                React__default.createElement(default_1$2, { sx: { fontSize: mediaIsMobile ? "1.5em" : "1.2em" } })))));
};

/**
 * Basic layer component that create a layer in a MapLibre-gl instance and keeps it updated according to it attribute configuration.
 *
 * @category Map components
 */
var MlLayer = function (props) {
    useLayer({
        idPrefix: 'MlLayer-',
        layerId: props.layerId,
        mapId: props.mapId,
        options: __assign({ type: "background", paint: {
                "background-color": "rgba(0,0,0,0)",
            } }, props.options),
        insertBeforeLayer: props.insertBeforeLayer,
    });
    return React__default.createElement(React__default.Fragment, null);
};

/**
 * Adds a vector-tile source and 0...n vector-tile-layers to the MapLibre instance referenced by
 * props.mapId
 *
 * @component
 */
var MlVectorTileLayer = function (props) {
    var mapHook = useMap({
        mapId: props.mapId,
        waitForLayer: props.insertBeforeLayer,
    });
    var layerIdsRef = useRef({});
    var layerId = useRef(props.layerId || "MlVectorTileLayer-" + mapHook.componentId);
    var layerPaintConfsRef = useRef({});
    var layerLayoutConfsRef = useRef({});
    var initializedRef = useRef(false);
    useEffect(function () {
        if (!mapHook.map || initializedRef.current)
            return;
        initializedRef.current = true;
        // Add the new layer to the openlayers instance once it is available
        mapHook.map.addSource(layerId.current, __assign({ type: "vector", tiles: [props.url], tileSize: 512, attribution: "" }, props.sourceOptions), mapHook.componentId);
        for (var key in props.layers) {
            var _layerId = layerId.current + "_" + key;
            layerIdsRef.current[key] = _layerId;
            mapHook.map.addLayer(__assign({ id: _layerId, source: layerId.current, type: "line", minzoom: 0, maxzoom: 22, layout: {}, paint: {
                    "line-opacity": 0.5,
                    "line-color": "rgb(80, 80, 80)",
                    "line-width": 2,
                } }, props.layers[key]), props.insertBeforeLayer, mapHook.componentId);
            layerPaintConfsRef.current[key] = JSON.stringify(props.layers[key].paint);
            layerLayoutConfsRef.current[key] = JSON.stringify(props.layers[key].layout);
        }
    }, [mapHook.map, props]);
    useEffect(function () {
        if (!mapHook.map || !initializedRef.current)
            return;
        // initialize the layer and add it to the MapLibre-gl instance or do something else with it
        for (var key in props.layers) {
            if (mapHook.map.map.getLayer(layerIdsRef.current[key])) {
                // update changed paint property
                var layerPaintConfString = JSON.stringify(props.layers[key].paint);
                if (layerPaintConfString !== layerPaintConfsRef.current[key]) {
                    for (var paintKey in props.layers[key].paint) {
                        mapHook.map.map.setPaintProperty(layerIdsRef.current[key], paintKey, props.layers[key].paint[paintKey]);
                    }
                }
                layerPaintConfsRef.current[key] = layerPaintConfString;
                // update changed layout property
                var layerLayoutConfString = JSON.stringify(props.layers[key].layout);
                if (layerLayoutConfString !== layerLayoutConfsRef.current[key]) {
                    for (var layoutKey in props.layers[key].layout) {
                        mapHook.map.map.setLayoutProperty(layerIdsRef.current[key], layoutKey, props.layers[key].layout[layoutKey]);
                    }
                }
                layerLayoutConfsRef.current[key] = layerLayoutConfString;
            }
        }
    }, [props.layers, mapHook.map]);
    return React__default.createElement(React__default.Fragment, null);
};
MlVectorTileLayer.propTypes = {
    /**
     * Id of the target MapLibre instance in mapContext
     */
    mapId: PropTypes.string,
    /**
     * Options object that will be used as first parameter on the MapLibreGl.addSource call see MapLibre source options documentation.
     */
    sourceOptions: PropTypes.object,
    /**
     * Object that hold layers
     */
    layers: PropTypes.object,
    /**
     * String of the URL of a wms layer
     */
    url: PropTypes.string,
};

var defaultProps = {
    visible: true,
    urlParameters: {
        bbox: "{bbox-epsg-3857}",
        format: "image/png",
        service: "WMS",
        version: "1.1.1",
        request: "GetMap",
        srs: "EPSG:3857",
        width: 256,
        height: 256,
        styles: "",
    },
    attribution: "",
    sourceOptions: {
        minZoom: 0,
        maxZoom: 20,
    },
    layerOptions: {
        minZoom: 0,
        maxZoom: 20,
    },
};
/**
 * Adds a WMS raster source & layer to the maplibre-gl instance
 *
 * @param {object} props
 * @param {object} props.urlParameters URL query parameters that will be added to the WMS URL. A layers property (string) is mandatory. Any value defined on this attribute will extend the default object
 * @param {string} props.url WMS URL
 * @param {bool}   props.visible Sets layer "visibility" property to "visible" if true or "none" if false
 * @param {string} props.attribution MapLibre attribution shown in the bottom right of the map, if this layer is visible
 * @param {string} props.mapId Id of the target MapLibre instance in mapContext
 * @param {object} props.sourceOptions Object that is passed to the MapLibre.addSource call as config option parameter
 * @param {object} props.layerOptions Object that is passed to the MapLibre.addLayer call as config option parameter
 * @param {string} props.insertBeforeLayer Id of an existing layer in the mapLibre instance to help specify the layer order
                                           This layer will be visually beneath the layer with the "insertBeforeLayer" id
 *
 * @component
 */
var MlWmsLayer = function (props) {
    var mapHook = useMap({
        mapId: props.mapId,
        waitForLayer: props.insertBeforeLayer,
    });
    var initializedRef = useRef(false);
    var layerId = useRef(props.layerId || "MlWmsLayer-" + mapHook.componentId);
    useEffect(function () {
        if (!mapHook.map || initializedRef.current)
            return;
        initializedRef.current = true;
        var _propsUrlParams;
        var _wmsUrl = props.url;
        if (props.url.indexOf("?") !== -1) {
            _propsUrlParams = props.url.split("?");
            _wmsUrl = _propsUrlParams[0];
        }
        var _urlParamsFromUrl = new URLSearchParams(_propsUrlParams === null || _propsUrlParams === void 0 ? void 0 : _propsUrlParams[1]);
        // first spread in default props manually to enable overriding a single parameter without replacing the whole default urlParameters object
        var urlParamsObj = __assign(__assign(__assign({}, defaultProps.urlParameters), Object.fromEntries(_urlParamsFromUrl)), props.urlParameters);
        var urlParams = new URLSearchParams(urlParamsObj);
        var urlParamsStr = decodeURIComponent(urlParams.toString()) +
            "".replace(/%2F/g, "/").replace(/%3A/g, ":");
        mapHook.map.addSource(layerId.current, __assign({ type: "raster", tiles: [_wmsUrl + "?" + urlParamsStr], tileSize: urlParamsObj.width, attribution: props.attribution }, props.sourceOptions), mapHook.componentId);
        mapHook.map.addLayer(__assign({ id: layerId.current, type: "raster", source: layerId.current }, props.layerOptions), props.insertBeforeLayer, mapHook.componentId);
        if (!props.visible) {
            mapHook.map.map.setLayoutProperty(layerId.current, "visibility", "none");
        }
    }, [mapHook, props]);
    useEffect(function () {
        if (!mapHook.map || !initializedRef.current)
            return;
        // toggle layer visibility by changing the layout object's visibility property
        if (props.visible) {
            mapHook.map.map.setLayoutProperty(layerId.current, "visibility", "visible");
        }
        else {
            mapHook.map.map.setLayoutProperty(layerId.current, "visibility", "none");
        }
    }, [props.visible, mapHook.map]);
    return React__default.createElement(React__default.Fragment, null);
};
MlWmsLayer.defaultProps = __assign({}, defaultProps);
MlWmsLayer.propTypes = {
    /**
     * WMS URL
     */
    url: PropTypes.string.isRequired,
    /**
     * URL query parameters that will be added to the WMS URL. A layers property (string) is mandatory. Any value defined on this attribute will extend the default object.
     */
    urlParameters: PropTypes.shape({
        layers: PropTypes.string.isRequired,
        bbox: PropTypes.string,
        format: PropTypes.string,
        service: PropTypes.string,
        version: PropTypes.string,
        request: PropTypes.string,
        srs: PropTypes.string,
        width: PropTypes.number,
        height: PropTypes.number,
    }),
    /**
     * Id of the target MapLibre instance in mapContext
     */
    mapId: PropTypes.string,
    /**
     * MapLibre attribution shown in the bottom right of the map, if this layer is visible
     */
    attribution: PropTypes.string,
    /**
     * Object that is passed to the MapLibre.addLayer call as config option parameter
     */
    layerOptions: PropTypes.object,
    /**
     * Object that is passed to the MapLibre.addSource call as config option parameter
     */
    sourceOptions: PropTypes.object,
    /**
     * Id of an existing layer in the mapLibre instance to help specify the layer order
     * This layer will be visually beneath the layer with the "insertBeforeLayer" id.
     */
    insertBeforeLayer: PropTypes.string,
    /**
     * Sets layer "visibility" property to "visible" if true or "none" if false
     */
    visible: PropTypes.bool,
};

/**
 *
 * Hides the MapLibreMap referenced by props.map2Id except for the "magnifier"-circle that reveals
 * the map and can be dragged around on top of the MapLibreMap referenced by props.map1Id
 */
var MlLayerMagnify = function (props) {
    var mapContext = useContext(MapContext);
    var syncMoveInitializedRef = useRef(false);
    var syncCleanupFunctionRef = useRef(function () { });
    var _a = useState('50'), swipeX = _a[0], setSwipeX = _a[1];
    var swipeXRef = useRef('50');
    var _b = useState('50'), swipeY = _b[0], setSwipeY = _b[1];
    var swipeYRef = useRef('50');
    var magnifierRadius = useMemo(function () {
        return props.magnifierRadius || 200;
    }, [props.magnifierRadius]);
    var mapExists = useCallback(function () {
        if (!props.map1Id || !props.map2Id) {
            return false;
        }
        if (!mapContext.getMap(props.map1Id) || !mapContext.getMap(props.map2Id)) {
            return false;
        }
        return true;
    }, [props, mapContext]);
    var onResize = useRef(function () {
        if (!mapExists())
            return;
        onMove({
            clientX: swipeXRef.current,
            clientY: swipeYRef.current,
        });
    });
    useEffect(function () {
        window.addEventListener("resize", onResize.current);
        var _onResize = onResize.current;
        return function () {
            window.removeEventListener("resize", _onResize);
            syncCleanupFunctionRef.current();
        };
    }, []);
    var onMove = useCallback(function (e) {
        if (!mapExists())
            return;
        var bounds = mapContext.maps[props.map1Id]
            .getCanvas()
            .getBoundingClientRect();
        var clientX = e.clientX ||
            (typeof e.touches !== "undefined" && typeof e.touches[0] !== "undefined"
                ? e.touches[0].clientX
                : 0);
        var clientY = e.clientY ||
            (typeof e.touches !== "undefined" && typeof e.touches[0] !== "undefined"
                ? e.touches[0].clientY
                : 0);
        clientX -= bounds.x;
        clientY -= bounds.y;
        var swipeX_tmp = ((clientX / bounds.width) * 100).toFixed(2);
        var swipeY_tmp = ((clientY / bounds.height) * 100).toFixed(2);
        if (swipeXRef.current !== swipeX_tmp ||
            swipeYRef.current !== swipeY_tmp) {
            setSwipeX(swipeX_tmp);
            swipeXRef.current = swipeX_tmp;
            setSwipeY(swipeY_tmp);
            swipeYRef.current = swipeY_tmp;
            mapContext.maps[props.map2Id].getContainer().style.clipPath =
                "circle(".concat(magnifierRadius, "px at ") +
                    (parseFloat(swipeXRef.current) * bounds.width) / 100 +
                    "px " +
                    (parseFloat(swipeYRef.current) * bounds.height) / 100 +
                    "px)";
        }
    }, [mapContext, mapExists, props, magnifierRadius]);
    useEffect(function () {
        if (!mapExists() || syncMoveInitializedRef.current)
            return;
        syncMoveInitializedRef.current = true;
        syncCleanupFunctionRef.current = syncMove(mapContext.getMap(props.map1Id).map, mapContext.getMap(props.map2Id).map);
        /*
        automatically adjust radius for small screens
        if (
          mapContext.maps[props.map1Id].getCanvas().clientWidth >
            mapContext.maps[props.map1Id].getCanvas().clientHeight &&
          magnifierRadius * 2 >
            mapContext.maps[props.map1Id].getCanvas().clientHeight
        ) {
          magnifierRadius = Math.floor(
            mapContext.maps[props.map1Id].getCanvas().clientHeight / 2
          );
          setMagnifierRadius(magnifierRadius);
        }
    
        if (
          mapContext.maps[props.map1Id].getCanvas().clientHeight >
            mapContext.maps[props.map1Id].getCanvas().clientWidth &&
          magnifierRadius * 2 >
            mapContext.maps[props.map1Id].getCanvas().clientWidth
        ) {
          magnifierRadius = Math.floor(
            mapContext.maps[props.map1Id].getCanvas().clientWidth / 2
          );
          setMagnifierRadius(magnifierRadius);
        }
        */
        onMove({
            clientX: mapContext.maps[props.map1Id].getCanvas().clientWidth / 2,
            clientY: mapContext.maps[props.map1Id].getCanvas().clientHeight / 2,
        });
    }, [mapContext.mapIds, mapContext, mapExists, props, onMove]);
    var onDown = function (e) {
        if (e.touches) {
            document.addEventListener("touchmove", onMove);
            document.addEventListener("touchend", onTouchEnd);
        }
        else {
            document.addEventListener("mousemove", onMove);
            document.addEventListener("mouseup", onMouseUp);
        }
    };
    var onTouchEnd = function () {
        document.removeEventListener("touchmove", onMove);
        document.removeEventListener("touchend", onTouchEnd);
    };
    var onMouseUp = function () {
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", onMouseUp);
    };
    var onWheel = function (e) {
        var evCopy = new WheelEvent(e.type, e);
        mapContext.map.getCanvas().dispatchEvent(evCopy);
    };
    return (React__default.createElement("div", { style: {
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
            userSelect: "none",
        }, onTouchStart: onDown, onMouseDown: onDown, onWheel: onWheel }));
};
MlLayerMagnify.defaultProps = {
    magnifierRadius: 200,
};

/**
 *  creates a split view of 2 synchronised maplibre instances
 */
var MlLayerSwipe = function (props) {
    var mapContext = useContext(MapContext);
    var initializedRef = useRef(false);
    var _a = useState(50), swipeX = _a[0], setSwipeX = _a[1];
    var swipeXRef = useRef(0);
    var syncCleanupFunctionRef = useRef(function () { });
    var mapExists = useCallback(function () {
        if (!props.map1Id || !props.map2Id) {
            return false;
        }
        if (!mapContext.getMap(props.map1Id) || !mapContext.getMap(props.map2Id)) {
            return false;
        }
        return true;
    }, [mapContext, props.map1Id, props.map2Id]);
    var cleanup = function () {
        syncCleanupFunctionRef.current();
    };
    var onMove = useCallback(function (e) {
        if (!mapExists())
            return;
        var bounds = mapContext.maps[props.map1Id]
            .getCanvas()
            .getBoundingClientRect();
        var clientX = e.clientX ||
            (typeof e.touches !== "undefined" && typeof e.touches[0] !== "undefined"
                ? e.touches[0].clientX
                : 0);
        clientX -= bounds.x;
        var swipeX_tmp = parseFloat(((clientX / bounds.width) * 100).toFixed(2));
        if (swipeXRef.current !== swipeX_tmp) {
            setSwipeX(swipeX_tmp);
            swipeXRef.current = swipeX_tmp;
            var clipA = "rect(0, " +
                (swipeXRef.current * bounds.width) / 100 +
                "px, 999em, 0)";
            mapContext.maps[props.map2Id].getContainer().style.clip = clipA;
        }
    }, [mapContext, mapExists, props.map1Id, props.map2Id]);
    useEffect(function () {
        return cleanup;
    }, []);
    useEffect(function () {
        if (!mapExists() || initializedRef.current)
            return;
        initializedRef.current = true;
        syncCleanupFunctionRef.current = syncMove(mapContext.getMap(props.map1Id).map, mapContext.getMap(props.map2Id).map);
        onMove({
            clientX: mapContext.maps[props.map1Id].getCanvas().clientWidth / 2,
        });
    }, [mapContext.mapIds, mapContext, props, onMove, mapExists]);
    var onDown = function (e) {
        if (e.touches) {
            document.addEventListener("touchmove", onMove);
            document.addEventListener("touchend", onTouchEnd);
        }
        else {
            document.addEventListener("mousemove", onMove);
            document.addEventListener("mouseup", onMouseUp);
        }
    };
    var onTouchEnd = function () {
        document.removeEventListener("touchmove", onMove);
        document.removeEventListener("touchend", onTouchEnd);
    };
    var onMouseUp = function () {
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", onMouseUp);
    };
    return (React__default.createElement("div", { style: {
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
            userSelect: "none",
        }, onTouchStart: onDown, onMouseDown: onDown }));
};

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }

  return target;
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
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

var _showNextTransitionSegment = function _showNextTransitionSegment(props, map, transitionInProgressRef, transitionGeojsonDataRef, transitionGeojsonCommonDataRef, currentTransitionStepRef, msPerStep, transitionTimeoutRef, setDisplayGeojson) {
  var _arguments = arguments;

  if (typeof transitionGeojsonDataRef.current[currentTransitionStepRef.current] !== "undefined") {
    // if at last transition step set to target geojson
    // else to an assembled LineString from common geometry and the current transition step geometry
    var newData = currentTransitionStepRef.current + 1 === transitionGeojsonDataRef.current.length ? props.geojson : turf.lineString([].concat(_toConsumableArray(transitionGeojsonCommonDataRef.current), _toConsumableArray(transitionGeojsonDataRef.current[currentTransitionStepRef.current].geometry.coordinates)));
    setDisplayGeojson(newData);

    if (typeof props.onTransitionFrame === "function") {
      props.onTransitionFrame(newData);
    }

    currentTransitionStepRef.current++;

    if (transitionInProgressRef.current && currentTransitionStepRef.current < transitionGeojsonDataRef.current.length) {
      transitionTimeoutRef.current = setTimeout(function () {
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

var _transitionToGeojson = function _transitionToGeojson(props, transitionGeojsonCommonDataRef, transitionGeojsonDataRef, transitionInProgressRef, oldGeojsonRef, msPerStep, currentTransitionStepRef, map, transitionTimeoutRef, setDisplayGeojson) {
  // create the transition geojson between oldGeojsonRef.current and props.geojson
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
  var targetGeojson = props.geojson;
  var longerGeojson = targetGeojson;
  var shorterGeojson = sourceGeojson;
  var reverseOrder = false; // In case one geojson is missing completely use the first two coordinates of the other geojson

  if (typeof longerGeojson.geometry === "undefined" && typeof shorterGeojson.geometry !== "undefined" && shorterGeojson.geometry.coordinates.length > 1) {
    longerGeojson = turf.lineString(shorterGeojson.geometry.coordinates.slice(0, 2));
  } else if (typeof shorterGeojson.geometry === "undefined" && typeof longerGeojson.geometry !== "undefined" && longerGeojson.geometry.coordinates.length > 1) {
    shorterGeojson = turf.lineString(longerGeojson.geometry.coordinates.slice(0, 2));
  } else if (typeof shorterGeojson.geometry === "undefined" && typeof longerGeojson.geometry === "undefined") {
    return;
  }

  if (longerGeojson.geometry.coordinates.length < shorterGeojson.geometry.coordinates.length) {
    longerGeojson = sourceGeojson;
    shorterGeojson = targetGeojson;
    reverseOrder = true;
  }

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
  var srcCoordinatesDistance = srcCoordinates.length > 1 ? Math.round(turf.length(turf.lineString(srcCoordinates))) : 0;
  var targetCoordinatesDistance = targetCoordinates.length > 1 ? Math.round(turf.length(turf.lineString(targetCoordinates))) : 0;
  var transitionDistance = targetCoordinatesDistance + srcCoordinatesDistance;
  var srcCoordinatesShare = srcCoordinatesDistance / transitionDistance;
  var srcTransitionSteps = Math.round(transitionSteps * srcCoordinatesShare);
  var srcPerStepDistance = Math.round(srcCoordinatesDistance / srcTransitionSteps * 100) / 100;
  var targetCoordinatesShare = targetCoordinatesDistance / transitionDistance;
  var targetTransitionSteps = Math.round(transitionSteps * targetCoordinatesShare);
  var targetPerStepDistance = Math.round(targetCoordinatesDistance / targetTransitionSteps * 100) / 100; // use srcPerStepDistance as src coordinates are always animated backwards


  var transitionStepData;
  transitionStepData = _toConsumableArray(createTransitionSteps(srcCoordinates, srcPerStepDistance, srcTransitionSteps));
  transitionStepData.reverse();
  transitionStepData = [].concat(_toConsumableArray(transitionStepData), _toConsumableArray(createTransitionSteps(targetCoordinates, targetPerStepDistance, targetTransitionSteps)));
  transitionStepData.push(targetGeojson);
  transitionGeojsonDataRef.current = transitionStepData;
  currentTransitionStepRef.current = 1;
  transitionInProgressRef.current = true;
  transitionTimeoutRef.current = setTimeout(function () {
    return _showNextTransitionSegment(props, map, transitionInProgressRef, transitionGeojsonDataRef, transitionGeojsonCommonDataRef, currentTransitionStepRef, msPerStep, transitionTimeoutRef, setDisplayGeojson);
  }, msPerStep);
};

var createTransitionSteps = function createTransitionSteps(linestringCoordinates, perStepDistance, stepCnt) {
  var transitionSteps = [];

  if (linestringCoordinates.length > 1) {
    var tmpChunks = turf.lineChunk(turf.lineString(linestringCoordinates), perStepDistance); // tmpLineString contains all coordinates of all previous plus current loop iteration

    var tmpLinestring = tmpChunks.features[0];

    for (var i = 0; i < stepCnt; i++) {
      transitionSteps.push(tmpLinestring);

      if (typeof tmpChunks.features[i] !== "undefined") {
        tmpLinestring = turf.lineString([].concat(_toConsumableArray(tmpLinestring.geometry.coordinates), _toConsumableArray(tmpChunks.features[i].geometry.coordinates)));
      } else {
        break;
      }
    }
  }

  return transitionSteps;
};

var msPerStep = 50;
/**
 * Adds source and layer of types "line", "fill" or "circle" to display GeoJSON data on the map.
 */
var MlTransitionGeoJsonLayer = function (props) {
    props.geojson; var restProps = __rest(props, ["geojson"]);
    var mapHook = useMap({
        mapId: props.mapId,
        waitForLayer: props.insertBeforeLayer,
    });
    var initializedRef = useRef(false);
    // transition effect variables
    var oldGeojsonRef = useRef();
    var transitionInProgressRef = useRef(false);
    var transitionTimeoutRef = useRef(undefined);
    var currentTransitionStepRef = useRef(false);
    var transitionGeojsonDataRef = useRef([]);
    var transitionGeojsonCommonDataRef = useRef([]);
    var _a = useState(turf.featureCollection([])), displayGeojson = _a[0], setDisplayGeojson = _a[1];
    useEffect(function () {
        return function () {
            // This is the cleanup function, it is called when this react component is removed from react-dom
            if (transitionTimeoutRef.current) {
                clearTimeout(transitionTimeoutRef.current);
            }
        };
    }, []);
    var transitionToGeojson = useCallback(function () {
        _transitionToGeojson(props, transitionGeojsonCommonDataRef, transitionGeojsonDataRef, transitionInProgressRef, oldGeojsonRef, msPerStep, currentTransitionStepRef, mapHook.map, transitionTimeoutRef, setDisplayGeojson);
    }, [props, mapHook.map]);
    useEffect(function () {
        if (!mapHook.map || !initializedRef.current)
            return;
        if (typeof props.transitionTime !== "undefined" &&
            props.type === "line" &&
            oldGeojsonRef.current) {
            transitionInProgressRef.current = false;
            currentTransitionStepRef.current = false;
            transitionGeojsonDataRef.current = [];
            transitionGeojsonCommonDataRef.current = [];
            transitionToGeojson();
        }
        oldGeojsonRef.current = props.geojson;
    }, [mapHook.map, transitionToGeojson, props]);
    var startTransition = useCallback(function () {
        if (props.type === "line" &&
            typeof props.transitionTime !== "undefined" &&
            props.transitionTime &&
            typeof props.geojson !== "undefined" &&
            JSON.stringify(oldGeojsonRef.current) !== JSON.stringify(props.geojson)) {
            transitionToGeojson();
            oldGeojsonRef.current = props.geojson;
        }
    }, [props, transitionToGeojson]);
    useEffect(function () {
        if (!mapHook.mapIsReady || !props.geojson)
            return;
        initializedRef.current = true;
        startTransition();
    }, [mapHook.mapIsReady, startTransition, props]);
    return (React__default.createElement(React__default.Fragment, null,
        React__default.createElement(MlGeoJsonLayer, __assign({}, restProps, { geojson: displayGeojson }))));
};

function useTheme() {
  const theme = useTheme$1(defaultTheme$1);

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useDebugValue(theme);
  }

  return theme;
}

function getPaperUtilityClass(slot) {
  return generateUtilityClass('MuiPaper', slot);
}
generateUtilityClasses('MuiPaper', ['root', 'rounded', 'outlined', 'elevation', 'elevation0', 'elevation1', 'elevation2', 'elevation3', 'elevation4', 'elevation5', 'elevation6', 'elevation7', 'elevation8', 'elevation9', 'elevation10', 'elevation11', 'elevation12', 'elevation13', 'elevation14', 'elevation15', 'elevation16', 'elevation17', 'elevation18', 'elevation19', 'elevation20', 'elevation21', 'elevation22', 'elevation23', 'elevation24']);

const _excluded$c = ["className", "component", "elevation", "square", "variant"];

const getOverlayAlpha = elevation => {
  let alphaValue;

  if (elevation < 1) {
    alphaValue = 5.11916 * elevation ** 2;
  } else {
    alphaValue = 4.5 * Math.log(elevation + 1) + 2;
  }

  return (alphaValue / 100).toFixed(2);
};

const useUtilityClasses$9 = ownerState => {
  const {
    square,
    elevation,
    variant,
    classes
  } = ownerState;
  const slots = {
    root: ['root', variant, !square && 'rounded', variant === 'elevation' && `elevation${elevation}`]
  };
  return composeClasses(slots, getPaperUtilityClass, classes);
};

const PaperRoot = styled$1('div', {
  name: 'MuiPaper',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, styles[ownerState.variant], !ownerState.square && styles.rounded, ownerState.variant === 'elevation' && styles[`elevation${ownerState.elevation}`]];
  }
})(({
  theme,
  ownerState
}) => _extends$3({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  transition: theme.transitions.create('box-shadow')
}, !ownerState.square && {
  borderRadius: theme.shape.borderRadius
}, ownerState.variant === 'outlined' && {
  border: `1px solid ${theme.palette.divider}`
}, ownerState.variant === 'elevation' && _extends$3({
  boxShadow: theme.shadows[ownerState.elevation]
}, theme.palette.mode === 'dark' && {
  backgroundImage: `linear-gradient(${alpha('#fff', getOverlayAlpha(ownerState.elevation))}, ${alpha('#fff', getOverlayAlpha(ownerState.elevation))})`
})));
const Paper = /*#__PURE__*/React.forwardRef(function Paper(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiPaper'
  });

  const {
    className,
    component = 'div',
    elevation = 1,
    square = false,
    variant = 'elevation'
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded$c);

  const ownerState = _extends$3({}, props, {
    component,
    elevation,
    square,
    variant
  });

  const classes = useUtilityClasses$9(ownerState);

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const theme = useTheme();

    if (theme.shadows[elevation] === undefined) {
      console.error([`MUI: The elevation provided <Paper elevation={${elevation}}> is not available in the theme.`, `Please make sure that \`theme.shadows[${elevation}]\` is defined.`].join('\n'));
    }
  }

  return /*#__PURE__*/jsxRuntime.exports.jsx(PaperRoot, _extends$3({
    as: component,
    ownerState: ownerState,
    className: clsx(classes.root, className),
    ref: ref
  }, other));
});
process.env.NODE_ENV !== "production" ? Paper.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The content of the component.
   */
  children: PropTypes.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,

  /**
   * Shadow depth, corresponds to `dp` in the spec.
   * It accepts values between 0 and 24 inclusive.
   * @default 1
   */
  elevation: chainPropTypes(integerPropType, props => {
    const {
      elevation,
      variant
    } = props;

    if (elevation > 0 && variant === 'outlined') {
      return new Error(`MUI: Combining \`elevation={${elevation}}\` with \`variant="${variant}"\` has no effect. Either use \`elevation={0}\` or use a different \`variant\`.`);
    }

    return null;
  }),

  /**
   * If `true`, rounded corners are disabled.
   * @default false
   */
  square: PropTypes.bool,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),

  /**
   * The variant to use.
   * @default 'elevation'
   */
  variant: PropTypes
  /* @typescript-to-proptypes-ignore */
  .oneOfType([PropTypes.oneOf(['elevation', 'outlined']), PropTypes.string])
} : void 0;
var Paper$1 = Paper;

/**
 * Adds a marker to the map and displays the contents of the "content" property in an iframe next to it
 */
var MlMarker = function (props) {
    var mapHook = useMap({
        mapId: props.mapId,
        waitForLayer: props.insertBeforeLayer,
    });
    var mapState = useMapState({
        mapId: props.mapId,
        watch: { viewport: true },
    });
    var iframe = useRef(null);
    var _a = useState({
        width: "400px",
        height: "500px",
    }), iframeDimensions = _a[0], setIframeDimensions = _a[1];
    var _b = useState(), markerPixelPos = _b[0], setMarkerPixelPos = _b[1];
    useEffect(function () {
        var _a, _b;
        if (!((_b = (_a = mapHook.map) === null || _a === void 0 ? void 0 : _a.map) === null || _b === void 0 ? void 0 : _b.project))
            return;
        var _pixelPos = mapHook.map.map.project([props.lng, props.lat]);
        setMarkerPixelPos(_pixelPos);
    }, [mapHook.map, props.lng, props.lat, mapState.viewport]);
    useEffect(function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        if (!mapHook.map ||
            !((_d = (_c = (_b = (_a = iframe.current) === null || _a === void 0 ? void 0 : _a.contentWindow) === null || _b === void 0 ? void 0 : _b.document) === null || _c === void 0 ? void 0 : _c.body) === null || _d === void 0 ? void 0 : _d.scrollHeight))
            return;
        var mapHeight = mapHook.map.map._container.clientHeight;
        var _pixelPos = mapHook.map.map.project([props.lng, props.lat]);
        var pixelToBottom = mapHeight - _pixelPos.y;
        var iframeHeight = (_h = (_g = (_f = (_e = iframe.current) === null || _e === void 0 ? void 0 : _e.contentWindow) === null || _f === void 0 ? void 0 : _f.document) === null || _g === void 0 ? void 0 : _g.body) === null || _h === void 0 ? void 0 : _h.scrollHeight;
        var iframeWidth = (_m = (_l = (_k = (_j = iframe.current) === null || _j === void 0 ? void 0 : _j.contentWindow) === null || _k === void 0 ? void 0 : _k.document) === null || _l === void 0 ? void 0 : _l.body) === null || _m === void 0 ? void 0 : _m.scrollWidth;
        setIframeDimensions({
            width: iframeWidth + "px",
            height: (pixelToBottom < iframeHeight ? pixelToBottom : iframeHeight) + "px",
        });
    }, [props.lng, props.lat, props.content]);
    return (React__default.createElement(React__default.Fragment, null,
        React__default.createElement(MlGeoJsonLayer, { geojson: {
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [props.lng, props.lat],
                },
                properties: {},
            }, paint: {
                "circle-radius": 14,
                "circle-color": "rgba(40,200,20,0.5)",
            }, type: "circle", mapId: props.mapId }),
        markerPixelPos && (React__default.createElement(Paper$1, { sx: {
                opacity: 0.7,
                position: "fixed",
                display: "flex",
                /** TODO: fix positioning delay when moving the map */
                left: markerPixelPos.x,
                top: markerPixelPos.y,
                width: iframeDimensions.width,
                height: iframeDimensions.height,
                "&:hover": {
                    opacity: 1,
                },
                zIndex: -1,
            } },
            React__default.createElement("iframe", { style: { width: "100%" }, srcDoc: props.content, ref: iframe, sandbox: "allow-same-origin allow-popups-to-escape-sandbox", frameBorder: "0", title: mapHook.componentId })))));
};
MlMarker.defaultProps = {
    mapId: undefined,
};

function getDividerUtilityClass(slot) {
  return generateUtilityClass('MuiDivider', slot);
}
generateUtilityClasses('MuiDivider', ['root', 'absolute', 'fullWidth', 'inset', 'middle', 'flexItem', 'light', 'vertical', 'withChildren', 'withChildrenVertical', 'textAlignRight', 'textAlignLeft', 'wrapper', 'wrapperVertical']);

const _excluded$b = ["absolute", "children", "className", "component", "flexItem", "light", "orientation", "role", "textAlign", "variant"];

const useUtilityClasses$8 = ownerState => {
  const {
    absolute,
    children,
    classes,
    flexItem,
    light,
    orientation,
    textAlign,
    variant
  } = ownerState;
  const slots = {
    root: ['root', absolute && 'absolute', variant, light && 'light', orientation === 'vertical' && 'vertical', flexItem && 'flexItem', children && 'withChildren', children && orientation === 'vertical' && 'withChildrenVertical', textAlign === 'right' && orientation !== 'vertical' && 'textAlignRight', textAlign === 'left' && orientation !== 'vertical' && 'textAlignLeft'],
    wrapper: ['wrapper', orientation === 'vertical' && 'wrapperVertical']
  };
  return composeClasses(slots, getDividerUtilityClass, classes);
};

const DividerRoot = styled$1('div', {
  name: 'MuiDivider',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, ownerState.absolute && styles.absolute, styles[ownerState.variant], ownerState.light && styles.light, ownerState.orientation === 'vertical' && styles.vertical, ownerState.flexItem && styles.flexItem, ownerState.children && styles.withChildren, ownerState.children && ownerState.orientation === 'vertical' && styles.withChildrenVertical, ownerState.textAlign === 'right' && ownerState.orientation !== 'vertical' && styles.textAlignRight, ownerState.textAlign === 'left' && ownerState.orientation !== 'vertical' && styles.textAlignLeft];
  }
})(({
  theme,
  ownerState
}) => _extends$3({
  margin: 0,
  // Reset browser default style.
  flexShrink: 0,
  borderWidth: 0,
  borderStyle: 'solid',
  borderColor: theme.palette.divider,
  borderBottomWidth: 'thin'
}, ownerState.absolute && {
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%'
}, ownerState.light && {
  borderColor: alpha(theme.palette.divider, 0.08)
}, ownerState.variant === 'inset' && {
  marginLeft: 72
}, ownerState.variant === 'middle' && ownerState.orientation === 'horizontal' && {
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2)
}, ownerState.variant === 'middle' && ownerState.orientation === 'vertical' && {
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1)
}, ownerState.orientation === 'vertical' && {
  height: '100%',
  borderBottomWidth: 0,
  borderRightWidth: 'thin'
}, ownerState.flexItem && {
  alignSelf: 'stretch',
  height: 'auto'
}), ({
  theme,
  ownerState
}) => _extends$3({}, ownerState.children && {
  display: 'flex',
  whiteSpace: 'nowrap',
  textAlign: 'center',
  border: 0,
  '&::before, &::after': {
    position: 'relative',
    width: '100%',
    borderTop: `thin solid ${theme.palette.divider}`,
    top: '50%',
    content: '""',
    transform: 'translateY(50%)'
  }
}), ({
  theme,
  ownerState
}) => _extends$3({}, ownerState.children && ownerState.orientation === 'vertical' && {
  flexDirection: 'column',
  '&::before, &::after': {
    height: '100%',
    top: '0%',
    left: '50%',
    borderTop: 0,
    borderLeft: `thin solid ${theme.palette.divider}`,
    transform: 'translateX(0%)'
  }
}), ({
  ownerState
}) => _extends$3({}, ownerState.textAlign === 'right' && ownerState.orientation !== 'vertical' && {
  '&::before': {
    width: '90%'
  },
  '&::after': {
    width: '10%'
  }
}, ownerState.textAlign === 'left' && ownerState.orientation !== 'vertical' && {
  '&::before': {
    width: '10%'
  },
  '&::after': {
    width: '90%'
  }
}));
const DividerWrapper = styled$1('span', {
  name: 'MuiDivider',
  slot: 'Wrapper',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.wrapper, ownerState.orientation === 'vertical' && styles.wrapperVertical];
  }
})(({
  theme,
  ownerState
}) => _extends$3({
  display: 'inline-block',
  paddingLeft: `calc(${theme.spacing(1)} * 1.2)`,
  paddingRight: `calc(${theme.spacing(1)} * 1.2)`
}, ownerState.orientation === 'vertical' && {
  paddingTop: `calc(${theme.spacing(1)} * 1.2)`,
  paddingBottom: `calc(${theme.spacing(1)} * 1.2)`
}));
const Divider = /*#__PURE__*/React.forwardRef(function Divider(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiDivider'
  });

  const {
    absolute = false,
    children,
    className,
    component = children ? 'div' : 'hr',
    flexItem = false,
    light = false,
    orientation = 'horizontal',
    role = component !== 'hr' ? 'separator' : undefined,
    textAlign = 'center',
    variant = 'fullWidth'
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded$b);

  const ownerState = _extends$3({}, props, {
    absolute,
    component,
    flexItem,
    light,
    orientation,
    role,
    textAlign,
    variant
  });

  const classes = useUtilityClasses$8(ownerState);
  return /*#__PURE__*/jsxRuntime.exports.jsx(DividerRoot, _extends$3({
    as: component,
    className: clsx(classes.root, className),
    role: role,
    ref: ref,
    ownerState: ownerState
  }, other, {
    children: children ? /*#__PURE__*/jsxRuntime.exports.jsx(DividerWrapper, {
      className: classes.wrapper,
      ownerState: ownerState,
      children: children
    }) : null
  }));
});
process.env.NODE_ENV !== "production" ? Divider.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * Absolutely position the element.
   * @default false
   */
  absolute: PropTypes.bool,

  /**
   * The content of the component.
   */
  children: PropTypes.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,

  /**
   * If `true`, a vertical divider will have the correct height when used in flex container.
   * (By default, a vertical divider will have a calculated height of `0px` if it is the child of a flex container.)
   * @default false
   */
  flexItem: PropTypes.bool,

  /**
   * If `true`, the divider will have a lighter color.
   * @default false
   */
  light: PropTypes.bool,

  /**
   * The component orientation.
   * @default 'horizontal'
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),

  /**
   * @ignore
   */
  role: PropTypes
  /* @typescript-to-proptypes-ignore */
  .string,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),

  /**
   * The text alignment.
   * @default 'center'
   */
  textAlign: PropTypes.oneOf(['center', 'left', 'right']),

  /**
   * The variant to use.
   * @default 'fullWidth'
   */
  variant: PropTypes
  /* @typescript-to-proptypes-ignore */
  .oneOfType([PropTypes.oneOf(['fullWidth', 'inset', 'middle']), PropTypes.string])
} : void 0;
var Divider$1 = Divider;

function getTypographyUtilityClass(slot) {
  return generateUtilityClass('MuiTypography', slot);
}
generateUtilityClasses('MuiTypography', ['root', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'inherit', 'button', 'caption', 'overline', 'alignLeft', 'alignRight', 'alignCenter', 'alignJustify', 'noWrap', 'gutterBottom', 'paragraph']);

const _excluded$a = ["align", "className", "component", "gutterBottom", "noWrap", "paragraph", "variant", "variantMapping"];

const useUtilityClasses$7 = ownerState => {
  const {
    align,
    gutterBottom,
    noWrap,
    paragraph,
    variant,
    classes
  } = ownerState;
  const slots = {
    root: ['root', variant, ownerState.align !== 'inherit' && `align${capitalize(align)}`, gutterBottom && 'gutterBottom', noWrap && 'noWrap', paragraph && 'paragraph']
  };
  return composeClasses(slots, getTypographyUtilityClass, classes);
};

const TypographyRoot = styled$1('span', {
  name: 'MuiTypography',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, ownerState.variant && styles[ownerState.variant], ownerState.align !== 'inherit' && styles[`align${capitalize(ownerState.align)}`], ownerState.noWrap && styles.noWrap, ownerState.gutterBottom && styles.gutterBottom, ownerState.paragraph && styles.paragraph];
  }
})(({
  theme,
  ownerState
}) => _extends$3({
  margin: 0
}, ownerState.variant && theme.typography[ownerState.variant], ownerState.align !== 'inherit' && {
  textAlign: ownerState.align
}, ownerState.noWrap && {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
}, ownerState.gutterBottom && {
  marginBottom: '0.35em'
}, ownerState.paragraph && {
  marginBottom: 16
}));
const defaultVariantMapping = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  subtitle1: 'h6',
  subtitle2: 'h6',
  body1: 'p',
  body2: 'p',
  inherit: 'p'
}; // TODO v6: deprecate these color values in v5.x and remove the transformation in v6

const colorTransformations = {
  primary: 'primary.main',
  textPrimary: 'text.primary',
  secondary: 'secondary.main',
  textSecondary: 'text.secondary',
  error: 'error.main'
};

const transformDeprecatedColors = color => {
  return colorTransformations[color] || color;
};

const Typography = /*#__PURE__*/React.forwardRef(function Typography(inProps, ref) {
  const themeProps = useThemeProps({
    props: inProps,
    name: 'MuiTypography'
  });
  const color = transformDeprecatedColors(themeProps.color);
  const props = extendSxProp(_extends$3({}, themeProps, {
    color
  }));

  const {
    align = 'inherit',
    className,
    component,
    gutterBottom = false,
    noWrap = false,
    paragraph = false,
    variant = 'body1',
    variantMapping = defaultVariantMapping
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded$a);

  const ownerState = _extends$3({}, props, {
    align,
    color,
    className,
    component,
    gutterBottom,
    noWrap,
    paragraph,
    variant,
    variantMapping
  });

  const Component = component || (paragraph ? 'p' : variantMapping[variant] || defaultVariantMapping[variant]) || 'span';
  const classes = useUtilityClasses$7(ownerState);
  return /*#__PURE__*/jsxRuntime.exports.jsx(TypographyRoot, _extends$3({
    as: Component,
    ref: ref,
    ownerState: ownerState,
    className: clsx(classes.root, className)
  }, other));
});
process.env.NODE_ENV !== "production" ? Typography.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * Set the text-align on the component.
   * @default 'inherit'
   */
  align: PropTypes.oneOf(['center', 'inherit', 'justify', 'left', 'right']),

  /**
   * The content of the component.
   */
  children: PropTypes.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,

  /**
   * If `true`, the text will have a bottom margin.
   * @default false
   */
  gutterBottom: PropTypes.bool,

  /**
   * If `true`, the text will not wrap, but instead will truncate with a text overflow ellipsis.
   *
   * Note that text overflow can only happen with block or inline-block level elements
   * (the element needs to have a width in order to overflow).
   * @default false
   */
  noWrap: PropTypes.bool,

  /**
   * If `true`, the element will be a paragraph element.
   * @default false
   */
  paragraph: PropTypes.bool,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),

  /**
   * Applies the theme typography styles.
   * @default 'body1'
   */
  variant: PropTypes
  /* @typescript-to-proptypes-ignore */
  .oneOfType([PropTypes.oneOf(['body1', 'body2', 'button', 'caption', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'inherit', 'overline', 'subtitle1', 'subtitle2']), PropTypes.string]),

  /**
   * The component maps the variant prop to a range of different HTML element types.
   * For instance, subtitle1 to `<h6>`.
   * If you wish to change that mapping, you can provide your own.
   * Alternatively, you can use the `component` prop.
   * @default {
   *   h1: 'h1',
   *   h2: 'h2',
   *   h3: 'h3',
   *   h4: 'h4',
   *   h5: 'h5',
   *   h6: 'h6',
   *   subtitle1: 'h6',
   *   subtitle2: 'h6',
   *   body1: 'p',
   *   body2: 'p',
   *   inherit: 'p',
   * }
   */
  variantMapping: PropTypes
  /* @typescript-to-proptypes-ignore */
  .object
} : void 0;
var Typography$1 = Typography;

const reflow = node => node.scrollTop;
function getTransitionProps(props, options) {
  var _style$transitionDura, _style$transitionTimi;

  const {
    timeout,
    easing,
    style = {}
  } = props;
  return {
    duration: (_style$transitionDura = style.transitionDuration) != null ? _style$transitionDura : typeof timeout === 'number' ? timeout : timeout[options.mode] || 0,
    easing: (_style$transitionTimi = style.transitionTimingFunction) != null ? _style$transitionTimi : typeof easing === 'object' ? easing[options.mode] : easing,
    delay: style.transitionDelay
  };
}

const _excluded$9 = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"];
const styles = {
  entering: {
    opacity: 1
  },
  entered: {
    opacity: 1
  }
};
/**
 * The Fade transition is used by the [Modal](/components/modal/) component.
 * It uses [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
 */

const Fade = /*#__PURE__*/React.forwardRef(function Fade(props, ref) {
  const theme = useTheme();
  const defaultTimeout = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen
  };

  const {
    addEndListener,
    appear = true,
    children,
    easing,
    in: inProp,
    onEnter,
    onEntered,
    onEntering,
    onExit,
    onExited,
    onExiting,
    style,
    timeout = defaultTimeout,
    // eslint-disable-next-line react/prop-types
    TransitionComponent = Transition$1
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded$9);
  const nodeRef = React.useRef(null);
  const foreignRef = useForkRef(children.ref, ref);
  const handleRef = useForkRef(nodeRef, foreignRef);

  const normalizedTransitionCallback = callback => maybeIsAppearing => {
    if (callback) {
      const node = nodeRef.current; // onEnterXxx and onExitXxx callbacks have a different arguments.length value.

      if (maybeIsAppearing === undefined) {
        callback(node);
      } else {
        callback(node, maybeIsAppearing);
      }
    }
  };

  const handleEntering = normalizedTransitionCallback(onEntering);
  const handleEnter = normalizedTransitionCallback((node, isAppearing) => {
    reflow(node); // So the animation always start from the start.

    const transitionProps = getTransitionProps({
      style,
      timeout,
      easing
    }, {
      mode: 'enter'
    });
    node.style.webkitTransition = theme.transitions.create('opacity', transitionProps);
    node.style.transition = theme.transitions.create('opacity', transitionProps);

    if (onEnter) {
      onEnter(node, isAppearing);
    }
  });
  const handleEntered = normalizedTransitionCallback(onEntered);
  const handleExiting = normalizedTransitionCallback(onExiting);
  const handleExit = normalizedTransitionCallback(node => {
    const transitionProps = getTransitionProps({
      style,
      timeout,
      easing
    }, {
      mode: 'exit'
    });
    node.style.webkitTransition = theme.transitions.create('opacity', transitionProps);
    node.style.transition = theme.transitions.create('opacity', transitionProps);

    if (onExit) {
      onExit(node);
    }
  });
  const handleExited = normalizedTransitionCallback(onExited);

  const handleAddEndListener = next => {
    if (addEndListener) {
      // Old call signature before `react-transition-group` implemented `nodeRef`
      addEndListener(nodeRef.current, next);
    }
  };

  return /*#__PURE__*/jsxRuntime.exports.jsx(TransitionComponent, _extends$3({
    appear: appear,
    in: inProp,
    nodeRef: nodeRef ,
    onEnter: handleEnter,
    onEntered: handleEntered,
    onEntering: handleEntering,
    onExit: handleExit,
    onExited: handleExited,
    onExiting: handleExiting,
    addEndListener: handleAddEndListener,
    timeout: timeout
  }, other, {
    children: (state, childProps) => {
      return /*#__PURE__*/React.cloneElement(children, _extends$3({
        style: _extends$3({
          opacity: 0,
          visibility: state === 'exited' && !inProp ? 'hidden' : undefined
        }, styles[state], style, children.props.style),
        ref: handleRef
      }, childProps));
    }
  }));
});
process.env.NODE_ENV !== "production" ? Fade.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * Add a custom transition end trigger. Called with the transitioning DOM
   * node and a done callback. Allows for more fine grained transition end
   * logic. Note: Timeouts are still used as a fallback if provided.
   */
  addEndListener: PropTypes.func,

  /**
   * Perform the enter transition when it first mounts if `in` is also `true`.
   * Set this to `false` to disable this behavior.
   * @default true
   */
  appear: PropTypes.bool,

  /**
   * A single child content element.
   */
  children: elementAcceptingRef$1.isRequired,

  /**
   * The transition timing function.
   * You may specify a single easing or a object containing enter and exit values.
   */
  easing: PropTypes.oneOfType([PropTypes.shape({
    enter: PropTypes.string,
    exit: PropTypes.string
  }), PropTypes.string]),

  /**
   * If `true`, the component will transition in.
   */
  in: PropTypes.bool,

  /**
   * @ignore
   */
  onEnter: PropTypes.func,

  /**
   * @ignore
   */
  onEntered: PropTypes.func,

  /**
   * @ignore
   */
  onEntering: PropTypes.func,

  /**
   * @ignore
   */
  onExit: PropTypes.func,

  /**
   * @ignore
   */
  onExited: PropTypes.func,

  /**
   * @ignore
   */
  onExiting: PropTypes.func,

  /**
   * @ignore
   */
  style: PropTypes.object,

  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   * @default {
   *   enter: theme.transitions.duration.enteringScreen,
   *   exit: theme.transitions.duration.leavingScreen,
   * }
   */
  timeout: PropTypes.oneOfType([PropTypes.number, PropTypes.shape({
    appear: PropTypes.number,
    enter: PropTypes.number,
    exit: PropTypes.number
  })])
} : void 0;
var Fade$1 = Fade;

function getBackdropUtilityClass(slot) {
  return generateUtilityClass('MuiBackdrop', slot);
}
generateUtilityClasses('MuiBackdrop', ['root', 'invisible']);

const _excluded$8 = ["children", "component", "components", "componentsProps", "className", "invisible", "open", "transitionDuration", "TransitionComponent"];

const useUtilityClasses$6 = ownerState => {
  const {
    classes,
    invisible
  } = ownerState;
  const slots = {
    root: ['root', invisible && 'invisible']
  };
  return composeClasses(slots, getBackdropUtilityClass, classes);
};

const BackdropRoot = styled$1('div', {
  name: 'MuiBackdrop',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, ownerState.invisible && styles.invisible];
  }
})(({
  ownerState
}) => _extends$3({
  position: 'fixed',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  right: 0,
  bottom: 0,
  top: 0,
  left: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  WebkitTapHighlightColor: 'transparent'
}, ownerState.invisible && {
  backgroundColor: 'transparent'
}));
const Backdrop = /*#__PURE__*/React.forwardRef(function Backdrop(inProps, ref) {
  var _components$Root, _componentsProps$root;

  const props = useThemeProps({
    props: inProps,
    name: 'MuiBackdrop'
  });

  const {
    children,
    component = 'div',
    components = {},
    componentsProps = {},
    className,
    invisible = false,
    open,
    transitionDuration,
    // eslint-disable-next-line react/prop-types
    TransitionComponent = Fade$1
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded$8);

  const ownerState = _extends$3({}, props, {
    component,
    invisible
  });

  const classes = useUtilityClasses$6(ownerState);
  return /*#__PURE__*/jsxRuntime.exports.jsx(TransitionComponent, _extends$3({
    in: open,
    timeout: transitionDuration
  }, other, {
    children: /*#__PURE__*/jsxRuntime.exports.jsx(BackdropRoot, {
      "aria-hidden": true,
      as: (_components$Root = components.Root) != null ? _components$Root : component,
      className: clsx(classes.root, className),
      ownerState: _extends$3({}, ownerState, (_componentsProps$root = componentsProps.root) == null ? void 0 : _componentsProps$root.ownerState),
      classes: classes,
      ref: ref,
      children: children
    })
  }));
});
process.env.NODE_ENV !== "production" ? Backdrop.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The content of the component.
   */
  children: PropTypes.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,

  /**
   * The components used for each slot inside the Backdrop.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: PropTypes.shape({
    Root: PropTypes.elementType
  }),

  /**
   * The props used for each slot inside the Backdrop.
   * @default {}
   */
  componentsProps: PropTypes.shape({
    root: PropTypes.object
  }),

  /**
   * If `true`, the backdrop is invisible.
   * It can be used when rendering a popover or a custom select component.
   * @default false
   */
  invisible: PropTypes.bool,

  /**
   * If `true`, the component is shown.
   */
  open: PropTypes.bool.isRequired,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),

  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  transitionDuration: PropTypes.oneOfType([PropTypes.number, PropTypes.shape({
    appear: PropTypes.number,
    enter: PropTypes.number,
    exit: PropTypes.number
  })])
} : void 0;
var Backdrop$1 = Backdrop;

const _excluded$7 = ["BackdropComponent", "closeAfterTransition", "children", "components", "componentsProps", "disableAutoFocus", "disableEnforceFocus", "disableEscapeKeyDown", "disablePortal", "disableRestoreFocus", "disableScrollLock", "hideBackdrop", "keepMounted"];

const extendUtilityClasses = ownerState => {
  return ownerState.classes;
};

const ModalRoot = styled$1('div', {
  name: 'MuiModal',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, !ownerState.open && ownerState.exited && styles.hidden];
  }
})(({
  theme,
  ownerState
}) => _extends$3({
  position: 'fixed',
  zIndex: theme.zIndex.modal,
  right: 0,
  bottom: 0,
  top: 0,
  left: 0
}, !ownerState.open && ownerState.exited && {
  visibility: 'hidden'
}));
const ModalBackdrop = styled$1(Backdrop$1, {
  name: 'MuiModal',
  slot: 'Backdrop',
  overridesResolver: (props, styles) => {
    return styles.backdrop;
  }
})({
  zIndex: -1
});
/**
 * Modal is a lower-level construct that is leveraged by the following components:
 *
 * - [Dialog](/api/dialog/)
 * - [Drawer](/api/drawer/)
 * - [Menu](/api/menu/)
 * - [Popover](/api/popover/)
 *
 * If you are creating a modal dialog, you probably want to use the [Dialog](/api/dialog/) component
 * rather than directly using Modal.
 *
 * This component shares many concepts with [react-overlays](https://react-bootstrap.github.io/react-overlays/#modals).
 */

const Modal = /*#__PURE__*/React.forwardRef(function Modal(inProps, ref) {
  var _componentsProps$root;

  const props = useThemeProps({
    name: 'MuiModal',
    props: inProps
  });

  const {
    BackdropComponent = ModalBackdrop,
    closeAfterTransition = false,
    children,
    components = {},
    componentsProps = {},
    disableAutoFocus = false,
    disableEnforceFocus = false,
    disableEscapeKeyDown = false,
    disablePortal = false,
    disableRestoreFocus = false,
    disableScrollLock = false,
    hideBackdrop = false,
    keepMounted = false
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded$7);

  const [exited, setExited] = React.useState(true);
  const commonProps = {
    closeAfterTransition,
    disableAutoFocus,
    disableEnforceFocus,
    disableEscapeKeyDown,
    disablePortal,
    disableRestoreFocus,
    disableScrollLock,
    hideBackdrop,
    keepMounted
  };

  const ownerState = _extends$3({}, props, commonProps, {
    exited
  });

  const classes = extendUtilityClasses(ownerState);
  return /*#__PURE__*/jsxRuntime.exports.jsx(ModalUnstyled$1, _extends$3({
    components: _extends$3({
      Root: ModalRoot
    }, components),
    componentsProps: {
      root: _extends$3({}, componentsProps.root, (!components.Root || !isHostComponent(components.Root)) && {
        ownerState: _extends$3({}, (_componentsProps$root = componentsProps.root) == null ? void 0 : _componentsProps$root.ownerState)
      })
    },
    BackdropComponent: BackdropComponent,
    onTransitionEnter: () => setExited(false),
    onTransitionExited: () => setExited(true),
    ref: ref
  }, other, {
    classes: classes
  }, commonProps, {
    children: children
  }));
});
process.env.NODE_ENV !== "production" ? Modal.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * A backdrop component. This prop enables custom backdrop rendering.
   * @default styled(Backdrop, {
   *   name: 'MuiModal',
   *   slot: 'Backdrop',
   *   overridesResolver: (props, styles) => {
   *     return styles.backdrop;
   *   },
   * })({
   *   zIndex: -1,
   * })
   */
  BackdropComponent: PropTypes.elementType,

  /**
   * Props applied to the [`Backdrop`](/api/backdrop/) element.
   */
  BackdropProps: PropTypes.object,

  /**
   * A single child content element.
   */
  children: elementAcceptingRef$1.isRequired,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * When set to true the Modal waits until a nested Transition is completed before closing.
   * @default false
   */
  closeAfterTransition: PropTypes.bool,

  /**
   * The components used for each slot inside the Modal.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: PropTypes.shape({
    Root: PropTypes.elementType
  }),

  /**
   * The props used for each slot inside the Modal.
   * @default {}
   */
  componentsProps: PropTypes.shape({
    root: PropTypes.object
  }),

  /**
   * An HTML element or function that returns one.
   * The `container` will have the portal children appended to it.
   *
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: PropTypes
  /* @typescript-to-proptypes-ignore */
  .oneOfType([HTMLElementType, PropTypes.func]),

  /**
   * If `true`, the modal will not automatically shift focus to itself when it opens, and
   * replace it to the last focused element when it closes.
   * This also works correctly with any modal children that have the `disableAutoFocus` prop.
   *
   * Generally this should never be set to `true` as it makes the modal less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableAutoFocus: PropTypes.bool,

  /**
   * If `true`, the modal will not prevent focus from leaving the modal while open.
   *
   * Generally this should never be set to `true` as it makes the modal less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableEnforceFocus: PropTypes.bool,

  /**
   * If `true`, hitting escape will not fire the `onClose` callback.
   * @default false
   */
  disableEscapeKeyDown: PropTypes.bool,

  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: PropTypes.bool,

  /**
   * If `true`, the modal will not restore focus to previously focused element once
   * modal is hidden or unmounted.
   * @default false
   */
  disableRestoreFocus: PropTypes.bool,

  /**
   * Disable the scroll lock behavior.
   * @default false
   */
  disableScrollLock: PropTypes.bool,

  /**
   * If `true`, the backdrop is not rendered.
   * @default false
   */
  hideBackdrop: PropTypes.bool,

  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Modal.
   * @default false
   */
  keepMounted: PropTypes.bool,

  /**
   * Callback fired when the backdrop is clicked.
   */
  onBackdropClick: PropTypes.func,

  /**
   * Callback fired when the component requests to be closed.
   * The `reason` parameter can optionally be used to control the response to `onClose`.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`.
   */
  onClose: PropTypes.func,

  /**
   * If `true`, the component is shown.
   */
  open: PropTypes.bool.isRequired,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object])
} : void 0;
var Modal$1 = Modal;

const _excluded$6 = ["addEndListener", "appear", "children", "container", "direction", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"];

function getTranslateValue(direction, node, resolvedContainer) {
  const rect = node.getBoundingClientRect();
  const containerRect = resolvedContainer && resolvedContainer.getBoundingClientRect();
  const containerWindow = ownerWindow(node);
  let transform;

  if (node.fakeTransform) {
    transform = node.fakeTransform;
  } else {
    const computedStyle = containerWindow.getComputedStyle(node);
    transform = computedStyle.getPropertyValue('-webkit-transform') || computedStyle.getPropertyValue('transform');
  }

  let offsetX = 0;
  let offsetY = 0;

  if (transform && transform !== 'none' && typeof transform === 'string') {
    const transformValues = transform.split('(')[1].split(')')[0].split(',');
    offsetX = parseInt(transformValues[4], 10);
    offsetY = parseInt(transformValues[5], 10);
  }

  if (direction === 'left') {
    if (containerRect) {
      return `translateX(${containerRect.right + offsetX - rect.left}px)`;
    }

    return `translateX(${containerWindow.innerWidth + offsetX - rect.left}px)`;
  }

  if (direction === 'right') {
    if (containerRect) {
      return `translateX(-${rect.right - containerRect.left - offsetX}px)`;
    }

    return `translateX(-${rect.left + rect.width - offsetX}px)`;
  }

  if (direction === 'up') {
    if (containerRect) {
      return `translateY(${containerRect.bottom + offsetY - rect.top}px)`;
    }

    return `translateY(${containerWindow.innerHeight + offsetY - rect.top}px)`;
  } // direction === 'down'


  if (containerRect) {
    return `translateY(-${rect.top - containerRect.top + rect.height - offsetY}px)`;
  }

  return `translateY(-${rect.top + rect.height - offsetY}px)`;
}

function resolveContainer(containerPropProp) {
  return typeof containerPropProp === 'function' ? containerPropProp() : containerPropProp;
}

function setTranslateValue(direction, node, containerProp) {
  const resolvedContainer = resolveContainer(containerProp);
  const transform = getTranslateValue(direction, node, resolvedContainer);

  if (transform) {
    node.style.webkitTransform = transform;
    node.style.transform = transform;
  }
}
/**
 * The Slide transition is used by the [Drawer](/components/drawers/) component.
 * It uses [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
 */

const Slide = /*#__PURE__*/React.forwardRef(function Slide(props, ref) {
  const theme = useTheme();
  const defaultEasing = {
    enter: theme.transitions.easing.easeOut,
    exit: theme.transitions.easing.sharp
  };
  const defaultTimeout = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen
  };

  const {
    addEndListener,
    appear = true,
    children,
    container: containerProp,
    direction = 'down',
    easing: easingProp = defaultEasing,
    in: inProp,
    onEnter,
    onEntered,
    onEntering,
    onExit,
    onExited,
    onExiting,
    style,
    timeout = defaultTimeout,
    // eslint-disable-next-line react/prop-types
    TransitionComponent = Transition$1
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded$6);

  const childrenRef = React.useRef(null);
  const handleRefIntermediary = useForkRef(children.ref, childrenRef);
  const handleRef = useForkRef(handleRefIntermediary, ref);

  const normalizedTransitionCallback = callback => isAppearing => {
    if (callback) {
      // onEnterXxx and onExitXxx callbacks have a different arguments.length value.
      if (isAppearing === undefined) {
        callback(childrenRef.current);
      } else {
        callback(childrenRef.current, isAppearing);
      }
    }
  };

  const handleEnter = normalizedTransitionCallback((node, isAppearing) => {
    setTranslateValue(direction, node, containerProp);
    reflow(node);

    if (onEnter) {
      onEnter(node, isAppearing);
    }
  });
  const handleEntering = normalizedTransitionCallback((node, isAppearing) => {
    const transitionProps = getTransitionProps({
      timeout,
      style,
      easing: easingProp
    }, {
      mode: 'enter'
    });
    node.style.webkitTransition = theme.transitions.create('-webkit-transform', _extends$3({}, transitionProps));
    node.style.transition = theme.transitions.create('transform', _extends$3({}, transitionProps));
    node.style.webkitTransform = 'none';
    node.style.transform = 'none';

    if (onEntering) {
      onEntering(node, isAppearing);
    }
  });
  const handleEntered = normalizedTransitionCallback(onEntered);
  const handleExiting = normalizedTransitionCallback(onExiting);
  const handleExit = normalizedTransitionCallback(node => {
    const transitionProps = getTransitionProps({
      timeout,
      style,
      easing: easingProp
    }, {
      mode: 'exit'
    });
    node.style.webkitTransition = theme.transitions.create('-webkit-transform', transitionProps);
    node.style.transition = theme.transitions.create('transform', transitionProps);
    setTranslateValue(direction, node, containerProp);

    if (onExit) {
      onExit(node);
    }
  });
  const handleExited = normalizedTransitionCallback(node => {
    // No need for transitions when the component is hidden
    node.style.webkitTransition = '';
    node.style.transition = '';

    if (onExited) {
      onExited(node);
    }
  });

  const handleAddEndListener = next => {
    if (addEndListener) {
      // Old call signature before `react-transition-group` implemented `nodeRef`
      addEndListener(childrenRef.current, next);
    }
  };

  const updatePosition = React.useCallback(() => {
    if (childrenRef.current) {
      setTranslateValue(direction, childrenRef.current, containerProp);
    }
  }, [direction, containerProp]);
  React.useEffect(() => {
    // Skip configuration where the position is screen size invariant.
    if (inProp || direction === 'down' || direction === 'right') {
      return undefined;
    }

    const handleResize = debounce(() => {
      if (childrenRef.current) {
        setTranslateValue(direction, childrenRef.current, containerProp);
      }
    });
    const containerWindow = ownerWindow(childrenRef.current);
    containerWindow.addEventListener('resize', handleResize);
    return () => {
      handleResize.clear();
      containerWindow.removeEventListener('resize', handleResize);
    };
  }, [direction, inProp, containerProp]);
  React.useEffect(() => {
    if (!inProp) {
      // We need to update the position of the drawer when the direction change and
      // when it's hidden.
      updatePosition();
    }
  }, [inProp, updatePosition]);
  return /*#__PURE__*/jsxRuntime.exports.jsx(TransitionComponent, _extends$3({
    nodeRef: childrenRef,
    onEnter: handleEnter,
    onEntered: handleEntered,
    onEntering: handleEntering,
    onExit: handleExit,
    onExited: handleExited,
    onExiting: handleExiting,
    addEndListener: handleAddEndListener,
    appear: appear,
    in: inProp,
    timeout: timeout
  }, other, {
    children: (state, childProps) => {
      return /*#__PURE__*/React.cloneElement(children, _extends$3({
        ref: handleRef,
        style: _extends$3({
          visibility: state === 'exited' && !inProp ? 'hidden' : undefined
        }, style, children.props.style)
      }, childProps));
    }
  }));
});
process.env.NODE_ENV !== "production" ? Slide.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * Add a custom transition end trigger. Called with the transitioning DOM
   * node and a done callback. Allows for more fine grained transition end
   * logic. Note: Timeouts are still used as a fallback if provided.
   */
  addEndListener: PropTypes.func,

  /**
   * Perform the enter transition when it first mounts if `in` is also `true`.
   * Set this to `false` to disable this behavior.
   * @default true
   */
  appear: PropTypes.bool,

  /**
   * A single child content element.
   */
  children: elementAcceptingRef$1.isRequired,

  /**
   * An HTML element, or a function that returns one.
   * It's used to set the container the Slide is transitioning from.
   */
  container: chainPropTypes(PropTypes.oneOfType([HTMLElementType, PropTypes.func]), props => {
    if (props.open) {
      const resolvedContainer = resolveContainer(props.container);

      if (resolvedContainer && resolvedContainer.nodeType === 1) {
        const box = resolvedContainer.getBoundingClientRect();

        if (process.env.NODE_ENV !== 'test' && box.top === 0 && box.left === 0 && box.right === 0 && box.bottom === 0) {
          return new Error(['MUI: The `container` prop provided to the component is invalid.', 'The anchor element should be part of the document layout.', "Make sure the element is present in the document or that it's not display none."].join('\n'));
        }
      } else if (!resolvedContainer || typeof resolvedContainer.getBoundingClientRect !== 'function' || resolvedContainer.contextElement != null && resolvedContainer.contextElement.nodeType !== 1) {
        return new Error(['MUI: The `container` prop provided to the component is invalid.', 'It should be an HTML element instance.'].join('\n'));
      }
    }

    return null;
  }),

  /**
   * Direction the child node will enter from.
   * @default 'down'
   */
  direction: PropTypes.oneOf(['down', 'left', 'right', 'up']),

  /**
   * The transition timing function.
   * You may specify a single easing or a object containing enter and exit values.
   * @default {
   *   enter: theme.transitions.easing.easeOut,
   *   exit: theme.transitions.easing.sharp,
   * }
   */
  easing: PropTypes.oneOfType([PropTypes.shape({
    enter: PropTypes.string,
    exit: PropTypes.string
  }), PropTypes.string]),

  /**
   * If `true`, the component will transition in.
   */
  in: PropTypes.bool,

  /**
   * @ignore
   */
  onEnter: PropTypes.func,

  /**
   * @ignore
   */
  onEntered: PropTypes.func,

  /**
   * @ignore
   */
  onEntering: PropTypes.func,

  /**
   * @ignore
   */
  onExit: PropTypes.func,

  /**
   * @ignore
   */
  onExited: PropTypes.func,

  /**
   * @ignore
   */
  onExiting: PropTypes.func,

  /**
   * @ignore
   */
  style: PropTypes.object,

  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   * @default {
   *   enter: theme.transitions.duration.enteringScreen,
   *   exit: theme.transitions.duration.leavingScreen,
   * }
   */
  timeout: PropTypes.oneOfType([PropTypes.number, PropTypes.shape({
    appear: PropTypes.number,
    enter: PropTypes.number,
    exit: PropTypes.number
  })])
} : void 0;
var Slide$1 = Slide;

function getDrawerUtilityClass(slot) {
  return generateUtilityClass('MuiDrawer', slot);
}
generateUtilityClasses('MuiDrawer', ['root', 'docked', 'paper', 'paperAnchorLeft', 'paperAnchorRight', 'paperAnchorTop', 'paperAnchorBottom', 'paperAnchorDockedLeft', 'paperAnchorDockedRight', 'paperAnchorDockedTop', 'paperAnchorDockedBottom', 'modal']);

const _excluded$5 = ["BackdropProps"],
      _excluded2$1 = ["anchor", "BackdropProps", "children", "className", "elevation", "hideBackdrop", "ModalProps", "onClose", "open", "PaperProps", "SlideProps", "TransitionComponent", "transitionDuration", "variant"];

const overridesResolver$1 = (props, styles) => {
  const {
    ownerState
  } = props;
  return [styles.root, (ownerState.variant === 'permanent' || ownerState.variant === 'persistent') && styles.docked, styles.modal];
};

const useUtilityClasses$5 = ownerState => {
  const {
    classes,
    anchor,
    variant
  } = ownerState;
  const slots = {
    root: ['root'],
    docked: [(variant === 'permanent' || variant === 'persistent') && 'docked'],
    modal: ['modal'],
    paper: ['paper', `paperAnchor${capitalize(anchor)}`, variant !== 'temporary' && `paperAnchorDocked${capitalize(anchor)}`]
  };
  return composeClasses(slots, getDrawerUtilityClass, classes);
};

const DrawerRoot = styled$1(Modal$1, {
  name: 'MuiDrawer',
  slot: 'Root',
  overridesResolver: overridesResolver$1
})(({
  theme
}) => ({
  zIndex: theme.zIndex.drawer
}));
const DrawerDockedRoot = styled$1('div', {
  shouldForwardProp: rootShouldForwardProp,
  name: 'MuiDrawer',
  slot: 'Docked',
  skipVariantsResolver: false,
  overridesResolver: overridesResolver$1
})({
  flex: '0 0 auto'
});
const DrawerPaper = styled$1(Paper$1, {
  name: 'MuiDrawer',
  slot: 'Paper',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.paper, styles[`paperAnchor${capitalize(ownerState.anchor)}`], ownerState.variant !== 'temporary' && styles[`paperAnchorDocked${capitalize(ownerState.anchor)}`]];
  }
})(({
  theme,
  ownerState
}) => _extends$3({
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  flex: '1 0 auto',
  zIndex: theme.zIndex.drawer,
  // Add iOS momentum scrolling for iOS < 13.0
  WebkitOverflowScrolling: 'touch',
  // temporary style
  position: 'fixed',
  top: 0,
  // We disable the focus ring for mouse, touch and keyboard users.
  // At some point, it would be better to keep it for keyboard users.
  // :focus-ring CSS pseudo-class will help.
  outline: 0
}, ownerState.anchor === 'left' && {
  left: 0
}, ownerState.anchor === 'top' && {
  top: 0,
  left: 0,
  right: 0,
  height: 'auto',
  maxHeight: '100%'
}, ownerState.anchor === 'right' && {
  right: 0
}, ownerState.anchor === 'bottom' && {
  top: 'auto',
  left: 0,
  bottom: 0,
  right: 0,
  height: 'auto',
  maxHeight: '100%'
}, ownerState.anchor === 'left' && ownerState.variant !== 'temporary' && {
  borderRight: `1px solid ${theme.palette.divider}`
}, ownerState.anchor === 'top' && ownerState.variant !== 'temporary' && {
  borderBottom: `1px solid ${theme.palette.divider}`
}, ownerState.anchor === 'right' && ownerState.variant !== 'temporary' && {
  borderLeft: `1px solid ${theme.palette.divider}`
}, ownerState.anchor === 'bottom' && ownerState.variant !== 'temporary' && {
  borderTop: `1px solid ${theme.palette.divider}`
}));
const oppositeDirection = {
  left: 'right',
  right: 'left',
  top: 'down',
  bottom: 'up'
};
function isHorizontal(anchor) {
  return ['left', 'right'].indexOf(anchor) !== -1;
}
function getAnchor(theme, anchor) {
  return theme.direction === 'rtl' && isHorizontal(anchor) ? oppositeDirection[anchor] : anchor;
}
/**
 * The props of the [Modal](/api/modal/) component are available
 * when `variant="temporary"` is set.
 */

const Drawer = /*#__PURE__*/React.forwardRef(function Drawer(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiDrawer'
  });
  const theme = useTheme();
  const defaultTransitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen
  };

  const {
    anchor: anchorProp = 'left',
    BackdropProps,
    children,
    className,
    elevation = 16,
    hideBackdrop = false,
    ModalProps: {
      BackdropProps: BackdropPropsProp
    } = {},
    onClose,
    open = false,
    PaperProps = {},
    SlideProps,
    // eslint-disable-next-line react/prop-types
    TransitionComponent = Slide$1,
    transitionDuration = defaultTransitionDuration,
    variant = 'temporary'
  } = props,
        ModalProps = _objectWithoutPropertiesLoose(props.ModalProps, _excluded$5),
        other = _objectWithoutPropertiesLoose(props, _excluded2$1); // Let's assume that the Drawer will always be rendered on user space.
  // We use this state is order to skip the appear transition during the
  // initial mount of the component.


  const mounted = React.useRef(false);
  React.useEffect(() => {
    mounted.current = true;
  }, []);
  const anchorInvariant = getAnchor(theme, anchorProp);
  const anchor = anchorProp;

  const ownerState = _extends$3({}, props, {
    anchor,
    elevation,
    open,
    variant
  }, other);

  const classes = useUtilityClasses$5(ownerState);

  const drawer = /*#__PURE__*/jsxRuntime.exports.jsx(DrawerPaper, _extends$3({
    elevation: variant === 'temporary' ? elevation : 0,
    square: true
  }, PaperProps, {
    className: clsx(classes.paper, PaperProps.className),
    ownerState: ownerState,
    children: children
  }));

  if (variant === 'permanent') {
    return /*#__PURE__*/jsxRuntime.exports.jsx(DrawerDockedRoot, _extends$3({
      className: clsx(classes.root, classes.docked, className),
      ownerState: ownerState,
      ref: ref
    }, other, {
      children: drawer
    }));
  }

  const slidingDrawer = /*#__PURE__*/jsxRuntime.exports.jsx(TransitionComponent, _extends$3({
    in: open,
    direction: oppositeDirection[anchorInvariant],
    timeout: transitionDuration,
    appear: mounted.current
  }, SlideProps, {
    children: drawer
  }));

  if (variant === 'persistent') {
    return /*#__PURE__*/jsxRuntime.exports.jsx(DrawerDockedRoot, _extends$3({
      className: clsx(classes.root, classes.docked, className),
      ownerState: ownerState,
      ref: ref
    }, other, {
      children: slidingDrawer
    }));
  } // variant === temporary


  return /*#__PURE__*/jsxRuntime.exports.jsx(DrawerRoot, _extends$3({
    BackdropProps: _extends$3({}, BackdropProps, BackdropPropsProp, {
      transitionDuration
    }),
    className: clsx(classes.root, classes.modal, className),
    open: open,
    ownerState: ownerState,
    onClose: onClose,
    hideBackdrop: hideBackdrop,
    ref: ref
  }, other, ModalProps, {
    children: slidingDrawer
  }));
});
process.env.NODE_ENV !== "production" ? Drawer.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * Side from which the drawer will appear.
   * @default 'left'
   */
  anchor: PropTypes.oneOf(['bottom', 'left', 'right', 'top']),

  /**
   * @ignore
   */
  BackdropProps: PropTypes.object,

  /**
   * The content of the component.
   */
  children: PropTypes.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * The elevation of the drawer.
   * @default 16
   */
  elevation: integerPropType,

  /**
   * If `true`, the backdrop is not rendered.
   * @default false
   */
  hideBackdrop: PropTypes.bool,

  /**
   * Props applied to the [`Modal`](/api/modal/) element.
   * @default {}
   */
  ModalProps: PropTypes.object,

  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   */
  onClose: PropTypes.func,

  /**
   * If `true`, the component is shown.
   * @default false
   */
  open: PropTypes.bool,

  /**
   * Props applied to the [`Paper`](/api/paper/) element.
   * @default {}
   */
  PaperProps: PropTypes.object,

  /**
   * Props applied to the [`Slide`](/api/slide/) element.
   */
  SlideProps: PropTypes.object,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),

  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   * @default {
   *   enter: theme.transitions.duration.enteringScreen,
   *   exit: theme.transitions.duration.leavingScreen,
   * }
   */
  transitionDuration: PropTypes.oneOfType([PropTypes.number, PropTypes.shape({
    appear: PropTypes.number,
    enter: PropTypes.number,
    exit: PropTypes.number
  })]),

  /**
   * The variant to use.
   * @default 'temporary'
   */
  variant: PropTypes.oneOf(['permanent', 'persistent', 'temporary'])
} : void 0;
var Drawer$1 = Drawer;

function getIconButtonUtilityClass(slot) {
  return generateUtilityClass('MuiIconButton', slot);
}
const iconButtonClasses = generateUtilityClasses('MuiIconButton', ['root', 'disabled', 'colorInherit', 'colorPrimary', 'colorSecondary', 'edgeStart', 'edgeEnd', 'sizeSmall', 'sizeMedium', 'sizeLarge']);
var iconButtonClasses$1 = iconButtonClasses;

const _excluded$4 = ["edge", "children", "className", "color", "disabled", "disableFocusRipple", "size"];

const useUtilityClasses$4 = ownerState => {
  const {
    classes,
    disabled,
    color,
    edge,
    size
  } = ownerState;
  const slots = {
    root: ['root', disabled && 'disabled', color !== 'default' && `color${capitalize(color)}`, edge && `edge${capitalize(edge)}`, `size${capitalize(size)}`]
  };
  return composeClasses(slots, getIconButtonUtilityClass, classes);
};

const IconButtonRoot = styled$1(ButtonBase$1, {
  name: 'MuiIconButton',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, ownerState.color !== 'default' && styles[`color${capitalize(ownerState.color)}`], ownerState.edge && styles[`edge${capitalize(ownerState.edge)}`], styles[`size${capitalize(ownerState.size)}`]];
  }
})(({
  theme,
  ownerState
}) => _extends$3({
  textAlign: 'center',
  flex: '0 0 auto',
  fontSize: theme.typography.pxToRem(24),
  padding: 8,
  borderRadius: '50%',
  overflow: 'visible',
  // Explicitly set the default value to solve a bug on IE11.
  color: theme.palette.action.active,
  transition: theme.transitions.create('background-color', {
    duration: theme.transitions.duration.shortest
  })
}, !ownerState.disableRipple && {
  '&:hover': {
    backgroundColor: alpha(theme.palette.action.active, theme.palette.action.hoverOpacity),
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      backgroundColor: 'transparent'
    }
  }
}, ownerState.edge === 'start' && {
  marginLeft: ownerState.size === 'small' ? -3 : -12
}, ownerState.edge === 'end' && {
  marginRight: ownerState.size === 'small' ? -3 : -12
}), ({
  theme,
  ownerState
}) => _extends$3({}, ownerState.color === 'inherit' && {
  color: 'inherit'
}, ownerState.color !== 'inherit' && ownerState.color !== 'default' && _extends$3({
  color: theme.palette[ownerState.color].main
}, !ownerState.disableRipple && {
  '&:hover': {
    backgroundColor: alpha(theme.palette[ownerState.color].main, theme.palette.action.hoverOpacity),
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      backgroundColor: 'transparent'
    }
  }
}), ownerState.size === 'small' && {
  padding: 5,
  fontSize: theme.typography.pxToRem(18)
}, ownerState.size === 'large' && {
  padding: 12,
  fontSize: theme.typography.pxToRem(28)
}, {
  [`&.${iconButtonClasses$1.disabled}`]: {
    backgroundColor: 'transparent',
    color: theme.palette.action.disabled
  }
}));
/**
 * Refer to the [Icons](/components/icons/) section of the documentation
 * regarding the available icon options.
 */

const IconButton = /*#__PURE__*/React.forwardRef(function IconButton(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiIconButton'
  });

  const {
    edge = false,
    children,
    className,
    color = 'default',
    disabled = false,
    disableFocusRipple = false,
    size = 'medium'
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded$4);

  const ownerState = _extends$3({}, props, {
    edge,
    color,
    disabled,
    disableFocusRipple,
    size
  });

  const classes = useUtilityClasses$4(ownerState);
  return /*#__PURE__*/jsxRuntime.exports.jsx(IconButtonRoot, _extends$3({
    className: clsx(classes.root, className),
    centerRipple: true,
    focusRipple: !disableFocusRipple,
    disabled: disabled,
    ref: ref,
    ownerState: ownerState
  }, other, {
    children: children
  }));
});
process.env.NODE_ENV !== "production" ? IconButton.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The icon to display.
   */
  children: chainPropTypes(PropTypes.node, props => {
    const found = React.Children.toArray(props.children).some(child => /*#__PURE__*/React.isValidElement(child) && child.props.onClick);

    if (found) {
      return new Error(['MUI: You are providing an onClick event listener to a child of a button element.', 'Prefer applying it to the IconButton directly.', 'This guarantees that the whole <button> will be responsive to click events.'].join('\n'));
    }

    return null;
  }),

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/customization/palette/#adding-new-colors).
   * @default 'default'
   */
  color: PropTypes
  /* @typescript-to-proptypes-ignore */
  .oneOfType([PropTypes.oneOf(['inherit', 'default', 'primary', 'secondary', 'error', 'info', 'success', 'warning']), PropTypes.string]),

  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,

  /**
   * If `true`, the  keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple: PropTypes.bool,

  /**
   * If `true`, the ripple effect is disabled.
   *
   * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
   * to highlight the element by applying separate styles with the `.Mui-focusVisible` class.
   * @default false
   */
  disableRipple: PropTypes.bool,

  /**
   * If given, uses a negative margin to counteract the padding on one
   * side (this is often helpful for aligning the left or right
   * side of the icon with content above or below, without ruining the border
   * size and shape).
   * @default false
   */
  edge: PropTypes.oneOf(['end', 'start', false]),

  /**
   * The size of the component.
   * `small` is equivalent to the dense button styling.
   * @default 'medium'
   */
  size: PropTypes
  /* @typescript-to-proptypes-ignore */
  .oneOfType([PropTypes.oneOf(['small', 'medium', 'large']), PropTypes.string]),

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object])
} : void 0;
var IconButton$1 = IconButton;

var Info = {};

var _interopRequireDefault$1 = interopRequireDefault.exports;

Object.defineProperty(Info, "__esModule", {
  value: true
});
var default_1$1 = Info.default = void 0;

var _createSvgIcon$1 = _interopRequireDefault$1(createSvgIcon$1);

var _jsxRuntime$1 = jsxRuntime.exports;

var _default$1 = (0, _createSvgIcon$1.default)( /*#__PURE__*/(0, _jsxRuntime$1.jsx)("path", {
  d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
}), 'Info');

default_1$1 = Info.default = _default$1;

var FileCopy = {};

var _interopRequireDefault = interopRequireDefault.exports;

Object.defineProperty(FileCopy, "__esModule", {
  value: true
});
var default_1 = FileCopy.default = void 0;

var _createSvgIcon = _interopRequireDefault(createSvgIcon$1);

var _jsxRuntime = jsxRuntime.exports;

var _default = (0, _createSvgIcon.default)( /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
  d: "M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm-1 4 6 6v10c0 1.1-.9 2-2 2H7.99C6.89 23 6 22.1 6 21l.01-14c0-1.1.89-2 1.99-2h7zm-1 7h5.5L14 6.5V12z"
}), 'FileCopy');

default_1 = FileCopy.default = _default;

/**
 * @ignore - internal component.
 */

const ListContext = /*#__PURE__*/React.createContext({});

if (process.env.NODE_ENV !== 'production') {
  ListContext.displayName = 'ListContext';
}

var ListContext$1 = ListContext;

function getListUtilityClass(slot) {
  return generateUtilityClass('MuiList', slot);
}
generateUtilityClasses('MuiList', ['root', 'padding', 'dense', 'subheader']);

const _excluded$3 = ["children", "className", "component", "dense", "disablePadding", "subheader"];

const useUtilityClasses$3 = ownerState => {
  const {
    classes,
    disablePadding,
    dense,
    subheader
  } = ownerState;
  const slots = {
    root: ['root', !disablePadding && 'padding', dense && 'dense', subheader && 'subheader']
  };
  return composeClasses(slots, getListUtilityClass, classes);
};

const ListRoot = styled$1('ul', {
  name: 'MuiList',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, !ownerState.disablePadding && styles.padding, ownerState.dense && styles.dense, ownerState.subheader && styles.subheader];
  }
})(({
  ownerState
}) => _extends$3({
  listStyle: 'none',
  margin: 0,
  padding: 0,
  position: 'relative'
}, !ownerState.disablePadding && {
  paddingTop: 8,
  paddingBottom: 8
}, ownerState.subheader && {
  paddingTop: 0
}));
const List = /*#__PURE__*/React.forwardRef(function List(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiList'
  });

  const {
    children,
    className,
    component = 'ul',
    dense = false,
    disablePadding = false,
    subheader
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded$3);

  const context = React.useMemo(() => ({
    dense
  }), [dense]);

  const ownerState = _extends$3({}, props, {
    component,
    dense,
    disablePadding
  });

  const classes = useUtilityClasses$3(ownerState);
  return /*#__PURE__*/jsxRuntime.exports.jsx(ListContext$1.Provider, {
    value: context,
    children: /*#__PURE__*/jsxRuntime.exports.jsxs(ListRoot, _extends$3({
      as: component,
      className: clsx(classes.root, className),
      ref: ref,
      ownerState: ownerState
    }, other, {
      children: [subheader, children]
    }))
  });
});
process.env.NODE_ENV !== "production" ? List.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The content of the component.
   */
  children: PropTypes.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,

  /**
   * If `true`, compact vertical padding designed for keyboard and mouse input is used for
   * the list and list items.
   * The prop is available to descendant components as the `dense` context.
   * @default false
   */
  dense: PropTypes.bool,

  /**
   * If `true`, vertical padding is removed from the list.
   * @default false
   */
  disablePadding: PropTypes.bool,

  /**
   * The content of the subheader, normally `ListSubheader`.
   */
  subheader: PropTypes.node,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object])
} : void 0;
var List$1 = List;

function getListItemUtilityClass(slot) {
  return generateUtilityClass('MuiListItem', slot);
}
const listItemClasses = generateUtilityClasses('MuiListItem', ['root', 'container', 'focusVisible', 'dense', 'alignItemsFlexStart', 'disabled', 'divider', 'gutters', 'padding', 'button', 'secondaryAction', 'selected']);
var listItemClasses$1 = listItemClasses;

const listItemButtonClasses = generateUtilityClasses('MuiListItemButton', ['root', 'focusVisible', 'dense', 'alignItemsFlexStart', 'disabled', 'divider', 'gutters', 'selected']);
var listItemButtonClasses$1 = listItemButtonClasses;

function getListItemSecondaryActionClassesUtilityClass(slot) {
  return generateUtilityClass('MuiListItemSecondaryAction', slot);
}
generateUtilityClasses('MuiListItemSecondaryAction', ['root', 'disableGutters']);

const _excluded$2 = ["className"];

const useUtilityClasses$2 = ownerState => {
  const {
    disableGutters,
    classes
  } = ownerState;
  const slots = {
    root: ['root', disableGutters && 'disableGutters']
  };
  return composeClasses(slots, getListItemSecondaryActionClassesUtilityClass, classes);
};

const ListItemSecondaryActionRoot = styled$1('div', {
  name: 'MuiListItemSecondaryAction',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, ownerState.disableGutters && styles.disableGutters];
  }
})(({
  ownerState
}) => _extends$3({
  position: 'absolute',
  right: 16,
  top: '50%',
  transform: 'translateY(-50%)'
}, ownerState.disableGutters && {
  right: 0
}));
/**
 * Must be used as the last child of ListItem to function properly.
 */

const ListItemSecondaryAction = /*#__PURE__*/React.forwardRef(function ListItemSecondaryAction(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiListItemSecondaryAction'
  });

  const {
    className
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded$2);

  const context = React.useContext(ListContext$1);

  const ownerState = _extends$3({}, props, {
    disableGutters: context.disableGutters
  });

  const classes = useUtilityClasses$2(ownerState);
  return /*#__PURE__*/jsxRuntime.exports.jsx(ListItemSecondaryActionRoot, _extends$3({
    className: clsx(classes.root, className),
    ownerState: ownerState,
    ref: ref
  }, other));
});
process.env.NODE_ENV !== "production" ? ListItemSecondaryAction.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The content of the component, normally an `IconButton` or selection control.
   */
  children: PropTypes.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object])
} : void 0;
ListItemSecondaryAction.muiName = 'ListItemSecondaryAction';
var ListItemSecondaryAction$1 = ListItemSecondaryAction;

const _excluded$1 = ["className"],
      _excluded2 = ["alignItems", "autoFocus", "button", "children", "className", "component", "components", "componentsProps", "ContainerComponent", "ContainerProps", "dense", "disabled", "disableGutters", "disablePadding", "divider", "focusVisibleClassName", "secondaryAction", "selected"];
const overridesResolver = (props, styles) => {
  const {
    ownerState
  } = props;
  return [styles.root, ownerState.dense && styles.dense, ownerState.alignItems === 'flex-start' && styles.alignItemsFlexStart, ownerState.divider && styles.divider, !ownerState.disableGutters && styles.gutters, !ownerState.disablePadding && styles.padding, ownerState.button && styles.button, ownerState.hasSecondaryAction && styles.secondaryAction];
};

const useUtilityClasses$1 = ownerState => {
  const {
    alignItems,
    button,
    classes,
    dense,
    disabled,
    disableGutters,
    disablePadding,
    divider,
    hasSecondaryAction,
    selected
  } = ownerState;
  const slots = {
    root: ['root', dense && 'dense', !disableGutters && 'gutters', !disablePadding && 'padding', divider && 'divider', disabled && 'disabled', button && 'button', alignItems === 'flex-start' && 'alignItemsFlexStart', hasSecondaryAction && 'secondaryAction', selected && 'selected'],
    container: ['container']
  };
  return composeClasses(slots, getListItemUtilityClass, classes);
};

const ListItemRoot = styled$1('div', {
  name: 'MuiListItem',
  slot: 'Root',
  overridesResolver
})(({
  theme,
  ownerState
}) => _extends$3({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  position: 'relative',
  textDecoration: 'none',
  width: '100%',
  boxSizing: 'border-box',
  textAlign: 'left'
}, !ownerState.disablePadding && _extends$3({
  paddingTop: 8,
  paddingBottom: 8
}, ownerState.dense && {
  paddingTop: 4,
  paddingBottom: 4
}, !ownerState.disableGutters && {
  paddingLeft: 16,
  paddingRight: 16
}, !!ownerState.secondaryAction && {
  // Add some space to avoid collision as `ListItemSecondaryAction`
  // is absolutely positioned.
  paddingRight: 48
}), !!ownerState.secondaryAction && {
  [`& > .${listItemButtonClasses$1.root}`]: {
    paddingRight: 48
  }
}, {
  [`&.${listItemClasses$1.focusVisible}`]: {
    backgroundColor: theme.palette.action.focus
  },
  [`&.${listItemClasses$1.selected}`]: {
    backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
    [`&.${listItemClasses$1.focusVisible}`]: {
      backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity)
    }
  },
  [`&.${listItemClasses$1.disabled}`]: {
    opacity: theme.palette.action.disabledOpacity
  }
}, ownerState.alignItems === 'flex-start' && {
  alignItems: 'flex-start'
}, ownerState.divider && {
  borderBottom: `1px solid ${theme.palette.divider}`,
  backgroundClip: 'padding-box'
}, ownerState.button && {
  transition: theme.transitions.create('background-color', {
    duration: theme.transitions.duration.shortest
  }),
  '&:hover': {
    textDecoration: 'none',
    backgroundColor: theme.palette.action.hover,
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      backgroundColor: 'transparent'
    }
  },
  [`&.${listItemClasses$1.selected}:hover`]: {
    backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity),
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity)
    }
  }
}, ownerState.hasSecondaryAction && {
  // Add some space to avoid collision as `ListItemSecondaryAction`
  // is absolutely positioned.
  paddingRight: 48
}));
const ListItemContainer = styled$1('li', {
  name: 'MuiListItem',
  slot: 'Container',
  overridesResolver: (props, styles) => styles.container
})({
  position: 'relative'
});
/**
 * Uses an additional container component if `ListItemSecondaryAction` is the last child.
 */

const ListItem = /*#__PURE__*/React.forwardRef(function ListItem(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiListItem'
  });

  const {
    alignItems = 'center',
    autoFocus = false,
    button = false,
    children: childrenProp,
    className,
    component: componentProp,
    components = {},
    componentsProps = {},
    ContainerComponent = 'li',
    ContainerProps: {
      className: ContainerClassName
    } = {},
    dense = false,
    disabled = false,
    disableGutters = false,
    disablePadding = false,
    divider = false,
    focusVisibleClassName,
    secondaryAction,
    selected = false
  } = props,
        ContainerProps = _objectWithoutPropertiesLoose(props.ContainerProps, _excluded$1),
        other = _objectWithoutPropertiesLoose(props, _excluded2);

  const context = React.useContext(ListContext$1);
  const childContext = {
    dense: dense || context.dense || false,
    alignItems,
    disableGutters
  };
  const listItemRef = React.useRef(null);
  useEnhancedEffect$1(() => {
    if (autoFocus) {
      if (listItemRef.current) {
        listItemRef.current.focus();
      } else if (process.env.NODE_ENV !== 'production') {
        console.error('MUI: Unable to set focus to a ListItem whose component has not been rendered.');
      }
    }
  }, [autoFocus]);
  const children = React.Children.toArray(childrenProp); // v4 implementation, deprecated in v5, will be removed in v6

  const hasSecondaryAction = children.length && isMuiElement(children[children.length - 1], ['ListItemSecondaryAction']);

  const ownerState = _extends$3({}, props, {
    alignItems,
    autoFocus,
    button,
    dense: childContext.dense,
    disabled,
    disableGutters,
    disablePadding,
    divider,
    hasSecondaryAction,
    selected
  });

  const classes = useUtilityClasses$1(ownerState);
  const handleRef = useForkRef(listItemRef, ref);
  const Root = components.Root || ListItemRoot;
  const rootProps = componentsProps.root || {};

  const componentProps = _extends$3({
    className: clsx(classes.root, rootProps.className, className),
    disabled
  }, other);

  let Component = componentProp || 'li';

  if (button) {
    componentProps.component = componentProp || 'div';
    componentProps.focusVisibleClassName = clsx(listItemClasses$1.focusVisible, focusVisibleClassName);
    Component = ButtonBase$1;
  } // v4 implementation, deprecated in v5, will be removed in v6


  if (hasSecondaryAction) {
    // Use div by default.
    Component = !componentProps.component && !componentProp ? 'div' : Component; // Avoid nesting of li > li.

    if (ContainerComponent === 'li') {
      if (Component === 'li') {
        Component = 'div';
      } else if (componentProps.component === 'li') {
        componentProps.component = 'div';
      }
    }

    return /*#__PURE__*/jsxRuntime.exports.jsx(ListContext$1.Provider, {
      value: childContext,
      children: /*#__PURE__*/jsxRuntime.exports.jsxs(ListItemContainer, _extends$3({
        as: ContainerComponent,
        className: clsx(classes.container, ContainerClassName),
        ref: handleRef,
        ownerState: ownerState
      }, ContainerProps, {
        children: [/*#__PURE__*/jsxRuntime.exports.jsx(Root, _extends$3({}, rootProps, !isHostComponent(Root) && {
          as: Component,
          ownerState: _extends$3({}, ownerState, rootProps.ownerState)
        }, componentProps, {
          children: children
        })), children.pop()]
      }))
    });
  }

  return /*#__PURE__*/jsxRuntime.exports.jsx(ListContext$1.Provider, {
    value: childContext,
    children: /*#__PURE__*/jsxRuntime.exports.jsxs(Root, _extends$3({}, rootProps, {
      as: Component,
      ref: handleRef,
      ownerState: ownerState
    }, !isHostComponent(Root) && {
      ownerState: _extends$3({}, ownerState, rootProps.ownerState)
    }, componentProps, {
      children: [children, secondaryAction && /*#__PURE__*/jsxRuntime.exports.jsx(ListItemSecondaryAction$1, {
        children: secondaryAction
      })]
    }))
  });
});
process.env.NODE_ENV !== "production" ? ListItem.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * Defines the `align-items` style property.
   * @default 'center'
   */
  alignItems: PropTypes.oneOf(['center', 'flex-start']),

  /**
   * If `true`, the list item is focused during the first mount.
   * Focus will also be triggered if the value changes from false to true.
   * @default false
   * @deprecated checkout [ListItemButton](/api/list-item-button/) instead
   */
  autoFocus: PropTypes.bool,

  /**
   * If `true`, the list item is a button (using `ButtonBase`). Props intended
   * for `ButtonBase` can then be applied to `ListItem`.
   * @default false
   * @deprecated checkout [ListItemButton](/api/list-item-button/) instead
   */
  button: PropTypes.bool,

  /**
   * The content of the component if a `ListItemSecondaryAction` is used it must
   * be the last child.
   */
  children: chainPropTypes(PropTypes.node, props => {
    const children = React.Children.toArray(props.children); // React.Children.toArray(props.children).findLastIndex(isListItemSecondaryAction)

    let secondaryActionIndex = -1;

    for (let i = children.length - 1; i >= 0; i -= 1) {
      const child = children[i];

      if (isMuiElement(child, ['ListItemSecondaryAction'])) {
        secondaryActionIndex = i;
        break;
      }
    } //  is ListItemSecondaryAction the last child of ListItem


    if (secondaryActionIndex !== -1 && secondaryActionIndex !== children.length - 1) {
      return new Error('MUI: You used an element after ListItemSecondaryAction. ' + 'For ListItem to detect that it has a secondary action ' + 'you must pass it as the last child to ListItem.');
    }

    return null;
  }),

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,

  /**
   * The components used for each slot inside the InputBase.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: PropTypes.shape({
    Root: PropTypes.elementType
  }),

  /**
   * The props used for each slot inside the Input.
   * @default {}
   */
  componentsProps: PropTypes.shape({
    root: PropTypes.object
  }),

  /**
   * The container component used when a `ListItemSecondaryAction` is the last child.
   * @default 'li'
   * @deprecated
   */
  ContainerComponent: elementTypeAcceptingRef$1,

  /**
   * Props applied to the container component if used.
   * @default {}
   * @deprecated
   */
  ContainerProps: PropTypes.object,

  /**
   * If `true`, compact vertical padding designed for keyboard and mouse input is used.
   * The prop defaults to the value inherited from the parent List component.
   * @default false
   */
  dense: PropTypes.bool,

  /**
   * If `true`, the component is disabled.
   * @default false
   * @deprecated checkout [ListItemButton](/api/list-item-button/) instead
   */
  disabled: PropTypes.bool,

  /**
   * If `true`, the left and right padding is removed.
   * @default false
   */
  disableGutters: PropTypes.bool,

  /**
   * If `true`, all padding is removed.
   * @default false
   */
  disablePadding: PropTypes.bool,

  /**
   * If `true`, a 1px light border is added to the bottom of the list item.
   * @default false
   */
  divider: PropTypes.bool,

  /**
   * @ignore
   */
  focusVisibleClassName: PropTypes.string,

  /**
   * The element to display at the end of ListItem.
   */
  secondaryAction: PropTypes.node,

  /**
   * Use to apply selected styling.
   * @default false
   * @deprecated checkout [ListItemButton](/api/list-item-button/) instead
   */
  selected: PropTypes.bool,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object])
} : void 0;
var ListItem$1 = ListItem;

function getListItemTextUtilityClass(slot) {
  return generateUtilityClass('MuiListItemText', slot);
}
const listItemTextClasses = generateUtilityClasses('MuiListItemText', ['root', 'multiline', 'dense', 'inset', 'primary', 'secondary']);
var listItemTextClasses$1 = listItemTextClasses;

const _excluded = ["children", "className", "disableTypography", "inset", "primary", "primaryTypographyProps", "secondary", "secondaryTypographyProps"];

const useUtilityClasses = ownerState => {
  const {
    classes,
    inset,
    primary,
    secondary,
    dense
  } = ownerState;
  const slots = {
    root: ['root', inset && 'inset', dense && 'dense', primary && secondary && 'multiline'],
    primary: ['primary'],
    secondary: ['secondary']
  };
  return composeClasses(slots, getListItemTextUtilityClass, classes);
};

const ListItemTextRoot = styled$1('div', {
  name: 'MuiListItemText',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [{
      [`& .${listItemTextClasses$1.primary}`]: styles.primary
    }, {
      [`& .${listItemTextClasses$1.secondary}`]: styles.secondary
    }, styles.root, ownerState.inset && styles.inset, ownerState.primary && ownerState.secondary && styles.multiline, ownerState.dense && styles.dense];
  }
})(({
  ownerState
}) => _extends$3({
  flex: '1 1 auto',
  minWidth: 0,
  marginTop: 4,
  marginBottom: 4
}, ownerState.primary && ownerState.secondary && {
  marginTop: 6,
  marginBottom: 6
}, ownerState.inset && {
  paddingLeft: 56
}));
const ListItemText = /*#__PURE__*/React.forwardRef(function ListItemText(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiListItemText'
  });

  const {
    children,
    className,
    disableTypography = false,
    inset = false,
    primary: primaryProp,
    primaryTypographyProps,
    secondary: secondaryProp,
    secondaryTypographyProps
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded);

  const {
    dense
  } = React.useContext(ListContext$1);
  let primary = primaryProp != null ? primaryProp : children;
  let secondary = secondaryProp;

  const ownerState = _extends$3({}, props, {
    disableTypography,
    inset,
    primary: !!primary,
    secondary: !!secondary,
    dense
  });

  const classes = useUtilityClasses(ownerState);

  if (primary != null && primary.type !== Typography$1 && !disableTypography) {
    primary = /*#__PURE__*/jsxRuntime.exports.jsx(Typography$1, _extends$3({
      variant: dense ? 'body2' : 'body1',
      className: classes.primary,
      component: "span",
      display: "block"
    }, primaryTypographyProps, {
      children: primary
    }));
  }

  if (secondary != null && secondary.type !== Typography$1 && !disableTypography) {
    secondary = /*#__PURE__*/jsxRuntime.exports.jsx(Typography$1, _extends$3({
      variant: "body2",
      className: classes.secondary,
      color: "text.secondary",
      display: "block"
    }, secondaryTypographyProps, {
      children: secondary
    }));
  }

  return /*#__PURE__*/jsxRuntime.exports.jsxs(ListItemTextRoot, _extends$3({
    className: clsx(classes.root, className),
    ownerState: ownerState,
    ref: ref
  }, other, {
    children: [primary, secondary]
  }));
});
process.env.NODE_ENV !== "production" ? ListItemText.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * Alias for the `primary` prop.
   */
  children: PropTypes.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * If `true`, the children won't be wrapped by a Typography component.
   * This can be useful to render an alternative Typography variant by wrapping
   * the `children` (or `primary`) text, and optional `secondary` text
   * with the Typography component.
   * @default false
   */
  disableTypography: PropTypes.bool,

  /**
   * If `true`, the children are indented.
   * This should be used if there is no left avatar or left icon.
   * @default false
   */
  inset: PropTypes.bool,

  /**
   * The main content element.
   */
  primary: PropTypes.node,

  /**
   * These props will be forwarded to the primary typography component
   * (as long as disableTypography is not `true`).
   */
  primaryTypographyProps: PropTypes.object,

  /**
   * The secondary content element.
   */
  secondary: PropTypes.node,

  /**
   * These props will be forwarded to the secondary typography component
   * (as long as disableTypography is not `true`).
   */
  secondaryTypographyProps: PropTypes.object,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object])
} : void 0;
var ListItemText$1 = ListItemText;

var GeoJsonContext = React__default.createContext({});
var GeoJsonContextProvider = GeoJsonContext.Provider;

/**
 * https://github.com/mapbox/togeojson
 *
 * Copyright (c) 2016 Mapbox All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
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
var MlGPXViewer = function (props) {
    var dataSource = useContext(GeoJsonContext);
    var initializedRef = useRef(false);
    var mapHook = useMap({ mapId: props.mapId, waitForLayer: props.insertBeforeLayer });
    var sourceName = "import-source";
    var layerNameLines = "importer-layer-lines";
    var layerNamePoints = "importer-layer-points";
    var _a = useState(false), open = _a[0], setIsOpen = _a[1];
    var dropZone = useRef(null);
    var _b = useState(0), zIndex = _b[0], setZIndex = _b[1];
    var _c = useState([]), metaData = _c[0], setMetaData = _c[1];
    var fileupload = useRef(null);
    var mediaIsMobile = useMediaQuery("(max-width:900px)");
    var popup = useRef(new Popup({
        closeButton: false,
        closeOnClick: true,
    }));
    useEffect(function () {
        if (!mapHook.map || initializedRef.current)
            return;
        initializedRef.current = true;
        mapHook.map.addSource(sourceName, {
            type: "geojson",
            data: dataSource.data,
        }, mapHook.componentId);
        mapHook.map.addLayer({
            id: layerNameLines,
            source: sourceName,
            type: "line",
            paint: {
                "line-width": 4,
                "line-color": "rgba(212, 55, 23,0.5)",
            },
        }, props.insertBeforeLayer, mapHook.componentId);
        mapHook.map.addLayer({
            id: layerNamePoints,
            source: sourceName,
            type: "circle",
            paint: {
                "circle-color": "rgba(72, 77, 99,0.5)",
                "circle-radius": 7,
            },
            filter: ["==", "$type", "Point"],
        }, props.insertBeforeLayer, mapHook.componentId);
        [layerNameLines, layerNamePoints].forEach(function (layerName) {
            if (!mapHook.map)
                return;
            mapHook.map.map.setLayoutProperty(layerName, "visibility", "visible");
        });
        mapHook.map.on("mouseenter", layerNamePoints, function (e) {
            if (!mapHook.map)
                return;
            // Change the cursor style as a UI indicator.
            var coordinates = e.features[0].geometry.coordinates.slice();
            //const description = e.features[0].properties.desc;
            var name = e.features[0].properties.name;
            // Ensure that if the map is zoomed out such that multiple
            // copies of the feature are visible, the popup appears
            // over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }
            // Populate the popup and set its coordinates
            // based on the feature found.
            popup.current.setLngLat(coordinates).setHTML(name).addTo(mapHook.map.map);
        }, mapHook.componentId);
        mapHook.map.on("mouseleave", "places", function () {
            if (!mapHook.map)
                return;
            mapHook.map.map.getCanvas().style.cursor = "";
            popup.current.remove();
        }, mapHook.componentId);
        mapHook.map.map.setZoom(10);
    }, [mapHook.map]);
    useEffect(function () {
        var _dropZone = dropZone.current;
        var raiseDropZoneAndStopDefault = function (event) {
            setZIndex(1000);
            stopDefault(event);
        };
        var lowerDropZone = function () {
            setZIndex(0);
        };
        var lowerDropZoneAndStopDefault = function (event) {
            setZIndex(0);
            stopDefault(event);
        };
        window.addEventListener("dragenter", raiseDropZoneAndStopDefault);
        window.addEventListener("dragover", stopDefault);
        _dropZone === null || _dropZone === void 0 ? void 0 : _dropZone.addEventListener("dragleave", lowerDropZone);
        window.addEventListener("drop", lowerDropZoneAndStopDefault);
        return function () {
            window.removeEventListener("dragenter", raiseDropZoneAndStopDefault);
            window.removeEventListener("dragover", stopDefault);
            _dropZone === null || _dropZone === void 0 ? void 0 : _dropZone.removeEventListener("dragleave", lowerDropZone);
            window.removeEventListener("drop", lowerDropZoneAndStopDefault);
        };
    });
    var stopDefault = function (event) {
        event.preventDefault();
        event.stopPropagation();
    };
    useEffect(function () {
        if (!mapHook.map)
            return;
        var visibility = props.visible ? "visible" : "none";
        [layerNameLines, layerNamePoints].forEach(function (layerName) {
            if (!mapHook.map)
                return;
            mapHook.map.map.setLayoutProperty(layerName, "visibility", visibility);
        });
    }, [props.visible]);
    var dropHandler = function (event) {
        event.preventDefault();
        if (event.dataTransfer.items) {
            if (event.dataTransfer.items.length > 1) {
                return false;
            }
            // If dropped items aren't files, reject them
            if (event.dataTransfer.items[0].kind === "file") {
                var reader = new FileReader();
                reader.onload = function (payload) {
                    var _a;
                    if (!((_a = payload === null || payload === void 0 ? void 0 : payload.currentTarget) === null || _a === void 0 ? void 0 : _a.result))
                        return;
                    addGPXToMap(payload.currentTarget.result);
                };
                var file = event.dataTransfer.items[0].getAsFile();
                reader.readAsText(file);
            }
        }
        return;
    };
    var addGPXToMap = function (gpxAsString) {
        if (!mapHook.map || !dataSource.setData)
            return;
        try {
            setMetaData([]);
            var domParser = new DOMParser();
            var gpxDoc = domParser.parseFromString(gpxAsString, "application/xml");
            var metadata = gpxDoc.querySelector("metadata");
            metadata === null || metadata === void 0 ? void 0 : metadata.childNodes.forEach(function (node) {
                var value = node.textContent;
                var title = node.nodeName;
                if (node.nodeName === "link") {
                    value = node.getAttribute("href");
                }
                if (!!(value === null || value === void 0 ? void 0 : value.trim().length)) {
                    var metaDatEntry_1 = {
                        title: title,
                        value: value,
                        id: new Date().getTime(),
                    };
                    setMetaData(function (prevState) { return __spreadArray(__spreadArray([], prevState, true), [metaDatEntry_1], false); });
                }
            });
            var data = toGeoJSON.gpx(gpxDoc);
            dataSource.setData(data);
            mapHook.map.map.getSource(sourceName).setData(data);
            var bounds = bbox(data);
            mapHook.map.map.fitBounds(bounds);
        }
        catch (e) {
            console.log(e);
        }
    };
    var toogleDrawer = function () {
        setIsOpen(function (prevState) { return !prevState; });
    };
    var fileUploadOnChange = function () {
        var _a, _b;
        if (!fileupload.current)
            return false;
        var file = (_b = (_a = fileupload.current) === null || _a === void 0 ? void 0 : _a.files) === null || _b === void 0 ? void 0 : _b[0];
        if (!file)
            return false;
        var reader = new FileReader();
        reader.onload = function (payload) {
            if (!payload)
                return;
            addGPXToMap(payload.currentTarget.result);
        };
        reader.readAsText(file);
        return;
    };
    var manualUpload = function () {
        if (!fileupload.current)
            return;
        fileupload.current.click();
    };
    return (React__default.createElement(React__default.Fragment, null,
        React__default.createElement("div", { style: {
                position: "fixed",
                right: "5px",
                bottom: mediaIsMobile ? "40px" : "25px",
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                zIndex: 1000,
            } },
            React__default.createElement(IconButton$1, { onClick: manualUpload, style: {
                    backgroundColor: "rgba(255,255,255,1)",
                }, size: "large" },
                React__default.createElement("input", { ref: fileupload, onChange: fileUploadOnChange, type: "file", id: "input", multiple: true, style: { display: "none" } }),
                React__default.createElement(default_1, null)),
            React__default.createElement(IconButton$1, { onClick: toogleDrawer, style: {
                    backgroundColor: "rgba(255,255,255,1)",
                }, size: "large" },
                React__default.createElement(default_1$1, null))),
        React__default.createElement(Drawer$1, { variant: "persistent", anchor: "left", open: open },
            React__default.createElement(Typography$1, { variant: "h6", style: {
                    textAlign: "center",
                    padding: "1em",
                }, noWrap: true }, "Informationen zur Route"),
            React__default.createElement(Divider$1, null),
            React__default.createElement(List$1, null, metaData.map(function (item) { return (React__default.createElement(ListItem$1, { key: "item--".concat(item.id) },
                React__default.createElement(ListItemText$1, { primary: item.value }))); }))),
        React__default.createElement("div", { onDrop: dropHandler, ref: dropZone, style: {
                position: "absolute",
                left: "0",
                top: "0",
                backgroundColor: "rgba(255,255,255,0.5)",
                width: "100%",
                height: "100%",
                zIndex: zIndex,
            } },
            React__default.createElement(Typography$1, { variant: "h6", style: {
                    top: "50%",
                    position: "absolute",
                    left: "50%",
                    msTransform: "translate(-50%, -50%)",
                    transform: " translate(-50%, -50%)",
                }, noWrap: true }, "Gpx-Datei ablegen"))));
};
MlGPXViewer.defaultProps = {
    visible: true,
};

var GeoJsonProvider = function (_a) {
    var children = _a.children;
    var _b = useState({
        type: "FeatureCollection",
        features: [],
    }), data = _b[0], setData = _b[1];
    var getEmptyFeatureCollection = function () {
        return {
            type: "FeatureCollection",
            features: [],
        };
    };
    var value = {
        data: data,
        setData: setData,
        getEmptyFeatureCollection: getEmptyFeatureCollection,
    };
    return React__default.createElement(GeoJsonContextProvider, { value: value }, children);
};

/**
 * @module helpers
 */
/**
 * Wraps a GeoJSON {@link Geometry} in a GeoJSON {@link Feature}.
 *
 * @name feature
 * @param {Geometry} geometry input geometry
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature} a GeoJSON Feature
 * @example
 * var geometry = {
 *   "type": "Point",
 *   "coordinates": [110, 50]
 * };
 *
 * var feature = turf.feature(geometry);
 *
 * //=feature
 */
function feature(geom, properties, options) {
    if (options === void 0) { options = {}; }
    var feat = { type: "Feature" };
    if (options.id === 0 || options.id) {
        feat.id = options.id;
    }
    if (options.bbox) {
        feat.bbox = options.bbox;
    }
    feat.properties = properties || {};
    feat.geometry = geom;
    return feat;
}
/**
 * Creates a {@link Polygon} {@link Feature} from an Array of LinearRings.
 *
 * @name polygon
 * @param {Array<Array<Array<number>>>} coordinates an array of LinearRings
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<Polygon>} Polygon Feature
 * @example
 * var polygon = turf.polygon([[[-5, 52], [-4, 56], [-2, 51], [-7, 54], [-5, 52]]], { name: 'poly1' });
 *
 * //=polygon
 */
function polygon(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    for (var _i = 0, coordinates_1 = coordinates; _i < coordinates_1.length; _i++) {
        var ring = coordinates_1[_i];
        if (ring.length < 4) {
            throw new Error("Each LinearRing of a Polygon must have 4 or more Positions.");
        }
        for (var j = 0; j < ring[ring.length - 1].length; j++) {
            // Check if first point of Polygon contains two numbers
            if (ring[ring.length - 1][j] !== ring[0][j]) {
                throw new Error("First and last Position are not equivalent.");
            }
        }
    }
    var geom = {
        type: "Polygon",
        coordinates: coordinates,
    };
    return feature(geom, properties, options);
}
/**
 * Creates a {@link LineString} {@link Feature} from an Array of Positions.
 *
 * @name lineString
 * @param {Array<Array<number>>} coordinates an array of Positions
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<LineString>} LineString Feature
 * @example
 * var linestring1 = turf.lineString([[-24, 63], [-23, 60], [-25, 65], [-20, 69]], {name: 'line 1'});
 * var linestring2 = turf.lineString([[-14, 43], [-13, 40], [-15, 45], [-10, 49]], {name: 'line 2'});
 *
 * //=linestring1
 * //=linestring2
 */
function lineString(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    if (coordinates.length < 2) {
        throw new Error("coordinates must be an array of two or more positions");
    }
    var geom = {
        type: "LineString",
        coordinates: coordinates,
    };
    return feature(geom, properties, options);
}

/**
 * MlSpatialElevationProfile returns a Button that will add a standard OSM tile layer to the maplibre-gl instance.
 *
 * @component
 */

var MlSpatialElevationProfile = function MlSpatialElevationProfile(props) {
  var mapContext = useContext(MapContext);
  var componentId = useRef((props.idPrefix ? props.idPrefix : "MlSpatialElevationProfile-") + v4());
  var mapRef = useRef(null);
  var initializedRef = useRef(false);
  var dataSource = useContext(GeoJsonContext);
  var sourceName = useRef("elevationprofile-" + v4());
  var layerName = useRef("elevationprofile-layer-" + v4());
  var createStep = useCallback(function (x, y, z, x2, y2) {
    //const summand = 0.0002;
    var line = lineString([[x, y], [x2, y2]]);
    var offsetLine = lineOffset(line, 5, {
      units: "meters"
    });
    var x3 = offsetLine.geometry.coordinates[0][0];
    var y3 = offsetLine.geometry.coordinates[0][1];
    var x4 = offsetLine.geometry.coordinates[1][0];
    var y4 = offsetLine.geometry.coordinates[1][1];
    return polygon([[[x, y], [x2, y2], [x4, y4], [x3, y3], [x, y]]], {
      height: z * props.elevationFactor
    });
  }, [props.elevationFactor]);
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
    mapRef.current.addSource(sourceName.current, {
      type: "geojson",
      data: dataSource.data
    }, componentId.current);
    mapRef.current.addLayer({
      id: layerName.current,
      source: sourceName.current,
      type: "fill-extrusion",
      paint: {
        "fill-extrusion-height": ["get", "height"],
        "fill-extrusion-opacity": 0.9,
        "fill-extrusion-color": ["interpolate", ["linear"], ["get", "height"], 0, "rgba(0, 0, 255, 0)", 0.1, "royalblue", 0.3, "cyan", 0.5, "lime", 0.7, "yellow", 1, "yellow"]
      }
    }, props.insertBeforeLayer, componentId.current);
  }, [mapContext.mapIds, props.insertBeforeLayer, props.mapId, dataSource, mapContext]);
  useEffect(function () {
    var _mapRef$current$getSo;

    if (!mapRef.current || !mapRef.current.getLayer(layerName.current)) return;
    var data = dataSource.data;
    if (!data || !data.features) return;
    var line = data.features.find(function (element) {
      return element.geometry.type === "LineString";
    });
    if (!line || !line.geometry) return;
    var heights = line.geometry.coordinates.map(function (coordinate, index) {
      return coordinate[2];
    });
    var min = Math.min.apply(Math, _toConsumableArray(heights));
    var max = Math.max.apply(Math, _toConsumableArray(heights)) - min;
    max = max === 0 ? 1 : max;
    mapRef.current.setPaintProperty(layerName.current, "fill-extrusion-color", ["interpolate", ["linear"], ["get", "height"], 0, "rgb(0,255,55)", max * props.elevationFactor, "rgb(255,0,0)"]);

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
    (_mapRef$current$getSo = mapRef.current.getSource(sourceName.current)) === null || _mapRef$current$getSo === void 0 ? void 0 : _mapRef$current$getSo.setData(newData);
  }, [dataSource.data, createStep, dataSource, props.elevationFactor, mapContext]);
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null);
};

MlSpatialElevationProfile.defaultProps = {
  elevationFactor: 1
};
MlSpatialElevationProfile.propTypes = {
  /**
   * Id of the target MapLibre instance in mapContext
   */
  mapId: PropTypes.string,

  /**
   * Prefix of the component id this component uses when adding elements to the MapLibreGl-instance
   */
  idPrefix: PropTypes.string,

  /**
   * Number describes the factor of the height of the elevation
   */
  elevationFactor: PropTypes.number,

  /**
   * The layerId of an existing layer this layer should be rendered visually beneath
   * https://maplibre.org/maplibre-gl-js-docs/api/map/#map#addlayer - see "beforeId" property
   */
  insertBeforeLayer: PropTypes.string
};

/**
 * Adds a standard OSM tile layer to the maplibre-gl instancereference by
 * props.mapId
 *
 * @component
 */

var MlOsmLayer = function MlOsmLayer(props) {
  var mapHook = useMap({
    mapId: props.mapId,
    waitForLayer: props.insertBeforeLayer
  });
  var layerId = useRef(props.layerId || "MlOsmLayer-" + mapHook.componentId);
  useEffect(function () {
    if (!mapHook.map) return;
    mapHook.map.addSource(layerId.current, _objectSpread2({
      type: "raster",
      tileSize: 256
    }, props.sourceOptions), mapHook.componentId);
    mapHook.map.addLayer(_objectSpread2({
      id: layerId.current,
      type: "raster",
      source: layerId.current,
      minzoom: 0,
      maxzoom: 22
    }, props.layerOptions), props.insertBeforeLayer, mapHook.componentId);
  }, [props, mapHook.map]);
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null);
};

MlOsmLayer.propTypes = {
  /**
   * Id of the target MapLibre instance in mapHook
   */
  mapId: PropTypes.string,

  /**
   * Prefix of the component id this component uses when adding elements to the MapLibreGl-instance
   */
  idPrefix: PropTypes.string,

  /**
   * Options object that will be used as first parameter on the MapLibreGl.addSource call see MapLibre source options documentation.
   */
  sourceOptions: PropTypes.object,

  /**
   * Options object that will be used as first parameter on the MapLibreGl.addLayer call see MapLibre layer options documentation.
   *
   */
  layerOptions: PropTypes.object,

  /**
   * The layerId of an existing layer this layer should be rendered visually beneath
   * https://maplibre.org/maplibre-gl-js-docs/api/map/#map#addlayer - see "beforeId" property
   */
  insertBeforeLayer: PropTypes.string
};

/**
 * This component is deprecated and will be removed in the next major release
 */

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
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null);
};

function useWms(props) {
  // Use a useRef hook to reference the layer object to be able to access it later inside useEffect hooks
  var _useState = useState(undefined),
      _useState2 = _slicedToArray(_useState, 2),
      getFeatureInfoUrl = _useState2[0],
      setGetFeatureInfoUrl = _useState2[1];

  var _useState3 = useState(props.url),
      _useState4 = _slicedToArray(_useState3, 2),
      url = _useState4[0],
      setUrl = _useState4[1];

  var _useState5 = useState(""),
      _useState6 = _slicedToArray(_useState5, 2),
      wmsUrl = _useState6[0],
      setWmsUrl = _useState6[1];

  var _useState7 = useState(undefined),
      _useState8 = _slicedToArray(_useState7, 2),
      capabilities = _useState8[0],
      setCapabilities = _useState8[1];

  var _useState9 = useState(undefined),
      _useState10 = _slicedToArray(_useState9, 2),
      error = _useState10[0],
      setError = _useState10[1];

  var clearState = function clearState() {
    setGetFeatureInfoUrl(undefined);
    setCapabilities(undefined); //setLayers([]);

    setWmsUrl("");
  };

  useEffect(function () {
    var _propsUrlParams2;

    // extract URL parameters from the given URL
    clearState();
    setError(undefined);
    if (!url) return;

    var _propsUrlParams;

    var _wmsUrl = url;

    if (url.indexOf("?") !== -1) {
      _propsUrlParams = url.split("?");
      _wmsUrl = _propsUrlParams[0];
    }

    var _urlParamsFromUrl = new URLSearchParams((_propsUrlParams2 = _propsUrlParams) === null || _propsUrlParams2 === void 0 ? void 0 : _propsUrlParams2[1]);

    var urlParamsObj = _objectSpread2(_objectSpread2({}, Object.fromEntries(_urlParamsFromUrl)), props.urlParameters); // create URLSearchParams object to assemble the URL Parameters


    var urlParams = new URLSearchParams(urlParamsObj);
    var urlParamsStr = decodeURIComponent(urlParams.toString()) + "".replace(/%2F/g, "/").replace(/%3A/g, ":");
    fetch(_wmsUrl + "?" + urlParamsStr).then(function (res) {
      if (!res.ok) {
        throw Error(res.statusText + " (" + res.status + " - " + res.type + ")");
      } else {
        return res.text();
      }
    }).then(function (data) {
      setCapabilities(new WMSCapabilities(data).toJSON());
    })["catch"](function (error) {
      //reset local state
      clearState();
      console.log(error);
      setError(error.message);
    });
  }, [url, props.urlParameters]);
  useEffect(function () {
    var _capabilities$Capabil, _capabilities$Capabil2, _capabilities$Capabil3, _capabilities$Capabil4, _capabilities$Capabil5, _capabilities$Capabil6, _capabilities$Capabil7, _capabilities$Capabil8, _capabilities$Capabil9, _capabilities$Capabil10, _capabilities$Capabil11, _capabilities$Capabil12, _capabilities$Capabil13, _capabilities$Capabil14;

    if (!(capabilities !== null && capabilities !== void 0 && capabilities.Service)) return;
    setWmsUrl((_capabilities$Capabil = capabilities.Capability) === null || _capabilities$Capabil === void 0 ? void 0 : (_capabilities$Capabil2 = _capabilities$Capabil.Request) === null || _capabilities$Capabil2 === void 0 ? void 0 : (_capabilities$Capabil3 = _capabilities$Capabil2.GetMap) === null || _capabilities$Capabil3 === void 0 ? void 0 : (_capabilities$Capabil4 = _capabilities$Capabil3.DCPType) === null || _capabilities$Capabil4 === void 0 ? void 0 : (_capabilities$Capabil5 = _capabilities$Capabil4[0]) === null || _capabilities$Capabil5 === void 0 ? void 0 : (_capabilities$Capabil6 = _capabilities$Capabil5.HTTP) === null || _capabilities$Capabil6 === void 0 ? void 0 : (_capabilities$Capabil7 = _capabilities$Capabil6.Get) === null || _capabilities$Capabil7 === void 0 ? void 0 : _capabilities$Capabil7.OnlineResource); // set getFeatureInfo url

    setGetFeatureInfoUrl((_capabilities$Capabil8 = capabilities.Capability) === null || _capabilities$Capabil8 === void 0 ? void 0 : (_capabilities$Capabil9 = _capabilities$Capabil8.Request) === null || _capabilities$Capabil9 === void 0 ? void 0 : (_capabilities$Capabil10 = _capabilities$Capabil9.GetFeatureInfo) === null || _capabilities$Capabil10 === void 0 ? void 0 : (_capabilities$Capabil11 = _capabilities$Capabil10.DCPType) === null || _capabilities$Capabil11 === void 0 ? void 0 : (_capabilities$Capabil12 = _capabilities$Capabil11[0]) === null || _capabilities$Capabil12 === void 0 ? void 0 : (_capabilities$Capabil13 = _capabilities$Capabil12.HTTP) === null || _capabilities$Capabil13 === void 0 ? void 0 : (_capabilities$Capabil14 = _capabilities$Capabil13.Get) === null || _capabilities$Capabil14 === void 0 ? void 0 : _capabilities$Capabil14.OnlineResource);
  }, [capabilities]);
  return {
    capabilities: capabilities,
    getFeatureInfoUrl: getFeatureInfoUrl,
    wmsUrl: wmsUrl,
    error: error,
    setUrl: setUrl
  };
}

useWms.defaultProps = {
  url: "",
  urlParameters: {
    SERVICE: "WMS",
    VERSION: "1.3.0",
    REQUEST: "getCapabilities"
  }
};

var SimpleDataContext = /*#__PURE__*/React__default.createContext({});
var SimpleDataContextProvider = SimpleDataContext.Provider;

var SimpleDataProvider = function SimpleDataProvider(props) {
  var _useState = useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      data = _useState2[0],
      setData = _useState2[1];

  useEffect(function () {
    if (!props.url) return;
    var data_promise = null;

    if (props.format === "json") {
      data_promise = d3.json(props.url);
    } else if (props.format === "csv") {
      data_promise = d3.csv(props.url);
    } else if (props.format === "xml") {
      data_promise = d3.xml(props.url);
    }

    if (data_promise) {
      data_promise.then(function (received_data) {
        if (props.format === "xml") {
          if (props.nodeType) {
            var dataTmp = [];
            received_data.querySelectorAll(props.nodeType).forEach(function (el) {
              dataTmp.push(props.formatData(el));
            });
            setData(dataTmp);
          }
        } else {
          if (props.data_property) {
            received_data = received_data[props.data_property];
          }

          if (typeof props.formatData === "function") {
            setData(received_data.map(props.formatData));
          } else {
            setData(received_data);
          }
        }

        if (typeof props.onData === "function") {
          props.onData();
        }
      });
    }
  }, [props.url, props]);
  var value = {
    data: data,
    setData: setData
  };
  return /*#__PURE__*/React__default.createElement(SimpleDataContextProvider, {
    value: value
  }, props.children);
};

SimpleDataProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export { GeoJsonContext, GeoJsonProvider, MapComponentsProvider, MapContext, MapLibreMap, MlBasicComponent, MlComponentTemplate, MlCreatePdfButton, MlFeatureEditor, MlFillExtrusionLayer, MlFollowGps, MlGPXViewer, MlGeoJsonLayer, MlImageMarkerLayer, MlLayer, MlLayerMagnify, MlLayerSwipe, MlMarker, MlNavigationCompass, MlNavigationTools, MlOsmLayer, MlSpatialElevationProfile, MlTransitionGeoJsonLayer, MlVectorTileLayer, MlWmsLayer, SimpleDataContext, SimpleDataProvider, useLayer, useMap, useMapState, useWms };
//# sourceMappingURL=index.esm.js.map

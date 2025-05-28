import maplibregl, { Map, Popup } from 'maplibre-gl';
import * as React from 'react';
import React__default, { useMemo, useEffect, useCallback, useState, useRef, useContext, Fragment } from 'react';
import { createTheme, ThemeProvider, styled as styled$2, useTheme } from '@mui/material/styles';
import { v4 } from 'uuid';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Button, CircularProgress, useMediaQuery, FormControl, InputLabel, Select, MenuItem, FormLabel, RadioGroup, FormControlLabel, Radio, styled, List, ListItem, ListItemIcon, IconButton, Checkbox, ListItemText, Grid, Paper, Box as Box$1, Typography, TextField, Slider, Drawer, SwipeableDrawer, Tooltip, Snackbar, FormGroup, DialogTitle as DialogTitle$1, DialogActions as DialogActions$1, ListItemButton, ListItemAvatar, Avatar, DialogContent as DialogContent$1, OutlinedInput, Accordion, AccordionSummary, Dialog as Dialog$1 } from '@mui/material';
import FilterCenterFocusIcon from '@mui/icons-material/FilterCenterFocus';
import PrinterIcon from '@mui/icons-material/Print';
import Button$1 from '@mui/material/Button';
import jsPDF from 'jspdf';
import ReactDOM, { createPortal } from 'react-dom';
import Moveable from 'react-moveable';
import * as turf from '@turf/turf';
import { point, circle, lineArc, bbox, booleanContains, bboxPolygon, featureCollection, distance, lineOffset } from '@turf/turf';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import Box$2 from '@mui/material/Box';
import Grid$1 from '@mui/material/Grid';
import PolylineIcon from '@mui/icons-material/Polyline';
import PentagonIcon from '@mui/icons-material/Pentagon';
import DeleteIcon from '@mui/icons-material/Delete';
import TuneIcon from '@mui/icons-material/Tune';
import { styled as styled$1, Box } from '@mui/system';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ChromePicker } from 'react-color';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useSortable, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import CloseIcon from '@mui/icons-material/Close';
import useMediaQuery$1 from '@mui/material/useMediaQuery';
import { Global } from '@emotion/react';
import ButtonGroup from '@mui/material/ButtonGroup';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Divider from '@mui/material/Divider';
import syncMove from '@mapbox/mapbox-gl-sync-move';
import * as xmldom from '@xmldom/xmldom';
import { featureCollection as featureCollection$1, lineString, polygon } from '@turf/helpers';
import WMSCapabilities from 'wms-capabilities';
import InfoIcon from '@mui/icons-material/Info';
import List$1 from '@mui/material/List';
import ListItem$1 from '@mui/material/ListItem';
import ListItemText$1 from '@mui/material/ListItemText';
import IconButton$1 from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import StopIcon from '@mui/icons-material/Stop';
import FastForwardIcon from '@mui/icons-material/FastForward';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip$1 from '@mui/material/Tooltip';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import * as csv2geojson from 'csv2geojson';
import osm2geojson from 'osm2geojson-lite';
import { feature } from 'topojson-client';
import * as externParser from '@tmcw/togeojson';
import * as d3 from 'd3';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak';
import { useSensor, PointerSensor, MouseSensor, useSensors, DndContext, closestCenter } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import FileCopy from '@mui/icons-material/FileCopy';
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import MuiSpeedDial from '@mui/material/SpeedDial';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import LayersIcon from '@mui/icons-material/Layers';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useSelector, useDispatch } from 'react-redux';
import { createSlice, configureStore } from '@reduxjs/toolkit';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

/******************************************************************************
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
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var MapLibreGlWrapper = /** @class */ (function () {
    function MapLibreGlWrapper(props) {
        var _this = this;
        // closure variable to safely point to the object context of the current MapLibreGlWrapper instance
        // eslint-disable-next-line @typescript-eslint/no-this-alias
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
            addsource: [],
            addlayer: [],
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
                if (typeof options === 'string') {
                    componentId = options;
                    options = {};
                }
                self.eventHandlers[eventName].push({ handler: handler, options: options });
                var _arguments = [eventName, handler];
                if (componentId && typeof componentId === 'string') {
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
                    item.handler.call(scope, event, self, context);
                });
            },
            /**
             * Array containing an object for each layer in the MapLibre instance providing information on visibility, loading state, order, paint & layout properties
             */
            layerState: [],
            /**
             * Maps layerIds to layerState in JSON string form for quick deep comparisons
             */
            layerStateString: '',
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
                //	paint[propName] =
                //		typeof values[propName].value !== "undefined"
                //			? values[propName].value.value
                //			: values[propName];
                //});
                //let layout = {};
                //values = layer.layout?._values;
                //Object.keys(values || {}).map((propName) => {
                //	layout[propName] =
                //		typeof values[propName].value !== "undefined"
                //			? values[propName].value.value
                //			: values[propName];
                //});
                if (!layer)
                    return;
                return {
                    id: layer.id,
                    type: layer.type,
                    visible: layer.visibility === 'none' ? false : true,
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
                return self.map.style._order
                    .map(function (layerId) {
                    return self.wrapper.buildLayerObject(self.map.style._layers[layerId]);
                })
                    .filter(function (n) { return typeof n !== 'undefined'; });
            },
            /**
             * Updates layer state info objects
             */
            refreshLayerState: function () {
                self.wrapper.layerState = self.wrapper.buildLayerObjects();
                if (JSON.stringify(self.wrapper.layerState) !== self.wrapper.layerStateString) {
                    self.wrapper.fire('layerchange');
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
                pitch: 0,
            },
            /**
             * The same data as viewportState in JSON string form for quick deep comparisons
             */
            viewportStateString: '{}',
            /**
             * Previous version of viewportStateString
             */
            oldViewportStateString: '{}',
            getViewport: function () {
                return typeof self.map.getCenter === 'function'
                    ? {
                        center: (function (_a) {
                            var lng = _a.lng, lat = _a.lat;
                            return ({ lng: lng, lat: lat });
                        })(self.map.getCenter()),
                        zoom: self.map.getZoom(),
                        bearing: self.map.getBearing(),
                        pitch: self.map.getPitch(),
                    }
                    : {
                        center: { lng: 0, lat: 0 },
                        zoom: 0,
                        bearing: 0,
                        pitch: 0,
                    };
            },
            refreshViewport: function () {
                self.wrapper.viewportState = self.wrapper.getViewport();
            },
        };
        this.cancelled = false;
        /**
         * Initializes an empty registered elements object for the given componentId
         *
         * @param {string} componentId
         * @param {boolean} force
         */
        this.initRegisteredElements = function (componentId, force) {
            if (typeof self.registeredElements[componentId] === 'undefined' ||
                (typeof force !== 'undefined' && force)) {
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
         */
        this.addLayer = function (layer, beforeId, componentId) {
            if (!self.map.style) {
                return _this;
            }
            if (componentId && typeof componentId === 'string' && typeof layer.id !== 'undefined') {
                self.initRegisteredElements(componentId);
                self.registeredElements[componentId].layers.push(layer.id);
                if ((layer === null || layer === void 0 ? void 0 : layer.source) && typeof (layer === null || layer === void 0 ? void 0 : layer.source) !== 'string') {
                    self.registeredElements[componentId].sources.push(layer.id);
                }
            }
            self.map.addLayer(layer, beforeId);
            self.wrapper.fire('addlayer', { layer_id: layer.id });
            return _this;
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
                return _this;
            }
            if (componentId && typeof componentId === 'string' && typeof sourceId !== 'undefined') {
                self.initRegisteredElements(componentId);
                self.registeredElements[componentId].sources.push(sourceId);
            }
            self.map.addSource(sourceId, source);
            self.wrapper.fire('addsource', { source_id: sourceId });
            return _this;
        };
        /**
         * Overrides MapLibre-gl-js addImage function providing an additional componentId parameter for the wrapper element registration.
         *
         * @param {string} id
         * @param {*} image
         * @param {*} ref
         * @param {string} componentId
         */
        this.addImage = function (id, image, meta, componentId) {
            if (!self.map.style) {
                return _this;
            }
            if (typeof meta === 'string' && typeof componentId === 'undefined') {
                return self.addImage(id, image, undefined, meta);
            }
            if (componentId && typeof componentId === 'string' && typeof id !== 'undefined') {
                self.initRegisteredElements(componentId);
                self.registeredElements[componentId].images.push(id);
            }
            self.map.addImage(id, image, meta);
            return _this;
        };
        /**
         * Overrides MapLibre-gl-js on function providing an additional componentId parameter for the wrapper element registration.
         *
         * @param {string} type
         * @param {string} layerId
         * @param {function} handler
         * @param {string} componentId
         */
        this.on = function (type, layerId, handler, componentId) {
            var _a;
            if (typeof handler === 'string' && typeof layerId === 'function') {
                return self.on.call(self, type, undefined, layerId, handler);
            }
            var _arguments = [type, layerId, handler];
            if (!layerId) {
                _arguments = [type, handler];
            }
            if (componentId && typeof componentId === 'string') {
                self.initRegisteredElements(componentId);
                self.registeredElements[componentId].events.push(_arguments);
            }
            // @ts-ignore
            (_a = self.map).on.apply(_a, _arguments);
            return _this;
        };
        /**
         * Overrides MapLibre-gl-js addControl function providing an additional componentId parameter for the wrapper element registration.
         *
         * @param {object} control
         * @param {string} position
         * @param {string} componentId
         */
        this.addControl = function (control, position, componentId) {
            if (componentId && typeof componentId === 'string') {
                self.initRegisteredElements(componentId);
                self.registeredElements[componentId].controls.push(control);
            }
            self.map.addControl(control, position);
            return _this;
        };
        /**
         * Removes anything that has been added to the maplibre instance referenced with componentId
         *
         * @param {string} componentId
         */
        this.cleanup = function (componentId) {
            if (self.map.style && typeof self.registeredElements[componentId] !== 'undefined') {
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
            'moveLayer',
            'removeLayer',
            'removeSource',
            'setPaintProperty',
            'setLayoutProperty',
        ];
        updatingStyleFunctions.forEach(function (item) {
            _this[item] = function () {
                var _a;
                var props = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    props[_i] = arguments[_i];
                }
                //@ts-ignore
                if (self.map && self.map.style && typeof self.map.style[item] === 'function') {
                    //@ts-ignore
                    (_a = self.map.style)[item].apply(_a, props);
                }
                return self.map._update ? self.map._update(true) : undefined;
            };
        });
        // add style prop functions
        var styleFunctions = [
            'getLayer',
            'getSource',
            'listImages',
            'getPaintProperty',
            'getLayoutProperty',
            'removeImage',
        ];
        styleFunctions.forEach(function (item) {
            _this[item] = function () {
                var _a;
                var props = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    props[_i] = arguments[_i];
                }
                if (self.map && self.map.style) {
                    //@ts-ignore
                    return (_a = self.map.style)[item].apply(_a, props);
                }
                return false;
            };
        });
        this.addNativeMaplibreFunctionsAndProps = function () {
            //	add MapLibre-gl functions
            Object.getOwnPropertyNames(Object.getPrototypeOf(_this.map)).forEach(function (item) {
                if (typeof _this[item] === 'undefined') {
                    //@ts-ignore
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
            //	add MapLibre-gl properties
            Object.keys(_this.map).forEach(function (item) {
                if (typeof _this[item] === 'undefined') {
                    //@ts-ignore
                    _this[item] = self.map[item];
                }
            });
        };
        // add functions that are missing on the MapLibre instances prototype
        var missingFunctions = [
            'getZoom',
            'setZoom',
            'getCenter',
            'setCenter',
            'getBearing',
            'setBearing',
            'getPitch',
            'setPitch',
            'jumpTo',
            'flyTo',
            'panTo',
            'panBy',
            'panBy',
            'zoomTo',
            'zoomIn',
            'zoomOut',
            'getPadding',
            'setPadding',
            'rotateTo',
            'resetNorth',
            'resetNorthPitch',
            'snapToNorth',
            'cameraForBounds',
            'fitBounds',
            'fitScreenCoordinates',
            'getFreeCameraOptions',
            'setFreeCameraOptions',
            'easeTo',
            'stop',
        ];
        missingFunctions.forEach(function (item) {
            _this[item] = function () {
                var _a;
                var props = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    props[_i] = arguments[_i];
                }
                //@ts-ignore
                if (typeof self.map[item] === 'function') {
                    //@ts-ignore
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
                        if (!(typeof props.mapOptions.style === 'string' &&
                            props.mapOptions.style.indexOf('mapbox://') === -1)) return [3 /*break*/, 2];
                        return [4 /*yield*/, fetch(props.mapOptions.style)
                                .then(function (response) {
                                if (response.ok) {
                                    return response.json();
                                }
                                else {
                                    throw new Error('error loading map style.json');
                                }
                            })
                                .then(function (styleJson) {
                                styleJson.layers.forEach(function (item) {
                                    self.baseLayers.push(item.id);
                                    if (!self.firstSymbolLayer && item.type === 'symbol') {
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
                        self.map = new Map(props.mapOptions);
                        self.addNativeMaplibreFunctionsAndProps();
                        self.wrapper.refreshViewport();
                        self.wrapper.fire('viewportchange');
                        self.map.on('load', function () {
                            self.addNativeMaplibreFunctionsAndProps();
                        });
                        self.map.on('move', function () {
                            self.wrapper.viewportState = self.wrapper.getViewport();
                            self.wrapper.fire('viewportchange');
                        });
                        self.map.on('idle', function () {
                            self.wrapper.refreshLayerState();
                        });
                        self.map.on('data', function () {
                            self.wrapper.refreshLayerState();
                        });
                        if (typeof props.onReady === 'function') {
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

var lightDefault = createTheme({
    palette: {
        mode: 'light',
    },
});
var darkDefault = createTheme({
    palette: {
        mode: 'dark',
    },
});
var getDesignTokens = function (mode) { return (__assign(__assign({}, (mode === 'light' ? lightDefault : darkDefault)), { palette: __assign({ mode: mode }, (mode === 'dark'
        ? {
            primary: {
                main: '#009EE0',
            },
            secondary: { main: '#747577' },
            background: { paper: '#313131' },
            text: {
                primary: '#FFF',
                contrast: '#000',
            },
            topToolbar: { barColor: '#000' },
            navigation: { navColor: '#313131', navHover: '#747577' },
            GPS: {
                GPSActiveColor: '#fff',
                GPSInactiveColor: '#fff',
                GPSActiveBackgroundColor: '#747577',
            },
            compass: {
                compColor: '#313131',
                compHover: '#747577',
                compStroke: '#d3dce1',
                compNorth: '#cf003f',
                compSouth: '#d3dcf0',
            },
        }
        : {
            primary: {
                main: '#009EE0',
            },
            secondary: { main: '#747577' },
            text: {
                primary: '#000',
                contrast: '#fff',
            },
            topToolbar: { barColor: '#fff' },
            navigation: { navColor: '#fff', navHover: '#f5f5f5' },
            GPS: {
                GPSActiveColor: '#009EE0',
                GPSInactiveColor: '#000',
                GPSActiveBackgroundColor: '#fff',
            },
            compass: {
                compColor: '#fff',
                compHover: '#f5f5f5',
                compStroke: '#009ee0',
                compNorth: '#cf003f',
                compSouth: '#d3dcf0',
            },
        })) })); };
var getTheme = function (mode) {
    var _a;
    var theme = getDesignTokens(mode && ['light', 'dark'].includes(mode) ?
        (mode) :
        'light');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return createTheme(theme, {
        components: {
            MuiTypography: {
                styleOverrides: {
                    root: {},
                },
            },
            MuiAppBar: {
                styleOverrides: {
                    root: {
                        backgroundColor: theme.palette.topToolbar.barColor,
                    },
                },
            },
            MuiButton: {
                variants: [
                    {
                        props: { variant: 'navtools' },
                        style: (_a = {
                                minWidth: '20px',
                                minHeight: '20px',
                                fontWeight: 600
                            },
                            _a[theme.breakpoints.down('md')] = {
                                width: '50px',
                                height: '50px',
                                fontSize: '1.4em',
                            },
                            _a[theme.breakpoints.up('md')] = {
                                width: '30px',
                                height: '30px',
                                fontSize: '1.2em',
                            },
                            _a.color = theme.palette.text.primary,
                            _a.backgroundColor = theme.palette.navigation.navColor,
                            _a.borderRadius = '23%',
                            _a.margin = '0.15px',
                            _a.marginTop = '4px',
                            _a[':hover'] = {
                                backgroundColor: theme.palette.navigation.navHover,
                            },
                            _a),
                    },
                ],
            },
            MuiListItemText: {
                styleOverrides: {
                    primary: function (_a) {
                        var ownerState = _a.ownerState;
                        if ((ownerState === null || ownerState === void 0 ? void 0 : ownerState.variant) === 'layerlist') {
                            return { fontSize: '0.9rem' };
                        }
                        return {};
                    },
                    secondary: function (_a) {
                        var ownerState = _a.ownerState;
                        if ((ownerState === null || ownerState === void 0 ? void 0 : ownerState.variant) === 'layerlist') {
                            return { fontSize: '0.7rem' };
                        }
                        return {};
                    },
                },
            },
        },
    });
};

var config = {
    source_openmaptiles_url: 'https://wms.wheregroup.com/tileserver/tile/world-0-14.json',
    sprite: 'https://wms.wheregroup.com/tileserver/sprites/osm-bright',
    glyphs: 'https://wms.wheregroup.com/tileserver/fonts/{fontstack}/{range}.pbf',
    sourceOptions_tiles: ['https://wms.wheregroup.com/tileserver/tile/world-0-14/{z}/{x}/{y}.pbf']
};

var LayerContext = React__default.createContext({});
function LayerContextProvider(props) {
    var _a = React__default.useState([]), layers = _a[0], setLayers = _a[1];
    var _b = React__default.useState([]), backgroundLayers = _b[0], setBackgroundLayers = _b[1];
    var _c = React__default.useState([]), symbolLayers = _c[0], setSymbolLayers = _c[1];
    var _d = React__default.useState(config.sourceOptions_tiles[0]), tileUrl = _d[0], setTileUrl = _d[1];
    var vtLayerConfig = useMemo(function () { return ({
        layerId: 'openmaptiles',
        sourceOptions: {
            type: 'vector',
            tiles: [tileUrl],
        },
    }); }, [tileUrl]);
    var updateStyle = function (style) {
        if (!style)
            return;
        var backgroundLayers = [];
        var symbolLayers = [];
        style.layers.forEach(function (layer, idx) {
            if (layer.type === 'symbol') {
                symbolLayers.push(layer);
            }
            else {
                if (idx === 0)
                    layer.id = style.name || 'background';
                backgroundLayers.push(layer);
            }
        });
        setBackgroundLayers(backgroundLayers);
        setSymbolLayers(symbolLayers);
    };
    useEffect(function () {
        if (layers.filter(function (el) { return !(el === null || el === void 0 ? void 0 : el.id); }).length) {
            var _layers = __spreadArray([], layers, true);
            _layers.forEach(function (el) {
                if (!(el === null || el === void 0 ? void 0 : el.id)) {
                    el.id = v4();
                }
            });
            setLayers(_layers);
        }
    }, [layers]);
    var moveLayer = useCallback(function (layerId, getNewPos) {
        var _a;
        var targetLayer = (_a = layers === null || layers === void 0 ? void 0 : layers.filter) === null || _a === void 0 ? void 0 : _a.call(layers, function (el) { return el.id === layerId; });
        if (targetLayer.length > 0) {
            var newLayers = __spreadArray([], layers, true);
            var element = targetLayer[0];
            var idx = layers.indexOf(element);
            var newPos = getNewPos(idx);
            if (newPos >= 0 && newPos <= layers.length - 1) {
                newLayers.splice(idx, 1);
                newLayers.splice(newPos, 0, element);
                setLayers(newLayers);
            }
        }
    }, [layers]);
    var moveDown = useCallback(function (layerId) {
        moveLayer(layerId, function (idx) { return idx + 1; });
    }, [moveLayer]);
    var moveUp = useCallback(function (layerId) {
        moveLayer(layerId, function (idx) { return idx - 1; });
    }, [moveLayer]);
    var value = {
        layers: layers,
        setLayers: setLayers,
        backgroundLayers: backgroundLayers,
        setBackgroundLayers: setBackgroundLayers,
        symbolLayers: symbolLayers,
        setSymbolLayers: setSymbolLayers,
        updateStyle: updateStyle,
        vtLayerConfig: vtLayerConfig,
        tileUrl: tileUrl,
        setTileUrl: setTileUrl,
        moveUp: moveUp,
        moveDown: moveDown,
        moveLayer: moveLayer,
    };
    return React__default.createElement(LayerContext.Provider, { value: value }, props.children);
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
            if (typeof maps.current[mapId] !== 'undefined') {
                delete maps.current[mapId];
            }
            var mapIdIndex = mapIds_raw.current.indexOf(mapId);
            if (mapIdIndex > -1) {
                mapIds_raw.current.splice(mapIdIndex, 1);
            }
            setMapIds(__spreadArray([], mapIds_raw.current, true));
            if (mapIds_raw.current.length === 0 && map) {
                setMap(undefined);
            }
        }
        else {
            removeMap('anonymous_map');
        }
    };
    var setMapHandler = function (mapInstance) {
        setMap(mapInstance);
        if (mapIds.length === 0) {
            var mapId = 'anonymous_map';
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
                if (!map || (map === null || map === void 0 ? void 0 : map.cancelled) === true) {
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
    return (React__default.createElement(MapContext.Provider, { value: value },
        React__default.createElement(LayerContextProvider, null,
            React__default.createElement(ThemeProvider, { theme: getTheme('light') }, children))));
};

var defaultProps$1 = {
    mapId: undefined,
    options: {
        center: { lng: 8.607, lat: 53.1409349 },
        zoom: 11,
        container: '',
        style: {
            version: 8,
            name: 'blank',
            center: [0, 0],
            zoom: 0,
            sources: {},
            sprite: 'https://wms.wheregroup.com/tileserver/sprites/osm-bright',
            glyphs: 'https://wms.wheregroup.com/tileserver/fonts/{fontstack}/{range}.pbf',
            layers: [
                {
                    id: '_background',
                    type: 'background',
                    paint: {
                        'background-color': 'rgba(0,0,0,0)',
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
    var _a, _b;
    var mapRef = useRef(null);
    var mapContainer = useRef(null);
    var mapContext = useContext(MapContext);
    var mapIdRef = useRef(props.mapId);
    var initializedRef = useRef(false);
    var currentStyle = useRef((_a = props.options) === null || _a === void 0 ? void 0 : _a.style);
    useEffect(function () {
        var mapId = mapIdRef.current;
        return function () {
            var _a, _b;
            initializedRef.current = false;
            mapContext.removeMap(mapId);
            if (mapRef.current) {
                (_b = (_a = mapRef.current.map) === null || _a === void 0 ? void 0 : _a.remove) === null || _b === void 0 ? void 0 : _b.call(_a);
                mapRef.current.cancelled = true;
                mapRef.current = null;
            }
        };
    }, []);
    useEffect(function () {
        var _a, _b;
        if (initializedRef.current)
            return;
        if (mapContainer.current) {
            initializedRef.current = true;
            mapRef.current = new MapLibreGlWrapper({
                mapOptions: __assign(__assign(__assign({ style: '' }, props.options), (((_a = props === null || props === void 0 ? void 0 : props.options) === null || _a === void 0 ? void 0 : _a.style) ? {} : { style: (_b = defaultProps$1 === null || defaultProps$1 === void 0 ? void 0 : defaultProps$1.options) === null || _b === void 0 ? void 0 : _b.style })), { container: mapContainer.current }),
                onReady: function (map, wrapper) {
                    map.once('load', function () {
                        if (!(wrapper === null || wrapper === void 0 ? void 0 : wrapper.cancelled)) {
                            // add maplibre instance to window for debugging purposes
                            window['_map'] = map;
                            if (props.mapId) {
                                mapContext.registerMap(props.mapId, wrapper);
                            }
                            else {
                                mapContext.setMap(wrapper);
                            }
                        }
                        else {
                            map.remove();
                        }
                    });
                },
            });
        }
    }, [props.options, props.mapId]);
    useEffect(function () {
        var _a, _b;
        if (((_a = mapRef.current) === null || _a === void 0 ? void 0 : _a.map) &&
            ((_b = props === null || props === void 0 ? void 0 : props.options) === null || _b === void 0 ? void 0 : _b.style) &&
            currentStyle.current !== props.options.style) {
            currentStyle.current = props.options.style;
            mapRef.current.map.setStyle(props.options.style);
        }
    }, [(_b = props === null || props === void 0 ? void 0 : props.options) === null || _b === void 0 ? void 0 : _b.style]);
    return (React__default.createElement("div", { ref: mapContainer, className: "mapContainer", style: props.style }));
};
MapLibreMap.defaultProps = defaultProps$1;

/**
 * React hook that allows subscribing to map state changes
 *
 * @component
 */
function useMapState(props) {
    // Use a useRef hook to reference the layer object to be able to access it later inside useEffect hooks
    var mapContext = useContext(MapContext);
    var initializedRef = useRef(false);
    var mapRef = useRef(null);
    var _a = useState(), viewport = _a[0], setViewport = _a[1];
    var viewportRef = useRef(undefined);
    var _b = useState([]), layers = _b[0], setLayers = _b[1];
    var layersRef = useRef("");
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
        if (!((_a = props === null || props === void 0 ? void 0 : props.filter) === null || _a === void 0 ? void 0 : _a.includeBaseLayers) && (layer === null || layer === void 0 ? void 0 : layer.baseLayer)) {
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
                mapRef.current = null;
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

function useMap(props) {
    var mapContext = useContext(MapContext);
    var _a = useState({ map: undefined, ready: false }), state = _a[0], setState = _a[1];
    var mapState = useMapState({
        mapId: props === null || props === void 0 ? void 0 : props.mapId,
        watch: {
            viewport: false,
            layers: (props === null || props === void 0 ? void 0 : props.waitForLayer) ? true : false,
            sources: false,
        },
        filter: {
            includeBaseLayers: true,
        },
    });
    var mapRef = useRef(null);
    var componentId = useRef(v4());
    var cleanup = function () {
        if (mapRef.current) {
            mapRef.current.cleanup(componentId.current);
        }
    };
    useEffect(function () {
        return function () {
            cleanup();
            mapRef.current = null;
        };
    }, []);
    useEffect(function () {
        var _a;
        if (mapRef.current && mapRef.current.cancelled === true) {
            mapRef.current = null;
            setState({ map: undefined, ready: false });
        }
        if (mapRef.current || !mapContext.mapExists(props === null || props === void 0 ? void 0 : props.mapId))
            return;
        // check if waitForLayer (string, layer id of the layer this hook is supposed to wait for)
        // exists as layer in the MapLibre instance
        if (props === null || props === void 0 ? void 0 : props.waitForLayer) {
            var layerFound_1 = false;
            (_a = mapState === null || mapState === void 0 ? void 0 : mapState.layers) === null || _a === void 0 ? void 0 : _a.forEach(function (layer) {
                if (layer.id === (props === null || props === void 0 ? void 0 : props.waitForLayer)) {
                    layerFound_1 = true;
                }
            });
            if (!layerFound_1) {
                return;
            }
        }
        mapRef.current = mapContext.getMap(props === null || props === void 0 ? void 0 : props.mapId);
        setState({ map: mapRef.current, ready: true });
    }, [mapContext.mapIds, mapState.layers, mapContext, props]);
    return {
        map: state.map,
        mapIsReady: state.ready,
        componentId: componentId.current,
        layers: mapState.layers,
        cleanup: cleanup,
    };
}

/**
 * Component template
 *
 */
var MlCenterPosition = function (props) {
    var mapHook = useMap({
        mapId: props.mapId,
        waitForLayer: props.insertBeforeLayer,
    });
    var _a = useState(false), locationAccessDenied = _a[0], setLocationAccessDenied = _a[1];
    var centerCurrentLocation = function () {
        navigator.geolocation.getCurrentPosition(getLocationSuccess, getLocationError);
    };
    var getLocationSuccess = useCallback(function (location) {
        var _a, _b, _c;
        (_c = (_a = mapHook.map) === null || _a === void 0 ? void 0 : (_b = _a.map).setCenter) === null || _c === void 0 ? void 0 : _c.call(_b, [location.coords.longitude, location.coords.latitude]);
    }, [mapHook.map]);
    var getLocationError = function () {
        console.log('Access of user location denied');
        setLocationAccessDenied(true);
    };
    return (React__default.createElement(React__default.Fragment, null,
        React__default.createElement(Button, { variant: "navtools", sx: {
                zIndex: 1002,
                color: !locationAccessDenied ? props.onColor : props.offColor,
            }, onClick: centerCurrentLocation, disabled: locationAccessDenied },
            React__default.createElement(FilterCenterFocusIcon, { sx: { fontSize: { xs: '1.4em', md: '1em' } } }))));
};
MlCenterPosition.defaultProps = {
    mapId: undefined,
};

/**
 * Component description
 *
 */
var MlComponentTemplate = function (props) {
    var mapHook = useMap({
        mapId: props.mapId,
    });
    console.log(mapHook.componentId + " remove this log");
    return React__default.createElement(React__default.Fragment, null);
};
MlComponentTemplate.defaultProps = {
    mapId: undefined,
};

var createExport = function (options) {
    var width = options.width;
    var height = options.height;
    // Create map container
    var hiddenContainer = document.createElement('div');
    hiddenContainer.className = 'hidden-map';
    hiddenContainer.style.width = '0px';
    hiddenContainer.style.height = '0px';
    hiddenContainer.style.overflow = 'hidden';
    document.body.appendChild(hiddenContainer);
    var container = document.createElement('div');
    container.style.width = width + 'px';
    container.style.height = height + 'px';
    hiddenContainer.appendChild(container);
    var style = options.map.map.getStyle();
    var _loop_1 = function (name_1) {
        var src = style.sources[name_1];
        Object.keys(src).forEach(function (key) {
            // delete property if value is undefined.
            // for instance, raster-dem might have undefined value in "url" and "bounds"
            if (!src[key]) {
                delete src[key];
            }
        });
    };
    // delete undefined source properties
    for (var name_1 in style.sources) {
        _loop_1(name_1);
    }
    // Create a new MapLibre-gl instance
    var renderMap = new Map({
        container: container,
        center: options.map.map.getCenter(),
        zoom: options.map.map.getZoom(),
        bearing: 0,
        pitch: 0,
        interactive: false,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        preserveDrawingBuffer: true,
        fadeDuration: 0,
        attributionControl: false,
        style: style,
    });
    var bboxCamera = renderMap._cameraForBoxAndBearing([options.bboxUnrotated[0], options.bboxUnrotated[1]], [options.bboxUnrotated[2], options.bboxUnrotated[3]], options.bearing + options.map.map.getBearing());
    renderMap._fitInternal(bboxCamera);
    return new Promise(function (resolve) {
        console.log('before idle');
        renderMap.once('idle', function () {
            var params = __assign(__assign({}, options), { renderMap: renderMap, hiddenContainer: hiddenContainer, createPdf: function (_options) {
                    return createJsPdf(__assign(__assign(__assign({}, options), { renderMap: renderMap, hiddenContainer: hiddenContainer }), _options));
                }, createPng: function (_options) {
                    return createPng(__assign(__assign(__assign({}, options), { renderMap: renderMap, hiddenContainer: hiddenContainer }), _options));
                } });
            resolve(params);
        });
    });
};
function createJsPdf(options) {
    var pdf = new jsPDF({
        orientation: (options === null || options === void 0 ? void 0 : options.orientation) === 'portrait' ? 'p' : 'l',
        unit: 'mm',
        compress: true,
        format: options.format,
    });
    Object.defineProperty(window, 'devicePixelRatio', {
        get: function () {
            return 300 / 96;
        },
    });
    return new Promise(function (resolve) {
        var _b;
        //Render map image
        pdf.addImage(options.renderMap.getCanvas().toDataURL('image/png'), 'png', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight(), undefined, 'FAST');
        // remove DOM Elements
        options.renderMap.remove();
        (_b = options.hiddenContainer.parentNode) === null || _b === void 0 ? void 0 : _b.removeChild(options.hiddenContainer);
        var params = __assign(__assign({}, options), { pdf: pdf, downloadPdf: function (_options) { return downloadPdf(__assign(__assign({}, params), _options)); }, formData: new FormData() });
        resolve(params);
    });
}
function downloadPdf(options) {
    options.pdf.save('Map.pdf');
    return new Promise(function (resolve) {
        resolve(__assign({}, options));
    });
}
function createPng(options) {
    return new Promise(function (resolve) {
        var png = options.renderMap.getCanvas().toDataURL('image/png');
        var params = __assign(__assign({}, options), { png: png, downloadPng: function (_options) { return downloadPng(__assign(__assign({}, params), _options)); } });
        resolve(params);
    });
}
function downloadPng(options) {
    var _a = document.createElement('a');
    _a.download = (options === null || options === void 0 ? void 0 : options.name) ? options.name + '.png' : 'map.png';
    _a.href = options.png;
    document.body.appendChild(_a);
    _a.click();
    document.body.removeChild(_a);
    return new Promise(function (resolve) {
        resolve(__assign({}, options));
    });
}

function useExportMap(props) {
    var mapHook = useMap({ mapId: props.mapId });
    var _createExport = useMemo(function () {
        if (mapHook.map) {
            return function (options) {
                return createExport(__assign({ map: mapHook.map }, options));
            };
        }
        return;
    }, [mapHook.map]);
    return {
        createExport: _createExport,
    };
}

/**
 * Renders a button that will create a PDF version of the current map view (dimensions adjusted to fit Din A4 Paper).
 */
var MlCreatePdfButton = function (props) {
    var mapHook = useMap({
        mapId: props.mapId,
    });
    var exportMap = useExportMap({ mapId: props.mapId });
    var _a = React__default.useState(false), loading = _a[0], setLoading = _a[1];
    return (React__default.createElement(React__default.Fragment, null,
        React__default.createElement(Button$1, { color: "primary", variant: "contained", onClick: function () {
                if (mapHook.map && (exportMap === null || exportMap === void 0 ? void 0 : exportMap.createExport)) {
                    setLoading(true);
                    var bounds = mapHook.map.getBounds();
                    var bbox = [
                        bounds.getWest(),
                        bounds.getSouth(),
                        bounds.getEast(),
                        bounds.getNorth(),
                    ];
                    exportMap
                        .createExport(__assign({ width: 595 * 1.4, height: 842 * 1.4, bbox: bbox, bboxUnrotated: bbox, bearing: mapHook.map.getBearing(), format: 'a4', orientation: 'portrait' }, props.exportOptions))
                        .then(function (res) { return res.createPdf(); })
                        .then(function (res) {
                        setLoading(false);
                        return res.downloadPdf();
                    })
                        .catch(function (error) {
                        console.log(error);
                        setLoading(false);
                    });
                }
            } }, loading ? (React__default.createElement(CircularProgress, { size: 24, sx: {
                color: '#fff',
            } })) : (React__default.createElement(PrinterIcon, null)))));
};
MlCreatePdfButton.defaultProps = {
    mapId: undefined,
};

var PdfTemplates = {
    A4: {
        '300dpi': {
            width: 2480,
            height: 3508,
        },
        '150dpi': {
            width: 1240,
            height: 1754,
        },
        '72dpi': {
            width: 595,
            height: 842,
        },
    },
    A3: {
        '300dpi': {
            width: 3505,
            height: 4961,
        },
        '150dpi': {
            width: 1754,
            height: 2480,
        },
        '72dpi': {
            width: 842,
            height: 1191,
        },
    },
    A2: {
        '300dpi': {
            width: 4961,
            height: 7016,
        },
        '150dpi': {
            width: 2480,
            height: 3508,
        },
        '72dpi': {
            width: 1191,
            height: 1684,
        },
    },
    A1: {
        '300dpi': {
            width: 7016,
            height: 9933,
        },
        '150dpi': {
            width: 3508,
            height: 4967,
        },
        '72dpi': {
            width: 1684,
            height: 2384,
        },
    },
    A0: {
        '300dpi': {
            width: 9933,
            height: 14043,
        },
        '150dpi': {
            width: 4967,
            height: 7022,
        },
        '72dpi': {
            width: 2384,
            height: 3370,
        },
    },
};

var PdfContext = React__default.createContext({});
var defaultTemplate = PdfTemplates['A4']['72dpi'];
var PdfContextProvider = function (_a) {
    var children = _a.children;
    var _b = useState('A4'), format = _b[0], setFormat = _b[1];
    var _c = useState('72dpi'), quality = _c[0], setQuality = _c[1];
    var _d = useState({
        center: undefined,
        scale: undefined,
        rotate: 0,
        width: 210,
        height: 297,
        orientation: 'portrait',
        fixedScale: 0,
    }), options = _d[0], setOptions = _d[1];
    var geojsonRef = useRef(null);
    var template = useMemo(function () {
        if (typeof PdfTemplates[format][quality] !== 'undefined') {
            return options.orientation === 'portrait'
                ? PdfTemplates[format][quality]
                : {
                    width: PdfTemplates[format][quality].height,
                    height: PdfTemplates[format][quality].width,
                };
        }
        return defaultTemplate;
    }, [format, quality, options.orientation]);
    var value = {
        options: options,
        setOptions: setOptions,
        format: format,
        setFormat: setFormat,
        quality: quality,
        setQuality: setQuality,
        geojsonRef: geojsonRef,
        template: template,
    };
    return React__default.createElement(PdfContext.Provider, { value: value }, children);
};

function getTargetRotationAngle(target) {
    var el_style = window.getComputedStyle(target, null);
    var el_transform = el_style.getPropertyValue('transform');
    var deg = 0;
    if (el_transform !== 'none') {
        var values = el_transform.split('(')[1].split(')')[0].split(',');
        var a = parseFloat(values[0]);
        var b = parseFloat(values[1]);
        deg = Math.round(Math.atan2(b, a) * (180 / Math.PI));
    }
    return deg < 0 ? deg + 360 : deg;
}
function calcElemTransformedPoint(el, point, transformOrigin) {
    var style = getComputedStyle(el);
    var p = [point[0] - transformOrigin[0], point[1] - transformOrigin[1]];
    var matrix = new DOMMatrixReadOnly(style.transform);
    // transform pixel coordinates according to the css transform state of "el" (target)
    return [
        p[0] * matrix.a + p[1] * matrix.c + matrix.e + transformOrigin[0],
        p[0] * matrix.b + p[1] * matrix.d + matrix.f + transformOrigin[1],
    ];
}
// measure distance in pixels that is used to determine the current css transform.scale relative to the maps viewport.zoom
var scaleAnchorInPixels = 10;
// used to determine the MapZoomScale modifier which is multiplied with props.options.scale to relate the scale to the current map viewport.zoom
function getMapZoomScaleModifier(point, _map) {
    var left = _map.unproject(point);
    var right = _map.unproject([point[0] + scaleAnchorInPixels, point[1]]);
    var maxMeters = left.distanceTo(right);
    return scaleAnchorInPixels / maxMeters;
}
/**
 * PdfPreview component renders a transformable (drag, scale, rotate) preview of the desired export or print content
 */
function PdfPreview(props) {
    var _a;
    var mapState = useMapState({ mapId: props.mapId, watch: { layers: false, viewport: true } });
    var targetRef = useRef(null);
    var fixedScaleRef = useRef(null);
    var moveableRef = useRef(null);
    var mapContainerRef = useRef(document.querySelector('.mapContainer'));
    //const [transform, setTransform] = useState('translate(452.111px, 15.6148px)');
    var mapHook = useMap({
        mapId: props.mapId,
    });
    useEffect(function () {
        var _a;
        if (!((_a = mapState === null || mapState === void 0 ? void 0 : mapState.viewport) === null || _a === void 0 ? void 0 : _a.zoom) || !mapHook.map)
            return;
        // if the component was initialized with scale or center as undefined derive those values from the current map view state
        //initialize props if not defined
        var _centerX = Math.round(mapHook.map.map._container.clientWidth / 2);
        var _centerY = Math.round(mapHook.map.map._container.clientHeight / 2);
        if (!props.options.scale) {
            //const scale = parseFloat(/(14/mapState.viewport.zoom));
            var scale_1 = 1 / getMapZoomScaleModifier([_centerX, _centerY], mapHook.map.map);
            props.setOptions(function (val) { return (__assign(__assign({}, val), { scale: [scale_1, scale_1] })); });
        }
        if (!props.options.center) {
            var _center_1 = mapHook.map.map.unproject([_centerX, _centerY]);
            props.setOptions(function (val) { return (__assign(__assign({}, val), { center: [_center_1.lng, _center_1.lat] })); });
        }
    }, [mapHook.map, (_a = mapState.viewport) === null || _a === void 0 ? void 0 : _a.zoom]);
    useEffect(function () {
        if (!mapHook.map)
            return;
        mapHook.map.map.setPitch(0);
        var _maxPitch = mapHook.map.map.getMaxPitch();
        mapHook.map.map.setMaxPitch(0);
        return function () {
            var _a;
            (_a = mapHook.map) === null || _a === void 0 ? void 0 : _a.map.setMaxPitch(_maxPitch);
        };
    }, [mapHook.map]);
    var transformOrigin = useMemo(function () {
        if (props.options.orientation === 'portrait') {
            return [props.options.width / 2, props.options.height / 2];
        }
        else {
            return [props.options.height / 2, props.options.width / 2];
        }
    }, [props.options.orientation, props.options.width, props.options.height]);
    var transform = useMemo(function () {
        var _a, _b;
        if (!mapHook.map || !props.options.scale)
            return 'none';
        var centerInPixels = mapHook.map.map.project(props.options.center);
        var x = centerInPixels.x;
        var y = centerInPixels.y;
        var scale = props.options.scale[0] * getMapZoomScaleModifier([x, y], mapHook.map.map);
        var viewportBearing = ((_a = mapState === null || mapState === void 0 ? void 0 : mapState.viewport) === null || _a === void 0 ? void 0 : _a.bearing) ? (_b = mapState.viewport) === null || _b === void 0 ? void 0 : _b.bearing : 0;
        var _transform = "translate(".concat(Math.floor(centerInPixels.x - transformOrigin[0]), "px,").concat(Math.floor(centerInPixels.y - transformOrigin[1]), "px) rotate(").concat(props.options.rotate - viewportBearing, "deg) scale(").concat(scale, ",").concat(scale, ")");
        if (targetRef.current)
            targetRef.current.style.transform = _transform;
        return _transform;
    }, [
        mapHook.map,
        mapState.viewport,
        props.options.scale,
        props.options.rotate,
        props.options.center,
        transformOrigin,
    ]);
    useEffect(function () {
        var _a;
        (_a = moveableRef.current) === null || _a === void 0 ? void 0 : _a.updateTarget();
    }, [transform]);
    useEffect(function () {
        // update props.options.scale if fixedScale was changed
        if (!mapHook.map ||
            !props.options.center ||
            !props.options.fixedScale ||
            (typeof props.options.fixedScale !== 'undefined' &&
                fixedScaleRef.current === props.options.fixedScale))
            return;
        fixedScaleRef.current = props.options.fixedScale;
        var point = turf.point(props.options.center);
        var distance = props.options.fixedScale * (props.options.width / 1000);
        var bearing = 90;
        var options = { units: 'meters' };
        var destination = turf.destination(point, distance, bearing, options);
        var centerInPixels = mapHook.map.map.project(point.geometry.coordinates);
        var destinationInPixels = mapHook.map.map.project(destination.geometry.coordinates);
        var scaleFactor = (Math.round(destinationInPixels.x - centerInPixels.x) / props.options.width) *
            (1 / getMapZoomScaleModifier([centerInPixels.x, centerInPixels.y], mapHook.map.map));
        props.setOptions(function (val) { return (__assign(__assign({}, val), { scale: [scaleFactor, scaleFactor] })); });
    }, [mapHook.map, props.options.width, props.options.center, props.options.fixedScale]);
    // update props.geoJsonRef
    useEffect(function () {
        var _a;
        if (targetRef.current && mapHook.map) {
            // apply orientation
            var _width = props.options.width;
            var _height = props.options.height;
            if (props.options.orientation === 'portrait') {
                targetRef.current.style.width = props.options.width + 'px';
                targetRef.current.style.height = props.options.height + 'px';
            }
            else {
                targetRef.current.style.width = props.options.height + 'px';
                targetRef.current.style.height = props.options.width + 'px';
                _width = props.options.height;
                _height = props.options.width;
            }
            (_a = moveableRef.current) === null || _a === void 0 ? void 0 : _a.updateTarget();
            var topLeft = mapHook.map.map.unproject(calcElemTransformedPoint(targetRef.current, [0, 0], transformOrigin));
            var topRight = mapHook.map.map.unproject(calcElemTransformedPoint(targetRef.current, [_width, 0], transformOrigin));
            var bottomLeft = mapHook.map.map.unproject(calcElemTransformedPoint(targetRef.current, [0, _height], transformOrigin));
            var bottomRight = mapHook.map.map.unproject(calcElemTransformedPoint(targetRef.current, [_width, _height], transformOrigin));
            var _geoJson = {
                type: 'Feature',
                bbox: [topLeft.lng, topLeft.lat, bottomRight.lng, bottomRight.lat],
                geometry: {
                    type: 'Polygon',
                    coordinates: [
                        [
                            [topLeft.lng, topLeft.lat],
                            [topRight.lng, topRight.lat],
                            [bottomRight.lng, bottomRight.lat],
                            [bottomLeft.lng, bottomLeft.lat],
                            [topLeft.lng, topLeft.lat],
                        ],
                    ],
                },
                properties: { bearing: getTargetRotationAngle(targetRef.current) },
            };
            props.geojsonRef.current = _geoJson;
        }
        return undefined;
    }, [
        mapHook,
        transform,
        props.options.orientation,
        props.geojsonRef,
        mapState,
        targetRef.current,
        transformOrigin,
    ]);
    return mapContainerRef.current ? ReactDOM.createPortal(React__default.createElement(React__default.Fragment, null,
        React__default.createElement("div", { className: "target", ref: targetRef, style: { transform: transform, transformOrigin: 'center center' } }),
        React__default.createElement(Moveable
        // eslint-disable-next-line
        // @ts-ignore:
        , { 
            // eslint-disable-next-line
            // @ts-ignore:
            ref: moveableRef, target: targetRef, container: null, origin: true, keepRatio: true, 
            /* draggable */
            draggable: true, onDrag: function (e) {
                var _a;
                if (mapHook.map) {
                    var _transformParts = e.transform.split('translate(');
                    _transformParts = _transformParts[1].split('px)')[0].split('px, ');
                    var _center_2 = (_a = mapHook.map) === null || _a === void 0 ? void 0 : _a.map.unproject([
                        parseInt(_transformParts[0]) + transformOrigin[0],
                        parseInt(_transformParts[1]) + transformOrigin[1],
                    ]);
                    props.setOptions(function (val) { return (__assign(__assign({}, val), { center: [_center_2.lng, _center_2.lat] })); });
                }
            }, 
            /* scalable */
            scalable: props.options.fixedScale ? false : true, onScale: function (e) {
                if (mapHook.map) {
                    var _transformParts = e.drag.transform.split('scale(');
                    _transformParts = _transformParts[1].split(')')[0].split(', ');
                    var centerInPixels = mapHook.map.map.project(props.options.center);
                    var x = centerInPixels.x;
                    var y = centerInPixels.y;
                    var scale_2 = parseFloat(_transformParts[0]) *
                        (1 / getMapZoomScaleModifier([x, y], mapHook.map.map));
                    props.setOptions(function (val) { return (__assign(__assign({}, val), { scale: [scale_2, scale_2] })); });
                }
            }, 
            /* rotatable */
            rotatable: true, onRotate: function (e) {
                var _a;
                if (mapHook.map && mapState.viewport) {
                    var _transformParts = e.drag.transform.split('rotate(');
                    var _transformPartString_1 = _transformParts[1].split('deg)')[0];
                    var viewportBearing_1 = ((_a = mapState === null || mapState === void 0 ? void 0 : mapState.viewport) === null || _a === void 0 ? void 0 : _a.bearing) ? mapState.viewport.bearing : 0;
                    props.setOptions(function (val) { return (__assign(__assign({}, val), { rotate: parseFloat(_transformPartString_1) + viewportBearing_1 })); });
                }
            } })), mapContainerRef.current) : React__default.createElement(React__default.Fragment, null);
}

var scaleOptions = [
    {
        value: 0,
        label: 'free scale',
    },
    {
        value: 250,
        label: '1/250',
    },
    {
        value: 500,
        label: '1/500',
    },
    {
        value: 750,
        label: '1/750',
    },
    {
        value: 1000,
        label: '1/1000',
    },
    {
        value: 1500,
        label: '1/1500',
    },
    {
        value: 2000,
        label: '1/2000',
    },
    {
        value: 10000,
        label: '1/10000',
    },
    {
        value: 100000,
        label: '1/100000',
    },
];
var qualityOptions = [
    {
        value: '72dpi',
        label: 'Draft (72dpi)',
    },
    {
        value: '150dpi',
        label: 'Medium (150dpi)',
    },
    {
        value: '300dpi',
        label: 'High (300dpi)',
    },
];
function PdfForm(props) {
    var _a, _b;
    var _c = useState(false), loading = _c[0], setLoading = _c[1];
    var pdfContext = useContext(PdfContext);
    var mapHook = useMap({
        mapId: props.mapId,
    });
    var mapExporter = useExportMap({ mapId: props.mapId });
    var createPdfHandler = useCallback(function () {
        var _a, _b, _c, _d, _e, _f;
        if (mapHook.map &&
            mapExporter.createExport &&
            pdfContext.template &&
            pdfContext.format &&
            ((_a = pdfContext.options) === null || _a === void 0 ? void 0 : _a.orientation) &&
            ((_c = (_b = pdfContext.geojsonRef) === null || _b === void 0 ? void 0 : _b.current) === null || _c === void 0 ? void 0 : _c.bbox) &&
            ((_d = pdfContext.geojsonRef) === null || _d === void 0 ? void 0 : _d.current)) {
            setLoading(true);
            var bbox = turf.bbox(pdfContext.geojsonRef.current);
            mapExporter
                .createExport({
                width: pdfContext.template.width,
                height: pdfContext.template.height,
                bbox: bbox,
                bboxUnrotated: pdfContext.geojsonRef.current.bbox,
                bearing: ((_f = (_e = pdfContext.geojsonRef.current) === null || _e === void 0 ? void 0 : _e.properties) === null || _f === void 0 ? void 0 : _f.bearing) || 0,
                format: pdfContext.format.toLowerCase(),
                orientation: pdfContext.options.orientation,
            })
                .then(function (res) { return res.createPdf(); })
                .then(function (res) {
                if (typeof props.onCreatePdf === 'function') {
                    res.formData = new FormData(document.getElementById('createPdfFormID'));
                    props.onCreatePdf(res);
                }
                setLoading(false);
                return res.downloadPdf();
            })
                .catch(function (error) {
                console.log(error);
                setLoading(false);
            });
        }
    }, [mapHook.map, pdfContext]);
    var mediaIsMobile = useMediaQuery('(max-width: 950px)');
    var formControlStyles = useMemo(function () {
        return __assign({ margin: mediaIsMobile ? '1px 0 8px 0 ' : '5px 0 15px 0 ' }, ((props === null || props === void 0 ? void 0 : props.formControlStyles) ? __assign({}, props.formControlStyles) : {}));
    }, [
        mediaIsMobile,
        props.formControlStyles
    ]);
    return (React__default.createElement(React__default.Fragment, null,
        React__default.createElement("form", { id: "createPdfFormID" },
            React__default.createElement(FormControl, { fullWidth: true, sx: formControlStyles },
                React__default.createElement(Button, { variant: "contained", className: "createPdfButton", onClick: createPdfHandler, disabled: loading, sx: { marginBottom: '16px' } }, "create PDF"),
                loading && (React__default.createElement(CircularProgress, { size: 24, sx: {
                        color: 'primary.main',
                        position: 'absolute',
                        top: '25%',
                        left: '50%',
                        marginTop: '-12px',
                        marginLeft: '-12px',
                    } }))),
            React__default.createElement(FormControl, { fullWidth: true, sx: formControlStyles },
                React__default.createElement(InputLabel, { sx: { marginTop: '3px' }, id: "format-select-label" }, "Format"),
                React__default.createElement(Select, { labelId: "format-select-label", id: "format-select", label: "Format", value: pdfContext.format, onChange: function (event) {
                        var _a;
                        (_a = pdfContext.setFormat) === null || _a === void 0 ? void 0 : _a.call(pdfContext, event.target.value);
                    } }, Object.keys(PdfTemplates).map(function (el) { return (React__default.createElement(MenuItem, { key: el, value: el }, el)); }))),
            React__default.createElement(FormControl, { fullWidth: true, sx: formControlStyles },
                React__default.createElement(FormLabel, { id: "orientation-radio-buttons-group-label" }, "Orientation"),
                React__default.createElement(RadioGroup, { row: true, "aria-labelledby": "orientation-radio-buttons-group-label", name: "orientation-radio-buttons-group", value: (_a = pdfContext.options) === null || _a === void 0 ? void 0 : _a.orientation, onChange: function (event) {
                        if (!pdfContext.setOptions)
                            return;
                        pdfContext.setOptions(function (val) { return (__assign(__assign({}, val), { orientation: event.target.value })); });
                    } },
                    React__default.createElement(FormControlLabel, { value: "portrait", control: React__default.createElement(Radio, null), label: "Portrait" }),
                    React__default.createElement(FormControlLabel, { value: "landscape", control: React__default.createElement(Radio, null), label: "Landscape" }))),
            React__default.createElement(FormControl, { fullWidth: true, sx: formControlStyles },
                React__default.createElement(InputLabel, { id: "quality-select-label" }, "Quality"),
                React__default.createElement(Select, { labelId: "quality-select-label", id: "quality-select", label: "Quality", value: pdfContext.quality, onChange: function (event) {
                        var _a;
                        (_a = pdfContext.setQuality) === null || _a === void 0 ? void 0 : _a.call(pdfContext, event.target.value);
                    } }, qualityOptions.map(function (el) { return (React__default.createElement(MenuItem, { key: el.value, value: el.value }, el.label)); }))),
            React__default.createElement(FormControl, { fullWidth: true, sx: formControlStyles },
                React__default.createElement(InputLabel, { id: "scale-select-label" }, "Scale"),
                React__default.createElement(Select, { labelId: "scale-select-label", id: "scale-select", label: "Scale", value: (_b = pdfContext === null || pdfContext === void 0 ? void 0 : pdfContext.options) === null || _b === void 0 ? void 0 : _b.fixedScale, onChange: function (event) {
                        var _a;
                        (_a = pdfContext.setOptions) === null || _a === void 0 ? void 0 : _a.call(pdfContext, function (val) { return (__assign(__assign({}, val), { fixedScale: event.target.value })); });
                    } }, scaleOptions.map(function (el, idx) { return (React__default.createElement(MenuItem, { key: idx, value: el.value }, el.label)); }))), props === null || props === void 0 ? void 0 :
            props.additionalFields,
            pdfContext.options && pdfContext.setOptions && (React__default.createElement(PdfPreview, { options: pdfContext.options, setOptions: pdfContext.setOptions, geojsonRef: pdfContext.geojsonRef })))));
}

/**
 * Create PDF Form Component
 *
 */
var MlCreatePdfForm = function (props) {
    return (React__default.createElement(React__default.Fragment, null,
        React__default.createElement(PdfContextProvider, null,
            React__default.createElement(PdfForm, __assign({}, props)))));
};
MlCreatePdfForm.defaultProps = {
    mapId: undefined,
};

function featureEditorStyle() {
    var mediaIsMobile = useMediaQuery(function (theme) { return theme.breakpoints.down('md'); });
    var featureEditorStyle = [
        {
            id: 'gl-draw-polygon-fill-inactive',
            type: 'fill',
            filter: [
                'all',
                ['==', 'active', 'false'],
                ['==', '$type', 'Polygon'],
                ['!=', 'mode', 'static'],
            ],
            paint: {
                'fill-color': '#009EE0',
                'fill-outline-color': '#009EE0',
                'fill-opacity': 0.3,
            },
        },
        {
            id: 'gl-draw-polygon-fill-active',
            type: 'fill',
            filter: ['all', ['==', 'active', 'true'], ['==', '$type', 'Polygon']],
            paint: {
                'fill-color': '#009EE0',
                'fill-outline-color': '#009EE0',
                'fill-opacity': 0.2,
            },
        },
        {
            id: 'gl-draw-polygon-stroke-inactive',
            type: 'line',
            filter: [
                'all',
                ['==', 'active', 'false'],
                ['==', '$type', 'Polygon'],
                ['!=', 'mode', 'static'],
            ],
            layout: {
                'line-cap': 'round',
                'line-join': 'round',
            },
            paint: {
                'line-color': '#009EE0',
                'line-width': 3,
            },
        },
        {
            id: 'gl-draw-polygon-stroke-active',
            type: 'line',
            filter: ['all', ['==', 'active', 'true'], ['==', '$type', 'Polygon']],
            layout: {
                'line-cap': 'round',
                'line-join': 'round',
            },
            paint: {
                'line-color': '#009EE0',
                'line-dasharray': [0.2, 2],
                'line-width': 2,
            },
        },
        {
            id: 'gl-draw-line-inactive',
            type: 'line',
            filter: [
                'all',
                ['==', 'active', 'false'],
                ['==', '$type', 'LineString'],
                ['!=', 'mode', 'static'],
            ],
            layout: {
                'line-cap': 'round',
                'line-join': 'round',
            },
            paint: {
                'line-color': '#009EE0',
                'line-width': 4,
            },
        },
        {
            id: 'gl-draw-line-active',
            type: 'line',
            filter: ['all', ['==', '$type', 'LineString'], ['==', 'active', 'true']],
            layout: {
                'line-cap': 'round',
                'line-join': 'round',
            },
            paint: {
                'line-color': '#009EE0',
                'line-dasharray': [0.2, 2],
                'line-width': 2,
            },
        },
        {
            id: 'gl-draw-polygon-midpoint',
            type: 'circle',
            filter: ['all', ['==', '$type', 'Point'], ['==', 'meta', 'midpoint']],
            paint: {
                'circle-radius': mediaIsMobile ? 5 : 4,
                'circle-color': '#ffffff',
                'circle-stroke-color': '#009EE0',
                'circle-stroke-width': 1,
            },
        },
        {
            id: 'gl-draw-polygon-and-line-vertex-stroke-inactive',
            type: 'circle',
            filter: ['all', ['==', 'meta', 'vertex'], ['==', '$type', 'Point'], ['!=', 'mode', 'static']],
            paint: {
                'circle-radius': mediaIsMobile ? 8 : 6,
                'circle-color': '#fff',
            },
        },
        {
            id: 'gl-draw-polygon-and-line-vertex-inactive',
            type: 'circle',
            filter: ['all', ['==', 'meta', 'vertex'], ['==', '$type', 'Point'], ['!=', 'mode', 'static']],
            paint: {
                'circle-radius': mediaIsMobile ? 7 : 5,
                'circle-color': '#ffffff',
                'circle-stroke-color': '#009EE0',
                'circle-stroke-width': 1,
            },
        },
        {
            id: 'gl-draw-point-point-stroke-inactive',
            type: 'circle',
            filter: [
                'all',
                ['==', 'active', 'false'],
                ['==', '$type', 'Point'],
                ['==', 'meta', 'feature'],
                ['!=', 'mode', 'static'],
            ],
            paint: {
                'circle-radius': mediaIsMobile ? 10 : 9,
                'circle-opacity': 1,
                'circle-color': '#009EE0',
            },
        },
        {
            id: 'gl-draw-point-inactive',
            type: 'circle',
            filter: [
                'all',
                ['==', 'active', 'false'],
                ['==', '$type', 'Point'],
                ['==', 'meta', 'feature'],
                ['!=', 'mode', 'static'],
            ],
            paint: {
                'circle-radius': mediaIsMobile ? 7.5 : 6.5,
                'circle-color': '#009EE0',
            },
        },
        {
            id: 'gl-draw-point-stroke-active',
            type: 'circle',
            filter: [
                'all',
                ['==', '$type', 'Point'],
                ['==', 'active', 'true'],
                ['!=', 'meta', 'midpoint'],
            ],
            paint: {
                'circle-radius': mediaIsMobile ? 11 : 10,
                'circle-color': '#fff',
            },
        },
        {
            id: 'gl-draw-point-active',
            type: 'circle',
            filter: [
                'all',
                ['==', '$type', 'Point'],
                ['!=', 'meta', 'midpoint'],
                ['==', 'active', 'true'],
            ],
            paint: {
                'circle-radius': mediaIsMobile ? 8.5 : 7.5,
                'circle-color': '#009EE0',
            },
        },
        {
            id: 'gl-draw-polygon-fill-static',
            type: 'fill',
            filter: ['all', ['==', 'mode', 'static'], ['==', '$type', 'Polygon']],
            paint: {
                'fill-color': '#404040',
                'fill-outline-color': '#404040',
                'fill-opacity': 0.1,
            },
        },
        {
            id: 'gl-draw-polygon-stroke-static',
            type: 'line',
            filter: ['all', ['==', 'mode', 'static'], ['==', '$type', 'Polygon']],
            layout: {
                'line-cap': 'round',
                'line-join': 'round',
            },
            paint: {
                'line-color': '#404040',
                'line-width': 2,
            },
        },
        {
            id: 'gl-draw-line-static',
            type: 'line',
            filter: ['all', ['==', 'mode', 'static'], ['==', '$type', 'LineString']],
            layout: {
                'line-cap': 'round',
                'line-join': 'round',
            },
            paint: {
                'line-color': '#404040',
                'line-width': 2,
            },
        },
        {
            id: 'gl-draw-point-static',
            type: 'circle',
            filter: ['all', ['==', 'mode', 'static'], ['==', '$type', 'Point']],
            paint: {
                'circle-radius': mediaIsMobile ? 8.5 : 6.5,
                'circle-color': '#404040',
            },
        },
    ];
    return featureEditorStyle;
}

/**
 * GeoJson Feature editor that allows to create or manipulate GeoJson data
 */
var useFeatureEditor = function (props) {
    var draw = useRef(null);
    var mapHook = useMap({
        mapId: props.mapId,
        waitForLayer: props.insertBeforeLayer,
    });
    var drawToolsInitialized = useRef(false);
    var _a = useState(false), drawToolsReady = _a[0], setDrawToolsReady = _a[1];
    var _b = useState(), feature = _b[0], setFeature = _b[1];
    var style = featureEditorStyle();
    var modeChangeHandler = useCallback(function (e) {
        console.log('MlFeatureEditor mode change to ' + e.mode);
        //setDrawMode(e.mode);
        if (typeof props.onFinish === 'function' && e.mode === 'simple_select') {
            props.onFinish();
        }
    }, [props.onFinish]);
    useEffect(function () {
        var _a;
        if (mapHook.map && !drawToolsInitialized.current) {
            drawToolsInitialized.current = true;
            if (mapHook.map.map.style &&
                mapHook.map.map.getSource('mapbox-gl-draw-cold') &&
                draw.current) {
                // remove old Mapbox-gl-Draw from Mapbox instance when hot-reloading this component during development
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                (_a = draw.current) === null || _a === void 0 ? void 0 : _a.remove();
            }
            draw.current = new MapboxDraw({
                displayControlsDefault: false,
                defaultMode: props.mode || 'simple_select',
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                modes: Object.assign({}, MapboxDraw.modes),
                userProperties: true,
                styles: style,
            });
            mapHook.map.addControl(draw.current, 'top-left', mapHook.componentId);
            mapHook.map.on('draw.modechange', modeChangeHandler, mapHook.componentId);
            setDrawToolsReady(true);
        }
    }, [mapHook.map, props, drawToolsInitialized, modeChangeHandler]);
    useEffect(function () {
        if (!mapHook.map || !drawToolsReady)
            return;
        var changeHandler = function () {
            var _a, _b;
            if (draw.current) {
                // update drawnFeatures state object
                var currentFeatureCollection = (_b = (_a = draw.current).getAll) === null || _b === void 0 ? void 0 : _b.call(_a);
                setFeature(currentFeatureCollection === null || currentFeatureCollection === void 0 ? void 0 : currentFeatureCollection.features);
                if (typeof props.onChange === 'function') {
                    props.onChange(currentFeatureCollection === null || currentFeatureCollection === void 0 ? void 0 : currentFeatureCollection.features);
                }
            }
        };
        mapHook.map.on('mouseup', changeHandler);
        mapHook.map.on('touchend', changeHandler);
        return function () {
            if (!mapHook.map)
                return;
            mapHook.map.map.off('mouseup', changeHandler);
            mapHook.map.map.off('touchend', changeHandler);
        };
    }, [drawToolsReady, mapHook.map]);
    useEffect(function () {
        var _a;
        if (draw.current && ((_a = props.geojson) === null || _a === void 0 ? void 0 : _a.geometry)) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            draw.current.set({ type: 'FeatureCollection', features: [props.geojson] });
        }
    }, [props.geojson, drawToolsReady]);
    useEffect(function () {
        var _a, _b, _c, _d;
        if (props.mode && draw.current && ((_b = (_a = draw.current) === null || _a === void 0 ? void 0 : _a.getMode) === null || _b === void 0 ? void 0 : _b.call(_a)) !== props.mode) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            (_d = (_c = draw.current) === null || _c === void 0 ? void 0 : _c.changeMode) === null || _d === void 0 ? void 0 : _d.call(_c, props.mode);
            if (props.mode !== 'simple_select' && props.mode !== 'direct_select') {
                draw.current.set({ type: 'FeatureCollection', features: [] });
            }
        }
    }, [props.mode, mapHook.map]);
    return {
        feature: feature,
        drawToolsReady: drawToolsReady,
        draw: draw.current,
    };
};

var MlFeatureEditor = function (props) {
    useFeatureEditor({
        mode: props.mode,
        geojson: props.geojson,
        onChange: props.onChange,
        onFinish: props.onFinish,
        mapId: props.mapId,
    });
    return (React__default.createElement(React__default.Fragment, null));
};

var legalLayerTypes = [
    'fill',
    'line',
    'symbol',
    'circle',
    'heatmap',
    'fill-extrusion',
    'raster',
    'hillshade',
    'background',
];
function determineSource(props) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    if (typeof props.options.source === 'string') {
        return {
            source: props.options.source,
        };
    }
    else if (props.geojson &&
        (!((_a = props.options) === null || _a === void 0 ? void 0 : _a.source) ||
            (typeof ((_b = props === null || props === void 0 ? void 0 : props.options) === null || _b === void 0 ? void 0 : _b.source) !== 'string' &&
                ((_d = (_c = props.options) === null || _c === void 0 ? void 0 : _c.source) === null || _d === void 0 ? void 0 : _d.attribution) &&
                !((_f = (_e = props.options) === null || _e === void 0 ? void 0 : _e.source) === null || _f === void 0 ? void 0 : _f.type)))) {
        return {
            source: {
                type: 'geojson',
                data: props.geojson || '',
                attribution: typeof ((_g = props === null || props === void 0 ? void 0 : props.options) === null || _g === void 0 ? void 0 : _g.source) !== 'string' && ((_h = props.options.source) === null || _h === void 0 ? void 0 : _h.attribution)
                    ? (_j = props.options.source) === null || _j === void 0 ? void 0 : _j.attribution
                    : '',
            },
        };
    }
    return {};
}
function determineInsertionPoint(props, mapHook) {
    var _a;
    if (props === null || props === void 0 ? void 0 : props.insertBeforeLayer)
        return props.insertBeforeLayer;
    if (props === null || props === void 0 ? void 0 : props.insertBeforeFirstSymbolLayer)
        return (_a = mapHook === null || mapHook === void 0 ? void 0 : mapHook.map) === null || _a === void 0 ? void 0 : _a.firstSymbolLayer;
    return undefined;
}
function useLayer(props) {
    var _a;
    var mapHook = useMap({
        mapId: props.mapId,
        waitForLayer: props.insertBeforeLayer,
    });
    var layerTypeRef = useRef('');
    var layerPaintConfRef = useRef('');
    var layerLayoutConfRef = useRef('');
    var _b = useState(), layer = _b[0], setLayer = _b[1];
    var layerId = useRef(props.layerId || (props.idPrefix ? props.idPrefix : 'Layer-') + mapHook.componentId);
    var createLayer = useCallback(function () {
        var _a, _b, _c, _d, _e, _f, _g;
        if (!mapHook.map || (mapHook === null || mapHook === void 0 ? void 0 : mapHook.map.cancelled))
            return;
        if (mapHook.map.map.getLayer(layerId.current)) {
            mapHook.cleanup();
        }
        if (typeof ((_a = props === null || props === void 0 ? void 0 : props.options) === null || _a === void 0 ? void 0 : _a.source) !== 'string' && mapHook.map.map.getSource(layerId.current)) {
            mapHook.map.map.removeSource(layerId.current);
        }
        if (typeof props.options.source === 'string') {
            if (props.options.source === '' || !mapHook.map.map.getSource(props.options.source)) {
                return;
            }
        }
        if (typeof ((_b = props === null || props === void 0 ? void 0 : props.options) === null || _b === void 0 ? void 0 : _b.source) !== 'string' &&
            !props.geojson &&
            !((_d = (_c = props === null || props === void 0 ? void 0 : props.options) === null || _c === void 0 ? void 0 : _c.source) === null || _d === void 0 ? void 0 : _d.data) &&
            ((_e = props === null || props === void 0 ? void 0 : props.options) === null || _e === void 0 ? void 0 : _e.type) !== 'background') {
            return;
        }
        if (typeof props.options.type === 'undefined') {
            return;
        }
        try {
            mapHook.map.addLayer(__assign(__assign(__assign({}, props.options), determineSource(props)), { id: layerId.current }), determineInsertionPoint(props, mapHook), mapHook.componentId);
        }
        catch (error) {
            console.error('Failed to add layer:', error);
        }
        setLayer(function () { var _a; return (_a = mapHook.map) === null || _a === void 0 ? void 0 : _a.map.getLayer(layerId.current); });
        // recreate layer if style has changed
        var styledataEventHandler = function () {
            var _a;
            if (!((_a = mapHook.map) === null || _a === void 0 ? void 0 : _a.map.getLayer(layerId.current))) {
                createLayer();
            }
        };
        mapHook.map.on('styledata', styledataEventHandler, mapHook.componentId);
        var addSourceHandler = function (_ev, _wrapper, _a) {
            var _b;
            var source_id = _a.source_id;
            if (mapHook.map &&
                typeof ((_b = props === null || props === void 0 ? void 0 : props.options) === null || _b === void 0 ? void 0 : _b.source) === 'string' &&
                props.options.source === source_id) {
                createLayer();
            }
        };
        mapHook.map.wrapper.on('addsource', addSourceHandler, mapHook.componentId);
        layerPaintConfRef.current = JSON.stringify((_f = props.options) === null || _f === void 0 ? void 0 : _f.paint);
        layerLayoutConfRef.current = JSON.stringify((_g = props.options) === null || _g === void 0 ? void 0 : _g.layout);
        layerTypeRef.current = props.options.type;
    }, [props, mapHook]);
    useEffect(function () {
        var _a, _b, _c, _d, _e;
        if (!mapHook.map)
            return;
        if (!props.geojson && !props.options.source && ((_a = props === null || props === void 0 ? void 0 : props.options) === null || _a === void 0 ? void 0 : _a.type) !== 'background')
            return;
        if (((_b = mapHook.map) === null || _b === void 0 ? void 0 : _b.cancelled) === false &&
            ((_e = (_d = (_c = mapHook === null || mapHook === void 0 ? void 0 : mapHook.map) === null || _c === void 0 ? void 0 : _c.map) === null || _d === void 0 ? void 0 : _d.getLayer) === null || _e === void 0 ? void 0 : _e.call(_d, layerId.current)) &&
            (legalLayerTypes.indexOf(props.options.type) === -1 ||
                (legalLayerTypes.indexOf(props.options.type) !== -1 &&
                    props.options.type === layerTypeRef.current))) {
            return;
        }
        createLayer();
    }, [mapHook.map, mapHook.mapIsReady, props, createLayer]);
    useEffect(function () {
        var _a, _b, _c, _d, _e, _f;
        if (((_a = mapHook.map) === null || _a === void 0 ? void 0 : _a.cancelled) === true || !((_d = (_c = (_b = mapHook.map) === null || _b === void 0 ? void 0 : _b.map) === null || _c === void 0 ? void 0 : _c.getSource) === null || _d === void 0 ? void 0 : _d.call(_c, layerId.current)))
            return;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore setData only exists on GeoJsonSource
        (_f = (_e = mapHook.map.map.getSource(layerId.current)) === null || _e === void 0 ? void 0 : _e.setData) === null || _f === void 0 ? void 0 : _f.call(_e, props.geojson);
    }, [props.geojson, mapHook.map, props.options.type]);
    useEffect(function () {
        var _a, _b, _c, _d, _e, _f;
        if (((_a = mapHook.map) === null || _a === void 0 ? void 0 : _a.cancelled) === true ||
            !mapHook.map ||
            !((_d = (_c = (_b = mapHook.map) === null || _b === void 0 ? void 0 : _b.map) === null || _c === void 0 ? void 0 : _c.getLayer) === null || _d === void 0 ? void 0 : _d.call(_c, layerId.current)) ||
            props.options.type !== layerTypeRef.current)
            return;
        var key;
        var layoutString = JSON.stringify(props.options.layout);
        if (props.options.layout && layoutString !== layerLayoutConfRef.current) {
            var oldLayout = JSON.parse(layerLayoutConfRef.current);
            for (key in props.options.layout) {
                if (((_e = props.options.layout) === null || _e === void 0 ? void 0 : _e[key]) &&
                    props.options.layout[key] !== oldLayout[key]) {
                    mapHook.map.map.setLayoutProperty(layerId.current, key, props.options.layout[key]);
                }
            }
            layerLayoutConfRef.current = layoutString;
        }
        var paintString = JSON.stringify(props.options.paint);
        if (paintString !== layerPaintConfRef.current) {
            var oldPaint = JSON.parse(layerPaintConfRef.current);
            for (key in props.options.paint) {
                if (((_f = props.options.paint) === null || _f === void 0 ? void 0 : _f[key]) &&
                    props.options.paint[key] !== oldPaint[key]) {
                    mapHook.map.map.setPaintProperty(layerId.current, key, props.options.paint[key]);
                }
            }
            layerPaintConfRef.current = paintString;
        }
    }, [props.options, mapHook.map]);
    useEffect(function () {
        if (!props.insertBeforeLayer ||
            !mapHook.map ||
            !mapHook.map.getLayer(props.insertBeforeLayer) ||
            !mapHook.map.getLayer(layerId.current))
            return;
        mapHook.map.moveLayer(layerId.current, props.insertBeforeLayer);
    }, [mapHook.map, props.insertBeforeLayer]);
    useEffect(function () {
        return function () {
            mapHook.cleanup();
        };
    }, []);
    useEffect(function () {
        var _a;
        if (typeof ((_a = props === null || props === void 0 ? void 0 : props.options) === null || _a === void 0 ? void 0 : _a.source) !== 'string' || !mapHook.map) {
            return;
        }
        var findSourceHandler = function () {
            var _a, _b, _c;
            if (typeof ((_a = props === null || props === void 0 ? void 0 : props.options) === null || _a === void 0 ? void 0 : _a.source) === 'string' &&
                ((_c = (_b = mapHook === null || mapHook === void 0 ? void 0 : mapHook.map) === null || _b === void 0 ? void 0 : _b.getSource) === null || _c === void 0 ? void 0 : _c.call(_b, props.options.source)) &&
                !mapHook.map.getLayer(layerId.current)) {
                createLayer();
            }
        };
        mapHook.map.on('sourcedataloading', findSourceHandler);
        var addSourceHandler = function (_ev, _wrapper, _a) {
            var _b;
            var source_id = _a.source_id;
            if (mapHook.map &&
                typeof ((_b = props === null || props === void 0 ? void 0 : props.options) === null || _b === void 0 ? void 0 : _b.source) === 'string' &&
                props.options.source === source_id) {
                createLayer();
            }
        };
        mapHook.map.wrapper.on('addsource', addSourceHandler);
        return function () {
            if (mapHook === null || mapHook === void 0 ? void 0 : mapHook.map) {
                mapHook.map.off('sourcedataloading', findSourceHandler);
                mapHook.map.wrapper.off('addsource', addSourceHandler);
            }
        };
    }, [mapHook.map, (_a = props.options) === null || _a === void 0 ? void 0 : _a.source]);
    // Reload onClick-handlers when they change
    useEffect(function () {
        var _a, _b, _c;
        if (!props.onClick || !(mapHook === null || mapHook === void 0 ? void 0 : mapHook.map) || !((_b = (_a = mapHook === null || mapHook === void 0 ? void 0 : mapHook.map) === null || _a === void 0 ? void 0 : _a.getLayer) === null || _b === void 0 ? void 0 : _b.call(_a, layerId.current)))
            return;
        var onClickHandler = props.onClick;
        (_c = mapHook.map) === null || _c === void 0 ? void 0 : _c.on('click', layerId.current, onClickHandler);
        return function () {
            var _a;
            if (onClickHandler && (mapHook === null || mapHook === void 0 ? void 0 : mapHook.map)) {
                (_a = mapHook.map) === null || _a === void 0 ? void 0 : _a.off('click', layerId.current, onClickHandler);
            }
        };
    }, [mapHook.map, props.onClick]);
    // Reload onHover-handlers when they change
    useEffect(function () {
        var _a, _b, _c;
        if (!props.onHover || !(mapHook === null || mapHook === void 0 ? void 0 : mapHook.map) || !((_b = (_a = mapHook === null || mapHook === void 0 ? void 0 : mapHook.map) === null || _a === void 0 ? void 0 : _a.getLayer) === null || _b === void 0 ? void 0 : _b.call(_a, layerId.current)))
            return;
        var onHoverHandler = props.onHover;
        (_c = mapHook.map) === null || _c === void 0 ? void 0 : _c.on('mousemove', layerId.current, onHoverHandler);
        return function () {
            var _a;
            if (onHoverHandler && (mapHook === null || mapHook === void 0 ? void 0 : mapHook.map)) {
                (_a = mapHook.map) === null || _a === void 0 ? void 0 : _a.off('mousemove', layerId.current, onHoverHandler);
            }
        };
    }, [mapHook.map, props.onHover]);
    // Reload onLeave-handlers when they change
    useEffect(function () {
        var _a, _b, _c;
        if (!props.onLeave || !(mapHook === null || mapHook === void 0 ? void 0 : mapHook.map) || !((_b = (_a = mapHook === null || mapHook === void 0 ? void 0 : mapHook.map) === null || _a === void 0 ? void 0 : _a.getLayer) === null || _b === void 0 ? void 0 : _b.call(_a, layerId.current)))
            return;
        var onLeaveHandler = props.onLeave;
        (_c = mapHook.map) === null || _c === void 0 ? void 0 : _c.on('mouseleave', layerId.current, onLeaveHandler);
        return function () {
            var _a;
            if (onLeaveHandler && (mapHook === null || mapHook === void 0 ? void 0 : mapHook.map)) {
                (_a = mapHook.map) === null || _a === void 0 ? void 0 : _a.off('mouseleave', layerId.current, onLeaveHandler);
            }
        };
    }, [mapHook.map, props.onLeave]);
    return {
        map: mapHook.map,
        layer: layer,
        layerId: layerId.current,
        componentId: mapHook.componentId,
        mapHook: mapHook,
    };
}
useLayer.defaultProps = {};

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
            minzoom: props.minZoom || 6,
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
        case 'fill':
            if (defaultPaintOverrides === null || defaultPaintOverrides === void 0 ? void 0 : defaultPaintOverrides.fill) {
                return defaultPaintOverrides.fill;
            }
            return {
                // 'fill-color': 'rgba(10,240,256,0.6)',
                // 'fill-outline-color': 'rgba(20,230,256,0.8)',
                'fill-color': '#009EE0',
                'fill-outline-color': '#009EE0'
            };
        case 'line':
            if (defaultPaintOverrides === null || defaultPaintOverrides === void 0 ? void 0 : defaultPaintOverrides.line) {
                console.log(defaultPaintOverrides.line);
                return defaultPaintOverrides.line;
            }
            return {
                // // 'line-color': 'rgb(203,211,2)',
                // 'line-width': 5,
                // 'line-blur': 0,
                'line-color': '#009EE0',
                'line-width': 4,
                'line-blur': 0,
            };
        case 'circle':
            if (defaultPaintOverrides === null || defaultPaintOverrides === void 0 ? void 0 : defaultPaintOverrides.circle) {
                return defaultPaintOverrides.circle;
            }
            return {
                // 'circle-color': 'rgba(10,240,256,0.8)',
                // 'circle-stroke-color': '#fff',
                // 'circle-stroke-width': 2,
                // 'circle-radius': 4,
                'circle-color': '#009EE0',
                'circle-stroke-color': '#fff',
                'circle-stroke-width': 2,
                'circle-radius': 5,
            };
        default:
            return {};
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

function useSource(props) {
    var _a;
    var mapHook = useMap({
        mapId: props.mapId,
    });
    var _b = useState(), source = _b[0], setSource = _b[1];
    var sourceId = useRef(props.sourceId || (props.idPrefix ? props.idPrefix : 'Source-') + mapHook.componentId);
    var removeSource = useCallback(function () {
        var _a, _b;
        if (mapHook.map && ((_b = (_a = mapHook.map) === null || _a === void 0 ? void 0 : _a.style) === null || _b === void 0 ? void 0 : _b._layers)) {
            for (var _i = 0, _c = Object.entries(mapHook.map.style._layers); _i < _c.length; _i++) {
                var _d = _c[_i], layerId = _d[0], layer = _d[1];
                if (layer.source === sourceId.current) {
                    mapHook.map.removeLayer(layerId);
                }
            }
            if (mapHook.map.getSource(sourceId.current)) {
                mapHook.map.removeSource(sourceId.current);
            }
        }
    }, [mapHook.map]);
    var createSource = useCallback(function () {
        var _a;
        if (!mapHook.map)
            return;
        if (props.source.type === 'geojson' && !props.source.data)
            return;
        if (mapHook.map.map.getSource(sourceId.current)) {
            removeSource();
        }
        (_a = mapHook.map) === null || _a === void 0 ? void 0 : _a.addSource(sourceId.current, __assign({}, props.source));
        setSource(mapHook.map.map.getSource(sourceId.current));
    }, [props, mapHook, removeSource]);
    useEffect(function () {
        var _a, _b, _c, _d;
        if (!((_b = (_a = mapHook.map) === null || _a === void 0 ? void 0 : _a.map) === null || _b === void 0 ? void 0 : _b.getSource(sourceId.current)))
            return;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore setData only exists on GeoJsonSource
        (_d = (_c = mapHook.map.map.getSource(sourceId.current)) === null || _c === void 0 ? void 0 : _c.setData) === null || _d === void 0 ? void 0 : _d.call(_c, props.source.data);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore data only exists on GeoJsonSource
    }, [(_a = props.source) === null || _a === void 0 ? void 0 : _a.data]);
    useEffect(function () {
        var _a, _b, _c;
        if (((_c = (_b = (_a = mapHook === null || mapHook === void 0 ? void 0 : mapHook.map) === null || _a === void 0 ? void 0 : _a.map) === null || _b === void 0 ? void 0 : _b.getSource) === null || _c === void 0 ? void 0 : _c.call(_b, props.sourceId)) && props.sourceId === sourceId.current)
            return;
        sourceId.current = props.sourceId;
        createSource();
    }, [mapHook.map, props, createSource]);
    useEffect(function () {
        if (!mapHook.map)
            return;
        var checkSourceHandler = function () {
            var _a, _b;
            if (!((_b = (_a = mapHook === null || mapHook === void 0 ? void 0 : mapHook.map) === null || _a === void 0 ? void 0 : _a.getSource) === null || _b === void 0 ? void 0 : _b.call(_a, props.sourceId))) {
                createSource();
            }
        };
        mapHook.map.on('styledata', checkSourceHandler);
        return function () {
            if (mapHook === null || mapHook === void 0 ? void 0 : mapHook.map) {
                mapHook.map.off('styledata', checkSourceHandler);
            }
        };
    }, [mapHook.map, createSource]);
    //cleanup
    useEffect(function () {
        return function () {
            removeSource();
        };
    }, [removeSource]);
    return {
        map: mapHook.map,
        source: source,
        componentId: mapHook.componentId,
        mapHook: mapHook,
    };
}

/**
 * Adds source and layer to display GeoJSON data on the map.
 *
 * @component
 */
var MlGeoJsonLayer = function (props) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    var layerType = props.type || getDefaulLayerTypeByGeometry(props.geojson);
    var layerId = useRef(props.layerId || 'MlGeoJsonLayer-' + v4());
    var labelLayerId = "label-".concat(layerId.current);
    useEffect(function () {
        if (!props.layerId) {
            layerId.current = 'MlGeoJsonLayer-' + v4();
        }
        else {
            layerId.current = props.layerId;
        }
    }, [props.layerId]);
    useSource({
        mapId: props.mapId,
        sourceId: 'source-' + layerId.current,
        source: __assign({ type: 'geojson', data: props.geojson }, (typeof ((_a = props === null || props === void 0 ? void 0 : props.options) === null || _a === void 0 ? void 0 : _a.source) !== 'undefined' &&
            typeof ((_b = props === null || props === void 0 ? void 0 : props.options) === null || _b === void 0 ? void 0 : _b.source) !== 'string'
            ? props.options.source
            : {})),
    });
    useLayer({
        mapId: props.mapId,
        layerId: layerId.current,
        options: __assign(__assign({}, (typeof ((_c = props === null || props === void 0 ? void 0 : props.options) === null || _c === void 0 ? void 0 : _c.source) !== 'undefined' &&
            typeof ((_d = props === null || props === void 0 ? void 0 : props.options) === null || _d === void 0 ? void 0 : _d.source) === 'string'
            ? { source: props.options.source }
            : { source: 'source-' + layerId.current })), { paint: __assign(__assign({}, (props.paint || getDefaultPaintPropsByType(layerType, props.defaultPaintOverrides))), (_e = props === null || props === void 0 ? void 0 : props.options) === null || _e === void 0 ? void 0 : _e.paint), layout: __assign(__assign({}, ((props === null || props === void 0 ? void 0 : props.layout) || {})), (_f = props === null || props === void 0 ? void 0 : props.options) === null || _f === void 0 ? void 0 : _f.layout), type: layerType }),
        insertBeforeLayer: props.insertBeforeLayer,
        onHover: props.onHover,
        onClick: props.onClick,
        onLeave: props.onLeave,
    });
    // Label useLayer hook can't be called conditionally.
    // Using it with geojson and options.source undefined will cause it to return without creating a layer.
    useLayer({
        mapId: props.mapId,
        options: __assign(__assign(__assign(__assign(__assign({}, (typeof ((_g = props === null || props === void 0 ? void 0 : props.options) === null || _g === void 0 ? void 0 : _g.source) !== 'undefined' &&
            typeof ((_h = props === null || props === void 0 ? void 0 : props.options) === null || _h === void 0 ? void 0 : _h.source) === 'string'
            ? { source: props.options.source }
            : { source: 'source-' + layerId.current })), { id: labelLayerId, type: 'symbol', maxzoom: 24, minzoom: 1 }), ((props === null || props === void 0 ? void 0 : props.labelOptions) ? props.labelOptions : {})), (((_j = props === null || props === void 0 ? void 0 : props.options) === null || _j === void 0 ? void 0 : _j.filter) ? { filter: props.options.filter } : {})), { layout: __assign(__assign({ 'text-font': ['Open Sans Regular'], 'text-field': "{".concat(props.labelProp, "}"), 'text-size': 12, 'text-anchor': 'top' }, (((_k = props === null || props === void 0 ? void 0 : props.labelOptions) === null || _k === void 0 ? void 0 : _k.layout) ? props.labelOptions.layout : {})), (((_l = props === null || props === void 0 ? void 0 : props.layout) === null || _l === void 0 ? void 0 : _l.visibility) ? { visibility: props.layout.visibility } : {})), paint: __assign({ 'text-halo-width': 1, 'text-halo-color': '#fefefe', 'text-color': '#121212' }, (((_m = props === null || props === void 0 ? void 0 : props.labelOptions) === null || _m === void 0 ? void 0 : _m.paint) ? props.labelOptions.paint : {})) }),
    });
    return React__default.createElement(React__default.Fragment, null);
};

/**
 * Adds a button that makes the map follow the users GPS position using
 * navigator.geolocation.watchPosition if activated
 *
 */
var MlFollowGps = function (props) {
    var mapHook = useMap({
        mapId: props.mapId,
        waitForLayer: props.insertBeforeLayer,
    });
    var _a = useState(false), isFollowed = _a[0], setIsFollowed = _a[1];
    var _b = useState(), userLocationGeoJson = _b[0], setUserLocationGeoJson = _b[1];
    var _c = useState(false), locationAccessDenied = _c[0], setLocationAccessDenied = _c[1];
    var _d = useState(), accuracyGeoJson = _d[0], setAccuracyGeoJson = _d[1];
    var _e = useState(0), deviceOrientation = _e[0], setDeviceOrientation = _e[1];
    var initiallyCentered = useRef(false);
    var getLocationSuccess = useCallback(function (pos) {
        if (!mapHook.map)
            return;
        if ((!props.centerUserPosition && !initiallyCentered.current) || props.centerUserPosition) {
            if (props.useFlyTo) {
                mapHook.map.map.flyTo({
                    center: [pos.coords.longitude, pos.coords.latitude],
                    zoom: 18,
                    speed: 1,
                    curve: 1,
                });
            }
            else {
                mapHook.map.map.setCenter([pos.coords.longitude, pos.coords.latitude]);
            }
            initiallyCentered.current = true;
        }
        if (!props.showUserLocation)
            return;
        var geoJsonPoint = point([pos.coords.longitude, pos.coords.latitude]);
        setUserLocationGeoJson(geoJsonPoint);
        setAccuracyGeoJson(circle(geoJsonPoint, pos.coords.accuracy / 1000));
    }, [mapHook.map, props]);
    var getLocationError = function () {
        console.log('Access of user location denied');
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
        if (event === null || event === void 0 ? void 0 : event.alpha) {
            setDeviceOrientation(-event.alpha);
        }
    };
    useEffect(function () {
        if (isFollowed) {
            var _handleOrientation_1 = handleOrientation;
            window.addEventListener('deviceorientation', _handleOrientation_1);
            return function () {
                window.removeEventListener('deviceorientation', _handleOrientation_1);
            };
        }
        else {
            initiallyCentered.current = false;
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
    useEffect(function () {
        var _a, _b;
        if (accuracyGeoJson === null || accuracyGeoJson === void 0 ? void 0 : accuracyGeoJson.type) {
            var getBounds = (_a = mapHook.map) === null || _a === void 0 ? void 0 : _a.getBounds();
            var actualBounds = [
                getBounds === null || getBounds === void 0 ? void 0 : getBounds._ne.lng,
                getBounds === null || getBounds === void 0 ? void 0 : getBounds._ne.lat,
                getBounds === null || getBounds === void 0 ? void 0 : getBounds._sw.lng,
                getBounds === null || getBounds === void 0 ? void 0 : getBounds._sw.lat,
            ];
            var accurancyBounds = bbox(accuracyGeoJson);
            var contained = booleanContains(bboxPolygon(actualBounds), bboxPolygon(accurancyBounds));
            if (!contained) {
                (_b = mapHook.map) === null || _b === void 0 ? void 0 : _b.fitBounds(accurancyBounds, {
                    padding: { top: 25, bottom: 25 },
                });
            }
        }
    }, [accuracyGeoJson]);
    return (React__default.createElement(React__default.Fragment, null,
        isFollowed && userLocationGeoJson && (React__default.createElement(MlGeoJsonLayer, { geojson: accuracyGeoJson, type: 'fill', paint: __assign({ 'fill-color': '#cbd300', 'fill-opacity': 0.3 }, props.accuracyPaint), insertBeforeLayer: props.insertBeforeLayer })),
        isFollowed && orientationCone && (React__default.createElement(MlGeoJsonLayer, { geojson: orientationCone, type: 'fill', paint: __assign({ 'fill-color': '#0000ff', 'fill-antialias': false, 'fill-opacity': 0.3 }, props.orientationConePaint), insertBeforeLayer: props.insertBeforeLayer })),
        isFollowed && userLocationGeoJson && (React__default.createElement(MlGeoJsonLayer, { geojson: userLocationGeoJson, type: 'circle', paint: __assign({ 'circle-color': '#009ee0', 'circle-radius': 5, 'circle-stroke-color': '#fafaff', 'circle-stroke-width': 1 }, props.circlePaint), insertBeforeLayer: props.insertBeforeLayer })),
        React__default.createElement(Button, { variant: "navtools", "data-testid": "mlFollowGpsBtn", sx: {
                zIndex: 1002,
                color: isFollowed
                    ? function (theme) { return theme.palette.GPS.GPSActiveColor; }
                    : function (theme) { return theme.palette.GPS.GPSInactiveColor; },
                backgroundColor: isFollowed
                    ? function (theme) { return theme.palette.GPS.GPSActiveBackgroundColor; }
                    : function (theme) { return theme.palette.navigation.navColor; },
            }, disabled: locationAccessDenied, onClick: function () {
                setIsFollowed(!isFollowed);
            } },
            React__default.createElement(GpsFixedIcon, { sx: { fontSize: { xs: '1.4em', md: '1em' } } }))));
};
MlFollowGps.defaultProps = {
    mapId: undefined,
    offColor: '#666',
    showAccuracyCircle: true,
    showUserLocation: true,
    showOrientation: true,
    centerUserPosition: true,
    useFlyTo: false,
};

var MlImageMarkerLayer = function (props) {
    var _a, _b, _c, _d;
    var mapHook = useMap({
        mapId: props.mapId,
        waitForLayer: props.insertBeforeLayer,
    });
    var _e = useState(), imageId = _e[0], setImageId = _e[1];
    var imageIdRef = useRef(props.imageId || 'img_' + v4());
    var layerId = useRef(props.layerId || 'MlImageMarkerLayer-' + mapHook.componentId);
    useLayer({
        geojson: (_b = (_a = props.options) === null || _a === void 0 ? void 0 : _a.source) === null || _b === void 0 ? void 0 : _b.data,
        layerId: layerId.current,
        options: {
            type: 'symbol',
            layout: __assign(__assign({}, (_c = props.options) === null || _c === void 0 ? void 0 : _c.layout), { 'icon-image': imageId || imageIdRef.current }),
            paint: __assign({}, (_d = props.options) === null || _d === void 0 ? void 0 : _d.paint),
        },
    });
    var createImage = function (mapHook, props) {
        if (!mapHook.map) {
            return;
        }
        if (props.imgSrc && !mapHook.map.map.hasImage(imageIdRef.current)) {
            mapHook.map.map.loadImage(props.imgSrc).then(function (res) {
                if (!(res === null || res === void 0 ? void 0 : res.data)) {
                    console.log('image ' + props.imgSrc + 'could not be loaded');
                    return;
                }
                if (!mapHook.map || mapHook.map.map.hasImage(imageIdRef.current))
                    return;
                mapHook.map.addImage(imageIdRef.current, res.data, mapHook.componentId);
                setImageId(imageIdRef.current);
            });
        }
    };
    useEffect(function () {
        if (!mapHook.map)
            return;
        if (props.imgSrc) {
            createImage(mapHook, props);
        }
    }, [props, mapHook]);
    return React__default.createElement(React__default.Fragment, null);
};

function unitMultiplier(unit) {
    switch (unit) {
        case 'meters':
            return 1;
        case 'millimeters':
            return 1000;
        case 'centimeters':
            return 100;
        case 'kilometers':
            return 0.001;
        case 'miles':
            return 1 / 1609.344; // Meters in Miles
        case 'nauticalmiles':
            return 1 / 1852; // Meters in Nautical Miles
        case 'inches':
            return 39.3701; // Meters in Inches
        case 'yards':
            return 1.09361; // Meters in Yards
        case 'feet':
            return 3.28084; // Meters in Feet
        // case 'acres':
        // 	return 1 / 4046.8564224; // Square meters in an acre
        // case 'hectares':
        // 	return 1 / 10000; // Square meters in a hectare
        default:
            return 1;
    }
}
function unitLabel(unit) {
    switch (unit) {
        case 'miles':
            return 'mi';
        case 'acres':
            return 'ac';
        case 'kilometers':
            return 'km';
        case 'meters':
            return 'm';
        case 'millimeters':
            return 'mm';
        case 'centimeters':
            return 'cm';
        case 'nauticalmiles':
            return 'nm';
        case 'inches':
            return 'in';
        case 'yards':
            return 'yd';
        case 'feet':
            return 'ft';
        case 'hectares':
            return 'ha';
        default:
            return 'm';
    }
}
var MlMeasureTool = function (props) {
    var _a = useState({ value: 0, label: '' }), displayValue = _a[0], setDisplayValue = _a[1];
    var _b = useState([]), currentFeatures = _b[0], setCurrentFeatures = _b[1];
    useEffect(function () {
        if (currentFeatures[0]) {
            var result = 0;
            if (props.measureType === 'polygon') {
                // Calculate area in square meters
                result = turf.area(currentFeatures[0]);
                // Convert area depending on the unit (square meters -> selected area unit)
                if (props.unit) {
                    var unit = props.unit;
                    if (unit === 'acres') {
                        result = result / 4046.8564224;
                    }
                    else if (unit === 'hectares') {
                        result = result / 10000;
                    }
                    else {
                        result = result * Math.pow(unitMultiplier(props.unit), 2);
                    }
                }
            }
            else {
                result = turf.length(currentFeatures[0], { units: props.unit });
            }
            if (typeof props.onChange === 'function') {
                props.onChange({ value: result, unit: props.unit, geojson: currentFeatures[0] });
            }
            if (result >= 0.1) {
                setDisplayValue({ value: result, label: unitLabel(props.unit) });
            }
        }
    }, [props.unit, currentFeatures]);
    return (React__default.createElement(React__default.Fragment, null,
        React__default.createElement(MlFeatureEditor, { onChange: function (features) {
                features && setCurrentFeatures(features);
            }, mode: props.measureType === 'polygon' ? 'draw_polygon' : 'draw_line_string', onFinish: props.onFinish }),
        displayValue.value.toLocaleString('de-DE', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }),
        ' ',
        unitLabel(props.unit),
        displayValue.label &&
            props.measureType === 'polygon' &&
            !['hectares', 'acres'].includes(props.unit || '')
            ? ' ²'
            : ''));
};
MlMeasureTool.defaultProps = {
    mapId: undefined,
    measureType: 'line',
    unit: 'meters',
};

var ListStyled$3 = styled(List)({
    marginTop: '15px',
});
function LayerList(props) {
    return React__default.createElement(ListStyled$3, null, props === null || props === void 0 ? void 0 : props.children);
}

var ListItemStyled$2 = styled$1(ListItem)({
    paddingRight: 0,
    paddingLeft: 0,
    paddingTop: 0,
    paddingBottom: '4px',
});
var ListItemIconStyled$1 = styled$1(ListItemIcon)({
    minWidth: '30px',
});
var IconButtonStyled$2 = styled$1(IconButton)({
    marginRight: '0px',
    padding: '0px',
});
var CheckboxStyled$1 = styled$1(Checkbox)({
    padding: 0,
    marginRight: '5px',
});
var BoxStyled$4 = styled$1(Box)(function (_a) {
    var open = _a.open;
    return ({
        display: open ? 'block' : 'none',
    });
});
var ListStyled$2 = styled$1(List)({
    marginLeft: '50px',
});
function LayerListFolder(_a) {
    var _b = _a.visible, visible = _b === void 0 ? true : _b, name = _a.name, children = _a.children, setVisible = _a.setVisible;
    var _c = useState(false), open = _c[0], setOpen = _c[1];
    var _d = useState(true), localVisible = _d[0], setLocalVisible = _d[1];
    var _visible = useMemo(function () {
        if (!visible) {
            return false;
        }
        return localVisible;
    }, [visible, localVisible]);
    var _children = useMemo(function () {
        if (children) {
            if (Array.isArray(children)) {
                return children.map(function (element) {
                    return React__default.cloneElement(element, {
                        visible: _visible,
                    });
                });
            }
            return React__default.cloneElement(children, {
                visible: _visible,
            });
        }
        return React__default.createElement(React__default.Fragment, null);
    }, [_visible]);
    return (React__default.createElement(React__default.Fragment, null,
        React__default.createElement(ListItemStyled$2, null,
            React__default.createElement(ListItemIconStyled$1, null,
                React__default.createElement(IconButtonStyled$2, { edge: "end", "aria-label": "open", onClick: function () { return setOpen(!open); } }, open ? React__default.createElement(ExpandMoreIcon, null) : React__default.createElement(ExpandLessIcon, null)),
                React__default.createElement(CheckboxStyled$1, { disabled: setVisible ? false : !visible, checked: setVisible ? visible : localVisible, onClick: function () {
                        if (setVisible) {
                            setVisible(function (val) { return !val; });
                        }
                        else {
                            setLocalVisible(function (val) { return !val; });
                        }
                    } })),
            React__default.createElement(ListItemText, { primary: name, variant: "layerlist" })),
        React__default.createElement(BoxStyled$4, { open: open },
            React__default.createElement(ListStyled$2, { disablePadding: true }, _children))));
}

var converters = {
    rgba: function (c) { return "rgba(".concat(c.rgb.r, ", ").concat(c.rgb.g, ", ").concat(c.rgb.b, ", ").concat(c.rgb.a, ")"); },
    rgb: function (c) { return "rgb(".concat(c.rgb.r, ", ").concat(c.rgb.g, ", ").concat(c.rgb.b, ")"); },
    hex: function (c) { return c.hex; },
    rgba_rgb: function (c) { return c.rgb.a === 1 ? converters.rgb(c) : converters.rgba(c); },
    rgba_hex: function (c) { return c.rgb.a === 1 ? converters.hex(c) : converters.rgba(c); }
};

var ColorPicker = function (_a) {
    var convert = _a.convert, props = __rest(_a, ["convert"]);
    var _b = useState(false), showPicker = _b[0], setShowPicker = _b[1];
    var value = (props === null || props === void 0 ? void 0 : props.value) || '';
    return (React__default.createElement(React__default.Fragment, null,
        React__default.createElement(Grid, { container: true, sx: { flexWrap: 'nowrap' } },
            React__default.createElement(Grid, { size: 12 },
                React__default.createElement(Button, { variant: "outlined", onClick: function () { return setShowPicker(true); }, sx: {
                        minWidth: '100%',
                        padding: '5px',
                        marginBottom: '10px',
                        justifyContent: 'flex-start',
                        borderColor: function (theme) { return theme.palette.text.primary; },
                        color: function (theme) { return theme.palette.text.primary; },
                    } },
                    React__default.createElement("div", { style: {
                            width: '25px',
                            height: '25px',
                            marginRight: '10px',
                            backgroundColor: value,
                        } }),
                    value))),
        showPicker && (React__default.createElement("div", { style: { position: 'relative', marginTop: 0 } },
            React__default.createElement("div", { style: { position: 'absolute', zIndex: 1000 } },
                React__default.createElement("div", { style: { position: 'fixed', top: '0px', right: '0px', bottom: '0px', left: '0px' }, onClick: function () {
                        setShowPicker(false);
                    } }),
                React__default.createElement(ChromePicker, { color: value, onChange: function (c) {
                        var _a;
                        var newValue = converters[convert](c);
                        (_a = props === null || props === void 0 ? void 0 : props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, newValue);
                    } }))))));
};
ColorPicker.defaultProps = {
    convert: 'rgba_hex',
    label: 'Color',
    name: 'color',
};

function PaintPropsColorPicker$1(_a) {
    var propKey = _a.propKey, value = _a.value, setPaintProps = _a.setPaintProps;
    return (React__default.createElement(ColorPicker, { value: value, label: "Color", onChange: function (value) {
            setPaintProps(function (current) {
                var _a;
                var newProps = __assign(__assign({}, current), (_a = {}, _a[propKey] = value, _a));
                return newProps;
            });
        } }));
}

var PaperStyled$1 = styled(Paper)({
    marginLeft: '-100px',
    marginRight: '-21px',
    paddingLeft: '53px',
    borderRadius: '0px',
    boxShadow: 'none',
    backgroundColor: 'rgb(0, 0, 0, 0)',
});
var BoxStyled$3 = styled(Box$1)({
    marginLeft: '61px',
});
var mapPropKeyToFormInputType$1 = {
    'circle-color': 'colorpicker',
    'circle-radius': 'slider',
    'circle-stroke-color': 'colorpicker',
    'circle-stroke-width': 'slider',
    'fill-color': 'colorpicker',
    'fill-outline-color': 'colorpicker',
    'line-color': 'colorpicker',
    'line-width': 'slider',
    'line-blur': 'slider',
};
var mapPropKeyToFormInputTypeKeys$1 = Object.keys(mapPropKeyToFormInputType$1);
var inputPropsByPropKey$1 = {
    'circle-stroke-width': {
        step: 1,
        min: 1,
        max: 20,
    },
    'circle-radius': {
        step: 1,
        min: 1,
        max: 100,
    },
    'line-blur': {
        step: 1,
        min: 1,
        max: 100,
    },
    'line-width': {
        step: 1,
        min: 1,
        max: 100,
    },
};
function LayerPropertyForm$1(_a) {
    var _b = _a.paintProps, paintProps = _b === void 0 ? {} : _b, setPaintProps = _a.setPaintProps;
    var key = useRef(Math.round(Math.random() * 10000000000));
    var getFormInputByType = useCallback(function (key) {
        if (mapPropKeyToFormInputTypeKeys$1.indexOf(key) !== -1 &&
            (typeof paintProps[key] === 'number' || typeof paintProps[key] === 'string')) {
            var label = (React__default.createElement(Typography, { id: key + '_label', gutterBottom: true }, key));
            switch (mapPropKeyToFormInputType$1[key]) {
                case 'slider':
                    return (React__default.createElement(React__default.Fragment, { key: key },
                        label,
                        React__default.createElement(Slider, __assign({}, inputPropsByPropKey$1[key], { value: paintProps[key], valueLabelDisplay: "auto", onChange: function (_ev, value) {
                                if (value) {
                                    setPaintProps(function (current) {
                                        var _a;
                                        return (__assign(__assign({}, current), (_a = {}, _a[key] = value, _a)));
                                    });
                                }
                            } }))));
                case 'numberfield':
                    return (React__default.createElement(React__default.Fragment, { key: key },
                        label,
                        React__default.createElement(TextField, { inputProps: { inputMode: 'decimal', pattern: '[0-9]*' }, value: paintProps[key], onChange: function (ev) {
                                var _a;
                                if ((_a = ev === null || ev === void 0 ? void 0 : ev.target) === null || _a === void 0 ? void 0 : _a.value) {
                                    setPaintProps(function (current) {
                                        var _a;
                                        return (__assign(__assign({}, current), (_a = {}, _a[key] = parseInt(ev.target.value), _a)));
                                    });
                                }
                            } })));
                case 'colorpicker':
                    return (React__default.createElement(React__default.Fragment, { key: key },
                        label,
                        React__default.createElement(Box$1, { sx: { '& > div': { width: 'initial !important' } } },
                            React__default.createElement(PaintPropsColorPicker$1, { key: key, value: paintProps[key], propKey: key, setPaintProps: setPaintProps }))));
            }
        }
        return null;
    }, [paintProps]);
    return (React__default.createElement(React__default.Fragment, null,
        React__default.createElement(PaperStyled$1, null,
            React__default.createElement(ListItem, { key: key + '_paintPropForm' },
                React__default.createElement(BoxStyled$3, null, Object.keys(paintProps).map(function (el) { return getFormInputByType(el); }))))));
}

var ListItemStyled$1 = styled(ListItem)(function (configurable) { return ({
    paddingRight: configurable ? '56px' : 0,
    paddingLeft: 0,
    paddingTop: 0,
    paddingBottom: '4px',
}); });
var TuneIconButton$2 = styled(IconButton)({
    padding: '4px',
    marginTop: '-3px',
});
var CheckboxListItemIcon = styled(ListItemIcon)({
    minWidth: '30px',
});
var CheckboxStyled = styled(Checkbox)({
    padding: 0,
});
function LayerListItemVectorLayer(_a) {
    var configurable = _a.configurable, vtProps = _a.vtProps, setVtProps = _a.setVtProps, id = _a.id, props = __rest(_a, ["configurable", "vtProps", "setVtProps", "id"]);
    var _b = useState(false), paintPropsFormVisible = _b[0], setPaintPropsFormVisible = _b[1];
    var _c = useState(true), visible = _c[0], setVisible = _c[1];
    var _d = useState(vtProps.layers[id].paint), paintProps = _d[0], setPaintProps = _d[1];
    useEffect(function () {
        var _a, _b, _c, _d, _e, _f;
        if (!setVtProps ||
            (typeof ((_b = (_a = vtProps.layers[id]) === null || _a === void 0 ? void 0 : _a.layout) === null || _b === void 0 ? void 0 : _b.visibility) === 'undefined' && visible) ||
            (!visible && ((_d = (_c = vtProps.layers[id]) === null || _c === void 0 ? void 0 : _c.layout) === null || _d === void 0 ? void 0 : _d.visibility) === 'none') ||
            (visible && ((_f = (_e = vtProps.layers[id]) === null || _e === void 0 ? void 0 : _e.layout) === null || _f === void 0 ? void 0 : _f.visibility) === 'visible'))
            return;
        var _layers = __spreadArray([], vtProps.layers, true);
        if (!_layers[id].layout) {
            _layers[id].layout = { visibility: visible ? 'visible' : 'none' };
        }
        else {
            _layers[id].layout.visibility = visible ? 'visible' : 'none';
        }
        setVtProps(__assign(__assign({}, vtProps), { layers: _layers }));
    }, [visible, id, setVtProps, vtProps]);
    useEffect(function () {
        setVisible(!!props.visibleMaster);
    }, [props.visibleMaster]);
    useEffect(function () {
        if (!setVtProps)
            return;
        if (JSON.stringify(paintProps) !== JSON.stringify(vtProps.layers[id].paint)) {
            var _paintProps = __assign({}, paintProps);
            var _layers = __spreadArray([], vtProps.layers, true);
            _layers[id].paint = _paintProps;
            setVtProps(__assign(__assign({}, vtProps), { layers: _layers }));
        }
    }, [paintProps, id, setVtProps, vtProps]);
    return (React__default.createElement(React__default.Fragment, null,
        React__default.createElement(ListItemStyled$1, { key: id, secondaryAction: configurable ? (React__default.createElement(TuneIconButton$2, { edge: "end", "aria-label": "comments", onClick: function () {
                    setPaintPropsFormVisible(function (current) {
                        return !current;
                    });
                } },
                React__default.createElement(TuneIcon, null))) : undefined },
            React__default.createElement(CheckboxListItemIcon, null,
                React__default.createElement(CheckboxStyled, { checked: visible, onClick: function () {
                        setVisible(function (val) { return !val; });
                    } })),
            React__default.createElement(ListItemText, { primary: vtProps.layers[id].id, variant: "layerlist" })),
        configurable && paintPropsFormVisible && (React__default.createElement(LayerPropertyForm$1, { paintProps: paintProps, setPaintProps: setPaintProps, layerType: vtProps.layers[id].type }))));
}
LayerListItemVectorLayer.defaultProps = {
    configurable: true,
};

function ConfirmDialog(props) {
    return (React.createElement(React.Fragment, null,
        React.createElement(Dialog, { open: props.open, onClose: props.onCancel, "aria-labelledby": "alert-dialog-title", "aria-describedby": "alert-dialog-description" },
            React.createElement(DialogTitle, { id: "alert-dialog-title" }, props.title),
            React.createElement(DialogContent, null,
                React.createElement(DialogContentText, { id: "alert-dialog-description" }, props.text)),
            React.createElement(DialogActions, null,
                React.createElement(Button$1, { onClick: props.onCancel }, "Cancel"),
                React.createElement(Button$1, { onClick: props.onConfirm, autoFocus: true }, "Confirm")))));
}
ConfirmDialog.defaultProps = {
    title: 'Confirm',
    text: 'Are you sure?',
};

function SortableContainer(_a) {
    var children = _a.children, layerId = _a.layerId;
    var _b = useSortable({
        id: layerId,
    }), attributes = _b.attributes, listeners = _b.listeners, setNodeRef = _b.setNodeRef, transform = _b.transform;
    var style = {
        transform: CSS.Transform.toString(transform),
    };
    return (React__default.createElement("li", __assign({ ref: setNodeRef, style: style }, attributes, listeners), children));
}

var TuneIconButton$1 = styled(IconButton)({
    padding: '4px',
    marginTop: '-3px',
});
var DeleteIconButton$1 = styled(IconButton)({
    marginLeft: '20px',
});
function LayerListItem(_a) {
    var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
    var layerComponent = _a.layerComponent, visible = _a.visible, type = _a.type, name = _a.name, description = _a.description, configurable = _a.configurable, setLayerState = _a.setLayerState, props = __rest(_a, ["layerComponent", "visible", "type", "name", "description", "configurable", "setLayerState"]);
    var _r = useState(true), localVisible = _r[0], setLocalVisible = _r[1];
    var _s = useState(false), paintPropsFormVisible = _s[0], setPaintPropsFormVisible = _s[1];
    var _t = useState(false), showDeletionConfirmationDialog = _t[0], setShowDeletionConfirmationDialog = _t[1];
    var deletedRef = useRef(false);
    var visibleRef = useRef(visible);
    // this state variable is used for layer components that provide a paint attribute
    var _u = useState(((_b = layerComponent === null || layerComponent === void 0 ? void 0 : layerComponent.props) === null || _b === void 0 ? void 0 : _b.paint) ||
        ((_d = (_c = layerComponent === null || layerComponent === void 0 ? void 0 : layerComponent.props) === null || _c === void 0 ? void 0 : _c.options) === null || _d === void 0 ? void 0 : _d.paint) ||
        getDefaultPaintPropsByType(((_e = layerComponent === null || layerComponent === void 0 ? void 0 : layerComponent.props) === null || _e === void 0 ? void 0 : _e.type) || getDefaulLayerTypeByGeometry(layerComponent.props.geojson))), paintProps = _u[0], setPaintProps = _u[1];
    var _visible = useMemo(function () {
        if (!visible) {
            return false;
        }
        return localVisible;
    }, [visible, localVisible]);
    useEffect(function () {
        var _a, _b, _c;
        if (!setLayerState || !((_a = layerComponent === null || layerComponent === void 0 ? void 0 : layerComponent.props) === null || _a === void 0 ? void 0 : _a.layers) || _visible === visibleRef.current)
            return;
        visibleRef.current = _visible;
        var state = __assign({}, layerComponent === null || layerComponent === void 0 ? void 0 : layerComponent.props);
        switch (layerComponent.type.name) {
            case 'MlWmsLayer':
                break;
            case 'MlVectorTileLayer':
                if (((_b = layerComponent === null || layerComponent === void 0 ? void 0 : layerComponent.props) === null || _b === void 0 ? void 0 : _b.layers) && !deletedRef.current) {
                    state.layers = (_c = layerComponent === null || layerComponent === void 0 ? void 0 : layerComponent.props) === null || _c === void 0 ? void 0 : _c.layers.map(function (el) {
                        if (el.layout) {
                            el.layout['visibility'] = _visible ? 'visible' : 'none';
                        }
                        else {
                            el.layout = { visibility: _visible ? 'visible' : 'none' };
                        }
                        return el;
                    });
                    console.log('setLayerState', state.layers);
                    setLayerState(state);
                }
                break;
        }
    }, [_visible, setLayerState, layerComponent]);
    useEffect(function () {
        var _a, _b;
        if (!setLayerState || deletedRef.current || !paintProps || ((_a = layerComponent === null || layerComponent === void 0 ? void 0 : layerComponent.props) === null || _a === void 0 ? void 0 : _a.layers))
            return;
        if (JSON.stringify(paintProps) === JSON.stringify((_b = layerComponent.props) === null || _b === void 0 ? void 0 : _b.paint))
            return;
        setLayerState(__assign(__assign({}, layerComponent.props), { paint: paintProps }));
    }, [paintProps, setLayerState, (_f = layerComponent.props) === null || _f === void 0 ? void 0 : _f.paint]);
    var _layerComponent = useMemo(function () {
        var _a;
        if (layerComponent && type === 'layer') {
            switch (layerComponent.type.displayName) {
                case 'MlWmsLayer':
                    return React__default.cloneElement(layerComponent, __assign(__assign({}, layerComponent === null || layerComponent === void 0 ? void 0 : layerComponent.props), { visible: _visible }));
                case 'MlVectorTileLayer':
                    return React__default.cloneElement(layerComponent, __assign({}, layerComponent === null || layerComponent === void 0 ? void 0 : layerComponent.props));
                default:
                case 'MlGeoJsonLayer':
                    return React__default.cloneElement(layerComponent, {
                        layout: {
                            visibility: _visible ? 'visible' : 'none',
                        },
                        options: __assign(__assign({}, (_a = layerComponent === null || layerComponent === void 0 ? void 0 : layerComponent.props) === null || _a === void 0 ? void 0 : _a.options), (setLayerState ? {} : { paint: paintProps })),
                    });
            }
        }
        return React__default.createElement(React__default.Fragment, null);
    }, [type, layerComponent, paintProps, _visible, (_g = layerComponent === null || layerComponent === void 0 ? void 0 : layerComponent.props) === null || _g === void 0 ? void 0 : _g.layers, setLayerState]);
    var layerType = useMemo(function () {
        if (layerComponent && type === 'layer') {
            if (layerComponent.props.type) {
                return layerComponent.props.type;
            }
            if (layerComponent.props.geojson) {
                return getDefaulLayerTypeByGeometry(layerComponent.props.geojson);
            }
        }
        return undefined;
    }, [layerComponent]);
    var listContent = (React__default.createElement(ListItemStyled$1, { sx: __assign({}, props.listItemSx), secondaryAction: configurable && ((_h = Object.keys(paintProps)) === null || _h === void 0 ? void 0 : _h.length) > 0 ? (React__default.createElement(React__default.Fragment, null, props === null || props === void 0 ? void 0 :
            props.buttons,
            React__default.createElement(TuneIconButton$1, { edge: 'end', "aria-label": "settings", onClick: function () {
                    setPaintPropsFormVisible(function (current) {
                        return !current;
                    });
                } },
                React__default.createElement(TuneIcon, null)))) : undefined },
        React__default.createElement(CheckboxListItemIcon, null,
            React__default.createElement(CheckboxStyled, { disabled: !visible, checked: localVisible, onClick: function () {
                    setLocalVisible(function (val) { return !val; });
                } })),
        React__default.createElement(ListItemText, { variant: "layerlist", primary: name, secondary: description, primaryTypographyProps: { overflow: 'hidden' } })));
    return (React__default.createElement(React__default.Fragment, null,
        props.sortable && props.layerId && !((_j = layerComponent === null || layerComponent === void 0 ? void 0 : layerComponent.props) === null || _j === void 0 ? void 0 : _j.layers) && (React__default.createElement(SortableContainer, { layerId: props.layerId }, listContent)),
        !props.sortable && !((_k = layerComponent === null || layerComponent === void 0 ? void 0 : layerComponent.props) === null || _k === void 0 ? void 0 : _k.layers) && listContent,
        _layerComponent,
        !((_l = layerComponent === null || layerComponent === void 0 ? void 0 : layerComponent.props) === null || _l === void 0 ? void 0 : _l.layers) &&
            Object.keys(paintProps).length > 0 &&
            configurable &&
            paintPropsFormVisible && (React__default.createElement(React__default.Fragment, null,
            props.showDeleteButton && (React__default.createElement(React__default.Fragment, null,
                React__default.createElement(DeleteIconButton$1, { edge: "end", "aria-label": "delete", onClick: function () {
                        if (typeof setLayerState === 'function') {
                            setShowDeletionConfirmationDialog(true);
                        }
                    } },
                    React__default.createElement(DeleteIcon, null)),
                showDeletionConfirmationDialog && (React__default.createElement(ConfirmDialog, { open: showDeletionConfirmationDialog, onConfirm: function () {
                        if (typeof setLayerState === 'function') {
                            deletedRef.current = true;
                            setLayerState(false);
                            setShowDeletionConfirmationDialog(false);
                        }
                    }, onCancel: function () {
                        setShowDeletionConfirmationDialog(false);
                    }, title: "Delete layer", text: "Are you sure you want to delete this layer?" })))),
            React__default.createElement(LayerPropertyForm$1, { paintProps: paintProps, setPaintProps: setPaintProps, layerType: layerType }))),
        ((_m = layerComponent === null || layerComponent === void 0 ? void 0 : layerComponent.props) === null || _m === void 0 ? void 0 : _m.layers) && (React__default.createElement(LayerListFolder, { visible: localVisible, setVisible: setLocalVisible, name: name }, (_q = (_p = (_o = layerComponent === null || layerComponent === void 0 ? void 0 : layerComponent.props) === null || _o === void 0 ? void 0 : _o.layers) === null || _p === void 0 ? void 0 : _p.map) === null || _q === void 0 ? void 0 : _q.call(_p, function (_el, idx) { return (React__default.createElement(LayerListItemVectorLayer, { vtProps: layerComponent === null || layerComponent === void 0 ? void 0 : layerComponent.props, setVtProps: setLayerState, id: '' + idx, key: '' + idx, visibleMaster: _visible })); })))));
}
LayerListItem.defaultProps = {
    type: 'layer',
    visible: true,
    showDeleteButton: false,
    buttons: React__default.createElement(React__default.Fragment, null),
};

var DrawerHeader = styled$2('div')(function () { return ({
    display: 'flex',
    alignItems: 'center',
}); });
var defaultDrawerBleeding = 56;
var Puller = styled$2(Box$2)(function (_a) {
    var theme = _a.theme;
    return ({
        width: 30,
        height: 6,
        backgroundColor: theme.palette.text.primary,
        borderRadius: 3,
        position: 'absolute',
        top: 8,
        left: 'calc(50% - 15px)',
    });
});
function Sidebar(_a) {
    var drawerPaperProps = _a.drawerPaperProps, drawerHeaderProps = _a.drawerHeaderProps, setOpen = _a.setOpen, props = __rest(_a, ["drawerPaperProps", "drawerHeaderProps", "setOpen"]);
    var mediaIsMobile = useMediaQuery$1(function (theme) { return theme.breakpoints.down('sm'); });
    var _b = useState(false), drawerOpen = _b[0], setDrawerOpen = _b[1];
    var drawerBleeding = props.drawerBleeding ? props.drawerBleeding : defaultDrawerBleeding;
    return (React__default.createElement(React__default.Fragment, null,
        !mediaIsMobile ? (React__default.createElement(Box$2, { sx: { display: { xs: 'none', sm: 'flex' }, mr: 1 } },
            React__default.createElement(Drawer, __assign({ transitionDuration: 0, variant: "persistent", anchor: "left", open: typeof props.open === 'undefined' ? drawerOpen : props.open, PaperProps: __assign(__assign({}, drawerPaperProps), { sx: __assign({ maxWidth: { lg: '30%', md: '40%', sm: '50%', xs: '78%' }, padding: { sm: '84px 20px 20px 20px', xs: '74px 10px 10px 10px' }, width: {
                            xs: '80%',
                            sm: '60%',
                            md: '350px',
                            lg: '350px',
                        }, boxSizing: 'border-box' }, drawerPaperProps === null || drawerPaperProps === void 0 ? void 0 : drawerPaperProps.sx) }), sx: __assign({ flexGrow: 1, zIndex: 105, position: 'absolute', bottom: 0, display: 'flex', flexDirection: 'column', maxWidth: { lg: '30%', md: '40%', sm: '50%', xs: '78%' } }, (drawerOpen ? {} : { left: mediaIsMobile ? '-90vw' : '-20vw' })) }, props),
                React__default.createElement(DrawerHeader, __assign({}, drawerHeaderProps),
                    React__default.createElement(Typography, { variant: "h6" }, props.name),
                    React__default.createElement(IconButton, { onClick: setOpen
                            ? function () {
                                setOpen === null || setOpen === void 0 ? void 0 : setOpen(false);
                            }
                            : function () {
                                setDrawerOpen(false);
                            }, sx: {
                            position: 'absolute',
                            right: '20px',
                        } },
                        React__default.createElement(CloseIcon, null))),
                React__default.createElement(Box$2, null, props.children)))) : (React__default.createElement(Box$2, { sx: { display: { xs: 'flex', sm: 'none' } } },
            React__default.createElement(Global, { styles: {
                    '.MuiDrawer-root > .MuiPaper-root': {
                        height: "calc(50% - ".concat(drawerBleeding, "px)"),
                        overflow: 'visible',
                    },
                } }),
            React__default.createElement(SwipeableDrawer, { anchor: "bottom", open: typeof props.open === 'undefined' ? drawerOpen : props.open, onClose: setOpen
                    ? function () {
                        setOpen === null || setOpen === void 0 ? void 0 : setOpen(false);
                    }
                    : function () {
                        setDrawerOpen(false);
                    }, onOpen: setOpen
                    ? function () {
                        setOpen === null || setOpen === void 0 ? void 0 : setOpen(true);
                    }
                    : function () {
                        setDrawerOpen(true);
                    }, swipeAreaWidth: drawerBleeding, disableSwipeToOpen: false, hideBackdrop: true, ModalProps: {
                    keepMounted: true,
                    sx: {
                        top: "calc(90%)",
                    },
                } },
                React__default.createElement(Paper, { sx: {
                        position: 'absolute',
                        top: -drawerBleeding,
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                        visibility: 'visible',
                        right: 0,
                        left: 0,
                    } },
                    React__default.createElement(Puller, null),
                    React__default.createElement(Typography, { variant: "h6", sx: { p: '13px' } }, props.name)),
                React__default.createElement(Paper, { sx: {
                        px: '15px',
                        pb: '15px',
                        height: '100%',
                        overflow: 'auto',
                        paddingTop: '20px',
                    } }, props.children)))),
        ";"));
}

var MlMultiMeasureTool = function (props) {
    var _a = useState(true), openSidebar = _a[0], setOpenSidebar = _a[1];
    var _b = useState(props.measureType), selectedMode = _b[0], setSelectedMode = _b[1];
    var _c = useState(), hoveredGeometry = _c[0], setHoveredGeometry = _c[1];
    var mapHook = useMap({
        mapId: props.mapId,
        waitForLayer: props.insertBeforeLayer,
    });
    var _d = useState(), measureState = _d[0], setMeasureState = _d[1];
    var _e = useState('kilometers'), selectedUnit = _e[0], setSelectedUnit = _e[1];
    var _f = useState([]), measureList = _f[0], setMeasureList = _f[1];
    var _g = useState(false), reload = _g[0], setReload = _g[1];
    var unitSwitch = function () {
        if (selectedUnit === 'kilometers') {
            setSelectedUnit('miles');
        }
        if (selectedUnit === 'miles') {
            setSelectedUnit('kilometers');
        }
    };
    var handleDelete = function (Index) {
        setMeasureList(function (current) {
            var newList = __spreadArray([], current, true);
            newList.splice(Index, 1);
            setHoveredGeometry(undefined);
            return newList;
        });
    };
    var handleMeasureChange = function (options) {
        setMeasureState({
            measure: options.value,
            unit: options.unit,
            geojson: options.geojson,
        });
    };
    useEffect(function () {
        if (reload) {
            setReload(false);
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            measureState &&
                setMeasureList(function (current) {
                    var newList = __spreadArray([], current, true);
                    newList.push(measureState);
                    return newList;
                });
        }
    }, [reload]);
    useEffect(function () {
        setMeasureState(undefined);
    }, [selectedUnit]);
    return (React__default.createElement(React__default.Fragment, null,
        React__default.createElement(Sidebar, { open: openSidebar, setOpen: setOpenSidebar, name: 'Multi Measure Tool' },
            React__default.createElement(Box$2, { sx: { flexGrow: 1 } },
                React__default.createElement("br", null),
                React__default.createElement(Grid$1, { container: true, spacing: 4, justifyContent: "flex-start" },
                    React__default.createElement(Grid$1, { size: 3 },
                        React__default.createElement(Tooltip, { title: "Measure Area" },
                            React__default.createElement(Button, { variant: "outlined", sx: {
                                    backgroundColor: selectedMode === 'polygon'
                                        ? function (theme) { return theme.palette.GPS.GPSActiveColor; }
                                        : function (theme) { return theme.palette.GPS.GPSActiveBackgroundColor; },
                                    color: selectedMode === 'polygon'
                                        ? function (theme) { return theme.palette.GPS.GPSActiveBackgroundColor; }
                                        : function (theme) { return theme.palette.GPS.GPSActiveColor; },
                                }, onClick: function () {
                                    setSelectedMode('polygon');
                                    setMeasureState(undefined);
                                    setReload(true);
                                } },
                                React__default.createElement(PentagonIcon, null)))),
                    React__default.createElement(Grid$1, { size: 3 },
                        React__default.createElement(Tooltip, { title: "Measure Distance" },
                            React__default.createElement(Button, { variant: "outlined", sx: {
                                    backgroundColor: selectedMode === 'line'
                                        ? function (theme) { return theme.palette.GPS.GPSActiveColor; }
                                        : function (theme) { return theme.palette.GPS.GPSActiveBackgroundColor; },
                                    color: selectedMode === 'line'
                                        ? function (theme) { return theme.palette.GPS.GPSActiveBackgroundColor; }
                                        : function (theme) { return theme.palette.GPS.GPSActiveColor; },
                                }, onClick: function () {
                                    setSelectedMode('line');
                                    setMeasureState(undefined);
                                    setReload(true);
                                } },
                                React__default.createElement(PolylineIcon, null)))))),
            React__default.createElement("br", null),
            React__default.createElement(Grid$1, { size: 4 },
                React__default.createElement(FormControl, null,
                    React__default.createElement(InputLabel, { id: "unit-select-label" }, "Unit"),
                    React__default.createElement(Select, { labelId: "unit-select-label", id: "unit-select", value: selectedUnit, label: "Unit", onChange: function (e) {
                            setSelectedUnit(e.target.value);
                            setMeasureState(undefined);
                            setReload(true);
                        } },
                        React__default.createElement(MenuItem, { value: "kilometers" }, "Kilometers"),
                        React__default.createElement(MenuItem, { value: "miles" }, "Miles")))),
            React__default.createElement("br", null),
            !reload && (React__default.createElement(MlMeasureTool, __assign({ measureType: selectedMode, unit: selectedUnit, onChange: handleMeasureChange }, unitSwitch, { onFinish: function () {
                    setReload(true);
                } }))),
            React__default.createElement(LayerList, null, measureList === null || measureList === void 0 ? void 0 :
                measureList.map(function (measure, Index) {
                    var _a;
                    return (React__default.createElement(React__default.Fragment, null,
                        React__default.createElement(Box$2, { key: measure.measure, sx: { display: 'flex', flexDirection: 'column' } },
                            React__default.createElement("br", null),
                            React__default.createElement(Box$2, { flexDirection: 'row', sx: {
                                    '&:hover': {
                                        backgroundColor: 'rgb(177, 177, 177, 0.2)',
                                    },
                                    marginTop: '25px',
                                }, onMouseOver: function () {
                                    setHoveredGeometry(measure.geojson);
                                }, onMouseLeave: function () {
                                    setHoveredGeometry(undefined);
                                } },
                                React__default.createElement(Fragment, { key: measure.measure + '-' + Index },
                                    React__default.createElement(LayerListItem, { key: measure.measure, layerComponent: React__default.createElement(MlGeoJsonLayer, { mapId: props.mapId, geojson: measure.geojson }), visible: true, configurable: true, type: "layer", name: ((_a = measure.geojson.geometry) === null || _a === void 0 ? void 0 : _a.type) === 'LineString'
                                            ? measure.measure.toFixed(3).toString() + ' ' + measure.unit
                                            : measure.measure.toFixed(3).toString() + ' ' + measure.unit + '²' }),
                                    React__default.createElement(Tooltip, { title: "Delete" },
                                        React__default.createElement(Button, { onClick: function () { return handleDelete(Index); } },
                                            ' ',
                                            React__default.createElement(DeleteIcon, null),
                                            ' ')),
                                    React__default.createElement(Tooltip, { title: "Center Location" },
                                        React__default.createElement(Button, { onClick: function () {
                                                var _a;
                                                (_a = mapHook === null || mapHook === void 0 ? void 0 : mapHook.map) === null || _a === void 0 ? void 0 : _a.map.setCenter(measure.geojson.geometry.type === 'Point'
                                                    ? measure.geojson.geometry.coordinates
                                                    : turf.centerOfMass(measure.geojson).geometry
                                                        .coordinates);
                                            } },
                                            React__default.createElement(GpsFixedIcon, null))))))));
                }),
                hoveredGeometry && (React__default.createElement(MlGeoJsonLayer, { mapId: props.mapId, geojson: { type: 'FeatureCollection', features: [hoveredGeometry] }, layerId: 'highlightBorder', defaultPaintOverrides: {
                        circle: {
                            'circle-color': '#dd9900',
                            'circle-opacity': 0.4,
                            'circle-radius': 10,
                        },
                        line: {
                            'line-color': '#dd9900',
                            'line-opacity': 0.4,
                            'line-width': 10,
                        },
                        fill: {
                            'fill-color': '#dd9900',
                            'fill-opacity': 0.4,
                        },
                    } }))))));
};
MlMultiMeasureTool.defaultProps = {
    mapId: undefined,
    measureType: 'polygon',
    buttonStyleOverride: {},
};

var CompassBackground = function (_a) {
    var _b = _a.className, className = _b === void 0 ? '' : _b, title = _a.title, onClick = _a.onClick, style = _a.style;
    return (React__default.createElement("svg", { width: "52", height: "53", viewBox: "0 0 52 53", fill: "none", className: className, onClick: onClick, role: title ? 'img' : 'presentation', "aria-hidden": !title, style: style },
        title && React__default.createElement("title", null, title),
        React__default.createElement("circle", { cx: "26.0001", cy: "26.1843", r: "24", fill: "white", stroke: "#009EE0", strokeWidth: "2" }),
        React__default.createElement("path", { d: "M26.4915 7.59161C26.3524 8.07338 25.6698 8.07338 25.5307 7.59161L24.2998 3.3276C24.2075 3.0079 24.4474 2.68893 24.7802 2.68893H27.242C27.5748 2.68893 27.8147 3.0079 27.7224 3.3276L26.4915 7.59161Z", fill: "#009EE0" }),
        React__default.createElement("path", { d: "M25.5085 44.7598C25.6476 44.278 26.3302 44.278 26.4693 44.7598L27.7002 49.0238C27.7925 49.3435 27.5526 49.6625 27.2198 49.6625H24.758C24.4252 49.6625 24.1853 49.3435 24.2776 49.0238L25.5085 44.7598Z", fill: "#009EE0" }),
        React__default.createElement("path", { d: "M44.6641 26.4915C44.1823 26.3524 44.1823 25.6698 44.6641 25.5307L48.9281 24.2998C49.2478 24.2075 49.5668 24.4474 49.5668 24.7802V27.242C49.5668 27.5747 49.2478 27.8147 48.9281 27.7224L44.6641 26.4915Z", fill: "#009EE0" }),
        React__default.createElement("path", { d: "M7.3959 25.6085C7.87766 25.7476 7.87766 26.4302 7.3959 26.5693L3.13189 27.8002C2.81218 27.8925 2.49321 27.6526 2.49321 27.3198L2.49321 24.858C2.49321 24.5253 2.81218 24.2853 3.13189 24.3776L7.3959 25.6085Z", fill: "#009EE0" })));
};

var CompassNeedle = function (_a) {
    var _b = _a.className, className = _b === void 0 ? '' : _b, title = _a.title, onClick = _a.onClick, style = _a.style;
    return (React__default.createElement("svg", { width: "10", height: "40", viewBox: "0 0 10 40", fill: "none", className: className, onClick: onClick, role: title ? 'img' : 'presentation', "aria-hidden": !title, style: style },
        title && React__default.createElement("title", null, title),
        React__default.createElement("g", { transform: "translate(0.67544,-1.25e-5)" },
            React__default.createElement("path", { d: "m 3.34715,4.52028 c 0.22737,-1.05154 1.72745,-1.05154 1.95482,0 L 8.64912,20 H 0 Z", fill: "#cf003d" }),
            React__default.createElement("path", { d: "m 3.34715,35.4797 c 0.22737,1.0516 1.72745,1.0516 1.95482,0 L 8.64912,20 H 0 Z", fill: "#d3dcf0" }))));
};

var BoxStyled$2 = styled(Box$1)(function (_a) {
    var _b;
    var theme = _a.theme;
    return (_b = {
            zIndex: 1000,
            cursor: 'pointer',
            transform: 'scale(1)'
        },
        _b[theme.breakpoints.down('md')] = {
            transform: 'scale(1.6)',
        },
        _b);
});
var CompassBox = styled(Box$1)(function (_a) {
    var _b;
    var theme = _a.theme;
    return (_b = {
            position: 'absolute',
            right: '-10px',
            top: '-52px',
            width: '52px',
            height: '52px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
        },
        _b[theme.breakpoints.down('md')] = {
            right: '0px',
            top: '-52px',
        },
        _b.circle = {
            fill: theme.palette.compass.compColor,
            stroke: theme.palette.compass.compStroke,
        },
        _b.path = {
            fill: theme.palette.compass.compStroke,
        },
        _b['&:hover circle'] = {
            fill: theme.palette.compass.compHover,
        },
        _b);
});
var NeedleBox = styled(Box$1)(function (_a) {
    var theme = _a.theme;
    return ({
        display: 'flex',
        flexDirection: 'row',
        'path:nth-of-type(2)': {
            fill: theme.palette.compass.compSouth,
        },
        'path:nth-of-type(1)': {
            fill: theme.palette.compass.compNorth,
        },
    });
});
/**
 * Navigation component that displays a compass component which indicates the current oriantation of the map it is registered for and offers controls to turn the bearing 90° left/right or reset north to point up.
 *
 * All style props are applied using @mui/material/styled to allow more complex css selectors.
 *
 * @component
 */
var MlNavigationCompass = function (props) {
    var mapHook = useMap({
        mapId: props.mapId,
        waitForLayer: props.insertBeforeLayer,
    });
    var _a = useState(0), bearing = _a[0], setBearing = _a[1];
    var _updateBearing = function () {
        var _a, _b;
        if (!((_b = (_a = mapHook.map) === null || _a === void 0 ? void 0 : _a.map) === null || _b === void 0 ? void 0 : _b.getBearing))
            return;
        setBearing(Math.round(mapHook.map.map.getBearing()));
    };
    useEffect(function () {
        if (!mapHook.map)
            return;
        mapHook.map.on('rotate', _updateBearing, mapHook.componentId);
        _updateBearing();
        return function () {
            var _a;
            (_a = mapHook.map) === null || _a === void 0 ? void 0 : _a.map.off('rotate', _updateBearing);
        };
    }, [mapHook.map, props.mapId]);
    var rotate = function () {
        var _a, _b, _c, _d;
        if (bearing == 0) {
            (_a = mapHook.map) === null || _a === void 0 ? void 0 : _a.map.setBearing(-90);
        }
        else if (bearing == -90) {
            (_b = mapHook.map) === null || _b === void 0 ? void 0 : _b.map.setBearing(180);
        }
        else if (bearing == 180) {
            (_c = mapHook.map) === null || _c === void 0 ? void 0 : _c.map.setBearing(90);
        }
        else {
            (_d = mapHook.map) === null || _d === void 0 ? void 0 : _d.map.setBearing(0);
        }
    };
    return (React__default.createElement(React__default.Fragment, null,
        React__default.createElement(BoxStyled$2, { sx: __assign({}, props.style) },
            React__default.createElement(CompassBox, { onClick: rotate, sx: __assign({}, props.backgroundStyle) },
                React__default.createElement(CompassBackground, { style: { position: 'absolute', top: 0, left: 0 } }),
                React__default.createElement(NeedleBox, { onClick: rotate, sx: __assign({}, props.needleStyle) },
                    React__default.createElement(CompassNeedle, { style: {
                            transform: 'rotate(' + (bearing > 0 ? '-' + bearing : -1 * bearing) + 'deg)',
                        } }))))));
};

/**
 * @component
 */
var MlNavigationTools = function (props) {
    var mapHook = useMap({
        mapId: props.mapId,
        waitForLayer: props.insertBeforeLayer,
    });
    var _a = useState(0), pitch = _a[0], setPitch = _a[1];
    var mediaIsMobile = useMediaQuery$1(function (theme) { return theme.breakpoints.down('md'); });
    useEffect(function () {
        if (!mapHook.map)
            return;
        mapHook.map.on('pitchend', function () {
            if (!mapHook.map)
                return;
            setPitch(mapHook.map.getPitch());
        }, mapHook.componentId);
        setPitch(mapHook.map.getPitch());
    }, [mapHook.map, props.mapId]);
    var zoomIn = useCallback(function () {
        if (!mapHook.map)
            return;
        mapHook.map.easeTo({ zoom: mapHook.map.getZoom() + 0.5 });
    }, [mapHook.map]);
    var zoomOut = useCallback(function () {
        if (!mapHook.map)
            return;
        mapHook.map.easeTo({ zoom: mapHook.map.getZoom() - 0.5 });
    }, [mapHook.map]);
    var adjustPitch = useCallback(function () {
        if (!mapHook.map)
            return;
        setPitch(mapHook.map.getPitch());
        var targetPitch = mapHook.map.getPitch() !== 0 ? 0 : 60;
        mapHook.map.easeTo({ pitch: targetPitch });
    }, [mapHook.map]);
    return (React__default.createElement(Box$2, { sx: __assign(__assign({ zIndex: 501, position: 'absolute', display: 'flex', flexDirection: 'column', right: mediaIsMobile ? '15px' : '25px', bottom: mediaIsMobile ? '20px' : '40px' }, (mediaIsMobile ? { margin: '80px 10px 50px 10px' } : { marginTop: '50px' })), props.sx) },
        React__default.createElement(MlNavigationCompass, null),
        props.show3DButton && (React__default.createElement(Button$1, { variant: "navtools", onClick: adjustPitch }, pitch < 29 ? '3D' : '2D')),
        props.showFollowGpsButton && React__default.createElement(MlFollowGps, null),
        props.showCenterLocationButton && React__default.createElement(MlCenterPosition, null),
        React__default.createElement(ButtonGroup, { orientation: "vertical", sx: {
                border: 'none',
                Button: { minWidth: '20px !important' },
                'Button:hover': { border: 'none' },
            } }, props.showZoomButtons && (React__default.createElement(React__default.Fragment, null,
            React__default.createElement(Button$1, { variant: "navtools", onClick: zoomIn },
                React__default.createElement(ControlPointIcon, { sx: { fontSize: { xs: '1.4em', md: '1em' } } })),
            React__default.createElement(Divider, { sx: { zIndex: 500, marginLeft: '7px', marginRight: '7px' } }),
            React__default.createElement(Button$1, { variant: "navtools", onClick: zoomOut },
                React__default.createElement(RemoveCircleOutlineIcon, { sx: { fontSize: { xs: '1.4em', md: '1em' } } }))))),
        props.children && React__default.cloneElement(props.children, {})));
};
MlNavigationTools.defaultProps = {
    mapId: undefined,
    show3DButton: true,
    showFollowGpsButton: true,
    showCenterLocationButton: false,
    showZoomButtons: true,
};

/**
 * Basic layer component that create a layer in a MapLibre-gl instance and keeps it updated according to it attribute configuration.
 *
 * @category Map components
 */
var MlLayer = function (props) {
    var _a;
    useLayer({
        idPrefix: 'MlLayer-',
        layerId: props.layerId,
        mapId: props.mapId,
        geojson: props.geojson || undefined,
        options: __assign({ type: 'background', paint: __assign({}, (((_a = props === null || props === void 0 ? void 0 : props.options) === null || _a === void 0 ? void 0 : _a.type) && props.options.type !== 'background'
                ? {}
                : { 'background-color': 'rgba(0,0,0,0)' })) }, props.options),
        insertBeforeLayer: props.insertBeforeLayer,
    });
    return React__default.createElement(React__default.Fragment, null);
};

var MlScaleReference = function (props) {
    var zoomRef = useRef(0);
    var mapHook = useMap({ mapId: props.mapId, waitForLayer: props.insertBeforeLayer });
    var _a = useState(0), pxWidth = _a[0], setPxWidth = _a[1];
    var _b = useState(''), text = _b[0], setText = _b[1];
    var updateScale = useCallback(function () {
        var _a, _b;
        if (!mapHook.map)
            return;
        if (((_a = mapHook.map) === null || _a === void 0 ? void 0 : _a.map.getZoom()) === zoomRef.current) {
            return;
        }
        zoomRef.current = (_b = mapHook.map) === null || _b === void 0 ? void 0 : _b.map.getZoom();
        // Calculation from MapLibre
        // A horizontal scale is imagined to be present at center of the map
        // Using spherical law of cosines approximation, the real distance is
        // found between the two coordinates.
        var maxWidth = props.maxWidth || 100;
        var y = mapHook.map.map._container.clientHeight / 2;
        var left = mapHook.map.map.unproject([0, y]);
        var right = mapHook.map.map.unproject([maxWidth, y]);
        var maxMeters = left.distanceTo(right);
        // The real distance corresponding to 100px scale length is rounded off to
        // near pretty number and the scale length for the same is found out.
        // Default unit of the scale is based on User's locale.
        if (props.unit === 'imperial') {
            var maxFeet = 3.2808 * maxMeters;
            if (maxFeet > 5280) {
                var maxMiles = maxFeet / 5280;
                setScale(maxWidth, maxMiles, mapHook.map.map._getUIString('ScaleControl.Miles'));
            }
            else {
                setScale(maxWidth, maxFeet, mapHook.map.map._getUIString('ScaleControl.Feet'));
            }
        }
        else if (props.unit === 'nautical') {
            var maxNauticals = maxMeters / 1852;
            setScale(maxWidth, maxNauticals, mapHook.map.map._getUIString('ScaleControl.NauticalMiles'));
        }
        else if (maxMeters >= 1000) {
            setScale(maxWidth, maxMeters / 1000, mapHook.map.map._getUIString('ScaleControl.Kilometers'));
        }
        else {
            setScale(maxWidth, maxMeters, mapHook.map.map._getUIString('ScaleControl.Meters'));
        }
    }, [mapHook.map, props.unit, props.maxWidth]);
    useEffect(function () {
        if (!mapHook.map)
            return;
        var _updateScale = updateScale;
        mapHook.map.on('move', _updateScale, mapHook.componentId);
        updateScale();
        return function () {
            var _a;
            (_a = mapHook.map) === null || _a === void 0 ? void 0 : _a.map.off('move', _updateScale);
        };
    }, [mapHook.map, updateScale]);
    var setScale = function (maxWidth, maxDistance, unit) {
        var distance = getRoundNum(maxDistance);
        var ratio = distance / maxDistance;
        setPxWidth(maxWidth * ratio);
        setText(distance + '&nbsp;' + unit);
    };
    var getDecimalRoundNum = function (d) {
        var multiplier = Math.pow(10, Math.ceil(-Math.log(d) / Math.LN10));
        return Math.round(d * multiplier) / multiplier;
    };
    var getRoundNum = function (num) {
        var pow10 = Math.pow(10, "".concat(Math.floor(num)).length - 1);
        var d = num / pow10;
        d = d >= 10 ? 10 : d >= 5 ? 5 : d >= 3 ? 3 : d >= 2 ? 2 : d >= 1 ? 1 : getDecimalRoundNum(d);
        return pow10 * d;
    };
    return (React__default.createElement(React__default.Fragment, null,
        React__default.createElement("div", { style: {
                backgroundColor: 'hsla(0,0%,100%,.75)',
                fontSize: '10px',
                border: '2px solid #333',
                borderTop: '#333',
                padding: '0 5px',
                color: '#333',
                boxSizing: 'border-box',
                width: pxWidth + 'px',
                fontFamily: 'sans-serif',
            }, dangerouslySetInnerHTML: { __html: text } })));
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
    var _a = useState(50), swipeX = _a[0], setSwipeX = _a[1];
    var swipeXRef = useRef(50);
    var _b = useState(50), swipeY = _b[0], setSwipeY = _b[1];
    var swipeYRef = useRef(50);
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
        window.addEventListener('resize', onResize.current);
        var _onResize = onResize.current;
        return function () {
            window.removeEventListener('resize', _onResize);
            syncCleanupFunctionRef.current();
        };
    }, []);
    var onMove = useCallback(function (e) {
        if (!mapExists())
            return;
        var bounds = mapContext.maps[props.map1Id].getCanvas().getBoundingClientRect();
        var clientX = (e === null || e === void 0 ? void 0 : e.clientX) ||
            (typeof (e === null || e === void 0 ? void 0 : e.touches) !== 'undefined' && typeof (e === null || e === void 0 ? void 0 : e.touches[0]) !== 'undefined'
                ? e === null || e === void 0 ? void 0 : e.touches[0].clientX
                : 0);
        var clientY = (e === null || e === void 0 ? void 0 : e.clientY) ||
            (typeof e.touches !== 'undefined' && typeof e.touches[0] !== 'undefined'
                ? e.touches[0].clientY
                : 0);
        clientX -= bounds.x;
        clientY -= bounds.y;
        var swipeX_tmp = parseFloat(((clientX / bounds.width) * 100).toFixed(2));
        var swipeY_tmp = parseFloat(((clientY / bounds.height) * 100).toFixed(2));
        if (swipeXRef.current !== swipeX_tmp || swipeYRef.current !== swipeY_tmp) {
            setSwipeX(swipeX_tmp);
            swipeXRef.current = swipeX_tmp;
            setSwipeY(swipeY_tmp);
            swipeYRef.current = swipeY_tmp;
            mapContext.maps[props.map2Id].getContainer().style.clipPath =
                "circle(".concat(magnifierRadius, "px at ") +
                    (swipeXRef.current * bounds.width) / 100 +
                    'px ' +
                    (swipeYRef.current * bounds.height) / 100 +
                    'px)';
        }
    }, [mapContext, mapExists, props, magnifierRadius]);
    useEffect(function () {
        if (!mapExists() || syncMoveInitializedRef.current)
            return;
        syncMoveInitializedRef.current = true;
        syncCleanupFunctionRef.current = syncMove(mapContext.getMap(props.map1Id).map, mapContext.getMap(props.map2Id).map);
        onMove({
            clientX: swipeXRef.current,
            clientY: swipeYRef.current,
        });
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
        if (e.nativeEvent instanceof TouchEvent) {
            document.addEventListener('touchmove', onMove);
            document.addEventListener('touchend', onTouchEnd);
        }
        else {
            document.addEventListener('mousemove', onMove);
            document.addEventListener('mouseup', onMouseUp);
        }
    };
    var onTouchEnd = function () {
        document.removeEventListener('touchmove', onMove);
        document.removeEventListener('touchend', onTouchEnd);
    };
    var onMouseUp = function () {
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onMouseUp);
    };
    var onWheel = function (e) {
        var _a;
        var evCopy = new WheelEvent(e.type, e);
        (_a = mapContext.map) === null || _a === void 0 ? void 0 : _a.map.getCanvas().dispatchEvent(evCopy);
    };
    return (React__default.createElement("div", { style: __assign({ position: 'absolute', left: swipeX + '%', top: swipeY + '%', borderRadius: '50%', width: magnifierRadius * 2 - 2 + 'px', height: magnifierRadius * 2 - 2 + 'px', background: 'rgba(0,0,0,0)', border: '2px solid #fafafa', boxShadow: '1px 2px 2px rgba(19, 19, 19, .5), inset 1px 1px 1px rgba(19, 19, 19, .2)', cursor: 'pointer', zIndex: '110', marginLeft: magnifierRadius * -1 - 1 + 'px', marginTop: magnifierRadius * -1 - 1 + 'px', textAlign: 'center', lineHeight: '91px', fontSize: '2em', color: '#fafafa', userSelect: 'none' }, props.magnifierStyle), onTouchStart: onDown, onMouseDown: onDown, onWheel: onWheel }));
};
MlLayerMagnify.defaultProps = {
    magnifierRadius: 200,
    magnifierStyle: {},
};

var SwipeIcon = function (_a) {
    var _b = _a.className, className = _b === void 0 ? '' : _b, title = _a.title, onClick = _a.onClick, style = _a.style, color = _a.color;
    return (React__default.createElement("svg", { viewBox: "0 0 47 30", fill: "none", xmlns: "http://www.w3.org/2000/svg", className: className, onClick: onClick, role: title ? 'img' : 'presentation', "aria-hidden": !title, style: style, color: color },
        React__default.createElement("path", { d: "M29.5 21.25L35.75 15L29.5 8.75V21.25Z", fill: "#009EE0" }),
        React__default.createElement("path", { d: "M17.5 8.75L11.25 15L17.5 21.25V8.75Z", fill: "#009EE0" })));
};

/**
 *	creates a split view of 2 synchronised maplibre instances
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
        var bounds = mapContext.maps[props.map1Id].getCanvas().getBoundingClientRect();
        var clientX = e.clientX ||
            (typeof e.touches !== 'undefined' && typeof e.touches[0] !== 'undefined'
                ? e.touches[0].clientX
                : 0);
        clientX -= bounds.x;
        var swipeX_tmp = parseFloat(((clientX / bounds.width) * 100).toFixed(2));
        if (swipeXRef.current !== swipeX_tmp) {
            setSwipeX(swipeX_tmp);
            swipeXRef.current = swipeX_tmp;
            var clipA = 'rect(0, ' + (swipeXRef.current * bounds.width) / 100 + 'px, 999em, 0)';
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
        if ((window === null || window === void 0 ? void 0 : window.TouchEvent) && e.nativeEvent instanceof window.TouchEvent) {
            document.addEventListener('touchmove', onMove);
            document.addEventListener('touchend', onTouchEnd);
        }
        else {
            document.addEventListener('mousemove', onMove);
            document.addEventListener('mouseup', onMouseUp);
        }
    };
    var onTouchEnd = function () {
        document.removeEventListener('touchmove', onMove);
        document.removeEventListener('touchend', onTouchEnd);
    };
    var onMouseUp = function () {
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onMouseUp);
    };
    function adjustWindowSize() {
        var clipWidth = parseFloat(mapContext.maps[props.map2Id]
            .getContainer()
            .style.clip.split(',')[1]
            .replace('px', ''));
        var canvasWidth = mapContext.maps[props.map1Id].getCanvas().getBoundingClientRect().width;
        if (clipWidth < canvasWidth) {
            var newPosition = parseFloat(((clipWidth / canvasWidth) * 100).toFixed(2));
            setSwipeX(newPosition);
        }
        else {
            var newClip = 'rect(0, ' + canvasWidth / 2 + 'px, 999em, 0)';
            mapContext.maps[props.map2Id].getContainer().style.clip = newClip;
            setSwipeX(50);
        }
    }
    useEffect(function () {
        window.addEventListener('resize', adjustWindowSize);
        return function () {
            window.removeEventListener('resize', adjustWindowSize);
        };
    }, [mapContext]);
    return (React__default.createElement("div", { style: __assign({ position: 'absolute', left: swipeX + '%', top: '50%', borderRadius: '50%', width: '65px', height: '65px', background: 'rgba(234, 235, 241, 0.75)', border: '2px solid rgba(0, 158, 224, 0.75)', cursor: 'pointer', zIndex: '110', marginLeft: '-35px', marginTop: '-50px', textAlign: 'center', lineHeight: '91px', fontSize: '2em', color: '#fafafa', userSelect: 'none' }, props.buttonStyle), onTouchStart: onDown, onMouseDown: onDown },
        React__default.createElement(SwipeIcon, { color: "#0066ff", style: {
                width: '65px',
                height: '65px',
                justifyContent: 'center',
                zIndex: 1100,
            } })));
};
MlLayerSwipe.defaultProps = {
    buttonStyle: {},
};

function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _arrayWithoutHoles(r) {
  if (Array.isArray(r)) return _arrayLikeToArray(r);
}
function _iterableToArray(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _toConsumableArray(r) {
  return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
}
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}

var _showNextTransitionSegment2 = function _showNextTransitionSegment(props, map, transitionInProgressRef, transitionGeojsonDataRef, transitionGeojsonCommonDataRef, currentTransitionStepRef, msPerStep, transitionTimeoutRef, setDisplayGeojson) {
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
        return _showNextTransitionSegment2.apply(void 0, _toConsumableArray(_arguments));
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
  var reverseOrder = false;
  // In case one geojson is missing completely use the first two coordinates of the other geojson
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
  if (targetCoordinates.length < 2 && srcCoordinates < 2) return;
  // create props.transitionTime / msPerStep (=: transitionSteps) Versions of transitionGeojsonCommonDataRef.current + transitionCoordinates making the transitionCoordinates transitionCoordinatesDistance / transitionSteps longer on each step

  var transitionSteps = props.transitionTime / msPerStep;
  var srcCoordinatesDistance = srcCoordinates.length > 1 ? Math.round(turf.length(turf.lineString(srcCoordinates))) : 0;
  var targetCoordinatesDistance = targetCoordinates.length > 1 ? Math.round(turf.length(turf.lineString(targetCoordinates))) : 0;
  var transitionDistance = targetCoordinatesDistance + srcCoordinatesDistance;
  var srcCoordinatesShare = srcCoordinatesDistance / transitionDistance;
  var srcTransitionSteps = Math.round(transitionSteps * srcCoordinatesShare);
  var srcPerStepDistance = Math.round(srcCoordinatesDistance / srcTransitionSteps * 100) / 100;
  var targetCoordinatesShare = targetCoordinatesDistance / transitionDistance;
  var targetTransitionSteps = Math.round(transitionSteps * targetCoordinatesShare);
  var targetPerStepDistance = Math.round(targetCoordinatesDistance / targetTransitionSteps * 100) / 100;

  // create transition step data as an array of all required FeatureCollection states until the transition is complete
  var transitionStepData;
  transitionStepData = _toConsumableArray(createTransitionSteps(srcCoordinates, srcPerStepDistance, srcTransitionSteps));
  transitionStepData.reverse();
  transitionStepData = [].concat(_toConsumableArray(transitionStepData), _toConsumableArray(createTransitionSteps(targetCoordinates, targetPerStepDistance, targetTransitionSteps)));
  transitionStepData.push(targetGeojson);
  transitionGeojsonDataRef.current = transitionStepData;
  currentTransitionStepRef.current = 1;
  transitionInProgressRef.current = true;
  transitionTimeoutRef.current = setTimeout(function () {
    return _showNextTransitionSegment2(props, map, transitionInProgressRef, transitionGeojsonDataRef, transitionGeojsonCommonDataRef, currentTransitionStepRef, msPerStep, transitionTimeoutRef, setDisplayGeojson);
  }, msPerStep);
};
var createTransitionSteps = function createTransitionSteps(linestringCoordinates, perStepDistance, stepCnt) {
  var transitionSteps = [];
  if (linestringCoordinates.length > 1) {
    var tmpChunks = turf.lineChunk(turf.lineString(linestringCoordinates), perStepDistance);
    // tmpLineString contains all coordinates of all previous plus current loop iteration
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
    // ignore eslint. Only using `geojson` for destructuring
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    props.geojson; var restProps = __rest(props, ["geojson"]);
    var mapHook = useMap({
        mapId: props.mapId,
        waitForLayer: props.insertBeforeLayer,
    });
    var initializedRef = useRef(false);
    // transition effect variables
    var oldGeojsonRef = useRef(null);
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
        if (typeof props.transitionTime !== 'undefined' &&
            props.type === 'line' &&
            oldGeojsonRef.current) {
            transitionInProgressRef.current = false;
            currentTransitionStepRef.current = false;
            transitionGeojsonDataRef.current = [];
            transitionGeojsonCommonDataRef.current = [];
            transitionToGeojson();
        }
        if (props.geojson) {
            oldGeojsonRef.current = props.geojson;
        }
    }, [mapHook.map, transitionToGeojson, props]);
    var startTransition = useCallback(function () {
        if (props.type === 'line' &&
            typeof props.transitionTime !== 'undefined' &&
            props.transitionTime &&
            typeof props.geojson !== 'undefined' &&
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

var getBoxTransform = function (anchor) {
    if (anchor === void 0) { anchor = 'top'; }
    switch (anchor) {
        case 'bottom':
            return 'translate(-50%, 0%)';
        case 'left':
            return 'translate(-100%, -50%)';
        case 'right':
            return 'translate(0%, -50%)';
        case 'top-left':
            return 'translate(-100%, -100%)';
        case 'top-right':
            return 'translate(0%, -100%)';
        case 'bottom-left':
            return 'translate(-100%, 0%)';
        case 'bottom-right':
            return 'translate(0%, 0%)';
        default:
        case 'top':
            return 'translate(-50%, -100%)';
    }
};
function getBoxMargins(anchor, offset, style) {
    var w = parseInt(String((style === null || style === void 0 ? void 0 : style.width) || 14), 10);
    var h = parseInt(String((style === null || style === void 0 ? void 0 : style.height) || 14), 10);
    var m = {};
    switch (anchor) {
        case 'bottom':
            m.marginTop = "".concat(offset, "px");
            break;
        case 'left':
            m.marginLeft = "-".concat(offset, "px");
            break;
        case 'right':
            m.marginLeft = "".concat(w + offset, "px");
            break;
        case 'top-left':
            m.marginTop = "-".concat(h + offset, "px");
            m.marginLeft = "-".concat(offset, "px");
            break;
        case 'top-right':
            m.marginTop = "-".concat(h + offset, "px");
            m.marginLeft = "".concat(w + offset, "px");
            break;
        case 'bottom-left':
            m.marginTop = "".concat(offset, "px");
            m.marginLeft = "-".concat(offset, "px");
            break;
        case 'bottom-right':
            m.marginTop = "".concat(offset, "px");
            m.marginLeft = "".concat(w + offset, "px");
            break;
        case 'top':
        default:
            m.marginTop = "-".concat(h + offset, "px");
            break;
    }
    return m;
}
var MlMarker = function (_a) {
    var _b = _a.passEventsThrough, passEventsThrough = _b === void 0 ? true : _b, _c = _a.contentOffset, contentOffset = _c === void 0 ? 5 : _c, props = __rest(_a, ["passEventsThrough", "contentOffset"]);
    var mapHook = useMap({
        mapId: props.mapId,
        waitForLayer: props.insertBeforeLayer,
    });
    var _d = useState(null), marker = _d[0], setMarker = _d[1];
    var container = useRef(null);
    var iframeRef = useRef(null);
    useEffect(function () {
        if (!mapHook.map)
            return;
        container.current = document.createElement('div');
        var defaultMarkerStyle = {
            width: '12px',
            height: '12px',
            background: 'linear-gradient(135deg, rgb(186, 208, 218) 0%, rgb(96, 209, 253) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.7)',
            boxShadow: '0 2px 6px rgba(90, 0, 0, 0.2), 0 0 0 2px rgba(240, 147, 251, 0.2)',
            borderRadius: '50%',
        };
        var markerStyle = __assign(__assign({}, defaultMarkerStyle), props.markerStyle);
        var maplibreMarker = new maplibregl.Marker({
            element: container.current,
            anchor: 'center',
        })
            .setLngLat([props.lng, props.lat])
            .addTo(mapHook.map.map);
        setMarker(maplibreMarker);
        var markerDot = document.createElement('div');
        Object.entries(markerStyle).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            markerDot.style.setProperty(key.replace(/([A-Z])/g, '-$1').toLowerCase(), String(value));
        });
        container.current.appendChild(markerDot);
        return function () {
            var _a;
            markerDot.remove();
            maplibreMarker.remove();
            (_a = container.current) === null || _a === void 0 ? void 0 : _a.remove();
        };
    }, [mapHook.map, props.lng, props.lat, props.markerStyle, props.anchor]);
    useEffect(function () {
        if (marker) {
            marker.setLngLat([props.lng, props.lat]);
        }
    }, [marker, props.lng, props.lat]);
    function handleIframeLoad() {
        var _a, _b, _c;
        var iframeDoc = (_b = (_a = iframeRef.current) === null || _a === void 0 ? void 0 : _a.contentWindow) === null || _b === void 0 ? void 0 : _b.document;
        if (iframeDoc && ((_c = iframeRef.current) === null || _c === void 0 ? void 0 : _c.parentElement)) {
            var scrollHeight = iframeDoc.documentElement.scrollHeight;
            iframeRef.current.parentElement.style.height = "".concat(scrollHeight, "px");
        }
    }
    return (container.current &&
        createPortal(React__default.createElement(Box$1, { sx: __assign(__assign(__assign({ position: 'absolute', display: 'flex', width: '300px', maxHeight: '500px', opacity: passEventsThrough ? 1 : 0.7, zIndex: -1, transform: getBoxTransform(props.anchor) }, getBoxMargins(props.anchor, contentOffset, props.markerStyle)), { pointerEvents: passEventsThrough ? 'none' : 'auto', '&:hover': {
                    opacity: 1,
                } }), props.containerStyle) },
            React__default.createElement("iframe", { ref: iframeRef, onLoad: handleIframeLoad, style: __assign({ width: '100%', borderStyle: 'none' }, props.iframeStyle), srcDoc: "<div>\n\t<style>\n\t\tbody {\n\t\t\t".concat(Object.entries(props.iframeBodyStyle || {})
                    .map(function (_a) {
                    var key = _a[0], val = _a[1];
                    return "".concat(key.replace(/([A-Z])/g, '-$1').toLowerCase(), ": ").concat(val, ";");
                })
                    .join(' '), "\n\t\t}\n\t</style>\n\t").concat(props.content || '', "\n</div>"), sandbox: "allow-same-origin allow-popups-to-escape-sandbox allow-scripts", title: mapHook.componentId })), container.current));
};

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
    splitSpace = /\s+/;
  // generate a short, numeric hash of a string
  function okhash(x) {
    if (!x || !x.length) return 0;
    for (var i = 0, h = 0; i < x.length; i++) {
      h = (h << 5) - h + x.charCodeAt(i) | 0;
    }
    return h;
  }
  // all Y children of X
  function get(x, y) {
    return x.getElementsByTagName(y);
  }
  function attr(x, y) {
    return x.getAttribute(y);
  }
  function attrf(x, y) {
    return parseFloat(attr(x, y));
  }
  // one Y child of X, if any, otherwise null
  function get1(x, y) {
    var n = get(x, y);
    return n.length ? n[0] : null;
  }
  // https://developer.mozilla.org/en-US/docs/Web/API/Node.normalize
  function norm(el) {
    if (el.normalize) {
      el.normalize();
    }
    return el;
  }
  // cast array x into numbers
  function numarray(x) {
    for (var j = 0, o = []; j < x.length; j++) {
      o[j] = parseFloat(x[j]);
    }
    return o;
  }
  // get the content of a text node, if any
  function nodeVal(x) {
    if (x) {
      norm(x);
    }
    return x && x.textContent || '';
  }
  // get the contents of multiple text nodes, if present
  function getMulti(x, ys) {
    var o = {},
      n,
      k;
    for (k = 0; k < ys.length; k++) {
      n = get1(x, ys[k]);
      if (n) o[ys[k]] = nodeVal(n);
    }
    return o;
  }
  // add properties of Y to X, overwriting if present in both
  function extend(x, y) {
    for (var k in y) x[k] = y[k];
  }
  // get one coordinate from a coordinate array, if any
  function coord1(v) {
    return numarray(v.replace(removeSpace, '').split(','));
  }
  // get all coordinates from a coordinate array as [[],[]]
  function coord(v) {
    var coords = v.replace(trimSpace, '').split(splitSpace),
      o = [];
    for (var i = 0; i < coords.length; i++) {
      o.push(coord1(coords[i]));
    }
    return o;
  }
  function coordPair(x) {
    var ll = [attrf(x, 'lon'), attrf(x, 'lat')],
      ele = get1(x, 'ele'),
      // handle namespaced attribute in browser
      heartRate = get1(x, 'gpxtpx:hr') || get1(x, 'hr'),
      time = get1(x, 'time'),
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
  }

  // create a new feature collection parent object
  function fc() {
    return {
      type: 'FeatureCollection',
      features: []
    };
  }
  var serializer;
  if (typeof XMLSerializer !== 'undefined') {
    /* istanbul ignore next */
    serializer = new XMLSerializer();
  } else {
    var isNodeEnv = (typeof process === "undefined" ? "undefined" : _typeof(process)) === 'object' && !process.browser;
    var isTitaniumEnv = (typeof Titanium === "undefined" ? "undefined" : _typeof(Titanium)) === 'object';
    if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && (isNodeEnv || isTitaniumEnv)) {
      serializer = xmldom.XMLSerializer;
    } else {
      throw new Error('Unable to initialize serializer');
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
        geotypes = ['Polygon', 'LineString', 'Point', 'Track', 'gx:Track'],
        // all root placemarks in the file
        placemarks = get(doc, 'Placemark'),
        styles = get(doc, 'Style'),
        styleMaps = get(doc, 'StyleMap');
      for (var k = 0; k < styles.length; k++) {
        var hash = okhash(xml2str(styles[k])).toString(16);
        styleIndex['#' + attr(styles[k], 'id')] = hash;
        styleByHash[hash] = styles[k];
      }
      for (var l = 0; l < styleMaps.length; l++) {
        styleIndex['#' + attr(styleMaps[l], 'id')] = okhash(xml2str(styleMaps[l])).toString(16);
        var pairs = get(styleMaps[l], 'Pair');
        var pairsMap = {};
        for (var m = 0; m < pairs.length; m++) {
          pairsMap[nodeVal(get1(pairs[m], 'key'))] = nodeVal(get1(pairs[m], 'styleUrl'));
        }
        styleMapIndex['#' + attr(styleMaps[l], 'id')] = pairsMap;
      }
      for (var j = 0; j < placemarks.length; j++) {
        gj.features = gj.features.concat(getPlacemark(placemarks[j]));
      }
      function kmlColor(v) {
        var color, opacity;
        v = v || '';
        if (v.substr(0, 1) === '#') {
          v = v.substr(1);
        }
        if (v.length === 6 || v.length === 3) {
          color = v;
        }
        if (v.length === 8) {
          opacity = parseInt(v.substr(0, 2), 16) / 255;
          color = '#' + v.substr(6, 2) + v.substr(4, 2) + v.substr(2, 2);
        }
        return [color, isNaN(opacity) ? undefined : opacity];
      }
      function gxCoord(v) {
        return numarray(v.split(' '));
      }
      function gxCoords(root) {
        var elems = get(root, 'coord'),
          coords = [],
          times = [];
        if (elems.length === 0) elems = get(root, 'gx:coord');
        for (var i = 0; i < elems.length; i++) coords.push(gxCoord(nodeVal(elems[i])));
        var timeElems = get(root, 'when');
        for (var j = 0; j < timeElems.length; j++) times.push(nodeVal(timeElems[j]));
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
        if (get1(root, 'MultiGeometry')) {
          return getGeometry(get1(root, 'MultiGeometry'));
        }
        if (get1(root, 'MultiTrack')) {
          return getGeometry(get1(root, 'MultiTrack'));
        }
        if (get1(root, 'gx:MultiTrack')) {
          return getGeometry(get1(root, 'gx:MultiTrack'));
        }
        for (i = 0; i < geotypes.length; i++) {
          geomNodes = get(root, geotypes[i]);
          if (geomNodes) {
            for (j = 0; j < geomNodes.length; j++) {
              geomNode = geomNodes[j];
              if (geotypes[i] === 'Point') {
                geoms.push({
                  type: 'Point',
                  coordinates: coord1(nodeVal(get1(geomNode, 'coordinates')))
                });
              } else if (geotypes[i] === 'LineString') {
                geoms.push({
                  type: 'LineString',
                  coordinates: coord(nodeVal(get1(geomNode, 'coordinates')))
                });
              } else if (geotypes[i] === 'Polygon') {
                var rings = get(geomNode, 'LinearRing'),
                  coords = [];
                for (k = 0; k < rings.length; k++) {
                  coords.push(coord(nodeVal(get1(rings[k], 'coordinates'))));
                }
                geoms.push({
                  type: 'Polygon',
                  coordinates: coords
                });
              } else if (geotypes[i] === 'Track' || geotypes[i] === 'gx:Track') {
                var track = gxCoords(geomNode);
                geoms.push({
                  type: 'LineString',
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
          name = nodeVal(get1(root, 'name')),
          address = nodeVal(get1(root, 'address')),
          styleUrl = nodeVal(get1(root, 'styleUrl')),
          description = nodeVal(get1(root, 'description')),
          timeSpan = get1(root, 'TimeSpan'),
          timeStamp = get1(root, 'TimeStamp'),
          extendedData = get1(root, 'ExtendedData'),
          lineStyle = get1(root, 'LineStyle'),
          polyStyle = get1(root, 'PolyStyle'),
          visibility = get1(root, 'visibility');
        if (!geomsAndTimes.geoms.length) return [];
        if (name) properties.name = name;
        if (address) properties.address = address;
        if (styleUrl) {
          if (styleUrl[0] !== '#') {
            styleUrl = '#' + styleUrl;
          }
          properties.styleUrl = styleUrl;
          if (styleIndex[styleUrl]) {
            properties.styleHash = styleIndex[styleUrl];
          }
          if (styleMapIndex[styleUrl]) {
            properties.styleMapHash = styleMapIndex[styleUrl];
            properties.styleHash = styleIndex[styleMapIndex[styleUrl].normal];
          }
          // Try to populate the lineStyle or polyStyle since we got the style hash
          var style = styleByHash[properties.styleHash];
          if (style) {
            if (!lineStyle) lineStyle = get1(style, 'LineStyle');
            if (!polyStyle) polyStyle = get1(style, 'PolyStyle');
            var iconStyle = get1(style, 'IconStyle');
            if (iconStyle) {
              var icon = get1(iconStyle, 'Icon');
              if (icon) {
                var href = nodeVal(get1(icon, 'href'));
                if (href) properties.icon = href;
              }
            }
          }
        }
        if (description) properties.description = description;
        if (timeSpan) {
          var begin = nodeVal(get1(timeSpan, 'begin'));
          var end = nodeVal(get1(timeSpan, 'end'));
          properties.timespan = {
            begin: begin,
            end: end
          };
        }
        if (timeStamp) {
          properties.timestamp = nodeVal(get1(timeStamp, 'when'));
        }
        if (lineStyle) {
          var linestyles = kmlColor(nodeVal(get1(lineStyle, 'color'))),
            color = linestyles[0],
            opacity = linestyles[1],
            width = parseFloat(nodeVal(get1(lineStyle, 'width')));
          if (color) properties.stroke = color;
          if (!isNaN(opacity)) properties['stroke-opacity'] = opacity;
          if (!isNaN(width)) properties['stroke-width'] = width;
        }
        if (polyStyle) {
          var polystyles = kmlColor(nodeVal(get1(polyStyle, 'color'))),
            pcolor = polystyles[0],
            popacity = polystyles[1],
            fill = nodeVal(get1(polyStyle, 'fill')),
            outline = nodeVal(get1(polyStyle, 'outline'));
          if (pcolor) properties.fill = pcolor;
          if (!isNaN(popacity)) properties['fill-opacity'] = popacity;
          if (fill) properties['fill-opacity'] = fill === '1' ? properties['fill-opacity'] || 1 : 0;
          if (outline) properties['stroke-opacity'] = outline === '1' ? properties['stroke-opacity'] || 1 : 0;
        }
        if (extendedData) {
          var datas = get(extendedData, 'Data'),
            simpleDatas = get(extendedData, 'SimpleData');
          for (i = 0; i < datas.length; i++) {
            properties[datas[i].getAttribute('name')] = nodeVal(get1(datas[i], 'value'));
          }
          for (i = 0; i < simpleDatas.length; i++) {
            properties[simpleDatas[i].getAttribute('name')] = nodeVal(simpleDatas[i]);
          }
        }
        if (visibility) {
          properties.visibility = nodeVal(visibility);
        }
        if (geomsAndTimes.coordTimes.length) {
          properties.coordTimes = geomsAndTimes.coordTimes.length === 1 ? geomsAndTimes.coordTimes[0] : geomsAndTimes.coordTimes;
        }
        var feature = {
          type: 'Feature',
          geometry: geomsAndTimes.geoms.length === 1 ? geomsAndTimes.geoms[0] : {
            type: 'GeometryCollection',
            geometries: geomsAndTimes.geoms
          },
          properties: properties
        };
        if (attr(root, 'id')) feature.id = attr(root, 'id');
        return [feature];
      }
      return gj;
    },
    gpx: function gpx(doc) {
      var i,
        tracks = get(doc, 'trk'),
        routes = get(doc, 'rte'),
        waypoints = get(doc, 'wpt'),
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
        var segments = get(node, 'trkseg'),
          track = [],
          times = [],
          heartRates = [],
          line;
        for (var i = 0; i < segments.length; i++) {
          line = getPoints(segments[i], 'trkpt');
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
        extend(properties, getLineStyle(get1(node, 'extensions')));
        if (times.length) properties.coordTimes = track.length === 1 ? times[0] : times;
        if (heartRates.length) properties.heartRates = track.length === 1 ? heartRates[0] : heartRates;
        return {
          type: 'Feature',
          properties: properties,
          geometry: {
            type: track.length === 1 ? 'LineString' : 'MultiLineString',
            coordinates: track.length === 1 ? track[0] : track
          }
        };
      }
      function getRoute(node) {
        var line = getPoints(node, 'rtept');
        if (!line.line) return;
        var prop = getProperties(node);
        extend(prop, getLineStyle(get1(node, 'extensions')));
        var routeObj = {
          type: 'Feature',
          properties: prop,
          geometry: {
            type: 'LineString',
            coordinates: line.line
          }
        };
        return routeObj;
      }
      function getPoint(node) {
        var prop = getProperties(node);
        extend(prop, getMulti(node, ['sym']));
        return {
          type: 'Feature',
          properties: prop,
          geometry: {
            type: 'Point',
            coordinates: coordPair(node).coordinates
          }
        };
      }
      function getLineStyle(extensions) {
        var style = {};
        if (extensions) {
          var lineStyle = get1(extensions, 'line');
          if (lineStyle) {
            var color = nodeVal(get1(lineStyle, 'color')),
              opacity = parseFloat(nodeVal(get1(lineStyle, 'opacity'))),
              width = parseFloat(nodeVal(get1(lineStyle, 'width')));
            if (color) style.stroke = color;
            if (!isNaN(opacity)) style['stroke-opacity'] = opacity;
            // GPX width is in mm, convert to px with 96 px per inch
            if (!isNaN(width)) style['stroke-width'] = width * 96 / 25.4;
          }
        }
        return style;
      }
      function getProperties(node) {
        var prop = getMulti(node, ['name', 'cmt', 'desc', 'type', 'time', 'keywords']),
          links = get(node, 'link');
        if (links.length) prop.links = [];
        for (var i = 0, link; i < links.length; i++) {
          link = {
            href: attr(links[i], 'href')
          };
          extend(link, getMulti(links[i], ['text', 'type']));
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
 * useGpx hook converts GPX data to GeoJSON
 *
 */
var useGpx = function (props) {
    var _a = useState(), geojson = _a[0], setGeojson = _a[1];
    var _b = useState([]), metadata = _b[0], setMetadata = _b[1];
    var parseGpx = function (gpxAsString) {
        try {
            setMetadata([]);
            var domParser = new DOMParser();
            var gpxDoc = domParser.parseFromString(gpxAsString, 'application/xml');
            var metadata_1 = gpxDoc.querySelector('metadata');
            metadata_1 === null || metadata_1 === void 0 ? void 0 : metadata_1.childNodes.forEach(function (node) {
                var value = node.textContent;
                var title = node.nodeName;
                if (node.nodeName === 'link') {
                    value = node.getAttribute('href');
                }
                if (value === null || value === void 0 ? void 0 : value.trim().length) {
                    var metaDataEntry_1 = {
                        title: title,
                        value: value,
                        id: new Date().getTime(),
                    };
                    setMetadata(function (prevState) { return __spreadArray(__spreadArray([], prevState, true), [metaDataEntry_1], false); });
                }
            });
            var data = toGeoJSON.gpx(gpxDoc);
            setGeojson(data);
        }
        catch (e) {
            console.log(e);
        }
    };
    useEffect(function () {
        if (!props.data)
            return;
        parseGpx(props.data);
    }, [props.data]);
    return {
        geojson: geojson,
        metadata: metadata,
    };
};
useGpx.defaultProps = {
    data: undefined,
};

/**
 * useLayerHoverPopup hook registers a mouseenter event to display feature properties in a MapLibre popup if a feature on the configured layer is hovered
 *
 */
var LayerHoverPopup = function (props) {
    var mapHook = useMap({
        mapId: props.mapId,
        waitForLayer: props.layerId,
    });
    var popup = useRef(new Popup({
        closeButton: false,
        closeOnClick: true,
    }));
    useEffect(function () {
        if (!mapHook.map || !props.layerId)
            return;
        mapHook.map.on('mouseenter', props.layerId, function (e) {
            var _a, _b;
            if (!mapHook.map)
                return;
            // Change the cursor style as a UI indicator.
            var coordinates = (_a = e === null || e === void 0 ? void 0 : e.features) === null || _a === void 0 ? void 0 : _a[0].geometry.coordinates.slice();
            //const description = e.features[0].properties.desc;
            var content = '';
            if (((_b = e === null || e === void 0 ? void 0 : e.features) === null || _b === void 0 ? void 0 : _b[0]) && typeof props.getPopupContent === 'function') {
                content = props.getPopupContent(e.features[0]);
            }
            if (coordinates === null || coordinates === void 0 ? void 0 : coordinates[0]) {
                // Ensure that if the map is zoomed out such that multiple
                // copies of the feature are visible, the popup appears
                // over the copy being pointed to.
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }
                // Populate the popup and set its coordinates
                // based on the feature found.
                popup.current.setLngLat(coordinates).setHTML(content).addTo(mapHook.map.map);
            }
        }, mapHook.componentId);
    }, [mapHook.map]);
    return React__default.createElement(React__default.Fragment, null);
};
LayerHoverPopup.defaultProps = {
    mapId: undefined,
};

/**
 * MlGpxViewer visualizes a given GPX Track on the map
 */
var MlGpxViewer = function (props) {
    var parsedGpx = useGpx({ data: props.gpxData });
    var mapHook = useMap({ mapId: props.mapId, waitForLayer: props.insertBeforeLayer });
    var sourceName = useRef('gpx-viewer-source-' + v4());
    var layerNameLines = useRef('importer-layer-lines-' + v4());
    var layerNamePoints = useRef('importer-layer-points-' + v4());
    LayerHoverPopup({
        layerId: layerNamePoints.current,
        getPopupContent: function (feature) { var _a; return (_a = feature === null || feature === void 0 ? void 0 : feature.properties) === null || _a === void 0 ? void 0 : _a.name; },
    });
    useSource({
        mapId: props.mapId,
        sourceId: sourceName.current,
        source: {
            type: 'geojson',
            data: (parsedGpx.geojson || featureCollection([])),
        },
    });
    useLayer({
        layerId: layerNameLines.current,
        options: {
            type: 'line',
            paint: {
                'line-width': 4,
                'line-color': 'rgba(212, 55, 23,0.5)',
            },
            source: sourceName.current,
        },
        insertBeforeLayer: props.insertBeforeLayer,
    });
    useLayer({
        layerId: layerNamePoints.current,
        options: {
            type: 'circle',
            paint: {
                'circle-color': 'rgba(72, 77, 99,0.5)',
                'circle-radius': 7,
            },
            filter: ['==', '$type', 'Point'],
            source: sourceName.current,
        },
        insertBeforeLayer: props.insertBeforeLayer,
    });
    useEffect(function () {
        if (!mapHook.map || !parsedGpx.geojson)
            return;
        if (typeof props.onParseGpxData === 'function') {
            props.onParseGpxData(parsedGpx);
        }
        // fit map view to GeoJSON bbox
        var bounds = bbox(parsedGpx.geojson);
        mapHook.map.map.fitBounds(bounds);
    }, [parsedGpx]);
    return React__default.createElement(React__default.Fragment, null);
};
MlGpxViewer.defaultProps = {};

var GeoJsonContext = React__default.createContext({});
var GeoJsonContextProvider = GeoJsonContext.Provider;

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

var getCurrentUrlParameters = function () {
    var currentParams = Object.fromEntries(new URLSearchParams(window.location.search));
    currentParams.layers = JSON.parse((currentParams === null || currentParams === void 0 ? void 0 : currentParams.layers) ? currentParams.layers : '[]');
    return currentParams;
};
var initialUrlParams = getCurrentUrlParameters();
var MlShareMapState = function (props) {
    // Use a useRef hook to reference the layer object to be able to access it later inside useEffect hooks
    var mapContext = useContext(MapContext);
    var initializedRef = useRef(false);
    var mapRef = useRef(null);
    var _a = useState(undefined), map = _a[0], setMap = _a[1];
    var layersFromUrlParamsRef = useRef({});
    var componentId = useRef((props.idPrefix ? props.idPrefix : 'MlShareMapState-') + v4());
    var mapState = useMapState({
        watch: {
            viewport: false,
            layers: true,
            sources: false,
        },
        filter: {
            includeBaseLayers: false,
        },
    });
    var allStatesRestoredRef = useRef(false);
    var layerStatesRestored = useRef(null);
    var restoredStatesRef = useRef({
        viewport: {
            center: false,
            bearing: false,
            pitch: false,
            zoom: false,
        },
        layers: __assign({}, layersFromUrlParamsRef),
    });
    // initial URL-Params
    var mapStateRef = useRef({});
    var refreshUrlParameters = useCallback(function () {
        var _a, _b, _c;
        if (!props.active)
            return;
        var mapLayers = [];
        for (var x in mapState.layers) {
            mapLayers.push({
                id: (_a = mapState.layers[x]) === null || _a === void 0 ? void 0 : _a.id,
                type: (_b = mapState.layers[x]) === null || _b === void 0 ? void 0 : _b.type,
                visible: (_c = mapState.layers[x]) === null || _c === void 0 ? void 0 : _c.visible,
            });
        }
        refreshMapState();
        var urlParams = new URLSearchParams(__assign(__assign(__assign({}, getCurrentUrlParameters()), mapStateRef.current), { layers: JSON.stringify(mapLayers) }));
        JSON.parse(Object.fromEntries(urlParams).layers).forEach(function (el) {
            // is iD a number?
            layersFromUrlParamsRef.current[el.id] = false;
        });
        var currentParams = new URLSearchParams(window.location.search);
        if (urlParams.toString() !== currentParams.toString()) {
            window.history.pushState(__assign({}, mapStateRef.current), document.title, '?' + urlParams.toString());
        }
    }, [mapState.layers, props.active]);
    useEffect(function () {
        var _componentId = componentId.current;
        mapStateRef.current = getCurrentUrlParameters();
        return function () {
            // This is the cleanup function, it is called when this react component is removed from react-dom
            // try to remove anything this component has added to the MapLibre-gl instance
            // e.g.: remove the layer
            // mapContext.getMap(props.mapId).removeLayer(layerRef.current);
            // check for the existence of map.style before calling getLayer or getSource
            if (mapRef.current) {
                mapRef.current.cleanup(_componentId);
                mapRef.current = null;
            }
            initializedRef.current = false;
        };
    }, []);
    useEffect(function () {
        if (!mapRef.current)
            return;
        refreshUrlParameters();
    }, [refreshUrlParameters]);
    useEffect(function () {
        if (!mapRef.current)
            return;
        var _refreshUrlParameters = refreshUrlParameters;
        mapRef.current.on('moveend', _refreshUrlParameters, componentId.current);
        return function () {
            var _a;
            (_a = mapRef.current) === null || _a === void 0 ? void 0 : _a.map.off('moveend', _refreshUrlParameters);
        };
    }, [refreshUrlParameters, map]);
    useEffect(function () {
        var _a;
        if (!((_a = mapContext === null || mapContext === void 0 ? void 0 : mapContext.mapExists) === null || _a === void 0 ? void 0 : _a.call(mapContext, props.mapId)) || initializedRef.current)
            return;
        // the MapLibre-gl instance (mapContext.getMap(props.mapId)) is accessible here
        // initialize the layer and add it to the MapLibre-gl instance or do something else with it
        initializedRef.current = true;
        mapRef.current = mapContext.getMap(props.mapId);
        setMap(mapRef.current);
        if (mapStateRef.current.lat && mapStateRef.current.lng) {
            restoreViewportState();
        }
    }, [mapContext.mapIds, mapContext, props.mapId, props.active]);
    useEffect(function () {
        var _a, _b;
        if (!((_a = mapState === null || mapState === void 0 ? void 0 : mapState.layers) === null || _a === void 0 ? void 0 : _a.length))
            return;
        if (typeof layerStatesRestored.current === 'undefined') {
            layerStatesRestored.current = null;
            (_b = initialUrlParams === null || initialUrlParams === void 0 ? void 0 : initialUrlParams.layers) === null || _b === void 0 ? void 0 : _b.forEach(function (layer) {
                var _a;
                if ((_a = layerStatesRestored.current) === null || _a === void 0 ? void 0 : _a[layer.id]) {
                    layerStatesRestored.current[layer.id] = false;
                }
            });
        }
        for (var key in layerStatesRestored.current) {
            var _allDone = true;
            if (layerStatesRestored.current[key] === false) {
                _allDone = false;
            }
            if (_allDone) {
                return;
            }
        }
        if (initialUrlParams.layers) {
            initialUrlParams.layers.forEach(function (layer) {
                var _a, _b, _c, _d;
                if (((_a = mapRef.current) === null || _a === void 0 ? void 0 : _a.map.getLayer(layer.id)) && //number oder str?
                    ((_b = layerStatesRestored.current) === null || _b === void 0 ? void 0 : _b[layer.id]) === false) {
                    layerStatesRestored.current[layer.id] = true;
                    (_d = (_c = mapRef.current.map) === null || _c === void 0 ? void 0 : _c.getLayer(layer.id)) === null || _d === void 0 ? void 0 : _d.setLayoutProperty('visibility', layer.visible ? 'visible' : 'none');
                }
            });
        }
    }, [mapState.layers, props.mapId, props.active]);
    useEffect(function () {
        if (!map)
            return;
        if (!mapState.layers)
            return;
        if (!props.active) {
            map.cleanup(componentId.current);
        }
    }, [props.active, map, mapState.layers]);
    //ist .current?.map. richtig?
    var refreshMapState = function () {
        var _a, _b, _c, _d, _e;
        mapStateRef.current.lat = (_a = mapRef.current) === null || _a === void 0 ? void 0 : _a.map.getCenter().lat;
        mapStateRef.current.lng = (_b = mapRef.current) === null || _b === void 0 ? void 0 : _b.map.getCenter().lng;
        mapStateRef.current.zoom = (_c = mapRef.current) === null || _c === void 0 ? void 0 : _c.map.getZoom();
        mapStateRef.current.bearing = (_d = mapRef.current) === null || _d === void 0 ? void 0 : _d.map.getBearing();
        mapStateRef.current.pitch = (_e = mapRef.current) === null || _e === void 0 ? void 0 : _e.map.getPitch();
    };
    var restoreViewportState = function () {
        var _a, _b, _c, _d;
        if (!restoredStatesRef.current.viewport.center) {
            restoredStatesRef.current.viewport.center = true;
            if (mapStateRef.current.lng && mapStateRef.current.lat) {
                (_a = mapRef.current) === null || _a === void 0 ? void 0 : _a.map.setCenter([mapStateRef.current.lng, mapStateRef.current.lat]);
            }
            if (mapStateRef.current.zoom) {
                (_b = mapRef.current) === null || _b === void 0 ? void 0 : _b.map.setZoom(mapStateRef.current.zoom);
            }
            if (mapStateRef.current.bearing) {
                (_c = mapRef.current) === null || _c === void 0 ? void 0 : _c.map.setBearing(mapStateRef.current.bearing);
            }
            if (mapStateRef.current.pitch) {
                (_d = mapRef.current) === null || _d === void 0 ? void 0 : _d.map.setPitch(mapStateRef.current.pitch);
            }
        }
        allStatesRestoredRef.current = true;
    };
    window.onpopstate = function (event) {
        var _a;
        if (event.state && event.state.lng && event.state.lat && event.state.zoom) {
            (_a = mapRef.current) === null || _a === void 0 ? void 0 : _a.map.easeTo({
                // so möglich?
                zoom: event.state.zoom,
                center: [event.state.lng, event.state.lat],
            });
        }
    };
    return React__default.createElement(React__default.Fragment, null);
};
MlShareMapState.defaultProps = {
    mapId: undefined,
};

function getElevationData(_geojsonInfo, elevationFactor) {
    var createStep = function (x, y, z, x2, y2) {
        //const summand = 0.0002;
        var line = lineString([
            [x, y],
            [x2, y2],
        ]);
        var offsetLine = lineOffset(line, 5, { units: 'meters' });
        var x3 = offsetLine.geometry.coordinates[0][0];
        var y3 = offsetLine.geometry.coordinates[0][1];
        var x4 = offsetLine.geometry.coordinates[1][0];
        var y4 = offsetLine.geometry.coordinates[1][1];
        return polygon([
            [
                [x, y],
                [x2, y2],
                [x4, y4],
                [x3, y3],
                [x, y],
            ],
        ], { height: z * elevationFactor });
    };
    var lerp = function (x, y, a) { return x * (1 - a) + y * a; };
    var points = [];
    _geojsonInfo.line.geometry.coordinates.forEach(function (coordinate, index) {
        //const point = createPoint(coordinate[0],coordinate[1],coordinate[2]-min);
        //points.push(point);
        if (_geojsonInfo.line.geometry.coordinates[index + 1] && Array.isArray(coordinate)) {
            var wayLength = distance([coordinate[0], coordinate[1]], [
                _geojsonInfo.line.geometry.coordinates[index + 1][0],
                _geojsonInfo.line.geometry.coordinates[index + 1][1],
            ], { units: 'kilometers' });
            var listLength = ~~((wayLength * 1000) / 10);
            listLength = listLength < 1 ? 1 : listLength;
            for (var i = 0; i < listLength; i++) {
                var x = lerp(_geojsonInfo.line.geometry.coordinates[index][0], _geojsonInfo.line.geometry.coordinates[index + 1][0], i / listLength);
                var y = lerp(_geojsonInfo.line.geometry.coordinates[index][1], _geojsonInfo.line.geometry.coordinates[index + 1][1], i / listLength);
                var z = lerp(_geojsonInfo.line.geometry.coordinates[index][2] - _geojsonInfo.min, _geojsonInfo.line.geometry.coordinates[index + 1][2] - _geojsonInfo.min, i / listLength);
                var x2 = lerp(_geojsonInfo.line.geometry.coordinates[index][0], _geojsonInfo.line.geometry.coordinates[index + 1][0], (i + 1) / listLength);
                var y2 = lerp(_geojsonInfo.line.geometry.coordinates[index][1], _geojsonInfo.line.geometry.coordinates[index + 1][1], (i + 1) / listLength);
                var point = createStep(x, y, z, x2, y2);
                points.push(point);
            }
        }
    });
    var output = featureCollection$1(points);
    return output;
}

var defaultFillExtrusionColor = [
    'interpolate',
    ['linear'],
    ['get', 'height'],
    0,
    'rgba(0, 0, 255, 0)',
    0.1,
    'royalblue',
    0.3,
    'cyan',
    0.5,
    'lime',
    0.7,
    'yellow',
    1,
    'yellow',
];
var MlSpatialElevationProfile = function (props) {
    var sourceName = useRef('elevationprofile-' + v4());
    var layerName = useRef('elevationprofile-layer-' + v4());
    var elevationFactor = props.elevationFactor || MlSpatialElevationProfile.defaultProps.elevationFactor;
    var _geojsonInfo = useMemo(function () {
        var _a, _b;
        if (!((_a = props === null || props === void 0 ? void 0 : props.geojson) === null || _a === void 0 ? void 0 : _a.features))
            return;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        var line = (_b = props.geojson.features) === null || _b === void 0 ? void 0 : _b.find(function (element) {
            return element.geometry.type === 'LineString';
        });
        if (!line || !line.geometry)
            return;
        var heights = line.geometry.coordinates.map(function (coordinate) {
            return coordinate[2];
        });
        var min = Math.min.apply(Math, heights);
        var max = Math.max.apply(Math, heights) - min;
        max = max === 0 ? 1 : max;
        return { max: max, min: min, line: line };
    }, [props.geojson]);
    var _fillExtrusionColor = useMemo(function () {
        if (!_geojsonInfo)
            return defaultFillExtrusionColor;
        return [
            'interpolate',
            ['linear'],
            ['get', 'height'],
            0,
            'rgb(0,255,55)',
            _geojsonInfo.max * elevationFactor,
            'rgb(255,0,0)',
        ];
    }, [_geojsonInfo, props.elevationFactor]);
    var _geojson = useMemo(function () {
        var _a;
        if (!((_a = props.geojson) === null || _a === void 0 ? void 0 : _a.features) || !_geojsonInfo)
            return;
        var newData = getElevationData(_geojsonInfo, elevationFactor);
        return newData;
    }, [_geojsonInfo, elevationFactor]);
    useSource({
        mapId: props.mapId,
        sourceId: sourceName.current,
        source: {
            type: 'geojson',
            data: (_geojson || featureCollection$1([])),
        },
    });
    useLayer({
        layerId: layerName.current,
        options: {
            source: sourceName.current,
            type: 'fill-extrusion',
            paint: {
                'fill-extrusion-height': ['get', 'height'],
                'fill-extrusion-opacity': 0.9,
                'fill-extrusion-color': (_fillExtrusionColor ||
                    defaultFillExtrusionColor),
            },
        },
        insertBeforeLayer: props.insertBeforeLayer,
    });
    return React__default.createElement(React__default.Fragment, null);
};
MlSpatialElevationProfile.defaultProps = {
    elevationFactor: 1,
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
    var layerId = useRef(props.layerId || 'MlVectorTileLayer-' + mapHook.componentId);
    var layerPaintConfsRef = useRef({});
    var layerLayoutConfsRef = useRef({});
    var initializedRef = useRef(false);
    var createLayers = useCallback(function () {
        if (!mapHook.map)
            return;
        initializedRef.current = true;
        if (mapHook.map.map.getSource(layerId.current)) {
            mapHook.cleanup();
        }
        // Add the new layer to the maplibre instance once it is available
        if (!mapHook.map.map.getSource(layerId.current)) {
            mapHook.map.addSource(layerId.current, __assign({ type: 'vector', tiles: [props.url || ''], attribution: '', minzoom: 0, maxzoom: 14 }, props.sourceOptions), mapHook.componentId);
        }
        props.layers.forEach(function (layer) {
            if (!mapHook.map)
                return;
            mapHook.map.addLayer(__assign({ source: layerId.current, minzoom: 0, maxzoom: 22, layout: {}, paint: {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    'line-opacity': 0.5,
                    'line-color': 'rgb(80, 80, 80)',
                    'line-width': 2,
                } }, layer), props.insertBeforeLayer, mapHook.componentId);
            layerPaintConfsRef.current[layer.id] = JSON.stringify(layer.paint);
            layerLayoutConfsRef.current[layer.id] = JSON.stringify(layer.layout);
            // recreate layer if style has changed
            mapHook.map.on('styledata', function () {
                var _a;
                if (initializedRef.current && !((_a = mapHook.map) === null || _a === void 0 ? void 0 : _a.map.getSource(layerId.current))) {
                    console.log('Recreate Layer ' + layerId.current);
                    createLayers();
                }
            }, mapHook.componentId);
        });
    }, [mapHook.map, props]);
    var updateLayers = useCallback(function () {
        if (!initializedRef.current)
            return;
        props.layers.forEach(function (layer) {
            if (!mapHook.map)
                return;
            if (mapHook.map.map.getLayer(layer.id)) {
                // update changed paint property
                var layerPaintConfString = JSON.stringify(layer.paint);
                if (layerPaintConfString !== layerPaintConfsRef.current[layer.id]) {
                    for (var paintKey in layer.paint) {
                        mapHook.map.setPaintProperty(layer.id, paintKey, layer.paint[paintKey]);
                    }
                }
                layerPaintConfsRef.current[layer.id] = layerPaintConfString;
                // update changed layout property
                var layerLayoutConfString = JSON.stringify(layer.layout);
                if (layerLayoutConfString !== layerLayoutConfsRef.current[layer.id]) {
                    for (var layoutKey in layer.layout) {
                        mapHook.map.setLayoutProperty(layer.id, layoutKey, layer.layout[layoutKey]);
                    }
                }
                layerLayoutConfsRef.current[layer.id] = layerLayoutConfString;
            }
        });
    }, [mapHook.map, props.layers]);
    // initial layer creation
    useEffect(function () {
        if (initializedRef.current)
            return;
        createLayers();
    }, [createLayers]);
    // if layers get removed or added
    useEffect(function () {
        if (!mapHook.map || !initializedRef.current)
            return;
        createLayers();
    }, [props.layers.length, mapHook.map]);
    // on layout/paint update
    useEffect(function () {
        if (!mapHook.map || !initializedRef.current)
            return;
        updateLayers();
    }, [props.layers, mapHook.map]);
    return React__default.createElement(React__default.Fragment, null);
};

var MlOgcApiFeatures = function (props) {
    var _a;
    var _b = useState(), geojson = _b[0], setGeojson = _b[1];
    var mapHook = useMap({ mapId: props.mapId });
    var layerId = useRef(((_a = props.mlGeoJsonLayerProps) === null || _a === void 0 ? void 0 : _a.layerId) || 'MlOgcApiFeature-' + mapHook.componentId);
    var buildOgcApiUrl = function () {
        var _a, _b;
        var url = new URL(props.ogcApiUrl);
        if (props.ogcApiFeatureParams) {
            Object.entries(props.ogcApiFeatureParams).forEach(function (_a) {
                var key = _a[0], value = _a[1];
                if (value !== undefined && value !== null) {
                    url.searchParams.append(key, value.toString());
                }
            });
        }
        if (props.reloadFeaturesOnMapMove) {
            var southWest = (_a = mapHook === null || mapHook === void 0 ? void 0 : mapHook.map) === null || _a === void 0 ? void 0 : _a.getBounds().getSouthWest();
            var northEast = (_b = mapHook === null || mapHook === void 0 ? void 0 : mapHook.map) === null || _b === void 0 ? void 0 : _b.getBounds().getNorthEast();
            var bbox = "".concat(southWest === null || southWest === void 0 ? void 0 : southWest.lng, ",").concat(southWest === null || southWest === void 0 ? void 0 : southWest.lat, ",").concat(northEast === null || northEast === void 0 ? void 0 : northEast.lng, ",").concat(northEast === null || northEast === void 0 ? void 0 : northEast.lat);
            url.searchParams.append('bbox', bbox);
        }
        return url.toString();
    };
    useEffect(function () {
        if (!mapHook.map)
            return;
        var getDataHandler = function () {
            var generatedOgcApiUrl = buildOgcApiUrl();
            fetch(generatedOgcApiUrl)
                .then(function (res) {
                if (!res.ok)
                    throw new Error('Error fetching OGC features');
                return res.json();
            })
                .then(function (data) {
                setGeojson(data);
            })
                .catch(function (error) {
                console.log(error);
                setGeojson(undefined);
            });
        };
        getDataHandler();
        if (props.reloadFeaturesOnMapMove) {
            mapHook.map.on('moveend', getDataHandler);
        }
        return function () {
            var _a;
            if ((_a = mapHook === null || mapHook === void 0 ? void 0 : mapHook.map) === null || _a === void 0 ? void 0 : _a.off) {
                mapHook.map.off('moveend', getDataHandler);
            }
        };
    }, [mapHook.map, props.ogcApiFeatureParams, props.ogcApiUrl]);
    useEffect(function () {
        // if layer is not yet on map return
        if (!mapHook.map || !mapHook.map.map.style.getLayer(layerId.current))
            return;
        // if layer is already on map: toggle layer visibility by changing the layout object's visibility property
        if (props.visible) {
            mapHook.map.map.setLayoutProperty(layerId.current, 'visibility', 'visible');
        }
        else {
            mapHook.map.map.setLayoutProperty(layerId.current, 'visibility', 'none');
        }
    }, [props.visible, mapHook.map]);
    return (React__default.createElement(React__default.Fragment, null, geojson && (React__default.createElement(MlGeoJsonLayer, __assign({ geojson: geojson, layerId: layerId.current }, props.mlGeoJsonLayerProps)))));
};

/**
 * TODO: Add short & useful description
 *
 * @param {object} props
 * @param {string} props.mapId Id of the target MapLibre instance in mapContext
 *
 * @component
 */
var MlWmsFeatureInfoPopup = function (props) {
    // Use a useRef hook to reference the layer object to be able to access it later inside useEffect hooks
    var mapContext = useContext(MapContext);
    var initializedRef = useRef(false);
    var mapRef = useRef(undefined);
    var componentId = useRef(("MlWmsFeatureInfoPopup-") + v4());
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
            initializedRef.current = false;
        };
    }, []);
    useEffect(function () {
        if (!mapContext.mapExists(props.mapId) || initializedRef.current)
            return;
        // the MapLibre-gl instance (mapContext.getMap(props.mapId)) is accessible here
        // initialize the layer and add it to the MapLibre-gl instance or do something else with it
        initializedRef.current = true;
        mapRef.current = mapContext.getMap(props.mapId);
        mapRef.current.setCenter([7.132122000552613, 50.716405378037706]);
    }, [mapContext.mapIds, mapContext, props.mapId]);
    return React__default.createElement(React__default.Fragment, null);
};
MlWmsFeatureInfoPopup.defaultProps = {
    mapId: undefined,
};

var defaultProps = {
    visible: true,
    urlParameters: {
        bbox: '{bbox-epsg-3857}',
        format: 'image/png',
        service: 'WMS',
        version: '1.1.1',
        request: 'GetMap',
        srs: 'EPSG:3857',
        width: 256,
        height: 256,
        styles: '',
    },
    attribution: '',
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
 * @param {bool}	 props.visible Sets layer "visibility" property to "visible" if true or "none" if false
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
    var layerId = useRef(props.layerId || 'MlWmsLayer-' + mapHook.componentId);
    var tileUrl = useMemo(function () {
        var _propsUrlParams;
        var _wmsUrl = props.url;
        if (props.url.indexOf('?') !== -1) {
            _propsUrlParams = props.url.split('?');
            _wmsUrl = _propsUrlParams[0];
        }
        var _urlParamsFromUrl = new URLSearchParams(_propsUrlParams === null || _propsUrlParams === void 0 ? void 0 : _propsUrlParams[1]);
        // first spread in default props manually to enable overriding a single parameter without replacing the whole default urlParameters object
        var urlParamsObj = __assign(__assign(__assign({}, defaultProps.urlParameters), Object.fromEntries(_urlParamsFromUrl)), props.urlParameters);
        var urlParams = new URLSearchParams(urlParamsObj);
        var urlParamsStr = decodeURIComponent(urlParams.toString()) + ''.replace(/%2F/g, '/').replace(/%3A/g, ':');
        return _wmsUrl + '?' + urlParamsStr;
    }, [props.urlParameters, props.url]);
    var createLayer = useCallback(function () {
        if (!mapHook.map)
            return;
        initializedRef.current = true;
        if (mapHook.map.map.getLayer(layerId.current)) {
            mapHook.cleanup();
        }
        mapHook.map.addSource(layerId.current, __assign({ type: 'raster', tiles: [tileUrl], tileSize: 256, attribution: props.attribution }, props.sourceOptions), mapHook.componentId);
        mapHook.map.addLayer(__assign({ id: layerId.current, type: 'raster', source: layerId.current }, props.layerOptions), props.insertBeforeLayer, mapHook.componentId);
        // recreate layer if map style.json has changed
        mapHook.map.on('styledata', function () {
            var _a;
            if (initializedRef.current && !((_a = mapHook.map) === null || _a === void 0 ? void 0 : _a.map.getLayer(layerId.current))) {
                console.log('Recreate Layer ' + layerId.current);
                createLayer();
            }
        }, mapHook.componentId);
        if (!props.visible) {
            mapHook.map.map.setLayoutProperty(layerId.current, 'visibility', 'none');
        }
    }, [mapHook.map, props, tileUrl]);
    useEffect(function () {
        if (initializedRef.current)
            return;
        createLayer();
    }, [createLayer]);
    useEffect(function () {
        var _a, _b, _c, _d;
        if (!mapHook.map || !((_d = (_c = (_b = (_a = mapHook.map) === null || _a === void 0 ? void 0 : _a.map) === null || _b === void 0 ? void 0 : _b.style) === null || _c === void 0 ? void 0 : _c.sourceCaches) === null || _d === void 0 ? void 0 : _d[layerId.current]) || !initializedRef.current)
            return;
        var source = mapHook.map.map.getSource(layerId.current);
        source.tiles = [tileUrl];
        mapHook.map.map.style.sourceCaches[layerId.current].clearTiles();
        mapHook.map.map.style.sourceCaches[layerId.current].update(mapHook.map.map.transform);
        mapHook.map.map.triggerRepaint();
    }, [mapHook.map, tileUrl]);
    useEffect(function () {
        if (!mapHook.map || !initializedRef.current)
            return;
        // toggle layer visibility by changing the layout object's visibility property
        if (props.visible) {
            mapHook.map.map.setLayoutProperty(layerId.current, 'visibility', 'visible');
        }
        else {
            mapHook.map.map.setLayoutProperty(layerId.current, 'visibility', 'none');
        }
    }, [props.visible, mapHook.map]);
    return React__default.createElement(React__default.Fragment, null);
};
MlWmsLayer.defaultProps = __assign({}, defaultProps);

function useWms(props) {
    // Use a useRef hook to reference the layer object to be able to access it later inside useEffect hooks
    var _a = useState(), getFeatureInfoUrl = _a[0], setGetFeatureInfoUrl = _a[1];
    var _b = useState(props.url), url = _b[0], setUrl = _b[1];
    var _c = useState(""), wmsUrl = _c[0], setWmsUrl = _c[1];
    var _d = useState(), capabilities = _d[0], setCapabilities = _d[1];
    var _e = useState(), error = _e[0], setError = _e[1];
    var clearState = function () {
        setGetFeatureInfoUrl(undefined);
        setCapabilities(undefined);
        //setLayers([]);
        setWmsUrl("");
    };
    useEffect(function () {
        // extract URL parameters from the given URL
        clearState();
        setError(undefined);
        if (!url)
            return;
        var _propsUrlParams;
        var _wmsUrl = url;
        if (url.indexOf("?") !== -1) {
            _propsUrlParams = url.split("?");
            _wmsUrl = _propsUrlParams[0];
        }
        var _urlParamsFromUrl = new URLSearchParams(_propsUrlParams === null || _propsUrlParams === void 0 ? void 0 : _propsUrlParams[1]);
        var urlParamsObj = __assign(__assign({}, Object.fromEntries(_urlParamsFromUrl)), props.urlParameters);
        // create URLSearchParams object to assemble the URL Parameters
        var urlParams = new URLSearchParams(urlParamsObj);
        var urlParamsStr = decodeURIComponent(urlParams.toString()) + "".replace(/%2F/g, "/").replace(/%3A/g, ":");
        fetch(_wmsUrl + "?" + urlParamsStr)
            .then(function (res) {
            if (!res.ok) {
                throw Error(res.statusText + " (" + res.status + " - " + res.type + ")");
            }
            else {
                return res.text();
            }
        })
            .then(function (data) {
            setCapabilities(new WMSCapabilities(data, window.DOMParser).toJSON());
        })
            .catch(function (error) {
            //reset local state
            clearState();
            console.log(error);
            setError(error.message);
        });
    }, [url, props.urlParameters]);
    useEffect(function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        if (!(capabilities === null || capabilities === void 0 ? void 0 : capabilities.Service))
            return;
        setWmsUrl((_g = (_f = (_e = (_d = (_c = (_b = (_a = capabilities.Capability) === null || _a === void 0 ? void 0 : _a.Request) === null || _b === void 0 ? void 0 : _b.GetMap) === null || _c === void 0 ? void 0 : _c.DCPType) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.HTTP) === null || _f === void 0 ? void 0 : _f.Get) === null || _g === void 0 ? void 0 : _g.OnlineResource);
        // set getFeatureInfo url
        setGetFeatureInfoUrl((_p = (_o = (_m = (_l = (_k = (_j = (_h = capabilities.Capability) === null || _h === void 0 ? void 0 : _h.Request) === null || _j === void 0 ? void 0 : _j.GetFeatureInfo) === null || _k === void 0 ? void 0 : _k.DCPType) === null || _l === void 0 ? void 0 : _l[0]) === null || _m === void 0 ? void 0 : _m.HTTP) === null || _o === void 0 ? void 0 : _o.Get) === null || _p === void 0 ? void 0 : _p.OnlineResource);
    }, [capabilities]);
    return {
        capabilities: capabilities,
        getFeatureInfoUrl: getFeatureInfoUrl,
        wmsUrl: wmsUrl,
        error: error,
        setUrl: setUrl,
    };
}
useWms.defaultProps = {
    url: "",
    urlParameters: {
        SERVICE: "WMS",
        VERSION: "1.3.0",
        REQUEST: "GetCapabilities",
    },
};

var originShift = (2 * Math.PI * 6378137) / 2.0;
var lngLatToMeters = function (lnglat, accuracy) {
    if (accuracy === void 0) { accuracy = { enable: true, decimal: 1 }; }
    var lng = lnglat.lng;
    var lat = lnglat.lat;
    var x = (lng * originShift) / 180.0;
    var y = Math.log(Math.tan(((90 + lat) * Math.PI) / 360.0)) / (Math.PI / 180.0);
    y = (y * originShift) / 180.0;
    if (accuracy.enable) {
        x = Number(x.toFixed(accuracy.decimal));
        y = Number(y.toFixed(accuracy.decimal));
    }
    return [x, y];
};
/**
 * Loads a WMS getCapabilities xml document and adds a MlWmsLayer component for each layer that is
 * offered by the WMS.
 *
 * @component
 */
var MlWmsLoader = function (props) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    var _l = useWms({
        urlParameters: props.urlParameters,
    }), _capabilities = _l.capabilities, error = _l.error, setUrl = _l.setUrl, _getFeatureInfoUrl = _l.getFeatureInfoUrl, _wmsUrl = _l.wmsUrl;
    var _m = useState(((_a = props === null || props === void 0 ? void 0 : props.config) === null || _a === void 0 ? void 0 : _a.open) || false), open = _m[0], setOpen = _m[1];
    var _o = useState(((_b = props === null || props === void 0 ? void 0 : props.config) === null || _b === void 0 ? void 0 : _b.visible) || true), visible = _o[0], setVisible = _o[1];
    var _p = useState(false), showDeletionConfirmationDialog = _p[0], setShowDeletionConfirmationDialog = _p[1];
    var mapHook = useMap({ mapId: props === null || props === void 0 ? void 0 : props.mapId });
    var _q = useState(((_c = props === null || props === void 0 ? void 0 : props.config) === null || _c === void 0 ? void 0 : _c.layers) || []), _layers = _q[0], _setLayers = _q[1];
    var _r = useState(false), featureInfoEventsEnabled = _r[0], setFeatureInfoEventsEnabled = _r[1];
    var _s = useState(), featureInfoLngLat = _s[0], setFeatureInfoLngLat = _s[1];
    var _t = useState(undefined), featureInfoContent = _t[0], setFeatureInfoContent = _t[1];
    useEffect(function () {
        if (props.config)
            return;
        setUrl(props.url);
    }, [props.url]);
    var wmsUrl = useMemo(function () {
        var _a;
        return ((_a = props === null || props === void 0 ? void 0 : props.config) === null || _a === void 0 ? void 0 : _a.wmsUrl) || _wmsUrl;
    }, [(_d = props === null || props === void 0 ? void 0 : props.config) === null || _d === void 0 ? void 0 : _d.wmsUrl, _wmsUrl]);
    var getFeatureInfoUrl = useMemo(function () {
        var _a;
        return ((_a = props === null || props === void 0 ? void 0 : props.config) === null || _a === void 0 ? void 0 : _a.getFeatureInfoUrl) || _getFeatureInfoUrl;
    }, [(_e = props === null || props === void 0 ? void 0 : props.config) === null || _e === void 0 ? void 0 : _e.getFeatureInfoUrl, _getFeatureInfoUrl]);
    var capabilities = useMemo(function () {
        return _capabilities;
    }, [_capabilities]);
    var name = useMemo(function () {
        var _a, _b;
        return (props === null || props === void 0 ? void 0 : props.name) || ((_a = props === null || props === void 0 ? void 0 : props.config) === null || _a === void 0 ? void 0 : _a.name) || ((_b = capabilities === null || capabilities === void 0 ? void 0 : capabilities.Service) === null || _b === void 0 ? void 0 : _b.Title);
    }, [props === null || props === void 0 ? void 0 : props.name, (_f = props === null || props === void 0 ? void 0 : props.config) === null || _f === void 0 ? void 0 : _f.name, (_g = capabilities === null || capabilities === void 0 ? void 0 : capabilities.Service) === null || _g === void 0 ? void 0 : _g.Title]);
    var layers = useMemo(function () {
        var _a;
        if (!(props === null || props === void 0 ? void 0 : props.setLayers))
            return _layers;
        return ((_a = props === null || props === void 0 ? void 0 : props.config) === null || _a === void 0 ? void 0 : _a.layers) || _layers;
    }, [(_h = props === null || props === void 0 ? void 0 : props.config) === null || _h === void 0 ? void 0 : _h.layers, _layers]);
    var setLayers = useMemo(function () {
        return (props === null || props === void 0 ? void 0 : props.setLayers) || _setLayers;
    }, [props === null || props === void 0 ? void 0 : props.setLayers, _setLayers]);
    useEffect(function () {
        var _a;
        (_a = props === null || props === void 0 ? void 0 : props.onConfigChange) === null || _a === void 0 ? void 0 : _a.call(props, {
            layers: layers,
            //capabilities,
            getFeatureInfoUrl: getFeatureInfoUrl,
            wmsUrl: wmsUrl,
            visible: visible,
            open: open,
            name: name,
        });
    }, [layers, capabilities, getFeatureInfoUrl, wmsUrl, visible, open, name]);
    var attribution = useMemo(function () {
        return layers
            .filter(function (el) { var _a; return el.visible && ((_a = el === null || el === void 0 ? void 0 : el.Attribution) === null || _a === void 0 ? void 0 : _a.Title); })
            .map(function (el) { var _a; return (_a = el === null || el === void 0 ? void 0 : el.Attribution) === null || _a === void 0 ? void 0 : _a.Title; })
            .filter(function (value, index, self) { return self.indexOf(value) === index; })
            .join(' ');
    }, [layers]);
    var resetFeatureInfo = function () {
        setFeatureInfoLngLat(undefined);
        setFeatureInfoContent(undefined);
    };
    var getFeatureInfo = useCallback(function (ev) {
        var _a, _b, _c;
        if (!mapHook.map)
            return;
        resetFeatureInfo();
        var unprojected = mapHook.map.unproject([ev.point.x, ev.point.y]);
        var point = turf.point([unprojected.lng, unprojected.lat]);
        var buffered = turf.buffer(point, 50, { units: 'meters' });
        var _bbox = buffered && turf.bbox(buffered);
        var _sw = _bbox && lngLatToMeters({ lng: _bbox[0], lat: _bbox[1] });
        var _ne = _bbox && lngLatToMeters({ lng: _bbox[2], lat: _bbox[3] });
        var bbox = _sw && _ne && [_sw[0], _sw[1], _ne[0], _ne[1]];
        var _getFeatureInfoUrlParams = {
            REQUEST: 'GetFeatureInfo',
            BBOX: bbox === null || bbox === void 0 ? void 0 : bbox.join(','),
            SERVICE: 'WMS',
            INFO_FORMAT: ((_b = (_a = capabilities === null || capabilities === void 0 ? void 0 : capabilities.Capability) === null || _a === void 0 ? void 0 : _a.Request) === null || _b === void 0 ? void 0 : _b.GetFeatureInfo.Format.indexOf('text/html')) !== -1
                ? 'text/html'
                : 'text/plain',
            FEATURE_COUNT: '10',
            LAYERS: layers
                .map(function (layer) { return (layer.visible && layer.queryable ? layer.Name : undefined); })
                .filter(function (n) { return n; }),
            QUERY_LAYERS: layers
                .map(function (layer) { return (layer.visible && layer.queryable ? layer.Name : undefined); })
                .filter(function (n) { return n; }),
            WIDTH: 100,
            HEIGHT: 100,
            srs: 'EPSG:3857',
            CRS: 'EPSG:3857',
            version: '1.3.0',
            X: 50,
            Y: 50,
            I: 50,
            J: 50,
            buffer: '50',
        };
        var _gfiUrl = getFeatureInfoUrl;
        var _gfiUrlParts;
        if (((_c = _gfiUrl === null || _gfiUrl === void 0 ? void 0 : _gfiUrl.indexOf) === null || _c === void 0 ? void 0 : _c.call(_gfiUrl, '?')) !== -1) {
            _gfiUrlParts = props.url.split('?');
            _gfiUrl = _gfiUrlParts[0];
        }
        var _urlParamsFromUrl = new URLSearchParams(_gfiUrlParts === null || _gfiUrlParts === void 0 ? void 0 : _gfiUrlParts[1]);
        var urlParamsObj = __assign(__assign({}, Object.fromEntries(_urlParamsFromUrl)), _getFeatureInfoUrlParams);
        // create URLSearchParams object to assemble the URL Parameters
        // "as any" can be removed once the URLSearchParams ts spec is fixed
        var urlParams = new URLSearchParams(urlParamsObj);
        fetch(props.url + '?' + urlParams.toString())
            .then(function (res) {
            if (!res.ok) {
                throw new Error('FeatureInfo could not be fetched');
            }
            return res.text();
        })
            .then(function (text) {
            setFeatureInfoLngLat(ev.lngLat);
            setFeatureInfoContent(text);
        })
            .catch(function (error) { return console.log(error); });
    }, [capabilities, getFeatureInfoUrl, props, mapHook, layers]);
    var _featureInfoEventsEnabled = useMemo(function () {
        return (((typeof (props === null || props === void 0 ? void 0 : props.featureInfoActive) !== 'undefined' && props.featureInfoActive) ||
            featureInfoEventsEnabled) &&
            (layers === null || layers === void 0 ? void 0 : layers.some(function (layer) { return layer.visible && layer.queryable; })) &&
            !!mapHook.map);
    }, [props === null || props === void 0 ? void 0 : props.featureInfoActive, featureInfoEventsEnabled, layers, mapHook.map]);
    useEffect(function () {
        if (!_featureInfoEventsEnabled) {
            resetFeatureInfo();
            return;
        }
        var _getFeatureInfo = getFeatureInfo;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore: ts appears not to consider overloads
        mapHook.map.map.on('click', _getFeatureInfo);
        return function () {
            var _a, _b, _c;
            (_c = (_a = mapHook.map) === null || _a === void 0 ? void 0 : (_b = _a.map).off) === null || _c === void 0 ? void 0 : _c.call(_b, 'click', _getFeatureInfo);
        };
    }, [_featureInfoEventsEnabled, getFeatureInfo, mapHook.map]);
    useEffect(function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        if (!(capabilities === null || capabilities === void 0 ? void 0 : capabilities.Service))
            return;
        if (((_d = (_c = (_b = (_a = capabilities === null || capabilities === void 0 ? void 0 : capabilities.Capability) === null || _a === void 0 ? void 0 : _a.Layer) === null || _b === void 0 ? void 0 : _b.CRS) === null || _c === void 0 ? void 0 : _c.indexOf) === null || _d === void 0 ? void 0 : _d.call(_c, 'EPSG:3857')) === -1 &&
            ((_h = (_g = (_f = (_e = capabilities === null || capabilities === void 0 ? void 0 : capabilities.Capability) === null || _e === void 0 ? void 0 : _e.Layer) === null || _f === void 0 ? void 0 : _f.CRS) === null || _g === void 0 ? void 0 : _g.indexOf) === null || _h === void 0 ? void 0 : _h.call(_g, 'CRS:84')) === -1) {
            console.log('MlWmsLoader (' + capabilities.Service.Title + '): No WGS 84/Pseudo-Mercator support');
        }
        else {
            console.log('MlWmsLoader (' + capabilities.Service.Title + '): WGS 84/Pseudo-Mercator supported');
            var _LatLonBoundingBox_1 = [];
            // collect queriable Layer2 layers
            var _layers_1 = (_k = (_j = capabilities === null || capabilities === void 0 ? void 0 : capabilities.Capability) === null || _j === void 0 ? void 0 : _j.Layer) === null || _k === void 0 ? void 0 : _k.Layer.filter(function (el) { var _a; return !((_a = el.Layer) === null || _a === void 0 ? void 0 : _a.length); }).map(function (layer, idx) {
                var _a, _b, _c;
                if (idx === 0) {
                    _LatLonBoundingBox_1 = layer.EX_GeographicBoundingBox;
                }
                return __assign({ visible: ((_c = (_b = (_a = capabilities === null || capabilities === void 0 ? void 0 : capabilities.Capability) === null || _a === void 0 ? void 0 : _a.Layer) === null || _b === void 0 ? void 0 : _b.Layer) === null || _c === void 0 ? void 0 : _c.length) > 2 ? idx > 1 : true, Attribution: { Title: '' } }, (function (_a) {
                    _a.CRS; var _layer = __rest(_a, ["CRS"]);
                    return _layer;
                })(layer));
            });
            // collect queriable Layer3 layers
            (_m = (_l = capabilities === null || capabilities === void 0 ? void 0 : capabilities.Capability) === null || _l === void 0 ? void 0 : _l.Layer) === null || _m === void 0 ? void 0 : _m.Layer.forEach(function (el) {
                var _a;
                var tmpLayers = (_a = el === null || el === void 0 ? void 0 : el.Layer) === null || _a === void 0 ? void 0 : _a.filter(function (el) { return el.CRS.length; }).map(function (layer, idx) {
                    if (idx === 0) {
                        _LatLonBoundingBox_1 = layer.EX_GeographicBoundingBox;
                    }
                    return __assign({ visible: false, Attribution: { Title: '' } }, (function (_a) {
                        _a.CRS; var _layer = __rest(_a, ["CRS"]);
                        return _layer;
                    })(layer));
                });
                if (tmpLayers) {
                    _layers_1 = __spreadArray(__spreadArray([], _layers_1, true), tmpLayers, true);
                }
            });
            setLayers(_layers_1);
            // zoom to extent of first layer
            if (props.zoomToExtent && (mapHook === null || mapHook === void 0 ? void 0 : mapHook.map) && _LatLonBoundingBox_1.length > 3) {
                mapHook === null || mapHook === void 0 ? void 0 : mapHook.map.fitBounds([
                    [_LatLonBoundingBox_1[0], _LatLonBoundingBox_1[1]],
                    [_LatLonBoundingBox_1[2], _LatLonBoundingBox_1[3]],
                ]);
            }
        }
    }, [capabilities, mapHook.map]);
    var listContent = (React__default.createElement(ListItem$1, { secondaryAction: React__default.createElement(React__default.Fragment, null,
            props.buttons,
            props.featureInfoEnabled && (React__default.createElement(IconButton$1, { sx: {
                    padding: '4px',
                    marginTop: '-3px',
                    marginRight: '4px',
                    background: function (theme) {
                        if (!(layers === null || layers === void 0 ? void 0 : layers.some(function (layer) { return layer.visible && layer.queryable; })))
                            return 'initial';
                        if (_featureInfoEventsEnabled)
                            return theme.palette.info.light;
                        return theme.palette.grey[300];
                    },
                }, "aria-label": "featureinfo", onClick: function () {
                    if (typeof (props === null || props === void 0 ? void 0 : props.setFeatureInfoActive) === 'function') {
                        props.setFeatureInfoActive(function (current) { return !current; });
                    }
                    else {
                        setFeatureInfoEventsEnabled(function (current) { return !current; });
                    }
                }, disabled: !(layers === null || layers === void 0 ? void 0 : layers.some(function (layer) { return layer.visible && layer.queryable; })) },
                React__default.createElement(InfoIcon, null))),
            React__default.createElement(IconButton$1, { edge: props.showDeleteButton ? false : 'end', sx: __assign({ padding: '4px', marginTop: '-3px' }, (props.showDeleteButton ? { marginRight: '4px' } : {})), "aria-label": "open", onClick: function () { return setOpen(function (current) { return !current; }); } }, open ? React__default.createElement(ExpandLessIcon, null) : React__default.createElement(ExpandMoreIcon, null)),
            props.showDeleteButton && (React__default.createElement(React__default.Fragment, null,
                React__default.createElement(IconButton$1, { "aria-label": "delete", edge: "end", onClick: function () {
                        if (typeof props.onConfigChange === 'function') {
                            setShowDeletionConfirmationDialog(true);
                        }
                    }, sx: { padding: '4px', marginTop: '-3px' } },
                    React__default.createElement(DeleteIcon, null)),
                showDeletionConfirmationDialog && (React__default.createElement(ConfirmDialog, { open: showDeletionConfirmationDialog, onConfirm: function () {
                        if (typeof props.onConfigChange === 'function') {
                            props.onConfigChange(false);
                        }
                    }, onCancel: function () {
                        setShowDeletionConfirmationDialog(false);
                    }, title: "Delete layer", text: "Are you sure you want to delete this layer?" }))))), sx: {
            paddingRight: 0,
            paddingLeft: 0,
            paddingTop: 0,
            paddingBottom: '4px',
        } },
        React__default.createElement(ListItemIcon, { sx: { minWidth: '30px' } },
            React__default.createElement(Checkbox, { sx: { padding: 0 }, checked: visible, onClick: function () {
                    setVisible(function (val) { return !val; });
                } })),
        React__default.createElement(ListItemText$1, { primary: name, variant: "layerlist" })));
    return (React__default.createElement(React__default.Fragment, null,
        error && (React__default.createElement(Snackbar, null,
            React__default.createElement(Box$1, null, error))),
        wmsUrl && (React__default.createElement(React__default.Fragment, null,
            props.layerId && props.sortable && (React__default.createElement(SortableContainer, { layerId: props.layerId }, listContent)),
            props.layerId && !props.sortable && (listContent),
            React__default.createElement(Box$1, { sx: { display: open ? 'block' : 'none' } },
                React__default.createElement(List$1, { dense: true, component: "div", disablePadding: true, sx: { paddingLeft: '18px' } }, wmsUrl &&
                    ((_j = layers === null || layers === void 0 ? void 0 : layers.map) === null || _j === void 0 ? void 0 : _j.call(layers, function (layer, idx) {
                        return (layer === null || layer === void 0 ? void 0 : layer.Name) ? (React__default.createElement(ListItem$1, { key: layer.Name + idx, secondaryAction: React__default.createElement(React__default.Fragment, null, (layer === null || layer === void 0 ? void 0 : layer.queryable) && React__default.createElement(InfoIcon, null)) },
                            React__default.createElement(ListItemIcon, { sx: { minWidth: '30px' } },
                                React__default.createElement(Checkbox, { checked: layer.visible, sx: { padding: 0 }, onClick: function () {
                                        var _layers = __spreadArray([], layers, true);
                                        _layers[idx].visible = !_layers[idx].visible;
                                        setLayers(__spreadArray([], _layers, true));
                                    } })),
                            React__default.createElement(ListItemText$1, { primary: layer === null || layer === void 0 ? void 0 : layer.Title, variant: "layerlist" }))) : (React__default.createElement(React__default.Fragment, null));
                    }))),
                wmsUrl && (layers === null || layers === void 0 ? void 0 : layers.length) && (React__default.createElement(MlWmsLayer, { key: mapHook.componentId, url: wmsUrl, attribution: attribution, visible: visible, urlParameters: __assign(__assign({}, props.wmsUrlParameters), { layers: (_k = layers === null || layers === void 0 ? void 0 : layers.filter) === null || _k === void 0 ? void 0 : _k.call(layers, function (layer) { return layer.visible; }).map(function (el) { return el.Name; }).reverse().join(',') }), insertBeforeLayer: props === null || props === void 0 ? void 0 : props.insertBeforeLayer }))),
            props.featureInfoEnabled && featureInfoLngLat && (React__default.createElement(MlMarker, __assign({}, featureInfoLngLat, { content: featureInfoContent })))))));
};
//<p key="description" style={{ fontSize: '.7em' }}>
//	{capabilities?.Capability?.Layer?.['Abstract']}
//</p>
MlWmsLoader.defaultProps = {
    mapId: undefined,
    url: '',
    urlParameters: {
        SERVICE: 'WMS',
        VERSION: '1.3.0',
        REQUEST: 'GetCapabilities',
    },
    wmsUrlParameters: {
        TRANSPARENT: 'TRUE',
    },
    featureInfoEnabled: true,
    zoomToExtent: false,
    showDeleteButton: false,
};

function paintPicker(props) {
    var circleNoShow = { 'circle-color': 'rgba(0,0,0,0)' };
    var fillNoShow = { 'fill-color': 'rgba(0,0,0,0)', 'fill-outline-color': 'rgba(0,0,0,0)' };
    var lineNoShow = { 'line-color': 'rgba(0,0,0,0)' };
    var opacityInterpolate = [
        'interpolate',
        ['linear'],
        ['get', props.timeField],
        props.currentVal - props.fadeIn * props.step,
        0,
        props.currentVal,
        1,
        props.currentVal + props.fadeOut * props.step,
        0,
    ];
    var accumulatedOpacityInterpolate = [
        'interpolate',
        ['linear'],
        ['get', props.timeField],
        props.currentVal,
        1,
        props.currentVal + props.fadeOut * props.step,
        0,
    ];
    var defaultFillPaint = {
        'fill-color': props.featuresColor,
        'fill-opacity': opacityInterpolate,
        'fill-outline-color': [
            'interpolate',
            ['linear'],
            ['get', props.timeField],
            props.currentVal - props.fadeIn * props.step,
            'rgba(255, 0, 0, 0)',
            props.currentVal,
            'rgb(0,0,0)',
            props.currentVal + props.fadeIn * props.step,
            'rgba(255, 0, 0, 0)',
        ],
    };
    var defaultCirclePaint = {
        'circle-color': props.featuresColor,
        'circle-radius': [
            'interpolate',
            ['linear'],
            ['get', props.timeField],
            props.currentVal - props.fadeIn * props.step,
            1,
            props.currentVal,
            20,
            props.currentVal + props.fadeOut * props.step,
            1,
        ],
        'circle-opacity': opacityInterpolate,
    };
    var defaultLinePaint = {
        'line-color': props.featuresColor,
        'line-width': 3,
        'line-opacity': opacityInterpolate
    };
    var circleAccumulatePaint = {
        'circle-color': props.featuresColor,
        'circle-radius': [
            'interpolate',
            ['linear'],
            ['get', props.timeField],
            props.currentVal,
            20,
            props.currentVal + props.fadeOut * props.step,
            1,
        ],
        'circle-opacity': accumulatedOpacityInterpolate,
    };
    var fillAccumulatePaint = {
        'fill-color': props.featuresColor,
        'fill-opacity': accumulatedOpacityInterpolate,
        'fill-outline-color': [
            'interpolate',
            ['linear'],
            ['get', props.timeField],
            props.currentVal,
            'rgb(0,0,0)',
            props.currentVal + props.fadeIn * props.step,
            'rgba(255, 0, 0, 0)',
        ],
    };
    var lineAccumulatePaint = {
        'line-color': props.featuresColor,
        'line-width': 3,
        'line-opacity': accumulatedOpacityInterpolate
    };
    if (props.userPaint !== undefined) {
        return props.userPaint;
    }
    else {
        switch (props.type) {
            case 'circle':
                if (props.currentVal === props.minVal && !props.isPlaying) {
                    return circleNoShow;
                }
                else if (props.accumulate) {
                    return circleAccumulatePaint;
                }
                else {
                    return defaultCirclePaint;
                }
            case 'fill':
                if (props.currentVal === props.minVal && !props.isPlaying) {
                    return fillNoShow;
                }
                else if (props.accumulate) {
                    return fillAccumulatePaint;
                }
                else {
                    return defaultFillPaint;
                }
            case 'line':
                if (props.currentVal === props.minVal && !props.isPlaying) {
                    return lineNoShow;
                }
                else if (props.accumulate) {
                    return lineAccumulatePaint;
                }
                else {
                    return defaultLinePaint;
                }
            case undefined:
                if (props.currentVal === props.minVal && !props.isPlaying) {
                    return circleNoShow;
                }
                else if (props.accumulate) {
                    return circleAccumulatePaint;
                }
                else {
                    return defaultCirclePaint;
                }
        }
    }
}

function MlTemporalControllerLabels(props) {
    var fadeInSteps = props.currentVal - props.fadeIn * props.step;
    var fadeOutSteps = props.currentVal + props.fadeIn * props.step;
    var noShow = { 'text-color': 'rgba(0,0,0,0)' };
    var defaultPaint = {
        'text-color': props.labelColor,
        'text-opacity': [
            'interpolate',
            ['linear'],
            ['get', props.timeField],
            fadeInSteps,
            0,
            props.currentVal,
            1,
            fadeOutSteps,
            0,
        ]
    };
    var accumulatePaint = {
        'text-color': props.labelColor,
        'text-opacity': [
            'interpolate',
            ['linear'],
            ['get', props.timeField],
            props.currentVal,
            1,
            fadeOutSteps,
            0,
        ]
    };
    var currentPaint = function () {
        if (props.currentVal === props.minVal && !props.isPlaying) {
            return noShow;
        }
        if (props.accumulate) {
            return accumulatePaint;
        }
        else {
            return defaultPaint;
        }
    };
    var defaultLayout = {
        'text-field': ['get', props.labelField],
        'text-font': ['Metropolis Regular'],
    };
    return (React__default.createElement(MlLayer, { options: {
            type: 'symbol',
            layout: props.labelLayout || defaultLayout,
            paint: props.labelPaint || currentPaint(),
        }, geojson: props.data, layerId: 'timeControllerLabels' }));
}

var bigScreenBoxStyle = {
    marginLeft: '15%',
    marginBottom: '3%',
    width: '70%',
    height: '90px',
    alignItems: 'center',
};
var mobileScreenBoxStyle = {
    top: '10%',
    //width: '100%',
    height: '100px',
    alignItems: 'center',
};
function TemporalControllerPlayer(props) {
    var _a = useState(props.currentVal), currentVal = _a[0], setCurrentVal = _a[1];
    var _b = useState(props.isPlaying), isPlaying = _b[0], setIsPlaying = _b[1];
    var range = props.maxVal - props.minVal;
    var intervalRef = useRef(null);
    var mediaIsMobile = useMediaQuery(function (theme) { return theme.breakpoints.down('md'); });
    useEffect(function () {
        return function () {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);
    useEffect(function () {
        props.returnCurrent(currentVal);
        props.returnPlaying(isPlaying);
    }, [currentVal, isPlaying]);
    var play = React__default.useCallback(function () {
        var counter = currentVal - props.minVal;
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        intervalRef.current = setInterval(function () {
            if (counter >= range) {
                if (intervalRef.current)
                    clearInterval(intervalRef.current);
                setIsPlaying(false);
            }
            else {
                setCurrentVal(function (val) { return val + props.step; });
            }
            counter = counter + props.step;
        }, props.interval);
    }, [props.step, props.maxVal, currentVal]);
    // Player buttons
    var handlePlayPause = function () {
        if (!isPlaying) {
            setIsPlaying(true);
            play();
        }
        else {
            setIsPlaying(false);
            if (isPlaying) {
                if (intervalRef.current)
                    clearInterval(intervalRef.current);
            }
        }
    };
    var handleStop = function () {
        if (intervalRef.current)
            clearInterval(intervalRef.current);
        setCurrentVal(props.minVal);
        setIsPlaying(false);
    };
    var handleFastRewind = function () {
        if (isPlaying) {
            if (intervalRef.current)
                clearInterval(intervalRef.current);
            setCurrentVal(currentVal - range / 10);
            play();
        }
        else {
            setCurrentVal(currentVal - range / 10);
        }
    };
    var handleFastForward = function () {
        if (isPlaying) {
            if (intervalRef.current)
                clearInterval(intervalRef.current);
            setCurrentVal(currentVal + range / 10);
            play();
        }
        else {
            setCurrentVal(currentVal + range / 10);
        }
    };
    //Slider
    var handleChange = function (e, newValue) {
        if (!isPlaying) {
            setCurrentVal(newValue);
        }
        else {
            if (e) {
                if (intervalRef.current)
                    clearInterval(intervalRef.current);
                setCurrentVal(newValue);
                play();
            }
        }
    };
    return (React__default.createElement(React__default.Fragment, null,
        React__default.createElement(Drawer, { anchor: "bottom", open: props.open || true, variant: "persistent", sx: {
                flexShrink: 0,
                '& .MuiDrawer-paper': mediaIsMobile ? mobileScreenBoxStyle : bigScreenBoxStyle,
            } },
            React__default.createElement(Grid, { container: true, alignItems: "center", justifyContent: "space-between" },
                React__default.createElement(Grid, { item: true, xs: 12, sm: 10, textAlign: "center" },
                    React__default.createElement(Button, { onClick: handleFastRewind },
                        React__default.createElement(FastRewindIcon, null)),
                    React__default.createElement(Button, { onClick: handleStop },
                        React__default.createElement(StopIcon, null)),
                    React__default.createElement(Button, { onClick: handlePlayPause }, isPlaying ? React__default.createElement(PauseIcon, null) : React__default.createElement(PlayArrowIcon, null)),
                    React__default.createElement(Button, { onClick: handleFastForward },
                        React__default.createElement(FastForwardIcon, null))),
                props.display && !mediaIsMobile && (
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                React__default.createElement(Grid, { item: true, xs: 12, sm: 5, textAlign: "right" },
                    React__default.createElement(Typography, { variant: 'h5', sx: { paddingRight: '25px' } }, Math.floor(currentVal))))),
            React__default.createElement(Slider, { sx: {
                    position: 'flex',
                    width: '95%',
                    paddingTop: '10px',
                    alignSelf: 'center',
                }, "aria-label": "Custom marks", defaultValue: props.minVal, value: currentVal, step: props.step, onChange: handleChange, min: props.minVal, max: props.maxVal }),
            mediaIsMobile && props.display && (React__default.createElement(Typography, { variant: 'body1', textAlign: 'right' }, Math.floor(currentVal))))));
}

function getMinVal(geojson, timeField) {
    var _a, _b;
    if (geojson === null || geojson === void 0 ? void 0 : geojson.features) {
        var tempFeatures = __spreadArray([], (geojson.features ? geojson.features : []), true);
        tempFeatures.sort(function (a, b) { var _a, _b; return (((_a = a.properties) === null || _a === void 0 ? void 0 : _a[timeField]) < ((_b = b.properties) === null || _b === void 0 ? void 0 : _b[timeField]) ? 1 : -1); });
        return ((_b = (_a = tempFeatures[tempFeatures.length - 1]) === null || _a === void 0 ? void 0 : _a.properties) === null || _b === void 0 ? void 0 : _b[timeField]) || 0;
    }
    return 0;
}
function getMaxVal(geojson, timeField) {
    var _a, _b;
    if (geojson === null || geojson === void 0 ? void 0 : geojson.features) {
        var tempFeatures = __spreadArray([], ((geojson === null || geojson === void 0 ? void 0 : geojson.features) ? geojson.features : []), true);
        tempFeatures.sort(function (a, b) { var _a, _b; return (((_a = a.properties) === null || _a === void 0 ? void 0 : _a[timeField]) < ((_b = b.properties) === null || _b === void 0 ? void 0 : _b[timeField]) ? -1 : 1); });
        return ((_b = (_a = tempFeatures[tempFeatures.length - 1]) === null || _a === void 0 ? void 0 : _a.properties) === null || _b === void 0 ? void 0 : _b[timeField]) || 0;
    }
    return 0;
}
function useFilterData(props) {
    var mapHook = useMap({
        mapId: props.mapId,
    });
    var minVal = useMemo(function () {
        if (props.minVal) {
            return props.minVal;
        }
        if (minVal === undefined) {
            return getMinVal(props.geojson, props.timeField);
        }
    }, [props.minVal, props.geojson, props.timeField]);
    var maxVal = useMemo(function () {
        if (props.maxVal) {
            return props.maxVal;
        }
        if (maxVal === undefined) {
            return getMaxVal(props.geojson, props.timeField);
        }
    }, [props.maxVal, props.geojson, props.timeField]);
    // filter geojson
    var filteredData = useMemo(function () {
        if (props.geojson !== undefined && mapHook.map && minVal && maxVal) {
            return featureCollection(props.geojson.features.filter(function (e) {
                var _a, _b;
                return (((_a = e.properties) === null || _a === void 0 ? void 0 : _a[props.timeField]) >= minVal &&
                    ((_b = e.properties) === null || _b === void 0 ? void 0 : _b[props.timeField]) <= maxVal);
            }));
        }
        return;
    }, [props.geojson, mapHook.map, props.timeField]);
    return { filteredData: filteredData, minVal: minVal, maxVal: maxVal };
}

var MlTemporalController = function (props) {
    var _a, _b, _c;
    var mapHook = useMap({
        mapId: props.mapId,
        waitForLayer: props.insertBeforeLayer,
    });
    var labelField = props.labelField || ((_c = (_b = (_a = props.geojson) === null || _a === void 0 ? void 0 : _a.features[0]) === null || _b === void 0 ? void 0 : _b.properties) === null || _c === void 0 ? void 0 : _c[0]) || '';
    var _d = useFilterData({
        geojson: props.geojson,
        timeField: props.timeField,
        minVal: props.minVal,
        maxVal: props.maxVal,
        initialVal: props.initialVal,
        mapId: props.mapId,
    }), filteredData = _d.filteredData, minVal = _d.minVal, maxVal = _d.maxVal;
    var theme = useTheme();
    var _e = useState(props.initialVal || minVal), currentVal = _e[0], setCurrentVal = _e[1];
    var featuresColor = props.featuresColor || theme.palette.primary.main;
    var labelColor = props.labelColor || theme.palette.text.primary;
    var _f = useState(false), isPlaying = _f[0], setIsPlaying = _f[1];
    var paint = paintPicker({
        type: props.type,
        timeField: props.timeField,
        currentVal: currentVal,
        minVal: minVal,
        isPlaying: isPlaying,
        fadeIn: props.fadeIn,
        fadeOut: props.fadeOut,
        step: props.step,
        featuresColor: featuresColor,
        accumulate: props.accumulate,
        userPaint: props.paint,
    });
    //Set Initial values and clear references
    useEffect(function () {
        if (!props.initialVal && minVal) {
            setCurrentVal(minVal);
        }
        else if (props.initialVal) {
            setCurrentVal(props.initialVal);
        }
    }, []);
    useEffect(function () {
        if (typeof props.onStateChange === 'function') {
            props.onStateChange({
                current: currentVal,
                paint: paint,
            });
        }
    }, [props.onStateChange]);
    // Fit map to bbox
    useEffect(function () {
        var _a;
        if (props.fitBounds && typeof filteredData !== 'undefined') {
            var geojsonBbox = bbox(filteredData);
            (_a = mapHook.map) === null || _a === void 0 ? void 0 : _a.map.fitBounds(geojsonBbox);
        }
    }, [filteredData]);
    useEffect(function () {
        var _a, _b, _c;
        if (!mapHook.map)
            return;
        var _onClick, _onHover, _onLeave;
        if (props.onClick) {
            _onClick = props.onClick;
            (_a = mapHook.map) === null || _a === void 0 ? void 0 : _a.on('click', 'timeController', _onClick);
        }
        if (props.onHover) {
            _onHover = props.onHover;
            (_b = mapHook.map) === null || _b === void 0 ? void 0 : _b.on('mouseenter', 'timeController', _onHover);
        }
        if (props.onLeave) {
            _onLeave = props.onLeave;
            (_c = mapHook.map) === null || _c === void 0 ? void 0 : _c.on('mouseleave', 'timeController', _onLeave);
        }
        return function () {
            var _a, _b, _c;
            if (_onClick) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore ignore supposedly incompatible function definition
                (_a = mapHook.map) === null || _a === void 0 ? void 0 : _a.off('click', 'timeController', _onClick);
            }
            if (_onHover) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore ignore supposedly incompatible function definition
                (_b = mapHook.map) === null || _b === void 0 ? void 0 : _b.off('mouseenter', 'timeController', _onHover);
            }
            if (_onLeave) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore ignore supposedly incompatible function definition
                (_c = mapHook.map) === null || _c === void 0 ? void 0 : _c.off('mouseleave', 'timeController', _onLeave);
            }
        };
    }, [mapHook.map, props.onClick, props.onHover, props.onLeave]);
    return (React__default.createElement(React__default.Fragment, null,
        filteredData && props.ownLayer && (React__default.createElement(MlGeoJsonLayer, { type: props.type, mapId: props.mapId, 
            //layerId="timeController"
            //insertBeforeLayer={props.insertBeforeLayer || 'timeControllerLabels'}
            paint: props.paint ||
                paint, options: {
                source: {
                    type: 'geojson',
                    attribution: props.attribution,
                    data: filteredData
                },
            } })),
        filteredData && props.label && (React__default.createElement(MlTemporalControllerLabels, { data: filteredData, currentVal: currentVal, fadeIn: props.labelFadeIn, fadeOut: props.labelFadeOut, step: props.step, labelField: labelField, labelColor: labelColor, timeField: props.timeField, minVal: minVal, accumulate: props.accumulate, isPlaying: isPlaying })),
        React__default.createElement(TemporalControllerPlayer, { currentVal: currentVal, isPlaying: isPlaying, step: props.step, interval: props.interval, minVal: minVal, maxVal: maxVal, returnCurrent: setCurrentVal, returnPlaying: setIsPlaying, open: false, fadeIn: props.fadeIn, fadeOut: props.fadeOut, featuresColor: featuresColor, labels: props.label, labelColor: labelColor, labelFadeIn: props.labelFadeIn, labelFadeOut: props.labelFadeOut, accumulate: props.accumulate, display: props.displayCurrentValue })));
};
MlTemporalController.defaultProps = {
    mapId: undefined,
    ownLayer: true,
    type: 'circle',
    step: 1,
    interval: 200,
    fadeIn: 5,
    fadeOut: 5,
    labelFadeIn: 5,
    labelFadeOut: 5,
    accumulate: false,
    fitBounds: true,
    label: true,
    attribution: '',
    displayCurrentValue: false
};

/**
 * Creates an invisible layer for each entry in props.layerIds with the id `order-{entry}` and a reliable order
 *
 */
var MlOrderLayers = function (props) {
    var _a;
    return (React__default.createElement(React__default.Fragment, null, (_a = props === null || props === void 0 ? void 0 : props.layerIds) === null || _a === void 0 ? void 0 : _a.map(function (layer, idx) {
        var _a;
        return (React__default.createElement(MlLayer, __assign({ layerId: layer, options: {
                display: 'none',
            }, key: layer }, (idx > 0
            ? {
                insertBeforeLayer: (_a = props === null || props === void 0 ? void 0 : props.layerIds) === null || _a === void 0 ? void 0 : _a[idx - 1],
            }
            : { insertBeforeLayer: props.insertBeforeLayer }))));
    })));
};
MlOrderLayers.defaultProps = {
    mapId: undefined,
    insertBeforeLayer: undefined,
};

/**
 * Create Terrain Layer Component
 *
 */
var MlTerrainLayer = function (props) {
    var mapHook = useMap({ mapId: 'map_1' });
    useEffect(function () {
        if (!mapHook.map)
            return;
        if (!mapHook.map.map.getSource('terrain')) {
            mapHook.map.map.addSource('terrain', __assign({ type: 'raster-dem', encoding: 'mapbox', maxzoom: 12, minzoom: 4 }, props.sourceOptions));
        }
        mapHook.map.map.setTerrain(__assign({ source: 'terrain', exaggeration: 1 }, props.terrainOptions));
        mapHook.map.addLayer({
            id: 'hills',
            type: 'hillshade',
            source: 'terrain',
            layout: { visibility: 'visible' },
            paint: { 'hillshade-shadow-color': 'rgba(71,59,36,0.4)' },
        });
        return function () {
            var _a, _b;
            (_a = mapHook.map) === null || _a === void 0 ? void 0 : _a.map.setTerrain(null);
            if ((_b = mapHook.map) === null || _b === void 0 ? void 0 : _b.map.getSource('terrain')) {
                mapHook.map.map.removeLayer('hills');
                mapHook.map.map.removeSource('terrain');
            }
        };
    }, [mapHook.map, props.sourceOptions, props.terrainOptions]);
    return React__default.createElement(React__default.Fragment, null);
};
MlTerrainLayer.defaultProps = {
    mapId: undefined,
};

var sketchTools = [
    { name: 'Point', mode: 'draw_point', icon: React__default.createElement(ScatterPlotIcon, null) },
    { name: 'LineString', mode: 'draw_line_string', icon: React__default.createElement(PolylineIcon, null) },
    { name: 'Polygon', mode: 'draw_polygon', icon: React__default.createElement(PentagonIcon, null) },
];
/**
 * Component template
 *
 */
var MlSketchTool = function (props) {
    var mapHook = useMap({
        mapId: props.mapId,
        waitForLayer: props.insertBeforeLayer,
    });
    var _a = useState(), hoveredGeometry = _a[0], setHoveredGeometry = _a[1];
    var _b = useState({
        activeGeometryIndex: undefined,
        selectedGeoJson: undefined,
        geometries: [],
        drawMode: undefined,
    }), sketchState = _b[0], setSketchState = _b[1];
    console.log(sketchState);
    useEffect(function () {
        if (!(typeof props.onChange === 'function'))
            return;
        props.onChange(sketchState);
    }, [sketchState, props.onChange]);
    var buttonStyle = __assign({}, props.buttonStyleOverride);
    // const buttonClickHandler = (buttonDrawMode: keyof MapboxDraw.Modes) => {
    // 	setSketchState((_state) => ({
    // 		drawMode: _state.drawMode !== buttonDrawMode ? buttonDrawMode : undefined,
    // 		geometries: _state.geometries,
    // 		activeGeometryIndex: undefined,
    // 		selectedGeoJson: undefined,
    // 	}));
    // };
    var buttonClickHandler = function (buttonDrawMode) {
        var modeRef = undefined;
        setSketchState(function (prevState) {
            modeRef = prevState.drawMode;
            return __assign(__assign({}, prevState), { drawMode: undefined, activeGeometryIndex: undefined, selectedGeoJson: undefined });
        });
        requestAnimationFrame(function () {
            setSketchState(function (prevState) {
                if ((modeRef === 'draw_polygon' || modeRef === 'draw_line_string') &&
                    buttonDrawMode === 'draw_point') {
                    return __assign(__assign({}, prevState), { drawMode: undefined });
                }
                return __assign(__assign({}, prevState), { drawMode: buttonDrawMode });
            });
        });
    };
    var removeGeoJson = function (geoJson) {
        setSketchState(function (_sketchState) {
            var _geometries = __spreadArray([], _sketchState.geometries, true);
            _geometries.splice(_geometries.indexOf(geoJson), 1);
            return __assign(__assign({}, _sketchState), { drawMode: undefined, geometries: _geometries, activeGeometryIndex: _sketchState.activeGeometryIndex
                    ? _sketchState.activeGeometryIndex - 1
                    : undefined });
        });
    };
    var handleCheckboxChange = function (event) {
        var _a;
        (_a = props.onShowInstructionChange) === null || _a === void 0 ? void 0 : _a.call(props, event.target.checked);
    };
    var SketchToolButtons = function () {
        return (React__default.createElement(React__default.Fragment, null, sketchTools.map(function (el) {
            var stateColor = function (theme) {
                if (sketchState.drawMode === el.mode) {
                    return theme.palette.primary.main;
                }
                else {
                    return theme.palette.navigation.navColor;
                }
            };
            var stateIconColor = function (theme) {
                if (sketchState.drawMode !== el.mode) {
                    return theme.palette.primary.main;
                }
                else {
                    return theme.palette.navigation.navColor;
                }
            };
            return (React__default.createElement(React__default.Fragment, null,
                React__default.createElement(Tooltip$1, { title: el.name },
                    React__default.createElement(Button, { key: el.name, sx: __assign({ color: stateIconColor, backgroundColor: stateColor, '&:hover': {
                                backgroundColor: stateColor,
                            } }, buttonStyle), onClick: function () { return buttonClickHandler(el.mode); } }, el.icon))));
        })));
    };
    return (React__default.createElement(React__default.Fragment, null,
        React__default.createElement(Box, { sx: {
                zIndex: 104,
            } },
            React__default.createElement(ButtonGroup, null,
                React__default.createElement(SketchToolButtons, null))),
        React__default.createElement(Box, { sx: { marginTop: '10px' } },
            React__default.createElement(FormGroup, null,
                React__default.createElement(FormControlLabel, { control: React__default.createElement(Checkbox, { size: "small", checked: props.showInstruction, onChange: handleCheckboxChange }), label: "Show instructions" }))),
        sketchState.drawMode && (React__default.createElement(MlFeatureEditor, { mode: sketchState.drawMode, geojson: sketchState.selectedGeoJson, onChange: function (feature) {
                console.log(feature);
                if (!(feature === null || feature === void 0 ? void 0 : feature[0]))
                    return;
                setSketchState(function (_sketchState) {
                    var _geometries = __spreadArray([], sketchState.geometries, true);
                    if (typeof _sketchState.activeGeometryIndex === 'undefined') {
                        var tempFeature = feature[0];
                        if (tempFeature && tempFeature.properties) {
                            tempFeature.properties.id = tempFeature.id;
                        }
                        else {
                            console.error('tempFeature or tempFeature.properties is null or undefined');
                        }
                        _sketchState.activeGeometryIndex = _geometries.length;
                        _geometries.push(tempFeature);
                    }
                    else {
                        _geometries[_sketchState.activeGeometryIndex] = feature[0];
                    }
                    // Check if the geometry type is point and if the coordinates have changed to exit draw mode after editing
                    var changedPoint = function () {
                        var _a, _b, _c, _d;
                        if (_sketchState.selectedGeoJson &&
                            typeof _sketchState.activeGeometryIndex !== 'undefined' &&
                            _sketchState.geometries[_sketchState.activeGeometryIndex] &&
                            _sketchState.geometries[_sketchState.activeGeometryIndex].geometry.type ===
                                'Point') {
                            var selectedCoords = (_b = (_a = _sketchState.selectedGeoJson) === null || _a === void 0 ? void 0 : _a.geometry) === null || _b === void 0 ? void 0 : _b.coordinates;
                            var activeCoords = (_d = (_c = _sketchState.geometries[_sketchState.activeGeometryIndex]) === null || _c === void 0 ? void 0 : _c.geometry) === null || _d === void 0 ? void 0 : _d.coordinates;
                            // Compare coordinates
                            return JSON.stringify(selectedCoords) !== JSON.stringify(activeCoords);
                        }
                        return false;
                    };
                    if (changedPoint()) {
                        _sketchState.drawMode = undefined;
                    }
                    return __assign(__assign({}, _sketchState), { geometries: _geometries });
                });
            }, onFinish: function () {
                setSketchState(function (_sketchState) { return (__assign(__assign({}, _sketchState), { drawMode: undefined, activeGeometryIndex: undefined, selectedGeoJson: undefined })); });
            } })),
        React__default.createElement(List$1, { sx: { zIndex: 105, marginBottom: '-10px' } },
            sketchState.geometries.map(function (el, index) {
                var _a, _b, _c;
                return (React__default.createElement(React__default.Fragment, null,
                    React__default.createElement(Box, { key: el.id, sx: { display: 'flex', flexDirection: 'column' } },
                        React__default.createElement("br", null),
                        React__default.createElement(Box, { flexDirection: 'row', sx: {
                                '&:hover': {
                                    backgroundColor: 'rgb(177, 177, 177, 0.2)',
                                },
                                marginTop: '25px',
                            }, onMouseOver: function () {
                                setHoveredGeometry(el);
                            }, onMouseLeave: function () {
                                setHoveredGeometry(undefined);
                            } },
                            !((_a = el.properties) === null || _a === void 0 ? void 0 : _a.customName) && (React__default.createElement("input", { type: "text", value: ((_b = el.properties) === null || _b === void 0 ? void 0 : _b.name) || '', placeholder: "Assign name", onChange: function (e) {
                                    var newName = e.target.value;
                                    setSketchState(function (_sketchState) {
                                        var updatedGeometries = __spreadArray([], _sketchState.geometries, true);
                                        if (!updatedGeometries[index].properties) {
                                            updatedGeometries[index].properties = {};
                                        }
                                        updatedGeometries[index].properties.name = newName;
                                        return __assign(__assign({}, _sketchState), { geometries: updatedGeometries });
                                    });
                                }, style: {
                                    padding: '5px',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    outline: 'none',
                                }, onFocus: function (e) { return (e.target.style.borderColor = '#009ee0'); }, onBlur: function (e) {
                                    e.target.style.borderColor = '#ccc';
                                    setSketchState(function (_sketchState) {
                                        var updatedGeometries = __spreadArray([], _sketchState.geometries, true);
                                        if (!updatedGeometries[index].properties) {
                                            updatedGeometries[index].properties = {};
                                        }
                                        updatedGeometries[index].properties.customName = true;
                                        return __assign(__assign({}, _sketchState), { geometries: updatedGeometries });
                                    });
                                } })),
                            React__default.createElement(LayerListItem, { listItemSx: buttonStyle, configurable: true, layerComponent: React__default.createElement(MlGeoJsonLayer, { mapId: props.mapId, geojson: el, layerId: String(el.id), defaultPaintOverrides: {
                                        fill: { 'fill-opacity': 0.5 },
                                    } }), type: 'layer', name: React__default.createElement(Typography, { onClick: function () {
                                        setSketchState(function (_sketchState) {
                                            var updatedGeometries = __spreadArray([], _sketchState.geometries, true);
                                            if (!updatedGeometries[index].properties) {
                                                updatedGeometries[index].properties = {};
                                            }
                                            updatedGeometries[index].properties.customName = false;
                                            return __assign(__assign({}, _sketchState), { geometries: updatedGeometries });
                                        });
                                    }, sx: {
                                        cursor: 'pointer',
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                    } }, ((_c = el.properties) === null || _c === void 0 ? void 0 : _c.name) || String(el.id)), description: el.geometry.type }),
                            React__default.createElement(Box, { sx: {
                                    padding: '3px 30px',
                                } },
                                React__default.createElement(ButtonGroup, { size: "small" },
                                    React__default.createElement(Tooltip$1, { title: "Center" },
                                        React__default.createElement(Button, { sx: __assign({ color: function (theme) { return theme.palette.primary.main; }, backgroundColor: function (theme) { return theme.palette.navigation.navColor; } }, buttonStyle), onClick: function () {
                                                var _a;
                                                (_a = mapHook === null || mapHook === void 0 ? void 0 : mapHook.map) === null || _a === void 0 ? void 0 : _a.map.setCenter(el.geometry.type === 'Point'
                                                    ? el.geometry.coordinates
                                                    : turf.centerOfMass(el).geometry.coordinates);
                                            } },
                                            React__default.createElement(GpsFixedIcon, null))),
                                    React__default.createElement(Tooltip$1, { title: "Edit" },
                                        React__default.createElement(Button, { sx: __assign({ color: function (theme) {
                                                    var _a;
                                                    if (sketchState.drawMode === 'simple_select' &&
                                                        ((_a = sketchState.selectedGeoJson) === null || _a === void 0 ? void 0 : _a.id) === el.id) {
                                                        return theme.palette.navigation.navColor;
                                                    }
                                                    else {
                                                        return theme.palette.primary.main;
                                                    }
                                                }, backgroundColor: function (theme) {
                                                    var _a;
                                                    if (sketchState.drawMode === 'simple_select' &&
                                                        ((_a = sketchState.selectedGeoJson) === null || _a === void 0 ? void 0 : _a.id) === el.id) {
                                                        return theme.palette.primary.main;
                                                    }
                                                    else {
                                                        return theme.palette.navigation.navColor;
                                                    }
                                                } }, buttonStyle), onClick: function () {
                                                setSketchState(function (_sketchState) {
                                                    var _a;
                                                    var newDrawMode = _sketchState.drawMode === 'simple_select' &&
                                                        ((_a = _sketchState.selectedGeoJson) === null || _a === void 0 ? void 0 : _a.id) === el.id
                                                        ? undefined
                                                        : 'simple_select';
                                                    return __assign(__assign({}, _sketchState), { selectedGeoJson: el, activeGeometryIndex: _sketchState.geometries.indexOf(el), drawMode: newDrawMode });
                                                });
                                            } },
                                            React__default.createElement(EditIcon, null))),
                                    React__default.createElement(Tooltip$1, { title: "Delete" },
                                        React__default.createElement(Button, { sx: __assign({ color: function (theme) { return theme.palette.primary.main; }, backgroundColor: function (theme) { return theme.palette.navigation.navColor; } }, buttonStyle), onClick: function () {
                                                removeGeoJson(el);
                                                setHoveredGeometry(undefined);
                                            } },
                                            React__default.createElement(DeleteIcon, null)))))))));
            }),
            hoveredGeometry && (React__default.createElement(MlGeoJsonLayer, { mapId: props.mapId, geojson: { type: 'FeatureCollection', features: [hoveredGeometry] }, layerId: 'highlightBorder', defaultPaintOverrides: {
                    circle: {
                        'circle-color': '#000000',
                        'circle-opacity': 0.2,
                        'circle-radius': 10,
                    },
                    line: {
                        'line-color': '#000000',
                        'line-opacity': 0.2,
                        'line-width': 10,
                    },
                    fill: {
                        'fill-color': '#000000',
                        'fill-opacity': 0.2,
                    },
                } })))));
};
MlSketchTool.defaultProps = {
    mapId: undefined,
    buttonStyleOverride: {},
};

/**
 * Component template
 *
 */
var useCameraFollowPath = function (props) {
    // Use a useRef hook to reference the layer object to be able to access it later inside useEffect hooks
    // without the requirement of adding it to the dependency list (ignore the false eslint exhaustive deps warning)
    var initializedRef = useRef(false);
    var pause = useRef(props.pause);
    var zoom = useRef(props.zoom);
    var pitch = useRef(props.pitch);
    var step = useRef(1);
    var speed = useRef(props.speed);
    var timeoutId = useRef(null);
    var kmPerStep = props.kmPerStep || 0.01;
    var routeDistance = turf.length(props.route);
    var stepDuration = props.stepDuration || 70;
    var mapHook = useMap({
        mapId: props.mapId,
        waitForLayer: props.insertBeforeLayer,
    });
    useEffect(function () {
        pause.current = props.pause;
        if (!pause.current) {
            play();
        }
    }, [props.pause]);
    useEffect(function () {
        if (!mapHook.map)
            return;
        zoom.current = props.zoom;
        if (typeof zoom.current !== 'undefined' && mapHook.map.map.getZoom() !== zoom.current) {
            mapHook.map.map.setZoom(zoom.current);
        }
    }, [mapHook.map, props.zoom]);
    useEffect(function () {
        if (!mapHook.map)
            return;
        pitch.current = props.pitch;
        if (typeof pitch.current !== 'undefined' && pitch.current !== mapHook.map.map.getPitch()) {
            mapHook.map.map.setPitch(pitch.current);
        }
    }, [mapHook.map, props.pitch]);
    useEffect(function () {
        speed.current = props.speed;
    }, [props.speed]);
    var disableInteractivity = useCallback(function () {
        if (!mapHook.map)
            return;
        mapHook.map.map['scrollZoom'].disable();
        mapHook.map.map['boxZoom'].disable();
        mapHook.map.map['dragRotate'].disable();
        mapHook.map.map['dragPan'].disable();
        mapHook.map.map['keyboard'].disable();
        mapHook.map.map['doubleClickZoom'].disable();
        mapHook.map.map['touchZoomRotate'].disable();
    }, [mapHook.map]);
    var enableInteractivity = useCallback(function () {
        if (!mapHook.map)
            return;
        mapHook.map.map['scrollZoom'].enable();
        mapHook.map.map['boxZoom'].enable();
        mapHook.map.map['dragRotate'].enable();
        mapHook.map.map['dragPan'].enable();
        mapHook.map.map['keyboard'].enable();
        mapHook.map.map['doubleClickZoom'].enable();
        mapHook.map.map['touchZoomRotate'].enable();
    }, [mapHook.map]);
    function centerRoute() {
        if (!mapHook.map || !props.route)
            return;
        var bbox = turf.bbox(props.route);
        var bounds;
        if (bbox && bbox.length > 3) {
            bounds = [
                [bbox[0], bbox[1]],
                [bbox[2], bbox[3]],
            ];
            mapHook.map.map.fitBounds(bounds, { padding: 100 });
        }
    }
    function play() {
        if (!mapHook.map)
            return;
        if (!pause.current) {
            disableInteractivity();
            if (typeof zoom.current !== 'undefined' && mapHook.map.map.getZoom() !== zoom.current) {
                mapHook.map.map.setZoom(zoom.current);
            }
            var alongRoutelati = turf.along(props.route, step.current * kmPerStep).geometry
                .coordinates;
            if (step.current * kmPerStep < routeDistance) {
                mapHook.map.map.easeTo({
                    center: alongRoutelati,
                    bearing: turf.bearing(turf.point([mapHook.map.map.getCenter().lng, mapHook.map.map.getCenter().lat]), turf.point(alongRoutelati)),
                    duration: stepDuration,
                    essential: true,
                });
                if (typeof speed.current !== 'undefined') {
                    step.current = step.current + speed.current;
                }
                else {
                    step.current++;
                }
                console.log('PAN MOVE');
                setTimeout(function () {
                    play();
                }, 100);
            }
            else {
                mapHook.map.map.setPitch(0);
                centerRoute();
                enableInteractivity();
                console.log('ENABLE CONTROLS');
                step.current = 1;
            }
        }
        else {
            enableInteractivity();
        }
    }
    function reset() {
        if (!mapHook.map)
            return;
        centerRoute();
        enableInteractivity();
        step.current = 1;
    }
    useEffect(function () {
        if (!mapHook.map || initializedRef.current)
            return;
        initializedRef.current = true;
        centerRoute();
    }, [mapHook.map]);
    useEffect(function () {
        return function () {
            if (timeoutId.current) {
                clearTimeout(timeoutId.current);
            }
        };
    }, []);
    return {
        play: play,
        reset: reset,
    };
};
useCameraFollowPath.defaultProps = {
    mapId: undefined,
    zoom: 18,
};

function useLayerFilter(props) {
    var mapHook = useMap({ mapId: props.mapId });
    useEffect(function () {
        if (!mapHook.map || !props.layerId || !props.filter)
            return;
        if (mapHook.map.map.getLayer(props.layerId)) {
            var _layerId_1 = props.layerId;
            mapHook.map.map.setFilter(_layerId_1, props.filter);
            return function () {
                if (mapHook.map) {
                    mapHook.map.map.setFilter(_layerId_1, null);
                }
            };
        }
        return;
    }, [props, mapHook.map]);
    return {};
}

var touchEquivalents = {
  mousedown: 'touchstart',
  mouseup: 'touchend',
  mousemove: 'touchmove'
};
var touchEquivalentsKeys = Object.keys(touchEquivalents);
function useLayerEvent(props) {
  var mapState = useMapState({
    mapId: props.mapId,
    watch: {
      layers: true
    }
  });
  var mapHook = useMap({
    mapId: props.mapId
  });
  useEffect(function () {
    if (!mapHook.map) return true;
    if (typeof props.condition !== 'undefined' && props.condition === false) return;
    //console.log('useLayerEvent');
    //console.log(mapState);

    if (mapHook.map.map.getLayer(props.layerId)) {
      //console.log("layer avail");
      var _event = props.event;
      var _layerId = props.layerId;
      var _eventHandler = props.eventHandler;

      //console.log(_event);
      mapHook.map.on(_event, _layerId, _eventHandler, mapHook.componentId);
      if ((props === null || props === void 0 ? void 0 : props.addTouchEvents) === true) {
        if (touchEquivalentsKeys.indexOf(_event) !== -1) {
          mapHook.map.on(touchEquivalents[_event], _layerId, _eventHandler, mapHook.componentId);
        }
      }
      return function () {
        mapHook.map.off(_event, _layerId, _eventHandler);
        if ((props === null || props === void 0 ? void 0 : props.addTouchEvents) === true) {
          if (touchEquivalentsKeys.indexOf(_event) !== -1) {
            mapHook.map.off(touchEquivalents[_event], _layerId, _eventHandler, mapHook.componentId);
          }
        }
      };
    }
  }, [props, mapState, mapHook.map]);
  return {};
}

var useLayerContext = function () {
    var layerContext = useContext(LayerContext);
    return layerContext;
};

/**
 * Enables the use of custom protocols (basically custom tile load functions) in the maplibre-gl-js library.
 *
 */
var useAddProtocol = function (props) {
    useEffect(function () {
        if (!props.protocol || typeof props.handler !== 'function')
            return;
        maplibregl.addProtocol(props.protocol, props.handler);
        return function () {
            maplibregl.removeProtocol(props.protocol);
        };
    }, [props]);
    return {};
};
useAddProtocol.defaultProps = {
    mapId: undefined,
};

function protocolPathParser(url) {
    var test = url.split('?');
    var urlParts = test[0].split('://');
    var protocolId = urlParts[0];
    var csvUrl = urlParts.length > 2 ? urlParts[1] + '://' + urlParts[2] : urlParts[1];
    var csvParts = csvUrl.split('/');
    var filename = csvParts.join('/');
    var optionsString = decodeURI(test[1]);
    var options = Object.fromEntries(new URLSearchParams(optionsString));
    return {
        protocolId: protocolId,
        filename: filename,
        options: options,
    };
}

function getProtocolData(path) {
    return __awaiter(this, void 0, void 0, function () {
        var response, rawData, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch(path)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.text()];
                case 2:
                    rawData = _a.sent();
                    return [2 /*return*/, rawData];
                case 3:
                    error_1 = _a.sent();
                    console.error('File could not be loaded: ', error_1);
                    return [2 /*return*/, error_1];
                case 4: return [2 /*return*/];
            }
        });
    });
}

function convertCsv(filename, options) {
    return __awaiter(this, void 0, void 0, function () {
        var geojson;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new Promise(function (resolve, reject) {
                        var useOptions = options || {};
                        var extension = filename.substring(filename.length - 3);
                        if (extension === 'tsv') {
                            options.delimiter = '\t';
                        }
                        getProtocolData(filename).then(function (rawData) {
                            // Use the csv2geojson library to convert the CSV to GeoJSON	
                            csv2geojson.csv2geojson(rawData, useOptions, function (err, data) {
                                if (err) {
                                    reject(err);
                                }
                                else {
                                    resolve(data);
                                }
                            });
                        });
                    })];
                case 1:
                    geojson = _a.sent();
                    return [2 /*return*/, geojson];
            }
        });
    });
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
var CSVProtocolHandler = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var parsedParams, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                parsedParams = protocolPathParser(params.url);
                return [4 /*yield*/, convertCsv(parsedParams.filename, parsedParams.options)];
            case 1:
                data = _a.sent();
                if (data !== undefined) {
                    return [2 /*return*/, { data: data }];
                }
                throw new Error('CSV not found ' + parsedParams.filename);
        }
    });
}); };

function convertOSM(params) {
    return __awaiter(this, void 0, void 0, function () {
        var options, geojson;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    options = params.options || {};
                    return [4 /*yield*/, new Promise(function (resolve, reject) {
                            getProtocolData(params.filename).then(function (rawData) {
                                var newData = osm2geojson(rawData, options);
                                if (!newData) {
                                    reject('Conversion failed');
                                }
                                else {
                                    resolve(newData);
                                }
                            });
                        })];
                case 1:
                    geojson = _a.sent();
                    return [2 /*return*/, geojson];
            }
        });
    });
}
var OSMProtocolHandler = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var parsedParams, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                parsedParams = protocolPathParser(params.url);
                return [4 /*yield*/, convertOSM(parsedParams)];
            case 1:
                data = _a.sent();
                if (data !== undefined) {
                    return [2 /*return*/, { data: data }];
                }
                throw new Error('OSM File not found ' + parsedParams.filename);
        }
    });
}); };

function reduceFeatures(geojson) {
    var newFeatures = [];
    geojson.features.forEach(function (e) {
        if (!e.features) {
            newFeatures.push({
                type: e.type,
                geometry: e.geometry,
                properties: e.properties,
            });
        }
        else {
            e.features.forEach(function (el) {
                newFeatures.push({ type: el.type, geometry: el.geometry, properties: el.properties });
            });
        }
    });
    return newFeatures;
}
function convertTopojson(params) {
    return __awaiter(this, void 0, void 0, function () {
        var geojson;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new Promise(function (resolve) {
                        var topoJsonData = {
                            type: 'Topology',
                            objects: { key: '' },
                            arcs: [],
                        };
                        getProtocolData(params.filename).then(function (rawData) {
                            try {
                                topoJsonData = JSON.parse(rawData);
                            }
                            catch (e) {
                                console.error('Error converting topojson', e);
                                throw 'Invalid TopoJson';
                            }
                            // Convert the data
                            var result = {
                                type: 'FeatureCollection',
                                features: [],
                            };
                            if (topoJsonData.type === 'Topology' && topoJsonData.objects !== undefined) {
                                var topoJsonDataObjects_1 = topoJsonData.objects;
                                // add the "fromObject" property in each topojson feature
                                Object.keys(topoJsonData.objects).map(function (key) {
                                    var _a, _b;
                                    if ((topoJsonDataObjects_1 === null || topoJsonDataObjects_1 === void 0 ? void 0 : topoJsonDataObjects_1[key].type) === 'GeometryCollection') {
                                        (_a = topoJsonDataObjects_1 === null || topoJsonDataObjects_1 === void 0 ? void 0 : topoJsonDataObjects_1[key].geometries) === null || _a === void 0 ? void 0 : _a.forEach(function (e) { return (e.properties = __assign({ fromObject: key }, e.properties)); });
                                    }
                                    else if ((topoJsonDataObjects_1 === null || topoJsonDataObjects_1 === void 0 ? void 0 : topoJsonDataObjects_1[key]) &&
                                        ((_b = topoJsonDataObjects_1 === null || topoJsonDataObjects_1 === void 0 ? void 0 : topoJsonDataObjects_1[key]) === null || _b === void 0 ? void 0 : _b.type) !== 'GeometryCollection') {
                                        topoJsonDataObjects_1[key].properties = __assign({ fromObject: key }, topoJsonDataObjects_1 === null || topoJsonDataObjects_1 === void 0 ? void 0 : topoJsonDataObjects_1[key].properties);
                                    }
                                });
                                //convert the data into a geoJson object
                                result = {
                                    type: 'FeatureCollection',
                                    features: Object.keys(topoJsonData.objects).map(function (key) {
                                        return feature(topoJsonData, key);
                                    }),
                                };
                                result.features = reduceFeatures(result);
                            }
                            resolve(result);
                        });
                    })];
                case 1:
                    geojson = _a.sent();
                    return [2 /*return*/, geojson];
            }
        });
    });
}
var TopojsonProtocolHandler = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var parsedParams, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                parsedParams = protocolPathParser(params.url);
                return [4 /*yield*/, convertTopojson(parsedParams)];
            case 1:
                data = _a.sent();
                if (data !== undefined) {
                    return [2 /*return*/, { data: data }];
                }
                throw new Error('Topojson not found ' + parsedParams.filename);
        }
    });
}); };

function convertXML(params) {
    return __awaiter(this, void 0, void 0, function () {
        var geojson;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new Promise(function (resolve, reject) {
                        getProtocolData(params.filename).then(function (rawData) {
                            var newData = function () {
                                // use an extern converter for tcx files
                                if (params.protocolId === 'tcx') {
                                    return externParser[params.protocolId](new DOMParser().parseFromString(rawData, 'text/xml'));
                                    // use the projects gpxConverter function for gpx and kml files
                                }
                                else {
                                    return toGeoJSON[params.protocolId](new DOMParser().parseFromString(rawData, 'text/xml'));
                                }
                            };
                            if (!newData()) {
                                reject('Conversion failed');
                            }
                            else {
                                resolve(newData());
                            }
                        });
                    })];
                case 1:
                    geojson = _a.sent();
                    return [2 /*return*/, geojson];
            }
        });
    });
}
var XMLProtocolHandler = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var parsedParams, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                parsedParams = protocolPathParser(params.url);
                return [4 /*yield*/, convertXML(parsedParams)];
            case 1:
                data = _a.sent();
                if (data !== undefined) {
                    return [2 /*return*/, { data: data }];
                }
                throw new Error('XML not found ' + parsedParams.filename);
        }
    });
}); };

/**
 *
 */
var useAddImage = function (props) {
    var mapHook = useMap({
        mapId: undefined,
    });
    var initializedRef = useRef(false);
    useEffect(function () {
        var _a;
        if (!mapHook.map || initializedRef.current)
            return;
        (_a = mapHook.map) === null || _a === void 0 ? void 0 : _a.loadImage(props.imagePath).then(function (res) {
            var _a;
            if (!(res === null || res === void 0 ? void 0 : res.data)) {
                console.log('image ' + props.imagePath + 'could not be loaded');
                return;
            }
            (_a = mapHook.map) === null || _a === void 0 ? void 0 : _a.addImage(props.imageId, res.data);
            return;
        });
        return function () {
            var _a;
            (_a = mapHook.map) === null || _a === void 0 ? void 0 : _a.removeImage(props.imageId);
        };
    }, [mapHook.map, props]);
    return;
};
useAddImage.defaultProps = {
    mapId: undefined,
};

var SimpleDataContext = React__default.createContext({});
var SimpleDataContextProvider = SimpleDataContext.Provider;

var SimpleDataProvider = function (props) {
    var _a = useState(), data = _a[0], setData = _a[1];
    useEffect(function () {
        if (!props.url)
            return;
        var data_promise = null;
        if (props.format === "json") {
            data_promise = d3.json(props.url);
        }
        else if (props.format === "csv") {
            data_promise = d3.csv(props.url);
        }
        else if (props.format === "xml") {
            data_promise = d3.xml(props.url);
        }
        if (data_promise) {
            data_promise.then(function (received_data) {
                if (props.format === "xml") {
                    if (props.nodeType) {
                        var dataTmp_1 = [];
                        received_data.querySelectorAll(props.nodeType).forEach(function (el) {
                            if (typeof props.formatData === "function") {
                                dataTmp_1.push(props.formatData(el));
                            }
                        });
                        setData(dataTmp_1);
                    }
                }
                else {
                    var dataTmp = received_data;
                    if (props.data_property) {
                        dataTmp = received_data[props.data_property];
                    }
                    if (typeof props.formatData === "function") {
                        setData(dataTmp.map(props.formatData));
                    }
                    else {
                        setData(dataTmp);
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
        setData: setData,
    };
    return (React__default.createElement(SimpleDataContextProvider, { value: value }, props.children));
};

var IconButtonStyled$1 = styled(IconButton)({
    padding: '4px',
    marginTop: '-3px',
    background: 'none',
    '&:hover': {
        background: 'none',
    },
});
function LayerListItemFactory(props) {
    var _a, _b;
    var layerContext = useLayerContext();
    var mapHook = useMap({ mapId: undefined });
    //useCallback Hook
    function fitLayer(layer) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
        var layerSource = layer.id && ((_b = (_a = mapHook.map) === null || _a === void 0 ? void 0 : _a.getLayer(layer.id)) === null || _b === void 0 ? void 0 : _b.source)
            ? (_d = (_c = mapHook.map) === null || _c === void 0 ? void 0 : _c.getLayer(layer.id)) === null || _d === void 0 ? void 0 : _d.source
            : undefined;
        var _bbox = null;
        switch (layer.type) {
            case 'geojson':
                if ((_e = layer.config) === null || _e === void 0 ? void 0 : _e.geojson) {
                    (_f = mapHook.map) === null || _f === void 0 ? void 0 : _f.fitBounds(bbox((_g = layer.config) === null || _g === void 0 ? void 0 : _g.geojson), props.fitBoundsOptions);
                }
                else {
                    if (!layerSource) {
                        return;
                    }
                    var _geojson = {
                        type: 'FeatureCollection',
                        features: (_h = mapHook.map) === null || _h === void 0 ? void 0 : _h.querySourceFeatures(layerSource),
                    };
                    if (_geojson.features.length === 0) {
                        (_j = mapHook.map) === null || _j === void 0 ? void 0 : _j.zoomTo(1);
                        _geojson.features = (_k = mapHook.map) === null || _k === void 0 ? void 0 : _k.querySourceFeatures(layerSource);
                    }
                    _bbox = bbox(_geojson);
                }
                break;
            case 'vt':
                console.log('vt');
                break;
            case 'wms':
                _bbox = (_p = (_o = (_m = (_l = layer === null || layer === void 0 ? void 0 : layer.config) === null || _l === void 0 ? void 0 : _l.config) === null || _m === void 0 ? void 0 : _m.layers) === null || _o === void 0 ? void 0 : _o[0]) === null || _p === void 0 ? void 0 : _p.EX_GeographicBoundingBox;
                break;
            default:
                return;
        }
        if (_bbox) {
            (_q = mapHook.map) === null || _q === void 0 ? void 0 : _q.fitBounds(_bbox, props.fitBoundsOptions);
        }
    }
    var orderLayers = useMemo(function () {
        var layerIds = __spreadArray(__spreadArray([
            'order-background'
        ], __spreadArray([], layerContext.layers, true).map(function (_el, idx) { return 'content_order_' + idx; }), true), [
            'order-labels',
        ], false);
        return layerIds.reverse();
    }, [layerContext.layers]);
    var layers = useMemo(function () {
        if (props.layers)
            return props.layers;
        if (layerContext === null || layerContext === void 0 ? void 0 : layerContext.layers)
            return layerContext.layers;
        return [];
    }, [props.layers, layerContext.layers]);
    var setLayers = useMemo(function () {
        if (props.setLayers)
            return props.setLayers;
        return layerContext.setLayers;
    }, [props.setLayers, layerContext.setLayers]);
    var pointerSensor = useSensor(PointerSensor, {
        activationConstraint: {
            distance: 5,
        },
    });
    var mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 5,
        },
    });
    var sensors = useSensors(mouseSensor, pointerSensor);
    function dragEnd(event) {
        var _a, _b, _c;
        var dragLayerId = event.active.id;
        var dragLayerNewPosition = (_c = (_b = (_a = event.over) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.current) === null || _c === void 0 ? void 0 : _c.sortable.index;
        layerContext.moveLayer(String(dragLayerId), function () { return dragLayerNewPosition; });
    }
    return (React__default.createElement(React__default.Fragment, null,
        React__default.createElement(MlOrderLayers, { layerIds: orderLayers, insertBeforeLayer: "_background" }),
        ((_a = layerContext === null || layerContext === void 0 ? void 0 : layerContext.symbolLayers) === null || _a === void 0 ? void 0 : _a.length) > 0 && (React__default.createElement(LayerListItem, { key: 'background_labels', layerComponent: React__default.createElement(MlVectorTileLayer, __assign({}, layerContext.vtLayerConfig, { layers: layerContext.symbolLayers, mapId: props === null || props === void 0 ? void 0 : props.mapId, insertBeforeLayer: 'order-labels' })), setLayerState: function (state) {
                return layerContext.setSymbolLayers(state === null || state === void 0 ? void 0 : state.layers);
            }, visible: true, configurable: true, type: "layer", name: "Labels" })),
        React__default.createElement(DndContext, { collisionDetection: closestCenter, sensors: sensors, onDragEnd: function (event) { return dragEnd(event); }, modifiers: [restrictToVerticalAxis] },
            React__default.createElement(SortableContext, { items: layers, strategy: verticalListSortingStrategy },
                __spreadArray([], layers, true).map(function (layer, idx) {
                    var _a, _b, _c, _d, _e;
                    if (!(layer === null || layer === void 0 ? void 0 : layer.id))
                        return null;
                    switch (layer.type) {
                        case 'geojson':
                            return (React__default.createElement(LayerListItem, { key: layer.id, layerId: layer.id, sortable: props.sortable, name: (layer === null || layer === void 0 ? void 0 : layer.name) || ((_a = layer === null || layer === void 0 ? void 0 : layer.config) === null || _a === void 0 ? void 0 : _a.type) + ' layer' || 'unnamed layer', layerComponent: React__default.createElement(MlGeoJsonLayer, __assign({}, layer.config, { mapId: props === null || props === void 0 ? void 0 : props.mapId, layerId: layer.id, insertBeforeLayer: 'content_order_' + (layers.length - 1 - idx) })), buttons: React__default.createElement(React__default.Fragment, null,
                                    React__default.createElement(IconButtonStyled$1, { disabled: idx === layers.length - 1, onClick: function () {
                                            layerContext.moveDown(layer.id || '');
                                        } },
                                        React__default.createElement(ArrowCircleDownIcon, null)),
                                    React__default.createElement(IconButtonStyled$1, { disabled: idx === 0, onClick: function () {
                                            layerContext.moveUp(layer.id || '');
                                        } },
                                        React__default.createElement(ArrowCircleUpIcon, null)),
                                    React__default.createElement(IconButtonStyled$1, { onClick: function () { return fitLayer(layer); } },
                                        React__default.createElement(CenterFocusWeakIcon, null))), setLayerState: function (layerConfig) {
                                    return setLayers === null || setLayers === void 0 ? void 0 : setLayers(function (current) {
                                        var _layers = __spreadArray([], current, true);
                                        if (layerConfig === false) {
                                            _layers.splice(idx, 1);
                                        }
                                        else {
                                            _layers[idx].config = layerConfig;
                                        }
                                        return _layers;
                                    });
                                }, configurable: true, showDeleteButton: true }));
                        case 'wms':
                            return (React__default.createElement(React__default.Fragment, null,
                                React__default.createElement(MlWmsLoader, __assign({}, layer.config, { key: layer.id, layerId: layer.id, sortable: props.sortable, mapId: props === null || props === void 0 ? void 0 : props.mapId, insertBeforeLayer: 'content_order_' + (layers.length - 1 - idx), onConfigChange: function (layerConfig) {
                                        setLayers === null || setLayers === void 0 ? void 0 : setLayers(function (current) {
                                            var _layers = __spreadArray([], current, true);
                                            if (layerConfig === false) {
                                                _layers.splice(idx, 1);
                                            }
                                            else {
                                                _layers[idx].config.config = layerConfig;
                                            }
                                            return _layers;
                                        });
                                    }, featureInfoActive: ((_b = layer === null || layer === void 0 ? void 0 : layer.config) === null || _b === void 0 ? void 0 : _b.featureInfoActive) || false, setFeatureInfoActive: function (updateFunction) {
                                        setLayers === null || setLayers === void 0 ? void 0 : setLayers(function (current) {
                                            var _a;
                                            var _layers = __spreadArray([], current, true);
                                            if (typeof updateFunction === 'function') {
                                                _layers[idx].config.featureInfoActive =
                                                    updateFunction(((_a = _layers[idx].config) === null || _a === void 0 ? void 0 : _a.featureInfoActive) ||
                                                        false);
                                            }
                                            return _layers;
                                        });
                                    }, showDeleteButton: true, buttons: React__default.createElement(React__default.Fragment, null,
                                        React__default.createElement(IconButtonStyled$1, { disabled: idx === layers.length - 1, onClick: function () {
                                                layerContext.moveDown(layer.id || '');
                                            } },
                                            React__default.createElement(ArrowCircleDownIcon, null)),
                                        React__default.createElement(IconButtonStyled$1, { disabled: idx === 0, onClick: function () {
                                                layerContext.moveUp(layer.id || '');
                                            } },
                                            React__default.createElement(ArrowCircleUpIcon, null)),
                                        React__default.createElement(IconButtonStyled$1, { onClick: function () { return fitLayer(layer); } },
                                            React__default.createElement(CenterFocusWeakIcon, null))) }))));
                        case 'vt':
                            return (React__default.createElement(React__default.Fragment, { key: (layer === null || layer === void 0 ? void 0 : layer.id) + '_listItem' },
                                React__default.createElement(LayerListItem, { key: layer.id, name: (layer === null || layer === void 0 ? void 0 : layer.name) || (layer === null || layer === void 0 ? void 0 : layer.type) + ' layer' || 'unnamed layer', layerComponent: React__default.createElement(MlVectorTileLayer, { layers: ((_c = layer === null || layer === void 0 ? void 0 : layer.config) === null || _c === void 0 ? void 0 : _c.layers) || [], key: layer.id, mapId: layer === null || layer === void 0 ? void 0 : layer.config.mapId, sourceOptions: (_d = layer === null || layer === void 0 ? void 0 : layer.config) === null || _d === void 0 ? void 0 : _d.sourceOptions, layerId: layer.id, url: (_e = layer === null || layer === void 0 ? void 0 : layer.config) === null || _e === void 0 ? void 0 : _e.url }), buttons: React__default.createElement(React__default.Fragment, null,
                                        React__default.createElement(IconButtonStyled$1, { key: layer.id + '_button1', disabled: idx === layers.length - 1, onClick: function () {
                                                layerContext.moveDown(layer.id || '');
                                            } },
                                            React__default.createElement(ArrowCircleDownIcon, null)),
                                        React__default.createElement(IconButtonStyled$1, { key: layer.id + '_button2', disabled: idx === 0, onClick: function () {
                                                layerContext.moveUp(layer.id || '');
                                            } },
                                            React__default.createElement(ArrowCircleUpIcon, null)),
                                        React__default.createElement(IconButtonStyled$1, { onClick: function () { return fitLayer(layer); } },
                                            React__default.createElement(CenterFocusWeakIcon, null))), setLayerState: function (layerConfig) {
                                        return setLayers === null || setLayers === void 0 ? void 0 : setLayers(function (current) {
                                            var _layers = __spreadArray([], current, true);
                                            if (layerConfig === false) {
                                                _layers.splice(idx, 1);
                                            }
                                            else {
                                                _layers[idx].config = layerConfig;
                                            }
                                            return _layers;
                                        });
                                    }, configurable: true, showDeleteButton: true })));
                        default:
                            return null;
                    }
                }),
                ((_b = layerContext === null || layerContext === void 0 ? void 0 : layerContext.backgroundLayers) === null || _b === void 0 ? void 0 : _b.length) > 0 && (React__default.createElement(LayerListItem, { key: 'background_geometry', layerComponent: React__default.createElement(MlVectorTileLayer, __assign({}, layerContext.vtLayerConfig, { layers: layerContext.backgroundLayers, mapId: props === null || props === void 0 ? void 0 : props.mapId, insertBeforeLayer: 'order-background' })), setLayerState: function (state) {
                        layerContext.setBackgroundLayers(state === null || state === void 0 ? void 0 : state.layers);
                    }, visible: true, configurable: true, type: "layer", name: "Background" }))))));
}
LayerListItemFactory.defaultProps = {
    mapId: undefined,
};

var types$1 = [
    'fill',
    'line',
    'circle',
];
function GeoJsonLayerForm(props) {
    var _a = React__default.useState({ type: 'circle' }), config = _a[0], setConfig = _a[1];
    var configIsValid = useMemo(function () {
        if (!(config === null || config === void 0 ? void 0 : config.type) || !(config === null || config === void 0 ? void 0 : config.geojson))
            return false;
        return true;
    }, [config]);
    return (React__default.createElement(React__default.Fragment, null,
        React__default.createElement(DialogTitle$1, null, "GeoJSON layer"),
        React__default.createElement(FormControl, { fullWidth: true },
            React__default.createElement(InputLabel, { id: "type-label" }, "Type"),
            React__default.createElement(Select, { labelId: "type-label", value: config.type, label: "Type", onChange: function (ev) {
                    return setConfig(function (current) { return (__assign(__assign({}, current), { type: ev.target.value })); });
                } }, types$1.map(function (type) { return (React__default.createElement(MenuItem, { key: type, value: type }, type)); }))),
        React__default.createElement(FormControl, { fullWidth: true },
            React__default.createElement(Button, { variant: "contained", component: "label", sx: { marginTop: '10px' } },
                "Upload File",
                React__default.createElement("input", { type: "file", hidden: true, onChange: function (ev) {
                        var _a;
                        (_a = ev.target.files) === null || _a === void 0 ? void 0 : _a[0].text().then(function (data) {
                            return setConfig(function (current) { return (__assign(__assign({}, current), { geojson: JSON.parse(data) })); });
                        });
                    } }))),
        React__default.createElement(DialogActions$1, null,
            React__default.createElement(Button, { onClick: props.onCancel }, "Cancel"),
            React__default.createElement(Button, { disabled: !configIsValid, onClick: function () { return props.onSubmit(config); } }, "Add"))));
}

var LayerTypeForm = function (props) {
    return (React__default.createElement(React__default.Fragment, null,
        React__default.createElement(DialogTitle$1, null, props.layerTypes.length > 1 ? "Select a layer type" : "Load new layer"),
        React__default.createElement(List, null, props.layerTypes.map(function (type, idx) { return (React__default.createElement(ListItem, { disableGutters: true, key: idx },
            React__default.createElement(ListItemButton, { autoFocus: true, onClick: function () {
                    props.onSelect(type);
                } },
                React__default.createElement(ListItemAvatar, null,
                    React__default.createElement(Avatar, null,
                        React__default.createElement(DynamicFeedIcon, null))),
                React__default.createElement(ListItemText, { primary: type })))); }))));
};
LayerTypeForm.defaultProps = {};

function WmsLayerForm(props) {
    var _a = React__default.useState({ url: '' }), config = _a[0], setConfig = _a[1];
    var configIsValid = useMemo(function () {
        if (!(config === null || config === void 0 ? void 0 : config.url))
            return false;
        return true;
    }, [config]);
    return (React__default.createElement(React__default.Fragment, null,
        React__default.createElement(DialogTitle$1, null, "WMS layer"),
        React__default.createElement(DialogContent$1, null,
            React__default.createElement(FormControl, { fullWidth: true, sx: { marginTop: '10px' } },
                React__default.createElement(InputLabel, { htmlFor: "wms-url-input" }, "WMS URL"),
                React__default.createElement(OutlinedInput, { id: "wms-url-input", label: "WMS URL", value: config.url, onChange: function (ev) { return setConfig(__assign(__assign({}, config), { url: ev.target.value })); } }))),
        React__default.createElement(DialogActions$1, null,
            React__default.createElement(Button, { onClick: props.onCancel }, "Cancel"),
            React__default.createElement(Button, { disabled: !configIsValid, onClick: function () { return props.onSubmit(config); } }, "Add"))));
}

var optionFields$1 = ['latfield', 'lonfield', 'delimiter'];
function CSVOptionsFormular(props) {
    var _a = useState(false), open = _a[0], setOpen = _a[1];
    return (React__default.createElement(React__default.Fragment, null,
        React__default.createElement(Typography, null, " Options "),
        React__default.createElement(Button, { onClick: function () { return setOpen(!open); } }, open ? React__default.createElement(IndeterminateCheckBoxIcon, null) : React__default.createElement(AddBoxIcon, null)),
        React__default.createElement(List, null, open &&
            (optionFields$1 === null || optionFields$1 === void 0 ? void 0 : optionFields$1.map(function (el) {
                return (React__default.createElement(React__default.Fragment, null,
                    React__default.createElement(ListItem, null,
                        React__default.createElement(Typography, null,
                            " ",
                            el,
                            " ")),
                    React__default.createElement(ListItem, null,
                        React__default.createElement(TextField, { size: "small", onChange: function (ev) {
                                var newObject = {};
                                newObject[el] = ev.target.value;
                                props.setter(newObject);
                            } }))));
            })))));
}

var optionFields = [
    'completeFeature',
    'allFeatures',
    'renderTagged',
    'excludeWay',
    'suppressWay',
];
function OsmOptionsFomular(props) {
    var _a = useState(false), open = _a[0], setOpen = _a[1];
    return (React__default.createElement(React__default.Fragment, null,
        React__default.createElement(Typography, null, " Options "),
        React__default.createElement(Button, { onClick: function () { return setOpen(!open); } }, open ? React__default.createElement(IndeterminateCheckBoxIcon, null) : React__default.createElement(AddBoxIcon, null)),
        React__default.createElement(List, null, open &&
            (optionFields === null || optionFields === void 0 ? void 0 : optionFields.map(function (el) {
                return (React__default.createElement(React__default.Fragment, null,
                    React__default.createElement(ListItem, null,
                        React__default.createElement(Typography, null,
                            " ",
                            el,
                            " "),
                        React__default.createElement(Checkbox, { onChange: function (ev) {
                                var newObject = {};
                                newObject[el] = ev.target.value === 'on' ? true : false;
                                props.setter(newObject);
                            } }))));
            })))));
}

var handlers = {
    csv: CSVProtocolHandler,
    topojson: TopojsonProtocolHandler,
    osm: OSMProtocolHandler,
    gpx: XMLProtocolHandler,
    kml: XMLProtocolHandler,
    tcx: XMLProtocolHandler,
    //mbtiles: mbTilesProtocolHandler
};
var types = ['fill', 'line', 'circle'];
function ProtocolHandlerLayerForm(props) {
    var _a = useState({ type: 'circle' }), config = _a[0], setConfig = _a[1];
    var _b = useState(), fileName = _b[0], setFileName = _b[1];
    var _c = useState(), filePath = _c[0], setFilePath = _c[1];
    var _d = useState({}), optionsObject = _d[0], setOptionsObject = _d[1];
    var mapHook = useMap({ mapId: props.mapId });
    var optionsURL = '?' + new URLSearchParams(optionsObject).toString();
    useAddProtocol({
        protocol: props.originType,
        handler: handlers[props.originType],
    });
    var configIsValid = useMemo(function () {
        if (!(config === null || config === void 0 ? void 0 : config.type))
            return false;
        if (filePath && fileName)
            return true;
        else
            return false;
    }, [config, filePath, fileName]);
    useEffect(function () {
        var _a, _b;
        if (typeof fileName !== 'undefined' && typeof filePath !== 'undefined') {
            if (!((_a = mapHook.map) === null || _a === void 0 ? void 0 : _a.getSource(fileName)))
                (_b = mapHook.map) === null || _b === void 0 ? void 0 : _b.addSource(fileName, {
                    type: 'geojson',
                    data: optionsObject ? props.originType + '://' + filePath + optionsURL : props.originType + '://' + filePath,
                });
            config.options = { source: fileName };
        }
        return function () { };
    }, [fileName, mapHook.map, filePath]);
    //the temporally storage adress of the uploaded file will be revoked, after source and layer are loaded in the map  
    useEffect(function () {
        var _a;
        if (filePath && fileName && ((_a = mapHook.map) === null || _a === void 0 ? void 0 : _a.getLayer(fileName))) {
            URL.revokeObjectURL(filePath);
        }
    }, [fileName, filePath, mapHook.map]);
    function addOption(newObject) {
        var newOptions = __assign(__assign({}, optionsObject), newObject);
        return setOptionsObject(newOptions);
    }
    return (React__default.createElement(React__default.Fragment, null,
        React__default.createElement(DialogTitle$1, null,
            "Layer from ",
            props.originType),
        React__default.createElement(FormControl, { fullWidth: true },
            React__default.createElement(InputLabel, { id: "type-label" }, "Type"),
            React__default.createElement(Select, { labelId: "type-label", value: config.type, label: "Type", onChange: function (ev) {
                    return setConfig(function (current) { return (__assign(__assign({}, current), { type: ev.target.value })); });
                } }, types.map(function (type) { return (React__default.createElement(MenuItem, { key: type, value: type }, type)); }))),
        React__default.createElement(FormControl, { fullWidth: true },
            React__default.createElement(Button, { variant: "contained", component: "label", sx: { marginTop: '10px' } },
                "Select origin file",
                React__default.createElement("input", { type: "file", hidden: true, accept: props.originType, onChange: function (ev) {
                        var _a, _b, _c;
                        setFileName((_a = ev.target.files) === null || _a === void 0 ? void 0 : _a[0].name);
                        if ((_b = ev.target.files) === null || _b === void 0 ? void 0 : _b[0]) {
                            var dataUrl = URL.createObjectURL((_c = ev.target.files) === null || _c === void 0 ? void 0 : _c[0]);
                            setFilePath(dataUrl);
                        }
                    } })),
            props.originType === 'csv' && React__default.createElement(CSVOptionsFormular, { setter: addOption }),
            props.originType === 'osm' && React__default.createElement(OsmOptionsFomular, { setter: addOption })),
        React__default.createElement(DialogActions$1, null,
            React__default.createElement(Button, { onClick: props.onCancel }, "Cancel"),
            React__default.createElement(Button, { disabled: !configIsValid, onClick: function () { return props.onSubmit(config); } }, "Add"))));
}

var LayerSpecificationKeys = [
    'id',
    'type',
    'metadata',
    'source',
    'source-layer',
    'layout',
    'paint',
    'options',
];
function MbtilesLayerPropFormular(props) {
    var _a = useState([]), layers = _a[0], setLayers = _a[1];
    var newLayer = {};
    var toJSON = ['paint', 'layout', 'options', 'metadata'];
    useEffect(function () {
        props.setter(layers);
    }, [layers]);
    var TextFields = function () {
        return (React__default.createElement(React__default.Fragment, null, LayerSpecificationKeys.map(function (key) {
            return (React__default.createElement(React__default.Fragment, { key: key + '_fragment' },
                React__default.createElement(TextField, { label: key, onChange: function (ev) {
                        return newLayer[key] = ev.target.value;
                    } })));
        })));
    };
    function addLayer() {
        toJSON.map(function (key) {
            if (typeof newLayer[key] !== 'undefined') {
                try {
                    newLayer[key] = JSON.parse(newLayer[key]);
                }
                catch (_a) {
                    alert("Invalid JSON format, try again");
                }
            }
        });
        setLayers(function (current) {
            if (current.length > 0) {
                return __spreadArray([newLayer], current, true);
            }
            else {
                return [newLayer];
            }
        });
    }
    return (React__default.createElement(React__default.Fragment, null,
        React__default.createElement(FormControl, { fullWidth: true },
            React__default.createElement(TextFields, null)),
        React__default.createElement(Button, { onClick: addLayer }, " Add")));
}

function MbtilesLayerForm(props) {
    var _a = React__default.useState(props.config), config = _a[0], setConfig = _a[1];
    var _b = useState(), fileName = _b[0], setFileName = _b[1];
    var _c = useState(), filePath = _c[0], setFilePath = _c[1];
    var _d = useState([]), layers = _d[0], setLayers = _d[1];
    var mapHook = useMap({ mapId: props.mapId });
    var _e = useState(false), expanded = _e[0], setExpanded = _e[1];
    console.log(layers);
    var LayersToCall = function () {
        return (React__default.createElement(React__default.Fragment, null, layers.map(function (el, idx) { return (React__default.createElement(Typography, { variant: "body2", key: idx },
            idx + 1,
            ": ",
            JSON.stringify(el))); })));
    };
    /**
     * A Vector Tile layer configuration with a mbtile Protocol url will passed to the onComplete function of the addLayerButton.
     * In order to visdualize the file content, a mbtiles ProtocolHandler must be added to the map Instanz.
     * See the MapComponents AddLayerButton demo and the documentation of useAddProtocolHook to find out more about Protocol handlers.
     */
    /* example values:
    *	 	id: 'countries',
    *		type: 'fill',
    *		'source-layer': 'countries',
    *   layout: {},
    *   paint: { "fill-color": "#f9a5f5", "fill-opacity": 0.5 },
    */
    var configIsValid = useMemo(function () {
        if (!fileName)
            return false;
        return true;
    }, [fileName]);
    useEffect(function () {
        if (typeof fileName !== 'undefined' && typeof filePath !== 'undefined') {
            setConfig({
                url: 'mbtiles://' + filePath + '/{z}/{x}/{y}',
                layers: layers,
                layerId: fileName,
                sourceOptions: {
                    type: 'vector',
                    minzoom: 0,
                    maxzoom: 1,
                },
            });
        }
    }, [fileName, mapHook.map, filePath, layers]);
    return (React__default.createElement(React__default.Fragment, null,
        React__default.createElement(DialogTitle$1, null, " Layer from mbtiles file"),
        React__default.createElement(DialogContent$1, null,
            React__default.createElement(Button, { variant: "contained", component: "label", sx: { marginTop: '10px' } },
                "Select origin file",
                React__default.createElement("input", { type: "file", hidden: true, accept: props.originType, onChange: function (ev) {
                        var _a, _b, _c;
                        setFileName((_a = ev.target.files) === null || _a === void 0 ? void 0 : _a[0].name);
                        if ((_b = ev.target.files) === null || _b === void 0 ? void 0 : _b[0]) {
                            var dataUrl = URL.createObjectURL((_c = ev.target.files) === null || _c === void 0 ? void 0 : _c[0]);
                            setFilePath(dataUrl);
                        }
                    } })),
            React__default.createElement(Accordion, { expanded: expanded },
                React__default.createElement(AccordionSummary, { "aria-controls": "panel1d-content", id: "panel1d-header" },
                    React__default.createElement(Typography, null, "MB-Tile Layer properties"),
                    React__default.createElement(Button, { onClick: function () { return setExpanded(!expanded); } }, expanded ? React__default.createElement(KeyboardArrowUpIcon, null) : React__default.createElement(KeyboardArrowDownIcon, null))),
                React__default.createElement(Typography, { variant: "body1" }, " Layers"),
                layers.length > 0 ? React__default.createElement(LayersToCall, null) : React__default.createElement(Typography, { variant: "body2" }, " 0 "),
                React__default.createElement(MbtilesLayerPropFormular, { setter: setLayers }))),
        React__default.createElement(DialogActions$1, null,
            React__default.createElement(Button, { onClick: props.onCancel }, "Cancel"),
            React__default.createElement(Button, { disabled: !configIsValid, onClick: function () { return props.onSubmit(config); } }, "Add"))));
}

var AddLayerPopup = function (props) {
    var _a = useState(props === null || props === void 0 ? void 0 : props.config), layerConfig = _a[0], setLayerConfig = _a[1];
    var _b = useState(), originType = _b[0], setOriginType = _b[1];
    var layerTypes = props.layerTypes;
    var supportedProtocols = layerTypes.filter(function (el) { return el !== 'wms' && el !== 'geojson' && el !== 'mbtiles'; });
    var updateLayerType = function (type) {
        setOriginType(type);
        if (supportedProtocols.includes(type)) {
            setLayerConfig({ type: 'geojson', config: {} });
        }
        else if (type === 'mbtiles') {
            setLayerConfig({ type: 'vt', config: { layers: [] } });
        }
        else {
            setLayerConfig({ type: type, config: {} });
        }
    };
    var handleCancel = function () {
        props.setOpen(false);
        setLayerConfig(undefined);
    };
    var ProtocolTypeFormulars = function () {
        return (React__default.createElement(React__default.Fragment, null, supportedProtocols.map(function (el, idx) {
            return (React__default.createElement(React__default.Fragment, null, (layerConfig === null || layerConfig === void 0 ? void 0 : layerConfig.type) === 'geojson' && originType === el && (React__default.createElement(ProtocolHandlerLayerForm, { key: idx, originType: el, onSubmit: function (config) {
                    var _a;
                    (_a = props === null || props === void 0 ? void 0 : props.onComplete) === null || _a === void 0 ? void 0 : _a.call(props, __assign(__assign({}, layerConfig), { config: config, type: 'geojson' }));
                    handleCancel();
                }, onCancel: handleCancel }))));
        })));
    };
    return (React__default.createElement(Dialog$1, { open: props.open, onClose: handleCancel, PaperProps: { sx: { padding: '20px' } } },
        !(layerConfig === null || layerConfig === void 0 ? void 0 : layerConfig.type) && React__default.createElement(LayerTypeForm, { onSelect: updateLayerType, layerTypes: layerTypes }),
        (layerConfig === null || layerConfig === void 0 ? void 0 : layerConfig.type) === 'geojson' && originType === 'geojson' && (React__default.createElement(GeoJsonLayerForm, { onSubmit: function (config) {
                var _a;
                (_a = props === null || props === void 0 ? void 0 : props.onComplete) === null || _a === void 0 ? void 0 : _a.call(props, __assign(__assign({}, layerConfig), { config: config }));
                handleCancel();
            }, onCancel: handleCancel })),
        (layerConfig === null || layerConfig === void 0 ? void 0 : layerConfig.type) === 'wms' && (React__default.createElement(WmsLayerForm, { onSubmit: function (config) {
                var _a;
                (_a = props === null || props === void 0 ? void 0 : props.onComplete) === null || _a === void 0 ? void 0 : _a.call(props, __assign(__assign({}, layerConfig), { config: config }));
                handleCancel();
            }, onCancel: handleCancel })),
        (layerConfig === null || layerConfig === void 0 ? void 0 : layerConfig.type) === 'vt' && originType !== undefined && (React__default.createElement(MbtilesLayerForm, { config: layerConfig, originType: originType, onSubmit: function (config) {
                var _a;
                if (layerConfig) {
                    (_a = props === null || props === void 0 ? void 0 : props.onComplete) === null || _a === void 0 ? void 0 : _a.call(props, __assign(__assign({}, layerConfig), { config: config }));
                    handleCancel();
                }
            }, onCancel: handleCancel })),
        React__default.createElement(ProtocolTypeFormulars, { key: 'protocol' })));
};
AddLayerPopup.defaultProps = {};

var AddLayerButton = function (props) {
    var _a = React__default.useState(false), popupOpen = _a[0], setPopupOpen = _a[1];
    var layerTypes = props.layerTypes || [
        'geojson',
        'wms',
        //'mbtiles',
        'csv',
        'topojson',
        'osm',
        'gpx',
        'kml',
        'tcx',
    ];
    return (React__default.createElement(React__default.Fragment, null,
        React__default.createElement(Button, { variant: "contained", sx: __assign({ marginTop: '10px' }, props.sx), onClick: function () { return setPopupOpen(true); } },
            React__default.createElement(PlaylistAddIcon, null)),
        React__default.createElement(AddLayerPopup, { open: popupOpen, setOpen: setPopupOpen, onComplete: props === null || props === void 0 ? void 0 : props.onComplete, layerTypes: layerTypes })));
};
AddLayerButton.defaultProps = {};

var ghPagesUrl = 'https://mapcomponents.github.io/react-map-components-maplibre/';
var logoUrl = ghPagesUrl + 'assets/WG-MapComponents-Logo_rgb.svg';
var logoUrl_dark = ghPagesUrl + 'assets/WG-MapComponents-Logo_rgb-weisse-schrift.svg';
var logoUrl_mobile = ghPagesUrl + 'assets/mapcomponents_logo.png';
function TopToolbar(props) {
    var theme = useTheme();
    var _a = useState(null), anchorElNav = _a[0], setAnchorElNav = _a[1];
    var handleOpenNavMenu = function (event) {
        setAnchorElNav(event.currentTarget);
    };
    var handleCloseNavMenu = function () {
        setAnchorElNav(null);
    };
    return (React.createElement(AppBar, { sx: {
            minHeight: '62px',
            position: 'absolute',
            zIndex: 1300,
            top: 0,
        } },
        React.createElement(Toolbar, { disableGutters: true },
            props.logo || (React.createElement(React.Fragment, null,
                React.createElement(Box$2, { sx: {
                        marginLeft: '25px',
                        display: { xs: 'none', md: 'flex' },
                        flexGrow: { md: '30' },
                    } },
                    React.createElement("img", { src: theme.palette.mode === 'dark' ? logoUrl_dark : logoUrl, style: { width: '100%', maxWidth: '250px' } })),
                React.createElement(Box$2, { sx: {
                        marginLeft: '25px',
                        display: { xs: 'flex', sm: 'flex', md: 'none' },
                        flexGrow: { xs: '500' },
                        mr: { sm: '0px' },
                    } },
                    React.createElement("img", { src: logoUrl_mobile, width: "50px", height: "50px" })))),
            React.createElement(Box$2, { sx: { flexGrow: 1, display: { xs: 'flex' } } }, props.unmovableButtons),
            props.buttons ? (React.createElement(Box$2, { sx: { flexGrow: 22, display: { xs: 'flex', sm: 'none' } } },
                React.createElement(IconButton$1, { onClick: handleOpenNavMenu },
                    React.createElement(MenuIcon, null)),
                React.createElement(Menu, { id: "menu-appbar", anchorEl: anchorElNav, anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'left',
                    }, keepMounted: true, transformOrigin: {
                        vertical: 'top',
                        horizontal: 'left',
                    }, open: Boolean(anchorElNav), onClose: handleCloseNavMenu, PaperProps: {
                        elevation: 24,
                        sx: {
                            overflow: 'visible',
                            mt: '15px',
                        },
                    }, sx: {
                        display: { xs: 'block', sm: 'none' },
                    } },
                    React.createElement(Box$2, { sx: { paddingLeft: '10px', paddingRight: '10px' }, onClick: handleCloseNavMenu }, props.buttons)))) : (''),
            React.createElement(Box$2, { sx: { marginRight: '25px', display: { xs: 'none', sm: 'flex' } } }, props.buttons))));
}

function UploadButton(props) {
    var fileupload = useRef(null);
    var fileUploadOnChange = function () {
        var _a, _b;
        if (!fileupload.current)
            return false;
        var file = (_b = (_a = fileupload.current) === null || _a === void 0 ? void 0 : _a.files) === null || _b === void 0 ? void 0 : _b[0];
        if (!file)
            return false;
        var reader = new FileReader();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        reader.onload = function (payload) {
            var _a;
            if (!payload)
                return;
            if (typeof props.setData === 'function') {
                props.setData((_a = payload.currentTarget) === null || _a === void 0 ? void 0 : _a.result);
            }
        };
        reader.readAsText(file);
        return;
    };
    var upload = function () {
        if (!fileupload.current)
            return;
        fileupload.current.click();
    };
    return (React__default.createElement(React__default.Fragment, null,
        props.buttonComponent ? (React__default.cloneElement(props.buttonComponent, { onClick: upload })) : (React__default.createElement(Button, { onClick: upload },
            React__default.createElement(FileCopy, null))),
        React__default.createElement("input", { ref: fileupload, onChange: fileUploadOnChange, type: "file", accept: props.accept, id: "input", multiple: true, style: { display: 'none' } })));
}

var SelectStylePopup = function (props) {
    var _a;
    var handleCancel = function () {
        props.setOpen(false);
    };
    return (React__default.createElement(Dialog$1, { open: props.open, onClose: handleCancel, PaperProps: { sx: { padding: '20px' } } },
        React__default.createElement(DialogTitle$1, null, "Select a style"),
        React__default.createElement(List, null, (_a = props === null || props === void 0 ? void 0 : props.styles) === null || _a === void 0 ? void 0 : _a.map(function (style) {
            var _a;
            return (React__default.createElement(ListItem, { disableGutters: true, key: style.name },
                React__default.createElement(ListItemButton, { autoFocus: true, onClick: function () {
                        var _a;
                        (_a = props === null || props === void 0 ? void 0 : props.onSelect) === null || _a === void 0 ? void 0 : _a.call(props, style);
                    } },
                    React__default.createElement(ListItemAvatar, null,
                        React__default.createElement(Avatar, { sx: { width: '50px', height: '50px' }, alt: style.name, src: (style === null || style === void 0 ? void 0 : style.name) && ((_a = props === null || props === void 0 ? void 0 : props.styleThumbnailPaths) === null || _a === void 0 ? void 0 : _a[style.name]) })),
                    React__default.createElement(ListItemText, { primary: style.name }))));
        }))));
};
SelectStylePopup.defaultProps = {
    styleThumbnailPaths: {},
};

var MonokaiStyle = {
    version: 8,
    name: 'Monokai',
    center: [8.542, 47.372],
    zoom: 11.6,
    bearing: 0,
    pitch: 0,
    sources: {
        openmaptiles: {
            type: 'vector',
            url: config.source_openmaptiles_url,
        },
    },
    sprite: config.sprite,
    glyphs: config.glyphs,
    layers: [
        { id: 'background', type: 'background', paint: { 'background-color': '#282822' } },
        {
            id: 'landcover-glacier',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849388993.3071' },
            source: 'openmaptiles',
            'source-layer': 'landcover',
            filter: ['==', 'subclass', 'glacier'],
            layout: { visibility: 'visible' },
            paint: {
                'fill-color': '#AE81FF',
                'fill-opacity': {
                    base: 1,
                    stops: [
                        [0, 0.9],
                        [10, 0.3],
                    ],
                },
            },
        },
        {
            id: 'landuse-residential',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849388993.3071' },
            source: 'openmaptiles',
            'source-layer': 'landuse',
            filter: ['==', 'class', 'residential'],
            paint: { 'fill-color': '#75715E' },
        },
        {
            id: 'landuse-commercial',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849388993.3071' },
            source: 'openmaptiles',
            'source-layer': 'landuse',
            filter: ['all', ['==', '$type', 'Polygon'], ['==', 'class', 'commercial']],
            paint: { 'fill-color': '#837f6e' },
        },
        {
            id: 'landuse-industrial',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849388993.3071' },
            source: 'openmaptiles',
            'source-layer': 'landuse',
            filter: ['all', ['==', '$type', 'Polygon'], ['==', 'class', 'industrial']],
            paint: { 'fill-color': '#918d7e' },
        },
        {
            id: 'park',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849388993.3071' },
            source: 'openmaptiles',
            'source-layer': 'park',
            filter: ['==', '$type', 'Polygon'],
            paint: {
                'fill-color': '#A6C22E',
                'fill-opacity': {
                    base: 1.8,
                    stops: [
                        [9, 0.5],
                        [12, 0.2],
                    ],
                },
            },
        },
        {
            id: 'park-outline',
            type: 'line',
            metadata: { 'mapbox:group': '1444849388993.3071' },
            source: 'openmaptiles',
            'source-layer': 'park',
            filter: ['==', '$type', 'Polygon'],
            layout: {},
            paint: { 'line-color': 'rgba(166,194,46,0.6)', 'line-dasharray': [3, 3] },
        },
        {
            id: 'landuse-cemetery',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849388993.3071' },
            source: 'openmaptiles',
            'source-layer': 'landuse',
            filter: ['==', 'class', 'cemetery'],
            paint: { 'fill-color': '#e0ebad' },
        },
        {
            id: 'landuse-hospital',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849388993.3071' },
            source: 'openmaptiles',
            'source-layer': 'landuse',
            filter: ['==', 'class', 'hospital'],
            paint: { 'fill-color': '#FD971F' },
        },
        {
            id: 'landuse-school',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849388993.3071' },
            source: 'openmaptiles',
            'source-layer': 'landuse',
            filter: ['==', 'class', 'school'],
            paint: { 'fill-color': 'rgba(253,151,31,0.8)' },
        },
        {
            id: 'landuse-railway',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849388993.3071' },
            source: 'openmaptiles',
            'source-layer': 'landuse',
            filter: ['==', 'class', 'railway'],
            paint: { 'fill-color': 'rgba(18,5,68,0.4)' },
        },
        {
            id: 'landcover-wood',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849388993.3071' },
            source: 'openmaptiles',
            'source-layer': 'landcover',
            filter: ['==', 'class', 'wood'],
            paint: {
                'fill-color': '#A6E22E',
                'fill-opacity': 0.1,
                'fill-outline-color': 'hsla(0, 0%, 0%, 0.03)',
                'fill-antialias': {
                    base: 1,
                    stops: [
                        [0, false],
                        [9, true],
                    ],
                },
            },
        },
        {
            id: 'landcover-grass',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849388993.3071' },
            source: 'openmaptiles',
            'source-layer': 'landcover',
            filter: ['==', 'class', 'grass'],
            paint: { 'fill-color': '#A6C22E', 'fill-opacity': 1 },
        },
        {
            id: 'landcover-grass-park',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849388993.3071' },
            source: 'openmaptiles',
            'source-layer': 'park',
            filter: ['==', 'class', 'public_park'],
            paint: { 'fill-color': '#A6C22E', 'fill-opacity': 0.8 },
        },
        {
            id: 'waterway-other',
            type: 'line',
            metadata: { 'mapbox:group': '1444849382550.77' },
            source: 'openmaptiles',
            'source-layer': 'waterway',
            filter: ['!in', 'class', 'canal', 'river', 'stream'],
            layout: { 'line-cap': 'round' },
            paint: {
                'line-color': '#66D9EF',
                'line-width': {
                    base: 1.3,
                    stops: [
                        [13, 0.5],
                        [20, 2],
                    ],
                },
            },
        },
        {
            id: 'waterway-stream-canal',
            type: 'line',
            metadata: { 'mapbox:group': '1444849382550.77' },
            source: 'openmaptiles',
            'source-layer': 'waterway',
            filter: ['in', 'class', 'canal', 'stream'],
            layout: { 'line-cap': 'round' },
            paint: {
                'line-color': '#66D9EF',
                'line-width': {
                    base: 1.3,
                    stops: [
                        [13, 0.5],
                        [20, 6],
                    ],
                },
            },
        },
        {
            id: 'waterway-river',
            type: 'line',
            metadata: { 'mapbox:group': '1444849382550.77' },
            source: 'openmaptiles',
            'source-layer': 'waterway',
            filter: ['==', 'class', 'river'],
            layout: { 'line-cap': 'round' },
            paint: {
                'line-color': '#66D9EF',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [10, 0.8],
                        [20, 6],
                    ],
                },
            },
        },
        {
            id: 'water-offset',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849382550.77' },
            source: 'openmaptiles',
            'source-layer': 'water',
            maxzoom: 8,
            filter: ['==', '$type', 'Polygon'],
            layout: { visibility: 'visible' },
            paint: {
                'fill-opacity': 1,
                'fill-color': '#66D9EF',
                'fill-translate': {
                    base: 1,
                    stops: [
                        [6, [2, 0]],
                        [8, [0, 0]],
                    ],
                },
            },
        },
        {
            id: 'water',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849382550.77' },
            source: 'openmaptiles',
            'source-layer': 'water',
            layout: { visibility: 'visible' },
            paint: { 'fill-color': '#21c8e8' },
        },
        {
            id: 'water-pattern',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849382550.77' },
            source: 'openmaptiles',
            'source-layer': 'water',
            layout: { visibility: 'visible' },
            paint: { 'fill-translate': [0, 2.5], 'fill-pattern': 'wave' },
        },
        {
            id: 'landcover-ice-shelf',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849382550.77' },
            source: 'openmaptiles',
            'source-layer': 'landcover',
            filter: ['==', 'subclass', 'ice_shelf'],
            layout: { visibility: 'visible' },
            paint: {
                'fill-color': '#AE81FF',
                'fill-opacity': {
                    base: 1,
                    stops: [
                        [0, 0.9],
                        [10, 0.3],
                    ],
                },
            },
        },
        {
            id: 'building',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849364238.8171' },
            source: 'openmaptiles',
            'source-layer': 'building',
            paint: { 'fill-color': '#E6DB74', 'fill-antialias': true },
        },
        {
            id: 'building-top',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849364238.8171' },
            source: 'openmaptiles',
            'source-layer': 'building',
            layout: { visibility: 'visible' },
            paint: {
                'fill-translate': {
                    base: 1,
                    stops: [
                        [14, [0, 0]],
                        [16, [-2, -2]],
                    ],
                },
                'fill-outline-color': '#dfdbd7',
                'fill-color': '#eee69f',
                'fill-opacity': {
                    base: 1,
                    stops: [
                        [13, 0],
                        [16, 1],
                    ],
                },
            },
        },
        {
            id: 'tunnel-service-track-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849354174.1904' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'tunnel'], ['in', 'class', 'service', 'track']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#F92672',
                'line-dasharray': [0.5, 0.25],
                'line-width': {
                    base: 1.2,
                    stops: [
                        [15, 1],
                        [16, 4],
                        [20, 11],
                    ],
                },
            },
        },
        {
            id: 'tunnel-minor-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849354174.1904' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'tunnel'], ['==', 'class', 'minor']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#F92672',
                'line-opacity': {
                    stops: [
                        [12, 0],
                        [12.5, 1],
                    ],
                },
                'line-width': {
                    base: 1.2,
                    stops: [
                        [12, 0.5],
                        [13, 1],
                        [14, 4],
                        [20, 15],
                    ],
                },
            },
        },
        {
            id: 'tunnel-secondary-tertiary-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849354174.1904' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'tunnel'], ['in', 'class', 'secondary', 'tertiary']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#F92672',
                'line-opacity': 1,
                'line-width': {
                    base: 1.2,
                    stops: [
                        [8, 1.5],
                        [20, 17],
                    ],
                },
            },
        },
        {
            id: 'tunnel-trunk-primary-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849354174.1904' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'tunnel'], ['in', 'class', 'primary', 'trunk']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#F92672',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [5, 0.4],
                        [6, 0.6],
                        [7, 1.5],
                        [20, 22],
                    ],
                },
            },
        },
        {
            id: 'tunnel-motorway-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849354174.1904' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'tunnel'], ['==', 'class', 'motorway']],
            layout: { 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': '#F92672',
                'line-dasharray': [0.5, 0.25],
                'line-width': {
                    base: 1.2,
                    stops: [
                        [5, 0.4],
                        [6, 0.6],
                        [7, 1.5],
                        [20, 22],
                    ],
                },
            },
        },
        {
            id: 'tunnel-path',
            type: 'line',
            metadata: { 'mapbox:group': '1444849354174.1904' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['==', '$type', 'LineString'],
                ['all', ['==', 'brunnel', 'tunnel'], ['==', 'class', 'path']],
            ],
            paint: {
                'line-color': '#fa5892',
                'line-dasharray': [1.5, 0.75],
                'line-width': {
                    base: 1.2,
                    stops: [
                        [15, 1.2],
                        [20, 4],
                    ],
                },
            },
        },
        {
            id: 'tunnel-service-track',
            type: 'line',
            metadata: { 'mapbox:group': '1444849354174.1904' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'tunnel'], ['in', 'class', 'service', 'track']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#fa5892',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [15.5, 0],
                        [16, 2],
                        [20, 7.5],
                    ],
                },
            },
        },
        {
            id: 'tunnel-minor',
            type: 'line',
            metadata: { 'mapbox:group': '1444849354174.1904' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'tunnel'], ['==', 'class', 'minor_road']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#fa5892',
                'line-opacity': 1,
                'line-width': {
                    base: 1.2,
                    stops: [
                        [13.5, 0],
                        [14, 2.5],
                        [20, 11.5],
                    ],
                },
            },
        },
        {
            id: 'tunnel-secondary-tertiary',
            type: 'line',
            metadata: { 'mapbox:group': '1444849354174.1904' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'tunnel'], ['in', 'class', 'secondary', 'tertiary']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#fb70a2',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [6.5, 0],
                        [7, 0.5],
                        [20, 10],
                    ],
                },
            },
        },
        {
            id: 'tunnel-trunk-primary',
            type: 'line',
            metadata: { 'mapbox:group': '1444849354174.1904' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'tunnel'], ['in', 'class', 'primary', 'trunk']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#F92672',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [6.5, 0],
                        [7, 0.5],
                        [20, 18],
                    ],
                },
            },
        },
        {
            id: 'tunnel-motorway',
            type: 'line',
            metadata: { 'mapbox:group': '1444849354174.1904' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'tunnel'], ['==', 'class', 'motorway']],
            layout: { 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': 'rgba(249,38,114,0.8)',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [6.5, 0],
                        [7, 0.5],
                        [20, 18],
                    ],
                },
            },
        },
        {
            id: 'tunnel-railway',
            type: 'line',
            metadata: { 'mapbox:group': '1444849354174.1904' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'tunnel'], ['==', 'class', 'rail']],
            paint: {
                'line-color': '#b40544',
                'line-width': {
                    base: 1.4,
                    stops: [
                        [14, 0.4],
                        [15, 0.75],
                        [20, 2],
                    ],
                },
                'line-dasharray': [2, 2],
            },
        },
        {
            id: 'aeroway-taxiway-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'aeroway',
            minzoom: 12,
            filter: ['all', ['in', 'class', 'taxiway']],
            layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': '#b40544',
                'line-width': {
                    base: 1.5,
                    stops: [
                        [11, 2],
                        [17, 12],
                    ],
                },
                'line-opacity': 1,
            },
        },
        {
            id: 'aeroway-runway-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'aeroway',
            minzoom: 12,
            filter: ['all', ['in', 'class', 'runway']],
            layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': '#b40544',
                'line-width': {
                    base: 1.5,
                    stops: [
                        [11, 5],
                        [17, 55],
                    ],
                },
                'line-opacity': 1,
            },
        },
        {
            id: 'aeroway-area',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'aeroway',
            minzoom: 4,
            filter: ['all', ['==', '$type', 'Polygon'], ['in', 'class', 'runway', 'taxiway']],
            layout: { visibility: 'visible' },
            paint: {
                'fill-opacity': {
                    base: 1,
                    stops: [
                        [13, 0],
                        [14, 1],
                    ],
                },
                'fill-color': 'rgba(249,38,114,0.5)',
            },
        },
        {
            id: 'aeroway-taxiway',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'aeroway',
            minzoom: 4,
            filter: ['all', ['in', 'class', 'taxiway'], ['==', '$type', 'LineString']],
            layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': '#fb70a2',
                'line-width': {
                    base: 1.5,
                    stops: [
                        [11, 1],
                        [17, 10],
                    ],
                },
                'line-opacity': {
                    base: 1,
                    stops: [
                        [11, 0],
                        [12, 1],
                    ],
                },
            },
        },
        {
            id: 'aeroway-runway',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'aeroway',
            minzoom: 4,
            filter: ['all', ['in', 'class', 'runway'], ['==', '$type', 'LineString']],
            layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': '#fb70a2',
                'line-width': {
                    base: 1.5,
                    stops: [
                        [11, 4],
                        [17, 50],
                    ],
                },
                'line-opacity': {
                    base: 1,
                    stops: [
                        [11, 0],
                        [12, 1],
                    ],
                },
            },
        },
        {
            id: 'highway-area',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['==', '$type', 'Polygon'],
            layout: { visibility: 'visible' },
            paint: {
                'fill-color': '#e60657',
                'fill-outline-color': '#cfcdca',
                'fill-opacity': 0.9,
                'fill-antialias': false,
            },
        },
        {
            id: 'highway-motorway-link-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            minzoom: 12,
            filter: ['all', ['!in', 'brunnel', 'bridge', 'tunnel'], ['==', 'class', 'motorway_link']],
            layout: { 'line-cap': 'round', 'line-join': 'round' },
            paint: {
                'line-color': '#F92672',
                'line-opacity': 1,
                'line-width': {
                    base: 1.2,
                    stops: [
                        [12, 1],
                        [13, 3],
                        [14, 4],
                        [20, 15],
                    ],
                },
            },
        },
        {
            id: 'highway-link-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            minzoom: 13,
            filter: [
                'all',
                ['!in', 'brunnel', 'bridge', 'tunnel'],
                ['in', 'class', 'primary_link', 'secondary_link', 'tertiary_link', 'trunk_link'],
            ],
            layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': '#F92672',
                'line-opacity': 1,
                'line-width': {
                    base: 1.2,
                    stops: [
                        [12, 1],
                        [13, 3],
                        [14, 4],
                        [20, 15],
                    ],
                },
            },
        },
        {
            id: 'highway-minor-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['==', '$type', 'LineString'],
                ['all', ['!=', 'brunnel', 'tunnel'], ['in', 'class', 'minor', 'service', 'track']],
            ],
            layout: { 'line-cap': 'round', 'line-join': 'round' },
            paint: {
                'line-color': 'rgba(249,38,114,0.8)',
                'line-opacity': {
                    stops: [
                        [12, 0],
                        [12.5, 1],
                    ],
                },
                'line-width': {
                    base: 1.2,
                    stops: [
                        [12, 0.5],
                        [13, 1],
                        [14, 4],
                        [20, 15],
                    ],
                },
            },
        },
        {
            id: 'highway-secondary-tertiary-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['!in', 'brunnel', 'bridge', 'tunnel'],
                ['in', 'class', 'secondary', 'tertiary'],
            ],
            layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': '#F92672',
                'line-opacity': 1,
                'line-width': {
                    base: 1.2,
                    stops: [
                        [8, 1.5],
                        [20, 17],
                    ],
                },
            },
        },
        {
            id: 'highway-primary-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            minzoom: 5,
            filter: ['all', ['!in', 'brunnel', 'bridge', 'tunnel'], ['in', 'class', 'primary']],
            layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': '#F92672',
                'line-opacity': {
                    stops: [
                        [7, 0],
                        [8, 1],
                    ],
                },
                'line-width': {
                    base: 1.2,
                    stops: [
                        [7, 0],
                        [8, 0.6],
                        [9, 1.5],
                        [20, 22],
                    ],
                },
            },
        },
        {
            id: 'highway-trunk-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            minzoom: 5,
            filter: ['all', ['!in', 'brunnel', 'bridge', 'tunnel'], ['in', 'class', 'trunk']],
            layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': '#F92672',
                'line-opacity': {
                    stops: [
                        [5, 0],
                        [6, 1],
                    ],
                },
                'line-width': {
                    base: 1.2,
                    stops: [
                        [5, 0],
                        [6, 0.6],
                        [7, 1.5],
                        [20, 22],
                    ],
                },
            },
        },
        {
            id: 'highway-motorway-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            minzoom: 4,
            filter: ['all', ['!in', 'brunnel', 'bridge', 'tunnel'], ['==', 'class', 'motorway']],
            layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': '#F92672',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [4, 0],
                        [5, 0.4],
                        [6, 0.6],
                        [7, 1.5],
                        [20, 22],
                    ],
                },
                'line-opacity': {
                    stops: [
                        [4, 0],
                        [5, 1],
                    ],
                },
            },
        },
        {
            id: 'highway-path',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['==', '$type', 'LineString'],
                ['all', ['!in', 'brunnel', 'bridge', 'tunnel'], ['==', 'class', 'path']],
            ],
            paint: {
                'line-color': '#F8F8F2',
                'line-dasharray': [1.5, 0.75],
                'line-width': {
                    base: 1.2,
                    stops: [
                        [15, 1.2],
                        [20, 4],
                    ],
                },
            },
        },
        {
            id: 'highway-motorway-link',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            minzoom: 12,
            filter: ['all', ['!in', 'brunnel', 'bridge', 'tunnel'], ['==', 'class', 'motorway_link']],
            layout: { 'line-cap': 'round', 'line-join': 'round' },
            paint: {
                'line-color': '#f92672',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [12.5, 0],
                        [13, 1.5],
                        [14, 2.5],
                        [20, 11.5],
                    ],
                },
            },
        },
        {
            id: 'highway-link',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            minzoom: 13,
            filter: [
                'all',
                ['!in', 'brunnel', 'bridge', 'tunnel'],
                ['in', 'class', 'primary_link', 'secondary_link', 'tertiary_link', 'trunk_link'],
            ],
            layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': '#F92672',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [12.5, 0],
                        [13, 1.5],
                        [14, 2.5],
                        [20, 11.5],
                    ],
                },
            },
        },
        {
            id: 'highway-minor',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['==', '$type', 'LineString'],
                ['all', ['!=', 'brunnel', 'tunnel'], ['in', 'class', 'minor', 'service', 'track']],
            ],
            layout: { 'line-cap': 'round', 'line-join': 'round' },
            paint: {
                'line-color': '#fc89b2',
                'line-opacity': 1,
                'line-width': {
                    base: 1.2,
                    stops: [
                        [13.5, 0],
                        [14, 2.5],
                        [20, 11.5],
                    ],
                },
            },
        },
        {
            id: 'highway-secondary-tertiary',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['!in', 'brunnel', 'bridge', 'tunnel'],
                ['in', 'class', 'secondary', 'tertiary'],
            ],
            layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': '#F92672',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [6.5, 0],
                        [8, 0.5],
                        [20, 13],
                    ],
                },
            },
        },
        {
            id: 'highway-primary',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['==', '$type', 'LineString'],
                ['all', ['!in', 'brunnel', 'bridge', 'tunnel'], ['in', 'class', 'primary']],
            ],
            layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': '#F92672',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [8.5, 0],
                        [9, 0.5],
                        [20, 18],
                    ],
                },
            },
        },
        {
            id: 'highway-trunk',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['==', '$type', 'LineString'],
                ['all', ['!in', 'brunnel', 'bridge', 'tunnel'], ['in', 'class', 'trunk']],
            ],
            layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': '#F92672',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [6.5, 0],
                        [7, 0.5],
                        [20, 18],
                    ],
                },
            },
        },
        {
            id: 'highway-motorway',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            minzoom: 5,
            filter: [
                'all',
                ['==', '$type', 'LineString'],
                ['all', ['!in', 'brunnel', 'bridge', 'tunnel'], ['==', 'class', 'motorway']],
            ],
            layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': '#f92672',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [6.5, 0],
                        [7, 0.5],
                        [20, 18],
                    ],
                },
            },
        },
        {
            id: 'railway-service',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['==', '$type', 'LineString'],
                ['all', ['==', 'class', 'rail'], ['has', 'service']],
            ],
            paint: {
                'line-color': 'rgba(18,5,68,0.7)',
                'line-width': {
                    base: 1.4,
                    stops: [
                        [14, 0.4],
                        [20, 1],
                    ],
                },
            },
        },
        {
            id: 'railway-service-hatching',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['==', '$type', 'LineString'],
                ['all', ['==', 'class', 'rail'], ['has', 'service']],
            ],
            layout: { visibility: 'visible' },
            paint: {
                'line-color': 'rgba(18,5,68,0.7)',
                'line-dasharray': [0.2, 8],
                'line-width': {
                    base: 1.4,
                    stops: [
                        [14.5, 0],
                        [15, 2],
                        [20, 6],
                    ],
                },
            },
        },
        {
            id: 'railway',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['==', '$type', 'LineString'],
                [
                    'all',
                    ['!has', 'service'],
                    ['!in', 'brunnel', 'bridge', 'tunnel'],
                    ['==', 'class', 'rail'],
                ],
            ],
            paint: {
                'line-color': '#b40544',
                'line-width': {
                    base: 1.4,
                    stops: [
                        [14, 0.4],
                        [15, 0.75],
                        [20, 2],
                    ],
                },
            },
        },
        {
            id: 'railway-hatching',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['==', '$type', 'LineString'],
                [
                    'all',
                    ['!has', 'service'],
                    ['!in', 'brunnel', 'bridge', 'tunnel'],
                    ['==', 'class', 'rail'],
                ],
            ],
            paint: {
                'line-color': '#b40544',
                'line-dasharray': [0.2, 8],
                'line-width': {
                    base: 1.4,
                    stops: [
                        [14.5, 0],
                        [15, 3],
                        [20, 8],
                    ],
                },
            },
        },
        {
            id: 'bridge-motorway-link-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849334699.1902' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'bridge'], ['==', 'class', 'motorway_link']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#F92672',
                'line-opacity': 1,
                'line-width': {
                    base: 1.2,
                    stops: [
                        [12, 1],
                        [13, 3],
                        [14, 4],
                        [20, 15],
                    ],
                },
            },
        },
        {
            id: 'bridge-link-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849334699.1902' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['==', 'brunnel', 'bridge'],
                ['in', 'class', 'primary_link', 'secondary_link', 'tertiary_link', 'trunk_link'],
            ],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#F92672',
                'line-opacity': 1,
                'line-width': {
                    base: 1.2,
                    stops: [
                        [12, 1],
                        [13, 3],
                        [14, 4],
                        [20, 15],
                    ],
                },
            },
        },
        {
            id: 'bridge-secondary-tertiary-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849334699.1902' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'bridge'], ['in', 'class', 'secondary', 'tertiary']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#F92672',
                'line-opacity': 1,
                'line-width': {
                    base: 1.2,
                    stops: [
                        [8, 1.5],
                        [20, 28],
                    ],
                },
            },
        },
        {
            id: 'bridge-trunk-primary-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849334699.1902' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'bridge'], ['in', 'class', 'primary', 'trunk']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#F92672',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [5, 0.4],
                        [6, 0.6],
                        [7, 1.5],
                        [20, 26],
                    ],
                },
            },
        },
        {
            id: 'bridge-motorway-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849334699.1902' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'bridge'], ['==', 'class', 'motorway']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#F92672',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [5, 0.4],
                        [6, 0.6],
                        [7, 1.5],
                        [20, 22],
                    ],
                },
            },
        },
        {
            id: 'bridge-path-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849334699.1902' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['==', '$type', 'LineString'],
                ['all', ['==', 'brunnel', 'bridge'], ['==', 'class', 'path']],
            ],
            paint: {
                'line-color': '#fa5892',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [15, 1.2],
                        [20, 18],
                    ],
                },
            },
        },
        {
            id: 'bridge-path',
            type: 'line',
            metadata: { 'mapbox:group': '1444849334699.1902' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['==', '$type', 'LineString'],
                ['all', ['==', 'brunnel', 'bridge'], ['==', 'class', 'path']],
            ],
            paint: {
                'line-color': '#F8F8F2',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [15, 1.2],
                        [20, 4],
                    ],
                },
                'line-dasharray': [1.5, 0.75],
            },
        },
        {
            id: 'bridge-motorway-link',
            type: 'line',
            metadata: { 'mapbox:group': '1444849334699.1902' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'bridge'], ['==', 'class', 'motorway_link']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#f92672',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [12.5, 0],
                        [13, 1.5],
                        [14, 2.5],
                        [20, 11.5],
                    ],
                },
            },
        },
        {
            id: 'bridge-link',
            type: 'line',
            metadata: { 'mapbox:group': '1444849334699.1902' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['==', 'brunnel', 'bridge'],
                ['in', 'class', 'primary_link', 'secondary_link', 'tertiary_link', 'trunk_link'],
            ],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#F92672',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [12.5, 0],
                        [13, 1.5],
                        [14, 2.5],
                        [20, 11.5],
                    ],
                },
            },
        },
        {
            id: 'bridge-secondary-tertiary',
            type: 'line',
            metadata: { 'mapbox:group': '1444849334699.1902' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'bridge'], ['in', 'class', 'secondary', 'tertiary']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#F92672',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [6.5, 0],
                        [7, 0.5],
                        [20, 20],
                    ],
                },
            },
        },
        {
            id: 'bridge-trunk-primary',
            type: 'line',
            metadata: { 'mapbox:group': '1444849334699.1902' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'bridge'], ['in', 'class', 'primary', 'trunk']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#F92672',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [6.5, 0],
                        [7, 0.5],
                        [20, 18],
                    ],
                },
            },
        },
        {
            id: 'bridge-motorway',
            type: 'line',
            metadata: { 'mapbox:group': '1444849334699.1902' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'bridge'], ['==', 'class', 'motorway']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#f92672',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [6.5, 0],
                        [7, 0.5],
                        [20, 18],
                    ],
                },
            },
        },
        {
            id: 'bridge-railway',
            type: 'line',
            metadata: { 'mapbox:group': '1444849334699.1902' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'bridge'], ['==', 'class', 'rail']],
            paint: {
                'line-color': '#b40544',
                'line-width': {
                    base: 1.4,
                    stops: [
                        [14, 0.4],
                        [15, 0.75],
                        [20, 2],
                    ],
                },
            },
        },
        {
            id: 'bridge-railway-hatching',
            type: 'line',
            metadata: { 'mapbox:group': '1444849334699.1902' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'bridge'], ['==', 'class', 'rail']],
            paint: {
                'line-color': '#b40544',
                'line-dasharray': [0.2, 8],
                'line-width': {
                    base: 1.4,
                    stops: [
                        [14.5, 0],
                        [15, 3],
                        [20, 8],
                    ],
                },
            },
        },
        {
            id: 'boundary-land-level-4',
            type: 'line',
            source: 'openmaptiles',
            'source-layer': 'boundary',
            filter: ['all', ['in', 'admin_level', 4, 6, 8], ['!=', 'maritime', 1]],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#E69F66',
                'line-dasharray': [3, 1, 1, 1],
                'line-width': {
                    base: 1.4,
                    stops: [
                        [4, 0.4],
                        [5, 1],
                        [12, 3],
                    ],
                },
            },
        },
        {
            id: 'boundary-land-level-2',
            type: 'line',
            source: 'openmaptiles',
            'source-layer': 'boundary',
            filter: ['all', ['==', 'admin_level', 2], ['!=', 'maritime', 1]],
            layout: { 'line-cap': 'round', 'line-join': 'round' },
            paint: {
                'line-color': '#E69F66',
                'line-width': {
                    base: 1,
                    stops: [
                        [0, 0.6],
                        [4, 1.4],
                        [5, 2],
                        [12, 8],
                    ],
                },
            },
        },
        {
            id: 'boundary-water',
            type: 'line',
            source: 'openmaptiles',
            'source-layer': 'boundary',
            filter: ['all', ['in', 'admin_level', 2, 4], ['==', 'maritime', 1]],
            layout: { 'line-cap': 'round', 'line-join': 'round' },
            paint: {
                'line-color': '#66D9EF',
                'line-width': {
                    base: 1,
                    stops: [
                        [0, 0.6],
                        [4, 1.4],
                        [5, 2],
                        [12, 8],
                    ],
                },
                'line-opacity': {
                    stops: [
                        [6, 0.6],
                        [10, 1],
                    ],
                },
            },
        },
        {
            id: 'waterway-name',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'waterway',
            minzoom: 13,
            filter: ['all', ['==', '$type', 'LineString'], ['has', 'name'], ['!has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Italic'],
                'text-size': 14,
                'text-field': '{name:latin} {name:nonlatin}',
                'text-max-width': 5,
                'text-rotation-alignment': 'map',
                'symbol-placement': 'line',
                'text-letter-spacing': 0.2,
                'symbol-spacing': 350,
            },
            paint: { 'text-color': '#fefefe', 'text-halo-width': 1.5, 'text-halo-color': '#74aee9' },
        },
        {
            id: 'waterway-name-en',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'waterway',
            minzoom: 13,
            filter: ['all', ['==', '$type', 'LineString'], ['has', 'name'], ['has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Italic'],
                'text-size': 14,
                'text-field': '{name:de} {name:nonlatin}',
                'text-max-width': 5,
                'text-rotation-alignment': 'map',
                'symbol-placement': 'line',
                'text-letter-spacing': 0.2,
                'symbol-spacing': 350,
            },
            paint: { 'text-color': '#fefefe', 'text-halo-width': 1.5, 'text-halo-color': '#74aee9' },
        },
        {
            id: 'water-name-lakeline',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'water_name',
            filter: ['all', ['==', '$type', 'LineString'], ['!has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Italic'],
                'text-size': 14,
                'text-field': '{name:latin} {name:nonlatin}',
                'text-max-width': 5,
                'text-rotation-alignment': 'map',
                'symbol-placement': 'line',
                'symbol-spacing': 350,
                'text-letter-spacing': 0.2,
            },
            paint: { 'text-color': '#fefefe', 'text-halo-width': 1.5, 'text-halo-color': '#74aee9' },
        },
        {
            id: 'water-name-lakeline-en',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'water_name',
            filter: ['all', ['==', '$type', 'LineString'], ['has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Italic'],
                'text-size': 14,
                'text-field': '{name:de} {name:nonlatin}',
                'text-max-width': 5,
                'text-rotation-alignment': 'map',
                'symbol-placement': 'line',
                'symbol-spacing': 350,
                'text-letter-spacing': 0.2,
            },
            paint: { 'text-color': '#fefefe', 'text-halo-width': 1.5, 'text-halo-color': '#74aee9' },
        },
        {
            id: 'water-name-ocean',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'water_name',
            filter: ['all', ['==', '$type', 'Point'], ['==', 'class', 'ocean'], ['!has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Italic'],
                'text-size': 14,
                'text-field': '{name:latin}\n{name:nonlatin}',
                'text-max-width': 5,
                'text-rotation-alignment': 'map',
                'symbol-placement': 'point',
                'symbol-spacing': 350,
                'text-letter-spacing': 0.2,
            },
            paint: { 'text-color': '#fefefe', 'text-halo-width': 1.5, 'text-halo-color': '#74aee9' },
        },
        {
            id: 'water-name-ocean-en',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'water_name',
            filter: ['all', ['==', '$type', 'Point'], ['==', 'class', 'ocean'], ['has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Italic'],
                'text-size': 14,
                'text-field': '{name:de}\n{name:nonlatin}',
                'text-max-width': 5,
                'text-rotation-alignment': 'map',
                'symbol-placement': 'point',
                'symbol-spacing': 350,
                'text-letter-spacing': 0.2,
            },
            paint: { 'text-color': '#fefefe', 'text-halo-width': 1.5, 'text-halo-color': '#74aee9' },
        },
        {
            id: 'water-name-other',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'water_name',
            filter: ['all', ['==', '$type', 'Point'], ['!in', 'class', 'ocean'], ['!has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Italic'],
                'text-size': {
                    stops: [
                        [0, 10],
                        [6, 14],
                    ],
                },
                'text-field': '{name:latin}\n{name:nonlatin}',
                'text-max-width': 5,
                'text-rotation-alignment': 'map',
                'symbol-placement': 'point',
                'symbol-spacing': 350,
                'text-letter-spacing': 0.2,
                visibility: 'visible',
            },
            paint: { 'text-color': '#fefefe', 'text-halo-width': 1.5, 'text-halo-color': '#74aee9' },
        },
        {
            id: 'water-name-other-en',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'water_name',
            filter: ['all', ['==', '$type', 'Point'], ['!in', 'class', 'ocean'], ['has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Italic'],
                'text-size': {
                    stops: [
                        [0, 10],
                        [6, 14],
                    ],
                },
                'text-field': '{name:de}\n{name:nonlatin}',
                'text-max-width': 5,
                'text-rotation-alignment': 'map',
                'symbol-placement': 'point',
                'symbol-spacing': 350,
                'text-letter-spacing': 0.2,
                visibility: 'visible',
            },
            paint: { 'text-color': '#fefefe', 'text-halo-width': 1.5, 'text-halo-color': '#74aee9' },
        },
        {
            id: 'poi-level-3',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'poi',
            minzoom: 16,
            filter: ['all', ['==', '$type', 'Point'], ['>=', 'rank', 25], ['!has', 'name:de']],
            layout: {
                'text-padding': 2,
                'text-font': ['Open Sans Semibold'],
                'text-anchor': 'top',
                'icon-image': '{class}_11',
                'text-field': '{name:latin}\n{name:nonlatin}',
                'text-offset': [0, 0.6],
                'text-size': 12,
                'text-max-width': 9,
            },
            paint: {
                'text-halo-blur': 0.5,
                'text-color': '#fdfdfd',
                'text-halo-width': 1,
                'text-halo-color': '#633',
            },
        },
        {
            id: 'poi-level-3-en',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'poi',
            minzoom: 16,
            filter: ['all', ['==', '$type', 'Point'], ['>=', 'rank', 25], ['has', 'name:de']],
            layout: {
                'text-padding': 2,
                'text-font': ['Open Sans Semibold'],
                'text-anchor': 'top',
                'icon-image': '{class}_11',
                'text-field': '{name:de}\n{name:nonlatin}',
                'text-offset': [0, 0.6],
                'text-size': 12,
                'text-max-width': 9,
            },
            paint: {
                'text-halo-blur': 0.5,
                'text-color': '#fdfdfd',
                'text-halo-width': 1,
                'text-halo-color': '#633',
            },
        },
        {
            id: 'poi-level-2',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'poi',
            minzoom: 15,
            filter: [
                'all',
                ['==', '$type', 'Point'],
                ['all', ['<=', 'rank', 24], ['>=', 'rank', 15]],
                ['!has', 'name:de'],
            ],
            layout: {
                'text-padding': 2,
                'text-font': ['Open Sans Semibold'],
                'text-anchor': 'top',
                'icon-image': '{class}_11',
                'text-field': '{name:latin}\n{name:nonlatin}',
                'text-offset': [0, 0.6],
                'text-size': 12,
                'text-max-width': 9,
            },
            paint: {
                'text-halo-blur': 0.5,
                'text-color': '#fdfdfd',
                'text-halo-width': 1,
                'text-halo-color': '#633',
            },
        },
        {
            id: 'poi-level-2-en',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'poi',
            minzoom: 15,
            filter: [
                'all',
                ['==', '$type', 'Point'],
                ['all', ['<=', 'rank', 24], ['>=', 'rank', 15]],
                ['has', 'name:de'],
            ],
            layout: {
                'text-padding': 2,
                'text-font': ['Open Sans Semibold'],
                'text-anchor': 'top',
                'icon-image': '{class}_11',
                'text-field': '{name:de}\n{name:nonlatin}',
                'text-offset': [0, 0.6],
                'text-size': 12,
                'text-max-width': 9,
            },
            paint: {
                'text-halo-blur': 0.5,
                'text-color': '#fdfdfd',
                'text-halo-width': 1,
                'text-halo-color': '#633',
            },
        },
        {
            id: 'poi-level-1',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'poi',
            minzoom: 14,
            filter: [
                'all',
                ['==', '$type', 'Point'],
                ['all', ['<=', 'rank', 14], ['has', 'name']],
                ['!has', 'name:de'],
            ],
            layout: {
                'text-padding': 2,
                'text-font': ['Open Sans Semibold'],
                'text-anchor': 'top',
                'icon-image': '{class}_11',
                'text-field': '{name:latin}\n{name:nonlatin}',
                'text-offset': [0, 0.6],
                'text-size': 12,
                'text-max-width': 9,
            },
            paint: {
                'text-halo-blur': 0.5,
                'text-color': '#fdfdfd',
                'text-halo-width': 1,
                'text-halo-color': '#633',
            },
        },
        {
            id: 'poi-level-1-en',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'poi',
            minzoom: 14,
            filter: [
                'all',
                ['==', '$type', 'Point'],
                ['all', ['<=', 'rank', 14], ['has', 'name']],
                ['has', 'name:de'],
            ],
            layout: {
                'text-padding': 2,
                'text-font': ['Open Sans Semibold'],
                'text-anchor': 'top',
                'icon-image': '{class}_11',
                'text-field': '{name:de}\n{name:nonlatin}',
                'text-offset': [0, 0.6],
                'text-size': 12,
                'text-max-width': 9,
            },
            paint: {
                'text-halo-blur': 0.5,
                'text-color': '#fdfdfd',
                'text-halo-width': 1,
                'text-halo-color': '#633',
            },
        },
        {
            id: 'highway-name-path',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'transportation_name',
            minzoom: 15.5,
            filter: ['all', ['==', 'class', 'path'], ['!has', 'name:de']],
            layout: {
                'text-size': {
                    base: 1,
                    stops: [
                        [13, 12],
                        [14, 13],
                    ],
                },
                'text-font': ['Open Sans Regular'],
                'text-field': '{name:latin} {name:nonlatin}',
                'symbol-placement': 'line',
                'text-rotation-alignment': 'map',
            },
            paint: {
                'text-halo-color': '#f8f4f0',
                'text-color': 'hsl(30, 23%, 62%)',
                'text-halo-width': 0.5,
            },
        },
        {
            id: 'highway-name-path-en',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'transportation_name',
            minzoom: 15.5,
            filter: ['all', ['==', 'class', 'path'], ['has', 'name:de']],
            layout: {
                'text-size': {
                    base: 1,
                    stops: [
                        [13, 12],
                        [14, 13],
                    ],
                },
                'text-font': ['Open Sans Regular'],
                'text-field': '{name:de} {name:nonlatin}',
                'symbol-placement': 'line',
                'text-rotation-alignment': 'map',
            },
            paint: {
                'text-halo-color': '#f8f4f0',
                'text-color': 'hsl(30, 23%, 62%)',
                'text-halo-width': 0.5,
            },
        },
        {
            id: 'highway-name-minor',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'transportation_name',
            minzoom: 15,
            filter: [
                'all',
                ['==', '$type', 'LineString'],
                ['in', 'class', 'minor', 'service', 'track'],
                ['!has', 'name:de'],
            ],
            layout: {
                'text-size': {
                    base: 1,
                    stops: [
                        [13, 12],
                        [14, 13],
                    ],
                },
                'text-font': ['Open Sans Regular'],
                'text-field': '{name:latin} {name:nonlatin}',
                'symbol-placement': 'line',
                'text-rotation-alignment': 'map',
            },
            paint: { 'text-halo-blur': 0.5, 'text-color': '#765', 'text-halo-width': 1 },
        },
        {
            id: 'highway-name-minor-en',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'transportation_name',
            minzoom: 15,
            filter: [
                'all',
                ['==', '$type', 'LineString'],
                ['in', 'class', 'minor', 'service', 'track'],
                ['has', 'name:de'],
            ],
            layout: {
                'text-size': {
                    base: 1,
                    stops: [
                        [13, 12],
                        [14, 13],
                    ],
                },
                'text-font': ['Open Sans Regular'],
                'text-field': '{name:de} {name:nonlatin}',
                'symbol-placement': 'line',
                'text-rotation-alignment': 'map',
            },
            paint: { 'text-halo-blur': 0.5, 'text-color': '#765', 'text-halo-width': 1 },
        },
        {
            id: 'highway-name-major',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'transportation_name',
            minzoom: 12.2,
            filter: [
                'all',
                ['in', 'class', 'primary', 'secondary', 'tertiary', 'trunk'],
                ['!has', 'name:de'],
            ],
            layout: {
                'text-size': {
                    base: 1,
                    stops: [
                        [13, 12],
                        [14, 13],
                    ],
                },
                'text-font': ['Open Sans Regular'],
                'text-field': '{name:latin} {name:nonlatin}',
                'symbol-placement': 'line',
                'text-rotation-alignment': 'map',
            },
            paint: { 'text-halo-blur': 0.5, 'text-color': '#765', 'text-halo-width': 1 },
        },
        {
            id: 'highway-name-major-en',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'transportation_name',
            minzoom: 12.2,
            filter: [
                'all',
                ['in', 'class', 'primary', 'secondary', 'tertiary', 'trunk'],
                ['has', 'name:de'],
            ],
            layout: {
                'text-size': {
                    base: 1,
                    stops: [
                        [13, 12],
                        [14, 13],
                    ],
                },
                'text-font': ['Open Sans Regular'],
                'text-field': '{name:de} {name:nonlatin}',
                'symbol-placement': 'line',
                'text-rotation-alignment': 'map',
            },
            paint: { 'text-halo-blur': 0.5, 'text-color': '#765', 'text-halo-width': 1 },
        },
        {
            id: 'highway-shield',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'transportation_name',
            minzoom: 8,
            filter: [
                'all',
                ['<=', 'ref_length', 6],
                ['==', '$type', 'LineString'],
                ['!in', 'network', 'us-interstate', 'us-highway', 'us-state'],
            ],
            layout: {
                'text-size': 10,
                'icon-image': 'road_{ref_length}',
                'icon-rotation-alignment': 'viewport',
                'symbol-spacing': 200,
                'text-font': ['Open Sans Semibold'],
                'symbol-placement': {
                    base: 1,
                    stops: [
                        [10, 'point'],
                        [11, 'line'],
                    ],
                },
                'text-rotation-alignment': 'viewport',
                'icon-size': 1,
                'text-field': '{ref}',
            },
            paint: {},
        },
        {
            id: 'highway-shield-us-interstate',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'transportation_name',
            minzoom: 7,
            filter: [
                'all',
                ['<=', 'ref_length', 6],
                ['==', '$type', 'LineString'],
                ['in', 'network', 'us-interstate'],
            ],
            layout: {
                'text-size': 10,
                'icon-image': '{network}_{ref_length}',
                'icon-rotation-alignment': 'viewport',
                'symbol-spacing': 200,
                'text-font': ['Open Sans Semibold'],
                'symbol-placement': {
                    base: 1,
                    stops: [
                        [7, 'point'],
                        [7, 'line'],
                        [8, 'line'],
                    ],
                },
                'text-rotation-alignment': 'viewport',
                'icon-size': 1,
                'text-field': '{ref}',
            },
            paint: { 'text-color': 'rgba(0, 0, 0, 1)' },
        },
        {
            id: 'highway-shield-us-other',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'transportation_name',
            minzoom: 9,
            filter: [
                'all',
                ['<=', 'ref_length', 6],
                ['==', '$type', 'LineString'],
                ['in', 'network', 'us-highway', 'us-state'],
            ],
            layout: {
                'text-size': 10,
                'icon-image': '{network}_{ref_length}',
                'icon-rotation-alignment': 'viewport',
                'symbol-spacing': 200,
                'text-font': ['Open Sans Semibold'],
                'symbol-placement': {
                    base: 1,
                    stops: [
                        [10, 'point'],
                        [11, 'line'],
                    ],
                },
                'text-rotation-alignment': 'viewport',
                'icon-size': 1,
                'text-field': '{ref}',
            },
            paint: { 'text-color': 'rgba(0, 0, 0, 1)' },
        },
        {
            id: 'place-other',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['!in', 'class', 'city', 'town', 'village'], ['!has', 'name:de']],
            layout: {
                'text-letter-spacing': 0.1,
                'text-size': {
                    base: 1.2,
                    stops: [
                        [12, 10],
                        [15, 14],
                    ],
                },
                'text-font': ['Open Sans Bold'],
                'text-field': '{name:latin}\n{name:nonlatin}',
                'text-transform': 'uppercase',
                'text-max-width': 9,
            },
            paint: { 'text-color': '#fdfdfd', 'text-halo-width': 1.2, 'text-halo-color': '#433' },
        },
        {
            id: 'place-other-en',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['!in', 'class', 'city', 'town', 'village'], ['has', 'name:de']],
            layout: {
                'text-letter-spacing': 0.1,
                'text-size': {
                    base: 1.2,
                    stops: [
                        [12, 10],
                        [15, 14],
                    ],
                },
                'text-font': ['Open Sans Bold'],
                'text-field': '{name:de}\n{name:nonlatin}',
                'text-transform': 'uppercase',
                'text-max-width': 9,
            },
            paint: { 'text-color': '#fdfdfd', 'text-halo-width': 1.2, 'text-halo-color': '#433' },
        },
        {
            id: 'place-village',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['==', 'class', 'village'], ['!has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Regular'],
                'text-size': {
                    base: 1.2,
                    stops: [
                        [10, 12],
                        [15, 22],
                    ],
                },
                'text-field': '{name:latin}\n{name:nonlatin}',
                'text-max-width': 8,
            },
            paint: { 'text-color': '#fdfdfd', 'text-halo-width': 1.2, 'text-halo-color': '#433' },
        },
        {
            id: 'place-village-en',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['==', 'class', 'village'], ['has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Regular'],
                'text-size': {
                    base: 1.2,
                    stops: [
                        [10, 12],
                        [15, 22],
                    ],
                },
                'text-field': '{name:de}\n{name:nonlatin}',
                'text-max-width': 8,
            },
            paint: { 'text-color': '#fdfdfd', 'text-halo-width': 1.2, 'text-halo-color': '#433' },
        },
        {
            id: 'place-town',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['==', 'class', 'town'], ['!has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Regular'],
                'text-size': {
                    base: 1.2,
                    stops: [
                        [10, 14],
                        [15, 24],
                    ],
                },
                'text-field': '{name:latin}\n{name:nonlatin}',
                'text-max-width': 8,
            },
            paint: { 'text-color': '#fdfdfd', 'text-halo-width': 1.2, 'text-halo-color': '#433' },
        },
        {
            id: 'place-town-en',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['==', 'class', 'town'], ['has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Regular'],
                'text-size': {
                    base: 1.2,
                    stops: [
                        [10, 14],
                        [15, 24],
                    ],
                },
                'text-field': '{name:de}\n{name:nonlatin}',
                'text-max-width': 8,
            },
            paint: { 'text-color': '#fdfdfd', 'text-halo-width': 1.2, 'text-halo-color': '#433' },
        },
        {
            id: 'place-city',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['!=', 'capital', 2], ['==', 'class', 'city'], ['!has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Semibold'],
                'text-size': {
                    base: 1.2,
                    stops: [
                        [7, 14],
                        [11, 24],
                    ],
                },
                'text-field': '{name:latin}\n{name:nonlatin}',
                'text-max-width': 8,
            },
            paint: { 'text-color': '#fdfdfd', 'text-halo-width': 1.2, 'text-halo-color': '#433' },
        },
        {
            id: 'place-city-en',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['!=', 'capital', 2], ['==', 'class', 'city'], ['has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Semibold'],
                'text-size': {
                    base: 1.2,
                    stops: [
                        [7, 14],
                        [11, 24],
                    ],
                },
                'text-field': '{name:de}\n{name:nonlatin}',
                'text-max-width': 8,
            },
            paint: { 'text-color': '#fdfdfd', 'text-halo-width': 1.2, 'text-halo-color': '#433' },
        },
        {
            id: 'place-city-capital',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['==', 'capital', 2], ['==', 'class', 'city'], ['!has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Semibold'],
                'text-size': {
                    base: 1.2,
                    stops: [
                        [7, 14],
                        [11, 24],
                    ],
                },
                'text-field': '{name:latin}\n{name:nonlatin}',
                'text-max-width': 8,
                'icon-image': 'star_11',
                'text-offset': [0.4, 0],
                'icon-size': 0.8,
                'text-anchor': 'left',
            },
            paint: { 'text-color': '#fdfdfd', 'text-halo-width': 1.2, 'text-halo-color': '#433' },
        },
        {
            id: 'place-city-capital-en',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['==', 'capital', 2], ['==', 'class', 'city'], ['has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Semibold'],
                'text-size': {
                    base: 1.2,
                    stops: [
                        [7, 14],
                        [11, 24],
                    ],
                },
                'text-field': '{name:de}\n{name:nonlatin}',
                'text-max-width': 8,
                'icon-image': 'star_11',
                'text-offset': [0.4, 0],
                'icon-size': 0.8,
                'text-anchor': 'left',
            },
            paint: { 'text-color': '#fdfdfd', 'text-halo-width': 1.2, 'text-halo-color': '#433' },
        },
        {
            id: 'place-country-3',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['==', 'class', 'country'], ['>=', 'rank', 3], ['!has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Bold'],
                'text-field': '{name:latin}\n{name:nonlatin}',
                'text-size': {
                    stops: [
                        [3, 11],
                        [7, 17],
                    ],
                },
                'text-transform': 'uppercase',
                'text-max-width': 6.25,
            },
            paint: {
                'text-halo-blur': 1,
                'text-color': '#fdfdfd',
                'text-halo-width': 2,
                'text-halo-color': '#433',
            },
        },
        {
            id: 'place-country-3-en',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['==', 'class', 'country'], ['>=', 'rank', 3], ['has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Bold'],
                'text-field': '{name:de}\n{name:nonlatin}',
                'text-size': {
                    stops: [
                        [3, 11],
                        [7, 17],
                    ],
                },
                'text-transform': 'uppercase',
                'text-max-width': 6.25,
            },
            paint: {
                'text-halo-blur': 1,
                'text-color': '#fdfdfd',
                'text-halo-width': 2,
                'text-halo-color': '#433',
            },
        },
        {
            id: 'place-country-2',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['==', 'class', 'country'], ['==', 'rank', 2], ['!has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Bold'],
                'text-field': '{name:latin}\n{name:nonlatin}',
                'text-size': {
                    stops: [
                        [2, 11],
                        [5, 17],
                    ],
                },
                'text-transform': 'uppercase',
                'text-max-width': 6.25,
            },
            paint: {
                'text-halo-blur': 1,
                'text-color': '#fdfdfd',
                'text-halo-width': 2,
                'text-halo-color': '#433',
            },
        },
        {
            id: 'place-country-2-en',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['==', 'class', 'country'], ['==', 'rank', 2], ['has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Bold'],
                'text-field': '{name:de}\n{name:nonlatin}',
                'text-size': {
                    stops: [
                        [2, 11],
                        [5, 17],
                    ],
                },
                'text-transform': 'uppercase',
                'text-max-width': 6.25,
            },
            paint: {
                'text-halo-blur': 1,
                'text-color': '#fdfdfd',
                'text-halo-width': 2,
                'text-halo-color': '#433',
            },
        },
        {
            id: 'place-country-1',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['==', 'class', 'country'], ['==', 'rank', 1], ['!has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Bold'],
                'text-field': '{name:latin}\n{name:nonlatin}',
                'text-size': {
                    stops: [
                        [1, 11],
                        [4, 17],
                    ],
                },
                'text-transform': 'uppercase',
                'text-max-width': 6.25,
            },
            paint: {
                'text-halo-blur': 1,
                'text-color': '#fdfdfd',
                'text-halo-width': 2,
                'text-halo-color': '#433',
            },
        },
        {
            id: 'place-country-1-en',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['==', 'class', 'country'], ['==', 'rank', 1], ['has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Bold'],
                'text-field': '{name:de}\n{name:nonlatin}',
                'text-size': {
                    stops: [
                        [1, 11],
                        [4, 17],
                    ],
                },
                'text-transform': 'uppercase',
                'text-max-width': 6.25,
            },
            paint: {
                'text-halo-blur': 1,
                'text-color': '#fdfdfd',
                'text-halo-width': 2,
                'text-halo-color': '#433',
            },
        },
        {
            id: 'place-continent',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            maxzoom: 1,
            filter: ['all', ['==', 'class', 'continent'], ['!has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Bold'],
                'text-field': '{name:latin}\n{name:nonlatin}',
                'text-size': 14,
                'text-max-width': 6.25,
                'text-transform': 'uppercase',
            },
            paint: {
                'text-halo-blur': 1,
                'text-color': '#fdfdfd',
                'text-halo-width': 2,
                'text-halo-color': '#433',
            },
        },
        {
            id: 'place-continent-en',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            maxzoom: 1,
            filter: ['all', ['==', 'class', 'continent'], ['has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Bold'],
                'text-field': '{name:de}\n{name:nonlatin}',
                'text-size': 14,
                'text-max-width': 6.25,
                'text-transform': 'uppercase',
            },
            paint: {
                'text-halo-blur': 1,
                'text-color': '#fdfdfd',
                'text-halo-width': 2,
                'text-halo-color': '#433',
            },
        },
    ],
};

var SolarizedStyle = {
    version: 8,
    name: 'Solarized',
    center: [8.542, 47.372],
    zoom: 11.6,
    bearing: 0,
    pitch: 0,
    sources: {
        openmaptiles: {
            type: 'vector',
            url: config.source_openmaptiles_url,
        },
    },
    sprite: config.sprite,
    glyphs: config.glyphs,
    layers: [
        { id: 'background', type: 'background', paint: { 'background-color': '#073642' } },
        {
            id: 'landcover-glacier',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849388993.3071' },
            source: 'openmaptiles',
            'source-layer': 'landcover',
            filter: ['==', 'subclass', 'glacier'],
            layout: { visibility: 'visible' },
            paint: {
                'fill-color': '#2aa198',
                'fill-opacity': {
                    base: 1,
                    stops: [
                        [0, 0.9],
                        [10, 0.3],
                    ],
                },
            },
        },
        {
            id: 'landuse-residential',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849388993.3071' },
            source: 'openmaptiles',
            'source-layer': 'landuse',
            filter: ['==', 'class', 'residential'],
            paint: { 'fill-color': '#657b83' },
        },
        {
            id: 'landuse-commercial',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849388993.3071' },
            source: 'openmaptiles',
            'source-layer': 'landuse',
            filter: ['all', ['==', '$type', 'Polygon'], ['==', 'class', 'commercial']],
            paint: { 'fill-color': '#74888f' },
        },
        {
            id: 'landuse-industrial',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849388993.3071' },
            source: 'openmaptiles',
            'source-layer': 'landuse',
            filter: ['all', ['==', '$type', 'Polygon'], ['==', 'class', 'industrial']],
            paint: { 'fill-color': '#84959c' },
        },
        {
            id: 'park',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849388993.3071' },
            source: 'openmaptiles',
            'source-layer': 'park',
            filter: ['==', '$type', 'Polygon'],
            paint: {
                'fill-color': '#859900',
                'fill-opacity': {
                    base: 1.8,
                    stops: [
                        [9, 0.5],
                        [12, 0.2],
                    ],
                },
            },
        },
        {
            id: 'park-outline',
            type: 'line',
            metadata: { 'mapbox:group': '1444849388993.3071' },
            source: 'openmaptiles',
            'source-layer': 'park',
            filter: ['==', '$type', 'Polygon'],
            layout: {},
            paint: { 'line-color': 'rgba(133,153,0,0.6)', 'line-dasharray': [3, 3] },
        },
        {
            id: 'landuse-cemetery',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849388993.3071' },
            source: 'openmaptiles',
            'source-layer': 'landuse',
            filter: ['==', 'class', 'cemetery'],
            paint: { 'fill-color': '#f2ff99' },
        },
        {
            id: 'landuse-hospital',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849388993.3071' },
            source: 'openmaptiles',
            'source-layer': 'landuse',
            filter: ['==', 'class', 'hospital'],
            paint: { 'fill-color': '#d30102' },
        },
        {
            id: 'landuse-school',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849388993.3071' },
            source: 'openmaptiles',
            'source-layer': 'landuse',
            filter: ['==', 'class', 'school'],
            paint: { 'fill-color': 'rgba(211,1,2,0.8)' },
        },
        {
            id: 'landuse-railway',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849388993.3071' },
            source: 'openmaptiles',
            'source-layer': 'landuse',
            filter: ['==', 'class', 'railway'],
            paint: { 'fill-color': 'rgba(58,63,144,0.4)' },
        },
        {
            id: 'landcover-wood',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849388993.3071' },
            source: 'openmaptiles',
            'source-layer': 'landcover',
            filter: ['==', 'class', 'wood'],
            paint: {
                'fill-color': '#2aa198',
                'fill-opacity': 0.1,
                'fill-outline-color': 'hsla(0, 0%, 0%, 0.03)',
                'fill-antialias': {
                    base: 1,
                    stops: [
                        [0, false],
                        [9, true],
                    ],
                },
            },
        },
        {
            id: 'landcover-grass',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849388993.3071' },
            source: 'openmaptiles',
            'source-layer': 'landcover',
            filter: ['==', 'class', 'grass'],
            paint: { 'fill-color': '#859900', 'fill-opacity': 1 },
        },
        {
            id: 'landcover-grass-park',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849388993.3071' },
            source: 'openmaptiles',
            'source-layer': 'park',
            filter: ['==', 'class', 'public_park'],
            paint: { 'fill-color': '#859900', 'fill-opacity': 0.8 },
        },
        {
            id: 'waterway-other',
            type: 'line',
            metadata: { 'mapbox:group': '1444849382550.77' },
            source: 'openmaptiles',
            'source-layer': 'waterway',
            filter: ['!in', 'class', 'canal', 'river', 'stream'],
            layout: { 'line-cap': 'round' },
            paint: {
                'line-color': '#268bd2',
                'line-width': {
                    base: 1.3,
                    stops: [
                        [13, 0.5],
                        [20, 2],
                    ],
                },
            },
        },
        {
            id: 'waterway-stream-canal',
            type: 'line',
            metadata: { 'mapbox:group': '1444849382550.77' },
            source: 'openmaptiles',
            'source-layer': 'waterway',
            filter: ['in', 'class', 'canal', 'stream'],
            layout: { 'line-cap': 'round' },
            paint: {
                'line-color': '#268bd2',
                'line-width': {
                    base: 1.3,
                    stops: [
                        [13, 0.5],
                        [20, 6],
                    ],
                },
            },
        },
        {
            id: 'waterway-river',
            type: 'line',
            metadata: { 'mapbox:group': '1444849382550.77' },
            source: 'openmaptiles',
            'source-layer': 'waterway',
            filter: ['==', 'class', 'river'],
            layout: { 'line-cap': 'round' },
            paint: {
                'line-color': '#268bd2',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [10, 0.8],
                        [20, 6],
                    ],
                },
            },
        },
        {
            id: 'water-offset',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849382550.77' },
            source: 'openmaptiles',
            'source-layer': 'water',
            maxzoom: 8,
            filter: ['==', '$type', 'Polygon'],
            layout: { visibility: 'visible' },
            paint: {
                'fill-opacity': 1,
                'fill-color': '#268bd2',
                'fill-translate': {
                    base: 1,
                    stops: [
                        [6, [2, 0]],
                        [8, [0, 0]],
                    ],
                },
            },
        },
        {
            id: 'water',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849382550.77' },
            source: 'openmaptiles',
            'source-layer': 'water',
            layout: { visibility: 'visible' },
            paint: { 'fill-color': '#1a6091' },
        },
        {
            id: 'water-pattern',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849382550.77' },
            source: 'openmaptiles',
            'source-layer': 'water',
            layout: { visibility: 'visible' },
            paint: { 'fill-translate': [0, 2.5], 'fill-pattern': 'wave' },
        },
        {
            id: 'landcover-ice-shelf',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849382550.77' },
            source: 'openmaptiles',
            'source-layer': 'landcover',
            filter: ['==', 'subclass', 'ice_shelf'],
            layout: { visibility: 'visible' },
            paint: {
                'fill-color': '#2aa198',
                'fill-opacity': {
                    base: 1,
                    stops: [
                        [0, 0.9],
                        [10, 0.3],
                    ],
                },
            },
        },
        {
            id: 'building',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849364238.8171' },
            source: 'openmaptiles',
            'source-layer': 'building',
            paint: { 'fill-color': '#eee8d5', 'fill-antialias': true },
        },
        {
            id: 'building-top',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849364238.8171' },
            source: 'openmaptiles',
            'source-layer': 'building',
            layout: { visibility: 'visible' },
            paint: {
                'fill-translate': {
                    base: 1,
                    stops: [
                        [14, [0, 0]],
                        [16, [-2, -2]],
                    ],
                },
                'fill-outline-color': '#dfdbd7',
                'fill-color': '#fdfcf9',
                'fill-opacity': {
                    base: 1,
                    stops: [
                        [13, 0],
                        [16, 1],
                    ],
                },
            },
        },
        {
            id: 'tunnel-service-track-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849354174.1904' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'tunnel'], ['in', 'class', 'service', 'track']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#6c71c4',
                'line-dasharray': [0.5, 0.25],
                'line-width': {
                    base: 1.2,
                    stops: [
                        [15, 1],
                        [16, 4],
                        [20, 11],
                    ],
                },
            },
        },
        {
            id: 'tunnel-minor-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849354174.1904' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'tunnel'], ['==', 'class', 'minor']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#6c71c4',
                'line-opacity': {
                    stops: [
                        [12, 0],
                        [12.5, 1],
                    ],
                },
                'line-width': {
                    base: 1.2,
                    stops: [
                        [12, 0.5],
                        [13, 1],
                        [14, 4],
                        [20, 15],
                    ],
                },
            },
        },
        {
            id: 'tunnel-secondary-tertiary-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849354174.1904' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'tunnel'], ['in', 'class', 'secondary', 'tertiary']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#d33682',
                'line-opacity': 1,
                'line-width': {
                    base: 1.2,
                    stops: [
                        [8, 1.5],
                        [20, 17],
                    ],
                },
            },
        },
        {
            id: 'tunnel-trunk-primary-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849354174.1904' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'tunnel'], ['in', 'class', 'primary', 'trunk']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#d33682',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [5, 0.4],
                        [6, 0.6],
                        [7, 1.5],
                        [20, 22],
                    ],
                },
            },
        },
        {
            id: 'tunnel-motorway-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849354174.1904' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'tunnel'], ['==', 'class', 'motorway']],
            layout: { 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': '#d33682',
                'line-dasharray': [0.5, 0.25],
                'line-width': {
                    base: 1.2,
                    stops: [
                        [5, 0.4],
                        [6, 0.6],
                        [7, 1.5],
                        [20, 22],
                    ],
                },
            },
        },
        {
            id: 'tunnel-path',
            type: 'line',
            metadata: { 'mapbox:group': '1444849354174.1904' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['==', '$type', 'LineString'],
                ['all', ['==', 'brunnel', 'tunnel'], ['==', 'class', 'path']],
            ],
            paint: {
                'line-color': '#9094d3',
                'line-dasharray': [1.5, 0.75],
                'line-width': {
                    base: 1.2,
                    stops: [
                        [15, 1.2],
                        [20, 4],
                    ],
                },
            },
        },
        {
            id: 'tunnel-service-track',
            type: 'line',
            metadata: { 'mapbox:group': '1444849354174.1904' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'tunnel'], ['in', 'class', 'service', 'track']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#9094d3',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [15.5, 0],
                        [16, 2],
                        [20, 7.5],
                    ],
                },
            },
        },
        {
            id: 'tunnel-minor',
            type: 'line',
            metadata: { 'mapbox:group': '1444849354174.1904' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'tunnel'], ['==', 'class', 'minor_road']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#9094d3',
                'line-opacity': 1,
                'line-width': {
                    base: 1.2,
                    stops: [
                        [13.5, 0],
                        [14, 2.5],
                        [20, 11.5],
                    ],
                },
            },
        },
        {
            id: 'tunnel-secondary-tertiary',
            type: 'line',
            metadata: { 'mapbox:group': '1444849354174.1904' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'tunnel'], ['in', 'class', 'secondary', 'tertiary']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#a3a6da',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [6.5, 0],
                        [7, 0.5],
                        [20, 10],
                    ],
                },
            },
        },
        {
            id: 'tunnel-trunk-primary',
            type: 'line',
            metadata: { 'mapbox:group': '1444849354174.1904' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'tunnel'], ['in', 'class', 'primary', 'trunk']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#6c71c4',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [6.5, 0],
                        [7, 0.5],
                        [20, 18],
                    ],
                },
            },
        },
        {
            id: 'tunnel-motorway',
            type: 'line',
            metadata: { 'mapbox:group': '1444849354174.1904' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'tunnel'], ['==', 'class', 'motorway']],
            layout: { 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': 'rgba(108,113,196,0.8)',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [6.5, 0],
                        [7, 0.5],
                        [20, 18],
                    ],
                },
            },
        },
        {
            id: 'tunnel-railway',
            type: 'line',
            metadata: { 'mapbox:group': '1444849354174.1904' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'tunnel'], ['==', 'class', 'rail']],
            paint: {
                'line-color': '#3a3f90',
                'line-width': {
                    base: 1.4,
                    stops: [
                        [14, 0.4],
                        [15, 0.75],
                        [20, 2],
                    ],
                },
                'line-dasharray': [2, 2],
            },
        },
        {
            id: 'aeroway-taxiway-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'aeroway',
            minzoom: 12,
            filter: ['all', ['in', 'class', 'taxiway']],
            layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': '#3a3f90',
                'line-width': {
                    base: 1.5,
                    stops: [
                        [11, 2],
                        [17, 12],
                    ],
                },
                'line-opacity': 1,
            },
        },
        {
            id: 'aeroway-runway-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'aeroway',
            minzoom: 12,
            filter: ['all', ['in', 'class', 'runway']],
            layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': '#3a3f90',
                'line-width': {
                    base: 1.5,
                    stops: [
                        [11, 5],
                        [17, 55],
                    ],
                },
                'line-opacity': 1,
            },
        },
        {
            id: 'aeroway-area',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'aeroway',
            minzoom: 4,
            filter: ['all', ['==', '$type', 'Polygon'], ['in', 'class', 'runway', 'taxiway']],
            layout: { visibility: 'visible' },
            paint: {
                'fill-opacity': {
                    base: 1,
                    stops: [
                        [13, 0],
                        [14, 1],
                    ],
                },
                'fill-color': 'rgba(108,113,196,0.5)',
            },
        },
        {
            id: 'aeroway-taxiway',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'aeroway',
            minzoom: 4,
            filter: ['all', ['in', 'class', 'taxiway'], ['==', '$type', 'LineString']],
            layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': '#a3a6da',
                'line-width': {
                    base: 1.5,
                    stops: [
                        [11, 1],
                        [17, 10],
                    ],
                },
                'line-opacity': {
                    base: 1,
                    stops: [
                        [11, 0],
                        [12, 1],
                    ],
                },
            },
        },
        {
            id: 'aeroway-runway',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'aeroway',
            minzoom: 4,
            filter: ['all', ['in', 'class', 'runway'], ['==', '$type', 'LineString']],
            layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': '#a3a6da',
                'line-width': {
                    base: 1.5,
                    stops: [
                        [11, 4],
                        [17, 50],
                    ],
                },
                'line-opacity': {
                    base: 1,
                    stops: [
                        [11, 0],
                        [12, 1],
                    ],
                },
            },
        },
        {
            id: 'highway-area',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['==', '$type', 'Polygon'],
            layout: { visibility: 'visible' },
            paint: {
                'fill-color': '#484fb5',
                'fill-outline-color': '#cfcdca',
                'fill-opacity': 0.9,
                'fill-antialias': false,
            },
        },
        {
            id: 'highway-motorway-link-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            minzoom: 12,
            filter: ['all', ['!in', 'brunnel', 'bridge', 'tunnel'], ['==', 'class', 'motorway_link']],
            layout: { 'line-cap': 'round', 'line-join': 'round' },
            paint: {
                'line-color': '#d33682',
                'line-opacity': 1,
                'line-width': {
                    base: 1.2,
                    stops: [
                        [12, 1],
                        [13, 3],
                        [14, 4],
                        [20, 15],
                    ],
                },
            },
        },
        {
            id: 'highway-link-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            minzoom: 13,
            filter: [
                'all',
                ['!in', 'brunnel', 'bridge', 'tunnel'],
                ['in', 'class', 'primary_link', 'secondary_link', 'tertiary_link', 'trunk_link'],
            ],
            layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': '#d33682',
                'line-opacity': 1,
                'line-width': {
                    base: 1.2,
                    stops: [
                        [12, 1],
                        [13, 3],
                        [14, 4],
                        [20, 15],
                    ],
                },
            },
        },
        {
            id: 'highway-minor-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['==', '$type', 'LineString'],
                ['all', ['!=', 'brunnel', 'tunnel'], ['in', 'class', 'minor', 'service', 'track']],
            ],
            layout: { 'line-cap': 'round', 'line-join': 'round' },
            paint: {
                'line-color': 'rgba(108,113,196,0.8)',
                'line-opacity': {
                    stops: [
                        [12, 0],
                        [12.5, 1],
                    ],
                },
                'line-width': {
                    base: 1.2,
                    stops: [
                        [12, 0.5],
                        [13, 1],
                        [14, 4],
                        [20, 15],
                    ],
                },
            },
        },
        {
            id: 'highway-secondary-tertiary-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['!in', 'brunnel', 'bridge', 'tunnel'],
                ['in', 'class', 'secondary', 'tertiary'],
            ],
            layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': '#d33682',
                'line-opacity': 1,
                'line-width': {
                    base: 1.2,
                    stops: [
                        [8, 1.5],
                        [20, 17],
                    ],
                },
            },
        },
        {
            id: 'highway-primary-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            minzoom: 5,
            filter: ['all', ['!in', 'brunnel', 'bridge', 'tunnel'], ['in', 'class', 'primary']],
            layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': '#d33682',
                'line-opacity': {
                    stops: [
                        [7, 0],
                        [8, 1],
                    ],
                },
                'line-width': {
                    base: 1.2,
                    stops: [
                        [7, 0],
                        [8, 0.6],
                        [9, 1.5],
                        [20, 22],
                    ],
                },
            },
        },
        {
            id: 'highway-trunk-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            minzoom: 5,
            filter: ['all', ['!in', 'brunnel', 'bridge', 'tunnel'], ['in', 'class', 'trunk']],
            layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': '#d33682',
                'line-opacity': {
                    stops: [
                        [5, 0],
                        [6, 1],
                    ],
                },
                'line-width': {
                    base: 1.2,
                    stops: [
                        [5, 0],
                        [6, 0.6],
                        [7, 1.5],
                        [20, 22],
                    ],
                },
            },
        },
        {
            id: 'highway-motorway-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            minzoom: 4,
            filter: ['all', ['!in', 'brunnel', 'bridge', 'tunnel'], ['==', 'class', 'motorway']],
            layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': '#d33682',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [4, 0],
                        [5, 0.4],
                        [6, 0.6],
                        [7, 1.5],
                        [20, 22],
                    ],
                },
                'line-opacity': {
                    stops: [
                        [4, 0],
                        [5, 1],
                    ],
                },
            },
        },
        {
            id: 'highway-path',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['==', '$type', 'LineString'],
                ['all', ['!in', 'brunnel', 'bridge', 'tunnel'], ['==', 'class', 'path']],
            ],
            paint: {
                'line-color': '#cb4b16',
                'line-dasharray': [1.5, 0.75],
                'line-width': {
                    base: 1.2,
                    stops: [
                        [15, 1.2],
                        [20, 4],
                    ],
                },
            },
        },
        {
            id: 'highway-motorway-link',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            minzoom: 12,
            filter: ['all', ['!in', 'brunnel', 'bridge', 'tunnel'], ['==', 'class', 'motorway_link']],
            layout: { 'line-cap': 'round', 'line-join': 'round' },
            paint: {
                'line-color': '#6c71c4',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [12.5, 0],
                        [13, 1.5],
                        [14, 2.5],
                        [20, 11.5],
                    ],
                },
            },
        },
        {
            id: 'highway-link',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            minzoom: 13,
            filter: [
                'all',
                ['!in', 'brunnel', 'bridge', 'tunnel'],
                ['in', 'class', 'primary_link', 'secondary_link', 'tertiary_link', 'trunk_link'],
            ],
            layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': '#6c71c4',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [12.5, 0],
                        [13, 1.5],
                        [14, 2.5],
                        [20, 11.5],
                    ],
                },
            },
        },
        {
            id: 'highway-minor',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['==', '$type', 'LineString'],
                ['all', ['!=', 'brunnel', 'tunnel'], ['in', 'class', 'minor', 'service', 'track']],
            ],
            layout: { 'line-cap': 'round', 'line-join': 'round' },
            paint: {
                'line-color': '#e58ab6',
                'line-opacity': 1,
                'line-width': {
                    base: 1.2,
                    stops: [
                        [13.5, 0],
                        [14, 2.5],
                        [20, 11.5],
                    ],
                },
            },
        },
        {
            id: 'highway-secondary-tertiary',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['!in', 'brunnel', 'bridge', 'tunnel'],
                ['in', 'class', 'secondary', 'tertiary'],
            ],
            layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': '#6c71c4',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [6.5, 0],
                        [8, 0.5],
                        [20, 13],
                    ],
                },
            },
        },
        {
            id: 'highway-primary',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['==', '$type', 'LineString'],
                ['all', ['!in', 'brunnel', 'bridge', 'tunnel'], ['in', 'class', 'primary']],
            ],
            layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': '#6c71c4',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [8.5, 0],
                        [9, 0.5],
                        [20, 18],
                    ],
                },
            },
        },
        {
            id: 'highway-trunk',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['==', '$type', 'LineString'],
                ['all', ['!in', 'brunnel', 'bridge', 'tunnel'], ['in', 'class', 'trunk']],
            ],
            layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': '#6c71c4',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [6.5, 0],
                        [7, 0.5],
                        [20, 18],
                    ],
                },
            },
        },
        {
            id: 'highway-motorway',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            minzoom: 5,
            filter: [
                'all',
                ['==', '$type', 'LineString'],
                ['all', ['!in', 'brunnel', 'bridge', 'tunnel'], ['==', 'class', 'motorway']],
            ],
            layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': '#6c71c4',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [6.5, 0],
                        [7, 0.5],
                        [20, 18],
                    ],
                },
            },
        },
        {
            id: 'railway-service',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['==', '$type', 'LineString'],
                ['all', ['==', 'class', 'rail'], ['has', 'service']],
            ],
            paint: {
                'line-color': 'rgba(58,63,144,0.7)',
                'line-width': {
                    base: 1.4,
                    stops: [
                        [14, 0.4],
                        [20, 1],
                    ],
                },
            },
        },
        {
            id: 'railway-service-hatching',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['==', '$type', 'LineString'],
                ['all', ['==', 'class', 'rail'], ['has', 'service']],
            ],
            layout: { visibility: 'visible' },
            paint: {
                'line-color': 'rgba(58,63,144,0.7)',
                'line-dasharray': [0.2, 8],
                'line-width': {
                    base: 1.4,
                    stops: [
                        [14.5, 0],
                        [15, 2],
                        [20, 6],
                    ],
                },
            },
        },
        {
            id: 'railway',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['==', '$type', 'LineString'],
                [
                    'all',
                    ['!has', 'service'],
                    ['!in', 'brunnel', 'bridge', 'tunnel'],
                    ['==', 'class', 'rail'],
                ],
            ],
            paint: {
                'line-color': '#3a3f90',
                'line-width': {
                    base: 1.4,
                    stops: [
                        [14, 0.4],
                        [15, 0.75],
                        [20, 2],
                    ],
                },
            },
        },
        {
            id: 'railway-hatching',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['==', '$type', 'LineString'],
                [
                    'all',
                    ['!has', 'service'],
                    ['!in', 'brunnel', 'bridge', 'tunnel'],
                    ['==', 'class', 'rail'],
                ],
            ],
            paint: {
                'line-color': '#3a3f90',
                'line-dasharray': [0.2, 8],
                'line-width': {
                    base: 1.4,
                    stops: [
                        [14.5, 0],
                        [15, 3],
                        [20, 8],
                    ],
                },
            },
        },
        {
            id: 'bridge-motorway-link-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849334699.1902' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'bridge'], ['==', 'class', 'motorway_link']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#d33682',
                'line-opacity': 1,
                'line-width': {
                    base: 1.2,
                    stops: [
                        [12, 1],
                        [13, 3],
                        [14, 4],
                        [20, 15],
                    ],
                },
            },
        },
        {
            id: 'bridge-link-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849334699.1902' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['==', 'brunnel', 'bridge'],
                ['in', 'class', 'primary_link', 'secondary_link', 'tertiary_link', 'trunk_link'],
            ],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#d33682',
                'line-opacity': 1,
                'line-width': {
                    base: 1.2,
                    stops: [
                        [12, 1],
                        [13, 3],
                        [14, 4],
                        [20, 15],
                    ],
                },
            },
        },
        {
            id: 'bridge-secondary-tertiary-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849334699.1902' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'bridge'], ['in', 'class', 'secondary', 'tertiary']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#d33682',
                'line-opacity': 1,
                'line-width': {
                    base: 1.2,
                    stops: [
                        [8, 1.5],
                        [20, 28],
                    ],
                },
            },
        },
        {
            id: 'bridge-trunk-primary-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849334699.1902' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'bridge'], ['in', 'class', 'primary', 'trunk']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#d33682',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [5, 0.4],
                        [6, 0.6],
                        [7, 1.5],
                        [20, 26],
                    ],
                },
            },
        },
        {
            id: 'bridge-motorway-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849334699.1902' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'bridge'], ['==', 'class', 'motorway']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#d33682',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [5, 0.4],
                        [6, 0.6],
                        [7, 1.5],
                        [20, 22],
                    ],
                },
            },
        },
        {
            id: 'bridge-path-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849334699.1902' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['==', '$type', 'LineString'],
                ['all', ['==', 'brunnel', 'bridge'], ['==', 'class', 'path']],
            ],
            paint: {
                'line-color': '#9094d3',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [15, 1.2],
                        [20, 18],
                    ],
                },
            },
        },
        {
            id: 'bridge-path',
            type: 'line',
            metadata: { 'mapbox:group': '1444849334699.1902' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['==', '$type', 'LineString'],
                ['all', ['==', 'brunnel', 'bridge'], ['==', 'class', 'path']],
            ],
            paint: {
                'line-color': '#cb4b16',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [15, 1.2],
                        [20, 4],
                    ],
                },
                'line-dasharray': [1.5, 0.75],
            },
        },
        {
            id: 'bridge-motorway-link',
            type: 'line',
            metadata: { 'mapbox:group': '1444849334699.1902' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'bridge'], ['==', 'class', 'motorway_link']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#6c71c4',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [12.5, 0],
                        [13, 1.5],
                        [14, 2.5],
                        [20, 11.5],
                    ],
                },
            },
        },
        {
            id: 'bridge-link',
            type: 'line',
            metadata: { 'mapbox:group': '1444849334699.1902' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['==', 'brunnel', 'bridge'],
                ['in', 'class', 'primary_link', 'secondary_link', 'tertiary_link', 'trunk_link'],
            ],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#6c71c4',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [12.5, 0],
                        [13, 1.5],
                        [14, 2.5],
                        [20, 11.5],
                    ],
                },
            },
        },
        {
            id: 'bridge-secondary-tertiary',
            type: 'line',
            metadata: { 'mapbox:group': '1444849334699.1902' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'bridge'], ['in', 'class', 'secondary', 'tertiary']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#6c71c4',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [6.5, 0],
                        [7, 0.5],
                        [20, 20],
                    ],
                },
            },
        },
        {
            id: 'bridge-trunk-primary',
            type: 'line',
            metadata: { 'mapbox:group': '1444849334699.1902' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'bridge'], ['in', 'class', 'primary', 'trunk']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#6c71c4',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [6.5, 0],
                        [7, 0.5],
                        [20, 18],
                    ],
                },
            },
        },
        {
            id: 'bridge-motorway',
            type: 'line',
            metadata: { 'mapbox:group': '1444849334699.1902' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'bridge'], ['==', 'class', 'motorway']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#6c71c4',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [6.5, 0],
                        [7, 0.5],
                        [20, 18],
                    ],
                },
            },
        },
        {
            id: 'bridge-railway',
            type: 'line',
            metadata: { 'mapbox:group': '1444849334699.1902' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'bridge'], ['==', 'class', 'rail']],
            paint: {
                'line-color': '#3a3f90',
                'line-width': {
                    base: 1.4,
                    stops: [
                        [14, 0.4],
                        [15, 0.75],
                        [20, 2],
                    ],
                },
            },
        },
        {
            id: 'bridge-railway-hatching',
            type: 'line',
            metadata: { 'mapbox:group': '1444849334699.1902' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'bridge'], ['==', 'class', 'rail']],
            paint: {
                'line-color': '#3a3f90',
                'line-dasharray': [0.2, 8],
                'line-width': {
                    base: 1.4,
                    stops: [
                        [14.5, 0],
                        [15, 3],
                        [20, 8],
                    ],
                },
            },
        },
        {
            id: 'boundary-land-level-4',
            type: 'line',
            source: 'openmaptiles',
            'source-layer': 'boundary',
            filter: ['all', ['in', 'admin_level', 4, 6, 8], ['!=', 'maritime', 1]],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#268bd2',
                'line-dasharray': [3, 1, 1, 1],
                'line-width': {
                    base: 1.4,
                    stops: [
                        [4, 0.4],
                        [5, 1],
                        [12, 3],
                    ],
                },
            },
        },
        {
            id: 'boundary-land-level-2',
            type: 'line',
            source: 'openmaptiles',
            'source-layer': 'boundary',
            filter: ['all', ['==', 'admin_level', 2], ['!=', 'maritime', 1]],
            layout: { 'line-cap': 'round', 'line-join': 'round' },
            paint: {
                'line-color': '#268bd2',
                'line-width': {
                    base: 1,
                    stops: [
                        [0, 0.6],
                        [4, 1.4],
                        [5, 2],
                        [12, 8],
                    ],
                },
            },
        },
        {
            id: 'boundary-water',
            type: 'line',
            source: 'openmaptiles',
            'source-layer': 'boundary',
            filter: ['all', ['in', 'admin_level', 2, 4], ['==', 'maritime', 1]],
            layout: { 'line-cap': 'round', 'line-join': 'round' },
            paint: {
                'line-color': '#268bd2',
                'line-width': {
                    base: 1,
                    stops: [
                        [0, 0.6],
                        [4, 1.4],
                        [5, 2],
                        [12, 8],
                    ],
                },
                'line-opacity': {
                    stops: [
                        [6, 0.6],
                        [10, 1],
                    ],
                },
            },
        },
        {
            id: 'waterway-name',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'waterway',
            minzoom: 13,
            filter: ['all', ['==', '$type', 'LineString'], ['has', 'name'], ['!has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Italic'],
                'text-size': 14,
                'text-field': '{name:latin} {name:nonlatin}',
                'text-max-width': 5,
                'text-rotation-alignment': 'map',
                'symbol-placement': 'line',
                'text-letter-spacing': 0.2,
                'symbol-spacing': 350,
            },
            paint: { 'text-color': '#fefefe', 'text-halo-width': 1.5, 'text-halo-color': '#74aee9' },
        },
        {
            id: 'waterway-name-en',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'waterway',
            minzoom: 13,
            filter: ['all', ['==', '$type', 'LineString'], ['has', 'name'], ['has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Italic'],
                'text-size': 14,
                'text-field': '{name:de} {name:nonlatin}',
                'text-max-width': 5,
                'text-rotation-alignment': 'map',
                'symbol-placement': 'line',
                'text-letter-spacing': 0.2,
                'symbol-spacing': 350,
            },
            paint: { 'text-color': '#fefefe', 'text-halo-width': 1.5, 'text-halo-color': '#74aee9' },
        },
        {
            id: 'water-name-lakeline',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'water_name',
            filter: ['all', ['==', '$type', 'LineString'], ['!has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Italic'],
                'text-size': 14,
                'text-field': '{name:latin} {name:nonlatin}',
                'text-max-width': 5,
                'text-rotation-alignment': 'map',
                'symbol-placement': 'line',
                'symbol-spacing': 350,
                'text-letter-spacing': 0.2,
            },
            paint: { 'text-color': '#fefefe', 'text-halo-width': 1.5, 'text-halo-color': '#74aee9' },
        },
        {
            id: 'water-name-lakeline-en',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'water_name',
            filter: ['all', ['==', '$type', 'LineString'], ['has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Italic'],
                'text-size': 14,
                'text-field': '{name:de} {name:nonlatin}',
                'text-max-width': 5,
                'text-rotation-alignment': 'map',
                'symbol-placement': 'line',
                'symbol-spacing': 350,
                'text-letter-spacing': 0.2,
            },
            paint: { 'text-color': '#fefefe', 'text-halo-width': 1.5, 'text-halo-color': '#74aee9' },
        },
        {
            id: 'water-name-ocean',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'water_name',
            filter: ['all', ['==', '$type', 'Point'], ['==', 'class', 'ocean'], ['!has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Italic'],
                'text-size': 14,
                'text-field': '{name:latin}\n{name:nonlatin}',
                'text-max-width': 5,
                'text-rotation-alignment': 'map',
                'symbol-placement': 'point',
                'symbol-spacing': 350,
                'text-letter-spacing': 0.2,
            },
            paint: { 'text-color': '#fefefe', 'text-halo-width': 1.5, 'text-halo-color': '#74aee9' },
        },
        {
            id: 'water-name-ocean-en',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'water_name',
            filter: ['all', ['==', '$type', 'Point'], ['==', 'class', 'ocean'], ['has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Italic'],
                'text-size': 14,
                'text-field': '{name:de}\n{name:nonlatin}',
                'text-max-width': 5,
                'text-rotation-alignment': 'map',
                'symbol-placement': 'point',
                'symbol-spacing': 350,
                'text-letter-spacing': 0.2,
            },
            paint: { 'text-color': '#fefefe', 'text-halo-width': 1.5, 'text-halo-color': '#74aee9' },
        },
        {
            id: 'water-name-other',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'water_name',
            filter: ['all', ['==', '$type', 'Point'], ['!in', 'class', 'ocean'], ['!has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Italic'],
                'text-size': {
                    stops: [
                        [0, 10],
                        [6, 14],
                    ],
                },
                'text-field': '{name:latin}\n{name:nonlatin}',
                'text-max-width': 5,
                'text-rotation-alignment': 'map',
                'symbol-placement': 'point',
                'symbol-spacing': 350,
                'text-letter-spacing': 0.2,
                visibility: 'visible',
            },
            paint: { 'text-color': '#fefefe', 'text-halo-width': 1.5, 'text-halo-color': '#74aee9' },
        },
        {
            id: 'water-name-other-en',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'water_name',
            filter: ['all', ['==', '$type', 'Point'], ['!in', 'class', 'ocean'], ['has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Italic'],
                'text-size': {
                    stops: [
                        [0, 10],
                        [6, 14],
                    ],
                },
                'text-field': '{name:de}\n{name:nonlatin}',
                'text-max-width': 5,
                'text-rotation-alignment': 'map',
                'symbol-placement': 'point',
                'symbol-spacing': 350,
                'text-letter-spacing': 0.2,
                visibility: 'visible',
            },
            paint: { 'text-color': '#fefefe', 'text-halo-width': 1.5, 'text-halo-color': '#74aee9' },
        },
        {
            id: 'poi-level-3',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'poi',
            minzoom: 16,
            filter: ['all', ['==', '$type', 'Point'], ['>=', 'rank', 25], ['!has', 'name:de']],
            layout: {
                'text-padding': 2,
                'text-font': ['Open Sans Semibold'],
                'text-anchor': 'top',
                'icon-image': '{class}_11',
                'text-field': '{name:latin}\n{name:nonlatin}',
                'text-offset': [0, 0.6],
                'text-size': 12,
                'text-max-width': 9,
            },
            paint: {
                'text-halo-blur': 0.5,
                'text-color': '#fdfdfd',
                'text-halo-width': 1,
                'text-halo-color': '#633',
            },
        },
        {
            id: 'poi-level-3-en',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'poi',
            minzoom: 16,
            filter: ['all', ['==', '$type', 'Point'], ['>=', 'rank', 25], ['has', 'name:de']],
            layout: {
                'text-padding': 2,
                'text-font': ['Open Sans Semibold'],
                'text-anchor': 'top',
                'icon-image': '{class}_11',
                'text-field': '{name:de}\n{name:nonlatin}',
                'text-offset': [0, 0.6],
                'text-size': 12,
                'text-max-width': 9,
            },
            paint: {
                'text-halo-blur': 0.5,
                'text-color': '#fdfdfd',
                'text-halo-width': 1,
                'text-halo-color': '#633',
            },
        },
        {
            id: 'poi-level-2',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'poi',
            minzoom: 15,
            filter: [
                'all',
                ['==', '$type', 'Point'],
                ['all', ['<=', 'rank', 24], ['>=', 'rank', 15]],
                ['!has', 'name:de'],
            ],
            layout: {
                'text-padding': 2,
                'text-font': ['Open Sans Semibold'],
                'text-anchor': 'top',
                'icon-image': '{class}_11',
                'text-field': '{name:latin}\n{name:nonlatin}',
                'text-offset': [0, 0.6],
                'text-size': 12,
                'text-max-width': 9,
            },
            paint: {
                'text-halo-blur': 0.5,
                'text-color': '#fdfdfd',
                'text-halo-width': 1,
                'text-halo-color': '#633',
            },
        },
        {
            id: 'poi-level-2-en',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'poi',
            minzoom: 15,
            filter: [
                'all',
                ['==', '$type', 'Point'],
                ['all', ['<=', 'rank', 24], ['>=', 'rank', 15]],
                ['has', 'name:de'],
            ],
            layout: {
                'text-padding': 2,
                'text-font': ['Open Sans Semibold'],
                'text-anchor': 'top',
                'icon-image': '{class}_11',
                'text-field': '{name:de}\n{name:nonlatin}',
                'text-offset': [0, 0.6],
                'text-size': 12,
                'text-max-width': 9,
            },
            paint: {
                'text-halo-blur': 0.5,
                'text-color': '#fdfdfd',
                'text-halo-width': 1,
                'text-halo-color': '#633',
            },
        },
        {
            id: 'poi-level-1',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'poi',
            minzoom: 14,
            filter: [
                'all',
                ['==', '$type', 'Point'],
                ['all', ['<=', 'rank', 14], ['has', 'name']],
                ['!has', 'name:de'],
            ],
            layout: {
                'text-padding': 2,
                'text-font': ['Open Sans Semibold'],
                'text-anchor': 'top',
                'icon-image': '{class}_11',
                'text-field': '{name:latin}\n{name:nonlatin}',
                'text-offset': [0, 0.6],
                'text-size': 12,
                'text-max-width': 9,
            },
            paint: {
                'text-halo-blur': 0.5,
                'text-color': '#fdfdfd',
                'text-halo-width': 1,
                'text-halo-color': '#633',
            },
        },
        {
            id: 'poi-level-1-en',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'poi',
            minzoom: 14,
            filter: [
                'all',
                ['==', '$type', 'Point'],
                ['all', ['<=', 'rank', 14], ['has', 'name']],
                ['has', 'name:de'],
            ],
            layout: {
                'text-padding': 2,
                'text-font': ['Open Sans Semibold'],
                'text-anchor': 'top',
                'icon-image': '{class}_11',
                'text-field': '{name:de}\n{name:nonlatin}',
                'text-offset': [0, 0.6],
                'text-size': 12,
                'text-max-width': 9,
            },
            paint: {
                'text-halo-blur': 0.5,
                'text-color': '#fdfdfd',
                'text-halo-width': 1,
                'text-halo-color': '#633',
            },
        },
        {
            id: 'highway-name-path',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'transportation_name',
            minzoom: 15.5,
            filter: ['all', ['==', 'class', 'path'], ['!has', 'name:de']],
            layout: {
                'text-size': {
                    base: 1,
                    stops: [
                        [13, 12],
                        [14, 13],
                    ],
                },
                'text-font': ['Open Sans Regular'],
                'text-field': '{name:latin} {name:nonlatin}',
                'symbol-placement': 'line',
                'text-rotation-alignment': 'map',
            },
            paint: {
                'text-halo-color': '#f8f4f0',
                'text-color': 'hsl(30, 23%, 62%)',
                'text-halo-width': 0.5,
            },
        },
        {
            id: 'highway-name-path-en',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'transportation_name',
            minzoom: 15.5,
            filter: ['all', ['==', 'class', 'path'], ['has', 'name:de']],
            layout: {
                'text-size': {
                    base: 1,
                    stops: [
                        [13, 12],
                        [14, 13],
                    ],
                },
                'text-font': ['Open Sans Regular'],
                'text-field': '{name:de} {name:nonlatin}',
                'symbol-placement': 'line',
                'text-rotation-alignment': 'map',
            },
            paint: {
                'text-halo-color': '#f8f4f0',
                'text-color': 'hsl(30, 23%, 62%)',
                'text-halo-width': 0.5,
            },
        },
        {
            id: 'highway-name-minor',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'transportation_name',
            minzoom: 15,
            filter: [
                'all',
                ['==', '$type', 'LineString'],
                ['in', 'class', 'minor', 'service', 'track'],
                ['!has', 'name:de'],
            ],
            layout: {
                'text-size': {
                    base: 1,
                    stops: [
                        [13, 12],
                        [14, 13],
                    ],
                },
                'text-font': ['Open Sans Regular'],
                'text-field': '{name:latin} {name:nonlatin}',
                'symbol-placement': 'line',
                'text-rotation-alignment': 'map',
            },
            paint: { 'text-halo-blur': 0.5, 'text-color': '#765', 'text-halo-width': 1 },
        },
        {
            id: 'highway-name-minor-en',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'transportation_name',
            minzoom: 15,
            filter: [
                'all',
                ['==', '$type', 'LineString'],
                ['in', 'class', 'minor', 'service', 'track'],
                ['has', 'name:de'],
            ],
            layout: {
                'text-size': {
                    base: 1,
                    stops: [
                        [13, 12],
                        [14, 13],
                    ],
                },
                'text-font': ['Open Sans Regular'],
                'text-field': '{name:de} {name:nonlatin}',
                'symbol-placement': 'line',
                'text-rotation-alignment': 'map',
            },
            paint: { 'text-halo-blur': 0.5, 'text-color': '#765', 'text-halo-width': 1 },
        },
        {
            id: 'highway-name-major',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'transportation_name',
            minzoom: 12.2,
            filter: [
                'all',
                ['in', 'class', 'primary', 'secondary', 'tertiary', 'trunk'],
                ['!has', 'name:de'],
            ],
            layout: {
                'text-size': {
                    base: 1,
                    stops: [
                        [13, 12],
                        [14, 13],
                    ],
                },
                'text-font': ['Open Sans Regular'],
                'text-field': '{name:latin} {name:nonlatin}',
                'symbol-placement': 'line',
                'text-rotation-alignment': 'map',
            },
            paint: { 'text-halo-blur': 0.5, 'text-color': '#765', 'text-halo-width': 1 },
        },
        {
            id: 'highway-name-major-en',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'transportation_name',
            minzoom: 12.2,
            filter: [
                'all',
                ['in', 'class', 'primary', 'secondary', 'tertiary', 'trunk'],
                ['has', 'name:de'],
            ],
            layout: {
                'text-size': {
                    base: 1,
                    stops: [
                        [13, 12],
                        [14, 13],
                    ],
                },
                'text-font': ['Open Sans Regular'],
                'text-field': '{name:de} {name:nonlatin}',
                'symbol-placement': 'line',
                'text-rotation-alignment': 'map',
            },
            paint: { 'text-halo-blur': 0.5, 'text-color': '#765', 'text-halo-width': 1 },
        },
        {
            id: 'highway-shield',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'transportation_name',
            minzoom: 8,
            filter: [
                'all',
                ['<=', 'ref_length', 6],
                ['==', '$type', 'LineString'],
                ['!in', 'network', 'us-interstate', 'us-highway', 'us-state'],
            ],
            layout: {
                'text-size': 10,
                'icon-image': 'road_{ref_length}',
                'icon-rotation-alignment': 'viewport',
                'symbol-spacing': 200,
                'text-font': ['Open Sans Semibold'],
                'symbol-placement': {
                    base: 1,
                    stops: [
                        [10, 'point'],
                        [11, 'line'],
                    ],
                },
                'text-rotation-alignment': 'viewport',
                'icon-size': 1,
                'text-field': '{ref}',
            },
            paint: {},
        },
        {
            id: 'highway-shield-us-interstate',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'transportation_name',
            minzoom: 7,
            filter: [
                'all',
                ['<=', 'ref_length', 6],
                ['==', '$type', 'LineString'],
                ['in', 'network', 'us-interstate'],
            ],
            layout: {
                'text-size': 10,
                'icon-image': '{network}_{ref_length}',
                'icon-rotation-alignment': 'viewport',
                'symbol-spacing': 200,
                'text-font': ['Open Sans Semibold'],
                'symbol-placement': {
                    base: 1,
                    stops: [
                        [7, 'point'],
                        [7, 'line'],
                        [8, 'line'],
                    ],
                },
                'text-rotation-alignment': 'viewport',
                'icon-size': 1,
                'text-field': '{ref}',
            },
            paint: { 'text-color': 'rgba(0, 0, 0, 1)' },
        },
        {
            id: 'highway-shield-us-other',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'transportation_name',
            minzoom: 9,
            filter: [
                'all',
                ['<=', 'ref_length', 6],
                ['==', '$type', 'LineString'],
                ['in', 'network', 'us-highway', 'us-state'],
            ],
            layout: {
                'text-size': 10,
                'icon-image': '{network}_{ref_length}',
                'icon-rotation-alignment': 'viewport',
                'symbol-spacing': 200,
                'text-font': ['Open Sans Semibold'],
                'symbol-placement': {
                    base: 1,
                    stops: [
                        [10, 'point'],
                        [11, 'line'],
                    ],
                },
                'text-rotation-alignment': 'viewport',
                'icon-size': 1,
                'text-field': '{ref}',
            },
            paint: { 'text-color': 'rgba(0, 0, 0, 1)' },
        },
        {
            id: 'place-other',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['!in', 'class', 'city', 'town', 'village'], ['!has', 'name:de']],
            layout: {
                'text-letter-spacing': 0.1,
                'text-size': {
                    base: 1.2,
                    stops: [
                        [12, 10],
                        [15, 14],
                    ],
                },
                'text-font': ['Open Sans Bold'],
                'text-field': '{name:latin}\n{name:nonlatin}',
                'text-transform': 'uppercase',
                'text-max-width': 9,
            },
            paint: { 'text-color': '#fdfdfd', 'text-halo-width': 1.2, 'text-halo-color': '#433' },
        },
        {
            id: 'place-other-en',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['!in', 'class', 'city', 'town', 'village'], ['has', 'name:de']],
            layout: {
                'text-letter-spacing': 0.1,
                'text-size': {
                    base: 1.2,
                    stops: [
                        [12, 10],
                        [15, 14],
                    ],
                },
                'text-font': ['Open Sans Bold'],
                'text-field': '{name:de}\n{name:nonlatin}',
                'text-transform': 'uppercase',
                'text-max-width': 9,
            },
            paint: { 'text-color': '#fdfdfd', 'text-halo-width': 1.2, 'text-halo-color': '#433' },
        },
        {
            id: 'place-village',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['==', 'class', 'village'], ['!has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Regular'],
                'text-size': {
                    base: 1.2,
                    stops: [
                        [10, 12],
                        [15, 22],
                    ],
                },
                'text-field': '{name:latin}\n{name:nonlatin}',
                'text-max-width': 8,
            },
            paint: { 'text-color': '#fdfdfd', 'text-halo-width': 1.2, 'text-halo-color': '#433' },
        },
        {
            id: 'place-village-en',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['==', 'class', 'village'], ['has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Regular'],
                'text-size': {
                    base: 1.2,
                    stops: [
                        [10, 12],
                        [15, 22],
                    ],
                },
                'text-field': '{name:de}\n{name:nonlatin}',
                'text-max-width': 8,
            },
            paint: { 'text-color': '#fdfdfd', 'text-halo-width': 1.2, 'text-halo-color': '#433' },
        },
        {
            id: 'place-town',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['==', 'class', 'town'], ['!has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Regular'],
                'text-size': {
                    base: 1.2,
                    stops: [
                        [10, 14],
                        [15, 24],
                    ],
                },
                'text-field': '{name:latin}\n{name:nonlatin}',
                'text-max-width': 8,
            },
            paint: { 'text-color': '#fdfdfd', 'text-halo-width': 1.2, 'text-halo-color': '#433' },
        },
        {
            id: 'place-town-en',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['==', 'class', 'town'], ['has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Regular'],
                'text-size': {
                    base: 1.2,
                    stops: [
                        [10, 14],
                        [15, 24],
                    ],
                },
                'text-field': '{name:de}\n{name:nonlatin}',
                'text-max-width': 8,
            },
            paint: { 'text-color': '#fdfdfd', 'text-halo-width': 1.2, 'text-halo-color': '#433' },
        },
        {
            id: 'place-city',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['!=', 'capital', 2], ['==', 'class', 'city'], ['!has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Semibold'],
                'text-size': {
                    base: 1.2,
                    stops: [
                        [7, 14],
                        [11, 24],
                    ],
                },
                'text-field': '{name:latin}\n{name:nonlatin}',
                'text-max-width': 8,
            },
            paint: { 'text-color': '#fdfdfd', 'text-halo-width': 1.2, 'text-halo-color': '#433' },
        },
        {
            id: 'place-city-en',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['!=', 'capital', 2], ['==', 'class', 'city'], ['has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Semibold'],
                'text-size': {
                    base: 1.2,
                    stops: [
                        [7, 14],
                        [11, 24],
                    ],
                },
                'text-field': '{name:de}\n{name:nonlatin}',
                'text-max-width': 8,
            },
            paint: { 'text-color': '#fdfdfd', 'text-halo-width': 1.2, 'text-halo-color': '#433' },
        },
        {
            id: 'place-city-capital',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['==', 'capital', 2], ['==', 'class', 'city'], ['!has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Semibold'],
                'text-size': {
                    base: 1.2,
                    stops: [
                        [7, 14],
                        [11, 24],
                    ],
                },
                'text-field': '{name:latin}\n{name:nonlatin}',
                'text-max-width': 8,
                'icon-image': 'star_11',
                'text-offset': [0.4, 0],
                'icon-size': 0.8,
                'text-anchor': 'left',
            },
            paint: { 'text-color': '#fdfdfd', 'text-halo-width': 1.2, 'text-halo-color': '#433' },
        },
        {
            id: 'place-city-capital-en',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['==', 'capital', 2], ['==', 'class', 'city'], ['has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Semibold'],
                'text-size': {
                    base: 1.2,
                    stops: [
                        [7, 14],
                        [11, 24],
                    ],
                },
                'text-field': '{name:de}\n{name:nonlatin}',
                'text-max-width': 8,
                'icon-image': 'star_11',
                'text-offset': [0.4, 0],
                'icon-size': 0.8,
                'text-anchor': 'left',
            },
            paint: { 'text-color': '#fdfdfd', 'text-halo-width': 1.2, 'text-halo-color': '#433' },
        },
        {
            id: 'place-country-3',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['==', 'class', 'country'], ['>=', 'rank', 3], ['!has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Bold'],
                'text-field': '{name:latin}\n{name:nonlatin}',
                'text-size': {
                    stops: [
                        [3, 11],
                        [7, 17],
                    ],
                },
                'text-transform': 'uppercase',
                'text-max-width': 6.25,
            },
            paint: {
                'text-halo-blur': 1,
                'text-color': '#fdfdfd',
                'text-halo-width': 2,
                'text-halo-color': '#433',
            },
        },
        {
            id: 'place-country-3-en',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['==', 'class', 'country'], ['>=', 'rank', 3], ['has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Bold'],
                'text-field': '{name:de}\n{name:nonlatin}',
                'text-size': {
                    stops: [
                        [3, 11],
                        [7, 17],
                    ],
                },
                'text-transform': 'uppercase',
                'text-max-width': 6.25,
            },
            paint: {
                'text-halo-blur': 1,
                'text-color': '#fdfdfd',
                'text-halo-width': 2,
                'text-halo-color': '#433',
            },
        },
        {
            id: 'place-country-2',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['==', 'class', 'country'], ['==', 'rank', 2], ['!has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Bold'],
                'text-field': '{name:latin}\n{name:nonlatin}',
                'text-size': {
                    stops: [
                        [2, 11],
                        [5, 17],
                    ],
                },
                'text-transform': 'uppercase',
                'text-max-width': 6.25,
            },
            paint: {
                'text-halo-blur': 1,
                'text-color': '#fdfdfd',
                'text-halo-width': 2,
                'text-halo-color': '#433',
            },
        },
        {
            id: 'place-country-2-en',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['==', 'class', 'country'], ['==', 'rank', 2], ['has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Bold'],
                'text-field': '{name:de}\n{name:nonlatin}',
                'text-size': {
                    stops: [
                        [2, 11],
                        [5, 17],
                    ],
                },
                'text-transform': 'uppercase',
                'text-max-width': 6.25,
            },
            paint: {
                'text-halo-blur': 1,
                'text-color': '#fdfdfd',
                'text-halo-width': 2,
                'text-halo-color': '#433',
            },
        },
        {
            id: 'place-country-1',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['==', 'class', 'country'], ['==', 'rank', 1], ['!has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Bold'],
                'text-field': '{name:latin}\n{name:nonlatin}',
                'text-size': {
                    stops: [
                        [1, 11],
                        [4, 17],
                    ],
                },
                'text-transform': 'uppercase',
                'text-max-width': 6.25,
            },
            paint: {
                'text-halo-blur': 1,
                'text-color': '#fdfdfd',
                'text-halo-width': 2,
                'text-halo-color': '#433',
            },
        },
        {
            id: 'place-country-1-en',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['==', 'class', 'country'], ['==', 'rank', 1], ['has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Bold'],
                'text-field': '{name:de}\n{name:nonlatin}',
                'text-size': {
                    stops: [
                        [1, 11],
                        [4, 17],
                    ],
                },
                'text-transform': 'uppercase',
                'text-max-width': 6.25,
            },
            paint: {
                'text-halo-blur': 1,
                'text-color': '#fdfdfd',
                'text-halo-width': 2,
                'text-halo-color': '#433',
            },
        },
        {
            id: 'place-continent',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            maxzoom: 1,
            filter: ['all', ['==', 'class', 'continent'], ['!has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Bold'],
                'text-field': '{name:latin}\n{name:nonlatin}',
                'text-size': 14,
                'text-max-width': 6.25,
                'text-transform': 'uppercase',
            },
            paint: {
                'text-halo-blur': 1,
                'text-color': '#fdfdfd',
                'text-halo-width': 2,
                'text-halo-color': '#433',
            },
        },
        {
            id: 'place-continent-en',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            maxzoom: 1,
            filter: ['all', ['==', 'class', 'continent'], ['has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Bold'],
                'text-field': '{name:de}\n{name:nonlatin}',
                'text-size': 14,
                'text-max-width': 6.25,
                'text-transform': 'uppercase',
            },
            paint: {
                'text-halo-blur': 1,
                'text-color': '#fdfdfd',
                'text-halo-width': 2,
                'text-halo-color': '#433',
            },
        },
    ],
};

var OceanicNextStyle = {
    version: 8,
    name: 'Oceanic Next',
    center: [8.542, 47.372],
    zoom: 11.6,
    bearing: 0,
    pitch: 0,
    sources: {
        openmaptiles: {
            type: 'vector',
            url: config.source_openmaptiles_url,
        },
    },
    sprite: config.sprite,
    glyphs: config.glyphs,
    layers: [
        { id: 'background', type: 'background', paint: { 'background-color': '#282822' } },
        {
            id: 'landcover-glacier',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849388993.3071' },
            source: 'openmaptiles',
            'source-layer': 'landcover',
            filter: ['==', 'subclass', 'glacier'],
            layout: { visibility: 'visible' },
            paint: {
                'fill-color': '#81a1c1',
                'fill-opacity': {
                    base: 1,
                    stops: [
                        [0, 0.9],
                        [10, 0.3],
                    ],
                },
            },
        },
        {
            id: 'landuse-residential',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849388993.3071' },
            source: 'openmaptiles',
            'source-layer': 'landuse',
            filter: ['==', 'class', 'residential'],
            paint: { 'fill-color': '#a3be8c' },
        },
        {
            id: 'landuse-commercial',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849388993.3071' },
            source: 'openmaptiles',
            'source-layer': 'landuse',
            filter: ['all', ['==', '$type', 'Polygon'], ['==', 'class', 'commercial']],
            paint: { 'fill-color': '#acc598' },
        },
        {
            id: 'landuse-industrial',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849388993.3071' },
            source: 'openmaptiles',
            'source-layer': 'landuse',
            filter: ['all', ['==', '$type', 'Polygon'], ['==', 'class', 'industrial']],
            paint: { 'fill-color': '#b5cba3' },
        },
        {
            id: 'park',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849388993.3071' },
            source: 'openmaptiles',
            'source-layer': 'park',
            filter: ['==', '$type', 'Polygon'],
            paint: {
                'fill-color': '#a3be8c',
                'fill-opacity': {
                    base: 1.8,
                    stops: [
                        [9, 0.5],
                        [12, 0.2],
                    ],
                },
            },
        },
        {
            id: 'park-outline',
            type: 'line',
            metadata: { 'mapbox:group': '1444849388993.3071' },
            source: 'openmaptiles',
            'source-layer': 'park',
            filter: ['==', '$type', 'Polygon'],
            layout: {},
            paint: { 'line-color': 'rgba(163,19,14,0.6)', 'line-dasharray': [3, 3] },
        },
        {
            id: 'landuse-cemetery',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849388993.3071' },
            source: 'openmaptiles',
            'source-layer': 'landuse',
            filter: ['==', 'class', 'cemetery'],
            paint: { 'fill-color': '#cbdabe' },
        },
        {
            id: 'landuse-hospital',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849388993.3071' },
            source: 'openmaptiles',
            'source-layer': 'landuse',
            filter: ['==', 'class', 'hospital'],
            paint: { 'fill-color': '#b48ead' },
        },
        {
            id: 'landuse-school',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849388993.3071' },
            source: 'openmaptiles',
            'source-layer': 'landuse',
            filter: ['==', 'class', 'school'],
            paint: { 'fill-color': 'rgba(18,142,173,0.8)' },
        },
        {
            id: 'landuse-railway',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849388993.3071' },
            source: 'openmaptiles',
            'source-layer': 'landuse',
            filter: ['==', 'class', 'railway'],
            paint: { 'fill-color': 'rgba(118,51,8,0.4)' },
        },
        {
            id: 'landcover-wood',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849388993.3071' },
            source: 'openmaptiles',
            'source-layer': 'landcover',
            filter: ['==', 'class', 'wood'],
            paint: {
                'fill-color': '#81a1c1',
                'fill-opacity': 0.1,
                'fill-outline-color': 'hsla(0, 0%, 0%, 0.03)',
                'fill-antialias': {
                    base: 1,
                    stops: [
                        [0, false],
                        [9, true],
                    ],
                },
            },
        },
        {
            id: 'landcover-grass',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849388993.3071' },
            source: 'openmaptiles',
            'source-layer': 'landcover',
            filter: ['==', 'class', 'grass'],
            paint: { 'fill-color': '#a3be8c', 'fill-opacity': 1 },
        },
        {
            id: 'landcover-grass-park',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849388993.3071' },
            source: 'openmaptiles',
            'source-layer': 'park',
            filter: ['==', 'class', 'public_park'],
            paint: { 'fill-color': '#a3be8c', 'fill-opacity': 0.8 },
        },
        {
            id: 'waterway-other',
            type: 'line',
            metadata: { 'mapbox:group': '1444849382550.77' },
            source: 'openmaptiles',
            'source-layer': 'waterway',
            filter: ['!in', 'class', 'canal', 'river', 'stream'],
            layout: { 'line-cap': 'round' },
            paint: {
                'line-color': '#8fbcbb',
                'line-width': {
                    base: 1.3,
                    stops: [
                        [13, 0.5],
                        [20, 2],
                    ],
                },
            },
        },
        {
            id: 'waterway-stream-canal',
            type: 'line',
            metadata: { 'mapbox:group': '1444849382550.77' },
            source: 'openmaptiles',
            'source-layer': 'waterway',
            filter: ['in', 'class', 'canal', 'stream'],
            layout: { 'line-cap': 'round' },
            paint: {
                'line-color': '#8fbcbb',
                'line-width': {
                    base: 1.3,
                    stops: [
                        [13, 0.5],
                        [20, 6],
                    ],
                },
            },
        },
        {
            id: 'waterway-river',
            type: 'line',
            metadata: { 'mapbox:group': '1444849382550.77' },
            source: 'openmaptiles',
            'source-layer': 'waterway',
            filter: ['==', 'class', 'river'],
            layout: { 'line-cap': 'round' },
            paint: {
                'line-color': '#8fbcbb',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [10, 0.8],
                        [20, 6],
                    ],
                },
            },
        },
        {
            id: 'water-offset',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849382550.77' },
            source: 'openmaptiles',
            'source-layer': 'water',
            maxzoom: 8,
            filter: ['==', '$type', 'Polygon'],
            layout: { visibility: 'visible' },
            paint: {
                'fill-opacity': 1,
                'fill-color': '#8fbcbb',
                'fill-translate': {
                    base: 1,
                    stops: [
                        [6, [2, 0]],
                        [8, [0, 0]],
                    ],
                },
            },
        },
        {
            id: 'water',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849382550.77' },
            source: 'openmaptiles',
            'source-layer': 'water',
            layout: { visibility: 'visible' },
            paint: { 'fill-color': '#5f9f9e' },
        },
        {
            id: 'water-pattern',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849382550.77' },
            source: 'openmaptiles',
            'source-layer': 'water',
            layout: { visibility: 'visible' },
            paint: { 'fill-translate': [0, 2.5], 'fill-pattern': 'wave' },
        },
        {
            id: 'landcover-ice-shelf',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849382550.77' },
            source: 'openmaptiles',
            'source-layer': 'landcover',
            filter: ['==', 'subclass', 'ice_shelf'],
            layout: { visibility: 'visible' },
            paint: {
                'fill-color': '#81a1c1',
                'fill-opacity': {
                    base: 1,
                    stops: [
                        [0, 0.9],
                        [10, 0.3],
                    ],
                },
            },
        },
        {
            id: 'building',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849364238.8171' },
            source: 'openmaptiles',
            'source-layer': 'building',
            paint: { 'fill-color': '#65737e', 'fill-antialias': true },
        },
        {
            id: 'building-top',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849364238.8171' },
            source: 'openmaptiles',
            'source-layer': 'building',
            layout: { visibility: 'visible' },
            paint: {
                'fill-translate': {
                    base: 1,
                    stops: [
                        [14, [0, 0]],
                        [16, [-2, -2]],
                    ],
                },
                'fill-outline-color': '#dfdbd7',
                'fill-color': '#7e8d98',
                'fill-opacity': {
                    base: 1,
                    stops: [
                        [13, 0],
                        [16, 1],
                    ],
                },
            },
        },
        {
            id: 'tunnel-service-track-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849354174.1904' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'tunnel'], ['in', 'class', 'service', 'track']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#d65d0e',
                'line-dasharray': [0.5, 0.25],
                'line-width': {
                    base: 1.2,
                    stops: [
                        [15, 1],
                        [16, 4],
                        [20, 11],
                    ],
                },
            },
        },
        {
            id: 'tunnel-minor-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849354174.1904' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'tunnel'], ['==', 'class', 'minor']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#d65d0e',
                'line-opacity': {
                    stops: [
                        [12, 0],
                        [12.5, 1],
                    ],
                },
                'line-width': {
                    base: 1.2,
                    stops: [
                        [12, 0.5],
                        [13, 1],
                        [14, 4],
                        [20, 15],
                    ],
                },
            },
        },
        {
            id: 'tunnel-secondary-tertiary-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849354174.1904' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'tunnel'], ['in', 'class', 'secondary', 'tertiary']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#d65d0e',
                'line-opacity': 1,
                'line-width': {
                    base: 1.2,
                    stops: [
                        [8, 1.5],
                        [20, 17],
                    ],
                },
            },
        },
        {
            id: 'tunnel-trunk-primary-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849354174.1904' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'tunnel'], ['in', 'class', 'primary', 'trunk']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#d65d0e',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [5, 0.4],
                        [6, 0.6],
                        [7, 1.5],
                        [20, 22],
                    ],
                },
            },
        },
        {
            id: 'tunnel-motorway-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849354174.1904' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'tunnel'], ['==', 'class', 'motorway']],
            layout: { 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': '#d65d0e',
                'line-dasharray': [0.5, 0.25],
                'line-width': {
                    base: 1.2,
                    stops: [
                        [5, 0.4],
                        [6, 0.6],
                        [7, 1.5],
                        [20, 22],
                    ],
                },
            },
        },
        {
            id: 'tunnel-path',
            type: 'line',
            metadata: { 'mapbox:group': '1444849354174.1904' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['==', '$type', 'LineString'],
                ['all', ['==', 'brunnel', 'tunnel'], ['==', 'class', 'path']],
            ],
            paint: {
                'line-color': '#f17626',
                'line-dasharray': [1.5, 0.75],
                'line-width': {
                    base: 1.2,
                    stops: [
                        [15, 1.2],
                        [20, 4],
                    ],
                },
            },
        },
        {
            id: 'tunnel-service-track',
            type: 'line',
            metadata: { 'mapbox:group': '1444849354174.1904' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'tunnel'], ['in', 'class', 'service', 'track']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#f17626',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [15.5, 0],
                        [16, 2],
                        [20, 7.5],
                    ],
                },
            },
        },
        {
            id: 'tunnel-minor',
            type: 'line',
            metadata: { 'mapbox:group': '1444849354174.1904' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'tunnel'], ['==', 'class', 'minor_road']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#f17626',
                'line-opacity': 1,
                'line-width': {
                    base: 1.2,
                    stops: [
                        [13.5, 0],
                        [14, 2.5],
                        [20, 11.5],
                    ],
                },
            },
        },
        {
            id: 'tunnel-secondary-tertiary',
            type: 'line',
            metadata: { 'mapbox:group': '1444849354174.1904' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'tunnel'], ['in', 'class', 'secondary', 'tertiary']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#f2853e',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [6.5, 0],
                        [7, 0.5],
                        [20, 10],
                    ],
                },
            },
        },
        {
            id: 'tunnel-trunk-primary',
            type: 'line',
            metadata: { 'mapbox:group': '1444849354174.1904' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'tunnel'], ['in', 'class', 'primary', 'trunk']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#d65d0e',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [6.5, 0],
                        [7, 0.5],
                        [20, 18],
                    ],
                },
            },
        },
        {
            id: 'tunnel-motorway',
            type: 'line',
            metadata: { 'mapbox:group': '1444849354174.1904' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'tunnel'], ['==', 'class', 'motorway']],
            layout: { 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': 'rgba(235,219,178,0.8)',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [6.5, 0],
                        [7, 0.5],
                        [20, 18],
                    ],
                },
            },
        },
        {
            id: 'tunnel-railway',
            type: 'line',
            metadata: { 'mapbox:group': '1444849354174.1904' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'tunnel'], ['==', 'class', 'rail']],
            paint: {
                'line-color': '#763308',
                'line-width': {
                    base: 1.4,
                    stops: [
                        [14, 0.4],
                        [15, 0.75],
                        [20, 2],
                    ],
                },
                'line-dasharray': [2, 2],
            },
        },
        {
            id: 'aeroway-taxiway-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'aeroway',
            minzoom: 12,
            filter: ['all', ['in', 'class', 'taxiway']],
            layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': '#763308',
                'line-width': {
                    base: 1.5,
                    stops: [
                        [11, 2],
                        [17, 12],
                    ],
                },
                'line-opacity': 1,
            },
        },
        {
            id: 'aeroway-runway-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'aeroway',
            minzoom: 12,
            filter: ['all', ['in', 'class', 'runway']],
            layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': '#763308',
                'line-width': {
                    base: 1.5,
                    stops: [
                        [11, 5],
                        [17, 55],
                    ],
                },
                'line-opacity': 1,
            },
        },
        {
            id: 'aeroway-area',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'aeroway',
            minzoom: 4,
            filter: ['all', ['==', '$type', 'Polygon'], ['in', 'class', 'runway', 'taxiway']],
            layout: { visibility: 'visible' },
            paint: {
                'fill-opacity': {
                    base: 1,
                    stops: [
                        [13, 0],
                        [14, 1],
                    ],
                },
                'fill-color': 'rgba(214,93,14,0.5)',
            },
        },
        {
            id: 'aeroway-taxiway',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'aeroway',
            minzoom: 4,
            filter: ['all', ['in', 'class', 'taxiway'], ['==', '$type', 'LineString']],
            layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': '#f2853e',
                'line-width': {
                    base: 1.5,
                    stops: [
                        [11, 1],
                        [17, 10],
                    ],
                },
                'line-opacity': {
                    base: 1,
                    stops: [
                        [11, 0],
                        [12, 1],
                    ],
                },
            },
        },
        {
            id: 'aeroway-runway',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'aeroway',
            minzoom: 4,
            filter: ['all', ['in', 'class', 'runway'], ['==', '$type', 'LineString']],
            layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': '#f2853e',
                'line-width': {
                    base: 1.5,
                    stops: [
                        [11, 4],
                        [17, 50],
                    ],
                },
                'line-opacity': {
                    base: 1,
                    stops: [
                        [11, 0],
                        [12, 1],
                    ],
                },
            },
        },
        {
            id: 'highway-area',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['==', '$type', 'Polygon'],
            layout: { visibility: 'visible' },
            paint: {
                'fill-color': '#a6480b',
                'fill-outline-color': '#cfcdca',
                'fill-opacity': 0.9,
                'fill-antialias': false,
            },
        },
        {
            id: 'highway-motorway-link-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            minzoom: 12,
            filter: ['all', ['!in', 'brunnel', 'bridge', 'tunnel'], ['==', 'class', 'motorway_link']],
            layout: { 'line-cap': 'round', 'line-join': 'round' },
            paint: {
                'line-color': '#d65d0e',
                'line-opacity': 1,
                'line-width': {
                    base: 1.2,
                    stops: [
                        [12, 1],
                        [13, 3],
                        [14, 4],
                        [20, 15],
                    ],
                },
            },
        },
        {
            id: 'highway-link-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            minzoom: 13,
            filter: [
                'all',
                ['!in', 'brunnel', 'bridge', 'tunnel'],
                ['in', 'class', 'primary_link', 'secondary_link', 'tertiary_link', 'trunk_link'],
            ],
            layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': '#d65d0e',
                'line-opacity': 1,
                'line-width': {
                    base: 1.2,
                    stops: [
                        [12, 1],
                        [13, 3],
                        [14, 4],
                        [20, 15],
                    ],
                },
            },
        },
        {
            id: 'highway-minor-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['==', '$type', 'LineString'],
                ['all', ['!=', 'brunnel', 'tunnel'], ['in', 'class', 'minor', 'service', 'track']],
            ],
            layout: { 'line-cap': 'round', 'line-join': 'round' },
            paint: {
                'line-color': 'rgba(214,93,14,0.8)',
                'line-opacity': {
                    stops: [
                        [12, 0],
                        [12.5, 1],
                    ],
                },
                'line-width': {
                    base: 1.2,
                    stops: [
                        [12, 0.5],
                        [13, 1],
                        [14, 4],
                        [20, 15],
                    ],
                },
            },
        },
        {
            id: 'highway-secondary-tertiary-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['!in', 'brunnel', 'bridge', 'tunnel'],
                ['in', 'class', 'secondary', 'tertiary'],
            ],
            layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': '#d65d0e',
                'line-opacity': 1,
                'line-width': {
                    base: 1.2,
                    stops: [
                        [8, 1.5],
                        [20, 17],
                    ],
                },
            },
        },
        {
            id: 'highway-primary-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            minzoom: 5,
            filter: ['all', ['!in', 'brunnel', 'bridge', 'tunnel'], ['in', 'class', 'primary']],
            layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': '#d65d0e',
                'line-opacity': {
                    stops: [
                        [7, 0],
                        [8, 1],
                    ],
                },
                'line-width': {
                    base: 1.2,
                    stops: [
                        [7, 0],
                        [8, 0.6],
                        [9, 1.5],
                        [20, 22],
                    ],
                },
            },
        },
        {
            id: 'highway-trunk-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            minzoom: 5,
            filter: ['all', ['!in', 'brunnel', 'bridge', 'tunnel'], ['in', 'class', 'trunk']],
            layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': '#d65d0e',
                'line-opacity': {
                    stops: [
                        [5, 0],
                        [6, 1],
                    ],
                },
                'line-width': {
                    base: 1.2,
                    stops: [
                        [5, 0],
                        [6, 0.6],
                        [7, 1.5],
                        [20, 22],
                    ],
                },
            },
        },
        {
            id: 'highway-motorway-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            minzoom: 4,
            filter: ['all', ['!in', 'brunnel', 'bridge', 'tunnel'], ['==', 'class', 'motorway']],
            layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': '#d65d0e',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [4, 0],
                        [5, 0.4],
                        [6, 0.6],
                        [7, 1.5],
                        [20, 22],
                    ],
                },
                'line-opacity': {
                    stops: [
                        [4, 0],
                        [5, 1],
                    ],
                },
            },
        },
        {
            id: 'highway-path',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['==', '$type', 'LineString'],
                ['all', ['!in', 'brunnel', 'bridge', 'tunnel'], ['==', 'class', 'path']],
            ],
            paint: {
                'line-color': '#b48ead',
                'line-dasharray': [1.5, 0.75],
                'line-width': {
                    base: 1.2,
                    stops: [
                        [15, 1.2],
                        [20, 4],
                    ],
                },
            },
        },
        {
            id: 'highway-motorway-link',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            minzoom: 12,
            filter: ['all', ['!in', 'brunnel', 'bridge', 'tunnel'], ['==', 'class', 'motorway_link']],
            layout: { 'line-cap': 'round', 'line-join': 'round' },
            paint: {
                'line-color': '#ebdbb2',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [12.5, 0],
                        [13, 1.5],
                        [14, 2.5],
                        [20, 11.5],
                    ],
                },
            },
        },
        {
            id: 'highway-link',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            minzoom: 13,
            filter: [
                'all',
                ['!in', 'brunnel', 'bridge', 'tunnel'],
                ['in', 'class', 'primary_link', 'secondary_link', 'tertiary_link', 'trunk_link'],
            ],
            layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': '#ebdbb2',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [12.5, 0],
                        [13, 1.5],
                        [14, 2.5],
                        [20, 11.5],
                    ],
                },
            },
        },
        {
            id: 'highway-minor',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['==', '$type', 'LineString'],
                ['all', ['!=', 'brunnel', 'tunnel'], ['in', 'class', 'minor', 'service', 'track']],
            ],
            layout: { 'line-cap': 'round', 'line-join': 'round' },
            paint: {
                'line-color': '#f49456',
                'line-opacity': 1,
                'line-width': {
                    base: 1.2,
                    stops: [
                        [13.5, 0],
                        [14, 2.5],
                        [20, 11.5],
                    ],
                },
            },
        },
        {
            id: 'highway-secondary-tertiary',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['!in', 'brunnel', 'bridge', 'tunnel'],
                ['in', 'class', 'secondary', 'tertiary'],
            ],
            layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': '#ebdbb2',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [6.5, 0],
                        [8, 0.5],
                        [20, 13],
                    ],
                },
            },
        },
        {
            id: 'highway-primary',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['==', '$type', 'LineString'],
                ['all', ['!in', 'brunnel', 'bridge', 'tunnel'], ['in', 'class', 'primary']],
            ],
            layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': '#ebdbb2',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [8.5, 0],
                        [9, 0.5],
                        [20, 18],
                    ],
                },
            },
        },
        {
            id: 'highway-trunk',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['==', '$type', 'LineString'],
                ['all', ['!in', 'brunnel', 'bridge', 'tunnel'], ['in', 'class', 'trunk']],
            ],
            layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': '#ebdbb2',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [6.5, 0],
                        [7, 0.5],
                        [20, 18],
                    ],
                },
            },
        },
        {
            id: 'highway-motorway',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            minzoom: 5,
            filter: [
                'all',
                ['==', '$type', 'LineString'],
                ['all', ['!in', 'brunnel', 'bridge', 'tunnel'], ['==', 'class', 'motorway']],
            ],
            layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': '#ebdbb2',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [6.5, 0],
                        [7, 0.5],
                        [20, 18],
                    ],
                },
            },
        },
        {
            id: 'railway-service',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['==', '$type', 'LineString'],
                ['all', ['==', 'class', 'rail'], ['has', 'service']],
            ],
            paint: {
                'line-color': 'rgba(118,51,8,0.7)',
                'line-width': {
                    base: 1.4,
                    stops: [
                        [14, 0.4],
                        [20, 1],
                    ],
                },
            },
        },
        {
            id: 'railway-service-hatching',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['==', '$type', 'LineString'],
                ['all', ['==', 'class', 'rail'], ['has', 'service']],
            ],
            layout: { visibility: 'visible' },
            paint: {
                'line-color': 'rgba(118,51,8,0.7)',
                'line-dasharray': [0.2, 8],
                'line-width': {
                    base: 1.4,
                    stops: [
                        [14.5, 0],
                        [15, 2],
                        [20, 6],
                    ],
                },
            },
        },
        {
            id: 'railway',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['==', '$type', 'LineString'],
                [
                    'all',
                    ['!has', 'service'],
                    ['!in', 'brunnel', 'bridge', 'tunnel'],
                    ['==', 'class', 'rail'],
                ],
            ],
            paint: {
                'line-color': '#763308',
                'line-width': {
                    base: 1.4,
                    stops: [
                        [14, 0.4],
                        [15, 0.75],
                        [20, 2],
                    ],
                },
            },
        },
        {
            id: 'railway-hatching',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['==', '$type', 'LineString'],
                [
                    'all',
                    ['!has', 'service'],
                    ['!in', 'brunnel', 'bridge', 'tunnel'],
                    ['==', 'class', 'rail'],
                ],
            ],
            paint: {
                'line-color': '#763308',
                'line-dasharray': [0.2, 8],
                'line-width': {
                    base: 1.4,
                    stops: [
                        [14.5, 0],
                        [15, 3],
                        [20, 8],
                    ],
                },
            },
        },
        {
            id: 'bridge-motorway-link-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849334699.1902' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'bridge'], ['==', 'class', 'motorway_link']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#d65d0e',
                'line-opacity': 1,
                'line-width': {
                    base: 1.2,
                    stops: [
                        [12, 1],
                        [13, 3],
                        [14, 4],
                        [20, 15],
                    ],
                },
            },
        },
        {
            id: 'bridge-link-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849334699.1902' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['==', 'brunnel', 'bridge'],
                ['in', 'class', 'primary_link', 'secondary_link', 'tertiary_link', 'trunk_link'],
            ],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#d65d0e',
                'line-opacity': 1,
                'line-width': {
                    base: 1.2,
                    stops: [
                        [12, 1],
                        [13, 3],
                        [14, 4],
                        [20, 15],
                    ],
                },
            },
        },
        {
            id: 'bridge-secondary-tertiary-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849334699.1902' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'bridge'], ['in', 'class', 'secondary', 'tertiary']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#d65d0e',
                'line-opacity': 1,
                'line-width': {
                    base: 1.2,
                    stops: [
                        [8, 1.5],
                        [20, 28],
                    ],
                },
            },
        },
        {
            id: 'bridge-trunk-primary-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849334699.1902' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'bridge'], ['in', 'class', 'primary', 'trunk']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#d65d0e',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [5, 0.4],
                        [6, 0.6],
                        [7, 1.5],
                        [20, 26],
                    ],
                },
            },
        },
        {
            id: 'bridge-motorway-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849334699.1902' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'bridge'], ['==', 'class', 'motorway']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#d65d0e',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [5, 0.4],
                        [6, 0.6],
                        [7, 1.5],
                        [20, 22],
                    ],
                },
            },
        },
        {
            id: 'bridge-path-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849334699.1902' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['==', '$type', 'LineString'],
                ['all', ['==', 'brunnel', 'bridge'], ['==', 'class', 'path']],
            ],
            paint: {
                'line-color': '#f17626',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [15, 1.2],
                        [20, 18],
                    ],
                },
            },
        },
        {
            id: 'bridge-path',
            type: 'line',
            metadata: { 'mapbox:group': '1444849334699.1902' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['==', '$type', 'LineString'],
                ['all', ['==', 'brunnel', 'bridge'], ['==', 'class', 'path']],
            ],
            paint: {
                'line-color': '#b48ead',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [15, 1.2],
                        [20, 4],
                    ],
                },
                'line-dasharray': [1.5, 0.75],
            },
        },
        {
            id: 'bridge-motorway-link',
            type: 'line',
            metadata: { 'mapbox:group': '1444849334699.1902' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'bridge'], ['==', 'class', 'motorway_link']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#ebdbb2',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [12.5, 0],
                        [13, 1.5],
                        [14, 2.5],
                        [20, 11.5],
                    ],
                },
            },
        },
        {
            id: 'bridge-link',
            type: 'line',
            metadata: { 'mapbox:group': '1444849334699.1902' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['==', 'brunnel', 'bridge'],
                ['in', 'class', 'primary_link', 'secondary_link', 'tertiary_link', 'trunk_link'],
            ],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#ebdbb2',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [12.5, 0],
                        [13, 1.5],
                        [14, 2.5],
                        [20, 11.5],
                    ],
                },
            },
        },
        {
            id: 'bridge-secondary-tertiary',
            type: 'line',
            metadata: { 'mapbox:group': '1444849334699.1902' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'bridge'], ['in', 'class', 'secondary', 'tertiary']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#ebdbb2',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [6.5, 0],
                        [7, 0.5],
                        [20, 20],
                    ],
                },
            },
        },
        {
            id: 'bridge-trunk-primary',
            type: 'line',
            metadata: { 'mapbox:group': '1444849334699.1902' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'bridge'], ['in', 'class', 'primary', 'trunk']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#ebdbb2',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [6.5, 0],
                        [7, 0.5],
                        [20, 18],
                    ],
                },
            },
        },
        {
            id: 'bridge-motorway',
            type: 'line',
            metadata: { 'mapbox:group': '1444849334699.1902' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'bridge'], ['==', 'class', 'motorway']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#ebdbb2',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [6.5, 0],
                        [7, 0.5],
                        [20, 18],
                    ],
                },
            },
        },
        {
            id: 'bridge-railway',
            type: 'line',
            metadata: { 'mapbox:group': '1444849334699.1902' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'bridge'], ['==', 'class', 'rail']],
            paint: {
                'line-color': '#763308',
                'line-width': {
                    base: 1.4,
                    stops: [
                        [14, 0.4],
                        [15, 0.75],
                        [20, 2],
                    ],
                },
            },
        },
        {
            id: 'bridge-railway-hatching',
            type: 'line',
            metadata: { 'mapbox:group': '1444849334699.1902' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'bridge'], ['==', 'class', 'rail']],
            paint: {
                'line-color': '#763308',
                'line-dasharray': [0.2, 8],
                'line-width': {
                    base: 1.4,
                    stops: [
                        [14.5, 0],
                        [15, 3],
                        [20, 8],
                    ],
                },
            },
        },
        {
            id: 'boundary-land-level-4',
            type: 'line',
            source: 'openmaptiles',
            'source-layer': 'boundary',
            filter: ['all', ['in', 'admin_level', 4, 6, 8], ['!=', 'maritime', 1]],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#8fbcbb',
                'line-dasharray': [3, 1, 1, 1],
                'line-width': {
                    base: 1.4,
                    stops: [
                        [4, 0.4],
                        [5, 1],
                        [12, 3],
                    ],
                },
            },
        },
        {
            id: 'boundary-land-level-2',
            type: 'line',
            source: 'openmaptiles',
            'source-layer': 'boundary',
            filter: ['all', ['==', 'admin_level', 2], ['!=', 'maritime', 1]],
            layout: { 'line-cap': 'round', 'line-join': 'round' },
            paint: {
                'line-color': '#8fbcbb',
                'line-width': {
                    base: 1,
                    stops: [
                        [0, 0.6],
                        [4, 1.4],
                        [5, 2],
                        [12, 8],
                    ],
                },
            },
        },
        {
            id: 'boundary-water',
            type: 'line',
            source: 'openmaptiles',
            'source-layer': 'boundary',
            filter: ['all', ['in', 'admin_level', 2, 4], ['==', 'maritime', 1]],
            layout: { 'line-cap': 'round', 'line-join': 'round' },
            paint: {
                'line-color': '#8fbcbb',
                'line-width': {
                    base: 1,
                    stops: [
                        [0, 0.6],
                        [4, 1.4],
                        [5, 2],
                        [12, 8],
                    ],
                },
                'line-opacity': {
                    stops: [
                        [6, 0.6],
                        [10, 1],
                    ],
                },
            },
        },
        {
            id: 'waterway-name',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'waterway',
            minzoom: 13,
            filter: ['all', ['==', '$type', 'LineString'], ['has', 'name'], ['!has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Italic'],
                'text-size': 14,
                'text-field': '{name:latin} {name:nonlatin}',
                'text-max-width': 5,
                'text-rotation-alignment': 'map',
                'symbol-placement': 'line',
                'text-letter-spacing': 0.2,
                'symbol-spacing': 350,
            },
            paint: { 'text-color': '#fefefe', 'text-halo-width': 1.5, 'text-halo-color': '#74aee9' },
        },
        {
            id: 'waterway-name-en',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'waterway',
            minzoom: 13,
            filter: ['all', ['==', '$type', 'LineString'], ['has', 'name'], ['has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Italic'],
                'text-size': 14,
                'text-field': '{name:de} {name:nonlatin}',
                'text-max-width': 5,
                'text-rotation-alignment': 'map',
                'symbol-placement': 'line',
                'text-letter-spacing': 0.2,
                'symbol-spacing': 350,
            },
            paint: { 'text-color': '#fefefe', 'text-halo-width': 1.5, 'text-halo-color': '#74aee9' },
        },
        {
            id: 'water-name-lakeline',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'water_name',
            filter: ['all', ['==', '$type', 'LineString'], ['!has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Italic'],
                'text-size': 14,
                'text-field': '{name:latin} {name:nonlatin}',
                'text-max-width': 5,
                'text-rotation-alignment': 'map',
                'symbol-placement': 'line',
                'symbol-spacing': 350,
                'text-letter-spacing': 0.2,
            },
            paint: { 'text-color': '#fefefe', 'text-halo-width': 1.5, 'text-halo-color': '#74aee9' },
        },
        {
            id: 'water-name-lakeline-en',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'water_name',
            filter: ['all', ['==', '$type', 'LineString'], ['has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Italic'],
                'text-size': 14,
                'text-field': '{name:de} {name:nonlatin}',
                'text-max-width': 5,
                'text-rotation-alignment': 'map',
                'symbol-placement': 'line',
                'symbol-spacing': 350,
                'text-letter-spacing': 0.2,
            },
            paint: { 'text-color': '#fefefe', 'text-halo-width': 1.5, 'text-halo-color': '#74aee9' },
        },
        {
            id: 'water-name-ocean',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'water_name',
            filter: ['all', ['==', '$type', 'Point'], ['==', 'class', 'ocean'], ['!has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Italic'],
                'text-size': 14,
                'text-field': '{name:latin}\n{name:nonlatin}',
                'text-max-width': 5,
                'text-rotation-alignment': 'map',
                'symbol-placement': 'point',
                'symbol-spacing': 350,
                'text-letter-spacing': 0.2,
            },
            paint: { 'text-color': '#fefefe', 'text-halo-width': 1.5, 'text-halo-color': '#74aee9' },
        },
        {
            id: 'water-name-ocean-en',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'water_name',
            filter: ['all', ['==', '$type', 'Point'], ['==', 'class', 'ocean'], ['has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Italic'],
                'text-size': 14,
                'text-field': '{name:de}\n{name:nonlatin}',
                'text-max-width': 5,
                'text-rotation-alignment': 'map',
                'symbol-placement': 'point',
                'symbol-spacing': 350,
                'text-letter-spacing': 0.2,
            },
            paint: { 'text-color': '#fefefe', 'text-halo-width': 1.5, 'text-halo-color': '#74aee9' },
        },
        {
            id: 'water-name-other',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'water_name',
            filter: ['all', ['==', '$type', 'Point'], ['!in', 'class', 'ocean'], ['!has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Italic'],
                'text-size': {
                    stops: [
                        [0, 10],
                        [6, 14],
                    ],
                },
                'text-field': '{name:latin}\n{name:nonlatin}',
                'text-max-width': 5,
                'text-rotation-alignment': 'map',
                'symbol-placement': 'point',
                'symbol-spacing': 350,
                'text-letter-spacing': 0.2,
                visibility: 'visible',
            },
            paint: { 'text-color': '#fefefe', 'text-halo-width': 1.5, 'text-halo-color': '#74aee9' },
        },
        {
            id: 'water-name-other-en',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'water_name',
            filter: ['all', ['==', '$type', 'Point'], ['!in', 'class', 'ocean'], ['has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Italic'],
                'text-size': {
                    stops: [
                        [0, 10],
                        [6, 14],
                    ],
                },
                'text-field': '{name:de}\n{name:nonlatin}',
                'text-max-width': 5,
                'text-rotation-alignment': 'map',
                'symbol-placement': 'point',
                'symbol-spacing': 350,
                'text-letter-spacing': 0.2,
                visibility: 'visible',
            },
            paint: { 'text-color': '#fefefe', 'text-halo-width': 1.5, 'text-halo-color': '#74aee9' },
        },
        {
            id: 'poi-level-3',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'poi',
            minzoom: 16,
            filter: ['all', ['==', '$type', 'Point'], ['>=', 'rank', 25], ['!has', 'name:de']],
            layout: {
                'text-padding': 2,
                'text-font': ['Open Sans Semibold'],
                'text-anchor': 'top',
                'icon-image': '{class}_11',
                'text-field': '{name:latin}\n{name:nonlatin}',
                'text-offset': [0, 0.6],
                'text-size': 12,
                'text-max-width': 9,
            },
            paint: {
                'text-halo-blur': 0.5,
                'text-color': '#fdfdfd',
                'text-halo-width': 1,
                'text-halo-color': '#633',
            },
        },
        {
            id: 'poi-level-3-en',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'poi',
            minzoom: 16,
            filter: ['all', ['==', '$type', 'Point'], ['>=', 'rank', 25], ['has', 'name:de']],
            layout: {
                'text-padding': 2,
                'text-font': ['Open Sans Semibold'],
                'text-anchor': 'top',
                'icon-image': '{class}_11',
                'text-field': '{name:de}\n{name:nonlatin}',
                'text-offset': [0, 0.6],
                'text-size': 12,
                'text-max-width': 9,
            },
            paint: {
                'text-halo-blur': 0.5,
                'text-color': '#fdfdfd',
                'text-halo-width': 1,
                'text-halo-color': '#633',
            },
        },
        {
            id: 'poi-level-2',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'poi',
            minzoom: 15,
            filter: [
                'all',
                ['==', '$type', 'Point'],
                ['all', ['<=', 'rank', 24], ['>=', 'rank', 15]],
                ['!has', 'name:de'],
            ],
            layout: {
                'text-padding': 2,
                'text-font': ['Open Sans Semibold'],
                'text-anchor': 'top',
                'icon-image': '{class}_11',
                'text-field': '{name:latin}\n{name:nonlatin}',
                'text-offset': [0, 0.6],
                'text-size': 12,
                'text-max-width': 9,
            },
            paint: {
                'text-halo-blur': 0.5,
                'text-color': '#fdfdfd',
                'text-halo-width': 1,
                'text-halo-color': '#633',
            },
        },
        {
            id: 'poi-level-2-en',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'poi',
            minzoom: 15,
            filter: [
                'all',
                ['==', '$type', 'Point'],
                ['all', ['<=', 'rank', 24], ['>=', 'rank', 15]],
                ['has', 'name:de'],
            ],
            layout: {
                'text-padding': 2,
                'text-font': ['Open Sans Semibold'],
                'text-anchor': 'top',
                'icon-image': '{class}_11',
                'text-field': '{name:de}\n{name:nonlatin}',
                'text-offset': [0, 0.6],
                'text-size': 12,
                'text-max-width': 9,
            },
            paint: {
                'text-halo-blur': 0.5,
                'text-color': '#fdfdfd',
                'text-halo-width': 1,
                'text-halo-color': '#633',
            },
        },
        {
            id: 'poi-level-1',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'poi',
            minzoom: 14,
            filter: [
                'all',
                ['==', '$type', 'Point'],
                ['all', ['<=', 'rank', 14], ['has', 'name']],
                ['!has', 'name:de'],
            ],
            layout: {
                'text-padding': 2,
                'text-font': ['Open Sans Semibold'],
                'text-anchor': 'top',
                'icon-image': '{class}_11',
                'text-field': '{name:latin}\n{name:nonlatin}',
                'text-offset': [0, 0.6],
                'text-size': 12,
                'text-max-width': 9,
            },
            paint: {
                'text-halo-blur': 0.5,
                'text-color': '#fdfdfd',
                'text-halo-width': 1,
                'text-halo-color': '#633',
            },
        },
        {
            id: 'poi-level-1-en',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'poi',
            minzoom: 14,
            filter: [
                'all',
                ['==', '$type', 'Point'],
                ['all', ['<=', 'rank', 14], ['has', 'name']],
                ['has', 'name:de'],
            ],
            layout: {
                'text-padding': 2,
                'text-font': ['Open Sans Semibold'],
                'text-anchor': 'top',
                'icon-image': '{class}_11',
                'text-field': '{name:de}\n{name:nonlatin}',
                'text-offset': [0, 0.6],
                'text-size': 12,
                'text-max-width': 9,
            },
            paint: {
                'text-halo-blur': 0.5,
                'text-color': '#fdfdfd',
                'text-halo-width': 1,
                'text-halo-color': '#633',
            },
        },
        {
            id: 'highway-name-path',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'transportation_name',
            minzoom: 15.5,
            filter: ['all', ['==', 'class', 'path'], ['!has', 'name:de']],
            layout: {
                'text-size': {
                    base: 1,
                    stops: [
                        [13, 12],
                        [14, 13],
                    ],
                },
                'text-font': ['Open Sans Regular'],
                'text-field': '{name:latin} {name:nonlatin}',
                'symbol-placement': 'line',
                'text-rotation-alignment': 'map',
            },
            paint: {
                'text-halo-color': '#f8f4f0',
                'text-color': 'hsl(30, 23%, 62%)',
                'text-halo-width': 0.5,
            },
        },
        {
            id: 'highway-name-path-en',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'transportation_name',
            minzoom: 15.5,
            filter: ['all', ['==', 'class', 'path'], ['has', 'name:de']],
            layout: {
                'text-size': {
                    base: 1,
                    stops: [
                        [13, 12],
                        [14, 13],
                    ],
                },
                'text-font': ['Open Sans Regular'],
                'text-field': '{name:de} {name:nonlatin}',
                'symbol-placement': 'line',
                'text-rotation-alignment': 'map',
            },
            paint: {
                'text-halo-color': '#f8f4f0',
                'text-color': 'hsl(30, 23%, 62%)',
                'text-halo-width': 0.5,
            },
        },
        {
            id: 'highway-name-minor',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'transportation_name',
            minzoom: 15,
            filter: [
                'all',
                ['==', '$type', 'LineString'],
                ['in', 'class', 'minor', 'service', 'track'],
                ['!has', 'name:de'],
            ],
            layout: {
                'text-size': {
                    base: 1,
                    stops: [
                        [13, 12],
                        [14, 13],
                    ],
                },
                'text-font': ['Open Sans Regular'],
                'text-field': '{name:latin} {name:nonlatin}',
                'symbol-placement': 'line',
                'text-rotation-alignment': 'map',
            },
            paint: { 'text-halo-blur': 0.5, 'text-color': '#765', 'text-halo-width': 1 },
        },
        {
            id: 'highway-name-minor-en',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'transportation_name',
            minzoom: 15,
            filter: [
                'all',
                ['==', '$type', 'LineString'],
                ['in', 'class', 'minor', 'service', 'track'],
                ['has', 'name:de'],
            ],
            layout: {
                'text-size': {
                    base: 1,
                    stops: [
                        [13, 12],
                        [14, 13],
                    ],
                },
                'text-font': ['Open Sans Regular'],
                'text-field': '{name:de} {name:nonlatin}',
                'symbol-placement': 'line',
                'text-rotation-alignment': 'map',
            },
            paint: { 'text-halo-blur': 0.5, 'text-color': '#765', 'text-halo-width': 1 },
        },
        {
            id: 'highway-name-major',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'transportation_name',
            minzoom: 12.2,
            filter: [
                'all',
                ['in', 'class', 'primary', 'secondary', 'tertiary', 'trunk'],
                ['!has', 'name:de'],
            ],
            layout: {
                'text-size': {
                    base: 1,
                    stops: [
                        [13, 12],
                        [14, 13],
                    ],
                },
                'text-font': ['Open Sans Regular'],
                'text-field': '{name:latin} {name:nonlatin}',
                'symbol-placement': 'line',
                'text-rotation-alignment': 'map',
            },
            paint: { 'text-halo-blur': 0.5, 'text-color': '#765', 'text-halo-width': 1 },
        },
        {
            id: 'highway-name-major-en',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'transportation_name',
            minzoom: 12.2,
            filter: [
                'all',
                ['in', 'class', 'primary', 'secondary', 'tertiary', 'trunk'],
                ['has', 'name:de'],
            ],
            layout: {
                'text-size': {
                    base: 1,
                    stops: [
                        [13, 12],
                        [14, 13],
                    ],
                },
                'text-font': ['Open Sans Regular'],
                'text-field': '{name:de} {name:nonlatin}',
                'symbol-placement': 'line',
                'text-rotation-alignment': 'map',
            },
            paint: { 'text-halo-blur': 0.5, 'text-color': '#765', 'text-halo-width': 1 },
        },
        {
            id: 'highway-shield',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'transportation_name',
            minzoom: 8,
            filter: [
                'all',
                ['<=', 'ref_length', 6],
                ['==', '$type', 'LineString'],
                ['!in', 'network', 'us-interstate', 'us-highway', 'us-state'],
            ],
            layout: {
                'text-size': 10,
                'icon-image': 'road_{ref_length}',
                'icon-rotation-alignment': 'viewport',
                'symbol-spacing': 200,
                'text-font': ['Open Sans Semibold'],
                'symbol-placement': {
                    base: 1,
                    stops: [
                        [10, 'point'],
                        [11, 'line'],
                    ],
                },
                'text-rotation-alignment': 'viewport',
                'icon-size': 1,
                'text-field': '{ref}',
            },
            paint: {},
        },
        {
            id: 'highway-shield-us-interstate',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'transportation_name',
            minzoom: 7,
            filter: [
                'all',
                ['<=', 'ref_length', 6],
                ['==', '$type', 'LineString'],
                ['in', 'network', 'us-interstate'],
            ],
            layout: {
                'text-size': 10,
                'icon-image': '{network}_{ref_length}',
                'icon-rotation-alignment': 'viewport',
                'symbol-spacing': 200,
                'text-font': ['Open Sans Semibold'],
                'symbol-placement': {
                    base: 1,
                    stops: [
                        [7, 'point'],
                        [7, 'line'],
                        [8, 'line'],
                    ],
                },
                'text-rotation-alignment': 'viewport',
                'icon-size': 1,
                'text-field': '{ref}',
            },
            paint: { 'text-color': 'rgba(0, 0, 0, 1)' },
        },
        {
            id: 'highway-shield-us-other',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'transportation_name',
            minzoom: 9,
            filter: [
                'all',
                ['<=', 'ref_length', 6],
                ['==', '$type', 'LineString'],
                ['in', 'network', 'us-highway', 'us-state'],
            ],
            layout: {
                'text-size': 10,
                'icon-image': '{network}_{ref_length}',
                'icon-rotation-alignment': 'viewport',
                'symbol-spacing': 200,
                'text-font': ['Open Sans Semibold'],
                'symbol-placement': {
                    base: 1,
                    stops: [
                        [10, 'point'],
                        [11, 'line'],
                    ],
                },
                'text-rotation-alignment': 'viewport',
                'icon-size': 1,
                'text-field': '{ref}',
            },
            paint: { 'text-color': 'rgba(0, 0, 0, 1)' },
        },
        {
            id: 'place-other',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['!in', 'class', 'city', 'town', 'village'], ['!has', 'name:de']],
            layout: {
                'text-letter-spacing': 0.1,
                'text-size': {
                    base: 1.2,
                    stops: [
                        [12, 10],
                        [15, 14],
                    ],
                },
                'text-font': ['Open Sans Bold'],
                'text-field': '{name:latin}\n{name:nonlatin}',
                'text-transform': 'uppercase',
                'text-max-width': 9,
            },
            paint: { 'text-color': '#fdfdfd', 'text-halo-width': 1.2, 'text-halo-color': '#433' },
        },
        {
            id: 'place-other-en',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['!in', 'class', 'city', 'town', 'village'], ['has', 'name:de']],
            layout: {
                'text-letter-spacing': 0.1,
                'text-size': {
                    base: 1.2,
                    stops: [
                        [12, 10],
                        [15, 14],
                    ],
                },
                'text-font': ['Open Sans Bold'],
                'text-field': '{name:de}\n{name:nonlatin}',
                'text-transform': 'uppercase',
                'text-max-width': 9,
            },
            paint: { 'text-color': '#fdfdfd', 'text-halo-width': 1.2, 'text-halo-color': '#433' },
        },
        {
            id: 'place-village',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['==', 'class', 'village'], ['!has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Regular'],
                'text-size': {
                    base: 1.2,
                    stops: [
                        [10, 12],
                        [15, 22],
                    ],
                },
                'text-field': '{name:latin}\n{name:nonlatin}',
                'text-max-width': 8,
            },
            paint: { 'text-color': '#fdfdfd', 'text-halo-width': 1.2, 'text-halo-color': '#433' },
        },
        {
            id: 'place-village-en',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['==', 'class', 'village'], ['has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Regular'],
                'text-size': {
                    base: 1.2,
                    stops: [
                        [10, 12],
                        [15, 22],
                    ],
                },
                'text-field': '{name:de}\n{name:nonlatin}',
                'text-max-width': 8,
            },
            paint: { 'text-color': '#fdfdfd', 'text-halo-width': 1.2, 'text-halo-color': '#433' },
        },
        {
            id: 'place-town',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['==', 'class', 'town'], ['!has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Regular'],
                'text-size': {
                    base: 1.2,
                    stops: [
                        [10, 14],
                        [15, 24],
                    ],
                },
                'text-field': '{name:latin}\n{name:nonlatin}',
                'text-max-width': 8,
            },
            paint: { 'text-color': '#fdfdfd', 'text-halo-width': 1.2, 'text-halo-color': '#433' },
        },
        {
            id: 'place-town-en',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['==', 'class', 'town'], ['has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Regular'],
                'text-size': {
                    base: 1.2,
                    stops: [
                        [10, 14],
                        [15, 24],
                    ],
                },
                'text-field': '{name:de}\n{name:nonlatin}',
                'text-max-width': 8,
            },
            paint: { 'text-color': '#fdfdfd', 'text-halo-width': 1.2, 'text-halo-color': '#433' },
        },
        {
            id: 'place-city',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['!=', 'capital', 2], ['==', 'class', 'city'], ['!has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Semibold'],
                'text-size': {
                    base: 1.2,
                    stops: [
                        [7, 14],
                        [11, 24],
                    ],
                },
                'text-field': '{name:latin}\n{name:nonlatin}',
                'text-max-width': 8,
            },
            paint: { 'text-color': '#fdfdfd', 'text-halo-width': 1.2, 'text-halo-color': '#433' },
        },
        {
            id: 'place-city-en',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['!=', 'capital', 2], ['==', 'class', 'city'], ['has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Semibold'],
                'text-size': {
                    base: 1.2,
                    stops: [
                        [7, 14],
                        [11, 24],
                    ],
                },
                'text-field': '{name:de}\n{name:nonlatin}',
                'text-max-width': 8,
            },
            paint: { 'text-color': '#fdfdfd', 'text-halo-width': 1.2, 'text-halo-color': '#433' },
        },
        {
            id: 'place-city-capital',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['==', 'capital', 2], ['==', 'class', 'city'], ['!has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Semibold'],
                'text-size': {
                    base: 1.2,
                    stops: [
                        [7, 14],
                        [11, 24],
                    ],
                },
                'text-field': '{name:latin}\n{name:nonlatin}',
                'text-max-width': 8,
                'icon-image': 'star_11',
                'text-offset': [0.4, 0],
                'icon-size': 0.8,
                'text-anchor': 'left',
            },
            paint: { 'text-color': '#fdfdfd', 'text-halo-width': 1.2, 'text-halo-color': '#433' },
        },
        {
            id: 'place-city-capital-en',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['==', 'capital', 2], ['==', 'class', 'city'], ['has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Semibold'],
                'text-size': {
                    base: 1.2,
                    stops: [
                        [7, 14],
                        [11, 24],
                    ],
                },
                'text-field': '{name:de}\n{name:nonlatin}',
                'text-max-width': 8,
                'icon-image': 'star_11',
                'text-offset': [0.4, 0],
                'icon-size': 0.8,
                'text-anchor': 'left',
            },
            paint: { 'text-color': '#fdfdfd', 'text-halo-width': 1.2, 'text-halo-color': '#433' },
        },
        {
            id: 'place-country-3',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['==', 'class', 'country'], ['>=', 'rank', 3], ['!has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Bold'],
                'text-field': '{name:latin}\n{name:nonlatin}',
                'text-size': {
                    stops: [
                        [3, 11],
                        [7, 17],
                    ],
                },
                'text-transform': 'uppercase',
                'text-max-width': 6.25,
            },
            paint: {
                'text-halo-blur': 1,
                'text-color': '#fdfdfd',
                'text-halo-width': 2,
                'text-halo-color': '#433',
            },
        },
        {
            id: 'place-country-3-en',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['==', 'class', 'country'], ['>=', 'rank', 3], ['has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Bold'],
                'text-field': '{name:de}\n{name:nonlatin}',
                'text-size': {
                    stops: [
                        [3, 11],
                        [7, 17],
                    ],
                },
                'text-transform': 'uppercase',
                'text-max-width': 6.25,
            },
            paint: {
                'text-halo-blur': 1,
                'text-color': '#fdfdfd',
                'text-halo-width': 2,
                'text-halo-color': '#433',
            },
        },
        {
            id: 'place-country-2',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['==', 'class', 'country'], ['==', 'rank', 2], ['!has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Bold'],
                'text-field': '{name:latin}\n{name:nonlatin}',
                'text-size': {
                    stops: [
                        [2, 11],
                        [5, 17],
                    ],
                },
                'text-transform': 'uppercase',
                'text-max-width': 6.25,
            },
            paint: {
                'text-halo-blur': 1,
                'text-color': '#fdfdfd',
                'text-halo-width': 2,
                'text-halo-color': '#433',
            },
        },
        {
            id: 'place-country-2-en',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['==', 'class', 'country'], ['==', 'rank', 2], ['has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Bold'],
                'text-field': '{name:de}\n{name:nonlatin}',
                'text-size': {
                    stops: [
                        [2, 11],
                        [5, 17],
                    ],
                },
                'text-transform': 'uppercase',
                'text-max-width': 6.25,
            },
            paint: {
                'text-halo-blur': 1,
                'text-color': '#fdfdfd',
                'text-halo-width': 2,
                'text-halo-color': '#433',
            },
        },
        {
            id: 'place-country-1',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['==', 'class', 'country'], ['==', 'rank', 1], ['!has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Bold'],
                'text-field': '{name:latin}\n{name:nonlatin}',
                'text-size': {
                    stops: [
                        [1, 11],
                        [4, 17],
                    ],
                },
                'text-transform': 'uppercase',
                'text-max-width': 6.25,
            },
            paint: {
                'text-halo-blur': 1,
                'text-color': '#fdfdfd',
                'text-halo-width': 2,
                'text-halo-color': '#433',
            },
        },
        {
            id: 'place-country-1-en',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['==', 'class', 'country'], ['==', 'rank', 1], ['has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Bold'],
                'text-field': '{name:de}\n{name:nonlatin}',
                'text-size': {
                    stops: [
                        [1, 11],
                        [4, 17],
                    ],
                },
                'text-transform': 'uppercase',
                'text-max-width': 6.25,
            },
            paint: {
                'text-halo-blur': 1,
                'text-color': '#fdfdfd',
                'text-halo-width': 2,
                'text-halo-color': '#433',
            },
        },
        {
            id: 'place-continent',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            maxzoom: 1,
            filter: ['all', ['==', 'class', 'continent'], ['!has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Bold'],
                'text-field': '{name:latin}\n{name:nonlatin}',
                'text-size': 14,
                'text-max-width': 6.25,
                'text-transform': 'uppercase',
            },
            paint: {
                'text-halo-blur': 1,
                'text-color': '#fdfdfd',
                'text-halo-width': 2,
                'text-halo-color': '#433',
            },
        },
        {
            id: 'place-continent-en',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            maxzoom: 1,
            filter: ['all', ['==', 'class', 'continent'], ['has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Bold'],
                'text-field': '{name:de}\n{name:nonlatin}',
                'text-size': 14,
                'text-max-width': 6.25,
                'text-transform': 'uppercase',
            },
            paint: {
                'text-halo-blur': 1,
                'text-color': '#fdfdfd',
                'text-halo-width': 2,
                'text-halo-color': '#433',
            },
        },
    ],
};

var MedievalKingdomStyle = {
    version: 8,
    name: 'Medieval Kingdom',
    center: [8.542, 47.372],
    zoom: 11.6,
    bearing: 0,
    pitch: 0,
    sources: {
        openmaptiles: {
            type: 'vector',
            url: config.source_openmaptiles_url,
        },
    },
    sprite: config.sprite,
    glyphs: config.glyphs,
    layers: [
        { id: 'background', type: 'background', paint: { 'background-color': '#ffd1a8' } },
        {
            id: 'landcover-glacier',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849388993.3071' },
            source: 'openmaptiles',
            'source-layer': 'landcover',
            filter: ['==', 'subclass', 'glacier'],
            layout: { visibility: 'visible' },
            paint: {
                'fill-color': '#228B22',
                'fill-opacity': {
                    base: 1,
                    stops: [
                        [0, 0.9],
                        [10, 0.3],
                    ],
                },
            },
        },
        {
            id: 'landuse-residential',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849388993.3071' },
            source: 'openmaptiles',
            'source-layer': 'landuse',
            filter: ['==', 'class', 'residential'],
            paint: { 'fill-color': '#bfa677' },
        },
        {
            id: 'landuse-commercial',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849388993.3071' },
            source: 'openmaptiles',
            'source-layer': 'landuse',
            filter: ['all', ['==', '$type', 'Polygon'], ['==', 'class', 'commercial']],
            paint: { 'fill-color': '#c5af85' },
        },
        {
            id: 'landuse-industrial',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849388993.3071' },
            source: 'openmaptiles',
            'source-layer': 'landuse',
            filter: ['all', ['==', '$type', 'Polygon'], ['==', 'class', 'industrial']],
            paint: { 'fill-color': '#ccb892' },
        },
        {
            id: 'park',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849388993.3071' },
            source: 'openmaptiles',
            'source-layer': 'park',
            filter: ['==', '$type', 'Polygon'],
            paint: {
                'fill-color': '#556B2F',
                'fill-opacity': {
                    base: 1.8,
                    stops: [
                        [9, 0.5],
                        [12, 0.2],
                    ],
                },
            },
        },
        {
            id: 'park-outline',
            type: 'line',
            metadata: { 'mapbox:group': '1444849388993.3071' },
            source: 'openmaptiles',
            'source-layer': 'park',
            filter: ['==', '$type', 'Polygon'],
            layout: {},
            paint: { 'line-color': 'rgba(85,107,47,0.6)', 'line-dasharray': [3, 3] },
        },
        {
            id: 'landuse-cemetery',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849388993.3071' },
            source: 'openmaptiles',
            'source-layer': 'landuse',
            filter: ['==', 'class', 'cemetery'],
            paint: { 'fill-color': '#d1e0b8' },
        },
        {
            id: 'landuse-hospital',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849388993.3071' },
            source: 'openmaptiles',
            'source-layer': 'landuse',
            filter: ['==', 'class', 'hospital'],
            paint: { 'fill-color': '#FFC0CB' },
        },
        {
            id: 'landuse-school',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849388993.3071' },
            source: 'openmaptiles',
            'source-layer': 'landuse',
            filter: ['==', 'class', 'school'],
            paint: { 'fill-color': 'rgba(255,192,203,0.8)' },
        },
        {
            id: 'landuse-railway',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849388993.3071' },
            source: 'openmaptiles',
            'source-layer': 'landuse',
            filter: ['==', 'class', 'railway'],
            paint: { 'fill-color': 'rgba(149,46,46,0.4)' },
        },
        {
            id: 'landcover-wood',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849388993.3071' },
            source: 'openmaptiles',
            'source-layer': 'landcover',
            filter: ['==', 'class', 'wood'],
            paint: {
                'fill-color': '#228B22',
                'fill-opacity': 0.1,
                'fill-outline-color': 'hsla(0, 0%, 0%, 0.03)',
                'fill-antialias': {
                    base: 1,
                    stops: [
                        [0, false],
                        [9, true],
                    ],
                },
            },
        },
        {
            id: 'landcover-grass',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849388993.3071' },
            source: 'openmaptiles',
            'source-layer': 'landcover',
            filter: ['==', 'class', 'grass'],
            paint: { 'fill-color': '#556B2F', 'fill-opacity': 1 },
        },
        {
            id: 'landcover-grass-park',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849388993.3071' },
            source: 'openmaptiles',
            'source-layer': 'park',
            filter: ['==', 'class', 'public_park'],
            paint: { 'fill-color': '#556B2F', 'fill-opacity': 0.8 },
        },
        {
            id: 'waterway-other',
            type: 'line',
            metadata: { 'mapbox:group': '1444849382550.77' },
            source: 'openmaptiles',
            'source-layer': 'waterway',
            filter: ['!in', 'class', 'canal', 'river', 'stream'],
            layout: { 'line-cap': 'round' },
            paint: {
                'line-color': '#1E90FF',
                'line-width': {
                    base: 1.3,
                    stops: [
                        [13, 0.5],
                        [20, 2],
                    ],
                },
            },
        },
        {
            id: 'waterway-stream-canal',
            type: 'line',
            metadata: { 'mapbox:group': '1444849382550.77' },
            source: 'openmaptiles',
            'source-layer': 'waterway',
            filter: ['in', 'class', 'canal', 'stream'],
            layout: { 'line-cap': 'round' },
            paint: {
                'line-color': '#1E90FF',
                'line-width': {
                    base: 1.3,
                    stops: [
                        [13, 0.5],
                        [20, 6],
                    ],
                },
            },
        },
        {
            id: 'waterway-river',
            type: 'line',
            metadata: { 'mapbox:group': '1444849382550.77' },
            source: 'openmaptiles',
            'source-layer': 'waterway',
            filter: ['==', 'class', 'river'],
            layout: { 'line-cap': 'round' },
            paint: {
                'line-color': '#1E90FF',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [10, 0.8],
                        [20, 6],
                    ],
                },
            },
        },
        {
            id: 'water-offset',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849382550.77' },
            source: 'openmaptiles',
            'source-layer': 'water',
            maxzoom: 8,
            filter: ['==', '$type', 'Polygon'],
            layout: { visibility: 'visible' },
            paint: {
                'fill-opacity': 1,
                'fill-color': '#1E90FF',
                'fill-translate': {
                    base: 1,
                    stops: [
                        [6, [2, 0]],
                        [8, [0, 0]],
                    ],
                },
            },
        },
        {
            id: 'water',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849382550.77' },
            source: 'openmaptiles',
            'source-layer': 'water',
            layout: { visibility: 'visible' },
            paint: { 'fill-color': '#006ad1' },
        },
        {
            id: 'water-pattern',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849382550.77' },
            source: 'openmaptiles',
            'source-layer': 'water',
            layout: { visibility: 'visible' },
            paint: { 'fill-translate': [0, 2.5], 'fill-pattern': 'wave' },
        },
        {
            id: 'landcover-ice-shelf',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849382550.77' },
            source: 'openmaptiles',
            'source-layer': 'landcover',
            filter: ['==', 'subclass', 'ice_shelf'],
            layout: { visibility: 'visible' },
            paint: {
                'fill-color': '#228B22',
                'fill-opacity': {
                    base: 1,
                    stops: [
                        [0, 0.9],
                        [10, 0.3],
                    ],
                },
            },
        },
        {
            id: 'building',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849364238.8171' },
            source: 'openmaptiles',
            'source-layer': 'building',
            paint: { 'fill-color': '#f9e9cb', 'fill-antialias': true },
        },
        {
            id: 'building-top',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849364238.8171' },
            source: 'openmaptiles',
            'source-layer': 'building',
            layout: { visibility: 'visible' },
            paint: {
                'fill-translate': {
                    base: 1,
                    stops: [
                        [14, [0, 0]],
                        [16, [-2, -2]],
                    ],
                },
                'fill-outline-color': '#dfdbd7',
                'fill-color': '#fefcf9',
                'fill-opacity': {
                    base: 1,
                    stops: [
                        [13, 0],
                        [16, 1],
                    ],
                },
            },
        },
        {
            id: 'tunnel-service-track-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849354174.1904' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'tunnel'], ['in', 'class', 'service', 'track']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#CD5C5C',
                'line-dasharray': [0.5, 0.25],
                'line-width': {
                    base: 1.2,
                    stops: [
                        [15, 1],
                        [16, 4],
                        [20, 11],
                    ],
                },
            },
        },
        {
            id: 'tunnel-minor-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849354174.1904' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'tunnel'], ['==', 'class', 'minor']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#CD5C5C',
                'line-opacity': {
                    stops: [
                        [12, 0],
                        [12.5, 1],
                    ],
                },
                'line-width': {
                    base: 1.2,
                    stops: [
                        [12, 0.5],
                        [13, 1],
                        [14, 4],
                        [20, 15],
                    ],
                },
            },
        },
        {
            id: 'tunnel-secondary-tertiary-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849354174.1904' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'tunnel'], ['in', 'class', 'secondary', 'tertiary']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#CD5C5C',
                'line-opacity': 1,
                'line-width': {
                    base: 1.2,
                    stops: [
                        [8, 1.5],
                        [20, 17],
                    ],
                },
            },
        },
        {
            id: 'tunnel-trunk-primary-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849354174.1904' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'tunnel'], ['in', 'class', 'primary', 'trunk']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#CD5C5C',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [5, 0.4],
                        [6, 0.6],
                        [7, 1.5],
                        [20, 22],
                    ],
                },
            },
        },
        {
            id: 'tunnel-motorway-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849354174.1904' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'tunnel'], ['==', 'class', 'motorway']],
            layout: { 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': '#CD5C5C',
                'line-dasharray': [0.5, 0.25],
                'line-width': {
                    base: 1.2,
                    stops: [
                        [5, 0.4],
                        [6, 0.6],
                        [7, 1.5],
                        [20, 22],
                    ],
                },
            },
        },
        {
            id: 'tunnel-path',
            type: 'line',
            metadata: { 'mapbox:group': '1444849354174.1904' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['==', '$type', 'LineString'],
                ['all', ['==', 'brunnel', 'tunnel'], ['==', 'class', 'path']],
            ],
            paint: {
                'line-color': '#d98383',
                'line-dasharray': [1.5, 0.75],
                'line-width': {
                    base: 1.2,
                    stops: [
                        [15, 1.2],
                        [20, 4],
                    ],
                },
            },
        },
        {
            id: 'tunnel-service-track',
            type: 'line',
            metadata: { 'mapbox:group': '1444849354174.1904' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'tunnel'], ['in', 'class', 'service', 'track']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#d98383',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [15.5, 0],
                        [16, 2],
                        [20, 7.5],
                    ],
                },
            },
        },
        {
            id: 'tunnel-minor',
            type: 'line',
            metadata: { 'mapbox:group': '1444849354174.1904' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'tunnel'], ['==', 'class', 'minor_road']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#d98383',
                'line-opacity': 1,
                'line-width': {
                    base: 1.2,
                    stops: [
                        [13.5, 0],
                        [14, 2.5],
                        [20, 11.5],
                    ],
                },
            },
        },
        {
            id: 'tunnel-secondary-tertiary',
            type: 'line',
            metadata: { 'mapbox:group': '1444849354174.1904' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'tunnel'], ['in', 'class', 'secondary', 'tertiary']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#df9797',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [6.5, 0],
                        [7, 0.5],
                        [20, 10],
                    ],
                },
            },
        },
        {
            id: 'tunnel-trunk-primary',
            type: 'line',
            metadata: { 'mapbox:group': '1444849354174.1904' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'tunnel'], ['in', 'class', 'primary', 'trunk']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#CD5C5C',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [6.5, 0],
                        [7, 0.5],
                        [20, 18],
                    ],
                },
            },
        },
        {
            id: 'tunnel-motorway',
            type: 'line',
            metadata: { 'mapbox:group': '1444849354174.1904' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'tunnel'], ['==', 'class', 'motorway']],
            layout: { 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': 'rgba(139,94,6,0.8)',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [6.5, 0],
                        [7, 0.5],
                        [20, 18],
                    ],
                },
            },
        },
        {
            id: 'tunnel-railway',
            type: 'line',
            metadata: { 'mapbox:group': '1444849354174.1904' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'tunnel'], ['==', 'class', 'rail']],
            paint: {
                'line-color': '#952e2e',
                'line-width': {
                    base: 1.4,
                    stops: [
                        [14, 0.4],
                        [15, 0.75],
                        [20, 2],
                    ],
                },
                'line-dasharray': [2, 2],
            },
        },
        {
            id: 'aeroway-taxiway-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'aeroway',
            minzoom: 12,
            filter: ['all', ['in', 'class', 'taxiway']],
            layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': '#952e2e',
                'line-width': {
                    base: 1.5,
                    stops: [
                        [11, 2],
                        [17, 12],
                    ],
                },
                'line-opacity': 1,
            },
        },
        {
            id: 'aeroway-runway-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'aeroway',
            minzoom: 12,
            filter: ['all', ['in', 'class', 'runway']],
            layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': '#952e2e',
                'line-width': {
                    base: 1.5,
                    stops: [
                        [11, 5],
                        [17, 55],
                    ],
                },
                'line-opacity': 1,
            },
        },
        {
            id: 'aeroway-area',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'aeroway',
            minzoom: 4,
            filter: ['all', ['==', '$type', 'Polygon'], ['in', 'class', 'runway', 'taxiway']],
            layout: { visibility: 'visible' },
            paint: {
                'fill-opacity': {
                    base: 1,
                    stops: [
                        [13, 0],
                        [14, 1],
                    ],
                },
                'fill-color': 'rgba(205,92,92,0.5)',
            },
        },
        {
            id: 'aeroway-taxiway',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'aeroway',
            minzoom: 4,
            filter: ['all', ['in', 'class', 'taxiway'], ['==', '$type', 'LineString']],
            layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': '#df9797',
                'line-width': {
                    base: 1.5,
                    stops: [
                        [11, 1],
                        [17, 10],
                    ],
                },
                'line-opacity': {
                    base: 1,
                    stops: [
                        [11, 0],
                        [12, 1],
                    ],
                },
            },
        },
        {
            id: 'aeroway-runway',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'aeroway',
            minzoom: 4,
            filter: ['all', ['in', 'class', 'runway'], ['==', '$type', 'LineString']],
            layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': '#df9797',
                'line-width': {
                    base: 1.5,
                    stops: [
                        [11, 4],
                        [17, 50],
                    ],
                },
                'line-opacity': {
                    base: 1,
                    stops: [
                        [11, 0],
                        [12, 1],
                    ],
                },
            },
        },
        {
            id: 'highway-area',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['==', '$type', 'Polygon'],
            layout: { visibility: 'visible' },
            paint: {
                'fill-color': '#bc3a3a',
                'fill-outline-color': '#cfcdca',
                'fill-opacity': 0.9,
                'fill-antialias': false,
            },
        },
        {
            id: 'highway-motorway-link-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            minzoom: 12,
            filter: ['all', ['!in', 'brunnel', 'bridge', 'tunnel'], ['==', 'class', 'motorway_link']],
            layout: { 'line-cap': 'round', 'line-join': 'round' },
            paint: {
                'line-color': '#CD5C5C',
                'line-opacity': 1,
                'line-width': {
                    base: 1.2,
                    stops: [
                        [12, 1],
                        [13, 3],
                        [14, 4],
                        [20, 15],
                    ],
                },
            },
        },
        {
            id: 'highway-link-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            minzoom: 13,
            filter: [
                'all',
                ['!in', 'brunnel', 'bridge', 'tunnel'],
                ['in', 'class', 'primary_link', 'secondary_link', 'tertiary_link', 'trunk_link'],
            ],
            layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': '#CD5C5C',
                'line-opacity': 1,
                'line-width': {
                    base: 1.2,
                    stops: [
                        [12, 1],
                        [13, 3],
                        [14, 4],
                        [20, 15],
                    ],
                },
            },
        },
        {
            id: 'highway-minor-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['==', '$type', 'LineString'],
                ['all', ['!=', 'brunnel', 'tunnel'], ['in', 'class', 'minor', 'service', 'track']],
            ],
            layout: { 'line-cap': 'round', 'line-join': 'round' },
            paint: {
                'line-color': 'rgba(205,92,92,0.8)',
                'line-opacity': {
                    stops: [
                        [12, 0],
                        [12.5, 1],
                    ],
                },
                'line-width': {
                    base: 1.2,
                    stops: [
                        [12, 0.5],
                        [13, 1],
                        [14, 4],
                        [20, 15],
                    ],
                },
            },
        },
        {
            id: 'highway-secondary-tertiary-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['!in', 'brunnel', 'bridge', 'tunnel'],
                ['in', 'class', 'secondary', 'tertiary'],
            ],
            layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': '#CD5C5C',
                'line-opacity': 1,
                'line-width': {
                    base: 1.2,
                    stops: [
                        [8, 1.5],
                        [20, 17],
                    ],
                },
            },
        },
        {
            id: 'highway-primary-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            minzoom: 5,
            filter: ['all', ['!in', 'brunnel', 'bridge', 'tunnel'], ['in', 'class', 'primary']],
            layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': '#CD5C5C',
                'line-opacity': {
                    stops: [
                        [7, 0],
                        [8, 1],
                    ],
                },
                'line-width': {
                    base: 1.2,
                    stops: [
                        [7, 0],
                        [8, 0.6],
                        [9, 1.5],
                        [20, 22],
                    ],
                },
            },
        },
        {
            id: 'highway-trunk-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            minzoom: 5,
            filter: ['all', ['!in', 'brunnel', 'bridge', 'tunnel'], ['in', 'class', 'trunk']],
            layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': '#CD5C5C',
                'line-opacity': {
                    stops: [
                        [5, 0],
                        [6, 1],
                    ],
                },
                'line-width': {
                    base: 1.2,
                    stops: [
                        [5, 0],
                        [6, 0.6],
                        [7, 1.5],
                        [20, 22],
                    ],
                },
            },
        },
        {
            id: 'highway-motorway-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            minzoom: 4,
            filter: ['all', ['!in', 'brunnel', 'bridge', 'tunnel'], ['==', 'class', 'motorway']],
            layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': '#CD5C5C',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [4, 0],
                        [5, 0.4],
                        [6, 0.6],
                        [7, 1.5],
                        [20, 22],
                    ],
                },
                'line-opacity': {
                    stops: [
                        [4, 0],
                        [5, 1],
                    ],
                },
            },
        },
        {
            id: 'highway-path',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['==', '$type', 'LineString'],
                ['all', ['!in', 'brunnel', 'bridge', 'tunnel'], ['==', 'class', 'path']],
            ],
            paint: {
                'line-color': '#FFC0CB',
                'line-dasharray': [1.5, 0.75],
                'line-width': {
                    base: 1.2,
                    stops: [
                        [15, 1.2],
                        [20, 4],
                    ],
                },
            },
        },
        {
            id: 'highway-motorway-link',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            minzoom: 12,
            filter: ['all', ['!in', 'brunnel', 'bridge', 'tunnel'], ['==', 'class', 'motorway_link']],
            layout: { 'line-cap': 'round', 'line-join': 'round' },
            paint: {
                'line-color': '#8b5e3c',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [12.5, 0],
                        [13, 1.5],
                        [14, 2.5],
                        [20, 11.5],
                    ],
                },
            },
        },
        {
            id: 'highway-link',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            minzoom: 13,
            filter: [
                'all',
                ['!in', 'brunnel', 'bridge', 'tunnel'],
                ['in', 'class', 'primary_link', 'secondary_link', 'tertiary_link', 'trunk_link'],
            ],
            layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': '#8B5E3C',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [12.5, 0],
                        [13, 1.5],
                        [14, 2.5],
                        [20, 11.5],
                    ],
                },
            },
        },
        {
            id: 'highway-minor',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['==', '$type', 'LineString'],
                ['all', ['!=', 'brunnel', 'tunnel'], ['in', 'class', 'minor', 'service', 'track']],
            ],
            layout: { 'line-cap': 'round', 'line-join': 'round' },
            paint: {
                'line-color': '#e5aaaa',
                'line-opacity': 1,
                'line-width': {
                    base: 1.2,
                    stops: [
                        [13.5, 0],
                        [14, 2.5],
                        [20, 11.5],
                    ],
                },
            },
        },
        {
            id: 'highway-secondary-tertiary',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['!in', 'brunnel', 'bridge', 'tunnel'],
                ['in', 'class', 'secondary', 'tertiary'],
            ],
            layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': '#8B5E3C',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [6.5, 0],
                        [8, 0.5],
                        [20, 13],
                    ],
                },
            },
        },
        {
            id: 'highway-primary',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['==', '$type', 'LineString'],
                ['all', ['!in', 'brunnel', 'bridge', 'tunnel'], ['in', 'class', 'primary']],
            ],
            layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': '#8B5E3C',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [8.5, 0],
                        [9, 0.5],
                        [20, 18],
                    ],
                },
            },
        },
        {
            id: 'highway-trunk',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['==', '$type', 'LineString'],
                ['all', ['!in', 'brunnel', 'bridge', 'tunnel'], ['in', 'class', 'trunk']],
            ],
            layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': '#8B5E3C',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [6.5, 0],
                        [7, 0.5],
                        [20, 18],
                    ],
                },
            },
        },
        {
            id: 'highway-motorway',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            minzoom: 5,
            filter: [
                'all',
                ['==', '$type', 'LineString'],
                ['all', ['!in', 'brunnel', 'bridge', 'tunnel'], ['==', 'class', 'motorway']],
            ],
            layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': '#8b5e3c',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [6.5, 0],
                        [7, 0.5],
                        [20, 18],
                    ],
                },
            },
        },
        {
            id: 'railway-service',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['==', '$type', 'LineString'],
                ['all', ['==', 'class', 'rail'], ['has', 'service']],
            ],
            paint: {
                'line-color': 'rgba(149,46,46,0.7)',
                'line-width': {
                    base: 1.4,
                    stops: [
                        [14, 0.4],
                        [20, 1],
                    ],
                },
            },
        },
        {
            id: 'railway-service-hatching',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['==', '$type', 'LineString'],
                ['all', ['==', 'class', 'rail'], ['has', 'service']],
            ],
            layout: { visibility: 'visible' },
            paint: {
                'line-color': 'rgba(149,46,46,0.7)',
                'line-dasharray': [0.2, 8],
                'line-width': {
                    base: 1.4,
                    stops: [
                        [14.5, 0],
                        [15, 2],
                        [20, 6],
                    ],
                },
            },
        },
        {
            id: 'railway',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['==', '$type', 'LineString'],
                [
                    'all',
                    ['!has', 'service'],
                    ['!in', 'brunnel', 'bridge', 'tunnel'],
                    ['==', 'class', 'rail'],
                ],
            ],
            paint: {
                'line-color': '#952e2e',
                'line-width': {
                    base: 1.4,
                    stops: [
                        [14, 0.4],
                        [15, 0.75],
                        [20, 2],
                    ],
                },
            },
        },
        {
            id: 'railway-hatching',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['==', '$type', 'LineString'],
                [
                    'all',
                    ['!has', 'service'],
                    ['!in', 'brunnel', 'bridge', 'tunnel'],
                    ['==', 'class', 'rail'],
                ],
            ],
            paint: {
                'line-color': '#952e2e',
                'line-dasharray': [0.2, 8],
                'line-width': {
                    base: 1.4,
                    stops: [
                        [14.5, 0],
                        [15, 3],
                        [20, 8],
                    ],
                },
            },
        },
        {
            id: 'bridge-motorway-link-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849334699.1902' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'bridge'], ['==', 'class', 'motorway_link']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#CD5C5C',
                'line-opacity': 1,
                'line-width': {
                    base: 1.2,
                    stops: [
                        [12, 1],
                        [13, 3],
                        [14, 4],
                        [20, 15],
                    ],
                },
            },
        },
        {
            id: 'bridge-link-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849334699.1902' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['==', 'brunnel', 'bridge'],
                ['in', 'class', 'primary_link', 'secondary_link', 'tertiary_link', 'trunk_link'],
            ],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#CD5C5C',
                'line-opacity': 1,
                'line-width': {
                    base: 1.2,
                    stops: [
                        [12, 1],
                        [13, 3],
                        [14, 4],
                        [20, 15],
                    ],
                },
            },
        },
        {
            id: 'bridge-secondary-tertiary-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849334699.1902' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'bridge'], ['in', 'class', 'secondary', 'tertiary']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#CD5C5C',
                'line-opacity': 1,
                'line-width': {
                    base: 1.2,
                    stops: [
                        [8, 1.5],
                        [20, 28],
                    ],
                },
            },
        },
        {
            id: 'bridge-trunk-primary-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849334699.1902' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'bridge'], ['in', 'class', 'primary', 'trunk']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#CD5C5C',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [5, 0.4],
                        [6, 0.6],
                        [7, 1.5],
                        [20, 26],
                    ],
                },
            },
        },
        {
            id: 'bridge-motorway-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849334699.1902' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'bridge'], ['==', 'class', 'motorway']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#CD5C5C',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [5, 0.4],
                        [6, 0.6],
                        [7, 1.5],
                        [20, 22],
                    ],
                },
            },
        },
        {
            id: 'bridge-path-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849334699.1902' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['==', '$type', 'LineString'],
                ['all', ['==', 'brunnel', 'bridge'], ['==', 'class', 'path']],
            ],
            paint: {
                'line-color': '#d98383',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [15, 1.2],
                        [20, 18],
                    ],
                },
            },
        },
        {
            id: 'bridge-path',
            type: 'line',
            metadata: { 'mapbox:group': '1444849334699.1902' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['==', '$type', 'LineString'],
                ['all', ['==', 'brunnel', 'bridge'], ['==', 'class', 'path']],
            ],
            paint: {
                'line-color': '#FFC0CB',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [15, 1.2],
                        [20, 4],
                    ],
                },
                'line-dasharray': [1.5, 0.75],
            },
        },
        {
            id: 'bridge-motorway-link',
            type: 'line',
            metadata: { 'mapbox:group': '1444849334699.1902' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'bridge'], ['==', 'class', 'motorway_link']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#8b5e3c',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [12.5, 0],
                        [13, 1.5],
                        [14, 2.5],
                        [20, 11.5],
                    ],
                },
            },
        },
        {
            id: 'bridge-link',
            type: 'line',
            metadata: { 'mapbox:group': '1444849334699.1902' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['==', 'brunnel', 'bridge'],
                ['in', 'class', 'primary_link', 'secondary_link', 'tertiary_link', 'trunk_link'],
            ],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#8B5E3C',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [12.5, 0],
                        [13, 1.5],
                        [14, 2.5],
                        [20, 11.5],
                    ],
                },
            },
        },
        {
            id: 'bridge-secondary-tertiary',
            type: 'line',
            metadata: { 'mapbox:group': '1444849334699.1902' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'bridge'], ['in', 'class', 'secondary', 'tertiary']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#8B5E3C',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [6.5, 0],
                        [7, 0.5],
                        [20, 20],
                    ],
                },
            },
        },
        {
            id: 'bridge-trunk-primary',
            type: 'line',
            metadata: { 'mapbox:group': '1444849334699.1902' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'bridge'], ['in', 'class', 'primary', 'trunk']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#8B5E3C',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [6.5, 0],
                        [7, 0.5],
                        [20, 18],
                    ],
                },
            },
        },
        {
            id: 'bridge-motorway',
            type: 'line',
            metadata: { 'mapbox:group': '1444849334699.1902' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'bridge'], ['==', 'class', 'motorway']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#8b5e3c',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [6.5, 0],
                        [7, 0.5],
                        [20, 18],
                    ],
                },
            },
        },
        {
            id: 'bridge-railway',
            type: 'line',
            metadata: { 'mapbox:group': '1444849334699.1902' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'bridge'], ['==', 'class', 'rail']],
            paint: {
                'line-color': '#952e2e',
                'line-width': {
                    base: 1.4,
                    stops: [
                        [14, 0.4],
                        [15, 0.75],
                        [20, 2],
                    ],
                },
            },
        },
        {
            id: 'bridge-railway-hatching',
            type: 'line',
            metadata: { 'mapbox:group': '1444849334699.1902' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'bridge'], ['==', 'class', 'rail']],
            paint: {
                'line-color': '#952e2e',
                'line-dasharray': [0.2, 8],
                'line-width': {
                    base: 1.4,
                    stops: [
                        [14.5, 0],
                        [15, 3],
                        [20, 8],
                    ],
                },
            },
        },
        {
            id: 'boundary-land-level-4',
            type: 'line',
            source: 'openmaptiles',
            'source-layer': 'boundary',
            filter: ['all', ['in', 'admin_level', 4, 6, 8], ['!=', 'maritime', 1]],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#A0522D',
                'line-dasharray': [3, 1, 1, 1],
                'line-width': {
                    base: 1.4,
                    stops: [
                        [4, 0.4],
                        [5, 1],
                        [12, 3],
                    ],
                },
            },
        },
        {
            id: 'boundary-land-level-2',
            type: 'line',
            source: 'openmaptiles',
            'source-layer': 'boundary',
            filter: ['all', ['==', 'admin_level', 2], ['!=', 'maritime', 1]],
            layout: { 'line-cap': 'round', 'line-join': 'round' },
            paint: {
                'line-color': '#A0522D',
                'line-width': {
                    base: 1,
                    stops: [
                        [0, 0.6],
                        [4, 1.4],
                        [5, 2],
                        [12, 8],
                    ],
                },
            },
        },
        {
            id: 'boundary-water',
            type: 'line',
            source: 'openmaptiles',
            'source-layer': 'boundary',
            filter: ['all', ['in', 'admin_level', 2, 4], ['==', 'maritime', 1]],
            layout: { 'line-cap': 'round', 'line-join': 'round' },
            paint: {
                'line-color': '#1E90FF',
                'line-width': {
                    base: 1,
                    stops: [
                        [0, 0.6],
                        [4, 1.4],
                        [5, 2],
                        [12, 8],
                    ],
                },
                'line-opacity': {
                    stops: [
                        [6, 0.6],
                        [10, 1],
                    ],
                },
            },
        },
        {
            id: 'waterway-name',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'waterway',
            minzoom: 13,
            filter: ['all', ['==', '$type', 'LineString'], ['has', 'name'], ['!has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Italic'],
                'text-size': 14,
                'text-field': '{name:latin} {name:nonlatin}',
                'text-max-width': 5,
                'text-rotation-alignment': 'map',
                'symbol-placement': 'line',
                'text-letter-spacing': 0.2,
                'symbol-spacing': 350,
            },
            paint: { 'text-color': '#fefefe', 'text-halo-width': 1.5, 'text-halo-color': '#74aee9' },
        },
        {
            id: 'waterway-name-en',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'waterway',
            minzoom: 13,
            filter: ['all', ['==', '$type', 'LineString'], ['has', 'name'], ['has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Italic'],
                'text-size': 14,
                'text-field': '{name:de} {name:nonlatin}',
                'text-max-width': 5,
                'text-rotation-alignment': 'map',
                'symbol-placement': 'line',
                'text-letter-spacing': 0.2,
                'symbol-spacing': 350,
            },
            paint: { 'text-color': '#fefefe', 'text-halo-width': 1.5, 'text-halo-color': '#74aee9' },
        },
        {
            id: 'water-name-lakeline',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'water_name',
            filter: ['all', ['==', '$type', 'LineString'], ['!has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Italic'],
                'text-size': 14,
                'text-field': '{name:latin} {name:nonlatin}',
                'text-max-width': 5,
                'text-rotation-alignment': 'map',
                'symbol-placement': 'line',
                'symbol-spacing': 350,
                'text-letter-spacing': 0.2,
            },
            paint: { 'text-color': '#fefefe', 'text-halo-width': 1.5, 'text-halo-color': '#74aee9' },
        },
        {
            id: 'water-name-lakeline-en',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'water_name',
            filter: ['all', ['==', '$type', 'LineString'], ['has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Italic'],
                'text-size': 14,
                'text-field': '{name:de} {name:nonlatin}',
                'text-max-width': 5,
                'text-rotation-alignment': 'map',
                'symbol-placement': 'line',
                'symbol-spacing': 350,
                'text-letter-spacing': 0.2,
            },
            paint: { 'text-color': '#fefefe', 'text-halo-width': 1.5, 'text-halo-color': '#74aee9' },
        },
        {
            id: 'water-name-ocean',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'water_name',
            filter: ['all', ['==', '$type', 'Point'], ['==', 'class', 'ocean'], ['!has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Italic'],
                'text-size': 14,
                'text-field': '{name:latin}\n{name:nonlatin}',
                'text-max-width': 5,
                'text-rotation-alignment': 'map',
                'symbol-placement': 'point',
                'symbol-spacing': 350,
                'text-letter-spacing': 0.2,
            },
            paint: { 'text-color': '#fefefe', 'text-halo-width': 1.5, 'text-halo-color': '#74aee9' },
        },
        {
            id: 'water-name-ocean-en',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'water_name',
            filter: ['all', ['==', '$type', 'Point'], ['==', 'class', 'ocean'], ['has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Italic'],
                'text-size': 14,
                'text-field': '{name:de}\n{name:nonlatin}',
                'text-max-width': 5,
                'text-rotation-alignment': 'map',
                'symbol-placement': 'point',
                'symbol-spacing': 350,
                'text-letter-spacing': 0.2,
            },
            paint: { 'text-color': '#fefefe', 'text-halo-width': 1.5, 'text-halo-color': '#74aee9' },
        },
        {
            id: 'water-name-other',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'water_name',
            filter: ['all', ['==', '$type', 'Point'], ['!in', 'class', 'ocean'], ['!has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Italic'],
                'text-size': {
                    stops: [
                        [0, 10],
                        [6, 14],
                    ],
                },
                'text-field': '{name:latin}\n{name:nonlatin}',
                'text-max-width': 5,
                'text-rotation-alignment': 'map',
                'symbol-placement': 'point',
                'symbol-spacing': 350,
                'text-letter-spacing': 0.2,
                visibility: 'visible',
            },
            paint: { 'text-color': '#fefefe', 'text-halo-width': 1.5, 'text-halo-color': '#74aee9' },
        },
        {
            id: 'water-name-other-en',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'water_name',
            filter: ['all', ['==', '$type', 'Point'], ['!in', 'class', 'ocean'], ['has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Italic'],
                'text-size': {
                    stops: [
                        [0, 10],
                        [6, 14],
                    ],
                },
                'text-field': '{name:de}\n{name:nonlatin}',
                'text-max-width': 5,
                'text-rotation-alignment': 'map',
                'symbol-placement': 'point',
                'symbol-spacing': 350,
                'text-letter-spacing': 0.2,
                visibility: 'visible',
            },
            paint: { 'text-color': '#fefefe', 'text-halo-width': 1.5, 'text-halo-color': '#74aee9' },
        },
        {
            id: 'poi-level-3',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'poi',
            minzoom: 16,
            filter: ['all', ['==', '$type', 'Point'], ['>=', 'rank', 25], ['!has', 'name:de']],
            layout: {
                'text-padding': 2,
                'text-font': ['Open Sans Semibold'],
                'text-anchor': 'top',
                'icon-image': '{class}_11',
                'text-field': '{name:latin}\n{name:nonlatin}',
                'text-offset': [0, 0.6],
                'text-size': 12,
                'text-max-width': 9,
            },
            paint: {
                'text-halo-blur': 0.5,
                'text-color': '#fdfdfd',
                'text-halo-width': 1,
                'text-halo-color': '#633',
            },
        },
        {
            id: 'poi-level-3-en',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'poi',
            minzoom: 16,
            filter: ['all', ['==', '$type', 'Point'], ['>=', 'rank', 25], ['has', 'name:de']],
            layout: {
                'text-padding': 2,
                'text-font': ['Open Sans Semibold'],
                'text-anchor': 'top',
                'icon-image': '{class}_11',
                'text-field': '{name:de}\n{name:nonlatin}',
                'text-offset': [0, 0.6],
                'text-size': 12,
                'text-max-width': 9,
            },
            paint: {
                'text-halo-blur': 0.5,
                'text-color': '#fdfdfd',
                'text-halo-width': 1,
                'text-halo-color': '#633',
            },
        },
        {
            id: 'poi-level-2',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'poi',
            minzoom: 15,
            filter: [
                'all',
                ['==', '$type', 'Point'],
                ['all', ['<=', 'rank', 24], ['>=', 'rank', 15]],
                ['!has', 'name:de'],
            ],
            layout: {
                'text-padding': 2,
                'text-font': ['Open Sans Semibold'],
                'text-anchor': 'top',
                'icon-image': '{class}_11',
                'text-field': '{name:latin}\n{name:nonlatin}',
                'text-offset': [0, 0.6],
                'text-size': 12,
                'text-max-width': 9,
            },
            paint: {
                'text-halo-blur': 0.5,
                'text-color': '#fdfdfd',
                'text-halo-width': 1,
                'text-halo-color': '#633',
            },
        },
        {
            id: 'poi-level-2-en',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'poi',
            minzoom: 15,
            filter: [
                'all',
                ['==', '$type', 'Point'],
                ['all', ['<=', 'rank', 24], ['>=', 'rank', 15]],
                ['has', 'name:de'],
            ],
            layout: {
                'text-padding': 2,
                'text-font': ['Open Sans Semibold'],
                'text-anchor': 'top',
                'icon-image': '{class}_11',
                'text-field': '{name:de}\n{name:nonlatin}',
                'text-offset': [0, 0.6],
                'text-size': 12,
                'text-max-width': 9,
            },
            paint: {
                'text-halo-blur': 0.5,
                'text-color': '#fdfdfd',
                'text-halo-width': 1,
                'text-halo-color': '#633',
            },
        },
        {
            id: 'poi-level-1',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'poi',
            minzoom: 14,
            filter: [
                'all',
                ['==', '$type', 'Point'],
                ['all', ['<=', 'rank', 14], ['has', 'name']],
                ['!has', 'name:de'],
            ],
            layout: {
                'text-padding': 2,
                'text-font': ['Open Sans Semibold'],
                'text-anchor': 'top',
                'icon-image': '{class}_11',
                'text-field': '{name:latin}\n{name:nonlatin}',
                'text-offset': [0, 0.6],
                'text-size': 12,
                'text-max-width': 9,
            },
            paint: {
                'text-halo-blur': 0.5,
                'text-color': '#fdfdfd',
                'text-halo-width': 1,
                'text-halo-color': '#633',
            },
        },
        {
            id: 'poi-level-1-en',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'poi',
            minzoom: 14,
            filter: [
                'all',
                ['==', '$type', 'Point'],
                ['all', ['<=', 'rank', 14], ['has', 'name']],
                ['has', 'name:de'],
            ],
            layout: {
                'text-padding': 2,
                'text-font': ['Open Sans Semibold'],
                'text-anchor': 'top',
                'icon-image': '{class}_11',
                'text-field': '{name:de}\n{name:nonlatin}',
                'text-offset': [0, 0.6],
                'text-size': 12,
                'text-max-width': 9,
            },
            paint: {
                'text-halo-blur': 0.5,
                'text-color': '#fdfdfd',
                'text-halo-width': 1,
                'text-halo-color': '#633',
            },
        },
        {
            id: 'highway-name-path',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'transportation_name',
            minzoom: 15.5,
            filter: ['all', ['==', 'class', 'path'], ['!has', 'name:de']],
            layout: {
                'text-size': {
                    base: 1,
                    stops: [
                        [13, 12],
                        [14, 13],
                    ],
                },
                'text-font': ['Open Sans Regular'],
                'text-field': '{name:latin} {name:nonlatin}',
                'symbol-placement': 'line',
                'text-rotation-alignment': 'map',
            },
            paint: {
                'text-halo-color': '#f8f4f0',
                'text-color': 'hsl(30, 23%, 62%)',
                'text-halo-width': 0.5,
            },
        },
        {
            id: 'highway-name-path-en',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'transportation_name',
            minzoom: 15.5,
            filter: ['all', ['==', 'class', 'path'], ['has', 'name:de']],
            layout: {
                'text-size': {
                    base: 1,
                    stops: [
                        [13, 12],
                        [14, 13],
                    ],
                },
                'text-font': ['Open Sans Regular'],
                'text-field': '{name:de} {name:nonlatin}',
                'symbol-placement': 'line',
                'text-rotation-alignment': 'map',
            },
            paint: {
                'text-halo-color': '#f8f4f0',
                'text-color': 'hsl(30, 23%, 62%)',
                'text-halo-width': 0.5,
            },
        },
        {
            id: 'highway-name-minor',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'transportation_name',
            minzoom: 15,
            filter: [
                'all',
                ['==', '$type', 'LineString'],
                ['in', 'class', 'minor', 'service', 'track'],
                ['!has', 'name:de'],
            ],
            layout: {
                'text-size': {
                    base: 1,
                    stops: [
                        [13, 12],
                        [14, 13],
                    ],
                },
                'text-font': ['Open Sans Regular'],
                'text-field': '{name:latin} {name:nonlatin}',
                'symbol-placement': 'line',
                'text-rotation-alignment': 'map',
            },
            paint: { 'text-halo-blur': 0.5, 'text-color': '#765', 'text-halo-width': 1 },
        },
        {
            id: 'highway-name-minor-en',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'transportation_name',
            minzoom: 15,
            filter: [
                'all',
                ['==', '$type', 'LineString'],
                ['in', 'class', 'minor', 'service', 'track'],
                ['has', 'name:de'],
            ],
            layout: {
                'text-size': {
                    base: 1,
                    stops: [
                        [13, 12],
                        [14, 13],
                    ],
                },
                'text-font': ['Open Sans Regular'],
                'text-field': '{name:de} {name:nonlatin}',
                'symbol-placement': 'line',
                'text-rotation-alignment': 'map',
            },
            paint: { 'text-halo-blur': 0.5, 'text-color': '#765', 'text-halo-width': 1 },
        },
        {
            id: 'highway-name-major',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'transportation_name',
            minzoom: 12.2,
            filter: [
                'all',
                ['in', 'class', 'primary', 'secondary', 'tertiary', 'trunk'],
                ['!has', 'name:de'],
            ],
            layout: {
                'text-size': {
                    base: 1,
                    stops: [
                        [13, 12],
                        [14, 13],
                    ],
                },
                'text-font': ['Open Sans Regular'],
                'text-field': '{name:latin} {name:nonlatin}',
                'symbol-placement': 'line',
                'text-rotation-alignment': 'map',
            },
            paint: { 'text-halo-blur': 0.5, 'text-color': '#765', 'text-halo-width': 1 },
        },
        {
            id: 'highway-name-major-en',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'transportation_name',
            minzoom: 12.2,
            filter: [
                'all',
                ['in', 'class', 'primary', 'secondary', 'tertiary', 'trunk'],
                ['has', 'name:de'],
            ],
            layout: {
                'text-size': {
                    base: 1,
                    stops: [
                        [13, 12],
                        [14, 13],
                    ],
                },
                'text-font': ['Open Sans Regular'],
                'text-field': '{name:de} {name:nonlatin}',
                'symbol-placement': 'line',
                'text-rotation-alignment': 'map',
            },
            paint: { 'text-halo-blur': 0.5, 'text-color': '#765', 'text-halo-width': 1 },
        },
        {
            id: 'highway-shield',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'transportation_name',
            minzoom: 8,
            filter: [
                'all',
                ['<=', 'ref_length', 6],
                ['==', '$type', 'LineString'],
                ['!in', 'network', 'us-interstate', 'us-highway', 'us-state'],
            ],
            layout: {
                'text-size': 10,
                'icon-image': 'road_{ref_length}',
                'icon-rotation-alignment': 'viewport',
                'symbol-spacing': 200,
                'text-font': ['Open Sans Semibold'],
                'symbol-placement': {
                    base: 1,
                    stops: [
                        [10, 'point'],
                        [11, 'line'],
                    ],
                },
                'text-rotation-alignment': 'viewport',
                'icon-size': 1,
                'text-field': '{ref}',
            },
            paint: {},
        },
        {
            id: 'highway-shield-us-interstate',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'transportation_name',
            minzoom: 7,
            filter: [
                'all',
                ['<=', 'ref_length', 6],
                ['==', '$type', 'LineString'],
                ['in', 'network', 'us-interstate'],
            ],
            layout: {
                'text-size': 10,
                'icon-image': '{network}_{ref_length}',
                'icon-rotation-alignment': 'viewport',
                'symbol-spacing': 200,
                'text-font': ['Open Sans Semibold'],
                'symbol-placement': {
                    base: 1,
                    stops: [
                        [7, 'point'],
                        [7, 'line'],
                        [8, 'line'],
                    ],
                },
                'text-rotation-alignment': 'viewport',
                'icon-size': 1,
                'text-field': '{ref}',
            },
            paint: { 'text-color': 'rgba(0, 0, 0, 1)' },
        },
        {
            id: 'highway-shield-us-other',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'transportation_name',
            minzoom: 9,
            filter: [
                'all',
                ['<=', 'ref_length', 6],
                ['==', '$type', 'LineString'],
                ['in', 'network', 'us-highway', 'us-state'],
            ],
            layout: {
                'text-size': 10,
                'icon-image': '{network}_{ref_length}',
                'icon-rotation-alignment': 'viewport',
                'symbol-spacing': 200,
                'text-font': ['Open Sans Semibold'],
                'symbol-placement': {
                    base: 1,
                    stops: [
                        [10, 'point'],
                        [11, 'line'],
                    ],
                },
                'text-rotation-alignment': 'viewport',
                'icon-size': 1,
                'text-field': '{ref}',
            },
            paint: { 'text-color': 'rgba(0, 0, 0, 1)' },
        },
        {
            id: 'place-other',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['!in', 'class', 'city', 'town', 'village'], ['!has', 'name:de']],
            layout: {
                'text-letter-spacing': 0.1,
                'text-size': {
                    base: 1.2,
                    stops: [
                        [12, 10],
                        [15, 14],
                    ],
                },
                'text-font': ['Open Sans Bold'],
                'text-field': '{name:latin}\n{name:nonlatin}',
                'text-transform': 'uppercase',
                'text-max-width': 9,
            },
            paint: { 'text-color': '#fdfdfd', 'text-halo-width': 1.2, 'text-halo-color': '#433' },
        },
        {
            id: 'place-other-en',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['!in', 'class', 'city', 'town', 'village'], ['has', 'name:de']],
            layout: {
                'text-letter-spacing': 0.1,
                'text-size': {
                    base: 1.2,
                    stops: [
                        [12, 10],
                        [15, 14],
                    ],
                },
                'text-font': ['Open Sans Bold'],
                'text-field': '{name:de}\n{name:nonlatin}',
                'text-transform': 'uppercase',
                'text-max-width': 9,
            },
            paint: { 'text-color': '#fdfdfd', 'text-halo-width': 1.2, 'text-halo-color': '#433' },
        },
        {
            id: 'place-village',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['==', 'class', 'village'], ['!has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Regular'],
                'text-size': {
                    base: 1.2,
                    stops: [
                        [10, 12],
                        [15, 22],
                    ],
                },
                'text-field': '{name:latin}\n{name:nonlatin}',
                'text-max-width': 8,
            },
            paint: { 'text-color': '#fdfdfd', 'text-halo-width': 1.2, 'text-halo-color': '#433' },
        },
        {
            id: 'place-village-en',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['==', 'class', 'village'], ['has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Regular'],
                'text-size': {
                    base: 1.2,
                    stops: [
                        [10, 12],
                        [15, 22],
                    ],
                },
                'text-field': '{name:de}\n{name:nonlatin}',
                'text-max-width': 8,
            },
            paint: { 'text-color': '#fdfdfd', 'text-halo-width': 1.2, 'text-halo-color': '#433' },
        },
        {
            id: 'place-town',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['==', 'class', 'town'], ['!has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Regular'],
                'text-size': {
                    base: 1.2,
                    stops: [
                        [10, 14],
                        [15, 24],
                    ],
                },
                'text-field': '{name:latin}\n{name:nonlatin}',
                'text-max-width': 8,
            },
            paint: { 'text-color': '#fdfdfd', 'text-halo-width': 1.2, 'text-halo-color': '#433' },
        },
        {
            id: 'place-town-en',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['==', 'class', 'town'], ['has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Regular'],
                'text-size': {
                    base: 1.2,
                    stops: [
                        [10, 14],
                        [15, 24],
                    ],
                },
                'text-field': '{name:de}\n{name:nonlatin}',
                'text-max-width': 8,
            },
            paint: { 'text-color': '#fdfdfd', 'text-halo-width': 1.2, 'text-halo-color': '#433' },
        },
        {
            id: 'place-city',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['!=', 'capital', 2], ['==', 'class', 'city'], ['!has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Semibold'],
                'text-size': {
                    base: 1.2,
                    stops: [
                        [7, 14],
                        [11, 24],
                    ],
                },
                'text-field': '{name:latin}\n{name:nonlatin}',
                'text-max-width': 8,
            },
            paint: { 'text-color': '#fdfdfd', 'text-halo-width': 1.2, 'text-halo-color': '#433' },
        },
        {
            id: 'place-city-en',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['!=', 'capital', 2], ['==', 'class', 'city'], ['has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Semibold'],
                'text-size': {
                    base: 1.2,
                    stops: [
                        [7, 14],
                        [11, 24],
                    ],
                },
                'text-field': '{name:de}\n{name:nonlatin}',
                'text-max-width': 8,
            },
            paint: { 'text-color': '#fdfdfd', 'text-halo-width': 1.2, 'text-halo-color': '#433' },
        },
        {
            id: 'place-city-capital',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['==', 'capital', 2], ['==', 'class', 'city'], ['!has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Semibold'],
                'text-size': {
                    base: 1.2,
                    stops: [
                        [7, 14],
                        [11, 24],
                    ],
                },
                'text-field': '{name:latin}\n{name:nonlatin}',
                'text-max-width': 8,
                'icon-image': 'star_11',
                'text-offset': [0.4, 0],
                'icon-size': 0.8,
                'text-anchor': 'left',
            },
            paint: { 'text-color': '#fdfdfd', 'text-halo-width': 1.2, 'text-halo-color': '#433' },
        },
        {
            id: 'place-city-capital-en',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['==', 'capital', 2], ['==', 'class', 'city'], ['has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Semibold'],
                'text-size': {
                    base: 1.2,
                    stops: [
                        [7, 14],
                        [11, 24],
                    ],
                },
                'text-field': '{name:de}\n{name:nonlatin}',
                'text-max-width': 8,
                'icon-image': 'star_11',
                'text-offset': [0.4, 0],
                'icon-size': 0.8,
                'text-anchor': 'left',
            },
            paint: { 'text-color': '#fdfdfd', 'text-halo-width': 1.2, 'text-halo-color': '#433' },
        },
        {
            id: 'place-country-3',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['==', 'class', 'country'], ['>=', 'rank', 3], ['!has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Bold'],
                'text-field': '{name:latin}\n{name:nonlatin}',
                'text-size': {
                    stops: [
                        [3, 11],
                        [7, 17],
                    ],
                },
                'text-transform': 'uppercase',
                'text-max-width': 6.25,
            },
            paint: {
                'text-halo-blur': 1,
                'text-color': '#fdfdfd',
                'text-halo-width': 2,
                'text-halo-color': '#433',
            },
        },
        {
            id: 'place-country-3-en',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['==', 'class', 'country'], ['>=', 'rank', 3], ['has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Bold'],
                'text-field': '{name:de}\n{name:nonlatin}',
                'text-size': {
                    stops: [
                        [3, 11],
                        [7, 17],
                    ],
                },
                'text-transform': 'uppercase',
                'text-max-width': 6.25,
            },
            paint: {
                'text-halo-blur': 1,
                'text-color': '#fdfdfd',
                'text-halo-width': 2,
                'text-halo-color': '#433',
            },
        },
        {
            id: 'place-country-2',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['==', 'class', 'country'], ['==', 'rank', 2], ['!has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Bold'],
                'text-field': '{name:latin}\n{name:nonlatin}',
                'text-size': {
                    stops: [
                        [2, 11],
                        [5, 17],
                    ],
                },
                'text-transform': 'uppercase',
                'text-max-width': 6.25,
            },
            paint: {
                'text-halo-blur': 1,
                'text-color': '#fdfdfd',
                'text-halo-width': 2,
                'text-halo-color': '#433',
            },
        },
        {
            id: 'place-country-2-en',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['==', 'class', 'country'], ['==', 'rank', 2], ['has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Bold'],
                'text-field': '{name:de}\n{name:nonlatin}',
                'text-size': {
                    stops: [
                        [2, 11],
                        [5, 17],
                    ],
                },
                'text-transform': 'uppercase',
                'text-max-width': 6.25,
            },
            paint: {
                'text-halo-blur': 1,
                'text-color': '#fdfdfd',
                'text-halo-width': 2,
                'text-halo-color': '#433',
            },
        },
        {
            id: 'place-country-1',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['==', 'class', 'country'], ['==', 'rank', 1], ['!has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Bold'],
                'text-field': '{name:latin}\n{name:nonlatin}',
                'text-size': {
                    stops: [
                        [1, 11],
                        [4, 17],
                    ],
                },
                'text-transform': 'uppercase',
                'text-max-width': 6.25,
            },
            paint: {
                'text-halo-blur': 1,
                'text-color': '#fdfdfd',
                'text-halo-width': 2,
                'text-halo-color': '#433',
            },
        },
        {
            id: 'place-country-1-en',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['==', 'class', 'country'], ['==', 'rank', 1], ['has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Bold'],
                'text-field': '{name:de}\n{name:nonlatin}',
                'text-size': {
                    stops: [
                        [1, 11],
                        [4, 17],
                    ],
                },
                'text-transform': 'uppercase',
                'text-max-width': 6.25,
            },
            paint: {
                'text-halo-blur': 1,
                'text-color': '#fdfdfd',
                'text-halo-width': 2,
                'text-halo-color': '#433',
            },
        },
        {
            id: 'place-continent',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            maxzoom: 1,
            filter: ['all', ['==', 'class', 'continent'], ['!has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Bold'],
                'text-field': '{name:latin}\n{name:nonlatin}',
                'text-size': 14,
                'text-max-width': 6.25,
                'text-transform': 'uppercase',
            },
            paint: {
                'text-halo-blur': 1,
                'text-color': '#fdfdfd',
                'text-halo-width': 2,
                'text-halo-color': '#433',
            },
        },
        {
            id: 'place-continent-en',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            maxzoom: 1,
            filter: ['all', ['==', 'class', 'continent'], ['has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Bold'],
                'text-field': '{name:de}\n{name:nonlatin}',
                'text-size': 14,
                'text-max-width': 6.25,
                'text-transform': 'uppercase',
            },
            paint: {
                'text-halo-blur': 1,
                'text-color': '#fdfdfd',
                'text-halo-width': 2,
                'text-halo-color': '#433',
            },
        },
    ],
};

var GruvboxStyle = {
    version: 8,
    name: 'Gruvbox',
    center: [8.542, 47.372],
    zoom: 11.6,
    bearing: 0,
    pitch: 0,
    sources: {
        openmaptiles: {
            type: 'vector',
            url: config.source_openmaptiles_url,
        },
    },
    sprite: config.sprite,
    glyphs: config.glyphs,
    layers: [
        { id: 'background', type: 'background', paint: { 'background-color': '#282822' } },
        {
            id: 'landcover-glacier',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849388993.3071' },
            source: 'openmaptiles',
            'source-layer': 'landcover',
            filter: ['==', 'subclass', 'glacier'],
            layout: { visibility: 'visible' },
            paint: {
                'fill-color': '#83a598',
                'fill-opacity': {
                    base: 1,
                    stops: [
                        [0, 0.9],
                        [10, 0.3],
                    ],
                },
            },
        },
        {
            id: 'landuse-residential',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849388993.3071' },
            source: 'openmaptiles',
            'source-layer': 'landuse',
            filter: ['==', 'class', 'residential'],
            paint: { 'fill-color': '#b8bb26' },
        },
        {
            id: 'landuse-commercial',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849388993.3071' },
            source: 'openmaptiles',
            'source-layer': 'landuse',
            filter: ['all', ['==', '$type', 'Polygon'], ['==', 'class', 'commercial']],
            paint: { 'fill-color': '#bfc23c' },
        },
        {
            id: 'landuse-industrial',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849388993.3071' },
            source: 'openmaptiles',
            'source-layer': 'landuse',
            filter: ['all', ['==', '$type', 'Polygon'], ['==', 'class', 'industrial']],
            paint: { 'fill-color': '#c6c951' },
        },
        {
            id: 'park',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849388993.3071' },
            source: 'openmaptiles',
            'source-layer': 'park',
            filter: ['==', '$type', 'Polygon'],
            paint: {
                'fill-color': '#b8bb26',
                'fill-opacity': {
                    base: 1.8,
                    stops: [
                        [9, 0.5],
                        [12, 0.2],
                    ],
                },
            },
        },
        {
            id: 'park-outline',
            type: 'line',
            metadata: { 'mapbox:group': '1444849388993.3071' },
            source: 'openmaptiles',
            'source-layer': 'park',
            filter: ['==', '$type', 'Polygon'],
            layout: {},
            paint: { 'line-color': 'rgba(184,187,38,0.6)', 'line-dasharray': [3, 3] },
        },
        {
            id: 'landuse-cemetery',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849388993.3071' },
            source: 'openmaptiles',
            'source-layer': 'landuse',
            filter: ['==', 'class', 'cemetery'],
            paint: { 'fill-color': '#eceeaa' },
        },
        {
            id: 'landuse-hospital',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849388993.3071' },
            source: 'openmaptiles',
            'source-layer': 'landuse',
            filter: ['==', 'class', 'hospital'],
            paint: { 'fill-color': '#fe8019' },
        },
        {
            id: 'landuse-school',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849388993.3071' },
            source: 'openmaptiles',
            'source-layer': 'landuse',
            filter: ['==', 'class', 'school'],
            paint: { 'fill-color': 'rgba(254,128,25,0.8)' },
        },
        {
            id: 'landuse-railway',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849388993.3071' },
            source: 'openmaptiles',
            'source-layer': 'landuse',
            filter: ['==', 'class', 'railway'],
            paint: { 'fill-color': 'rgba(118,51,8,0.4)' },
        },
        {
            id: 'landcover-wood',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849388993.3071' },
            source: 'openmaptiles',
            'source-layer': 'landcover',
            filter: ['==', 'class', 'wood'],
            paint: {
                'fill-color': '#83a598',
                'fill-opacity': 0.1,
                'fill-outline-color': 'hsla(0, 0%, 0%, 0.03)',
                'fill-antialias': {
                    base: 1,
                    stops: [
                        [0, false],
                        [9, true],
                    ],
                },
            },
        },
        {
            id: 'landcover-grass',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849388993.3071' },
            source: 'openmaptiles',
            'source-layer': 'landcover',
            filter: ['==', 'class', 'grass'],
            paint: { 'fill-color': '#b8bb26', 'fill-opacity': 1 },
        },
        {
            id: 'landcover-grass-park',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849388993.3071' },
            source: 'openmaptiles',
            'source-layer': 'park',
            filter: ['==', 'class', 'public_park'],
            paint: { 'fill-color': '#b8bb26', 'fill-opacity': 0.8 },
        },
        {
            id: 'waterway-other',
            type: 'line',
            metadata: { 'mapbox:group': '1444849382550.77' },
            source: 'openmaptiles',
            'source-layer': 'waterway',
            filter: ['!in', 'class', 'canal', 'river', 'stream'],
            layout: { 'line-cap': 'round' },
            paint: {
                'line-color': '#83a598',
                'line-width': {
                    base: 1.3,
                    stops: [
                        [13, 0.5],
                        [20, 2],
                    ],
                },
            },
        },
        {
            id: 'waterway-stream-canal',
            type: 'line',
            metadata: { 'mapbox:group': '1444849382550.77' },
            source: 'openmaptiles',
            'source-layer': 'waterway',
            filter: ['in', 'class', 'canal', 'stream'],
            layout: { 'line-cap': 'round' },
            paint: {
                'line-color': '#83a598',
                'line-width': {
                    base: 1.3,
                    stops: [
                        [13, 0.5],
                        [20, 6],
                    ],
                },
            },
        },
        {
            id: 'waterway-river',
            type: 'line',
            metadata: { 'mapbox:group': '1444849382550.77' },
            source: 'openmaptiles',
            'source-layer': 'waterway',
            filter: ['==', 'class', 'river'],
            layout: { 'line-cap': 'round' },
            paint: {
                'line-color': '#83a598',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [10, 0.8],
                        [20, 6],
                    ],
                },
            },
        },
        {
            id: 'water-offset',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849382550.77' },
            source: 'openmaptiles',
            'source-layer': 'water',
            maxzoom: 8,
            filter: ['==', '$type', 'Polygon'],
            layout: { visibility: 'visible' },
            paint: {
                'fill-opacity': 1,
                'fill-color': '#83a598',
                'fill-translate': {
                    base: 1,
                    stops: [
                        [6, [2, 0]],
                        [8, [0, 0]],
                    ],
                },
            },
        },
        {
            id: 'water',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849382550.77' },
            source: 'openmaptiles',
            'source-layer': 'water',
            layout: { visibility: 'visible' },
            paint: { 'fill-color': '#5c7f72' },
        },
        {
            id: 'water-pattern',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849382550.77' },
            source: 'openmaptiles',
            'source-layer': 'water',
            layout: { visibility: 'visible' },
            paint: { 'fill-translate': [0, 2.5], 'fill-pattern': 'wave' },
        },
        {
            id: 'landcover-ice-shelf',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849382550.77' },
            source: 'openmaptiles',
            'source-layer': 'landcover',
            filter: ['==', 'subclass', 'ice_shelf'],
            layout: { visibility: 'visible' },
            paint: {
                'fill-color': '#83a598',
                'fill-opacity': {
                    base: 1,
                    stops: [
                        [0, 0.9],
                        [10, 0.3],
                    ],
                },
            },
        },
        {
            id: 'building',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849364238.8171' },
            source: 'openmaptiles',
            'source-layer': 'building',
            paint: { 'fill-color': '#928374', 'fill-antialias': true },
        },
        {
            id: 'building-top',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849364238.8171' },
            source: 'openmaptiles',
            'source-layer': 'building',
            layout: { visibility: 'visible' },
            paint: {
                'fill-translate': {
                    base: 1,
                    stops: [
                        [14, [0, 0]],
                        [16, [-2, -2]],
                    ],
                },
                'fill-outline-color': '#dfdbd7',
                'fill-color': '#a89c91',
                'fill-opacity': {
                    base: 1,
                    stops: [
                        [13, 0],
                        [16, 1],
                    ],
                },
            },
        },
        {
            id: 'tunnel-service-track-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849354174.1904' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'tunnel'], ['in', 'class', 'service', 'track']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#d65d0e',
                'line-dasharray': [0.5, 0.25],
                'line-width': {
                    base: 1.2,
                    stops: [
                        [15, 1],
                        [16, 4],
                        [20, 11],
                    ],
                },
            },
        },
        {
            id: 'tunnel-minor-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849354174.1904' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'tunnel'], ['==', 'class', 'minor']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#d65d0e',
                'line-opacity': {
                    stops: [
                        [12, 0],
                        [12.5, 1],
                    ],
                },
                'line-width': {
                    base: 1.2,
                    stops: [
                        [12, 0.5],
                        [13, 1],
                        [14, 4],
                        [20, 15],
                    ],
                },
            },
        },
        {
            id: 'tunnel-secondary-tertiary-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849354174.1904' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'tunnel'], ['in', 'class', 'secondary', 'tertiary']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#d65d0e',
                'line-opacity': 1,
                'line-width': {
                    base: 1.2,
                    stops: [
                        [8, 1.5],
                        [20, 17],
                    ],
                },
            },
        },
        {
            id: 'tunnel-trunk-primary-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849354174.1904' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'tunnel'], ['in', 'class', 'primary', 'trunk']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#d65d0e',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [5, 0.4],
                        [6, 0.6],
                        [7, 1.5],
                        [20, 22],
                    ],
                },
            },
        },
        {
            id: 'tunnel-motorway-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849354174.1904' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'tunnel'], ['==', 'class', 'motorway']],
            layout: { 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': '#d65d0e',
                'line-dasharray': [0.5, 0.25],
                'line-width': {
                    base: 1.2,
                    stops: [
                        [5, 0.4],
                        [6, 0.6],
                        [7, 1.5],
                        [20, 22],
                    ],
                },
            },
        },
        {
            id: 'tunnel-path',
            type: 'line',
            metadata: { 'mapbox:group': '1444849354174.1904' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['==', '$type', 'LineString'],
                ['all', ['==', 'brunnel', 'tunnel'], ['==', 'class', 'path']],
            ],
            paint: {
                'line-color': '#f17626',
                'line-dasharray': [1.5, 0.75],
                'line-width': {
                    base: 1.2,
                    stops: [
                        [15, 1.2],
                        [20, 4],
                    ],
                },
            },
        },
        {
            id: 'tunnel-service-track',
            type: 'line',
            metadata: { 'mapbox:group': '1444849354174.1904' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'tunnel'], ['in', 'class', 'service', 'track']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#f17626',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [15.5, 0],
                        [16, 2],
                        [20, 7.5],
                    ],
                },
            },
        },
        {
            id: 'tunnel-minor',
            type: 'line',
            metadata: { 'mapbox:group': '1444849354174.1904' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'tunnel'], ['==', 'class', 'minor_road']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#f17626',
                'line-opacity': 1,
                'line-width': {
                    base: 1.2,
                    stops: [
                        [13.5, 0],
                        [14, 2.5],
                        [20, 11.5],
                    ],
                },
            },
        },
        {
            id: 'tunnel-secondary-tertiary',
            type: 'line',
            metadata: { 'mapbox:group': '1444849354174.1904' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'tunnel'], ['in', 'class', 'secondary', 'tertiary']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#f2853e',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [6.5, 0],
                        [7, 0.5],
                        [20, 10],
                    ],
                },
            },
        },
        {
            id: 'tunnel-trunk-primary',
            type: 'line',
            metadata: { 'mapbox:group': '1444849354174.1904' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'tunnel'], ['in', 'class', 'primary', 'trunk']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#d65d0e',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [6.5, 0],
                        [7, 0.5],
                        [20, 18],
                    ],
                },
            },
        },
        {
            id: 'tunnel-motorway',
            type: 'line',
            metadata: { 'mapbox:group': '1444849354174.1904' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'tunnel'], ['==', 'class', 'motorway']],
            layout: { 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': 'rgba(235,219,178,0.8)',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [6.5, 0],
                        [7, 0.5],
                        [20, 18],
                    ],
                },
            },
        },
        {
            id: 'tunnel-railway',
            type: 'line',
            metadata: { 'mapbox:group': '1444849354174.1904' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'tunnel'], ['==', 'class', 'rail']],
            paint: {
                'line-color': '#763308',
                'line-width': {
                    base: 1.4,
                    stops: [
                        [14, 0.4],
                        [15, 0.75],
                        [20, 2],
                    ],
                },
                'line-dasharray': [2, 2],
            },
        },
        {
            id: 'aeroway-taxiway-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'aeroway',
            minzoom: 12,
            filter: ['all', ['in', 'class', 'taxiway']],
            layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': '#763308',
                'line-width': {
                    base: 1.5,
                    stops: [
                        [11, 2],
                        [17, 12],
                    ],
                },
                'line-opacity': 1,
            },
        },
        {
            id: 'aeroway-runway-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'aeroway',
            minzoom: 12,
            filter: ['all', ['in', 'class', 'runway']],
            layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': '#763308',
                'line-width': {
                    base: 1.5,
                    stops: [
                        [11, 5],
                        [17, 55],
                    ],
                },
                'line-opacity': 1,
            },
        },
        {
            id: 'aeroway-area',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'aeroway',
            minzoom: 4,
            filter: ['all', ['==', '$type', 'Polygon'], ['in', 'class', 'runway', 'taxiway']],
            layout: { visibility: 'visible' },
            paint: {
                'fill-opacity': {
                    base: 1,
                    stops: [
                        [13, 0],
                        [14, 1],
                    ],
                },
                'fill-color': 'rgba(214,93,14,0.5)',
            },
        },
        {
            id: 'aeroway-taxiway',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'aeroway',
            minzoom: 4,
            filter: ['all', ['in', 'class', 'taxiway'], ['==', '$type', 'LineString']],
            layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': '#f2853e',
                'line-width': {
                    base: 1.5,
                    stops: [
                        [11, 1],
                        [17, 10],
                    ],
                },
                'line-opacity': {
                    base: 1,
                    stops: [
                        [11, 0],
                        [12, 1],
                    ],
                },
            },
        },
        {
            id: 'aeroway-runway',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'aeroway',
            minzoom: 4,
            filter: ['all', ['in', 'class', 'runway'], ['==', '$type', 'LineString']],
            layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': '#f2853e',
                'line-width': {
                    base: 1.5,
                    stops: [
                        [11, 4],
                        [17, 50],
                    ],
                },
                'line-opacity': {
                    base: 1,
                    stops: [
                        [11, 0],
                        [12, 1],
                    ],
                },
            },
        },
        {
            id: 'highway-area',
            type: 'fill',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['==', '$type', 'Polygon'],
            layout: { visibility: 'visible' },
            paint: {
                'fill-color': '#a6480b',
                'fill-outline-color': '#cfcdca',
                'fill-opacity': 0.9,
                'fill-antialias': false,
            },
        },
        {
            id: 'highway-motorway-link-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            minzoom: 12,
            filter: ['all', ['!in', 'brunnel', 'bridge', 'tunnel'], ['==', 'class', 'motorway_link']],
            layout: { 'line-cap': 'round', 'line-join': 'round' },
            paint: {
                'line-color': '#d65d0e',
                'line-opacity': 1,
                'line-width': {
                    base: 1.2,
                    stops: [
                        [12, 1],
                        [13, 3],
                        [14, 4],
                        [20, 15],
                    ],
                },
            },
        },
        {
            id: 'highway-link-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            minzoom: 13,
            filter: [
                'all',
                ['!in', 'brunnel', 'bridge', 'tunnel'],
                ['in', 'class', 'primary_link', 'secondary_link', 'tertiary_link', 'trunk_link'],
            ],
            layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': '#d65d0e',
                'line-opacity': 1,
                'line-width': {
                    base: 1.2,
                    stops: [
                        [12, 1],
                        [13, 3],
                        [14, 4],
                        [20, 15],
                    ],
                },
            },
        },
        {
            id: 'highway-minor-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['==', '$type', 'LineString'],
                ['all', ['!=', 'brunnel', 'tunnel'], ['in', 'class', 'minor', 'service', 'track']],
            ],
            layout: { 'line-cap': 'round', 'line-join': 'round' },
            paint: {
                'line-color': 'rgba(214,93,14,0.8)',
                'line-opacity': {
                    stops: [
                        [12, 0],
                        [12.5, 1],
                    ],
                },
                'line-width': {
                    base: 1.2,
                    stops: [
                        [12, 0.5],
                        [13, 1],
                        [14, 4],
                        [20, 15],
                    ],
                },
            },
        },
        {
            id: 'highway-secondary-tertiary-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['!in', 'brunnel', 'bridge', 'tunnel'],
                ['in', 'class', 'secondary', 'tertiary'],
            ],
            layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': '#d65d0e',
                'line-opacity': 1,
                'line-width': {
                    base: 1.2,
                    stops: [
                        [8, 1.5],
                        [20, 17],
                    ],
                },
            },
        },
        {
            id: 'highway-primary-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            minzoom: 5,
            filter: ['all', ['!in', 'brunnel', 'bridge', 'tunnel'], ['in', 'class', 'primary']],
            layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': '#d65d0e',
                'line-opacity': {
                    stops: [
                        [7, 0],
                        [8, 1],
                    ],
                },
                'line-width': {
                    base: 1.2,
                    stops: [
                        [7, 0],
                        [8, 0.6],
                        [9, 1.5],
                        [20, 22],
                    ],
                },
            },
        },
        {
            id: 'highway-trunk-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            minzoom: 5,
            filter: ['all', ['!in', 'brunnel', 'bridge', 'tunnel'], ['in', 'class', 'trunk']],
            layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': '#d65d0e',
                'line-opacity': {
                    stops: [
                        [5, 0],
                        [6, 1],
                    ],
                },
                'line-width': {
                    base: 1.2,
                    stops: [
                        [5, 0],
                        [6, 0.6],
                        [7, 1.5],
                        [20, 22],
                    ],
                },
            },
        },
        {
            id: 'highway-motorway-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            minzoom: 4,
            filter: ['all', ['!in', 'brunnel', 'bridge', 'tunnel'], ['==', 'class', 'motorway']],
            layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': '#d65d0e',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [4, 0],
                        [5, 0.4],
                        [6, 0.6],
                        [7, 1.5],
                        [20, 22],
                    ],
                },
                'line-opacity': {
                    stops: [
                        [4, 0],
                        [5, 1],
                    ],
                },
            },
        },
        {
            id: 'highway-path',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['==', '$type', 'LineString'],
                ['all', ['!in', 'brunnel', 'bridge', 'tunnel'], ['==', 'class', 'path']],
            ],
            paint: {
                'line-color': '#fe8019',
                'line-dasharray': [1.5, 0.75],
                'line-width': {
                    base: 1.2,
                    stops: [
                        [15, 1.2],
                        [20, 4],
                    ],
                },
            },
        },
        {
            id: 'highway-motorway-link',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            minzoom: 12,
            filter: ['all', ['!in', 'brunnel', 'bridge', 'tunnel'], ['==', 'class', 'motorway_link']],
            layout: { 'line-cap': 'round', 'line-join': 'round' },
            paint: {
                'line-color': '#ebdbb2',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [12.5, 0],
                        [13, 1.5],
                        [14, 2.5],
                        [20, 11.5],
                    ],
                },
            },
        },
        {
            id: 'highway-link',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            minzoom: 13,
            filter: [
                'all',
                ['!in', 'brunnel', 'bridge', 'tunnel'],
                ['in', 'class', 'primary_link', 'secondary_link', 'tertiary_link', 'trunk_link'],
            ],
            layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': '#ebdbb2',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [12.5, 0],
                        [13, 1.5],
                        [14, 2.5],
                        [20, 11.5],
                    ],
                },
            },
        },
        {
            id: 'highway-minor',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['==', '$type', 'LineString'],
                ['all', ['!=', 'brunnel', 'tunnel'], ['in', 'class', 'minor', 'service', 'track']],
            ],
            layout: { 'line-cap': 'round', 'line-join': 'round' },
            paint: {
                'line-color': '#f49456',
                'line-opacity': 1,
                'line-width': {
                    base: 1.2,
                    stops: [
                        [13.5, 0],
                        [14, 2.5],
                        [20, 11.5],
                    ],
                },
            },
        },
        {
            id: 'highway-secondary-tertiary',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['!in', 'brunnel', 'bridge', 'tunnel'],
                ['in', 'class', 'secondary', 'tertiary'],
            ],
            layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': '#ebdbb2',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [6.5, 0],
                        [8, 0.5],
                        [20, 13],
                    ],
                },
            },
        },
        {
            id: 'highway-primary',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['==', '$type', 'LineString'],
                ['all', ['!in', 'brunnel', 'bridge', 'tunnel'], ['in', 'class', 'primary']],
            ],
            layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': '#ebdbb2',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [8.5, 0],
                        [9, 0.5],
                        [20, 18],
                    ],
                },
            },
        },
        {
            id: 'highway-trunk',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['==', '$type', 'LineString'],
                ['all', ['!in', 'brunnel', 'bridge', 'tunnel'], ['in', 'class', 'trunk']],
            ],
            layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': '#ebdbb2',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [6.5, 0],
                        [7, 0.5],
                        [20, 18],
                    ],
                },
            },
        },
        {
            id: 'highway-motorway',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            minzoom: 5,
            filter: [
                'all',
                ['==', '$type', 'LineString'],
                ['all', ['!in', 'brunnel', 'bridge', 'tunnel'], ['==', 'class', 'motorway']],
            ],
            layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'visible' },
            paint: {
                'line-color': '#ebdbb2',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [6.5, 0],
                        [7, 0.5],
                        [20, 18],
                    ],
                },
            },
        },
        {
            id: 'railway-service',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['==', '$type', 'LineString'],
                ['all', ['==', 'class', 'rail'], ['has', 'service']],
            ],
            paint: {
                'line-color': 'rgba(118,51,8,0.7)',
                'line-width': {
                    base: 1.4,
                    stops: [
                        [14, 0.4],
                        [20, 1],
                    ],
                },
            },
        },
        {
            id: 'railway-service-hatching',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['==', '$type', 'LineString'],
                ['all', ['==', 'class', 'rail'], ['has', 'service']],
            ],
            layout: { visibility: 'visible' },
            paint: {
                'line-color': 'rgba(118,51,8,0.7)',
                'line-dasharray': [0.2, 8],
                'line-width': {
                    base: 1.4,
                    stops: [
                        [14.5, 0],
                        [15, 2],
                        [20, 6],
                    ],
                },
            },
        },
        {
            id: 'railway',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['==', '$type', 'LineString'],
                [
                    'all',
                    ['!has', 'service'],
                    ['!in', 'brunnel', 'bridge', 'tunnel'],
                    ['==', 'class', 'rail'],
                ],
            ],
            paint: {
                'line-color': '#763308',
                'line-width': {
                    base: 1.4,
                    stops: [
                        [14, 0.4],
                        [15, 0.75],
                        [20, 2],
                    ],
                },
            },
        },
        {
            id: 'railway-hatching',
            type: 'line',
            metadata: { 'mapbox:group': '1444849345966.4436' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['==', '$type', 'LineString'],
                [
                    'all',
                    ['!has', 'service'],
                    ['!in', 'brunnel', 'bridge', 'tunnel'],
                    ['==', 'class', 'rail'],
                ],
            ],
            paint: {
                'line-color': '#763308',
                'line-dasharray': [0.2, 8],
                'line-width': {
                    base: 1.4,
                    stops: [
                        [14.5, 0],
                        [15, 3],
                        [20, 8],
                    ],
                },
            },
        },
        {
            id: 'bridge-motorway-link-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849334699.1902' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'bridge'], ['==', 'class', 'motorway_link']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#d65d0e',
                'line-opacity': 1,
                'line-width': {
                    base: 1.2,
                    stops: [
                        [12, 1],
                        [13, 3],
                        [14, 4],
                        [20, 15],
                    ],
                },
            },
        },
        {
            id: 'bridge-link-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849334699.1902' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['==', 'brunnel', 'bridge'],
                ['in', 'class', 'primary_link', 'secondary_link', 'tertiary_link', 'trunk_link'],
            ],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#d65d0e',
                'line-opacity': 1,
                'line-width': {
                    base: 1.2,
                    stops: [
                        [12, 1],
                        [13, 3],
                        [14, 4],
                        [20, 15],
                    ],
                },
            },
        },
        {
            id: 'bridge-secondary-tertiary-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849334699.1902' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'bridge'], ['in', 'class', 'secondary', 'tertiary']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#d65d0e',
                'line-opacity': 1,
                'line-width': {
                    base: 1.2,
                    stops: [
                        [8, 1.5],
                        [20, 28],
                    ],
                },
            },
        },
        {
            id: 'bridge-trunk-primary-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849334699.1902' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'bridge'], ['in', 'class', 'primary', 'trunk']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#d65d0e',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [5, 0.4],
                        [6, 0.6],
                        [7, 1.5],
                        [20, 26],
                    ],
                },
            },
        },
        {
            id: 'bridge-motorway-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849334699.1902' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'bridge'], ['==', 'class', 'motorway']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#d65d0e',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [5, 0.4],
                        [6, 0.6],
                        [7, 1.5],
                        [20, 22],
                    ],
                },
            },
        },
        {
            id: 'bridge-path-casing',
            type: 'line',
            metadata: { 'mapbox:group': '1444849334699.1902' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['==', '$type', 'LineString'],
                ['all', ['==', 'brunnel', 'bridge'], ['==', 'class', 'path']],
            ],
            paint: {
                'line-color': '#f17626',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [15, 1.2],
                        [20, 18],
                    ],
                },
            },
        },
        {
            id: 'bridge-path',
            type: 'line',
            metadata: { 'mapbox:group': '1444849334699.1902' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['==', '$type', 'LineString'],
                ['all', ['==', 'brunnel', 'bridge'], ['==', 'class', 'path']],
            ],
            paint: {
                'line-color': '#fe8019',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [15, 1.2],
                        [20, 4],
                    ],
                },
                'line-dasharray': [1.5, 0.75],
            },
        },
        {
            id: 'bridge-motorway-link',
            type: 'line',
            metadata: { 'mapbox:group': '1444849334699.1902' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'bridge'], ['==', 'class', 'motorway_link']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#ebdbb2',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [12.5, 0],
                        [13, 1.5],
                        [14, 2.5],
                        [20, 11.5],
                    ],
                },
            },
        },
        {
            id: 'bridge-link',
            type: 'line',
            metadata: { 'mapbox:group': '1444849334699.1902' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: [
                'all',
                ['==', 'brunnel', 'bridge'],
                ['in', 'class', 'primary_link', 'secondary_link', 'tertiary_link', 'trunk_link'],
            ],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#ebdbb2',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [12.5, 0],
                        [13, 1.5],
                        [14, 2.5],
                        [20, 11.5],
                    ],
                },
            },
        },
        {
            id: 'bridge-secondary-tertiary',
            type: 'line',
            metadata: { 'mapbox:group': '1444849334699.1902' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'bridge'], ['in', 'class', 'secondary', 'tertiary']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#ebdbb2',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [6.5, 0],
                        [7, 0.5],
                        [20, 20],
                    ],
                },
            },
        },
        {
            id: 'bridge-trunk-primary',
            type: 'line',
            metadata: { 'mapbox:group': '1444849334699.1902' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'bridge'], ['in', 'class', 'primary', 'trunk']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#ebdbb2',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [6.5, 0],
                        [7, 0.5],
                        [20, 18],
                    ],
                },
            },
        },
        {
            id: 'bridge-motorway',
            type: 'line',
            metadata: { 'mapbox:group': '1444849334699.1902' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'bridge'], ['==', 'class', 'motorway']],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#ebdbb2',
                'line-width': {
                    base: 1.2,
                    stops: [
                        [6.5, 0],
                        [7, 0.5],
                        [20, 18],
                    ],
                },
            },
        },
        {
            id: 'bridge-railway',
            type: 'line',
            metadata: { 'mapbox:group': '1444849334699.1902' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'bridge'], ['==', 'class', 'rail']],
            paint: {
                'line-color': '#763308',
                'line-width': {
                    base: 1.4,
                    stops: [
                        [14, 0.4],
                        [15, 0.75],
                        [20, 2],
                    ],
                },
            },
        },
        {
            id: 'bridge-railway-hatching',
            type: 'line',
            metadata: { 'mapbox:group': '1444849334699.1902' },
            source: 'openmaptiles',
            'source-layer': 'transportation',
            filter: ['all', ['==', 'brunnel', 'bridge'], ['==', 'class', 'rail']],
            paint: {
                'line-color': '#763308',
                'line-dasharray': [0.2, 8],
                'line-width': {
                    base: 1.4,
                    stops: [
                        [14.5, 0],
                        [15, 3],
                        [20, 8],
                    ],
                },
            },
        },
        {
            id: 'boundary-land-level-4',
            type: 'line',
            source: 'openmaptiles',
            'source-layer': 'boundary',
            filter: ['all', ['in', 'admin_level', 4, 6, 8], ['!=', 'maritime', 1]],
            layout: { 'line-join': 'round' },
            paint: {
                'line-color': '#fb4934',
                'line-dasharray': [3, 1, 1, 1],
                'line-width': {
                    base: 1.4,
                    stops: [
                        [4, 0.4],
                        [5, 1],
                        [12, 3],
                    ],
                },
            },
        },
        {
            id: 'boundary-land-level-2',
            type: 'line',
            source: 'openmaptiles',
            'source-layer': 'boundary',
            filter: ['all', ['==', 'admin_level', 2], ['!=', 'maritime', 1]],
            layout: { 'line-cap': 'round', 'line-join': 'round' },
            paint: {
                'line-color': '#fb4934',
                'line-width': {
                    base: 1,
                    stops: [
                        [0, 0.6],
                        [4, 1.4],
                        [5, 2],
                        [12, 8],
                    ],
                },
            },
        },
        {
            id: 'boundary-water',
            type: 'line',
            source: 'openmaptiles',
            'source-layer': 'boundary',
            filter: ['all', ['in', 'admin_level', 2, 4], ['==', 'maritime', 1]],
            layout: { 'line-cap': 'round', 'line-join': 'round' },
            paint: {
                'line-color': '#83a598',
                'line-width': {
                    base: 1,
                    stops: [
                        [0, 0.6],
                        [4, 1.4],
                        [5, 2],
                        [12, 8],
                    ],
                },
                'line-opacity': {
                    stops: [
                        [6, 0.6],
                        [10, 1],
                    ],
                },
            },
        },
        {
            id: 'waterway-name',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'waterway',
            minzoom: 13,
            filter: ['all', ['==', '$type', 'LineString'], ['has', 'name'], ['!has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Italic'],
                'text-size': 14,
                'text-field': '{name:latin} {name:nonlatin}',
                'text-max-width': 5,
                'text-rotation-alignment': 'map',
                'symbol-placement': 'line',
                'text-letter-spacing': 0.2,
                'symbol-spacing': 350,
            },
            paint: { 'text-color': '#fefefe', 'text-halo-width': 1.5, 'text-halo-color': '#74aee9' },
        },
        {
            id: 'waterway-name-en',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'waterway',
            minzoom: 13,
            filter: ['all', ['==', '$type', 'LineString'], ['has', 'name'], ['has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Italic'],
                'text-size': 14,
                'text-field': '{name:de} {name:nonlatin}',
                'text-max-width': 5,
                'text-rotation-alignment': 'map',
                'symbol-placement': 'line',
                'text-letter-spacing': 0.2,
                'symbol-spacing': 350,
            },
            paint: { 'text-color': '#fefefe', 'text-halo-width': 1.5, 'text-halo-color': '#74aee9' },
        },
        {
            id: 'water-name-lakeline',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'water_name',
            filter: ['all', ['==', '$type', 'LineString'], ['!has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Italic'],
                'text-size': 14,
                'text-field': '{name:latin} {name:nonlatin}',
                'text-max-width': 5,
                'text-rotation-alignment': 'map',
                'symbol-placement': 'line',
                'symbol-spacing': 350,
                'text-letter-spacing': 0.2,
            },
            paint: { 'text-color': '#fefefe', 'text-halo-width': 1.5, 'text-halo-color': '#74aee9' },
        },
        {
            id: 'water-name-lakeline-en',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'water_name',
            filter: ['all', ['==', '$type', 'LineString'], ['has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Italic'],
                'text-size': 14,
                'text-field': '{name:de} {name:nonlatin}',
                'text-max-width': 5,
                'text-rotation-alignment': 'map',
                'symbol-placement': 'line',
                'symbol-spacing': 350,
                'text-letter-spacing': 0.2,
            },
            paint: { 'text-color': '#fefefe', 'text-halo-width': 1.5, 'text-halo-color': '#74aee9' },
        },
        {
            id: 'water-name-ocean',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'water_name',
            filter: ['all', ['==', '$type', 'Point'], ['==', 'class', 'ocean'], ['!has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Italic'],
                'text-size': 14,
                'text-field': '{name:latin}\n{name:nonlatin}',
                'text-max-width': 5,
                'text-rotation-alignment': 'map',
                'symbol-placement': 'point',
                'symbol-spacing': 350,
                'text-letter-spacing': 0.2,
            },
            paint: { 'text-color': '#fefefe', 'text-halo-width': 1.5, 'text-halo-color': '#74aee9' },
        },
        {
            id: 'water-name-ocean-en',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'water_name',
            filter: ['all', ['==', '$type', 'Point'], ['==', 'class', 'ocean'], ['has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Italic'],
                'text-size': 14,
                'text-field': '{name:de}\n{name:nonlatin}',
                'text-max-width': 5,
                'text-rotation-alignment': 'map',
                'symbol-placement': 'point',
                'symbol-spacing': 350,
                'text-letter-spacing': 0.2,
            },
            paint: { 'text-color': '#fefefe', 'text-halo-width': 1.5, 'text-halo-color': '#74aee9' },
        },
        {
            id: 'water-name-other',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'water_name',
            filter: ['all', ['==', '$type', 'Point'], ['!in', 'class', 'ocean'], ['!has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Italic'],
                'text-size': {
                    stops: [
                        [0, 10],
                        [6, 14],
                    ],
                },
                'text-field': '{name:latin}\n{name:nonlatin}',
                'text-max-width': 5,
                'text-rotation-alignment': 'map',
                'symbol-placement': 'point',
                'symbol-spacing': 350,
                'text-letter-spacing': 0.2,
                visibility: 'visible',
            },
            paint: { 'text-color': '#fefefe', 'text-halo-width': 1.5, 'text-halo-color': '#74aee9' },
        },
        {
            id: 'water-name-other-en',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'water_name',
            filter: ['all', ['==', '$type', 'Point'], ['!in', 'class', 'ocean'], ['has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Italic'],
                'text-size': {
                    stops: [
                        [0, 10],
                        [6, 14],
                    ],
                },
                'text-field': '{name:de}\n{name:nonlatin}',
                'text-max-width': 5,
                'text-rotation-alignment': 'map',
                'symbol-placement': 'point',
                'symbol-spacing': 350,
                'text-letter-spacing': 0.2,
                visibility: 'visible',
            },
            paint: { 'text-color': '#fefefe', 'text-halo-width': 1.5, 'text-halo-color': '#74aee9' },
        },
        {
            id: 'poi-level-3',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'poi',
            minzoom: 16,
            filter: ['all', ['==', '$type', 'Point'], ['>=', 'rank', 25], ['!has', 'name:de']],
            layout: {
                'text-padding': 2,
                'text-font': ['Open Sans Semibold'],
                'text-anchor': 'top',
                'icon-image': '{class}_11',
                'text-field': '{name:latin}\n{name:nonlatin}',
                'text-offset': [0, 0.6],
                'text-size': 12,
                'text-max-width': 9,
            },
            paint: {
                'text-halo-blur': 0.5,
                'text-color': '#fdfdfd',
                'text-halo-width': 1,
                'text-halo-color': '#633',
            },
        },
        {
            id: 'poi-level-3-en',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'poi',
            minzoom: 16,
            filter: ['all', ['==', '$type', 'Point'], ['>=', 'rank', 25], ['has', 'name:de']],
            layout: {
                'text-padding': 2,
                'text-font': ['Open Sans Semibold'],
                'text-anchor': 'top',
                'icon-image': '{class}_11',
                'text-field': '{name:de}\n{name:nonlatin}',
                'text-offset': [0, 0.6],
                'text-size': 12,
                'text-max-width': 9,
            },
            paint: {
                'text-halo-blur': 0.5,
                'text-color': '#fdfdfd',
                'text-halo-width': 1,
                'text-halo-color': '#633',
            },
        },
        {
            id: 'poi-level-2',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'poi',
            minzoom: 15,
            filter: [
                'all',
                ['==', '$type', 'Point'],
                ['all', ['<=', 'rank', 24], ['>=', 'rank', 15]],
                ['!has', 'name:de'],
            ],
            layout: {
                'text-padding': 2,
                'text-font': ['Open Sans Semibold'],
                'text-anchor': 'top',
                'icon-image': '{class}_11',
                'text-field': '{name:latin}\n{name:nonlatin}',
                'text-offset': [0, 0.6],
                'text-size': 12,
                'text-max-width': 9,
            },
            paint: {
                'text-halo-blur': 0.5,
                'text-color': '#fdfdfd',
                'text-halo-width': 1,
                'text-halo-color': '#633',
            },
        },
        {
            id: 'poi-level-2-en',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'poi',
            minzoom: 15,
            filter: [
                'all',
                ['==', '$type', 'Point'],
                ['all', ['<=', 'rank', 24], ['>=', 'rank', 15]],
                ['has', 'name:de'],
            ],
            layout: {
                'text-padding': 2,
                'text-font': ['Open Sans Semibold'],
                'text-anchor': 'top',
                'icon-image': '{class}_11',
                'text-field': '{name:de}\n{name:nonlatin}',
                'text-offset': [0, 0.6],
                'text-size': 12,
                'text-max-width': 9,
            },
            paint: {
                'text-halo-blur': 0.5,
                'text-color': '#fdfdfd',
                'text-halo-width': 1,
                'text-halo-color': '#633',
            },
        },
        {
            id: 'poi-level-1',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'poi',
            minzoom: 14,
            filter: [
                'all',
                ['==', '$type', 'Point'],
                ['all', ['<=', 'rank', 14], ['has', 'name']],
                ['!has', 'name:de'],
            ],
            layout: {
                'text-padding': 2,
                'text-font': ['Open Sans Semibold'],
                'text-anchor': 'top',
                'icon-image': '{class}_11',
                'text-field': '{name:latin}\n{name:nonlatin}',
                'text-offset': [0, 0.6],
                'text-size': 12,
                'text-max-width': 9,
            },
            paint: {
                'text-halo-blur': 0.5,
                'text-color': '#fdfdfd',
                'text-halo-width': 1,
                'text-halo-color': '#633',
            },
        },
        {
            id: 'poi-level-1-en',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'poi',
            minzoom: 14,
            filter: [
                'all',
                ['==', '$type', 'Point'],
                ['all', ['<=', 'rank', 14], ['has', 'name']],
                ['has', 'name:de'],
            ],
            layout: {
                'text-padding': 2,
                'text-font': ['Open Sans Semibold'],
                'text-anchor': 'top',
                'icon-image': '{class}_11',
                'text-field': '{name:de}\n{name:nonlatin}',
                'text-offset': [0, 0.6],
                'text-size': 12,
                'text-max-width': 9,
            },
            paint: {
                'text-halo-blur': 0.5,
                'text-color': '#fdfdfd',
                'text-halo-width': 1,
                'text-halo-color': '#633',
            },
        },
        {
            id: 'highway-name-path',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'transportation_name',
            minzoom: 15.5,
            filter: ['all', ['==', 'class', 'path'], ['!has', 'name:de']],
            layout: {
                'text-size': {
                    base: 1,
                    stops: [
                        [13, 12],
                        [14, 13],
                    ],
                },
                'text-font': ['Open Sans Regular'],
                'text-field': '{name:latin} {name:nonlatin}',
                'symbol-placement': 'line',
                'text-rotation-alignment': 'map',
            },
            paint: {
                'text-halo-color': '#f8f4f0',
                'text-color': 'hsl(30, 23%, 62%)',
                'text-halo-width': 0.5,
            },
        },
        {
            id: 'highway-name-path-en',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'transportation_name',
            minzoom: 15.5,
            filter: ['all', ['==', 'class', 'path'], ['has', 'name:de']],
            layout: {
                'text-size': {
                    base: 1,
                    stops: [
                        [13, 12],
                        [14, 13],
                    ],
                },
                'text-font': ['Open Sans Regular'],
                'text-field': '{name:de} {name:nonlatin}',
                'symbol-placement': 'line',
                'text-rotation-alignment': 'map',
            },
            paint: {
                'text-halo-color': '#f8f4f0',
                'text-color': 'hsl(30, 23%, 62%)',
                'text-halo-width': 0.5,
            },
        },
        {
            id: 'highway-name-minor',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'transportation_name',
            minzoom: 15,
            filter: [
                'all',
                ['==', '$type', 'LineString'],
                ['in', 'class', 'minor', 'service', 'track'],
                ['!has', 'name:de'],
            ],
            layout: {
                'text-size': {
                    base: 1,
                    stops: [
                        [13, 12],
                        [14, 13],
                    ],
                },
                'text-font': ['Open Sans Regular'],
                'text-field': '{name:latin} {name:nonlatin}',
                'symbol-placement': 'line',
                'text-rotation-alignment': 'map',
            },
            paint: { 'text-halo-blur': 0.5, 'text-color': '#765', 'text-halo-width': 1 },
        },
        {
            id: 'highway-name-minor-en',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'transportation_name',
            minzoom: 15,
            filter: [
                'all',
                ['==', '$type', 'LineString'],
                ['in', 'class', 'minor', 'service', 'track'],
                ['has', 'name:de'],
            ],
            layout: {
                'text-size': {
                    base: 1,
                    stops: [
                        [13, 12],
                        [14, 13],
                    ],
                },
                'text-font': ['Open Sans Regular'],
                'text-field': '{name:de} {name:nonlatin}',
                'symbol-placement': 'line',
                'text-rotation-alignment': 'map',
            },
            paint: { 'text-halo-blur': 0.5, 'text-color': '#765', 'text-halo-width': 1 },
        },
        {
            id: 'highway-name-major',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'transportation_name',
            minzoom: 12.2,
            filter: [
                'all',
                ['in', 'class', 'primary', 'secondary', 'tertiary', 'trunk'],
                ['!has', 'name:de'],
            ],
            layout: {
                'text-size': {
                    base: 1,
                    stops: [
                        [13, 12],
                        [14, 13],
                    ],
                },
                'text-font': ['Open Sans Regular'],
                'text-field': '{name:latin} {name:nonlatin}',
                'symbol-placement': 'line',
                'text-rotation-alignment': 'map',
            },
            paint: { 'text-halo-blur': 0.5, 'text-color': '#765', 'text-halo-width': 1 },
        },
        {
            id: 'highway-name-major-en',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'transportation_name',
            minzoom: 12.2,
            filter: [
                'all',
                ['in', 'class', 'primary', 'secondary', 'tertiary', 'trunk'],
                ['has', 'name:de'],
            ],
            layout: {
                'text-size': {
                    base: 1,
                    stops: [
                        [13, 12],
                        [14, 13],
                    ],
                },
                'text-font': ['Open Sans Regular'],
                'text-field': '{name:de} {name:nonlatin}',
                'symbol-placement': 'line',
                'text-rotation-alignment': 'map',
            },
            paint: { 'text-halo-blur': 0.5, 'text-color': '#765', 'text-halo-width': 1 },
        },
        {
            id: 'highway-shield',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'transportation_name',
            minzoom: 8,
            filter: [
                'all',
                ['<=', 'ref_length', 6],
                ['==', '$type', 'LineString'],
                ['!in', 'network', 'us-interstate', 'us-highway', 'us-state'],
            ],
            layout: {
                'text-size': 10,
                'icon-image': 'road_{ref_length}',
                'icon-rotation-alignment': 'viewport',
                'symbol-spacing': 200,
                'text-font': ['Open Sans Semibold'],
                'symbol-placement': {
                    base: 1,
                    stops: [
                        [10, 'point'],
                        [11, 'line'],
                    ],
                },
                'text-rotation-alignment': 'viewport',
                'icon-size': 1,
                'text-field': '{ref}',
            },
            paint: {},
        },
        {
            id: 'highway-shield-us-interstate',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'transportation_name',
            minzoom: 7,
            filter: [
                'all',
                ['<=', 'ref_length', 6],
                ['==', '$type', 'LineString'],
                ['in', 'network', 'us-interstate'],
            ],
            layout: {
                'text-size': 10,
                'icon-image': '{network}_{ref_length}',
                'icon-rotation-alignment': 'viewport',
                'symbol-spacing': 200,
                'text-font': ['Open Sans Semibold'],
                'symbol-placement': {
                    base: 1,
                    stops: [
                        [7, 'point'],
                        [7, 'line'],
                        [8, 'line'],
                    ],
                },
                'text-rotation-alignment': 'viewport',
                'icon-size': 1,
                'text-field': '{ref}',
            },
            paint: { 'text-color': 'rgba(0, 0, 0, 1)' },
        },
        {
            id: 'highway-shield-us-other',
            type: 'symbol',
            source: 'openmaptiles',
            'source-layer': 'transportation_name',
            minzoom: 9,
            filter: [
                'all',
                ['<=', 'ref_length', 6],
                ['==', '$type', 'LineString'],
                ['in', 'network', 'us-highway', 'us-state'],
            ],
            layout: {
                'text-size': 10,
                'icon-image': '{network}_{ref_length}',
                'icon-rotation-alignment': 'viewport',
                'symbol-spacing': 200,
                'text-font': ['Open Sans Semibold'],
                'symbol-placement': {
                    base: 1,
                    stops: [
                        [10, 'point'],
                        [11, 'line'],
                    ],
                },
                'text-rotation-alignment': 'viewport',
                'icon-size': 1,
                'text-field': '{ref}',
            },
            paint: { 'text-color': 'rgba(0, 0, 0, 1)' },
        },
        {
            id: 'place-other',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['!in', 'class', 'city', 'town', 'village'], ['!has', 'name:de']],
            layout: {
                'text-letter-spacing': 0.1,
                'text-size': {
                    base: 1.2,
                    stops: [
                        [12, 10],
                        [15, 14],
                    ],
                },
                'text-font': ['Open Sans Bold'],
                'text-field': '{name:latin}\n{name:nonlatin}',
                'text-transform': 'uppercase',
                'text-max-width': 9,
            },
            paint: { 'text-color': '#fdfdfd', 'text-halo-width': 1.2, 'text-halo-color': '#433' },
        },
        {
            id: 'place-other-en',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['!in', 'class', 'city', 'town', 'village'], ['has', 'name:de']],
            layout: {
                'text-letter-spacing': 0.1,
                'text-size': {
                    base: 1.2,
                    stops: [
                        [12, 10],
                        [15, 14],
                    ],
                },
                'text-font': ['Open Sans Bold'],
                'text-field': '{name:de}\n{name:nonlatin}',
                'text-transform': 'uppercase',
                'text-max-width': 9,
            },
            paint: { 'text-color': '#fdfdfd', 'text-halo-width': 1.2, 'text-halo-color': '#433' },
        },
        {
            id: 'place-village',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['==', 'class', 'village'], ['!has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Regular'],
                'text-size': {
                    base: 1.2,
                    stops: [
                        [10, 12],
                        [15, 22],
                    ],
                },
                'text-field': '{name:latin}\n{name:nonlatin}',
                'text-max-width': 8,
            },
            paint: { 'text-color': '#fdfdfd', 'text-halo-width': 1.2, 'text-halo-color': '#433' },
        },
        {
            id: 'place-village-en',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['==', 'class', 'village'], ['has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Regular'],
                'text-size': {
                    base: 1.2,
                    stops: [
                        [10, 12],
                        [15, 22],
                    ],
                },
                'text-field': '{name:de}\n{name:nonlatin}',
                'text-max-width': 8,
            },
            paint: { 'text-color': '#fdfdfd', 'text-halo-width': 1.2, 'text-halo-color': '#433' },
        },
        {
            id: 'place-town',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['==', 'class', 'town'], ['!has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Regular'],
                'text-size': {
                    base: 1.2,
                    stops: [
                        [10, 14],
                        [15, 24],
                    ],
                },
                'text-field': '{name:latin}\n{name:nonlatin}',
                'text-max-width': 8,
            },
            paint: { 'text-color': '#fdfdfd', 'text-halo-width': 1.2, 'text-halo-color': '#433' },
        },
        {
            id: 'place-town-en',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['==', 'class', 'town'], ['has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Regular'],
                'text-size': {
                    base: 1.2,
                    stops: [
                        [10, 14],
                        [15, 24],
                    ],
                },
                'text-field': '{name:de}\n{name:nonlatin}',
                'text-max-width': 8,
            },
            paint: { 'text-color': '#fdfdfd', 'text-halo-width': 1.2, 'text-halo-color': '#433' },
        },
        {
            id: 'place-city',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['!=', 'capital', 2], ['==', 'class', 'city'], ['!has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Semibold'],
                'text-size': {
                    base: 1.2,
                    stops: [
                        [7, 14],
                        [11, 24],
                    ],
                },
                'text-field': '{name:latin}\n{name:nonlatin}',
                'text-max-width': 8,
            },
            paint: { 'text-color': '#fdfdfd', 'text-halo-width': 1.2, 'text-halo-color': '#433' },
        },
        {
            id: 'place-city-en',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['!=', 'capital', 2], ['==', 'class', 'city'], ['has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Semibold'],
                'text-size': {
                    base: 1.2,
                    stops: [
                        [7, 14],
                        [11, 24],
                    ],
                },
                'text-field': '{name:de}\n{name:nonlatin}',
                'text-max-width': 8,
            },
            paint: { 'text-color': '#fdfdfd', 'text-halo-width': 1.2, 'text-halo-color': '#433' },
        },
        {
            id: 'place-city-capital',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['==', 'capital', 2], ['==', 'class', 'city'], ['!has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Semibold'],
                'text-size': {
                    base: 1.2,
                    stops: [
                        [7, 14],
                        [11, 24],
                    ],
                },
                'text-field': '{name:latin}\n{name:nonlatin}',
                'text-max-width': 8,
                'icon-image': 'star_11',
                'text-offset': [0.4, 0],
                'icon-size': 0.8,
                'text-anchor': 'left',
            },
            paint: { 'text-color': '#fdfdfd', 'text-halo-width': 1.2, 'text-halo-color': '#433' },
        },
        {
            id: 'place-city-capital-en',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['==', 'capital', 2], ['==', 'class', 'city'], ['has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Semibold'],
                'text-size': {
                    base: 1.2,
                    stops: [
                        [7, 14],
                        [11, 24],
                    ],
                },
                'text-field': '{name:de}\n{name:nonlatin}',
                'text-max-width': 8,
                'icon-image': 'star_11',
                'text-offset': [0.4, 0],
                'icon-size': 0.8,
                'text-anchor': 'left',
            },
            paint: { 'text-color': '#fdfdfd', 'text-halo-width': 1.2, 'text-halo-color': '#433' },
        },
        {
            id: 'place-country-3',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['==', 'class', 'country'], ['>=', 'rank', 3], ['!has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Bold'],
                'text-field': '{name:latin}\n{name:nonlatin}',
                'text-size': {
                    stops: [
                        [3, 11],
                        [7, 17],
                    ],
                },
                'text-transform': 'uppercase',
                'text-max-width': 6.25,
            },
            paint: {
                'text-halo-blur': 1,
                'text-color': '#fdfdfd',
                'text-halo-width': 2,
                'text-halo-color': '#433',
            },
        },
        {
            id: 'place-country-3-en',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['==', 'class', 'country'], ['>=', 'rank', 3], ['has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Bold'],
                'text-field': '{name:de}\n{name:nonlatin}',
                'text-size': {
                    stops: [
                        [3, 11],
                        [7, 17],
                    ],
                },
                'text-transform': 'uppercase',
                'text-max-width': 6.25,
            },
            paint: {
                'text-halo-blur': 1,
                'text-color': '#fdfdfd',
                'text-halo-width': 2,
                'text-halo-color': '#433',
            },
        },
        {
            id: 'place-country-2',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['==', 'class', 'country'], ['==', 'rank', 2], ['!has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Bold'],
                'text-field': '{name:latin}\n{name:nonlatin}',
                'text-size': {
                    stops: [
                        [2, 11],
                        [5, 17],
                    ],
                },
                'text-transform': 'uppercase',
                'text-max-width': 6.25,
            },
            paint: {
                'text-halo-blur': 1,
                'text-color': '#fdfdfd',
                'text-halo-width': 2,
                'text-halo-color': '#433',
            },
        },
        {
            id: 'place-country-2-en',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['==', 'class', 'country'], ['==', 'rank', 2], ['has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Bold'],
                'text-field': '{name:de}\n{name:nonlatin}',
                'text-size': {
                    stops: [
                        [2, 11],
                        [5, 17],
                    ],
                },
                'text-transform': 'uppercase',
                'text-max-width': 6.25,
            },
            paint: {
                'text-halo-blur': 1,
                'text-color': '#fdfdfd',
                'text-halo-width': 2,
                'text-halo-color': '#433',
            },
        },
        {
            id: 'place-country-1',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['==', 'class', 'country'], ['==', 'rank', 1], ['!has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Bold'],
                'text-field': '{name:latin}\n{name:nonlatin}',
                'text-size': {
                    stops: [
                        [1, 11],
                        [4, 17],
                    ],
                },
                'text-transform': 'uppercase',
                'text-max-width': 6.25,
            },
            paint: {
                'text-halo-blur': 1,
                'text-color': '#fdfdfd',
                'text-halo-width': 2,
                'text-halo-color': '#433',
            },
        },
        {
            id: 'place-country-1-en',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            filter: ['all', ['==', 'class', 'country'], ['==', 'rank', 1], ['has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Bold'],
                'text-field': '{name:de}\n{name:nonlatin}',
                'text-size': {
                    stops: [
                        [1, 11],
                        [4, 17],
                    ],
                },
                'text-transform': 'uppercase',
                'text-max-width': 6.25,
            },
            paint: {
                'text-halo-blur': 1,
                'text-color': '#fdfdfd',
                'text-halo-width': 2,
                'text-halo-color': '#433',
            },
        },
        {
            id: 'place-continent',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            maxzoom: 1,
            filter: ['all', ['==', 'class', 'continent'], ['!has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Bold'],
                'text-field': '{name:latin}\n{name:nonlatin}',
                'text-size': 14,
                'text-max-width': 6.25,
                'text-transform': 'uppercase',
            },
            paint: {
                'text-halo-blur': 1,
                'text-color': '#fdfdfd',
                'text-halo-width': 2,
                'text-halo-color': '#433',
            },
        },
        {
            id: 'place-continent-en',
            type: 'symbol',
            metadata: { 'mapbox:group': '1444849242106.713' },
            source: 'openmaptiles',
            'source-layer': 'place',
            maxzoom: 1,
            filter: ['all', ['==', 'class', 'continent'], ['has', 'name:de']],
            layout: {
                'text-font': ['Open Sans Bold'],
                'text-field': '{name:de}\n{name:nonlatin}',
                'text-size': 14,
                'text-max-width': 6.25,
                'text-transform': 'uppercase',
            },
            paint: {
                'text-halo-blur': 1,
                'text-color': '#fdfdfd',
                'text-halo-width': 2,
                'text-halo-color': '#433',
            },
        },
    ],
};

var defaultStyleThumbnailPath = 'https://mapcomponents.github.io/react-map-components-maplibre/assets/style_thumbnails/';
var SelectStyleButton = function (props) {
    var layerContext = React__default.useContext(LayerContext);
    var _a = React__default.useState(false), popupOpen = _a[0], setPopupOpen = _a[1];
    return (React__default.createElement(React__default.Fragment, null,
        React__default.createElement(Button, { variant: "contained", sx: __assign({ marginTop: '10px' }, props.sx), onClick: function () { return setPopupOpen(true); } },
            React__default.createElement(WallpaperIcon, null)),
        React__default.createElement(SelectStylePopup, { styles: __spreadArray(__spreadArray([], (props.defaultStyles
                ? [MonokaiStyle, SolarizedStyle, OceanicNextStyle, MedievalKingdomStyle, GruvboxStyle]
                : []), true), (props.styles || []), true), styleThumbnailPaths: __assign(__assign({}, props === null || props === void 0 ? void 0 : props.styleThumbnailPaths), (props.defaultStyles
                ? {
                    Monokai: defaultStyleThumbnailPath + 'monokai.png',
                    Gruvbox: defaultStyleThumbnailPath + 'gruvbox.png',
                    'Oceanic Next': defaultStyleThumbnailPath + 'oceanic_next.png',
                    Solarized: defaultStyleThumbnailPath + 'solarized.png',
                    'Medieval Kingdom': defaultStyleThumbnailPath + 'medieval_kingdom.png',
                }
                : {})), open: popupOpen, setOpen: setPopupOpen, onSelect: function (style) {
                // Todo: should be possible without clearing bg layers first & setTimeout
                layerContext.setBackgroundLayers([]);
                setTimeout(function () {
                    layerContext.updateStyle(style);
                }, 100);
                setPopupOpen(false);
            } })));
};
SelectStyleButton.defaultProps = {
    style: [],
    defaultStyles: true,
};

var actions = [
    { icon: React__default.createElement(PictureAsPdfIcon, null), name: 'Create PDF' },
    { icon: React__default.createElement(DesignServicesIcon, null), name: 'Sketch' },
    { icon: React__default.createElement(LayersIcon, null), name: 'Layers' },
    { icon: React__default.createElement(WallpaperIcon, null), name: 'Background' },
];
/*
 * SpeedDial Button, which opens up options for Background, Layers, Sketch and Create PDF
 */
var SpeedDial = function () {
    var _a = useState(false), open = _a[0], setOpen = _a[1];
    var handleOpen = function (_event, reason) {
        if (reason === 'toggle') {
            setOpen(true);
        }
    };
    var handleClose = function () { return setOpen(false); };
    return (React__default.createElement(Box$2, { sx: {
            height: 330,
            transform: 'translateZ(0px)',
            flexGrow: 1,
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: '100px',
            zIndex: '1000',
        } },
        React__default.createElement(MuiSpeedDial, { ariaLabel: "SpeedDial tooltip example", sx: { position: 'absolute', bottom: 16, right: 16 }, icon: open ? React__default.createElement(CloseIcon, { fontSize: "large" }) : React__default.createElement(MoreVertIcon, { fontSize: "large" }), onClick: open ? handleClose : handleOpen, onOpen: handleOpen, open: open }, actions.map(function (action) { return (React__default.createElement(SpeedDialAction, { key: action.name, icon: action.icon, tooltipTitle: action.name, tooltipOpen: true, onClick: handleClose, FabProps: { sx: { color: 'text.primary' } } })); }))));
};
SpeedDial.defaultProps = {
    mapId: undefined,
};

var _a;
function processLayerOrderItems(action, items, parent) {
    items.forEach(function (item) {
        action(item, parent);
        if (item.layers && item.layers.length > 0) {
            processLayerOrderItems(action, item.layers, item);
        }
    });
}
var initialState = {
    mapConfigs: {},
};
//@ts-ignore
var mapConfigSlice = createSlice({
    name: 'mapConfig',
    initialState: initialState,
    reducers: {
        // Add or update a MapConfig
        setMapConfig: function (state, action) {
            var mapConfig = action.payload.mapConfig;
            var key = action.payload.key;
            //@ts-ignore
            state.mapConfigs[key] = mapConfig;
        },
        // Remove a MapConfig by its uuid
        removeMapConfig: function (state, action) {
            delete state.mapConfigs[action.payload.key];
        },
        // Add or update a layer within a MapConfig
        setLayerInMapConfig: function (state, action) {
            var _a = action.payload, mapConfigKey = _a.mapConfigKey, updatedLayer = _a.layer;
            var mapConfig = state.mapConfigs[mapConfigKey];
            if (mapConfig) {
                for (var i = 0; i < mapConfig.layers.length; i++) {
                    if (mapConfig.layers[i].uuid === updatedLayer.uuid) {
                        mapConfig.layers[i] = updatedLayer;
                        break;
                    }
                }
            }
        },
        // Remove a layer from a MapConfig
        removeLayerFromMapConfig: function (state, action) {
            var _a = action.payload, mapConfigKey = _a.mapConfigKey, layerUuid = _a.layerUuid;
            var mapConfig = state.mapConfigs[mapConfigKey];
            if (mapConfig) {
                var targetLayerIndex = mapConfig.layers.findIndex(function (el) { return el.uuid === layerUuid; });
                if (targetLayerIndex !== -1) {
                    delete mapConfig.layers[targetLayerIndex];
                    processLayerOrderItems(function (_, parent) {
                        if (parent && parent.layers) {
                            parent.layers = parent.layers.filter(function (child) { return child.uuid !== layerUuid; });
                        }
                    }, mapConfig.layerOrder);
                }
            }
        },
        updateLayerOrder: function (state, action) {
            var _a = action.payload, mapConfigKey = _a.mapConfigKey, newOrder = _a.newOrder;
            var mapConfig = state.mapConfigs[mapConfigKey];
            if (mapConfig) {
                mapConfig.layerOrder = newOrder;
            }
        },
        // masterVisible property will be applied to all children of a folder that is set to be not visible
        // masterVisible will over rule the actual layer config if set to false
        // if masterVisible is true the actual layerConfig visibility setting is respected
        setMasterVisible: function (state, action) {
            var _a;
            var _b = action.payload, mapConfigKey = _b.mapConfigKey, layerId = _b.layerId, masterVisible = _b.masterVisible;
            var mapConfig = state.mapConfigs[mapConfigKey];
            if (mapConfig) {
                var targetLayerIndex = mapConfig.layers.findIndex(function (el) { return el.uuid === layerId; });
                if (targetLayerIndex !== -1) {
                    var layerConfig = mapConfig.layers[targetLayerIndex];
                    if (layerConfig) {
                        var updatedLayers_1 = __spreadArray([], mapConfig.layers, true);
                        if (layerConfig.type === 'folder') {
                            mapConfig.layerOrder.forEach(function (folder) {
                                var _a;
                                if (folder.uuid === layerId) {
                                    (_a = folder.layers) === null || _a === void 0 ? void 0 : _a.forEach(function (childUuid) {
                                        var _a;
                                        var childLayerIndex = mapConfig.layers.findIndex(function (el) { return el.uuid === childUuid.uuid; });
                                        var childLayer = updatedLayers_1[childLayerIndex];
                                        updatedLayers_1[childLayerIndex] = __assign(__assign({}, childLayer), { masterVisible: masterVisible });
                                        if ((childLayer === null || childLayer === void 0 ? void 0 : childLayer.type) === 'vt' && ((_a = childLayer === null || childLayer === void 0 ? void 0 : childLayer.config) === null || _a === void 0 ? void 0 : _a.layers)) {
                                            childLayer.config.layers = childLayer.config.layers.map(function (layer) { return (__assign(__assign({}, layer), { masterVisible: masterVisible })); });
                                        }
                                    });
                                }
                            });
                        }
                        if (layerConfig.type === 'vt' && ((_a = layerConfig === null || layerConfig === void 0 ? void 0 : layerConfig.config) === null || _a === void 0 ? void 0 : _a.layers)) {
                            layerConfig.config.layers = layerConfig.config.layers.map(function (layer) { return (__assign(__assign({}, layer), { masterVisible: masterVisible })); });
                        }
                        state.mapConfigs[mapConfigKey].layers = updatedLayers_1;
                    }
                }
            }
        },
    },
});
var getLayerByUuid = function (state, uuid) {
    var mapConfigs = state.mapConfigs;
    for (var key in mapConfigs) {
        var mapConfig = mapConfigs[key];
        var targetLayerIndex = mapConfig.layers.findIndex(function (el) { return el.uuid === uuid; });
        var foundLayer = mapConfig.layers[targetLayerIndex];
        if (foundLayer)
            return foundLayer;
    }
    return null;
};
var extractUuidsFromLayerOrder = function (state, mapConfigKey) {
    var mapConfig = state.mapConfig.mapConfigs[mapConfigKey];
    if (!mapConfig) {
        return [];
    }
    var layerOrder = mapConfig.layerOrder;
    var uuids = [];
    function extractUuids(items) {
        items.forEach(function (item) {
            uuids.push(item.uuid);
            if (item.layers && item.layers.length > 0) {
                extractUuids(item.layers);
            }
        });
    }
    extractUuids(layerOrder);
    return uuids;
};
var store = configureStore({
    reducer: {
        mapConfig: mapConfigSlice.reducer,
    },
});
var setMapConfig = (_a = mapConfigSlice.actions, _a.setMapConfig), removeMapConfig = _a.removeMapConfig, setLayerInMapConfig = _a.setLayerInMapConfig, removeLayerFromMapConfig = _a.removeLayerFromMapConfig, updateLayerOrder = _a.updateLayerOrder, setMasterVisible = _a.setMasterVisible;

function PaintPropsColorPicker(props) {
    return (React__default.createElement(ColorPicker, { value: props.value, label: "Color", onChange: function (value) {
            if (typeof props.onChange === 'function') {
                props.onChange(value);
            }
        } }));
}

var PaperStyled = styled(Paper)({
    marginLeft: '-100px',
    marginRight: '-21px',
    paddingLeft: '53px',
    borderRadius: '0px',
    boxShadow: 'none',
    backgroundColor: 'rgb(0, 0, 0, 0)',
});
var BoxStyled$1 = styled(Box$1)({
    marginLeft: '61px',
});
var mapPropKeyToFormInputType = {
    'circle-color': 'colorpicker',
    'circle-radius': 'slider',
    'circle-stroke-color': 'colorpicker',
    'circle-stroke-width': 'slider',
    'fill-color': 'colorpicker',
    'fill-outline-color': 'colorpicker',
    'line-color': 'colorpicker',
    'line-width': 'slider',
    'line-blur': 'slider',
};
var mapPropKeyToFormInputTypeKeys = Object.keys(mapPropKeyToFormInputType);
var inputPropsByPropKey = {
    'circle-stroke-width': {
        step: 1,
        min: 1,
        max: 20,
    },
    'circle-radius': {
        step: 1,
        min: 1,
        max: 100,
    },
    'line-blur': {
        step: 1,
        min: 1,
        max: 100,
    },
    'line-width': {
        step: 1,
        min: 1,
        max: 100,
    },
};
function LayerPropertyForm(props) {
    var _a, _b;
    var key = useRef(Math.round(Math.random() * 10000000000));
    var layer = getLayerByUuid(useSelector(function (state) { return state.mapConfig; }), props.layerUuid);
    var dispatch = useDispatch();
    var paintProps = useMemo(function () {
        var _a, _b, _c, _d;
        if ((_b = (_a = layer === null || layer === void 0 ? void 0 : layer.config) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? void 0 : _b.paint) {
            return (_d = (_c = layer === null || layer === void 0 ? void 0 : layer.config) === null || _c === void 0 ? void 0 : _c.options) === null || _d === void 0 ? void 0 : _d.paint;
        }
        return {};
    }, [(_b = (_a = layer === null || layer === void 0 ? void 0 : layer.config) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? void 0 : _b.paint]);
    var updatePaintProp = function (key, value) {
        var _a;
        var _b, _c, _d;
        var updatedLayer = __assign(__assign({}, layer), { config: __assign(__assign({}, layer === null || layer === void 0 ? void 0 : layer.config), { options: __assign(__assign({}, (_b = layer === null || layer === void 0 ? void 0 : layer.config) === null || _b === void 0 ? void 0 : _b.options), { paint: __assign(__assign({}, (_d = (_c = layer === null || layer === void 0 ? void 0 : layer.config) === null || _c === void 0 ? void 0 : _c.options) === null || _d === void 0 ? void 0 : _d.paint), (_a = {}, _a[key] = value, _a)) }) }) });
        dispatch(setLayerInMapConfig({
            mapConfigKey: props.mapConfigKey,
            layer: updatedLayer,
        }));
    };
    var getFormInputByType = useCallback(function (key) {
        if ((paintProps === null || paintProps === void 0 ? void 0 : paintProps[key]) &&
            mapPropKeyToFormInputTypeKeys.indexOf(key) !== -1 &&
            (typeof paintProps[key] === 'number' || typeof paintProps[key] === 'string')) {
            var label = (React__default.createElement(Typography, { id: key + '_label', gutterBottom: true }, key));
            switch (mapPropKeyToFormInputType[key]) {
                case 'slider':
                    return (React__default.createElement(React__default.Fragment, { key: key },
                        label,
                        React__default.createElement(Slider, __assign({}, inputPropsByPropKey[key], { value: paintProps[key], valueLabelDisplay: "auto", onChange: function (_ev, value) {
                                if (value) {
                                    updatePaintProp(key, value);
                                }
                            } }))));
                case 'numberfield':
                    return (React__default.createElement(React__default.Fragment, { key: key },
                        label,
                        React__default.createElement(TextField, { inputProps: { inputMode: 'decimal', pattern: '[0-9]*' }, value: paintProps[key], onChange: function (ev) {
                                var _a;
                                if ((_a = ev === null || ev === void 0 ? void 0 : ev.target) === null || _a === void 0 ? void 0 : _a.value) {
                                    updatePaintProp(key, parseInt(ev.target.value));
                                }
                            } })));
                case 'colorpicker':
                    return (React__default.createElement(React__default.Fragment, { key: key },
                        label,
                        React__default.createElement(Box$1, { sx: { '& > div': { width: 'initial !important' } } },
                            React__default.createElement(PaintPropsColorPicker, { key: key, value: paintProps[key], onChange: function (value) {
                                    updatePaintProp(key, value);
                                } }))));
            }
        }
        return null;
    }, [paintProps]);
    return (React__default.createElement(React__default.Fragment, null,
        React__default.createElement(PaperStyled, null,
            React__default.createElement(ListItem, { key: key.current + '_paintPropForm' },
                React__default.createElement(BoxStyled$1, null, paintProps &&
                    Object.keys(paintProps).map(function (el) { return getFormInputByType(el); }))))));
}

var TuneIconButton = styled(IconButton)({
    padding: '4px',
    marginTop: '-3px',
});
var DeleteIconButton = styled(IconButton)({
    marginLeft: '20px',
});
var ListItemStyled = styled(ListItem)({
    paddingRight: 0,
    paddingLeft: 0,
    paddingTop: 0,
    paddingBottom: '4px',
});
var ListItemIconStyled = styled(ListItemIcon)({
    minWidth: '30px',
});
var IconButtonStyled = styled(IconButton)({
    marginRight: '0px',
    padding: '0px',
});
var BoxStyled = styled(Box$1)(function (_a) {
    var open = _a.open;
    return ({
        display: open ? 'block' : 'none',
    });
});
var ListStyled$1 = styled(List)({
    marginLeft: '50px',
});
function LayerTreeListItem(props) {
    var _a = useState(false), paintPropsFormVisible = _a[0], setPaintPropsFormVisible = _a[1];
    var _b = useState(false), showDeletionConfirmationDialog = _b[0], setShowDeletionConfirmationDialog = _b[1];
    var layer = getLayerByUuid(useSelector(function (state) { return state.mapConfig; }), props.layerOrderConfig.uuid);
    var _c = useState(false), open = _c[0], setOpen = _c[1];
    var dispatch = useDispatch();
    var mapConfig = useSelector(function (state) { return state.mapConfig.mapConfigs[props.mapConfigKey]; });
    function moveLayer(uuid, getNewPos) {
        var newLayerOrder = JSON.parse(JSON.stringify(mapConfig.layerOrder));
        var findAndMove = function (layers) {
            var found = false;
            layers.forEach(function (layer, index) {
                if (found)
                    return;
                if (layer.uuid === uuid) {
                    var newPos = getNewPos(index);
                    if (newPos < 0 || newPos >= layers.length) {
                        throw new Error('New position is out of bounds');
                    }
                    var item = layers.splice(index, 1)[0];
                    layers.splice(newPos, 0, item);
                    found = true;
                }
                else if (layer.layers) {
                    if (findAndMove(layer.layers)) {
                        found = true;
                    }
                }
            });
            return found;
        };
        findAndMove(newLayerOrder);
        dispatch(updateLayerOrder({ mapConfigKey: props.mapConfigKey, newOrder: newLayerOrder }));
    }
    var moveDown = function (uuid) {
        moveLayer(uuid, function (idx) { return idx + 1; });
    };
    var moveUp = function (uuid) {
        moveLayer(uuid, function (idx) { return idx - 1; });
    };
    function handleToggleVisibility(visible, specificLayerId) {
        if (specificLayerId === void 0) { specificLayerId = ''; }
        var nextVisible = !visible;
        if (layer) {
            toggleVisible(layer, nextVisible, specificLayerId);
            if (layer.type === 'folder' || (layer.type === 'vt' && specificLayerId === '')) {
                dispatch(setMasterVisible({
                    mapConfigKey: props.mapConfigKey,
                    layerId: layer.uuid,
                    masterVisible: nextVisible,
                }));
            }
        }
    }
    function toggleVisible(layer, nextVisible, specificLayerId) {
        var _a, _b, _c;
        //TODO: update layout for all layer types
        var updatedLayer = __assign({}, layer);
        if ((layer === null || layer === void 0 ? void 0 : layer.type) === 'folder') {
            updatedLayer = __assign(__assign({}, layer), { visible: !layer.visible });
        }
        else {
            switch (layer === null || layer === void 0 ? void 0 : layer.type) {
                case 'geojson': {
                    updatedLayer = __assign(__assign({}, layer), { config: __assign(__assign({}, layer.config), { options: __assign(__assign({}, (_a = layer === null || layer === void 0 ? void 0 : layer.config) === null || _a === void 0 ? void 0 : _a.options), { layout: __assign(__assign({}, (_c = (_b = layer === null || layer === void 0 ? void 0 : layer.config) === null || _b === void 0 ? void 0 : _b.options) === null || _c === void 0 ? void 0 : _c.layout), { visibility: nextVisible ? 'visible' : 'none' }) }) }) });
                    break;
                }
                case 'vt': {
                    var updateSublayerOnly_1 = false;
                    var updatedSubLayers = layer.config.layers.map(function (layer) {
                        if (layer.id === specificLayerId) {
                            updateSublayerOnly_1 = true;
                            return __assign(__assign({}, layer), { layout: __assign(__assign({}, layer.layout), { visibility: nextVisible ? 'visible' : 'none' }) });
                        }
                        return layer;
                    });
                    if (updateSublayerOnly_1) {
                        updatedLayer = __assign(__assign({}, layer), { config: __assign(__assign({}, layer.config), { layers: updatedSubLayers }) });
                    }
                    else {
                        updatedLayer = __assign(__assign({}, layer), { visible: nextVisible, config: __assign(__assign({}, layer.config), { layers: updatedSubLayers }) });
                    }
                    break;
                }
                case 'wms': {
                    updatedLayer = __assign(__assign({}, layer), { visible: nextVisible, config: __assign(__assign({}, layer.config), { visible: nextVisible }) });
                    break;
                }
            }
        }
        dispatch(setLayerInMapConfig({
            mapConfigKey: props.mapConfigKey,
            layer: updatedLayer,
        }));
        return updatedLayer;
    }
    function renderLayerItem(layer) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        var visible = true;
        if ((layer === null || layer === void 0 ? void 0 : layer.type) === 'geojson') {
            visible = ((_c = (_b = (_a = layer === null || layer === void 0 ? void 0 : layer.config) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? void 0 : _b.layout) === null || _c === void 0 ? void 0 : _c.visibility) !== 'none';
            return (React__default.createElement(React__default.Fragment, null,
                React__default.createElement(ListItemStyled, { key: layer.uuid, sx: __assign({}, props.listItemSx), secondaryAction: React__default.createElement(React__default.Fragment, null, props === null || props === void 0 ? void 0 :
                        props.buttons,
                        React__default.createElement(IconButtonStyled, { disabled: false, onClick: function () {
                                moveDown(layer.uuid);
                            } },
                            React__default.createElement(ArrowCircleDownIcon, null)),
                        React__default.createElement(IconButtonStyled, { disabled: false, onClick: function () {
                                moveUp(layer.uuid);
                            } },
                            React__default.createElement(ArrowCircleUpIcon, null)),
                        layer.configurable && (React__default.createElement(React__default.Fragment, null,
                            React__default.createElement(TuneIconButton, { edge: 'end', "aria-label": "settings", onClick: function () {
                                    setPaintPropsFormVisible(function (current) {
                                        return !current;
                                    });
                                } },
                                React__default.createElement(TuneIcon, null))))) },
                    React__default.createElement(CheckboxListItemIcon, null,
                        React__default.createElement(CheckboxStyled, { checked: visible, disabled: layer.masterVisible === false, onClick: function () { return handleToggleVisibility(visible); } })),
                    React__default.createElement(ListItemText, { variant: "layerlist", primary: layer.name || '', secondary: props.description, primaryTypographyProps: { overflow: 'hidden' } }),
                    props.buttons),
                layer.configurable && paintPropsFormVisible && (React__default.createElement(React__default.Fragment, null,
                    props.showDeleteButton && (React__default.createElement(React__default.Fragment, null,
                        React__default.createElement(DeleteIconButton, { edge: "end", "aria-label": "delete", onClick: function () { } },
                            React__default.createElement(DeleteIcon, null)),
                        showDeletionConfirmationDialog && (React__default.createElement(ConfirmDialog, { open: showDeletionConfirmationDialog, onConfirm: function () {
                                setShowDeletionConfirmationDialog(false);
                            }, onCancel: function () {
                                setShowDeletionConfirmationDialog(false);
                            }, title: "Delete layer", text: "Are you sure you want to delete this layer?" })))),
                    React__default.createElement(LayerPropertyForm, { layerUuid: layer.uuid, mapConfigKey: props.mapConfigKey })))));
        }
        if ((layer === null || layer === void 0 ? void 0 : layer.type) === 'vt') {
            return (React__default.createElement(React__default.Fragment, null,
                React__default.createElement(ListItemStyled, { key: layer.uuid, sx: __assign({}, props.listItemSx), secondaryAction: undefined },
                    React__default.createElement(ListItemIconStyled, null,
                        React__default.createElement(IconButtonStyled, { edge: "end", "aria-label": "open", onClick: function () { return setOpen(!open); } }, open ? React__default.createElement(ExpandMoreIcon, null) : React__default.createElement(KeyboardArrowRightIcon, null)),
                        React__default.createElement(CheckboxListItemIcon, null,
                            React__default.createElement(CheckboxStyled, { checked: layer.visible, disabled: layer.masterVisible === false, onClick: function () { var _a; return handleToggleVisibility((_a = layer.visible) !== null && _a !== void 0 ? _a : false); } }))),
                    React__default.createElement(ListItemText, { primary: layer.name, secondary: props.description, primaryTypographyProps: { overflow: 'hidden' } })),
                React__default.createElement(BoxStyled, { key: layer.uuid + '_list', open: open },
                    React__default.createElement(ListStyled$1, { disablePadding: true }, (_e = (_d = layer.config) === null || _d === void 0 ? void 0 : _d.layers) === null || _e === void 0 ? void 0 : _e.map(function (subLayer) {
                        var _a, _b;
                        return (React__default.createElement(ListItemStyled, { key: subLayer.id, sx: __assign({}, props.listItemSx), secondaryAction: undefined },
                            ' ',
                            React__default.createElement(ListItemIconStyled, null,
                                React__default.createElement(CheckboxListItemIcon, null,
                                    React__default.createElement(CheckboxStyled, { checked: ((_b = (_a = subLayer === null || subLayer === void 0 ? void 0 : subLayer.layout) === null || _a === void 0 ? void 0 : _a.visibility) !== null && _b !== void 0 ? _b : 'visible') === 'visible', disabled: (subLayer === null || subLayer === void 0 ? void 0 : subLayer.masterVisible) === false, onClick: function () {
                                            var _a;
                                            return handleToggleVisibility(((_a = subLayer === null || subLayer === void 0 ? void 0 : subLayer.layout) === null || _a === void 0 ? void 0 : _a.visibility) === 'visible', subLayer.id);
                                        } }))),
                            React__default.createElement(ListItemText, { key: subLayer.id, variant: "layerlist", primary: subLayer['source-layer'], primaryTypographyProps: { overflow: 'hidden' } })));
                    })))));
        }
        if ((layer === null || layer === void 0 ? void 0 : layer.type) === 'wms') {
            var visible_1 = (_g = (_f = layer.config) === null || _f === void 0 ? void 0 : _f.visible) !== null && _g !== void 0 ? _g : true;
            return (React__default.createElement(React__default.Fragment, null,
                React__default.createElement(ListItemStyled, { key: layer.uuid, sx: __assign({}, props.listItemSx), secondaryAction: undefined },
                    React__default.createElement(CheckboxListItemIcon, null,
                        React__default.createElement(CheckboxStyled, { checked: visible_1, disabled: layer.masterVisible === false, onClick: function () { return handleToggleVisibility(visible_1); } })),
                    React__default.createElement(ListItemText, { primary: layer.name, secondary: props.description, primaryTypographyProps: { overflow: 'hidden' } }))));
        }
        if (layer.type === 'folder') {
            return (React__default.createElement(React__default.Fragment, null,
                React__default.createElement(ListItemStyled, { key: layer.uuid, sx: __assign({}, props.listItemSx) },
                    React__default.createElement(ListItemIconStyled, null,
                        React__default.createElement(IconButtonStyled, { edge: "end", "aria-label": "open", onClick: function () { return setOpen(!open); } }, open ? React__default.createElement(ExpandMoreIcon, null) : React__default.createElement(KeyboardArrowRightIcon, null)),
                        React__default.createElement(CheckboxListItemIcon, null,
                            React__default.createElement(CheckboxStyled, { checked: layer.visible, disabled: layer.masterVisible, onClick: function () { return handleToggleVisibility(layer.visible ? layer.visible : false); } }))),
                    React__default.createElement(ListItemText, { primary: layer.name, secondary: props.description, primaryTypographyProps: { overflow: 'hidden' } })),
                React__default.createElement(BoxStyled, { key: layer.uuid + '_list', open: open },
                    React__default.createElement(ListStyled$1, { disablePadding: true }, (_j = (_h = props === null || props === void 0 ? void 0 : props.layerOrderConfig) === null || _h === void 0 ? void 0 : _h.layers) === null || _j === void 0 ? void 0 : _j.map(function (subLayer) { return (React__default.createElement(LayerTreeListItem, { layerOrderConfig: subLayer, key: subLayer.uuid, mapConfigKey: props.mapConfigKey })); })))));
        }
        else {
            return React__default.createElement(React__default.Fragment, null);
        }
    }
    return React__default.createElement(React__default.Fragment, null, layer && renderLayerItem(layer));
}

var ListStyled = styled(List)({
    marginTop: '15px',
});
function LayerTree(props) {
    var _a;
    var layerOrder = useSelector(function (state) { var _a, _b; return (_b = (_a = state.mapConfig.mapConfigs) === null || _a === void 0 ? void 0 : _a[props.mapConfigKey]) === null || _b === void 0 ? void 0 : _b.layerOrder; });
    return (React__default.createElement(ListStyled, null, (_a = layerOrder === null || layerOrder === void 0 ? void 0 : layerOrder.map) === null || _a === void 0 ? void 0 : _a.call(layerOrder, function (el) { return (React__default.createElement(LayerTreeListItem, { key: el.uuid, layerOrderConfig: el, mapConfigKey: props.mapConfigKey })); })));
}

function LayerOnMap(props) {
    var _a;
    var layers = useSelector(function (state) { var _a, _b; return (_b = (_a = state.mapConfig.mapConfigs) === null || _a === void 0 ? void 0 : _a[props.mapConfigKey]) === null || _b === void 0 ? void 0 : _b.layers; });
    var layerStoreOrder = useSelector(function (state) { var _a, _b; return (_b = (_a = state.mapConfig.mapConfigs) === null || _a === void 0 ? void 0 : _a[props.mapConfigKey]) === null || _b === void 0 ? void 0 : _b.layerOrder; });
    var mapHook = useMap({ mapId: props === null || props === void 0 ? void 0 : props.mapId });
    var layerStoreOrderIds = useSelector(function (state) {
        return extractUuidsFromLayerOrder(state, props.mapConfigKey);
    });
    var previousLayerStoreOrderRef = useRef([]);
    useEffect(function () {
        if (!mapHook.map || !layerStoreOrder)
            return;
        var adjustLayerOrderAtLevel = function (layers, previousLayers, map) {
            for (var i = 0; i < layers.length; i++) {
                var currentLayer = layers[i];
                var previousLayer = previousLayers ? previousLayers[i] : null;
                if (currentLayer.uuid !== (previousLayer === null || previousLayer === void 0 ? void 0 : previousLayer.uuid)) {
                    if (map.getLayer(currentLayer.uuid)) {
                        var beforeLayer = i > 0 ? layers[i - 1].uuid : undefined;
                        map.moveLayer(currentLayer.uuid, beforeLayer);
                    }
                }
                if (currentLayer.layers && currentLayer.layers.length > 0) {
                    var previousSubLayers = (previousLayer === null || previousLayer === void 0 ? void 0 : previousLayer.layers) || [];
                    adjustLayerOrderAtLevel(currentLayer.layers, previousSubLayers, map);
                }
            }
        };
        var previousLayerStoreOrder = previousLayerStoreOrderRef.current;
        adjustLayerOrderAtLevel(layerStoreOrder, previousLayerStoreOrder, mapHook.map);
        previousLayerStoreOrderRef.current = layerStoreOrder;
    }, [layerStoreOrder, mapHook.map]);
    var orderLayers = useMemo(function () {
        var layerIds = __spreadArray(__spreadArray([
            'order-background'
        ], layerStoreOrderIds.map(function (el) { return 'layer_id_' + el; }), true), [
            'order-labels',
        ], false);
        return layerIds;
    }, [layerStoreOrderIds]);
    function renderLayer(layer) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        var targetLayerIndex = layers.findIndex(function (el) { return el.uuid === layer.uuid; });
        var layerConfig = layers[targetLayerIndex];
        switch (layerConfig === null || layerConfig === void 0 ? void 0 : layerConfig.type) {
            case 'geojson':
                return (React__default.createElement(MlGeoJsonLayer, __assign({ key: layerConfig.uuid, layerId: layerConfig.uuid, insertBeforeLayer: 'layer_id_' + layerConfig.uuid }, layerConfig.config, { options: __assign(__assign({}, layerConfig.config.options), { layout: __assign(__assign({}, (_b = (_a = layerConfig === null || layerConfig === void 0 ? void 0 : layerConfig.config) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? void 0 : _b.layout), { visibility: layerConfig.masterVisible === false
                                ? 'none'
                                : ((_e = (_d = (_c = layerConfig === null || layerConfig === void 0 ? void 0 : layerConfig.config) === null || _c === void 0 ? void 0 : _c.options) === null || _d === void 0 ? void 0 : _d.layout) === null || _e === void 0 ? void 0 : _e.visibility)
                                    ? (_h = (_g = (_f = layerConfig === null || layerConfig === void 0 ? void 0 : layerConfig.config) === null || _f === void 0 ? void 0 : _f.options) === null || _g === void 0 ? void 0 : _g.layout) === null || _h === void 0 ? void 0 : _h.visibility
                                    : 'visible' }) }) })));
            case 'vt': {
                var l = layerConfig.config.layers.map(function (layer) {
                    var _a;
                    var newLayer = __assign({}, layer);
                    if (newLayer.layout) {
                        newLayer.layout = __assign(__assign({}, newLayer.layout), { visibility: newLayer.masterVisible === false ? 'none' : (_a = newLayer.layout.visibility) !== null && _a !== void 0 ? _a : 'visible' });
                    }
                    return newLayer;
                });
                return (React__default.createElement(MlVectorTileLayer, { key: layerConfig.uuid, layerId: layerConfig.uuid, insertBeforeLayer: 'layer_id_' + layerConfig.uuid, url: layerConfig.config.url, layers: l }));
            }
            case 'wms': {
                var visible = layerConfig.masterVisible === false ? false : (_j = layerConfig.config) === null || _j === void 0 ? void 0 : _j.visible;
                return (React__default.createElement(MlWmsLayer, { key: layerConfig.uuid, layerId: layerConfig.uuid, insertBeforeLayer: 'layer_id_' + layerConfig.uuid, url: ((_k = layerConfig.config) === null || _k === void 0 ? void 0 : _k.url) || '', urlParameters: (_l = layerConfig.config) === null || _l === void 0 ? void 0 : _l.urlParameters, visible: visible }));
            }
            case 'folder':
                return (layer === null || layer === void 0 ? void 0 : layer.layers) ? (layer.layers.map(function (subLayer) { return renderLayer(subLayer); })) : (React__default.createElement(React__default.Fragment, null));
            default:
                return null;
        }
    }
    return (React__default.createElement(React__default.Fragment, null,
        React__default.createElement(MlOrderLayers, { layerIds: orderLayers }), (_a = layerStoreOrder === null || layerStoreOrder === void 0 ? void 0 : layerStoreOrder.map) === null || _a === void 0 ? void 0 :
        _a.call(layerStoreOrder, function (layerOrderItem) { return renderLayer(layerOrderItem); })));
}

var MapStore = {
    store: store,
    setMapConfig: setMapConfig,
    removeMapConfig: removeMapConfig,
    setLayerInMapConfig: setLayerInMapConfig,
    removeLayerFromMapConfig: removeLayerFromMapConfig,
    updateLayerOrder: updateLayerOrder,
    setMasterVisible: setMasterVisible,
};

export { AddLayerButton, AddLayerPopup, CSVProtocolHandler, PaintPropsColorPicker$1 as ColorPicker, ConfirmDialog, GeoJsonContext, GeoJsonLayerForm, GeoJsonProvider, GruvboxStyle, LayerContext, LayerContextProvider, LayerList, LayerListFolder, LayerListItem, LayerListItemFactory, LayerListItemVectorLayer, LayerOnMap, LayerPropertyForm$1 as LayerPropertyForm, LayerTree, LayerTreeListItem, LayerTypeForm, MapComponentsProvider, MapContext, MapLibreGlWrapper, MapLibreMap, MapStore, MedievalKingdomStyle, MlCenterPosition, MlComponentTemplate, MlCreatePdfButton, MlCreatePdfForm, MlFeatureEditor, MlFillExtrusionLayer, MlFollowGps, MlGeoJsonLayer, MlGpxViewer, MlImageMarkerLayer, MlLayer, MlLayerMagnify, MlLayerSwipe, MlMarker, MlMeasureTool, MlMultiMeasureTool, MlNavigationCompass, MlNavigationTools, MlOgcApiFeatures, MlOrderLayers, PdfPreview as MlPdfPreview, MlScaleReference, MlShareMapState, MlSketchTool, MlSpatialElevationProfile, MlTemporalController, MlTerrainLayer, MlTransitionGeoJsonLayer, MlVectorTileLayer, MlWmsFeatureInfoPopup, MlWmsLayer, MlWmsLoader, MonokaiStyle, OSMProtocolHandler, OceanicNextStyle, PdfContext, PdfForm, SelectStyleButton, SelectStylePopup, Sidebar, SimpleDataContext, SimpleDataProvider, SolarizedStyle, SpeedDial, TopToolbar, TopojsonProtocolHandler, UploadButton, WmsLayerForm, XMLProtocolHandler, convertCsv, convertOSM, convertTopojson, convertXML, getTheme, useAddImage, useAddProtocol, useCameraFollowPath, useExportMap, useFeatureEditor, useFilterData, useGpx, useLayer, useLayerContext, useLayerEvent, useLayerFilter, LayerHoverPopup as useLayerHoverPopup, useMap, useMapState, useSource, useWms };
//# sourceMappingURL=index.esm.js.map

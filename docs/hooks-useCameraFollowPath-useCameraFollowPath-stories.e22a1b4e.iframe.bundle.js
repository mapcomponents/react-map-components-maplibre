"use strict";(self.webpackChunk_mapcomponents_react_maplibre=self.webpackChunk_mapcomponents_react_maplibre||[]).push([[5053],{87683:(e,t,n)=>{n.r(t),n.d(t,{ExampleConfig:()=>S,__namedExportsOrder:()=>V,default:()=>x});var a=n(96540),r=n(43042),i=n(61102),o=n(77477),l=n(61224),u=n(73896),s=n(14073),d=n(66),p=n(36852),c=n(77070),m=n(74848);function f(e){return f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},f(e)}function h(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function b(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?h(Object(n),!0).forEach((function(t){var a,r,i,o;a=e,r=t,i=n[t],o=function(e,t){if("object"!=f(e)||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var a=n.call(e,"string");if("object"!=f(a))return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(r),(r="symbol"==f(o)?o:String(o))in a?Object.defineProperty(a,r,{value:i,enumerable:!0,configurable:!0,writable:!0}):a[r]=i})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):h(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function y(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var a,r,i,o,l=[],u=!0,s=!1;try{if(i=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(a=i.call(n)).done)&&(l.push(a.value),l.length!==t);u=!0);}catch(e){s=!0,r=e}finally{try{if(!u&&null!=n.return&&(o=n.return(),Object(o)!==o))return}finally{if(s)throw r}}return l}}(e,t)||function(e,t){if(e){if("string"==typeof e)return g(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?g(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function g(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}const x={title:"Hooks/useCameraFollowPath",component:r.A,argTypes:{},decorators:o.A};var v={type:"Feature",properties:{},geometry:{type:"LineString",coordinates:[[7.10942788610961,50.708209240168],[7.10966149846967,50.7088867160122],[7.10910082880551,50.7108256986007],[7.10856352037736,50.7126945974813],[7.1083532692533,50.7142598002937],[7.10814301812924,50.7160118929942],[7.10793276700518,50.7169463424345],[7.10776923835314,50.7176004570426],[7.10713848498096,50.718838602551],[7.10699831756492,50.7199599418793],[7.106900786313568,50.72118132611057]]}},w=[{value:15,label:"15"},{value:16,label:"16"},{value:17,label:"17"},{value:18,label:"18"},{value:19,label:"19"},{value:20,label:"20"}],S=function(){var e=y((0,a.useState)({pause:!0,zoom:18,speed:1,pitch:60}),2),t=e[0],n=e[1],o=(0,r.A)({route:v,pause:t.pause,pitch:t.pitch,zoom:t.zoom,speed:t.speed}),f=y((0,a.useState)(!0),2),h=f[0],g=f[1],x=y((0,a.useState)(!0),2),S=x[0],V=x[1];return(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(i.A,{buttons:(0,m.jsx)(l.A,{variant:S?"contained":"outlined",onClick:function(){return V(!S)},sx:{marginRight:{xs:"0px",sm:"10px"}},children:"Camera Settings"})}),(0,m.jsxs)(c.A,{open:S,setOpen:V,name:"Camera Settings",children:[(0,m.jsx)(u.A,{onClick:function(){return g(!h)},children:(0,m.jsx)(s.A,{children:h?"Hide route":"Show route"})}),h?(0,m.jsx)(p.A,{geojson:v,type:"line",paint:{"line-width":2,"line-color":"blue"}}):null,(0,m.jsx)(u.A,{disabled:!t.pause,onClick:function(){return n((function(e){return b(b({},e),{},{pause:!1})}))},children:(0,m.jsx)(s.A,{children:"Start"})}),(0,m.jsx)(u.A,{disabled:t.pause,onClick:function(){return n((function(e){return b(b({},e),{},{pause:!0})}))},children:(0,m.jsx)(s.A,{children:"Pause"})}),(0,m.jsx)(u.A,{onClick:function(){n((function(e){return b(b({},e),{},{pause:!0,pitch:60,zoom:18,speed:1})})),setTimeout((function(){o.reset()}),50)},children:(0,m.jsx)(s.A,{children:"Reset"})}),(0,m.jsxs)(u.A,{children:[(0,m.jsx)(s.A,{id:"discrete-slider",style:{marginLeft:"10px",marginRight:"10px"},children:(0,m.jsx)(s.A,{children:"Zoom:"})}),(0,m.jsx)(d.Ay,{value:t.zoom,onChange:function(e,t){n((function(e){return b(b({},e),{},{zoom:Number(t)})}))},getAriaValueText:function(e){return e.toString()},"aria-labelledby":"discrete-slider",step:1,marks:w,min:15,max:20,sx:{marginTop:"20px",paddingBottom:"20px",marginRight:"10px",maxWidth:"200px",minWidth:"150px"}})]}),(0,m.jsxs)(u.A,{children:[(0,m.jsx)(s.A,{id:"discrete-slider2",style:{marginLeft:"10px",marginRight:"10px"},children:"Speed:"}),(0,m.jsx)(d.Ay,{value:t.speed,onChange:function(e,t){n((function(e){return b(b({},e),{},{speed:Number(t)})}))},getAriaValueText:function(e){return e.toString()},"aria-labelledby":"discrete-slider2",step:.1,marks:!0,min:.1,max:2,sx:{marginRight:"10px",maxWidth:"200px",minWidth:"150px"}})]}),(0,m.jsx)(u.A,{onClick:function(){0===t.pitch?n((function(e){return b(b({},e),{},{pitch:60})})):n((function(e){return b(b({},e),{},{pitch:0})}))},children:(0,m.jsx)(s.A,{children:0===t.pitch?"3D":"2D"})})]})]})}.bind({});S.parameters={},S.args={},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:"() => {\n  const [state, setState] = useState({\n    pause: true,\n    zoom: 18,\n    speed: 1,\n    pitch: 60\n  });\n  const CameraFollowPath = useCameraFollowPath({\n    route: routeJson,\n    pause: state.pause,\n    pitch: state.pitch,\n    zoom: state.zoom,\n    speed: state.speed\n  });\n  const [showRoute, setShowRoute] = useState(true);\n  const [openSidebar, setOpenSidebar] = useState(true);\n  return <>\n            <TopToolbar buttons={<Button variant={openSidebar ? 'contained' : 'outlined'} onClick={() => setOpenSidebar(!openSidebar)} sx={{\n      marginRight: {\n        xs: '0px',\n        sm: '10px'\n      }\n    }}>\n                        Camera Settings\n                    </Button>} />\n            <Sidebar open={openSidebar} setOpen={setOpenSidebar} name={'Camera Settings'}>\n                <MenuItem onClick={() => setShowRoute(!showRoute)}>\n                    <Typography>{showRoute ? 'Hide route' : 'Show route'}</Typography>\n                </MenuItem>\n                {showRoute ? <MlGeoJsonLayer geojson={routeJson} type=\"line\" paint={{\n        'line-width': 2,\n        'line-color': 'blue'\n      }} /> : null}\n                <MenuItem disabled={!state.pause} onClick={() => setState(current => {\n        return {\n          ...current,\n          pause: false\n        };\n      })}>\n                    <Typography>Start</Typography>\n                </MenuItem>\n                <MenuItem disabled={state.pause} onClick={() => setState(current => {\n        return {\n          ...current,\n          pause: true\n        };\n      })}>\n                    <Typography>Pause</Typography>\n                </MenuItem>\n                <MenuItem onClick={() => {\n        setState(current => {\n          return {\n            ...current,\n            pause: true,\n            pitch: 60,\n            zoom: 18,\n            speed: 1\n          };\n        });\n        setTimeout(() => {\n          CameraFollowPath.reset();\n        }, 50);\n      }}>\n                    <Typography>Reset</Typography>\n                </MenuItem>\n                <MenuItem>\n                    <Typography id=\"discrete-slider\" style={{\n          marginLeft: '10px',\n          marginRight: '10px'\n        }}>\n                        <Typography>Zoom:</Typography>\n                    </Typography>\n                    <Slider value={state.zoom} onChange={(ev, value) => {\n          setState(current => {\n            return {\n              ...current,\n              zoom: Number(value)\n            };\n          });\n        }} getAriaValueText={value => value.toString()} aria-labelledby=\"discrete-slider\"\n        //valueLabelDisplay=\"auto\"\n        step={1} marks={marks} min={15} max={20} sx={{\n          marginTop: '20px',\n          paddingBottom: '20px',\n          marginRight: '10px',\n          maxWidth: '200px',\n          minWidth: '150px'\n        }} />\n                </MenuItem>\n                <MenuItem>\n                    <Typography id=\"discrete-slider2\" style={{\n          marginLeft: '10px',\n          marginRight: '10px'\n        }}>\n                        Speed:\n                    </Typography>\n                    <Slider value={state.speed} onChange={(ev, value) => {\n          setState(current => {\n            return {\n              ...current,\n              speed: Number(value)\n            };\n          });\n        }} getAriaValueText={value => value.toString()} aria-labelledby=\"discrete-slider2\"\n        //valueLabelDisplay=\"auto\"\n        step={0.1} marks min={0.1} max={2} sx={{\n          marginRight: '10px',\n          maxWidth: '200px',\n          minWidth: '150px'\n        }} />\n                </MenuItem>\n                <MenuItem onClick={() => {\n        if (state.pitch === 0) {\n          setState(current => {\n            return {\n              ...current,\n              pitch: 60\n            };\n          });\n        } else {\n          setState(current => {\n            return {\n              ...current,\n              pitch: 0\n            };\n          });\n        }\n      }}>\n                    <Typography>{state.pitch === 0 ? '3D' : '2D'}</Typography>\n                </MenuItem>\n            </Sidebar>\n        </>;\n}",...S.parameters?.docs?.source}}};const V=["ExampleConfig"]},77477:(e,t,n)=>{n.d(t,{A:()=>f,Y:()=>m});var a=n(96540),r=n(95532),i=n(32348),o=(n(18582),n(68704)),l=n(65793),u=n(30901),s=n(74848);function d(e){return d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},d(e)}function p(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?p(Object(n),!0).forEach((function(t){var a,r,i,o;a=e,r=t,i=n[t],o=function(e,t){if("object"!=d(e)||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var a=n.call(e,"string");if("object"!=d(a))return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(r),(r="symbol"==d(o)?o:String(o))in a?Object.defineProperty(a,r,{value:i,enumerable:!0,configurable:!0,writable:!0}):a[r]=i})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):p(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var m=function(e){return[function(t,n){var d,p=(0,a.useMemo)((function(){var e;return(0,u.A)(null==n||null===(e=n.globals)||void 0===e?void 0:e.theme)}),[null==n||null===(d=n.globals)||void 0===d?void 0:d.theme]);return(0,s.jsx)("div",{className:"fullscreen_map",children:(0,s.jsx)(r.mO,{children:(0,s.jsxs)(l.A,{theme:p,children:[(0,s.jsx)(t,{}),(0,s.jsx)(i.A,{options:c({zoom:14.5,style:"https://wms.wheregroup.com/tileserver/style/osm-bright.json",center:[7.0851268,50.73884]},e?c({},e):{}),mapId:"map_1"}),(0,s.jsx)(o.A,{showZoomButtons:!1,mapId:"map_1"})]})})})}]};const f=m({});try{m.displayName="makeMapContextDecorators",m.__docgenInfo={description:"",displayName:"makeMapContextDecorators",props:{hash:{defaultValue:null,description:"If `true`, the map's position (zoom, center latitude, center longitude, bearing, and pitch) will be synced with the hash fragment of the page's URL.\nFor example, `http://path/to/my/page.html#2.59/39.26/53.07/-24.1/60`.\nAn additional string may optionally be provided to indicate a parameter-styled hash,\ne.g. http://path/to/my/page.html#map=2.59/39.26/53.07/-24.1/60&foo=bar, where foo\nis a custom parameter and bar is an arbitrary hash distinct from the map hash.\n@defaultValue false",name:"hash",required:!1,type:{name:"string | boolean | undefined"}},interactive:{defaultValue:null,description:"If `false`, no mouse, touch, or keyboard listeners will be attached to the map, so it will not respond to interaction.\n@defaultValue true",name:"interactive",required:!1,type:{name:"boolean | undefined"}},container:{defaultValue:null,description:"The HTML element in which MapLibre GL JS will render the map, or the element's string `id`. The specified element must have no children.",name:"container",required:!1,type:{name:"string | HTMLElement | undefined"}},bearingSnap:{defaultValue:null,description:"The threshold, measured in degrees, that determines when the map's\nbearing will snap to north. For example, with a `bearingSnap` of 7, if the user rotates\nthe map within 7 degrees of north, the map will automatically snap to exact north.\n@defaultValue 7",name:"bearingSnap",required:!1,type:{name:"number | undefined"}},attributionControl:{defaultValue:null,description:'If set, an {@link AttributionControl} will be added to the map with the provided options.\nTo disable the attribution control, pass `false`.\nNote: showing the logo of MapLibre is not required for using MapLibre.\n@defaultValue compact: true, customAttribution: "MapLibre ...".',name:"attributionControl",required:!1,type:{name:"false | AttributionControlOptions | undefined"}},maplibreLogo:{defaultValue:null,description:"If `true`, the MapLibre logo will be shown.\n@defaultValue false",name:"maplibreLogo",required:!1,type:{name:"boolean | undefined"}},logoPosition:{defaultValue:null,description:"A string representing the position of the MapLibre wordmark on the map. Valid options are `top-left`,`top-right`, `bottom-left`, or `bottom-right`.\n@defaultValue 'bottom-left'",name:"logoPosition",required:!1,type:{name:"enum",value:[{value:"undefined"},{value:'"top-left"'},{value:'"top-right"'},{value:'"bottom-left"'},{value:'"bottom-right"'}]}},failIfMajorPerformanceCaveat:{defaultValue:null,description:"If `true`, map creation will fail if the performance of MapLibre GL JS would be dramatically worse than expected\n(i.e. a software renderer would be used).\n@defaultValue false",name:"failIfMajorPerformanceCaveat",required:!1,type:{name:"boolean | undefined"}},preserveDrawingBuffer:{defaultValue:null,description:"If `true`, the map's canvas can be exported to a PNG using `map.getCanvas().toDataURL()`. This is `false` by default as a performance optimization.\n@defaultValue false",name:"preserveDrawingBuffer",required:!1,type:{name:"boolean | undefined"}},antialias:{defaultValue:null,description:"If `true`, the gl context will be created with MSAA antialiasing, which can be useful for antialiasing custom layers. This is `false` by default as a performance optimization.",name:"antialias",required:!1,type:{name:"boolean | undefined"}},refreshExpiredTiles:{defaultValue:null,description:"If `false`, the map won't attempt to re-request tiles once they expire per their HTTP `cacheControl`/`expires` headers.\n@defaultValue true",name:"refreshExpiredTiles",required:!1,type:{name:"boolean | undefined"}},maxBounds:{defaultValue:null,description:"If set, the map will be constrained to the given bounds.",name:"maxBounds",required:!1,type:{name:"LngLatBoundsLike | undefined"}},scrollZoom:{defaultValue:null,description:'If `true`, the "scroll to zoom" interaction is enabled. {@link AroundCenterOptions} are passed as options to {@link ScrollZoomHandler#enable }.\n@defaultValue true',name:"scrollZoom",required:!1,type:{name:"boolean | AroundCenterOptions | undefined"}},minZoom:{defaultValue:null,description:"The minimum zoom level of the map (0-24).\n@defaultValue 0",name:"minZoom",required:!1,type:{name:"number | null | undefined"}},maxZoom:{defaultValue:null,description:"The maximum zoom level of the map (0-24).\n@defaultValue 22",name:"maxZoom",required:!1,type:{name:"number | null | undefined"}},minPitch:{defaultValue:null,description:"The minimum pitch of the map (0-85). Values greater than 60 degrees are experimental and may result in rendering issues. If you encounter any, please raise an issue with details in the MapLibre project.\n@defaultValue 0",name:"minPitch",required:!1,type:{name:"number | null | undefined"}},maxPitch:{defaultValue:null,description:"The maximum pitch of the map (0-85). Values greater than 60 degrees are experimental and may result in rendering issues. If you encounter any, please raise an issue with details in the MapLibre project.\n@defaultValue 60",name:"maxPitch",required:!1,type:{name:"number | null | undefined"}},boxZoom:{defaultValue:null,description:'If `true`, the "box zoom" interaction is enabled (see {@link BoxZoomHandler}).\n@defaultValue true',name:"boxZoom",required:!1,type:{name:"boolean | undefined"}},dragRotate:{defaultValue:null,description:'If `true`, the "drag to rotate" interaction is enabled (see {@link DragRotateHandler}).\n@defaultValue true',name:"dragRotate",required:!1,type:{name:"boolean | undefined"}},dragPan:{defaultValue:null,description:'If `true`, the "drag to pan" interaction is enabled. An `Object` value is passed as options to {@link DragPanHandler#enable }.\n@defaultValue true',name:"dragPan",required:!1,type:{name:"boolean | DragPanOptions | undefined"}},keyboard:{defaultValue:null,description:"If `true`, keyboard shortcuts are enabled (see {@link KeyboardHandler}).\n@defaultValue true",name:"keyboard",required:!1,type:{name:"boolean | undefined"}},doubleClickZoom:{defaultValue:null,description:'If `true`, the "double click to zoom" interaction is enabled (see {@link DoubleClickZoomHandler}).\n@defaultValue true',name:"doubleClickZoom",required:!1,type:{name:"boolean | undefined"}},touchZoomRotate:{defaultValue:null,description:'If `true`, the "pinch to rotate and zoom" interaction is enabled. An `Object` value is passed as options to {@link TwoFingersTouchZoomRotateHandler#enable }.\n@defaultValue true',name:"touchZoomRotate",required:!1,type:{name:"boolean | AroundCenterOptions | undefined"}},touchPitch:{defaultValue:null,description:'If `true`, the "drag to pitch" interaction is enabled. An `Object` value is passed as options to {@link TwoFingersTouchPitchHandler#enable }.\n@defaultValue true',name:"touchPitch",required:!1,type:{name:"boolean | AroundCenterOptions | undefined"}},cooperativeGestures:{defaultValue:null,description:'If `true` or set to an options object, the map is only accessible on desktop while holding Command/Ctrl and only accessible on mobile with two fingers. Interacting with the map using normal gestures will trigger an informational screen. With this option enabled, "drag to pitch" requires a three-finger gesture. Cooperative gestures are disabled when a map enters fullscreen using {@link FullscreenControl}.\n@defaultValue undefined',name:"cooperativeGestures",required:!1,type:{name:"boolean | undefined"}},trackResize:{defaultValue:null,description:"If `true`, the map will automatically resize when the browser window resizes.\n@defaultValue true",name:"trackResize",required:!1,type:{name:"boolean | undefined"}},center:{defaultValue:null,description:"The initial geographical centerpoint of the map. If `center` is not specified in the constructor options, MapLibre GL JS will look for it in the map's style object. If it is not specified in the style, either, it will default to `[0, 0]` Note: MapLibre GL JS uses longitude, latitude coordinate order (as opposed to latitude, longitude) to match GeoJSON.\n@defaultValue [0, 0]",name:"center",required:!1,type:{name:"LngLatLike | undefined"}},zoom:{defaultValue:null,description:"The initial zoom level of the map. If `zoom` is not specified in the constructor options, MapLibre GL JS will look for it in the map's style object. If it is not specified in the style, either, it will default to `0`.\n@defaultValue 0",name:"zoom",required:!1,type:{name:"number | undefined"}},bearing:{defaultValue:null,description:"The initial bearing (rotation) of the map, measured in degrees counter-clockwise from north. If `bearing` is not specified in the constructor options, MapLibre GL JS will look for it in the map's style object. If it is not specified in the style, either, it will default to `0`.\n@defaultValue 0",name:"bearing",required:!1,type:{name:"number | undefined"}},pitch:{defaultValue:null,description:"The initial pitch (tilt) of the map, measured in degrees away from the plane of the screen (0-85). If `pitch` is not specified in the constructor options, MapLibre GL JS will look for it in the map's style object. If it is not specified in the style, either, it will default to `0`. Values greater than 60 degrees are experimental and may result in rendering issues. If you encounter any, please raise an issue with details in the MapLibre project.\n@defaultValue 0",name:"pitch",required:!1,type:{name:"number | undefined"}},renderWorldCopies:{defaultValue:null,description:"If `true`, multiple copies of the world will be rendered side by side beyond -180 and 180 degrees longitude. If set to `false`:\n\n- When the map is zoomed out far enough that a single representation of the world does not fill the map's entire\ncontainer, there will be blank space beyond 180 and -180 degrees longitude.\n- Features that cross 180 and -180 degrees longitude will be cut in two (with one portion on the right edge of the\nmap and the other on the left edge of the map) at every zoom level.\n@defaultValue true",name:"renderWorldCopies",required:!1,type:{name:"boolean | undefined"}},maxTileCacheSize:{defaultValue:null,description:"The maximum number of tiles stored in the tile cache for a given source. If omitted, the cache will be dynamically sized based on the current viewport which can be set using `maxTileCacheZoomLevels` constructor options.\n@defaultValue null",name:"maxTileCacheSize",required:!1,type:{name:"number | undefined"}},maxTileCacheZoomLevels:{defaultValue:null,description:"The maximum number of zoom levels for which to store tiles for a given source. Tile cache dynamic size is calculated by multiplying `maxTileCacheZoomLevels` with the approximate number of tiles in the viewport for a given source.\n@defaultValue 5",name:"maxTileCacheZoomLevels",required:!1,type:{name:"number | undefined"}},transformRequest:{defaultValue:null,description:"A callback run before the Map makes a request for an external URL. The callback can be used to modify the url, set headers, or set the credentials property for cross-origin requests.\nExpected to return an object with a `url` property and optionally `headers` and `credentials` properties.",name:"transformRequest",required:!1,type:{name:"RequestTransformFunction | undefined"}},transformCameraUpdate:{defaultValue:null,description:"A callback run before the map's camera is moved due to user input or animation. The callback can be used to modify the new center, zoom, pitch and bearing.\nExpected to return an object containing center, zoom, pitch or bearing values to overwrite.",name:"transformCameraUpdate",required:!1,type:{name:"CameraUpdateTransformFunction | undefined"}},locale:{defaultValue:null,description:"A patch to apply to the default localization table for UI strings, e.g. control tooltips. The `locale` object maps namespaced UI string IDs to translated strings in the target language; see `src/ui/default_locale.js` for an example with all supported string IDs. The object may specify all UI strings (thereby adding support for a new translation) or only a subset of strings (thereby patching the default translation table).\n@defaultValue null",name:"locale",required:!1,type:{name:"any"}},fadeDuration:{defaultValue:null,description:"Controls the duration of the fade-in/fade-out animation for label collisions after initial map load, in milliseconds. This setting affects all symbol layers. This setting does not affect the duration of runtime styling transitions or raster tile cross-fading.\n@defaultValue 300",name:"fadeDuration",required:!1,type:{name:"number | undefined"}},crossSourceCollisions:{defaultValue:null,description:"If `true`, symbols from multiple sources can collide with each other during collision detection. If `false`, collision detection is run separately for the symbols in each source.\n@defaultValue true",name:"crossSourceCollisions",required:!1,type:{name:"boolean | undefined"}},collectResourceTiming:{defaultValue:null,description:"If `true`, Resource Timing API information will be collected for requests made by GeoJSON and Vector Tile web workers (this information is normally inaccessible from the main Javascript thread). Information will be returned in a `resourceTiming` property of relevant `data` events.\n@defaultValue false",name:"collectResourceTiming",required:!1,type:{name:"boolean | undefined"}},clickTolerance:{defaultValue:null,description:"The max number of pixels a user can shift the mouse pointer during a click for it to be considered a valid click (as opposed to a mouse drag).\n@defaultValue true",name:"clickTolerance",required:!1,type:{name:"number | undefined"}},bounds:{defaultValue:null,description:"The initial bounds of the map. If `bounds` is specified, it overrides `center` and `zoom` constructor options.",name:"bounds",required:!1,type:{name:"LngLatBoundsLike | undefined"}},fitBoundsOptions:{defaultValue:null,description:"A {@link FitBoundsOptions} options object to use _only_ when fitting the initial `bounds` provided above.",name:"fitBoundsOptions",required:!1,type:{name:"FitBoundsOptions | undefined"}},localIdeographFontFamily:{defaultValue:null,description:"Defines a CSS\nfont-family for locally overriding generation of glyphs in the 'CJK Unified Ideographs', 'Hiragana', 'Katakana' and 'Hangul Syllables' ranges.\nIn these ranges, font settings from the map's style will be ignored, except for font-weight keywords (light/regular/medium/bold).\nSet to `false`, to enable font settings from the map's style for these glyph ranges.\nThe purpose of this option is to avoid bandwidth-intensive glyph server requests. (See [Use locally generated ideographs](https://maplibre.org/maplibre-gl-js/docs/examples/local-ideographs).)\n@defaultValue 'sans-serif'",name:"localIdeographFontFamily",required:!1,type:{name:"string | undefined"}},style:{defaultValue:null,description:"The map's MapLibre style. This must be a JSON object conforming to\nthe schema described in the [MapLibre Style Specification](https://maplibre.org/maplibre-style-spec/),\nor a URL to such JSON.",name:"style",required:!1,type:{name:"string | StyleSpecification | undefined"}},pitchWithRotate:{defaultValue:null,description:'If `false`, the map\'s pitch (tilt) control with "drag to rotate" interaction will be disabled.\n@defaultValue true',name:"pitchWithRotate",required:!1,type:{name:"boolean | undefined"}},pixelRatio:{defaultValue:null,description:"The pixel ratio. The canvas' `width` attribute will be `container.clientWidth * pixelRatio` and its `height` attribute will be `container.clientHeight * pixelRatio`. Defaults to `devicePixelRatio` if not specified.",name:"pixelRatio",required:!1,type:{name:"number | undefined"}},validateStyle:{defaultValue:null,description:"If false, style validation will be skipped. Useful in production environment.\n@defaultValue true",name:"validateStyle",required:!1,type:{name:"boolean | undefined"}},maxCanvasSize:{defaultValue:null,description:"The canvas' `width` and `height` max size. The values are passed as an array where the first element is max width and the second element is max height.\nYou shouldn't set this above WebGl `MAX_TEXTURE_SIZE`. Defaults to [4096, 4096].",name:"maxCanvasSize",required:!1,type:{name:"[number, number] | undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/decorators/MapContextDecorator.tsx#makeMapContextDecorators"]={docgenInfo:m.__docgenInfo,name:"makeMapContextDecorators",path:"src/decorators/MapContextDecorator.tsx#makeMapContextDecorators"})}catch(e){}}}]);
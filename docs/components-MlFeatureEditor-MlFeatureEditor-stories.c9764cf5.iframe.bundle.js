"use strict";(self.webpackChunk_mapcomponents_react_maplibre=self.webpackChunk_mapcomponents_react_maplibre||[]).push([[671],{87617:(e,t,n)=>{n.r(t),n.d(t,{CatalogueDemo:()=>E,DrawLinestring:()=>S,DrawPoint:()=>j,DrawPolygon:()=>x,EditLinestring:()=>P,EditPoint:()=>V,EditPolygon:()=>w,__namedExportsOrder:()=>T,default:()=>g});var o=n(96540),i=n(14073),a=n(61224),r=n(93912),l=n(77477),s=n(61102),u=n(19741),d=n(73896),c=n(74848);function m(e){return m="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},m(e)}function p(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function f(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?p(Object(n),!0).forEach((function(t){var o,i,a,r;o=e,i=t,a=n[t],r=function(e,t){if("object"!=m(e)||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var o=n.call(e,"string");if("object"!=m(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(i),(i="symbol"==m(r)?r:String(r))in o?Object.defineProperty(o,i,{value:a,enumerable:!0,configurable:!0,writable:!0}):o[i]=a})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):p(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function h(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var o,i,a,r,l=[],s=!0,u=!1;try{if(a=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;s=!1}else for(;!(s=(o=a.call(n)).done)&&(l.push(o.value),l.length!==t);s=!0);}catch(e){u=!0,i=e}finally{try{if(!s&&null!=n.return&&(r=n.return(),Object(r)!==r))return}finally{if(u)throw i}}return l}}(e,t)||function(e,t){if(e){if("string"==typeof e)return b(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?b(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function b(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}const g={title:"MapComponents/MlFeatureEditor",component:r.A,argTypes:{},decorators:l.A};var y={EditPolygon:"Edit Polygon",EditPoint:"Edit Point",EditLinestring:"Edit Linestring",DrawPolygon:"Draw Polygon",DrawPoint:"Draw Point",DrawLinestring:"Draw Linestring"},v=function(e){var t=h((0,o.useState)(!0),2),n=t[0],i=t[1];return(0,o.useEffect)((function(){!1===n&&setTimeout((function(){i(!0)}),750)}),[n]),(0,c.jsxs)(c.Fragment,{children:[n&&(0,c.jsx)(r.A,f(f({},e),{},{onChange:function(e){console.log(e)}})),";"]})},w=v.bind({});w.args={mode:"simple_select",geojson:{type:"Feature",properties:{},geometry:{coordinates:[[[7.0904979943736635,50.73948334574527],[7.087554458473562,50.73827346433987],[7.093562913197076,50.73723639825727],[7.096294028980594,50.7387727842636],[7.0904979943736635,50.73948334574527]]],type:"Polygon"}}};var V=v.bind({});V.args={mode:"simple_select",geojson:{type:"Feature",properties:{},geometry:{type:"Point",coordinates:[7.0851268,50.73884]}}};var P=v.bind({});P.args={mode:"simple_select",geojson:{type:"Feature",properties:{},geometry:{coordinates:[[7.0904979943736635,50.73948334574527],[7.087554458473562,50.73827346433987],[7.093562913197076,50.73723639825727],[7.096294028980594,50.7387727842636]],type:"LineString"}}};var x=v.bind({});x.args={mode:"draw_polygon"};var j=v.bind({});j.args={mode:"draw_point"};var S=v.bind({});S.args={mode:"draw_line_string"};var E=function(){var e=h((0,o.useState)(!0),2),t=e[0],n=e[1],r=h((0,o.useState)("EditPolygon"),2),l=r[0],m=r[1],p=h(o.useState(null),2),f=p[0],b=p[1],g=Boolean(f);return(0,o.useEffect)((function(){!1===t&&setTimeout((function(){n(!0)}),750)}),[t]),(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(s.A,{unmovableButtons:(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(i.A,{variant:"h6",color:"ButtonText",marginRight:"20px",children:y[l]}),(0,c.jsx)(a.A,{id:"basic-button",variant:"contained","aria-controls":g?"basic-menu":void 0,"aria-haspopup":"true","aria-expanded":g?"true":void 0,onClick:function(e){b(e.currentTarget)},children:"Example Configs"}),(0,c.jsxs)(u.A,{id:"basic-menu",anchorEl:f,open:g,onClose:function(){b(null)},MenuListProps:{"aria-labelledby":"basic-button"},children:[(0,c.jsx)(d.A,{onClick:function(){return m("EditPolygon")},children:"Edit Polygon"}),(0,c.jsx)(d.A,{onClick:function(){return m("EditPoint")},children:"Edit Point"}),(0,c.jsx)(d.A,{onClick:function(){return m("EditLinestring")},children:"Edit Linestring"}),(0,c.jsx)(d.A,{onClick:function(){return m("DrawPolygon")},children:"Draw Polygon"}),(0,c.jsx)(d.A,{onClick:function(){return m("DrawPoint")},children:"Draw Point"}),(0,c.jsx)(d.A,{onClick:function(){return m("DrawLinestring")},children:"Draw Linestring"})]})]})}),"EditPolygon"===l&&(0,c.jsx)(v,{mode:w.args.mode,geojson:w.args.geojson}),"EditPoint"===l&&(0,c.jsx)(v,{mode:V.args.mode,geojson:V.args.geojson}),"EditLinestring"===l&&(0,c.jsx)(v,{mode:P.args.mode,geojson:P.args.geojson}),"DrawPolygon"===l&&(0,c.jsx)(v,{mode:x.args.mode}),"DrawPoint"===l&&(0,c.jsx)(v,{mode:j.args.mode}),"DrawLinestring"===l&&(0,c.jsx)(v,{mode:S.args.mode})]})}.bind({});E.parameters={},E.args={},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:"(args: useFeatureEditorProps) => {\n  const [visible, setVisible] = useState(true);\n  useEffect(() => {\n    if (visible === false) {\n      setTimeout(() => {\n        setVisible(true);\n      }, 750);\n    }\n  }, [visible]);\n  return <>\n            {visible && <MlFeatureEditor {...args} onChange={features => {\n      console.log(features);\n    }} />}\n            ;\n        </>;\n}",...w.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:"(args: useFeatureEditorProps) => {\n  const [visible, setVisible] = useState(true);\n  useEffect(() => {\n    if (visible === false) {\n      setTimeout(() => {\n        setVisible(true);\n      }, 750);\n    }\n  }, [visible]);\n  return <>\n            {visible && <MlFeatureEditor {...args} onChange={features => {\n      console.log(features);\n    }} />}\n            ;\n        </>;\n}",...V.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:"(args: useFeatureEditorProps) => {\n  const [visible, setVisible] = useState(true);\n  useEffect(() => {\n    if (visible === false) {\n      setTimeout(() => {\n        setVisible(true);\n      }, 750);\n    }\n  }, [visible]);\n  return <>\n            {visible && <MlFeatureEditor {...args} onChange={features => {\n      console.log(features);\n    }} />}\n            ;\n        </>;\n}",...P.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:"(args: useFeatureEditorProps) => {\n  const [visible, setVisible] = useState(true);\n  useEffect(() => {\n    if (visible === false) {\n      setTimeout(() => {\n        setVisible(true);\n      }, 750);\n    }\n  }, [visible]);\n  return <>\n            {visible && <MlFeatureEditor {...args} onChange={features => {\n      console.log(features);\n    }} />}\n            ;\n        </>;\n}",...x.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:"(args: useFeatureEditorProps) => {\n  const [visible, setVisible] = useState(true);\n  useEffect(() => {\n    if (visible === false) {\n      setTimeout(() => {\n        setVisible(true);\n      }, 750);\n    }\n  }, [visible]);\n  return <>\n            {visible && <MlFeatureEditor {...args} onChange={features => {\n      console.log(features);\n    }} />}\n            ;\n        </>;\n}",...j.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:"(args: useFeatureEditorProps) => {\n  const [visible, setVisible] = useState(true);\n  useEffect(() => {\n    if (visible === false) {\n      setTimeout(() => {\n        setVisible(true);\n      }, 750);\n    }\n  }, [visible]);\n  return <>\n            {visible && <MlFeatureEditor {...args} onChange={features => {\n      console.log(features);\n    }} />}\n            ;\n        </>;\n}",...S.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:"() => {\n  const [visible, setVisible] = useState(true);\n  const [selectedMode, setSelectedMode] = useState<string>('EditPolygon');\n  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);\n  const open = Boolean(anchorEl);\n  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {\n    setAnchorEl(event.currentTarget);\n  };\n  const handleClose = () => {\n    setAnchorEl(null);\n  };\n  useEffect(() => {\n    if (visible === false) {\n      setTimeout(() => {\n        setVisible(true);\n      }, 750);\n    }\n  }, [visible]);\n  return <>\n            <TopToolbar unmovableButtons={<>\n                        <Typography variant=\"h6\" color={'ButtonText'} marginRight={'20px'}>\n                            {configTitles[selectedMode]}\n                        </Typography>\n                        <Button id=\"basic-button\" variant=\"contained\" aria-controls={open ? 'basic-menu' : undefined} aria-haspopup=\"true\" aria-expanded={open ? 'true' : undefined} onClick={handleClick}>\n                            Example Configs\n                        </Button>\n                        <Menu id=\"basic-menu\" anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{\n        'aria-labelledby': 'basic-button'\n      }}>\n                            <MenuItem onClick={() => setSelectedMode('EditPolygon')}>Edit Polygon</MenuItem>\n                            <MenuItem onClick={() => setSelectedMode('EditPoint')}>Edit Point</MenuItem>\n                            <MenuItem onClick={() => setSelectedMode('EditLinestring')}>Edit Linestring</MenuItem>\n                            <MenuItem onClick={() => setSelectedMode('DrawPolygon')}>Draw Polygon</MenuItem>\n                            <MenuItem onClick={() => setSelectedMode('DrawPoint')}>Draw Point</MenuItem>\n                            <MenuItem onClick={() => setSelectedMode('DrawLinestring')}>Draw Linestring</MenuItem>\n                        </Menu>\n                    </>} />\n            {selectedMode === 'EditPolygon' && <Template mode={EditPolygon.args.mode} geojson={EditPolygon.args.geojson} />}\n            {selectedMode === 'EditPoint' && <Template mode={EditPoint.args.mode} geojson={EditPoint.args.geojson} />}\n            {selectedMode === 'EditLinestring' && <Template mode={EditLinestring.args.mode} geojson={EditLinestring.args.geojson} />}\n            {selectedMode === 'DrawPolygon' && <Template mode={DrawPolygon.args.mode} />}\n            {selectedMode === 'DrawPoint' && <Template mode={DrawPoint.args.mode} />}\n            {selectedMode === 'DrawLinestring' && <Template mode={DrawLinestring.args.mode} />}\n        </>;\n}",...E.parameters?.docs?.source}}};const T=["EditPolygon","EditPoint","EditLinestring","DrawPolygon","DrawPoint","DrawLinestring","CatalogueDemo"]},77477:(e,t,n)=>{n.d(t,{A:()=>f,Y:()=>p});var o=n(96540),i=n(95532),a=n(32348),r=(n(18582),n(68704)),l=n(65793),s=n(30901),u=n(74848);function d(e){return d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},d(e)}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function m(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){var o,i,a,r;o=e,i=t,a=n[t],r=function(e,t){if("object"!=d(e)||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var o=n.call(e,"string");if("object"!=d(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(i),(i="symbol"==d(r)?r:String(r))in o?Object.defineProperty(o,i,{value:a,enumerable:!0,configurable:!0,writable:!0}):o[i]=a})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var p=function(e){return[function(t,n){var d,c=(0,o.useMemo)((function(){var e;return(0,s.A)(null==n||null===(e=n.globals)||void 0===e?void 0:e.theme)}),[null==n||null===(d=n.globals)||void 0===d?void 0:d.theme]);return(0,u.jsx)("div",{className:"fullscreen_map",children:(0,u.jsx)(i.mO,{children:(0,u.jsxs)(l.A,{theme:c,children:[(0,u.jsx)(t,{}),(0,u.jsx)(a.A,{options:m({zoom:14.5,style:"https://wms.wheregroup.com/tileserver/style/osm-bright.json",center:[7.0851268,50.73884]},e?m({},e):{}),mapId:"map_1"}),(0,u.jsx)(r.A,{showZoomButtons:!1,mapId:"map_1"})]})})})}]};const f=p({});try{p.displayName="makeMapContextDecorators",p.__docgenInfo={description:"",displayName:"makeMapContextDecorators",props:{hash:{defaultValue:null,description:"If `true`, the map's position (zoom, center latitude, center longitude, bearing, and pitch) will be synced with the hash fragment of the page's URL.\nFor example, `http://path/to/my/page.html#2.59/39.26/53.07/-24.1/60`.\nAn additional string may optionally be provided to indicate a parameter-styled hash,\ne.g. http://path/to/my/page.html#map=2.59/39.26/53.07/-24.1/60&foo=bar, where foo\nis a custom parameter and bar is an arbitrary hash distinct from the map hash.\n@defaultValue false",name:"hash",required:!1,type:{name:"string | boolean | undefined"}},interactive:{defaultValue:null,description:"If `false`, no mouse, touch, or keyboard listeners will be attached to the map, so it will not respond to interaction.\n@defaultValue true",name:"interactive",required:!1,type:{name:"boolean | undefined"}},container:{defaultValue:null,description:"The HTML element in which MapLibre GL JS will render the map, or the element's string `id`. The specified element must have no children.",name:"container",required:!1,type:{name:"string | HTMLElement | undefined"}},bearingSnap:{defaultValue:null,description:"The threshold, measured in degrees, that determines when the map's\nbearing will snap to north. For example, with a `bearingSnap` of 7, if the user rotates\nthe map within 7 degrees of north, the map will automatically snap to exact north.\n@defaultValue 7",name:"bearingSnap",required:!1,type:{name:"number | undefined"}},attributionControl:{defaultValue:null,description:'If set, an {@link AttributionControl} will be added to the map with the provided options.\nTo disable the attribution control, pass `false`.\nNote: showing the logo of MapLibre is not required for using MapLibre.\n@defaultValue compact: true, customAttribution: "MapLibre ...".',name:"attributionControl",required:!1,type:{name:"false | AttributionControlOptions | undefined"}},maplibreLogo:{defaultValue:null,description:"If `true`, the MapLibre logo will be shown.\n@defaultValue false",name:"maplibreLogo",required:!1,type:{name:"boolean | undefined"}},logoPosition:{defaultValue:null,description:"A string representing the position of the MapLibre wordmark on the map. Valid options are `top-left`,`top-right`, `bottom-left`, or `bottom-right`.\n@defaultValue 'bottom-left'",name:"logoPosition",required:!1,type:{name:"enum",value:[{value:"undefined"},{value:'"top-left"'},{value:'"top-right"'},{value:'"bottom-left"'},{value:'"bottom-right"'}]}},failIfMajorPerformanceCaveat:{defaultValue:null,description:"If `true`, map creation will fail if the performance of MapLibre GL JS would be dramatically worse than expected\n(i.e. a software renderer would be used).\n@defaultValue false",name:"failIfMajorPerformanceCaveat",required:!1,type:{name:"boolean | undefined"}},preserveDrawingBuffer:{defaultValue:null,description:"If `true`, the map's canvas can be exported to a PNG using `map.getCanvas().toDataURL()`. This is `false` by default as a performance optimization.\n@defaultValue false",name:"preserveDrawingBuffer",required:!1,type:{name:"boolean | undefined"}},antialias:{defaultValue:null,description:"If `true`, the gl context will be created with MSAA antialiasing, which can be useful for antialiasing custom layers. This is `false` by default as a performance optimization.",name:"antialias",required:!1,type:{name:"boolean | undefined"}},refreshExpiredTiles:{defaultValue:null,description:"If `false`, the map won't attempt to re-request tiles once they expire per their HTTP `cacheControl`/`expires` headers.\n@defaultValue true",name:"refreshExpiredTiles",required:!1,type:{name:"boolean | undefined"}},maxBounds:{defaultValue:null,description:"If set, the map will be constrained to the given bounds.",name:"maxBounds",required:!1,type:{name:"LngLatBoundsLike | undefined"}},scrollZoom:{defaultValue:null,description:'If `true`, the "scroll to zoom" interaction is enabled. {@link AroundCenterOptions} are passed as options to {@link ScrollZoomHandler#enable }.\n@defaultValue true',name:"scrollZoom",required:!1,type:{name:"boolean | AroundCenterOptions | undefined"}},minZoom:{defaultValue:null,description:"The minimum zoom level of the map (0-24).\n@defaultValue 0",name:"minZoom",required:!1,type:{name:"number | null | undefined"}},maxZoom:{defaultValue:null,description:"The maximum zoom level of the map (0-24).\n@defaultValue 22",name:"maxZoom",required:!1,type:{name:"number | null | undefined"}},minPitch:{defaultValue:null,description:"The minimum pitch of the map (0-85). Values greater than 60 degrees are experimental and may result in rendering issues. If you encounter any, please raise an issue with details in the MapLibre project.\n@defaultValue 0",name:"minPitch",required:!1,type:{name:"number | null | undefined"}},maxPitch:{defaultValue:null,description:"The maximum pitch of the map (0-85). Values greater than 60 degrees are experimental and may result in rendering issues. If you encounter any, please raise an issue with details in the MapLibre project.\n@defaultValue 60",name:"maxPitch",required:!1,type:{name:"number | null | undefined"}},boxZoom:{defaultValue:null,description:'If `true`, the "box zoom" interaction is enabled (see {@link BoxZoomHandler}).\n@defaultValue true',name:"boxZoom",required:!1,type:{name:"boolean | undefined"}},dragRotate:{defaultValue:null,description:'If `true`, the "drag to rotate" interaction is enabled (see {@link DragRotateHandler}).\n@defaultValue true',name:"dragRotate",required:!1,type:{name:"boolean | undefined"}},dragPan:{defaultValue:null,description:'If `true`, the "drag to pan" interaction is enabled. An `Object` value is passed as options to {@link DragPanHandler#enable }.\n@defaultValue true',name:"dragPan",required:!1,type:{name:"boolean | DragPanOptions | undefined"}},keyboard:{defaultValue:null,description:"If `true`, keyboard shortcuts are enabled (see {@link KeyboardHandler}).\n@defaultValue true",name:"keyboard",required:!1,type:{name:"boolean | undefined"}},doubleClickZoom:{defaultValue:null,description:'If `true`, the "double click to zoom" interaction is enabled (see {@link DoubleClickZoomHandler}).\n@defaultValue true',name:"doubleClickZoom",required:!1,type:{name:"boolean | undefined"}},touchZoomRotate:{defaultValue:null,description:'If `true`, the "pinch to rotate and zoom" interaction is enabled. An `Object` value is passed as options to {@link TwoFingersTouchZoomRotateHandler#enable }.\n@defaultValue true',name:"touchZoomRotate",required:!1,type:{name:"boolean | AroundCenterOptions | undefined"}},touchPitch:{defaultValue:null,description:'If `true`, the "drag to pitch" interaction is enabled. An `Object` value is passed as options to {@link TwoFingersTouchPitchHandler#enable }.\n@defaultValue true',name:"touchPitch",required:!1,type:{name:"boolean | AroundCenterOptions | undefined"}},cooperativeGestures:{defaultValue:null,description:'If `true` or set to an options object, the map is only accessible on desktop while holding Command/Ctrl and only accessible on mobile with two fingers. Interacting with the map using normal gestures will trigger an informational screen. With this option enabled, "drag to pitch" requires a three-finger gesture. Cooperative gestures are disabled when a map enters fullscreen using {@link FullscreenControl}.\n@defaultValue undefined',name:"cooperativeGestures",required:!1,type:{name:"boolean | undefined"}},trackResize:{defaultValue:null,description:"If `true`, the map will automatically resize when the browser window resizes.\n@defaultValue true",name:"trackResize",required:!1,type:{name:"boolean | undefined"}},center:{defaultValue:null,description:"The initial geographical centerpoint of the map. If `center` is not specified in the constructor options, MapLibre GL JS will look for it in the map's style object. If it is not specified in the style, either, it will default to `[0, 0]` Note: MapLibre GL JS uses longitude, latitude coordinate order (as opposed to latitude, longitude) to match GeoJSON.\n@defaultValue [0, 0]",name:"center",required:!1,type:{name:"LngLatLike | undefined"}},zoom:{defaultValue:null,description:"The initial zoom level of the map. If `zoom` is not specified in the constructor options, MapLibre GL JS will look for it in the map's style object. If it is not specified in the style, either, it will default to `0`.\n@defaultValue 0",name:"zoom",required:!1,type:{name:"number | undefined"}},bearing:{defaultValue:null,description:"The initial bearing (rotation) of the map, measured in degrees counter-clockwise from north. If `bearing` is not specified in the constructor options, MapLibre GL JS will look for it in the map's style object. If it is not specified in the style, either, it will default to `0`.\n@defaultValue 0",name:"bearing",required:!1,type:{name:"number | undefined"}},pitch:{defaultValue:null,description:"The initial pitch (tilt) of the map, measured in degrees away from the plane of the screen (0-85). If `pitch` is not specified in the constructor options, MapLibre GL JS will look for it in the map's style object. If it is not specified in the style, either, it will default to `0`. Values greater than 60 degrees are experimental and may result in rendering issues. If you encounter any, please raise an issue with details in the MapLibre project.\n@defaultValue 0",name:"pitch",required:!1,type:{name:"number | undefined"}},renderWorldCopies:{defaultValue:null,description:"If `true`, multiple copies of the world will be rendered side by side beyond -180 and 180 degrees longitude. If set to `false`:\n\n- When the map is zoomed out far enough that a single representation of the world does not fill the map's entire\ncontainer, there will be blank space beyond 180 and -180 degrees longitude.\n- Features that cross 180 and -180 degrees longitude will be cut in two (with one portion on the right edge of the\nmap and the other on the left edge of the map) at every zoom level.\n@defaultValue true",name:"renderWorldCopies",required:!1,type:{name:"boolean | undefined"}},maxTileCacheSize:{defaultValue:null,description:"The maximum number of tiles stored in the tile cache for a given source. If omitted, the cache will be dynamically sized based on the current viewport which can be set using `maxTileCacheZoomLevels` constructor options.\n@defaultValue null",name:"maxTileCacheSize",required:!1,type:{name:"number | undefined"}},maxTileCacheZoomLevels:{defaultValue:null,description:"The maximum number of zoom levels for which to store tiles for a given source. Tile cache dynamic size is calculated by multiplying `maxTileCacheZoomLevels` with the approximate number of tiles in the viewport for a given source.\n@defaultValue 5",name:"maxTileCacheZoomLevels",required:!1,type:{name:"number | undefined"}},transformRequest:{defaultValue:null,description:"A callback run before the Map makes a request for an external URL. The callback can be used to modify the url, set headers, or set the credentials property for cross-origin requests.\nExpected to return an object with a `url` property and optionally `headers` and `credentials` properties.",name:"transformRequest",required:!1,type:{name:"RequestTransformFunction | undefined"}},transformCameraUpdate:{defaultValue:null,description:"A callback run before the map's camera is moved due to user input or animation. The callback can be used to modify the new center, zoom, pitch and bearing.\nExpected to return an object containing center, zoom, pitch or bearing values to overwrite.",name:"transformCameraUpdate",required:!1,type:{name:"CameraUpdateTransformFunction | undefined"}},locale:{defaultValue:null,description:"A patch to apply to the default localization table for UI strings, e.g. control tooltips. The `locale` object maps namespaced UI string IDs to translated strings in the target language; see `src/ui/default_locale.js` for an example with all supported string IDs. The object may specify all UI strings (thereby adding support for a new translation) or only a subset of strings (thereby patching the default translation table).\n@defaultValue null",name:"locale",required:!1,type:{name:"any"}},fadeDuration:{defaultValue:null,description:"Controls the duration of the fade-in/fade-out animation for label collisions after initial map load, in milliseconds. This setting affects all symbol layers. This setting does not affect the duration of runtime styling transitions or raster tile cross-fading.\n@defaultValue 300",name:"fadeDuration",required:!1,type:{name:"number | undefined"}},crossSourceCollisions:{defaultValue:null,description:"If `true`, symbols from multiple sources can collide with each other during collision detection. If `false`, collision detection is run separately for the symbols in each source.\n@defaultValue true",name:"crossSourceCollisions",required:!1,type:{name:"boolean | undefined"}},collectResourceTiming:{defaultValue:null,description:"If `true`, Resource Timing API information will be collected for requests made by GeoJSON and Vector Tile web workers (this information is normally inaccessible from the main Javascript thread). Information will be returned in a `resourceTiming` property of relevant `data` events.\n@defaultValue false",name:"collectResourceTiming",required:!1,type:{name:"boolean | undefined"}},clickTolerance:{defaultValue:null,description:"The max number of pixels a user can shift the mouse pointer during a click for it to be considered a valid click (as opposed to a mouse drag).\n@defaultValue true",name:"clickTolerance",required:!1,type:{name:"number | undefined"}},bounds:{defaultValue:null,description:"The initial bounds of the map. If `bounds` is specified, it overrides `center` and `zoom` constructor options.",name:"bounds",required:!1,type:{name:"LngLatBoundsLike | undefined"}},fitBoundsOptions:{defaultValue:null,description:"A {@link FitBoundsOptions} options object to use _only_ when fitting the initial `bounds` provided above.",name:"fitBoundsOptions",required:!1,type:{name:"FitBoundsOptions | undefined"}},localIdeographFontFamily:{defaultValue:null,description:"Defines a CSS\nfont-family for locally overriding generation of glyphs in the 'CJK Unified Ideographs', 'Hiragana', 'Katakana' and 'Hangul Syllables' ranges.\nIn these ranges, font settings from the map's style will be ignored, except for font-weight keywords (light/regular/medium/bold).\nSet to `false`, to enable font settings from the map's style for these glyph ranges.\nThe purpose of this option is to avoid bandwidth-intensive glyph server requests. (See [Use locally generated ideographs](https://maplibre.org/maplibre-gl-js/docs/examples/local-ideographs).)\n@defaultValue 'sans-serif'",name:"localIdeographFontFamily",required:!1,type:{name:"string | undefined"}},style:{defaultValue:null,description:"The map's MapLibre style. This must be a JSON object conforming to\nthe schema described in the [MapLibre Style Specification](https://maplibre.org/maplibre-style-spec/),\nor a URL to such JSON.",name:"style",required:!1,type:{name:"string | StyleSpecification | undefined"}},pitchWithRotate:{defaultValue:null,description:'If `false`, the map\'s pitch (tilt) control with "drag to rotate" interaction will be disabled.\n@defaultValue true',name:"pitchWithRotate",required:!1,type:{name:"boolean | undefined"}},pixelRatio:{defaultValue:null,description:"The pixel ratio. The canvas' `width` attribute will be `container.clientWidth * pixelRatio` and its `height` attribute will be `container.clientHeight * pixelRatio`. Defaults to `devicePixelRatio` if not specified.",name:"pixelRatio",required:!1,type:{name:"number | undefined"}},validateStyle:{defaultValue:null,description:"If false, style validation will be skipped. Useful in production environment.\n@defaultValue true",name:"validateStyle",required:!1,type:{name:"boolean | undefined"}},maxCanvasSize:{defaultValue:null,description:"The canvas' `width` and `height` max size. The values are passed as an array where the first element is max width and the second element is max height.\nYou shouldn't set this above WebGl `MAX_TEXTURE_SIZE`. Defaults to [4096, 4096].",name:"maxCanvasSize",required:!1,type:{name:"[number, number] | undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/decorators/MapContextDecorator.tsx#makeMapContextDecorators"]={docgenInfo:p.__docgenInfo,name:"makeMapContextDecorators",path:"src/decorators/MapContextDecorator.tsx#makeMapContextDecorators"})}catch(e){}}}]);
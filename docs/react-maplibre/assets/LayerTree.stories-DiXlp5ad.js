import{j as e}from"./index-D_jt9QYA.js";import{g as h,M as b,bd as y,be as g,T as w,a as v,Y as x,bf as o,bg as d,bh as u,S as p,p as r,bi as c}from"./style-BToUMRiZ.js";import{r as V}from"./iframe-B-5v0xel.js";import{s as C}from"./sample_polygon_1-C4T77cfz.js";import"./index-lrHrizay.js";import"./preload-helper-D9Z9MdNV.js";const l=t=>[(i,s)=>{const m=V.useMemo(()=>h(s?.globals?.theme),[s?.globals?.theme]);return e.jsx("div",{className:"fullscreen_map",children:e.jsx(b,{children:e.jsx(y,{store:g,children:e.jsxs(w,{theme:m,children:[e.jsx(i,{}),e.jsx(v,{options:{zoom:12.5,style:"https://wms.wheregroup.com/tileserver/style/osm-bright.json",center:[7.0851268,50.73884],...t?{...t}:{}},mapId:"map_1"}),e.jsx(x,{showZoomButtons:!1,mapId:"map_1"})]})})})})}],T=l({});try{l.displayName="makeMapContextDecorators",l.__docgenInfo={description:"",displayName:"makeMapContextDecorators",props:{hash:{defaultValue:null,description:`If \`true\`, the map's position (zoom, center latitude, center longitude, bearing, and pitch) will be synced with the hash fragment of the page's URL.
For example, \`http://path/to/my/page.html#2.59/39.26/53.07/-24.1/60\`.
An additional string may optionally be provided to indicate a parameter-styled hash,
e.g. http://path/to/my/page.html#map=2.59/39.26/53.07/-24.1/60&foo=bar, where foo
is a custom parameter and bar is an arbitrary hash distinct from the map hash.
@defaultValue false`,name:"hash",required:!1,type:{name:"string | boolean | undefined"}},interactive:{defaultValue:null,description:"If `false`, no mouse, touch, or keyboard listeners will be attached to the map, so it will not respond to interaction.\n@defaultValue true",name:"interactive",required:!1,type:{name:"boolean | undefined"}},container:{defaultValue:null,description:"The HTML element in which MapLibre GL JS will render the map, or the element's string `id`. The specified element must have no children.",name:"container",required:!1,type:{name:"string | HTMLElement | undefined"}},bearingSnap:{defaultValue:null,description:`The threshold, measured in degrees, that determines when the map's
bearing will snap to north. For example, with a \`bearingSnap\` of 7, if the user rotates
the map within 7 degrees of north, the map will automatically snap to exact north.
@defaultValue 7`,name:"bearingSnap",required:!1,type:{name:"number | undefined"}},attributionControl:{defaultValue:null,description:`If set, an {@link AttributionControl} will be added to the map with the provided options.
To disable the attribution control, pass \`false\`.
!!! note
    Showing the logo of MapLibre is not required for using MapLibre.
@defaultValue compact: true, customAttribution: "MapLibre ...".`,name:"attributionControl",required:!1,type:{name:"false | AttributionControlOptions | undefined"}},maplibreLogo:{defaultValue:null,description:"If `true`, the MapLibre logo will be shown.",name:"maplibreLogo",required:!1,type:{name:"boolean | undefined"}},logoPosition:{defaultValue:null,description:"A string representing the position of the MapLibre wordmark on the map. Valid options are `top-left`,`top-right`, `bottom-left`, or `bottom-right`.\n@defaultValue 'bottom-left'",name:"logoPosition",required:!1,type:{name:"enum",value:[{value:"undefined"},{value:'"top-left"'},{value:'"top-right"'},{value:'"bottom-left"'},{value:'"bottom-right"'}]}},canvasContextAttributes:{defaultValue:null,description:"Set of WebGLContextAttributes that are applied to the WebGL context of the map.\nSee https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext for more details.\n`contextType` can be set to `webgl2` or `webgl` to force a WebGL version. Not setting it, Maplibre will do it's best to get a suitable context.\n@defaultValue antialias: false, powerPreference: 'high-performance', preserveDrawingBuffer: false, failIfMajorPerformanceCaveat: false, desynchronized: false, contextType: 'webgl2withfallback'",name:"canvasContextAttributes",required:!1,type:{name:"WebGLContextAttributesWithType | undefined"}},refreshExpiredTiles:{defaultValue:null,description:"If `false`, the map won't attempt to re-request tiles once they expire per their HTTP `cacheControl`/`expires` headers.\n@defaultValue true",name:"refreshExpiredTiles",required:!1,type:{name:"boolean | undefined"}},maxBounds:{defaultValue:null,description:"If set, the map will be constrained to the given bounds.",name:"maxBounds",required:!1,type:{name:"LngLatBoundsLike | undefined"}},scrollZoom:{defaultValue:null,description:'If `true`, the "scroll to zoom" interaction is enabled. {@link AroundCenterOptions} are passed as options to {@link ScrollZoomHandler.enable}.\n@defaultValue true',name:"scrollZoom",required:!1,type:{name:"boolean | AroundCenterOptions | undefined"}},minZoom:{defaultValue:null,description:`The minimum zoom level of the map (0-24).
@defaultValue 0`,name:"minZoom",required:!1,type:{name:"number | null | undefined"}},maxZoom:{defaultValue:null,description:`The maximum zoom level of the map (0-24).
@defaultValue 22`,name:"maxZoom",required:!1,type:{name:"number | null | undefined"}},minPitch:{defaultValue:null,description:`The minimum pitch of the map (0-180).
@defaultValue 0`,name:"minPitch",required:!1,type:{name:"number | null | undefined"}},maxPitch:{defaultValue:null,description:`The maximum pitch of the map (0-180).
@defaultValue 60`,name:"maxPitch",required:!1,type:{name:"number | null | undefined"}},boxZoom:{defaultValue:null,description:'If `true`, the "box zoom" interaction is enabled (see {@link BoxZoomHandler}).\n@defaultValue true',name:"boxZoom",required:!1,type:{name:"boolean | undefined"}},dragRotate:{defaultValue:null,description:'If `true`, the "drag to rotate" interaction is enabled (see {@link DragRotateHandler}).\n@defaultValue true',name:"dragRotate",required:!1,type:{name:"boolean | undefined"}},dragPan:{defaultValue:null,description:'If `true`, the "drag to pan" interaction is enabled. An `Object` value is passed as options to {@link DragPanHandler.enable}.\n@defaultValue true',name:"dragPan",required:!1,type:{name:"boolean | DragPanOptions | undefined"}},keyboard:{defaultValue:null,description:"If `true`, keyboard shortcuts are enabled (see {@link KeyboardHandler}).\n@defaultValue true",name:"keyboard",required:!1,type:{name:"boolean | undefined"}},doubleClickZoom:{defaultValue:null,description:'If `true`, the "double click to zoom" interaction is enabled (see {@link DoubleClickZoomHandler}).\n@defaultValue true',name:"doubleClickZoom",required:!1,type:{name:"boolean | undefined"}},touchZoomRotate:{defaultValue:null,description:'If `true`, the "pinch to rotate and zoom" interaction is enabled. An `Object` value is passed as options to {@link TwoFingersTouchZoomRotateHandler.enable}.\n@defaultValue true',name:"touchZoomRotate",required:!1,type:{name:"boolean | AroundCenterOptions | undefined"}},touchPitch:{defaultValue:null,description:'If `true`, the "drag to pitch" interaction is enabled. An `Object` value is passed as options to {@link TwoFingersTouchPitchHandler.enable}.\n@defaultValue true',name:"touchPitch",required:!1,type:{name:"boolean | AroundCenterOptions | undefined"}},cooperativeGestures:{defaultValue:null,description:'If `true` or set to an options object, the map is only accessible on desktop while holding Command/Ctrl and only accessible on mobile with two fingers. Interacting with the map using normal gestures will trigger an informational screen. With this option enabled, "drag to pitch" requires a three-finger gesture. Cooperative gestures are disabled when a map enters fullscreen using {@link FullscreenControl}.\n@defaultValue false',name:"cooperativeGestures",required:!1,type:{name:"boolean | undefined"}},trackResize:{defaultValue:null,description:"If `true`, the map will automatically resize when the browser window resizes.\n@defaultValue true",name:"trackResize",required:!1,type:{name:"boolean | undefined"}},center:{defaultValue:null,description:"The initial geographical centerpoint of the map. If `center` is not specified in the constructor options, MapLibre GL JS will look for it in the map's style object. If it is not specified in the style, either, it will default to `[0, 0]`\n!!! note\n    MapLibre GL JS uses longitude, latitude coordinate order (as opposed to latitude, longitude) to match GeoJSON.\n@defaultValue [0, 0]",name:"center",required:!1,type:{name:"LngLatLike | undefined"}},elevation:{defaultValue:null,description:"The elevation of the initial geographical centerpoint of the map, in meters above sea level. If `elevation` is not specified in the constructor options, it will default to `0`.\n@defaultValue 0",name:"elevation",required:!1,type:{name:"number | undefined"}},zoom:{defaultValue:null,description:"The initial zoom level of the map. If `zoom` is not specified in the constructor options, MapLibre GL JS will look for it in the map's style object. If it is not specified in the style, either, it will default to `0`.\n@defaultValue 0",name:"zoom",required:!1,type:{name:"number | undefined"}},bearing:{defaultValue:null,description:"The initial bearing (rotation) of the map, measured in degrees counter-clockwise from north. If `bearing` is not specified in the constructor options, MapLibre GL JS will look for it in the map's style object. If it is not specified in the style, either, it will default to `0`.\n@defaultValue 0",name:"bearing",required:!1,type:{name:"number | undefined"}},pitch:{defaultValue:null,description:"The initial pitch (tilt) of the map, measured in degrees away from the plane of the screen (0-85). If `pitch` is not specified in the constructor options, MapLibre GL JS will look for it in the map's style object. If it is not specified in the style, either, it will default to `0`. Values greater than 60 degrees are experimental and may result in rendering issues. If you encounter any, please raise an issue with details in the MapLibre project.\n@defaultValue 0",name:"pitch",required:!1,type:{name:"number | undefined"}},roll:{defaultValue:null,description:"The initial roll angle of the map, measured in degrees counter-clockwise about the camera boresight. If `roll` is not specified in the constructor options, MapLibre GL JS will look for it in the map's style object. If it is not specified in the style, either, it will default to `0`.\n@defaultValue 0",name:"roll",required:!1,type:{name:"number | undefined"}},renderWorldCopies:{defaultValue:null,description:`If \`true\`, multiple copies of the world will be rendered side by side beyond -180 and 180 degrees longitude. If set to \`false\`:

- When the map is zoomed out far enough that a single representation of the world does not fill the map's entire
container, there will be blank space beyond 180 and -180 degrees longitude.
- Features that cross 180 and -180 degrees longitude will be cut in two (with one portion on the right edge of the
map and the other on the left edge of the map) at every zoom level.
@defaultValue true`,name:"renderWorldCopies",required:!1,type:{name:"boolean | undefined"}},maxTileCacheSize:{defaultValue:null,description:"The maximum number of tiles stored in the tile cache for a given source. If omitted, the cache will be dynamically sized based on the current viewport which can be set using `maxTileCacheZoomLevels` constructor options.\n@defaultValue null",name:"maxTileCacheSize",required:!1,type:{name:"number | null | undefined"}},maxTileCacheZoomLevels:{defaultValue:null,description:"The maximum number of zoom levels for which to store tiles for a given source. Tile cache dynamic size is calculated by multiplying `maxTileCacheZoomLevels` with the approximate number of tiles in the viewport for a given source.\n@defaultValue 5",name:"maxTileCacheZoomLevels",required:!1,type:{name:"number | undefined"}},transformRequest:{defaultValue:null,description:"A callback run before the Map makes a request for an external URL. The callback can be used to modify the url, set headers, or set the credentials property for cross-origin requests.\nExpected to return an object with a `url` property and optionally `headers` and `credentials` properties.\n@defaultValue null",name:"transformRequest",required:!1,type:{name:"RequestTransformFunction | null | undefined"}},transformCameraUpdate:{defaultValue:null,description:`A callback run before the map's camera is moved due to user input or animation. The callback can be used to modify the new center, zoom, pitch and bearing.
Expected to return an object containing center, zoom, pitch or bearing values to overwrite.
@defaultValue null`,name:"transformCameraUpdate",required:!1,type:{name:"CameraUpdateTransformFunction | null | undefined"}},transformConstrain:{defaultValue:null,description:`A callback that overrides how the map constrains the viewport's lnglat and zoom to respect the longitude and latitude bounds.
@see [Customize the map transform constrain](https://maplibre.org/maplibre-gl-js/docs/examples/customize-the-map-transform-constrain/)
Expected to return an object containing center and zoom.
@defaultValue null`,name:"transformConstrain",required:!1,type:{name:"TransformConstrainFunction | null | undefined"}},locale:{defaultValue:null,description:"A patch to apply to the default localization table for UI strings, e.g. control tooltips. The `locale` object maps namespaced UI string IDs to translated strings in the target language; see `src/ui/default_locale.js` for an example with all supported string IDs. The object may specify all UI strings (thereby adding support for a new translation) or only a subset of strings (thereby patching the default translation table).\nFor an example, see https://maplibre.org/maplibre-gl-js/docs/examples/locale-switching/\nAlternatively, search the official plugins page for plugins related to localization.\n@defaultValue null",name:"locale",required:!1,type:{name:"Record<string, string> | undefined"}},fadeDuration:{defaultValue:null,description:`Controls the duration of the fade-in/fade-out animation for label collisions after initial map load, in milliseconds. This setting affects all symbol layers. This setting does not affect the duration of runtime styling transitions or raster tile cross-fading.
@defaultValue 300`,name:"fadeDuration",required:!1,type:{name:"number | undefined"}},crossSourceCollisions:{defaultValue:null,description:"If `true`, symbols from multiple sources can collide with each other during collision detection. If `false`, collision detection is run separately for the symbols in each source.\n@defaultValue true",name:"crossSourceCollisions",required:!1,type:{name:"boolean | undefined"}},collectResourceTiming:{defaultValue:null,description:"If `true`, Resource Timing API information will be collected for requests made by GeoJSON and Vector Tile web workers (this information is normally inaccessible from the main Javascript thread). Information will be returned in a `resourceTiming` property of relevant `data` events.\n@defaultValue false",name:"collectResourceTiming",required:!1,type:{name:"boolean | undefined"}},clickTolerance:{defaultValue:null,description:`The max number of pixels a user can shift the mouse pointer during a click for it to be considered a valid click (as opposed to a mouse drag).
@defaultValue 3`,name:"clickTolerance",required:!1,type:{name:"number | undefined"}},bounds:{defaultValue:null,description:"The initial bounds of the map. If `bounds` is specified, it overrides `center` and `zoom` constructor options.",name:"bounds",required:!1,type:{name:"LngLatBoundsLike | undefined"}},fitBoundsOptions:{defaultValue:null,description:"A {@link FitBoundsOptions} options object to use _only_ when fitting the initial `bounds` provided above.",name:"fitBoundsOptions",required:!1,type:{name:"FitBoundsOptions | undefined"}},localIdeographFontFamily:{defaultValue:null,description:`Defines a CSS
font-family for locally overriding generation of Chinese, Japanese, and Korean characters.
For these characters, font settings from the map's style will be ignored, except for font-weight keywords (light/regular/medium/bold).
Set to \`false\`, to enable font settings from the map's style for these glyph ranges.
The purpose of this option is to avoid bandwidth-intensive glyph server requests.
@see [Use locally generated ideographs](https://maplibre.org/maplibre-gl-js/docs/examples/use-locally-generated-ideographs/)
@defaultValue 'sans-serif'`,name:"localIdeographFontFamily",required:!1,type:{name:"string | false | undefined"}},style:{defaultValue:null,description:`The map's MapLibre style. This must be a JSON object conforming to
the schema described in the [MapLibre Style Specification](https://maplibre.org/maplibre-style-spec/),
or a URL to such JSON.
When the style is not specified, calling {@link Map.setStyle } is required to render the map.`,name:"style",required:!1,type:{name:"string | StyleSpecification | undefined"}},pitchWithRotate:{defaultValue:null,description:'If `false`, the map\'s pitch (tilt) control with "drag to rotate" interaction will be disabled.\n@defaultValue true',name:"pitchWithRotate",required:!1,type:{name:"boolean | undefined"}},rollEnabled:{defaultValue:null,description:'If `false`, the map\'s roll control with "drag to rotate" interaction will be disabled.\n@defaultValue false',name:"rollEnabled",required:!1,type:{name:"boolean | undefined"}},reduceMotion:{defaultValue:null,description:"If `true`, gesture inertia (such as panning) is disabled. If not provided, gesture inertia defaults to the user's device settings.\n@defaultValue undefined",name:"reduceMotion",required:!1,type:{name:"boolean | undefined"}},pixelRatio:{defaultValue:null,description:"The pixel ratio.\nThe canvas' `width` attribute will be `container.clientWidth * pixelRatio` and its `height` attribute will be `container.clientHeight * pixelRatio`. Defaults to `devicePixelRatio` if not specified.",name:"pixelRatio",required:!1,type:{name:"number | undefined"}},validateStyle:{defaultValue:null,description:`If false, style validation will be skipped. Useful in production environment.
@defaultValue true`,name:"validateStyle",required:!1,type:{name:"boolean | undefined"}},maxCanvasSize:{defaultValue:null,description:"The canvas' `width` and `height` max size. The values are passed as an array where the first element is max width and the second element is max height.\nYou shouldn't set this above WebGl `MAX_TEXTURE_SIZE`.\n@defaultValue [4096, 4096].",name:"maxCanvasSize",required:!1,type:{name:"[number, number] | undefined"}},cancelPendingTileRequestsWhileZooming:{defaultValue:null,description:"Determines whether to cancel, or retain, tiles from the current viewport which are still loading but which belong to a farther (smaller) zoom level than the current one.\n* If `true`, when zooming in, tiles which didn't manage to load for previous zoom levels will become canceled. This might save some computing resources for slower devices, but the map details might appear more abruptly at the end of the zoom.\n* If `false`, when zooming in, the previous zoom level(s) tiles will progressively appear, giving a smoother map details experience. However, more tiles will be rendered in a short period of time.\n@defaultValue true",name:"cancelPendingTileRequestsWhileZooming",required:!1,type:{name:"boolean | undefined"}},centerClampedToGround:{defaultValue:null,description:`If true, the elevation of the center point will automatically be set to the terrain elevation
(or zero if terrain is not enabled). If false, the elevation of the center point will default
to sea level and will not automatically update. Defaults to true. Needs to be set to false to
keep the camera above ground when pitch \\> 90 degrees.`,name:"centerClampedToGround",required:!1,type:{name:"boolean | undefined"}},experimentalZoomLevelsToOverscale:{defaultValue:null,description:`Allows overzooming by splitting vector tiles after max zoom.
Defines the number of zoom level that will overscale from map's max zoom and below.
For example if the map's max zoom is 20 and this is set to 3, the zoom levels of 20, 19 and 18 will be overscaled
and the rest will be split.
When undefined, all zoom levels after source's max zoom will be overscaled.
This can help in reducing the size of the overscaling and improve performance in high zoom levels.
The drawback is that it changes rendering for polygon centered labels and changes the results of query rendered features.
@defaultValue undefined
@experimental`,name:"experimentalZoomLevelsToOverscale",required:!1,type:{name:"number | undefined"}}}}}catch{}const L="FeatureCollection",k=[{type:"Feature",properties:{},geometry:{type:"Point",coordinates:[7.087102928817649,50.74405832491909]}},{type:"Feature",properties:{},geometry:{type:"Point",coordinates:[7.08709100837143,50.74248301217495]}},{type:"Feature",properties:{},geometry:{type:"Point",coordinates:[7.087340096598094,50.743463230859554]}},{type:"Feature",properties:{},geometry:{type:"Point",coordinates:[7.085715859711298,50.74413132961715]}},{type:"Feature",properties:{},geometry:{type:"Point",coordinates:[7.087048180788789,50.744208881351355]}},{type:"Feature",properties:{},geometry:{type:"Point",coordinates:[7.085567870742217,50.74411037418911]}},{type:"Feature",properties:{},geometry:{type:"Point",coordinates:[7.085626894551625,50.74326065094446]}},{type:"Feature",properties:{},geometry:{type:"Point",coordinates:[7.086857240792656,50.74322306548407]}},{type:"Feature",properties:{},geometry:{type:"Point",coordinates:[7.086775098221696,50.74235433252242]}},{type:"Feature",properties:{},geometry:{type:"Point",coordinates:[7.086770996718059,50.74374476917342]}}],f={type:L,features:k},_={title:"UiComponents/LayerTree",component:o,argTypes:{},decorators:T},q=()=>{const t={mapConfigs:{mapConfig1:{name:"Demo Map",mapProps:{center:[7.0851268,50.73884],zoom:12},layers:[{type:"folder",uuid:"acd3d99f-2f82-40a5-a5c9-f303d54f5606",name:"layers in a folder",visible:!0},{type:"geojson",uuid:"fec837fa-1d5d-432b-89c2-b416c9773523",name:"Example Point Layer",configurable:!0,config:{geojson:f}},{type:"vt",uuid:"346ced38-142c-4b57-8193-d689ffc7dfc2",name:"Vector Layer",visible:!0,config:{layers:[{id:"7feaa47a-f667-49ee-9780-312eabaa872b",type:"fill","source-layer":"water",source:"openmaptiles",layout:{visibility:"visible"},paint:{"fill-color":"#0905f5","fill-opacity":.5},maxzoom:20},{id:"346ced38-142c-4b57-8193-d689ffc7dfc2",type:"fill","source-layer":"building",source:"openmaptiles",layout:{visibility:"none"},paint:{"fill-color":"#717875"},maxzoom:20}],sourceOptions:{type:"vector",minzoom:0,tiles:["https://wms.wheregroup.com/tileserver/tile/world-0-14/{z}/{x}/{y}.pbf"]}}},{type:"wms",uuid:"0e8cd91b-bd49-419d-a19a-5b15dec17542",name:"Example WMS Layer",config:{url:"https://www.wms.nrw.de/geobasis/wms_nw_uraufnahme",urlParameters:{layers:"nw_uraufnahme_rw"}}}],layerOrder:[{uuid:"acd3d99f-2f82-40a5-a5c9-f303d54f5606",layers:[{uuid:"fec837fa-1d5d-432b-89c2-b416c9773523"},{uuid:"346ced38-142c-4b57-8193-d689ffc7dfc2"},{uuid:"0e8cd91b-bd49-419d-a19a-5b15dec17542"}]}]}}};return d()(u({key:"mapConfig1",mapConfig:t.mapConfigs.mapConfig1})),e.jsxs(e.Fragment,{children:[e.jsxs(p,{open:!0,children:[e.jsx(r,{variant:"h5",children:"Example Layertree"}),e.jsx(o,{mapConfigKey:Object.keys(t.mapConfigs)[0]})]}),e.jsx(c,{mapConfigKey:Object.keys(t.mapConfigs)[0]})]})},a=q.bind({});a.parameters={};a.args={};const j=()=>{const t={mapConfigs:{mapConfig1:{name:"Demo Map",mapProps:{center:[7.0851268,50.73884],zoom:12},layers:[{type:"folder",uuid:"acd3d99f-2f82-40a5-a5c9-f303d54f5606",name:"layers in a folder",visible:!0,config:void 0},{type:"geojson",uuid:"fec837fa-1d5d-432b-89c2-b416c9773523",name:"Example Point Layer",configurable:!0,config:{type:"circle",geojson:f,options:{paint:{"circle-color":"blue","circle-radius":5}}}},{type:"geojson",uuid:"0587c0ed-aaa0-4315-bb77-a40937a684d7",name:"Example Polygon Layer",configurable:!0,config:{geojson:C,options:{paint:{"fill-color":"red"}}}}],layerOrder:[{uuid:"acd3d99f-2f82-40a5-a5c9-f303d54f5606",layers:[{uuid:"fec837fa-1d5d-432b-89c2-b416c9773523"},{uuid:"0587c0ed-aaa0-4315-bb77-a40937a684d7"}]}]}}};return d()(u({key:"mapConfig1",mapConfig:t.mapConfigs.mapConfig1})),e.jsxs(e.Fragment,{children:[e.jsxs(p,{open:!0,children:[e.jsx(r,{variant:"h5",children:"Layertree 1"}),e.jsx(o,{mapConfigKey:Object.keys(t.mapConfigs)[0]}),e.jsx(r,{variant:"h5",children:"Layertree 2"}),e.jsx(o,{mapConfigKey:Object.keys(t.mapConfigs)[0]})]}),e.jsx(c,{mapConfigKey:Object.keys(t.mapConfigs)[0]})]})},n=j.bind({});n.parameters={};n.args={};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`() => {
  const demoData: MapState = {
    mapConfigs: {
      mapConfig1: {
        name: 'Demo Map',
        mapProps: {
          center: [7.0851268, 50.73884],
          zoom: 12
        },
        layers: [{
          type: 'folder',
          uuid: 'acd3d99f-2f82-40a5-a5c9-f303d54f5606',
          name: 'layers in a folder',
          visible: true
        }, {
          type: 'geojson',
          uuid: 'fec837fa-1d5d-432b-89c2-b416c9773523',
          name: 'Example Point Layer',
          configurable: true,
          config: {
            geojson: sample_points_inside_polygon as FeatureCollection
          }
        }, {
          type: 'vt',
          uuid: '346ced38-142c-4b57-8193-d689ffc7dfc2',
          name: 'Vector Layer',
          visible: true,
          config: {
            layers: [{
              id: '7feaa47a-f667-49ee-9780-312eabaa872b',
              type: 'fill',
              'source-layer': 'water',
              source: 'openmaptiles',
              layout: {
                visibility: 'visible'
              },
              paint: {
                'fill-color': '#0905f5',
                'fill-opacity': 0.5
              },
              maxzoom: 20
            }, {
              id: '346ced38-142c-4b57-8193-d689ffc7dfc2',
              type: 'fill',
              'source-layer': 'building',
              source: 'openmaptiles',
              layout: {
                visibility: 'none'
              },
              paint: {
                'fill-color': '#717875'
              },
              maxzoom: 20
            }],
            sourceOptions: {
              type: 'vector',
              minzoom: 0,
              tiles: ['https://wms.wheregroup.com/tileserver/tile/world-0-14/{z}/{x}/{y}.pbf']
            }
          }
        }, {
          type: 'wms',
          uuid: '0e8cd91b-bd49-419d-a19a-5b15dec17542',
          name: 'Example WMS Layer',
          config: {
            url: 'https://www.wms.nrw.de/geobasis/wms_nw_uraufnahme',
            urlParameters: {
              layers: 'nw_uraufnahme_rw'
            }
          }
        }],
        layerOrder: [{
          uuid: 'acd3d99f-2f82-40a5-a5c9-f303d54f5606',
          layers: [{
            uuid: 'fec837fa-1d5d-432b-89c2-b416c9773523'
          }, {
            uuid: '346ced38-142c-4b57-8193-d689ffc7dfc2'
          }, {
            uuid: '0e8cd91b-bd49-419d-a19a-5b15dec17542'
          }]
        }]
      }
    }
  };
  const dispatch = useDispatch();
  dispatch(setMapConfig({
    key: 'mapConfig1',
    mapConfig: demoData.mapConfigs['mapConfig1']
  }));
  return <>
            <Sidebar open={true}>
                <Typography variant="h5">Example Layertree</Typography>
                <LayerTree mapConfigKey={Object.keys(demoData.mapConfigs)[0]}></LayerTree>
            </Sidebar>
            <LayerOnMap mapConfigKey={Object.keys(demoData.mapConfigs)[0]}></LayerOnMap>
        </>;
}`,...a.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`() => {
  const demoData: MapState = {
    mapConfigs: {
      mapConfig1: {
        name: 'Demo Map',
        mapProps: {
          center: [7.0851268, 50.73884],
          zoom: 12
        },
        layers: [{
          type: 'folder',
          uuid: 'acd3d99f-2f82-40a5-a5c9-f303d54f5606',
          name: 'layers in a folder',
          visible: true,
          config: undefined
        }, {
          type: 'geojson',
          uuid: 'fec837fa-1d5d-432b-89c2-b416c9773523',
          name: 'Example Point Layer',
          configurable: true,
          config: {
            type: 'circle',
            geojson: sample_points_inside_polygon as FeatureCollection,
            options: {
              paint: {
                'circle-color': 'blue',
                'circle-radius': 5
              }
            }
          }
        }, {
          type: 'geojson',
          uuid: '0587c0ed-aaa0-4315-bb77-a40937a684d7',
          name: 'Example Polygon Layer',
          configurable: true,
          config: {
            geojson: sample_polygon_1 as FeatureCollection,
            options: {
              paint: {
                'fill-color': 'red'
              }
            }
          }
        }],
        layerOrder: [{
          uuid: 'acd3d99f-2f82-40a5-a5c9-f303d54f5606',
          layers: [{
            uuid: 'fec837fa-1d5d-432b-89c2-b416c9773523'
          }, {
            uuid: '0587c0ed-aaa0-4315-bb77-a40937a684d7'
          }]
        }]
      }
    }
  };
  const dispatch = useDispatch();
  dispatch(setMapConfig({
    key: 'mapConfig1',
    mapConfig: demoData.mapConfigs['mapConfig1']
  }));
  return <>
            <Sidebar open={true}>
                <Typography variant="h5">Layertree 1</Typography>
                <LayerTree mapConfigKey={Object.keys(demoData.mapConfigs)[0]}></LayerTree>
                <Typography variant="h5">Layertree 2</Typography>
                <LayerTree mapConfigKey={Object.keys(demoData.mapConfigs)[0]}></LayerTree>
            </Sidebar>
            <LayerOnMap mapConfigKey={Object.keys(demoData.mapConfigs)[0]}></LayerOnMap>
        </>;
}`,...n.parameters?.docs?.source}}};const D=["LayerTreeMultipleLayertypesExample","MultipleLayertreesExample"];export{a as LayerTreeMultipleLayertypesExample,n as MultipleLayertreesExample,D as __namedExportsOrder,_ as default};

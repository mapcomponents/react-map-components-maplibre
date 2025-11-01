## [v1.6.3] (2025-11-01)

### Fixes

- change handler to use draw events and fix feature onChange updates ([#244](https://github.com/mapcomponents/react-map-components-maplibre/pull/244))

## [v1.6.2]

### Fixes

- ee8c7ff: improve useFeatureEditor change handler to correctly process features from events ([#243](https://github.com/mapcomponents/react-map-components-maplibre/pull/243))

## [v1.6.1]

### Fixed

- c5faf0a: Fix/set style update bug (#242)
- 1186589: Fix layer order by removing reverse on layerIds in LayerListItemFactory to adjust with fixed MlOrderlayers order

## [v1.3.3]

### Added

- ea97284: add new Feature [MlGlobeButton](https://mapcomponents.github.io/react-map-components-maplibre/?path=/docs/mapcomponents-mlglobebutton--docs)

### Fixed

- 3cc7a83: fix useAddProtocol tcx view in storybook

### Changed

- a72811f: upgrade storybook v.8 -> v.9
- e22698a: change meta.json (new catalogue system uses meta.json files)
- 3cc7a83: upgrade dependencies

### Removed

- e22698a: remove stories.json (new catalogue system does not require it)

## [v1.3.2]

### Changed

- f2980b6: Design/navigation tool (#225)
- 570987e: Upgrade to maplibre to 5.6.0 (from 5.5.0)

## [v1.3.1]

### Changed

- 3f6b50c: Upgrade to maplibre to 5.5.0 (from 5.3.0) (#223)

## [v1.3.0]

### Changed

- UI design/ogc in MlSketchTool and MlOgcApiFeatures

### Fixed

- fix MlMarker and improve performance by using a maplibre marker instead of an absolute positioned HTML element
- fix Storybook demos: MlLayerSwitcher, useCameraFollowPath, MlVectorTileLayer, MlPdfForm, MlThreeJsLayer, MlNavigationCompass

### Removed

- remove MlComponentTemplate from storybook

## [v1.2.0]

### Changed

- update React v18 -> v19
- replace enzyme in jest tests with @testing-library/react

## [v1.1.0] - 2025-03-21

### Added

- add dependabot

### Changed

- update @dnd-kit and actions/setup-node@v2
- update actions/cache@v2 -> v3
- update dependencies
- update publish workflow node version
- change Design/ml measure tool

### Fixed

- fix MlNavigation Zoom

## [v1.0.11] - 2025-02-14

### Fixed

- fix package.json `types` property value in release

## [v1.0.10] - 2025-02-13

### Added

- 3a5b6ca: add cypress test-setup
- 4e346a2: add MlOgcApiFeatures components

### Changed

- a6ab82d: use @types/geojson throughout the whole project, replace turf geojson types
- 3c16c31: improve MlFeatureEditor demo UX

## [v1.0.9] - 2024-11-20

### Added

- 75649aa: add MlOgcApiFeatures Component
- 90311cf: add new redux based layerconfig store

### Changed

- 0b448e1: Update @mui to ^6.1.1

## [v1.0.8] - 2024-09-16

### Fixed

- 2862ad4: fix layerComponent identification in LayerListItem component (#185) …

## [v1.0.7] - 2024-07-30

### Changed

- a6bc647: Upgrade to maplibre-gl 4.5 (sky enabled) (#178)

### Fixed

- dde2ef4: fix: incorrect property access (#181) …

## [v1.0.6] - 2024-07-30

### Fixed

- 209ec04: Fix/use layerhook update on functions

## [v1.0.5] - 2024-06-21

### Changed

- 78f7106: client search component MlClientSearch removed from release…

### Fixed

- 78f7106: MlGeojsonlayer options.source bug

## [v1.0.4] - 2024-06-21

### Added

- cab1848: add hints to buttons in catalogue stories
- c621883: Feature/add layer and source events (#167) …
- fcb3c75: add feature for additional pdf form info to MlPdfForm (#162) …
- 7994580: add client search component MlClientSearch (#166) …
- b0d2c32: add makeMapContextDecorators function to enable changing MapLibreMap options inside the sb-story (#165) …

### Changed

- 20378bc: refactor geojson stories
- af7e0c4, 6fa9a9b: update README.md
- 8735ac8: redefiened MlLayer useLayerProps (#160) …

### Fixed

- a48a8fa: fix MlImageMarkerLayer story
- 3afbe7b: remove useLayer hook initializedRef anti-pattern and fix reinitializa… (#169) …
- 14ef756: Fix/usesource stylechange (#168) …

## [v1.0.3] - 2024-02-22

### Fixed

- a80667a: import missing maplibre-gl.css again in MapLibreMap component (#164)

## [v1.0.1] - 2024-02-16

### Changed

- 56eb640: move cypress dependencies to devDependencies

## [v1.0.1] - 2024-02-16

### Fixed

- 5c37664: fix npm package

## [v1.0.0] - 2024-02-15 (broken)

### Changed

- 5500815: upgrade to maplibre v4.0.0
- 7629f88: upgrade storybook and all dependencies to the latest major release

## [v0.1.96] - 2024-01-29

### Fixed

- 2925672: fix overwrite options.paint in LayerListItem

## [v0.1.95] - 2024-01-23

### Fixed

- 7eb14fa: fix MlOrderLayers component unable to create layers using useLayer hook after useLayer hook changes (#152) …
- 16d834d: MlMultiMeasureTool: properly remove hovered geometries from map when object is deleted
- a65d703: fix MlGeoJsonLayer: enable source with type "geojson" and a protocol url in the data property

## [v0.1.94] - 2024-01-17

### Fixed

- 0af148b: remove conditional use of useLayer hook for label layer in MlGeoJsonLayer
- 718afe6: fix useSource cleanup error
- c6856e6: fix MlTemporalController to work with useLayer, MlGeoJsonLayer adjustments

## [v0.1.92] - 2024-01-16

### Fixed

- fe33641: fix useSource hook to dynamically adjust to props.sourceId changes
- fe33641: fix useMap hook to use less setState calls
- fe33641: fix useLayer hook options.source prop to wait for the source to be added

### Changed

- fe33641: add MlGeoJsonLayer labelProp defaults to enable simply passing the property name to props.labelProp to get labels.
- fe33641: make label layer use the same source as the main layer.
- fe33641: adjust MlGeoJsonLayer labelProp storybook demo to show the actual use of the property

## [v0.1.91] - 2024-01-16

### Fixed

- 4775728: remove mbtiles protocol handler from build to fix sql.js error

## [v0.1.90] - 2024-01-16 (broken)

### Fixed

- f40622f: fix build error suggesting marking sql.js as external

## [v0.1.89] - 2024-01-02 (broken)

### Fixed

- ca2fe4e: fix AddLayerButton mbtiles useAddProtocol

## [v0.1.88] - 2023-12-22

### Added

- e45ff67: add labelProp and labelOptions to MlGeojsonLayer
- 5f7d750: add useAddProtocol handlers new formats (csv, osm, tcx, kml, gpx, Topojson)

### Fixed

- a5b9d87: fix MlMeasureTool conversion
- 90befdb: fix compass needle aligment
- ecb1c48: fix Storybook demos

## [v0.1.87] - 2023-10-25

### Changed

- 27f1cb2: show measured value in m and in units if measured value is < 0.1km or 0.1mi
- e606c7c: add catalogue specific demo storybook stories to be able to also provide more useful stories for developers not shown in the catalogue

### Added

- cb3057f: make layerlist items in layerlistitemfactory sortable via drag & drop

## [v0.1.86] - 2023-09-13

### Fixed

- 6882b80: fix: LayerList deleteIcon layout
- e5ab361: demo bugfixes

### Changed

- 7eb6dda: update xmldom ^0.6.0 to @xmldom/xmldom ^0.8.10 (#130) …

### Added

- 1a221e3: add compNorth, compSouth, compStroke compass styling options to theme
- 75de07d: add useAddImage hook + story

## [v0.1.85] - 2023-07-14

### Fixed

- b0be9be: MlLayerSwipe resize window bug
- b0be9be: MlSketchTools hovered Feature and mobile edition bugs
- b0be9be: MlNavToools setpitch bug
- b0be9be: Optimized stories

### Changed

- b0be9be: mapbox-gl-draw from 1.4.0 to 1.4.2
- 5dd85be: code styling in LayerList, Compass and ColorPicker

### Added

- b0be9be: added mlFollowgps accurancy fitBounds function

## [v0.1.84] - 2023-06-29

### Fixed

- 2690227: fix theme, remove unfinished cy test

## [v0.1.83] - 2023-06-28

### Changed

- d43a6e8: new Compass, NavTools and LayerList style

## [v0.1.82] - 2023-06-12

### Fixed

- b89794a: remove mbTilesProtocolHandler from export to remove sql.js dependency as it breaks app builds

## [v0.1.81] - 2023-06-12

### Added

- 2ba02ba: add useAddProtocol hook
- 2ba02ba: add mbTilesProtocolHandler

## [v0.1.80] - 2023-06-01

### Added

- bea7ecc: add a test, add thumbnail (#112) …

### Fixed

- f423ada: fix layerContext moveUp moveDown functions (#114) …

## [v0.1.79] - 2023-05-31

### Added

- f253071: Reliable & adjustable layer order (#105) …
- c7c4fdf: add MlTerrainLayer component (#108) …
- 70c18d7: optimize map libre map stories presentation (#103) …
- a02db81: add missing catalogue descriptions (#109) …
- bdd32ae: add SpeedDial UI component (#106) …

### Changed

- **Breaking:** 36be5ab: change MlFeatureEditor to useFeatureEditor hook, replace custom draw modes with default modes, draw mode strings require adjustment to the equivalent default mode (#110) …

### Fixed

- c0c302a: Feature/fix wmsloader featureinfo (#111) …
- e743b79: Fix/cypress config (#104) …

## [v0.1.78] - 2023-04-28

### Added

- cedf14b: add interval parameter to MlTemporalController

## [v0.1.77] - 2023-04-05

### Fixed

- 92bac5c: remove deprecated @mui/styles dependency; fixes npm compatibility

### Added

- 6512e26: add name prop to MlWmsLoader

### Changed

- 6512e26: make AddLayerPopup initial config state configurable
- 6512e26: make MlWmsLoader featureInfoActive controllable from parent component
- 6512e26: make LayerListItemFactory control featureInfoActive to always reflect the state in LayerConfig

### Added

## [v0.1.76] - 2023-04-04

### Fixed

- b879750: fix MlGeoJsonLayer layout option props spread order

### Added

- b879750: add thumbnails to style select menu

## [v0.1.75] - 2023-04-04

### Fixed

- 66c8df2: add missing LayerListItemFactory export

## [v0.1.74] - 2023-04-03

### Fixed

- 6e68b8c: fix wmsLoader feature info
- 3eac872: fix useLayer hook source attribution settings

### Added

- 5a4c581: add component MlTemporalController
- a85a5b1: add LayerListItemFactory
- a85a5b1: add GeoJsonLayerForm
- a85a5b1: add WmsLayerForm
- a85a5b1: add LayerTypeForm
- a85a5b1: add AddLayerButton
- a85a5b1: add MlWmsLoader featureInfo configuration prop and queryable indicator next to layer
- a85a5b1: add LayerContext and localStorage persistence to AddLayerButton story

### Changed

- a85a5b1: change MlWmsLoader to return LayerListItem compatible list elements

## [v0.1.73] - 2023-03-11

### Fixed

- 547db2c: Fix/layerlist visibility settings

## [v0.1.72] - 2023-03-08

### Fixed

- Fix/maplibremap registration react 18 (#89) …
- remove mui-color dependency

### Added

- add new ColorPicker ui component
- add MlWmsLayer support to LayerList component

## [v0.1.71] - 2023-03-04

### Fixed

- e3178b5: fix Topbar sidebar defaults

## [v0.1.70] - 2023-03-03

### Fixed

- 153b00d: fix react 18 compatibility issue. reset initializedRef if MapLibreMap is removed from react dom (#81) …

### Added

- TopToolbar and Sidebar component exports
- cdc4b5b: add createPng & downloadPng function to useExportMap hook promise

### Changed

- cdc4b5b: adjust MlCreatePdfButton to use useExportMap hook
- 6b6ce0c: update .npmignore to include all files & folders that aren't required in the module build

## [v0.1.69] - 2023-02-07

### Changed

- read dependencies from package.dependencies

## [v0.1.68] - 2023-02-07

### Added

- 3a2d4a0: add experimental LayerList component and stories
- a0a01ff: add MUI theme & export getTheme function

### Changed

- 3a7b87b: fix maplibre-gl imports remove ! in front of the module name (webpack exclude) to improve compatibility with dev environments using rollup

## [v0.1.67] - 2023-01-30

### Changed

- upgrade storybook to 6.5.x
- upgrade react to 18.2.0
- upgrade typescript to 4.9.4
- add support for node 18.x
- 474eb8c: migrate MlShareMapState, MlThreeJsLayer to typescript

### Added

- add missing exports MapLibreGlWrapper, useLayerEvent, useGpx, useLayerHoverPopup, MlWmsLoader
- add missing typescript definitions to MapLibreGlWrapper

## [v0.1.66] - 2023-01-23

### Added

- add missing useLayerFilter export

## [v0.1.65] - 2023-01-23

### Fixed

- 516a9ce: mlwmsloader capabilities layer parsing
- 516a9ce: mlwmsloader improve performance by rendering all selected layers using a single MlWmsLayer component
- 516a9ce: mlwmsloader capabilities layer parsing

### Added

- a6f347f: add useLayerFilter hook

## [v0.1.64] - 2023-01-15

### Fixed

- eb4f4ef: Improve MapLibreGlWrapper, MlGeoJsonLayer, useLayer typescript definitions
- e4bf4a7: fix mui themes in storybook
- 5c3cd9a: make MlWmsLayer urlParameters property dynamic
- 5c3cd9a: make MlWmsLoader WMS utilization more efficient by using a single MlWmsLayer component to render all visible WMS layers

### Added

- 5b9f424: add catalogue metadata json schema check github action
- ae0aa98: add missing geojson layer types (support all 'type' types for MlGeojsonLayer)
- ae0aa98: add circle & Heatmap stories for MlGeoJsonLayer
- 20fa873: Feature/optimize ml spatial elevation profile (#49) …
- 20fa873: add useGpx hook
- 20fa873: add Dropzone Component
- 20fa873: add useLayerHoverPopup hook

### Changed

- fff236b: migrate MlLayermagnify MlLayerSwipe stories & tests to typescript
- 20fa873: refactor MlSpatialElevationProfile & MlGpxViewer
- 20fa873: optimize MlSpatialElevationProfile story
- 3e30778: migrate MlCenterPos & MlComponentTemplate to typescript
- 80f777d: add loading spinner to MlCreatePdfForm
- 5c3cd9a: optimize MlWmsLoader story

## [v0.1.63] - 2022-12-16

### Fixed

- b5d6636: update mui dependencies to fix export 'experimental_sx' (reexported as 'experimental_sx') was not found in '@mui/system'

### Added

- f6af0fd: merge feature/cypress test setup (#48)
- a1c1f1c: add MlSketchTool demo to catalog (#51) …

### Changed

- 4e6ad8e: MlGeojsonLayer story optimization (#45)
- 36f3ee8: MlGpxViewer story optimization (#46)
- e2af70a: refactor TopToolBar component
- f820006: refactor Sidebar component
- 4038777: update d3 & maplibre-gl dependencies

## [v0.1.62] - 2022-11-26

### Added

- ba36980: full rewrite of the PdfPreview component, fixing distortion issues in lower zoom levels, offering improved user experience when transforming, adding an option to set a fixed scale

## [v0.1.61] - 2022-11-16

### Added

- 63f11bc: add useCameraFollowPath

## [v0.1.60] - 2022-11-04

### Fixed

- bc71b1f: Fix/use export map hook (#39)

### Changed

- **Breaking:** 7687eec: change MlVectorTileLayer layers prop type from object to array

## [v0.1.59] - 2022-10-04

### Fixed

- ac559c4: fix MlCreatePdfForm export

## [v0.1.58] - 2022-10-04

### Added

- 6be40b7: automatic eslint & prettier tests as GitHub action
- 396b1b7: useSource hook
- 67d88a0: add MlCreatePdfForm component & useExportMap hook providing more sophisticated control on the PDF creation process such as a preview of the PDF area with drag&drop, resize & rotation functionality as well as controlls over the paper size, quality & orientation

### Fixed

- 0cf90f7: fix useMapState story by adding an dedicated hook decorator
- 4c919b8: fix useMap hook typechange bug

## [v0.1.57] - 2022-08-30

### Added

- f807ffd: add export for MlScaleReference

## [v0.1.56] - 2022-08-11

### Added

- f72292b: add centerUserPosition option flag to MlFollowGps to prevent constant recentering of the map to the users current position
- f72292b: add useFlyTo option flag to MlFollowGps to allow choosing between flyTo or setCenter as map centering function
- f72292b: add orientationConePaint option to MlFollowGps to allow overriding the orientation cone paint layer paint properties

### Changed

- f72292b: rename MlFollowGps style option to buttonSx
- 412c363: wrap MlNavigationTools in a @MUI Box component and expose the sx property as MlNavigationTools option

## [v0.1.55] - 2022-07-18

### Changed

- be4fa69: make MlLayer geojson attribute optional

## [v0.1.54] - 2022-07-18

### Changed

- ad54e39: add geojson attribute to MlLayer component

## [v0.1.53] - 2022-07-18

### Changed

- 1a7ac4e: add more configuration options to MlNavigationTools

## [v0.1.52] - 2022-07-18

### Added

- 5c276af: add MlCenterPosition Component

## [v0.1.51] - 2022-07-12

### Changed

- 938f665: improve typescript type definitions for MlGeoJsonLayer attributes, useLayer hook props, maplibre reference returned by useMap hook
- 3349332: improve MlTransitionGeoJsonLayer attribute types

## [v0.1.49] - 2022-07-11

### Added

- c119564: add useLayer hook tests
- 27d9ded: add typescript type definitions

### Changed

- 9244711: update readme to make it more beginner friendly

### Fixed

- 6b3c223: add touch support to MlFeatureEditor
- a531174: refactor MlFeatureEditor

## [v0.1.48] - 2022-06-15

### Added

- 4d53b8a: add miles option to MlMeasureTool

### Fixed

- 0082e6d: fix MlMeasureTools typescript transpilation errors

## [v0.1.47] (broken build) - 2022-06-15

### Fixed

- ed194ff: fix MlWmsLoader & useWms hooks default param values of GetCapabilities request

## [v0.1.46] - 2022-06-09

### Fixed

- 16e78aa: fix MlImageMarkerLayer initialization conditions

### Added

- 06e30aa: add MeasureTool to catalog
- 35bc0ff: make MapLibreMap options.style property reactive to dynamic changes during runtime

## [v0.1.45] - 2022-05-10

### Fixed

- 336bca8: fix useLayer implicit layer types

## [v0.1.44] - 2022-05-10

### Fixed

- a81bb06: fix useLayer setPaintProperty error when changing geojson type using implicit layer types

## [v0.1.42] - 2022-05-10

### Fixed

- d974415: fix geojsonlayer default circle color

## [v0.1.41] - 2022-05-10

### Fixed

- 4c1f5b6: fix MlWmsLoader
- 32e6a3f: fix useLayer reinitialization bug

## [v0.1.39] - 2022-04-21

### Changed

- move d3 from devDependencies to dependencies

## [v0.1.38] - 2022-04-21

### Changed

- integrate MapContext from @mapcomonents/react-core

## [v0.1.37] (broken build) - 2022-04-20

## [v0.1.36] (broken build) - 2022-04-20

## [v0.1.35] (broken build) - 2022-04-20

### Changed

- migrate components and hooks to typescript

## [v0.1.34] - 2022-03-24

### Fixed

- 0ced5c1: revert to webpack inline transpilation exclusion as there is no effect on codesandbox installation issues

## [v0.1.33] - 2022-03-24

### Fixed

- 5b80cac: remove webpack inline transpilation exclusion to fix codesandbox installation issues

## [v0.1.32] - 2022-03-15

### Added

- bd333ce: add exports for useWms and MlMarker

## [v0.1.31] - 2022-02-24

### Added

- acbaa59: export MlTransitionGeoJsonLayer from esm module

## [v0.1.30] - 2022-02-20

### Fixed

- 26dc071: exclude maplibre-gl from transpilation using ! webpack import syntax to prevent "Uncaught ReferenceError" bug

## [v0.1.28] - 2022-02-20

### Added

- 486b7a2: add device orientation indicator to MlFollowGps component

### Changed

- aba9483: upgrade maplibre-gl to v2.1.6
- 2f5d769: add MlNavigationtools to all storybook demos by integrating it into storybook decorators
- ae871c0: migrate MlScaleReference to useMap hook
- a322419: migrate MlNavigationTools to useMap hook
- 241c28d: migrate MlNavigationCompass to useMap hook
- 1de0269: migrate MlOsmLayer to useMap hook
- 83694e5: migrate MlGPXViewer to useMap hook
- f1e7c3d: upgrade @mui dependencies
- 1c873d9: upgrade three, xmldom & jspdf dependencies
- 2890587: Remove all LineString transition logic from MlGeoJsonLayer to MlTransitionGeoJsonLayer

### Fixed

- 2890587: Merge pull request #5 from mapcomponents/feature/add-mltransitiongeojsonlayer

## [v0.1.27] - 2022-02-05

### Fixed

- 743b8ed: set includeBaseLayers filter in useMap hool to true to make waiting for base layers possible

### Changed

- da55245: make the registration of an onlayerchange event handler by the useMap hook dependent on its waitForLayer prop

## [v0.1.26] - 2022-02-02

### Fixed

- adjust MlFollowGps position marker style & add flyTo instead of setCenter for new Gps positions
- fix useWms hook retrieval of WMS GetMap URL

## [v0.1.25] - 2022-01-31

### Fixed

- fix MlFollowGps needsRedraw bug; refactor MlFollowGps

## [v0.1.24] - 2022-01-23

### Fixed

- fix MlVectorTileLayer sourceId

## [v0.1.23] - 2022-01-23

### Changed

- migrate MlVectorTileLayer to useMap hook & provide full control over layer & source id

## [v0.1.22] - 2022-01-23

### Changed

- make MlVectorTileLayer props.layers[].layout properties update dynamically

## [v0.1.21] - 2022-01-21

### Fixed

- migrate MlVectorTileLayer to useMap hook & provide full control over layer & source id

## [v0.1.20] - 2022-01-17

### Changed

- migrate MlWmsLayer to use useMap hook instead of mapContext

### Fixed

- adjust MapLibreGlWrapper to fire layerchange events more efficiently
- MlShareMapState: prevent pushing new history states if props.active is false
- fix MlWmsLayer & tests
- fix MlVectorTileLayer visible property
- fix MlGeoJsonLayer props.onHover, props.onClick, props.onLeave

### Added

- add props.sourceOptions to MlVectorTileLayer

## [v0.1.19] - 2022-01-09

### Added

- add props.options to MlGeoJsonLayer

## [v0.1.18] - 2022-01-09

### Added

- add props.defaultPaintOverrides to MlGeoJsonLayer

## [v0.1.17] - 2022-01-09

### Added

- add implicit layer-type (props.type) casting for MlGeoJsonLayer

### Changed

### Fixed

- fix MlGeoJsonLayer type prop: remove and add a new layer of the new type, if props.type changes

## [v0.1.16] - 2021-12-23

### Added

- add CHANGELOG.md

### Changed

- migrate MlComponentTemplate to utilize useMap hook
- migrate MlFollowGps to utilize useMap hook

### Fixed

- fix MlFollowGps - remove example code (setCenter)

## [v0.1.15] - 2021-12-21

### Added

- export MlFollowGps component from esm module
- add a useMap hook to reduce boilerplate code in components

### Changed

- adjust MlImageMarkerLayer to make use of the new useMap hook

### Fixed


# Change Log


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

- 7687eec: change MlVectorTileLayer layers prop type from object to array

## [v0.1.59] - 2022-10-04

### Fixed

- ac559c4: fix MlCreatePdfForm export
## [v0.1.58] - 2022-10-04

### Added

- 6be40b7: automatic eslint & prettier tests as GitHub action
- 396b1b7: useSource hook
- 67d88a0: add MlCreatePdfForm component & useExportMap hook providing more sophisticated control on the PDF creation process such as a preview of the PDF area with drag&drop, resize & rotation  functionality as well as controlls over the paper size, quality & orientation

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
 